<?php

include_once './Test/Atributos/FuncionesComunes.php';
include_once './Test/Test.php';
include_once './Test/TiposPruebas.php';


$funcionesComunes = new FuncionesComunes();

class TestPasswdUsuario extends Test{
    function testAtributoPasswdUsuario() {
        $pruebas = array();
        
        //PASSWD_USUARIO_VACIO
        $_POST = NULL;
        $_POST['passwd_usuario'] = '';
        $resultadoTest = $this->hacerPruebaPasswdUsuarioVacio($_POST);
        array_push($pruebas, $resultadoTest);
        
        //PASSWD_USUARIO_MENOR_QUE_3
        $_POST['passwd_usuario'] = 'an';
        $resultadoTest = $this->hacerPruebaPasswdUsuarioMenor3($_POST);
        array_push($pruebas, $resultadoTest);
        
        //PASSWD_USUARIO_MAYOR_QUE_32
        $_POST['passwd_usuario'] = 'ananaananaanananananananananananananananananananananananananananananananananana';
        $resultadoTest = $this->hacerPruebaPasswdUsuarioMayor32($_POST);
        array_push($pruebas, $resultadoTest);
        
        //PASSWD_USUARIO_CONTIENE_ENHE
        $_POST['passwd_usuario'] = 'peña';
        $resultadoTest = $this->hacerPruebaPasswdUsuarioEnhe($_POST);
        array_push($pruebas, $resultadoTest);
        
        //PASSWD_USUARIO_CONTIENE_ACENTOS
        $_POST['passwd_usuario'] = 'águila';
        $resultadoTest = $this->hacerPruebaPasswdUsuarioAcentos($_POST);
        array_push($pruebas, $resultadoTest);
        
        //PASSWD_USUARIO_CONTIENE_CARACTERES_ESPECIALES
        $_POST['passwd_usuario'] = '***a**n';
        $resultadoTest = $this->hacerPruebaPasswdUsuarioCaracteresEspeciales($_POST);
        array_push($pruebas, $resultadoTest);
        
        //PASSWD_USUARIO_CONTIENE_ESPACIOS
        $_POST['passwd_usuario'] = 'an a a';
        $resultadoTest = $this->hacerPruebaPasswdUsuarioEspacios($_POST);
        array_push($pruebas, $resultadoTest);

        //PASSWD_USUARIO_CORRECTO
        $_POST['passwd_usuario'] = 'anita1312';
        $resultadoTest = $this->hacerPruebaPasswdUsuarioCorrecto($_POST);
        array_push($pruebas, $resultadoTest);
    
        return $pruebas;

         
    }
        
        function hacerPruebaPasswdUsuarioVacio($atributo){
            $funcionesComunes = new FuncionesComunes();
            $resultadoObtenido = $funcionesComunes->comprobarAtributoBlank($atributo['passwd_usuario'], 'login', 'passwd_usuario');
            $resultadoEsperado ='PASSWD_USUARIO_VACIO'. " - ".PASSWD_USUARIO_VACIO;
        
            return $this->createDatosPruebaAtributos($resultadoObtenido, $resultadoEsperado, VACIO, ERROR, $atributo['passwd_usuario'], 'passwd_usuario');
        
        }
        
        function hacerPruebaPasswdUsuarioMenor3($atributo){
            $funcionesComunes = new FuncionesComunes();
            $resultadoObtenido = $funcionesComunes->comprobarAtributosLongitudMenor($atributo['passwd_usuario'], 'login', 'passwd_usuario', 3);
            $resultadoEsperado = 'PASSWD_USUARIO_MENOR_QUE_3'." - ".PASSWD_USUARIO_MENOR_QUE_3;
        
            return $this->createDatosPruebaAtributos($resultadoObtenido, $resultadoEsperado, LONGITUD_MINIMA_ERRONEA, ERROR, $atributo['passwd_usuario'], 'usuario');
        
        }
        
