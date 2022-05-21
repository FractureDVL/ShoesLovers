const express = require('express');
const router = express.Router();

const pool = require('../database');

/*Pagina principal*/
router.get('/add', (req, res) => {

    res.render('links/add');
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