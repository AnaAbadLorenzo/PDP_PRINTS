<?php

class ReturnBusquedas {
    
    public $listaBusquedas;
    public $datosBusquedas;
    public $tamanhoTotal;
    public $numResultados;
    public $inicio;

    function __construct($listaBusquedas, $datosBusquedas, $tamanhoTotal, $numResultados, $inicio) {
        $this->listaBusquedas = $listaBusquedas;
        $this->datosBusquedas = $datosBusquedas;
        $this->tamanhoTotal = $tamanhoTotal;
        $this->numResultados = $numResultados;
        $this->inicio = $inicio;
    }
}
?>