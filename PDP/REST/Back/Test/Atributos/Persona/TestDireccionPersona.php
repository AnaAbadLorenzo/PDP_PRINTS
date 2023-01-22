<?php
include_once './Test/Atributos/FuncionesComunes.php';
include_once './Test/Test.php';
include_once './Test/TiposPruebas.php';


$funcionesComunes = new FuncionesComunes();

class TestDireccionPersona extends Test{
    function testAtributoDireccionPersona() {
        $pruebas = array();
        
        //DIRECCION_PERSONA_VACIO
        $_POST = NULL;
        $_POST['direccion_persona'] = '';
        $resultadoTest = $this->hacerPruebaDireccionPersonaVacio($_POST);
        array_push($pruebas, $resultadoTest);
        
        //DIRECCION_PERSONA_MENOR_QUE_3
        $_POST['direccion_persona'] = 'Av';
        $resultadoTest = $this->hacerPruebaDireccionPersonaMenor3($_POST);
        array_push($pruebas, $resultadoTest);
        
        //DIRECCION_PERSONA_MAYOR_QUE_256
        $_POST['direccion_persona'] = 'AvenidaAvenidaAvenidaAvenidaAvenidaAvenidaAvenidaAvenidaAvenidaAvenidaAvenidaAvenidaAvenidaAvenidaAvenidaAvenidaAvenidaAvenidaAvenidaAvenidaAvenidaAvenidaAvenidaAvenidaAvenidaAvenidaAvenidaAvenidaAvenidaAvenidaAvenidaAvenidaAvenidaAvenidaAvenidaAvenidaAvenidaAvenidaAvenidaAvenidaAvenidaAvenida';
        $resultadoTest = $this->hacerPruebaDireccionPersonaMayor256($_POST);
        array_push($pruebas, $resultadoTest);
        
        //DIRECCION_PERSONA_CONTIENE_CARACTERES_ESPECIALES
        $_POST['direccion_persona'] = 'Avenida';
        $resultadoTest = $this->hacerPruebaDireccionPersonaCaracteresEspeciales($_POST);
        array_push($pruebas, $resultadoTest);

        //DIRECCION_PERSONA_CORRECTO
        $_POST['direccion_persona'] = 'Avenida de las Flores N32';
        $resultadoTest = $this->hacerPruebaDireccionPersonaCorrecto($_POST);
        array_push($pruebas, $resultadoTest);
    
        return $pruebas;

         
    }
        
    function hacerPruebaDireccionPersonaVacio($atributo){
        $funcionesComunes = new FuncionesComunes();
        $resultadoObtenido = $funcionesComunes->comprobarAtributoBlank($atributo['direccion_persona'], 'registro', 'direccion_persona');
        $resultadoEsperado = 'DIRECCION_PERSONA_VACIO'." - ".DIRECCION_PERSONA_VACIO;
        
        return $this->createDatosPruebaAtributos($resultadoObtenido, $resultadoEsperado, VACIO, ERROR, $atributo['direccion_persona'], 'direccion_persona');
        
    }
        
    function hacerPruebaDireccionPersonaMenor3($atributo){
        $funcionesComunes = new FuncionesComunes();
        $resultadoObtenido = $funcionesComunes->comprobarAtributosLongitudMenor($atributo['direccion_persona'], 'registro', 'direccion_persona', 3);
        $resultadoEsperado = 'DIRECCION_PERSONA_MENOR_QUE_3'. " - ".DIRECCION_PERSONA_MENOR_QUE_3;
        
        return $this->createDatosPruebaAtributos($resultadoObtenido, $resultadoEsperado, LONGITUD_MINIMA_ERRONEA, ERROR, $atributo['direccion_persona'], 'direccion_persona');
    }
        
        function hacerPruebaDireccionPersonaMayor256($atributo){
            $funcionesComunes = new FuncionesComunes();
            $resultadoObtenido = $funcionesComunes->comprobarAtributosLongitudMayor($atributo['direccion_persona'], 'registro', 'direccion_persona', 256);
            $resultadoEsperado = 'DIRECCION_PERSONA_MAYOR_QUE_256'." - ".DIRECCION_PERSONA_MAYOR_QUE_256;
        
            return $this->createDatosPruebaAtributos($resultadoObtenido, $resultadoEsperado, LONGITUD_MAXIMA_ERRONEA, ERROR, $atributo['direccion_persona'], 'direccion_persona');
        
        }
    
        function hacerPruebaDireccionPersonaCaracteresEspeciales($atributo){
            $funcionesComunes = new FuncionesComunes();
            $resultadoObtenido = $funcionesComunes->comprobarAtributoCaracteresEspeciales($atributo['direccion_persona'], 'registro', 'direccion_persona');
            $resultadoEsperado = 'DIRECCION_PERSONA_ALFANUMERICO_INCORRECTO'." - ".DIRECCION_PERSONA_ALFANUMERICO_INCORRECTO;
        
            return $this->createDatosPruebaAtributos($resultadoObtenido, $resultadoEsperado, CARACTERES_ESPECIALES, ERROR, $atributo['direccion_persona'], 'direccion_persona');
        }
    
        function hacerPruebaDireccionPersonaCorrecto($atributo){
            $funcionesComunes = new FuncionesComunes();
            $resultadoObtenido = $funcionesComunes->comprobarAtributoCorrectoAlfanumericoEspacios($atributo['direccion_persona']);
            $resultadoEsperado = 'AVANZAR_SIGUIENTE_CAMPO'." - ".AVANZAR_SIGUIENTE_CAMPO;
        
            return $this->createDatosPruebaAtributos($resultadoObtenido, $resultadoEsperado, DIRECCION_PERSONA_OK, ÉXITO,  $atributo['direccion_persona'], 'direccion_persona');
        }

        
}

?>