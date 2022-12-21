<?php

include_once './Mapping/MappingBase.php';
include_once './Modelos/PersonaModel.php';

class categoriaMapping extends MappingBase {
    public $conexion;

    public function __construct(){
        $this->conexion = $this->connection();
    }

    function add($datosInsertar) {
        

        $this->query = "INSERT INTO `categoria` (`id_categoria`, `nombre_categoria`, `descripcion_categoria`, `borrado_categoria`, `dni_responsable`, `id_padre_categoria`, `dni_usuario`) VALUES (2,'".$datosInsertar['nombre_categoria']."','".$datosInsertar['descripcion_categoria']."','"
        .$datosInsertar['borrado_categoria']."','".$datosInsertar['dni_responsable']."',".$datosInsertar['id_padre_categoria'].",'".$datosInsertar['dni_usuario']. "')";
        $this->stmt = $this->conexion->prepare($this->query);
        
        $this->execute_single_query();   
        
    }


    function edit($datosModificar) {
        $this->query = "UPDATE `categoria` SET `nombre_categoria` = '"
        .$datosModificar['nombre_categoria']."', `descripcion_categoria` = '"
        .$datosModificar['descripcion_categoria']."', `borrado_categoria` = '"
        .$datosModificar['borrado_categoria']."', `dni_responsable` = '"
        .$datosModificar['dni_responsable']."', `id_padre_categoria` = '"
        .$datosModificar['id_padre_categoria']."',`dni_usuario`='"
        .$datosModificar['dni_usuario']."'WHERE `id_categoria` ='"
        .$datosModificar['id_categoria']."'";
        $this->stmt = $this->conexion->prepare($this->query);
        $this->execute_single_query();
    }



    function delete($datosEliminar) {

        $this->query = "UPDATE `categoria` SET `borrado_categoria` = 1 WHERE `id_categoria` ='"
        .$datosEliminar['id_categoria']."'";
        $this->stmt = $this->conexion->prepare($this->query);

        $this->execute_single_query();
    }

/*
    function numberFindAll() {
        $this->query = "SELECT COUNT(*) FROM `persona`";
        $this->stmt = $this->conexion->prepare($this->query);
        $this->get_one_result_from_query();
    }
    */
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
    
    /*
    function searchByParameters($datosSearchParameters, $paginacion) {
        $this->query = "SELECT * FROM `persona` WHERE LOWER(`dni_persona`) like LOWER(CONCAT('%','" .$datosSearchParameters['dni_persona']. "', '%')) AND
                        LOWER(`nombre_persona`) LIKE LOWER(CONCAT('%','" .$datosSearchParameters['nombre_persona']."', '%')) AND
                        LOWER(`apellidos_persona`) LIKE LOWER(CONCAT('%','".$datosSearchParameters['apellidos_persona']."', '%')) AND
                        LOWER(`fecha_nac_persona`) LIKE LOWER(CONCAT('%','".$datosSearchParameters['fecha_nac_persona']."', '%')) AND
                        LOWER(`direccion_persona`) LIKE LOWER(CONCAT('%','".$datosSearchParameters['direccion_persona']."', '%')) AND
                        LOWER(`email_persona`) LIKE LOWER(CONCAT('%','".$datosSearchParameters['email_persona']."', '%')) AND
                        LOWER(`telefono_persona`) LIKE LOWER(CONCAT('%','".$datosSearchParameters['telefono_persona']."', '%')) AND
                        `borrado_persona` = 0 LIMIT ".$paginacion->inicio.",".$paginacion->tamanhoPagina.""; 

        $this->stmt = $this->conexion->prepare($this->query);
        $this->get_results_from_query();
    }
*/
/*
    function numberFindParameters($datosSearchParameters) {
        $this->query = "SELECT COUNT(*) FROM `persona` WHERE LOWER(`dni_persona`) like LOWER(CONCAT('%','" .$datosSearchParameters['dni_persona']. "', '%')) AND
                        LOWER(`nombre_persona`) LIKE LOWER(CONCAT('%','" .$datosSearchParameters['nombre_persona']."', '%')) AND
                        LOWER(`apellidos_persona`) LIKE LOWER(CONCAT('%','".$datosSearchParameters['apellidos_persona']."', '%')) AND
                        LOWER(`fecha_nac_persona`) LIKE LOWER(CONCAT('%','".$datosSearchParameters['fecha_nac_persona']."', '%')) AND
                        LOWER(`direccion_persona`) LIKE LOWER(CONCAT('%','".$datosSearchParameters['direccion_persona']."', '%')) AND
                        LOWER(`email_persona`) LIKE LOWER(CONCAT('%','".$datosSearchParameters['email_persona']."', '%')) AND
                        LOWER(`telefono_persona`) LIKE LOWER(CONCAT('%','".$datosSearchParameters['telefono_persona']."', '%')) AND
                        `borrado_persona` = 0"; 
        $this->stmt = $this->conexion->prepare($this->query); 
        $this->get_one_result_from_query();
    }
*/
function search() {
    $this->query = "SELECT * FROM `categoria`";
    $this->stmt = $this->conexion->prepare($this->query);
    $this->get_results_from_query();
}


    function searchByIdPadre($datosSearch) {
            $this->query = "SELECT * FROM `categoria` WHERE `id_categoria`='".$datosSearch['id_padre_categoria']."'";
            //$foraneas = $datosSearch['foraneas'];
            $this->stmt = $this->conexion->prepare($this->query);
            $this->get_one_result_from_query();
            $respuesta = $this->feedback;

            if($respuesta['code'] != 'RECORDSET_VACIO'){
               
               // foreach($foraneas as $fk){
                  //  $result = $this->incluirDatosForaneas($respuesta['resource'],$fk, 'id_rol');
                 //   array_push($respuesta['resource'], $result);
                //} 
                
                return $respuesta;
            }else{
                return $respuesta;
            }
    }

    function searchById($datosSearch) {
        $this->query = "SELECT * FROM `categoria` WHERE `id_categoria`='".$datosSearch['id_categoria']."'";
        //$foraneas = $datosSearch['foraneas'];
        $this->stmt = $this->conexion->prepare($this->query);
       
        $this->get_one_result_from_query();
        $respuesta = $this->feedback;

        if($respuesta['code'] != 'RECORDSET_VACIO'){
           
           // foreach($foraneas as $fk){
              //  $result = $this->incluirDatosForaneas($respuesta['resource'],$fk, 'id_rol');
             //   array_push($respuesta['resource'], $result);
            //} 
            
            return $respuesta;
        }else{
            return $respuesta;
        }
}
    
    
}
?>