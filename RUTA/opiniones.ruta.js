const express = require('express');
const router = express.Router();
const opinionesctrl = require('../CONTROLADOR/opiniones.ctrl');

router.get('/', opinionesctrl.listar);
router.post('/', opinionesctrl.crear);
module.exports = router;