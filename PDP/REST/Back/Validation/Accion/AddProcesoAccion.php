<?php

include_once './Validation/ValidacionesBase.php';
include_once './Comun/funcionesComunes.php';
include_once './Modelos/CategoriaModel.php';

class AddProcesoAccion extends ValidacionesBase{

	
    private $proceso;
    private $categoria;
    private $persona;
	public $respuesta;

	function __construct()
	{
		$this->categoria = new CategoriaModel();
        $this->persona = new PersonaModel();
        $this->proceso = new ProcesoModel();

	}


	function comprobarAddProceso($datosAddProceso){
		$this->existeProceso($datosAddProceso);
		$this->existeIdCategoria($datosAddProceso);
		$this->existeDNIUsuario($datosAddProceso);
	}

function existeIdCategoria($datosAddProceso){
 
		$datoBuscar = array();
		$datoBuscar['id_categoria'] = $datosAddProceso['id_categoria'];
		$resultado = $this->categoria->searchById('categoria', $datoBuscar)['resource'];
      
    
		if(!sizeof($resultado) == 0) {
			return true;
		}else{
			$this->respuesta = 'ID_CATEGORIA_NO_EXISTE';
}}

function existeDNIUsuario($datosAddProceso){

    $datoBuscar = array();
    $datoBuscar['dni_persona'] = $datosAddProceso['dni_usuario'];
    $resultado = $this->persona->getByDNI('persona', $datoBuscar)['resource'];
            
    if(!sizeof($resultado) == 0) {
        return true;
    }else{
        $this->respuesta = 'DNI_USUARIO_NO_EXISTE';
}}

function existeProceso($datosAddProceso){
    $datoBuscar = array();
    $datoBuscar['nombre_proceso'] = $datosAddProceso['nombre_proceso'];
    $resultado = $this->proceso->getByName('proceso', $datoBuscar)['resource'];
            
    if(!sizeof($resultado) == 0) {
        $this->respuesta = 'PROCESO_YA_EXISTE';
    }else{
        return true;
    }}
		
        
            
		

}
?>