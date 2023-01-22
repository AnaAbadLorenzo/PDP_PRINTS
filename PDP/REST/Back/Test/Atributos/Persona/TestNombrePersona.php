<?php
include_once './Test/Atributos/FuncionesComunes.php';
include_once './Test/Test.php';
include_once './Test/TiposPruebas.php';


$funcionesComunes = new FuncionesComunes();

class TestNombrePersona extends Test{
    function testAtributoNombrePersona() {
        $pruebas = array();
        
        //NOMBRE_PERSONA_VACIO
        $_POST = NULL;
        $_POST['nombre_persona'] = '';
        $resultadoTest = $this->hacerPruebaNombrePersonaVacio($_POST);
        array_push($pruebas, $resultadoTest);
        
        //NOMBRE_PERSONA_MENOR_QUE_3
        $_POST['nombre_persona'] = 'an';
        $resultadoTest = $this->hacerPruebaNombrePersonaMenor3($_POST);
        array_push($pruebas, $resultadoTest);
        
        //NOMBRE_PERSONA_MAYOR_QUE_128
        $_POST['nombre_persona'] = 'Anaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa';
        $resultadoTest = $this->hacerPruebaNombrePersonaMayor128($_POST);
        array_push($pruebas, $resultadoTest);
        
        //NOMBRE_PERSONA_CONTIENE_CARACTERES_ESPECIALES
        $_POST['nombre_persona'] = 'Ana###';
        $resultadoTest = $this->hacerPruebaNombrePersonaCaracteresEspeciales($_POST);
        array_push($pruebas, $resultadoTest);

        //NOMBRE_PERSONA_CORRECTO
        $_POST['nombre_persona'] = 'Ana';
        $resultadoTest = $this->hacerPruebaNombrePersonaCorrecto($_POST);
        array_push($pruebas, $resultadoTest);
    
        return $pruebas;

         
    }
        
    function hacerPruebaNombrePersonaVacio($atributo){
        $funcionesComunes = new FuncionesComunes();
        $resultadoObtenido = $funcionesComunes->comprobarAtributoBlank($atributo['nombre_persona'], 'registro', 'nombre_persona');
        $resultadoEsperado = 'NOMBRE_PERSONA_VACIO'." - ".NOMBRE_PERSONA_VACIO;
        
        return $this->createDatosPruebaAtributos($resultadoObtenido, $resultadoEsperado, VACIO, ERROR, $atributo['nombre_persona'], 'nombre_persona');
        
    }
        
    function hacerPruebaNombrePersonaMenor3($atributo){
        $funcionesComunes = new FuncionesComunes();
        $resultadoObtenido = $funcionesComunes->comprobarAtributosLongitudMenor($atributo['nombre_persona'], 'registro', 'nombre_persona', 3);
        $resultadoEsperado = 'NOMBRE_PERSONA_MENOR_QUE_3'. " - ".NOMBRE_PERSONA_MENOR_QUE_3;
        
        return $this->createDatosPruebaAtributos($resultadoObtenido, $resultadoEsperado, LONGITUD_MINIMA_ERRONEA, ERROR, $atributo['nombre_persona'], 'nombre_persona');
    }
        
        function hacerPruebaNombrePersonaMayor128($atributo){
            $funcionesComunes = new FuncionesComunes();
            $resultadoObtenido = $funcionesComunes->comprobarAtributosLongitudMayor($atributo['nombre_persona'], 'registro', 'nombre_persona', 128);
            $resultadoEsperado = 'NOMBRE_PERSONA_MAYOR_QUE_128'." - ".NOMBRE_PERSONA_MAYOR_QUE_128;
        
            return $this->createDatosPruebaAtributos($resultadoObtenido, $resultadoEsperado, LONGITUD_MAXIMA_ERRONEA, ERROR, $atributo['nombre_persona'], 'nombre_persona');
        
        }
        
        function hacerPruebaNombrePersonaCaracteresEspeciales($atributo){
            $funcionesComunes = new FuncionesComunes();
            $resultadoObtenido = $funcionesComunes->comprobarAtributoCaracteresEspeciales($atributo['nombre_persona'], 'registro', 'nombre_persona');
            $resultadoEsperado = 'NOMBRE_PERSONA_ALFABETICO_INCORRECTO'." - ".NOMBRE_PERSONA_ALFABETICO_INCORRECTO;
        
            return $this->createDatosPruebaAtributos($resultadoObtenido, $resultadoEsperado, CARACTERES_ESPECIALES, ERROR, $atributo['nombre_persona'], 'nombre_persona');
        }
        
        function hacerPruebaNombrePersonaCorrecto($atributo){
            $funcionesComunes = new FuncionesComunes();
            $resultadoObtenido = $funcionesComunes->comprobarAtributoCorrectoAlfabetico($atributo['nombre_persona']);
            $resultadoEsperado = 'AVANZAR_SIGUIENTE_CAMPO'." - ".AVANZAR_SIGUIENTE_CAMPO;
        
            return $this->createDatosPruebaAtributos($resultadoObtenido, $resultadoEsperado, NOMBRE_PERSONA_OK, ÉXITO,  $atributo['nombre_persona'], 'nombre_persona');
        }

        
}

?>