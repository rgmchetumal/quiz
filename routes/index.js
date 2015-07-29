var express = require('express');
var router = express.Router();

// Definir la variable que contendrá la ruta del quiz_controller
var quizController = require('../controllers/quiz_controller');
var commentController = require('../controllers/comment_controller');
var sessionController = require ('../controllers/session_controller');


/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz', errors: []});
});

// *****************************************************
// Autoload de comandos
// *****************************************************

  // Autoload :quizId
  router.param ('quizId', quizController.load); 

  // Autoload :commentId
  router.param ('commentId', commentController.load);

// *********************************************************
// Definición de rutas de sesión
// *********************************************************

   // Formulario login
   router.get('/login',  sessionController.new);

   // Crear sesión
   router.post('/login', sessionController.create);

   // Destruir sesión
   router.get('/logout', sessionController.destroy);

// Definición de la ruta /quizes
router.get('/quizes',                       quizController.index);
router.get('/quizes/:quizId(\\d+)',         quizController.show);
router.get('/quizes/:quizId(\\d+)/answer',  quizController.answer);
router.get('/quizes/new',                   sessionController.loginRequired, quizController.new);
router.post('/quizes/create',               sessionController.loginRequired, quizController.create);
router.get('/quizes/:quizId(\\d+)/edit',    sessionController.loginRequired, quizController.edit);
router.put('/quizes/:quizId(\\d+)',         sessionController.loginRequired, quizController.update);
router.delete('/quizes/:quizId(\\d+)',      sessionController.loginRequired, quizController.destroy);

// Definición de las rutas de /comment
router.get('/quizes/:quizId(\\d+)/comments/new', 	commentController.new);
router.post('/quizes/:quizId(\\d+)/comments', 		commentController.create);
router.get('/quizes/:quizId(\\d+)/comments/:commentId(\\d+)/publish',  sessionController.loginRequired, commentController.publish);


// Activar las páginas de preguntas y respuestas considerando sus controladores (Instrucciones antiguas)
//router.get('/quizes/question', quizController.question);
// router.get('/quizes/answer', quizController.answer);

router.get('/author/credito', quizController.credito);

module.exports = router;
