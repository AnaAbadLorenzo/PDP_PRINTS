<?php

define('SERVER', "http://localhost");
define('SECRET_KEY', 'mySecretKey'); 
define('BEARER', 'BEARER');
define('ALGORITHM', 'HS512');
define('TOKEN_ID', 'softtekJWT');

require_once "./Autenticacion/JWT.php";

class GetJWToken {

    function __construct()
    {
        
    }

    public static function obtenerToken($token) {
                $secretKey = base64_decode(SECRET_KEY);
                $DecodedDataArray = JWT::decode($token, $secretKey);
                $payload = $DecodedDataArray;
            return $payload;
    }

    public static function getJWToken($usuarioDatos) {
        $tokenId = base64_encode(TOKEN_ID);
        $issuedAt = time();
        $expire = $issuedAt + 6000000;
        $serverName = SERVER;
        
        $datos = [
            'contrasena' => $usuarioDatos["passwd_usuario"],
            'usuario' => $usuarioDatos["usuario"],
            'rol' => $usuarioDatos["rol"]
        ];

        $payload = [
            'iat' => $issuedAt,     
            'jti' => $tokenId,      
            'iss' => $serverName,   
            'exp' => $expire,       
            'data' => $datos       
        ];

        $secretKey = base64_decode(SECRET_KEY);

        $jwt = JWT::encode(
                        $payload,
                        $secretKey
                        
        );

        $tokenJWT = BEARER.$jwt;

        return $tokenJWT;
    }

    public static function verTokenCaducados($tokens){
            $tokensCaducados = JWT::expiredTokens($tokens);
        return $tokensCaducados;
    }
}
