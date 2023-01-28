<?php

include_once './Test/Atributos/Funcionalidad/TestNombreFuncionalidad.php';
include_once './Test/Atributos/Funcionalidad/TestDescripcionFuncionalidad.php';
include_once './Test/Accion/TestGestionFuncionalidades.php';
include_once './Servicios/Test/TestGestionFuncionalidadesService.php';

class TestGestionFuncionalidadesServiceImpl implements TestGestionFuncionalidadesService {

    private $testNombreFuncionalidad;
    private $testDescripcionFuncionalidad;
    private $testFuncionalidad;

    function __construct()
    {
        $this->testNombreFuncionalidad = new TestNombreFuncionalidad();
        $this->testDescripcionFuncionalidad = new TestDescripcionFuncionalidad();
        $this->testFuncionalidad = new TestGestionFuncionalidades();
    }
    function testAtributoNombreFuncionalidad() {
        $respuesta = '';
        $respuesta = $this->testNombreFuncionalidad->testAtributoNombreFuncionalidad();

        if(empty($respuesta)){
           $respuesta = 'TEST_FALLIDOS';
        }
        return $respuesta;
    }

    function testAtributoDescripcionFuncionalidad(){
        $respuesta = '';
        $respuesta = $this->testDescripcionFuncionalidad->testAtributoDescripcionFuncionalidad();

        if(empty($respuesta)){
            $respuesta = 'TEST_FALLIDOS';
        }
        return $respuesta;
    }

    function testAccionGestionFuncionalidades(){
        $respuesta = '';
        $respuesta = $this->testFuncionalidad->testFuncionalidadesGestionFuncionalidad();

        if(empty($respuesta)){
            $respuesta = 'TEST_FALLIDOS';
        }
        return $respuesta;
    }
}
?>