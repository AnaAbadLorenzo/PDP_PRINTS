<?php

include_once './Test/Test.php';
include_once './Test/Accion/ConexionesBDTest.php';

class TestRegistro{
    private $test;
    private $conexionesBDTest;

    function __construct()
    {
        $this->test = new Test();
        $this->conexionesBDTest = new ConexionesBDTest();
    }
    function testAccionesRegistro() {
        $pruebas = array();
        $controlador = 'Registro';
        $action = 'registro';

        //REGISTRO_OK
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
        $resultadoTest = $this->hacerPruebaRegistroOK($_POST);
        array_push($pruebas, $resultadoTest);

        //USUARIO_YA_EXISTE
        $_POST = NULL;
        $_POST['controlador'] = $controlador;
        $_POST['action'] = $action;
        $_POST['dni_persona'] = '00738175J';
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
        $resultadoTest = $this->hacerPruebaUsuarioYaExiste($_POST);
        array_push($pruebas, $resultadoTest);

        //DNI_YA_EXISTE
        $_POST = NULL;
        $_POST['controlador'] = $controlador;
        $_POST['action'] = $action;
        $_POST['dni_persona'] = '45146321N';
        $_POST['nombre_persona'] = 'Pepe';
        $_POST['apellidos_persona'] = 'García Fernández';
        $_POST['fecha_nac_persona'] = '2000-12-13';
        $_POST['direccion_persona'] = 'Avenida de la Avenida N23';
        $_POST['telefono_persona'] = 988748598;
        $_POST['email_persona'] = 'pepe@pruebas.com';
        $_POST['borrado_persona'] = 0;
        $_POST['dni_usuario'] = $_POST['dni_persona'];
        $_POST['usuario'] = 'pepepepe';
        $_POST['passwd_usuario'] = 'pepe';
        $_POST['borrado_usuario'] = 0;
        $resultadoTest = $this->hacerPruebaPersonaYaExiste($_POST);
        array_push($pruebas, $resultadoTest);

        $this->deleteData();
        return $pruebas;

    }

    function hacerPruebaRegistroOK($atributo){
        $resultado = $this->conexionesBDTest->pruebaTesting('accion', $atributo);
        $resultadoEsperado = 'REGISTRO_USUARIO_OK'." - ". REGISTRO_USUARIO_OK;
        $resultadoObtenido = '';
    
        
        if(!empty($resultado) && $resultado['code'] == 'REGISTRO_OK'){
            $resultadoObtenido = 'REGISTRO_USUARIO_OK'." - ". REGISTRO_USUARIO_OK;
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

        return $this->test->createDatosPruebaAcciones($resultadoObtenido, $resultadoEsperado, LOGIN_ACCION_OK , ÉXITO, $datosValores);
    
    }

    function hacerPruebaUsuarioYaExiste($atributo){
        $resultado = $this->conexionesBDTest->pruebaTesting('accion', $atributo);
        $resultadoEsperado = 'USUARIO_YA_EXISTE'." - ". USUARIO_YA_EXISTE;
        $resultadoObtenido = '';

        if(!empty($resultado) && $resultado['code'] == 'USUARIO_YA_EXISTE'){
            $resultadoObtenido = 'USUARIO_YA_EXISTE'." - ". USUARIO_YA_EXISTE;
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

        return $this->test->createDatosPruebaAcciones($resultadoObtenido, $resultadoEsperado, USUARIO_NO_ENCONTRADO , ERROR, $datosValores);
    
    }

    function hacerPruebaPersonaYaExiste($atributo){
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

    function deleteData() {
        $_POST = NULL;
        $_POST['test'] = 'testing';
        $_POST['tabla'] = 'usuario';
        $_POST['clave'] = 'dni_usuario';
        $_POST['valor'] = '56508907T';
        
        
        $this->conexionesBDTest->pruebaTesting('delete', $_POST);

        $_POST = NULL;
        $_POST['test'] = 'testing';
        $_POST['tabla'] = 'persona';
        $_POST['clave'] = 'dni_persona';
        $_POST['valor'] = '56508907T';
        
       
        $this->conexionesBDTest->pruebaTesting('delete', $_POST);
    }
}

?>