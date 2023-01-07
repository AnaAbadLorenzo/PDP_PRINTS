<?php
include_once './Test/Atributos/FuncionesComunes.php';
include_once './Test/Test.php';
include_once './Test/TiposPruebas.php';


$funcionesComunes = new FuncionesComunes();

class TestNombreRol extends Test{
    function testAtributoNombreRol() {
        $pruebas = array();
        
        //NOMBRE_ROL_VACIO
        $_POST = NULL;
        $_POST['nombre_rol'] = '';
        $resultadoTest = $this->hacerPruebaNombreRolVacio($_POST);
        array_push($pruebas, $resultadoTest);
        
        //NOMBRE_ROL_MENOR_QUE_3
        $_POST['nombre_rol'] = 'ac';
        $resultadoTest = $this->hacerPruebaNombreRolMenor3($_POST);
        array_push($pruebas, $resultadoTest);
        
        //NOMBRE_ROL_MAYOR_QUE_32
        $_POST['nombre_rol'] = 'Rollllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllll';
        $resultadoTest = $this->hacerPruebaNombreRolMayor32($_POST);
        array_push($pruebas, $resultadoTest);
        
        //NOMBRE_ROL_CONTIENE_CARACTERES_ESPECIALES
        $_POST['nombre_rol'] = 'Rol###';
        $resultadoTest = $this->hacerPruebaNombreRolCaracteresEspeciales($_POST);
        array_push($pruebas, $resultadoTest);

         //NOMBRE_ROL_CONTIENE_ESPACIOS
         $_POST['nombre_rol'] = 'nuevo rol';
         $resultadoTest = $this->hacerPruebaNombreRolEspacios($_POST);
         array_push($pruebas, $resultadoTest);

        //NOMBRE_ROL_CORRECTO
        $_POST['nombre_rol'] = 'Administrador';
        $resultadoTest = $this->hacerPruebaNombreRolCorrecto($_POST);
        array_push($pruebas, $resultadoTest);
    
        return $pruebas;

         
    }
        
    function hacerPruebaNombreRolVacio($atributo){
        $funcionesComunes = new FuncionesComunes();
        $resultadoObtenido = $funcionesComunes->comprobarAtributoBlank($atributo['nombre_rol'], 'gestRoles', 'nombre_rol');
        $resultadoEsperado = 'NOMBRE_ROL_VACIO'." - ".NOMBRE_ROL_VACIO;
        
        return $this->createDatosPruebaAtributos($resultadoObtenido, $resultadoEsperado, VACIO, ERROR, $atributo['nombre_rol'], 'nombre_rol');
        
    }
        
    function hacerPruebaNombreRolMenor3($atributo){
        $funcionesComunes = new FuncionesComunes();
        $resultadoObtenido = $funcionesComunes->comprobarAtributosLongitudMenor($atributo['nombre_rol'], 'gestRoles', 'nombre_rol', 3);
        $resultadoEsperado = 'NOMBRE_ROL_MENOR_QUE_3'. " - ".NOMBRE_ROL_MENOR_QUE_3;
        
        return $this->createDatosPruebaAtributos($resultadoObtenido, $resultadoEsperado, LONGITUD_MINIMA_ERRONEA, ERROR, $atributo['nombre_rol'], 'nombre_rol');
    }
        
        function hacerPruebaNombreRolMayor32($atributo){
            $funcionesComunes = new FuncionesComunes();
            $resultadoObtenido = $funcionesComunes->comprobarAtributosLongitudMayor($atributo['nombre_rol'], 'gestRoles', 'nombre_rol', 32);
            $resultadoEsperado = 'NOMBRE_ROL_MAYOR_QUE_32'." - ".NOMBRE_ROL_MAYOR_QUE_32;
        
            return $this->createDatosPruebaAtributos($resultadoObtenido, $resultadoEsperado, LONGITUD_MAXIMA_ERRONEA, ERROR, $atributo['nombre_rol'], 'nombre_rol');
        
        }
        
        function hacerPruebaNombreRolCaracteresEspeciales($atributo){
            $funcionesComunes = new FuncionesComunes();
            $resultadoObtenido = $funcionesComunes->comprobarAtributoCaracteresEspeciales($atributo['nombre_rol'], 'gestRoles', 'nombre_rol');
            $resultadoEsperado = 'NOMBRE_ROL_ALFABETICO_INCORRECTO'." - ".NOMBRE_ROL_ALFABETICO_INCORRECTO;
        
            return $this->createDatosPruebaAtributos($resultadoObtenido, $resultadoEsperado, CARACTERES_ESPECIALES, ERROR, $atributo['nombre_rol'], 'nombre_rol');
        }

        function hacerPruebaNombreRolEspacios($atributo){
            $funcionesComunes = new FuncionesComunes();
            $resultadoObtenido = $funcionesComunes->comprobarAtributoEspacios($atributo['nombre_rol'], 'gestRoles', 'nombre_rol');
            $resultadoEsperado = 'NOMBRE_ROL_ALFABETICO_INCORRECTO'." - ".NOMBRE_ROL_ALFABETICO_INCORRECTO;
        
            return $this->createDatosPruebaAtributos($resultadoObtenido, $resultadoEsperado, ESPACIOS, ERROR, $atributo['nombre_rol'], 'nombre_rol');
        }
        
        function hacerPruebaNombreRolCorrecto($atributo){
            $funcionesComunes = new FuncionesComunes();
            $resultadoObtenido = $funcionesComunes->comprobarAtributoCorrectoAlfabetico($atributo['nombre_rol']);
            $resultadoEsperado = 'AVANZAR_SIGUIENTE_CAMPO'." - ".AVANZAR_SIGUIENTE_CAMPO;
        
            return $this->createDatosPruebaAtributos($resultadoObtenido, $resultadoEsperado, NOMBRE_PERSONA_OK, ÉXITO,  $atributo['nombre_rol'], 'nombre_rol');
        }

        
}

?>