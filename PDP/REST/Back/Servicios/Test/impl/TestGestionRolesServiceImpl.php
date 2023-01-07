<?php

include_once './Test/Atributos/TestNombreRol.php';
include_once './Test/Atributos/TestDescripcionRol.php';
include_once './Test/Accion/TestLogin.php';
include_once './Servicios/Test/TestGestionRolesService.php';

class TestGestionRolesServiceImpl implements TestGestionRolesService {

    private $testNombreRol;
    private $testDescripcionRol;
    private $testRol;

    function __construct()
    {
        $this->testNombreRol = new TestNombreRol();
        $this->testDescripcionRol = new TestDescripcionRol();
    }
    function testAtributoNombreRol() {
        $respuesta = '';
        $respuesta = $this->testNombreRol->testAtributoNombreRol();

        if(empty($respuesta)){
           $respuesta = 'TEST_FALLIDOS';
        }
        return $respuesta;
    }

    function testAtributoDescripcionRol(){
        $respuesta = '';
        $respuesta = $this->testDescripcionRol->testAtributoDescripcionRol();

        if(empty($respuesta)){
            $respuesta = 'TEST_FALLIDOS';
        }
        return $respuesta;
    }
}
?>