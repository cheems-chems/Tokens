const express = require('express');
const { register, login, verify, logout} = require("../controllers/authControllers");

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/verify', verify);
router.post('/logout', logout);

module.exports = router;