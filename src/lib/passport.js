const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

passport.use('local.signup', new LocalStrategy({

    nombreField : 'nombre',
    apellidoField: 'apellido',
    edadField: 'edad',
    paisField: 'pais',
    direccionField: 'direccion',
    emailField: 'email',
    contrasenaField: 'contrasena',
    passReqToCallback: true

}, async(req, email, password, done) => {
    console.log(req.body);
}));

// passport.serializeUser((email, done)==>{

// })