const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Visa produkt
router.get('/:id', (req, res) => {
  const productId = req.params.id;
  db.get("SELECT * FROM products WHERE id = ?", [postsId], (err, row) => {
    if (err) {
      throw err;
    }
    res.render('product', { product: row });
  });
});

module.exports = router;