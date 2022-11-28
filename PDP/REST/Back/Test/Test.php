<?php

class Test {
    function createDatosPruebaAtributos($resultadoObtenido, $resultadoEsperado, $prueba, $tipoPrueba, $valor, $campo){
        $datosPruebaAtributos = null;
        if(!empty($resultadoObtenido && $resultadoEsperado === $resultadoObtenido)){
            $datosPruebaAtributos = array (
                'campo' => $campo,
                'prueba' => $prueba,
                'valor' => $valor,
                'resultadoEsperado' => $resultadoEsperado,
                'resultadoObtenido' => $resultadoObtenido,
                'tipoPrueba' => $tipoPrueba
            );
        }
        return $datosPruebaAtributos;
    }

    function createDatosPruebaAcciones ($resultadoObtenido, $resultadoEsperado, $prueba, $tipoPrueba, $arrayDatos){
        $datosPruebaAcciones = null;
        
        if(!empty($resultadoObtenido && $resultadoEsperado === $resultadoObtenido)){
            $datosPruebaAcciones = array (
                'resultadoEsperado' => $resultadoEsperado,
                'resultadoObtenido' => $resultadoObtenido,
                'tipoPrueba' => $tipoPrueba,
                'prueba' => $prueba,
                'valor' => $arrayDatos
            );
        }

        return $datosPruebaAcciones;
    }
}   