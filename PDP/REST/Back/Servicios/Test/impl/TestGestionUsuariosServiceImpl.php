<?php

include_once './Test/Atributos/Usuario/TestUsuario.php';
include_once './Test/Atributos/Usuario/TestPasswdUsuario.php';
include_once './Test/Accion/TestGestionUsuarios.php';
include_once './Servicios/Test/TestGestionUsuariosService.php';

class TestGestionUsuariosServiceImpl implements TestGestionUsuariosService {

    private $testUsuario;
    private $testPasswdUsuario;
    private $testUsuarioAccion;

    function __construct()
    {
        $this->testUsuario = new TestUsuario();
        $this->testPasswdUsuario = new TestPasswdUsuario();
        $this->testUsuarioAccion = new TestGestionusuarios();
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

    function testAccionGestionUsuarios(){
        $respuesta = '';
        $respuesta = $this->testUsuarioAccion->testUsuariosGestionUsuarios();

        if(empty($respuesta)){
            $respuesta = 'TEST_FALLIDOS';
        }
        return $respuesta;
    }
}
?>