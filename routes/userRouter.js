const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { esRoleValitor, esEmailValidator, existeUserForId } = require('../helpers/db-valitadors');
const {
    usersGet,
    usersPut,
    usersPost,
    usersDelete,
    usersGetForId,
    usersDeleteEnable
} = require('../controllers/userController');

const router = Router();

router.get('/:id', [
        check('id', 'No es un ID valido').isMongoId(),
        check('id').custom(existeUserForId),
        validarCampos
    ],
    usersGetForId);

router.get('/', usersGet);

router.put('/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeUserForId),
    check('role').custom(esRoleValitor),
    validarCampos
], usersPut);

router.post('/', [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'La contraseña debe ser más de 6 digitos').isLength({ min: 6 }),
    check('correo').custom(esEmailValidator),
    check('role').custom(esRoleValitor),
    validarCampos
], usersPost);

router.delete('/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeUserForId),
    validarCampos
], usersDelete);



module.exports = router;