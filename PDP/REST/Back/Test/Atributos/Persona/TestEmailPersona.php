<?php
include_once './Test/Atributos/FuncionesComunes.php';
include_once './Test/Test.php';
include_once './Test/TiposPruebas.php';


$funcionesComunes = new FuncionesComunes();

class TestEmailPersona extends Test{
    function testAtributoEmailPersona() {
        $pruebas = array();
        
        //EMAIL_PERSONA_VACIO
        $_POST = NULL;
        $_POST['email_persona'] = '';
        $resultadoTest = $this->hacerPruebaEmailPersonaVacio($_POST);
        array_push($pruebas, $resultadoTest);
        
        //EMAIL_PERSONA_MENOR_QUE_3
        $_POST['email_persona'] = 'a@';
        $resultadoTest = $this->hacerPruebaEmailPersonaMenor3($_POST);
        array_push($pruebas, $resultadoTest);
        
        //EMAIL_PERSONA_MAYOR_QUE_128
        $_POST['email_persona'] = 'ananananananananananananananananananananananananananaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaanananananananananananananananananananananananananananan@gmail.com';
        $resultadoTest = $this->hacerPruebaEmailPersonaMayor128($_POST);
        array_push($pruebas, $resultadoTest);
        
        //EMAIL_PERSONA_CONTIENE_ENHE
        $_POST['email_persona'] = 'peña@gmail.com';
        $resultadoTest = $this->hacerPruebaEmailPersonaEnhe($_POST);
        array_push($pruebas, $resultadoTest);
        
        //EMAIL_PERSONA_CONTIENE_ACENTOS
        $_POST['email_persona'] = 'aná@gmail.com';
        $resultadoTest = $this->hacerPruebaEmailPersonaAcentos($_POST);
        array_push($pruebas, $resultadoTest);
        
        //EMAIL_PERSONA_CONTIENE_ESPACIOS
        $_POST['email_persona'] = 'ana abad@gmail.com';
        $resultadoTest = $this->hacerPruebaEmailPersonaEspacios($_POST);
        array_push($pruebas, $resultadoTest);

        //DNI_PERSONA_CORRECTO
        $_POST['email_persona'] = 'anaa1312@gmail.com';
        $resultadoTest = $this->hacerPruebaEmailPersonaCorrecto($_POST);
        array_push($pruebas, $resultadoTest);
    
        return $pruebas;
    }
        
    function hacerPruebaEmailPersonaVacio($atributo){
        $funcionesComunes = new FuncionesComunes();
        $resultadoObtenido = $funcionesComunes->comprobarAtributoBlank($atributo['email_persona'], 'registro', 'email_persona');
        $resultadoEsperado = 'EMAIL_PERSONA_VACIO'." - ".EMAIL_PERSONA_VACIO;

        return $this->createDatosPruebaAtributos($resultadoObtenido, $resultadoEsperado, VACIO, ERROR, $atributo['email_persona'], 'email_persona');
        
    }
        
    function hacerPruebaEmailPersonaMenor3($atributo){
        $funcionesComunes = new FuncionesComunes();
        $resultadoObtenido = $funcionesComunes->comprobarAtributosLongitudMenor($atributo['email_persona'], 'registro', 'email_persona', 3);
        $resultadoEsperado = 'EMAIL_PERSONA_MENOR_QUE_3'. " - ".EMAIL_PERSONA_MENOR_QUE_3;
        
        return $this->createDatosPruebaAtributos($resultadoObtenido, $resultadoEsperado, LONGITUD_MINIMA_ERRONEA, ERROR, $atributo['email_persona'], 'email_persona');
    }
        
    function hacerPruebaEmailPersonaMayor128($atributo){
        $funcionesComunes = new FuncionesComunes();
        $resultadoObtenido = $funcionesComunes->comprobarAtributosLongitudMayor($atributo['email_persona'], 'registro', 'email_persona', 128);
        $resultadoEsperado = 'EMAIL_PERSONA_MAYOR_QUE_128'." - ".EMAIL_PERSONA_MAYOR_QUE_128;
        
        return $this->createDatosPruebaAtributos($resultadoObtenido, $resultadoEsperado, LONGITUD_MAXIMA_ERRONEA, ERROR, $atributo['email_persona'], 'email_persona');
        
    }
        
    function hacerPruebaEmailPersonaEnhe($atributo){
        $funcionesComunes = new FuncionesComunes();
        $resultadoObtenido = $funcionesComunes->comprobarAtributoEnhe($atributo['email_persona'], 'registro', 'email_persona');
        $resultadoEsperado = 'EMAIL_PERSONA_EMAIL_INCORRECTO'." - ".EMAIL_PERSONA_EMAIL_INCORRECTO;
        
        return $this->createDatosPruebaAtributos($resultadoObtenido, $resultadoEsperado, ENHE, ERROR, $atributo['email_persona'], 'email_persona');
    }
        
    function hacerPruebaEmailPersonaAcentos($atributo){
        $funcionesComunes = new FuncionesComunes();
        $resultadoObtenido = $funcionesComunes->comprobarAtributoAcentos($atributo['email_persona'], 'registro', 'email_persona');
        $resultadoEsperado = 'EMAIL_PERSONA_EMAIL_INCORRECTO'." - ".EMAIL_PERSONA_EMAIL_INCORRECTO;
        
        return $this->createDatosPruebaAtributos($resultadoObtenido, $resultadoEsperado, ACENTOS, ERROR, $atributo['email_persona'], 'email_persona');
    }
        
    function hacerPruebaEmailPersonaEspacios($atributo){
        $funcionesComunes = new FuncionesComunes();
        $resultadoObtenido = $funcionesComunes->comprobarAtributoEspacios($atributo['email_persona'], 'registro', 'email_persona');
        $resultadoEsperado = 'EMAIL_PERSONA_EMAIL_INCORRECTO'." - ".EMAIL_PERSONA_EMAIL_INCORRECTO;
        
        return $this->createDatosPruebaAtributos($resultadoObtenido, $resultadoEsperado, ESPACIOS, ERROR,  $atributo['email_persona'], 'email_persona');
    }

    function hacerPruebaEmailPersonaCorrecto($atributo){
        $funcionesComunes = new FuncionesComunes();
        $resultadoObtenido = $funcionesComunes->comprobarAtributoCorrectoAlfanumerico($atributo['email_persona']);
        $resultadoEsperado = 'AVANZAR_SIGUIENTE_CAMPO'." - ".AVANZAR_SIGUIENTE_CAMPO;
        
        return $this->createDatosPruebaAtributos($resultadoObtenido, $resultadoEsperado, EMAIL_PERSONA_OK, ÉXITO,  $atributo['email_persona'], 'email_persona');
    }

        
}

?>