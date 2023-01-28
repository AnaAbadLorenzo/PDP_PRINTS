<?php

include_once './Test/Atributos/Categoria/TestNombreCategoria.php';
include_once './Test/Atributos/Categoria/TestDescripcionCategoria.php';
include_once './Test/Atributos/Categoria/TestDniResponsable.php';
include_once './Servicios/Test/TestGestionCategoriasService.php';

class TestGestionCategoriasServiceImpl implements TestGestionCategoriasService {

    private $testNombreCategoria;
    private $testDescripcionCategoria;
    private $testDniResponsable;

    function __construct()
    {
        $this->testNombreCategoria = new TestNombreCategoria();
        $this->testDescripcionCategoria = new TestDescripcionCategoria();
        $this->testDniResponsable = new TestDNIResponsable();
    }
    function testAtributoNombreCategoria() {
        $respuesta = '';
        $respuesta = $this->testNombreCategoria->testAtributoNombreCategoria();

        if(empty($respuesta)){
           $respuesta = 'TEST_FALLIDOS';
        }
        return $respuesta;
    }

    function testAtributoDescripcionCategoria(){
        $respuesta = '';
        $respuesta = $this->testDescripcionCategoria->testAtributoDescripcionCategoria();

        if(empty($respuesta)){
            $respuesta = 'TEST_FALLIDOS';
        }
        return $respuesta;
    }

    function testAtributoDniResponsable(){
        $respuesta = '';
        $respuesta = $this->testDniResponsable->testAtributoDniResponsable();

        if(empty($respuesta)){
            $respuesta = 'TEST_FALLIDOS';
        }
        return $respuesta;
    }
}
?>