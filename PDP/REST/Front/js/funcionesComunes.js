/**Función para cambiar las banderas de idiomas*/
function cargarIdioma(idioma, funcionalidad){
	if (idioma == "spanish"){
		document.getElementById("imagenIdioma").src = "images/Spain.png";
		setLang('ES');
	} else if (idioma == "english"){
		document.getElementById("imagenIdioma").src = "images/United-Kingdom.png";
		setLang('EN');
	} else if (idioma == "galego"){
		document.getElementById("imagenIdioma").src = "images/Galicia.png";
		setLang('GA');
	}
	posicionarTitulo(funcionalidad);
}

/**Función para incluir el footer*/
function includeFooter() {
	$("#footer").html("");

	var footer = '<footer class="fixed-bottom page-footer font-small footer">' +
				'<div class="footer-copyright text-center py-3">©Copyright:' +
				'<a href="#"> Carboon Footprint</a>' +
				'</div>' +
				'</footer>' ;

	$("#footer").append(footer);
}

/**Función para incluir el menú superior*/
function includeTopMenu(funcionalidad) {
	$("#topMenu").html("");

	var topMenu = '<nav class="fixed-top navbar navbar-expand-md navbar-dark menuIdioma">' + 
				'<a class="navbar-brand" href="#">' +
    			'<img src="images/iconoIndex2.png" alt="Logo" class="imagenLogo">' +
  				'</a>' +
				'<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">' + 
				'<span class="navbar-toggler-icon"></span>' +
				'</button>' +
				'<div class="collapse navbar-collapse" id="collapsibleNavbar">' +
				'<ul class="navbar-nav">' +
				'<li class="nav-item dropdown">' +
				'<a class="nav-link dropdown-toggle" href="#" id="navbardrop" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">' +
				'<img class="nav-link dropdown-toggle" id="imagenIdioma" src=""/>' +
				'</a>' +
				'<div class="dropdown-menu" aria-labelledby="navbarDropdown">' +
				'<a class="dropdown-item" href="#" onclick="cargarIdioma(\'spanish\', \'' + funcionalidad + '\');">' + 
				'<input type="submit" name="btnEspanol" id="btnEspanol" value="" onclick="cargarIdioma(\'spanish\', \'' + funcionalidad + '\');" />' +
				'</a>' +
				'<div class="dropdown-divider"></div>' +
				'<a class="dropdown-item" href="#" onclick="cargarIdioma(\'english\', \'' + funcionalidad + '\');">' +
				'<input type="submit" name="btnIngles" id="btnIngles" value="" onclick="cargarIdioma(\'english\', \'' + funcionalidad + '\');" />' +
				'</a>' +
				'<div class="dropdown-divider"></div>' +
				'<a class="dropdown-item" href="#" onclick="cargarIdioma(\'galego\', \'' + funcionalidad + '\');">' +
				'<input type="submit" name="btnGallego" id="btnGallego" value="" onclick="cargarIdioma(\'galego\', \'' + funcionalidad + '\');" />' +
				'</a>' +
				'</div>' +
				'</li>' +
				'<li class="nav-item dropdown">' +
				'<a class="nav-link dropdown-toggle" href="#" id="navbardrop3" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">' +
				'<img id="imagenHome" src="images/home.png"/>' +
				'<div class="home MENU">Menú</div>' +
				'</a>' + 
				'<div class="dropdown-menu" id="listadoFuncionalidades">' +
				'</div>' +
				'</li>' +	
				'<li class="nav-item dropdown">' +					
				'<a class="nav-link dropdown-toggle" href="#" id="navbardrop2" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">' +
				'<img id="imagenUsuario" src="images/usuario.png"/>' +
				'<div class="usuarioConectado">' + getCookie('usuario') + '</div>' +
				'</a>' +
				'<div class="dropdown-menu">' +
				'<a class="dropdown-item CAMBIAR_CONTRASEÑA_MENU" href="#" data-toggle="modal" data-target="#changePass-modal" onclik="javascript:modalCambioPass()">Cambiar Contraseña</a>' +
				'<div class="dropdown-divider"></div>' +
				'<a class="dropdown-item DESCONECTAR" href="index.html" onclick="javascript:desconectar()">Desconectar</a>' +
				'</div>' +
				'</li>' +
				'</ul>' +
				'</div>' +
				'</nav>';

	$("#topMenu").append(topMenu);

	setLang(getCookie('lang'));

}

function modalCambioPass(){
	
	$("#changePass-modal").html("");

	var contenidoModal = 
    	'<div class="modal-dialog">' +
			'<div class="changePassmodal-container">' +
				'<h1 class="CAMBIAR_CONTRASEÑA"></h1><br>' +
				'<form name="formularioChangePass" id="formularioChangePass" action="javascript:changePass()" onsubmit="return comprobarChangePass()">' +
					'<input type="password" name="PASS_USUARIO_NUEVA" class="PASS_USUARIO_NUEVA" maxlength="45" size="45" id="passChangePass1" placeholder="Usuario" placeholder="Contraseña" onKeyPress="capLock(event,\'bloqueoMayusculasChangePass\');" onblur="return comprobarPass(\'passChangePass1\', \'errorFormatoChangePass1\', \'passwordChange\')"; autocomplete="new-password">' +
					'<div style="display:none" id="errorFormatoChangePass1"></div>' +
					'<input type="password" name="CONFIRMAR_PASS_USUARIO" class="CONFIRMAR_PASS_USUARIO" id="passChangePass2" maxlength="45" size="45" placeholder="Contraseña" onKeyPress="capLock(event,\'bloqueoMayusculasChangePass\');" onblur="return comprobarPassConfirmChangePass(\'passChangePass2\', \'errorFormatoChangePass2\', \'passwordChange\')" autocomplete="new-password">' +
					'<div style="display:none" class="BLOQUEO_MAYUSCULAS alert alert-warning" id="bloqueoMayusculasChangePass"></div>' +  
          			'<div style="display:none" id="errorFormatoChangePass2" class="alert alert-danger ocultar"></div>' +  
					'<div id="error" class="alert alert-danger ocultar" role="alert" class="CONTRASEÑAS_NO_COINCIDEN"></div>' +
					'<button type="submit" name="btnChangePass" value="Cambiar contraseña" class="btnChangePass tooltip3">' +
                        '<img class=iconoResetPass iconResetPass" src="images/resetPass.png" alt="CAMBIAR_CONTRASEÑA" />' +
                        '<span class="tooltiptext3 ICONO_RESET_PASS"></span>' +
                	'</button>' +

				'</form>' +	

			'</div>' +
		'</div>';


    $("#changePass-modal").append(contenidoModal);

    setLang(getCookie('lang'));

}

/**Función para ordenar una tabla por columna*/
function sortTable(n , idTable) {

	var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;

  	table = document.getElementById(idTable);
  	switching = true;

  	dir = "asc"; 

	while (switching) {

    	switching = false;
    	rows = table.rows;

    	for (i = 1; i < (rows.length - 1); i++) {
      		
      		shouldSwitch = false;
      		
      		x = rows[i].getElementsByTagName("TD")[n];
      		y = rows[i + 1].getElementsByTagName("TD")[n];
      
      		if (dir == "asc") {
        		if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
          		
          			shouldSwitch= true;
         			break;
        		}
      		} else if (dir == "desc") {
        		
        		if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {

          			shouldSwitch = true;
          			break;
        		}
      		}
    	}
    
    	if (shouldSwitch) {
      		
      		rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      		switching = true;
      
      		switchcount ++;      
    	
    	} else {

      		if (switchcount == 0 && dir == "asc") {
        		dir = "desc";
        		switching = true;
      		}
    	}
  	}
 }

/*Función para establecer el valor de la cookie*/
function setCookie(name, value, days) {

    var expires = "";

    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }

    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}

/*Función para obtener el valor de la cookie*/
function getCookie(name) {

    var nameEQ = name + "=";
    var ca = document.cookie.split(';');

    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }

    return null;

}
 
function capLock(e, idElemento){
    kc=e.keyCode?e.keyCode:e.which;
    sk=e.shiftKey?e.shiftKey:((kc==16)?true:false);
    if(((kc>=65&&kc<=90)&&!sk)||((kc>=97&&kc<=122)&&sk )){
        document.getElementById(idElemento).style.display = "block";
    } else {
        document.getElementById(idElemento).style.display = "none";
    }
}

