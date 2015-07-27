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
var quiz_path = path.join(__dirname, 'quiz');
var Quiz = sequelize.import(quiz_path);

// Importar la definición de la tabla Comment en comment.js
var comment_path = path.join(__dirname,'comment');
var Comment = sequelize.import(comment_path);

// Vincular la tabla Comment a Quiz (muchos comentarios asociados a una pregunta)
Comment.belongsTo(Quiz);
Quiz.hasMany(Comment);

// Exportar las definiciiones de las tablas Quiz y Comment
exports.Quiz = Quiz;
exports.Comment = Comment;

// Crear e incializar la tabla de preguntas
// sequelize.sync() inicializa tabla de preguntas en BBDD
sequelize.sync().then( function() {
       // then (...) ejecuta el manejador una vez creada la tabla
       Quiz.count().then (function(count) {
          if (count === 0) {
               // La tabla se inicializa sólo si está vacía
               Quiz.create({ 
                    pregunta: '¿Capital de Italia?', 
                    respuesta: 'Roma',
                    tema: 'Otro'
               });
               
               Quiz.create({ 
                    pregunta: '¿Capital de Portugal?', 
                    respuesta: 'Lisboa',
                    tema: 'Otro'
               }).then( function() {console.log ('Base de datos inicializada')});

          };
       });
});