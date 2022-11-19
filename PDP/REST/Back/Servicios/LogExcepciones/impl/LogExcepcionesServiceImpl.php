<?php
include_once './Modelos/LogExcepcionesModel.php';
include_once './Servicios/LogExcepciones/LogExcepcionesService.php';
class LogExcepcionesServiceImpl extends ServiceBase implements LogExcepcionesService{

    private $logExcepcionesModel;
    function __construct()
    {
        $this->logExcepcionesModel = new LogExcepcionesModel();
    }
    function inicializarParametros(){
        $this->logExcepciones = $this->crearModelo('LogExcepciones');
        $this->clase_validacionFormato = $this->crearValidacionFormato('LogExcepciones');  
    }

    function insertarLogExcepciones($logExcepciones) {
        $this->clase_validacionFormato->comprobarLogExcepcionesBlank($logExcepciones);
        $this->logExcepcionesModel->insertar('LogExcepciones', $logExcepciones);
    }

}