var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// Se incluye express-partials
var partials = require ('express-partials');

// Inclusión del método override para sustituir post por put
var methodOverride = require ('method-override');

// Importación del paquete express-session
var session = require('express-session');

// Se deja la ruta de de index
var routes = require('./routes/index');

// Se elimina la ruta de users
// var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Hacer uso de partials
app.use(partials());

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Instalación del cokie parser con semilla basada en "Quiz 2015" para generar cookie aleatoria
app.use(cookieParser('Quiz 2015'));

// Instalar didleware session
app.use(session());

// Instalación del método override
app.use(methodOverride('_method'));


app.use(express.static(path.join(__dirname, 'public')));

// **********************************************************************
// Definición del middleware para implementar el mecanismo de autologout
// **********************************************************************


 app.use(

      function (req, res, next){

        // Validar la existencia de la sesión de usuario
        if (req.session.user) {

            // Determinar los milisegundos de inactividad
            milisegundoInicioInactividad = req.session.user.inicioInactividad;
            milisegundoActual = Date.now();
            milisegundosInactividad = milisegundoActual - milisegundoInicioInactividad;

            // Analizar los milisegundos de inactividad del usuario
            if (milisegundosInactividad >= 60000) {

                // Eliminar los datos de sesión del usuario
                delete req.session.user;
              
            } else {

                // Asignar al inicio de inactividad del usuario el momento actual
                req.session.user.inicioInactividad =  Date.now();

            }

        }

        // Ejecutar el siguiente middleware
        next();

     }

);


// Definición del middleware que está accesible en req.question en req.locals.session para que esté
// accesible en las vistas. También, guarda la ruta de cada solicitud HTTP en la variable session.redir para
// poder redireccionar a la vista anterior después de hacer login o logout
app.use (function (req, res, next) { 

    // Guardar path en session.redir para después de login
    if ( !req.path.match(/\/login|\/logout/)) {

        req.session.redir = req.path;

    };

    // Hacer visible req.session en las vistas
    res.locals.session = req.session;

    // Invocar al próximo middleware
    next();

});


// Se instala el enrutador como un middleware genérico
app.use('/', routes);

// Se elimina el uso de users
// app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err,
            errors: []
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {},
        errors: []
    });
});


module.exports = app;
