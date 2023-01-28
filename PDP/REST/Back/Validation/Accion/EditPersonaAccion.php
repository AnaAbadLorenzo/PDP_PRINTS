<?php

include_once './Validation/ValidacionesBase.php';
include_once './Comun/funcionesComunes.php';

class EditPersonaAccion extends ValidacionesBase{

	
	private $persona;
	public $respuesta;

	function __construct()
	{
		$this->persona = new PersonaModel();
	}
	function comprobarEditPersona($datosEditPersona){

		
		$this->existeDNI($datosEditPersona);
		
	}

function existeDNI($datosEditPersona){

		$datoBuscar = array();
		$datoBuscar['dni_persona'] = $datosEditPersona['dni_persona'];
		$resultado = $this->persona->getByDNI('persona', $datoBuscar)['resource'];
		
		if(!sizeof($resultado) == 0) {
			return true;
		}else{
			$this->respuesta = 'PERSONA_NO_EXISTE';
		}}
		
	
		

}
?>