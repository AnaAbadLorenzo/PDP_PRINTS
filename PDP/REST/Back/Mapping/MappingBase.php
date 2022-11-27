<?php

include_once './Comun/config.php';
include_Once './Validation/Excepciones/QueryKOExcepcion.php';

abstract class MappingBase{

	private static $db_host = host;
	private static $db_user = user;
	private static $db_pass = pass;
	private static $bd = BD;
	private static $bdTesting = BDTEST;
	protected $query;
	protected $rows = array();
	private $conn;
	protected $stmt;
	protected $datos = array();
	public $ok = true;
	public $code = 'CONEXION_BD_OK';
	public $resource = '';
	public $feedback = array();
	public $erroresdatos = [];
	public $listaAtributosBD = array();
	public $mapping;

	function connection(){
		if (isset($_POST['test']) && $_POST['test'] == 'testing'){
			try{
				$this->conn = new PDO('mysql:host='.self::$db_host.';dbname='.self::$bdTesting,self::$db_user,self::$db_pass);
			}catch(Exception $e){
				die('Error: '.$e->GetMessage());
			}finally{
				return $this->conn;
			}

		}else{
			try{
				$this->conn = new PDO('mysql:host='.self::$db_host.';dbname='.self::$bd,self::$db_user,self::$db_pass);
			}catch(Exception $e){
				die('Error: '.$e->GetMessage());
			}finally{
				return $this->conn;
			}
		}
	}

	//Ejecutar un query simple del tipo INSERT, DELETE, UPDATE
	protected function execute_single_query() {
		
		if (!($this->connection())){
			throw new BDKOExcepcion('CONEXION_BD_KO');
		}
		else{
			if(!($this->stmt->execute())){
				header('Content-type: application/json');
				echo(json_encode($this->stmt));
				throw new QueryKOExcepcion('SQL_KO');
			}else{
				return true;
			}
		}
	}
	//Traer resultados de una consulta en un Array
	protected function get_results_from_query() {
		$this->resource = array();
		if (!($this->connection())){
			throw new BDKOExcepcion('CONEXION_BD_KO');
		}
		else{
			if(!empty($valores)){
				if (!$this->stmt->execute($valores)){
					throw new QueryKOExcepcion('SQL_KO');
				}else{
	
					if ($this->stmt->rowCount() == 0){
						$this->ok = true;
						$this->code  = 'RECORDSET_VACIO'; 
						$this->construirRespuesta();
					}
					else{
						$result = $this->stmt->fetchAll(PDO::FETCH_ASSOC);
						 $this->resource = $result;
						$this->ok = true;
						 $this->code  = 'RECORDSET_DATOS';
						 $this->construirRespuesta();
					}
				}
			}
			else{
				if (!$this->stmt->execute()){
					throw new QueryKOExcepcion('SQL_KO');
				}else{
	
					if ($this->stmt->rowCount() == 0){
						$this->ok = true;
						$this->code  = 'RECORDSET_VACIO'; // el recordset viene vacio
						$this->construirRespuesta();
					}
					else{
						$result = $this->stmt->fetchAll(PDO::FETCH_ASSOC);
						 $this->resource = $result;
						 $this->ok = true;
						 $this->code  = 'RECORDSET_DATOS'; // el recordset vuelve con datos
						 $this->construirRespuesta();
					}
				}
			}
			
		}
	}

	//Ejecutar un query por clave primaria que debe devolver una túpla de resultado 
	protected function get_one_result_from_query() {
		$this->resource = array();
		if (!($this->connection())){
			throw new BDKOExcepcion('CONEXION_BD_KO');
		}
		else{
			if(!empty($valores)){
				if (!$this->stmt->execute()){
					throw new QueryKOExcepcion('SQL_KO');
				}else{
					if ($this->stmt->rowCount() == 0){
						$this->ok = true;
						$this->code  = 'RECORDSET_VACIO'; // el recordset viene vacio
						$this->construirRespuesta();
					}else{
						$result = $this->stmt->fetch(PDO::FETCH_ASSOC);
						$this->resource = $result;
						$this->ok = true;
						$this->code  = 'RECORDSET_DATOS'; // el recordset vuelve con datos
						$this->construirRespuesta();
					}
				}
			}
			else{
				if (!$this->stmt->execute()){
					throw new QueryKOExcepcion('SQL_KO');
				}else{
					
					if ($this->stmt->rowCount() == 0){
						$this->ok = true;
						$this->code  = 'RECORDSET_VACIO'; // el recordset viene vacio
						$this->construirRespuesta();
					}else{
						$result = $this->stmt->fetch(PDO::FETCH_ASSOC);
						$this->resource = $result;
						$this->ok = true;
						$this->code  = 'RECORDSET_DATOS'; // el recordset vuelve con datos
						$this->construirRespuesta();
					}
				}
			}
		}

	}

	function obtenerDatosClaveForanea($tabla){
		$this->query = "SELECT * FROM ".$tabla;
		$this->stmt = $this->conexion->prepare($this->query);
		$this->get_results_from_query(array());
		return $this->feedback;
	}

	function incluirDatosForaneas($principal, $tabla, $clave){
		$filasforaneas = $this->obtenerDatosClaveForanea($tabla);
		$auxiliar = array();

		if (empty($principal)){}
		else{
			foreach ($filasforaneas['resource'] as $filasforanea) {
				if ($principal[$clave] == $filasforanea[$clave]){
					$principal[$clave] = $filasforanea;
				}       
			}
			array_push($auxiliar, $principal);
		}
		return $auxiliar;
	}

	protected function construirRespuesta() {
		$this->feedback['ok'] = $this->ok;
		$this->feedback['code'] = $this->code;
		$this->feedback['resource'] = $this->resource;
	}

	function rellenarExcepcion($mensaje){
		$respuesta['ok'] = false;
		$respuesta['code'] = $mensaje;
		$respuesta['resource'] = '';
		
		header('Content-type: application/json');
		echo(json_encode($respuesta)); 
		exit();
	}
}

?>