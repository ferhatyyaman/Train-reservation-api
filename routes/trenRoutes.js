// routes/trenRoutes.js
const express = require('express');
const router = express.Router();
const trenController = require('../controllers/trenController');

router.post('/rezervasyon', trenController.rezervasyonYap);

module.exports = router;
