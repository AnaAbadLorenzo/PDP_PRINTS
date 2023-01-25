<?php

include_once './Mapping/MappingBase.php';
include_once './Modelos/ProcesoModel.php';

class ProcesoMapping extends MappingBase {

    public $conexion;

    public function __construct(){
        $this->conexion = $this->connection();
    }

    function add($datosInsertar) {
     

        $this->query = "INSERT INTO `proceso` (`id_proceso`, `nombre_proceso`, `descripcion_proceso`, `fecha_proceso`, `borrado_proceso`, `version_proceso`, `check_aprobacion`, `formula_proceso`, `id_categoria`, `dni_usuario`) VALUES (default, '".$datosInsertar['nombre_proceso']."','".$datosInsertar['descripcion_proceso']."','"
        .$datosInsertar['fecha_proceso']."','".$datosInsertar['borrado_proceso']."','".$datosInsertar['version_proceso']."','".$datosInsertar['check_aprobacion']."','".$datosInsertar['formula_proceso']."','".$datosInsertar['id_categoria']."','".$datosInsertar['dni_usuario']. "')";
        $this->stmt = $this->conexion->prepare($this->query);
        		

        $this->execute_single_query();   
        
    }


    function edit($datosModificar) {
        
        $this->query = "UPDATE `proceso` SET `nombre_proceso` = '"
        .$datosModificar['nombre_proceso']."', `descripcion_proceso` = '"
        .$datosModificar['descripcion_proceso']."', `fecha_proceso` = '"
        .$datosModificar['fecha_proceso']."', `version_proceso` = '"
        .$datosModificar['version_proceso']."', `check_aprobacion` = '"
        .$datosModificar['check_aprobacion']."',`formula_proceso` = '"
        .$datosModificar['formula_proceso']."',`id_categoria` = '"
        .$datosModificar['id_categoria']."',`dni_usuario`='"
        .$datosModificar['dni_usuario']."'WHERE `id_proceso` ='"
        .$datosModificar['id_proceso']."'";
        $this->stmt = $this->conexion->prepare($this->query);


        $this->execute_single_query();
        

    }
 
    function getVersion($datosModificar){
        $this->query = "SELECT version_proceso FROM `proceso` WHERE `id_proceso` = '"
            .$datosModificar['id_proceso']."'";
        $this->stmt = $this->conexion->prepare($this->query);
        $this->get_one_result_from_query();
    }


    function delete($datosEliminar) {
        $this->query = "UPDATE `proceso` SET `borrado_proceso` = 1 WHERE `id_proceso` ='"
        .$datosEliminar['id_proceso']."'";
        $this->stmt = $this->conexion->prepare($this->query);

        $this->execute_single_query();
    }

    function numberFindAll() {
        $this->query = "SELECT COUNT(*) FROM `proceso` WHERE `borrado_proceso`= 0";
        $this->stmt = $this->conexion->prepare($this->query);
        $this->get_one_result_from_query();
    }

    function numberFindDelete() {
        
        $this->query = "SELECT COUNT(*) FROM `proceso` WHERE `borrado_proceso`= 1";
        $this->stmt = $this->conexion->prepare($this->query);
        $this->get_one_result_from_query();
         
    }

