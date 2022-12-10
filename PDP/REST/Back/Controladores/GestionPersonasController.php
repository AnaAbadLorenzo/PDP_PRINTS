<?php

include_once './Controladores/ControllerBase.php';
include_once './Servicios/GestionPersonas/impl/GestionPersonasServiceImpl.php';
include_once './Validation/Atributo/Controlador/EditPersonaValidation.php';
include_once './Validation/Atributo/Controlador/RegistroValidation.php';
include_once './Servicios/Comun/Paginacion.php';

class GestionPersonasController extends ControllerBase{

	private $gestionPersonasService;
	private $editPersonaValidation;
	private $registroValidation;

	public function __construct(){
		$this->gestionPersonasService = new GestionPersonasServiceImpl();
		$this->editPersonaValidation = new EditPersonaValidation();
		$this->registroValidation = new RegistroValidation();

	}
	function add(){

		$this->registroValidation->validarRegistro();	

		if($this->registroValidation->respuesta != ''){
			$this->rellenarRespuesta($this->registroValidation->respuesta, true, '');
		}
		
		$this->gestionPersonasService->inicializarParametros('add');
		
		$respuesta = $this->gestionPersonasService->add('ADD_PERSONA_COMPLETO');

		if($respuesta != 'ADD_PERSONA_COMPLETO') {
				$this->rellenarRespuesta($respuesta, true, '');
			}else{
				$this->rellenarRespuesta('ADD_PERSONA_COMPLETO', false, '');
			}
		$this->getRespuesta($respuesta);

	}

	function edit(){	

			$this->editPersonaValidation->validarEditPersona();

			if($this->editPersonaValidation->respuesta){
				$this->rellenarRespuesta($this->editPersonaValidation->respuesta, true, '');
			}
			
			$this->gestionPersonasService->inicializarParametros('edit');
           
			$respuesta = $this->gestionPersonasService->edit('EDIT_PERSONA_COMPLETO');
			

			if($respuesta != 'EDIT_PERSONA_COMPLETO') {
				$this->rellenarRespuesta($respuesta, true, '');
			}else{
				$this->rellenarRespuesta('EDIT_PERSONA_COMPLETO', false, '');
			}
			$this->getRespuesta($respuesta);
		
	}
    
    function delete(){
        $this->gestionPersonasService->inicializarParametros('delete');
        $respuesta = $this->gestionPersonasService->delete('DELETE_PERSONA_COMPLETO');

        if($respuesta != 'DELETE_PERSONA_COMPLETO') {
			$this->rellenarRespuesta($respuesta, true, '');
		}else{
			$this->rellenarRespuesta('DELETE_PERSONA_COMPLETO', false, '');
		}
		$this->getRespuesta($respuesta);
    }
    function search(){
		$paginacion = new Paginacion($_POST['inicio'], $_POST['tamanhoPagina']);
        $respuesta = $this->gestionPersonasService->search('BUSQUEDA_PERSONA_CORRECTO', $paginacion);
		$this->rellenarRespuesta('BUSQUEDA_PERSONA_CORRECTO', false, $respuesta);
		$this->getRespuesta($respuesta);
    }
    function searchByParameters(){
		$paginacion = new Paginacion($_POST['inicio'], $_POST['tamanhoPagina']);
		$this->gestionPersonasService->inicializarParametros('searchByParameters');
		$respuesta = $this->gestionPersonasService->searchByParameters('BUSQUEDA_PERSONA_CORRECTO', $paginacion);
		$this->rellenarRespuesta('BUSQUEDA_PERSONA_CORRECTO', false, $respuesta);
		$this->getRespuesta($respuesta);
    }
}
?>