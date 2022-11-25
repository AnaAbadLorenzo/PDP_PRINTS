/*Función para generar estructura básica de los test*/
function crearTest(arrayDatosAccordion){

	var aUno = '';

	if (arrayDatosAccordion[2] === null){
		aUno = '<a class="collapsed card-link" data-toggle="collapse" href="#' + arrayDatosAccordion[1] + '">' +
				' ' + arrayDatosAccordion[3] + ' ' +
			'</a>';
	} else {
		aUno = '<a class="collapsed card-link" data-toggle="collapse" href="#' + arrayDatosAccordion[1] + '"  onclick="' + arrayDatosAccordion[2] + '">' +
				' ' + arrayDatosAccordion[3] + ' ' +
			'</a>';
	}

	var cardHeaderUno = '<div class="card-header">' +
							aUno +
							'<img class="iconTab" id="' + arrayDatosAccordion[4] + ' src="images/failed.png" hidden>' +
						'</div>';

	var cardsUno = '';

	if (arrayDatosAccordion[2] === null){
		var arrayUno = arrayDatosAccordion[7];
		cardsUno = creaCards(arrayUno);
	} else {
		cardsUno = creaTableResponsive(arrayDatosAccordion[5], arrayDatosAccordion[6]);
	}

	var aDos = '';

	if (arrayDatosAccordion[9] === null){
		aDos = '<a class="collapsed card-link" data-toggle="collapse" href="#' + arrayDatosAccordion[8] + '">' +
				' ' + arrayDatosAccordion[10] + ' ' +
			'</a>';
	} else {
		aDos = '<a class="collapsed card-link" data-toggle="collapse" href="#' + arrayDatosAccordion[8] + '"  onclick="' + arrayDatosAccordion[9] + '">' +
				' ' + arrayDatosAccordion[10] + ' ' +
			'</a>';
	}

	var cardHeaderDos = '<div class="card-header">' +
							aDos +
							'<img class="iconTab" id="' + arrayDatosAccordion[11] + ' src="images/failed.png" hidden>' +
						'</div>';

	var cardsDos = '';

	if (arrayDatosAccordion[9] === null){
		var arrayDos = arrayDatosAccordion[14];
		cardsDos = creaCards(arrayDos);
	} else {
		cardsDos = creaTableResponsive(arrayDatosAccordion[12], arrayDatosAccordion[13]);
	}

	var contenidoTest = '<div id="' + arrayDatosAccordion[0] + '">' +
	      					'<div class="card">' +
							    cardHeaderUno +

							    '<div id="' + arrayDatosAccordion[1] + '" class="collapse" data-parent="#' + arrayDatosAccordion[0] + '">' +
							    	'<div class="card-body">' +
										cardsUno +
							    	'</div>' +
								'</div>' +

					  			cardHeaderDos +

					    		'<div id="' + arrayDatosAccordion[8] + '" class="collapse" data-parent="#' + arrayDatosAccordion[0] + '">' +
							    	'<div class="card-body">' +
								      		cardsDos +
							    	'</div>' +
								'</div>' +
					 		' </div>' +
						'</div>'; 

	return contenidoTest;
}

/*Función para crear los cards*/
function creaCards(arrayDatos){
	
	var cards = '';

	for (let step = 1; step < arrayDatos.length ; step++) {

		var array = arrayDatos[step];

	  	cards = cards + '<div class="card">' +
							'<div class="card-header">' +
							    '<a class="collapsed card-link" data-toggle="collapse" href="#' + array[0] + '" onclick="' + array[1] + '">' +
							        ' ' +array[2] + ' ' +
							    '</a>' +
							    '<img class="iconTab" id="' + array[3] + '" src="images/failed.png" hidden>' +
							'</div>' +

							'<div id="' + array[0] + '" class="collapse" data-parent="#' + arrayDatos[0] + '">' +
							    '<div class="card-body">' +
							        '<div class="table-responsive controlTamTabla">' +
										'<table class="table table-bordered">' +
										    '<thead class="cabeceraTablasTest" id="' + array[4] + '"></thead>' +
										    '<tbody id="' + array[5] + '"></tbody>' +
										'</table>' +
			      					'</div>' +
							    '</div>' +
							'</div>' +
						'</div>';
	}

	var resultCards = 	'<div id="' + arrayDatos[0] + '">' +
	 						cards +
						'</div>';

	return resultCards;
}


/*Función que crea la tabla responsive si no tenemos subniveles*/
function creaTableResponsive(idCabecera, idCuerpo){
	var table = '<div class="table-responsive">' +
					'<table class="table table-bordered">' +
					    '<thead class="cabeceraTablasTest" id="' + idCabecera + '"></thead>' +
					    '<tbody id="' + idCuerpo + '"></tbody>' +
					'</table>' +
				'</div>';
	return table;
}


/*Función para cargar las opciones de Tests de Login*/
function cargarTestLogin(){

	$("#testLogin").html("");

	let arraySubAccordionUno = ["collapseLoginAtributosLogin", "javascript:testLogin('Atributos')", "Login", "iconoTestLoginAtributosLogin", "cabeceraAtributosLogin", "cuerpoAtributosLogin"];
	let arraySubAccordionDos = ["collapseLoginAtributosRecuperarPass", "javascript:testRecuperarPass('Atributos')", "Recuperar Contraseña", "iconoTestLoginAtributosRecuperarPass",
							   "cabeceraAtributosRecuperarPass", "cuerpoAtributosRecuperarPass"];
	let arrayAccordionUno = ["accordion3", arraySubAccordionUno, arraySubAccordionDos];

	let arraySubAccordionTres = ["collapseLoginAccionesLogin", "javascript:testLogin('Acciones')", "Login", "iconoTestLoginAccionesLogin", "cabeceraAccionesLogin", "cuerpoAccionesLogin"];
	let arraySubAccordionCuatro = ["collapseLoginAccionesRecuperarPass", "javascript:testRecuperarPass('Acciones')", "Recuperar Contraseña", "iconoTestLoginAccionesRecuperarPass", 
							      "cabeceraAccionesRecuperarPass", "cuerpoAccionesRecuperarPass"];
	let arrayAccordionDos = ["accordion4", arraySubAccordionTres, arraySubAccordionCuatro];

	let arrayAccordionTres = ["accordion2", "collapseLoginAtributos", null, "Atributos", "iconoTestLoginAtributos", null, null, arrayAccordionUno, "collapseLoginAcciones", null, "Acciones", 
							 "iconoTestLoginAcciones", null, null, arrayAccordionDos];

	var contenidoTest = crearTest(arrayAccordionTres);		

	$("#testLogin").append(contenidoTest);
}

