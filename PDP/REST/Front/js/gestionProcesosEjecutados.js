/* Función para obtener los procesos ejecutados del sistema */
async function cargarProcesosEjecutados(numeroPagina, tamanhoPagina, paginadorCreado){
  try{
	    const res = await cargarProcesosEjecutadosAjaxPromesa(numeroPagina, tamanhoPagina)
	  
      var numResults = res.data.numResultados + '';
	  	var totalResults = res.data.tamanhoTotal + '';
        var inicio = 0;
      if(res.data.listaBusquedas.length == 0){
        inicio = 0;
      }else{
        inicio = parseInt(res.data.inicio)+1;
      }
      var textPaginacion = inicio + " - " + (parseInt(res.data.inicio)+parseInt(numResults))  + " total " + totalResults;

      if(res.data.listaBusquedas.length == 0){
        $('#itemPaginacion').attr('hidden',true);
      }else{
        $('#itemPaginacion').attr('hidden',false);
      }
	   	
      $("#datosProcesoEjecutado").html("");
	   	$("#checkboxColumnas").html("");
	   	$("#paginacion").html("");
    		
      for (var i = 0; i < res.data.listaBusquedas.length; i++){
          try{
            const datosProcedimientoAsociado = await cargarProcedimiento(res.data.listaBusquedas[i].procedimientoUsuario.idProcedimientoUsuario);
            var tr = construyeFilaProcesosEjecutado('PROCESOSEJECUTADOS', res.data.listaBusquedas[i], datosProcedimientoAsociado.data);
            $("#datosProcesoEjecutado").append(tr);
            
            }catch(datosProcedimientoAsociado){
              respuestaAjaxKO(datosProcedimientoAsociado.code);
              setLang(getCookie('lang'));
              document.getElementById("modal").style.display = "block";
            }
       
    	}
    	
    	var div = createHideShowColumnsWindow({NOMBRE_PROCEDIMIENTO_COLUMN : 1, LOGIN_USUARIO_COLUMN:2, NOMBRE_PROCESO_COLUMN: 3, DATE_COLUMN: 4});
      	$("#checkboxColumnas").append(div);
      	$("#paginacion").append(textPaginacion);
         document.getElementById('filasTabla').style.display = "block";
      	setLang(getCookie('lang'));

        if(paginadorCreado != 'PaginadorCreado'){
          paginador(totalResults, 'cargarProcesosEjecutados', 'PROCESOSEJECUTADOS');
        }
        
        if(numeroPagina == 0){
          $('#' + (numeroPagina+1)).addClass("active");
          var numPagCookie = numeroPagina+1;
        }else{
          $('#' + numeroPagina).addClass("active");
           var numPagCookie = numeroPagina;
        }

        setCookie('numeroPagina', numPagCookie);
        setLang(getCookie('lang'));
	  
		}catch(res){
		    respuestaAjaxKO(res.code);
        setLang(getCookie('lang'));
		    document.getElementById("modal").style.display = "block";
		};
}

