/** Función para recuperar los logs de acciones con ajax y promesas **/
function cargarLogAccionesAjaxPromesa(numeroPagina, tamanhoPagina){
  return new Promise(function(resolve, reject) {
  	var token = getCookie('tokenUsuario');

    var data = {
      inicio : calculaInicio(numeroPagina, tamanhoPaginaLogAcciones),
      tamanhoPagina : tamanhoPaginaLogAcciones
    }
    
    $.ajax({
      method: "POST",
      url: urlPeticionAjaxListarTodosLogAcciones,
      contentType : "application/json",
      data: JSON.stringify(data),  
      dataType : 'json',
      headers: {'Authorization': token},
      }).done(res => {
        if (res.code != 'LOG_ACCIONES_LISTADOS') {
          reject(res);
        }
        resolve(res);
      }).fail( function( jqXHR ) {
        errorFailAjax(jqXHR.status);
      });
  });
}

/** Función para recuperar los permisos de un usuario sobre la funcionalidad **/
function cargarPermisosFuncLogAccionesAjaxPromesa(){
  return new Promise(function(resolve, reject) {
    var nombreUsuario = getCookie('usuario');
    var token = getCookie('tokenUsuario');
    
    var usuario = nombreUsuario;
  
    $.ajax({
      method: "GET",
      url: urlPeticionAjaxAccionesUsuario,
      contentType : "application/json",
      data: { usuario : usuario, funcionalidad : 'Log de acciones'},  
      dataType : 'json',
      headers: {'Authorization': token},
      }).done(res => {
        if (res.code != 'ACCIONES_USUARIO_OK') {
          reject(res);
        }
        resolve(res);
    }).fail( function( jqXHR ) {
        errorFailAjax(jqXHR.status);
      });
  });
}

/** Función para buscar log acciones con ajax y promesas **/
function buscarLogAccionesAjaxPromesa(numeroPagina, tamanhoPagina, accion){
  return new Promise(function(resolve, reject) {
    var token = getCookie('tokenUsuario');

    if(accion == "buscarModal"){
    	var fechaInicio = $("#fechaInicio").val();
    	var fechaFin = $('#fechaFin').val();

    	if(fechaInicio == '1900-01-01'){
    		fechaInicio = "";
    	}

    	if(fechaFin == '1900-01-01'){
    		fechaFin = "";
    	}

      var data = {
        usuario : $("#loginUsuario").val(),
        fechaInicio : fechaInicio,
        fechaFin : fechaFin,
        inicio : calculaInicio(numeroPagina, tamanhoPaginaLogAcciones),
        tamanhoPagina : tamanhoPaginaLogAcciones
      }
    }

    if(accion == "buscarPaginacion"){
       if(getCookie('usuarioLog') == null || getCookie('usuarioLog') == ""){
        var usuarioLog = "";
      }else{
        var usuarioLog = getCookie('usuarioLog');
      }

      if(getCookie('fechaInicio') == null || getCookie('fechaInicio') == "" || getCookie('fechaInicio') == "null"){
        var fechaInicio = "";
      }else{
        var fechaInicio = convert(getCookie('fechaInicio'));
      }

      if(getCookie('fechaFin') == null || getCookie('fechaFin') == "" || getCookie('fechaFin') == "null"){
        var fechaFin = "";
      }else{
        var fechaFin = convert(getCookie('fechaFin'));
      }

      var data = {
        usuario : usuarioLog,
        fechaInicio : fechaInicio,
        fechaFin : fechaFin,
        inicio : calculaInicio(numeroPagina, tamanhoPaginaLogAcciones),
        tamanhoPagina : tamanhoPaginaLogAcciones
      }
    }
    
    $.ajax({
      method: "POST",
      url: urlPeticionAjaxListarLogAcciones,
      contentType : "application/json",
      data: JSON.stringify(data),  
      dataType : 'json',
      headers: {'Authorization': token},
      }).done(res => {
        if (res.code != 'LOG_ACCIONES_LISTADOS') {
          reject(res);
        }
        resolve(res);
      }).fail( function( jqXHR ) {
        errorFailAjax(jqXHR.status);
      });
  });
}

/** Funcion para buscar log acciones **/
function showBuscarLogAcciones() {
  var idioma = getCookie('lang');

  cambiarFormulario('SEARCH_LOG_ACCIONES', 'javascript:buscarLogAcciones(0,' + tamanhoPaginaLogAcciones+ ', \'buscarModal\'' + ', \'PaginadorNo\');', 'return comprobarBuscarLogAcciones();');
  cambiarOnBlurCampos('return comprobarUserLogSearch(\'loginUsuario\', \'errorFormatoLoginUsuario\', \'loginUsuario\')', 
  'return comprobarFechaInicioSearch(\'fechaInicio\', \'errorFormatoFechaInicio\', \'fecha\')',
  'return comprobarFechaFinSearch(\'fechaFin\', \'errorFormatoFechaFin\', \'fecha\')');
  cambiarIcono('images/search.png', 'ICONO_SEARCH', 'iconoSearchLogAcciones', 'Buscar');
  setLang(idioma);

  $('#subtitulo').attr('hidden', true);
  $('#labelLoginUsuario').attr('hidden', false);
  $('#labelDateInicio').attr('hidden', false);
  $('#labelDateFin').attr('hidden', false);

  let campos = ["loginUsuario", "fechaInicio", "fechaFin"];
  eliminarReadonly(campos);
  habilitaCampos(campos);
}


