<?php

include_once './Test/Test.php';
include_once './Test/Accion/ConexionesBDTest.php';

class TestGestionPersonas{
    private $test;
    private $conexionesBDTest;

    function __construct()
    {
        $this->test = new Test();
        $this->conexionesBDTest = new ConexionesBDTest();
    }
    function testAccionesGestionPersonas() {
        $pruebas = array();
        $controlador = 'GestionPersonas';
        $action = 'add';

       //AÑADIR_PERSONA_OK
        $_POST = NULL;
        $_POST = NULL;
        $_POST['controlador'] = $controlador;
        $_POST['action'] = $action;
        $_POST['dni_persona'] = '56508907T';
        $_POST['nombre_persona'] = 'Administrador';
        $_POST['apellidos_persona'] = 'Administrador Administrador';
        $_POST['fecha_nac_persona'] = '2000-12-13';
        $_POST['direccion_persona'] = 'Avenida de la Avenida N23';
        $_POST['telefono_persona'] = 988748598;
        $_POST['email_persona'] = 'anaa@pruebas.com';
        $_POST['borrado_persona'] = 0;
        $_POST['dni_usuario'] = $_POST['dni_persona'];
        $_POST['usuario'] = 'administrador';
        $_POST['passwd_usuario'] = 'administrador';
        $_POST['borrado_usuario'] = 0;
        $_POST['test'] = 'testing';
        $resultadoTest = $this->hacerPruebaAñadirPersonaOK($_POST);
        array_push($pruebas, $resultadoTest);

        //AÑADIR_PERSONA_YA_EXISTE
        $_POST = NULL;
        $_POST['controlador'] = $controlador;
        $_POST['action'] = $action;
        $_POST['dni_persona'] = '56508907T';
        $_POST['nombre_persona'] = 'Ana';
        $_POST['apellidos_persona'] = 'Abad Lorenzo';
        $_POST['fecha_nac_persona'] = '2000-12-13';
        $_POST['direccion_persona'] = 'Avenida de la Avenida N23';
        $_POST['telefono_persona'] = 988748598;
        $_POST['email_persona'] = 'anaa@pruebas.com';
        $_POST['borrado_persona'] = 0;
        $_POST['dni_usuario'] = $_POST['dni_persona'];
        $_POST['usuario'] = 'anita1312';
        $_POST['passwd_usuario'] = 'anita1312';
        $_POST['borrado_usuario'] = 0;
        $_POST['test'] = 'testing';
        $resultadoTest = $this->hacerPruebaAñadirPersonaYaExiste($_POST);
        array_push($pruebas, $resultadoTest);

        //MODIFICAR_PERSONA_OK
        $action = 'edit';

        $_POST = NULL;
        $_POST['controlador'] = $controlador;
        $_POST['action'] = $action;
        $_POST['dni_persona'] = '32720371L';
        $_POST['nombre_persona'] = 'Administrador';
        $_POST['apellidos_persona'] = 'Gomez Gomez';
        $_POST['fecha_nac_persona'] = '2000-12-13';
        $_POST['direccion_persona'] = 'Avenida de la Avenida N23';
        $_POST['telefono_persona'] = 988748598;
        $_POST['email_persona'] = 'anaa@pruebas.com';
        $_POST['borrado_persona'] = 0;
        $_POST['dni_usuario'] = $_POST['dni_persona'];
        $_POST['usuario'] = 'administrador';
        $_POST['passwd_usuario'] = 'administrador';
        $_POST['test'] = 'testing';
        $resultadoTest = $this->hacerPruebaModificarpersonaOK($_POST);
        array_push($pruebas, $resultadoTest);

        //MODIFICAR_PERSONA_NO_EXISTE
        $_POST = NULL;
        $_POST['controlador'] = $controlador;
        $_POST['action'] = $action;
        $_POST['dni_persona'] = '00738175J';
        $_POST['nombre_persona'] = 'Paco';
        $_POST['apellidos_persona'] = 'Perez Salvador';
        $_POST['fecha_nac_persona'] = '2000-12-13';
        $_POST['direccion_persona'] = 'Avenida de la Avenida N23';
        $_POST['telefono_persona'] = 988748598;
        $_POST['email_persona'] = 'anaa@pruebas.com';
        $_POST['borrado_persona'] = 0;
        $_POST['dni_usuario'] = $_POST['dni_persona'];
        $_POST['usuario'] = 'anita1312';
        $_POST['passwd_usuario'] = 'anita1312';
        $_POST['borrado_usuario'] = 0;
        $_POST['test'] = 'testing';
        $resultadoTest = $this->hacerPruebaModificarPersonaNoExiste($_POST);
        array_push($pruebas, $resultadoTest);

        //DELETE_PERSONA_OK
        $action = 'delete';

        $_POST = NULL;
        $_POST['controlador'] = $controlador;
        $_POST['action'] = $action;
        $_POST['dni_persona'] = '11111111A';
        $_POST['nombre_persona'] = 'Persona';
        $_POST['apellidos_persona'] = 'Para borrar';
        $_POST['fecha_nac_persona'] = '2023-01-28';
        $_POST['direccion_persona'] = 'Calle calle N14';
        $_POST['telefono_persona'] = 988748598;
        $_POST['email_persona'] = 'personaborrar@pruebas.com';
        $_POST['borrado_persona'] = 0;
        $_POST['test'] = 'testing';
        $resultadoTest = $this->hacerPruebaDeletePersonaOK($_POST);
        array_push($pruebas, $resultadoTest);

        $this->deleteData('dni_usuario', '56508907T', 'usuario');
        $this->deleteData('dni_persona', '56508907T', 'persona');
        return $pruebas;

    }

