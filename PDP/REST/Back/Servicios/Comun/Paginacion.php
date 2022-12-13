<?php

class Paginacion {
	
    public $inicio;
    public $tamanhoPagina;

    function __construct($inicio, $tamanhoPagina){
        $this->inicio = $inicio;
		$this->tamanhoPagina = $tamanhoPagina;
    }

    /*function fillfields(){
		$this->inicio = '';
	 	$this->tamanhoPagina = '';

		if ($_POST){
			if(isset($_POST['inicio'])) $this->inicio = $_POST['inicio'];
			if(isset($_POST['tamanhoPagina'])) $this->tamanhoPagina = $_POST['tamanhoPagina'];
		}
	}*/

}
?>