const express = require('express');
const morgan = require('morgan');
const { engine } = require('express-handlebars');
const path = require('path');
const flash = require('connect-flash');
const session = require('express-session');
const mysql_store = require('express-mysql-session');
const { database } = require('./keys');
const  passport = require('passport');

//initializations

const app = express();
require('./lib/passport');

//settings
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', engine({
    defaultLayout: 'main',
    layoutDir: path.join(app.get('views'), 'layouts'),
    partialDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    helpers: require('./lib/handlebars'),

}));

app.set('view engine', '.hbs');

//Middlewares
app.use(session({

    secret: 'shoes_lovers',
    resave: false,
    saveUninitialized: false,
    store: new mysql_store(database)

}));
app.use(flash());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());



//Global variables
app.use((req, res, next) => {
    app.locals.success = req.flash('success');
    app.locals.success = req.flash('message');
    next();
})

//Routes
app.use(require('./routes/index'));
app.use(require('./routes/authentication'));
app.use('/links', require('./routes/authentication'));
app.use('/links', require('./routes/links'));

//Public
app.use(express.static(path.join(__dirname, 'public')));

//Starting the server

app.listen(app.get("port"));
console.log("Server is in port", app.get("port"));
console.log("App is running in http://localhost:4000/links/index");

