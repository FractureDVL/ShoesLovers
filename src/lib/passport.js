const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const pool = require('../database');
const helpers = require('./helpers');

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
    };
    newUser.contrasena = await helpers.encryptPassword(contrasena);
    const result = await pool.query('INSERT INTO usuario SET ?', newUser);
    newUser.id = result.insertId;
    return done(null, newUser);
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async(id, done)=>{

 const rows = await pool.query('SELECT * FROM usuario where id = ?',[id]);
 done(null, rows[0]);

});