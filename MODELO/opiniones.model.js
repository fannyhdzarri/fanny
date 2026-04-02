const pool = require('../database');

const Opiniones = {

    obtenerTodos: (callback) => {
    const sql = `
        SELECT 
            o.ID_OPINION,
            o.calificacion,
            o.opinion,
            s.nombre AS servicio
        FROM opiniones o
        INNER JOIN servicios s 
            ON o.ID_SERVICIO = s.ID_SERVICIO
        ORDER BY o.ID_OPINION DESC
    `;

    pool.query(sql, callback);
    },

    obtenerPorId: (id, callback) => {
        pool.query("SELECT * FROM opiniones WHERE ID_OPINION = ?", [id], callback);
    },

    crear: (datos, callback) => {
        const sql = "INSERT INTO opiniones (calificacion, opinion, ID_SERVICIO) VALUES (?,?,?)";
        pool.query(sql, [datos.calificacion, datos.opinion, datos.ID_SERVICIO], callback);
    }
};

module.exports = Opiniones;