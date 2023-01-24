<?php

include_once './Servicios/ServiceBase.php';
include_once './Servicios/Comun/ReturnBusquedas.php';
include_once './Servicios/ProcesoUsuario/ProcesoUsuarioService.php';

include_once './Mapping/ProcesoUsuarioMapping.php';
include_once './Mapping/ProcesoUsuarioParametroMapping.php';
include_once './Mapping/ParametroMapping.php';
include_once './Mapping/ProcesoMapping.php';
include_once './Mapping/UsuarioMapping.php';
include_once './Modelos/ProcesoUsuarioModel.php';

include_once './Validation/Accion/ProcesoUsuarioAccion.php';

class ProcesoUsuarioServiceImpl extends ServiceBase implements ProcesoUsuarioService {

    public $proceso_usuario;
    
    private $validacion_formato;
    private $validacion_accion;

    function inicializarParametros() {
        $this -> proceso_usuario = $this -> crearModelo('ProcesoUsuario');
        $this -> validacion_accion = $this -> crearValidacionAccion('ProcesoUsuario');
        $this -> validacion_formato = $this -> crearValidacionFormato('ProcesoUsuario');
    }

    function add($mensaje) {
        $datosProcesoUsuario = array();
        $datosProcesoUsuario = array();
        $datosProcesoUsuario['usuario'] = $this->proceso_usuario->usuario;

        $usuario_mapping = new UsuarioMapping();
        $usuario_mapping->searchByLogin($datosProcesoUsuario);
        $resultadoUsuario = $usuario_mapping->feedback['resource'];

        $proceso_usuario_datos = [
            'fecha_proceso_usuario' => date('Y-m-d'),
            'calculo_huella_carbono' => $this -> proceso_usuario -> calculo_huella_carbono,
            'usuario' => $this->proceso_usuario->usuario,
            'dni_usuario' => $resultadoUsuario['dni_usuario'],
            'id_proceso' => $this -> proceso_usuario -> id_proceso
        ];
    
        $this -> validacion_formato -> validarAtributosAdd($proceso_usuario_datos);
        $respuesta = $this -> validacion_formato -> respuesta;
        if ($respuesta != null) {
            return $respuesta;
        }

        $this -> validacion_accion -> comprobarAdd($proceso_usuario_datos);
        $respuesta = $this -> validacion_accion -> respuesta;
        if ($respuesta != null) {
            return $respuesta;
        }

        $procesoUsuarioDatos = array(
            'fecha_proceso_usuario' => date('Y-m-d'),
            'calculo_huella_carbono' => $this -> proceso_usuario -> calculo_huella_carbono,
            'dni_usuario' => $resultadoUsuario['dni_usuario'],
            'id_proceso' => $this -> proceso_usuario -> id_proceso
        );
        
        $proceso_usuario_mapping = new ProcesoUsuarioMapping;
        $proceso_usuario_mapping -> add($procesoUsuarioDatos);

        if ($proceso_usuario_mapping -> respuesta == null) {
            $respuesta = $mensaje;
        } else {
            $respuesta = $proceso_usuario_mapping -> respuesta;
        }

        return $respuesta;

    }

    function edit($mensaje) {

        $proceso_usuario_datos = [
            'id_proceso_usuario' => $this -> proceso_usuario -> id_proceso_usuario,
            'fecha_proceso_usuario' => $this -> proceso_usuario -> fecha_proceso_usuario,
            'calculo_huella_carbono' => $this -> proceso_usuario -> calculo_huella_carbono,
            'dni_usuario' => $this -> proceso_usuario -> dni_usuario,
            'id_proceso' => $this -> proceso_usuario -> id_proceso
        ];
    
        $this -> validacion_formato -> validarAtributosEdit($proceso_usuario_datos);
        $respuesta = $this -> validacion_formato -> respuesta;
        if ($respuesta != null) {
            return $respuesta;
        }

        $this -> validacion_accion -> comprobarEdit($proceso_usuario_datos);
        $respuesta = $this -> validacion_accion -> respuesta;
        if ($respuesta != null) {
            return $respuesta;
        }

        //añadir a bd
        $proceso_usuario_mapping = new ProcesoUsuarioMapping;
        $proceso_usuario_mapping -> edit($proceso_usuario_datos);

        if ($proceso_usuario_mapping -> respuesta == null) {
            $respuesta = $mensaje;
        } else {
            $respuesta = $proceso_usuario_mapping -> respuesta;
        }

        return $respuesta;

    }

