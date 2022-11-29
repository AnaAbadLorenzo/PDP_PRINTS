<?php

include_once './Validation/ValidacionesBase.php';
include_once './Comun/funcionesComunes.php';

class DeletePersonaAccion extends ValidacionesBase{

	
	private $persona;
	public $respuesta;

	function __construct()
	{
		$this->persona = new PersonaModel();
	}
	function comprobarDeletePersona($datosDeletePersona){

		
		$this->existeDNI($datosDeletePersona);
		
	}

function existeDNI($datosDeletePersona){

		$datoBuscar = array();
		$datoBuscar['dni_persona'] = $datosDeletePersona['dni_persona'];
		$resultado = $this->persona->getByDNI('persona', $datoBuscar)['resource'];
		
		if(!sizeof($resultado) == 0) {
			return true;
		}else{
			$this->respuesta = 'DNI_NO_EXISTE';
			//throw new DNINoExisteException('DNI_NO_EXISTE');
		}}
		
	
		

}
?>