<?php


    include_once './Servicios/ServiceBase.php';
    include_once './Servicios/Autenticacion/AutenticacionService.php';
    include_once './Autenticacion/GetJWToken.php';
    include_once "./Mapping/UsuarioMapping.php";
    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\SMTP;
    require_once './Comun/PHPMailer/src/PHPMailer.php';
    require_once './Comun/PHPMailer/src/SMTP.php';
    require_once './Comun/PHPMailer/src/Exception.php';

    class AutenticacionServiceImpl extends ServiceBase implements AutenticacionService {

        function inicializarParametros($accion){
            switch($accion) {
                case 'login':
                    $this->usuario = $this->crearModelo('Usuario');
				    $this->clase_validacionAccion = $this->crearValidacionAccion('Autenticacion');
                    $this->clase_validacionFormato = $this->crearValidacionFormato('Autenticacion');
                    break;
                case 'recuperarPass':
                    $this->usuario = $this->crearModelo('Usuario');
                    break;
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

            } catch (TokenException $ex) {
                $this->rellenarExcepcion($ex->getMessage(), 'login');
            } catch (AtributoIncorrectoException $ex) {
                $this->rellenarExcepcion($ex->getMessage(), 'login');
            } catch (UsuarioNoEncontradoException $ex) {
                $this->rellenarExcepcion($ex->getMessage(), 'login');
            } catch (PasswdUsuarioNoCoincideException $ex) {
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
	 
        function recuperarPass() {

            $nombre_usuario = $this -> usuario -> usuario;
            $direccion_email = $_POST['email'];

            $respuesta = $this -> ponerPassPorDefecto($nombre_usuario);
            //tratar excepcion si nombre de usuario no coincide

            //$respuesta = $this -> enviarEmailGmail($direccion_email);

            return $respuesta;

        }

        function enviarEmail($direccion_email) {

            $email = new PHPMailer;

            $email -> isHTML(true);
            $email -> setFrom('ejemplo@ejemplo.com');
            $email -> Subject = 'PDP_PRINTS: Recuperación de contraseña';
            $email -> Body = 'Has solicitado el reinicio de tu contraseña.';

            if (!$email -> addAddress($direccion_email)) {
                return 'email_incorrecto';
            }

            if (!$email -> send()) {
                return $email -> ErrorInfo;
            } else {
                return true;
            }

        }

        function enviarEmailGmail($direccion_email) {

            $asunto = 'PDP_PRINTS: Recuperación de contraseña';
            $cuerpo = 'Has solicitado el reinicio de tu contraseña.';

            $email = new PHPMailer;

            $email -> isSMTP();
            $email -> SMTPDebug = SMTP::DEBUG_OFF;

            $email -> Host = 'smtp.gmail.com';
            $email -> Port = 465;
            $email -> SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
            $email -> SMTPAuth = true;

            $email -> Username = gmail_correo;
            $email -> Password = gmail_password;

            $email -> setFrom(gmail_correo);
            $email -> Subject = $asunto;
            $email -> Body = $cuerpo;

            if (!$email -> addAddress($direccion_email)) {
                return 'email_incorrecto';
            }

            if (!$email -> send()) {
                return $email -> ErrorInfo;
            } else {
                return true;
            }

        }

        function ponerPassPorDefecto($nombre_usuario) {
            // Esto seguramente se pueda hacer mejor haciendo los cambios sobre un objeto Usuario
            $usuario = [
                'usuario' => $nombre_usuario
            ];

            $usuario_mapping = new UsuarioMapping;
            //checkear si existe usuario?
            $respuesta = $usuario_mapping -> searchByLogin($usuario);
            $usuario = $respuesta['resource'];
            $usuario['passwd_usuario'] = 'ayyciruela';
            $respuesta = $usuario_mapping -> edit($usuario);

            return $usuario;

        }

    }
?>