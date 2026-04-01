const express = require('express');
const router = express.Router();
const authCtrl = require('../CONTROLADOR/auth.ctrl');

router.post('/registro', authCtrl.registrar);
router.post('/login', authCtrl.login);

module.exports = router;