        function hacerPruebaPasswdUsuarioMayor32($atributo){
            $funcionesComunes = new FuncionesComunes();
            $resultadoObtenido = $funcionesComunes->comprobarAtributosLongitudMayor($atributo['passwd_usuario'], 'login', 'passwd_usuario', 32);
            $resultadoEsperado = 'PASSWD_USUARIO_MAYOR_QUE_32'." - ".PASSWD_USUARIO_MAYOR_QUE_32;
        
            return $this->createDatosPruebaAtributos($resultadoObtenido, $resultadoEsperado, LONGITUD_MAXIMA_ERRONEA, ERROR, $atributo['passwd_usuario'], 'passwd_usuario');
        
        }
        
        function hacerPruebaPasswdUsuarioEnhe($atributo){
            $funcionesComunes = new FuncionesComunes();
            $resultadoObtenido = $funcionesComunes->comprobarAtributoEnhe($atributo['passwd_usuario'], 'login', 'passwd_usuario');
            $resultadoEsperado = 'PASSWD_USUARIO_ALFANUMERICO_INCORRECTO'." - ".PASSWD_USUARIO_ALFANUMERICO_INCORRECTO;
        
            return $this->createDatosPruebaAtributos($resultadoObtenido, $resultadoEsperado, ENHE, ERROR, $atributo['passwd_usuario'], 'passwd_usuario');
        }
        
        function hacerPruebaPasswdUsuarioAcentos($atributo){
            $funcionesComunes = new FuncionesComunes();
            $resultadoObtenido = $funcionesComunes->comprobarAtributoAcentos($atributo['passwd_usuario'], 'login', 'passwd_usuario');
            $resultadoEsperado = 'PASSWD_USUARIO_ALFANUMERICO_INCORRECTO'." - ".PASSWD_USUARIO_ALFANUMERICO_INCORRECTO;
        
            return $this->createDatosPruebaAtributos($resultadoObtenido, $resultadoEsperado, ACENTOS, ERROR, $atributo['passwd_usuario'], 'passwd_usuario');
        }
        
        function hacerPruebaPasswdUsuarioCaracteresEspeciales($atributo){
            $funcionesComunes = new FuncionesComunes();
            $resultadoObtenido = $funcionesComunes->comprobarAtributoCaracteresEspeciales($atributo['passwd_usuario'], 'login', 'passwd_usuario');
            $resultadoEsperado = 'PASSWD_USUARIO_ALFANUMERICO_INCORRECTO'." - ".PASSWD_USUARIO_ALFANUMERICO_INCORRECTO;
        
            return $this->createDatosPruebaAtributos($resultadoObtenido, $resultadoEsperado, CARACTERES_ESPECIALES, ERROR, $atributo['passwd_usuario'], 'passwd_usuario');
        }
        
        function hacerPruebaPasswdUsuarioEspacios($atributo){
            $funcionesComunes = new FuncionesComunes();
            $resultadoObtenido = $funcionesComunes->comprobarAtributoEspacios($atributo['passwd_usuario'], 'login', 'passwd_usuario');
            $resultadoEsperado = 'PASSWD_USUARIO_ALFANUMERICO_INCORRECTO'." - ".PASSWD_USUARIO_ALFANUMERICO_INCORRECTO;
        
            return $this->createDatosPruebaAtributos($resultadoObtenido, $resultadoEsperado, ESPACIOS, ERROR, $atributo['passwd_usuario'], 'passwd_usuario');
        }

        function hacerPruebaPasswdUsuarioCorrecto($atributo){
            $funcionesComunes = new FuncionesComunes();
            $resultadoObtenido = $funcionesComunes->comprobarAtributoCorrectoAlfanumerico($atributo['passwd_usuario']);
            $resultadoEsperado = 'AVANZAR_SIGUIENTE_CAMPO'." - ".AVANZAR_SIGUIENTE_CAMPO;
        
            return $this->createDatosPruebaAtributos($resultadoObtenido, $resultadoEsperado, PASSWD_USUARIO_OK, ÉXITO, $atributo['passwd_usuario'], 'passwd_usuario');
        }

        
}


?>