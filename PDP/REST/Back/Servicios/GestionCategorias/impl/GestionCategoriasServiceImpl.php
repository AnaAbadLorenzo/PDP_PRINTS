<?php

    include_once './Servicios/ServiceBase.php';
    include_once './Servicios/GestionCategorias/GestionCategoriasService.php';
    include_once './Mapping/CategoriaMapping.php';
    include_once './Mapping/UsuarioMapping.php';

class GestionCategoriasServiceImpl extends ServiceBase implements GestionCategoriasService {

        private $categoria_mapping;
        private $usuario_mapping;

        function inicializarParametros($accion){
            switch($accion){
                case 'add' :
                    $this->categoria = $this->crearModelo('Categoria');
				    $this->clase_validacionAccionCategoriaAdd = $this->crearValidacionAccion('AddCategoria'); 
                    $this->clase_validacionFormatoCategoria = $this->crearValidacionFormato('Categoria');
                case 'edit':
                    $this->categoria = $this->crearModelo('Categoria');
                    $this->clase_validacionAccionCategoria = $this->crearValidacionAccion('EditCategoria');
                    $this->clase_validacionFormatoCategoria = $this->crearValidacionFormato('Categoria');
                   
                    break;
                case 'delete':
            
                    $this->categoria = $this->crearModelo('Categoria');
                    $this->clase_validacionAccionDeleteCategoria = $this->crearValidacionAccion('DeleteCategoria');
                    break;
                case 'searchByParameters':
                    $this->categoria = $this->crearModelo('Categoria');
                    break;
                default:
                    break;
            }
        }

        function add($mensaje){

            $respuesta = '';

            if($this->categoria->nombre_categoria != null &&
            $this->categoria->descripcion_categoria != null &&
            $this->categoria->dni_responsable != null &&
            $this->categoria->dni_usuario != null 
           ){
                $datosCategoria = array();
                
                $datosCategoria['nombre_categoria'] = $this->categoria->nombre_categoria;
                $datosCategoria['descripcion_categoria'] = $this->categoria->descripcion_categoria;
                $datosCategoria['dni_responsable'] = $this->categoria->dni_responsable;
                $datosCategoria['id_padre_categoria'] = $this->categoria->id_padre_categoria;
                $datosCategoria['dni_usuario'] = $this->categoria->dni_usuario;
                $datosCategoria['borrado_categoria'] = 0;

                
                if ($this->clase_validacionFormatoCategoria != null) {
                    $this->clase_validacionFormatoCategoria->validarAtributosCategoria($datosCategoria);
                }
                //no hay que realizar ninguna premisa para insertar...
                if ($this->clase_validacionAccionCategoriaAdd != null){
                    $this->clase_validacionAccionCategoriaAdd->comprobarAddCategoria($datosCategoria);
                }
                
            
                if($this->clase_validacionFormatoCategoria->respuesta != null){
                    $respuesta = $this->clase_validacionFormatoCategoria->respuesta;
                }else if($this->clase_validacionAccionCategoriaAdd->respuesta != null){
                    $respuesta = $this->clase_validacionAccionCategoriaAdd->respuesta;
                }else{
                    $CategoriaDatos = [
                        'nombre_categoria' => $this->categoria->nombre_categoria,
                        'descripcion_categoria' => $this->categoria->descripcion_categoria,
                        'dni_responsable' => $this->categoria->dni_responsable,
                        'id_padre_categoria' => $this->categoria->id_padre_categoria,
                        'dni_usuario' => $this->categoria->dni_usuario,
                        'borrado_categoria' => 0
                    ];
                    if ($this->categoria->id_padre_categoria=="" || is_null($this->categoria->id_padre_categoria)){
                        $CategoriaDatos['id_padre_categoria']="null";  
                    }
          
                    $categoria_mapping = new CategoriaMapping();
                    $categoria_mapping->add($CategoriaDatos);

                    $respuesta = $mensaje;
                    $this->recursos = '';
                }

            }
        return $respuesta;
    
        }

