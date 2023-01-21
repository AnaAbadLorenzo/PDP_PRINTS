<?php
include_once './Test/Atributos/FuncionesComunes.php';
include_once './Test/Test.php';
include_once './Test/TiposPruebas.php';


$funcionesComunes = new FuncionesComunes();

class TestDescripcionCategoria extends Test{
    function testAtributoNombreCategoria() {
        $pruebas = array();

        //DESCRIPCION_CATEGORIA_VACIO
        $_POST = NULL;
        $_POST['descripcion_categoria'] = '';
        $resultadoTest = $this->hacerPruebaDescripcionCategoriaVacio($_POST);
        array_push($pruebas, $resultadoTest);

        //DESCRIPCION_CATEGORIA_MENOR_QUE_3
        $_POST['descripcion_categoria'] = 'ca';
        $resultadoTest = $this->hacerPruebaNombreCategoriaMenor3($_POST);
        array_push($pruebas, $resultadoTest);

        //DESCRIPCION_CATEGORIA_CARACTERES_ESPECIALES
        $_POST['descripcion_categoria'] = '###Ananita';
        $resultadoTest = $this->hacerPruebaNombreCategoriaCaracteresEspeciales($_POST);
        array_push($pruebas, $resultadoTest);

        //DESCRIPCION_CATEGORIA_CORRECTO
        $_POST['descripcion_categoria'] = 'Categoria';
        $resultadoTest = $this->hacerPruebaNombreCorrecto($_POST);
        array_push($pruebas, $resultadoTest);

        return $pruebas;
    }

    function hacerPruebaNombreCategoriaVacio($atributo){
        $funcionesComunes = new FuncionesComunes();
        $resultadoObtenido = $funcionesComunes->comprobarAtributoBlank($atributo['descripcion_categoria'], 'gestCategorias', 'descripcion_categoria');
        $resultadoEsperado = 'DESCRIPCION_CATEGORIA_VACIO'." - ".DESCRIPCION_CATEGORIA_VACIO;

        return $this->createDatosPruebaAtributos($resultadoObtenido, $resultadoEsperado, VACIO, ERROR, $atributo['descripcion_categoria'], 'descripcion_categoria');

    }

    function hacerPruebaDescripcionCategoriaMenor3($atributo){
        $funcionesComunes = new FuncionesComunes();
        $resultadoObtenido = $funcionesComunes->comprobarAtributosLongitudMenor($atributo['descripcion_categoria'], 'gestCategorias', 'descripcion_categoria', 3);
        $resultadoEsperado = 'DESCRIPCION_CATEGORIA_MENOR_QUE_3'. " - ".DESCRIPCION_CATEGORIA_MENOR_QUE_3;

        return $this->createDatosPruebaAtributos($resultadoObtenido, $resultadoEsperado, LONGITUD_MINIMA_ERRONEA, ERROR, $atributo['descripcion_categoria'], 'descripcion_categoria');
    }

    function hacerPruebaDescripcionCategoriaCaracteresEspeciales($atributo){
        $funcionesComunes = new FuncionesComunes();
        $resultadoObtenido = $funcionesComunes->comprobarAtributoCaracteresEspeciales($atributo['descripcion_categoria'], 'gestCategorias', 'descripcion_categoria');
        $resultadoEsperado = 'DESCRIPCION_CATEGORIA_ALFABETICO_INCORRECTO'." - ".DESCRIPCION_CATEGORIA_ALFABETICO_INCORRECTO;

        return $this->createDatosPruebaAtributos($resultadoObtenido, $resultadoEsperado, CARACTERES_ESPECIALES, ERROR, $atributo['descripcion_categoria'], 'descripcion_categoria');
    }

    function hacerPruebaDescripcionCategoriaCorrecto($atributo){
        $funcionesComunes = new FuncionesComunes();
        $resultadoObtenido = $funcionesComunes->comprobarAtributoCorrectoAlfabetico($atributo['descripcion_categoria']);
        $resultadoEsperado = 'AVANZAR_SIGUIENTE_CAMPO'." - ".AVANZAR_SIGUIENTE_CAMPO;

        return $this->createDatosPruebaAtributos($resultadoObtenido, $resultadoEsperado, DESCRIPCION_CATEGORIA_OK, ÉXITO,  $atributo['descripcion_categoria'], 'descripcion_categoria');
    }
}

?>
