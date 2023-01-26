<?php

include_once './Validation/ValidacionesBase.php';
include_once './Comun/funcionesComunes.php';

class DeletePersonaAccion extends ValidacionesBase{

	
	private $persona;
	public $respuesta;
	private $usuario;

	function __construct()
	{
		$this->persona = new PersonaModel();
		$this->usuario = new UsuarioMapping();
	}
	function comprobarDeletePersona($datosDeletePersona){
		$this->existeDNI($datosDeletePersona);
		$this->personaNoTieneUsuario($datosDeletePersona);
	}

function existeDNI($datosDeletePersona){

		$datoBuscar = array();
		$datoBuscar['dni_persona'] = $datosDeletePersona['dni_persona'];
		$resultado = $this->persona->getByDNI('persona', $datoBuscar)['resource'];
		
		if(!sizeof($resultado) == 0) {
			return true;
		}else{
			$this->respuesta = 'DNI_NO_EXISTE';
}}

function personaNoTieneUsuario($datos) {
	$resultado = array();
	$datosPersona = array(
		'dni_usuario' => $datos['dni_persona']
	);

	$this -> usuario -> searchById($datosPersona);
	$resultado = $this -> usuario -> feedback['resource'];

	if (sizeof($resultado) == 0) {
		return true;
	} else {
		$this -> respuesta = 'PERSONA_TIENE_USUARIO';
	}

}
		
	
		

}
?>