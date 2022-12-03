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

    public $token;

    function inicializarParametros($accion) {
        switch($accion) {
            case 'login':
                $this->usuario = $this->crearModelo('Usuario');
                $this->clase_validacionAccion = $this->crearValidacionAccion('Autenticacion');
                $this->clase_validacionFormato = $this->crearValidacionFormato('Autenticacion');
                break;
            case 'recuperarPass':
                $this->usuario = $this->crearModelo('Usuario');
                break;
            default:
                break;   
        }
    }

    function login($mensaje) {

        $respuesta = '';

        if ($this->usuario->usuario != null && $this->usuario->passwd_usuario != null) {
            $datosUsuario = array(
                'usuario' =>  $this->usuario->usuario,
                'passwd_usuario' =>  $this->usuario->passwd_usuario,
                'borrado_usuario' => $this->usuario->borrado_usuario
            );

            if ($this->clase_validacionFormato !=null) {
                $this->clase_validacionFormato->validarAtributosLogin($datosUsuario);
            }
            if ($this->clase_validacionAccion != null) {
                $this->clase_validacionAccion->comprobarLogin($datosUsuario);
            }
            if ($this->clase_validacionFormato->respuesta != null) {
                $respuesta =  $this->clase_validacionFormato->respuesta;
            } else if ($this->clase_validacionAccion->respuesta != null) {
                $respuesta = $this->clase_validacionAccion->respuesta;
            } else {
                $usuarioDatos = [
                    'usuario' => $this->usuario->usuario,
                    'passwd_usuario' => $this->usuario->passwd_usuario,
                    'rol' => 2
                ];
                include_once "./Autenticacion/GetJWToken.php";
                $token = GetJWToken::getJWToken($usuarioDatos);
    
                $respuesta = array (
                    'tokenUsuario' => $token,
                    'usuario' => $this->usuario->usuario,
                    'rol' => 'rol'
                );
            
                $datosBuscarUser = array();
                $datosBuscarUser['dni_usuario'] = $this->usuario->usuario;
                $datosBuscarUser['foraneas'] = $this->usuario->clavesForaneas;
                $respuesta = $mensaje;
                $this->token = $token;
            }
            
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
            return 'TOKEN_USUARIO_INCORRECTO';
        }
    }
    
    function recuperarPass() {

        $nombre_usuario = $this -> usuario -> usuario;
        $direccion_email = $_POST['email'];

        $respuesta = $this -> enviarEmailGmail($direccion_email);
        $respuesta = $this -> ponerPassPorDefecto($nombre_usuario);
        //tratar error si nombre de usuario no coincide
        
        return $respuesta;

    }

    function enviarEmailGmail($direccion_email) {

        $asunto = 'Recuperación de contraseña';
        $cuerpo = '
            Acabas de solicitar la opción de recuperación de tu contraseña.

            Se ha establecido la siguiente contraseña para tu cuenta:

            ayyciruela

            Utilízala para iniciar sesión de nuevo y cambiar tu contraseña lo antes posible.

            Un saludo,
            El equipo de Carbon Footprint.
        ';

        $email = new PHPMailer;

        $email -> CharSet = 'UTF-8';
        $email -> Encoding = 'base64';

        $email -> isSMTP();
        $email -> SMTPDebug = SMTP::DEBUG_OFF;
        $email -> SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
        $email -> SMTPAuth = true;

        $email -> Host = 'smtp.gmail.com';
        $email -> Port = 465;

        $email -> Username = gmail_correo;
        $email -> Password = gmail_password;

        $email -> setFrom(gmail_correo, 'Carbon Footprint');
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
        $respuesta = $usuario_mapping -> searchByLogin($usuario);
        $usuario = $respuesta['resource'];
        $usuario['passwd_usuario'] = 'ayyciruela';
        $respuesta = $usuario_mapping -> edit($usuario);

        return $usuario;

    }

}
?>
