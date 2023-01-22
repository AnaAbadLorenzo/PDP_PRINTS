<?php
include_once './Test/Atributos/FuncionesComunes.php';
include_once './Test/Test.php';
include_once './Test/TiposPruebas.php';


$funcionesComunes = new FuncionesComunes();

class TestContenidoNoticia extends Test{
    function testAtributoContenidoNoticia() {
        $pruebas = array();
        
        //CONTENIDO_NOTICIA_VACIO
        $_POST = NULL;
        $_POST['contenido_noticia'] = '';
        $resultadoTest = $this->hacerPruebaTituloNoticiaVacio($_POST);
        array_push($pruebas, $resultadoTest);
        
        //CONTENIDO_NOTICIA_MENOR_QUE_3
        $_POST['contenido_noticia'] = 'Go';
        $resultadoTest = $this->hacerPruebaTituloNoticiaMenor3($_POST);
        array_push($pruebas, $resultadoTest);

        return $pruebas;

         
    }
       


    function hacerPruebaContenidoNoticiaVacio($atributo){
        $funcionesComunes = new FuncionesComunes();
        $resultadoObtenido = $funcionesComunes->comprobarAtributoBlank($atributo['contenido_noticia'], 'gestNoticias', 'contenido_noticia');
        $resultadoEsperado = 'CONTENIDO_NOTICIA_VACIO'." - ".CONTENIDO_NOTICIA_VACIO;
            
        return $this->createDatosPruebaAtributos($resultadoObtenido, $resultadoEsperado, VACIO, ERROR, $atributo['contenido_noticia'], 'contenido_noticia');
            
        }
    function hacerPruebaTituloNoticiaMenor3($atributo){
        $funcionesComunes = new FuncionesComunes();
        $resultadoObtenido = $funcionesComunes->comprobarAtributosLongitudMenor($atributo['contenido_noticia'], 'gestNoticias', 'contenido_noticia', 3);
        $resultadoEsperado = 'TITULO_NOTICIA_MENOR_QUE_3'. " - ".TITULO_NOTICIA_MENOR_QUE_3;
            
          
        return $this->createDatosPruebaAtributos($resultadoObtenido, $resultadoEsperado, LONGITUD_MINIMA_ERRONEA, ERROR, $atributo['contenido_noticia'], 'contenido_noticia');
        }

    function hacerPruebaContenidoNoticiaCorrecto($atributo){
        $funcionesComunes = new FuncionesComunes();
        $resultadoObtenido = $funcionesComunes->comprobarAtributoCorrectoAlfabetico($atributo['contenido_noticia']);
        $resultadoEsperado = 'AVANZAR_SIGUIENTE_CAMPO'." - ".AVANZAR_SIGUIENTE_CAMPO;
        
        return $this->createDatosPruebaAtributos($resultadoObtenido, $resultadoEsperado, CONTENIDO_NOTICIA_OK, ÉXITO,  $atributo['contenido_noticia'], 'contenido_noticia');
        }

        
}

?>
            