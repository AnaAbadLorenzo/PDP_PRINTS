<?php
include_once './Test/Atributos/FuncionesComunes.php';
include_once './Test/Test.php';
include_once './Test/TiposPruebas.php';


$funcionesComunes = new FuncionesComunes();

class TestNombreCategoria extends Test{
    function testAtributoNombreCategoria() {
        $pruebas = array();

        //NOMBRE_CATEGORIA_VACIO
        $_POST = NULL;
        $_POST['nombre_categoria'] = '';
        $resultadoTest = $this->hacerPruebaNombreCategoriaVacio($_POST);
        array_push($pruebas, $resultadoTest);

        //NOMBRE_CATEGORIA_MENOR_QUE_3
        $_POST['nombre_categoria'] = 'ca';
        $resultadoTest = $this->hacerPruebaNombreCategoriaMenor3($_POST);
        array_push($pruebas, $resultadoTest);

        //NOMBRE_CATEGORIA_MAYOR_QUE_48
        $_POST['nombre_categoria'] = 'Categoriaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa';
        $resultadoTest = $this->hacerPruebaNombreCategoriaMayor128($_POST);
        array_push($pruebas, $resultadoTest);

        //NOMBRE_CATEGORIA_INICIA_CARACTERES_ESPECIALES
        $_POST['nombre_categoria'] = '###Ananita';
        $resultadoTest = $this->hacerPruebaNombreCategoriaCaracteresEspeciales($_POST);
        array_push($pruebas, $resultadoTest);

        //NOMBRE_CATEGORIA_CORRECTO
        $_POST['nombre_categoria'] = 'Categoria';
        $resultadoTest = $this->hacerPruebaNombreCategoriaCorrecto($_POST);
        array_push($pruebas, $resultadoTest);

        return $pruebas;
    }

    function hacerPruebaNombreCategoriaVacio($atributo){
        $funcionesComunes = new FuncionesComunes();
        $resultadoObtenido = $funcionesComunes->comprobarAtributoBlank($atributo['nombre_categoria'], 'gestCategorias', 'nombre_categoria');
        $resultadoEsperado = 'NOMBRE_CATEGORIA_VACIO'." - ".NOMBRE_CATEGORIA_VACIO;

        return $this->createDatosPruebaAtributos($resultadoObtenido, $resultadoEsperado, VACIO, ERROR, $atributo['nombre_categoria'], 'nombre_categoria');

    }

    function hacerPruebaNombreCategoriaMenor3($atributo){
        $funcionesComunes = new FuncionesComunes();
        $resultadoObtenido = $funcionesComunes->comprobarAtributosLongitudMenor($atributo['nombre_categoria'], 'gestCategorias', 'nombre_categoria', 3);
        $resultadoEsperado = 'NOMBRE_CATEGORIA_MENOR_QUE_3'. " - ".NOMBRE_CATEGORIA_MENOR_QUE_3;

        return $this->createDatosPruebaAtributos($resultadoObtenido, $resultadoEsperado, LONGITUD_MINIMA_ERRONEA, ERROR, $atributo['nombre_categoria'], 'nombre_categoria');
    }

    function hacerPruebaNombreCategoriaMayor128($atributo){
        $funcionesComunes = new FuncionesComunes();
        $resultadoObtenido = $funcionesComunes->comprobarAtributosLongitudMayor($atributo['nombre_categoria'], 'gestCategorias', 'nombre_categoria', 128);
        $resultadoEsperado = 'NOMBRE_CATEGORIA_MAYOR_QUE_128'." - ".NOMBRE_CATEGORIA_MAYOR_QUE_128;

        return $this->createDatosPruebaAtributos($resultadoObtenido, $resultadoEsperado, LONGITUD_MAXIMA_ERRONEA, ERROR, $atributo['nombre_categoria'], 'nombre_categoria');

    }

    function hacerPruebaNombreCategoriaCaracteresEspeciales($atributo){
        $funcionesComunes = new FuncionesComunes();
        $resultadoObtenido = $funcionesComunes->comprobarAtributoCaracteresEspeciales($atributo['nombre_categoria'], 'gestCategorias', 'nombre_categoria');
        $resultadoEsperado = 'NOMBRE_CATEGORIA_ALFABETICO_INCORRECTO'." - ".NOMBRE_CATEGORIA_ALFABETICO_INCORRECTO;

        return $this->createDatosPruebaAtributos($resultadoObtenido, $resultadoEsperado, CARACTERES_ESPECIALES, ERROR, $atributo['nombre_categoria'], 'nombre_categoria');
    }

    function hacerPruebaNombreCategoriaCorrecto($atributo){
        $funcionesComunes = new FuncionesComunes();
        $resultadoObtenido = $funcionesComunes->comprobarAtributoCorrectoAlfabetico($atributo['nombre_categoria']);
        $resultadoEsperado = 'AVANZAR_SIGUIENTE_CAMPO'." - ".AVANZAR_SIGUIENTE_CAMPO;

        return $this->createDatosPruebaAtributos($resultadoObtenido, $resultadoEsperado, NOMBRE_CATEGORIA_OK, ÉXITO,  $atributo['nombre_categoria'], 'nombre_categoria');
    }
}

?>
