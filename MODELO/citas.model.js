const pool = require('../database');
const Citas = {
  obtenerTodos: (callback) => {
    const sql = `
        SELECT 
            citas.NO_CITA,
            citas.fecha,
            citas.hora,
            citas.ID_CLIE,
            servicios.nombre AS servicio
        FROM citas
        INNER JOIN servicios 
            ON citas.ID_SERVICIO = servicios.ID_SERVICIO
        WHERE citas.fecha >= CURDATE()
        ORDER BY citas.fecha ASC, citas.hora ASC
    `;

    pool.query(sql, callback);
},
verificarDisponibilidad: (fecha, hora, callback) => {
    const sql = `
         SELECT * FROM citas
        WHERE fecha = ? AND hora = ?
    `;
    pool.query(sql, [fecha, hora], callback);
},    
crear: (datos, callback) => {
        const sql = `
            INSERT INTO citas 
            (fecha, hora, ID_CLIE, ID_SERVICIO, ID_SUCURSAL)
            VALUES (?, ?, ?, ?, ?)
        `;

        pool.query(sql, [
            datos.fecha,
            datos.hora,
            datos.ID_CLIE,
            datos.ID_SERVICIO,
            datos.ID_SUCURSAL
        ], callback);
    }
};


module.exports = Citas;