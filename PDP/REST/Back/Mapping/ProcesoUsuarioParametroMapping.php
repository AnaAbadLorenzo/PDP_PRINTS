<?php

include_once './Mapping/MappingBase.php';

include_once './Modelos/ProcesoUsuarioParametroModel.php';

class ProcesoUsuarioParametroMapping extends MappingBase {

    public $conexion;

    public function __construct(){
        $this->conexion = $this->connection();
    }

    function add($datos)
    {
        $this -> query = 
            "INSERT INTO `proceso_usuario_parametro` 
            (
                `id_proceso_usuario`,
                `id_parametro`,
                `valor_parametro`
            )
            VALUES 
            (
                '" . $datos['id_proceso_usuario']   . "',
                '" . $datos['id_parametro']         . "',
                '" . $datos['valor_parametro']      . "'
            )
            ;"
        ;

        $this -> stmt = $this -> conexion -> prepare($this->query);
        $this -> execute_single_query();  
    }

    function edit($datos) {

        $this -> query = 
            "UPDATE `proceso_usuario_parametro`
            SET
                `valor_parametro`='" . $datos['valor_parametro'] . "'
            WHERE
                `id_proceso_usuario`='" .   $datos['id_proceso_usuario']    . "' AND
                `id_parametro`='" .         $datos['id_parametro']          . "'
            ;"
        ;

        $this -> stmt = $this -> conexion -> prepare($this -> query);
        $this -> execute_single_query();

    }

    function delete($datos) {

        $this -> query =
            "DELETE FROM `proceso_usuario_parametro`
            WHERE
                `id_proceso_usuario`='" .   $datos['id_proceso_usuario']    . "' AND
                `id_parametro`='" .         $datos['id_parametro']          . "'
            ;"
        ;

        $this -> stmt = $this -> conexion -> prepare($this -> query);
        $this -> execute_single_query();

    }

    function deleteByProcesoUsuario($datos) {

        $this -> query =
            "DELETE FROM `proceso_usuario_parametro`
            WHERE
                `id_proceso_usuario`='" .   $datos['id_proceso_usuario']    . "'
            ;"
        ;

        $this -> stmt = $this -> conexion -> prepare($this -> query);
        $this -> execute_single_query();

    }

    function search($paginacion) {

        $this -> query = 
            "SELECT * FROM `proceso_usuario_parametro`
            LIMIT " . $paginacion -> inicio . "," . $paginacion -> tamanhoPagina . ";"
        ;

        $this -> stmt = $this -> conexion -> prepare($this -> query);
        $this -> get_results_from_query();

    }

    function searchById($datos) {

        $this -> query = 
            "SELECT * FROM `proceso_usuario_parametro`
            WHERE
                `id_proceso_usuario`='" .   $datos['id_proceso_usuario']    . "' AND
                `id_parametro`='" .         $datos['id_parametro']          . "'
            ;"
        ;

        $this -> stmt = $this -> conexion -> prepare($this -> query);
        $this -> get_one_result_from_query();
        $respuesta = $this -> feedback;

        return $respuesta;

    }

    function searchByParameters($datos, $paginacion) {

        $this -> query = 
            "SELECT * FROM `proceso_usuario_parametro`
            WHERE
                LOWER(`id_proceso_usuario`) LIKE LOWER(CONCAT('%','" .  $datos['id_proceso_usuario']    . "','%')) AND
                LOWER(`id_parametro`) LIKE LOWER(CONCAT('%','" .        $datos['id_parametro']          . "','%')) AND
                LOWER(`valor_parametro`) LIKE LOWER(CONCAT('%','" .     $datos['valor_parametro']       . "','%'))
            LIMIT ". $paginacion -> inicio . "," . $paginacion -> tamanhoPagina . "
            ;"
        ; 

        $this -> stmt = $this -> conexion -> prepare($this -> query);
        $this -> get_results_from_query();

    }

    function numberFindAll() {
        $this -> query = "SELECT COUNT(*) FROM `proceso_usuario_parametro`";
        $this -> stmt = $this -> conexion -> prepare($this -> query);
        $this -> get_one_result_from_query();
    }

    function numberFindParameters($datos) {

        $this -> query = 
            "SELECT COUNT(*) FROM `proceso_usuario_parametro`
            WHERE
                LOWER(`id_proceso_usuario`) LIKE LOWER(CONCAT('%','" .  $datos['id_proceso_usuario']    . "','%')) AND
                LOWER(`id_parametro`) LIKE LOWER(CONCAT('%','" .        $datos['id_parametro']          . "','%')) AND
                LOWER(`valor_parametro`) LIKE LOWER(CONCAT('%','" .     $datos['valor_parametro']       . "','%'))
            ;"
        ;

        $this -> stmt = $this -> conexion -> prepare($this -> query); 
        $this -> get_one_result_from_query();

    }
      
    function buscarPorIdParametro($datos) {
        
        $this -> query = 
            "SELECT * FROM `proceso_usuario_parametro`
            WHERE
                `id_parametro`='" . $datos['id_parametro'] . "';"
        ;

        $this->stmt = $this->conexion->prepare($this->query);
        $this -> get_results_from_query();

    }

}
?>