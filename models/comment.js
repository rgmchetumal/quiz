// Definición del modelo de comment con Definición
module.exports = function (sequelize, DataTypes) {
       
      return sequelize.define (

           'Comment',
           {

           	  texto: {
           	  	       type: DataTypes.STRING,
           	  	       validate: { notEmpty: { msg: "-> Falta comentario"}}
           	  }
           }
     
      );

};