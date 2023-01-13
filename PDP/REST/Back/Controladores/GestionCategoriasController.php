<?php

include_once './Controladores/ControllerBase.php';
include_once './Servicios/GestionCategorias/impl/GestionCategoriasServiceImpl.php';
include_once './Validation/Atributo/Controlador/AddCategoriaValidation.php';
include_once './Validation/Atributo/Controlador/RegistroValidation.php';
include_once './Servicios/Comun/Paginacion.php';

class GestionCategoriasController extends ControllerBase{

	private $gestionCategoriaService;
	private $addCategoriaValidation;

	public function __construct(){
		$this->gestionCategoriaService = new GestionCategoriasServiceImpl();
        $this->addCategoriaValidation = new AddCategoriaValidation();
	}
    
	function add(){

		$this->addCategoriaValidation->validarAddCategoria();	

		if($this->addCategoriaValidation->respuesta != ''){
			$this->rellenarRespuesta($this->addCategoriaValidation->respuesta, true, '');
		}
		
		$this->gestionCategoriaService->inicializarParametros('add');
		
		$respuesta = $this->gestionCategoriaService->add('ADD_CATEGORIA_COMPLETO');
		if($respuesta != 'ADD_CATEGORIA_COMPLETO') {
			$this->rellenarRespuesta($respuesta, true, '');
		}else{
			$this->rellenarRespuesta($respuesta, false, '');
		}
		$this->getRespuesta($respuesta);
	}

	function edit(){	

			$this->addCategoriaValidation->validarAddCategoria();

			if($this->addCategoriaValidation->respuesta != ''){
                $this->rellenarRespuesta($this->addCategoriaValidation->respuesta, true, '');
            }
			
			$this->gestionCategoriaService->inicializarParametros('edit');
           
			$respuesta = $this->gestionCategoriaService->edit('EDIT_CATEGORIA_COMPLETO');
			

			if($respuesta != 'EDIT_CATEGORIA_COMPLETO') {
				$this->rellenarRespuesta($respuesta, true, '');
			}else{
				$this->rellenarRespuesta('EDIT_CATEGORIA_COMPLETO', false, '');
			}
			$this->getRespuesta($respuesta);
		
	}
   
    function delete(){

        $this->gestionCategoriaService->inicializarParametros('delete');
        $respuesta = $this->gestionCategoriaService->delete('DELETE_CATEGORIA_COMPLETO');

        if($respuesta != 'DELETE_CATEGORIA_COMPLETO') {
			$this->rellenarRespuesta($respuesta, true, '');
		}else{
			$this->rellenarRespuesta('DELETE_CATEGORIA_COMPLETO', false, '');
		}
		$this->getRespuesta($respuesta);
   
    }

    function search(){
		$paginacion = new Paginacion($_POST['inicio'], $_POST['tamanhoPagina']);
        $respuesta = $this->gestionCategoriaService->search('BUSQUEDA_CATEGORIA_CORRECTO', $paginacion);
		$this->rellenarRespuesta('BUSQUEDA_CATEGORIA_CORRECTO', false, $respuesta);
		$this->getRespuesta($respuesta);
    }

	function searchDelete(){
		$paginacion = new Paginacion($_POST['inicio'], $_POST['tamanhoPagina']);
        $respuesta = $this->gestionCategoriaService->searchDelete('BUSQUEDA_CATEGORIA_CORRECTO', $paginacion);
		$this->rellenarRespuesta('BUSQUEDA_CATEGORIA_CORRECTO', false, $respuesta);
		$this->getRespuesta($respuesta);
    }

	function searchAllWithoutPagination(){
        $respuesta = $this->gestionCategoriaService->searchAllWithoutPagination('BUSQUEDA_CATEGORIA_CORRECTO');
		$this->rellenarRespuesta('BUSQUEDA_CATEGORIA_CORRECTO', false, $respuesta);
		$this->getRespuesta($respuesta);
    }

    function searchByParameters(){
   
		$paginacion = new Paginacion($_POST['inicio'], $_POST['tamanhoPagina']);
		$this->gestionCategoriaService->inicializarParametros('searchByParameters');
		$respuesta = $this->gestionCategoriaService->searchByParameters('BUSQUEDA_CATEGORIA_CORRECTO', $paginacion);
		$this->rellenarRespuesta('BUSQUEDA_CATEGORIA_CORRECTO', false, $respuesta);
		$this->getRespuesta($respuesta);
    }

	function reactivar() {

		$this -> gestionCategoriaService -> inicializarParametros('reactivar');
		$respuesta = $this -> gestionCategoriaService -> reactivar();

		if (!is_array($respuesta)) { //cuando ocurre un error de validacion
			$this->rellenarRespuesta($respuesta, false, $respuesta);
			$this->getRespuesta($respuesta);
		} else if (!$respuesta['ok']) { //error sql
			$this->rellenarRespuesta('REACTIVAR_CATEGORIA_FALLIDO', true, $respuesta);
			$this->getRespuesta($respuesta);
		} else {
			$this->rellenarRespuesta('REACTIVAR_CATEGORIA_CORRECTO', false, $respuesta);
			$this->getRespuesta($respuesta);
		}

	}
    
}
?>