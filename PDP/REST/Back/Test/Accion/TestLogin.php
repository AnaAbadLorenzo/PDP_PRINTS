<?php

include_once './Test/Test.php';
include_once './Test/Accion/ConexionesBDTest.php';

class TestLogin{
    private $test;
    private $conexionesBDTest;

    function __construct()
    {
        $this->test = new Test();
        $this->conexionesBDTest = new ConexionesBDTest();
    }
    function testAccionesLogin() {
        $pruebas = array();
        $controlador = 'Autenticacion';
        $action = 'login';

        //LOGIN_OK
        $_POST = NULL;
        $_POST['controlador'] = $controlador;
        $_POST['action'] = $action;
        $_POST['usuario'] = 'anita1312';
        $_POST['passwd_usuario'] = '98cd48d44fffa390eb2302b4953d1953';
        $resultadoTest = $this->hacerPruebaLoginOK($_POST);
        array_push($pruebas, $resultadoTest);

        //USUARIO_NO_EXISTE
        $_POST = NULL;
        $_POST['controlador'] = $controlador;
        $_POST['action'] = $action;
        $_POST['usuario'] = 'fatima';
        $_POST['passwd_usuario'] = '98cd48d44fffa390eb2302b4953d1953';
        $resultadoTest = $this->hacerPruebaLoginUsuarioNoExiste($_POST);
        array_push($pruebas, $resultadoTest);

         //PASSWD_INCORRECTA
         $_POST = NULL;
         $_POST['controlador'] = $controlador;
         $_POST['action'] = $action;
         $_POST['usuario'] = 'anita1312';
         $_POST['passwd_usuario'] = 'fatima';
         $resultadoTest = $this->hacerPruebaLoginUsuarioPasswdIncorrecta($_POST);
         array_push($pruebas, $resultadoTest);

        return $pruebas;

    }

    function hacerPruebaLoginOK($atributo){
        $resultado = $this->conexionesBDTest->pruebaTesting('accion', $atributo);
        $resultadoEsperado = 'LOGIN_USUARIO_OK'." - ". LOGIN_USUARIO_OK;
        $resultadoObtenido = '';
        if(!empty($resultado) && $resultado['code'] == 'LOGIN_USUARIO_CORRECTO'){
            $resultadoObtenido = 'LOGIN_USUARIO_OK'." - ". LOGIN_USUARIO_OK;
        }

        $datosValores = array(
            'usuario' => $atributo['usuario'],
            'passwd_usuario' => $atributo['passwd_usuario']
        );

        return $this->test->createDatosPruebaAcciones($resultadoObtenido, $resultadoEsperado, LOGIN_ACCION_OK , ÉXITO, $datosValores);
    
    }

    function hacerPruebaLoginUsuarioNoExiste($atributo){
        $resultado = $this->conexionesBDTest->pruebaTesting('accion', $atributo);
        $resultadoEsperado = 'USUARIO_NO_ENCONTRADO'." - ". USUARIO_NO_ENCONTRADO;
        $resultadoObtenido = '';

        if(!empty($resultado) && $resultado['code'] == 'USUARIO_NO_ENCONTRADO'){
            $resultadoObtenido = 'USUARIO_NO_ENCONTRADO'." - ". USUARIO_NO_ENCONTRADO;
        }

        $datosValores = array(
            'usuario' => $atributo['usuario'],
            'passwd_usuario' => $atributo['passwd_usuario']
        );

        return $this->test->createDatosPruebaAcciones($resultadoObtenido, $resultadoEsperado, USUARIO_NO_ENCONTRADO , ERROR, $datosValores);
    
    }

    function hacerPruebaLoginUsuarioPasswdIncorrecta($atributo){
        $resultado = $this->conexionesBDTest->pruebaTesting('accion', $atributo);
        $resultadoEsperado = 'PASSWD_USUARIO_NO_COINCIDE'." - ". PASSWD_USUARIO_NO_COINCIDE;
        $resultadoObtenido = '';

        if(!empty($resultado) && $resultado['code'] == 'PASSWD_USUARIO_NO_COINCIDE'){
            $resultadoObtenido = 'PASSWD_USUARIO_NO_COINCIDE'." - ". PASSWD_USUARIO_NO_COINCIDE;
        }

        $datosValores = array(
            'usuario' => $atributo['usuario'],
            'passwd_usuario' => $atributo['passwd_usuario']
        );

        return $this->test->createDatosPruebaAcciones($resultadoObtenido, $resultadoEsperado, PASSWD_USUARIO_NO_COINCIDE , ERROR, $datosValores);
    
    }
}

?>