/**Función que resetear los valores del formulario*/
function resetearFormulario(idFormulario, idElementoList) {

	document.getElementById(idFormulario).reset();

	idElementoList.forEach( function (idElemento) {
		document.getElementById(idElemento).style.borderColor = "#c8c8c8";
	});	

}

/**Función para cerrar las ventanas modales*/
function cerrarModal(idElement){
	document.getElementById(idElement).style.display = "none";
}

/**Función para cerrar las ventanas modales*/
function cerrarModalNoToken(idElement){
	document.getElementById(idElement).style.display = "none";
	window.location.href = "index.html";
}        

/**Función para desconectar la aplicación */
function desconectar(){
	deleteAllCookies();
}

/*Función que elimina todas las cookies para que no quede basura en ellas*/
function deleteAllCookies() {
     var cookies = document.cookie.split(";");
     for (var i = 0; i < cookies.length; i++) {
         var cookie = cookies[i];
         var eqPos = cookie.indexOf("=");
         var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
         setCookie(name, '');
     }
 }

/**Función para eliminar los mensajes de validación de error*/
function eliminarMensajesValidacionError(idElementoErrorList, idElementoList){
	
	idElementoErrorList.forEach( function (idElementoError) {
		$("#"+idElementoError).removeClass();
		$("#"+idElementoError).html('');
		$("#"+idElementoError).css("display", "none");
	});	
	
	idElementoList.forEach( function (idElemento){
		$("#"+idElemento).removeAttr("style");
		$("#"+idElemento).css("border", "1px solid #D1C4E9");
		$("#"+idElemento).css("borderTop",  "2px solid #B39DDB");
	});
}


/**Función para eliminar los mensajes de validación de error*/
function eliminarMensajesValidacionErrorUnElemento(idElementoError, idElemento){
	
	
	$("#"+idElementoError).removeClass();
	$("#"+idElementoError).html('');
	$("#"+idElementoError).css("display", "none");
		
	$("#"+idElemento).removeAttr("style");
	$("#"+idElemento).css("border", "1px solid #D1C4E9");
	$("#"+idElemento).css("borderTop",  "2px solid #B39DDB");
	
}

/**Función para limpiar los campos de un formulario*/
function limpiarFormulario(idElementoList){
	
	idElementoList.forEach( function (idElemento){
		$("#"+idElemento).val('');
	});
}

/**Función para encriptar la pass en md5*/
function encriptar(idElemento){
	document.getElementById(idElemento).value = hex_md5(document.getElementById(idElemento).value);
  	return true;

}

/**Función que va a rellena los select **/
function rellenaSelect(select, datos){

	var lista = datos;

	for(var i = 0; i<lista.length; i++){
		var option = document.createElement("option");
		option.setAttribute("value", datos[i].idEmpresa);
		option.setAttribute("label", datos[i].nombreEmpresa);

		select.append(option);
	}

	var option = document.createElement("option");
	option.setAttribute("value", "default");
	option.setAttribute("label", " --- Añadir nueva empresa --- ");

	select.append(option);

	setLang(getCookie('lang'));

}

/**Función que va a eliminar los options de los select **/
function limpiaSelect(select){

	select.empty();
}

/*Funcion para limpiar los radio button */
function limpiaRadioButton(idElementos){
	idElementos.forEach( function (idElemento){
		$("#"+idElemento).prop('checked', false);
	});
}

/**Función para comprobar que el token del usuario se encuentra en las cookies**/
function comprobarTokenUsuario(funcionalidad){
	var token = getCookie('tokenUsuario');
	var idioma = getCookie('lang');
	var rol = getCookie('rolUsuario');

	if(token === null || token === ""){
		errorAutenticado("ERROR_AUTENTICACION", idioma);
	}else{
		switch(funcionalidad){
			case 'menu':
				document.getElementById("bienvenida").style.display = "block";
			break;
			case 'accion':
			case 'funcionalidad':
			case 'noticias':
			case 'categoria':
			case 'parametro':
			case 'rol':
			case 'logAcciones':
			case 'logExcepciones':
				document.getElementById("cabecera").style.display = "block";
				document.getElementById("tablaDatos").style.display = "block";
				document.getElementById("volver").style.display = "block";
			break;
			case 'persona':
			case 'usuario':
				document.getElementById("volver").style.display = "block";
			break;
			case 'test':
				document.getElementById("mensajeTest").style.display = "block";
				document.getElementById("accordion").style.display = "block";
				document.getElementById("volver").style.display = "block";
			break;
			case 'procedimientosejecutados':
			break;
		}
	}
}

/*Función que muestra el error de acceso por no estar autenticado**/
function errorAutenticado(codigoResponse, idioma){
	$("#modal-title").removeClass();
    $("#modal-title").addClass("STOP");
	document.getElementById("modal-title").style.color = "#a50707";	
    document.getElementById("modal-title").style.top = "13%";
	$("#modal-mensaje").removeClass();
    $("#modal-mensaje").addClass(codigoResponse);   
    $(".imagenAviso").attr('src', "images/stop.png");   
    setLang(idioma);
    document.getElementById("modal").style.display = "block";
}

/**Función que muestra el error de fallo interno de la aplicación*/
function errorInternal(codigoResponse, idioma){
	$("#modal-title").removeClass();
    $("#modal-title").addClass("ERROR_INTERNO");
	document.getElementById("modal-title").style.color = "#a50707";	
    document.getElementById("modal-title").style.top = "10%";
	$("#modal-mensaje").removeClass();
    $("#modal-mensaje").addClass(codigoResponse);   
    $(".imagenAviso").attr('src', "images/caution.png");   
    setLang(idioma);
    document.getElementById("modal").style.display = "block";
}

