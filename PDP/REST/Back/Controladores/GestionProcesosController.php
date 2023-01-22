<?php

include_once './Controladores/ControllerBase.php';
include_once './Servicios/GestionProcesos/impl/GestionProcesosServiceImpl.php';
include_once './Validation/Atributo/Controlador/AddProcesoValidation.php';
include_once './Validation/Atributo/Controlador/RegistroValidation.php';
include_once './Servicios/Comun/Paginacion.php';

class GestionProcesosController extends ControllerBase{

	private $gestionProcesoService;
	private $addProcesoValidation;
	private $registroValidation;

	public function __construct(){
		$this->gestionProcesoService = new GestionProcesosServiceImpl();
        $this->addProcesoValidation = new AddProcesoValidation();
		//$this->editProcesoValidation = new EditProcesoValidation();
		

	}
    
	function add(){

		$this->addProcesoValidation->validarAddProceso();	

		if($this->addProcesoValidation->respuesta != ''){
			$this->rellenarRespuesta($this->addProcesoValidation->respuesta, true, '');
		}
		
		$this->gestionProcesoService->inicializarParametros('add');

		$respuesta = $this->gestionProcesoService->add('ADD_PROCESO_COMPLETO');

		if($respuesta != 'ADD_PROCESO_COMPLETO') {
				$this->rellenarRespuesta($respuesta, true, '');
			}else{
				$this->rellenarRespuesta('ADD_PROCESO_COMPLETO', false, '');
			}
		$this->getRespuesta($respuesta);

	}

	function edit(){	

			$this->addProcesoValidation->validarAddProceso();

			if($this->addProcesoValidation->respuesta != ''){
                $this->rellenarRespuesta($this->addProcesoValidation->respuesta, true, '');
            }
			
			$this->gestionProcesoService->inicializarParametros('edit');
           
			$respuesta = $this->gestionProcesoService->edit('EDIT_PROCESO_COMPLETO');
			

			if($respuesta != 'EDIT_PROCESO_COMPLETO') {
				$this->rellenarRespuesta($respuesta, true, '');
			}else{
				$this->rellenarRespuesta('EDIT_PROCESO_COMPLETO', false, '');
			}
			$this->getRespuesta($respuesta);
		
	}
   
    function delete(){
        $this->gestionProcesoService->inicializarParametros('delete');
        $respuesta = $this->gestionProcesoService->delete('DELETE_PROCESO_COMPLETO');

        if($respuesta != 'DELETE_PROCESO_COMPLETO') {
			$this->rellenarRespuesta($respuesta, true, '');
		}else{
			$this->rellenarRespuesta('DELETE_PROCESO_COMPLETO', false, '');
		}
		$this->getRespuesta($respuesta);
    }

	function search(){
		$paginacion = new Paginacion($_POST['inicio'], $_POST['tamanhoPagina']);
        $respuesta = $this->gestionProcesoService->search('BUSQUEDA_PROCESO_CORRECTO', $paginacion);
		$this->rellenarRespuesta('BUSQUEDA_PROCESO_CORRECTO', false, $respuesta);
		$this->getRespuesta($respuesta);
    }

    function searchAll(){
        $respuesta = $this->gestionProcesoService->searchAll('BUSQUEDA_PROCESO_CORRECTO');
			$this->rellenarRespuesta('BUSQUEDA_PROCESO_CORRECTO', false, $respuesta);
			$this->getRespuesta($respuesta);
    }

    function searchByParameters(){
		$paginacion = new Paginacion($_POST['inicio'], $_POST['tamanhoPagina']);
		$this->gestionProcesoService->inicializarParametros('searchByParameters');
		$respuesta = $this->gestionProcesoService->searchByParameters('BUSQUEDA_PROCESO_CORRECTO', $paginacion);
		$this->rellenarRespuesta('BUSQUEDA_PROCESO_CORRECTO', false, $respuesta);
		$this->getRespuesta($respuesta);
    }

	function searchDelete(){
		$paginacion = new Paginacion($_POST['inicio'], $_POST['tamanhoPagina']);
        $respuesta = $this->gestionProcesoService->searchDelete('BUSQUEDA_PROCESO_CORRECTO', $paginacion);
		$this->rellenarRespuesta('BUSQUEDA_PROCESO_CORRECTO', false, $respuesta);
		$this->getRespuesta($respuesta);
    }

	function searchByIdCategoria(){
		$paginacion = new Paginacion($_POST['inicio'], $_POST['tamanhoPagina']);
		$this->gestionProcesoService->inicializarParametros('searchByIdCategoria');
		$respuesta = $this->gestionProcesoService->searchByIdCategoria('BUSQUEDA_PROCESO_CORRECTO', $paginacion);
		$this->rellenarRespuesta('BUSQUEDA_PROCESO_CORRECTO', false, $respuesta);
		$this->getRespuesta($respuesta);
	}

	function reactivar() {

		$this -> gestionProcesoService -> inicializarParametros('reactivar');
		$respuesta = $this -> gestionProcesoService -> reactivar();

		if (!is_array($respuesta)) { //cuando ocurre un error de validacion
			$this->rellenarRespuesta($respuesta, false, $respuesta);
			$this->getRespuesta($respuesta);
		} else if (!$respuesta['ok']) { //error sql
			$this->rellenarRespuesta('REACTIVAR_PROCESO_FALLIDO', true, $respuesta);
			$this->getRespuesta($respuesta);
		} else {
			$this->rellenarRespuesta('REACTIVAR_PROCESO_CORRECTO', false, $respuesta);
			$this->getRespuesta($respuesta);
		}

	}
    
}
?>