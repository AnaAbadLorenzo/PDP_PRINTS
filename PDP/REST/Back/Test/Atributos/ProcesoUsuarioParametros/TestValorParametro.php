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
        //VALOR_PARAMETRO_INICIA_CARACTERES_ESPECIALES
        $_POST['valor_parametro'] = '###Ananita';
        $resultadoTest = $this->hacerPruebaValorParametroCaracteresEspeciales($_POST);
        array_push($pruebas, $resultadoTest);

        //VALOR_PARAMETRO_CORRECTO
        $_POST['valor_parametro'] = 'Categoria';
        $resultadoTest = $this->hacerPruebaValorParametroCorrecto($_POST);
        array_push($pruebas, $resultadoTest);

    return $pruebas;
}

    function hacerPruebaValorParametroVacio($atributo){
        $funcionesComunes = new FuncionesComunes();
        $resultadoObtenido = $funcionesComunes->comprobarAtributoBlank($atributo['valor_parametro'], 'gestProcesosusuarioparametro', 'valor_parametro');
        $resultadoEsperado = 'VALOR_PARAMETRO_VACIO'." - ".VALOR_PARAMETRO_VACIO;

        return $this->createDatosPruebaAtributos($resultadoObtenido, $resultadoEsperado, VACIO, ERROR, $atributo['valor_parametro'], 'valor_parametro');

}

    function hacerPruebaValorParametroCaracteresEspeciales($atributo){
        $funcionesComunes = new FuncionesComunes();
        $resultadoObtenido = $funcionesComunes->comprobarAtributoCaracteresEspeciales($atributo['valor_parametro'], 'gestProcesosusuarioparametro', 'valor_parametro');
        $resultadoEsperado = 'VALOR_PARAMETRO_ALFABETICO_INCORRECTO'." - ".VALOR_PARAMETRO_ALFABETICO_INCORRECTO;

        return $this->createDatosPruebaAtributos($resultadoObtenido, $resultadoEsperado, CARACTERES_ESPECIALES, ERROR, $atributo['valor_parametro'], 'valor_parametro');
}

    function hacerPruebaValorParametroCorrecto($atributo){
        $funcionesComunes = new FuncionesComunes();
        $resultadoObtenido = $funcionesComunes->comprobarAtributoCorrectoAlfabetico($atributo['valor_parametro']);
        $resultadoEsperado = 'AVANZAR_SIGUIENTE_CAMPO'." - ".AVANZAR_SIGUIENTE_CAMPO;

        return $this->createDatosPruebaAtributos($resultadoObtenido, $resultadoEsperado, VALOR_PARAMETRO_OK, ÉXITO,  $atributo['valor_parametro'], 'valor_parametro');
}
}

?>
