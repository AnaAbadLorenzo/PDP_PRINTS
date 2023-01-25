<?php

include_once './Test/Test.php';
include_once './Test/Accion/ConexionesBDTest.php';

class TestGestionAcciones{
    private $test;
    private $conexionesBDTest;

    function __construct()
    {
        $this->test = new Test();
        $this->conexionesBDTest = new ConexionesBDTest();
    }
    function testNoticiasGestionNoticias() {
        $pruebas = array();
        $controlador = 'GestionNoticias';
        $action = 'add';

       //AÑADIR_NOTICIA_OK
        $_POST = NULL;
        $_POST['controlador'] = $controlador;
        $_POST['action'] = $action;
        $_POST['titulo_noticia'] = 'noticiaprueba';
        $_POST['contenido_noticia'] = 'Esto es un posible contenido de la noticia';
        $_POST['fecha_noticia'] = '01/01/2023';
        $resultadoTest = $this->hacerPruebaAñadirNoticiaOK($_POST);
        array_push($pruebas, $resultadoTest);

        //AÑADIR_NOTICIA_YA_EXISTE
        $_POST = NULL;
        $_POST['controlador'] = $controlador;
        $_POST['action'] = $action;
        $_POST['titulo_noticia'] = 'noticiaprueba';
        $_POST['contenido_noticia'] = 'Esto es un posible contenido de la noticia';
        $_POST['fecha_noticia'] = '01/01/2023';
        $resultadoTest = $this->hacerPruebaAñadirNoticiaYaExiste($_POST);
        array_push($pruebas, $resultadoTest);

        //MODIFICAR_NOTICIA_OK
        $action = 'edit';

        $_POST = NULL;
        $_POST['controlador'] = $controlador;
        $_POST['action'] = $action;
        $_POST['id_accion'] = 2;
        $_POST['titulo_noticia'] = 'noticiaprueba';
        $_POST['contenido_noticia'] = 'Esto es una descripcion modificada para pruebas';
        $_POST['fecha_noticia'] = '01/01/2023';
        $resultadoTest = $this->hacerPruebaModificarNoticiaOK($_POST);
        array_push($pruebas, $resultadoTest);

        //MODIFICAR_NOTICIA_NO_EXISTE
        $_POST = NULL;
        $_POST['controlador'] = $controlador;
        $_POST['action'] = $action;
        $_POST['id_accion'] = 1;
        $_POST['titulo_noticia'] = 'noticiaInexistente';
        $_POST['contenido_noticia'] = 'Esto es una descripcion modificada para pruebas';
        $_POST['fecha_noticia'] = '01/01/2023';
        $resultadoTest = $this->hacerPruebaModificarNoticiaNoExiste($_POST);
        array_push($pruebas, $resultadoTest);

         //DELETE_NOTICIA_OK
         $action = 'delete';

         $_POST = NULL;
         $_POST['controlador'] = $controlador;
         $_POST['action'] = $action;
         $_POST['id_accion'] = 2;
         $_POST['titulo_noticia'] = 'noticiaprueba';
         $_POST['contenido_noticia'] = 'Esto es una descripcion modificada para pruebas';
         $_POST['fecha_noticia'] = '01/01/2023';
         $resultadoTest = $this->hacerPruebaDeleteNoticiaOK($_POST);
         array_push($pruebas, $resultadoTest);

         //DELETE_NOTICIA_NO_EXISTE
         $action = 'delete';
         $_POST = NULL;
         $_POST['controlador'] = $controlador;
         $_POST['action'] = $action;
         $_POST['id_accion'] = 1;
         $_POST['titulo_noticia'] = 'noticiaInexistente';
         $_POST['contenido_noticia'] = 'Esto es una descripcion modificada para pruebas';
         $_POST['fecha_noticia'] = '01/01/2023';
         $resultadoTest = $this->hacerPruebaDeleteNoticiaNoExiste($_POST);
         array_push($pruebas, $resultadoTest);
         
        $this->deleteData('titulo_noticia', 'noticiaprueba');
        return $pruebas;

    }

    function hacerPruebaAñadirNoticiaOK($atributo){
        $resultado = $this->conexionesBDTest->pruebaTesting('accion', $atributo);
        $resultadoEsperado = 'ADD_NOTICIA_COMPLETO'." - ". ADD_NOTICIA_COMPLETO;
        $resultadoObtenido = '';
        if(!empty($resultado) && $resultado['code'] == 'ADD_NOTICIA_COMPLETO'){
            $resultadoObtenido = 'ADD_NOTICIA_COMPLETO'." - ". ADD_NOTICIA_COMPLETO;
        }
        $datosValores = array(
            'titulo_noticia' => $atributo['titulo_noticia'],
            'contenido_noticia' => $atributo['contenido_noticia']
            'fecha_noticia' => $atributo['fecha_noticia']
        );
        return $this->test->createDatosPruebaAcciones($resultadoObtenido, $resultadoEsperado, ADD_NOTICIA_COMPLETO , ÉXITO, $datosValores);
    }

