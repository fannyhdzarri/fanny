const conexion = require('../database');
const Auth = {
  registrar: (datos, callback) => {
    const sql = `
      INSERT INTO clientes (nombre, tel, correo, edad, password)
      VALUES (?, ?, ?, ?, ?)
    `;
    conexion.query(sql, [
      datos.nombre,
      datos.tel,
      datos.correo,
      datos.edad,
      datos.contraseña
    ], callback);
  },
  login: (correo, callback) => {
    const sql = `
      SELECT * FROM clientes
      WHERE correo = ?
    `;
    conexion.query(sql, [correo], callback);
  }
};
module.exports = Auth;