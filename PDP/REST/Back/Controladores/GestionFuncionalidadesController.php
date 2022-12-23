<?php

include_once './Controladores/ControllerBase.php';
include_once './Servicios/GestionFuncionalidades/impl/GestionFuncionalidadesServiceImpl.php';
include_once './Validation/Atributo/Controlador/EditFuncionalidadValidation.php';
include_once './Validation/Atributo/Controlador/RegistroValidation.php';
include_once './Servicios/Comun/Paginacion.php';

class GestionFuncionalidadesController extends ControllerBase{

	private $gestionFuncionalidadService;
	private $editFuncionalidadValidation;

	public function __construct(){
		$this->gestionFuncionalidadService = new GestionFuncionalidadesServiceImpl();
		$this->editFuncionalidadValidation = new EditFuncionalidadValidation();
	}
    
	function add(){

		$this->editFuncionalidadValidation->validarEditFuncionalidad();	

		if($this->editFuncionalidadValidation->respuesta != ''){
			$this->rellenarRespuesta($this->editFuncionalidadValidation->respuesta, true, '');
		}
		
		$this->gestionFuncionalidadService->inicializarParametros('add');
		
		$respuesta = $this->gestionFuncionalidadService->add('ADD_FUNCIONALIDAD_COMPLETO');

		if($respuesta != 'ADD_FUNCIONALIDAD_COMPLETO') {
				$this->rellenarRespuesta($respuesta, true, '');
			}else{
				$this->rellenarRespuesta('ADD_FUNCIONALIDAD_COMPLETO', false, '');
			}
		$this->getRespuesta($respuesta);

	}

	function edit(){	

		$this->editFuncionalidadValidation->validarEditFuncionalidad();

		if($this->editFuncionalidadValidation->respuesta != ''){
            $this->rellenarRespuesta($this->editFuncionalidadValidation->respuesta, true, '');
        }
			
		$this->gestionFuncionalidadService->inicializarParametros('edit');
           
		$respuesta = $this->gestionFuncionalidadService->edit('EDIT_FUNCIONALIDAD_COMPLETO');
			

		if($respuesta != 'EDIT_FUNCIONALIDAD_COMPLETO') {
			$this->rellenarRespuesta($respuesta, true, '');
		}else{
			$this->rellenarRespuesta('EDIT_FUNCIONALIDAD_COMPLETO', false, '');
		}
		$this->getRespuesta($respuesta);
	}
   
    function delete(){

        $this->gestionFuncionalidadService->inicializarParametros('delete');
        $respuesta = $this->gestionFuncionalidadService->delete('DELETE_FUNCIONALIDAD_COMPLETO');

        if($respuesta != 'DELETE_FUNCIONALIDAD_COMPLETO') {
			$this->rellenarRespuesta($respuesta, true, '');
		}else{
			$this->rellenarRespuesta('DELETE_FUNCIONALIDAD_COMPLETO', false, '');
		}
		$this->getRespuesta($respuesta);

   
    }

    function search(){
		$paginacion = new Paginacion($_POST['inicio'], $_POST['tamanhoPagina']);
        $respuesta = $this->gestionFuncionalidadService->search('BUSQUEDA_FUNCIONALIDAD_CORRECTO', $paginacion);
		$this->rellenarRespuesta('BUSQUEDA_FUNCIONALIDAD_CORRECTO', false, $respuesta);
		$this->getRespuesta($respuesta);
    }

	function searchDelete(){
		$paginacion = new Paginacion($_POST['inicio'], $_POST['tamanhoPagina']);
        $respuesta = $this->gestionFuncionalidadService->searchDelete('BUSQUEDA_FUNCIONALIDAD_CORRECTO', $paginacion);
		$this->rellenarRespuesta('BUSQUEDA_FUNCIONALIDAD_ELIMINADA_CORRECTO', false, $respuesta);
		$this->getRespuesta($respuesta);
    }

    function searchByParameters(){
		$paginacion = new Paginacion($_POST['inicio'], $_POST['tamanhoPagina']);
		$this->gestionFuncionalidadService->inicializarParametros('searchByParameters');
		$respuesta = $this->gestionFuncionalidadService->searchByParameters('BUSQUEDA_FUNCIONALIDAD_CORRECTO', $paginacion);
		$this->rellenarRespuesta('BUSQUEDA_FUNCIONALIDAD_CORRECTO', false, $respuesta);
		$this->getRespuesta($respuesta);
    }
    
}
?>