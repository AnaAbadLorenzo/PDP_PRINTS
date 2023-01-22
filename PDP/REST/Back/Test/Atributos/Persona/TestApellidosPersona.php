<?php
include_once './Test/Atributos/FuncionesComunes.php';
include_once './Test/Test.php';
include_once './Test/TiposPruebas.php';


$funcionesComunes = new FuncionesComunes();

class TestApellidosPersona extends Test{
    function testAtributoApellidosPersona() {
        $pruebas = array();
        
        //APELLIDOS_PERSONA_VACIO
        $_POST = NULL;
        $_POST['apellidos_persona'] = '';
        $resultadoTest = $this->hacerPruebaApellidosPersonaVacio($_POST);
        array_push($pruebas, $resultadoTest);
        
        //APELLIDOS_PERSONA_MENOR_QUE_3
        $_POST['apellidos_persona'] = 'Go';
        $resultadoTest = $this->hacerPruebaApellidosPersonaMenor3($_POST);
        array_push($pruebas, $resultadoTest);
        
        //APELLIDOS_PERSONA_MAYOR_QUE_128
        $_POST['apellidos_persona'] = 'GonzalezGonzalezGonzalezGonzalezGonzalezGonzalezGonzalezGonzalezGonzalezGonzalezGonzalezGonzalezGonzalezGonzalezGonzalezGonzalezGonzalezGonzalezGonzalezGonzalezGonzalezGonzalezGonzalezGonzalezGonzalezGonzalez';
        $resultadoTest = $this->hacerPruebaApellidosPersonaMayor128($_POST);
        array_push($pruebas, $resultadoTest);
        
        //APELLIDOS_PERSONA_CONTIENE_CARACTERES_ESPECIALES
        $_POST['apellidos_persona'] = 'Gonzalez***';
        $resultadoTest = $this->hacerPruebaApellidosPersonaCaracteresEspeciales($_POST);
        array_push($pruebas, $resultadoTest);

        //APELLIDOS_PERSONA_CORRECTO
        $_POST['apellidos_persona'] = 'Rodríguez González';
        $resultadoTest = $this->hacerPruebaApellidosPersonaCorrecto($_POST);
        array_push($pruebas, $resultadoTest);
    
        return $pruebas;

         
    }
        
    function hacerPruebaApellidosPersonaVacio($atributo){
        $funcionesComunes = new FuncionesComunes();
        $resultadoObtenido = $funcionesComunes->comprobarAtributoBlank($atributo['apellidos_persona'], 'registro', 'apellidos_persona');
        $resultadoEsperado = 'APELLIDOS_PERSONA_VACIO'." - ".APELLIDOS_PERSONA_VACIO;
        
        return $this->createDatosPruebaAtributos($resultadoObtenido, $resultadoEsperado, VACIO, ERROR, $atributo['apellidos_persona'], 'apellidos_persona');
        
    }
        
    function hacerPruebaApellidosPersonaMenor3($atributo){
        $funcionesComunes = new FuncionesComunes();
        $resultadoObtenido = $funcionesComunes->comprobarAtributosLongitudMenor($atributo['apellidos_persona'], 'registro', 'apellidos_persona', 3);
        $resultadoEsperado = 'APELLIDOS_PERSONA_MENOR_QUE_3'. " - ".APELLIDOS_PERSONA_MENOR_QUE_3;
        
        return $this->createDatosPruebaAtributos($resultadoObtenido, $resultadoEsperado, LONGITUD_MINIMA_ERRONEA, ERROR, $atributo['apellidos_persona'], 'apellidos_persona');
    }
        
        function hacerPruebaApellidosPersonaMayor128($atributo){
            $funcionesComunes = new FuncionesComunes();
            $resultadoObtenido = $funcionesComunes->comprobarAtributosLongitudMayor($atributo['apellidos_persona'], 'registro', 'apellidos_persona', 128);
            $resultadoEsperado = 'APELLIDOS_PERSONA_MAYOR_QUE_128'." - ".APELLIDOS_PERSONA_MAYOR_QUE_128;
        
            return $this->createDatosPruebaAtributos($resultadoObtenido, $resultadoEsperado, LONGITUD_MAXIMA_ERRONEA, ERROR, $atributo['apellidos_persona'], 'apellidos_persona');
        
        }
        
        function hacerPruebaApellidosPersonaCaracteresEspeciales($atributo){
            $funcionesComunes = new FuncionesComunes();
            $resultadoObtenido = $funcionesComunes->comprobarAtributoCaracteresEspeciales($atributo['apellidos_persona'], 'registro', 'apellidos_persona');
            $resultadoEsperado = 'APELLIDOS_PERSONA_ALFABETICO_INCORRECTO'." - ".APELLIDOS_PERSONA_ALFABETICO_INCORRECTO;
        
            return $this->createDatosPruebaAtributos($resultadoObtenido, $resultadoEsperado, CARACTERES_ESPECIALES, ERROR, $atributo['apellidos_persona'], 'apellidos_persona');
        }
        
        function hacerPruebaApellidosPersonaCorrecto($atributo){
            $funcionesComunes = new FuncionesComunes();
            $resultadoObtenido = $funcionesComunes->comprobarAtributoCorrectoAlfabetico($atributo['apellidos_persona']);
            $resultadoEsperado = 'AVANZAR_SIGUIENTE_CAMPO'." - ".AVANZAR_SIGUIENTE_CAMPO;
        
            return $this->createDatosPruebaAtributos($resultadoObtenido, $resultadoEsperado, NOMBRE_PERSONA_OK, ÉXITO,  $atributo['apellidos_persona'], 'apellidos_persona');
        }

        
}

?>