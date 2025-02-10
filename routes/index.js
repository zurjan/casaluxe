const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Home Page Route (med filtrering och sortering)
router.get('/', (req, res) => {
  try {
    let sort = req.query.sort;  // t.ex. 'low-to-high', 'high-to-low'
    let slug = req.query.slug;  // t.ex. 'sofas', 'tables'

    // Grundläggande SQL-query för att hämta produkter
    let productQuery = "SELECT * FROM products";
    let conditions = [];
    let params = [];

    // Filtrering baserat på slug (kategori/produkt-typ)
    if (slug) {
      conditions.push("slug = ?");
      params.push(slug);
    }

    // Om det finns villkor, lägg till WHERE-klausul
    if (conditions.length > 0) {
      productQuery += " WHERE " + conditions.join(" AND ");
    }

    // Sortering baserat på pris
    if (sort === "low-to-high") {
      productQuery += " ORDER BY price ASC";
    } else if (sort === "high-to-low") {
      productQuery += " ORDER BY price DESC";
    }

    // Kör SQL-fråga för att hämta filtrerade produkter
    db.all(productQuery, params, (err, productRows) => {
      if (err) {
        throw err;
      }

      // Hämta posts (för slideshow)
      db.all("SELECT * FROM posts", [], (err, postRows) => {
        if (err) {
          throw err;
        }

        // Skicka data till frontend för rendering
        res.render('home', { 
          products: productRows, 
          posts: postRows, 
          sort, 
          slug 
        });
      });
    });
  } catch (err) {
    console.error('Database Error:', err);
    res.status(500).send('Database Error');
  }
});

module.exports = router;
