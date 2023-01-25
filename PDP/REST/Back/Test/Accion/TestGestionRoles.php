<?php
noticia
include_once './Test/Test.php';
include_once './Test/Accion/ConexionesBDTest.php';

class TestGestionRoles{
    private $test;
    private $conexionesBDTest;

    function __construct()
    {
        $this->test = new Test();
        $this->conexionesBDTest = new ConexionesBDTest();
    }
    function testRolesGestionRoles() {
        $pruebas = array();
        $controlador = 'GestionRoles';
        $action = 'add';

       //AÑADIR_ROL_OK
        $_POST = NULL;
        $_POST['controlador'] = $controlador;
        $_POST['action'] = $action;
        $_POST['nombre_rol'] = 'rolprueba';
        $_POST['descripcion_rol'] = 'Descripcion del rol';
        $_POST['borrado_rol'] = 0;
        $resultadoTest = $this->hacerPruebaAñadirRolOK($_POST);
        array_push($pruebas, $resultadoTest);

        //AÑADIR_ROL_YA_EXISTE
        $_POST = NULL;
        $_POST['controlador'] = $controlador;
        $_POST['action'] = $action;
        $_POST['nombre_rol'] = 'rolprueba';
        $_POST['descripcion_rol'] = 'Descripcion del rol';
        $resultadoTest = $this->hacerPruebaAñadirRolYaExiste($_POST);
        array_push($pruebas, $resultadoTest);

        //MODIFICAR_ROL_OK
        $action = 'edit';

        $_POST = NULL;
        $_POST['controlador'] = $controlador;
        $_POST['action'] = $action;
        $_POST['id_rol'] = 4;
        $_POST['nombre_rol'] = 'rolprueba';
        $_POST['descripcion_rol'] = 'Descripcion del rol modificada';
        $resultadoTest = $this->hacerPruebaModificarRolOK($_POST);
        array_push($pruebas, $resultadoTest);

        //MODIFICAR_ROL_NO_EXISTE
        $_POST = NULL;
        $_POST['controlador'] = $controlador;
        $_POST['action'] = $action;
        $_POST['id_rol'] = 1;
        $_POST['nombre_rol'] = 'Externo';
        $_POST['descripcion_rol'] = 'Existe';
        $resultadoTest = $this->hacerPruebaModificarRolNoExiste($_POST);
        array_push($pruebas, $resultadoTest);

         //DELETE_ROL_OK
         $action = 'delete';

         $_POST = NULL;
         $_POST['controlador'] = $controlador;
         $_POST['action'] = $action;
         $_POST['id_rol'] = 4;
         $_POST['nombre_rol'] = 'rolprueba';
         $_POST['descripcion_rol'] = 'Descripcion del rol modificada';
         $resultadoTest = $this->hacerPruebaDeleteRolOK($_POST);
         array_push($pruebas, $resultadoTest);

         //DELETE_ROL_NO_EXISTE
         $action = 'delete';
         $_POST = NULL;
         $_POST['controlador'] = $controlador;
         $_POST['action'] = $action;
         $_POST['id_accion'] = 1;
         $_POST['nombre_rol'] = 'Externo';
         $_POST['descripcion_rol'] = 'Existe';
         $resultadoTest = $this->hacerPruebaDeleteRolNoExiste($_POST);
         array_push($pruebas, $resultadoTest);
         
        $this->deleteData('nombre_rol', 'rolprueba');
        return $pruebas;

    }

    function hacerPruebaAñadirRolDOK($atributo){
        $resultado = $this->conexionesBDTest->pruebaTesting('accion', $atributo);
        $resultadoEsperado = 'ADD_ROL_COMPLETO'." - ". ADD_ROL_COMPLETO;
        $resultadoObtenido = '';
        if(!empty($resultado) && $resultado['code'] == 'ADD_ROL_COMPLETO'){
            $resultadoObtenido = 'ADD_ROL_COMPLETO'." - ". ADD_ROL_COMPLETO;
        }
        $datosValores = array(
            'nombre_rol' => $atributo['nombre_rol'],
            'descripcion_rol' => $atributo['descripcion_rol']
        );
        return $this->test->createDatosPruebaAcciones($resultadoObtenido, $resultadoEsperado, ADD_ROL_COMPLETO , ÉXITO, $datosValores);
    }

