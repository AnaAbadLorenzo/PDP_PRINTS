<?php

include_once './Test/Atributos/Rol/TestNombreRol.php';
include_once './Test/Atributos/Rol/TestDescripcionRol.php';
include_once './Test/Accion/TestGestionRoles.php';
include_once './Servicios/Test/TestGestionRolesService.php';

class TestGestionRolesServiceImpl implements TestGestionRolesService {

    private $testNombreRol;
    private $testDescripcionRol;
    private $testRol;

    function __construct()
    {
        $this->testNombreRol = new TestNombreRol();
        $this->testDescripcionRol = new TestDescripcionRol();
        $this->testRol = new TestGestionRoles();
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

    function testAccionGestionRoles(){
        $respuesta = '';
        $respuesta = $this->testRol->testRolesGestionRoles();

        if(empty($respuesta)){
            $respuesta = 'TEST_FALLIDOS';
        }
        return $respuesta;
    }
}
?>