const { response, request } = require('express');

const bcryptjs = require('bcryptjs');

const User = require('../models/userModel');
const { body } = require('express-validator');

const usersGet = async(req = request, res = response) => {


    // const { q, name = 'not name', apikey, page = 1, limit } = req.query;

    const { limite = 5, where = 0 } = req.query;
    const query = { status: true };
    const [total, user] = await Promise.all([
        User.countDocuments(query),
        User.find(query)
        .skip(Number(where))
        .limit(Number(limite))
    ]);

    res.json({

        total,
        user,

    });
}
const usersGetForId = async(req = request, res = response) => {

    const { id } = req.params;
    const user = await User.findById(id);
    // const { q, name = 'not name', apikey, page = 1, limit } = req.query;

    res.json({
        user
    });
}

const usersPost = async(req, res = response) => {

    //const body = req.body;
    const { name, correo, password, role } = req.body;
    const user = new User({ name, correo, password, role });

    //Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);

    //Guarda en MongoDB
    await user.save();

    res.json({
        // msg: 'POST API - CONTROLADOR',
        user
    });
}

const usersPut = async(req, res = response) => {

    const { id } = req.params;
    const { _id, password, google, correo, ...resto } = req.body;

    //TODO validar contra base de datos
    if (password) {
        //Encriptar la contraseña
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }

    const userUpdated = await User.findByIdAndUpdate(id, resto);
    res.json({
        msg: 'PUT API - CONTROLA34DOR',
        userUpdated
    });
}

const usersDelete = async(req, res = response) => {

    const { id } = req.params;

    //Fisicamente lo borramos
    // const user = await User.findByIdAndDelete(id);

    //En ves de eliminar es oculta el estado del cliente
    const user = await User.findByIdAndUpdate(id, { status: false });

    res.json({
        msg: 'DELETE API - CONTROLADOR',
        user
    });
}


module.exports = {
    usersGetForId,
    usersGet,
    usersPut,
    usersPost,
    usersDelete,
}