    function searchByParameters($datosSearchParameters, $paginacion) {
        if($datosSearchParameters['id_categoria'] == 0 || $datosSearchParameters['id_categoria'] == "0"){
            $this->query = "SELECT * FROM `proceso` WHERE LOWER(`nombre_proceso`) like LOWER(CONCAT('%','" .$datosSearchParameters['nombre_proceso']. "', '%')) AND
                LOWER(`descripcion_proceso`) LIKE LOWER(CONCAT('%','" .$datosSearchParameters['descripcion_proceso']."', '%')) AND
                LOWER(`fecha_proceso`) LIKE LOWER(CONCAT('%','" .$datosSearchParameters['fecha_proceso']."', '%')) AND
                LOWER(`version_proceso`) LIKE LOWER(CONCAT('%','" .$datosSearchParameters['version_proceso']."', '%')) AND
                LOWER(`check_aprobacion`) LIKE LOWER(CONCAT('%','" .$datosSearchParameters['check_aprobacion']."', '%')) AND
                LOWER(`formula_proceso`) LIKE LOWER(CONCAT('%','" .$datosSearchParameters['formula_proceso']."', '%')) AND
                LOWER(`dni_usuario`) LIKE LOWER(CONCAT('%','" .$datosSearchParameters['dni_usuario']."', '%')) AND
                `borrado_proceso` = 0 LIMIT ".$paginacion->inicio.",".$paginacion->tamanhoPagina.""; 
        }else{
            $this->query = "SELECT * FROM `proceso` WHERE LOWER(`nombre_proceso`) like LOWER(CONCAT('%','" .$datosSearchParameters['nombre_proceso']. "', '%')) AND
                LOWER(`descripcion_proceso`) LIKE LOWER(CONCAT('%','" .$datosSearchParameters['descripcion_proceso']."', '%')) AND
                LOWER(`fecha_proceso`) LIKE LOWER(CONCAT('%','" .$datosSearchParameters['fecha_proceso']."', '%')) AND
                LOWER(`version_proceso`) LIKE LOWER(CONCAT('%','" .$datosSearchParameters['version_proceso']."', '%')) AND
                LOWER(`check_aprobacion`) LIKE LOWER(CONCAT('%','" .$datosSearchParameters['check_aprobacion']."', '%')) AND
                LOWER(`formula_proceso`) LIKE LOWER(CONCAT('%','" .$datosSearchParameters['formula_proceso']."', '%')) AND
                LOWER(`id_categoria`) LIKE LOWER(CONCAT('%','" .$datosSearchParameters['id_categoria']."', '%')) AND
                LOWER(`dni_usuario`) LIKE LOWER(CONCAT('%','" .$datosSearchParameters['dni_usuario']."', '%')) AND
                `borrado_proceso` = 0 LIMIT ".$paginacion->inicio.",".$paginacion->tamanhoPagina.""; 
        }
        $this->stmt = $this->conexion->prepare($this->query);
        $this->get_results_from_query();
        
    }

    function searchByIdCategoria($datosSearchCategoria, $paginacion) {
            
        $this->query = "SELECT * FROM `proceso` WHERE `id_categoria` ="  .$datosSearchCategoria['id_categoria']. " AND
                        `borrado_proceso` = 0 LIMIT ".$paginacion->inicio.",".$paginacion->tamanhoPagina.""; 

        $this->stmt = $this->conexion->prepare($this->query);
        $this->get_results_from_query();
    }

    function numberFindByIdCategoria($datosSearchCategoria) {
        
        $this->query = "SELECT COUNT(*) FROM `proceso` WHERE `id_categoria` ="  .$datosSearchCategoria['id_categoria']. " AND
                        `borrado_proceso` = 0";
        $this->stmt = $this->conexion->prepare($this->query);
        $this->get_one_result_from_query();
         
    }

    function numberFindParameters($datosSearchParameters) {
        if($datosSearchParameters['id_categoria'] == 0 || $datosSearchParameters['id_categoria'] == "0"){
            $this->query = "SELECT COUNT(*) FROM `proceso` WHERE LOWER(`nombre_proceso`) like LOWER(CONCAT('%','" .$datosSearchParameters['nombre_proceso']. "', '%')) AND
                            LOWER(`descripcion_proceso`) LIKE LOWER(CONCAT('%','" .$datosSearchParameters['descripcion_proceso']."', '%')) AND
                            LOWER(`fecha_proceso`) LIKE LOWER(CONCAT('%','".$datosSearchParameters['fecha_proceso']."', '%')) AND
                            LOWER(`version_proceso`) LIKE LOWER(CONCAT('%','".$datosSearchParameters['version_proceso']."', '%')) AND
                            LOWER(`check_aprobacion`) LIKE LOWER(CONCAT('%','".$datosSearchParameters['check_aprobacion']."', '%')) AND
                            LOWER(`formula_proceso`) LIKE LOWER(CONCAT('%','" .$datosSearchParameters['formula_proceso']."', '%')) AND
                            LOWER(`dni_usuario`) LIKE LOWER(CONCAT('%','".$datosSearchParameters['dni_usuario']."', '%')) AND
                            `borrado_proceso` = 0";
        }else{
            $this->query = "SELECT COUNT(*) FROM `proceso` WHERE LOWER(`nombre_proceso`) like LOWER(CONCAT('%','" .$datosSearchParameters['nombre_proceso']. "', '%')) AND
                LOWER(`descripcion_proceso`) LIKE LOWER(CONCAT('%','" .$datosSearchParameters['descripcion_proceso']."', '%')) AND
                LOWER(`fecha_proceso`) LIKE LOWER(CONCAT('%','".$datosSearchParameters['fecha_proceso']."', '%')) AND
                LOWER(`version_proceso`) LIKE LOWER(CONCAT('%','".$datosSearchParameters['version_proceso']."', '%')) AND
                LOWER(`check_aprobacion`) LIKE LOWER(CONCAT('%','".$datosSearchParameters['check_aprobacion']."', '%')) AND
                LOWER(`formula_proceso`) LIKE LOWER(CONCAT('%','" .$datosSearchParameters['formula_proceso']."', '%')) AND
                LOWER(`id_categoria`) LIKE LOWER(CONCAT('%','".$datosSearchParameters['id_categoria']."', '%')) AND
                LOWER(`dni_usuario`) LIKE LOWER(CONCAT('%','".$datosSearchParameters['dni_usuario']."', '%')) AND
                `borrado_proceso` = 0";
        }
        $this->stmt = $this->conexion->prepare($this->query); 
        $this->get_one_result_from_query();
        
    }

