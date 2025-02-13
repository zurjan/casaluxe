const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Admin Dashboard (Lists all products)
router.get('/dashboard', (req, res) => {
  db.all("SELECT * FROM products", [], (err, rows) => {
    if (err) {
      console.error("Database Error:", err);
      return res.status(500).send("Internal Server Error");
    }
    console.log("Fetched Products:", rows);
    res.render('admin/dashboard', { products: rows || [] });
  });
});

// Add Product Form
router.get('/products/add', (req, res) => {
  res.render('admin/addProduct');
});

// Add Product (POST)
router.post('/products/add', (req, res) => {
  const { name, description, price, image } = req.body;
  db.run(
    "INSERT INTO products (name, description, price, image) VALUES (?, ?, ?, ?)",
    [name, description, price, image],
    function (err) {
      if (err) {
        console.error("Insert Error:", err);
        return res.status(500).send("Internal Server Error");
      }
      res.redirect('/admin/dashboard');
    }
  );
});

// Edit Product Form
router.get('/products/edit/:id', (req, res) => {
  const productId = req.params.id;
  db.get("SELECT * FROM products WHERE id = ?", [productId], (err, row) => {
    if (err) {
      console.error("Database Error:", err);
      return res.status(500).send("Internal Server Error");
    }
    if (!row) {
      return res.status(404).send("Product not found");
    }
    res.render('admin/editProduct', { product: row });
  });
});

// Edit Product (POST)
router.post('/products/edit/:id', (req, res) => {
  const productId = req.params.id;
  const { name, description, price, image } = req.body;
  db.run(
    "UPDATE products SET name = ?, description = ?, price = ?, image = ? WHERE id = ?",
    [name, description, price, image, productId],
    function (err) {
      if (err) {
        console.error("Update Error:", err);
        return res.status(500).send("Internal Server Error");
      }
      res.redirect('/admin/dashboard');
    }
  );
});

module.exports = router;
