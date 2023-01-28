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
    if(arrayDatos != null){
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
    }
	

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

    let arrayAccordion = ["accordion6", "collapseRolAtributos", "javascript:testRol('Atributos')", "Atributos", "iconoTestRolAtributos", "cabeceraAtributosRol", 
							  "cuerpoAtributosRol", null, "collapseRolAcciones", "javascript:testRol('Acciones')", "Acciones", "iconoTestRolAcciones", 
							  "cabeceraAccionesRol", "cuerpoAccionesRol", null];


	var contenidoTest = crearTest(arrayAccordion);

	$("#testRol").append(contenidoTest);
}


/*Función para cargar las opciones de Tests de Funcionalidades*/
function cargarTestGestionFuncionalidades(){

	$("#testFuncionalidad").html("");

    let arrayAccordion = ["accordion7", "collapseFuncionalidadAtributos", "javascript:testFuncionalidad('Atributos')", "Atributos", "iconoTestFuncionalidadAtributos", "cabeceraAtributosFuncionalidad", 
    "cuerpoAtributosFuncionalidad", null, "collapseFuncionalidadAcciones", "javascript:testFuncionalidad('Acciones')", "Acciones", "iconoTestFuncionalidadAcciones", 
    "cabeceraAccionesFuncionalidad", "cuerpoAccionesFuncionalidad", null];

    var contenidoTest = crearTest(arrayAccordion);

	$("#testFuncionalidad").append(contenidoTest);
}

/*Función para cargar las opciones de Tests de Acciones*/
function cargarTestGestionAcciones(){

	$("#testAccion").html("");

	let arrayAccordion = ["accordion8", "collapseAccionAtributos", "javascript:testAccion('Atributos')", "Atributos", "iconoTestAccionAtributos", "cabeceraAtributosAccion", 
    "cuerpoAtributosAccion", null, "collapseAccionAcciones", "javascript:testAccion('Acciones')", "Acciones", "iconoTestAccionAcciones", 
    "cabeceraAccionesAccion", "cuerpoAccionesAccion", null];

    var contenidoTest = crearTest(arrayAccordion);

	$("#testAccion").append(contenidoTest);
}
/*Función para cargar las opciones de Tests de Usuario*/
function cargarTestGestionUsuarios(){

	$("#testUsuario").html("");

	let arrayAccordion = ["accordion10", "collapseUsuarioAtributos", "javascript:testUsuario('Atributos')", "Atributos", "iconoTestUsuarioAtributos", "cabeceraAtributosUsuario", 
    "cuerpoAtributosUsuario", null, "collapseUsuarioAcciones", "javascript:testUsuario('Acciones')", "Acciones", "iconoTestUsuarioAcciones", 
    "cabeceraAccionesUsuario", "cuerpoAccionesUsuario", null];

    var contenidoTest = crearTest(arrayAccordion);

	$("#testUsuario").append(contenidoTest);
}

/*Función para cargar las opciones de Tests de Noticias*/
function cargarTestGestionNoticias(){

	$("#testNoticia").html("");

	let arrayAccordion = ["accordion9", "collapseNoticiaAtributos", "javascript:testNoticia('Atributos')", "Atributos", "iconoTestNoticiaAtributos", "cabeceraAtributosNoticia", 
    "cuerpoAtributoNoticia", null, "collapseNoticiaAcciones", "javascript:testNoticia('Acciones')", "Acciones", "iconoTestNoticiaAcciones", 
    "cabeceraAccionesNoticia", "cuerpoAccionesNoticia", null];

    var contenidoTest = crearTest(arrayAccordion);

	$("#testNoticia").append(contenidoTest);
} 

/*Función para cargar las opciones de Tests de Personas*/
function cargarTestGestionPersonas(){

	$("#testPersona").html("");

	let arrayAccordion = ["accordion11", "collapsePersonaAtributos", "javascript:testPersona('Atributos')", "Atributos", "iconoTestPersonaAtributos", "cabeceraAtributosPersona", 
    "cuerpoAtributosPersona", null, "collapsePersonaAcciones", "javascript:testPersona('Acciones')", "Acciones", "iconoTestPersonaAcciones", 
    "cabeceraAccionesPersona", "cuerpoAccionesPersona", null];

    var contenidoTest = crearTest(arrayAccordion);

	$("#testPersona").append(contenidoTest);
}


/*Función para cargar las opciones de Tests de Objetivos*/
function cargarTestGestionCategorias(){

	$("#testCategoria").html("");

	let arrayAccordion = ["accordion11", "collapseCategoriaAtributos", "javascript:testCategoria('Atributos')", "Atributos", "iconoTestCategoriaAtributos", "cabeceraAtributosCategoria", 
    "cuerpoAtributosCategoria"];

    var contenidoTest = crearTest(arrayAccordion);
	$("#testCategoria").append(contenidoTest);
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
}