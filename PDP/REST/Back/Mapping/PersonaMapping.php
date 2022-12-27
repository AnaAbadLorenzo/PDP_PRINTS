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


        $this->query = "UPDATE `persona` SET `borrado_persona` = 1 WHERE `dni_persona` ='"
        .$datosEliminar['dni_persona']."'";
        $this->stmt = $this->conexion->prepare($this->query);

        $this->execute_single_query();
    }

    function numberFindAll() {
        $this->query = "SELECT COUNT(*) FROM `persona` WHERE `borrado_persona`= 0";
        $this->stmt = $this->conexion->prepare($this->query);
        $this->get_one_result_from_query();
    }

    function numberFindAllDelete() {
        $this->query = "SELECT COUNT(*) FROM `persona` WHERE `borrado_persona`= 1";
        $this->stmt = $this->conexion->prepare($this->query);
        $this->get_one_result_from_query();
    }

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

    function search($paginacion) {
        $this->query = "SELECT * FROM `persona` WHERE `borrado_persona`= 0 LIMIT" .$paginacion->inicio. ",".$paginacion->tamanhoPagina;
        $this->stmt = $this->conexion->prepare($this->query);
        $this->get_results_from_query();
    }

    function searchDelete($paginacion) {
        $this->query = "SELECT * FROM `persona`  WHERE `borrado_persona`= 1 LIMIT " .$paginacion->inicio. ",".$paginacion->tamanhoPagina;
        $this->stmt = $this->conexion->prepare($this->query);
        $this->get_results_from_query();
    }

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