/*Función para cargar las opciones de Tests de Registrar*/
function cargarTestRegistrar(){

	$("#testRegistrar").html("");

	let arrayAccordion = ["accordion5", "collapseRegistrarAtributos", "javascript:testRegistrar('Atributos')", "Atributos", "iconoTestRegistrarAtributos", "cabeceraAtributosRegistrar", 
							  "cuerpoAtributosRegistrar", null, "collapseRegistrarAcciones", "javascript:testRegistrar('Acciones')", "Acciones", "iconoTestRegistrarAcciones", 
							  "cabeceraAccionesRegistrar", "cuerpoAccionesRegistrar", null];

	var contenidoTest = crearTest(arrayAccordion);	

	$("#testRegistrar").append(contenidoTest);
}

/*Función para cargar las opciones de Tests de Roles*/
function cargarTestGestionRoles(){

	$("#testRol").html("");

	let arraySubAccordionUno = ["collapseRolAtributosGuardar", "javascript:testRol('Guardar', 'Atributos')", "Añadir Rol", "iconoTestRolAtributosGuardar", "cabeceraAtributosRolGuardar", "cuerpoAtributosRolGuardar"];
	let arraySubAccordionDos = ["collapseRolAtributoBuscar", "javascript:testRol('Buscar', 'Atributos')", "Buscar Rol", "iconoTestRolAtributosBuscar", "cabeceraAtributosRolBuscar", "cuerpoAtributosRolBuscar"];
	let arraySubAccordionTres = ["collapseRolAtributoModificar", "javascript:testRol('Modificar', 'Atributos')", "Modificar Rol", "iconoTestRolAtributosModificar", "cabeceraAtributosRolModificar", "cuerpoAtributosRolModificar"];
	let arrayAccordionUno = ["accordion7", arraySubAccordionUno, arraySubAccordionDos, arraySubAccordionTres];

	let arraySubAccordionCuatro = ["collapseRolAccionesGuardar", "javascript:testRol('Guardar', 'Acciones')", "Añadir Rol", "iconoTestRolAccionesGuardar", "cabeceraAccionesRolGuardar", "cuerpoAccionesRolGuardar"];
	let arraySubAccordionCinco = ["collapseRolAccionesEliminar", "javascript:testRol('Eliminar', 'Acciones')", "Eliminar Rol", "iconoTestRolAccionesEliminar", "cabeceraAccionesRolEliminar", "cuerpoAccionesRolEliminar"];
	let arraySubAccordionSeis = ["collapseRolAccionesModificar", "javascript:testRol('Modificar', 'Acciones')", "Modificar Rol", "iconoTestRolAccionesModificar", "cabeceraAccionesRolModificar", "cuerpoAccionesRolModificar"];
	let arraySubAccordionSiete = ["collapseRolAccionesBuscar", "javascript:testRol('Buscar', 'Acciones')", "Buscar Rol", "iconoTestRolAccionesBuscar", "cabeceraAccionesRolBuscar", "cuerpoAccionesRolBuscar"];
	let arraySubAccordionOcho = ["collapseRolAccionesReactivar", "javascript:testRol('Reactivar', 'Acciones')", "Reactivar Rol", "iconoTestRolAccionesReactivar", "cabeceraAccionesRolReactivar", "cuerpoAccionesRolReactivar"];
	let arrayAccordionDos = ["accordion8", arraySubAccordionCuatro, arraySubAccordionCinco, arraySubAccordionSeis, arraySubAccordionSiete, arraySubAccordionOcho];

	let arrayAccordionTres = ["accordion6", "collapseRolAtributos", null, "Atributos", "iconoTestRolAtributos", null, null, arrayAccordionUno, "collapseRolAcciones", null, "Acciones", 
							 "iconoTestRolAcciones", null, null, arrayAccordionDos];

	var contenidoTest = crearTest(arrayAccordionTres);

	$("#testRol").append(contenidoTest);
}


/*Función para cargar las opciones de Tests de Funcionalidades*/
function cargarTestGestionFuncionalidades(){

	$("#testFuncionalidad").html("");

	let arraySubAccordionUno = ["collapseFuncionalidadAtributosGuardar", "javascript:testFuncionalidad('Guardar', 'Atributos')", "Añadir Funcionalidad", "iconoTestFuncionalidadAtributosGuardar", 
							   "cabeceraAtributosFuncionalidadGuardar", "cuerpoAtributosFuncionalidadGuardar"];
	let arraySubAccordionDos = ["collapseFuncionalidadAtributoBuscar", "javascript:testFuncionalidad('Buscar', 'Atributos')", "Buscar Funcionalidad", "iconoTestFuncionalidadAtributosBuscar", 
							   "cabeceraAtributosFuncionalidadBuscar", "cuerpoAtributosFuncionalidadBuscar"];
	let arraySubAccordionTres = ["collapseFuncionalidadAtributoModificar", "javascript:testFuncionalidad('Modificar', 'Atributos')", "Modificar Funcionalidad", "iconoTestFuncionalidadAtributosModificar", 
							    "cabeceraAtributosFuncionalidadModificar", "cuerpoAtributosFuncionalidadModificar"];
	let arrayAccordionUno = ["accordion10", arraySubAccordionUno, arraySubAccordionDos, arraySubAccordionTres];

	let arraySubAccordionCuatro = ["collapseFuncionalidadAccionesGuardar", "javascript:testFuncionalidad('Guardar', 'Acciones')", "Añadir Funcionalidad", "iconoTestFuncionalidadAccionesGuardar", 
								  "cabeceraAccionesFuncionalidadGuardar", "cuerpoAccionesFuncionalidadGuardar"];
	let arraySubAccordionCinco = ["collapseFuncionalidadAccionesEliminar", "javascript:testFuncionalidad('Eliminar', 'Acciones')", "Eliminar Funcionalidad", "iconoTestFuncionalidadAccionesEliminar", 
								 "cabeceraAccionesFuncionalidadEliminar", "cuerpoAccionesFuncionalidadEliminar"];
	let arraySubAccordionSeis = ["collapseFuncionalidadAccionesModificar", "javascript:testFuncionalidad('Modificar', 'Acciones')", "Modificar Funcionalidad", "iconoTestFuncionalidadAccionesModificar", 
								"cabeceraAccionesFuncionalidadModificar", "cuerpoAccionesFuncionalidadModificar"];
	let arraySubAccordionSiete = ["collapseFuncionalidadAccionesBuscar", "javascript:testFuncionalidad('Buscar', 'Acciones')", "Buscar Funcionalidad", "iconoTestFuncionalidadAccionesBuscar", 
								 "cabeceraAccionesFuncionalidadBuscar", "cuerpoAccionesFuncionalidadBuscar"];
	let arraySubAccordionOcho = ["collapseFuncionalidadAccionesReactivar", "javascript:testFuncionalidad('Reactivar', 'Acciones')", "Reactivar Funcionalidad", "iconoTestFuncionalidadAccionesReactivar", 
							    "cabeceraAccionesFuncionalidadReactivar", "cuerpoAccionesFuncionalidadReactivar"];
	let arrayAccordionDos = ["accordion11", arraySubAccordionCuatro, arraySubAccordionCinco, arraySubAccordionSeis, arraySubAccordionSiete, arraySubAccordionOcho];

	let arrayAccordionTres = ["accordion9", "collapseFuncionalidadAtributos", null, "Atributos", "iconoTestFuncionalidadAtributos", null, null, arrayAccordionUno, "collapseFuncionalidadAcciones", null, "Acciones", 
							 "iconoTestFuncionalidadAcciones", null, null, arrayAccordionDos];

	var contenidoTest = crearTest(arrayAccordionTres);

	$("#testFuncionalidad").append(contenidoTest);
}

