const express = require('express');
const router = express.Router();
const db = require('../config/db');

router.get('/', (req, res) => {
    try {
        const posts = db.prepare('SELECT * FROM posts').all(); 
        res.render('Nyproduct', { posts: posts });
    } catch (err) {
        console.error('Database Error:', err);
        res.status(500).send('Database Error');
    }
});
router.get('/:urlSlug', (req, res, next) => {
  const urlSlug = req.params.urlSlug; 

  try {
      const post = db.prepare('SELECT * FROM posts WHERE urlSlug = ?').get(urlSlug);
      console.log('Post:', post); 

      if (post) {
          const randomPosts = db.prepare('SELECT * FROM posts WHERE id != ? ORDER BY RANDOM() LIMIT 3').all(post.id);
          console.log('Random Posts:', randomPosts); 

          res.render('Nyproduct', { title: post.namn, post: post, randomPosts: randomPosts });
      } else {
          res.status(404).send('Product not found');
      }
  } catch (err) {
      console.error('Database Error:', err);
      res.status(500).send('Database Error');
  }
});


module.exports = router;