/**Función que construye cada línea que se va a rellenar en la tabla*/
function construyeFila(entidad, fila) {
	let atributosFunciones="";
	var filaTabla = "";

	if(entidad == 'LOG_EXCEPCIONES' || entidad == 'LOG_ACCIONES'){
	 	document.getElementById('cabecera').style.display = "block";
	} else {
	 	document.getElementById('cabecera').style.display = "block";
		document.getElementById('cabeceraEliminados').style.display = "none";
	}

	switch(entidad){
		case 'ROL':
			atributosFunciones = ["'" + fila.nombre_rol + "'", "'" + fila.descripcion_rol + "'", "'" + fila.id_rol + "'"];
			filaTabla = '<tr class="impar"> <td>' + fila.nombre_rol + 
                '</td> <td>' + fila.descripcion_rol;
        break;

        case 'FUNCIONALIDAD':
			atributosFunciones = ["'" + fila.nombre_funcionalidad + "'", "'" + fila.descripcion_funcionalidad + "'", "'" + fila.id_funcionalidad + "'"];
			filaTabla = '<tr class="impar"> <td>' + fila.nombre_funcionalidad + 
                '</td> <td>' + fila.descripcion_funcionalidad;
        break;

        case 'ACCION':
			atributosFunciones = ["'" + fila.nombre_accion + "'", "'" + fila.descripcion_accion + "'", "'" + fila.id_accion + "'"];
			filaTabla = '<tr class="impar"> <td>' + fila.nombre_accion + 
                '</td> <td>' + fila.descripcion_accion;
        break;

        case 'LOG_EXCEPCIONES':
			atributosFunciones = ["'" + fila.usuario + "'", "'" + fila.tipoExcepcion + "'", "'" + fila.descripcionExcepcion + "'", "'" + fila.fecha + "'"];
			var fecha = new Date(fila.fecha);
			filaTabla = '<tr class="impar"> <td>' + fila.usuario + 
                '</td> <td>' + fila.tipoExcepcion + 
                '</td> <td>' + fila.descripcionExcepcion +
                '</td> <td>' +  convertirFecha(fecha.toString());
        break;

        case 'LOG_ACCIONES':
			atributosFunciones = ["'" + fila.usuario + "'", "'" + fila.accion + "'", "'" + fila.datos + "'", "'" + fila.fecha + "'"];
			var fecha = new Date(fila.fecha);
			filaTabla = '<tr class="impar"> <td>' + fila.usuario + 
                '</td> <td>' + fila.accion + 
                '</td> <td>' + fila.datos +
                '</td> <td>' + convertirFecha(fecha.toString());
        break;

        case 'USUARIO':
			atributosFunciones = ["'" + fila.usuario.dni_usuario + "'", "'" + fila.usuario.usuario + "'", "'" + fila.usuario.borrado_usuario + "'", "'" + fila.rol.nombre_rol + "'"];
			var usuarioActivo = "";
			if(fila.usuario.borrado_usuario == 0){
				usuarioActivo = "Sí";
			}else{
				usuarioActivo = "No";
			}

			filaTabla = '<tr class="impar"> <td>' + fila.usuario.dni_usuario + 
                '</td> <td>' + fila.usuario.usuario + 
                '</td> <td>' + usuarioActivo +
                '</td> <td>' + fila.rol.nombre_rol;
        break;

        case 'PERSONA':
        	var fechaNacimiento = new Date(fila.persona.fecha_nac_persona);
        	atributosFunciones = ["'" + fila.persona.dni_persona + "'", "'" + fila.persona.nombre_persona + "'", "'" + fila.persona.apellidos_persona + "'", "'" + convertirFecha(fechaNacimiento.toString()) + "'"
        	, "'" + fila.persona.direccion_persona + "'", "'" + fila.persona.telefono_persona + "'", "'" + fila.persona.email_persona + "'", "'" + fila.persona.borrado_persona + "'",
        	"'" + fila.usuario.usuario + "'", "'" + fila.rol.nombre_rol + "'", "'" + fila.usuario.borrado_usuario + "'"];
			
			filaTabla = '<tr class="impar"> <td>' + fila.persona.dni_persona + 
                '</td> <td>' + fila.persona.nombre_persona + 
                '</td> <td>' + fila.persona.apellidos_persona  + 
                '</td> <td>' + fila.persona.email_persona + 
                '</td> <td>' + fila.usuario.usuario;
        break;

        case 'NOTICIA':
        var fechaNoticia = new Date(fila.fecha_noticia);

		atributosFunciones = ["'" + fila.titulo_noticia + "'", "'" + fila.contenido_noticia + "'", "'" + convertirFecha(fechaNoticia.toString()) + "'", "'" + fila.id_noticia + "'"];
			filaTabla = '<tr class="impar"> <td>' + fila.titulo_noticia + 
                '</td> <td>' + fila.contenido_noticia +
                '</td> <td>' + convertirFecha(fechaNoticia.toString());
        break;

        case 'CATEGORIA':
			if(fila.categoria_padre != null){
				atributosFunciones = ["'" + fila.categoria.nombre_categoria + "'", "'" + fila.categoria.descripcion_categoria + "'", "'" + fila.responsable.dni_usuario + "'", "'" + fila.responsable.usuario + "'", "'" + fila.categoria_padre.id_categoria + "'", "'" + fila.categoria_padre.nombre_categoria + "'", "'" + fila.categoria.id_categoria + "'"];
			}else{
				atributosFunciones = ["'" + fila.categoria.nombre_categoria + "'", "'" + fila.categoria.descripcion_categoria + "'","'" + fila.responsable.dni_usuario + "'", "'" + fila.responsable.usuario + "'","'" + null + "'", "'" + null+ "'","'" + fila.categoria.id_categoria + "'"];
			}
			
			filaTabla = '<tr class="impar"> <td>' + fila.categoria.nombre_categoria + 
                '</td> <td>' + fila.categoria.descripcion_categoria +
				'</td> <td>' + fila.responsable.usuario;
        break;

        case 'RESPUESTA_POSIBLE' :
        	atributosFunciones = ["'" + fila.textoRespuesta + "'","'" + fila.idRespuesta + "'"];
			filaTabla = '<tr class="impar"> <td>' + fila.textoRespuesta;
        break;

        case 'PLAN':
        var fechaPlan = new Date(fila.fechaPlan);

		atributosFunciones = ["'" + fila.nombrePlan + "'", "'" + fila.descripPlan + "'", "'" + convertirFecha(fechaPlan.toString()) + "'", "'" + fila.objetivo.nombreObjetivo + "'", "'" + fila.objetivo.descripObjetivo + "'","'" + fila.idPlan + "'"];
			filaTabla = '<tr class="impar"> <td>' + fila.nombrePlan + 
                '</td> <td>' + fila.descripPlan +
                '</td> <td>' + convertirFecha(fechaPlan.toString()) +
                '</td> <td>' + fila.objetivo.nombreObjetivo; 
        break;

        case 'PROCEDIMIENTO':
        var fechaProcedimiento = new Date(fila.fechaProcedimiento);

        if(fila.checkUsuario == 0){
        	var publicado = "No publicado";
        }else{
        	var publicado = "Publicado" ;
        }

		atributosFunciones = ["'" + fila.nombreProcedimiento + "'", "'" + fila.descripProcedimiento + "'", "'" + convertirFecha(fechaProcedimiento.toString()) + "'", "'" + publicado + "'","'" + fila.plan.nombrePlan + "'", "'" + fila.plan.descripPlan + "'","'" + fila.idProcedimiento + "'"];
			filaTabla = '<tr class="impar"> <td>' + fila.nombreProcedimiento + 
                '</td> <td>' + fila.descripProcedimiento +
                '</td> <td>' + convertirFecha(fechaProcedimiento.toString()) +
                '</td> <td>' + publicado +  
                '</td> <td>' + fila.plan.nombrePlan; 
        break;


        case 'PROCESO':
        var fechaProceso = new Date(fila.fechaProceso);
		atributosFunciones = ["'" + fila.nombreProceso + "'", "'" + fila.descripProceso + "'", "'" + convertirFecha(fechaProceso.toString()) + "'", "'" + fila.idProceso + "'", fila.procedimientos, fila.objetivos, fila.respuestasPosibles];
			filaTabla = '<tr class="impar"> <td>' + fila.nombreProceso + 
                '</td> <td>' + fila.descripProceso +
                '</td> <td>' + convertirFecha(fechaProceso.toString());
         
        break;
	};

	if(entidad == 'PERSONA'){
		var celdaAccionesEditar = '<div class="tooltip6"><img class="editar editarPermiso" src="images/edit.png" data-toggle="" data-target="" onclick="showEditar(' + atributosFunciones + 
                               ')" alt="Editar"/><span class="tooltiptext iconEditUser ICONO_EDIT">Editar</span></div>';
	}else{
		var celdaAccionesEditar = '<div class="tooltip6"><img class="editar editarPermiso" src="images/edit.png" data-toggle="" data-target="" onclick="showEditar(' + atributosFunciones + 
                               ')" alt="Editar"/><span class="tooltiptext iconEditUser ICONO_EDIT">Editar</span></div>';
	}

	var celdaAccionesDetalle = '<div class="tooltip6"><img class="detalle detallePermiso" src="images/detail.png" data-toggle="" data-target="" onclick="showDetalle(' + atributosFunciones + 
                               ')" alt="Detalle"/><span class="tooltiptext iconDetailUser ICONO_DETALLE">Detalle</span></div>';
    var celdaAccionesEliminar = '<div class="tooltip6"><img class="eliminar eliminarPermiso" src="images/delete.png" data-toggle="" data-target="" onclick="showEliminar(' + atributosFunciones + 
                               ')" alt="Eliminar"/><span class="tooltiptext iconDeleteUser ICONO_ELIMINAR">Eliminar</span></div>';


    if(entidad == 'LOG_EXCEPCIONES' || entidad == 'LOG_ACCIONES'){
    	var celdaAcciones = "";
    }else{
    	var celdaAcciones = celdaAccionesDetalle + celdaAccionesEditar + celdaAccionesEliminar;

    	filaTabla = filaTabla + 
                '</td> <td class="acciones">' + celdaAcciones +  
                '</td> </tr>';
    }

    setLang(getCookie('lang'));

    return filaTabla;
}

