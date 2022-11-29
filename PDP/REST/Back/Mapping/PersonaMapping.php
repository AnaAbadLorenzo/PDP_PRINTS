<?php

include_once './Mapping/MappingBase.php';
include_once './Modelos/PersonaModel.php';

class PersonaMapping extends MappingBase {
    public $conexion;

    public function __construct(){
        $this->conexion = $this->connection();
    }

    function add($datosInsertar) {
        
        $this->query = "INSERT INTO `persona` (`dni_persona`, `nombre_persona`, `apellidos_persona`, `fecha_nac_persona`, `direccion_persona`, `email_persona`, `telefono_persona`, `borrado_persona`) VALUES ('".$datosInsertar['dni_persona']."','".$datosInsertar['nombre_persona']."','"
                        .$datosInsertar['apellidos_persona']."','".$datosInsertar['fecha_nac_persona']."','"
                        .$datosInsertar['direccion_persona']."','".$datosInsertar['email_persona']."','"
                        .$datosInsertar['telefono_persona']."','".$datosInsertar['borrado_persona']. "')";
        $this->stmt = $this->conexion->prepare($this->query);
        $this->execute_single_query();  
    }

    function edit($datosModificar) {
        $this->query = "UPDATE `persona` SET `nombre_persona` = '"
        .$datosModificar['nombre_persona']."', `fecha_nac_persona` = '"
        .$datosModificar['fecha_nac_persona']."', `direccion_persona` = '"
        .$datosModificar['direccion_persona']."', `email_persona` = '"
        .$datosModificar['email_persona']."', `telefono_persona` = '"
        .$datosModificar['telefono_persona']."',`borrado_persona`='"
        .$datosModificar['borrado_persona']."'WHERE `dni_persona` ='"
        .$datosModificar['dni_persona']."'";
        $this->stmt = $this->conexion->prepare($this->query);
        $this->execute_single_query();
    }

    function delete($datosEliminar) {
        $this->query = "DELETE FROM `persona` WHERE `dni_persona` ='". $datosEliminar['dni_persona']."'";
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
		
    function searchByParameters($datosSearchParameters) {
        $this->query = "SELECT * FROM USUARIO WHERE 'dni_usuario='". $this->usuario->dni_usuario."' AND usuario='". $this->usuario->usuario.
                        "'AND borrado_usuario='". $this->usuario->borrado_usuario."' AND id_rol='". $this->usuario->id_rol."'";
        $this->get_results_from_query();
    }
*/
    function search() {
        $this->query = "SELECT * FROM `persona`";
        $this->stmt = $this->conexion->prepare($this->query);
        $this->get_results_from_query();
    }
/*
    function searchById($datosSearch) {
        $this->query = "SELECT * FROM USUARIO WHERE 'dni_usuario='".$datosSearch['dni_usuario']."'";
        $foraneas = $datosSearch->foraneas;
        $this->stmt = $this->conexion->prepare($this->query);
        $this->get_one_result_from_query();
        $respuesta = $this->feedback;

        foreach($foraneas as $fk){
            $result = $this->incluirDatosForaneas($this->feedback['resource'],$fk, 'dni_usuario');
            array_push($respuesta['resource'], $result);
        } 
    }
 */
    function searchByDNI($datosSearch) {
            $this->query = "SELECT * FROM `persona` WHERE `dni_persona`='".$datosSearch['dni_persona']."'";
            //$foraneas = $datosSearch['foraneas'];
            $this->stmt = $this->conexion->prepare($this->query);
            $this->get_one_result_from_query();
            $respuesta = $this->feedback;

            if($respuesta['code'] != 'RECORDSET_VACIO'){
               
               /* foreach($foraneas as $fk){
                    $result = $this->incluirDatosForaneas($respuesta['resource'],$fk, 'id_rol');
                    array_push($respuesta['resource'], $result);
                } */
                
                return $respuesta;
            }else{
                return $respuesta;
            }
    }
   
}
?>