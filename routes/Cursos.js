const { Router } = require('express');
const { getCurso, postCurso, putCurso, deleteCurso, asignarAlumno} = require('../controllers/Cursos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { esMaestroRole } = require('../middlewares/Validar-rol');

const router = Router();
router.get('/mostrar',[
    validarJWT,
    esMaestroRole
], getCurso);

router.post('/agregar',[
    validarJWT,
    esMaestroRole
    
], postCurso);

router.put('/editar/:id',[
    validarJWT
], putCurso);

router.delete('/eliminar/:id',[
    validarJWT,
    esMaestroRole
], deleteCurso);

router.get('/asignar/:idCurso',[
    validarJWT,
    esMaestroRole
], asignarAlumno);
module.exports = router;
