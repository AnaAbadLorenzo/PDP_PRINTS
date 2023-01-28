<?php

include_once './Test/Test.php';
include_once './Test/Accion/ConexionesBDTest.php';

class TestGestionUsuarios{
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
        $_POST['test'] = 'testing';

        //AÑADIR_USUARIO_YA_EXISTE
        $_POST = NULL;
        $_POST['controlador'] = $controlador;
        $_POST['action'] = $action;
        $_POST['dni_usuario'] = '45146321N';
        $_POST['usuario'] = 'anita1312';
        $_POST['passwd_usuario'] = '98cd48d44fffa390eb2302b4953d1953';
        $_POST['borrado_usuario'] = 0;
        $_POST['id_rol'] = 2;
        $_POST['test'] = 'testing';
        $resultadoTest = $this->hacerPruebaAñadirUsuarioYaExiste($_POST);
        array_push($pruebas, $resultadoTest);

        //MODIFICAR_PASS_USUARIO_OK
        $action = 'editPassUsuario';

        $_POST = NULL;
        $_POST['controlador'] = $controlador;
        $_POST['action'] = $action;
        $_POST['dni_usuario'] = '32720371L';
        $_POST['usuario'] = 'usuarioCambioPass';
        $_POST['passwd_usuario'] = 'nuevaPass';
        $_POST['borrado_usuario'] = 0;
        $_POST['id_rol'] = 2;
        $_POST['test'] = 'testing';
        $resultadoTest = $this->hacerPruebaModificarPassUsuarioOK($_POST);
        array_push($pruebas, $resultadoTest);

         //MODIFICAR_ROL_USUARIO_OK
         $action = 'editRolUsuario';

         $_POST = NULL;
         $_POST['controlador'] = $controlador;
         $_POST['action'] = $action;
         $_POST['dni_usuario'] = '32720371L';
         $_POST['usuario'] = 'usuarioCambioPass';
         $_POST['passwd_usuario'] = 'nuevaPass';
         $_POST['borrado_usuario'] = 0;
         $_POST['id_rol'] = 1;
         $_POST['test'] = 'testing';
         $resultadoTest = $this->hacerPruebaModificarUsuarioOK($_POST);
         array_push($pruebas, $resultadoTest);

        //MODIFICAR_USUARIO_NO_EXISTE
        $_POST = NULL;
        $_POST['controlador'] = $controlador;
        $_POST['action'] = $action;
        $_POST['dni_usuario'] = '444444444T';
        $_POST['usuario'] = 'josefa';
        $_POST['passwd_usuario'] = 'b5d5f67b30809413156655abdda382a3';
        $_POST['borrado_usuario'] = 0;
        $_POST['id_rol'] = 2;
        $_POST['test'] = 'testing';
        $resultadoTest = $this->hacerPruebaModificarUsuarioNoExiste($_POST);
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
         $_POST['test'] = 'testing';
         $resultadoTest = $this->hacerPruebaDeleteUsuarioOK($_POST);
         array_push($pruebas, $resultadoTest);

          //REACTIVAR_USUARIO_OK
          $action = 'reactivar';

          $_POST = NULL;
          $_POST['controlador'] = $controlador;
          $_POST['action'] = $action;
          $_POST['dni_usuario'] = '99999999R';
          $_POST['usuario'] = 'usuariopruebaMod';
          $_POST['passwd_usuario'] = 'usuarioprueba';
          $_POST['borrado_usuario'] = 0;
          $_POST['id_rol'] = 2;
          $_POST['test'] = 'testing';
          $resultadoTest = $this->hacerPruebaReactivarUsuarioOK($_POST);
          array_push($pruebas, $resultadoTest);

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
    function hacerPruebaModificarPassUsuarioOK($atributo){
        $resultado = $this->conexionesBDTest->pruebaTesting('accion', $atributo);
        $resultadoEsperado = 'EDIT_PASS_USUARIO_COMPLETO'." - ". EDIT_PASS_USUARIO_COMPLETO;
        $resultadoObtenido = '';
        if(!empty($resultado) && $resultado['code'] == 'EDIT_PASS_USUARIO_COMPLETO'){
            $resultadoObtenido = 'EDIT_PASS_USUARIO_COMPLETO'." - ". EDIT_PASS_USUARIO_COMPLETO;
        }
        $datosValores = array(
            'usuario' => $atributo['usuario'],
            'passwd_usuario' => $atributo['passwd_usuario']
        );
        return $this->test->createDatosPruebaAcciones($resultadoObtenido, $resultadoEsperado, EDIT_USUARIO_COMPLETO , ÉXITO, $datosValores);
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

    function hacerPruebaReactivarUsuarioOK($atributo){
        $resultado = $this->conexionesBDTest->pruebaTesting('accion', $atributo);
        $resultadoEsperado = 'REACTIVAR_USUARIO_CORRECTO'." - ". REACTIVAR_USUARIO_CORRECTO;
        $resultadoObtenido = '';
        if(!empty($resultado) && $resultado['code'] == 'REACTIVAR_USUARIO_CORRECTO'){
            $resultadoObtenido = 'REACTIVAR_USUARIO_CORRECTO'." - ". REACTIVAR_USUARIO_CORRECTO;
        }
        $datosValores = array(
            'usuario' => $atributo['usuario'],
            'passwd_usuario' => $atributo['passwd_usuario']
        );
        return $this->test->createDatosPruebaAcciones($resultadoObtenido, $resultadoEsperado, REACTIVAR_USUARIO_CORRECTO , ÉXITO, $datosValores);
    }

    function deleteData($clave, $valor) {
        $_POST = NULL;
        $_POST['tabla'] = 'usuario';
        $_POST['clave'] = $clave;
        $_POST['valor'] = $valor;
        $_POST['test'] = 'testing';
        
        $this->conexionesBDTest->pruebaTesting('delete', $_POST);
    }
}

?>