    function hacerPruebaAñadirPersonaOK($atributo){
        $resultado = $this->conexionesBDTest->pruebaTesting('accion', $atributo);
        $resultadoEsperado = 'ADD_PERSONA_COMPLETO'." - ". ADD_PERSONA_COMPLETO;
        $resultadoObtenido = '';
        if(!empty($resultado) && $resultado['code'] == 'ADD_PERSONA_COMPLETO'){
            $resultadoObtenido = 'ADD_PERSONA_COMPLETO'." - ". ADD_PERSONA_COMPLETO;
        }
        $datosValores = array(
            'dni_persona' => $atributo['dni_persona'],
            'nombre_persona' => $atributo['nombre_persona'],
            'apellidos_persona' => $atributo['apellidos_persona'],
            'fecha_nac_persona' => $atributo['fecha_nac_persona'],
            'direccion_persona' => $atributo['direccion_persona'],
            'telefono_persona' => $atributo['telefono_persona'],
            'email_persona' => $atributo['email_persona'],
            'dni_usuario' => $atributo['dni_usuario'],
            'usuario' => $atributo['usuario'],
            'passwd_usuario' => $atributo['passwd_usuario']
        );
        return $this->test->createDatosPruebaAcciones($resultadoObtenido, $resultadoEsperado, ADD_PERSONA_COMPLETO , ÉXITO, $datosValores);
    }

    function hacerPruebaAñadirpersonaYaExiste($atributo){
        $resultado = $this->conexionesBDTest->pruebaTesting('accion', $atributo);
        $resultadoEsperado = 'PERSONA_YA_EXISTE'." - ". PERSONA_YA_EXISTE;
        $resultadoObtenido = '';
    
        if(!empty($resultado) && $resultado['code'] == 'PERSONA_YA_EXISTE'){
            $resultadoObtenido = 'PERSONA_YA_EXISTE'." - ". PERSONA_YA_EXISTE;
        }

        $datosValores = array(
            'dni_persona' => $atributo['dni_persona'],
            'nombre_persona' => $atributo['nombre_persona'],
            'apellidos_persona' => $atributo['apellidos_persona'],
            'fecha_nac_persona' => $atributo['fecha_nac_persona'],
            'direccion_persona' => $atributo['direccion_persona'],
            'telefono_persona' => $atributo['telefono_persona'],
            'email_persona' => $atributo['email_persona'],
            'usuario' => $atributo['usuario'],
            'passwd_usuario' => $atributo['passwd_usuario']
        );

        return $this->test->createDatosPruebaAcciones($resultadoObtenido, $resultadoEsperado, PERSONA_YA_EXISTE , ERROR, $datosValores);
    }

