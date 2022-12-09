<?php

include_once './Test/Test.php';
include_once './Test/Accion/ConexionesBDTest.php';

class TestRecuperarPass{
    private $test;
    private $conexionesBDTest;

    function __construct()
    {
        $this->test = new Test();
        $this->conexionesBDTest = new ConexionesBDTest();
    }
    function testAccionesRecuperarPass() {
        $pruebas = array();
        $controlador = 'Autenticacion';
        $action = 'recuperarPass';

       //RECUPERAR_PASS_OK
        $_POST = NULL;
        $_POST['controlador'] = $controlador;
        $_POST['action'] = $action;
        $_POST['usuario'] = 'usuarioCambioPass';
        $_POST['emailUsuario'] = 'usuariocambiopass@gmail.com';
        $_POST['idioma'] = 'ES';
        $resultadoTest = $this->hacerPruebaRecuperarPassOK($_POST);
        array_push($pruebas, $resultadoTest);

        //USUARIO_NO_EXISTE
        $_POST = NULL;
        $_POST['controlador'] = $controlador;
        $_POST['action'] = $action;
        $_POST['usuario'] = 'cambioPass';
        $_POST['emailUsuario'] = 'usuariocambiopass@gmail.com';
        $_POST['idioma'] = 'ES';
        $resultadoTest = $this->hacerPruebaRecuperarPassUsuarioNoExiste($_POST);
        array_push($pruebas, $resultadoTest);
        
        return $pruebas;

    }

    function hacerPruebaRecuperarPassOK($atributo){
        $resultado = $this->conexionesBDTest->pruebaTesting('accion', $atributo);
        $resultadoEsperado = 'RECUPERAR_PASS_OK'." - ". RECUPERAR_PASS_OK;
        $resultadoObtenido = '';
        if(!empty($resultado) && $resultado['code'] == 'RECUPERAR_PASS_OK'){
            $resultadoObtenido = 'RECUPERAR_PASS_OK'." - ". RECUPERAR_PASS_OK;
        }

        $datosValores = array(
            'usuario' => $atributo['usuario'],
            'email_usuario' => $atributo['emailUsuario']
        );

        return $this->test->createDatosPruebaAcciones($resultadoObtenido, $resultadoEsperado, RECUPERAR_PASS_OK , ÉXITO, $datosValores);
    
    }

    function hacerPruebaRecuperarPassUsuarioNoExiste($atributo){
        $resultado = $this->conexionesBDTest->pruebaTesting('accion', $atributo);
        $resultadoEsperado = 'USUARIO_NO_ENCONTRADO'." - ". USUARIO_NO_ENCONTRADO;
        $resultadoObtenido = '';
    
        if(!empty($resultado) && $resultado['code'] == 'USUARIO_NO_EXISTE'){
            $resultadoObtenido = 'USUARIO_NO_ENCONTRADO'." - ". USUARIO_NO_ENCONTRADO;
        }

        $datosValores = array(
            'usuario' => $atributo['usuario'],
            'email_usuario' => $atributo['emailUsuario']
        );

        return $this->test->createDatosPruebaAcciones($resultadoObtenido, $resultadoEsperado, USUARIO_NO_ENCONTRADO , ERROR, $datosValores);
    
    }
}

?>