<?php
include_once './Test/Atributos/FuncionesComunes.php';
include_once './Test/Test.php';
include_once './Test/TiposPruebas.php';


$funcionesComunes = new FuncionesComunes();

class TestFechaProcesoUsuario extends Test{
    function testAtributoFechaProcesoUsuario() {
        $pruebas = array();

        //FECHA_NOTICIA_VACIO
        $_POST = NULL;
        $_POST['fecha_proceso_usuario'] = '';
        $resultadoTest = $this->hacerPruebaFechaProcesoUsuarioVacio($_POST);
        array_push($pruebas, $resultadoTest);
    
        //FECHA_NOTICIA_MENOR_QUE_10
        $_POST['fecha_proceso_usuario'] = '10/10/';
        $resultadoTest = $this->hacerPruebaFechaProcesoUsuarioMenor10($_POST);
        array_push($pruebas, $resultadoTest);
    
        //FECHA_NOTICIA_MAYOR_QUE_10
        $_POST['fecha_proceso_usuario'] = '10/10/201010';
        $resultadoTest = $this->hacerPruebaFechaProcesoUsuarioMayor10($_POST);
        array_push($pruebas, $resultadoTest);
    
        //FECHA_NOTICIA_CONTIENE_ENHE
        $_POST['fecha_proceso_usuario'] = 'ññ/10/2010';
        $resultadoTest = $this->hacerPruebaFechaProcesoUsuarioEnhe($_POST);
        array_push($pruebas, $resultadoTest);
    
        //FECHA_NOTICIA_CONTIENE_ACENTOS
        $_POST['fecha_proceso_usuario'] = 'áá/10/2010';
        $resultadoTest = $this->hacerPruebaFechaProcesoUsuarioAcentos($_POST);
        array_push($pruebas, $resultadoTest);
    
        //FECHA_NOTICIA_CONTIENE_CARACTERES_ESPECIALES
        $_POST['fecha_proceso_usuario'] = '##/87/1996';
        $resultadoTest = $this->hacerPruebaFechaProcesoUsuarioCaracteresEspeciales($_POST);
        array_push($pruebas, $resultadoTest);
    
        //FECHA_NOTICIA_CONTIENE_ESPACIOS
        $_POST['fecha_proceso_usuario'] = '10/ /1985';
        $resultadoTest = $this->hacerPruebaFechaProcesoUsuarioEspacios($_POST);
        array_push($pruebas, $resultadoTest);

        //FECHA_NOTICIA_CORRECTO
        $_POST['fecha_proceso_usuario'] = '13/12/2000';
        $resultadoTest = $this->hacerPruebaFechaProcesoUsuarioCorrecto($_POST);
        array_push($pruebas, $resultadoTest);

        return $pruebas;

     
    }
    function hacerPruebaFechaProcesoUsuarioVacio($atributo){
        $funcionesComunes = new FuncionesComunes();
        $resultadoObtenido = $funcionesComunes->comprobarAtributoBlank($atributo['fecha_proceso_usuario'], 'gestProcesosusuario', 'fecha_proceso_usuario');
        $resultadoEsperado = 'FECHA_PROCESO_USUARIO_VACIO'." - ".FECHA_PROCESO_USUARIO_VACIO;
        
        return $this->createDatosPruebaAtributos($resultadoObtenido, $resultadoEsperado, VACIO, ERROR, $atributo['fecha_proceso_usuario'], 'fecha_proceso_usuario');
        
    }
        
    function hacerPruebaFechaProcesoUsuarioMenor10($atributo){
        $funcionesComunes = new FuncionesComunes();
        $resultadoObtenido = $funcionesComunes->comprobarAtributosLongitudMenor($atributo['fecha_proceso_usuario'], 'gestProcesosusuario', 'fecha_proceso_usuario', 10);
        $resultadoEsperado = 'FECHA_PROCESO_USUARIO_MENOR_QUE_10'. " - ".FECHA_PROCESO_USUARIO_MENOR_QUE_10;
        
        return $this->createDatosPruebaAtributos($resultadoObtenido, $resultadoEsperado, LONGITUD_MINIMA_ERRONEA, ERROR, $atributo['fecha_proceso_usuario'], 'fecha_proceso_usuario');
    }
        
