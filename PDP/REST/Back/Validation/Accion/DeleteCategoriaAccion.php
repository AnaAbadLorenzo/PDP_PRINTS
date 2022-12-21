<?php

include_once './Validation/ValidacionesBase.php';
include_once './Comun/funcionesComunes.php';

class DeleteCategoriaAccion extends ValidacionesBase{

	
	private $categoria;
	public $respuesta;

	function __construct()
	{
		$this->categoria = new CategoriaModel();
	}
	function comprobarDeleteCategoria($datosDeleteCategoria){

		
		$this->existeIdCategoria($datosDeleteCategoria);
		
	}

function existeIdCategoria($datosDeleteCategoria){

		$datoBuscar = array();
		$datoBuscar['id_categoria'] = $datosDeleteCategoria['id_categoria'];
		$resultado = $this->categoria->getById('categoria', $datoBuscar)['resource'];
		
		if(!sizeof($resultado) == 0) {
			return true;
		}else{
			$this->respuesta = 'ID_CATEGORIA_NO_EXISTE';
			//throw new DNINoExisteException('DNI_NO_EXISTE');
		}}
		
	
		

}
?>