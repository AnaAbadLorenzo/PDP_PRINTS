<?php

include_once './Comun/config.php';
include_once './Mapping/MappingBase.php';

class ConexionesBDTest extends MappingBase {

    private $conexion;

    private $token;

    private $mappingBase;

    function __construct()
    {
        $this->conexion = $this->conectar();
        $this->token = array();
    }

    function conectar() {
        $this->conexion = curl_init();
        return $this->conexion;
    }

    function desconectar($conex) {
        curl_close($conex);
    }

    function HTTPResponse($cliente, $parametrosPeticion) {
    
        curl_setopt($cliente, CURLOPT_URL, urlRest);
        curl_setopt($cliente, CURLOPT_HEADER, false);
        curl_setopt($cliente, CURLOPT_HTTPHEADER, $this->token);
        curl_setopt($cliente, CURLOPT_POST, true);
        curl_setopt($cliente, CURLOPT_POSTFIELDS, $parametrosPeticion);
        curl_setopt($cliente, CURLOPT_RETURNTRANSFER, true);
            
        $resultado = curl_exec($cliente);
        $codigoHTTP = curl_getinfo($cliente, CURLINFO_HTTP_CODE);


        if(!$resultado){
            return false;
        }else{
            if($codigoHTTP == 200){
                $resp = json_decode($resultado, true); 
			    $resp = (array)$resp;
               return  $resp;
            }
        }
    }


    function obtenerTokenTest($peticion){
        $peticion['test'] = 'testing';
        $respuesta =  $this->HTTPResponse($this->conexion, $peticion);
        
        if(!empty($respuesta)){
            $cabeceraAutorizacion = 'Authorization: '.$respuesta['resource']['tokenUsuario'];
            $this->token[0] = $cabeceraAutorizacion;
            return $this->token[0];
        }
    }

    function pruebaTesting($accion,$peticion){
        $peticion['test'] = 'testing';
        $respuesta = '';
       
        switch($accion){
            case 'login':
               $respuesta = $this->obtenerTokenTest($peticion);
            break;
            case 'delete':
                $respuesta = $this->deleteFromTest($peticion);
            break;
            default:
                $respuesta = $this->HTTPResponse($this->conexion, $peticion);
            break;
        }

        return $respuesta;
    }
}