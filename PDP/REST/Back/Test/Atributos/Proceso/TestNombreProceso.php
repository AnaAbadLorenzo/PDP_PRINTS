<?php
include_once './Test/Atributos/FuncionesComunes.php';
include_once './Test/Test.php';
include_once './Test/TiposPruebas.php';


$funcionesComunes = new FuncionesComunes();

class TestNombreProceso extends Test{
    function testAtributoNombreProceso() {
        $pruebas = array();

        //NOMBRE_PROCESO_VACIO
        $_POST = NULL;
        $_POST['nombre_proceso'] = '';
        $resultadoTest = $this->hacerPruebaNombreProcesoVacio($_POST);
        array_push($pruebas, $resultadoTest);

        //NOMBRE_PROCESO_MENOR_QUE_3
        $_POST['nombre_proceso'] = 'ca';
        $resultadoTest = $this->hacerPruebaNombreProcesoMenor3($_POST);
        array_push($pruebas, $resultadoTest);

        //NOMBRE_PROCESO_MAYOR_QUE_48
        $_POST['nombre_proceso']='NombreProcesoooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo';
        $resultadoTest = $this->hacerPruebaNombreProcesoMayor48($_POST);
        array_push($pruebas, $resultadoTest);
        //NOMBRE_PROCESO_INICIA_CARACTERES_ESPECIALES
        $_POST['nombre_proceso'] = '###Ananita';
        $resultadoTest = $this->hacerPruebaNombreProcesoCaracteresEspeciales($_POST);
        array_push($pruebas, $resultadoTest);

        //NOMBRE_PROCESO_CORRECTO
        $_POST['nombre_proceso'] = 'Proceso';
        $resultadoTest = $this->hacerPruebaNombreCorrecto($_POST);
        array_push($pruebas, $resultadoTest);

        return $pruebas;
    }

    function hacerPruebaNombreProcesoVacio($atributo){
        $funcionesComunes = new FuncionesComunes();
        $resultadoObtenido = $funcionesComunes->comprobarAtributoBlank($atributo['nombre_proceso'], 'gestProcesos', 'nombre_proceso');
        $resultadoEsperado = 'NOMBRE_PROCESO_VACIO'." - ".NOMBRE_PROCESO_VACIO;

        return $this->createDatosPruebaAtributos($resultadoObtenido, $resultadoEsperado, VACIO, ERROR, $atributo['nombre_proceso'], 'nombre_proceso');

    }

    function hacerPruebaNombreProcesoMenor3($atributo){
        $funcionesComunes = new FuncionesComunes();
        $resultadoObtenido = $funcionesComunes->comprobarAtributosLongitudMenor($atributo['nombre_proceso'], 'gestProcesos', 'nombre_proceso', 3);
        $resultadoEsperado = 'NOMBRE_PROCESO_MENOR_QUE_3'. " - ".NOMBRE_PROCESO_MENOR_QUE_3;

        return $this->createDatosPruebaAtributos($resultadoObtenido, $resultadoEsperado, LONGITUD_MINIMA_ERRONEA, ERROR, $atributo['nombre_proceso'], 'nombre_proceso');
    }

    function hacerPruebaNombreProcesoMayor48($atributo){
        $funcionesComunes = new FuncionesComunes();
        $resultadoObtenido = $funcionesComunes->comprobarAtributosLongitudMayor($atributo['nombre_proceso'], 'gestProcesos', 'nombre_proceso', 48);
        $resultadoEsperado = 'NOMBRE_PROCESO_MAYOR_QUE_48'." - ".NOMBRE_PROCESO_MAYOR_QUE_48;

        return $this->createDatosPruebaAtributos($resultadoObtenido, $resultadoEsperado, LONGITUD_MAXIMA_ERRONEA, ERROR, $atributo['nombre_proceso'], 'nombre_proceso');

    }

    function hacerPruebaNombreProcesoCaracteresEspeciales($atributo){
        $funcionesComunes = new FuncionesComunes();
        $resultadoObtenido = $funcionesComunes->comprobarAtributoCaracteresEspeciales($atributo['nombre_proceso'], 'gestProcesos', 'nombre_proceso');
        $resultadoEsperado = 'NOMBRE_PROCESO_ALFABETICO_INCORRECTO'." - ".NOMBRE_PROCESO_ALFABETICO_INCORRECTO;

        return $this->createDatosPruebaAtributos($resultadoObtenido, $resultadoEsperado, CARACTERES_ESPECIALES, ERROR, $atributo['nombre_proceso'], 'nombre_proceso');
    }

    function hacerPruebaNombreprocesoCorrecto($atributo){
        $funcionesComunes = new FuncionesComunes();
        $resultadoObtenido = $funcionesComunes->comprobarAtributoCorrectoAlfabetico($atributo['nombre_proceso']);
        $resultadoEsperado = 'AVANZAR_SIGUIENTE_CAMPO'." - ".AVANZAR_SIGUIENTE_CAMPO;

        return $this->createDatosPruebaAtributos($resultadoObtenido, $resultadoEsperado, NOMBRE_PROCESO_OK, ÉXITO,  $atributo['nombre_proceso'], 'nombre_proceso');
    }
}

?>



