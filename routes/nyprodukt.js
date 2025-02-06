const express = require('express');
const router = express.Router();
const db = require('../config/db');


// نمایش لیست تمام محصولات در nyprodukt
router.get('/', (req, res) => {
  db.all("SELECT * FROM posts", [], (err, rows) => {
    if (err) {
      console.error("Database Error:", err);
      return res.status(500).send("Internal Server Error");
    }
    res.render('nyprodukt', { products: rows });
  });
});

// نمایش صفحه‌ی مخصوص هر محصول بر اساس urlSlug
router.get('/:urlSlug', (req, res) => {
  const urlSlug = req.params.urlSlug;  

  db.get("SELECT * FROM posts WHERE urlSlug = ?", [urlSlug], (err, post) => {
    if (err) {
      console.error("Database Error:", err);
      return res.status(500).send("Internal Server Error");
    }
    if (!post) {
      return res.status(404).send("Product not found");
    }
    
    res.render('nyprodukt', { title: post.namn, product: post });
  });
});

module.exports = router;
