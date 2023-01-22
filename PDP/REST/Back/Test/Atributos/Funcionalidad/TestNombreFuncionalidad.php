<?php
include_once './Test/Atributos/FuncionesComunes.php';
include_once './Test/Test.php';
include_once './Test/TiposPruebas.php';


$funcionesComunes = new FuncionesComunes();

class TestNombreFuncionalidad extends Test{
    function testAtributoNombreFuncionalidad() {
        $pruebas = array();
        
        //NOMBRE_FUNCIONALIDAD_VACIO
        $_POST = NULL;
        $_POST['nombre_funcionalidad'] = '';
        $resultadoTest = $this->hacerPruebaNombreFuncionalidadVacio($_POST);
        array_push($pruebas, $resultadoTest);
        
        //NOMBRE_FUNCIONALIDAD_MENOR_QUE_3
        $_POST['nombre_funcionalidad'] = 'fu';
        $resultadoTest = $this->hacerPruebaNombreFuncionalidadMenor3($_POST);
        array_push($pruebas, $resultadoTest);
        
        //NOMBRE_FUNCIONALIDAD_MAYOR_QUE_128
        $_POST['nombre_funcionalidad'] = 'Funcionalidaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaad';
        $resultadoTest = $this->hacerPruebaNombreFuncionalidadMayor128($_POST);
        array_push($pruebas, $resultadoTest);
        
        //NOMBRE_FUNCIONALIDAD_CONTIENE_CARACTERES_ESPECIALES
        $_POST['nombre_funcionalidad'] = 'Funcionalidad###';
        $resultadoTest = $this->hacerPruebaNombreFuncionalidadCaracteresEspeciales($_POST);
        array_push($pruebas, $resultadoTest);

        //NOMBRE_FUNCIONALIDAD_CORRECTO
        $_POST['nombre_funcionalidad'] = 'Gestión de acciones';
        $resultadoTest = $this->hacerPruebaNombreFuncionalidadCorrecto($_POST);
        array_push($pruebas, $resultadoTest);
    
        return $pruebas;

         
    }
        
    function hacerPruebaNombreFuncionalidadVacio($atributo){
        $funcionesComunes = new FuncionesComunes();
        $resultadoObtenido = $funcionesComunes->comprobarAtributoBlank($atributo['nombre_funcionalidad'], 'gestFuncionalidades', 'nombre_funcionalidad');
        $resultadoEsperado = 'NOMBRE_FUNCIONALIDAD_VACIO'." - ".NOMBRE_FUNCIONALIDAD_VACIO;
        
        return $this->createDatosPruebaAtributos($resultadoObtenido, $resultadoEsperado, VACIO, ERROR, $atributo['nombre_funcionalidad'], 'nombre_funcionalidad');
        
    }
        
    function hacerPruebaNombreFuncionalidadMenor3($atributo){
        $funcionesComunes = new FuncionesComunes();
        $resultadoObtenido = $funcionesComunes->comprobarAtributosLongitudMenor($atributo['nombre_funcionalidad'], 'gestFuncionalidades', 'nombre_funcionalidad', 3);
        $resultadoEsperado = 'NOMBRE_FUNCIONALIDAD_MENOR_QUE_3'. " - ".NOMBRE_FUNCIONALIDAD_MENOR_QUE_3;
        
        return $this->createDatosPruebaAtributos($resultadoObtenido, $resultadoEsperado, LONGITUD_MINIMA_ERRONEA, ERROR, $atributo['nombre_funcionalidad'], 'nombre_funcionalidad');
    }
        
        function hacerPruebaNombreFuncionalidadMayor128($atributo){
            $funcionesComunes = new FuncionesComunes();
            $resultadoObtenido = $funcionesComunes->comprobarAtributosLongitudMayor($atributo['nombre_funcionalidad'], 'gestFuncionalidades', 'nombre_funcionalidad', 32);
            $resultadoEsperado = 'NOMBRE_FUNCIONALIDAD_MAYOR_QUE_128'." - ".NOMBRE_FUNCIONALIDAD_MAYOR_QUE_128;
        
            return $this->createDatosPruebaAtributos($resultadoObtenido, $resultadoEsperado, LONGITUD_MAXIMA_ERRONEA, ERROR, $atributo['nombre_funcionalidad'], 'nombre_funcionalidad');
        
        }
        
        function hacerPruebaNombreFuncionalidadCaracteresEspeciales($atributo){
            $funcionesComunes = new FuncionesComunes();
            $resultadoObtenido = $funcionesComunes->comprobarAtributoCaracteresEspeciales($atributo['nombre_funcionalidad'], 'gestFuncionalidades', 'nombre_funcionalidad');
            $resultadoEsperado = 'NOMBRE_FUNCIONALIDAD_ALFABETICO_INCORRECTO'." - ".NOMBRE_FUNCIONALIDAD_ALFABETICO_INCORRECTO;
        
            return $this->createDatosPruebaAtributos($resultadoObtenido, $resultadoEsperado, CARACTERES_ESPECIALES, ERROR, $atributo['nombre_funcionalidad'], 'nombre_funcionalidad');
        }

        function hacerPruebaNombreFuncionalidadCorrecto($atributo){
            $funcionesComunes = new FuncionesComunes();
            $resultadoObtenido = $funcionesComunes->comprobarAtributoCorrectoAlfabetico($atributo['nombre_funcionalidad']);
            $resultadoEsperado = 'AVANZAR_SIGUIENTE_CAMPO'." - ".AVANZAR_SIGUIENTE_CAMPO;
        
            return $this->createDatosPruebaAtributos($resultadoObtenido, $resultadoEsperado, NOMBRE_FUNCIONALIDAD_OK, ÉXITO,  $atributo['nombre_funcionalidad'], 'nombre_funcionalidad');
        }

        
}

?>