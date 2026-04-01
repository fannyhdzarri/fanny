const conexion = require('../database');
const Citas = require('../MODELO/citas.model');
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
exports.crear = (req, res) => {

    const { fecha, hora, ID_CLIE, ID_SERVICIO, ID_SUCURSAL, pagado } = req.body;

  const comprobante = req.file ? req.file.filename : null;
    // Verificar si ya existe cita
    Citas.verificarDisponibilidad(fecha, hora, (err, resultados) => {

        if (err) {
            console.log(err);
            return res.status(500).json(err);
        }

        if (resultados.length > 0) {
            return res.status(400).json({
                mensaje: "Ya existe una cita en esa fecha y hora."
            });
        }

        // Si no existe, crear cita
        Citas.crear(
    { fecha, hora, ID_CLIE, ID_SERVICIO, ID_SUCURSAL, pagado, comprobante },
    (err, resultado) => {
      if (err) return res.status(500).json(err);

      res.json({ mensaje: "Cita agendada correctamente" });
    }
  );
    });
    if (!pagado) {
  return res.status(400).json({
    mensaje: "Debes realizar un depósito de $200 para agendar la cita."
  });
}
};
exports.listarTodas = (req, res) => {
    const sql = `
    SELECT c.*, s.nombre AS servicio
    FROM citas c
    INNER JOIN servicios s
    ON c.ID_SERVICIO = s.ID_SERVICIO
    WHERE c.fecha >= CURDATE()
    ORDER BY c.fecha, c.hora
    `;
    conexion.query(sql, (err, resultado) => {
    if(err){
      console.log(err);
      return res.status(500).json(err);
    }
    res.json(resultado);
  });
}
exports.listarPorCliente = (req, res) => {
    const id = req.params.id;

  const sql = `
  SELECT c.*, s.nombre AS servicio
  FROM citas c
  INNER JOIN servicios s
  ON c.ID_SERVICIO = s.ID_SERVICIO
  WHERE c.ID_CLIE = ?
  AND (c.fecha > CURDATE() 
       OR (c.fecha = CURDATE() AND c.hora >= CURTIME()))
  ORDER BY c.fecha, c.hora
  `;

  conexion.query(sql, [id], (err, resultado) => {

    if(err){
      console.log(err);
      return res.status(500).json(err);
    }

    res.json(resultado);
    });
};

exports.eliminar = (req, res) => {

  const id = req.params.id;
  
  const sql = "DELETE FROM citas WHERE  NO_CITA = ? ";

  conexion.query(sql, [id], (err, resultado) => {

    if(err){
      console.log(err);
      return res.status(500).json(err);
    }

    res.json({
      mensaje: "Cita cancelada correctamente"
    });

  });
};
exports.reagendar = (req, res) => {
  const id = req.params.id;
  const { fecha, hora } = req.body;
  // Buscar cita
  const sqlBuscar = "SELECT fecha, hora FROM citas WHERE NO_CITA = ?";
  conexion.query(sqlBuscar, [id], (err, resultado) => {
    if (err) return res.status(500).json(err);
    if (resultado.length === 0) {
      return res.status(404).json({ mensaje: "Cita no encontrada" });
    }
    const cita = resultado[0];
    const fechaCita = new Date(`${cita.fecha}T${cita.hora}`);
    const ahora = new Date();
    const diferencia = (fechaCita - ahora) / (1000 * 60 * 60);
    // VALIDACIÓN 24 HORAS
    if (diferencia < 24) {
      return res.status(400).json({
        mensaje: "Solo puedes reagendar con 24 horas de anticipación"
      });
    }
    // Actualizar cita
    const sqlUpdate = "UPDATE citas SET fecha = ?, hora = ? WHERE NO_CITA = ?";
    conexion.query(sqlUpdate, [fecha, hora, id], (err2) => {
      if (err2) return res.status(500).json(err2);
      res.json({ mensaje: "Cita reagendada correctamente" });
    });
  });
};