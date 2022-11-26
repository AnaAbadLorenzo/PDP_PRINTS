<?php

class Test {
    function createDatosPruebaAtributos($resultadoObtenido, $resultadoEsperado, $prueba, $tipoPrueba, $valor, $campo){
        $datosPruebaAtributos = array (
            'campo' => $campo,
            'prueba' => $prueba,
            'valor' => $valor,
            'resultadoEsperado' => $resultadoEsperado,
            'resultadoObtenido' => $resultadoObtenido,
            'tipoPrueba' => $tipoPrueba
        );

        return $datosPruebaAtributos;
    }
}   