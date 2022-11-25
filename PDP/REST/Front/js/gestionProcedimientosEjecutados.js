/* Función para obtener las noticias del sistema */
async function cargarProcedimientosEjecutados(numeroPagina, tamanhoPagina, paginadorCreado){
  try{
	    const res = await cargarProcedimientosEjecutadosAjaxPromesa(numeroPagina, tamanhoPagina)
	  
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
	   	
      $("#datosProcedimientoEjecutado").html("");
	   	$("#checkboxColumnas").html("");
	   	$("#paginacion").html("");
    		
      for (var i = 0; i < res.data.listaBusquedas.length; i++){
          try{
          const numerosProcesos = await cargarProcesosProcedimientoAjaxPromesa(0, 0, res.data.listaBusquedas[i].idProcedimientoUsuario);
          
            try{
              const numerosProcesosEjecutados = await cargarProcesosOfProcedimientoUsuario(res.data.listaBusquedas[i].idProcedimientoUsuario)
              var tr = construyeFilaProcedimientoEjecutado('PROCEDIMIENTOSEJECUTADOS', res.data.listaBusquedas[i], numerosProcesos.data.listaBusquedas.length, numerosProcesosEjecutados.data.procesos.length);
              $("#datosProcedimientoEjecutado").append(tr);
            }catch(numeroProcesosEjecutados){
              respuestaAjaxKO(res.code);
              setLang(getCookie('lang'));
              document.getElementById("modal").style.display = "block";
            }
        }catch(numerosProcesos){
          respuestaAjaxKO(res.code);
          setLang(getCookie('lang'));
          document.getElementById("modal").style.display = "block";
        }
    	}
    	
    	var div = createHideShowColumnsWindow({NOMBRE_PROCEDIMIENTO_COLUMN : 1, LOGIN_USUARIO_COLUMN:2, DATE_COLUMN: 3, ESTADO_PROCEDIMIENTO_EJECUTADO_COLUMN: 4});
      	$("#checkboxColumnas").append(div);
      	$("#paginacion").append(textPaginacion);
         document.getElementById('filasTabla').style.display = "block";
      	setLang(getCookie('lang'));

        if(paginadorCreado != 'PaginadorCreado'){
          paginador(totalResults, 'cargarProcedimientosEjecutados', 'PROCEDIMIENTOSEJECUTADOS');
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

/* Función para obtener las noticias del sistema */
async function refrescarTabla(numeroPagina, tamanhoPagina){
  try{
      const res = await cargarProcedimientosEjecutadosAjaxPromesa(numeroPagina, tamanhoPagina)
    
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
      
      $("#datosProcedimientoEjecutado").html("");
      $("#checkboxColumnas").html("");
      $("#paginacion").html("");
        
      for (var i = 0; i < res.data.listaBusquedas.length; i++){
          try{
          const numerosProcesos = await cargarProcesosProcedimientoAjaxPromesa(0, 0, res.data.listaBusquedas[i].idProcedimientoUsuario);
          
            try{
              const numerosProcesosEjecutados = await cargarProcesosOfProcedimientoUsuario(res.data.listaBusquedas[i].idProcedimientoUsuario)
              var tr = construyeFilaProcedimientoEjecutado('PROCEDIMIENTOSEJECUTADOS', res.data.listaBusquedas[i], numerosProcesos.data.listaBusquedas.length, numerosProcesosEjecutados.data.procesos.length);
              $("#datosProcedimientoEjecutado").append(tr);
            }catch(numeroProcesosEjecutados){
              respuestaAjaxKO(res.code);
              setLang(getCookie('lang'));
              document.getElementById("modal").style.display = "block";
            }
        }catch(numerosProcesos){
          respuestaAjaxKO(res.code);
          setLang(getCookie('lang'));
          document.getElementById("modal").style.display = "block";
        }
      }
      
      var div = createHideShowColumnsWindow({NOMBRE_PROCEDIMIENTO_COLUMN : 1, LOGIN_USUARIO_COLUMN:2, DATE_COLUMN: 3, ESTADO_PROCEDIMIENTO_EJECUTADO_COLUMN: 4});
        $("#checkboxColumnas").append(div);
        $("#paginacion").append(textPaginacion);
         document.getElementById('filasTabla').style.display = "block";
        setLang(getCookie('lang'));

       
        paginador(totalResults, 'cargarProcedimientosEjecutados', 'PROCEDIMIENTOSEJECUTADOS');
        
        
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
async function buscarProcedimientoEjecutado(numeroPagina, tamanhoPagina, accion, paginadorCreado){
    try {
        if($('#form-modal').is(':visible')) {
          $("#form-modal").modal('toggle');
        };
      const res = await buscarProcedimientoEjecutadoAjaxPromesa(numeroPagina, tamanhoPagina, accion);
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
      
      $("#datosProcedimientoEjecutado").html("");
      $("#checkboxColumnas").html("");
      $("#paginacion").html("");
        
      for (var i = 0; i < res.data.listaBusquedas.length; i++){
          try{
          const numerosProcesos = await cargarProcesosProcedimientoAjaxPromesa(0, 0, res.data.listaBusquedas[i].idProcedimientoUsuario);
          
            try{
              const numerosProcesosEjecutados = await cargarProcesosOfProcedimientoUsuario(res.data.listaBusquedas[i].idProcedimientoUsuario)
              var tr = construyeFilaProcedimientoEjecutado('PROCEDIMIENTOSEJECUTADOS', res.data.listaBusquedas[i], numerosProcesos.data.listaBusquedas.length, numerosProcesosEjecutados.data.procesos.length);
              $("#datosProcedimientoEjecutado").append(tr);
            }catch(numeroProcesosEjecutados){
              respuestaAjaxKO(res.code);
              setLang(getCookie('lang'));
              document.getElementById("modal").style.display = "block";
            }
          
        }catch(numerosProcesos){
          respuestaAjaxKO(res.code);
          setLang(getCookie('lang'));
          document.getElementById("modal").style.display = "block";
        }
      }
      
      var div = createHideShowColumnsWindow({NOMBRE_PROCEDIMIENTO_COLUMN : 1, LOGIN_USUARIO_COLUMN:2, DATE_COLUMN: 3, ESTADO_PROCEDIMIENTO_EJECUTADO_COLUMN: 4});
        $("#checkboxColumnas").append(div);
        $("#paginacion").append(textPaginacion);
        document.getElementById('filasTabla').style.display = "block";
        setLang(getCookie('lang'));

        if(paginadorCreado != 'PaginadorCreado'){
          paginador(totalResults, 'buscarProcedimientoEjecutado', 'PROCEDIMIENTOSEJECUTADOS');
        }
        cargarPermisosFuncProcedimientosEjecutados();
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

function cargarProcesosProcedimientoAjaxPromesa(numeroPagina, tamanhoPagina, idProcedimiento){
   return new Promise(function(resolve, reject) {
    var token = getCookie('tokenUsuario');
    
    var procesoProcedimientoPaginacion = {
      idProcedimiento : idProcedimiento,
      inicio : '',
      tamanhoPagina : ''
    }

     $.ajax({
      method: "POST",
      url: urlPeticionAjaxListadoProcesosProcedimientoByIdProcedimiento,
      contentType : "application/json",
      data: JSON.stringify(procesoProcedimientoPaginacion),  
      dataType : 'json',
      headers: {'Authorization': token},
      }).done(res => {
        if (res.code != 'PROCESOS_PROCEDIMIENTOS_LISTADOS') {
          reject(res);
        }
        resolve(res);
      }).fail( function( jqXHR ) {
        errorFailAjax(jqXHR.status);
      });
  });
}

function cargarProcedimientosEjecutadosAjaxPromesa(numeroPagina, tamanhoPagina){
  return new Promise(function(resolve, reject) {
    var token = getCookie('tokenUsuario');

    var data = {
      inicio : calculaInicio(numeroPagina, tamanhoPaginaProcedimientosEjecutados),
      tamanhoPagina : tamanhoPaginaProcedimientosEjecutados
    }

    $.ajax({
      method: "POST",
      url: urlPeticionAjaxListarProcedimientosUsuario,
      contentType : "application/json",
      data: JSON.stringify(data),
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

/** Función para recuperar los permisos de un usuario sobre la funcionalidad **/
function cargarPermisosFuncProcedimientosEjecutadosAjaxPromesa(){
  return new Promise(function(resolve, reject) {
    var nombreUsuario = getCookie('usuario');
    var token = getCookie('tokenUsuario');
    
    var usuario = nombreUsuario;
  
    $.ajax({
      method: "GET",
      url: urlPeticionAjaxAccionesUsuario,
      contentType : "application/json",
      data: { usuario : usuario, funcionalidad : 'Gestión de procedimientos ejecutados'},  
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
async function cargarPermisosFuncProcedimientosEjecutados(){
  await cargarPermisosFuncProcedimientosEjecutadosAjaxPromesa()
  .then((res) => {
    gestionarPermisosProcedimientosEjecutados(res.data);
    setLang(getCookie('lang'));
  }).catch((res) => {
      respuestaAjaxKO(res.code);
      setLang(getCookie('lang'));
      document.getElementById("modal").style.display = "block";
  });
}

/** Función para gestionar los iconos dependiendo de los permisos de los usuarios **/
function gestionarPermisosProcedimientosEjecutados(idElementoList) {
  idElementoList.forEach( function (idElemento) {
    switch(idElemento){

      case "Modificar" : 
        $('.editarPermiso').attr('src', 'images/edit3.png');
        $('.editarPermiso').css("cursor", "pointer");
        $('.editarPermiso').attr("data-toggle", "modal");
        $('.editarPermiso').attr("data-target", "#form-modal");
      break;

      case 'Listar' :
        document.getElementById('tablaDatos').style.display = "block";
        document.getElementById('filasTabla').style.display = "block";
        $('#btnListarProcedimientosEjecutados').attr('src', 'images/search3.png');
        $('#btnListarProcedimientosEjecutados').css("cursor", "pointer");
        $('#divListarProcedimientoEjecutado').attr("data-toggle", "modal");
        $('#divListarProcedimientoEjecutado').attr("data-target", "#form-modal");

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

/** Funcion para visualizar un procedimiento ejecutado **/
function showDetalle(nombreProcedimiento, usuario, fechaProcedimientoEjecutado, estadoProcedimientoEjecutado, puntuacionProcedimientoUsuario, idProcedimientoEjecutado) {

    var idioma = getCookie('lang');

    cambiarFormulario('DETAIL_PROCEDIMIENTO_EJECUTADO', 'javascript:detalleProcedimientoEjecutado();', '');
    
    cambiarIcono('images/close2.png', 'ICONO_CERRAR', 'iconoCerrar', 'Detalle');

    setLang(idioma);

    $('#labelNombreProcedimiento').removeAttr('hidden');
    $('#labelLoginUsuario').removeAttr('hidden');
    $('#labelFechaProcedimientoEjecutado').removeAttr('hidden');
    $('#labelEstadoProcedimientoEjecutado').removeAttr('hidden');
    $('#labelPuntuacionProcedimientoEjecutado').removeAttr('hidden');
    $('#subtitulo').attr('hidden', '');
    $('#estadoProcedimientoEjecutado').removeAttr('hidden');
    $('#puntuacionProcedimientoEjecutado').removeAttr('hidden');

    rellenarFormulario(nombreProcedimiento, usuario, fechaProcedimientoEjecutado, estadoProcedimientoEjecutado, puntuacionProcedimientoUsuario);

    let campos = ["nombreProcedimiento", "loginUsuario", "fechaProcedimientoEjecutado", "estadoProcedimientoEjecutado", "puntuacionProcedimientoEjecutado"];
    let obligatorios = ["obligatorioNombreProcedimiento", "obligatorioLoginUsuario", "obligatorioFechaProcedimientoEjecutado", "obligatorioEstadoProcedimientoEjecutado", "obligatorioPuntuacionProcedimientoEjecutado"];
    
    anadirReadonly(campos);
    ocultarObligatorios(obligatorios);
    deshabilitaCampos(campos);
    setLang(getCookie('lang'));

}

/** Funcion para visualizar un objetivo **/
function showEditar(nombreProcedimiento, usuario, fechaProcedimientoEjecutado, estadoProcedimientoEjecutado, puntuacionProcedimientoUsuario, idProcedimientoEjecutado) {

    var idioma = getCookie('lang');

    cambiarFormulario('EDIT_PROCEDIMIENTO_EJECUTADO', 'javascript:editProcedimientoEjecutado();', 'return comprobarEditProcedimientoEjecutado();');
    cambiarOnBlurCampos('', '', '', 'return comprobarPuntuacionProcedimientoEjecutado(\'puntuacionProcedimientoEjecutado\', \'errorFormatoPuntuacionProcedimientoEjecutado\', \'puntuacionProcedimiento\')');
    cambiarIcono('images/edit.png', 'ICONO_EDIT', 'iconoEditarPlan', 'Editar');

    setLang(idioma);

    $('#labelNombreProcedimiento').attr('hidden', true);
    $('#labelLoginUsuario').attr('hidden', true);
    $('#labelFechaProcedimientoEjecutado').attr('hidden', true);
    $('#labelEstadoProcedimientoEjecutado').attr('hidden', true);
    $('#labelPuntuacionProcedimientoEjecutado').attr('hidden', true);
    $('#subtitulo').attr('hidden', '');
    $('#estadoProcedimientoEjecutado').attr('hidden', false);
    $('#puntuacionProcedimientoEjecutado').attr('hidden', false);

    rellenarFormulario(nombreProcedimiento, usuario, fechaProcedimientoEjecutado, estadoProcedimientoEjecutado, puntuacionProcedimientoUsuario);
    insertacampo(document.formularioGenerico,'idProcedimientoEjecutado', idProcedimientoEjecutado);

    let campos = ["nombreProcedimiento", "loginUsuario", "fechaProcedimientoEjecutado", "estadoProcedimientoEjecutado"];
    let obligatorios = ["obligatorioNombreProcedimiento", "obligatorioLoginUsuario", "obligatorioFechaProcedimientoEjecutado", "obligatorioEstadoProcedimientoEjecutado", "obligatorioPuntuacionProcedimientoEjecutado"];
    
    anadirReadonly(campos);
    mostrarObligatorios(obligatorios);
    deshabilitaCampos(campos);
    habilitaCampos(["puntuacionProcedimientoEjecutado"]);
    eliminarReadonly(["puntuacionProcedimientoEjecutado"]);
    setLang(getCookie('lang'));

}

/** Funcion para buscar una empresa **/
function showBuscarProcedimientoEjecutado() {
  var idioma = getCookie('lang');

  cambiarFormulario('SEARCH_PROCEDIMIENTO_EJECUTADO', 'javascript:buscarProcedimientoEjecutado(0,' + tamanhoPaginaProcedimientosEjecutados + ', \'buscarModal\'' + ',\'PaginadorNo\');', 'return comprobarBuscarProcedimientoEjecutado();');
  cambiarOnBlurCampos('return comprobarNombreProcedimientoSearch(\'nombreProcedimiento\', \'errorFormatoNombreProcedimiento\', \'nombreProcedimiento\')',
      'return comprobarUserSearch(\'loginUsuario\', \'errorFormatoLoginUsuario\', \'loginUsuario\')', 
      'return comprobarFechaProcedimientoEjecutadoSearch(\'fechaProcedimientoEjecutado\', \'errorFormatoFechaProcedimientoEjecutado\', \'fechaProcedimientoEjecutado\')',
      'return comprobarPuntuacionProcedimientoEjecutadoSearch(\'puntuacionProcedimientoEjecutado\', \'errorFormatoPuntuacionProcedimientoEjecutado\', \'puntuacionProcedimiento\')');
  cambiarIcono('images/search.png', 'ICONO_SEARCH', 'iconoSearchProcedimientoEjecutado', 'Buscar');
  setLang(idioma);

  $('#labelNombreProcedimiento').attr('hidden', true);
  $('#labelLoginUsuario').attr('hidden', true);
  $('#labelFechaProcedimientoEjecutado').attr('hidden', true);
  $('#labelEstadoProcedimientoEjecutado').attr('hidden', true);
  $('#labelPuntuacionProcedimientoEjecutado').attr('hidden', true);
  $('#subtitulo').attr('hidden', '');
  $('#estadoProcedimientoEjecutado').attr('hidden', true);
  $('#puntuacionProcedimientoEjecutado').attr('hidden', true);

  let campos = ["nombreProcedimiento", "loginUsuario", "fechaProcedimientoEjecutado", "estadoProcedimientoEjecutado"];
  let obligatorios = ["obligatorioNombreProcedimiento", "obligatorioLoginUsuario", "obligatorioFechaProcedimientoEjecutado", "obligatorioEstadoProcedimientoEjecutado", "obligatorioPuntuacionProcedimientoEjecutado"];
  
  eliminarReadonly(campos);
  ocultarObligatorios(obligatorios);
  habilitaCampos(campos);
  setLang(getCookie('lang'));

}


/**Función para ver en detalle un plan con ajax y promesas*/
function detalleProcedimientoEjecutadoAjaxPromesa(){
  return new Promise(function(resolve, reject) {
    var token = getCookie('tokenUsuario');


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

    var usuario = {
      dniUsuario : '',
      usuario : $('#loginUsuario').val(),
      passwdUsuario : '',
      borradoUsuario : '',
    }

    var data = {
      puntuacionProcedimientoUsuario: $('#puntuacionProcedimientoEjecutado').val(),
      fechaProcedimientoUsuario : $('#fechaProcedimientoEjecutado').val(),
      procedimiento : procedimiento,
      usuario : usuario,
      inicio : 0,
      tamanhoPagina: 1
    }

      $.ajax({
      method: "POST",
      url: urlPeticionAjaxListarProcedimientoUsuario,
      contentType : "application/json",
      data: JSON.stringify(data),  
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

/**Función para ver en detalle un plan con ajax y promesas*/
function editarProcedimientoEjecutadoAjaxPromesa(){
  return new Promise(function(resolve, reject) {
    var token = getCookie('tokenUsuario');


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

    var usuario = {
      dniUsuario : '',
      usuario : $('#loginUsuario').val(),
      passwdUsuario : '',
      borradoUsuario : '',
    }

    var procedimientoUsuario = {
      idProcedimientoUsuario : $('#idProcedimientoEjecutado').val(),
      puntuacionProcedimientoUsuario: $('#puntuacionProcedimientoEjecutado').val(),
      fechaProcedimientoUsuario : $('#fechaProcedimientoEjecutado').val(),
      borradoProcedimientoUsuario : 0,
      procedimiento : procedimiento,
      usuario : usuario
    }

     var data = {
      usuario : getCookie('usuario'),
      procedimientoUsuario : procedimientoUsuario,
      volverGuardar : ''
    }

      $.ajax({
      method: "POST",
      url: urlPeticionAjaxEditProcedimientoUsuario,
      contentType : "application/json",
      data: JSON.stringify(data),  
      dataType : 'json',
      headers: {'Authorization': token},
      }).done(res => {
        if (res.code != 'PROCEDIMIENTO_USUARIO_MODIFICADO') {
          reject(res);
        }
        resolve(res);
      }).fail( function( jqXHR ) {
        errorFailAjax(jqXHR.status);
      });
  });
}

/**Función para recuperar un procedimientoEjecutado en base a parámetros con ajax y promesas*/
function buscarProcedimientoEjecutadoAjaxPromesa(numeroPagina, tamanhoPagina, accion){
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

      var usuario = {
        dniUsuario : '',
        usuario : $('#loginUsuario').val(),
        passwdUsuario : '',
        borradoUsuario : '',
      }

      if($('#fechaProcedimientoEjecutado').val() == "1900-01-01" || $('#fechaProcedimientoEjecutado').val() == "" ){
        var fechaProcedimientoEjec = "";
      }else{
        var fechaProcedimientoEjec = $('#fechaProcedimientoEjecutado').val()
      }

      if($('#fechaProcedimientoEjecutado').val() == "1900-01-01" || $('#fechaProcedimientoEjecutado').val() == "" ){
        var fechaProcedimientoEjec = "";
      }else{
        var fechaProcedimientoEjec = $('#fechaProcedimientoEjecutado').val()
      }
        var data = {
         fechaProcedimientoUsuario : fechaProcedimientoEjec,
         procedimiento : procedimiento,
         usuario : usuario,
         inicio: calculaInicio(numeroPagina, tamanhoPaginaProcedimientosEjecutados),
         tamanhoPagina: tamanhoPaginaProcedimientosEjecutados
        }
    }

    if(accion == "buscarPaginacion"){
      if(getCookie('procedimiento') == null || getCookie('procedimiento') == ""){
        var nombreProc = "";
      }else{
        var nombreProc = getCookie('procedimiento');
      }

      if(getCookie('user') == null || getCookie('user') == ""){
        var user = "";
      }else{
        var user = getCookie('user');
      }

      if(getCookie('fechaProcedimientoUsuario') == null || getCookie('fechaProcedimientoUsuario') == "null" || getCookie('fechaProcedimientoUsuario') == "" ){
        var fechaP= "";
        var fechaString = "";
      }else{
        var fechaP = getCookie('fechaProcedimientoUsuario');
        var fechaString = convierteFecha(fechaP);
      }


     var procedimiento = {
        idProcedimiento: '',
        nombreProcedimiento : nombreProc,
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

      var usuario = {
        dniUsuario : '',
        usuario : user,
        passwdUsuario : '',
        borradoUsuario : '',
      }
        var data = {
         fechaProcedimientoUsuario : fechaP,
         procedimiento : procedimiento,
         usuario : usuario,
         inicio: calculaInicio(numeroPagina, tamanhoPaginaProcedimientosEjecutados),
         tamanhoPagina: tamanhoPaginaProcedimientosEjecutados
        }
    }

    $.ajax({
      method: "POST",
      url: urlPeticionAjaxListarProcedimientoUsuario,
      contentType : "application/json",
      data: JSON.stringify(data),  
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

/** Función que visualiza una empresa **/
async function detalleProcedimientoEjecutado(){
  await detalleProcedimientoEjecutadoAjaxPromesa()
  .then((res) => {
    $("#form-modal").modal('toggle');

    let idElementoList = ["nombreProcedimiento", "loginUsuario", "fechaProcedimientoEjecutado", "estadoProcedimientoEjecutado", "puntuacionProcedimientoEjecutado"];
    resetearFormulario("formularioGenerico", idElementoList);
    setLang(getCookie('lang'));
    $('#nombreProcedimiento').val(getCookie('procedimiento'));
    $('#loginUsuario').val(getCookie('user'));
    $('#fechaProcedimientoEjecutado').val(getCookie('fechaProcedimientoUsuario'));
    setLang(getCookie('lang'));

  }).catch((res) => {
      $("#form-modal").modal('toggle');

      respuestaAjaxKO(res.code);

     let idElementoList = ["nombreProcedimiento", "loginUsuario", "fechaProcedimientoEjecutado", "estadoProcedimientoEjecutado", "puntuacionProcedimientoEjecutado"];
     resetearFormulario("formularioGenerico", idElementoList);
      
      setLang(getCookie('lang'));

      document.getElementById("modal").style.display = "block";
  });
}

/** Función que edita una empresa **/
async function editProcedimientoEjecutado(){
  await editarProcedimientoEjecutadoAjaxPromesa()
  .then((res) => {
    $("#form-modal").modal('toggle');

    respuestaAjaxOK("PROCEDIMIENTO_EJECUTADO_EDITADO_OK", res.code);

    let idElementoList = ["nombreProcedimiento", "loginUsuario", "fechaProcedimientoEjecutado", "estadoProcedimientoEjecutado", "puntuacionProcedimientoEjecutado"];
    resetearFormulario("formularioGenerico", idElementoList);
    document.getElementById("modal").style.display = "block";
    setLang(getCookie('lang'));
    buscarProcedimientoEjecutado(getCookie('numeroPagina'), tamanhoPaginaProcedimientosEjecutados, 'buscarPaginacion', 'PaginadorCreado');

  }).catch((res) => {
    $("#form-modal").modal('toggle');

     respuestaAjaxKO(res.code);

     let campos = ["nombreProcedimiento", "loginUsuario", "fechaProcedimientoEjecutado", "estadoProcedimientoEjecutado", "puntuacionProcedimientoEjecutado"];
    resetearFormulario("formularioGenerico", idElementoList);

     setLang(getCookie('lang'));

     document.getElementById("modal").style.display = "block";


  });
}

/** Función para rellenar los campos del formulario **/
function rellenarFormulario(nombreProcedimiento, usuario, fechaProcedimientoEjecutado, estadoProcedimientoEjecutado, puntuacionProcedimientoUsuario){
  $('#nombreProcedimiento').val(nombreProcedimiento);
  $('#loginUsuario').val(usuario);
  var fecha = fechaProcedimientoEjecutado.split('-');
  var fech = fecha[2] + "-" + fecha[1] + "-" + fecha[0]; 
  $('#fechaProcedimientoEjecutado').val(fech);
  $('#estadoProcedimientoEjecutado').val(estadoProcedimientoEjecutado);
  $('#puntuacionProcedimientoEjecutado').val(puntuacionProcedimientoUsuario);
  setLang(getCookie('lang'));
}

/**Función para cambiar onBlur de los campos*/
function cambiarOnBlurCampos(onBlurNombreProcedimientoEjecutado, onBlurLoginUsuario, onBlurFechaProcedimientoEjecutado, onBlurPuntuacionProcedimientoEjecutado) {
    
    if (onBlurNombreProcedimientoEjecutado != ''){
        $("#nombreProcedimiento").attr('onblur', onBlurNombreProcedimientoEjecutado);
    }

    if (onBlurLoginUsuario != ''){
        $("#loginUsuario").attr('onblur', onBlurLoginUsuario);
    }

     if (onBlurFechaProcedimientoEjecutado != ''){
        $("#fechaProcedimientoEjecutado").attr('onblur', onBlurFechaProcedimientoEjecutado);
    }

    if (onBlurPuntuacionProcedimientoEjecutado != ''){
        $("#puntuacionProcedimientoEjecutado").attr('onblur', onBlurPuntuacionProcedimientoEjecutado);
    }
}

$(document).ready(function() {
  $("#form-modal").on('hidden.bs.modal', function() {

    let idElementoErrorList = ["errorFormatoNombreProcedimiento", "errorFormatoLoginUsuario", "errorFormatoFechaProcedimientoEjecutado", "errorFormatoEstadoProcedimientoEjecutado", "errorFormatoPuntuacionProcedimientoEjecutado"];

    let idElementoList = ["nombreProcedimiento", "loginUsuario", "fechaProcedimientoEjecutado", "estadoProcedimientoEjecutado", "puntuacionProcedimientoEjecutado"];

    limpiarFormulario(idElementoList);
    eliminarMensajesValidacionError(idElementoErrorList, idElementoList);
    setLang(getCookie('lang'));

    resetearFormulario("formularioGenerico", idElementoList);

  });

}); 


