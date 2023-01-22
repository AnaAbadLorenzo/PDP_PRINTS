<?php
include_once './Test/Atributos/FuncionesComunes.php';
include_once './Test/Test.php';
include_once './Test/TiposPruebas.php';


$funcionesComunes = new FuncionesComunes();

class TestDescripcionAccion extends Test{
    function testAtributoDescripcionAccion() {
        $pruebas = array();
        
        //DESCRIPCION_ACCION_VACIO
        $_POST = NULL;
        $_POST['descripcion_accion'] = '';
        $resultadoTest = $this->hacerPruebaDescripcionAccionVacio($_POST);
        array_push($pruebas, $resultadoTest);
        
        //DESCRIPCION_ACCION_MENOR_QUE_3
        $_POST['descripcion_accion'] = 'de';
        $resultadoTest = $this->hacerPruebaDescripcionAccionMenor3($_POST);
        array_push($pruebas, $resultadoTest);
        
        //DESCRIPCION_ACCION_CONTIENE_CARACTERES_ESPECIALES
        $_POST['descripcion_accion'] = 'Descripcionnnnnnnnnnnn###';
        $resultadoTest = $this->hacerPruebaDescripcionAccionCaracteresEspeciales($_POST);
        array_push($pruebas, $resultadoTest);

        //DESCRIPCION_ACCION_CORRECTO
        $_POST['descripcion_accion'] = 'Esta es la descripcion';
        $resultadoTest = $this->hacerPruebaDescripcionAccionCorrecto($_POST);
        array_push($pruebas, $resultadoTest);
    
        return $pruebas;

         
    }
        
    function hacerPruebaDescripcionAccionVacio($atributo){
        $funcionesComunes = new FuncionesComunes();
        $resultadoObtenido = $funcionesComunes->comprobarAtributoBlank($atributo['descripcion_accion'], 'gestAcciones', 'descripcion_accion');
        $resultadoEsperado = 'DESCRIPCION_ACCION_VACIO'." - ".DESCRIPCION_ACCION_VACIO;
        
        return $this->createDatosPruebaAtributos($resultadoObtenido, $resultadoEsperado, VACIO, ERROR, $atributo['descripcion_accion'], 'descripcion_accion');
        
    }
        
    function hacerPruebaDescripcionAccionMenor3($atributo){
        $funcionesComunes = new FuncionesComunes();
        $resultadoObtenido = $funcionesComunes->comprobarAtributosLongitudMenor($atributo['descripcion_accion'], 'gestAcciones', 'descripcion_accion', 3);
        $resultadoEsperado = 'DESCRIPCION_ACCION_MENOR_QUE_3'. " - ".DESCRIPCION_ACCION_MENOR_QUE_3;
        
        return $this->createDatosPruebaAtributos($resultadoObtenido, $resultadoEsperado, LONGITUD_MINIMA_ERRONEA, ERROR, $atributo['descripcion_accion'], 'descripcion_accion');
    }
  
        function hacerPruebaDescripcionAccionCaracteresEspeciales($atributo){
            $funcionesComunes = new FuncionesComunes();
            $resultadoObtenido = $funcionesComunes->comprobarAtributoCaracteresEspeciales($atributo['descripcion_accion'], 'gestAcciones', 'descripcion_accion');
            $resultadoEsperado = 'DESCRIPCION_ACCION_ALFABETICO_INCORRECTO'." - ".DESCRIPCION_ACCION_ALFABETICO_INCORRECTO;
        
            return $this->createDatosPruebaAtributos($resultadoObtenido, $resultadoEsperado, CARACTERES_ESPECIALES, ERROR, $atributo['descripcion_accion'], 'descripcion_accion');
        }
        
        function hacerPruebaDescripcionAccionCorrecto($atributo){
            $funcionesComunes = new FuncionesComunes();
            $resultadoObtenido = $funcionesComunes->comprobarAtributoCorrectoAlfabetico($atributo['descripcion_accion']);
            $resultadoEsperado = 'AVANZAR_SIGUIENTE_CAMPO'." - ".AVANZAR_SIGUIENTE_CAMPO;
        
            return $this->createDatosPruebaAtributos($resultadoObtenido, $resultadoEsperado, DESCRIPCION_ACCION_OK, ÉXITO,  $atributo['descripcion_accion'], 'descripcion_accion');
        }

        
}

?>