/*Función para cargar las opciones de Tests de Acciones*/
function cargarTestGestionAcciones(){

	$("#testAccion").html("");

	let arraySubAccordionUno = ["collapseAccionAtributosGuardar", "javascript:testAccion('Guardar', 'Atributos')", "Añadir Acción", "iconoTestAccionAtributosGuardar", 
							   "cabeceraAtributosAccionGuardar", "cuerpoAtributosAccionGuardar"];
	let arraySubAccordionDos = ["collapseAccionAtributoBuscar", "javascript:testAccion('Buscar', 'Atributos')", "Buscar Acción", "iconoTestAccionAtributosBuscar", 
							   "cabeceraAtributosAccionBuscar", "cuerpoAtributosAccionBuscar"];
	let arraySubAccordionTres = ["collapseAccionAtributoModificar", "javascript:testAccion('Modificar', 'Atributos')", "Modificar Acción", "iconoTestAccionAtributosModificar", 
							    "cabeceraAtributosAccionModificar", "cuerpoAtributosAccionModificar"];
	let arrayAccordionUno = ["accordion13", arraySubAccordionUno, arraySubAccordionDos, arraySubAccordionTres];

	let arraySubAccordionCuatro = ["collapseAccionAccionesGuardar", "javascript:testAccion('Guardar', 'Acciones')", "Añadir Acción", "iconoTestAccionAccionesGuardar", 
								  "cabeceraAccionesAccionGuardar", "cuerpoAccionesAccionGuardar"];
	let arraySubAccordionCinco = ["collapseAccionAccionesModificar", "javascript:testAccion('Modificar', 'Acciones')", "Modificar Acción", "iconoTestAccionAccionesModificar", 
								 "cabeceraAccionesAccionModificar", "cuerpoAccionesAccionModificar"];
	let arraySubAccordionSeis = ["collapseAccionAccionesEliminar", "javascript:testAccion('Eliminar', 'Acciones')", "Eliminar Acción", "iconoTestAccionAccionesEliminar", 
								"cabeceraAccionesAccionEliminar", "cuerpoAccionesAccionEliminar"];
	let arraySubAccordionSiete = ["collapseAccionAccionesBuscar", "javascript:testAccion('Buscar', 'Acciones')", "Buscar Acción", "iconoTestAccionAccionesBuscar", 
								 "cabeceraAccionesAccionBuscar", "cuerpoAccionesAccionBuscar"];
	let arraySubAccordionOcho = ["collapseAccionAccionesReactivar", "javascript:testAccion('Reactivar', 'Acciones')", "Reactivar Acción", "iconoTestAccionAccionesReactivar", 
							    "cabeceraAccionesAccionReactivar", "cuerpoAccionesAccionReactivar"];
	let arraySubAccordionNueve = ["collapseAccionAccionesAsignar", "javascript:testAccion('Asignar', 'Acciones')", "Asignar Acción", "iconoTestAccionAccionesAsignar", 
							    "cabeceraAccionesAccionAsignar", "cuerpoAccionesAccionAsignar"];
	let arraySubAccordionDiez = ["collapseAccionAccionesRevocar", "javascript:testAccion('Revocar', 'Acciones')", "Revocar Acción", "iconoTestAccionAccionesRevocar", 
							    "cabeceraAccionesAccionRevocar", "cuerpoAccionesAccionRevocar"];
	let arrayAccordionDos = ["accordion14", arraySubAccordionCuatro, arraySubAccordionCinco, arraySubAccordionSeis, arraySubAccordionSiete, arraySubAccordionOcho, arraySubAccordionNueve, arraySubAccordionDiez];

	let arrayAccordionTres = ["accordion12", "collapseAccionAtributos", null, "Atributos", "iconoTestAccionAtributos", null, null, arrayAccordionUno, "collapseAccionAcciones", null, "Acciones", 
							 "iconoTestAccionAcciones", null, null, arrayAccordionDos];

	var contenidoTest = crearTest(arrayAccordionTres);

	$("#testAccion").append(contenidoTest);
}
/*Función para cargar las opciones de Tests de Usuario*/
function cargarTestGestionUsuarios(){

	$("#testUsuario").html("");

	let arraySubAccordionUno = ["collapseUsuarioAtributosModificarRolUsuario", "javascript:testUsuario('ModificarRolUsuario', 'Atributos')", "Modificar Rol Usuario", "iconoTestUsuarioAtributosModificarRolUsuario", 
							   "cabeceraAtributosUsuarioModificarRolUsuario", "cuerpoAtributosUsuarioModificarRolUsuario"];
	let arraySubAccordionDos = ["collapseUsuarioAtributoBuscar", "javascript:testUsuario('Buscar', 'Atributos')", "Buscar Usuario", "iconoTestUsuarioAtributosBuscar", 
							   "cabeceraAtributosUsuarioBuscar", "cuerpoAtributosUsuarioBuscar"];
	let arrayAccordionUno = ["accordion16", arraySubAccordionUno, arraySubAccordionDos];

	let arraySubAccordionTres = ["collapseUsuarioAccionesBuscar", "javascript:testUsuario('Buscar', 'Acciones')", "Buscar Usuario", "iconoTestUsuarioAccionesBuscar", 
								  "cabeceraAccionesUsuarioBuscar", "cuerpoAccionesUsuarioBuscar"];
	let arraySubAccordionCuatro = ["collapseUsuarioAccionesEliminar", "javascript:testUsuario('Eliminar', 'Acciones')", "Eliminar Usuario", "iconoTestUsuarioAccionesEliminar", 
								 "cabeceraAccionesUsuarioEliminar", "cuerpoAccionesUsuarioEliminar"];
	let arraySubAccordionCinco = ["collapseUsuarioAccionesModificarRolUsuario", "javascript:testUsuario('ModificarRolUsuario', 'Acciones')", "Modificar Rol Usuario", "iconoTestUsuarioAccionesModificarRolUsuario", 
								"cabeceraAccionesUsuarioModificarRolUsuario", "cuerpoAccionesUsuarioModificarRolUsuario"];
	let arraySubAccordionSeis = ["collapseUsuarioAccionesModificarPasswdUsuario", "javascript:testUsuario('ModificarPasswdUsuario', 'Acciones')", "Modificar Contraseña Usuario", "iconoTestUsuarioAccionesModificarPasswdUsuario", 
								 "cabeceraAccionesUsuarioModificarPasswdUsuario", "cuerpoAccionesUsuarioModificarPasswdUsuario"];
	let arraySubAccordionSiete = ["collapseUsuarioAccionesReactivar", "javascript:testUsuario('Reactivar', 'Acciones')", "Reactivar Usuario", "iconoTestUsuarioAccionesReactivar", 
							    "cabeceraAccionesUsuarioReactivar", "cuerpoAccionesUsuarioReactivar"];
	let arrayAccordionDos = ["accordion17", arraySubAccordionTres, arraySubAccordionCuatro, arraySubAccordionCinco, arraySubAccordionSeis, arraySubAccordionSiete];

	let arrayAccordionTres = ["accordion15", "collapseUsuarioAtributos", null, "Atributos", "iconoTestUsuarioAtributos", null, null, arrayAccordionUno, "collapseUsuarioAcciones", null, "Acciones", 
							 "iconoTestUsuarioAcciones", null, null, arrayAccordionDos];

	var contenidoTest = crearTest(arrayAccordionTres);

	$("#testUsuario").append(contenidoTest);
}

