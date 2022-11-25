/*Función para añadir la cabecera de la tabla de atributos*/
function cabeceraTablaAtributosTest(){

	return '<tr>' +
       		'<th>Campo</th>' +
       		'<th>Prueba</th>' +
       		'<th>Valor</th>' +
       		'<th>Resultado Esperado</th>' +
       		'<th>Resultado Obtenido</th>' +
       		'<th>Tipo Prueba</th>' +
       		'</tr>';
}

/*Función para añadir la cabecera de la tabla de acciones*/
function cabeceraTablaAccionesTest(){

	return '<tr>' +
       		'<th>Prueba</th>' +
       		'<th>Valor</th>' +
       		'<th>Resultado Esperado</th>' +
       		'<th>Resultado Obtenido</th>' +
       		'<th>Tipo Prueba</th>' +
       		'</tr>';
}

/*Función que rellena las tablas de atributos*/
function cuerpoTablaAtributosTest(fila){

	var filaTabla = "";

	filaTabla = '<tr> <td>' + fila.campo + 
            	'</td> <td>' + fila.prueba +
            	'</td> <td>' + valorAcortado(convertirCaracteres(fila.valor)) +
            	'</td> <td>' + fila.resultadoEsperado +
            	'</td> <td>' + fila.resultadoObtenido +
            	'</td> <td>' + fila.tipoPrueba +
            	'</td> </tr>';

    return filaTabla;
}

/*Función que devuelve el valor de la prueba acortado si pasa de un tamaño*/
function valorAcortado(valor){

	if (valor.length > 45){
		return valor.substr(0, 45) + "...";
	}

	return valor;
}

/*Función que rellena las tablas de atributos*/
function cuerpoTablaAccionesTest(fila, atributos, entidad){

	var filaTabla = "";

	filaTabla = '<tr> <td>' + fila.prueba +
            	'</td> <td>' + obtenerValor(fila.valor, atributos, entidad) +
            	'</td> <td>' + fila.resultadoEsperado +
            	'</td> <td>' + fila.resultadoObtenido +
            	'</td> <td>' + fila.tipoPrueba +
            	'</td> </tr>';

    return filaTabla;
}

