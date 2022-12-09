<?php

include_once './Mapping/MappingBase.php';
include_once './Modelos/NoticiaModel.php';

class NoticiaMapping extends MappingBase {
    public $conexion;

    public function __construct(){
        $this->conexion = $this->connection();
    }

    function add($datosInsertar) {

        $this->query = "INSERT INTO `noticia` (`id_noticia`, `titulo_noticia`, `contenido_noticia`, `fecha_noticia`) VALUES ('".$datosInsertar['id_noticia']."', '".$datosInsertar['titulo_noticia']."', '"
                        .$datosInsertar['contenido_noticia']. "', '".$datosInsertar['fecha_noticia']."', '"
                        .$datosInsertar['id_rol']."');";
        $this->stmt = $this->conexion->prepare($this->query);

        $this->execute_single_query();
    }

    function edit($datosModificar) {
        $this->query = "UPDATE `noticia` SET `titulo_noticia` = '"
        .$datosModificar['titulo_noticia']."', `contenido_noticia` = '"
        .$datosModificar['contenido_noticia']."', `fecha_noticia` = '"
        .$datosModificar['fecha_noticia']."' WHERE `id_noticia`='". $datosModificar['id_noticia'] . "'";
        $this->stmt = $this->conexion->prepare($this->query);
        $this->execute_single_query();
    }

    function delete($datosEliminar) {

        $this->query = "DELETE FROM `noticia` WHERE `        header('Content-type: application/json');
		echo(json_encode($datosSearchParameters));
		exit();` = '". $datosEliminar['id_noticia']."'";
        $this->stmt = $this->conexion->prepare($this->query);
        $this->execute_single_query();
    }

    function searchBy() {
        header('Content-type: application/json');
		echo(json_encode($datosSearchParameters));
		exit();
    }

    function search() {
        $this->query = "SELECT * FROM `noticia` ";
        $this->get_results_from_query();
    }

    function searchById($datosSearch) {
            $this->query = "SELECT * FROM `noticia` WHERE `id_noticia`='" . $datosSearch['id_noticia'] . "'";
            $this->stmt = $this->conexion->prepare($this->query);
            $this->get_one_result_from_query();
            $respuesta = $this->feedback;

            if($respuesta['code'] != 'RECORDSET_VACIO'){
                return $respuesta;
            }else{
                return $respuesta;
            }
    }

    function searchByTitulo($datosSearch) {
            $this->query = "SELECT * FROM `noticia` WHERE `titulo_noticia`='" . $datosSearch['titulo_noticia'] . "'";
            $this->stmt = $this->conexion->prepare($this->query);
            $this->get_one_result_from_query();
            $respuesta = $this->feedback;

            if($respuesta['code'] != 'RECORDSET_VACIO'){
                return $respuesta;
            }else{
                return $respuesta;
            }
    }

    function searchByContenido($datosSearch) {
            $this->query = "SELECT * FROM `noticia` WHERE `contenido_noticia`='" . $datosSearch['contenido_noticia'] . "'";
            $this->stmt = $this->conexion->prepare($this->query);
            $this->get_one_result_from_query();
            $respuesta = $this->feedback;

            if($respuesta['code'] != 'RECORDSET_VACIO'){
                return $respuesta;
            }else{
                return $respuesta;
            }
    }
    function searchByFecha($datosSearch) {
            $this->query = "SELECT * FROM `noticia` WHERE `fecha_noticia`='" . $datosSearch['fecha_noticia'] . "'";
            $this->stmt = $this->conexion->prepare($this->query);
            $this->get_one_result_from_query();
            $respuesta = $this->feedback;

            if($respuesta['code'] != 'RECORDSET_VACIO'){
                return $respuesta;
            }else{
                return $respuesta;
            }
    }
}
?>
