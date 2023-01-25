<?php

include_once './Mapping/MappingBase.php';

include_once './Modelos/ProcesoUsuarioModel.php';

class ProcesoUsuarioMapping extends MappingBase {

    public $conexion;

    public function __construct(){
        $this->conexion = $this->connection();
    }

    function add($datos)
    {
        $this -> query = 
            "INSERT INTO `proceso_usuario` 
            (
                `fecha_proceso_usuario`,
                `calculo_huella_carbono`,
                `dni_usuario`,
                `id_proceso`,
                `borrado_proceso_usuario`
            )
            VALUES 
            (
                '" . $datos['fecha_proceso_usuario']    . "',
                '" . $datos['calculo_huella_carbono']   . "',
                '" . $datos['dni_usuario']              . "',
                '" . $datos['id_proceso']               . "',
                0
            )
            ;"
        ;

        $this -> stmt = $this -> conexion -> prepare($this->query);
        $this -> execute_single_query();  
    }

    function edit($datos) {

        $this -> query = 
            "UPDATE `proceso_usuario`
            SET
                `fecha_proceso_usuario`='" .    $datos['fecha_proceso_usuario']     . "',
                `calculo_huella_carbono`='" .   $datos['calculo_huella_carbono']    . "',
                `dni_usuario`='" .              $datos['dni_usuario']               . "',
                `id_proceso`='" .               $datos['id_proceso']                . "'
            WHERE
                `id_proceso_usuario`='" . $datos['id_proceso_usuario'] . "' AND
                `borrado_proceso_usuario`=0
            ;"
        ;

        $this -> stmt = $this -> conexion -> prepare($this -> query);
        $this -> execute_single_query();

    }

    function anadirResultado($datos) {

        $this -> query = 
            "UPDATE `proceso_usuario`
            SET
                `calculo_huella_carbono`='" .   $datos['calculo_huella_carbono']    . "'
            WHERE
                `id_proceso_usuario`='" . $datos['id_proceso_usuario'] . "' AND
                `borrado_proceso_usuario`=0
            ;"
        ;

        $this -> stmt = $this -> conexion -> prepare($this -> query);
        $this -> execute_single_query();

    }

    function delete($datos) {

        $this -> query =
            "UPDATE `proceso_usuario`
            SET
                `borrado_proceso_usuario`=1
            WHERE
                `id_proceso_usuario`='" . $datos['id_proceso_usuario'] . "'
            ;"
        ;

        $this -> stmt = $this -> conexion -> prepare($this -> query);
        $this -> execute_single_query();

    }

    function search($paginacion) {

        $this -> query = 
            "SELECT * FROM `proceso_usuario`
            WHERE `borrado_proceso_usuario`=0
            LIMIT " . $paginacion -> inicio . "," . $paginacion -> tamanhoPagina . ";"
        ;

        $this -> stmt = $this -> conexion -> prepare($this -> query);
        $this -> get_results_from_query();

    }

    function searchById($datos) {

        $this -> query = 
            "SELECT * FROM `proceso_usuario`
            WHERE
                `id_proceso_usuario`='" . $datos['id_proceso_usuario'] . "'
            ;"
        ;

        $this -> stmt = $this -> conexion -> prepare($this -> query);
        $this -> get_one_result_from_query();
        $respuesta = $this -> feedback;

        return $respuesta;

    }

    function searchByParameters($datos, $paginacion) {
        $this -> query = 
            "SELECT * FROM `proceso_usuario`
            WHERE
                LOWER(`fecha_proceso_usuario`) LIKE LOWER(CONCAT('%','" .   $datos['fecha_proceso_usuario']     . "','%')) AND
                LOWER(`calculo_huella_carbono`) LIKE LOWER(CONCAT('%','" .  $datos['calculo_huella_carbono']    . "','%')) AND
                LOWER(`dni_usuario`) LIKE LOWER(CONCAT('%','" .             $datos['dni_usuario']               . "','%')) AND
                LOWER(`id_proceso`) LIKE LOWER(CONCAT('%','" .              $datos['id_proceso']                . "','%')) AND
                `borrado_proceso_usuario`= 0 LIMIT ". $paginacion -> inicio . "," . $paginacion -> tamanhoPagina . "
            ;"
        ; 

        $this -> stmt = $this -> conexion -> prepare($this -> query);
        $this -> get_results_from_query();

    }

    function numberFindAll() {
        $this -> query = "SELECT COUNT(*) FROM `proceso_usuario`";
        $this -> stmt = $this -> conexion -> prepare($this -> query);
        $this -> get_one_result_from_query();
    }

    function numberFindParameters($datos) {

        $this -> query = 
            "SELECT COUNT(*) FROM `proceso_usuario`
            WHERE
                LOWER(`fecha_proceso_usuario`) LIKE LOWER(CONCAT('%','" .   $datos['fecha_proceso_usuario']     . "','%')) AND
                LOWER(`calculo_huella_carbono`) LIKE LOWER(CONCAT('%','" .  $datos['calculo_huella_carbono']    . "','%')) AND
                LOWER(`dni_usuario`) LIKE LOWER(CONCAT('%','" .             $datos['dni_usuario']               . "','%')) AND
                LOWER(`id_proceso`) LIKE LOWER(CONCAT('%','" .              $datos['id_proceso']                . "','%')) AND
                `borrado_proceso_usuario`= 0;"
        ;

        $this -> stmt = $this -> conexion -> prepare($this -> query); 
        $this -> get_one_result_from_query();

    }
    
}
?>