        function edit($mensaje) {
           
                $respuesta = '';
                $datosEditCategoria = array();
                $datosEditCategoria['id_categoria'] = $this->categoria->id_categoria;
                $datosEditCategoria['nombre_categoria'] = $this->categoria->nombre_categoria;
                $datosEditCategoria['descripcion_categoria'] = $this->categoria->descripcion_categoria;
                $datosEditCategoria['dni_responsable'] = $this->categoria->dni_responsable;
                $datosEditCategoria['id_padre_categoria'] = $this->categoria->id_padre_categoria;
                $datosEditCategoria['dni_usuario'] = $this->categoria->dni_usuario;
                $datosEditCategoria['borrado_categoria'] = $this->categoria->borrado_categoria;

                
                if ($this->clase_validacionFormatoCategoria != null) {
                    $this->clase_validacionFormatoCategoria->validarAtributosCategoria($datosEditCategoria);
                }
                if ($this->clase_validacionAccionCategoria != null){
                    $this->clase_validacionAccionCategoria->comprobarEditCategoria($datosEditCategoria);
                }

                
                if($this->clase_validacionFormatoCategoria->respuesta != null){
                    $respuesta = $this->clase_validacionFormatoCategoria->respuesta;
                }else if($this->clase_validacionAccionCategoria->respuesta != null){
                    $respuesta = $this->clase_validacionAccionCategoria->respuesta;
                }else{

                    $CategoriaDatos = [
                        'id_categoria' => $this->categoria->id_categoria,
                        'nombre_categoria' => $this->categoria->nombre_categoria,
                        'descripcion_categoria' => $this->categoria->descripcion_categoria,
                        'dni_responsable' => $this->categoria->dni_responsable,
                        'id_padre_categoria' => $this->categoria->id_padre_categoria,
                        'dni_usuario' => $this->categoria->dni_usuario,
                        'borrado_categoria' => $this->categoria->borrado_categoria
                    ];
             
                    $categoria_mapping = new CategoriaMapping();
                    
                    if ($this->categoria->id_padre_categoria=="" || is_null($this->categoria->id_padre_categoria)){
                        $CategoriaDatos['id_padre_categoria']="null";  
                    }
                
                    $categoria_mapping->edit($CategoriaDatos);

                    $respuesta = $mensaje;
                    $this->recursos = '';
            }
           
            
            return $respuesta;
    
        }


        function delete($mensaje){
            
                $respuesta = '';
                $datosDeleteCategoria = array();
                $datosDeleteCategoria['id_categoria'] = $this->categoria->id_categoria;

                
                if($this->clase_validacionAccionDeleteCategoria != null) {
                $this->clase_validacionAccionDeleteCategoria->comprobarDeleteCategoria($datosDeleteCategoria);
                }
                if($this->clase_validacionAccionDeleteCategoria->respuesta != null){

                    $respuesta =  $this->clase_validacionAccionDeleteCategoria->respuesta;

                }else{
               
                $categoriaDatos = [
                    'id_categoria' => $datosDeleteCategoria['id_categoria'],
                    
                ];

                $categoria_mapping = new CategoriaMapping();
                $categoria_mapping->delete($categoriaDatos);
                $respuesta= $mensaje;
            }

            
            return $respuesta;
            
        }
    
        function search($mensaje){
           
            $categoria_mapping = new CategoriaMapping();
            $categoria_mapping->search();
            return $categoria_mapping->feedback['resource'];
           
        }

        function searchByParameters($mensaje){

            echo("llego");
            /*
            $respuesta = '';
            
                $datosSearchParameters = array();
                if($this->accion->nombre_accion===null){
                    $datosSearchParameters['nombre_accion'] = '';
                }else{
                    $datosSearchParameters['nombre_accion'] = $this->accion->nombre_accion;
                }
                if($this->accion->descripcion_accion===null){
                    $datosSearchParameters['descripcion_accion'] = '';
                }else{
                    $datosSearchParameters['descripcion_accion'] = $this->accion->descripcion_accion;
                }
                
                //$datosSearchParameters['borrado_persona'] = 0;
            $accion_mapping = new AccionMapping();
            $accion_mapping->searchByParameters($datosSearchParameters);
            return $this->accion_mapping->feedback['resource']; 
             */
        }
      
    }
?>