<?php

include_once './Test/Atributos/Noticia/TestTituloNoticia.php';
include_once './Test/Atributos/Noticia/TestContenidoNoticia.php';
include_once './Test/Atributos/Noticia/TestFechaNoticia.php';
include_once './Test/Accion/TestGestionNoticias.php';
include_once './Servicios/Test/TestGestionNoticiasService.php';

class TestGestionNoticiasServiceImpl implements TestGestionNoticiasService {

    private $testTituloNoticia;
    private $testContenidoNoticia;
    private $testFechaNoticia;
    private $testNoticia;

    function __construct()
    {
        $this->testTituloNoticia = new TestTituloNoticia();
        $this->testContenidoNoticia = new TestContenidoNoticia();
        $this->testFechaNoticia = new TestFechaNoticia();
        $this->testNoticia = new TestGestionNoticias();
    }
    function testAtributoTituloNoticia() {
        $respuesta = '';
        $respuesta = $this->testTituloNoticia->testAtributoTituloNoticia();

        if(empty($respuesta)){
           $respuesta = 'TEST_FALLIDOS';
        }
        return $respuesta;
    }

    function testAtributoContenidoNoticia(){
        $respuesta = '';
        $respuesta = $this->testContenidoNoticia->testAtributoContenidoNoticia();

        if(empty($respuesta)){
            $respuesta = 'TEST_FALLIDOS';
        }
        return $respuesta;
    }

    function testAtributoFechaNoticia(){
        $respuesta = '';
        $respuesta = $this->testFechaNoticia->testAtributoFechaNoticia();

        if(empty($respuesta)){
            $respuesta = 'TEST_FALLIDOS';
        }
        return $respuesta;
    }

    function testAccionGestionNoticias(){
        $respuesta = '';
        $respuesta = $this->testNoticia->testNoticiasGestionNoticias();

        if(empty($respuesta)){
            $respuesta = 'TEST_FALLIDOS';
        }
        return $respuesta;
    }
}
?>