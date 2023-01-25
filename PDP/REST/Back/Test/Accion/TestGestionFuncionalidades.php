<?php

include_once './Test/Test.php';
include_once './Test/Accion/ConexionesBDTest.php';

class TestGestionFuncionalidades{
    private $test;
    private $conexionesBDTest;

    function __construct()
    {
        $this->test = new Test();
        $this->conexionesBDTest = new ConexionesBDTest();
    }
    function testFuncionalidadesGestionFuncionalidad() {
        $pruebas = array();
        $controlador = 'GestionFuncionalidades';
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
        $resultadoTest = $this->hacerPruebaAñadirFuncionalidadYaExiste($_POST);
        array_push($pruebas, $resultadoTest);

        //MODIFICAR_FUNCIONALIDAD_OK
        $action = 'edit';

        $_POST = NULL;
        $_POST['controlador'] = $controlador;
        $_POST['action'] = $action;
        $_POST['id_funcionalidad'] = 3;
        $_POST['nombre_funcionalidad'] = 'FUNCIONALIDADprueba';
        $_POST['descripcion_funcionalidad'] = 'Descripcion de la funcionalidad';
        $resultadoTest = $this->hacerPruebaModificarFUNCIONALIDADOK($_POST);
        array_push($pruebas, $resultadoTest);

        //MODIFICAR_FUNCIONALIDAD_NO_EXISTE
        $_POST = NULL;
        $_POST['controlador'] = $controlador;
        $_POST['action'] = $action;
        $_POST['id_funcionalidad'] = 1;
        $_POST['nombre_funcionalidad'] = 'Gestión de noticias';
        $_POST['descripcion_funcionalidad'] = 'Permite realizar acciones sobre las noticias de la aplicación actual';
        $resultadoTest = $this->hacerPruebaModificarFuncionalidadNoExiste($_POST);
        array_push($pruebas, $resultadoTest);

         //DELETE_FUNCIONALIDAD_OK
         $action = 'delete';

         $_POST = NULL;
         $_POST['controlador'] = $controlador;
         $_POST['action'] = $action;
         $_POST['id_funcionalidad'] = 11;
         $_POST['nombre_funcionalidad'] = 'FUNCIONALIDADprueba';
         $_POST['descripcion_funcionalidad'] = 'Descripcion de la funcionalidad';
         $resultadoTest = $this->hacerPruebaDeleteFuncionalidadOK($_POST);
         array_push($pruebas, $resultadoTest);

         //DELETE_FUNCIONALIDAD_NO_EXISTE
         $action = 'delete';
         $_POST = NULL;
         $_POST['controlador'] = $controlador;
         $_POST['action'] = $action;
         $_POST['id_funcionalidad'] = 1;
         $_POST['nombre_funcionalidad'] = 'Funcionalidad de gestion inexistente';
         $_POST['descripcion_funcionalidad'] = 'Esto es una descripcion modificada para pruebas';
         $resultadoTest = $this->hacerPruebaDeleteFuncionalidadNoExiste($_POST);
         array_push($pruebas, $resultadoTest);
         
        $this->deleteData('nombre_funcionalidad', 'FUNCIONALIDADprueba');
        return $pruebas;

    }

    function hacerPruebaAñadirFuncionalidadDOK($atributo){
        $resultado = $this->conexionesBDTest->pruebaTesting('accion', $atributo);
        $resultadoEsperado = 'ADD_FUNCIONALIDAD_COMPLETO'." - ". ADD_FUNCIONALIDAD_COMPLETO;
        $resultadoObtenido = '';
        if(!empty($resultado) && $resultado['code'] == 'ADD_FUNCIONALIDAD_COMPLETO'){
            $resultadoObtenido = 'ADD_FUNCIONALIDAD_COMPLETO'." - ". ADD_FUNCIONALIDAD_COMPLETO;
        }
        $datosValores = array(
            'nombre_funcionalidad' => $atributo['nombre_funcionalidad'],
            'descripcion_funcionalidad' => $atributo['descripcion_funcionalidad']
        );
        return $this->test->createDatosPruebaAcciones($resultadoObtenido, $resultadoEsperado, ADD_FUNCIONALIDAD_COMPLETO , ÉXITO, $datosValores);
    }

