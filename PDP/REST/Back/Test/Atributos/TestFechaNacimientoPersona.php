<?php
include_once './Test/Atributos/FuncionesComunes.php';
include_once './Test/Test.php';
include_once './Test/TiposPruebas.php';


$funcionesComunes = new FuncionesComunes();

class TestFechaNacimientoPersona extends Test{
    function testAtributoFechaNacPersona() {
        $pruebas = array();
        
        //FECHA_NAC_PERSONA_VACIO
        $_POST = NULL;
        $_POST['fecha_nac_persona'] = '';
        $resultadoTest = $this->hacerPruebaFechaNacPersonaVacio($_POST);
        array_push($pruebas, $resultadoTest);
        
        //FECHA_NAC_PERSONA_MENOR_QUE_8
        $_POST['fecha_nac_persona'] = '10/10/';
        $resultadoTest = $this->hacerPruebaFechaNacPersonaMenor10($_POST);
        array_push($pruebas, $resultadoTest);
        
        //FECHA_NAC_PERSONA_MAYOR_QUE_8
        $_POST['fecha_nac_persona'] = '10/10/201010';
        $resultadoTest = $this->hacerPruebaFechaNacPersonaMayor10($_POST);
        array_push($pruebas, $resultadoTest);
        
        //FECHA_NAC_PERSONA_CONTIENE_ENHE
        $_POST['fecha_nac_persona'] = 'ññ/10/2010';
        $resultadoTest = $this->hacerPruebaFechaNacPersonaEnhe($_POST);
        array_push($pruebas, $resultadoTest);
        
        //FECHA_NAC_PERSONA_CONTIENE_ACENTOS
        $_POST['fecha_nac_persona'] = 'áá/10/2010';
        $resultadoTest = $this->hacerPruebaFechaNacPersonaAcentos($_POST);
        array_push($pruebas, $resultadoTest);
        
        //FECHA_NAC_PERSONA_CONTIENE_CARACTERES_ESPECIALES
        $_POST['fecha_nac_persona'] = '##/87/1996';
        $resultadoTest = $this->hacerPruebaFechaNacPersonaCaracteresEspeciales($_POST);
        array_push($pruebas, $resultadoTest);
        
        //FECHA_NAC_PERSONA_CONTIENE_ESPACIOS
        $_POST['fecha_nac_persona'] = '10/ /1985';
        $resultadoTest = $this->hacerPruebaFechaNacPersonaEspacios($_POST);
        array_push($pruebas, $resultadoTest);

        //FECHA_NAC_PERSONA_CORRECTO
        $_POST['fecha_nac_persona'] = '13/12/2000';
        $resultadoTest = $this->hacerPruebaFechaNacPersonaCorrecto($_POST);
        array_push($pruebas, $resultadoTest);
    
        return $pruebas;

         
    }
        
    function hacerPruebaFechaNacPersonaVacio($atributo){
        $funcionesComunes = new FuncionesComunes();
        $resultadoObtenido = $funcionesComunes->comprobarAtributoBlank($atributo['fecha_nac_persona'], 'registro', 'fecha_nac_persona');
        $resultadoEsperado = 'FECHA_NAC_PERSONA_VACIO'." - ".FECHA_NAC_PERSONA_VACIO;
        
        return $this->createDatosPruebaAtributos($resultadoObtenido, $resultadoEsperado, VACIO, ERROR, $atributo['fecha_nac_persona'], 'fecha_nac_persona');
        
    }
        
    function hacerPruebaFechaNacPersonaMenor10($atributo){
        $funcionesComunes = new FuncionesComunes();
        $resultadoObtenido = $funcionesComunes->comprobarAtributosLongitudMenor($atributo['fecha_nac_persona'], 'registro', 'fecha_nac_persona', 10);
        $resultadoEsperado = 'FECHA_NAC_PERSONA_MENOR_QUE_10'. " - ".FECHA_NAC_PERSONA_MENOR_QUE_10;
        
        return $this->createDatosPruebaAtributos($resultadoObtenido, $resultadoEsperado, LONGITUD_MINIMA_ERRONEA, ERROR, $atributo['fecha_nac_persona'], 'fecha_nac_persona');
    }
        
