<?php
include_once './Test/Atributos/FuncionesComunes.php';
include_once './Test/Test.php';
include_once './Test/TiposPruebas.php';


$funcionesComunes = new FuncionesComunes();

class TestDescripcionRol extends Test{
    function testAtributoDescripcionRol() {
        $pruebas = array();
        
        //DESCRIPCION_ROL_VACIO
        $_POST = NULL;
        $_POST['descripcion_rol'] = '';
        $resultadoTest = $this->hacerPruebaDescripcionRolVacio($_POST);
        array_push($pruebas, $resultadoTest);
        
        //DESCRIPCION_ROL_MENOR_QUE_3
        $_POST['descripcion_rol'] = 'de';
        $resultadoTest = $this->hacerPruebaDescripcionRolMenor3($_POST);
        array_push($pruebas, $resultadoTest);
        
        //DESCRIPCION_ROL_CONTIENE_CARACTERES_ESPECIALES
        $_POST['descripcion_rol'] = 'Descripcionnnnnnnnnnnn###';
        $resultadoTest = $this->hacerPruebaDescripcionRolCaracteresEspeciales($_POST);
        array_push($pruebas, $resultadoTest);

        //DESCRIPCION_ROL_CORRECTO
        $_POST['descripcion_rol'] = 'Esta es la descripcion';
        $resultadoTest = $this->hacerPruebaDescripcionRolCorrecto($_POST);
        array_push($pruebas, $resultadoTest);
    
        return $pruebas;

         
    }
        
    function hacerPruebaDescripcionRolVacio($atributo){
        $funcionesComunes = new FuncionesComunes();
        $resultadoObtenido = $funcionesComunes->comprobarAtributoBlank($atributo['descripcion_rol'], 'gestRoles', 'descripcion_rol');
        $resultadoEsperado = 'DESCRIPCION_ROL_VACIO'." - ".DESCRIPCION_ROL_VACIO;
        
        return $this->createDatosPruebaAtributos($resultadoObtenido, $resultadoEsperado, VACIO, ERROR, $atributo['descripcion_rol'], 'descripcion_rol');
        
    }
        
    function hacerPruebaDescripcionRolMenor3($atributo){
        $funcionesComunes = new FuncionesComunes();
        $resultadoObtenido = $funcionesComunes->comprobarAtributosLongitudMenor($atributo['descripcion_rol'], 'gestRoles', 'descripcion_rol', 3);
        $resultadoEsperado = 'DESCRIPCION_ROL_MENOR_QUE_3'. " - ".DESCRIPCION_ROL_MENOR_QUE_3;
        
        return $this->createDatosPruebaAtributos($resultadoObtenido, $resultadoEsperado, LONGITUD_MINIMA_ERRONEA, ERROR, $atributo['descripcion_rol'], 'descripcion_rol');
    }
  
        function hacerPruebaDescripcionRolCaracteresEspeciales($atributo){
            $funcionesComunes = new FuncionesComunes();
            $resultadoObtenido = $funcionesComunes->comprobarAtributoCaracteresEspeciales($atributo['descripcion_rol'], 'gestRoles', 'descripcion_rol');
            $resultadoEsperado = 'DESCRIPCION_ROL_ALFABETICO_INCORRECTO'." - ".DESCRIPCION_ROL_ALFABETICO_INCORRECTO;
        
            return $this->createDatosPruebaAtributos($resultadoObtenido, $resultadoEsperado, CARACTERES_ESPECIALES, ERROR, $atributo['descripcion_rol'], 'descripcion_rol');
        }
        
        function hacerPruebaDescripcionRolCorrecto($atributo){
            $funcionesComunes = new FuncionesComunes();
            $resultadoObtenido = $funcionesComunes->comprobarAtributoCorrectoAlfabetico($atributo['descripcion_rol']);
            $resultadoEsperado = 'AVANZAR_SIGUIENTE_CAMPO'." - ".AVANZAR_SIGUIENTE_CAMPO;
        
            return $this->createDatosPruebaAtributos($resultadoObtenido, $resultadoEsperado, DESCRIPCION_ROL_OK, ÉXITO,  $atributo['descripcion_rol'], 'descripcion_rol');
        }

        
}

?>