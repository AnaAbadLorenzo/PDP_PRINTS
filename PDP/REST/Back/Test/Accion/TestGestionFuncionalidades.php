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
    function testFUNCIONALIDADsGestionFUNCIONALIDADs() {
        $pruebas = array();
        $controlador = 'GestionFUNCIONALIDADs';
        $action = 'add';

       //AÑADIR_FUNCIONALIDAD_OK
        $_POST = NULL;
        $_POST['controlador'] = $controlador;
        $_POST['action'] = $action;
        $_POST['nombre_funcionalidad'] = 'FUNCIONALIDADprueba';
        $_POST['descripcion_funcionalidad'] = 'Descripcion de la funcionalidad';
        $_POST['borrado_funcionalidad'] = 0;
        $resultadoTest = $this->hacerPruebaAñadirFuncionalidadOK($_POST);
        array_push($pruebas, $resultadoTest);

        //AÑADIR_FUNCIONALIDAD_YA_EXISTE
        $_POST = NULL;
        $_POST['controlador'] = $controlador;
        $_POST['action'] = $action;
        $_POST['nombre_funcionalidad'] = 'FUNCIONALIDADprueba';
        $_POST['descripcion_funcionalidad'] = 'Descripcion de la funcionalidad';
        $_POST['borrado_funcionalidad'] = 0;
        $resultadoTest = $this->hacerPruebaAñadirFUNCIONALIDADYaExiste($_POST);
        array_push($pruebas, $resultadoTest);

        //MODIFICAR_FUNCIONALIDAD_OK
        $action = 'edit';

        $_POST = NULL;
        $_POST['controlador'] = $controlador;
        $_POST['action'] = $action;
        $_POST['id_accion'] = 2;
        $_POST['titulo_FUNCIONALIDAD'] = 'FUNCIONALIDADprueba';
        $_POST['contenido_FUNCIONALIDAD'] = 'Esto es una descripcion modificada para pruebas';
        $_POST['fecha_FUNCIONALIDAD'] = '01/01/2023';
        $resultadoTest = $this->hacerPruebaModificarFUNCIONALIDADOK($_POST);
        array_push($pruebas, $resultadoTest);

        //MODIFICAR_FUNCIONALIDAD_NO_EXISTE
        $_POST = NULL;
        $_POST['controlador'] = $controlador;
        $_POST['action'] = $action;
        $_POST['id_accion'] = 1;
        $_POST['titulo_FUNCIONALIDAD'] = 'FUNCIONALIDADInexistente';
        $_POST['contenido_FUNCIONALIDAD'] = 'Esto es una descripcion modificada para pruebas';
        $_POST['fecha_FUNCIONALIDAD'] = '01/01/2023';
        $resultadoTest = $this->hacerPruebaModificarFUNCIONALIDADNoExiste($_POST);
        array_push($pruebas, $resultadoTest);

         //DELETE_FUNCIONALIDAD_OK
         $action = 'delete';

         $_POST = NULL;
         $_POST['controlador'] = $controlador;
         $_POST['action'] = $action;
         $_POST['id_accion'] = 2;
         $_POST['titulo_FUNCIONALIDAD'] = 'FUNCIONALIDADprueba';
         $_POST['contenido_FUNCIONALIDAD'] = 'Esto es una descripcion modificada para pruebas';
         $_POST['fecha_FUNCIONALIDAD'] = '01/01/2023';
         $resultadoTest = $this->hacerPruebaDeleteFUNCIONALIDADOK($_POST);
         array_push($pruebas, $resultadoTest);

         //DELETE_FUNCIONALIDAD_NO_EXISTE
         $action = 'delete';
         $_POST = NULL;
         $_POST['controlador'] = $controlador;
         $_POST['action'] = $action;
         $_POST['id_accion'] = 1;
         $_POST['titulo_FUNCIONALIDAD'] = 'FUNCIONALIDADInexistente';
         $_POST['contenido_FUNCIONALIDAD'] = 'Esto es una descripcion modificada para pruebas';
         $_POST['fecha_FUNCIONALIDAD'] = '01/01/2023';
         $resultadoTest = $this->hacerPruebaDeleteFUNCIONALIDADNoExiste($_POST);
         array_push($pruebas, $resultadoTest);
         
        $this->deleteData('titulo_FUNCIONALIDAD', 'FUNCIONALIDADprueba');
        return $pruebas;

    }

    function hacerPruebaAñadirFUNCIONALIDADOK($atributo){
        $resultado = $this->conexionesBDTest->pruebaTesting('accion', $atributo);
        $resultadoEsperado = 'ADD_FUNCIONALIDAD_COMPLETO'." - ". ADD_FUNCIONALIDAD_COMPLETO;
        $resultadoObtenido = '';
        if(!empty($resultado) && $resultado['code'] == 'ADD_FUNCIONALIDAD_COMPLETO'){
            $resultadoObtenido = 'ADD_FUNCIONALIDAD_COMPLETO'." - ". ADD_FUNCIONALIDAD_COMPLETO;
        }
        $datosValores = array(
            'titulo_FUNCIONALIDAD' => $atributo['titulo_FUNCIONALIDAD'],
            'contenido_FUNCIONALIDAD' => $atributo['contenido_FUNCIONALIDAD']
            'fecha_FUNCIONALIDAD' => $atributo['fecha_FUNCIONALIDAD']
        );
        return $this->test->createDatosPruebaAcciones($resultadoObtenido, $resultadoEsperado, ADD_FUNCIONALIDAD_COMPLETO , ÉXITO, $datosValores);
    }

    function hacerPruebaAñadirFUNCIONALIDADYaExiste($atributo){
        $resultado = $this->conexionesBDTest->pruebaTesting('accion', $atributo);
        $resultadoEsperado = 'FUNCIONALIDAD_YA_EXISTE'." - ". FUNCIONALIDAD_YA_EXISTE;
        $resultadoObtenido = '';
    
        if(!empty($resultado) && $resultado['code'] == 'FUNCIONALIDAD_YA_EXISTE'){
            $resultadoObtenido = 'FUNCIONALIDAD_YA_EXISTE'." - ". FUNCIONALIDAD_YA_EXISTE;
        }

        $datosValores = array(
            'titulo_FUNCIONALIDAD' => $atributo['titulo_FUNCIONALIDAD'],
            'contenido_FUNCIONALIDAD' => $atributo['contenido_FUNCIONALIDAD']
            'fecha_FUNCIONALIDAD' => $atributo['fecha_FUNCIONALIDAD']
        );

        return $this->test->createDatosPruebaAcciones($resultadoObtenido, $resultadoEsperado, FUNCIONALIDAD_YA_EXISTE , ERROR, $datosValores);
    }

    function hacerPruebaModificarFUNCIONALIDADOK($atributo){
        $resultado = $this->conexionesBDTest->pruebaTesting('accion', $atributo);
        $resultadoEsperado = 'EDIT_FUNCIONALIDAD_COMPLETO'." - ". EDIT_FUNCIONALIDAD_COMPLETO;
        $resultadoObtenido = '';
        if(!empty($resultado) && $resultado['code'] == 'EDIT_FUNCIONALIDAD_COMPLETO'){
            $resultadoObtenido = 'EDIT_FUNCIONALIDAD_COMPLETO'." - ". EDIT_FUNCIONALIDAD_COMPLETO;
        }
        $datosValores = array(
            'titulo_FUNCIONALIDAD' => $atributo['titulo_FUNCIONALIDAD'],
            'contenido_FUNCIONALIDAD' => $atributo['contenido_FUNCIONALIDAD']
            'fecha_FUNCIONALIDAD' => $atributo['fecha_FUNCIONALIDAD']
        );
        return $this->test->createDatosPruebaAcciones($resultadoObtenido, $resultadoEsperado, EDIT_FUNCIONALIDAD_COMPLETO , ÉXITO, $datosValores);
    }

    function hacerPruebaModificarFUNCIONALIDADNoExiste($atributo){
        $resultado = $this->conexionesBDTest->pruebaTesting('accion', $atributo);
        $resultadoEsperado = 'FUNCIONALIDAD_NO_EXISTE'." - ". FUNCIONALIDAD_NO_EXISTE;
        $resultadoObtenido = '';
        if(!empty($resultado) && $resultado['code'] == 'FUNCIONALIDAD_NO_EXISTE'){
            $resultadoObtenido = 'FUNCIONALIDAD_NO_EXISTE'." - ". FUNCIONALIDAD_NO_EXISTE;
        }
        $datosValores = array(
            'titulo_FUNCIONALIDAD' => $atributo['titulo_FUNCIONALIDAD'],
            'contenido_FUNCIONALIDAD' => $atributo['contenido_FUNCIONALIDAD']
            'fecha_FUNCIONALIDAD' => $atributo['fecha_FUNCIONALIDAD']
        );
        return $this->test->createDatosPruebaAcciones($resultadoObtenido, $resultadoEsperado, FUNCIONALIDAD_NO_EXISTE , ERROR, $datosValores);
    }

    function hacerPruebaDeleteFUNCIONALIDADOK($atributo){
        $resultado = $this->conexionesBDTest->pruebaTesting('accion', $atributo);
        $resultadoEsperado = 'DELETE_FUNCIONALIDAD_COMPLETO'." - ". DELETE_FUNCIONALIDAD_COMPLETO;
        $resultadoObtenido = '';
        if(!empty($resultado) && $resultado['code'] == 'DELETE_FUNCIONALIDAD_COMPLETO'){
            $resultadoObtenido = 'DELETE_FUNCIONALIDAD_COMPLETO'." - ". DELETE_FUNCIONALIDAD_COMPLETO;
        }
        $datosValores = array(
            'titulo_FUNCIONALIDAD' => $atributo['titulo_FUNCIONALIDAD'],
            'contenido_FUNCIONALIDAD' => $atributo['contenido_FUNCIONALIDAD']
            'fecha_FUNCIONALIDAD' => $atributo['fecha_FUNCIONALIDAD']
        );
        return $this->test->createDatosPruebaAcciones($resultadoObtenido, $resultadoEsperado, DELETE_FUNCIONALIDAD_COMPLETO , ERROR, $datosValores);
    }

    function hacerPruebaDeleteFUNCIONALIDADNoExiste($atributo){
        $resultado = $this->conexionesBDTest->pruebaTesting('accion', $atributo);
        $resultadoEsperado = 'FUNCIONALIDAD_NO_EXISTE'." - ". FUNCIONALIDAD_NO_EXISTE;
        $resultadoObtenido = '';
        if(!empty($resultado) && $resultado['code'] == 'FUNCIONALIDAD_NO_EXISTE'){
            $resultadoObtenido = 'FUNCIONALIDAD_NO_EXISTE'." - ". FUNCIONALIDAD_NO_EXISTE;
        }
        $datosValores = array(
            'nombre_accion' => $atributo['nombre_accion'],
            'descripcion_accion' => $atributo['descripcion_accion']
        );
        return $this->test->createDatosPruebaAcciones($resultadoObtenido, $resultadoEsperado, FUNCIONALIDAD_NO_EXISTE , ERROR, $datosValores);
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