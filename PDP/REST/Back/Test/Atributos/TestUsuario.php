
<?php
include_once './Test/Atributos/FuncionesComunes.php';
include_once './Test/Test.php';
include_once './Test/TiposPruebas.php';


$funcionesComunes = new FuncionesComunes();

class TestUsuario extends Test{
    function testAtributoUsuario() {
        $pruebas = array();
        
        //LOGIN_USUARIO_VACIO
        $_POST = NULL;
        $_POST['usuario'] = '';
        $resultadoTest = $this->hacerPruebaLoginUsuarioVacio($_POST);
        array_push($pruebas, $resultadoTest);
        
        //LOGIN_USUARIO_MENOR_QUE_3
        $_POST['usuario'] = 'an';
        $resultadoTest = $this->hacerPruebaLoginUsuarioMenor3($_POST);
        array_push($pruebas, $resultadoTest);
        
        //LOGIN_USUARIO_MAYOR_QUE_48
        $_POST['usuario'] = 'ananaananaanananananananananananananananananananananananananananananananananana';
        $resultadoTest = $this->hacerPruebaLoginUsuarioMayor48($_POST);
        array_push($pruebas, $resultadoTest);
        
        //LOGIN_USUARIO_CONTIENE_ENHE
        $_POST['usuario'] = 'peña';
        $resultadoTest = $this->hacerPruebaLoginUsuarioEnhe($_POST);
        array_push($pruebas, $resultadoTest);
        
        //LOGIN_USUARIO_CONTIENE_ACENTOS
        $_POST['usuario'] = 'águila';
        $resultadoTest = $this->hacerPruebaLoginUsuarioAcentos($_POST);
        array_push($pruebas, $resultadoTest);
        
        //LOGIN_USUARIO_CONTIENE_CARACTERES_ESPECIALES
        $_POST['usuario'] = '***a**n';
        $resultadoTest = $this->hacerPruebaLoginUsuarioCaracteresEspeciales($_POST);
        array_push($pruebas, $resultadoTest);
        
        //LOGIN_USUARIO_CONTIENE_ESPACIOS
        $_POST['usuario'] = 'an a a';
        $resultadoTest = $this->hacerPruebaLoginUsuarioEspacios($_POST);
        array_push($pruebas, $resultadoTest);

        //LOGIN_USUARIO_CORRECTO
        $_POST['usuario'] = 'anita1312';
        $resultadoTest = $this->hacerPruebaLoginUsuariCorrecto($_POST);
        array_push($pruebas, $resultadoTest);
    
        return $pruebas;

         
    }
        
        function hacerPruebaLoginUsuarioVacio($atributo){
            $funcionesComunes = new FuncionesComunes();
            $resultadoObtenido = $funcionesComunes->comprobarAtributoBlank($atributo['usuario'], 'login', 'usuario');
            $resultadoEsperado = 'LOGIN_USUARIO_VACIO'." - ".LOGIN_USUARIO_VACIO;
        
            return $this->createDatosPruebaAtributos($resultadoObtenido, $resultadoEsperado, VACIO, ERROR, $atributo['usuario'], 'usuario');
        
        }
        
        function hacerPruebaLoginUsuarioMenor3($atributo){
            $funcionesComunes = new FuncionesComunes();
            $resultadoObtenido = $funcionesComunes->comprobarAtributosLongitudMenor($atributo['usuario'], 'login', 'usuario', 3);
            $resultadoEsperado = 'LOGIN_USUARIO_MENOR_QUE_3'. " - ".LOGIN_USUARIO_MENOR_QUE_3;
        
            return $this->createDatosPruebaAtributos($resultadoObtenido, $resultadoEsperado, LONGITUD_MINIMA_ERRONEA, ERROR, $atributo['usuario'], 'usuario');
        
        }
        
        function hacerPruebaLoginUsuarioMayor48($atributo){
            $funcionesComunes = new FuncionesComunes();
            $resultadoObtenido = $funcionesComunes->comprobarAtributosLongitudMayor($atributo['usuario'], 'login', 'usuario', 48);
            $resultadoEsperado = 'LOGIN_USUARIO_MAYOR_QUE_48'." - ".LOGIN_USUARIO_MAYOR_QUE_48;
        
            return $this->createDatosPruebaAtributos($resultadoObtenido, $resultadoEsperado, LONGITUD_MINIMA_ERRONEA, ERROR, $atributo['usuario'], 'usuario');
        
        }
        
        function hacerPruebaLoginUsuarioEnhe($atributo){
            $funcionesComunes = new FuncionesComunes();
            $resultadoObtenido = $funcionesComunes->comprobarAtributoEnhe($atributo['usuario'], 'login', 'usuario');
            $resultadoEsperado = 'LOGIN_USUARIO_ALFANUMERICO_INCORRECTO'." - ".LOGIN_USUARIO_ALFANUMERICO_INCORRECTO;
        
            return $this->createDatosPruebaAtributos($resultadoObtenido, $resultadoEsperado, ENHE, ERROR, $atributo['usuario'], 'usuario');
        }
        
        function hacerPruebaLoginUsuarioAcentos($atributo){
            $funcionesComunes = new FuncionesComunes();
            $resultadoObtenido = $funcionesComunes->comprobarAtributoAcentos($atributo['usuario'], 'login', 'usuario');
            $resultadoEsperado = 'LOGIN_USUARIO_ALFANUMERICO_INCORRECTO'." - ".LOGIN_USUARIO_ALFANUMERICO_INCORRECTO;
        
            return $this->createDatosPruebaAtributos($resultadoObtenido, $resultadoEsperado, ACENTOS, ERROR, $atributo['usuario'], 'usuario');
        }
        
        function hacerPruebaLoginUsuarioCaracteresEspeciales($atributo){
            $funcionesComunes = new FuncionesComunes();
            $resultadoObtenido = $funcionesComunes->comprobarAtributoCaracteresEspeciales($atributo['usuario'], 'login', 'usuario');
            $resultadoEsperado = 'LOGIN_USUARIO_ALFANUMERICO_INCORRECTO'." - ".LOGIN_USUARIO_ALFANUMERICO_INCORRECTO;
        
            return $this->createDatosPruebaAtributos($resultadoObtenido, $resultadoEsperado, CARACTERES_ESPECIALES, ERROR, $atributo['usuario'], 'usuario');
        }
        
        function hacerPruebaLoginUsuarioEspacios($atributo){
            $funcionesComunes = new FuncionesComunes();
            $resultadoObtenido = $funcionesComunes->comprobarAtributoEspacios($atributo['usuario'], 'login', 'usuario');
            $resultadoEsperado = 'LOGIN_USUARIO_ALFANUMERICO_INCORRECTO'." - ".LOGIN_USUARIO_ALFANUMERICO_INCORRECTO;
        
            return $this->createDatosPruebaAtributos($resultadoObtenido, $resultadoEsperado, ESPACIOS, ERROR, $atributo['usuario'], 'usuario');
        }

        function hacerPruebaLoginUsuariCorrecto($atributo){
            $funcionesComunes = new FuncionesComunes();
            $resultadoObtenido = $funcionesComunes->comprobarAtributoCorrectoAlfanumerico($atributo['usuario']);
            $resultadoEsperado = 'AVANZAR_SIGUIENTE_CAMPO'." - ".AVANZAR_SIGUIENTE_CAMPO;
        
            return $this->createDatosPruebaAtributos($resultadoObtenido, $resultadoEsperado, LOGIN_OK, ÉXITO, $atributo['usuario'], 'usuario');
        }

        
}

?>