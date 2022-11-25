/** Función para recuperar los logs de excepciones con ajax y promesas **/
function cargarLogExcepcionesAjaxPromesa(numeroPagina, tamanhoPagina){
  return new Promise(function(resolve, reject) {
  	var token = getCookie('tokenUsuario');

    var data = {
      inicio : calculaInicio(numeroPagina, tamanhoPaginaLogExcepciones),
      tamanhoPagina : tamanhoPaginaLogExcepciones
    }
    
    $.ajax({
      method: "POST",
      url: urlPeticionAjaxListarTodosLogExcepciones,
      contentType : "application/json",
      data: JSON.stringify(data),  
      dataType : 'json',
      headers: {'Authorization': token},
      }).done(res => {
        if (res.code != 'LOG_EXCEPCIONES_LISTADOS') {
          reject(res);
        }
        resolve(res);
      }).fail( function( jqXHR ) {
        errorFailAjax(jqXHR.status);
      });
  });
}

/** Función para recuperar los permisos de un usuario sobre la funcionalidad **/
function cargarPermisosFuncLogExcepcionesAjaxPromesa(){
  return new Promise(function(resolve, reject) {
    var nombreUsuario = getCookie('usuario');
    var token = getCookie('tokenUsuario');
    
    var usuario = nombreUsuario;
  
    $.ajax({
      method: "GET",
      url: urlPeticionAjaxAccionesUsuario,
      contentType : "application/json",
      data: { usuario : usuario, funcionalidad : 'Log de excepciones'},  
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

/** Función para buscar log excepciones con ajax y promesas **/
function buscarLogExcepcionesAjaxPromesa(numeroPagina, tamanhoPagina, accion){
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
        inicio : calculaInicio(numeroPagina, tamanhoPaginaLogExcepciones),
        tamanhoPagina : tamanhoPaginaLogExcepciones
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
        inicio : calculaInicio(numeroPagina, tamanhoPaginaLogExcepciones),
        tamanhoPagina : tamanhoPaginaLogExcepciones
      }
    }
    
    $.ajax({
      method: "POST",
      url: urlPeticionAjaxListarLogExcepciones,
      contentType : "application/json",
      data: JSON.stringify(data),  
      dataType : 'json',
      headers: {'Authorization': token},
      }).done(res => {
        if (res.code != 'LOG_EXCEPCIONES_LISTADOS') {
          reject(res);
        }
        resolve(res);
      }).fail( function( jqXHR ) {
        errorFailAjax(jqXHR.status);
      });
  });
}

/** Funcion para buscar log excepciones **/
function showBuscarLogExcepciones() {
  var idioma = getCookie('lang');

  cambiarFormulario('SEARCH_LOG_EXCEPCIONES', 'javascript:buscarLogExcepciones(0,' + tamanhoPaginaLogExcepciones+ ', \'buscarModal\'' + ', \'PaginadorNo\');', 'return comprobarBuscarLogExcepciones();');
  cambiarOnBlurCampos('return comprobarUserLogSearch(\'loginUsuario\', \'errorFormatoLoginUsuario\', \'loginUsuario\')', 
  'return comprobarFechaInicioSearch(\'fechaInicio\', \'errorFormatoFechaInicio\', \'fecha\')',
  'return comprobarFechaFinSearch(\'fechaFin\', \'errorFormatoFechaFin\', \'fecha\')');
  cambiarIcono('images/search.png', 'ICONO_SEARCH', 'iconoSearchLogExcepciones', 'Buscar');
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
async function cargarLogExcepciones(numeroPagina, tamanhoPagina, paginadorCreado){
	await cargarLogExcepcionesAjaxPromesa(numeroPagina, tamanhoPagina)
	  .then((res) => {
	  	
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
	   	
      $("#datosLogExcepciones").html("");
	   	$("#checkboxColumnas").html("");
	   	$("#paginacion").html("");
    		
      for (var i = 0; i < res.data.listaBusquedas.length; i++){
    			var tr = construyeFila('LOG_EXCEPCIONES', res.data.listaBusquedas[i]);
    			$("#datosLogExcepciones").append(tr);
    		}
    	
    	var div = createHideShowColumnsWindow({LOGIN_USUARIO_COLUMN:1, TYPE_EXCEPTION_COLUMN:2, DESCRIPTION_EXCEPTION_COLUMN:3, DATE_COLUMN:4});
      	$("#checkboxColumnas").append(div);
      	$("#paginacion").append(textPaginacion);
      	setLang(getCookie('lang'));

        if(paginadorCreado != 'PaginadorCreado'){
            paginador(totalResults, 'cargarLogExcepciones', 'LOG_EXCEPCIONES');
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

/** Funcion buscar log excepciones **/
async function buscarLogExcepciones(numeroPagina, tamanhoPagina, accion, paginadorCreado){
  await buscarLogExcepcionesAjaxPromesa(numeroPagina, tamanhoPagina,accion)
  .then((res) => {
      cargarPermisosFuncLogExcepciones();
      if($('#form-modal').is(':visible')) {
         $("#form-modal").modal('toggle');
      };
      guardarParametrosBusqueda(res.data.datosBusqueda);
      var numResults = res.data.numResultados + '';
      var totalResults = res.data.tamanhoTotal + '';
      var inicio = 0;
      if(res.data.listaBusquedas.length == 0){
        inicio = 0;
      }else{
        inicio = parseInt(res.data.inicio)+1;
      }
      var textPaginacion = inicio +  " - " + (parseInt(res.data.inicio)+parseInt(numResults))  + " total " + totalResults; 

      $("#datosLogExcepciones").html("");
      $("#checkboxColumnas").html("");
      $("#paginacion").html("");
        for (var i = 0; i < res.data.listaBusquedas.length; i++){
          var tr = construyeFila('LOG_EXCEPCIONES', res.data.listaBusquedas[i]);
          $("#datosLogExcepciones").append(tr);
        }
      
      var div = createHideShowColumnsWindow({LOGIN_USUARIO_COLUMN:1, TYPE_EXCEPTION_COLUMN:2, DESCRIPTION_EXCEPTION_COLUMN:3, DATE_COLUMN:4});
      
      $("#checkboxColumnas").append(div);
      $("#paginacion").append(textPaginacion);
      setLang(getCookie('lang'));

      if(paginadorCreado != 'PaginadorCreado'){
        paginador(totalResults, 'buscarLogExcepciones', 'LOG_EXCEPCIONES');
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
      cargarPermisosFuncLogExcepciones();
      respuestaAjaxKO(res.code);

      let idElementoList = ["loginUsuario", "fechaInicio", "fechaFin"];
      resetearFormulario("formularioGenerico", idElementoList);

      setLang(getCookie('lang'));

      document.getElementById("modal").style.display = "block";
  });
}

/*Función que comprueba los permisos del usuario sobre el log de excepciones*/
async function cargarPermisosFuncLogExcepciones(){
  await cargarPermisosFuncLogExcepcionesAjaxPromesa()
  .then((res) => {
    gestionarPermisosLogExcepciones(res.data);
  }).catch((res) => {
      respuestaAjaxKO(res.code);
      setLang(getCookie('lang'));
      document.getElementById("modal").style.display = "block";
  });
}

/*Función que refresca la tabla por si hay algún cambio en BD */
async function refrescarTabla(numeroPagina, tamanhoPagina){
  await cargarLogExcepcionesAjaxPromesa(numeroPagina, tamanhoPagina)
  .then((res) => {
      cargarPermisosFuncLogExcepciones();
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
      
      $("#datosLogExcepciones").html("");
      $("#checkboxColumnas").html("");
      $("#paginacion").html("");
        for (var i = 0; i < res.data.listaBusquedas.length; i++){
          var tr = construyeFila('LOG_EXCEPCIONES', res.data.listaBusquedas[i]);
          $("#datosLogExcepciones").append(tr);
        }
      
      var div = createHideShowColumnsWindow({LOGIN_USUARIO_COLUMN:1, TYPE_EXCEPTION_COLUMN:2, DESCRIPTION_EXCEPTION_COLUMN:3, DATE_COLUMN:4});
      $("#checkboxColumnas").append(div);
      $("#paginacion").append(textPaginacion);
      setLang(getCookie('lang'));

      setCookie('usuarioLog', '');
      setCookie('fechaInicio', '');
      setCookie('fechaFin', '');

      paginador(totalResults, 'cargarLogExcepciones', 'LOG_EXCEPCIONES');

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
function gestionarPermisosLogExcepciones(idElementoList) {
  idElementoList.forEach( function (idElemento) {
    switch(idElemento){
      case 'Listar' :
        $('#btnListarLogExcepciones').attr('src', 'images/search3.png');
        $('#btnListarLogExcepciones').css("cursor", "pointer");
        $('#divListarLogExcepciones').attr("data-toggle", "modal");
        $('#divListarLogExcepciones').attr("data-target", "#form-modal");
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
