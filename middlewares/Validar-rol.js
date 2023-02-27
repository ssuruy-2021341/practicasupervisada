const { request, response  } = require('express');

const esProfRole = ( req = request, res = response, next ) => {
    if ( !req.usuario ) {
        return res.status(500).json({
            msg: 'Se quiere verficar el role sin validar el token primero'
        });
    }


    const { rol, nombre  } = req.usuario
    if ( rol !== 'PROFESOR_ROLE') {
        return res.status(401).json({
            msg: `${ nombre } Solo Docentes `
        });
    }

    next();const {request, response} = require('express');
    const esMaestroRole = (req = request, res = response, next) => {
        if (!req.user) {
            return res.status(500).json({
                msg: 'No puede validar su rol porque no ha iniciado sesión.'
            })
        }
    
        const {role, nombre} = req.user
        if(role != 'ROLE_MAESTRO'){
            return res.status(401).json({
                msg:  'Si no eres profesor, no puedes hacer esto.'
            })
        }
    
    
    
        next();
    }
    
    const esAlumnoRole = (req = request, res = response) => {
        if (!req.user) {
            return res.status(500).json({
                msg: 'No se puede validar tu rol porque no has iniciado sesión.'
            })
        }
    }
    module.exports = {
        esMaestroRole,
        esAlumnoRole
    }

}

const esAlumnoRole = (req = request, res = response) => {
    if (!req.user) {
        return res.status(500).json({
            msg: 'No se puede validar tu rol porque no has iniciado sesión.'
        })
    }
}


module.exports = {
    esProfRole,
    esAlumnoRole
}