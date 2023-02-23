const { Router } = require('express');
const { check } = require('express-validator');
const { login } = require('../controllers/Auth');
const { validarCampos } = require('../middlewares/Validar-Campos');

const router = Router();

router.post('/login', [
    check('correo', 'El correo no es valido').isEmail(),
    check('password', 'La password es obligatoria').not().isEmpty(),
    validarCampos
] ,login);


module.exports = router;