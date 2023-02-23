const { Schema, model } = require('mongoose');

const CursosSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],

    },
    descripcion: {
        type: String,
    },
    maestro: {
        type: String,
        required: [true, 'El Maestro es obligatorio'],
    },
    estado: {
        type: Boolean,
        default: true,
        required: true
    },

});

module.exports = model('Cursos', CursosSchema)