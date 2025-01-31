const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Visa produkter baserat på kategori
router.get('/:categoryId', (req, res) => {
  const categoryId = req.params.categoryId;
  db.all("SELECT * FROM products WHERE category_id = ?", [categoryId], (err, rows) => {
    if (err) {
      throw err;
    }
    res.render('category', { products: rows });
  });
});

module.exports = router;
