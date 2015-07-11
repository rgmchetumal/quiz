var models = require ('../models/models.js');

// GET de la ruta quizes/question
exports.question = function (req, res) {

	  // Localizar la primera pregunta y devolverla
	  models.Quiz.findAll().success( function (quiz) {
	  	  res.render ('quizes/question', { pregunta: quiz[0].pregunta  })
	  })
};

// GET de la ruta quizes/answer
exports.answer = function (req, res) {

	// Calificar la respuesta emitida por usuario
	models.Quiz.findAll().success( function (quiz) {
		if (req.query.respuesta === quiz[0].respuesta){
           res.render('quizes/answer', { respuesta: 'Correcto'} );
	    } else {
           res.render('quizes/answer', { respuesta: 'Incorrecto'} );
	    }
	})
};

// Get de la ruta author/credito
exports.credito = function (req, res){

     // Establecer el nombre del autor de Quiz
     res.render('author/credito', {nombreAutor: 'Juan Quemada Vives'});

};