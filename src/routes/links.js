const express = require('express');
const router = express.Router();



/*Pagina principal*/
router.get('/index', (req, res) => {

    res.render('links/index');
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