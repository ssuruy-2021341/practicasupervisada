//Configuración del server
//Importaciones básicas
const express = require('express');
const cors = require('cors');
const { dbConection } = require('../database/base-de-datos');

class Server {
    constructor() {
        //Variables de configuración
        this.app = express();
        this.port = process.env.PORT;

        this.paths = {
            auth: '/api/auth',
            usuario: '/api/Usuario',
            cursos: '/api/Cursos',
        }

        //Conectar a base de datos
        this.conectarDB();

        //Middlewares
        this.middlewares();

        //Rutas de mi app
        this.routes();

    }


    //Metodo de conección a Mongo
    async conectarDB() {
        await dbConection();
    }


    middlewares() {

        //CORS
        this.app.use(cors());

        //Lectura y parseo del body
        this.app.use(express.json());

        //Directorio publico del proyecto
        this.app.use(express.static('public'));

    }


    routes() {
        this.app.use(this.paths.auth, require('../routes/Auth'));
        this.app.use(this.paths.usuario, require('../routes/Usuarios'));
        this.app.use(this.paths.cursos, require('../routes/Cursos'));
    }


    listen() {
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en puerto ${this.port}`)
        })
    }

}

module.exports = Server;