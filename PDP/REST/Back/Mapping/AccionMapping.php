<?php

include_once './Mapping/MappingBase.php';
include_once './Modelos/PersonaModel.php';

class AccionMapping extends MappingBase {
    public $conexion;

    public function __construct(){
        $this->conexion = $this->connection();
    }

    function add($datosInsertar) {
        
        $this->query = "INSERT INTO `accion` (`id_accion`, `nombre_accion`, `descripcion_accion`, `borrado_accion`) VALUES (1,'".$datosInsertar['nombre_accion']."','".$datosInsertar['descripcion_accion']."','"
                        .$datosInsertar['borrado_accion']. "')";
        $this->stmt = $this->conexion->prepare($this->query);
       
        $this->execute_single_query();  
    }

    function edit($datosModificar) {
      
        $this->query = "UPDATE `accion` SET `nombre_accion` = '"
        .$datosModificar['nombre_accion']."', `descripcion_accion` = '"
        .$datosModificar['descripcion_accion']."', `borrado_accion`='"
        .$datosModificar['borrado_accion']." 'WHERE `id_accion` ='"
        .$datosModificar['id_accion']."'";
        $this->stmt = $this->conexion->prepare($this->query);
        $this->execute_single_query();
    }

    function delete($datosEliminar) {
        $this->query = "DELETE FROM `accion` WHERE `id_accion` ='". $datosEliminar['id_accion']."'";
        $this->stmt = $this->conexion->prepare($this->query);
        $this->execute_single_query();
    }
/*
@NamedQuery(name = "PersonaEntity.findPersona", query = "SELECT p FROM PersonaEntity p WHERE
 LOWER(p.dniP) LIKE LOWER(CONCAT('%', :dniP, '%')) AND
  LOWER(p.nombreP) LIKE LOWER(CONCAT('%', :nombreP, '%')) AND
   LOWER(p.apellidosP) LIKE LOWER(CONCAT('%', :apellidosP, '%')) AND
    p.fechaNacP LIKE CONCAT('%', :fechaNacP, '%') AND
     LOWER(p.direccionP) LIKE LOWER(CONCAT('%', :direccionP, '%')) AND
      p.telefonoP LIKE CONCAT('%', :telefonoP, '%') AND 
      LOWER(p.emailP) LIKE LOWER(CONCAT('%', :emailP, '%')) AND
       p.borradoP=0"),
	*/	
    function searchByParameters($datosSearchParameters) {
        header('Content-type: application/json');
		echo(json_encode($datosSearchParameters)); 
		exit();
        //averiguar como realizar la query 
        /*$this->query = "SELECT * FROM USUARIO WHERE 'dni_usuario='". $this->usuario->dni_usuario."' AND usuario='". $this->usuario->usuario.
                        "'AND borrado_usuario='". $this->usuario->borrado_usuario."' AND id_rol='". $this->usuario->id_rol."'";
        $this->get_results_from_query();*/
    }

    function search() {
        $this->query = "SELECT * FROM `accion`";
        $this->stmt = $this->conexion->prepare($this->query);
        $this->get_results_from_query();
    }

    function searchById($datosSearch) {
        
        $this->query = "SELECT * FROM `accion` WHERE `id_accion`='".$datosSearch['id_accion']."'";
        //$foraneas = $datosSearch->foraneas;
        $this->stmt = $this->conexion->prepare($this->query);
    
        $this->get_one_result_from_query();
        $respuesta = $this->feedback;
        return $respuesta;
       /* foreach($foraneas as $fk){
            $result = $this->incluirDatosForaneas($this->feedback['resource'],$fk, 'dni_usuario');
            array_push($respuesta['resource'], $result);
        } */
    }
 /*
    function searchByDNI($datosSearch) {
            $this->query = "SELECT * FROM `accion` WHERE `dni_persona`='".$datosSearch['dni_persona']."'";
            //$foraneas = $datosSearch['foraneas'];
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
    */
   
}
?>