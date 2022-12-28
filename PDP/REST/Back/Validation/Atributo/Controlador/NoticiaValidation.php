<?php

include_once './Validation/ValidacionesBase.php';
include_once './Validation/ValidacionesFormato.php';
include_once './Validation/Atributo/Atributos/NoticiaAtributos.php';
include_once './Validation/Accion/NoticiaAccion.php';

class NoticiaValidation extends ValidacionesBase {

    public $respuesta_formato;
    public $respuesta_accion;

    function validarAdd() {

        $noticia_validation_formato = new NoticiaAtributos;
        $noticia_validation_accion = new NoticiaAccion;

        $atributos_validacion = array('titulo_noticia', 'contenido_noticia', 'fecha_noticia');
        $atributos = $this -> recogerValoresAtributosPeticion($atributos_validacion);

        $noticia_validation_formato -> validarAtributosAdd($atributos);
        $this -> respuesta_formato = $noticia_validation_formato -> respuesta;

        $this -> respuesta_accion = $noticia_validation_accion -> comprobarAddNoticia($atributos);

    }

    function validarEdit() {

        $noticia_validation_formato = new NoticiaAtributos;
        $noticia_validation_accion = new NoticiaAccion;

        $atributos_validacion = array('id_noticia', 'titulo_noticia', 'contenido_noticia', 'fecha_noticia');
        $atributos = $this -> recogerValoresAtributosPeticion($atributos_validacion);

        $noticia_validation_formato -> validarAtributosEdit($atributos);
        $this -> respuesta_formato = $noticia_validation_formato -> respuesta;

        $this -> respuesta_accion = $noticia_validation_accion -> comprobarEditNoticia($atributos);

    }

    function validarDelete() {

        $noticia_validation_formato = new NoticiaAtributos;
        $noticia_validation_accion = new NoticiaAccion;

        $atributos_validacion = array('id_noticia');
        $atributos = $this -> recogerValoresAtributosPeticion($atributos_validacion);

        $noticia_validation_formato -> validarAtributosDelete($atributos);
        $this -> respuesta_formato = $noticia_validation_formato -> respuesta;

        $this -> respuesta_accion = $noticia_validation_accion -> comprobarDeleteNoticia($atributos);

    }

    function validarSearch()  {

        $noticia_validation_formato = new NoticiaAtributos();

        $atributos_validacion = array('id_noticia', 'titulo_noticia', 'contenido_noticia', 'fecha_noticia');
        $atributos = $this -> recogerValoresAtributosPeticion($atributos_validacion);
        
        $noticia_validation_formato -> validarAtributosSearch($atributos);
        $this -> respuesta_formato = $noticia_validation_formato -> respuesta;

    }

}

?>