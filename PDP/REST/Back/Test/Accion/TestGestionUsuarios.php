<?php

include_once './Test/Test.php';
include_once './Test/Accion/ConexionesBDTest.php';

class TestGestionusuarios{
    private $test;
    private $conexionesBDTest;

    function __construct()
    {
        $this->test = new Test();
        $this->conexionesBDTest = new ConexionesBDTest();
    }
    function testUsuariosGestionUsuarios() {
        $pruebas = array();
        $controlador = 'GestionUsuarios';
        $action = 'add';

       //AÑADIR_USUARIO_OK
        $_POST = NULL;
        $_POST['controlador'] = $controlador;
        $_POST['action'] = $action;
        $_POST['dni_usuario'] = '99999999R';
        $_POST['usuario'] = 'usuarioprueba';
        $_POST['passwd_usuario'] = 'usuarioprueba';
        $_POST['borrado_usuario'] = 0;
        $_POST['id_rol'] = 2;
        $resultadoTest = $this->hacerPruebaAñadirUsuarioOK($_POST);
        array_push($pruebas, $resultadoTest);

        //AÑADIR_USUARIO_YA_EXISTE
        $_POST = NULL;
        $_POST['controlador'] = $controlador;
        $_POST['action'] = $action;
        $_POST['dni_usuario'] = '45146319X';
        $_POST['usuario'] = 'fatima';
        $_POST['passwd_usuario'] = 'b5d5f67b30809413156655abdda382a3';
        $_POST['borrado_usuario'] = 0;
        $_POST['id_rol'] = 2;
        $resultadoTest = $this->hacerPruebaAñadirUsuarioYaExiste($_POST);
        array_push($pruebas, $resultadoTest);

        //MODIFICAR_USUARIO_OK
        $action = 'edit';

        $_POST = NULL;
        $_POST['controlador'] = $controlador;
        $_POST['action'] = $action;
        $_POST['dni_usuario'] = '99999999R';
        $_POST['usuario'] = 'usuariopruebaMod';
        $_POST['passwd_usuario'] = 'usuarioprueba';
        $_POST['borrado_usuario'] = 0;
        $_POST['id_rol'] = 2;
        $resultadoTest = $this->hacerPruebaModificarUsuarioOK($_POST);
        array_push($pruebas, $resultadoTest);

        //MODIFICAR_USUARIO_NO_EXISTE
        $_POST = NULL;
        $_POST['controlador'] = $controlador;
        $_POST['action'] = $action;
        $_POST['dni_usuario'] = '45146319X';
        $_POST['usuario'] = 'josefa';
        $_POST['passwd_usuario'] = 'b5d5f67b30809413156655abdda382a3';
        $_POST['borrado_usuario'] = 0;
        $_POST['id_rol'] = 2;
        $resultadoTest = $this->hacerPruebaModificaruUuarioNoExiste($_POST);
        array_push($pruebas, $resultadoTest);

         //DELETE_USUARIO_OK
         $action = 'delete';

         $_POST = NULL;
         $_POST['controlador'] = $controlador;
         $_POST['action'] = $action;
         $_POST['dni_usuario'] = '99999999R';
         $_POST['usuario'] = 'usuariopruebaMod';
         $_POST['passwd_usuario'] = 'usuarioprueba';
         $_POST['borrado_usuario'] = 0;
         $_POST['id_rol'] = 2;
         $resultadoTest = $this->hacerPruebaDeleteUsuarioOK($_POST);
         array_push($pruebas, $resultadoTest);

         //DELETE_USUARIO_NO_EXISTE
         $action = 'delete';
         $_POST = NULL;
         $_POST['controlador'] = $controlador;
         $_POST['action'] = $action;
         $_POST['dni_usuario'] = '99999999R';
         $_POST['usuario'] = 'usuariopruebaMod';
         $_POST['passwd_usuario'] = 'usuarioprueba';
         $_POST['borrado_usuario'] = 0;
         $_POST['id_rol'] = 2;
         $resultadoTest = $this->hacerPruebaDeleteUsuarioNoExiste($_POST);
         array_push($pruebas, $resultadoTest);
         
        $this->deleteData();
        return $pruebas;

    }

    function hacerPruebaAñadirUsuarioOK($atributo){
        $resultado = $this->conexionesBDTest->pruebaTesting('accion', $atributo);
        $resultadoEsperado = 'ADD_USUARIO_COMPLETO'." - ". ADD_USUARIO_COMPLETO;
        $resultadoObtenido = '';
        if(!empty($resultado) && $resultado['code'] == 'ADD_USUARIO_COMPLETO'){
            $resultadoObtenido = 'ADD_USUARIO_COMPLETO'." - ". ADD_USUARIO_COMPLETO;
        }
        $datosValores = array(
            'usuario' => $atributo['usuario'],
            'passwd_usuario' => $atributo['passwd_usuario']
        );
        return $this->test->createDatosPruebaAcciones($resultadoObtenido, $resultadoEsperado, ADD_USUARIO_COMPLETO , ÉXITO, $datosValores);
    }

