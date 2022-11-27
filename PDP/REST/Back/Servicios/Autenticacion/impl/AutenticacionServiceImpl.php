<?php

    include_once './Servicios/ServiceBase.php';
    include_once './Servicios/Autenticacion/AutenticacionService.php';
    include_once './Autenticacion/GetJWToken.php';

    class AutenticacionServiceImpl extends ServiceBase implements AutenticacionService {
        function inicializarParametros($accion){
            switch($accion){
                case 'login':
                    $this->usuario = $this->crearModelo('Usuario');
				    $this->clase_validacionAccion = $this->crearValidacionAccion('Autenticacion');
                    $this->clase_validacionFormato = $this->crearValidacionFormato('Autenticacion');
                break;
            }
        }

        function login($mensaje) {
            try{
                $datosUsuario = array(
                    'usuario' =>  $this->usuario->usuario,
                    'passwd_usuario' =>  $this->usuario->passwd_usuario,
                    'borrado_usuario' => $this->usuario->borrado_usuario
                );


                $this->clase_validacionFormato->validarAtributosLogin($datosUsuario);
                $this->clase_validacionAccion->comprobarLogin($datosUsuario);

                $datosBuscarUser = array();
                $datosBuscarUser['dni_usuario'] = $this->usuario->usuario;
                $datosBuscarUser['foraneas'] = $this->usuario->clavesForaneas;

                $usuarioDatos = [
                    'usuario' => $this->usuario->usuario,
                    'passwd_usuario' => $this->usuario->passwd_usuario,
                    'rol' => ''/*$this->usuario->getById('rol',$datosBuscarUser)['resource']['id_rol']*/
                ];
                include_once "./Autenticacion/GetJWToken.php";
                $token = GetJWToken::getJWToken($usuarioDatos);

                $respuesta = array (
                    'tokenUsuario' => $token,
                    'usuario' => $this->usuario->usuario,
                    'rol' => 'rol'
                );

            }catch(TokenException $ex){
                $this->rellenarExcepcion($ex->getMessage(), 'login');
            }catch(AtributoIncorrectoException $ex){
                $this->rellenarExcepcion($ex->getMessage(), 'login');
            }catch(UsuarioNoEncontradoException $ex){
                $this->rellenarExcepcion($ex->getMessage(), 'login');
            }catch(PasswdUsuarioNoCoincideException $ex){
                $this->rellenarExcepcion($ex->getMessage(), 'login');
            }
            
            return $respuesta;
    
        }

        function verificarToken($mensaje){
            $tokenUsuario = '';	
            $resultado = '';
            $requestHeaders = apache_request_headers();
		    for($i = 0; $i<sizeof( $requestHeaders); $i++){
                if($requestHeaders[$i] == 'Authorization'){
                    $tokenUsuario = $requestHeaders[$i]->value;
                    $resultado = GetJWToken::obtenerToken($tokenUsuario);
                }
            }
            if(!empty($resultado)){
                return true;
            }else{
               throw new TokenUsuarioIncorrectoException('TOKEN_USUARIO_INCORRECTO');
            }


		}	
	 
    }
?>