/*Función para cargar las opciones de Tests de Noticias*/
function cargarTestGestionNoticias(){

	$("#testNoticia").html("");

	let arraySubAccordionUno = ["collapseNoticiaAtributosGuardar", "javascript:testNoticia('Guardar', 'Atributos')", "Añadir Noticia", "iconoTestNoticiaAtributosGuardar", 
							   "cabeceraAtributosNoticiaGuardar", "cuerpoAtributosNoticiaGuardar"];
	let arraySubAccordionDos = ["collapseNoticiaAtributoBuscar", "javascript:testNoticia('Buscar', 'Atributos')", "Buscar Noticia", "iconoTestNoticiaAtributosBuscar", 
							   "cabeceraAtributosNoticiaBuscar", "cuerpoAtributosNoticiaBuscar"];
	let arraySubAccordionTres = ["collapseNoticiaAtributoModificar", "javascript:testNoticia('Modificar', 'Atributos')", "Modificar Noticia", "iconoTestNoticiaAtributosModificar", 
							    "cabeceraAtributosNoticiaModificar", "cuerpoAtributosNoticiaModificar"];
	let arrayAccordionUno = ["accordion19", arraySubAccordionUno, arraySubAccordionDos, arraySubAccordionTres];

	let arraySubAccordionCuatro = ["collapseNoticiaAccionesGuardar", "javascript:testNoticia('Guardar', 'Acciones')", "Añadir Noticia", "iconoTestNoticiaAccionesGuardar", 
								  "cabeceraAccionesNoticiaGuardar", "cuerpoAccionesNoticiaGuardar"];
	let arraySubAccordionCinco = ["collapseNoticiaAccionesEliminar", "javascript:testNoticia('Eliminar', 'Acciones')", "Eliminar Noticia", "iconoTestNoticiaAccionesEliminar", 
								 "cabeceraAccionesNoticiaEliminar", "cuerpoAccionesNoticiaEliminar"];
	let arraySubAccordionSeis = ["collapseNoticiaAccionesModificar", "javascript:testNoticia('Modificar', 'Acciones')", "Modificar Noticia", "iconoTestNoticiaAccionesModificar", 
								"cabeceraAccionesNoticiaModificar", "cuerpoAccionesNoticiaModificar"];
	let arraySubAccordionSiete = ["collapseNoticiaAccionesBuscar", "javascript:testNoticia('Buscar', 'Acciones')", "Buscar Noticia", "iconoTestNoticiaAccionesBuscar", 
								"cabeceraAccionesNoticiaBuscar", "cuerpoAccionesNoticiaBuscar"];
	let arrayAccordionDos = ["accordion20", arraySubAccordionCuatro, arraySubAccordionCinco, arraySubAccordionSeis, arraySubAccordionSiete];

	let arrayAccordionTres = ["accordion18", "collapseNoticiaAtributos", null, "Atributos", "iconoTestNoticiaAtributos", null, null, arrayAccordionUno, "collapseNoticiaAcciones", null, "Acciones", 
							 "iconoTestNoticiaAcciones", null, null, arrayAccordionDos];

	var contenidoTest = crearTest(arrayAccordionTres);

	$("#testNoticia").append(contenidoTest);
} 

