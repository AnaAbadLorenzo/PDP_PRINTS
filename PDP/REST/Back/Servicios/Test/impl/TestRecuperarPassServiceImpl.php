<?php

include_once './Test/Atributos/Usuario/TestUsuario.php';
include_once './Test/Atributos/Persona/TestEmailPersona.php';
include_once './Test/Accion/TestRecuperarPass.php';
include_once './Servicios/Test/TestRecuperarPassService.php';

class TestRecuperarPassServiceImpl implements TestRecuperarPassService {

    private $testUsuario;
    private $testEmailUsuario;
    private $testRecuperarPass;

    function __construct()
    {
        $this->testUsuario = new TestUsuario();
        $this->testEmailUsuario = new TestEmailPersona();
        $this->testRecuperarPass = new TestRecuperarPass();
    }
    function testAtributoUsuario() {
        $respuesta = '';
        $respuesta = $this->testUsuario->testAtributoUsuario();

        if(empty($respuesta)){
           $respuesta = 'TEST_FALLIDOS';
        }
        return $respuesta;
    }

    function testAtributoEmailUsuario(){
        $respuesta = '';
        $respuesta = $this->testEmailUsuario->testAtributoEmailPersona();

        if(empty($respuesta)){
            $respuesta = 'TEST_FALLIDOS';
        }
        return $respuesta;
    }

    function testAccionRecuperarPass() {
        $respuesta = '';
        $respuesta = $this->testRecuperarPass->testAccionesRecuperarPass();

        if(empty($respuesta)){
           $respuesta = 'TEST_FALLIDOS';
        }
        return $respuesta;
    }

}
?>