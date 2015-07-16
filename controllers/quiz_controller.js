var models = require ('../models/models.js');

// GET de la ruta quizes/question (Versión antigua)
//exports.question = function (req, res) {

//	  // Localizar la primera pregunta y devolverla
//	  models.Quiz.findAll().success( function (quiz) {
//	  	  res.render ('quizes/question', { pregunta: quiz[0].pregunta  })
//	  })
//};

// GET /quizes
exports.index = function (req, res) {
	models.Quiz.findAll().then(function (quizes) {
		res.render('quizes/index.ejs', { quizes: quizes});
	})
};

// GET /quizes/:id
exports.show = function (req, res) {

	models.Quiz.find( req.params.quizId ).then ( function (quiz) { 
           res.render('quizes/show', {quiz: quiz});
	})
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

// GET /quizes/:id/answer
exports.answer = function (req, res) {

     models.Quiz.find( req.params.quizId ).then( function (quiz) {

     	// Calificar la respuesta emitida por el usuario
     	if (req.query.respuesta === quiz.respuesta) {
            res.render( 'quizes/answer', { quiz: quiz, respuesta: 'Correcto'});
     	} else {
            res.render( 'quizes/answer', { quiz: quiz, respuesta: 'Incorrecto'});
     	}

     })
};

// Get de la ruta author/credito
exports.credito = function (req, res){

     // Establecer el nombre del autor de Quiz
     res.render('author/credito', {nombreAutor: 'Juan Quemada Vives'});

};