const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const pool = require('../database');

passport.use('local.signup', new LocalStrategy({

    usernameField: 'email',
    passwordField: 'contrasena',
    passReqToCallback: true

}, async(req, email, contrasena, done) => {
    console.log(req.body);

    const {nombre, apellido ,edad, pais,direccion} = req.body;
    const newUser = {
        nombre,
        apellido,
        edad,
        pais,
        direccion,
        email,
        contrasena
    }
    await pool.query('INSERT INTO Usuario SET ?', [newUser]);


}));

// passport.serializeUser((email, done)==>{

// })