<?php

include_once './Modelos/ModelBase.php';

class PermisosFuncionalidadModel extends ModelBase{

    public $rol;
    public $funcionalidad;
    public $accion;
    public $tienePermiso;

	function __construct($rol, $funcionalidad, $accion, $tienePermiso){
        $this->rol = $rol;
        $this->funcionalidad = $funcionalidad;
        $this->accion = $accion;
        $this->tienePermiso = $tienePermiso;

	}
}

?>