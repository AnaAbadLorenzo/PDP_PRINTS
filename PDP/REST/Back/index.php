<?php
      //include_once './Comun/codigos.php';
      header('Access-Control-Allow-Origin: *');

      if (  ( !isset($_POST['controlador']) and !isset($_POST['action']) ) or
            !isset($_POST['controlador']) or !isset($_POST['action'])){
            rellenarExcepcion('PETICION_INVALIDA');
      }

      define('controlador', $_POST['controlador']);
      define('action', $_POST['action']);

      $rest = controlador;
      $action = action;
         
      if ($rest != 'Autenticacion'){
            include_once './Controladores/AutenticacionController.php';
            $auth = new AutenticacionController();
            //$auth->comprobarToken();
      }
      
      if(file_exists('./Controladores/'.$rest.'Controller.php')){
            include_once './Controladores/'.$rest.'Controller.php';
            $nombre = $rest.'Controller';
            $nombrerest = new $nombre();	
      }else{
            rellenarExcepcion('ACCION_NO_ENCONTRADA');
      }

      $metodosControlador = get_class_methods($nombrerest);
      
      if(in_array($action, $metodosControlador)){  
            $nombrerest->$action();
      }
      else{
            rellenarExcepcion('ACCION_NO_ENCONTRADA');
      }

      function rellenarExcepcion($mensaje){
            header('Content-type: application/json');
            echo(json_encode(array('ok' => 'false', 'code' => $mensaje))); 
            exit();
	}
   
?>