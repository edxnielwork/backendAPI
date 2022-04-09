const Role = require('../models/roleModel');
const User = require('../models/userModel');

const esRoleValitor = async(role = '') => {
        const exiteRole = await Role.findOne({ role });
        if (!exiteRole) {
            throw new Error(`El rol ${role} no esta registrado`)
        }
    }
    //Verificar si el correo existe
const esEmailValidator = async(correo = '') => {
    const existeEmail = await User.findOne({ correo })
    if (existeEmail) {
        throw new Error(`El correo ${correo} ya esta registrado `)
    }
}

const existeUserForId = async(id) => {
    const existeUser = await User.findById(id)
    if (!existeUser) {
        throw new Error(`El ${id} no existe `)
    }
}

module.exports = {
    esRoleValitor,
    esEmailValidator,
    existeUserForId
}