<?php

include_once './Test/Atributos/Accion/TestNombreAccion.php';
include_once './Test/Atributos/Accion/TestDescripcionAccion.php';
include_once './Test/Accion/TestGestionAcciones.php';
include_once './Servicios/Test/TestGestionAccionesService.php';

class TestGestionAccionesServiceImpl implements TestGestionAccionesService {

    private $testNombreAccion;
    private $testDescripcionAccion;
    private $testAccion;

    function __construct()
    {
        $this->testNombreAccion = new TestNombreAccion();
        $this->testDescripcionAccion = new TestDescripcionAccion();
        $this->testAccion = new TestGestionAcciones();

    }
    function testAtributoNombreAccion() {
        $respuesta = '';
        $respuesta = $this->testNombreAccion->testAtributoNombreAccion();

        if(empty($respuesta)){
           $respuesta = 'TEST_FALLIDOS';
        }
        return $respuesta;
    }

    function testAtributoDescripcionAccion(){
        $respuesta = '';
        $respuesta = $this->testDescripcionAccion->testAtributoDescripcionAccion();

        if(empty($respuesta)){
            $respuesta = 'TEST_FALLIDOS';
        }
        return $respuesta;
    }

    function testAccionGestionAcciones(){
        $respuesta = '';
        $respuesta = $this->testAccion->testAccionesGestionAcciones();

        if(empty($respuesta)){
            $respuesta = 'TEST_FALLIDOS';
        }
        return $respuesta;
    }
}
?>