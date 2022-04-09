const {response, request} = require('express');

const userGet = (req= request, res = response)=>{
    const {q, nombre='not name', apikey, page=1, limit} = req.query;
    res.json({
        msg: 'GET API - CONTROLADOR', 
        q,
        nombre,
        apikey,
        page,
        limit
    });
}

const userPost = (req, res = response)=>{

    const {nombre,  edad, id, volar, poder} = req.body;

    res.json({
        msg: 'POST API - CONTROLADOR',
        nombre,
        edad,
        id, poder
    });
}
const userPut = (req, res = response)=>{
    const id = req.params.id;
    res.json({
        msg: 'PUT API - CONTROLA34DOR',
        id
    });
}

const userDelete = (req, res = response)=>{
    res.json({
        msg: 'DELETE API - CONTROLADOR'
    });
}
module.exports = {
    userGet,
    userPut,
    userPost,
    userDelete,
}