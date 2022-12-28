<?php

include_once './Modelos/ModelBase.php';

class PersonaModel extends ModelBase{
  
	public $dni_persona;
	public $nombre_persona;
	public $apellidos_persona;
	public $fecha_nac_persona;
	public $direccion_persona;
    public $email_persona;
    public $telefono_persona;
    public $borrado_persona;
	public $clavesForaneas;

	function __construct(){
		
		$this->fillfields();
		$this->clavesForaneas = array('usuario');
	}

	function fillfields(){
		$this->dni_persona = '';
		$this->nombre_persona = '';
	 	$this->apellidos_persona = '';
	  	$this->fecha_nac_persona = '';
	  	$this->direccion_persona = '';
        $this->email_persona = '';
	  	$this->telefono_persona = '';
	  	$this->borrado_persona = '';

		if ($_POST){
			if(isset($_POST['dni_persona'])) $this->dni_persona = $_POST['dni_persona'];
			if(isset($_POST['nombre_persona'])) $this->nombre_persona = $_POST['nombre_persona'];
			if(isset($_POST['apellidos_persona'])) $this->apellidos_persona = $_POST['apellidos_persona'];
			if(isset($_POST['fecha_nac_persona'])) $this->fecha_nac_persona = $_POST['fecha_nac_persona'];
			if(isset($_POST['direccion_persona'])) $this->direccion_persona = $_POST['direccion_persona'];		
            if(isset($_POST['email_persona'])) $this->email_persona = $_POST['email_persona'];
			if(isset($_POST['telefono_persona'])) $this->telefono_persona = $_POST['telefono_persona'];
			if(isset($_POST['borrado_persona'])) $this->borrado_persona = $_POST['borrado_persona'];	
		}
	}

	function getByDNI($tabla, $datosSearch){
        include_once './Mapping/'.ucfirst($tabla).'Mapping.php';
        $map = $tabla.'Mapping';
        $this->mapping = new $map();
		return $this->mapping->searchByDNI($datosSearch);
	}

}

?>