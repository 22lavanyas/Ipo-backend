const express = require('express');
const router = express.Router();
const LoginController = require("../controllers/LoginController.js");

router.post('/login', LoginController.login);
router.post('/addPan', LoginController.addPan)
router.get('/getPan', LoginController.getPan);


module.exports = router;
