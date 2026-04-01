const express = require('express');
const router = express.Router();
const citasCtrl = require('../CONTROLADOR/citas.ctrl');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage });

router.get('/', citasCtrl.listarTodas);
router.get('/:id', citasCtrl.listarPorCliente);
router.post('/', upload.single('comprobante'), citasCtrl.crear);
router.delete('/:id', citasCtrl.eliminar);
router.put('/:id', citasCtrl.reagendar);

module.exports = router;
