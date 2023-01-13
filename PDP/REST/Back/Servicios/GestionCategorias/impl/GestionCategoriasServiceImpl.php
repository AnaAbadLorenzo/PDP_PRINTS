<?php

    include_once './Servicios/ServiceBase.php';
    include_once './Servicios/GestionCategorias/GestionCategoriasService.php';
    include_once './Mapping/CategoriaMapping.php';
    include_once './Mapping/UsuarioMapping.php';
    include_once './Mapping/ProcesoMapping.php';
    include_once './Servicios/Comun/ReturnBusquedas.php';

class GestionCategoriasServiceImpl extends ServiceBase implements GestionCategoriasService {
        
        private $categoria;
        private $clase_validacionAccionCategoria;
        private $clase_validacionFormatoCategoria;
        public $recursos;

        function inicializarParametros($accion){
            switch($accion){
                case 'add' :
                    $this->categoria = $this->crearModelo('Categoria');
				    $this->clase_validacionAccionCategoria = $this->crearValidacionAccion('AddCategoria'); 
                    $this->clase_validacionFormatoCategoria = $this->crearValidacionFormato('Categoria');
                break;
                case 'edit':
                    $this->categoria = $this->crearModelo('Categoria');
                    $this->clase_validacionAccionCategoria = $this->crearValidacionAccion('EditCategoria');
                    $this->clase_validacionFormatoCategoria = $this->crearValidacionFormato('Categoria');
                break;
                case 'delete':
                    $this->categoria = $this->crearModelo('Categoria');
                    $this->clase_validacionAccionCategoria = $this->crearValidacionAccion('DeleteCategoria');
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
                $this->categoria->dni_responsable != null){
                
                $datosCategoria = array();
                $datosUsuario = array();
                $datosUsuario['usuario'] = $this->categoria->usuario;

                $usuario_mapping = new UsuarioMapping();
                $usuario_mapping->searchByLogin($datosUsuario);
                $resultadoUsuario = $usuario_mapping->feedback['resource'];
     
                $datosCategoria['nombre_categoria'] = $this->categoria->nombre_categoria;
                $datosCategoria['descripcion_categoria'] = $this->categoria->descripcion_categoria;
                $datosCategoria['dni_responsable'] = $this->categoria->dni_responsable;
                $datosCategoria['id_padre_categoria'] = $this->categoria->id_padre_categoria;

                //$datosCategoria['dni_usuario'] = $this->categoria->usuario;
                $datosCategoria['dni_usuario'] = $resultadoUsuario['dni_usuario'];
                $datosCategoria['borrado_categoria'] = 0;

                
                if ($this->clase_validacionFormatoCategoria != null) {
                    $this->clase_validacionFormatoCategoria->validarAtributosCategoria($datosCategoria);
                }
               
                if ($this->clase_validacionAccionCategoria != null){
                    $this->clase_validacionAccionCategoria->comprobarAddCategoria($datosCategoria);
                }
                
                if($this->clase_validacionFormatoCategoria->respuesta != null){
                    $respuesta = $this->clase_validacionFormatoCategoria->respuesta;
                }else if($this->clase_validacionAccionCategoria->respuesta != null){
                    $respuesta = $this->clase_validacionAccionCategoria->respuesta;
                }else{
                    $categoriaDatos = [
                        'nombre_categoria' => $this->categoria->nombre_categoria,
                        'descripcion_categoria' => $this->categoria->descripcion_categoria,
                        'dni_responsable' => $this->categoria->dni_responsable,
                        'id_padre_categoria' => $this->categoria->id_padre_categoria,
                        'dni_usuario' => $resultadoUsuario['dni_usuario'],
                        'borrado_categoria' => 0
                    ];
                    if ($this->categoria->id_padre_categoria== "" || is_null($this->categoria->id_padre_categoria)){

                        $categoriaDatos['id_padre_categoria']= "null";  

                    }else{
                        $categoria_mapping = new CategoriaMapping();
                        $categoria_mapping->add($categoriaDatos);
                        $categoria_mapping->searchByParametersWithoutPagination($categoriaDatos);
                        $categoriaInsertada = $categoria_mapping->feedback['resource'];
                        $proceso_mapping = new ProcesoMapping();
                        $proceso_mapping->getProcesosWhitIdCategoria($categoriaDatos);
                        $procesosACambiar = $proceso_mapping->feedback['resource'];
                        	
	
                        if(!is_null($procesosACambiar)){
                         foreach($procesosACambiar as $p){
                          
                            $p['id_categoria'] =  $categoriaInsertada[0]['id_categoria'];
                            $proceso_mapping->edit($p);
                         }
                        }
                    }
                    
                   

                   

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
                        $CategoriaDatos['id_padre_categoria']= "null";  
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

                
                if($this->clase_validacionAccionCategoria != null) {
                    $this->clase_validacionAccionCategoria->comprobarDeleteCategoria($datosDeleteCategoria);
                }
                if($this->clase_validacionAccionCategoria->respuesta != null){
                    $respuesta =  $this->clase_validacionAccionCategoria->respuesta;
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
    
        function search($mensaje, $paginacion){
            $categoria_mapping = new CategoriaMapping();
            $categoria_mapping->search($paginacion);
            $datosCategoria =  $categoria_mapping->feedback['resource'];
            $datosUsuario = $this->searchForeignKeys();

            $datosADevolver = array();
            $datosUsuarioDev = array();
            foreach($datosUsuario as $usuario){
                foreach($datosCategoria as $categoria){
                    if($usuario['dni_usuario'] == $categoria['dni_responsable']){
                        $datosUsuarioDev['categoria'] = $categoria;
                        $datosUsuarioDev['responsable'] = $usuario;
                        $categoria_mapping->searchAll();
                        $categoriasPadres = $categoria_mapping->feedback['resource'];
                        foreach($categoriasPadres as $padres){
                            if($categoria['id_padre_categoria'] != null && $categoria['id_padre_categoria'] == $padres['id_categoria']){
                                $datosUsuarioDev['categoria_padre'] = $padres;
                            }
                        }
                        array_push($datosADevolver, $datosUsuarioDev);
                    }
                }
            }
            $returnBusquedas = new ReturnBusquedas($datosADevolver, '',
                        $this->numberFindAll()["COUNT(*)"],sizeof($categoria_mapping->feedback['resource']), $paginacion->inicio);

            return $returnBusquedas;
           
        }

        function searchAllWithoutPagination(){
            $categoria_mapping = new CategoriaMapping();
            $categoria_mapping->searchAll();
            $datosCategoria =  $categoria_mapping->feedback['resource'];
            $datosUsuario = $this->searchForeignKeys();

            $datosADevolver = array();
            $datosUsuarioDev = array();
            foreach($datosUsuario as $usuario){
                foreach($datosCategoria as $categoria){
                    if($usuario['dni_usuario'] == $categoria['dni_responsable']){
                        $datosUsuarioDev['categoria'] = $categoria;
                        $datosUsuarioDev['responsable'] = $usuario;
                        $categoria_mapping->searchAll();
                        $categoriasPadres = $categoria_mapping->feedback['resource'];
                        foreach($categoriasPadres as $padres){
                            if($categoria['id_padre_categoria'] != null && $categoria['id_padre_categoria'] == $padres['id_categoria']){
                                $datosUsuarioDev['categoria_padre'] = $padres;
                            }
                        }
                        array_push($datosADevolver, $datosUsuarioDev);
                    }
                }
            }
            $returnBusquedas = new ReturnBusquedas($datosADevolver, '',
                        $this->numberFindAll()["COUNT(*)"],sizeof($categoria_mapping->feedback['resource']), '');

            return $returnBusquedas;
           
        }

        function searchByParameters($mensaje, $paginacion){
          
            $respuesta = '';
            
            $datosSearchParameters = array();
            if($this->categoria->nombre_categoria===null || $this->categoria->nombre_categoria === ""){
                $datosSearchParameters['nombre_categoria'] = '';
            }else{
                $datosSearchParameters['nombre_categoria'] = $this->categoria->nombre_categoria;
            }
            if($this->categoria->descripcion_categoria===null){
                $datosSearchParameters['descripcion_categoria'] = '';
            }else{
                $datosSearchParameters['descripcion_categoria'] = $this->categoria->descripcion_categoria;
            }
            if($this->categoria->dni_responsable===null || $this->categoria->dni_responsable==='0'){
                $datosSearchParameters['dni_responsable'] = '';
            }else{
                $datosSearchParameters['dni_responsable'] = $this->categoria->dni_responsable;
            }
            if($this->categoria->id_padre_categoria===null || $this->categoria->id_padre_categoria==='0'){
                $datosSearchParameters['id_padre_categoria'] = '';
            }else{
                $datosSearchParameters['id_padre_categoria'] = $this->categoria->id_padre_categoria;
            }
            
            $datosSearchParameters['borrado_categoria'] = 0;
        
        $categoria_mapping= new CategoriaMapping();
        $categoria_mapping->searchByParameters($datosSearchParameters, $paginacion);
        $datosCategoria =  $categoria_mapping->feedback['resource'];
        $datosUsuario = $this->searchForeignKeys();

            $datosADevolver = array();
            $datosUsuarioDev = array();
            foreach($datosUsuario as $usuario){
                foreach($datosCategoria as $categoria){
                    if($usuario['dni_usuario'] == $categoria['dni_responsable']){
                        $datosUsuarioDev['categoria'] = $categoria;
                        $datosUsuarioDev['responsable'] = $usuario;
                        $categoria_mapping->searchAll();
                        $categoriasPadres = $categoria_mapping->feedback['resource'];
                        foreach($categoriasPadres as $padres){
                            if($categoria['id_padre_categoria'] != null && $categoria['id_padre_categoria'] == $padres['id_categoria']){
                                $datosUsuarioDev['categoria_padre'] = $padres;
                            }
                        }
                        array_push($datosADevolver, $datosUsuarioDev);
                    }
                }
            }
        $returnBusquedas = new ReturnBusquedas($datosADevolver, $datosSearchParameters, $this->numberFindParameters($datosSearchParameters)["COUNT(*)"],
                        sizeof($datosADevolver), $paginacion->inicio);
        return $returnBusquedas;
        }

        function numberFindAll(){
            $categoria_mapping = new CategoriaMapping();
            $categoria_mapping->numberFindAll();
            return $categoria_mapping->feedback['resource'];
        }

        function numberFindParameters($datosSearchParameters){
            $categoria_mapping = new CategoriaMapping();
            $categoria_mapping->numberFindParameters($datosSearchParameters);
            return $categoria_mapping->feedback['resource'];
        }

        function searchForeignKeys() {
            $usuario_mapping = new UsuarioMapping();
            $usuario_mapping->searchAll();
            return $usuario_mapping->feedback['resource'];
        }
      
    }
?>