const pool = require('../database');

const Servicios = {

    obtenerTodos: (callback) => {
        pool.query("SELECT * FROM servicios", callback);
    },

    obtenerPorId: (id, callback) => {
        pool.query("SELECT * FROM servicios WHERE id_servicio = ?", [id], callback);
    }

};

module.exports = Servicios;