    function hacerPruebaFechaProcesoUsuarioMayor10($atributo){
        $funcionesComunes = new FuncionesComunes();
        $resultadoObtenido = $funcionesComunes->comprobarAtributosLongitudMayor($atributo['fecha_proceso_usuario'], 'gestProcesosusuario', 'fecha_proceso_usuario', 10);
        $resultadoEsperado = 'FECHA_PROCESO_USUARIO_MAYOR_QUE_10'." - ".FECHA_PROCESO_USUARIO_MAYOR_QUE_10;
        
        return $this->createDatosPruebaAtributos($resultadoObtenido, $resultadoEsperado, LONGITUD_MAXIMA_ERRONEA, ERROR, $atributo['fecha_proceso_usuario'], 'fecha_proceso_usuario');
        
    }
        
    function hacerPruebaFechaProcesoUsuarioEnhe($atributo){
        $funcionesComunes = new FuncionesComunes();
        $resultadoObtenido = $funcionesComunes->comprobarAtributoEnhe($atributo['fecha_proceso_usuario'], 'gestProcesosusuario', 'fecha_proceso_usuario');
        $resultadoEsperado = 'FECHA_PROCESO_USUARIO_FECHA_INCORRECTO'." - ".FECHA_PROCESO_USUARIO_FECHA_INCORRECTO;
        
        return $this->createDatosPruebaAtributos($resultadoObtenido, $resultadoEsperado, FECHA_PROCESO_USUARIO_FECHA_INCORRECTO, ÉXITO,  $atributo['fecha_proceso_usuario'], 'fecha_proceso_usuario');
    }
    function hacerPruebaFechaProcesoUsuarioAcentos($atributo){
        $funcionesComunes = new FuncionesComunes();
        $resultadoObtenido = $funcionesComunes->comprobarAtributoAcentos($atributo['fecha_proceso_usuario'], 'gest_procesosusuario', 'fecha_proceso_usuario');
        $resultadoEsperado = 'FECHA_PROCESO_USUARIO_FECHA_INCORRECTO'." - ".FECHA_PROCESO_USUARIO_FECHA_INCORRECTO;
    
        return $this->createDatosPruebaAtributos($resultadoObtenido, $resultadoEsperado, ACENTOS, ERROR, $atributo['fecha_proceso_usuario'], 'fecha_proceso_usuario');
    }
    
    function hacerPruebaFechaProcesoUsuarioCaracteresEspeciales($atributo){
        $funcionesComunes = new FuncionesComunes();
        $resultadoObtenido = $funcionesComunes->comprobarAtributoCaracteresEspeciales($atributo['fecha_proceso_usuario'], 'gest_procesosusuario', 'fecha_proceso_usuario');
        $resultadoEsperado = 'FECHA_PROCESO_USUARIO_FECHA_INCORRECTO'." - ".FECHA_PROCESO_USUARIO_INCORRECTO;
    
        return $this->createDatosPruebaAtributos($resultadoObtenido, $resultadoEsperado, CARACTERES_ESPECIALES, ERROR, $atributo['fecha_proceso_usuario'], 'fecha_proceso_usuario');
    }
    
    function hacerPruebaFechaProcesoUsuarioEspacios($atributo){
        $funcionesComunes = new FuncionesComunes();
        $resultadoObtenido = $funcionesComunes->comprobarAtributoEspacios($atributo['fecha_proceso_usuario'], 'gest_procesosusuario', 'fecha_proceso_usuario');
        $resultadoEsperado = 'FECHA_PROCESO_USUARIO_FECHA_INCORRECTO'." - ".FECHA_PROCESO_USUARIOA_FECHA_INCORRECTO;
    
        return $this->createDatosPruebaAtributos($resultadoObtenido, $resultadoEsperado, ESPACIOS, ERROR,  $atributo['fecha_proceso_usuario'], 'fecha_proceso_usuario');
    }

    function hacerPruebaFechaProcesoUsuarioCorrecto($atributo){
        $funcionesComunes = new FuncionesComunes();
        $resultadoObtenido = $funcionesComunes->comprobarAtributoCorrectoFecha($atributo['fecha_proceso_usuario']);
        $resultadoEsperado = 'AVANZAR_SIGUIENTE_CAMPO'." - ".AVANZAR_SIGUIENTE_CAMPO;
    
        return $this->createDatosPruebaAtributos($resultadoObtenido, $resultadoEsperado, FECHA_PROCESO_USUARIO_OK, ÉXITO,  $atributo['fecha_proceso_usuario'], 'fecha_proceso_usuario');
    }


    
}

?>
