const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Admin Dashboard
router.get('/dashboard', (req, res) => {
  db.all("SELECT * FROM products", [], (err, rows) => {
    if (err) {
      throw err;
    }
    res.render('admin/dashboard', { products: rows });
  });
});

// Lägg till produkt
router.get('/products/add', (req, res) => {
  res.render('admin/addProduct');
});

// Lägg till produkt via POST
router.post('/products/add', (req, res) => {
  const { name, description, price, image } = req.body;
  const stmt = db.prepare("INSERT INTO products (name, description, price, image) VALUES (?, ?, ?, ?)");
  stmt.run(name, description, price, image, (err) => {
    if (err) {
      throw err;
    }
    res.redirect('/admin/dashboard');
  });
});

// Uppdatera produkt
router.get('/products/edit/:id', (req, res) => {
  const productId = req.params.id;
  db.get("SELECT * FROM products WHERE id = ?", [productId], (err, row) => {
    if (err) {
      throw err;
    }
    res.render('admin/editProduct', { product: row });
  });
});

// Uppdatera produkt via POST
router.post('/products/edit/:id', (req, res) => {
  const productId = req.params.id;
  const { name, description, price, image } = req.body;
  const stmt = db.prepare("UPDATE products SET name = ?, description = ?, price = ?, image = ? WHERE id = ?");
  stmt.run(name, description, price, image, productId, (err) => {
    if (err) {
      throw err;
    }
    res.redirect('/admin/dashboard');
  });
});

module.exports = router;