    function hacerPruebaAñadirFuncionalidadYaExiste($atributo){
        $resultado = $this->conexionesBDTest->pruebaTesting('accion', $atributo);
        $resultadoEsperado = 'FUNCIONALIDAD_YA_EXISTE'." - ". FUNCIONALIDAD_YA_EXISTE;
        $resultadoObtenido = '';
    
        if(!empty($resultado) && $resultado['code'] == 'FUNCIONALIDAD_YA_EXISTE'){
            $resultadoObtenido = 'FUNCIONALIDAD_YA_EXISTE'." - ". FUNCIONALIDAD_YA_EXISTE;
        }

        $datosValores = array(
            'nombre_funcionalidad' => $atributo['nombre_funcionalidad'],
            'descripcion_funcionalidad' => $atributo['descripcion_funcionalidad']
        );

        return $this->test->createDatosPruebaAcciones($resultadoObtenido, $resultadoEsperado, FUNCIONALIDAD_YA_EXISTE , ERROR, $datosValores);
    }

    function hacerPruebaModificarFuncionalidadOK($atributo){
        $resultado = $this->conexionesBDTest->pruebaTesting('accion', $atributo);
        $resultadoEsperado = 'EDIT_FUNCIONALIDAD_COMPLETO'." - ". EDIT_FUNCIONALIDAD_COMPLETO;
        $resultadoObtenido = '';
        if(!empty($resultado) && $resultado['code'] == 'EDIT_FUNCIONALIDAD_COMPLETO'){
            $resultadoObtenido = 'EDIT_FUNCIONALIDAD_COMPLETO'." - ". EDIT_FUNCIONALIDAD_COMPLETO;
        }
        $datosValores = array(
            'nombre_funcionalidad' => $atributo['nombre_funcionalidad'],
            'descripcion_funcionalidad' => $atributo['descripcion_funcionalidad']
        );
        return $this->test->createDatosPruebaAcciones($resultadoObtenido, $resultadoEsperado, EDIT_FUNCIONALIDAD_COMPLETO , ÉXITO, $datosValores);
    }

    function hacerPruebaModificarFuncionalidadNoExiste($atributo){
        $resultado = $this->conexionesBDTest->pruebaTesting('accion', $atributo);
        $resultadoEsperado = 'FUNCIONALIDAD_NO_EXISTE'." - ". FUNCIONALIDAD_NO_EXISTE;
        $resultadoObtenido = '';
        if(!empty($resultado) && $resultado['code'] == 'FUNCIONALIDAD_NO_EXISTE'){
            $resultadoObtenido = 'FUNCIONALIDAD_NO_EXISTE'." - ". FUNCIONALIDAD_NO_EXISTE;
        }
        $datosValores = array(
            'nombre_funcionalidad' => $atributo['nombre_funcionalidad'],
            'descripcion_funcionalidad' => $atributo['descripcion_funcionalidad']
        );
        return $this->test->createDatosPruebaAcciones($resultadoObtenido, $resultadoEsperado, FUNCIONALIDAD_NO_EXISTE , ERROR, $datosValores);
    }

    function hacerPruebaDeleteFuncionalidadOK($atributo){
        $resultado = $this->conexionesBDTest->pruebaTesting('accion', $atributo);
        $resultadoEsperado = 'DELETE_FUNCIONALIDAD_COMPLETO'." - ". DELETE_FUNCIONALIDAD_COMPLETO;
        $resultadoObtenido = '';
        if(!empty($resultado) && $resultado['code'] == 'DELETE_FUNCIONALIDAD_COMPLETO'){
            $resultadoObtenido = 'DELETE_FUNCIONALIDAD_COMPLETO'." - ". DELETE_FUNCIONALIDAD_COMPLETO;
        }
        $datosValores = array(
            'nombre_funcionalidad' => $atributo['nombre_funcionalidad'],
            'descripcion_funcionalidad' => $atributo['descripcion_funcionalidad']
        );
        return $this->test->createDatosPruebaAcciones($resultadoObtenido, $resultadoEsperado, DELETE_FUNCIONALIDAD_COMPLETO , ERROR, $datosValores);
    }

    function hacerPruebaDeleteFuncionalidadNoExiste($atributo){
        $resultado = $this->conexionesBDTest->pruebaTesting('accion', $atributo);
        $resultadoEsperado = 'FUNCIONALIDAD_NO_EXISTE'." - ". FUNCIONALIDAD_NO_EXISTE;
        $resultadoObtenido = '';
        if(!empty($resultado) && $resultado['code'] == 'FUNCIONALIDAD_NO_EXISTE'){
            $resultadoObtenido = 'FUNCIONALIDAD_NO_EXISTE'." - ". FUNCIONALIDAD_NO_EXISTE;
        }
        $datosValores = array(
            'nombre_funcionalidad' => $atributo['nombre_funcionalidad'],
            'descripcion_funcionalidad' => $atributo['descripcion_funcionalidad']
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