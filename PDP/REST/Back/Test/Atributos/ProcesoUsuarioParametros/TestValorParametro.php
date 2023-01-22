<?php
include_once './Test/Atributos/FuncionesComunes.php';
include_once './Test/Test.php';
include_once './Test/TiposPruebas.php';


$funcionesComunes = new FuncionesComunes();

class TestValorParametro extends Test{
    function testAtributoValorParametro() {
        $pruebas = array();

        //VALOR_PARAMETRO_VACIO
        $_POST = NULL;
        $_POST['valor_parametro'] = '';
        $resultadoTest = $this->hacerPruebaValorParametroVacio($_POST);
        array_push($pruebas, $resultadoTest);
