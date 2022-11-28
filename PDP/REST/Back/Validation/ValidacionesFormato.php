<?php

class ValidacionesFormato{

	var $validation = array();

	//comprueba que un string no sobrepase la longitud maxima en base a un valor establecido
	//si es correcta devuelve true
	//si la longitud del string es mas larga que la del string devuelve false, el string no es valido
	function Longitud_maxima($string,$valor){
		if(strlen($string)<=$valor){
			return true;
		}else{
			return false;
		}
	}

	//comprueba que un string tenga la longitud minima en base al valor establecido
	//si la longitud del string es correcta devuelve true
	//si la longitud del string es mas corta que la del string devuelve false, el string no es valido
	function Longitud_minima($string,$valor){
		if(strlen($string)>=$valor){
			return true;
		}else{
			return false;
		}
	}

	function Longitud_exacta($string,$valor){
		if(strlen($string)==$valor){
			return true;
		}else{
			return false;
		}
	}


	//comprueba si un string tiene solo letras incluida la ñ y espacios
	//devuelve true si es corrrecto false en caso contrario
	function comprobarLetrasEspacios($string){
		$patronAlfabetico = '/^[a-zA-ZáéíóúÁÉÍÓÚ]\s+$/';

        preg_match_all($patronAlfabetico, $string, $matches, PREG_UNMATCHED_AS_NULL);

		if (!empty($matches)){
			return true;
		}else{
			return false;
		}
	}
	function comprobarLetras($string){

		if (preg_match('/^[a-zA-ZÀ-ÿ]/s',$string)){
			return true;
		}else{
			return false;
		}
	}

	//comprueba si un string tiene solo letras o números
	//devuelve true si es corrrecto false en caso contrario
	function comprobarLetrasNumerosSinEspacios($string){

		if (preg_match('/^[a-zA-ZÀ-ÿ0-9]+$/s',$string)){
			return true;
		}else{
			return false;
		}
	}

	//comprueba el formato del login y la contraseña aceptando solamente
	//letras y números sin incluir espacios en blanco, ñ, acentos y caracteres especiales
	function comprobarFormatoLoginContrasena($string){

		if (preg_match('/^[a-zA-Z0-9]+$/s',$string)){
			return true;
		}else{
			return false;
		}
	}

	//comprueba si un string tiene solo letras incluida la ñ y numeros
	//devuelve true si es corrrecto false en caso contrario
	function comprobarLetrasNumeros($string){

		if (preg_match('/^[a-zA-ZÀ-ÿ0-9\u00f1\u00d1]+$/s',$string)){
			return true;
		}else{
			return false;
		}
	}
	
	//comprueba si un string tiene solo letras incluida la, numeros y espacios
	//devuelve true si es corrrecto false en caso contrario
	function comprobarLetrasNumerosEspacios($string){

		if (preg_match('/^[a-zA-ZÀ-ÿ0-9,. \u00f1\u00d1]+$/s',$string)){
			return true;
		}else{
			return false;
		}
	}

	function comprobarLetrasNumerosEspaciosGuiones($string){

		if (preg_match('/^[a-zA-ZÀ-ÿ0-9-_. \u00f1\u00d1]+$/s',$string)){
			return true;
		}else{
			return false;
		}
	}

	function comprobarLetrasNumerosEspaciosSignos($string){

		if (preg_match('/^[a-zA-ZÀ-ÿ0-9-_., \u00f1\u00d1]+$/s',$string)){
			return true;
		}else{
			return false;
		}
	}

	function comprobarFormatoNoticia($string){

		if (preg_match('/^[a-zA-ZÀ-ÿ0-9-_.,@!¡?¿ \u00f1\u00d1]+$/s',$string)){
			return true;
		}else{
			return false;
		}
	}

	//comprueba si un string tiene solo letras
	//devuelve true si es corrrecto false en caso contrario
	function Es_string($string){
		if (preg_match('/^[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/s',$string)){
			return true;
		}else{
			return false;
		}
	}
	//comprueba si un string tiene solo letras y números
	//devuelve true si es corrrecto false en caso contrario
	function Es_alfanumerico($string){
		if (preg_match('/[^a-zA-ZÀ-ÿ0-9]/',$string)){
			return false;
		}else{
			return true;
	}
	}
	//comprueba si un string tiene solo numeros
	//devuelve true si es corrrecto false en caso contrario
	function Es_numerico($string){
		$patronAlfanumerico = '/^[0-9]+$/';

        preg_match_all($patronAlfanumerico, $string, $matches, PREG_UNMATCHED_AS_NULL);
		
		if (!empty($matches)){
			return true;
		}else{
			return false;
		}
	}

	//comprueba si un string tiene solo numeros
	//devuelve true si es corrrecto false en caso contrario
	function Es_Valoracion($string){
		if (preg_match('/[^0-9]/',$string)){
			return false;
		}else{
			if($string < 1 || $string >= 6){
				return false;
			}
			else{
				return true;
			}
		}
	}