/**Función que construye cada línea que se va a rellenar en la tabla*/
function construyeFilaProceso(entidad, fila, procedimientos, objetivos, respuestasPosibles, niveles, ordenProceso) {
	
	document.getElementById('cabecera').style.display = "block";
	document.getElementById('cabeceraEliminados').style.display = "none";

	let atributosFunciones="";
	var filaTabla = "";
	var listProcedimientos=[];
	var listObjetivos = [];
	var listRespuestasPosibles=[];
	var listNiveles=[];
	var listOrdenProcesos = [];

	switch(entidad){
        case 'PROCESO':
        var fechaProceso = new Date(fila.fechaProceso);

        for(var i = 0; i<procedimientos.length; i++){
        	listProcedimientos.push(procedimientos[i].idProcedimiento);
        	listProcedimientos.push(procedimientos[i].nombreProcedimiento);
        }

        for(var i = 0; i<objetivos.length; i++){
        	listObjetivos.push(objetivos[i].idObjetivo);
        	listObjetivos.push(objetivos[i].nombreObjetivo);
        }

        for(var i = 0; i<respuestasPosibles.length; i++){
        	listRespuestasPosibles.push(respuestasPosibles[i].idRespuesta);
        	listRespuestasPosibles.push(respuestasPosibles[i].textoRespuesta);
        }

        for(var i = 0; i<niveles.length; i++){
        	listNiveles.push(niveles[i]);
        }

         for(var i = 0; i<ordenProceso.length; i++){
        	listOrdenProcesos.push(ordenProceso[i]);
        }

		atributosFunciones = ["'" + fila.nombreProceso + "'", "'" + fila.descripProceso + "'", "'" + convertirFecha(fechaProceso.toString()) + "'", "'" + fila.idProceso + "'", "'" + listProcedimientos + "'", "'" + listObjetivos +"'", "'" + listRespuestasPosibles + "'", "'" + listNiveles + "'", "'" + listOrdenProcesos + "'"];
			filaTabla = '<tr class="impar"> <td>' + fila.nombreProceso + 
                '</td> <td>' + fila.descripProceso +
                '</td> <td>' + convertirFecha(fechaProceso.toString());
         
        break;
	};

	
	var celdaAccionesEditar = '<div class="tooltip6"><img class="editar editarPermiso" src="images/edit.png" data-toggle="" data-target="" onclick="showEditar(' + atributosFunciones + 
                               ')" alt="Editar"/><span class="tooltiptext iconEditUser ICONO_EDIT">Editar</span></div>';
	var celdaAccionesDetalle = '<div class="tooltip6"><img class="detalle detallePermiso" src="images/detail.png" data-toggle="" data-target="" onclick="showDetalle(' + atributosFunciones + 
                               ')" alt="Detalle"/><span class="tooltiptext iconDetailUser ICONO_DETALLE">Detalle</span></div>';
    var celdaAccionesEliminar = '<div class="tooltip6"><img class="eliminar eliminarPermiso" src="images/delete.png" data-toggle="" data-target="" onclick="showEliminar(' + atributosFunciones + 
                               ')" alt="Eliminar"/><span class="tooltiptext iconDeleteUser ICONO_ELIMINAR">Eliminar</span></div>';


   
    var celdaAcciones = celdaAccionesDetalle + celdaAccionesEditar + celdaAccionesEliminar;

    	filaTabla = filaTabla + 
                '</td> <td class="acciones">' + celdaAcciones +  
                '</td> </tr>';
    

    setLang(getCookie('lang'));

    return filaTabla;
}

/** Funcion que construye cada línea de la tabla procedimientos ejecutados **/
function construyeFilaProcedimientoEjecutado(entidad, fila, numeroProcesosTotal, numeroProcesosEjecutados){

	document.getElementById('cabecera').style.display = "block";

	let atributosFunciones="";
	var filaTabla = "";
	var listProcedimientos=[];
	var listObjetivos = [];
	var listRespuestasPosibles=[];
	var listNiveles=[];
	var listOrdenProcesos = [];

	switch(entidad){
        case 'PROCEDIMIENTOSEJECUTADOS':
        var fechaProcedimientoEjecutado = new Date(fila.fechaProcedimientoUsuario);

        if(numeroProcesosEjecutados == 0){
        	var estado = 'Sin iniciar';
        }else if(numeroProcesosEjecutados > 0 && numeroProcesosEjecutados < numeroProcesosTotal){
        	var estado = 'Iniciado';
        }else{
        	var estado = 'Finalizado';
        }

		atributosFunciones = ["'" + fila.procedimiento.nombreProcedimiento + "'", "'" + fila.usuario.usuario + "'", "'" + convertirFecha(fechaProcedimientoEjecutado.toString()) + "'", "'" + estado + "'",  "'" + fila.puntuacionProcedimientoUsuario + "'", "'" + fila.idProcedimientoUsuario + "'"];
			filaTabla = '<tr class="impar"> <td>' + fila.procedimiento.nombreProcedimiento + 
                '</td> <td>' + fila.usuario.usuario +
                '</td> <td>' + convertirFecha(fechaProcedimientoEjecutado.toString()) +
                '</td> <td>' + estado;
         
        break;
	};

	
	var celdaAccionesEditar = '<div class="tooltip6"><img class="editar editarPermiso" src="images/edit.png" data-toggle="" data-target="" onclick="showEditar(' + atributosFunciones + 
                               ')" alt="Editar"/><span class="tooltiptext iconEditUser ICONO_EDIT">Editar</span></div>';
	var celdaAccionesDetalle = '<div class="tooltip6"><img class="detalle detallePermiso" src="images/detail.png" data-toggle="" data-target="" onclick="showDetalle(' + atributosFunciones + 
                               ')" alt="Detalle"/><span class="tooltiptext iconDetailUser ICONO_DETALLE">Detalle</span></div>';


   
    var celdaAcciones = celdaAccionesDetalle + celdaAccionesEditar;

    	filaTabla = filaTabla + 
                '</td> <td class="acciones">' + celdaAcciones +  
                '</td> </tr>';
    

	setLang(getCookie('lang'));

    return filaTabla;

}

/** Funcion que construye cada línea de la tabla procesos ejecutados **/
function construyeFilaProcesosEjecutado(entidad, fila, datosProceso){

	document.getElementById('cabecera').style.display = "block";

	let atributosFunciones="";
	var filaTabla = "";
	var listProcedimientos=[];
	var listObjetivos = [];
	var listRespuestasPosibles=[];
	var listNiveles=[];
	var listOrdenProcesos = [];

	switch(entidad){
        case 'PROCESOSEJECUTADOS':
        var fechaProcesoEjecutado = new Date(fila.fechaProcedimientoUsuarioProceso);

		atributosFunciones = ["'" + datosProceso.procedimiento.nombreProcedimiento + "'", "'" + datosProceso.usuario.usuario + "'", "'" + fila.proceso.nombreProceso + "'", "'" + convertirFecha(fechaProcesoEjecutado.toString()) + "'", "'" + fila.respuestaPosible.textoRespuesta + "'",  "'" + fila.evidencia.nombreFichero + "'", "'" + fila.idProcedimientoUsuarioProceso + "'"];
			filaTabla = '<tr class="impar"> <td>' + datosProceso.procedimiento.nombreProcedimiento + 
                '</td> <td>' + datosProceso.usuario.usuario +
                '</td> <td>' + fila.proceso.nombreProceso +
                '</td> <td>' + convertirFecha(fechaProcesoEjecutado.toString());
  
        break;
	};


	var celdaAccionesDetalle = '<div class="tooltip6"><img class="detalle detallePermiso" src="images/detail.png" data-toggle="" data-target="" onclick="showDetalle(' + atributosFunciones + 
                               ')" alt="Detalle"/><span class="tooltiptext iconDetailUser ICONO_DETALLE">Detalle</span></div>';


   
    var celdaAcciones = celdaAccionesDetalle;

    	filaTabla = filaTabla + 
                '</td> <td class="acciones">' + celdaAcciones +  
                '</td> </tr>';
    
	setLang(getCookie('lang'));

    return filaTabla;

}


