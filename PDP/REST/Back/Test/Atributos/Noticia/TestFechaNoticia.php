<?php
include_once './Test/Atributos/FuncionesComunes.php';
include_once './Test/Test.php';
include_once './Test/TiposPruebas.php';


$funcionesComunes = new FuncionesComunes();

class TestFechaNoticia extends Test{
    function testAtributoFechaNoticia() {
        $pruebas = array();

        //FECHA_NOTICIA_VACIO
        $_POST = NULL;
        $_POST['fecha_noticia'] = '';
        $resultadoTest = $this->hacerPruebaFechaNoticiaVacio($_POST);
        array_push($pruebas, $resultadoTest);
    
        //FECHA_NOTICIA_MENOR_QUE_8
        $_POST['fecha_noticia'] = '10/10/';
        $resultadoTest = $this->hacerPruebaFechaNoticiaMenor10($_POST);
        array_push($pruebas, $resultadoTest);
    
        //FECHA_NOTICIA_MAYOR_QUE_8
        $_POST['fecha_noticia'] = '10/10/201010';
        $resultadoTest = $this->hacerPruebaFechaNoticiaMayor10($_POST);
        array_push($pruebas, $resultadoTest);
    
        //FECHA_NOTICIA_CONTIENE_ENHE
        $_POST['fecha_noticia'] = 'ññ/10/2010';
        $resultadoTest = $this->hacerPruebaFechaNoticiaEnhe($_POST);
        array_push($pruebas, $resultadoTest);
    
        //FECHA_NOTICIA_CONTIENE_ACENTOS
        $_POST['fecha_noticia'] = 'áá/10/2010';
        $resultadoTest = $this->hacerPruebaFechaNoticiaAcentos($_POST);
        array_push($pruebas, $resultadoTest);
    
        //FECHA_NOTICIA_CONTIENE_CARACTERES_ESPECIALES
        $_POST['fecha_noticia'] = '##/87/1996';
        $resultadoTest = $this->hacerPruebaFechaNoticiaCaracteresEspeciales($_POST);
        array_push($pruebas, $resultadoTest);
    
        //FECHA_NOTICIA_CONTIENE_ESPACIOS
        $_POST['fecha_noticia'] = '10/ /1985';
        $resultadoTest = $this->hacerPruebaFechaNoticiaEspacios($_POST);
        array_push($pruebas, $resultadoTest);

        //FECHA_NOTICIA_CORRECTO
        $_POST['fecha_noticia'] = '13/12/2000';
        $resultadoTest = $this->hacerPruebaFechaNoticiaCorrecto($_POST);
        array_push($pruebas, $resultadoTest);

        return $pruebas;

     
    }
    function hacerPruebaFechaNoticiaVacio($atributo){
        $funcionesComunes = new FuncionesComunes();
        $resultadoObtenido = $funcionesComunes->comprobarAtributoBlank($atributo['fecha_noticia'], 'gestNoticias', 'fecha_noticia');
        $resultadoEsperado = 'FECHA_NOTICIA_VACIO'." - ".FECHA_NOTICIA_VACIO;
        
        return $this->createDatosPruebaAtributos($resultadoObtenido, $resultadoEsperado, VACIO, ERROR, $atributo['fecha_noticia'], 'fecha_noticia');
        
    }
        
    function hacerPruebaFechaNoticiaMenor10($atributo){
        $funcionesComunes = new FuncionesComunes();
        $resultadoObtenido = $funcionesComunes->comprobarAtributosLongitudMenor($atributo['fecha_noticia'], 'gestNoticias', 'fecha_noticia', 10);
        $resultadoEsperado = 'FECHA_NOTICIA_MENOR_QUE_10'. " - ".FECHA_NOTICIA_MENOR_QUE_10;
        
        return $this->createDatosPruebaAtributos($resultadoObtenido, $resultadoEsperado, LONGITUD_MINIMA_ERRONEA, ERROR, $atributo['fecha_noticia'], 'fecha_noticia');
    }
        
