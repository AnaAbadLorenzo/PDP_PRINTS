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
    function testusuariosGestionusuarios() {
        $pruebas = array();
        $controlador = 'Gestionusuarios';
        $action = 'add';

       //AÑADIR_usuario_OK
        $_POST = NULL;
        $_POST['controlador'] = $controlador;
        $_POST['action'] = $action;
        $_POST['titulo_usuario'] = 'usuarioprueba';
        $_POST['contenido_usuario'] = 'Esto es un posible contenido de la usuario';
        $_POST['fecha_usuario'] = '01/01/2023';
        $resultadoTest = $this->hacerPruebaAñadirusuarioOK($_POST);
        array_push($pruebas, $resultadoTest);

        //AÑADIR_usuario_YA_EXISTE
        $_POST = NULL;
        $_POST['controlador'] = $controlador;
        $_POST['action'] = $action;
        $_POST['titulo_usuario'] = 'usuarioprueba';
        $_POST['contenido_usuario'] = 'Esto es un posible contenido de la usuario';
        $_POST['fecha_usuario'] = '01/01/2023';
        $resultadoTest = $this->hacerPruebaAñadirusuarioYaExiste($_POST);
        array_push($pruebas, $resultadoTest);

        //MODIFICAR_usuario_OK
        $action = 'edit';

        $_POST = NULL;
        $_POST['controlador'] = $controlador;
        $_POST['action'] = $action;
        $_POST['id_accion'] = 2;
        $_POST['titulo_usuario'] = 'usuarioprueba';
        $_POST['contenido_usuario'] = 'Esto es una descripcion modificada para pruebas';
        $_POST['fecha_usuario'] = '01/01/2023';
        $resultadoTest = $this->hacerPruebaModificarusuarioOK($_POST);
        array_push($pruebas, $resultadoTest);

        //MODIFICAR_usuario_NO_EXISTE
        $_POST = NULL;
        $_POST['controlador'] = $controlador;
        $_POST['action'] = $action;
        $_POST['id_accion'] = 1;
        $_POST['titulo_usuario'] = 'usuarioInexistente';
        $_POST['contenido_usuario'] = 'Esto es una descripcion modificada para pruebas';
        $_POST['fecha_usuario'] = '01/01/2023';
        $resultadoTest = $this->hacerPruebaModificarusuarioNoExiste($_POST);
        array_push($pruebas, $resultadoTest);

         //DELETE_usuario_OK
         $action = 'delete';

         $_POST = NULL;
         $_POST['controlador'] = $controlador;
         $_POST['action'] = $action;
         $_POST['id_accion'] = 2;
         $_POST['titulo_usuario'] = 'usuarioprueba';
         $_POST['contenido_usuario'] = 'Esto es una descripcion modificada para pruebas';
         $_POST['fecha_usuario'] = '01/01/2023';
         $resultadoTest = $this->hacerPruebaDeleteusuarioOK($_POST);
         array_push($pruebas, $resultadoTest);

         //DELETE_usuario_NO_EXISTE
         $action = 'delete';
         $_POST = NULL;
         $_POST['controlador'] = $controlador;
         $_POST['action'] = $action;
         $_POST['id_accion'] = 1;
         $_POST['titulo_usuario'] = 'usuarioInexistente';
         $_POST['contenido_usuario'] = 'Esto es una descripcion modificada para pruebas';
         $_POST['fecha_usuario'] = '01/01/2023';
         $resultadoTest = $this->hacerPruebaDeleteusuarioNoExiste($_POST);
         array_push($pruebas, $resultadoTest);
         
        $this->deleteData('titulo_usuario', 'usuarioprueba');
        return $pruebas;

    }

    function hacerPruebaAñadirusuarioOK($atributo){
        $resultado = $this->conexionesBDTest->pruebaTesting('accion', $atributo);
        $resultadoEsperado = 'ADD_usuario_COMPLETO'." - ". ADD_usuario_COMPLETO;
        $resultadoObtenido = '';
        if(!empty($resultado) && $resultado['code'] == 'ADD_usuario_COMPLETO'){
            $resultadoObtenido = 'ADD_usuario_COMPLETO'." - ". ADD_usuario_COMPLETO;
        }
        $datosValores = array(
            'titulo_usuario' => $atributo['titulo_usuario'],
            'contenido_usuario' => $atributo['contenido_usuario']
            'fecha_usuario' => $atributo['fecha_usuario']
        );
        return $this->test->createDatosPruebaAcciones($resultadoObtenido, $resultadoEsperado, ADD_usuario_COMPLETO , ÉXITO, $datosValores);
    }

    function hacerPruebaAñadirusuarioYaExiste($atributo){
        $resultado = $this->conexionesBDTest->pruebaTesting('accion', $atributo);
        $resultadoEsperado = 'usuario_YA_EXISTE'." - ". usuario_YA_EXISTE;
        $resultadoObtenido = '';
    
        if(!empty($resultado) && $resultado['code'] == 'usuario_YA_EXISTE'){
            $resultadoObtenido = 'usuario_YA_EXISTE'." - ". usuario_YA_EXISTE;
        }

        $datosValores = array(
            'titulo_usuario' => $atributo['titulo_usuario'],
            'contenido_usuario' => $atributo['contenido_usuario']
            'fecha_usuario' => $atributo['fecha_usuario']
        );

        return $this->test->createDatosPruebaAcciones($resultadoObtenido, $resultadoEsperado, usuario_YA_EXISTE , ERROR, $datosValores);
    }

    function hacerPruebaModificarusuarioOK($atributo){
        $resultado = $this->conexionesBDTest->pruebaTesting('accion', $atributo);
        $resultadoEsperado = 'EDIT_usuario_COMPLETO'." - ". EDIT_usuario_COMPLETO;
        $resultadoObtenido = '';
        if(!empty($resultado) && $resultado['code'] == 'EDIT_usuario_COMPLETO'){
            $resultadoObtenido = 'EDIT_usuario_COMPLETO'." - ". EDIT_usuario_COMPLETO;
        }
        $datosValores = array(
            'titulo_usuario' => $atributo['titulo_usuario'],
            'contenido_usuario' => $atributo['contenido_usuario']
            'fecha_usuario' => $atributo['fecha_usuario']
        );
        return $this->test->createDatosPruebaAcciones($resultadoObtenido, $resultadoEsperado, EDIT_usuario_COMPLETO , ÉXITO, $datosValores);
    }

    function hacerPruebaModificarusuarioNoExiste($atributo){
        $resultado = $this->conexionesBDTest->pruebaTesting('accion', $atributo);
        $resultadoEsperado = 'usuario_NO_EXISTE'." - ". usuario_NO_EXISTE;
        $resultadoObtenido = '';
        if(!empty($resultado) && $resultado['code'] == 'usuario_NO_EXISTE'){
            $resultadoObtenido = 'usuario_NO_EXISTE'." - ". usuario_NO_EXISTE;
        }
        $datosValores = array(
            'titulo_usuario' => $atributo['titulo_usuario'],
            'contenido_usuario' => $atributo['contenido_usuario']
            'fecha_usuario' => $atributo['fecha_usuario']
        );
        return $this->test->createDatosPruebaAcciones($resultadoObtenido, $resultadoEsperado, usuario_NO_EXISTE , ERROR, $datosValores);
    }

    function hacerPruebaDeleteusuarioOK($atributo){
        $resultado = $this->conexionesBDTest->pruebaTesting('accion', $atributo);
        $resultadoEsperado = 'DELETE_usuario_COMPLETO'." - ". DELETE_usuario_COMPLETO;
        $resultadoObtenido = '';
        if(!empty($resultado) && $resultado['code'] == 'DELETE_usuario_COMPLETO'){
            $resultadoObtenido = 'DELETE_usuario_COMPLETO'." - ". DELETE_usuario_COMPLETO;
        }
        $datosValores = array(
            'titulo_usuario' => $atributo['titulo_usuario'],
            'contenido_usuario' => $atributo['contenido_usuario']
            'fecha_usuario' => $atributo['fecha_usuario']
        );
        return $this->test->createDatosPruebaAcciones($resultadoObtenido, $resultadoEsperado, DELETE_usuario_COMPLETO , ERROR, $datosValores);
    }

    function hacerPruebaDeleteusuarioNoExiste($atributo){
        $resultado = $this->conexionesBDTest->pruebaTesting('accion', $atributo);
        $resultadoEsperado = 'usuario_NO_EXISTE'." - ". usuario_NO_EXISTE;
        $resultadoObtenido = '';
        if(!empty($resultado) && $resultado['code'] == 'usuario_NO_EXISTE'){
            $resultadoObtenido = 'usuario_NO_EXISTE'." - ". usuario_NO_EXISTE;
        }
        $datosValores = array(
            'titulo_usuario' => $atributo['titulo_usuario'],
            'contenido_usuario' => $atributo['contenido_usuario']
            'fecha_usuario' => $atributo['fecha_usuario']
        );
        return $this->test->createDatosPruebaAcciones($resultadoObtenido, $resultadoEsperado, usuario_NO_EXISTE , ERROR, $datosValores);
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