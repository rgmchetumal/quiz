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

// GET /quizes?search=texto_a_buscar
exports.index = function (req, res) {

  if (req.query.search === undefined) {

	    models.Quiz.findAll().then(function (quizes) {
		        res.render('quizes/index.ejs', { quizes: quizes, errors: []});
	    }).catch (function(error) { next(error); });
      
  } else {

      // Eliminar los espacios a la izquierda y a la derecha del patrón de búsqueda
      var patronBusqueda = req.query.search.trim();

      // Sustituir los espacios en blanco, interiores, por '%'
      patronBusqueda = '%' + patronBusqueda + '%';
      patronBusqueda = patronBusqueda.replace (/\s+/g, '%');

      //Convertir a mayúsculas el criterio de búsqueda
      patronBusqueda = patronBusqueda.toUpperCase();

      // Mostrar el valor del patrón de búsqueda
      // console.log('************* El patrón de búsqueda vale ************* *' + patronBusqueda + '*');

      // Localización de las preguntas que se ajustan al patrón de búsqueda
      models.Quiz.findAll({where: [ "upper(pregunta) like ?", patronBusqueda], order: 'pregunta ASC'}).then(function (quizes) {
            res.render('quizes/index.ejs', { quizes: quizes, errors: []});
      }).catch (function(error) { next(error); });
  }

};

// GET /quizes/:id
exports.show = function (req, res) {
      res.render('quizes/show', {quiz: req.quiz, errors: []});
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

      res.render ( 'quizes/answer', { quiz: req.quiz, respuesta: resultado, errors: []} );
};

// GET /quizes/new
exports.new = function(req, res){
  var quiz = models.Quiz.build(  // crea objeto quiz
    {pregunta: "Pregunta", respuesta: "Respuesta"}
  );

  res.render('quizes/new', {quiz: quiz, errors: []});
};

// POST /quizes/create
exports.create = function(req, res) {
  var quiz = models.Quiz.build(req.body.quiz);

  quiz
  .validate()
  .then(
    function(err) {
      if (err) {
        res.render('quizes/new', {quiz: quiz, errors: err.errors});
      } else {
        quiz  // save: guarda en DB campos y pregunta y respuesta de quiz
        .save({fields: ["pregunta", "respuesta"]})
        .then( function(){ res.redirect('/quizes')})
      }   // res.redirect: Redirección HTTP a lista de preguntas
    }
  );
};

// Get /quizes/:id/edit
exports.edit = function (req, res) {

     // autoload de instancia quiz
     var quiz = req.quiz;

     res.render ('quizes/edit', { quiz: quiz, errors: []});
};

// PUT /quizes/:id
exports.update = function (req, res) {
     req.quiz.pregunta  = req.body.quiz.pregunta;
     req.quiz.respuesta = req.body.quiz.respuesta;

     req.quiz
     .validate()
     .then (
            function (err) {
                  if (err) {
                      res.render('quizes/edit', { quiz: req.quiz, errors: err.errors });
                  } else {
                      
                      req.quiz // save: guarda campos pregunta y respuesta en base de datos
                      .save( {fields: ["pregunta", "respuesta"]} )
                      .then ( function () { res.redirect ('/quizes'); });
                  } // Redirección HTTP a lista de preguntas (URL relativo)
            }
      );
};

// DELETE /quizes/:id
exports.destroy = function (req, res) {

  req.quiz.destroy().then ( function() {
       res.redirect('/quizes');
  }).catch (function (error) { next(error)});

};


// Get de la ruta author/credito
exports.credito = function (req, res){

     // Establecer el nombre del autor de Quiz
     res.render('author/credito', {nombreAutor: 'Juan Quemada Vives', errors: []});

};