    function delete($mensaje) {

        $proceso_usuario_datos = [
            'id_proceso_usuario' => $this -> proceso_usuario -> id_proceso_usuario
        ];
        
        $this -> validacion_formato -> validarAtributosDelete($proceso_usuario_datos);
        $respuesta = $this -> validacion_formato -> respuesta;
        if ($respuesta != null) {
            return $respuesta;
        }

        $this -> validacion_accion -> comprobarDelete($proceso_usuario_datos);
        $respuesta = $this -> validacion_accion -> respuesta;
        if ($respuesta != null) {
            return $respuesta;
        }

        $proceso_usuario_mapping = new ProcesoUsuarioMapping;
        $proceso_usuario_mapping -> delete($proceso_usuario_datos);

        if ($proceso_usuario_mapping -> respuesta == null){
            $respuesta = $mensaje;
        }else{
            $respuesta = $proceso_usuario_mapping -> respuesta;
        }
        
        return $respuesta;

    }

    function search($paginacion) {

        $proceso_usuario_mapping = new ProcesoUsuarioMapping();
        $proceso_usuario_mapping -> search($paginacion);
        $datosProcesoUsuario = $proceso_usuario_mapping ->feedback['resource'];
        $datosProceso = $this->searchForeignKeysProceso();
        $datosUsuario = $this->searchForeignkeysUsuario();

        $datosADevolver = array();
            $datosUsuarioDev = array();
            foreach($datosProcesoUsuario as $procesoUsuario){
                foreach($datosProceso as $proceso){
                    if($procesoUsuario['id_proceso'] == $proceso['id_proceso']){
                        $datosUsuarioDev['procesoUsuario'] = $procesoUsuario;
                        $datosUsuarioDev['proceso'] = $proceso;
                    }
                    foreach($datosUsuario as $usuario) {
                        if(isset($datosUsuarioDev['procesoUsuario'])){
                            if($usuario['dni_usuario'] == $procesoUsuario['dni_usuario']){
                                $datosUsuarioDev['usuario'] = $usuario;
                            }
                        }
                    }
                    
                }
                array_push($datosADevolver, $datosUsuarioDev);
            }

        $returnBusquedas = new ReturnBusquedas
        (
            $datosADevolver,
            '',
            $this -> numberFindAll()["COUNT(*)"],
            sizeof($datosADevolver),
            $paginacion -> inicio
        );

        return $returnBusquedas;

    }

    function searchForeignKeysProceso() {
        $proceso_mapping = new ProcesoMapping();
        $proceso_mapping->searchAll();
        return $proceso_mapping->feedback['resource'];
    }

    function searchForeignKeysUsuario() {
        $usuario_mapping = new UsuarioMapping();
        $usuario_mapping->searchAll();
        return $usuario_mapping->feedback['resource'];
    }

    function searchByParameters($paginacion) {

        $datos_search = array();
        
        if ($this -> proceso_usuario -> id_proceso_usuario == null) {
            $datos_search['id_proceso_usuario'] = '';
        } else {
            $datos_search['id_proceso_usuario'] = $this -> proceso_usuario -> id_proceso_usuario;
        }
        
        if ($this -> proceso_usuario -> fecha_proceso_usuario == null) {
            $datos_search['fecha_proceso_usuario'] = '';
        } else {
            $datos_search['fecha_proceso_usuario'] = $this -> proceso_usuario -> fecha_proceso_usuario;
        }
       
        if ($this -> proceso_usuario -> calculo_huella_carbono == null) {
            $datos_search['calculo_huella_carbono'] = '';
        } else {
            $datos_search['calculo_huella_carbono'] = $this -> proceso_usuario -> calculo_huella_carbono;
        }
       
        if ($this -> proceso_usuario -> dni_usuario == null) {
            $datos_search['dni_usuario'] = '';
        } else {
            $datos_search['dni_usuario'] = $this -> proceso_usuario -> dni_usuario;
        }
       
        if ($this -> proceso_usuario -> id_proceso == null) {
            $datos_search['id_proceso'] = '';
        } else {
            $datos_search['id_proceso'] = $this -> proceso_usuario -> id_proceso;
        }
       
        if ($this -> proceso_usuario -> borrado_proceso_usuario == null) {
            $datos_search['borrado_proceso_usuario'] = '';
        } else {
            $datos_search['borrado_proceso_usuario'] = $this -> proceso_usuario -> borrado_proceso_usuario;
        }
        
        $proceso_usuario_mapping= new ProcesoUsuarioMapping();
        $proceso_usuario_mapping -> searchByParameters($datos_search, $paginacion);

        $returnBusquedas = new ReturnBusquedas
        (
            $proceso_usuario_mapping -> feedback['resource'],
            $datos_search,
            $this -> numberFindParameters($datos_search)["COUNT(*)"],
            sizeof($proceso_usuario_mapping -> feedback['resource']),
            $paginacion->inicio
        );

        return $returnBusquedas;

    }
    
