<?php

include_once './Test/Atributos/TestUsuario.php';
include_once './Servicios/Test/TestLoginService.php';

class TestLoginServiceImpl implements TestLoginService {

    private $testUsuario;

    function __construct()
    {
        $this->testUsuario = new TestUsuario();
    }
     function testAtributoUsuario() {
        $respuesta = '';
        $respuesta = $this->testUsuario->testAtributoUsuario();

        if(empty($respuesta)){
            throw new TestsFallidosException('TEST_FALLIDOS');
        }
        return $respuesta;
    }


}
?>