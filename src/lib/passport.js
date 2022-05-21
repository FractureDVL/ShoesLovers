const { body } = require('express-validator');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const pool = require('../database');
const helpers = require('./helpers');

passport.use('local.signin', new LocalStrategy({

    usernameField: 'email',
    passwordField: 'contrasena',
    passReqToCallback: true

}, async (req, email, contrasena, done) => {

    const rows = await pool.query('SELECT * FROM usuario WHERE email = ?', [email]);
    
    if (rows.length > 0) {
        const user = rows[0];
        console.log(user);
        const validPassword = await helpers.matchPassword(contrasena, user.contrasena);
        if (validPassword) {
            done(null, user, req.flash('success', 'Usuario registrado con : ' + user.nombre));
            console.log('usuario'+ user.contrasena);
        } else {
            done(null, false, req.flash('message', 'Correo o contrasena incorrectas'));
            console.log('Correo o contrasena incorrectas');

        }
    } else {
        return done(null, false, req.flash('message', 'Este usuario no existe'));
        console.log('este usuario no existe');
    }
}));



//Register passport
passport.use('local.signup', new LocalStrategy({

    usernameField: 'email',
    passwordField: 'contrasena',
    passReqToCallback: true

}, async (req, email, contrasena, done) => {
    console.log(req.body);

    const { nombre, apellido, edad, pais, direccion } = req.body;
    const newUser = {
        nombre,
        apellido,
        edad,
        pais,
        direccion,
        email,
        contrasena
    };
    newUser.contrasena = await helpers.encryptPassword(contrasena);
    const result = await pool.query('INSERT INTO usuario SET ?', newUser);
    newUser.id = result.insertId;
    return done(null, newUser);
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {

    const rows = await pool.query('SELECT * FROM usuario where id = ?', [id]);
    done(null, rows[0]);

});