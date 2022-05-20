const express = require('express');
const router = express.Router();

const pool = require('../database');

/*Pagina principal*/
router.get('/add', (req, res) => {

    res.render('links/add');
});
/*Inicio de sesion*/
router.get('/inicio', (req, res) => {

    res.render('links/inicio');
});
router.post('/inicio', async (req, res) => {

    const { email, password } = req.body
    const newLink = {
        email,
        password
    }

    res.send('Recibido bro');
});

/*Registro de usuario*/
router.get('/registro', (req, res) => {

    res.render('links/registro');
});
router.post('/registro', async (req, res) => {

    const {nombre , apellido, edad, pais, direccion, email, contrasena} = req.body
    const newLink = {
         nombre ,
         apellido,
         edad,
         pais,
         direccion,
         email,
         contrasena
     }
    console.log(req.body);
    res.send('Has sido registrado bro ');
    await pool.query('INSERT INTO Usuario SET ?', [newLink]);
});

/*Seccion de hombres*/
router.get('/hombre', (req, res) => {

    res.render('links/hombre');
});
/*Seccion de mujeres*/
router.get('/mujer', (req, res) => {

    res.render('links/mujer');
});
/*Seccion de unisex*/
router.get('/unisex', (req, res) => {

    res.render('links/unisex');
});




module.exports = router;