/*Función para cargar las opciones de Tests de Personas*/
function cargarTestGestionPersonas(){

	$("#testPersona").html("");

	let arraySubAccordionUno = ["collapsePersonaAtributosGuardar", "javascript:testPersona('Guardar', 'Atributos')", "Añadir Persona", "iconoTestPersonaAtributosGuardar", 
							   "cabeceraAtributosPersonaGuardar", "cuerpoAtributosPersonaGuardar"];
	let arraySubAccordionDos = ["collapsePersonaAtributosModificar", "javascript:testPersona('Modificar', 'Atributos')", "Modificar Persona", "iconoTestPersonaAtributosModificar", 
							   "cabeceraAtributosPersonaModificar", "cuerpoAtributosPersonaModificar"];
	let arraySubAccordionTres = ["collapsePersonaAtributosBuscar", "javascript:testPersona('Buscar', 'Atributos')", "Buscar Persona", "iconoTestPersonaAtributosBuscar", 
							    "cabeceraAtributosPersonaBuscar", "cuerpoAtributosPersonaBuscar"];
	let arrayAccordionUno = ["accordion22", arraySubAccordionUno, arraySubAccordionDos, arraySubAccordionTres];

	let arraySubAccordionCuatro = ["collapsePersonaAccionesBuscar", "javascript:testPersona('Buscar', 'Acciones')", "Buscar Persona", "iconoTestPersonaAccionesBuscar", 
								  "cabeceraAccionesPersonaBuscar", "cuerpoAccionesPersonaBuscar"];
	let arraySubAccordionCinco = ["collapsePersonaAccionesGuardar", "javascript:testPersona('Guardar', 'Acciones')", "Guardar Persona", "iconoTestPersonaAccionesGuardar", 
								 "cabeceraAccionesPersonaGuardar", "cuerpoAccionesPersonaGuardar"];
	let arraySubAccordionSeis = ["collapsePersonaAccionesEliminar", "javascript:testPersona('Eliminar', 'Acciones')", "Eliminar Persona", "iconoTestPersonaAccionesEliminar", 
								"cabeceraAccionesPersonaEliminar", "cuerpoAccionesPersonaEliminar"];
	let arraySubAccordionSiete = ["collapsePersonaAccionesModificar", "javascript:testPersona('Modificar', 'Acciones')", "Modificar Persona", "iconoTestPersonaAccionesModificar", 
								"cabeceraAccionesPersonaModificar", "cuerpoAccionesPersonaModificar"];
	let arrayAccordionDos = ["accordion23", arraySubAccordionCuatro, arraySubAccordionCinco, arraySubAccordionSeis, arraySubAccordionSiete];

	let arrayAccordionTres = ["accordion21", "collapsePersonaAtributos", null, "Atributos", "iconoTestPersonaAtributos", null, null, arrayAccordionUno, "collapsePersonaAcciones", null, "Acciones", 
							 "iconoTestPersonaAcciones", null, null, arrayAccordionDos];

	var contenidoTest = crearTest(arrayAccordionTres);

	$("#testPersona").append(contenidoTest);
}

/*Función para cargar las opciones de Tests de Empresas*/
function cargarTestGestionEmpresas(){

	$("#testEmpresa").html("");

	let arraySubAccordionUno = ["collapseEmpresaAtributosGuardar", "javascript:testEmpresa('Guardar', 'Atributos')", "Añadir Empresa", "iconoTestEmpresaAtributosGuardar", 
							   "cabeceraAtributosEmpresaGuardar", "cuerpoAtributosEmpresaGuardar"];
	let arraySubAccordionDos = ["collapseEmpresaAtributosModificar", "javascript:testEmpresa('Modificar', 'Atributos')", "Modificar Empresa", "iconoTestEmpresaAtributosModificar", 
							   "cabeceraAtributosEmpresaModificar", "cuerpoAtributosEmpresaModificar"];
	let arraySubAccordionTres = ["collapseEmpresaAtributosBuscar", "javascript:testEmpresa('Buscar', 'Atributos')", "Buscar Empresa", "iconoTestEmpresaAtributosBuscar", 
							    "cabeceraAtributosEmpresaBuscar", "cuerpoAtributosEmpresaBuscar"];
	let arrayAccordionUno = ["accordion25", arraySubAccordionUno, arraySubAccordionDos, arraySubAccordionTres];

	let arraySubAccordionCuatro = ["collapseEmpresaAccionesBuscar", "javascript:testEmpresa('Buscar', 'Acciones')", "Buscar Empresa", "iconoTestEmpresaAccionesBuscar", 
								  "cabeceraAccionesEmpresaBuscar", "cuerpoAccionesEmpresaBuscar"];
	let arraySubAccordionCinco = ["collapseEmpresaAccionesGuardar", "javascript:testEmpresa('Guardar', 'Acciones')", "Guardar Empresa", "iconoTestEmpresaAccionesGuardar", 
								 "cabeceraAccionesEmpresaGuardar", "cuerpoAccionesEmpresaGuardar"];
	let arraySubAccordionSeis = ["collapseEmpresaAccionesEliminar", "javascript:testEmpresa('Eliminar', 'Acciones')", "Eliminar Empresa", "iconoTestEmpresaAccionesEliminar", 
								"cabeceraAccionesEmpresaEliminar", "cuerpoAccionesEmpresaEliminar"];
	let arraySubAccordionSiete = ["collapseEmpresaAccionesModificar", "javascript:testEmpresa('Modificar', 'Acciones')", "Modificar Empresa", "iconoTestEmpresaAccionesModificar", 
								"cabeceraAccionesEmpresaModificar", "cuerpoAccionesEmpresaModificar"];
	let arraySubAccordionOcho = ["collapseEmpresaAccionesReactivar", "javascript:testEmpresa('Reactivar', 'Acciones')", "Reactivar Empresa", "iconoTestEmpresaAccionesReactivar", 
								"cabeceraAccionesEmpresaReactivar", "cuerpoAccionesEmpresaReactivar"];
	let arrayAccordionDos = ["accordion26", arraySubAccordionCuatro, arraySubAccordionCinco, arraySubAccordionSeis, arraySubAccordionSiete, arraySubAccordionOcho];

	let arrayAccordionTres = ["accordion24", "collapseEmpresaAtributos", null, "Atributos", "iconoTestEmpresaAtributos", null, null, arrayAccordionUno, "collapseEmpresaAcciones", null, "Acciones", 
							 "iconoTestEmpresaAcciones", null, null, arrayAccordionDos];

	var contenidoTest = crearTest(arrayAccordionTres);

	$("#testEmpresa").append(contenidoTest);
}