/** Funcion buscar proceso **/
async function buscarProcesoEjecutado(numeroPagina, tamanhoPagina, accion, paginadorCreado){
    try {
        if($('#form-modal').is(':visible')) {
          $("#form-modal").modal('toggle');
        };
      const res = await buscarProcesoEjecutadoAjaxPromesa(numeroPagina, tamanhoPagina, accion);
      guardarParametrosBusqueda(res.data.datosBusqueda);
    
      var numResults = res.data.numResultados + '';
      var totalResults = res.data.tamanhoTotal + '';
        var inicio = 0;
      if(res.data.listaBusquedas.length == 0){
        inicio = 0;
      }else{
        inicio = parseInt(res.data.inicio)+1;
      }
      var textPaginacion = inicio + " - " + (parseInt(res.data.inicio)+parseInt(numResults))  + " total " + totalResults;

      if(res.data.listaBusquedas.length == 0){
        $('#itemPaginacion').attr('hidden',true);
      }else{
        $('#itemPaginacion').attr('hidden',false);
      }
      
      $("#datosProcesoEjecutado").html("");
      $("#checkboxColumnas").html("");
      $("#paginacion").html("");
        
      for (var i = 0; i < res.data.listaBusquedas.length; i++){
          try{
            const datosProcedimientoAsociado = await cargarProcedimiento(res.data.listaBusquedas[i].procedimientoUsuario.idProcedimientoUsuario);
            var tr = construyeFilaProcesosEjecutado('PROCESOSEJECUTADOS', res.data.listaBusquedas[i], datosProcedimientoAsociado.data);
            $("#datosProcesoEjecutado").append(tr);
            
            }catch(datosProcedimientoAsociado){
              respuestaAjaxKO(datosProcedimientoAsociado.code);
              setLang(getCookie('lang'));
              document.getElementById("modal").style.display = "block";
            }
       
      }
      
      var div = createHideShowColumnsWindow({NOMBRE_PROCEDIMIENTO_COLUMN : 1, LOGIN_USUARIO_COLUMN:2, NOMBRE_PROCESO_COLUMN: 3, DATE_COLUMN: 4});
        $("#checkboxColumnas").append(div);
        $("#paginacion").append(textPaginacion);
         document.getElementById('filasTabla').style.display = "block";
        setLang(getCookie('lang'));

        if(paginadorCreado != 'PaginadorCreado'){
          paginador(totalResults, 'cargarProcesosEjecutados', 'PROCESOSEJECUTADOS');
        }
        
        if(numeroPagina == 0){
          $('#' + (numeroPagina+1)).addClass("active");
          var numPagCookie = numeroPagina+1;
        }else{
          $('#' + numeroPagina).addClass("active");
           var numPagCookie = numeroPagina;
        }

        setCookie('numeroPagina', numPagCookie);
        setLang(getCookie('lang'));
    
    }catch(res){
        respuestaAjaxKO(res.code);
        setLang(getCookie('lang'));
        document.getElementById("modal").style.display = "block";
    };
}


/* Función para obtener los procesos ejecutados del sistema */
async function refrescarTabla(numeroPagina, tamanhoPagina){
  try{
      const res = await cargarProcesosEjecutadosAjaxPromesa(numeroPagina, tamanhoPagina)
    
      var numResults = res.data.numResultados + '';
      var totalResults = res.data.tamanhoTotal + '';
        var inicio = 0;
      if(res.data.listaBusquedas.length == 0){
        inicio = 0;
      }else{
        inicio = parseInt(res.data.inicio)+1;
      }
      var textPaginacion = inicio + " - " + (parseInt(res.data.inicio)+parseInt(numResults))  + " total " + totalResults;

      if(res.data.listaBusquedas.length == 0){
        $('#itemPaginacion').attr('hidden',true);
      }else{
        $('#itemPaginacion').attr('hidden',false);
      }
      
      $("#datosProcesoEjecutado").html("");
      $("#checkboxColumnas").html("");
      $("#paginacion").html("");
        
      for (var i = 0; i < res.data.listaBusquedas.length; i++){
          try{
            const datosProcedimientoAsociado = await cargarProcedimiento(res.data.listaBusquedas[i].procedimientoUsuario.idProcedimientoUsuario);
            var tr = construyeFilaProcesosEjecutado('PROCESOSEJECUTADOS', res.data.listaBusquedas[i], datosProcedimientoAsociado.data);
            $("#datosProcesoEjecutado").append(tr);
            
            }catch(datosProcedimientoAsociado){
              respuestaAjaxKO(datosProcedimientoAsociado.code);
              setLang(getCookie('lang'));
              document.getElementById("modal").style.display = "block";
            }
       
      }
      
      var div = createHideShowColumnsWindow({NOMBRE_PROCEDIMIENTO_COLUMN : 1, LOGIN_USUARIO_COLUMN:2, NOMBRE_PROCESO_COLUMN: 3, DATE_COLUMN: 4});
        $("#checkboxColumnas").append(div);
        $("#paginacion").append(textPaginacion);
         document.getElementById('filasTabla').style.display = "block";
        setLang(getCookie('lang'));

        
        paginador(totalResults, 'cargarProcesosEjecutados', 'PROCESOSEJECUTADOS');
        
        
        if(numeroPagina == 0){
          $('#' + (numeroPagina+1)).addClass("active");
          var numPagCookie = numeroPagina+1;
        }else{
          $('#' + numeroPagina).addClass("active");
           var numPagCookie = numeroPagina;
        }

        setCookie('numeroPagina', numPagCookie);
        setLang(getCookie('lang'));
    
    }catch(res){
        respuestaAjaxKO(res.code);
        setLang(getCookie('lang'));
        document.getElementById("modal").style.display = "block";
    };
}

