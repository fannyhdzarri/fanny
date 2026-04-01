const Servicios = require('../MODELO/servicios.model');

exports.listar = (req, res) => {
    Servicios.obtenerTodos((err, resultados) => {
        if (err) return res.status(500).json(err);
        res.json(resultados);
    });
};