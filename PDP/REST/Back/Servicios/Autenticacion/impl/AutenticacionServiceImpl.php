<?php

include_once './Servicios/ServiceBase.php';
include_once './Servicios/Autenticacion/AutenticacionService.php';
include_once './Autenticacion/GetJWToken.php';
include_once "./Mapping/UsuarioMapping.php";
include_once "./Mapping/RolMapping.php";
include_once './Servicios/Constantes.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
require_once './Comun/PHPMailer/src/PHPMailer.php';
require_once './Comun/PHPMailer/src/SMTP.php';
require_once './Comun/PHPMailer/src/Exception.php';

class AutenticacionServiceImpl extends ServiceBase implements AutenticacionService {

    public $token;
    public $resource;

    function inicializarParametros($accion) {
        switch($accion) {
            case 'login':
                $this->usuario = $this->crearModelo('Usuario');
                $this->clase_validacionAccion = $this->crearValidacionAccion('Autenticacion');
                $this->clase_validacionFormato = $this->crearValidacionFormato('Autenticacion');
                break;
            case 'recuperarPass':
                $this -> usuario = $this -> crearModelo('Usuario');
                $this -> autenticacion_validation = new AutenticacionValidation;
                break;
            default:
                break;   
        }
    }

    function login($mensaje) {

        $respuesta = '';
        $usuarioMapping = new UsuarioMapping();
        $rolMapping = new RolMapping();

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
                $datosSearch = array(
                    'usuario' => $this->usuario->usuario
                );
                $usuarioMapping->searchByLogin($datosSearch);
                $resultadoUsuario = $usuarioMapping->feedback['resource'];
                $rolMapping->searchById($resultadoUsuario);
                $resultadoRol = $rolMapping->feedback['resource'];
    
                $res = array (
                    'tokenUsuario' => $token,
                    'usuario' => $this->usuario->usuario,
                    'rol' => $resultadoRol['nombre_rol']
                );
            
                $datosBuscarUser = array();
                $datosBuscarUser['dni_usuario'] = $this->usuario->usuario;
                $datosBuscarUser['foraneas'] = $this->usuario->clavesForaneas;
                $respuesta = $mensaje;
                $this->resource = $res;
            }
            
        }

        return $respuesta;

    }

    
    function recuperarPass($idioma) {

        $nombre_usuario = $this -> usuario -> usuario;
        
        $direccion_email = $_POST['emailUsuario'];

        $respuesta = $this -> autenticacion_validation -> validarRecuperarPass();
        if (!empty($respuesta)) {
            return ['validacion_error' => $respuesta];
        }

        if (!$this -> existeUsuario($nombre_usuario)) {
            return 'USUARIO_NO_EXISTE';
        }

        $nueva_password = $this -> randomPassword();
        $nueva_password_encriptada = md5($nueva_password);

        $respuesta = $this -> enviarEmailGmail($direccion_email, $nueva_password, $idioma);
        $respuesta = $this -> ponerNuevaPass($nombre_usuario, $nueva_password_encriptada);
    

        return $respuesta;

    }

    function existeUsuario($nombre_usuario) {
        $usuario_mapping = new UsuarioMapping;
        $datosSearch = ['usuario' => $nombre_usuario];
        $respuesta = $usuario_mapping -> searchByLogin($datosSearch);
        if (empty($respuesta['resource'])) {
            return false;
        } else {
            return true;
        }
    }
    
    function randomPassword() {
        $alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
        $pass = array(); //remember to declare $pass as an array
        $alphaLength = strlen($alphabet) - 1; //put the length -1 in cache
        for ($i = 0; $i < 8; $i++) {
            $n = rand(0, $alphaLength);
            $pass[] = $alphabet[$n];
        }
        return implode($pass); //turn the array into a string
    }

    function enviarEmailGmail($direccion_email, $nueva_password, $idioma) {

        $asunto = $this->generateAsunto($idioma);
        $cuerpo = $this->generateCuerpo($idioma, $nueva_password);

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

    function ponerNuevaPass($nombre_usuario, $nueva_password_encriptada) {
        // Esto seguramente se pueda hacer mejor haciendo los cambios sobre un objeto Usuario
        $usuario = [
            'usuario' => $nombre_usuario
        ];

        $usuario_mapping = new UsuarioMapping;
        $respuesta = $usuario_mapping -> searchByLogin($usuario);
        $usuario = $respuesta['resource'];
        $usuario['passwd_usuario'] = $nueva_password_encriptada;
        //generar password 
        $respuesta = $usuario_mapping -> edit($usuario);

        return $usuario;

    }

    function generateAsunto($idioma){
        $asunto = '';
        switch($idioma){
            case 'EN':
                $asunto = ASUNTO_EN;
            break;
            case 'ES':
                $asunto = ASUNTO_ES;
            break;
            case 'GA':
                $asunto = ASUNTO_GA;
            break;
        }

        return $asunto;
    }

    function generateCuerpo($idioma,$pass){
        $cuerpo = '';
        $date = new DateTime();
        $fechaEmail = $date->format('d/m/Y');
        switch($idioma){
            case 'ES':
                $cuerpo = TABULACION_FECHA. 'Ourense, '.$fechaEmail. SALTO_LINEA. SALUDO_ES. SALTO_LINEA. 
                            CUERPO_ES_I. SALTO_LINEA. CUERPO_ES_II. SALTO_LINEA. SALTO_LINEA. $pass. SALTO_LINEA. SALTO_LINEA.
                            CUERPO_ES_III. SALTO_LINEA. SALTO_LINEA. FIRMA_ES. SALTO_LINEA. 'El equipo de Carbon Footprint';
            break;
            case 'EN':
                $cuerpo = TABULACION_FECHA. 'Ourense, '.$fechaEmail. SALTO_LINEA. SALUDO_EN. SALTO_LINEA. 
                            CUERPO_EN_I. SALTO_LINEA. CUERPO_EN_II. SALTO_LINEA. SALTO_LINEA. $pass. SALTO_LINEA. SALTO_LINEA. 
                            CUERPO_EN_III. SALTO_LINEA. SALTO_LINEA.FIRMA_EN. SALTO_LINEA. 'Carbon Footprint Team';
            break;
            case 'GA':
                $cuerpo = TABULACION_FECHA. 'Ourense, '.$fechaEmail. SALTO_LINEA. SALUDO_EN. SALTO_LINEA. 
                            CUERPO_GA_I. SALTO_LINEA. CUERPO_GA_II. SALTO_LINEA. SALTO_LINEA. $pass. SALTO_LINEA. SALTO_LINEA. 
                            CUERPO_GA_III. SALTO_LINEA. SALTO_LINEA.FIRMA_GA. SALTO_LINEA. 'Carbon Footprint Team';
            break;
        }

        return $cuerpo;
    }

}
?>