/**Función para recuperar un procedimientoEjecutado en base a parámetros con ajax y promesas*/
function buscarProcesoEjecutadoAjaxPromesa(numeroPagina, tamanhoPagina, accion){
  return new Promise(function(resolve, reject) {
    var token = getCookie('tokenUsuario');

    if(accion == "buscarModal"){

       var procedimiento = {
        idProcedimiento: '',
        nombreProcedimiento : $('#nombreProcedimiento').val(),
        descripProcedimiento : '',
        fechaProcedimiento : '',
        checkUsuario : '',
        plan : {
          idPlan : '',
          nombrePlan : '',
          descripPlan : '',
          fechaPlan : '',
          borradoPlan : '',
          objetivo : {
            idObjetivo : '',
            nombreObjetivo : '',
            descripObjetivo : '',
            borradoObjetivo : ''
          }
        },
        borradoProcedimiento : ''
      }

      var proceso = {
        idProceso : '',
        nombreProceso : $('#nombreProceso').val(),
        descripProceso : '',
        fechaProceso : '',
        borradoProceso : ''
      }

      var usuario = {
        dniUsuario : '',
        usuario : $('#loginUsuario').val(),
        passwdUsuario : '',
        borradoUsuario : '',
      }

      if($('#fechaProcesoEjecutado').val() == "1900-01-01" || $('#fechaProcesoEjecutado').val() == "" ){
        var fechaProcesoEjec = "";
      }else{
        var fechaProcesoEjec = $('#fechaProcesoEjecutado').val()
      }

      var data = {
        procedimiento : procedimiento,
        proceso : proceso,
        usuario : usuario,
        inicio: calculaInicio(numeroPagina, tamanhoPaginaProcesosEjecutados),
        tamanhoPagina: tamanhoPaginaProcesosEjecutados
      }
    }

    $.ajax({
      method: "POST",
      url: urlPeticionAjaxListarProcedimientoUsuarioProceso,
      contentType : "application/json",
      data: JSON.stringify(data),  
      dataType : 'json',
      headers: {'Authorization': token},
      }).done(res => {
        if (res.code != 'PROCEDIMIENTOS_USUARIOS_PROCESOS_LISTADOS') {
          reject(res);
        }
        resolve(res);
      }).fail( function( jqXHR ) {
        errorFailAjax(jqXHR.status);
      });
  });
}

function cargarProcesosEjecutadosAjaxPromesa(numeroPagina, tamanhoPagina){
  return new Promise(function(resolve, reject) {
    var token = getCookie('tokenUsuario');

    var data = {
      inicio : calculaInicio(numeroPagina, tamanhoPaginaProcesosEjecutados),
      tamanhoPagina : tamanhoPaginaProcesosEjecutados
    }

    $.ajax({
      method: "POST",
      url: urlPeticionAjaxListarProcedimientosUsuariosProcesos,
      contentType : "application/json",
      data : JSON.stringify(data),
      dataType : 'json',
      headers: {'Authorization': token},
      }).done(res => {
        if (res.code != 'PROCEDIMIENTOS_USUARIOS_PROCESOS_LISTADOS') {
          reject(res);
        }
        resolve(res);
      }).fail( function( jqXHR ) {
        errorFailAjax(jqXHR.status);
      });
  });
}

/** Función para obtener los procedimientos de un usuario con ajax y promesas**/
function cargarProcedimiento(idProcedimientoUsuario){
  return new Promise(function(resolve, reject) {
    var token = getCookie('tokenUsuario');

    $.ajax({
      method: "POST",
      url: urlPeticionAjaxListarProcedimientoUsuarioById,
      contentType : "application/json",
      data: idProcedimientoUsuario.toString(),  
      dataType : 'json',
      headers: {'Authorization': token},
      }).done(res => {
        if (res.code != 'PROCEDIMIENTOS_USUARIO_LISTADOS') {
          reject(res);
        }
        resolve(res);
      }).fail( function( jqXHR ) {
        errorFailAjax(jqXHR.status);
      });
  });
}

/** Función para obtener los procedimientos de un usuario con ajax y promesas**/
function cargarProcesosOfProcedimientoUsuario(idProcedimientoUsuario){
  return new Promise(function(resolve, reject) {
    var token = getCookie('tokenUsuario');

    $.ajax({
      method: "POST",
      url: urlPeticionAjaxListarProcedimientoUsuarioProcesoOfProcedimientoUsuario,
      contentType : "application/json",
      data: idProcedimientoUsuario.toString(),  
      dataType : 'json',
      headers: {'Authorization': token},
      }).done(res => {
        if (res.code != 'PROCEDIMIENTOS_USUARIOS_PROCESOS_LISTADOS') {
          reject(res);
        }
        resolve(res);
      }).fail( function( jqXHR ) {
        errorFailAjax(jqXHR.status);
      });
  });
}

