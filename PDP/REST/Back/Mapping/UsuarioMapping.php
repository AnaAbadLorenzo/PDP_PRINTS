<?php

include_once './Mapping/MappingBase.php';
include_once './Modelos/UsuarioModel.php';

class UsuarioMapping extends MappingBase {
    public $conexion;

    public function __construct(){
        $this->conexion = $this->connection();
    }

    function add($datosInsertar) {
        
        //INSERT INTO `pdp_prints`.`usuario` (`dni_usuario`, `usuario`, `passwd_usuario`, `borrado_usuario`, `id_rol`) VALUES ('333333', 'jeje', '1234', '0', '2');
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

    function delete($datosEliminar) {
       
        $this->query = "DELETE FROM `usuario` WHERE `dni_usuario` = '". $datosEliminar['dni_usuario']."'";
        $this->stmt = $this->conexion->prepare($this->query);
        $this->execute_single_query();
    }

    function searchBy() {
        $this->query = "SELECT * FROM `usuario` WHERE 'dni_usuario='". $this->usuario->dni_usuario."' AND usuario='". $this->usuario->usuario.
                        "'AND borrado_usuario='". $this->usuario->borrado_usuario."' AND id_rol='". $this->usuario->id_rol."'";
        $this->get_results_from_query();
    }

    function search() {
        $this->query = "SELECT * FROM `usuario` ";
        $this->get_results_from_query();
    }

    function searchById($datosSearch) {
        $this->query = "SELECT * FROM `usuario` WHERE 'dni_usuario='".$datosSearch['dni_usuario']."'";
        $foraneas = $datosSearch->foraneas;
        $this->stmt = $this->conexion->prepare($this->query);
        $this->get_one_result_from_query();
        $respuesta = $this->feedback;

        foreach($foraneas as $fk){
            $result = $this->incluirDatosForaneas($this->feedback['resource'],$fk, 'dni_usuario');
            array_push($respuesta['resource'], $result);
        } 
    }

    function searchByLogin($datosSearch) {
            $this->query = "SELECT * FROM `usuario` WHERE `usuario`='" . $datosSearch['usuario'] . "'";
            $foraneas = $datosSearch['foraneas'];
            $this->stmt = $this->conexion->prepare($this->query);
            $this->get_one_result_from_query();
            $respuesta = $this->feedback;

            if($respuesta['code'] != 'RECORDSET_VACIO'){
                foreach($foraneas as $fk){
                    $result = $this->incluirDatosForaneas($respuesta['resource'],$fk, 'id_rol');
                    array_push($respuesta['resource'], $result);
                } 
                
                return $respuesta;
            }else{
                return $respuesta;
            }
    }
    
}
?>