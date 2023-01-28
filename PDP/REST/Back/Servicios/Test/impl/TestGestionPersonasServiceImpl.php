<?php

include_once './Test/Atributos/Persona/TestDniPersona.php';
include_once './Test/Atributos/Persona/TestNombrePersona.php';
include_once './Test/Atributos/Persona/TestApellidosPersona.php';
include_once './Test/Atributos/Persona/TestFechaNacimientoPersona.php';
include_once './Test/Atributos/Persona/TestDireccionPersona.php';
include_once './Test/Atributos/Persona/TestEmailPersona.php';
include_once './Test/Atributos/Persona/TestTelefonoPersona.php';
include_once './Test/Accion/TestGestionPersonas.php';
include_once './Servicios/Test/TestGestionPersonasService.php';

class TestGestionPersonasServiceImpl implements TestGestionPersonasService {

    private $testDniPersona;
    private $testNombrePersona;
    private $testApellidosPersona;
    private $testFechaNacimientoPersona;
    private $testDireccionPersona;
    private $testEmailPersona;
    private $testTelefonoPersona;
    private $testPersona;

    function __construct()
    {
        $this->testDniPersona = new TestDNIPersona();
        $this->testNombrePersona = new TestNombrePersona();
        $this->testApellidosPersona = new TestApellidosPersona();
        $this->testFechaNacimientoPersona = new TestFechaNacimientoPersona();
        $this->testDireccionPersona = new TestDireccionPersona();
        $this->testEmailPersona = new TestEmailPersona();
        $this->testTelefonoPersona = new TestTelefonoPersona();
        $this->testPersona = new TestGestionPersonas();
    }
    function testAtributoDniPersona() {
        $respuesta = '';
        $respuesta = $this->testDniPersona->testAtributoDniPersona();

        if(empty($respuesta)){
           $respuesta = 'TEST_FALLIDOS';
        }
        return $respuesta;
    }

    function testAtributoNombrePersona() {
        $respuesta = '';
        $respuesta = $this->testNombrePersona->testAtributoNombrePersona();

        if(empty($respuesta)){
           $respuesta = 'TEST_FALLIDOS';
        }
        return $respuesta;
    }

    function testAtributoApellidosPersona() {
        $respuesta = '';
        $respuesta = $this->testApellidosPersona->testAtributoApellidosPersona();

        if(empty($respuesta)){
           $respuesta = 'TEST_FALLIDOS';
        }
        return $respuesta;
    }

    function testAtributoFechaNacimientoPersona() {
        $respuesta = '';
        $respuesta = $this->testFechaNacimientoPersona->testAtributoFechaNacimientoPersona();

        if(empty($respuesta)){
           $respuesta = 'TEST_FALLIDOS';
        }
        return $respuesta;
    }

    function testAtributoDireccionPersona() {
        $respuesta = '';
        $respuesta = $this->testDireccionPersona->testAtributoDireccionPersona();

        if(empty($respuesta)){
           $respuesta = 'TEST_FALLIDOS';
        }
        return $respuesta;
    }

    function testAtributoEmailPersona() {
        $respuesta = '';
        $respuesta = $this->testEmailPersona->testAtributoEmailPersona();

        if(empty($respuesta)){
           $respuesta = 'TEST_FALLIDOS';
        }
        return $respuesta;
    }

    function testAtributoTelefonoPersona() {
        $respuesta = '';
        $respuesta = $this->testTelefonoPersona->testAtributoTelefonoPersona();

        if(empty($respuesta)){
           $respuesta = 'TEST_FALLIDOS';
        }
        return $respuesta;
    }


    function testAccionGestionPersonas(){
        $respuesta = '';
        $respuesta = $this->testPersona->testAccionesGestionPersonas();

        if(empty($respuesta)){
            $respuesta = 'TEST_FALLIDOS';
        }
        return $respuesta;
    }
}
?>