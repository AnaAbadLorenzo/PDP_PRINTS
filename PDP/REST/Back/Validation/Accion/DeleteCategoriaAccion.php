<?php

include_once './Validation/ValidacionesBase.php';
include_once './Comun/funcionesComunes.php';
include_once './Modelos/CategoriaModel.php';

class DeleteCategoriaAccion extends ValidacionesBase{

	
	private $categoria;
	public $respuesta;

	function __construct(){
		$this->categoria = new CategoriaModel();
	}

	function comprobarDeleteCategoria($datosDeleteCategoria){
		$this->existeIdCategoria($datosDeleteCategoria);
	}

	function comprobarReactivar($datos) {
		$this -> existeIdCategoria($datos);
		$this -> estaBorradoAUno($datos); //aqui salta un warning si no existe el id a revisar
	}

function existeIdCategoria($datosDeleteCategoria){

		$datoBuscar = array();
		$datoBuscar['id_categoria'] = $datosDeleteCategoria['id_categoria'];
		$resultado = $this->categoria->getById('categoria', $datoBuscar)['resource'];
		
		if(!sizeof($resultado) == 0) {
			return true;
		}else{
			$this->respuesta = 'ID_CATEGORIA_NO_EXISTE';
		}
}

function estaBorradoAUno($datos) {
	$resultado = $this -> categoria -> getById('categoria', $datos)['resource'];
	if ($resultado['borrado_categoria'] === 0) {
		$this -> respuesta = 'CATEGORÍA_YA_ESTABA_ACTIVADA';
	} else {
		return true;
	}
}
	
		

}
?>