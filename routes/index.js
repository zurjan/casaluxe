const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Home Page Route (Render EJS Page)
router.get('/', (req, res) => {
  try {
    let sort = req.query.sort;  // 'low-to-high', 'high-to-low'
    let slug = req.query.slug;  // Product category slug

    let productQuery = "SELECT * FROM products";
    let conditions = [];
    let params = [];

    // Apply filtering based on category (slug)
    if (slug) {
      conditions.push("slug = ?");
      params.push(slug);
    }

    // Add WHERE condition if filtering is applied
    if (conditions.length > 0) {
      productQuery += " WHERE " + conditions.join(" AND ");
    }

    // Apply sorting
    if (sort === "low-to-high") {
      productQuery += " ORDER BY price ASC";
    } else if (sort === "high-to-low") {
      productQuery += " ORDER BY price DESC";
    }

    // Execute the database query
    db.all(productQuery, params, (err, productRows) => {
      if (err) {
        throw err;
      }

      // Fetch posts for the slideshow
      db.all("SELECT * FROM posts", [], (err, postRows) => {
        if (err) {
          throw err;
        }

        // Render home.ejs with products
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

// API Route to Get Filtered Products as JSON
router.get('/products', (req, res) => {
  try {
    let sort = req.query.sort;
    let slug = req.query.slug;

    let productQuery = "SELECT * FROM products";
    let conditions = [];
    let params = [];

    if (slug) {
      conditions.push("slug = ?");
      params.push(slug);
    }

    if (conditions.length > 0) {
      productQuery += " WHERE " + conditions.join(" AND ");
    }

    if (sort === "low-to-high") {
      productQuery += " ORDER BY price ASC";
    } else if (sort === "high-to-low") {
      productQuery += " ORDER BY price DESC";
    }

    db.all(productQuery, params, (err, products) => {
      if (err) {
        console.error('Database Error:', err);
        return res.status(500).json({ error: "Database Error" });
      }

      res.json(products); // Return products as JSON response
    });
  } catch (err) {
    console.error('Error fetching products:', err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
