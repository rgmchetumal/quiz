var path = require ('path');

// Postgres DATABASE_URL = postgress://user:paswd@host:port/database
// SQlite DATABASE_URL = sqlit://:@:/
var url = process.env.DATABASE_URL.match(/(.*)\:\/\/(.*?)\:(.*)@(.*)\:(.*)\/(.*)/);
var DB_name    = (url[6] || null);
var user       = (url[2] || null);
var pwd        = (url[3] || null);
var protocol   = (url[1] || null);
var dialect    = (url[1] || null);
var port       = (url[5] || null);
var host       = (url[4] || null);
var storage    = process.env.DATABASE_STORAGE;

// Cargar modelo ORM
var Sequelize = require('sequelize');


// Usar BBDD SQLite o Postgres
var sequelize = new Sequelize ( DB_name, user, pwd,
	                              {    dialect: protocol,
                                        protocol: protocol,
                                        port: port,
                                        host: host,
                                        storage: storage, // Sólo SQlite (.env)
                                        omitNull: true // Sólo Postgres
                                   }
	                           );

// Importar la definición de la tabla Quiz en quiz.js
var Quiz = sequelize.import(path.join(__dirname, 'quiz'));

// Exportar la definición de la tabla Quiz
exports.Quiz = Quiz;

// Crear e inicializar la tabla de preguntas
sequelize.sync().success(function () {

     //success (..) ejecuta el manejador una vez creada la tabla
     Quiz.count().success( function (count) {

     	if (count === 0) {

     		// La tabla se inicializa sólo cuando está vacía
     		Quiz.create({ pregunta: 'Capital de Italia',
     			          respuesta: 'Roma'

     		            }
     		).success (function() { console.log ('La base de datos se ha inicializado')});

     	};

     });

});