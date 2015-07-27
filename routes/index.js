var express = require('express');
var router = express.Router();

// Definir la variable que contendrá la ruta del quiz_controller
var quizController = require('../controllers/quiz_controller');
var commentController = require('../controllers/comment_controller');


/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz', errors: []});
});

// Autoload de comandos con :quizId
router.param ('quizId', quizController.load); // autoload :quizId

// Definición de la ruta /quizes
router.get('/quizes',                       quizController.index);
router.get('/quizes/:quizId(\\d+)',         quizController.show);
router.get('/quizes/:quizId(\\d+)/answer',  quizController.answer);
router.get('/quizes/new',                   quizController.new);
router.post('/quizes/create',               quizController.create);
router.get('/quizes/:quizId(\\d+)/edit',    quizController.edit);
router.put('/quizes/:quizId(\\d+)',         quizController.update);
router.delete('/quizes/:quizId(\\d+)',      quizController.destroy);

// Definición de las rutas de /comment
router.get('/quizes/:quizId(\\d+)/comments/new', 	commentController.new);
router.post('/quizes/:quizId(\\d+)/comments', 		commentController.create);


// Activar las páginas de preguntas y respuestas considerando sus controladores (Instrucciones antiguas)
//router.get('/quizes/question', quizController.question);
// router.get('/quizes/answer', quizController.answer);

router.get('/author/credito', quizController.credito);

module.exports = router;