    function searchAll() {
        $this->query = "SELECT * FROM `proceso` WHERE `borrado_proceso`= 0";
        $this->stmt = $this->conexion->prepare($this->query);
        $this->get_results_from_query(); 
    }

    function search($paginacion) {
        $this->query = "SELECT * FROM `proceso` WHERE `borrado_proceso`= 0 LIMIT ".$paginacion->inicio. ",". $paginacion->tamanhoPagina;
        $this->stmt = $this->conexion->prepare($this->query);
        $this->get_results_from_query(); 
    }

    function searchDelete($paginacion) {
        $this->query = "SELECT * FROM `proceso` WHERE `borrado_proceso`= 1 LIMIT ".$paginacion->inicio. ",". $paginacion->tamanhoPagina;
        $this->stmt = $this->conexion->prepare($this->query);
        $this->get_results_from_query(); 
    }

    function getProcesosWhitIdCategoria($datosProceso){
        $this->query = "SELECT * FROM `proceso` WHERE `id_categoria`=".$datosProceso['id_padre_categoria']."";
        $this->stmt = $this->conexion->prepare($this->query);
        $this->get_results_from_query();
    }

    function searchById($datosSearch) {
        $this->query = "SELECT * FROM `proceso` WHERE `id_proceso`='".$datosSearch['id_proceso']."'";
        $this->stmt = $this->conexion->prepare($this->query);
        $this->get_one_result_from_query();
        
        $respuesta = $this->feedback;

        if($respuesta['code'] != 'RECORDSET_VACIO'){
            return $respuesta;
        }else{
            return $respuesta;
        }
    }

    function searchByName($datosSearch) {
        $this->query = "SELECT * FROM `proceso` WHERE `nombre_proceso`='".$datosSearch['nombre_proceso']."'";
        $this->stmt = $this->conexion->prepare($this->query);
        $this->get_one_result_from_query();
        
        $respuesta = $this->feedback;

        if($respuesta['code'] != 'RECORDSET_VACIO'){
            return $respuesta;
        }else{
            return $respuesta;
        }
    }

    function reactivar($datos) {

        $this->query = 
            "UPDATE `proceso`
            SET `borrado_proceso`=0
            WHERE `id_proceso`='" . $datos['id_proceso'] . "'";

        $this->stmt = $this->conexion->prepare($this->query);
        $this->get_one_result_from_query();
        $respuesta = $this->feedback;

        return $respuesta;

    }

    function conseguirUltimoId() {

        $this -> query = 
            "SELECT MAX(`id_proceso`)
            FROM `proceso`"
        ;

        $this->stmt = $this->conexion->prepare($this->query);
        $this->get_one_result_from_query();
        $respuesta = $this->feedback;

        return $respuesta;

    }
    
    function buscarPorIdCategoria($datos) {
        
        $this -> query = 
            "SELECT * FROM `proceso`
            WHERE
                `id_categoria`='" . $datos['id_categoria'] . "';"
        ;

        $this->stmt = $this->conexion->prepare($this->query);
        $this -> get_results_from_query();

    }

    function buscarPorDNIUsuario($datos) {
        
        $this -> query = 
            "SELECT * FROM `proceso`
            WHERE
                `dni_usuario`='" . $datos['dni_usuario'] . "';"
        ;

        $this->stmt = $this->conexion->prepare($this->query);
        $this -> get_results_from_query();

    }
}
?>