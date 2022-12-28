<?php

include_once './Controladores/ControllerBase.php';
include_once './Servicios/GestionAcciones/impl/GestionAccionesServiceImpl.php';
include_once './Validation/Atributo/Controlador/EditAccionValidation.php';
include_once './Validation/Atributo/Controlador/RegistroValidation.php';
include_once './Servicios/Comun/Paginacion.php';

class GestionAccionesController extends ControllerBase{

	private $gestionAccionService;
	private $editAccionValidation;
	
	public function __construct(){
		$this->gestionAccionService = new GestionAccionesServiceImpl();
		$this->editAccionValidation = new EditAccionValidation();
	}

	function add(){
		$this->editAccionValidation->validarEditAccion();	

		if($this->editAccionValidation->respuesta != ''){
			$this->rellenarRespuesta($this->editAccionValidation->respuesta, true, '');
		}
		
		$this->gestionAccionService->inicializarParametros('add');
		
		$respuesta = $this->gestionAccionService->add('ADD_ACCION_COMPLETO');

		if($respuesta != 'ADD_ACCION_COMPLETO') {
				$this->rellenarRespuesta($respuesta, true, '');
			}else{
				$this->rellenarRespuesta('ADD_ACCION_COMPLETO', false, '');
			}
		
		$this->getRespuesta($respuesta);
	}

	function edit(){	

			$this->editAccionValidation->validarEditAccion();

			if($this->editAccionValidation->respuesta != ''){
                $this->rellenarRespuesta($this->editAccionValidation->respuesta, true, '');
            }
			
			$this->gestionAccionService->inicializarParametros('edit');
           
			$respuesta = $this->gestionAccionService->edit('EDIT_ACCION_COMPLETO');
			

			if($respuesta != 'EDIT_ACCION_COMPLETO') {
				$this->rellenarRespuesta($respuesta, true, '');
			}else{
				$this->rellenarRespuesta('EDIT_ACCION_COMPLETO', false, '');
			}
			$this->getRespuesta($respuesta);
		
	}
    
    function delete(){
   

        $this->gestionAccionService->inicializarParametros('delete');
        $respuesta = $this->gestionAccionService->delete('DELETE_ACCION_COMPLETO');

        if($respuesta != 'DELETE_ACCION_COMPLETO') {
			$this->rellenarRespuesta($respuesta, true, '');
		}else{
			$this->rellenarRespuesta('DELETE_ACCION_COMPLETO', false, '');
		}
		$this->getRespuesta($respuesta);

   
    }
    
	function search(){
		$paginacion = new Paginacion($_POST['inicio'], $_POST['tamanhoPagina']);
        $respuesta = $this->gestionAccionService->search('BUSQUEDA_ACCION_CORRECTO', $paginacion);
			$this->rellenarRespuesta('BUSQUEDA_ACCION_CORRECTO', false, $respuesta);
			$this->getRespuesta($respuesta);
    }

    function searchByParameters(){

		$paginacion = new Paginacion($_POST['inicio'], $_POST['tamanhoPagina']);
		$this->gestionAccionService->inicializarParametros('searchByParameters');
		$respuesta = $this->gestionAccionService->searchByParameters('BUSQUEDA_ACCION_CORRECTO', $paginacion);
		$this->rellenarRespuesta('BUSQUEDA_ACCION_CORRECTO', false, $respuesta);
		$this->getRespuesta($respuesta);

    }

	function searchDelete(){
		$paginacion = new Paginacion($_POST['inicio'], $_POST['tamanhoPagina']);
        $respuesta = $this->gestionAccionService->searchDelete('BUSQUEDA_ACCION_CORRECTO', $paginacion);
			$this->rellenarRespuesta('BUSQUEDA_ACCIONES_ELIMINADAS_CORRECTO', false, $respuesta);
			$this->getRespuesta($respuesta);
    }

	function reactivar() {

		$this -> gestionAccionService -> inicializarParametros('reactivar');
		$respuesta = $this -> gestionAccionService -> reactivar();

		if (!is_array($respuesta)) { //cuando ocurre un error de validacion
			$this->rellenarRespuesta($respuesta, false, $respuesta);
			$this->getRespuesta($respuesta);
		} else if (!$respuesta['ok']) { //error sql
			$this->rellenarRespuesta('REACTIVAR_ACCION_FALLIDO', true, $respuesta);
			$this->getRespuesta($respuesta);
		} else {
			$this->rellenarRespuesta('REACTIVAR_ACCION_CORRECTO', false, $respuesta);
			$this->getRespuesta($respuesta);
		}

	}

}
?>