	function Es_precio($string){
		if (preg_match('/[^0-9,.]/',$string)){
			return false;
		}else{
			return true;
		}
	}

	//Comprueba si el valor es diferente de 0 o 1
	function Es_flag($string){
		if($string != 0 && $string != 1){ 
			return false;
		}
		else{
			return true;
		}
	}

	//comprueba si un string tiene solo letras numeros y espacios
	//devuelve true si es corrrecto false en caso contrario
	function Es_string_espacios($string){
		if (preg_match('/[^a-zA-Z0-9\s]/',$string)){
			return true;
		}else{
			return false;
		}
	}

	function FormatoCalle($string){
		$patronAlfanumericoEspacios = '/^[a-zA-Z0-9]\s+$/';

        preg_match_all($patronAlfanumericoEspacios, $string, $matches, PREG_UNMATCHED_AS_NULL);
		
		if (!empty($matches)){
			return true;
		}else{
			return false;
		}
	}

	//comprueba si un string tiene solo letras numeros espacios y guiones altos
	//devuelve true si es corrrecto false en caso contrario
	function Es_string_espacios_guiones($string){
		if (preg_match('/[^a-zA-Z0-9\s\-]/',$string)){
			return false;
		}else{
			return true;
		}
	}

	//comprueba si un string tiene solo letras numeros espacios y guiones
	//devuelve true si es corrrecto false en caso contrario
	function Es_string_espacios_guiones_todos($string){
		if (preg_match('/[^a-zA-Z0-9\s\-\_]/',$string)){
			return false;
		}else{
			return true;
		}
	}

	function No_vacio($string){
		if(!preg_match('/[a-zA-Z0-9]+/', $string) || $string==''){
				return false;
		}else{
			return true;
		}
	}	

	function Es_Vacio($string){

		if(($string=='') || (strlen($string) == 0)){
				return true;
		}else{
			return false;
		}
	}

	function En_valores($string, $array){

		$res = false;
		foreach ($array as $valor) {
			if ($valor == $string){
				$res = true;
				break;
			}
		}
		return $res;
		 
	}


	function Formato_email($string){
		 if(filter_var($string, FILTER_VALIDATE_EMAIL)){
		 	return true;
		 }else{
		 	return false;
		 }
	}

	function Formato_dni($dni){

		if (preg_match('/(^[0-9]{8}[A-Z]{1}$)/', $dni)){
			return true;
		}
		else{
			return false;
		}
  	}

  	function LetraNIF($dni) {
		$letra = substr($dni, -1);
		$dni = intval($dni);
		$posicion= intval($dni%23);
		$letras= "TRWAGMYFPDXBNJZSQVHLCKE";
		$letraNif= substr ($letras, $posicion, 1);
		if ($letra === $letraNif){
			return true;
		}
		else{
			return false;
		}
		
	}

	function Formato_fecha($fecha){
		$patronFecha = '/^[0-9]{4}(-)[0-9]{2}(-)[0-9]{2}/';
        preg_match_all($patronFecha, $fecha, $matches, PREG_UNMATCHED_AS_NULL);

		if(!empty($matches)){
				return true;
		}else{
			return false;
		}
	}

	function comprobarFechanumerosbarra($fecha){
		
		$trozos = explode('-', $fecha);
		
		if (count($trozos) != 3){
			$error = 'formatofechamal';
			return $error;
		}

		// trozos[0] año, trozos[1] mes, trozos[2] dia

		if ((!ctype_digit($trozos[0])) || (!ctype_digit($trozos[1])) || (!ctype_digit($trozos[2]))){
			$error = 'tieneletras';
			return $error;
		}

		if (strlen($fecha) < 10) {
			$error = 'tamañomenor10';
			return $error;
		}

		if (strlen($fecha) > 10) {
			$error = 'tamañomayor10';
			return $error;
		}

		if (((strlen($trozos[0]) != 4)) || ((strlen($trozos[1]) != 2)) || ((strlen($trozos[2]) != 2))) {
			$error = 'formatofechamal';
			return $error;
		}

		if (intval($trozos[1])>12){
			$error = 'formatofechamal';
			return $error;
		}
		
		if (intval($trozos[2])>31) {
			$error = 'formatofechamal';
			return $error;
		}

		date_default_timezone_set('Europe/Madrid');
		$fecha = $trozos[2].'-'.$trozos[1].'-'.$trozos[0].' 00:00:00';
		$fecha = date(strtotime($fecha));
		$fechaactual = strtotime(date("d-m-Y H:i:00",time()));
				
		if ($fecha >= $fechaactual && (action != 'buscar' && action != 'buscarEncargos')) {
			$error = 'fechafutura';
			return $error;
		}
	}
}