function showDetalle(nombreProcedimiento, usuario, nombreProceso, fechaProcedimientoUsuarioProceso, respuesta, evidencia, idProcedimientoUsuarioProceso){
    var idioma = getCookie('lang');

    cambiarFormulario('DETAIL_PROCESO_EJECUTADO', 'javascript:detalleProcesoEjecutado();', '');
    
    cambiarIcono('images/close2.png', 'ICONO_CERRAR', 'iconoCerrar', 'Detalle');

    setLang(idioma);

    $('#labelNombreProcedimiento').removeAttr('hidden');
    $('#labelLoginUsuario').removeAttr('hidden');
    $('#labelFechaProcesoEjecutado').removeAttr('hidden');
    $('#labelNombreProceso').removeAttr('hidden');
    $('#labelPuntuacionProcedimientoEjecutado').removeAttr('hidden');
    $('#labelTextoRespuestaPosible').removeAttr('hidden');
    $('#textoRespuestaPosible').removeAttr('hidden');
    $('#labelEvidencia').removeAttr('hidden');
    

    rellenarFormulario(nombreProcedimiento, usuario, nombreProceso, fechaProcedimientoUsuarioProceso, respuesta, evidencia);

    let campos = ["nombreProcedimiento", "loginUsuario", "fechaProcesoEjecutado", "nombreProceso", "textoRespuestaPosible"];
    let obligatorios = ["obligatorioNombreProcedimiento", "obligatorioLoginUsuario", "obligatorioFechaProcesoEjecutado", "obligatorioNombreProceso", "obligatorioEvidencia"];
    
    anadirReadonly(campos);
    ocultarObligatorios(obligatorios);
    deshabilitaCampos(campos);
    setLang(getCookie('lang'));

}

/** Funcion para buscar una empresa **/
function showBuscarProcesoEjecutado() {
  var idioma = getCookie('lang');

  cambiarFormulario('SEARCH_PROCESO_EJECUTADO', 'javascript:buscarProcesoEjecutado(0,' + tamanhoPaginaProcesosEjecutados + ', \'buscarModal\'' + ',\'PaginadorNo\');', 'return comprobarBuscarProcesoEjecutado();');
  cambiarOnBlurCampos('return comprobarNombreProcedimientoSearch(\'nombreProcedimiento\', \'errorFormatoNombreProcedimiento\', \'nombreProcedimiento\')',
      'return comprobarUserSearch(\'loginUsuario\', \'errorFormatoLoginUsuario\', \'loginUsuario\')', 
      'return comprobarNombreProcesoSearch(\'nombreProceso\', \'errorFormatoNombreProceso\', \'nombreProceso\')',
      'return comprobarFechaProcesoEjecutadoSearch(\'fechaProcesoEjecutado\', \'errorFormatoFechaProcesoEjecutado\', \'fechaProcesoEjecutado\')');
  cambiarIcono('images/search.png', 'ICONO_SEARCH', 'iconoSearchProcedimientoEjecutado', 'Buscar');
  setLang(idioma);

    $('#labelNombreProcedimiento').attr('hidden', true);
    $('#labelLoginUsuario').attr('hidden', true);
    $('#labelFechaProcesoEjecutado').attr('hidden', true);
    $('#labelNombreProceso').attr('hidden', true);
    $('#labelTextoRespuestaPosible').attr('hidden', true);
    $('#textoRespuestaPosible').attr('hidden', true);
    $('#labelEvidencia').attr('hidden', true);
    

    let campos = ["nombreProcedimiento", "loginUsuario", "fechaProcesoEjecutado", "nombreProceso", "textoRespuestaPosible"];
    let obligatorios = ["obligatorioNombreProcedimiento", "obligatorioLoginUsuario", "obligatorioFechaProcesoEjecutado", "obligatorioNombreProceso", "obligatorioEvidencia"];
  
  eliminarReadonly(campos);
  ocultarObligatorios(obligatorios);
  habilitaCampos(campos);
  setLang(getCookie('lang'));

}

/**Función para cerrar la modal de detalle de procedimiento*/
function detalleProcesoEjecutado(){
    $("#form-modal").modal('toggle');

    let idElementoList = ["nombreProcedimiento", "loginUsuario", "fechaProcesoEjecutado", "nombreProceso", "textoRespuestaPosible"];

    resetearFormulario("formularioGenerico", idElementoList);
    setLang(getCookie('lang'));
}

