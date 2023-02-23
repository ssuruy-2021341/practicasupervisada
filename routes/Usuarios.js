//importaciones
const { Router } = require('express');
const { check } = require('express-validator');

const { getUsuarios, postUsuario, putUsuario, deleteUsuario } = require('../controllers/Usuarioario');
const { emailExiste, esRoleValido, existeUsuarioPorId } = require('../helpers/db-validator');
const { validarCampos } = require('../middlewares/Validar-Campos');
const { validarJWT } = require('../middlewares/Validar-jwt');
const { esProfRole } = require('../middlewares/Validar-rol');

const router = Router();

router.get('/mostrar', getUsuarios);

router.post('/agregar', [
    check('nombre', 'El nombre es obligatorio para el post').not().isEmpty(),
    check('password', 'La password es obligatorio para el post').not().isEmpty(),
    check('password', 'La passwarod debe ser mayor a 6 letras').isLength({ min: 6 }),
    check('correo', 'El correo no es valido').isEmail(),
    check('correo').custom( emailExiste ),
    check('rol', 'El rol es obligatorio para el post').not().isEmpty(),
    check('rol').custom( esRoleValido ),
    validarCampos
] , postUsuario);


router.put('/editar/:id',[
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom( existeUsuarioPorId ),
    check('correo', 'El correo no es valido').isEmail(),
    check('correo').custom( emailExiste ),
    check('password', 'La password es obligatorio para el post').not().isEmpty(),
    check('password', 'La passwarod debe ser mayor a 6 letras').isLength({ min: 6 }),
    check('rol').custom( esRoleValido ),
    validarCampos
], putUsuario);


router.delete('/eliminar/:id', [
    validarJWT,
    esProfRole,
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom( existeUsuarioPorId ),
    validarCampos
] ,deleteUsuario);


module.exports = router;