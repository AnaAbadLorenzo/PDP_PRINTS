<?php

include_once './Mapping/MappingBase.php';
include_once './Modelos/PersonaModel.php';

class FuncionalidadMapping extends MappingBase {


    public $conexion;

    public function __construct(){
        $this->conexion = $this->connection();
    }

   function add($datosInsertar) {
        
        $this->query = "INSERT INTO `funcionalidad` (`id_funcionalidad`, `nombre_funcionalidad`, `descripcion_funcionalidad`, `borrado_funcionalidad`) VALUES (1,'".$datosInsertar['nombre_funcionalidad']."','".$datosInsertar['descripcion_funcionalidad']."','"
                        .$datosInsertar['borrado_funcionalidad']. "')";
        $this->stmt = $this->conexion->prepare($this->query);
       
        $this->execute_single_query();  
    }


    function edit($datosModificar) {
      
        $this->query = "UPDATE `funcionalidad` SET `nombre_funcionalidad` = '"
        .$datosModificar['nombre_funcionalidad']."', `descripcion_funcionalidad` = '"
        .$datosModificar['descripcion_funcionalidad']."', `borrado_funcionalidad`='"
        .$datosModificar['borrado_funcionalidad']." 'WHERE `id_funcionalidad` ='"
        .$datosModificar['id_funcionalidad']."'";
        $this->stmt = $this->conexion->prepare($this->query);

        $this->execute_single_query();
    }

    function delete($datosEliminar) {
        $this->query = "UPDATE `funcionalidad` SET `borrado_funcionalidad` = 1 WHERE `id_funcionalidad` ='"
        .$datosEliminar['id_funcionalidad']."'";
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
        $this->query = "SELECT * FROM `funcionalidad`";
        $this->stmt = $this->conexion->prepare($this->query);
        $this->get_results_from_query();
    }

    function searchById($datosSearch) {
        
        $this->query = "SELECT * FROM `funcionalidad` WHERE `id_funcionalidad`='".$datosSearch['id_funcionalidad']."'";
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