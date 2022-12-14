<?php

include_once './Mapping/MappingBase.php';
include_once './Modelos/UsuarioModel.php';

class UsuarioMapping extends MappingBase {
    public $respuesta;
    public $conexion;

    public function __construct(){
        $this->conexion = $this->connection();
    }

    function add($datosInsertar) {

        $this->query = "INSERT INTO `usuario` (`dni_usuario`, `usuario`, `passwd_usuario`, `borrado_usuario`, `id_rol`) VALUES ('".$datosInsertar['dni_usuario']."', '".$datosInsertar['usuario']."', '"
                        .$datosInsertar['passwd_usuario']. "', '".$datosInsertar['borrado_usuario']."', '"
                        .$datosInsertar['id_rol']."');";
        $this->stmt = $this->conexion->prepare($this->query);
      
        $this->execute_single_query();  
    }

    function edit($datosModificar) {
        $this->query = "UPDATE `usuario` SET `passwd_usuario`='". $datosModificar['passwd_usuario'] . "' WHERE `dni_usuario`='". $datosModificar['dni_usuario'] . "'";
        $this->stmt = $this->conexion->prepare($this->query);
        $this->execute_single_query();
    }

    function editRol($datosModificar) {
        $this->query = "UPDATE `usuario` SET `id_rol`='". $datosModificar['id_rol'] . "' WHERE `dni_usuario`='". $datosModificar['dni_usuario'] . "'";
        $this->stmt = $this->conexion->prepare($this->query);
        $this->execute_single_query();
    }

    function delete($datosEliminar) { 
        $this -> query = 
            "UPDATE `usuario`
            SET `borrado_usuario`=1
            WHERE `dni_usuario`='". $datosEliminar['dni_usuario'] . "';"
        ;
        $this->stmt = $this->conexion->prepare($this->query);
        $this->execute_single_query();

    }

    function search($paginacion) {
        $this->query = "SELECT * FROM `usuario` WHERE `borrado_usuario`= 0 LIMIT " .$paginacion->inicio. " ," .$paginacion->tamanhoPagina;
        $this->stmt = $this->conexion->prepare($this->query);
        $this->get_results_from_query();
    }

    function searchDelete($paginacion) {
        $this->query = "SELECT * FROM `usuario` WHERE `borrado_usuario`= 1 LIMIT " .$paginacion->inicio. " ," .$paginacion->tamanhoPagina;
        $this->stmt = $this->conexion->prepare($this->query);
        $this->get_results_from_query();
    }

    function searchAll() {
        $this->query = "SELECT * FROM `usuario`";
        $this->stmt = $this->conexion->prepare($this->query);
        $this->get_results_from_query();
    }

    function searchByParameters($datosSearchParameters, $paginacion) {

        $this -> query = 
            "SELECT * FROM `usuario` 
            WHERE 
                LOWER(`dni_usuario`) like LOWER(CONCAT('%','" . $datosSearchParameters['dni_usuario']. "','%')) AND
                LOWER(`usuario`) LIKE LOWER(CONCAT('%','" . $datosSearchParameters['usuario'] . "','%')) AND
                LOWER(`id_rol`) LIKE LOWER(CONCAT('%','". $datosSearchParameters['id_rol'] . "','%')) AND
                `borrado_usuario`=0
                LIMIT " . $paginacion -> inicio . "," . $paginacion -> tamanhoPagina . ";";

        $this->stmt = $this->conexion->prepare($this->query);
        $this->get_results_from_query();
    }


    function searchById($datosSearch) {
        $this->query = "SELECT * FROM `usuario` WHERE `dni_usuario`='".$datosSearch['dni_usuario']."'";
        if(isset($datosSearch->foraneas)){
            $foraneas = $datosSearch->foraneas;
        }
        $this->stmt = $this->conexion->prepare($this->query);
        $this->get_one_result_from_query();
        $respuesta = $this->feedback;
        if(!empty($foraneas)){
            foreach($foraneas as $fk){
                $result = $this->incluirDatosForaneas($this->feedback['resource'],$fk, 'dni_usuario');
                array_push($respuesta['resource'], $result);
            }
        }
        return $respuesta;
    }

    function searchByLogin($datosSearch) {
        $foraneas = null;
        $this->query = "SELECT * FROM `usuario` WHERE `usuario`='" . $datosSearch['usuario'] . "'";
        if(isset($datosSearch['foraneas'])){
            $foraneas = $datosSearch['foraneas'];
        }
        $this->stmt = $this->conexion->prepare($this->query);
        $this->get_one_result_from_query();
        $this->respuesta = $this->feedback;

        if($this->respuesta['code'] != 'RECORDSET_VACIO'){
            if(!empty($foraneas)){
                foreach($foraneas as $fk){
                    $result = $this->incluirDatosForaneas($this->respuesta['resource'],$fk, 'id_rol');
                    array_push($this->respuesta['resource'], $result);
                } 
            }
            return $this->respuesta;
        }else{
            return $this->respuesta;
        }
    }
 
    function reactivar($datos) {

        $this->query = 
            "UPDATE `usuario`
            SET `borrado_usuario`=0
            WHERE `dni_usuario`='" . $datos['dni_usuario'] . "'";

        $this->stmt = $this->conexion->prepare($this->query);
        $this->get_one_result_from_query();
        $respuesta = $this->feedback;

        return $respuesta;

    }

    function numberFindAll() {
        $this->query = "SELECT COUNT(*) FROM `usuario` WHERE `borrado_usuario`= 0";
        $this->stmt = $this->conexion->prepare($this->query);
        $this->get_one_result_from_query();
    }

    function numberFindParameters($datosSearchParameters) {
        $this->query = "SELECT COUNT(*) FROM `usuario` WHERE LOWER(`dni_usuario`) like LOWER(CONCAT('%','" .$datosSearchParameters['dni_usuario']. "', '%')) AND
                        LOWER(`usuario`) LIKE LOWER(CONCAT('%','" .$datosSearchParameters['usuario']."', '%')) AND
                        LOWER(`id_rol`) LIKE LOWER(CONCAT('%','".$datosSearchParameters['id_rol']."', '%')) AND
                        `borrado_usuario` = 0";
        $this->stmt = $this->conexion->prepare($this->query);
        $this->get_one_result_from_query();
    }
    
}
?>