const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Hem-sidan
router.get('/', (req, res) => {
  db.all("SELECT * FROM products", [], (err, rows) => {
    if (err) {
      throw err;
    }
    res.render('home', { products: rows });
  });
});

module.exports = router;