/* Función para obtener las acciones del sistema */
async function cargarLogAcciones(numeroPagina, tamanhoPagina, paginadorCreado){
	await cargarLogAccionesAjaxPromesa(numeroPagina, tamanhoPagina)
	  .then((res) => {
	  	
      var numResults = res.data.numResultados + '';
	  	var totalResults = res.data.tamanhoTotal + '';
	  	var inicio = 0;
      if(res.data.listaBusquedas.length == 0){
        inicio = 0;
      }else{
        inicio = parseInt(res.data.inicio)+1;
      }
      var textPaginacion = inicio +  " - " + (parseInt(res.data.inicio)+parseInt(numResults))  + " total " + totalResults; 
	   	
      	$("#datosLogAcciones").html("");
	   	  $("#checkboxColumnas").html("");
	   	  $("#paginacion").html("");
    		
      for (var i = 0; i < res.data.listaBusquedas.length; i++){
    			var tr = construyeFila('LOG_ACCIONES', res.data.listaBusquedas[i]);
    			$("#datosLogAcciones").append(tr);
    		}
    	
    	var div = createHideShowColumnsWindow({LOGIN_USUARIO_COLUMN:1, ACTION_COLUMN:2, DATA_COLUMN:3, DATE_COLUMN:4});
      	$("#checkboxColumnas").append(div);
      	$("#paginacion").append(textPaginacion);
      	setLang(getCookie('lang'));

        if(paginadorCreado != 'PaginadorCreado'){
            paginador(totalResults, 'cargarLogAcciones', 'LOG_ACCIONES');
        }

        if(numeroPagina == 0){
          $('#' + (numeroPagina+1)).addClass("active");
          var numPagCookie =  numeroPagina + 1;
        }else{
          $('#' + numeroPagina).addClass("active");
          var numPagCookie =  numeroPagina;
        }
	  
        setCookie('numeroPagina', numPagCookie);

		}).catch((res) => {
		    respuestaAjaxKO(res.code);
		    document.getElementById("modal").style.display = "block";
		});
}

/** Funcion buscar log acciones**/
async function buscarLogAcciones(numeroPagina, tamanhoPagina, accion, paginadorCreado){
  await buscarLogAccionesAjaxPromesa(numeroPagina, tamanhoPagina,accion)
  .then((res) => {
      cargarPermisosFuncLogAcciones();
      if($('#form-modal').is(':visible')) {
         $("#form-modal").modal('toggle');
      };
      guardarParametrosBusqueda(res.data.datosBusqueda);
      var numResults = res.data.numResultados + '';
      var totalResults = res.data.tamanhoTotal + '';
      var inicio = 0;
      if(res.data.listaBusquedas.length == 0){
        inicio = 0;
        $('#itemPaginacion').attr('hidden', true);
      }else{
        inicio = parseInt(res.data.inicio)+1;
        $('#itemPaginacion').attr('hidden', false);
      }
      var textPaginacion = inicio +  " - " + (parseInt(res.data.inicio)+parseInt(numResults))  + " total " + totalResults; 

      $("#datosLogAcciones").html("");
      $("#checkboxColumnas").html("");
      $("#paginacion").html("");
        for (var i = 0; i < res.data.listaBusquedas.length; i++){
          var tr = construyeFila('LOG_ACCIONES', res.data.listaBusquedas[i]);
          $("#datosLogAcciones").append(tr);
        }
      
      var div = createHideShowColumnsWindow({LOGIN_USUARIO_COLUMN:1, ACTION_COLUMN:2, DATA_COLUMN:3, DATE_COLUMN:4});
      
      $("#checkboxColumnas").append(div);
      $("#paginacion").append(textPaginacion);
      setLang(getCookie('lang'));

      if(paginadorCreado != 'PaginadorCreado'){
        paginador(totalResults, 'buscarLogAcciones', 'LOG_ACCIONES');
      }

      if(numeroPagina == 0){
        $('#' + (numeroPagina+1)).addClass("active");
        var numPagCookie = numeroPagina+1;
      }else{
        $('#' + numeroPagina).addClass("active");
        var numPagCookie = numeroPagina;
      }
      setCookie('numeroPagina', numPagCookie);

  
  }).catch((res) => {
      cargarPermisosFuncLogAcciones();
      respuestaAjaxKO(res.code);

      let idElementoList = ["loginUsuario", "fechaInicio", "fechaFin"];
      resetearFormulario("formularioGenerico", idElementoList);

      setLang(getCookie('lang'));

      document.getElementById("modal").style.display = "block";
  });
}

