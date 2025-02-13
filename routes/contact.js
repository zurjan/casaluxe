const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Kontakt-sidan
router.get('/', (req, res) => {
  res.render('contact');
});

// Hantera formulärinlämning
router.post('/', (req, res) => {
  const { name, lastname, country, email, message } = req.body;
  db.run('INSERT INTO contacts (name, lastname, country, email, message) VALUES (?, ?, ?)', [name, lastname, country, email, message], (err) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.redirect('/contact');
  });
});

module.exports = router;