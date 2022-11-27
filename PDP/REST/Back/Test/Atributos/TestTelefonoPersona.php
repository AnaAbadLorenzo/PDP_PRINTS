<?php
include_once './Test/Atributos/FuncionesComunes.php';
include_once './Test/Test.php';
include_once './Test/TiposPruebas.php';


$funcionesComunes = new FuncionesComunes();

class TestTelefonoPersona extends Test{
    function testAtributoTelefonoPersona() {
        $pruebas = array();
        
        //TELEFONO_PERSONA_VACIO
        $_POST = NULL;
        $_POST['telefono_persona'] = '';
        $resultadoTest = $this->hacerPruebaTelefonoPersonaVacio($_POST);
        array_push($pruebas, $resultadoTest);
        
        //TELEFONO_PERSONA_MENOR_QUE_9
        $_POST['telefono_persona'] = '988';
        $resultadoTest = $this->hacerPruebaTelefonoPersonaMenor9($_POST);
        array_push($pruebas, $resultadoTest);
        
        //TELEFONO_PERSONA_MAYOR_QUE_9
        $_POST['telefono_persona'] = '988747474747';
        $resultadoTest = $this->hacerPruebaTelefonoPersonaMayor9($_POST);
        array_push($pruebas, $resultadoTest);
        
        //TELEFONO_PERSONA_CONTIENE_ENHE
        $_POST['telefono_persona'] = '988ñññññññ';
        $resultadoTest = $this->hacerPruebaTelefonoPersonaEnhe($_POST);
        array_push($pruebas, $resultadoTest);
        
        //TELEFONO_PERSONA_CONTIENE_ACENTOS
        $_POST['telefono_persona'] = 'á98874';
        $resultadoTest = $this->hacerPruebaTelefonoPersonaAcentos($_POST);
        array_push($pruebas, $resultadoTest);
        
        //TELEFONO_PERSONA_CONTIENE_CARACTERES_ESPECIALES
        $_POST['telefono_persona'] = '##98774';
        $resultadoTest = $this->hacerPruebaTelefonoPersonaCaracteresEspeciales($_POST);
        array_push($pruebas, $resultadoTest);
        
        //TELEFONO_PERSONA_CONTIENE_ESPACIOS
        $_POST['telefono_persona'] = '96857485 89';
        $resultadoTest = $this->hacerPruebaTelefonoPersonaEspacios($_POST);
        array_push($pruebas, $resultadoTest);

        //TELEFONO_PERSONA_CORRECTO
        $_POST['telefono_persona'] = '988526352';
        $resultadoTest = $this->hacerPruebaTelefonoPersonaCorrecto($_POST);
        array_push($pruebas, $resultadoTest);
    
        return $pruebas;
    }
        
    function hacerPruebaTelefonoPersonaVacio($atributo){
        $funcionesComunes = new FuncionesComunes();
        $resultadoObtenido = $funcionesComunes->comprobarAtributoBlank($atributo['telefono_persona'], 'registro', 'telefono_persona');
        $resultadoEsperado = 'TELEFONO_PERSONA_VACIO'." - ".TELEFONO_PERSONA_VACIO;

        return $this->createDatosPruebaAtributos($resultadoObtenido, $resultadoEsperado, VACIO, ERROR, $atributo['telefono_persona'], 'telefono_persona');
        
    }
        
    function hacerPruebaTelefonoPersonaMenor9($atributo){
        $funcionesComunes = new FuncionesComunes();
        $resultadoObtenido = $funcionesComunes->comprobarAtributosLongitudMenor($atributo['telefono_persona'], 'registro', 'telefono_persona', 9);
        $resultadoEsperado = 'TELEFONO_PERSONA_MENOR_QUE_9'. " - ".TELEFONO_PERSONA_MENOR_QUE_9;
        
        return $this->createDatosPruebaAtributos($resultadoObtenido, $resultadoEsperado, LONGITUD_MINIMA_ERRONEA, ERROR, $atributo['telefono_persona'], 'telefono_persona');
    }
        
