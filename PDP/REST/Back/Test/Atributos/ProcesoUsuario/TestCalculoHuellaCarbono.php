<?php
include_once './Test/Atributos/FuncionesComunes.php';
include_once './Test/Test.php';
include_once './Test/TiposPruebas.php';


$funcionesComunes = new FuncionesComunes();

class TestCalculoHuellaCarbono extends Test{
    function testAtributoCalculoHuellaCarbono() {
        $pruebas = array();

        //CALCULO_HUELLA_CARBONO_VACIO
        $_POST = NULL;
        $_POST['calculo_huella_carbono'] = '';
        $resultadoTest = $this->hacerPruebaCalculoHuellaCarbonoVacio($_POST);
        array_push($pruebas, $resultadoTest);
    
        //CALCULO_HUELLA_CARBONO_MAYOR_QUE_80
        $_POST['calculo_huella_carbono'] = 'Huelladecarbonoooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo';
        $resultadoTest = $this->hacerPruebaCalculoHuellaCarbonoMayor80($_POST);
        array_push($pruebas, $resultadoTest);
    
        //CALCULO_HUELLA_CARBONO_CONTIENE_ENHE
        $_POST['calculo_huella_carbono'] = 'ññ';
        $resultadoTest = $this->hacerPruebaCalculoHuellaCarbonoEnhe($_POST);
        array_push($pruebas, $resultadoTest);
    
        //CALCULO_HUELLA_CARBONO_CONTIENE_ACENTOS
        $_POST['calculo_huella_carbono'] = 'áábeja';
        $resultadoTest = $this->hacerPruebaCalculoHuellaCarbonoAcentos($_POST);
        array_push($pruebas, $resultadoTest);
    
        //CALCULO_HUELLA_CARBONO_CONTIENE_CARACTERES_ESPECIALES
        $_POST['calculo_huella_carbono'] = '##conejo';
        $resultadoTest = $this->hacerPruebaCalculoHuellaCarbonoCaracteresEspeciales($_POST);
        array_push($pruebas, $resultadoTest);
    
        //CALCULO_HUELLA_CARBONO_CONTIENE_ESPACIOS
        $_POST['calculo_huella_carbono'] = 'p i ntura';
        $resultadoTest = $this->hacerPruebaCalculoHuellaCarbonoEspacios($_POST);
        array_push($pruebas, $resultadoTest);

        //CALCULO_HUELLA_CARBONO_CORRECTO
        $_POST['calculo_huella_carbono'] = 'oleoel';
        $resultadoTest = $this->hacerPruebaCalculoHuellaCarbonoCorrecto($_POST);
        array_push($pruebas, $resultadoTest);

        return $pruebas;

     
    }
    function hacerPruebaCalculoHuellaCarbonoVacio($atributo){
        $funcionesComunes = new FuncionesComunes();
        $resultadoObtenido = $funcionesComunes->comprobarAtributoBlank($atributo['calculo_huella_carbono'], 'gestProcesosusuario', 'calculo_huella_carbono');
        $resultadoEsperado = 'HUELLA_DE_CARBONO_VACIO'." - ".HUELLA_DE_CARBONO_VACIO;
        
        return $this->createDatosPruebaAtributos($resultadoObtenido, $resultadoEsperado, VACIO, ERROR, $atributo['calculo_huella_carbono'], 'calculo_huella_carbono');
        
    }
        

    function hacerPruebaCalculoHuellaCarbonoMayor80($atributo){
        $funcionesComunes = new FuncionesComunes();
        $resultadoObtenido = $funcionesComunes->comprobarAtributosLongitudMayor($atributo['calculo_huella_carbono'], 'gestProcesosusuario', 'calculo_huella_carbono', 80);
        $resultadoEsperado = 'CALCULO_HUELLA_CARBONO_MAYOR_QUE_80'." - ".CALCULO_HUELLA_CARBONO_MAYOR_QUE_80;
        
        return $this->createDatosPruebaAtributos($resultadoObtenido, $resultadoEsperado, LONGITUD_MAXIMA_ERRONEA, ERROR, $atributo['calculo_huella_carbono'], 'calculo_huella_carbono');
        
    }
        