/**Función que construye cada línea de los elementos eliminados con los que se va a rellenar en la tabla*/
function construyeFilaEliminados(entidad, fila) {
	let atributosFunciones="";
	var filaTabla = "";

	document.getElementById('cabecera').style.display = "none";
	document.getElementById('cabeceraEliminados').style.display = "block";

	switch(entidad){
		case 'ROL':
			atributosFunciones = ["'" + fila.nombre_rol + "'", "'" + fila.descripcion_rol + "'", "'" + fila.id_rol + "'"];
			filaTabla = '<tr class="impar"> <td>' + fila.nombre_rol + 
                '</td> <td>' + fila.descripcion_rol;
        break;

        case 'FUNCIONALIDAD':
			atributosFunciones = ["'" + fila.nombre_funcionalidad + "'", "'" + fila.descripcion_funcionalidad + "'", "'" + fila.id_funcionalidad + "'"];
			filaTabla = '<tr class="impar"> <td>' + fila.nombre_funcionalidad + 
                '</td> <td>' + fila.descripcion_funcionalidad;
        break;

        case 'ACCION':
			atributosFunciones = ["'" + fila.nombre_accion + "'", "'" + fila.descripcion_accion + "'", "'" + fila.id_accion + "'"];
			filaTabla = '<tr class="impar"> <td>' + fila.nombre_accion + 
                '</td> <td>' + fila.descripcion_accion;
        break;

		case 'USUARIO':
			atributosFunciones = ["'" + fila.usuario.dni_usuario + "'", "'" + fila.usuario.usuario + "'", "'" + fila.usuario.borrado_usuario + "'", "'" + fila.rol.nombre_rol + "'"];
			var usuarioActivo = "";
			if(fila.usuario.borrado_usuario == 0){
				usuarioActivo = "Sí";
			}else{
				usuarioActivo = "No";
			}

			filaTabla = '<tr class="impar"> <td>' + fila.usuario.dni_usuario + 
                '</td> <td>' + fila.usuario.usuario + 
                '</td> <td>' + usuarioActivo +
                '</td> <td>' + fila.rol.nombre_rol;
        break;

        case 'PERSONA':

        	var fechaNacimiento = new Date(fila.persona.fecha_nac_persona);
        	atributosFunciones = ["'" + fila.persona.dni_persona + "'", "'" + fila.persona_nombre_persona + "'", "'" + fila.persona.apellidos_persona + "'", "'" + convertirFecha(fechaNacimiento.toString())
        	, "'" + fila.persona.direccion_persona + "'", "'" + fila.persona.telefono_persona + "'", "'" + fila.persona.email_persona + "'", "'" + fila.persona.borrado_persona + "'",
        	"'" + fila.usuario.usuario + "'", "'" + fila.rol.nombre_rol + "'", "'" + fila.usuario.borrado_usuario + "'"];
			

			filaTabla = '<tr class="impar"> <td>' + fila.persona.dni_persona + 
                '</td> <td>' + fila.persona.nombre_persona + 
                '</td> <td>' + fila.persona.apellidos_persona  + 
                '</td> <td>' + fila.persona.email_persona + 
                '</td> <td>' + fila.usuario.usuario;
        break;

        case 'EMPRESA':
			atributosFunciones = ["'" + fila.cifEmpresa + "'", "'" + fila.nombreEmpresa + "'", "'" + fila.direccionEmpresa + "'", "'" + fila.telefonoEmpresa + "'", "'" + fila.idEmpresa + "'"];
			filaTabla = '<tr class="impar"> <td>' + fila.cifEmpresa + 
                '</td> <td>' + fila.nombreEmpresa +
                '</td> <td>' + fila.direccionEmpresa +
                '</td> <td>' + fila.telefonoEmpresa;
        break;

        case 'CATEGORIA':
			if(fila.categoria_padre != null){
				atributosFunciones = ["'" + fila.categoria.nombre_categoria + "'", "'" + fila.categoria.descripcion_categoria + "'", "'" + fila.responsable.dni_usuario + "'", "'" + fila.responsable.usuario + "'", "'" + fila.categoria_padre.id_categoria + "'", "'" + fila.categoria_padre.nombre_categoria + "'", "'" + fila.categoria.id_categoria + "'"];
			}else{
				atributosFunciones = ["'" + fila.categoria.nombre_categoria + "'", "'" + fila.categoria.descripcion_categoria + "'","'" + fila.responsable.dni_usuario + "'", "'" + fila.responsable.usuario + "'","'" + null + "'", "'" + null+ "'","'" + fila.categoria.id_categoria + "'"];
			}
			
			filaTabla = '<tr class="impar"> <td>' + fila.categoria.nombre_categoria + 
                '</td> <td>' + fila.categoria.descripcion_categoria +
				'</td> <td>' + fila.responsable.usuario;
        break;


        case 'RESPUESTA_POSIBLE' :
        	atributosFunciones = ["'" + fila.textoRespuesta + "'","'" + fila.idRespuesta + "'"];
			filaTabla = '<tr class="impar"> <td>' + fila.textoRespuesta;
        break;

        case 'PLAN':
        var fechaPlan = new Date(fila.fechaPlan);

		atributosFunciones = ["'" + fila.nombrePlan + "'", "'" + fila.descripPlan + "'", "'" + convertirFecha(fechaPlan.toString()) + "'", "'" + fila.objetivo.nombreObjetivo + "'", "'" + fila.objetivo.descripObjetivo + "'","'" + fila.idPlan + "'"];
			filaTabla = '<tr class="impar"> <td>' + fila.nombrePlan + 
                '</td> <td>' + fila.descripPlan +
                '</td> <td>' + convertirFecha(fechaPlan.toString()) + 
                '</td> <td>' + fila.objetivo.nombreObjetivo; 
        break;

        case 'PROCEDIMIENTO':
        var fechaProcedimiento = new Date(fila.fechaProcedimiento);

        if(fila.checkUsuario == 0){
        	var publicado = "No publicado";
        }else{
        	var publicado = "Publicado" ;
        }

		atributosFunciones = ["'" + fila.nombreProcedimiento + "'", "'" + fila.descripProcedimiento + "'", "'" + convertirFecha(fechaProcedimiento.toString()) + "'", "'" + publicado + "'","'" + fila.plan.nombrePlan + "'", "'" + fila.plan.descripPlan + "'","'" + fila.idProcedimiento + "'"];
			filaTabla = '<tr class="impar"> <td>' + fila.nombreProcedimiento + 
                '</td> <td>' + fila.descripProcedimiento +
                '</td> <td>' + convertirFecha(fechaProcedimiento.toString()) +
                '</td> <td>' + publicado +  
                '</td> <td>' + fila.plan.nombrePlan; 
        break;


	};

	var reactivar = '<div class="tooltip6"><img class="reactivar reactivarPermiso" src="images/reactivar2.png" data-toggle="" data-target="" onclick="showReactivar(' + atributosFunciones + 
                               ')" alt="Reactivar"/><span class="tooltiptext iconReactivar ICONO_REACTIVAR">Reactivar</span></div>';

    if(entidad == 'PERSONA'){
    	filaTabla = filaTabla  + 
                '</td> <td class="acciones">-</td> </tr>';
    }else{
    	filaTabla = filaTabla + 
                '</td> <td class="acciones">' + reactivar +  
                '</td> </tr>';
    }

    setLang(getCookie('lang'));
	
    return filaTabla;
}

/**Función que construye cada línea que se va a rellenar en la tabla*/
function construyeFilaProcesoEliminado(entidad, fila, procedimientos, objetivos, respuestasPosibles, niveles, ordenProceso) {

	document.getElementById('cabecera').style.display = "none";
	document.getElementById('cabeceraEliminados').style.display = "block";

	let atributosFunciones="";
	var filaTabla = "";
	var listProcedimientos=[];
	var listObjetivos = [];
	var listRespuestasPosibles=[];
	var listNiveles=[];
	var listOrdenProcesos = [];

	switch(entidad){
        case 'PROCESO':
        var fechaProceso = new Date(fila.fechaProceso);

        for(var i = 0; i<procedimientos.length; i++){
        	listProcedimientos.push(procedimientos[i].idProcedimiento);
        	listProcedimientos.push(procedimientos[i].nombreProcedimiento);
        }

        for(var i = 0; i<objetivos.length; i++){
        	listObjetivos.push(objetivos[i].idObjetivo);
        	listObjetivos.push(objetivos[i].nombreObjetivo);
        }

        for(var i = 0; i<respuestasPosibles.length; i++){
        	listRespuestasPosibles.push(respuestasPosibles[i].idRespuesta);
        	listRespuestasPosibles.push(respuestasPosibles[i].textoRespuesta);
        }

        for(var i = 0; i<niveles.length; i++){
        	listNiveles.push(niveles[i]);
        }

         for(var i = 0; i<ordenProceso.length; i++){
        	listOrdenProcesos.push(ordenProceso[i]);
        }

		atributosFunciones = ["'" + fila.nombreProceso + "'", "'" + fila.descripProceso + "'", "'" + convertirFecha(fechaProceso.toString()) + "'", "'" + fila.idProceso + "'", "'" + listProcedimientos + "'", "'" + listObjetivos +"'", "'" + listRespuestasPosibles + "'", "'" + listNiveles + "'", "'" + listOrdenProcesos + "'"];
			filaTabla = '<tr class="impar"> <td>' + fila.nombreProceso + 
                '</td> <td>' + fila.descripProceso +
                '</td> <td>' + convertirFecha(fechaProceso.toString());
         
        break;
	};

	
	var reactivar = '<div class="tooltip6"><img class="reactivar reactivarPermiso" src="images/reactivar2.png" data-toggle="" data-target="" onclick="showReactivar(' + atributosFunciones + 
                               ')" alt="Reactivar"/><span class="tooltiptext iconReactivar ICONO_REACTIVAR">Reactivar</span></div>';
    

    filaTabla = filaTabla + 
                '</td> <td class="acciones">' + reactivar +  
                '</td> </tr>';

	setLang(getCookie('lang'));

    return filaTabla;
}



