const express = require('express');
const router = express.Router();
const db = require('../config/db');

// GET /basket → Visa varukorgen
router.get("/", (req, res) => {
    let session_id = req.session.id;

    const sql = `
        SELECT b.product_id, p.name, p.price, p.image, b.quantity, 
               (p.price * b.quantity) AS total_price 
        FROM basket b
        LEFT JOIN products p ON b.product_id = p.id
        WHERE b.session_id = ?
    `;

    db.all(sql, [session_id], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        let totalSum = rows.reduce((sum, item) => sum + item.total_price, 0);

        res.render("basket", {
            title: "Varukorgen",
            basket: rows,
            totalSum,
        });
    });
});

// POST /basket → Lägg till produkt till varukorg
router.post("/", (req, res) => {
    const productId = req.body.productId; 
    let session_id = req.session.id; 

    if (!productId) {
        return res.status(400).send("Product ID is required");
    }

    // Hämta produktinformation från databasen
    db.get("SELECT id, name, price, image FROM products WHERE id = ?", [productId], (err, product) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        if (!product) {
            return res.status(404).send("Product not found.");
        }

        // Kolla om produkten redan finns i varukorgen
        db.get("SELECT * FROM basket WHERE product_id = ? AND session_id = ?", [productId, session_id], (err, row) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }

            if (row) {
                // Om produkten redan finns i varukorgen, uppdatera mängden
                db.run("UPDATE basket SET quantity = quantity + 1 WHERE product_id = ? AND session_id = ?", [productId, session_id], (err) => {
                    if (err) {
                        return res.status(500).json({ error: err.message });
                    }
                    res.redirect("back");
                });
            } else {
                // Om produkten inte finns i varukorgen, lägg till den
                db.run("INSERT INTO basket (session_id, product_id, quantity) VALUES (?, ?, 1)", [session_id, productId], (err) => {
                    if (err) {
                        return res.status(500).json({ error: err.message });
                    }
                    res.redirect("back");
                });
            }
        });
    });
});

// POST /basket/remove → Ta bort produkt från varukorg
router.post("/remove", (req, res) => {
    const productId = req.body.productId;
    let session_id = req.session.id;

    db.run("DELETE FROM basket WHERE product_id = ? AND session_id = ?", [productId, session_id], (err) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.redirect("/basket"); 
    });
});

module.exports = router;