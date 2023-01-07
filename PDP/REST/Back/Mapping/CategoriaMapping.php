<?php

include_once './Mapping/MappingBase.php';
include_once './Modelos/PersonaModel.php';

class categoriaMapping extends MappingBase {
    public $conexion;

    public function __construct(){
        $this->conexion = $this->connection();
    }

    function add($datosInsertar) {
        

        $this->query = "INSERT INTO `categoria` (`nombre_categoria`, `descripcion_categoria`, `borrado_categoria`, `dni_responsable`, `id_padre_categoria`, `dni_usuario`) VALUES ('".$datosInsertar['nombre_categoria']."','".$datosInsertar['descripcion_categoria']."','"
        .$datosInsertar['borrado_categoria']."','".$datosInsertar['dni_responsable']."',".$datosInsertar['id_padre_categoria'].",'".$datosInsertar['dni_usuario']. "')";
        $this->stmt = $this->conexion->prepare($this->query);
        echo($this->query);
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
    
    
    function searchByParameters($datosSearchParameters, $paginacion) {
        $this->query = "SELECT * FROM `categoria` WHERE LOWER(`nombre_categoria`) like LOWER(CONCAT('%','" .$datosSearchParameters['nombre_categoria']. "', '%')) AND
                        LOWER(`descripcion_categoria`) LIKE LOWER(CONCAT('%','" .$datosSearchParameters['descripcion_categoria']."', '%')) AND
                        LOWER(`dni_responsable`) LIKE LOWER(CONCAT('%','" .$datosSearchParameters['dni_responsable']."', '%')) AND
                        LOWER(`id_padre_categoria`) LIKE LOWER(CONCAT('%','" .$datosSearchParameters['id_padre_categoria']."', '%')) AND
                        LOWER(`dni_usuario`) LIKE LOWER(CONCAT('%','" .$datosSearchParameters['dni_usuario']."', '%')) AND
                        `borrado_persona` = 0 LIMIT ".$paginacion->inicio.",".$paginacion->tamanhoPagina.""; 

        $this->stmt = $this->conexion->prepare($this->query);
        $this->get_results_from_query();
    }


    function numberFindParameters($datosSearchParameters) {
        $this->query = "SELECT COUNT(*) FROM `categoria` WHERE LOWER(`nombre_categoria`) like LOWER(CONCAT('%','" .$datosSearchParameters['nombre_categoria']. "', '%')) AND
                        LOWER(`descripcion_categoria`) LIKE LOWER(CONCAT('%','" .$datosSearchParameters['descripcion_categoria']."', '%')) AND
                        LOWER(`dni_responsable`) LIKE LOWER(CONCAT('%','".$datosSearchParameters['dni_responsable']."', '%')) AND
                        LOWER(`id_padre_categoria`) LIKE LOWER(CONCAT('%','".$datosSearchParameters['id_padre_categoria']."', '%')) AND
                        LOWER(`dni_usuario`) LIKE LOWER(CONCAT('%','".$datosSearchParameters['dni_usuario']."', '%')) AND
                        `borrado_persona` = 0"; 
        $this->stmt = $this->conexion->prepare($this->query); 
        $this->get_one_result_from_query();
    }

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

    function numberFindAll() {
        $this->query = "SELECT COUNT(*) FROM `categoria` WHERE `borrado_categoria`= 0";
        $this->stmt = $this->conexion->prepare($this->query);
        $this->get_one_result_from_query();
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