/**Función que crea según las columnas que le pasemos un div con checkbox para marcar y así ocultar las columnas*/
function createHideShowColumnsWindow(arrayColumnas) {
    var checkbox = "";

    for (var clave in arrayColumnas){
        checkbox = checkbox + "<input type='checkbox' id='" + clave + 
        "' name='" + clave + "' value='" + clave + "' onclick='hideShow(" + clave + ", " + arrayColumnas[clave] + 
        ")'><label for='" + clave.replace('_COLUMN', '') + "'></label><br>";
    }

    setLang(getCookie('lang'));

    return checkbox;
 
}

/**Función que muestra la ventana con las columnas a ocultar o mostrar*/
function hideShowColumnsWindow() {

    var estado = $('#showHideColumns').css('display');

    if (estado == 'none') {
        $('#showHideColumns').attr('style', 'display: block');
    } else {
        $('#showHideColumns').attr('style', 'display: none');
    }
    
}

/**Función que oculta o muestra las columnas de una tabla*/
function hideShow(classElement, posElement) {

    $("." + classElement.name).toggle();
    $('td:nth-child(' + posElement + ')').toggle();

}

/**Función que oculta o muestra las columnas de una tabla*/
function hideShowRevert(clase, posElement) {

    $("." + clase).toggle();
    $('td:nth-child(' + posElement + ')').toggle();

}

/**Función que oculta o muestra las columnas de una tabla*/
function hideShowRevertWithoutClase(posElement) {
    $('td:nth-child(' + posElement + ')').toggle();

}


function comprobarOcultos(){
     $('#tablaDatos tr th').each(function(index){
                var clase = $(this).attr('class');
                var display = ($(this).attr('style'));
                if(clase.includes("colFirst")){
                    if(typeof display != 'undefined' && display !== false && (display.split(": "))[1] == "none;"){
                        var claseColumn = clase.split(" ");
                         hideShowRevert(claseColumn[1], (index+1));
                    }
                }else{
                    var claseColumn = clase;
                    if(typeof display != 'undefined' && display !== false && (display.split(": "))[1] == "none;"){
                         hideShowRevert(claseColumn, (index+1));
                    }
                }
            });

    $('#tablaDatos tbody tr td').each(function(index){
            var display = ($(this).attr('style'));
               
            if(typeof display != 'undefined' && display !== false && (display.split(": "))[1] == "none;"){
                hideShowRevertWithoutClase((index+1));
            }
                
    });
}

/**Función para cargar los HREF de cada pagina*/
function cargarHref(dato){
	var rol = getCookie('rolUsuario');
	var href=""

	switch(dato['nombre_funcionalidad']){
		case 'Gestión de roles':
			href="GestionDeRoles.html";
		break;

		case 'Gestión de funcionalidades':
			href="GestionDeFuncionalidades.html";
		break;

		case 'Test':
			href="test.html";
		break;

		case 'Gestión de usuarios':
			href="GestionDeUsuarios.html";
		break;

		case 'Gestión de personas':
			href="GestionDePersonas.html";
		break;

		case 'Gestión de acciones':
			href="GestionDeAcciones.html";
		break;

		case 'Log de excepciones':
			href="GestionLogExcepciones.html";
		break;

		case 'Log de acciones':
			href="GestionLogAcciones.html";
		break;

		case 'Gestión de noticias':
			href="GestionDeNoticias.html";
		break;

		case 'Gestión de categorias':
			href="GestionDeCategorias.html";
		break;

		case 'Gestión de respuestas posibles':
			href="GestionDeRespuestasPosibles.html";
		break;

		case 'Gestión de planes' :
			href = "GestionDePlanes.html";
		break;

		case 'Gestión de procedimientos' :
			if (rol !== 'Administardor' && rol !== 'gestor'){
				href = "MisProcedimientos.html";
			} else {
				href = "GestionDeProcedimientos.html";
			}
		break;

		case 'Gestión de procesos' :
			href = "GestionDeProcesos.html";
		break;

		case 'Gestión de procedimientos ejecutados' : 
			href = "GestionDeProcedimientosEjecutados.html";
		break;

		case 'Gestión de procesos ejecutados' : 
			href = "GestionDeProcesosEjecutados.html";
		break;
	}

	return href;
}


/**Función para cargar los class de cada pagina **/
function cargarClass(dato, rol){
	var clase=""

	switch(dato['nombre_funcionalidad']){
		case 'Gestión de roles':
			clase="GESTION_ROLES";
		break;

		case 'Gestión de funcionalidades':
			clase="GESTION_FUNCIONALIDADES";
		break;

		case 'Test':
			clase="TEST";
		break;

		case 'Gestión de usuarios':
			if (rol !== 'Administrador'){
				clase = "GESTION_USUARIOS_NO_ADMIN";
			} else {
				clase="GESTION_USUARIOS";
			}
		break;

		case 'Gestión de personas':
			if (rol !== 'Administrador'){
				clase = "GESTION_PERSONAS_NO_ADMIN";
			} else {
				clase="GESTION_PERSONAS";
			}
		break; 

		case 'Gestión de acciones':
			clase="GESTION_ACCIONES";
		break; 

		case 'Log de excepciones':
			clase="GESTION_LOG_EXCEPCIONES";
		break;

		case 'Log de acciones':
			clase="GESTION_LOG_ACCIONES";
		break;

		case 'Gestión de noticias':
			clase = "GESTION_NOTICIAS";
		break;

		case 'Gestión de respuestas posibles':
			clase = "GESTION_RESPUESTAS_POSIBLES";
		break;

		case 'Gestión de respuestas posibles':
			clase = "GESTION_RESPUESTAS_POSIBLES";
		break;

		case 'Gestión de categorias':
			if (rol !== 'Administrador'){
				clase = "CONSULTA_CATEGORIAS";
			} else {
				clase="GESTION_CATEGORIAS";
			}
		break;
	}

	setLang(getCookie('lang'));

	return clase;
}

/*Función para cambiar el título de las gestiones*/
function cambiarTituloGestion(funcionalidad){	
	var rol = getCookie('rolUsuario');

	switch(funcionalidad){
		case 'persona':
			if (rol !== 'Administrador'){
				 $("#gestion").addClass("GESTION_PERSONAS_NO_ADMIN");
				 document.getElementById("gestion").style.left = "40%";
			} else {
				$("#gestion").addClass("GESTION_PERSONAS");
			}
		break; 
		case 'usuario':
			if (rol !== 'Administrador'){
				$("#gestion").addClass("GESTION_USUARIOS_NO_ADMIN");
			} else {
				$("#gestion").addClass("GESTION_USUARIOS");
			}
		break;
		case 'categoria':
			if (rol == 'Administrador'){
				$("#gestion").addClass("GESTION_CATEGORIAS");
			} else {
				$("#gestion").addClass("CONSULTA_CATEGORIAS");
			}
		break;
		case 'proceso':
			if (rol !== 'Administrador'){
				$("#gestion").addClass("GESTION_PROCESOS_NO_ADMIN");
			} else {
				$("#gestion").addClass("GESTION_PROCESOS");
			}
		break;
	}

	setLang(getCookie('lang'));
}

