<?php
include_once './Test/Atributos/FuncionesComunes.php';
include_once './Test/Test.php';
include_once './Test/TiposPruebas.php';


$funcionesComunes = new FuncionesComunes();

class TestDNIResponsable extends Test{
    function testAtributoDNIResponsable() {
        $pruebas = array();
        
        //DNI_RESPONSABLE_VACIO
        $_POST = NULL;
        $_POST['dni_responsable'] = '';
        $resultadoTest = $this->hacerPruebaDNIResponsableVacio($_POST);
        array_push($pruebas, $resultadoTest);
        
        //DNI_RESPONSABLE_MENOR_QUE_9
        $_POST['dni_responsable'] = '451463';
        $resultadoTest = $this->hacerPruebaDNIResponsableMenor9($_POST);
        array_push($pruebas, $resultadoTest);
        
        //DNI_RESPONSABLE_MAYOR_QUE_9
        $_POST['dni_responsable'] = '74859685PP';
        $resultadoTest = $this->hacerPruebaDNIResponsableMayor9($_POST);
        array_push($pruebas, $resultadoTest);
        
        //DNI_RESPONSABLE_CONTIENE_ENHE
        $_POST['dni_responsable'] = '74125896Ñ';
        $resultadoTest = $this->hacerPruebaDNIResponsableEnhe($_POST);
        array_push($pruebas, $resultadoTest);
        
        //DNI_RESPONSABLE_CONTIENE_ACENTOS
        $_POST['dni_responsable'] = '45146321ó';
        $resultadoTest = $this->hacerPruebaDNIResponsableAcentos($_POST);
        array_push($pruebas, $resultadoTest);
        
        //DNI_RESPONSABLE_CONTIENE_CARACTERES_ESPECIALES
        $_POST['dni_responsable'] = '##14857P';
        $resultadoTest = $this->hacerPruebaDNIResponsableCaracteresEspeciales($_POST);
        array_push($pruebas, $resultadoTest);
        
        //DNI_RESPONSABLE_CONTIENE_ESPACIOS
        $_POST['dni_responsable'] = '96857485 L';
        $resultadoTest = $this->hacerPruebaDNIResponsableEspacios($_POST);
        array_push($pruebas, $resultadoTest);

        //DNI_RESPONSABLE_CORRECTO
        $_POST['dni_responsable'] = '85968574L';
        $resultadoTest = $this->hacerPruebaDNIResponsableCorrecto($_POST);
        array_push($pruebas, $resultadoTest);
    
        return $pruebas;
    }
    function hacerPruebaDNIResponsableVacio($atributo){
        $funcionesComunes = new FuncionesComunes();
        $resultadoObtenido = $funcionesComunes->comprobarAtributoBlank($atributo['dni_responsable'], 'gestCategorias', 'dni_responsable');
        $resultadoEsperado = 'DNI_RESPONSABLE_VACIO'." - ".DNI_RESPONSABLE_VACIO;
    
        return $this->createDatosPruebaAtributos($resultadoObtenido, $resultadoEsperado, VACIO, ERROR, $atributo['dni_responsable'], 'dni_responsable');
        
    }
        
    function hacerPruebaDNIResponsableMenor9($atributo){
        $funcionesComunes = new FuncionesComunes();
        $resultadoObtenido = $funcionesComunes->comprobarAtributosLongitudMenor($atributo['dni_responsable'], 'gestCategorias', 'dni_responsable', 9);
        $resultadoEsperado = 'DNI_RESPONSABLE_MENOR_QUE_9'. " - ".DNI_RESPONSABLE_MENOR_QUE_9;
        
        return $this->createDatosPruebaAtributos($resultadoObtenido, $resultadoEsperado, LONGITUD_MINIMA_ERRONEA, ERROR, $atributo['dni_responsable'], 'dni_responsable');
    }
        
