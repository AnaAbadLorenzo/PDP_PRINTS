<?php

include_once './Test/Atributos/TestNombreFuncionalidad.php';
include_once './Test/Atributos/TestDescripcionFuncionalidad.php';
include_once './Test/Accion/TestLogin.php';
include_once './Servicios/Test/TestGestionFuncionalidadesService.php';

class TestGestionFuncionalidadesServiceImpl implements TestGestionFuncionalidadesService {

    private $testNombreFuncionalidad;
    private $testDescripcionFuncionalidad;
    private $testFuncionalidad;

    function __construct()
    {
        $this->testNombreFuncionalidad = new TestNombreFuncionalidad();
        $this->testDescripcionFuncionalidad = new TestDescripcionFuncionalidad();
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
}
?>