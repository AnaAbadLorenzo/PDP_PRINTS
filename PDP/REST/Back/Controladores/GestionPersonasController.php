<?php

include_once './Controladores/ControllerBase.php';
include_once './Servicios/GestionPersonas/impl/GestionPersonasServiceImpl.php';
include_once './Validation/Atributo/Controlador/EditPersonaValidation.php';

class GestionPersonasController extends ControllerBase{

	private $gestionPersonasService;
	private $editPersonaValidation;

	public function __construct(){
		$this->gestionPersonasService = new GestionPersonasServiceImpl();
		$this->editPersonaValidation = new EditPersonaValidation();
	}

	function edit(){	
		try{

			$this->editPersonaValidation->validarEditPersona();
			$this->gestionPersonasService->inicializarParametros('edit');
           
			$respuesta = $this->gestionPersonasService->edit('EDIT_PERSONA_COMPLETO');
			$this->rellenarRespuesta('EDIT_PERSONA_CORRECTO', false, $respuesta);
			$this->getRespuesta($respuesta);

		}catch(AtributoIncorrectoException $exc){
			$this->rellenarRespuesta($exc->getMessage(), true, '');
		}catch(DNINoExisteException $exc){
			$this->rellenarRespuesta($exc->getMessage(), true, '');
		}
	}
    
    function delete(){
        try{

        $this->gestionPersonasService->inicializarParametros('delete');
        $respuesta = $this->gestionPersonasService->delete('DELETE_PERSONA_COMPLETO');
        $this->rellenarRespuesta('DELETE_PERSONA_CORRECTO', false, $respuesta);
        $this->getRespuesta($respuesta);

    }catch(DNINoExisteException $exc){
        $this->rellenarRespuesta($exc->getMessage(), true, '');
    }
    
    }
    function search(){
       
        $respuesta = $this->gestionPersonasService->search('BUSQUEDA_PERSONA_CORRECTO');
			$this->rellenarRespuesta('BUSQUEDA_PERSONA_CORRECTO', false, $respuesta);
			$this->getRespuesta($respuesta);
    }
    function searchBy(){

    }
}
?>