// src/routes/userRoutes.js
const express = require('express');
const { getUserName } = require('../controllers/userController');

const router = express.Router();

router.get('/nome', getUserName);

module.exports = router;
