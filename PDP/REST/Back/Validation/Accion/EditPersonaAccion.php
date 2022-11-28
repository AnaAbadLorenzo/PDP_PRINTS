<?php

include_once './Validation/ValidacionesBase.php';
include_once './Validation/Excepciones/UsuarioNoEncontradoException.php';
include_once './Validation/Excepciones/PasswdUsuarioNoCoincideException.php';
include_once './Validation/Excepciones/UsuarioYaExisteException.php';
include_once './Validation/Excepciones/DNINoExisteException.php';
include_once './Comun/funcionesComunes.php';

class EditPersonaAccion extends ValidacionesBase{

	
	private $persona;

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
			throw new DNINoExisteException('DNI_NO_EXISTE');
		}}
		
	
		

}
?>