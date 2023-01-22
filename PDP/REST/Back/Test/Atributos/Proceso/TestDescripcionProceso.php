<?php
include_once './Test/Atributos/FuncionesComunes.php';
include_once './Test/Test.php';
include_once './Test/TiposPruebas.php';


$funcionesComunes = new FuncionesComunes();

class TestDescripcionProceso extends Test{
    function testAtributoNombreCategoria() {
        $pruebas = array();

        //DESCRIPCION_PROCESO_VACIO
        $_POST = NULL;
        $_POST['descripcion_proceso'] = '';
        $resultadoTest = $this->hacerPruebaDescripcionProcesoVacio($_POST);
        array_push($pruebas, $resultadoTest);

        //DESCRIPCION_PROCESO_MENOR_QUE_3
        $_POST['descripcion_proceso'] = 'ca';
        $resultadoTest = $this->hacerPruebaDescripcionProcesoMenor3($_POST);
        array_push($pruebas, $resultadoTest);

        //DESCRIPCION_PROCESO_CARACTERES_ESPECIALES
        $_POST['descripcion_proceso'] = '###Ananita';
        $resultadoTest = $this->hacerPruebaDescripcionProcesoCaracteresEspeciales($_POST);
        array_push($pruebas, $resultadoTest);

        //DESCRIPCION_PROCESO_CORRECTO
        $_POST['descripcion_proceso'] = 'Categoria';
        $resultadoTest = $this->hacerPruebaDescripcionProcesoCorrecto($_POST);
        array_push($pruebas, $resultadoTest);

        return $pruebas;
    }

    function hacerPruebaDescripcionProcesoVacio($atributo){
        $funcionesComunes = new FuncionesComunes();
        $resultadoObtenido = $funcionesComunes->comprobarAtributoBlank($atributo['descripcion_proceso'], 'gestProcesos', 'descripcion_proceso');
        $resultadoEsperado = 'DESCRIPCION_PROCESO_VACIO'." - ".DESCRIPCION_PROCESO_VACIO;

        return $this->createDatosPruebaAtributos($resultadoObtenido, $resultadoEsperado, VACIO, ERROR, $atributo['descripcion_proceso'], 'descripcion_proceso');

    }

    function hacerPruebaDescripcionProcesoMenor3($atributo){
        $funcionesComunes = new FuncionesComunes();
        $resultadoObtenido = $funcionesComunes->comprobarAtributosLongitudMenor($atributo['descripcion_proceso'], 'gestProcesos', 'descripcion_proceso', 3);
        $resultadoEsperado = 'DESCRIPCION_PROCESO_MENOR_QUE_3.' " - ".DESCRIPCION_PARAMETRO_MENOR_QUE_3;

        return $this->createDatosPruebaAtributos($resultadoObtenido, $resultadoEsperado, LONGITUD_MINIMA_ERRONEA, ERROR, $atributo['descripcion_proceso'], 'descripcion_proceso');
    }
    function hacerPruebaDescripcionProcesoCaracteresEspeciales($atributo){
        $funcionesComunes = new FuncionesComunes();
        $resultadoObtenido = $funcionesComunes->comprobarAtributoCaracteresEspeciales($atributo['descripcion_proceso'], 'gestProcesos', 'descripcion_proceso');
        $resultadoEsperado = 'DESCRIPCION_PROCESO_ALFABETICO_INCORRECTO'." - ".DESCRIPCION_PROCESO_ALFABETICO_INCORRECTO;

            return $this->createDatosPruebaAtributos($resultadoObtenido, $resultadoEsperado, CARACTERES_ESPECIALES, ERROR, $atributo['descripcion_proceso'], 'descripcion_proceso');
        }
        
        function hacerPruebaDescripcionProcesoCorrecto($atributo){
            $funcionesComunes = new FuncionesComunes();
            $resultadoObtenido = $funcionesComunes->comprobarAtributoCorrectoAlfabetico($atributo['descripcion_proceso']);
            $resultadoEsperado = 'AVANZAR_SIGUIENTE_CAMPO'." - ".AVANZAR_SIGUIENTE_CAMPO;
        
            return $this->createDatosPruebaAtributos($resultadoObtenido, $resultadoEsperado, DESCRIPCION_PROCESO_OK, ÉXITO,  $atributo['descripcion_proceso'], 'descripcion_proceso');
        }
    }
        
?>
