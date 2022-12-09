<?php

include_once './Test/Atributos/TestDNIPersona.php';
include_once './Test/Atributos/TestNombrePersona.php';
include_once './Test/Atributos/TestApellidosPersona.php';
include_once './Test/Atributos/TestDireccionPersona.php';
include_once './Test/Atributos/TestFechaNacimientoPersona.php';
include_once './Test/Atributos/TestEmailPersona.php';
include_once './Test/Atributos/TestTelefonoPersona.php';
include_once './Servicios/Test/TestRegistroService.php';
include_once './Test/Accion/TestRegistro.php';

class TestRegistroServiceImpl implements TestRegistroService {

    private $testDNIPersona;
    private $testNombrePersona;
    private $testApellidosPersona;
    private $testFechaNacimientoPersona;
    private $testDireccionPersona;
    private $testEmailPersona;
    private $testTelefonoPersona;
    private $testRegistro;

    function __construct()
    {
        $this->testDNIPersona = new TestDNIPersona();
        $this->testNombrePersona = new TestNombrePersona();
        $this->testApellidosPersona = new TestApellidosPersona();
        $this->testFechaNacimientoPersona = new TestFechaNacimientoPersona();
        $this->testDireccionPersona = new TestDireccionPersona();
        $this->testEmailPersona = new TestEmailPersona();
        $this->testTelefonoPersona = new TestTelefonoPersona();
        $this->testRegistro = new TestRegistro();
    }
    function testAtributoDNIPersona() {
        $respuesta = '';
        $respuesta = $this->testDNIPersona->testAtributoDNIPersona();

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

    function testAtributoFechaNacPersona() {
        $respuesta = '';
        $respuesta = $this->testFechaNacimientoPersona->testAtributoFechaNacPersona();

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

    function testAccionRegistro(){
        $respuesta = '';
        $respuesta = $this->testRegistro->testAccionesRegistro();

        if(empty($respuesta)){
           $respuesta = 'TEST_FALLIDOS';
        }
        return $respuesta;
    }



}
?>