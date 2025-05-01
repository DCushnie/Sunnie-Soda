const express = require('express');
const {login, logout} = require('../controllers/authcontroller');


const router = express.Router();
console.log("Auth routes loaded");

router.post('/login', login);
router.get('/logout', logout);

module.exports = router;