    function hacerPruebaFechaNoticiaMayor10($atributo){
        $funcionesComunes = new FuncionesComunes();
        $resultadoObtenido = $funcionesComunes->comprobarAtributosLongitudMayor($atributo['fecha_noticia'], 'gestNoticias', 'fecha_noticia', 10);
        $resultadoEsperado = 'FECHA_NOTICIA_MAYOR_QUE_10'." - ".FECHA_NOTICIA_MAYOR_QUE_10;
        
        return $this->createDatosPruebaAtributos($resultadoObtenido, $resultadoEsperado, LONGITUD_MAXIMA_ERRONEA, ERROR, $atributo['fecha_noticia'], 'fecha_noticia');
        
    }
        
    function hacerPruebaFechaNoticiaEnhe($atributo){
        $funcionesComunes = new FuncionesComunes();
        $resultadoObtenido = $funcionesComunes->comprobarAtributoEnhe($atributo['fecha_noticia'], 'gestNoticias', 'fecha_noticia');
        $resultadoEsperado = 'FECHA_NOTICIA_FECHA_INCORRECTO'." - ".FECHA_NOTICIA_FECHA_INCORRECTO;
        
        return $this->createDatosPruebaAtributos($resultadoObtenido, $resultadoEsperado, FECHA_NOTICIA_FECHA_INCORRECTO, ÉXITO,  $atributo['fecha_noticia'], 'fecha_noticia');
    }

    function hacerPruebaFechaNoticiaAcentos($atributo){
        $funcionesComunes = new FuncionesComunes();
        $resultadoObtenido = $funcionesComunes->comprobarAtributoAcentos($atributo['fecha_noticia'], 'gest_noticias', 'fecha_noticia');
        $resultadoEsperado = 'FECHA_NOTICIA_FECHA_INCORRECTO'." - ".FECHA_NOTICIA_FECHA_INCORRECTO;
    
        return $this->createDatosPruebaAtributos($resultadoObtenido, $resultadoEsperado, ACENTOS, ERROR, $atributo['fecha_noticia'], 'fecha_noticia');
    }
    
    function hacerPruebaFechaNoticiaCaracteresEspeciales($atributo){
        $funcionesComunes = new FuncionesComunes();
        $resultadoObtenido = $funcionesComunes->comprobarAtributoCaracteresEspeciales($atributo['fecha_noticia'], 'gest_noticias', 'fecha_noticia');
        $resultadoEsperado = 'FECHA_NOTICIA_FECHA_INCORRECTO'." - ".FECHA_NOTICIA_FECHA_INCORRECTO;
    
        return $this->createDatosPruebaAtributos($resultadoObtenido, $resultadoEsperado, CARACTERES_ESPECIALES, ERROR, $atributo['fecha_noticia'], 'fecha_noticia');
    }
    
    function hacerPruebaFechaNoticiaEspacios($atributo){
        $funcionesComunes = new FuncionesComunes();
        $resultadoObtenido = $funcionesComunes->comprobarAtributoEspacios($atributo['fecha_noticia'], 'gest_noticias', 'fecha_noticia');
        $resultadoEsperado = 'FECHA_NOTICIA_FECHA_INCORRECTO'." - ".FECHA_NOTICIA_FECHA_INCORRECTO;
    
        return $this->createDatosPruebaAtributos($resultadoObtenido, $resultadoEsperado, ESPACIOS, ERROR,  $atributo['fecha_noticia'], 'fecha_noticia');
    }

    function hacerPruebaFechaNoticiaCorrecto($atributo){
        $funcionesComunes = new FuncionesComunes();
        $resultadoObtenido = $funcionesComunes->comprobarAtributoCorrectoFecha($atributo['fecha_noticia']);
        $resultadoEsperado = 'AVANZAR_SIGUIENTE_CAMPO'." - ".AVANZAR_SIGUIENTE_CAMPO;
    
        return $this->createDatosPruebaAtributos($resultadoObtenido, $resultadoEsperado, FECHA_NOTICIA_OK, ÉXITO,  $atributo['fecha_noticia'], 'fecha_noticia');
    }


    
}

?>
