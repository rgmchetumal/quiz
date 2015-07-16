var models = require ('../models/models.js');

// GET de la ruta quizes/question (Versión antigua)
//exports.question = function (req, res) {

//	  // Localizar la primera pregunta y devolverla
//	  models.Quiz.findAll().success( function (quiz) {
//	  	  res.render ('quizes/question', { pregunta: quiz[0].pregunta  })
//	  })
//};

// Autoload = factoriza el código si ruta incluye :quizId
exports.load = function ( req, res, next, quizId ) {
     models.Quiz.find(quizId).then (
           function (quiz) {
                  if (quizId) {
                     req.quiz = quiz;
                     next();
                  } else {
                     next ( new Error('No existe quizId = ' + quizId) );
                  };
           }
      ).catch( function (error) { next (error); });
};

// GET /quizes
exports.index = function (req, res) {
	models.Quiz.findAll().then(function (quizes) {
		res.render('quizes/index.ejs', { quizes: quizes});
	}).catch (function(error) { next(error); });
};

// GET /quizes/:id
exports.show = function (req, res) {
      res.render('quizes/show', {quiz: req.quiz});
};

// GET de la ruta quizes/answer (versión antigua)
// exports.answer = function (req, res) {

	// Calificar la respuesta emitida por usuario
	//models.Quiz.findAll().success( function (quiz) {
	//	if (req.query.respuesta === quiz[0].respuesta){
      //     res.render('quizes/answer', { respuesta: 'Correcto'} );
	    //} else {
          // res.render('quizes/answer', { respuesta: 'Incorrecto'} );
	    //}
	//})
//};

// GET /quizes/:id/answer (versión sin autoload)
//exports.answer = function (req, res) {

     //models.Quiz.find( req.params.quizId ).then( function (quiz) {

     	// Calificar la respuesta emitida por el usuario
     	//if (req.query.respuesta === quiz.respuesta) {
            //res.render( 'quizes/answer', { quiz: quiz, respuesta: 'Correcto'});
     	//} else {
            //res.render( 'quizes/answer', { quiz: quiz, respuesta: 'Incorrecto'});
     	//}

     //})
//};

// GET /quizes/:id/answer
exports.answer = function (req, res) {
      var resultado = 'Incorrecto';

      if (req.query.respuesta === req.quiz.respuesta){
         resultado = 'Correcto';
      };

      res.render ( 'quizes/answer', { quiz: req.quiz, respuesta: resultado} );
};

// Get de la ruta author/credito
exports.credito = function (req, res){

     // Establecer el nombre del autor de Quiz
     res.render('author/credito', {nombreAutor: 'Juan Quemada Vives'});

};