    function hacerPruebaDNIResponsableMayor9($atributo){
        $funcionesComunes = new FuncionesComunes();
        $resultadoObtenido = $funcionesComunes->comprobarAtributosLongitudMayor($atributo['dni_responsable'], 'gestCategorias', 'dni_responsable', 9);
        $resultadoEsperado = 'DNI_RESPONSABLE_MAYOR_QUE_9'." - ".DNI_RESPONSABLE_MAYOR_QUE_9;
        
        return $this->createDatosPruebaAtributos($resultadoObtenido, $resultadoEsperado, LONGITUD_MAXIMA_ERRONEA, ERROR, $atributo['dni_responsable'], 'dni_responsable');
        
    }

    function hacerPruebaDNIResponsableAcentos($atributo){
        $funcionesComunes = new FuncionesComunes();
        $resultadoObtenido = $funcionesComunes->comprobarAtributoAcentos($atributo['dni_responsable'], 'gestCategorias', 'dni_responsable');
        $resultadoEsperado = 'DNI_RESPONSABLE_ALFANUMERICO_INCORRECTO'." - ".DNI_RESPONSABLE_ALFANUMERICO_INCORRECTO;
        
        return $this->createDatosPruebaAtributos($resultadoObtenido, $resultadoEsperado, ACENTOS, ERROR, $atributo['dni_responsable'], 'dni_responsable');
    }
        
    function hacerPruebaDNIResponsableCaracteresEspeciales($atributo){
        $funcionesComunes = new FuncionesComunes();
        $resultadoObtenido = $funcionesComunes->comprobarAtributoCaracteresEspeciales($atributo['dni_responsable'], 'gestCategorias', 'dni_responsable');
        $resultadoEsperado = 'DNI_RESPONSABLE_ALFANUMERICO_INCORRECTO'." - ".DNI_RESPONSABLE_ALFANUMERICO_INCORRECTO;
        
        return $this->createDatosPruebaAtributos($resultadoObtenido, $resultadoEsperado, CARACTERES_ESPECIALES, ERROR, $atributo['dni_responsable'], 'dni_responsable');
    }
        
    function hacerPruebaDNIResponsableEspacios($atributo){
        $funcionesComunes = new FuncionesComunes();
        $resultadoObtenido = $funcionesComunes->comprobarAtributoEspacios($atributo['dni_responsable'], 'gestCategorias', 'dni_responsable');
        $resultadoEsperado = 'DNI_RESPONSABLE_ALFANUMERICO_INCORRECTO'." - ".DNI_RESPONSABLE_ALFANUMERICO_INCORRECTO;
        
        return $this->createDatosPruebaAtributos($resultadoObtenido, $resultadoEsperado, ESPACIOS, ERROR,  $atributo['dni_responsable'], 'dni_responsable');
    }
        
    function hacerPruebaDNIResponsableEnhe($atributo){
        $funcionesComunes = new FuncionesComunes();
        $resultadoObtenido = $funcionesComunes->comprobarAtributoEnhe($atributo['dni_responsable'], 'gestCategorias', 'dni_responsable');
        $resultadoEsperado = 'DNI_RESPONSABLE_ALFANUMERICO_INCORRECTO'." - ".DNI_RESPONSABLE_ALFANUMERICO_INCORRECTO;
        
        return $this->createDatosPruebaAtributos($resultadoObtenido, $resultadoEsperado, DNI_RESPONSABLE_OK, ÉXITO,  $atributo['dni_responsable'], 'dni_responsable');
    }

    function hacerPruebaDNIResponsableCorrecto($atributo){
        $funcionesComunes = new FuncionesComunes();
        $resultadoObtenido = $funcionesComunes->comprobarAtributoCorrectoAlfanumerico($atributo['dni_responsable']);
        $resultadoEsperado = 'AVANZAR_SIGUIENTE_CAMPO'." - ".AVANZAR_SIGUIENTE_CAMPO;
        
        return $this->createDatosPruebaAtributos($resultadoObtenido, $resultadoEsperado, DNI_PERSONA_OK, ÉXITO,  $atributo['dni_responsable'], 'dni_responsable');
    }

        
}

?>    