/*Función para devolver el contenido de la columna valor*/
function obtenerValor(valor, atributos, entidad){

	var resultadoValor = "";

	if (valor != null){

		switch(entidad){
			case 'Login':
				resultadoValor = '"' + atributos[0] + '" : "' + convertirCaracteres(valor.usuario) + '", "' + atributos[1] + '" : "' + convertirCaracteres(valor.passwdUsuario) +  '"';
			break;
			case 'RecuperarPass':
				resultadoValor = '"' + atributos[0] + '" : "' + convertirCaracteres(valor.emailP) + '", "' + atributos[1] + '" : "' + convertirCaracteres(valor.usuario) +  '"';
			break;
			case 'Registrar':
				resultadoValor = '"' + atributos[0] + '" : "' + convertirCaracteres(valor.nombreP) + '", "' + atributos[1] + '" : "' + convertirCaracteres(valor.apellidosP) 
				      + '", "' + atributos[2] + '" : "' + convertirCaracteres(valor.fechaNacP) + '", "' + atributos[3] + '" : "' + convertirCaracteres(valor.telefonoEmpresa)
				      + '", "' + atributos[4] + '" : "' + convertirCaracteres(valor.nombreEmpresa) + '", "' + atributos[5] + '" : "' + convertirCaracteres(valor.direccionP) 
							+ '", "' + atributos[6] + '" : "' + convertirCaracteres(valor.emailP) + '", "' + atributos[7] + '" : "' + convertirCaracteres(valor.cifEmpresa) 
							+ '", "' + atributos[8] + '" : "' + convertirCaracteres(valor.direccionEmpresa)	+ '", "' + atributos[9] + '" : "' + convertirCaracteres(valor.seleccionarEmpresa)
							+ '", "' + atributos[10] + '" : "' + convertirCaracteres(valor.telefonoP) + '", "' + atributos[11] + '" : "' + convertirCaracteres(valor.usuario)
							+ '", "' + atributos[12] + '" : "' + convertirCaracteres(valor.dniP) + '", "' + atributos[13] + '" : "' + convertirCaracteres(valor.passwdUsuario)
							+ '"';
			break;
			case 'Rol':
				resultadoValor = '"' + atributos[0] + '" : "' + convertirCaracteres(valor.rolDescription) + '", "' + atributos[1] + '" : "' + convertirCaracteres(valor.rolName) +  '"';
			break;

			case 'Funcionalidad':
				resultadoValor = '"' + atributos[0] + '" : "' + convertirCaracteres(valor.descripFuncionalidad) + '", "' + atributos[1] + '" : "' + convertirCaracteres(valor.nombreFuncionalidad) +  '"';
			break;

			case 'Accion':
				resultadoValor = '"' + atributos[0] + '" : "' + convertirCaracteres(valor.descripAccion) + '", "' + atributos[1] + '" : "' + convertirCaracteres(valor.nombreAccion) +  '"';
			break;

			case 'Usuario':
				resultadoValor = '"' + atributos[0] + '" : "' + convertirCaracteres(valor.dniUsuario) + '", "' + atributos[1] + '" : "' + convertirCaracteres(valor.usuario) +  '"' 
				      + '", "' + atributos[2] + '" : "' + convertirCaracteres(valor.passwdUsuario) +  '"';
			break;

			case 'Noticia':
				resultadoValor = '"' + atributos[0] + '" : "' + convertirCaracteres(valor.tituloNoticia) + '", "' + atributos[1] + '" : "' + convertirCaracteres(valor.textoNoticia) +  '"';
			break;

			case 'Persona':
				resultadoValor = '"' + atributos[0] + '" : "' + convertirCaracteres(valor.dniP) + '", "' + atributos[1] + '" : "' + convertirCaracteres(valor.nombreP) 
							+ '", "' + atributos[2] + '" : "' + convertirCaracteres(valor.apellidosP) + '", "' + atributos[3] + '" : "' + convertirCaracteres(valor.fechaNacP)
							+ '", "' + atributos[4] + '" : "' + convertirCaracteres(valor.direccionP) +  '", "' + atributos[4] + '" : "' + convertirCaracteres(valor.emailP) 
							+ '", "' + atributos[5] + '" : "' + convertirCaracteres(valor.telefonoP) +  '"';
			break;

			case 'Empresa':
				resultadoValor = '"' + atributos[0] + '" : "' + convertirCaracteres(valor.cifEmpresa) + '", "' + atributos[1] + '" : "' + convertirCaracteres(valor.nombreEmpresa) 
				      +  '", "' + atributos[2] + '" : "' + convertirCaracteres(valor.direccionEmpresa) + '", "' + atributos[3] + '" : "' + convertirCaracteres(valor.telefonoEmpresa) + '"';
			break;

			case 'Objetivo':
				resultadoValor = '"' + atributos[0] + '" : "' + convertirCaracteres(valor.nombreObjetivo) + '", "' + atributos[1] + '" : "' + convertirCaracteres(valor.descripObjetivo) +  '"';
			break;

			case 'Respuestas Posibles':
				resultadoValor = '"' + atributos[0] + '" : "' + convertirCaracteres(valor.textoRespuesta) +  '"';
			break;

			case 'Plan':
				resultadoValor = '"' + atributos[0] + '" : "' + convertirCaracteres(valor.nombrePlan) + '", "' + atributos[1] + '" : "' + convertirCaracteres(valor.descripPlan) +  '"' 
				      + '", "' + atributos[2] + '" : "' + convertirCaracteres(valor.fechaPlan) +  '"';
			break;
			case 'Procedimiento':
				resultadoValor = '"' + atributos[0] + '" : "' + convertirCaracteres(valor.nombreProcedimiento) + '", "' + atributos[1] + '" : "' + convertirCaracteres(valor.descripProcedimiento) +  '"' 
				      + '", "' + atributos[2] + '" : "' + convertirCaracteres(valor.fechaProcedimiento) + '", "' + atributos[3] + '" : "' + convertirCaracteres(valor.checkUsuario) + '"';
			break;

			case 'Proceso':
				resultadoValor = '"' + atributos[0] + '" : "' + convertirCaracteres(valor.nombreProceso) + '", "' + atributos[1] + '" : "' + convertirCaracteres(valor.descripProceso) +  '"' 
				      + '", "' + atributos[2] + '" : "' + convertirCaracteres(valor.fechaProceso) +  '"';
			break;
		}

	} else {
		resultadoValor = null;
	}

	return resultadoValor;
}

/*Función para la respuesta ok de los test*/
function cargarRespuestaOkTest(datosPruebaAtributos, idCabecera, idCuerpo, atributosValor, entidad, idElementoList, tipoTest){
  cargarTablasTest(datosPruebaAtributos, idCabecera, idCuerpo, tipoTest, atributosValor, entidad);    
  validarDatosTabla(datosPruebaAtributos, idElementoList, tipoTest);
}


