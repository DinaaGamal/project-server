const express = require('express');
const router = express.Router();
const { signup, signin } = require('../handlers/auth');

// prefix /api/auth
router.post('/signup', signup); //callback
router.post('/signin', signin);

module.exports = router;
