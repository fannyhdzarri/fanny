const Auth = require('../MODELO/auth.model');
const pool = require('../database');

exports.registrar = (req, res) => {

  const NuevoCliente = {
    nombre: req.body.nombre,
    tel: req.body.tel,
    correo: req.body.correo,
    edad: req.body.edad,
    password: req.body.password
  };

  const sql = `
  INSERT INTO clientes (nombre, tel, correo, edad, password)
  VALUES (?,?,?,?,?)
  `;

  pool.query(sql, [
    NuevoCliente.nombre,
    NuevoCliente.tel,
    NuevoCliente.correo,
    NuevoCliente.edad,
    NuevoCliente.password
  ], (err, resultado) => {

    if(err){
      console.log("ERROR MYSQL:", err);
      return res.status(500).json(err);
    }

    res.json({
      mensaje: "Cliente registrado correctamente"
    });

  });

};
exports.login = (req, res) => {

  const { correo, password } = req.body;

  Auth.login(correo, (err, resultados) => {

    if (err) return res.status(500).json(err);

    if (resultados.length === 0) {
      return res.status(401).json({
        mensaje: "Cliente no encontrado"
      });
    }

    const cliente = resultados[0];

    if (cliente.password !== password) {
      return res.status(401).json({
        mensaje: "Contraseña incorrecta"
      });
    }

    res.json({
      mensaje: "Login correcto",
      cliente: cliente
    });

  });

};