/** Función para recuperar los permisos de un usuario sobre la funcionalidad **/
function cargarPermisosFuncProcesosEjecutadosAjaxPromesa(){
  return new Promise(function(resolve, reject) {
    var nombreUsuario = getCookie('usuario');
    var token = getCookie('tokenUsuario');
    
    var usuario = nombreUsuario;
  
    $.ajax({
      method: "GET",
      url: urlPeticionAjaxAccionesUsuario,
      contentType : "application/json",
      data: { usuario : usuario, funcionalidad : 'Gestión de procesos ejecutados'},  
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

/*Función que comprueba los permisos del usuario sobre la funcionalidad*/
async function cargarPermisosFuncProcesosEjecutados(){
  await cargarPermisosFuncProcesosEjecutadosAjaxPromesa()
  .then((res) => {
    gestionarPermisosProcesosEjecutados(res.data);
    setLang(getCookie('lang'));
  }).catch((res) => {
      respuestaAjaxKO(res.code);
      setLang(getCookie('lang'));
      document.getElementById("modal").style.display = "block";
  });
}

/** Función para gestionar los iconos dependiendo de los permisos de los usuarios **/
function gestionarPermisosProcesosEjecutados(idElementoList) {
  idElementoList.forEach( function (idElemento) {
    switch(idElemento){

      case 'Listar' :
        $('#btnListarProcesosEjecutados').attr('src', 'images/search3.png');
        $('#btnListarProcesosEjecutados').css("cursor", "pointer");
        $('#divListarProcesoEjecutado').attr("data-toggle", "modal");
        $('#divListarProcesoEjecutado').attr("data-target", "#form-modal");
        document.getElementById('tablaDatos').style.display = "block";
        document.getElementById('filasTabla').style.display = "block";

      case "Visualizar" :
        $('.detallePermiso').attr('src', 'images/detail3.png');
        $('.detallePermiso').css("cursor", "pointer");
        $('.detallePermiso').attr("data-toggle", "modal");
        $('.detallePermiso').attr("data-target", "#form-modal");
      break;

    } 
    }); 
  setLang(getCookie('lang'));
}

function cambiarOnBlurCampos(onBlurNombreProcedimiento, onBlurLoginUsuario, onBlurNombreProceso, onBlurFecha){
  if (onBlurNombreProcedimiento != ''){
        $("#nombreProcedimiento").attr('onblur', onBlurNombreProcedimiento);
    }

    if (onBlurLoginUsuario != ''){
        $("#loginUsuario").attr('onblur', onBlurLoginUsuario);
    }

     if (onBlurFecha != ''){
        $("#fechaProcesoEjecutado").attr('onblur', onBlurFecha);
    }

    if (onBlurNombreProceso != ''){
        $("#nombreProceso").attr('onblur', onBlurNombreProceso);
    }
}

function rellenarFormulario(nombreProcedimiento, usuario, nombreProceso, fechaProcedimientoUsuarioProceso, respuesta, evidencia){
  $('#nombreProcedimiento').val(nombreProcedimiento);
  $('#loginUsuario').val(usuario);
  $('#nombreProceso').val(nombreProceso);
  $('#fechaProcedimientoUsuarioProceso').val(fechaProcedimientoUsuarioProceso);
  $('#textoRespuestaPosible').val(respuesta);
  $('#evidencia').attr('href', '../evidencias/' + evidencia);
  $('#evidencia').attr('download', evidencia);
  $('#evidencia').html(evidencia);
  setLang(getCookie('lang'));
}

$(document).ready(function() {
  $("#form-modal").on('hidden.bs.modal', function() {

    let idElementoErrorList = ["errorFormatoNombreProcedimiento", "errorFormatoLoginUsuario", "errorFormatoFechaProcesoEjecutado", "errorFormatoNombreProceso", "errorFormatoTextoRespuestaPosible", "errorFormatoEvidencia"];

    let idElementoList = ["nombreProcedimiento", "loginUsuario", "fechaProcesoEjecutado", "nombreProceso", "textoRespuestaPosible"];

    limpiarFormulario(idElementoList);
    eliminarMensajesValidacionError(idElementoErrorList, idElementoList);
    setLang(getCookie('lang'));

    resetearFormulario("formularioGenerico", idElementoList);

  });

}); 
