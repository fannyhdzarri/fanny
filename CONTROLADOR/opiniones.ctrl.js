const Opiniones = require('../MODELO/opiniones.model');

exports.listar = (req, res) => {
    console.log("🔥 Entró a listar opiniones");

    Opiniones.obtenerTodos((err, resultados) => {
        console.log("🔥 Callback ejecutado");

        if (err) {
            console.log("ERROR MYSQL:", err);
            return res.status(500).json(err);
        }

        res.json(resultados);
    });
};
exports.crear = (req, res) => {

    const nuevaOpinion = {
        calificacion: req.body.calificacion,
        opinion: req.body.opinion,
        ID_SERVICIO: req.body.ID_SERVICIO
    };

    Opiniones.crear(nuevaOpinion, (err, resultado) => {
        if (err) {
    console.log("ERROR MYSQL:", err);
    return res.status(500).json(err);
}

        res.json({
            mensaje: "Opinión guardada correctamente",
            id: resultado.insertId
        });
    });
};