    function hacerPruebaTelefonoPersonaMayor9($atributo){
        $funcionesComunes = new FuncionesComunes();
        $resultadoObtenido = $funcionesComunes->comprobarAtributosLongitudMayor($atributo['telefono_persona'], 'registro', 'telefono_persona', 9);
        $resultadoEsperado = 'TELEFONO_PERSONA_MAYOR_QUE_9'." - ".TELEFONO_PERSONA_MAYOR_QUE_9;
        
        return $this->createDatosPruebaAtributos($resultadoObtenido, $resultadoEsperado, LONGITUD_MAXIMA_ERRONEA, ERROR, $atributo['telefono_persona'], 'telefono_persona');
        
    }
        
    function hacerPruebaTelefonoPersonaEnhe($atributo){
        $funcionesComunes = new FuncionesComunes();
        $resultadoObtenido = $funcionesComunes->comprobarAtributoEnhe($atributo['telefono_persona'], 'registro', 'telefono_persona');
        $resultadoEsperado = 'TELEFONO_PERSONA_NUMERICO_INCORRECTO'." - ".TELEFONO_PERSONA_NUMERICO_INCORRECTO;
        
        return $this->createDatosPruebaAtributos($resultadoObtenido, $resultadoEsperado, ENHE, ERROR, $atributo['telefono_persona'], 'telefono_persona');
    }
        
    function hacerPruebaTelefonoPersonaAcentos($atributo){
        $funcionesComunes = new FuncionesComunes();
        $resultadoObtenido = $funcionesComunes->comprobarAtributoAcentos($atributo['telefono_persona'], 'registro', 'telefono_persona');
        $resultadoEsperado = 'TELEFONO_PERSONA_NUMERICO_INCORRECTO'." - ".TELEFONO_PERSONA_NUMERICO_INCORRECTO;
        
        return $this->createDatosPruebaAtributos($resultadoObtenido, $resultadoEsperado, ACENTOS, ERROR, $atributo['telefono_persona'], 'telefono_persona');
    }
        
    function hacerPruebaTelefonoPersonaCaracteresEspeciales($atributo){
        $funcionesComunes = new FuncionesComunes();
        $resultadoObtenido = $funcionesComunes->comprobarAtributoCaracteresEspeciales($atributo['telefono_persona'], 'registro', 'telefono_persona');
        $resultadoEsperado = 'TELEFONO_PERSONA_NUMERICO_INCORRECTO'." - ".TELEFONO_PERSONA_NUMERICO_INCORRECTO;
        
        return $this->createDatosPruebaAtributos($resultadoObtenido, $resultadoEsperado, CARACTERES_ESPECIALES, ERROR, $atributo['telefono_persona'], 'telefono_persona');
    }
        
    function hacerPruebaTelefonoPersonaEspacios($atributo){
        $funcionesComunes = new FuncionesComunes();
        $resultadoObtenido = $funcionesComunes->comprobarAtributoEspacios($atributo['telefono_persona'], 'registro', 'telefono_persona');
        $resultadoEsperado = 'TELEFONO_PERSONA_NUMERICO_INCORRECTO'." - ".TELEFONO_PERSONA_NUMERICO_INCORRECTO;
        
        return $this->createDatosPruebaAtributos($resultadoObtenido, $resultadoEsperado, ESPACIOS, ERROR,  $atributo['telefono_persona'], 'telefono_persona');
    }

    function hacerPruebaTelefonoPersonaCorrecto($atributo){
        $funcionesComunes = new FuncionesComunes();
        $resultadoObtenido = $funcionesComunes->comprobarAtributoCorrectoNumerico($atributo['telefono_persona']);
        $resultadoEsperado = 'AVANZAR_SIGUIENTE_CAMPO'." - ".AVANZAR_SIGUIENTE_CAMPO;
        
        return $this->createDatosPruebaAtributos($resultadoObtenido, $resultadoEsperado, TELEFONO_PERSONA_OK, ÉXITO,  $atributo['telefono_persona'], 'telefono_persona');
    }

        
}

?>