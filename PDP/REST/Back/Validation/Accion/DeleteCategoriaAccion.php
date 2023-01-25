<?php

include_once './Validation/ValidacionesBase.php';
include_once './Comun/funcionesComunes.php';
include_once './Modelos/CategoriaModel.php';
include_once './Mapping/CategoriaMapping.php';
include_once './Mapping/ProcesoMapping.php';

class DeleteCategoriaAccion extends ValidacionesBase{

	
	private $categoria;
	public $respuesta;
	public $categoria_mapping;
	public $proceso_mapping;

	function __construct(){
		$this->categoria = new CategoriaModel();
		$this->categoria_mapping = new CategoriaMapping();
		$this->proceso_mapping = new ProcesoMapping();
	}

	function comprobarDeleteCategoria($datosDeleteCategoria){
		$this->existeIdCategoria($datosDeleteCategoria);
		$this -> categoriaEsPadre($datosDeleteCategoria);
		$this -> categoriaTieneProcesos($datosDeleteCategoria);
		
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

function categoriaEsPadre($datos){

	$resultado = array();
		$this -> categoria_mapping -> buscarPorIdPadre($datos);
		$resultado = $this -> categoria_mapping -> feedback['resource'];

		if (sizeof($resultado) == 0) {
			return true;
		} else {
			$this -> respuesta = 'CATEGORIA_ES_PADRE';
		}
}
	
function categoriaTieneProcesos($datos){
	$resultado = array();
	$this -> proceso_mapping -> buscarPorIdCategoria($datos);
	$resultado = $this -> proceso_mapping -> feedback['resource'];

	if (sizeof($resultado) == 0) {
		return true;
	} else {
		$this -> respuesta = 'CATEGORIA_TIENE_PROCESOS';
	}
}
		

}
?>