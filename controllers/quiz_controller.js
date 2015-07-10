// GET de la ruta quizes/question
exports.question = function (req, res) {
      // Establer contenido de la pregunta de la página de preguntas
      res.render( 'quizes/question', { pregunta: '¿Capital de Italia?' });
};

// GET de la ruta quizes/answer
exports.answer = function (req, res) {
	// Calificar la respuesta emitida por usuario
	if (req.query.respuesta === 'Roma'){
         res.render('quizes/answer', { respuesta: 'Correcto'} );
	} else {
         res.render('quizes/answer', { respuesta: 'Incorrecto'} );
	};

};

// Get de la ruta author/credito
exports.credito = function (req, res){

	// Establecer el nombre del autor de Quiz
	res.render('author/credito', {nombreAutor: 'Juan Quemada Vives'});

};