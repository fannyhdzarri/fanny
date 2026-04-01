const express = require('express');
const cors = require('cors');
const mysql = require("mysql");

const servidor = express();

servidor.use(cors({ origin: "*" }));
servidor.use(express.json());

// RUTAS
const serviciosRoutes = require('./RUTA/servicios.ruta');
servidor.use('/api/servicios', serviciosRoutes);

const opinionesRoutes = require('./RUTA/opiniones.ruta');
servidor.use('/api/opiniones', opinionesRoutes);

const citasRoutes = require('./RUTA/citas.ruta');
servidor.use('/api/citas', citasRoutes);

const authRoutes = require('./RUTA/auth.ruta');
servidor.use('/api/auth', authRoutes);

// PUERTO
servidor.set('port', process.env.PORT || 3000);

// CONEXIÓN MYSQL (Railway)
const conexion = mysql.createConnection({
    host: process.env.MYSQLHOST,
    user: process.env.MYSQLUSER,
    password: process.env.MYSQLPASSWORD,
    database: process.env.MYSQLDATABASE,
    port: process.env.MYSQLPORT
});

conexion.connect((error) => {
    if (error) {
        console.error("Error de conexión:", error);
    } else {
        console.log("Conectado a MySQL");
    }
});

// PRUEBA
servidor.get("/bd", (req, res) => {
    conexion.query('SELECT * FROM clientes', (error, resultados) => {
        if (error) {
            return res.status(500).json(error);
        }
        res.json({ resultados });
    });
});

// INICIAR SERVIDOR
servidor.listen(servidor.get('port'), () => {
    console.log("API funcionando correctamente");
});