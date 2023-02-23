const { response, request } = require('express');

const Curso = require('../models/cursos');
const Usuario = require('../models/Usuarios');

const getCurso = async (req = request, res = response) => {

    const query = { estado: true };

    const listaCursos = await Promise.all([
        Curso.countDocuments(query),
        Curso.find(query)
    ]);

    res.json({
        msg: 'GET API de usuarios',
        listaCursos
    })

}


const postCurso = async (req = request, res = response) => {

    const nombre  = req.body.nombre.toUpperCase();
    const descripcion = req.body.descripcion;
    const maestro = req.user._id;
    const cursoDB = await Curso.findOne({ nombre, descripcion, maestro });
    if (cursoDB) {
        return res.status(400).json({
            msg: `La categoria ${cursoDB.nombre}, ya existe en la DB`
        });
    }

    res.status(201).json({
        msg: 'Post de curso',
        curso
    });

}

const putCurso = async (req = request, res = response) => {

    const { id } = req.params;

    const { _id, ...data } = req.body;

    const editarCurso = await Curso.findByIdAndUpdate(id, data, { new: true });

    res.json({
        msg: 'PUT API de Curso',
        editarCurso
    })

}

const deletrCurso = async (req = request, res = response) => {

    const { id } = req.params;
    const existeCurso = await Curso.findOne({_id: id});
    const users = existeCurso.alumnos;
    const maestro = existeCurso.maestro;

    const cursoBorrado = await Curso.findByIdAndUpdate(id, { estado: false }, { new: true });

    for(let user of users){
        await Usuario.findOneAndUpdate(
            {_id: user},
            {$pull: {'cursos': id}},
        );
    }
    await Usuario.findOneAndUpdate(
        {_id: maestro},
        {$pull: {'cursos': id}},

    )


    res.json({
        msg: 'delete curso',
        cursoBorrado
    });

}


module.exports = {
    obtenerCursos: getCurso,
    crearCurso: postCurso,
    actualizarCurso: putCurso,
    eliminarCurso: deletrCurso
}