        function hacerPruebaFechaNacPersonaMayor10($atributo){
            $funcionesComunes = new FuncionesComunes();
            $resultadoObtenido = $funcionesComunes->comprobarAtributosLongitudMayor($atributo['fecha_nac_persona'], 'registro', 'fecha_nac_persona', 10);
            $resultadoEsperado = 'FECHA_NAC_PERSONA_MAYOR_QUE_10'." - ".FECHA_NAC_PERSONA_MAYOR_QUE_10;
        
            return $this->createDatosPruebaAtributos($resultadoObtenido, $resultadoEsperado, LONGITUD_MAXIMA_ERRONEA, ERROR, $atributo['fecha_nac_persona'], 'fecha_nac_persona');
        
        }
        
        function hacerPruebaFechaNacPersonaEnhe($atributo){
            $funcionesComunes = new FuncionesComunes();
            $resultadoObtenido = $funcionesComunes->comprobarAtributoEnhe($atributo['fecha_nac_persona'], 'registro', 'fecha_nac_persona');
            $resultadoEsperado = 'FECHA_NAC_PERSONA_FECHA_INCORRECTO'." - ".FECHA_NAC_PERSONA_FECHA_INCORRECTO;
        
            return $this->createDatosPruebaAtributos($resultadoObtenido, $resultadoEsperado, ENHE, ERROR, $atributo['fecha_nac_persona'], 'fecha_nac_persona');
        }
        
        function hacerPruebaFechaNacPersonaAcentos($atributo){
            $funcionesComunes = new FuncionesComunes();
            $resultadoObtenido = $funcionesComunes->comprobarAtributoAcentos($atributo['fecha_nac_persona'], 'registro', 'fecha_nac_persona');
            $resultadoEsperado = 'FECHA_NAC_PERSONA_FECHA_INCORRECTO'." - ".FECHA_NAC_PERSONA_FECHA_INCORRECTO;
        
            return $this->createDatosPruebaAtributos($resultadoObtenido, $resultadoEsperado, ACENTOS, ERROR, $atributo['fecha_nac_persona'], 'fecha_nac_persona');
        }
        
        function hacerPruebaFechaNacPersonaCaracteresEspeciales($atributo){
            $funcionesComunes = new FuncionesComunes();
            $resultadoObtenido = $funcionesComunes->comprobarAtributoCaracteresEspeciales($atributo['fecha_nac_persona'], 'registro', 'fecha_nac_persona');
            $resultadoEsperado = 'FECHA_NAC_PERSONA_FECHA_INCORRECTO'." - ".FECHA_NAC_PERSONA_FECHA_INCORRECTO;
        
            return $this->createDatosPruebaAtributos($resultadoObtenido, $resultadoEsperado, CARACTERES_ESPECIALES, ERROR, $atributo['fecha_nac_persona'], 'fecha_nac_persona');
        }
        
        function hacerPruebaFechaNacPersonaEspacios($atributo){
            $funcionesComunes = new FuncionesComunes();
            $resultadoObtenido = $funcionesComunes->comprobarAtributoEspacios($atributo['fecha_nac_persona'], 'registro', 'fecha_nac_persona');
            $resultadoEsperado = 'FECHA_NAC_PERSONA_FECHA_INCORRECTO'." - ".FECHA_NAC_PERSONA_FECHA_INCORRECTO;
        
            return $this->createDatosPruebaAtributos($resultadoObtenido, $resultadoEsperado, ESPACIOS, ERROR,  $atributo['fecha_nac_persona'], 'fecha_nac_persona');
        }

        function hacerPruebaFechaNacPersonaCorrecto($atributo){
            $funcionesComunes = new FuncionesComunes();
            $resultadoObtenido = $funcionesComunes->comprobarAtributoCorrectoFecha($atributo['fecha_nac_persona']);
            $resultadoEsperado = 'AVANZAR_SIGUIENTE_CAMPO'." - ".AVANZAR_SIGUIENTE_CAMPO;
        
            return $this->createDatosPruebaAtributos($resultadoObtenido, $resultadoEsperado, FECHA_NAC_PERSONA_OK, ÉXITO,  $atributo['fecha_nac_persona'], 'fecha_nac_persona');
        }

        
}

?>