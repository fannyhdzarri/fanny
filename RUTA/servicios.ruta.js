const express = require('express');
const router = express.Router();
const serviciosctrl = require('../CONTROLADOR/servicios.ctrl');

router.get('/', serviciosctrl.listar);

module.exports = router;