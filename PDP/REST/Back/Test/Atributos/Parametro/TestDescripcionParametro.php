<?php
include_once './Test/Atributos/FuncionesComunes.php';
include_once './Test/Test.php';
include_once './Test/TiposPruebas.php';


$funcionesComunes = new FuncionesComunes();

class TestDescripcionParametro extends Test{
    function testAtributoNombreCategoria() {
        $pruebas = array();

        //DESCRIPCION_PARAMETRO_VACIO
        $_POST = NULL;
        $_POST['descripcion_parametro'] = '';
        $resultadoTest = $this->hacerPruebaDescripcionParametroVacio($_POST);
        array_push($pruebas, $resultadoTest);

        //DESCRIPCION_PARAMETRO_MENOR_QUE_3
        $_POST['descripcion_parametro'] = 'ca';
        $resultadoTest = $this->hacerPruebaDescipcionCategoriaMenor3($_POST);
        array_push($pruebas, $resultadoTest);

        //DESCRIPCION_PARAMETRO_CARACTERES_ESPECIALES
        $_POST['descripcion_parametro'] = '###Ananita';
        $resultadoTest = $this->hacerPruebaDescipcionCategoriaCaracteresEspeciales($_POST);
        array_push($pruebas, $resultadoTest);

        //DESCRIPCION_PARAMETRO_CORRECTO
        $_POST['descripcion_parametro'] = 'Categoria';
        $resultadoTest = $this->hacerPruebaDescipcionCategoriaCorrecto($_POST);
        array_push($pruebas, $resultadoTest);

        return $pruebas;
    }

    function hacerPruebaDescipcionParametroVacio($atributo){
        $funcionesComunes = new FuncionesComunes();
        $resultadoObtenido = $funcionesComunes->comprobarAtributoBlank($atributo['descripcion_parametro'], 'gestParametros', 'descripcion_parametro');
        $resultadoEsperado = 'DESCRIPCION_CATEGORIA_VACIO'." - ".DESCRIPCION_CATEGORIA_VACIO;

        return $this->createDatosPruebaAtributos($resultadoObtenido, $resultadoEsperado, VACIO, ERROR, $atributo['descripcion_parametro'], 'descripcion_parametro');

    }

    function hacerPruebaDescripcionParametroMenor3($atributo){
        $funcionesComunes = new FuncionesComunes();
        $resultadoObtenido = $funcionesComunes->comprobarAtributosLongitudMenor($atributo['descripcion_parametro'], 'gestParametros', 'descripcion_parametro', 3);
        $resultadoEsperado = 'DESCRIPCION_PARAMETRO_MENOR_QUE_3'. " - ".DESCRIPCION_PARAMETRO_MENOR_QUE_3;

        return $this->createDatosPruebaAtributos($resultadoObtenido, $resultadoEsperado, LONGITUD_MINIMA_ERRONEA, ERROR, $atributo['descripcion_parametro'], 'descripcion_parametro');
    }

    function hacerPruebaDescripcionParametroCaracteresEspeciales($atributo){
        $funcionesComunes = new FuncionesComunes();
        $resultadoObtenido = $funcionesComunes->comprobarAtributoCaracteresEspeciales($atributo['descripcion_parametro'], 'gestParametros', 'descripcion_parametro');
        $resultadoEsperado = 'DESCRIPCION_PARAMETRO_ALFABETICO_INCORRECTO'." - ".DESCRIPCION_PARAMETRO_ALFABETICO_INCORRECTO;

        return $this->createDatosPruebaAtributos($resultadoObtenido, $resultadoEsperado, CARACTERES_ESPECIALES, ERROR, $atributo['descripcion_parametro'], 'descripcion_parametro');
    }

    function hacerPruebaDescripcionParametroCorrecto($atributo){
        $funcionesComunes = new FuncionesComunes();
        $resultadoObtenido = $funcionesComunes->comprobarAtributoCorrectoAlfabetico($atributo['descripcion_parametro']);
        $resultadoEsperado = 'AVANZAR_SIGUIENTE_CAMPO'." - ".AVANZAR_SIGUIENTE_CAMPO;

        return $this->createDatosPruebaAtributos($resultadoObtenido, $resultadoEsperado, DESCRIPCION_PARAMETRO_OK, ÉXITO,  $atributo['descripcion_parametro'], 'descripcion_parametro');
    }
}

?>