/*Función que comprueba los permisos del usuario sobre el log de acciones*/
async function cargarPermisosFuncLogAcciones(){
  await cargarPermisosFuncLogAccionesAjaxPromesa()
  .then((res) => {
    gestionarPermisosLogAcciones(res.data);
  }).catch((res) => {
      respuestaAjaxKO(res.code);
      setLang(getCookie('lang'));
      document.getElementById("modal").style.display = "block";
  });
}

/*Función que refresca la tabla por si hay algún cambio en BD */
async function refrescarTabla(numeroPagina, tamanhoPagina){
  await cargarLogAccionesAjaxPromesa(numeroPagina, tamanhoPagina)
  .then((res) => {
      cargarPermisosFuncLogAcciones();
      setCookie('usuarioLog', '');
      setCookie('fechaInicio', '');
      setCookie('fechaFin', '');
      var numResults = res.data.numResultados + '';
      var totalResults = res.data.tamanhoTotal + '';
      var inicio = 0;
      if(res.data.listaBusquedas.length == 0){
        inicio = 0;
        $('#itemPaginacion').attr('hidden', true);
      }else{
        inicio = parseInt(res.data.inicio)+1;
        $('#itemPaginacion').attr('hidden', false);
      }
      var textPaginacion = inicio +  " - " + (parseInt(res.data.inicio)+parseInt(numResults))  + " total " + totalResults; 
      
      $("#datosLogAcciones").html("");
      $("#checkboxColumnas").html("");
      $("#paginacion").html("");
        for (var i = 0; i < res.data.listaBusquedas.length; i++){
          var tr = construyeFila('LOG_ACCIONES', res.data.listaBusquedas[i]);
          $("#datosLogAcciones").append(tr);
        }
      
      var div = createHideShowColumnsWindow({LOGIN_USUARIO_COLUMN:1, ACTION_COLUMN:2, DATA_COLUMN:3, DATE_COLUMN:4});
      $("#checkboxColumnas").append(div);
      $("#paginacion").append(textPaginacion);
      setLang(getCookie('lang'));

      setCookie('usuarioLog', '');
      setCookie('fechaInicio', '');
      setCookie('fechaFin', '');

      paginador(totalResults, 'cargarLogAcciones', 'LOG_ACCIONES');

      if(numeroPagina == 0){
        $('#' + (numeroPagina+1)).addClass("active");
        var numPagCookie = numeroPagina + 1 ;
      }else{
        $('#' + numeroPagina).addClass("active");
         var numPagCookie = numeroPagina;
      }

      setCookie('numeroPagina', numPagCookie);
      comprobarOcultos();
    
    }).catch((res) => {
      
      respuestaAjaxKO(res.code);
      setLang(getCookie('lang'));
      document.getElementById("modal").style.display = "block";
  });
}

/** Función para gestionar los iconos dependiendo de los permisos de los usuarios **/
function gestionarPermisosLogAcciones(idElementoList) {
  idElementoList.forEach( function (idElemento) {
    switch(idElemento){
      case 'Listar' :
        $('#btnListarLogAcciones').attr('src', 'images/search3.png');
        $('#btnListarLogAcciones').css("cursor", "pointer");
        $('#divListarLogAcciones').attr("data-toggle", "modal");
        $('#divListarLogAcciones').attr("data-target", "#form-modal");
       break;

      case "Visualizar" :
        $('.detallePermiso').attr('src', 'images/detail3.png');
        $('.detallePermiso').css("cursor", "pointer");
        $('.detallePermiso').attr("data-toggle", "modal");
        $('.detallePermiso').attr("data-target", "#form-modal");
      break;

    } 
    }); 
}


/**Función para cambiar onBlur de los campos*/
function cambiarOnBlurCampos(onBlurLoginUsuario, onBlurFechaInicio, onBlurFechaFin) {
    
    if (onBlurLoginUsuario != ''){
        $("#loginUsuario").attr('onblur', onBlurLoginUsuario);
    }

    if (onBlurFechaInicio != ''){
        $("#fechaInicio").attr('onblur', onBlurFechaInicio);
    }

    if (onBlurFechaFin != ''){
        $("#fechaFin").attr('onblur', onBlurFechaFin);
    }
}

/**Función que rellenado los datos del formulario*/
function rellenarFormulario(loginUsuario, fechaInicio, fechaFin) {

    $("#loginUsuario").val(loginUsuario);
    $("#fechaInicio").val(fechaInicio); 
    $("#fechaFin").val(fechaFin); 

}

$(document).ready(function() {
  $("#form-modal").on('hidden.bs.modal', function() {
    
    let idElementoErrorList = ["errorFormatoLoginUsuario", "errorFormatoFechaInicio", "errorFormatoFechaFin"];
    
    let idElementoList = ["loginUsuario", "fechaInicio", "fechaFin"];

    limpiarFormulario(idElementoList);
    eliminarMensajesValidacionError(idElementoErrorList, idElementoList);
    setLang(getCookie('lang'));
  });

});