/* Función para comprobar errrores en los tabs de registro */
function comprobarErroresTabs(){
	var contrasenasNoCoinciden = $('#passwdUsuario1').val() != $('#passwdUsuario2').val();

	if($('#errorFormatoDni').attr("style") == "" || $('#errorFormatoNombrePersona').attr("style") == "" || $('#errorFormatoApellidosP').attr("style") == "" ||
		$('#errorFormatoFecha').attr("style") == "" || $('#errorFormatoDireccion').attr("style") == "" || $('#errorFormatoTelefono').attr("style") == "" ||
		$('#errorFormatoEmail').attr("style") == ""){
		$('#iconoTabDatosPersonales').prop('hidden', false);
	}

	if($('#errorFormatoUserRegistro').attr("style") == "" || $('#errorFormatoPassRegistro').attr("style") == "" || $('#errorFormatoPassRegistro2').attr("style") == ""
		|| (contrasenasNoCoinciden === true)){
		$('#iconoTabDatosUsuario').prop('hidden', false);
	}

	if($('#errorFormatoCifEmpresa').attr("style") == "" || $('#errorFormatoNombreEmpresa').attr("style") == "" || $('#errorFormatoDireccionEmpresa').attr("style") == ""
		|| $('#errorFormatoTelefonoEmpresa').attr("style") == "" ){
		$('#iconoTabDatosEmpresa').prop('hidden', false);
	}
}

/**Función para cambiar valores del formulario*/
function cambiarFormulario(tituloForm, action, onsubmit) {

    $("#tituloForms").removeClass();
    $("#tituloForms").addClass(tituloForm);

    if (action != '') {
        $("#formularioGenerico").attr('action', action);
    }

    if (onsubmit != '') {
        $("#formularioGenerico").attr('onsubmit', onsubmit);
    }
    
}

/**Función para cambiar valores del icono **/
function cambiarIcono(ruta, nombreIcono, estiloIcono, valorIcono) {

    $("#iconoAcciones").attr('src', ruta);
    $("#iconoAcciones").removeClass();
    $("#iconoAcciones").addClass(nombreIcono);
    $("#iconoAcciones").addClass(estiloIcono);
    $("#spanAcciones").removeClass();
    $("#spanAcciones").addClass('tooltiptext');
    $("#spanAcciones").addClass(nombreIcono);
    $("#btnAcciones").attr('value', valorIcono);
}

/**Función para volver al menu **/
function volver(){
	window.location.href = "menu.html";
	limpiaCookiesBusquedas();
}

/** Función que limpia las cookies de las busquedas **/
function limpiaCookiesBusquedas(){
	setCookie('nombreRol', '');
	setCookie('descripcionRol', '');
}

/**Función para insertar campos en el formulario a mayores*/
function insertacampo(form, name, value){
	
	formulario = form;
	var element = document.getElementById(name);

	if(element == '' || element == null){
		var input = document.createElement('input');
		input.type = 'hidden';
		input.name = name;
		input.value = value;
		input.className = name;
		input.id = name;
		formulario.appendChild(input);
	}else{
		element.value = value;
	}
	

}

/**Función que deshabilita los campos de un formulario*/
function deshabilitaCampos(idElementoList) {

	idElementoList.forEach( function (idElemento) {
		$("#"+ idElemento).attr("disabled", true); 
	});	

}

/**Función que habilita los campos de un formulario*/
function habilitaCampos(idElementoList) {

	idElementoList.forEach( function (idElemento) {
		$("#"+ idElemento).attr("disabled", false); 
	});	

}

/** Función para ocultar el símbolo obligatorio **/
function ocultarObligatorios(idElementoList) {
	idElementoList.forEach( function (idElemento) {
		$("#"+ idElemento).attr('style', 'display: none');
	});	
}

/** Función para mostrar el símbolo obligatorio **/
function mostrarObligatorios(idElementoList) {
	idElementoList.forEach( function (idElemento) {
		$("#"+ idElemento).attr('style', '');
	});	
}

/** Función para anadir propiedad readonly **/
function anadirReadonly(idElementoList) {
	idElementoList.forEach( function (idElemento) {
		$("#"+ idElemento).prop('readonly', true);
	});	
}

/** Función para eliminar propiedad readonly **/
function eliminarReadonly(idElementoList) {
	idElementoList.forEach( function (idElemento) {
		$("#"+ idElemento).prop('readonly', false);
	});	
}


/** Función para guardar los parámetros de las búsquedas **/
function guardarParametrosBusqueda(idElementoList){
	for(var i = 0; i<idElementoList.length; i++){
		var datosBusqueda = idElementoList[i].split(': ');
		setCookie(datosBusqueda[0], datosBusqueda[1]);
	}
}
/**Función para mostrar mensaje de error cuando fallan las peticiones ajax*/
function errorFailAjax(status){
	var idioma = getCookie('lang');

	if (status === 500) {
		errorInternal("MENSAJE_ERROR_INTERNO", idioma);
	} else if (status === 403 || status === 412) {
		errorAutenticado("ERROR_AUTENTICACION", idioma);
	} else if (status === 0 || status === 404){
		errorInternal("ERR_CONNECTION_REFUSED", idioma);
	} 
}

/** Función para formar las modales de éxito **/
function respuestaAjaxOK(clase, codigo){
    $(".imagenAviso").attr('src', 'images/ok.png');
    document.getElementById("modal-title").style.color = "#238f2a";
    document.getElementById("modal-title").style.top = "13%";
    $("#modal-title").removeClass();
    $("#modal-title").addClass(clase);
    $("#modal-mensaje").removeClass();
    $("#modal-mensaje").addClass(codigo);

    setLang(getCookie('lang'));
}

/** Función para mostrar las modales de error **/
function respuestaAjaxKO(codigo){
	$("#modal-title").removeClass();
    $("#modal-title").addClass("ERROR");
    document.getElementById("modal-title").style.color = "#a50707";    
    document.getElementById("modal-title").style.top = "13%";
    $(".imagenAviso").attr('src', 'images/failed.png');
    $("#modal-mensaje").removeClass();
    $("#modal-mensaje").addClass(codigo);

    setLang(getCookie('lang'));
}

/** Función para mostrar las modales de error **/
function respuestaAjaxContinuarProcedimiento(identificadorProcedimiento){
	$("#modal-titleContinuar").removeClass();
    $("#modal-titleContinuar").addClass("ERROR");
    document.getElementById("modal-titleContinuar").style.color = "#a50707";    
    document.getElementById("modal-titleContinuar").style.top = "13%";
    $(".imagenAviso").attr('src', 'images/failed.png');
    $('#seguir').attr('onclick', 'iniciarProcedimientoUsuario('+ identificadorProcedimiento +', \'volverGuardar\')');

    setLang(getCookie('lang'));
}


/** Función que ejecuta la comprobacion de una fucnion cada cierto tiempo **/
function ejecutaFuncion(funcion, tiempo){
	return setInterval(funcion, tiempo);
}

/** Función que comprueba las funcionalidades y permisos del usuario **/
function compruebaFuncionalidadesPermisos(entidad){
	funcionalidadesUsuario();

	switch(entidad){
		case 'ROL':
			cargarPermisosFuncRol();
		break;

		case 'FUNCIONALIDAD':
			cargarPermisosFuncFuncionalidad();
		break;

		case 'ACCION':
			cargarPermisosFuncAccion();
		break;

		case 'LOG_EXCEPCIONES':
			cargarPermisosFuncLogExcepciones();
		break;

		case 'LOG_ACCIONES':
			cargarPermisosFuncLogAcciones();
		break;

		case 'USUARIO':
			cargarPermisosFuncUsuario();
		break;

		case 'PERSONA':
			cargarPermisosFuncPersona();
		break;
		
		case 'NOTICIA':
			cargarPermisosFuncNoticia();
		break;

		case 'CATEGORIA' :
			cargarPermisosFuncCategoria();
		break;

		case 'RESPUESTA_POSIBLE' :
			cargarPermisosFuncRespuestaPosible();
		break;

		case 'PLAN' :
			cargarPermisosFuncPlan();
		break;

		case 'PROCEDIMIENTO' :
			cargarPermisosFuncProcedimiento();
		break;

		case 'PROCESOS' :
			cargarPermisosFuncProceso();
		break;

		case 'PROCEDIMIENTOSEJECUTADOS' :
			cargarPermisosFuncProcedimientosEjecutados();
		break;

		case 'PROCESOSEJECUTADOS' :
			cargarPermisosFuncProcesosEjecutados();
		break;
	}
	
}