    function hacerPruebaModificarpersonaOK($atributo){
        $resultado = $this->conexionesBDTest->pruebaTesting('accion', $atributo);
        $resultadoEsperado = 'EDIT_PERSONA_COMPLETO'." - ". EDIT_PERSONA_COMPLETO;
        $resultadoObtenido = '';
        if(!empty($resultado) && $resultado['code'] == 'EDIT_PERSONA_COMPLETO'){
            $resultadoObtenido = 'EDIT_PERSONA_COMPLETO'." - ". EDIT_PERSONA_COMPLETO;
        }
        $datosValores = array(
            'dni_persona' => $atributo['dni_persona'],
            'nombre_persona' => $atributo['nombre_persona'],
            'apellidos_persona' => $atributo['apellidos_persona'],
            'fecha_nac_persona' => $atributo['fecha_nac_persona'],
            'direccion_persona' => $atributo['direccion_persona'],
            'telefono_persona' => $atributo['telefono_persona'],
            'email_persona' => $atributo['email_persona'],
            'usuario' => $atributo['usuario'],
            'passwd_usuario' => $atributo['passwd_usuario']
        );
        return $this->test->createDatosPruebaAcciones($resultadoObtenido, $resultadoEsperado, EDIT_PERSONA_COMPLETO , ÉXITO, $datosValores);
    }

    function hacerPruebaModificarpersonaNoExiste($atributo){
        $resultado = $this->conexionesBDTest->pruebaTesting('accion', $atributo);
        $resultadoEsperado = 'PERSONA_NO_EXISTE'." - ". PERSONA_NO_EXISTE;
        $resultadoObtenido = '';
        if(!empty($resultado) && $resultado['code'] == 'PERSONA_NO_EXISTE'){
            $resultadoObtenido = 'PERSONA_NO_EXISTE'." - ". PERSONA_NO_EXISTE;
        }
        $datosValores = array(
            'dni_persona' => $atributo['dni_persona'],
            'nombre_persona' => $atributo['nombre_persona'],
            'apellidos_persona' => $atributo['apellidos_persona'],
            'fecha_nac_persona' => $atributo['fecha_nac_persona'],
            'direccion_persona' => $atributo['direccion_persona'],
            'telefono_persona' => $atributo['telefono_persona'],
            'email_persona' => $atributo['email_persona'],
            'usuario' => $atributo['usuario'],
            'passwd_usuario' => $atributo['passwd_usuario']
        );
        return $this->test->createDatosPruebaAcciones($resultadoObtenido, $resultadoEsperado, PERSONA_NO_EXISTE , ERROR, $datosValores);
    }

    function hacerPruebaDeletePersonaOK($atributo){
        $resultado = $this->conexionesBDTest->pruebaTesting('accion', $atributo);
        $resultadoEsperado = 'DELETE_PERSONA_COMPLETO'." - ". DELETE_PERSONA_COMPLETO;
        $resultadoObtenido = '';
        if(!empty($resultado) && $resultado['code'] == 'DELETE_PERSONA_COMPLETO'){
            $resultadoObtenido = 'DELETE_PERSONA_COMPLETO'." - ". DELETE_PERSONA_COMPLETO;
        }
        $datosValores = array(
            'dni_persona' => $atributo['dni_persona'],
            'nombre_persona' => $atributo['nombre_persona'],
            'apellidos_persona' => $atributo['apellidos_persona'],
            'fecha_nac_persona' => $atributo['fecha_nac_persona'],
            'direccion_persona' => $atributo['direccion_persona'],
            'telefono_persona' => $atributo['telefono_persona'],
            'email_persona' => $atributo['email_persona'],
        );
        return $this->test->createDatosPruebaAcciones($resultadoObtenido, $resultadoEsperado, DELETE_PERSONA_COMPLETO , ERROR, $datosValores);
    }
    function deleteData($clave, $valor, $tabla) {
        $_POST = NULL;
        $_POST['tabla'] = $tabla;
        $_POST['clave'] = $clave;
        $_POST['valor'] = $valor;
        $_POST['test'] = 'testing';
        
        $this->conexionesBDTest->pruebaTesting('delete', $_POST);
    }
}

?>