    function hacerPruebaAñadirNoticiaYaExiste($atributo){
        $resultado = $this->conexionesBDTest->pruebaTesting('accion', $atributo);
        $resultadoEsperado = 'NOTICIA_YA_EXISTE'." - ". NOTICIA_YA_EXISTE;
        $resultadoObtenido = '';
    
        if(!empty($resultado) && $resultado['code'] == 'NOTICIA_YA_EXISTE'){
            $resultadoObtenido = 'NOTICIA_YA_EXISTE'." - ". NOTICIA_YA_EXISTE;
        }

        $datosValores = array(
            'titulo_noticia' => $atributo['titulo_noticia'],
            'contenido_noticia' => $atributo['contenido_noticia']
            'fecha_noticia' => $atributo['fecha_noticia']
        );

        return $this->test->createDatosPruebaAcciones($resultadoObtenido, $resultadoEsperado, NOTICIA_YA_EXISTE , ERROR, $datosValores);
    }

    function hacerPruebaModificarNoticiaOK($atributo){
        $resultado = $this->conexionesBDTest->pruebaTesting('accion', $atributo);
        $resultadoEsperado = 'EDIT_NOTICIA_COMPLETO'." - ". EDIT_NOTICIA_COMPLETO;
        $resultadoObtenido = '';
        if(!empty($resultado) && $resultado['code'] == 'EDIT_NOTICIA_COMPLETO'){
            $resultadoObtenido = 'EDIT_NOTICIA_COMPLETO'." - ". EDIT_NOTICIA_COMPLETO;
        }
        $datosValores = array(
            'titulo_noticia' => $atributo['titulo_noticia'],
            'contenido_noticia' => $atributo['contenido_noticia']
            'fecha_noticia' => $atributo['fecha_noticia']
        );
        return $this->test->createDatosPruebaAcciones($resultadoObtenido, $resultadoEsperado, EDIT_NOTICIA_COMPLETO , ÉXITO, $datosValores);
    }

    function hacerPruebaModificarNoticiaNoExiste($atributo){
        $resultado = $this->conexionesBDTest->pruebaTesting('accion', $atributo);
        $resultadoEsperado = 'NOTICIA_NO_EXISTE'." - ". NOTICIA_NO_EXISTE;
        $resultadoObtenido = '';
        if(!empty($resultado) && $resultado['code'] == 'NOTICIA_NO_EXISTE'){
            $resultadoObtenido = 'NOTICIA_NO_EXISTE'." - ". NOTICIA_NO_EXISTE;
        }
        $datosValores = array(
            'titulo_noticia' => $atributo['titulo_noticia'],
            'contenido_noticia' => $atributo['contenido_noticia']
            'fecha_noticia' => $atributo['fecha_noticia']
        );
        return $this->test->createDatosPruebaAcciones($resultadoObtenido, $resultadoEsperado, NOTICIA_NO_EXISTE , ERROR, $datosValores);
    }

    function hacerPruebaDeleteNoticiaOK($atributo){
        $resultado = $this->conexionesBDTest->pruebaTesting('accion', $atributo);
        $resultadoEsperado = 'DELETE_NOTICIA_COMPLETO'." - ". DELETE_NOTICIA_COMPLETO;
        $resultadoObtenido = '';
        if(!empty($resultado) && $resultado['code'] == 'DELETE_NOTICIA_COMPLETO'){
            $resultadoObtenido = 'DELETE_NOTICIA_COMPLETO'." - ". DELETE_NOTICIA_COMPLETO;
        }
        $datosValores = array(
            'titulo_noticia' => $atributo['titulo_noticia'],
            'contenido_noticia' => $atributo['contenido_noticia']
            'fecha_noticia' => $atributo['fecha_noticia']
        );
        return $this->test->createDatosPruebaAcciones($resultadoObtenido, $resultadoEsperado, DELETE_NOTICIA_COMPLETO , ERROR, $datosValores);
    }

    function hacerPruebaDeleteNoticiaNoExiste($atributo){
        $resultado = $this->conexionesBDTest->pruebaTesting('accion', $atributo);
        $resultadoEsperado = 'NOTICIA_NO_EXISTE'." - ". NOTICIA_NO_EXISTE;
        $resultadoObtenido = '';
        if(!empty($resultado) && $resultado['code'] == 'NOTICIA_NO_EXISTE'){
            $resultadoObtenido = 'NOTICIA_NO_EXISTE'." - ". NOTICIA_NO_EXISTE;
        }
        $datosValores = array(
            'titulo_noticia' => $atributo['titulo_noticia'],
            'contenido_noticia' => $atributo['contenido_noticia']
            'fecha_noticia' => $atributo['fecha_noticia']
        );
        return $this->test->createDatosPruebaAcciones($resultadoObtenido, $resultadoEsperado, NOTICIA_NO_EXISTE , ERROR, $datosValores);
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