<?php
include_once './Test/Atributos/FuncionesComunes.php';
include_once './Test/Test.php';
include_once './Test/TiposPruebas.php';


$funcionesComunes = new FuncionesComunes();

class TestTituloNoticia extends Test{
    function testAtributoTituloNoticia() {
        $pruebas = array();
        
        //TITULO_NOTICIA_VACIO
        $_POST = NULL;
        $_POST['titulo_noticia'] = '';
        $resultadoTest = $this->hacerPruebaTituloNoticiaVacio($_POST);
        array_push($pruebas, $resultadoTest);
        
        //TITULO_NOTICIA_MENOR_QUE_3
        $_POST['titulo_noticia'] = 'Go';
        $resultadoTest = $this->hacerPruebaTituloNoticiaMenor3($_POST);
        array_push($pruebas, $resultadoTest);
        
        //TITULO_NOTICIA_MAYOR_QUE_255
        $_POST['titulo_noticia'] = 'GonzalezGonzalezGonzalezGonzalezGonzalezGonzalezGonzalezGonzalezGonzalezGonzalezGonzalezGonzalezGonzalezGonzalezGonzalezGonzalezGonzalezGonzalezGonzalezGonzalezGonzalezGonzalezGonzalezGonzalezGonzalezGonzalezGonzalezzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz';
        $resultadoTest = $this->hacerPruebaTituloNoticiaMayor255($_POST);
        array_push($pruebas, $resultadoTest);
        
        //TITULO_NOTICIA_CONTIENE_CARACTERES_ESPECIALES
        $_POST['titulo_noticia'] = 'Noticia***';
        $resultadoTest = $this->hacerPruebaTituloNoticiaCaracteresEspeciales($_POST);
        array_push($pruebas, $resultadoTest);

        //TITULO_NOTICIA_CORRECTO
        $_POST['titulo_noticia'] = 'Titulo de la noticia';
        $resultadoTest = $this->hacerPruebaTituloNoticiaCorrecto($_POST);
        array_push($pruebas, $resultadoTest);
    
        return $pruebas;

         
    }
        
    function hacerPruebaTituloNoticiaVacio($atributo){
        $funcionesComunes = new FuncionesComunes();
        $resultadoObtenido = $funcionesComunes->comprobarAtributoBlank($atributo['titulo_noticia'], 'gestNoticias', 'titulo_noticia');
        $resultadoEsperado = 'TITULO_NOTICIA_VACIO'." - ".TITULO_NOTICIA_VACIO;
        
        return $this->createDatosPruebaAtributos($resultadoObtenido, $resultadoEsperado, VACIO, ERROR, $atributo['titulo_noticia'], 'titulo_noticia');
        
    }
    function hacerPruebaTituloNoticiaMenor3($atributo){
        $funcionesComunes = new FuncionesComunes();
        $resultadoObtenido = $funcionesComunes->comprobarAtributosLongitudMenor($atributo['titulo_noticia'], 'gestNoticias', 'titulo_noticia', 3);
        $resultadoEsperado = 'TITULO_NOTICIA_MENOR_QUE_3'. " - ".TITULO_NOTICIA_MENOR_QUE_3;
        

        return $this->createDatosPruebaAtributos($resultadoObtenido, $resultadoEsperado, LONGITUD_MINIMA_ERRONEA, ERROR, $atributo['titulo_noticia'], 'titulo_noticia');
        }
        

        function hacerPruebaTituloNoticiaMayor255($atributo){
            $funcionesComunes = new FuncionesComunes();
            $resultadoObtenido = $funcionesComunes->comprobarAtributosLongitudMayor($atributo['titulo_noticia'], 'gestNoticias', 'titulo_noticia', 255);
            $resultadoEsperado = 'TITULO_NOTICIA_MAYOR_QUE_255'." - ".TITULO_NOTICIA_MAYOR_QUE_255;
        
            return $this->createDatosPruebaAtributos($resultadoObtenido, $resultadoEsperado, LONGITUD_MAXIMA_ERRONEA, ERROR, $atributo['titulo_noticia'], 'titulo_noticia');
        
        }
        
        function hacerPruebaTituloNoticiaCaracteresEspeciales($atributo){
            $funcionesComunes = new FuncionesComunes();
            $resultadoObtenido = $funcionesComunes->comprobarAtributoCaracteresEspeciales($atributo['titulo_noticia'], 'gestNoticias', 'titulo_noticia');
            $resultadoEsperado = 'TITULO_NOTICIA_ALFABETICO_INCORRECTO'." - ".TITULO_NOTICIA_ALFABETICO_INCORRECTO;
        
            return $this->createDatosPruebaAtributos($resultadoObtenido, $resultadoEsperado, CARACTERES_ESPECIALES, ERROR, $atributo['titulo_noticia'], 'titulo_noticia');
        }
        
        function hacerPruebaTituloNoticiaCorrecto($atributo){
            $funcionesComunes = new FuncionesComunes();
            $resultadoObtenido = $funcionesComunes->comprobarAtributoCorrectoAlfabetico($atributo['titulo_noticia']);
            $resultadoEsperado = 'AVANZAR_SIGUIENTE_CAMPO'." - ".AVANZAR_SIGUIENTE_CAMPO;
        
            return $this->createDatosPruebaAtributos($resultadoObtenido, $resultadoEsperado, TITULO_NOTICIA_OK, ÉXITO,  $atributo['titulo_noticia'], 'titulo_noticia');
        }

        
}

?>