    function hacerPruebaAñadirUsuarioYaExiste($atributo){
        $resultado = $this->conexionesBDTest->pruebaTesting('accion', $atributo);
        $resultadoEsperado = 'USUARIO_YA_EXISTE'." - ". USUARIO_YA_EXISTE;
        $resultadoObtenido = '';
    
        if(!empty($resultado) && $resultado['code'] == 'USUARIO_YA_EXISTE'){
            $resultadoObtenido = 'USUARIO_YA_EXISTE'." - ". USUARIO_YA_EXISTE;
        }

        $datosValores = array(
            'usuario' => $atributo['usuario'],
            'passwd_usuario' => $atributo['passwd_usuario']
        );

        return $this->test->createDatosPruebaAcciones($resultadoObtenido, $resultadoEsperado, USUARIO_YA_EXISTE , ERROR, $datosValores);
    }

    function hacerPruebaModificarUsuarioOK($atributo){
        $resultado = $this->conexionesBDTest->pruebaTesting('accion', $atributo);
        $resultadoEsperado = 'EDIT_USUARIO_COMPLETO'." - ". EDIT_USUARIO_COMPLETO;
        $resultadoObtenido = '';
        if(!empty($resultado) && $resultado['code'] == 'EDIT_USUARIO_COMPLETO'){
            $resultadoObtenido = 'EDIT_USUARIO_COMPLETO'." - ". EDIT_USUARIO_COMPLETO;
        }
        $datosValores = array(
            'usuario' => $atributo['usuario'],
            'passwd_usuario' => $atributo['passwd_usuario']
        );
        return $this->test->createDatosPruebaAcciones($resultadoObtenido, $resultadoEsperado, EDIT_USUARIO_COMPLETO , ÉXITO, $datosValores);
    }

    function hacerPruebaModificarUsuarioNoExiste($atributo){
        $resultado = $this->conexionesBDTest->pruebaTesting('accion', $atributo);
        $resultadoEsperado = 'USUARIO_NO_EXISTE'." - ". USUARIO_NO_EXISTE;
        $resultadoObtenido = '';
        if(!empty($resultado) && $resultado['code'] == 'USUARIO_NO_EXISTE'){
            $resultadoObtenido = 'USUARIO_NO_EXISTE'." - ". USUARIO_NO_EXISTE;
        }
        $datosValores = array(
            'usuario' => $atributo['usuario'],
            'passwd_usuario' => $atributo['passwd_usuario']
        );
        return $this->test->createDatosPruebaAcciones($resultadoObtenido, $resultadoEsperado, USUARIO_NO_EXISTE , ERROR, $datosValores);
    }

    function hacerPruebaDeleteUsuarioOK($atributo){
        $resultado = $this->conexionesBDTest->pruebaTesting('accion', $atributo);
        $resultadoEsperado = 'DELETE_USUARIO_COMPLETO'." - ". DELETE_USUARIO_COMPLETO;
        $resultadoObtenido = '';
        if(!empty($resultado) && $resultado['code'] == 'DELETE_USUARIO_COMPLETO'){
            $resultadoObtenido = 'DELETE_USUARIO_COMPLETO'." - ". DELETE_USUARIO_COMPLETO;
        }
        $datosValores = array(
            'usuario' => $atributo['usuario'],
            'passwd_usuario' => $atributo['passwd_usuario']
        );
        return $this->test->createDatosPruebaAcciones($resultadoObtenido, $resultadoEsperado, DELETE_USUARIO_COMPLETO , ERROR, $datosValores);
    }

    function hacerPruebaDeleteUsuarioNoExiste($atributo){
        $resultado = $this->conexionesBDTest->pruebaTesting('accion', $atributo);
        $resultadoEsperado = 'USUARIO_NO_EXISTE'." - ". USUARIO_NO_EXISTE;
        $resultadoObtenido = '';
        if(!empty($resultado) && $resultado['code'] == 'USUARIO_NO_EXISTE'){
            $resultadoObtenido = 'USUARIO_NO_EXISTE'." - ". USUARIO_NO_EXISTE;
        }
        $datosValores = array(
            'usuario' => $atributo['usuario'],
            'passwd_usuario' => $atributo['passwd_usuario']
        );
        return $this->test->createDatosPruebaAcciones($resultadoObtenido, $resultadoEsperado, USUARIO_NO_EXISTE , ERROR, $datosValores);
    }

    function deleteData($clave, $valor) {
        $_POST = NULL;
        $_POST['tabla'] = 'accion';
        $_POST['clave'] = $clave;
        $_POST['valor'] = $valor;
        
        $this->conexionesBDTest->pruebaTesting('delete', $_POST);
    }
}

?>