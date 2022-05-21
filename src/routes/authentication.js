const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const passport = require('passport');

/*Inicio de sesion*/
router.get('/inicio', (req, res) => {

    res.render('links/auth/inicio');
});
router.post('/inicio', async (req, res) => {

    const { email, password } = req.body
    const newUser = {
        email,
        password
    }

    res.send('Recibido bro');
});

/*Registro de usuario*/
router.get('/registro', (req, res) => {

    res.render('links/auth/registro');
});

router.post('/signup', passport.authenticate('local.signup', {
    successRedirect: '/perfil',
    failureRedirect: '/registro',
    failureFlash: true
  }));

router.get('/perfil', (req, res) => {

    res.send('Aca va el perfil bro');
});

// passport.deserializeUser((usr, done)=>{
// })
module.exports = router;