<?php
include_once './Test/Atributos/FuncionesComunes.php';
include_once './Test/Test.php';
include_once './Test/TiposPruebas.php';


$funcionesComunes = new FuncionesComunes();

class TestDescripcionFuncionalidad extends Test{
    function testAtributoDescripcionFuncionalidad() {
        $pruebas = array();
        
        //DESCRIPCION_FUNCIONALIDAD_VACIO
        $_POST = NULL;
        $_POST['descripcion_funcionalidad'] = '';
        $resultadoTest = $this->hacerPruebaDescripcionFuncionalidadVacio($_POST);
        array_push($pruebas, $resultadoTest);
        
        //DESCRIPCION_FUNCIONALIDAD_MENOR_QUE_3
        $_POST['descripcion_funcionalidad'] = 'de';
        $resultadoTest = $this->hacerPruebaDescripcionFuncionalidadMenor3($_POST);
        array_push($pruebas, $resultadoTest);
        
        //DESCRIPCION_FUNCIONALIDAD_CONTIENE_CARACTERES_ESPECIALES
        $_POST['descripcion_funcionalidad'] = 'Descripcionnnnnnnnnnnn###';
        $resultadoTest = $this->hacerPruebaDescripcionFuncionalidadCaracteresEspeciales($_POST);
        array_push($pruebas, $resultadoTest);

        //DESCRIPCION_FUNCIONALIDAD_CORRECTO
        $_POST['descripcion_funcionalidad'] = 'Esta es la descripcion';
        $resultadoTest = $this->hacerPruebaDescripcionFuncionalidadCorrecto($_POST);
        array_push($pruebas, $resultadoTest);
    
        return $pruebas;

         
    }
        
    function hacerPruebaDescripcionFuncionalidadVacio($atributo){
        $funcionesComunes = new FuncionesComunes();
        $resultadoObtenido = $funcionesComunes->comprobarAtributoBlank($atributo['descripcion_funcionalidad'], 'gestFuncionalidades', 'descripcion_funcionalidad');
        $resultadoEsperado = 'DESCRIPCION_FUNCIONALIDAD_VACIO'." - ".DESCRIPCION_FUNCIONALIDAD_VACIO;
        
        return $this->createDatosPruebaAtributos($resultadoObtenido, $resultadoEsperado, VACIO, ERROR, $atributo['descripcion_funcionalidad'], 'descripcion_funcionalidad');
        
    }
        
    function hacerPruebaDescripcionFuncionalidadMenor3($atributo){
        $funcionesComunes = new FuncionesComunes();
        $resultadoObtenido = $funcionesComunes->comprobarAtributosLongitudMenor($atributo['descripcion_funcionalidad'], 'gestFuncionalidades', 'descripcion_funcionalidad', 3);
        $resultadoEsperado = 'DESCRIPCION_FUNCIONALIDAD_MENOR_QUE_3'. " - ".DESCRIPCION_FUNCIONALIDAD_MENOR_QUE_3;
        
        return $this->createDatosPruebaAtributos($resultadoObtenido, $resultadoEsperado, LONGITUD_MINIMA_ERRONEA, ERROR, $atributo['descripcion_funcionalidad'], 'descripcion_funcionalidad');
    }
  
        function hacerPruebaDescripcionFuncionalidadCaracteresEspeciales($atributo){
            $funcionesComunes = new FuncionesComunes();
            $resultadoObtenido = $funcionesComunes->comprobarAtributoCaracteresEspeciales($atributo['descripcion_funcionalidad'], 'gestFuncionalidades', 'descripcion_funcionalidad');
            $resultadoEsperado = 'DESCRIPCION_FUNCIONALIDAD_ALFABETICO_INCORRECTO'." - ".DESCRIPCION_FUNCIONALIDAD_ALFABETICO_INCORRECTO;
        
            return $this->createDatosPruebaAtributos($resultadoObtenido, $resultadoEsperado, CARACTERES_ESPECIALES, ERROR, $atributo['descripcion_funcionalidad'], 'descripcion_funcionalidad');
        }
        
        function hacerPruebaDescripcionFuncionalidadCorrecto($atributo){
            $funcionesComunes = new FuncionesComunes();
            $resultadoObtenido = $funcionesComunes->comprobarAtributoCorrectoAlfabetico($atributo['descripcion_funcionalidad']);
            $resultadoEsperado = 'AVANZAR_SIGUIENTE_CAMPO'." - ".AVANZAR_SIGUIENTE_CAMPO;
        
            return $this->createDatosPruebaAtributos($resultadoObtenido, $resultadoEsperado, DESCRIPCION_FUNCIONALIDAD_OK, ÉXITO,  $atributo['descripcion_funcionalidad'], 'descripcion_funcionalidad');
        }

        
}

?>