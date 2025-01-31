const express = require('express');
const router = express.Router();

// Kontakt-sidan
router.get('/', (req, res) => {
  res.render('contact');
});

module.exports = router;