/*Función para cargar las tablas de test*/
function cargarTablasTest(datos, idCabecera, idCuerpo, tipoTest, atributosValor, entidad){

	$("#" + idCabecera).html("");
	$("#" + idCuerpo).html("");
	var trCabecera = "";

	switch(tipoTest){
		case 'acciones':
			trCabecera = cabeceraTablaAccionesTest();

			for (var i = 0; i < datos.length; i++){
				var tr = cuerpoTablaAccionesTest(datos[i], atributosValor, entidad);
				$("#" + idCuerpo).append(tr);
			}    
		break;
		case 'atributos':
			trCabecera = cabeceraTablaAtributosTest();

			for (var i = 0; i < datos.length; i++){
				var tr = cuerpoTablaAtributosTest(datos[i]);
				$("#" + idCuerpo).append(tr);
			} 
		break;
	}

	$("#" + idCabecera).append(trCabecera);
	  			
}

/*Función para cargar los errores en la modal si falla la petición de los test*/
function cargarModalErroresTest(code){
	$("#modal-title").removeClass();
    $("#modal-title").addClass("ERROR");
    document.getElementById("modal-title").style.color = "#a50707";
    $(".imagenAviso").attr('src', 'images/failed.png');
    $("#modal-mensaje").removeClass();
    $("#modal-mensaje").addClass(code);
    setLang(getCookie('lang'));
    document.getElementById("modal").style.display = "block";
}

/**Función que valida que no tengamos pruebas de test con valores nulos, en el caso de que los haya muestra un icono de error al lado del tipo de test*/
function validarDatosTabla(datos, idElementoList, tipoTest){

	for (var i = 0; i < datos.length; i++){

		switch(tipoTest){
			case 'acciones':
				if (datos[i].prueba === null || datos[i].valor === null || datos[i].resultadoEsperado === null || 
					datos[i].resultadoObtenido === null || datos[i].tipoPrueba === null ) {
					idElementoList.forEach( function (idElemento) {
						$("#"+ idElemento).prop('hidden', false);
					});	
					break;
				} else {
					idElementoList.forEach( function (idElemento) {
						$("#"+ idElemento).prop('hidden', true);
					});
					break;
				}
			case 'atributos':	
				if (datos[i].campo === null || datos[i].prueba === null || datos[i].valor === null || 
					datos[i].resultadoEsperado === null || datos[i].resultadoObtenido === null || datos[i].tipoPrueba === null ) {
					idElementoList.forEach( function (idElemento) {
						$("#"+ idElemento).prop('hidden', false);
					});	
					break;
				} else {
					idElementoList.forEach( function (idElemento) {
						$("#"+ idElemento).prop('hidden', true);
					});
					break;
				}
		}
	}

	
}

/**Función para convertir los caracteres raros en su caracter correcto*/
function convertirCaracteres(valor){

	var ENHE_ERROR = "ÃƒÂ±";
	var ENHE = "ñ";
	var O_ACENTO_ERROR = "ÃƒÂ³";
	var O_ACENTO = "ó"
	var A_ACENTO_ERROR = "ÃƒÂ¡";
	var A_ACENTO = "á";
	var E_ACENTO_ERROR = "ÃƒÂ©";
	var E_ACENTO = "é"
	var U_ACENTO_ERROR = "ÃƒÂº";
	var U_ACENTO = "ú"
	var I_ACENTO_ERROR = "ÃƒÂ­";
	var I_ACENTO = "í"
	var O_MAYUSCULA_ACENTO_ERROR = "Ãƒâ€œ";
	var O_MAYUSCULA = "Ó";
	var E_MAYUSCULA_ACENTO_ERROR = "Ãƒâ€°";
	var E_MAYUSCULA = "É";

	if (valor.includes(ENHE_ERROR)) {
		valor = valor.replaceAll(ENHE_ERROR, ENHE);
	}

	if (valor.includes(O_ACENTO_ERROR)) {
		valor = valor.replaceAll(O_ACENTO_ERROR, O_ACENTO);
	}

	if (valor.includes(A_ACENTO_ERROR)) {
		valor = valor.replaceAll(A_ACENTO_ERROR, A_ACENTO);
	}

	if (valor.includes(E_ACENTO_ERROR)) {
		valor = valor.replaceAll(E_ACENTO_ERROR, E_ACENTO);
	}

	if (valor.includes(U_ACENTO_ERROR)) {
		valor = valor.replaceAll(U_ACENTO_ERROR, U_ACENTO);
	}

	if (valor.includes(I_ACENTO_ERROR)) {
		valor = valor.replaceAll(I_ACENTO_ERROR, I_ACENTO);
	}

	if (valor.includes(O_MAYUSCULA_ACENTO_ERROR)) {
		valor = valor.replaceAll(O_MAYUSCULA_ACENTO_ERROR, O_MAYUSCULA);
	}

	if (valor.includes(E_MAYUSCULA_ACENTO_ERROR)) {
		valor = valor.replaceAll(E_MAYUSCULA_ACENTO_ERROR, E_MAYUSCULA);
	}

	return valor;
}