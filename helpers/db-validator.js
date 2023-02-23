const Usuario = require('../models/Usuarios');
const Role = require('../models/rol');
const Curso = require('../models/cursos');

const emailExiste = async( correo = '' ) => {
    //Verficar si el correo existe
    const existeEmailDeUsuario = await Usuario.findOne( { correo } );
    if ( existeEmailDeUsuario) {
        throw new Error(`El correo ${ correo }, ya esta registrado en la DB `);
    }
}

const cursoExiste = async( curso = '' ) => {  
    //Verficar si el correo existe
    const existecursoDeUsuario = await Curso.findOne( { curso } );
    if ( existecursoDeUsuario) {
        throw new Error(`El curso ${ curso }, ya esta registrado en la DB `);
    }
}


const esRoleValido = async( rol = '') => {
    //Verificar si el rol es valido y existe en la DB
    const existeRolDB = await Role.findOne( { rol } );
    if ( !existeRolDB ) {
        throw new Error(`El rol ${ rol }, no existe en la DB `);
    }
}

const existeUsuarioPorId = async( id ) => {

    //Verificar si existe el ID
    const existIdOfUser = await Usuario.findById( id );
    if ( !existIdOfUser ) {
        throw new Error(`El id: ${id} no existe en la DB`);
    }

}

const existeCursoPorId = async( id = '' ) => {
    //Verficar si el correo existe
    const existIdOfCurso = await Curso.findById( id );
    if ( !existIdOfCurso ) {
        throw new Error(`El curso: ${id} no existe en la DB`);
    }
}


module.exports = {
    emailExiste,
    esRoleValido,
    existeUsuarioPorId,
    cursoExiste,
    existeCursoPorId

}