    function numberFindAll(){
        $proceso_usuario_mapping = new ProcesoUsuarioMapping();
        $proceso_usuario_mapping -> numberFindAll();
        return $proceso_usuario_mapping -> feedback['resource'];
    }

    function numberFindParameters($datos_search){
        $proceso_usuario_mapping = new ProcesoUsuarioMapping();
        $proceso_usuario_mapping->numberFindParameters($datos_search);
        return $proceso_usuario_mapping->feedback['resource'];
    }

    //id_proceso_usuario
    //parametros
    //  id_parametro1 => valor_parametro1
    //  id_parametro2 => valor_parametro2
    //  ...
    function calcular($mensaje) {

        $calculo_datos = [
            'id_proceso_usuario'    => $_POST['id_proceso_usuario'],
            'parametros'            => $_POST['parametros']
        ];
    
        // Validar formato datos
        // $this -> validacion_formato -> validarAtributosCalcular($calculo_datos);
        // $respuesta = $this -> validacion_formato -> respuesta;
        // if ($respuesta != null) {
        //     return $respuesta;
        // }

        // Comprobacion si existen el id_proceso_usuario y cada uno de los parametros (en sus respectivas tablas)
        // $this -> validacion_accion -> comprobarCalcular($calculo_datos);
        // $respuesta = $this -> validacion_accion -> respuesta;
        // if ($respuesta != null) {
        //     return $respuesta;
        // }

        $this -> actualizarParametrosBD($calculo_datos);    // Plasmo en BD todo lo que recibo
        $this -> calcularYGuardarHuella($calculo_datos);

        return $mensaje;

    }

    function actualizarParametrosBD($calculo_datos) {

        $proceso_usuario_parametro_mapping = new ProcesoUsuarioParametroMapping;

        // Comprobamos si no existe una entrada para cada combinación de proceso y parámetro y hacemos los cambios pertinentes
        foreach ($calculo_datos['parametros'] as $id_parametro => $valor_parametro) {

            // Defino el array con los datos que pasarán a BD
            $datos_a_bd = [
                'id_proceso_usuario' => $calculo_datos['id_proceso_usuario'],
                'id_parametro' => $id_parametro,
                'valor_parametro' => $valor_parametro
            ];

            // Defino el array que se utiliza para preguntar por la existencia
            $datos_consulta = [
                'id_proceso_usuario' => $calculo_datos['id_proceso_usuario'],
                'id_parametro' => $id_parametro
            ];
            $resultado = $proceso_usuario_parametro_mapping -> searchById($datos_consulta);

            if (sizeof($resultado['resource']) == 0) { // Si es la primera vez que se escribe, lo añadimos a la tabla
                $proceso_usuario_parametro_mapping -> add($datos_a_bd);
            } else { // Si ya existe, lo actualizamos
                $proceso_usuario_parametro_mapping -> edit($datos_a_bd);
            }

        }

    }

    function calcularYGuardarHuella($calculo_datos) {

        $proceso_mapping = new ProcesoMapping;
        $proceso_usuario_mapping = new ProcesoUsuarioMapping;

        // Obtengo el proceso sobre el que tengo que conseguir la formula
        $proceso_usuario_obtenido = $proceso_usuario_mapping -> searchById($calculo_datos)['resource'];

        // Obtengo los datos del proceso para sacar la formula
        $proceso_obtenido = $proceso_mapping -> searchById($proceso_usuario_obtenido)['resource'];
        $formula = $proceso_obtenido['formula_proceso'];

        // Sustituyo el texto que representa los parametros por sus valores
        $formula_rellenada = $this -> ponerValoresEnFormula($formula, $calculo_datos['parametros']);

        // Realizo el cálculo
        $resultado_calculo = eval("return " . $formula_rellenada . ";");

        // Guardo el resultado en BD
        $datos_a_bd = [
            'id_proceso_usuario'        => $calculo_datos['id_proceso_usuario'],
            'calculo_huella_carbono'    => $resultado_calculo
        ];
        $proceso_usuario_mapping -> anadirResultado($datos_a_bd);

    }

    function ponerValoresEnFormula($formula, $parametros) {

        $parametro_mapping = new ParametroMapping;

        header('Content-type: application/json');
        echo(json_encode($formula));

        foreach ($parametros as $id_parametro => $valor_parametro) {

            $parametro_temp = $parametro_mapping -> searchById(['id_parametro' => $id_parametro])['resource'];

            $formula = str_replace(
                "#" . $parametro_temp['parametro_formula'] . "|" . $parametro_temp['descripcion_parametro'] . "#",
                $valor_parametro,
                $formula
            );
            
        }

        header('Content-type: application/json');
        echo(json_encode($formula));
        exit;

        return $formula;

    }

}