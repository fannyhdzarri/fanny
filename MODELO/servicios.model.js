const conexion = require('../database');

const Servicios = {

    obtenerTodos: (callback) => {
        conexion.query("SELECT * FROM servicios", callback);
    },

    obtenerPorId: (id, callback) => {
        conexion.query("SELECT * FROM servicios WHERE id_servicio = ?", [id], callback);
    }

};

module.exports = Servicios;