    function hacerPruebaAñadirRolYaExiste($atributo){
        $resultado = $this->conexionesBDTest->pruebaTesting('accion', $atributo);
        $resultadoEsperado = 'ROL_YA_EXISTE'." - ". ROL_YA_EXISTE;
        $resultadoObtenido = '';
    
        if(!empty($resultado) && $resultado['code'] == 'ROL_YA_EXISTE'){
            $resultadoObtenido = 'ROL_YA_EXISTE'." - ". ROL_YA_EXISTE;
        }

        $datosValores = array(
            'nombre_rol' => $atributo['nombre_rol'],
            'descripcion_rol' => $atributo['descripcion_rol']
        );

        return $this->test->createDatosPruebaAcciones($resultadoObtenido, $resultadoEsperado, ROL_YA_EXISTE , ERROR, $datosValores);
    }

    function hacerPruebaModificarRolOK($atributo){
        $resultado = $this->conexionesBDTest->pruebaTesting('accion', $atributo);
        $resultadoEsperado = 'EDIT_ROL_COMPLETO'." - ". EDIT_ROL_COMPLETO;
        $resultadoObtenido = '';
        if(!empty($resultado) && $resultado['code'] == 'EDIT_ROL_COMPLETO'){
            $resultadoObtenido = 'EDIT_ROL_COMPLETO'." - ". EDIT_ROL_COMPLETO;
        }
        $datosValores = array(
            'nombre_rol' => $atributo['nombre_rol'],
            'descripcion_rol' => $atributo['descripcion_rol']
        );
        return $this->test->createDatosPruebaAcciones($resultadoObtenido, $resultadoEsperado, EDIT_ROL_COMPLETO , ÉXITO, $datosValores);
    }

    function hacerPruebaModificarRolNoExiste($atributo){
        $resultado = $this->conexionesBDTest->pruebaTesting('accion', $atributo);
        $resultadoEsperado = 'ROL_NO_EXISTE'." - ". ROL_NO_EXISTE;
        $resultadoObtenido = '';
        if(!empty($resultado) && $resultado['code'] == 'ROL_NO_EXISTE'){
            $resultadoObtenido = 'ROL_NO_EXISTE'." - ". ROL_NO_EXISTE;
        }
        $datosValores = array(
            'nombre_rol' => $atributo['nombre_rol'],
            'descripcion_rol' => $atributo['descripcion_rol']
        );
        return $this->test->createDatosPruebaAcciones($resultadoObtenido, $resultadoEsperado, ROL_NO_EXISTE , ERROR, $datosValores);
    }

    function hacerPruebaDeleteRolOK($atributo){
        $resultado = $this->conexionesBDTest->pruebaTesting('accion', $atributo);
        $resultadoEsperado = 'DELETE_ROL_COMPLETO'." - ". DELETE_ROL_COMPLETO;
        $resultadoObtenido = '';
        if(!empty($resultado) && $resultado['code'] == 'DELETE_ROL_COMPLETO'){
            $resultadoObtenido = 'DELETE_ROL_COMPLETO'." - ". DELETE_ROL_COMPLETO;
        }
        $datosValores = array(
            'nombre_rol' => $atributo['nombre_rol'],
            'descripcion_rol' => $atributo['descripcion_rol']
        );
        return $this->test->createDatosPruebaAcciones($resultadoObtenido, $resultadoEsperado, DELETE_ROL_COMPLETO , ERROR, $datosValores);
    }

    function hacerPruebaDeletRrolNoExiste($atributo){
        $resultado = $this->conexionesBDTest->pruebaTesting('accion', $atributo);
        $resultadoEsperado = 'ROL_NO_EXISTE'." - ". ROL_NO_EXISTE;
        $resultadoObtenido = '';
        if(!empty($resultado) && $resultado['code'] == 'ROL_NO_EXISTE'){
            $resultadoObtenido = 'ROL_NO_EXISTE'." - ". ROL_NO_EXISTE;
        }
        $datosValores = array(
            'nombre_rol' => $atributo['nombre_rol'],
            'descripcion_rol' => $atributo['descripcion_rol']
        );
        return $this->test->createDatosPruebaAcciones($resultadoObtenido, $resultadoEsperado, ROL_NO_EXISTE , ERROR, $datosValores);
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