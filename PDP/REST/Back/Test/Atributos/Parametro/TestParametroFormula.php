<?php
include_once './Test/Atributos/FuncionesComunes.php';
include_once './Test/Test.php';
include_once './Test/TiposPruebas.php';


$funcionesComunes = new FuncionesComunes();

class TestParametroFormula extends Test{
    function testAtributoParametroFormula() {
        $pruebas = array();

        //PARAMETRO_FORMULA_VACIO
        $_POST = NULL;
        $_POST['parametro_formula'] = '';
        $resultadoTest = $this->hacerPruebaParametroFormulaVacio($_POST);
        array_push($pruebas, $resultadoTest);
        
        //PARAMETRO_FORMULA_MAYOR_QUE_50
        $_POST['parametro_formula'] = 'Categoriaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa';
        $resultadoTest = $this->hacerPruebaNombreCategoriaMayor48($_POST);
        array_push($pruebas, $resultadoTest);
        
        //PARAMETROS_FORMULA_CARACTERES_ESPECIALES
        $_POST['parametro_formula'] = '###Ananita';
        $resultadoTest = $this->hacerPruebaParametroFormulaCaracteresEspeciales($_POST);
        array_push($pruebas, $resultadoTest);
        
        //PARAMETRO_FORMULA_CORRECTO
        $_POST['parametro_formula'] = 'Formula';
        $resultadoTest = $this->hacerPruebaParametroFormulaCorrecto($_POST);
        array_push($pruebas, $resultadoTest);
        
        return $pruebas;
        }
        
        function hacerPruebaParametroFormulaVacio($atributo){
            $funcionesComunes = new FuncionesComunes();
            $resultadoObtenido = $funcionesComunes->comprobarAtributoBlank($atributo['parametro_formula'], 'gestParametros', 'parametro_formula');
                $resultadoEsperado = 'PARAMETRO_FORMULA_VACIO'." - ".PARAMETRO_FORMULA_VACIO;
        
                return $this->createDatosPruebaAtributos($resultadoObtenido, $resultadoEsperado, VACIO, ERROR, $atributo['parametro_formula'], 'parametro_formula');
        
        }
        
        function hacerPruebaParametroFormulaMayorQue50($atributo){
            $funcionesComunes = new FuncionesComunes();
            $resultadoObtenido = $funcionesComunes->comprobarAtributosLongitudMayor($atributo['parametro_formula'], 'gestParametros', 'parametro_formula', 50);
                $resultadoEsperado = 'PARAMETRO_FORMULA_MAYOR_QUE_50'." - ".PARAMETRO_FORMULA_MAYOR_QUE_50;
        
                return $this->createDatosPruebaAtributos($resultadoObtenido, $resultadoEsperado, LONGITUD_MAXIMA_ERRONEA, ERROR, $atributo['parametro_formula'], 'parametro_formula');
        
        }
        
        function hacerPruebaParametroFormulaCaracteresEspeciales($atributo){
            $funcionesComunes = new FuncionesComunes();
            $resultadoObtenido = $funcionesComunes->comprobarAtributoCaracteresEspeciales($atributo['parametro_formula'], 'gestParametros', 'parametro_formula');
                $resultadoEsperado = 'PARAMETRO_FORMULA_ALFABETICO_INCORRECTO'." - ".PARAMETRO_FORMULA_ALFABETICO_INCORRECTO;
        
            return $this->createDatosPruebaAtributos($resultadoObtenido, $resultadoEsperado, CARACTERES_ESPECIALES, ERROR, $atributo['parametro_formula'], 'parametro_formula');
        }
        
        function hacerPruebaParametroFormulaCorrecto($atributo){
            $funcionesComunes = new FuncionesComunes();
            $resultadoObtenido = $funcionesComunes->comprobarAtributoCorrectoAlfabetico($atributo['parametro_formula']);
            $resultadoEsperado = 'AVANZAR_SIGUIENTE_CAMPO'." - ".AVANZAR_SIGUIENTE_CAMPO;
        
            return $this->createDatosPruebaAtributos($resultadoObtenido, $resultadoEsperado, PARAMETRO_FORMULA_OK, ÉXITO,  $atributo['parametro_formula'], 'parametro_formula');
        }
    }
        
?>
        
