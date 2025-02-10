const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Skapa en betalningssida
router.get('/', (req, res) => {
    res.render('payment', {
        title: 'Betalning'
    });
});

module.exports = router;
