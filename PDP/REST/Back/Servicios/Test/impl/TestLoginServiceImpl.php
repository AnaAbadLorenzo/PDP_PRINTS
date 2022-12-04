<?php

include_once './Test/Atributos/TestUsuario.php';
include_once './Test/Atributos/TestPasswdUsuario.php';
include_once './Test/Accion/TestLogin.php';
include_once './Servicios/Test/TestLoginService.php';

class TestLoginServiceImpl implements TestLoginService {

    private $testUsuario;
    private $testPasswdUsuario;
    private $testLogin;

    function __construct()
    {
        $this->testUsuario = new TestUsuario();
        $this->testPasswdUsuario = new TestPasswdUsuario();
        $this->testLogin = new TestLogin();
    }
    function testAtributoUsuario() {
        $respuesta = '';
        $respuesta = $this->testUsuario->testAtributoUsuario();

        if(empty($respuesta)){
           $respuesta = 'TEST_FALLIDOS';
        }
        return $respuesta;
    }

    function testAtributoPasswdUsuario(){
        $respuesta = '';
        $respuesta = $this->testPasswdUsuario->testAtributoPasswdUsuario();

        if(empty($respuesta)){
            $respuesta = 'TEST_FALLIDOS';
        }
        return $respuesta;
    }

    function testAccionLogin() {
        $respuesta = '';
        $respuesta = $this->testLogin->testAccionesLogin();

        if(empty($respuesta)){
           $respuesta = 'TEST_FALLIDOS';
        }
        return $respuesta;
    }

}
?>