<?php

include_once './Mapping/MappingBase.php';
include_once './Modelos/LogExcepcionesModel.php';

class LogExcepcionesMapping extends MappingBase {
    private $conexion;
    private $arrayValores;

    public function __construct(){
        $this->conexion = $this->connection();
    }

    function add($datosInsertar) {
            $this->query = "INSERT INTO LOG_EXCEPCIONES (`id_logExcepciones`, `usuario`, `tipo_excepcion`, `descripcion_excepcion`, `fecha`) VALUES ('', '".$datosInsertar['usuario']."', '".$datosInsertar['tipo_excepcion']. "','".$datosInsertar['descripcion_excepcion']."','"
            .$datosInsertar['fecha']."')";
            $this->stmt = $this->conexion->prepare($this->query);
            $this->execute_single_query();  
    }

}
?>