<?php

include_once './Validation/ValidacionesBase.php';
include_once './Comun/funcionesComunes.php';
include_once './Modelos/CategoriaModel.php';

class AddProcesoAccion extends ValidacionesBase{

	
    private $proceso;
	public $respuesta;

	function __construct()
	{
		$this->categoria = new CategoriaModel();
        $this->persona = new PersonaModel();
       
	}


	function comprobarAddProceso($datosAddProceso){

		//$this->existeIdProceso($datosAddProceso);
		$this->existeIdCategoria($datosAddProceso);
		$this->existeDNIUsuario($datosAddProceso);
	}

function existeIdCategoria($datosAddProceso){
 
		$datoBuscar = array();
		$datoBuscar['id_categoria'] = $datosAddProceso['id_categoria'];
		$resultado = $this->categoria->searchById('categoria', $datoBuscar)['resource'];
      
    
		if(!sizeof($resultado) == 0) {
			return true;
		}else{
			$this->respuesta = 'ID_CATEGORIA_NO_EXISTE';
			//throw new DNINoExisteException('DNI_NO_EXISTE');
}}
/*
        function existeIdProceso($datosAddProceso){
 
            $datoBuscar = array();
            $datoBuscar['id_proceso'] = $datosAddProceso['id_proceso'];
            $resultado = $this->proceso->getById('proceso', $datoBuscar)['resource'];
          
        
            if(!sizeof($resultado) == 0) {
                return true;
            }else{
                $this->respuesta = 'ID_PROCESO_NO_EXISTE';
                //throw new DNINoExisteException('DNI_NO_EXISTE');
            }}
*/
        function existeDNIUsuario($datosAddProceso){

            $datoBuscar = array();
            $datoBuscar['dni_persona'] = $datosAddProceso['dni_usuario'];
            $resultado = $this->persona->getByDNI('persona', $datoBuscar)['resource'];
            
            if(!sizeof($resultado) == 0) {
                return true;
            }else{
                $this->respuesta = 'DNI_USUARIO_NO_EXISTE';
                //throw new DNINoExisteException('DNI_NO_EXISTE');
}}
		
        
            
		

}
?>