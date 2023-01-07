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
    function testAccionesGestionAcciones() {
        $pruebas = array();
        $controlador = 'GestionAcciones';
        $action = 'add';

       //AÑADIR_ACCION_OK
        $_POST = NULL;
        $_POST['controlador'] = $controlador;
        $_POST['action'] = $action;
        $_POST['nombre_accion'] = 'accion';
        $_POST['descripcion_accion'] = 'Esta es la descripción de la acción';
        $_POST['borrado_accion'] = 0;
        $resultadoTest = $this->hacerPruebaAñadirAccionOK($_POST);
        array_push($pruebas, $resultadoTest);

        //AÑADIR_ACCION_YA_EXISTE
        $_POST = NULL;
        $_POST['controlador'] = $controlador;
        $_POST['action'] = $action;
        $_POST['nombre_accion'] = 'Accion';
        $_POST['descripcion_accion'] = 'Esta es la descripción de la acción';
        $resultadoTest = $this->hacerPruebaAñadirAccionYaExiste($_POST);
        array_push($pruebas, $resultadoTest);

        //MODIFICAR_ACCION_OK
        $action = 'edit';
        $_POST = NULL;
        $_POST['controlador'] = $controlador;
        $_POST['action'] = $action;
        $_POST['id_accion'] = 2;
        $_POST['nombre_accion'] = 'Añadir';
        $_POST['descripcion_accion'] = 'Esta es la acción que permite insertar datos en la aplicación';
        $resultadoTest = $this->hacerPruebaModificarAccionOK($_POST);
        array_push($pruebas, $resultadoTest);

        //MODIFICAR_ACCION_NO_EXISTE
        $_POST = NULL;
        $_POST['controlador'] = $controlador;
        $_POST['action'] = $action;
        $_POST['id_accion'] = 1;
        $_POST['nombre_accion'] = 'Modificar';
        $_POST['descripcion_accion'] = 'Esta es la acción que permite cambiar datos en la aplicación';
        $resultadoTest = $this->hacerPruebaModificarAccionNoExiste($_POST);
        array_push($pruebas, $resultadoTest);

         //DELETE_ACCION_OK
         $action = 'delete';
         $_POST = NULL;
         $_POST['controlador'] = $controlador;
         $_POST['action'] = $action;
         $_POST['id_accion'] = 2;
         $_POST['nombre_accion'] = 'Añadir';
         $_POST['descripcion_accion'] = 'Esta es la acción que permite insertar datos en la aplicación';
         $resultadoTest = $this->hacerPruebaDeleteAccionOK($_POST);
         array_push($pruebas, $resultadoTest);

         //DELETE_ACCION_NO_EXISTE
         $action = 'delete';
         $_POST = NULL;
         $_POST['controlador'] = $controlador;
         $_POST['action'] = $action;
         $_POST['id_accion'] = 1;
         $_POST['nombre_accion'] = 'Modificar';
         $_POST['descripcion_accion'] = 'Esta es la acción que permite cambiar datos en la aplicación';
         $resultadoTest = $this->hacerPruebaDeleteAccionNoExiste($_POST);
         array_push($pruebas, $resultadoTest);

         //DELETE_ACCION_ASOCIADA_USUARIO_FUNCIONALIDAD
         $action = 'delete';
         $_POST = NULL;
         $_POST['controlador'] = $controlador;
         $_POST['action'] = $action;
         $_POST['id_accion'] = 2;
         $_POST['nombre_accion'] = 'Añadir';
         $_POST['descripcion_accion'] = 'Esta es la acción que permite insertar datos en la aplicación';
         $resultadoTest = $this->hacerPruebaDeleteAccionAsociadaUsuarioFuncionalidad($_POST);
         array_push($pruebas, $resultadoTest);

        //REACTIVAR_ACCION_OK
         $action = 'reactivar';
         $_POST = NULL;
         $_POST['controlador'] = $controlador;
         $_POST['action'] = $action;
         $_POST['id_accion'] = 2;
         $_POST['nombre_accion'] = 'Añadir';
         $_POST['descripcion_accion'] = 'Esta es la acción que permite insertar datos en la aplicación';
         $resultadoTest = $this->hacerPruebaReactivarAccionOK($_POST);
         array_push($pruebas, $resultadoTest);

         //REACTIVAR_ACCION_NO_EXISTE
         $action = 'reactivar';
         $_POST = NULL;
         $_POST['controlador'] = $controlador;
         $_POST['action'] = $action;
         $_POST['id_accion'] = 1;
         $_POST['nombre_accion'] = 'Modificar';
         $_POST['descripcion_accion'] = 'Esta es la acción que permite cambiar datos en la aplicación';
         $resultadoTest = $this->hacerPruebaReactivarAccionNoExiste($_POST);
         array_push($pruebas, $resultadoTest);
 
        
        $this->deleteData('nombre_accion', 'Accion');
        return $pruebas;

    }

    function hacerPruebaAñadirAccionOK($atributo){
        $resultado = $this->conexionesBDTest->pruebaTesting('accion', $atributo);
        $resultadoEsperado = 'ADD_ACCION_COMPLETO'." - ". ADD_ACCION_COMPLETO;
        $resultadoObtenido = '';
        if(!empty($resultado) && $resultado['code'] == 'ADD_ACCION_COMPLETO'){
            $resultadoObtenido = 'ADD_ACCION_COMPLETO'." - ". ADD_ACCION_COMPLETO;
        }
        $datosValores = array(
            'nombre_accion' => $atributo['nombre_accion'],
            'descripcion_accion' => $atributo['descripcion_accion']
        );
        return $this->test->createDatosPruebaAcciones($resultadoObtenido, $resultadoEsperado, ADD_ACCION_COMPLETO , ÉXITO, $datosValores);
    }

    function hacerPruebaAñadirAccionYaExiste($atributo){
        $resultado = $this->conexionesBDTest->pruebaTesting('accion', $atributo);
        $resultadoEsperado = 'ACCION_YA_EXISTE'." - ". ACCION_YA_EXISTE;
        $resultadoObtenido = '';
    
        if(!empty($resultado) && $resultado['code'] == 'ACCION_YA_EXISTE'){
            $resultadoObtenido = 'ACCION_YA_EXISTE'." - ". ACCION_YA_EXISTE;
        }

        $datosValores = array(
            'nombre_accion' => $atributo['nombre_accion'],
            'descripcion_accion' => $atributo['descripcion_accion']
        );

        return $this->test->createDatosPruebaAcciones($resultadoObtenido, $resultadoEsperado, ACCION_YA_EXISTE , ERROR, $datosValores);
    }

    function hacerPruebaModificarAccionOK($atributo){
        $resultado = $this->conexionesBDTest->pruebaTesting('accion', $atributo);
        $resultadoEsperado = 'EDIT_ACCION_COMPLETO'." - ". EDIT_ACCION_COMPLETO;
        $resultadoObtenido = '';
        if(!empty($resultado) && $resultado['code'] == 'EDIT_ACCION_COMPLETO'){
            $resultadoObtenido = 'EDIT_ACCION_COMPLETO'." - ". EDIT_ACCION_COMPLETO;
        }
        $datosValores = array(
            'nombre_accion' => $atributo['nombre_accion'],
            'descripcion_accion' => $atributo['descripcion_accion']
        );
        return $this->test->createDatosPruebaAcciones($resultadoObtenido, $resultadoEsperado, EDIT_ACCION_COMPLETO , ÉXITO, $datosValores);
    }

    function hacerPruebaModificarAccionNoExiste($atributo){
        $resultado = $this->conexionesBDTest->pruebaTesting('accion', $atributo);
        $resultadoEsperado = 'ACCION_NO_EXISTE'." - ". ACCION_NO_EXISTE;
        $resultadoObtenido = '';
        if(!empty($resultado) && $resultado['code'] == 'ACCION_NO_EXISTE'){
            $resultadoObtenido = 'ACCION_NO_EXISTE'." - ". ACCION_NO_EXISTE;
        }
        $datosValores = array(
            'nombre_accion' => $atributo['nombre_accion'],
            'descripcion_accion' => $atributo['descripcion_accion']
        );
        return $this->test->createDatosPruebaAcciones($resultadoObtenido, $resultadoEsperado, ACCION_NO_EXISTE , ERROR, $datosValores);
    }

    function hacerPruebaDeleteAccionOK($atributo){
        $resultado = $this->conexionesBDTest->pruebaTesting('accion', $atributo);
        $resultadoEsperado = 'DELETE_ACCION_COMPLETO'." - ". DELETE_ACCION_COMPLETO;
        $resultadoObtenido = '';
        if(!empty($resultado) && $resultado['code'] == 'DELETE_ACCION_COMPLETO'){
            $resultadoObtenido = 'DELETE_ACCION_COMPLETO'." - ". DELETE_ACCION_COMPLETO;
        }
        $datosValores = array(
            'nombre_accion' => $atributo['nombre_accion'],
            'descripcion_accion' => $atributo['descripcion_accion']
        );
        return $this->test->createDatosPruebaAcciones($resultadoObtenido, $resultadoEsperado, DELETE_ACCION_COMPLETO , ERROR, $datosValores);
    }

    function hacerPruebaDeleteAccionNoExiste($atributo){
        $resultado = $this->conexionesBDTest->pruebaTesting('accion', $atributo);
        $resultadoEsperado = 'ACCION_NO_EXISTE'." - ". ACCION_NO_EXISTE;
        $resultadoObtenido = '';
        if(!empty($resultado) && $resultado['code'] == 'ACCION_NO_EXISTE'){
            $resultadoObtenido = 'ACCION_NO_EXISTE'." - ". ACCION_NO_EXISTE;
        }
        $datosValores = array(
            'nombre_accion' => $atributo['nombre_accion'],
            'descripcion_accion' => $atributo['descripcion_accion']
        );
        return $this->test->createDatosPruebaAcciones($resultadoObtenido, $resultadoEsperado, ACCION_NO_EXISTE , ERROR, $datosValores);
    }

    function hacerPruebaDeleteAccionAsociadaUsuarioFuncionalidad($atributo){
        $resultado = $this->conexionesBDTest->pruebaTesting('accion', $atributo);
        $resultadoEsperado = 'ACCION_TIENE_PERMISOS_ASOCIADOS'." - ". ACCION_TIENE_PERMISOS_ASOCIADOS;
        $resultadoObtenido = '';
        if(!empty($resultado) && $resultado['code'] == 'ACCION_TIENE_PERMISOS_ASOCIADOS'){
            $resultadoObtenido = 'ACCION_TIENE_PERMISOS_ASOCIADOS'." - ". ACCION_TIENE_PERMISOS_ASOCIADOS;
        }
        $datosValores = array(
            'nombre_accion' => $atributo['nombre_accion'],
            'descripcion_accion' => $atributo['descripcion_accion']
        );
        return $this->test->createDatosPruebaAcciones($resultadoObtenido, $resultadoEsperado, ACCION_TIENE_PERMISOS_ASOCIADOS , ERROR, $datosValores);
    }

    function hacerPruebaReactivarAccionOK($atributo){
        $resultado = $this->conexionesBDTest->pruebaTesting('accion', $atributo);
        $resultadoEsperado = 'REACTIVAR_ACCION_CORRECTO'." - ". REACTIVAR_ACCION_CORRECTO;
        $resultadoObtenido = '';
        if(!empty($resultado) && $resultado['code'] == 'REACTIVAR_ACCION_CORRECTO'){
            $resultadoObtenido = 'REACTIVAR_ACCION_CORRECTO'." - ". REACTIVAR_ACCION_CORRECTO;
        }
        $datosValores = array(
            'nombre_accion' => $atributo['nombre_accion'],
            'descripcion_accion' => $atributo['descripcion_accion']
        );
        return $this->test->createDatosPruebaAcciones($resultadoObtenido, $resultadoEsperado, DELETE_ACCION_COMPLETO , ERROR, $datosValores);
    }

    function hacerPruebaReactivarAccionNoExiste($atributo){
        $resultado = $this->conexionesBDTest->pruebaTesting('accion', $atributo);
        $resultadoEsperado = 'ACCION_NO_EXISTE'." - ". ACCION_NO_EXISTE;
        $resultadoObtenido = '';
        if(!empty($resultado) && $resultado['code'] == 'ACCION_NO_EXISTE'){
            $resultadoObtenido = 'ACCION_NO_EXISTE'." - ". ACCION_NO_EXISTE;
        }
        $datosValores = array(
            'nombre_accion' => $atributo['nombre_accion'],
            'descripcion_accion' => $atributo['descripcion_accion']
        );
        return $this->test->createDatosPruebaAcciones($resultadoObtenido, $resultadoEsperado, DELETE_ACCION_COMPLETO , ERROR, $datosValores);
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