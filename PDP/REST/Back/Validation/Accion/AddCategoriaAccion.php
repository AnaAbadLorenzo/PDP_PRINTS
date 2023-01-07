<?php

include_once './Validation/ValidacionesBase.php';
include_once './Comun/funcionesComunes.php';

class AddCategoriaAccion extends ValidacionesBase{

	
	private $persona;
	public $respuesta;
    private $usuario;
    private $categoria;

	function __construct()
	{
		$this->persona = new PersonaModel();
        $this->usuario = new UsuarioModel();
        $this->categoria = new CategoriaModel();
	}
	function comprobarAddCategoria($datosAddCategoria){

		$this->existeDNIResponsable($datosAddCategoria);
		$this->existeDNIUsuario($datosAddCategoria);
        $this->existeIdCategoriaPadre($datosAddCategoria);
	}

function existeDNIResponsable($datosAddCategoria){
 
		$datoBuscar = array();
		$datoBuscar['dni_persona'] = $datosAddCategoria['dni_responsable'];
		$resultado = $this->persona->getByDNI('persona', $datoBuscar)['resource'];
      
    
		if(!sizeof($resultado) == 0) {
			return true;
		}else{
			$this->respuesta = 'DNI_RESPONSABLE_NO_EXISTE';
			//throw new DNINoExisteException('DNI_NO_EXISTE');
		}}

        function existeDNIUsuario($datosAddCategoria){

            $datoBuscar = array();
            $datoBuscar['dni_persona'] = $datosAddCategoria['dni_usuario'];
            $resultado = $this->persona->getByDNI('persona', $datoBuscar)['resource'];
            
            if(!sizeof($resultado) == 0) {
                return true;
            }else{
                $this->respuesta = 'DNI_USUARIO_NO_EXISTE';
                //throw new DNINoExisteException('DNI_NO_EXISTE');
            }}
		
           function existeIdCategoriaPadre($datosAddCategoria){

                $datoBuscar = array();
                $datoBuscar['id_padre_categoria'] = $datosAddCategoria['id_padre_categoria'];
                $resultado = $this->categoria->searchByIdPadre('categoria', $datoBuscar)['resource'];
            
                if(!sizeof($resultado) == 0 || $datosAddCategoria['id_padre_categoria']=="" || is_null($datosAddCategoria['id_padre_categoria'])) {
                    return true;
                }else{
                    $this->respuesta = 'ID_CATEGORIA_PADRE_NO_EXISTE';
                    //throw new DNINoExisteException('DNI_NO_EXISTE');
                }}
            
		

}
?>