<?php
include_once './Test/Atributos/FuncionesComunes.php';
include_once './Test/Test.php';
include_once './Test/TiposPruebas.php';


$funcionesComunes = new FuncionesComunes();

class TestDNIPersona extends Test{
    function testAtributoDNIPersona() {
        $pruebas = array();
        
        //DNI_PERSONA_VACIO
        $_POST = NULL;
        $_POST['dni_persona'] = '';
        $resultadoTest = $this->hacerPruebaDNIPersonaVacio($_POST);
        array_push($pruebas, $resultadoTest);
        
        //DNI_PERSONA_MENOR_QUE_9
        $_POST['dni_persona'] = '451463';
        $resultadoTest = $this->hacerPruebaDNIPersonaMenor9($_POST);
        array_push($pruebas, $resultadoTest);
        
        //DNI_PERSONA_MAYOR_QUE_9
        $_POST['dni_persona'] = '74859685PP';
        $resultadoTest = $this->hacerPruebaDNIPersonaMayor9($_POST);
        array_push($pruebas, $resultadoTest);
        
        //DNI_PERSONA_CONTIENE_ENHE
        $_POST['dni_persona'] = '74125896Ñ';
        $resultadoTest = $this->hacerPruebaDNIPersonaEnhe($_POST);
        array_push($pruebas, $resultadoTest);
        
        //DNI_PERSONA_CONTIENE_ACENTOS
        $_POST['dni_persona'] = '45146321ó';
        $resultadoTest = $this->hacerPruebaDNIPersonaAcentos($_POST);
        array_push($pruebas, $resultadoTest);
        
        //DNI_PERSONA_CONTIENE_CARACTERES_ESPECIALES
        $_POST['dni_persona'] = '##14857P';
        $resultadoTest = $this->hacerPruebaDNIPersonaCaracteresEspeciales($_POST);
        array_push($pruebas, $resultadoTest);
        
        //DNI_PERSONA_CONTIENE_ESPACIOS
        $_POST['dni_persona'] = '96857485 L';
        $resultadoTest = $this->hacerPruebaDNIPersonaEspacios($_POST);
        array_push($pruebas, $resultadoTest);

        //DNI_PERSONA_CORRECTO
        $_POST['dni_persona'] = '85968574L';
        $resultadoTest = $this->hacerPruebaDNIPersonaCorrecto($_POST);
        array_push($pruebas, $resultadoTest);
    
        return $pruebas;
    }
        
    function hacerPruebaDNIPersonaVacio($atributo){
        $funcionesComunes = new FuncionesComunes();
        $resultadoObtenido = $funcionesComunes->comprobarAtributoBlank($atributo['dni_persona'], 'registro', 'dni_persona');
        $resultadoEsperado = 'DNI_PERSONA_VACIO'." - ".DNI_PERSONA_VACIO;

        return $this->createDatosPruebaAtributos($resultadoObtenido, $resultadoEsperado, VACIO, ERROR, $atributo['dni_persona'], 'dni_persona');
        
    }
        
    function hacerPruebaDNIPersonaMenor9($atributo){
        $funcionesComunes = new FuncionesComunes();
        $resultadoObtenido = $funcionesComunes->comprobarAtributosLongitudMenor($atributo['dni_persona'], 'registro', 'dni_persona', 9);
        $resultadoEsperado = 'DNI_PERSONA_MENOR_QUE_9'. " - ".DNI_PERSONA_MENOR_QUE_9;
        
        return $this->createDatosPruebaAtributos($resultadoObtenido, $resultadoEsperado, LONGITUD_MINIMA_ERRONEA, ERROR, $atributo['dni_persona'], 'dni_persona');
    }
        
    function hacerPruebaDNIPersonaMayor9($atributo){
        $funcionesComunes = new FuncionesComunes();
        $resultadoObtenido = $funcionesComunes->comprobarAtributosLongitudMayor($atributo['dni_persona'], 'registro', 'dni_persona', 9);
        $resultadoEsperado = 'DNI_PERSONA_MAYOR_QUE_9'." - ".DNI_PERSONA_MAYOR_QUE_9;
        
        return $this->createDatosPruebaAtributos($resultadoObtenido, $resultadoEsperado, LONGITUD_MAXIMA_ERRONEA, ERROR, $atributo['dni_persona'], 'dni_persona');
        
    }
        
    function hacerPruebaDNIPersonaEnhe($atributo){
        $funcionesComunes = new FuncionesComunes();
        $resultadoObtenido = $funcionesComunes->comprobarAtributoEnhe($atributo['dni_persona'], 'registro', 'dni_persona');
        $resultadoEsperado = 'DNI_PERSONA_ALFANUMERICO_INCORRECTO'." - ".DNI_PERSONA_ALFANUMERICO_INCORRECTO;
        
        return $this->createDatosPruebaAtributos($resultadoObtenido, $resultadoEsperado, ENHE, ERROR, $atributo['dni_persona'], 'dni_persona');
    }
        
    function hacerPruebaDNIPersonaAcentos($atributo){
        $funcionesComunes = new FuncionesComunes();
        $resultadoObtenido = $funcionesComunes->comprobarAtributoAcentos($atributo['dni_persona'], 'registro', 'dni_persona');
        $resultadoEsperado = 'DNI_PERSONA_ALFANUMERICO_INCORRECTO'." - ".DNI_PERSONA_ALFANUMERICO_INCORRECTO;
        
        return $this->createDatosPruebaAtributos($resultadoObtenido, $resultadoEsperado, ACENTOS, ERROR, $atributo['dni_persona'], 'dni_persona');
    }
        
    function hacerPruebaDNIPersonaCaracteresEspeciales($atributo){
        $funcionesComunes = new FuncionesComunes();
        $resultadoObtenido = $funcionesComunes->comprobarAtributoCaracteresEspeciales($atributo['dni_persona'], 'registro', 'dni_persona');
        $resultadoEsperado = 'DNI_PERSONA_ALFANUMERICO_INCORRECTO'." - ".DNI_PERSONA_ALFANUMERICO_INCORRECTO;
        
        return $this->createDatosPruebaAtributos($resultadoObtenido, $resultadoEsperado, CARACTERES_ESPECIALES, ERROR, $atributo['dni_persona'], 'dni_persona');
    }
        
    function hacerPruebaDNIPersonaEspacios($atributo){
        $funcionesComunes = new FuncionesComunes();
        $resultadoObtenido = $funcionesComunes->comprobarAtributoEspacios($atributo['dni_persona'], 'registro', 'dni_persona');
        $resultadoEsperado = 'DNI_PERSONA_ALFANUMERICO_INCORRECTO'." - ".DNI_PERSONA_ALFANUMERICO_INCORRECTO;
        
        return $this->createDatosPruebaAtributos($resultadoObtenido, $resultadoEsperado, ESPACIOS, ERROR,  $atributo['dni_persona'], 'dni_persona');
    }

    function hacerPruebaDNIPersonaCorrecto($atributo){
        $funcionesComunes = new FuncionesComunes();
        $resultadoObtenido = $funcionesComunes->comprobarAtributoCorrectoAlfanumerico($atributo['dni_persona']);
        $resultadoEsperado = 'AVANZAR_SIGUIENTE_CAMPO'." - ".AVANZAR_SIGUIENTE_CAMPO;
        
        return $this->createDatosPruebaAtributos($resultadoObtenido, $resultadoEsperado, DNI_PERSONA_OK, ÉXITO,  $atributo['dni_persona'], 'dni_persona');
    }

        
}

?>