/*Función para cargar las opciones de Tests de Objetivos*/
function cargarTestGestionObjetivos(){

	$("#testObjetivo").html("");

	let arraySubAccordionUno = ["collapseObjetivoAtributosGuardar", "javascript:testObjetivo('Guardar', 'Atributos')", "Añadir Objetivo", "iconoTestObjetivoAtributosGuardar", 
							   "cabeceraAtributosObjetivoGuardar", "cuerpoAtributosObjetivoGuardar"];
	let arraySubAccordionDos = ["collapseObjetivoAtributosModificar", "javascript:testObjetivo('Modificar', 'Atributos')", "Modificar Objetivo", "iconoTestObjetivoAtributosModificar", 
							   "cabeceraAtributosObjetivoModificar", "cuerpoAtributosObjetivoModificar"];
	let arraySubAccordionTres = ["collapseObjetivoAtributosBuscar", "javascript:testObjetivo('Buscar', 'Atributos')", "Buscar Objetivo", "iconoTestObjetivoAtributosBuscar", 
							    "cabeceraAtributosObjetivoBuscar", "cuerpoAtributosObjetivoBuscar"];
	let arrayAccordionUno = ["accordion28", arraySubAccordionUno, arraySubAccordionDos, arraySubAccordionTres];

	let arraySubAccordionCuatro = ["collapseObjetivoAccionesBuscar", "javascript:testObjetivo('Buscar', 'Acciones')", "Buscar Objetivo", "iconoTestObjetivoAccionesBuscar", 
								  "cabeceraAccionesObjetivoBuscar", "cuerpoAccionesObjetivoBuscar"];
	let arraySubAccordionCinco = ["collapseObjetivoAccionesGuardar", "javascript:testObjetivo('Guardar', 'Acciones')", "Guardar Objetivo", "iconoTestObjetivoAccionesGuardar", 
								 "cabeceraAccionesObjetivoGuardar", "cuerpoAccionesObjetivoGuardar"];
	let arraySubAccordionSeis = ["collapseObjetivoAccionesEliminar", "javascript:testObjetivo('Eliminar', 'Acciones')", "Eliminar Objetivo", "iconoTestObjetivoAccionesEliminar", 
								"cabeceraAccionesObjetivoEliminar", "cuerpoAccionesObjetivoEliminar"];
	let arraySubAccordionSiete = ["collapseObjetivoAccionesModificar", "javascript:testObjetivo('Modificar', 'Acciones')", "Modificar Objetivo", "iconoTestObjetivoAccionesModificar", 
								"cabeceraAccionesObjetivoModificar", "cuerpoAccionesObjetivoModificar"];
	let arraySubAccordionOcho = ["collapseObjetivoAccionesReactivar", "javascript:testObjetivo('Reactivar', 'Acciones')", "Reactivar Objetivo", "iconoTestObjetivoAccionesReactivar", 
								"cabeceraAccionesObjetivoReactivar", "cuerpoAccionesObjetivoReactivar"];
	let arrayAccordionDos = ["accordion29", arraySubAccordionCuatro, arraySubAccordionCinco, arraySubAccordionSeis, arraySubAccordionSiete, arraySubAccordionOcho];

	let arrayAccordionTres = ["accordion27", "collapseObjetivoAtributos", null, "Atributos", "iconoTestObjetivoAtributos", null, null, arrayAccordionUno, "collapseObjetivoAcciones", null, "Acciones", 
							 "iconoTestObjetivoAcciones", null, null, arrayAccordionDos];

	var contenidoTest = crearTest(arrayAccordionTres);

	$("#testObjetivo").append(contenidoTest);
}

/*Función para cargar las opciones de Tests de Respuestas Posibles*/
function cargarTestGestionRespuestasPosibles(){

	$("#testRespuestasPosibles").html("");

	let arraySubAccordionUno = ["collapseRespuestasPosiblesAtributosGuardar", "javascript:testRespuestasPosibles('Guardar', 'Atributos')", "Añadir Respuesta Posible", "iconoTestRespuestasPosiblesAtributosGuardar", 
							   "cabeceraAtributosRespuestasPosiblesGuardar", "cuerpoAtributosRespuestasPosiblesGuardar"];
	let arraySubAccordionDos = ["collapseRespuestasPosiblesAtributosModificar", "javascript:testRespuestasPosibles('Modificar', 'Atributos')", "Modificar Respuesta Posible", "iconoTestRespuestasPosiblesAtributosModificar", 
							   "cabeceraAtributosRespuestasPosiblesModificar", "cuerpoAtributosRespuestasPosiblesModificar"];
	let arraySubAccordionTres = ["collapseRespuestasPosiblesAtributosBuscar", "javascript:testRespuestasPosibles('Buscar', 'Atributos')", "Buscar Respuesta Posible", "iconoTestRespuestasPosiblesAtributosBuscar", 
							    "cabeceraAtributosRespuestasPosiblesBuscar", "cuerpoAtributosRespuestasPosiblesBuscar"];
	let arrayAccordionUno = ["accordion31", arraySubAccordionUno, arraySubAccordionDos, arraySubAccordionTres];

	let arraySubAccordionCuatro = ["collapseRespuestasPosiblesAccionesBuscar", "javascript:testRespuestasPosibles('Buscar', 'Acciones')", "Buscar Respuesta Posible", "iconoTestRespuestasPosiblesAccionesBuscar", 
								  "cabeceraAccionesRespuestasPosiblesBuscar", "cuerpoAccionesRespuestasPosiblesBuscar"];
	let arraySubAccordionCinco = ["collapseRespuestasPosiblesAccionesGuardar", "javascript:testRespuestasPosibles('Guardar', 'Acciones')", "Guardar Respuesta Posible", "iconoTestRespuestasPosiblesAccionesGuardar", 
								 "cabeceraAccionesRespuestasPosiblesGuardar", "cuerpoAccionesRespuestasPosiblesGuardar"];
	let arraySubAccordionSeis = ["collapseRespuestasPosiblesAccionesEliminar", "javascript:testRespuestasPosibles('Eliminar', 'Acciones')", "Eliminar Respuesta Posible", "iconoTestRespuestasPosiblesAccionesEliminar", 
								"cabeceraAccionesRespuestasPosiblesEliminar", "cuerpoAccionesRespuestasPosiblesEliminar"];
	let arraySubAccordionSiete = ["collapseRespuestasPosiblesAccionesModificar", "javascript:testRespuestasPosibles('Modificar', 'Acciones')", "Modificar Respuesta Posible", "iconoTestRespuestasPosiblesAccionesModificar", 
								"cabeceraAccionesRespuestasPosiblesModificar", "cuerpoAccionesRespuestasPosiblesModificar"];
	let arraySubAccordionOcho = ["collapseRespuestasPosiblesAccionesReactivar", "javascript:testRespuestasPosibles('Reactivar', 'Acciones')", "Reactivar Respuesta Posible", "iconoTestRespuestasPosiblesAccionesReactivar", 
								"cabeceraAccionesRespuestasPosiblesReactivar", "cuerpoAccionesRespuestasPosiblesReactivar"];
	let arrayAccordionDos = ["accordion32", arraySubAccordionCuatro, arraySubAccordionCinco, arraySubAccordionSeis, arraySubAccordionSiete, arraySubAccordionOcho];

	let arrayAccordionTres = ["accordion30", "collapseRespuestasPosiblesAtributos", null, "Atributos", "iconoTestRespuestasPosiblesAtributos", null, null, arrayAccordionUno, "collapseRespuestasPosiblesAcciones", null, "Acciones", 
							 "iconoTestRespuestasPosiblesAcciones", null, null, arrayAccordionDos];

	var contenidoTest = crearTest(arrayAccordionTres);

	$("#testRespuestasPosibles").append(contenidoTest);
}

