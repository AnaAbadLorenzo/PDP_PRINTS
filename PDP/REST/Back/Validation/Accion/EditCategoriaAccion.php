<?php

include_once './Validation/ValidacionesBase.php';
include_once './Comun/funcionesComunes.php';

class EditCategoriaAccion extends ValidacionesBase{

	
	private $persona;
	public $respuesta;
    public $usuario;
    public $categoria;

	function __construct()
	{
		$this->persona = new PersonaModel();
        $this->usuario = new UsuarioModel();
        $this->categoria = new CategoriaModel();
	}
	function comprobarEditCategoria($datosEditCategoria){

		
		$this->existeDNIResponsable($datosEditCategoria);
		$this->existeDNIUsuario($datosEditCategoria);
        if($datosEditCategoria['id_padre_categoria'] != null){
            $this->existeIdCategoriaPadre($datosEditCategoria);
        }
        $this->existeIdCategoria($datosEditCategoria);
	}

function existeDNIResponsable($datosEditCategoria){
 
		$datoBuscar = array();
		$datoBuscar['dni_persona'] = $datosEditCategoria['dni_responsable'];
		$resultado = $this->persona->getByDNI('persona', $datoBuscar)['resource'];
      
    
		if(!sizeof($resultado) == 0) {
			return true;
		}else{
			$this->respuesta = 'DNI_RESPONSABLE_NO_EXISTE';
			//throw new DNINoExisteException('DNI_NO_EXISTE');
		}}

        function existeDNIUsuario($datosEditCategoria){

            $datoBuscar = array();
            $datoBuscar['dni_persona'] = $datosEditCategoria['dni_usuario'];
            $resultado = $this->persona->getByDNI('persona', $datoBuscar)['resource'];
            
            if(!sizeof($resultado) == 0) {
                return true;
            }else{
                $this->respuesta = 'DNI_USUARIO_NO_EXISTE';
                //throw new DNINoExisteException('DNI_NO_EXISTE');
            }}
		
           function existeIdCategoriaPadre($datosEditCategoria){
        
                $datoBuscar = array();
                $datoBuscar['id_padre_categoria'] = $datosEditCategoria['id_padre_categoria'];
                $resultado = $this->categoria->searchByIdPadre('categoria', $datoBuscar)['resource'];
                
                if(!sizeof($resultado) == 0 || $datosEditCategoria['id_padre_categoria']=="" || is_null($datosEditCategoria['id_padre_categoria'])) {
                    return true;
                }else{
                    $this->respuesta = 'ID_CATEGORIA_PADRE_NO_EXISTE';
                    //throw new DNINoExisteException('DNI_NO_EXISTE');
                }}

                function existeIdCategoria($datosEditCategoria){

                    $datoBuscar = array();
                    $datoBuscar['id_categoria'] = $datosEditCategoria['id_categoria'];
                    $resultado = $this->categoria->searchById('categoria', $datoBuscar)['resource'];
                
                    if(!sizeof($resultado) == 0) {
                        return true;
                    }else{
                        $this->respuesta = 'ID_CATEGORIA_NO_EXISTE';
                        //throw new DNINoExisteException('DNI_NO_EXISTE');
                    }}
            
		

}
?>