/** Función cargar permisos segun funcionalidad **/
function cargarPermisosSegunEntidad(entidad){
	switch(entidad){
		case 'ROL':
			cargarPermisosFuncRol();
		break;

		case 'FUNCIONALIDAD':
			cargarPermisosFuncFuncionalidad();
		break;

		case 'ACCION':
			cargarPermisosFuncAccion();
		break;

		case 'LOG_EXCEPCIONES':
			cargarPermisosFuncLogExcepciones();
		break;

		case 'LOG_ACCIONES':
			cargarPermisosFuncLogAcciones();
		break;

		case 'USUARIO':
			cargarPermisosFuncUsuario();
		break;

		case 'PERSONA':
			cargarPermisosFuncPersona();
		break;

		case 'NOTICIA':
			cargarPermisosFuncNoticia();
		break;

		case 'EMPRESA':
			cargarPermisosFuncEmpresa();
		break;
		
		case 'CATEGORIA' :
			cargarPermisosFuncCategoria();
		break;

		case 'RESPUESTA_POSIBLE' :
			cargarPermisosFuncRespuestaPosible();
		break;

		case 'PLAN' :
			cargarPermisosFuncPlan();
		break;

		case 'PROCEDIMIENTO' :
			cargarPermisosFuncProcedimiento();
		break;

		case 'PROCESO' :
			cargarPermisosFuncProceso();
		break;

		case 'PROCEDIMIENTOSEJECUTADOS' :
			cargarPermisosFuncProcedimientosEjecutados();
		break;

		case 'PROCESOSEJECUTADOS' :
			cargarPermisosFuncProcesosEjecutados();
		break;

	}
}

/** Funcion para convertir a tipo Date **/
function convert(str) {
  var mnths = {
      Jan: "01",
      Feb: "02",
      Mar: "03",
      Apr: "04",
      May: "05",
      Jun: "06",
      Jul: "07",
      Aug: "08",
      Sep: "09",
      Oct: "10",
      Nov: "11",
      Dec: "12"
    },
    date = str.split(" ");

  return [date[5], mnths[date[1]], date[2]].join("-");
}

/** Funcion para tratar las fechas **/
function convertirFecha(fecha){
	var fechaCorrecta = "";

	var fechaSeparada = fecha.split(' ');

	var mesLetras = fechaSeparada[1];

	var mes = convierteMes(mesLetras);

	fechaCorreta = fechaSeparada[2] + "-" + mes + "-" + fechaSeparada[3];

	return fechaCorreta;
}
/** Funcion para tratar las fechas en formato SAT MAY 01 HH:MM:SS CET YYYY **/
function convierteFecha(fecha){
	var fechaSeparada = fecha.split(' ');
	
	var mes = convierteMes(fechaSeparada[1]);
	
	var fechaCorrecta = "";

	fechaCorrecta = fechaSeparada[5] + "-" + mes + "-" + fechaSeparada[2];

	return fechaCorrecta;
}

/** Funcion para tratar las fechas en formato yyyy-mm-dd **/
function convierteFechaGuion(fecha){
	var fechaSeparada = fecha.split('-');
	
	var mes = convierteMes(fechaSeparada[1]);
	
	var fechaCorrecta = "";

	fechaCorrecta = fechaSeparada[0] + "-" + fechaSeparada[1] + "-" + fechaSeparada[2];

	return fechaCorrecta;
}

/**Función para convertir los meses de letras a números **/
function convierteMes(mes){
	var mesNumero = "";

	switch(mes){
		case "Jan":
			mesNumero = "01";
		break;
		case "Feb":
			mesNumero = "02";
		break;
		case "Mar":
			mesNumero = "03";
		break;
		case "Apr":
			mesNumero = "04";
		break;
		case "May":
			mesNumero = "05";
		break;
		case "Jun":
			mesNumero = "06";
		break;
		case "Jul":
			mesNumero = "07";
		break;
		case "Aug":
			mesNumero = "08";
		break;
		case "Sep":
			mesNumero = "09";
		break;
		case "Oct":
			mesNumero = "10";
		break;
		case "Nov":
			mesNumero = "11";
		break;
		case "Dec":
			mesNumero = "12";
		break;

	}

	return mesNumero;
}

/** Funcion para sustituir lo caracteres por asteriscos **/
function convertirPass(passwd){

	var passAsterisco = "";

	for(var i = 0; i<passwd.length; i++){
		passAsterisco +='*';
	}

	return passAsterisco;
}

/** Función para ocultar los iconos de error de los tabs de los formularios **/
function ocultarIconoErroresTabs(iconos){
	iconos.forEach(function(icono){
		$('#' + icono).attr('hidden', true);
	})
}

/**Funcion para ocultar los mensajes de ayuda en las ventanas de add **/
function ocultaFormatos(idFormato){
	idFormato.forEach(function(id){
		$('#' + id).attr('hidden', true);
	});
}

/**Funcion para ocultar los mensajes de ayuda en las ventanas de add **/
function muestraFormatos(idFormato){
	idFormato.forEach(function(id){
		$('#' + id).attr('hidden', false);
	});
}

/** Función que oculta los datos de la empresa en el formulario **/
function ocultarDatos(idsElementos){
	idsElementos.forEach(function(idElemento){
		$('#' + idElemento).attr('hidden', true);
	});
}

/** Función que muestra los datos de la empresa en el formulario **/
function mostrarDatos(idsElementos){
	idsElementos.forEach(function(idElemento){
		$('#' + idElemento).attr('hidden', true);
	})
}

/**Función para limpiar los textarea*/
function limpiarTextArea(idElemento){
	 $("#" + idElemento).val("");
}

/**Función para colocar los títulos de menú dependiendo del idioma y del usuario*/
function posicionarTitulo(funcionalidad){
	var rol = getCookie('rolUsuario');
	var idioma = getCookie('lang');

	switch(funcionalidad) {
		case 'empresa':
			switch(idioma) {
				case 'ES':
					if (rol === 'usuario' || rol === 'gestor') {
						document.getElementById('gestion').style.top = "104px";
						document.getElementById('gestion').style.left = "44.5%";
					}
				break;
				case 'EN':
					if (rol === 'usuario' || rol === 'gestor') {
						document.getElementById('gestion').style.top = "104px";
						document.getElementById('gestion').style.left = "44%";
					}
				break;
				case 'GA':
					if (rol === 'usuario' || rol === 'gestor') {
						document.getElementById('gestion').style.top = "104px";
						document.getElementById('gestion').style.left = "42.5%";
					}
				break;
			}
		break;
		case 'persona':
			switch(idioma) {
				case 'ES':
					if (rol === 'usuario' || rol === 'gestor') {
						document.getElementById('gestion').style.top = "104px";
						document.getElementById('gestion').style.left = "40%";
					}
				break;
				case 'EN':
					if (rol === 'usuario' || rol === 'gestor') {
						document.getElementById('gestion').style.top = "104px";
						document.getElementById('gestion').style.left = "41.7%";
					}
				break;
				case 'GA':
					if (rol === 'usuario' || rol === 'gestor') {
						document.getElementById('gestion').style.top = "104px";
						document.getElementById('gestion').style.left = "38.5%";
					}
				break;
			}
		break;
		case 'usuario':
			switch(idioma) {
				case 'ES':
					if (rol === 'usuario' || rol === 'gestor') {
						document.getElementById('gestion').style.top = "104px";
						document.getElementById('gestion').style.left = "40%";
					}
				break;
				case 'EN':
					if (rol === 'usuario' || rol === 'gestor') {
						document.getElementById('gestion').style.top = "104px";
						document.getElementById('gestion').style.left = "43.7%";
					}
				break;
				case 'GA':
					if (rol === 'usuario' || rol === 'gestor') {
						document.getElementById('gestion').style.top = "104px";
						document.getElementById('gestion').style.left = "37.5%";
					}
				break;
			}
		break;
		case 'misprocedimiento':
			switch(idioma) {
				case 'ES':
					if (rol === 'usuario') {
						document.getElementById('gestion').style.left = "41%";
					}
				break;
				case 'EN':
					if (rol === 'usuario') {
						document.getElementById('gestion').style.left = "43%";
					}
				break;
				case 'GA':
					if (rol === 'usuario') {
						document.getElementById('gestion').style.left = "37.5%";
					}
				break;
			}
		break;
	}


}

$(document).ready(function(){
  $('.iconCerrar').on('click', function(){
    if($("#modal-title").attr('class') === "STOP" || $("#modal-title").attr('class') === "ERROR_INTERNO" ){
    	cerrarModalNoToken('modal');
    }else{
    	cerrarModal('modal');
    }
  });
})