/*Función para cargar las opciones de Tests de planes*/
function cargarTestGestionPlanes(){

	$("#testPlan").html("");

	let arraySubAccordionUno = ["collapsePlanAtributosGuardar", "javascript:testPlan('Guardar', 'Atributos')", "Añadir Plan", "iconoTestPlanAtributosGuardar", 
							   "cabeceraAtributosPlanGuardar", "cuerpoAtributosPlanGuardar"];
	let arraySubAccordionDos = ["collapsePlanAtributosModificar", "javascript:testPlan('Modificar', 'Atributos')", "Modificar Plan", "iconoTestPlanAtributosModificar", 
							   "cabeceraAtributosPlanModificar", "cuerpoAtributosPlanModificar"];
	let arraySubAccordionTres = ["collapsePlanAtributosBuscar", "javascript:testPlan('Buscar', 'Atributos')", "Buscar Plan", "iconoTestPlanAtributosBuscar", 
							    "cabeceraAtributosPlanBuscar", "cuerpoAtributosPlanBuscar"];
	let arrayAccordionUno = ["accordion34", arraySubAccordionUno, arraySubAccordionDos, arraySubAccordionTres];

	let arraySubAccordionCuatro = ["collapsePlanAccionesBuscar", "javascript:testPlan('Buscar', 'Acciones')", "Buscar Plan", "iconoTestPlanAccionesBuscar", 
								  "cabeceraAccionesPlanBuscar", "cuerpoAccionesPlanBuscar"];
	let arraySubAccordionCinco = ["collapsePlanAccionesGuardar", "javascript:testPlan('Guardar', 'Acciones')", "Guardar Plan", "iconoTestPlanAccionesGuardar", 
								 "cabeceraAccionesPlanGuardar", "cuerpoAccionesPlanGuardar"];
	let arraySubAccordionSeis = ["collapsePlanAccionesEliminar", "javascript:testPlan('Eliminar', 'Acciones')", "Eliminar Plan", "iconoTestPlanAccionesEliminar", 
								"cabeceraAccionesPlanEliminar", "cuerpoAccionesPlanEliminar"];
	let arraySubAccordionSiete = ["collapsePlanAccionesModificar", "javascript:testPlan('Modificar', 'Acciones')", "Modificar Plan", "iconoTestPlanAccionesModificar", 
								"cabeceraAccionesPlanModificar", "cuerpoAccionesPlanModificar"];
	let arraySubAccordionOcho = ["collapsePlanAccionesReactivar", "javascript:testPlan('Reactivar', 'Acciones')", "Reactivar Plan", "iconoTestPlanAccionesReactivar", 
								"cabeceraAccionesPlanReactivar", "cuerpoAccionesPlanReactivar"];
	let arrayAccordionDos = ["accordion35", arraySubAccordionCuatro, arraySubAccordionCinco, arraySubAccordionSeis, arraySubAccordionSiete, arraySubAccordionOcho];

	let arrayAccordionTres = ["accordion33", "collapsePlanAtributos", null, "Atributos", "iconoTestPlanAtributos", null, null, arrayAccordionUno, "collapsePlanAcciones", null, "Acciones", 
							 "iconoTestPlanAcciones", null, null, arrayAccordionDos];

	var contenidoTest = crearTest(arrayAccordionTres);

	$("#testPlan").append(contenidoTest);
}

