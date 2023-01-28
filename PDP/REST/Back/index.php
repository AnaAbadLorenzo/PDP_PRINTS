<?php
      //include_once './Comun/codigos.php';
      if ((!isset($_POST['controlador']) and !isset($_POST['action']) ) or
            !isset($_POST['controlador']) or !isset($_POST['action'])){
            rellenarExcepcion('PETICION_INVALIDA');
      }
      define('controlador', $_POST['controlador']);
      define('action', $_POST['action']);

      $rest = controlador;
      $action = action;
      if ($rest != 'Autenticacion' && $rest != 'Registro'){
            include_once './Controladores/AutenticacionController.php';
            $auth = new AutenticacionController();
            $resultado = $auth->verificarTokenUsuario();
          
            if(!$resultado) {
                 rellenarExcepcion('TOKEN_USUARIO_INCORRECTO');
            }
      }


      if($rest == 'Test') {
            $metodo = '';
            include_once './Controladores/Test/'.ucfirst($action).'TestController.php';
            $nombreTest = ucfirst($action).'TestController';
            $test = new $nombreTest();
            if(isset($_POST['tipoTest'])){
                  if($_POST['tipoTest'] === 'Atributos'){
                        $metodo = 'testAtributos'.ucfirst($action);
                  }else{
                        $metodo = 'testAcciones'.ucfirst($action);
                  }
            }

            $test->$metodo();
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