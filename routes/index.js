const express = require('express');
const router = express.Router();
const db = require('../config/db');




router.get('/', (req, res) => {
  try {
    // product grid
    db.all("SELECT * FROM products", [], (err, productRows) => {
      if (err) {
        throw err;
      }

      // posts (slideshow)
      db.all("SELECT * FROM posts", [], (err, postRows) => {
        if (err) {
          throw err;
        }

        
        res.render('home', { products: productRows, posts: postRows });
      });
    });
  } catch (err) {
    console.error('Database Error:', err);
    res.status(500).send('Database Error');
  }
});

module.exports = router;