/*Función para cargar las opciones de Tests de procedimientos*/
function cargarTestGestionProcedimientos(){

	$("#testProcedimiento").html("");

	let arraySubAccordionUno = ["collapseProcedimientoAtributosGuardar", "javascript:testProcedimiento('Guardar', 'Atributos')", "Añadir Procedimiento", "iconoTestProcedimientoAtributosGuardar", 
							   "cabeceraAtributosProcedimientoGuardar", "cuerpoAtributosProcedimientoGuardar"];
	let arraySubAccordionDos = ["collapseProcedimientoAtributosModificar", "javascript:testProcedimiento('Modificar', 'Atributos')", "Modificar Procedimiento", "iconoTestProcedimientoAtributosModificar", 
							   "cabeceraAtributosProcedimientoModificar", "cuerpoAtributosProcedimientoModificar"];
	let arraySubAccordionTres = ["collapseProcedimientoAtributosBuscar", "javascript:testProcedimiento('Buscar', 'Atributos')", "Buscar Procedimiento", "iconoTestProcedimientoAtributosBuscar", 
							    "cabeceraAtributosProcedimientoBuscar", "cuerpoAtributosProcedimientoBuscar"];
	let arrayAccordionUno = ["accordion37", arraySubAccordionUno, arraySubAccordionDos, arraySubAccordionTres];

	let arraySubAccordionCuatro = ["collapseProcedimientoAccionesBuscar", "javascript:testProcedimiento('Buscar', 'Acciones')", "Buscar Procedimiento", "iconoTestProcedimientoAccionesBuscar", 
								  "cabeceraAccionesProcedimientoBuscar", "cuerpoAccionesProcedimientoBuscar"];
	let arraySubAccordionCinco = ["collapseProcedimientoAccionesGuardar", "javascript:testProcedimiento('Guardar', 'Acciones')", "Guardar Procedimiento", "iconoTestProcedimientoAccionesGuardar", 
								 "cabeceraAccionesProcedimientoGuardar", "cuerpoAccionesProcedimientoGuardar"];
	let arraySubAccordionSeis = ["collapseProcedimientoAccionesEliminar", "javascript:testProcedimiento('Eliminar', 'Acciones')", "Eliminar Procedimiento", "iconoTestProcedimientoAccionesEliminar", 
								"cabeceraAccionesProcedimientoEliminar", "cuerpoAccionesProcedimientoEliminar"];
	let arraySubAccordionSiete = ["collapseProcedimientoAccionesModificar", "javascript:testProcedimiento('Modificar', 'Acciones')", "Modificar Procedimiento", "iconoTestProcedimientoAccionesModificar", 
								"cabeceraAccionesProcedimientoModificar", "cuerpoAccionesProcedimientoModificar"];
	let arraySubAccordionOcho = ["collapseProcedimientoAccionesReactivar", "javascript:testProcedimiento('Reactivar', 'Acciones')", "Reactivar Procedimiento", "iconoTestProcedimientoAccionesReactivar", 
								"cabeceraAccionesProcedimientoReactivar", "cuerpoAccionesProcedimientoReactivar"];
	let arrayAccordionDos = ["accordion38", arraySubAccordionCuatro, arraySubAccordionCinco, arraySubAccordionSeis, arraySubAccordionSiete, arraySubAccordionOcho];

	let arrayAccordionTres = ["accordion36", "collapseProcedimientoAtributos", null, "Atributos", "iconoTestProcedimientoAtributos", null, null, arrayAccordionUno, "collapseProcedimientoAcciones", null, "Acciones", 
							 "iconoTestProcedimientoAcciones", null, null, arrayAccordionDos];

	var contenidoTest = crearTest(arrayAccordionTres);

	$("#testProcedimiento").append(contenidoTest);
}

/*Función para cargar las opciones de Tests de procesos*/
function cargarTestGestionProcesos(){

	$("#testProceso").html("");

	let arraySubAccordionUno = ["collapseProcesoAtributosGuardar", "javascript:testProceso('Guardar', 'Atributos')", "Añadir Proceso", "iconoTestProcesoAtributosGuardar", 
							   "cabeceraAtributosProcesoGuardar", "cuerpoAtributosProcesoGuardar"];
	let arraySubAccordionDos = ["collapseProcesoAtributosModificar", "javascript:testProceso('Modificar', 'Atributos')", "Modificar Proceso", "iconoTestProcesoAtributosModificar", 
							   "cabeceraAtributosProcesoModificar", "cuerpoAtributosProcesoModificar"];
	let arraySubAccordionTres = ["collapseProcesoAtributosBuscar", "javascript:testProceso('Buscar', 'Atributos')", "Buscar Proceso", "iconoTestProcesoAtributosBuscar", 
							    "cabeceraAtributosProcesoBuscar", "cuerpoAtributosProcesoBuscar"];
	let arrayAccordionUno = ["accordion40", arraySubAccordionUno, arraySubAccordionDos, arraySubAccordionTres];

	let arraySubAccordionCuatro = ["collapseProcesoAccionesBuscar", "javascript:testProceso('Buscar', 'Acciones')", "Buscar Proceso", "iconoTestProcesoAccionesBuscar", 
								  "cabeceraAccionesProcesoBuscar", "cuerpoAccionesProcesoBuscar"];
	let arraySubAccordionCinco = ["collapseProcesoAccionesGuardar", "javascript:testProceso('Guardar', 'Acciones')", "Guardar Proceso", "iconoTestProcesoAccionesGuardar", 
								 "cabeceraAccionesProcesoGuardar", "cuerpoAccionesProcesoGuardar"];
	let arraySubAccordionSeis = ["collapseProcesoAccionesEliminar", "javascript:testProceso('Eliminar', 'Acciones')", "Eliminar Proceso", "iconoTestProcesoAccionesEliminar", 
								"cabeceraAccionesProcesoEliminar", "cuerpoAccionesProcesoEliminar"];
	let arraySubAccordionSiete = ["collapseProcesoAccionesModificar", "javascript:testProceso('Modificar', 'Acciones')", "Modificar Proceso", "iconoTestProcesoAccionesModificar", 
								"cabeceraAccionesProcesoModificar", "cuerpoAccionesProcesoModificar"];
	let arraySubAccordionOcho = ["collapseProcesoAccionesReactivar", "javascript:testProceso('Reactivar', 'Acciones')", "Reactivar Proceso", "iconoTestProcesoAccionesReactivar", 
								"cabeceraAccionesProcesoReactivar", "cuerpoAccionesProcesoReactivar"];
	let arrayAccordionDos = ["accordion41", arraySubAccordionCuatro, arraySubAccordionCinco, arraySubAccordionSeis, arraySubAccordionSiete, arraySubAccordionOcho];

	let arrayAccordionTres = ["accordion39", "collapseProcesoAtributos", null, "Atributos", "iconoTestProcesoAtributos", null, null, arrayAccordionUno, "collapseProcesoAcciones", null, "Acciones", 
							 "iconoTestProcesoAcciones", null, null, arrayAccordionDos];

	var contenidoTest = crearTest(arrayAccordionTres);

	$("#testProceso").append(contenidoTest);
} 