    function hacerPruebaCalculoHuellaCarbonoEnhe($atributo){
        $funcionesComunes = new FuncionesComunes();
        $resultadoObtenido = $funcionesComunes->comprobarAtributoEnhe($atributo['calculo_huella_carbono'], 'gestProcesosusuario', 'calculo_huella_carbono');
        $resultadoEsperado = 'CALCULO_HUELLA_CARBONO_INCORRECTO'." - ".CALCULO_HUELLA_CARBONO_INCORRECTO;
        
        return $this->createDatosPruebaAtributos($resultadoObtenido, $resultadoEsperado, CALCULO_HUELLA_CARBONO_INCORRECTO, ÉXITO,  $atributo['calculo_huella_carbono'], 'calculo_huella_carbono');
    }
    
    function hacerPruebaCalculoHuellaCarbonoAcentos($atributo){
        $funcionesComunes = new FuncionesComunes();
        $resultadoObtenido = $funcionesComunes->comprobarAtributoAcentos($atributo['calculo_huella_carbono'], 'gest_procesosusuario', 'calculo_huella_carbono');
        $resultadoEsperado = 'CALCULO_HUELLA_CARBONO_INCORRECTO'." - ".CALCULO_HUELLA_CARBONO_INCORRECTO;
    
        return $this->createDatosPruebaAtributos($resultadoObtenido, $resultadoEsperado, ACENTOS, ERROR, $atributo['calculo_huella_carbono'], 'calculo_huella_carbono');
    }
    
    function hacerPruebaCalculoHuellaCarbonoCaracteresEspeciales($atributo){
        $funcionesComunes = new FuncionesComunes();
        $resultadoObtenido = $funcionesComunes->comprobarAtributoCaracteresEspeciales($atributo['calculo_huella_carbono'], 'gest_procesosusuario', 'calculo_huella_carbono');
        $resultadoEsperado = 'CALCULO_HUELLA_CARBONO_INCORRECTO'." - ".CALCULO_HUELLA_CARBONO_INCORRECTO;
    
        return $this->createDatosPruebaAtributos($resultadoObtenido, $resultadoEsperado, CARACTERES_ESPECIALES, ERROR, $atributo['calculo_huella_carbono'], 'calculo_huella_carbono');
    }
    
    function hacerPruebaCalculoHuellaCarbonoEspacios($atributo){
        $funcionesComunes = new FuncionesComunes();
        $resultadoObtenido = $funcionesComunes->comprobarAtributoEspacios($atributo['calculo_huella_carbono'], 'gest_procesosusuario', 'calculo_huella_carbono');
        $resultadoEsperado = 'CALCULO_HUELLA_CARBONO_INCORRECTO'." - ".CALCULO_HUELLA_CARBONO_INCORRECTO;
    
        return $this->createDatosPruebaAtributos($resultadoObtenido, $resultadoEsperado, ESPACIOS, ERROR,  $atributo['calculo_huella_carbono'], 'calculo_huella_carbono');
    }

    function hacerPruebaCalculoHuellaCarbonoCorrecto($atributo){
        $funcionesComunes = new FuncionesComunes();
        $resultadoObtenido = $funcionesComunes->comprobarAtributoCorrectoFecha($atributo['calculo_huella_carbono']);
        $resultadoEsperado = 'AVANZAR_SIGUIENTE_CAMPO'." - ".AVANZAR_SIGUIENTE_CAMPO;
    
        return $this->createDatosPruebaAtributos($resultadoObtenido, $resultadoEsperado, CALCULO_HUELLA_CARBONO_OK, ÉXITO,  $atributo['calculo_huella_carbono'], 'calculo_huella_carbono');
    }


    
}

?>
