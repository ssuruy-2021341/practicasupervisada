require('dotenv').config();

//Importación de configuración de server
const Server = require('./models/Server');

const servidorIniciado = new Server();

servidorIniciado.listen();