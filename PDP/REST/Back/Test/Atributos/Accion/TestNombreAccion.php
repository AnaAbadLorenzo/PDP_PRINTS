<?php
include_once './Test/Atributos/FuncionesComunes.php';
include_once './Test/Test.php';
include_once './Test/TiposPruebas.php';


$funcionesComunes = new FuncionesComunes();

class TestNombreAccion extends Test{
    function testAtributoNombreAccion() {
        $pruebas = array();
        
        //NOMBRE_ACCION_VACIO
        $_POST = NULL;
        $_POST['nombre_accion'] = '';
        $resultadoTest = $this->hacerPruebaNombreAccionVacio($_POST);
        array_push($pruebas, $resultadoTest);
        
        //NOMBRE_ACCION_MENOR_QUE_3
        $_POST['nombre_accion'] = 'ac';
        $resultadoTest = $this->hacerPruebaNombreAccionMenor3($_POST);
        array_push($pruebas, $resultadoTest);
        
        //NOMBRE_ACCION_MAYOR_QUE_32
        $_POST['nombre_accion'] = 'Acionnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn';
        $resultadoTest = $this->hacerPruebaNombreAccionMayor32($_POST);
        array_push($pruebas, $resultadoTest);
        
        //NOMBRE_ACCION_CONTIENE_CARACTERES_ESPECIALES
        $_POST['nombre_accion'] = '###Acción';
        $resultadoTest = $this->hacerPruebaNombreAccionCaracteresEspeciales($_POST);
        array_push($pruebas, $resultadoTest);

         //NOMBRE_ACCION_CONTIENE_ESPACIOS
         $_POST['nombre_accion'] = 'nueva accion';
         $resultadoTest = $this->hacerPruebaNombreAccionEspacios($_POST);
         array_push($pruebas, $resultadoTest);

        //NOMBRE_ACCION_CORRECTO
        $_POST['nombre_accion'] = 'Añadir';
        $resultadoTest = $this->hacerPruebaNombreAccionCorrecto($_POST);
        array_push($pruebas, $resultadoTest);
    
        return $pruebas;

         
    }
        
    function hacerPruebaNombreAccionVacio($atributo){
        $funcionesComunes = new FuncionesComunes();
        $resultadoObtenido = $funcionesComunes->comprobarAtributoBlank($atributo['nombre_accion'], 'gestAcciones', 'nombre_accion');
        $resultadoEsperado = 'NOMBRE_ACCION_VACIO'." - ".NOMBRE_ACCION_VACIO;
        
        return $this->createDatosPruebaAtributos($resultadoObtenido, $resultadoEsperado, VACIO, ERROR, $atributo['nombre_accion'], 'nombre_accion');
        
    }
        
    function hacerPruebaNombreAccionMenor3($atributo){
        $funcionesComunes = new FuncionesComunes();
        $resultadoObtenido = $funcionesComunes->comprobarAtributosLongitudMenor($atributo['nombre_accion'], 'gestAcciones', 'nombre_accion', 3);
        $resultadoEsperado = 'NOMBRE_ACCION_MENOR_QUE_3'. " - ".NOMBRE_ACCION_MENOR_QUE_3;
        
        return $this->createDatosPruebaAtributos($resultadoObtenido, $resultadoEsperado, LONGITUD_MINIMA_ERRONEA, ERROR, $atributo['nombre_accion'], 'nombre_accion');
    }
        
        function hacerPruebaNombreAccionMayor32($atributo){
            $funcionesComunes = new FuncionesComunes();
            $resultadoObtenido = $funcionesComunes->comprobarAtributosLongitudMayor($atributo['nombre_accion'], 'gestAcciones', 'nombre_accion', 32);
            $resultadoEsperado = 'NOMBRE_ACCION_MAYOR_QUE_32'." - ".NOMBRE_ACCION_MAYOR_QUE_32;
        
            return $this->createDatosPruebaAtributos($resultadoObtenido, $resultadoEsperado, LONGITUD_MAXIMA_ERRONEA, ERROR, $atributo['nombre_accion'], 'nombre_accion');
        
        }
        
        function hacerPruebaNombreAccionCaracteresEspeciales($atributo){
            $funcionesComunes = new FuncionesComunes();
            $resultadoObtenido = $funcionesComunes->comprobarAtributoCaracteresEspeciales($atributo['nombre_accion'], 'gestAcciones', 'nombre_accion');
            $resultadoEsperado = 'NOMBRE_ACCION_ALFABETICO_INCORRECTO'." - ".NOMBRE_ACCION_ALFABETICO_INCORRECTO;
        
            return $this->createDatosPruebaAtributos($resultadoObtenido, $resultadoEsperado, CARACTERES_ESPECIALES, ERROR, $atributo['nombre_accion'], 'nombre_accion');
        }

        function hacerPruebaNombreAccionEspacios($atributo){
            $funcionesComunes = new FuncionesComunes();
            $resultadoObtenido = $funcionesComunes->comprobarAtributoEspacios($atributo['nombre_accion'], 'gestAcciones', 'nombre_accion');
            $resultadoEsperado = 'NOMBRE_ACCION_ALFABETICO_INCORRECTO'." - ".NOMBRE_ACCION_ALFABETICO_INCORRECTO;
        
            return $this->createDatosPruebaAtributos($resultadoObtenido, $resultadoEsperado, ESPACIOS, ERROR, $atributo['nombre_accion'], 'nombre_accion');
        }
        
        function hacerPruebaNombreAccionCorrecto($atributo){
            $funcionesComunes = new FuncionesComunes();
            $resultadoObtenido = $funcionesComunes->comprobarAtributoCorrectoAlfabetico($atributo['nombre_accion']);
            $resultadoEsperado = 'AVANZAR_SIGUIENTE_CAMPO'." - ".AVANZAR_SIGUIENTE_CAMPO;
        
            return $this->createDatosPruebaAtributos($resultadoObtenido, $resultadoEsperado, NOMBRE_ACCION_OK, ÉXITO,  $atributo['nombre_accion'], 'nombre_accion');
        }

        
}

?>