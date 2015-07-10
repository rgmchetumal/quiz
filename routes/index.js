var express = require('express');
var router = express.Router();

// Definir la variable que contendrá la ruta del quiz_controller
var quizController = require('../controllers/quiz_controller');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz' });
});

// Activar las páginas de preguntas y respuestas considerando sus controladores 
router.get('/quizes/question', quizController.question);
router.get('/quizes/answer', quizController.answer);

router.get('/author/credito', quizController.credito);

module.exports = router;
