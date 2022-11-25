function iniciarProcedimientoUsuario(idProcedimiento, idProcedimientoUsuario){
  var selectorIniciarProc = $('#' + idProcedimientoUsuario + ' #iniciarProcedimiento #iconoIniciarProcedimiento');

  $(selectorIniciarProc).attr('src', 'images/iniciarProcedimiento2.png');
  $(selectorIniciarProc).attr('onclick', '');

  setCookie('idProcedimiento', idProcedimiento)
  setCookie('idProcedimientoUsuario', idProcedimientoUsuario)
	window.location.href = "GestionDeProcesos.html?continuar=no&ver=no";

}

function continuarProcedimiento(idProcedimiento, idProcedimientoUsuario){
   setCookie('idProcedimiento', idProcedimiento)
   setCookie('idProcedimientoUsuario', idProcedimientoUsuario);
   window.location.href = "GestionDeProcesos.html?continuar=si&ver=no";
}

function verProcedimiento(idProcedimiento, idProcedimientoUsuario){
   setCookie('idProcedimiento', idProcedimiento)
   setCookie('idProcedimientoUsuario', idProcedimientoUsuario);
   window.location.href = "GestionDeProcesos.html?continuar=si&ver=si";
}

function finalizarProcedimiento(idProcedimientoUsuario){

   var selectorIniciarProc = $('#' + idProcedimientoUsuario + ' #iniciarProcedimiento #iconoIniciarProcedimiento');
   var selectorContinuarProc = $('#' + idProcedimientoUsuario + ' #continuarProcedimiento #iconoContinuarProcedimiento');
   var selectorFinProc = $('#' + idProcedimientoUsuario + ' #finalizadoProcedimiento #iconoFinalizarProcedimiento');

   $(selectorIniciarProc).attr('src', 'images/iniciarProcedimiento2.png');
   $(selectorIniciarProc).attr('onclick', '');
   $(selectorContinuarProc).attr('src', 'images/continuarProcedimiento2.png');
   $(selectorContinuarProc).attr('onclick', '');
   $(selectorFinProc).attr('src', 'images/procedimientoFinalizado2.png');
}

/** Funcion que refresca los datos de la tabla **/
async function refrescarTabla(numeroPagina, tamanhoPagina, paginadorCreado){
  if(getCookie('rolUsuario') == "usuario"){
    try{
          const res = await cargarMisProcedimientosAjaxPromesa(numeroPagina, tamanhoPagina);
          document.getElementById('misProcedimientos').style.display = "block";
          var numResults = res.data.numResultados + '';
          var totalResults = res.data.tamanhoTotal + '';
            var inicio = 0;
          if(res.data.listaBusquedas.length == 0){
            inicio = 0;
             $('#itemPaginacion').attr('hidden',true);
          }else{
            inicio = parseInt(res.data.inicio)+1;
              $('#itemPaginacion').attr('hidden',false);
          }
          var textPaginacion = inicio + " - " + (parseInt(res.data.inicio)+parseInt(numResults))  + " total " + totalResults;
       
          $('#procedimientos').html('');
          for (var i = 0; i < res.data.listaBusquedas.length; i++){
            try{
              const result = await cargarProcesosOfProcedimientoUsuario(res.data.listaBusquedas[i].idProcedimientoUsuario);
              cargarMisProcedimientosUsuario(res.data.listaBusquedas[i], result.data);
            }catch(result) {
              respuestaAjaxKO(result.code);
              document.getElementById("modal").style.display = "block";
            }
       
          }

          if(paginadorCreado != 'PaginadorCreado'){
            paginador(totalResults, 'cargarProcedimientosUsuarioEjecutados', 'PROCEDIMIENTOSUSUARIO');
          }
        
        if(numeroPagina == 0){
          $('#itemPaginacion #' + (numeroPagina+1)).addClass("active");
        }else{
          $('#itemPaginacion #' + numeroPagina).addClass("active");
        }

        setLang(getCookie('lang'));


        }catch(res) {
            respuestaAjaxKO(res.code);
            document.getElementById("modal").style.display = "block";
        };
    
    }
}

/* Función para obtener los procedimientos de un usuario del sistema*/
async function cargarProcedimientosUsuarioEjecutados(numeroPagina, tamanhoPagina, paginadorCreado){
  if(getCookie('rolUsuario') == "usuario"){
    try{
          const res = await cargarMisProcedimientosAjaxPromesa(numeroPagina, tamanhoPagina);
          document.getElementById('misProcedimientos').style.display = "block";
          var numResults = res.data.numResultados + '';
          var totalResults = res.data.tamanhoTotal + '';
            var inicio = 0;
          if(res.data.listaBusquedas.length == 0){
            inicio = 0;
             $('#itemPaginacion').attr('hidden',true);
          }else{
            inicio = parseInt(res.data.inicio)+1;
              $('#itemPaginacion').attr('hidden',false);
          }
          var textPaginacion = inicio + " - " + (parseInt(res.data.inicio)+parseInt(numResults))  + " total " + totalResults;
       
          $('#procedimientos').html('');
          for (var i = 0; i < res.data.listaBusquedas.length; i++){
            try{
              const result = await cargarProcesosOfProcedimientoUsuario(res.data.listaBusquedas[i].idProcedimientoUsuario);
          	  cargarMisProcedimientosUsuario(res.data.listaBusquedas[i], result.data);
            }catch(result) {
              respuestaAjaxKO(result.code);
              document.getElementById("modal").style.display = "block";
            }
       
          }

          if(paginadorCreado != 'PaginadorCreado'){
            paginador(totalResults, 'cargarProcedimientosUsuarioEjecutados', 'PROCEDIMIENTOSUSUARIO');
        	}
        
        if(numeroPagina == 0){
          $('#itemPaginacion #' + (numeroPagina+1)).addClass("active");
        }else{
          $('#itemPaginacion #' + numeroPagina).addClass("active");
        }

        setLang(getCookie('lang'));


        }catch(res) {
            respuestaAjaxKO(res.code);
            document.getElementById("modal").style.display = "block";
        };
    
  	}
}


/** Función para obtener los procedimientos de un usuario con ajax y promesas**/
function cargarMisProcedimientosAjaxPromesa(numeroPagina, tamanhoPagina){
  return new Promise(function(resolve, reject) {
    var token = getCookie('tokenUsuario');

    var procedimiento = null;
    var usuario = {
    	dniUsuario : '',
    	usuario : getCookie('usuario'),
    	passwdUsuario : '',
    	borradoUsuario : 0
    }

    var data = {
    	puntuacionProcedimientoUsuario : '',
    	fechaProcedimientoUsuario : '',
    	usuario: usuario,
    	procedimiento : procedimiento,
    	inicio: calculaInicio(numeroPagina, tamanhoPaginaProcedimientoUsuario),
    	tamanhoPagina : tamanhoPaginaProcedimientoUsuario
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

/** Función para eliminar un procedimiento usuario */
function eliminarProcedimientoAjaxPromesa(idProcedimientoUsuario){
   return new Promise(function(resolve, reject) {
    var token = getCookie('tokenUsuario');

    var procedimientoUsuario = {
      idProcedimientoUsuario : idProcedimientoUsuario,
      puntuacionProcedimientoUsuario : '',
      fechaProcedimientoUsuario : '',
      borradoProcedimientoUsuario : 1
    }

    $.ajax({
      method: "POST",
      url: urlPeticionAjaxEliminarProcedimientoUsuario,
      contentType : "application/json",
      data: JSON.stringify(procedimientoUsuario),  
      dataType : 'json',
      headers: {'Authorization': token},
      }).done(res => {
        if (res.code != 'PROCEDIMIENTO_USUARIO_ELIMINADO') {
          reject(res);
        }
        resolve(res);
      }).fail( function( jqXHR ) {
        errorFailAjax(jqXHR.status);
      });
  });
}

async function eliminarProcedimiento(idProcedimientoUsuario){
   await eliminarProcedimientoAjaxPromesa(idProcedimientoUsuario)
    .then((res) => {
     
      respuestaAjaxOK("PROCEDIMIENTO_ELIMINADO_OK", res.code);

      setLang(getCookie('lang'));
      document.getElementById("modal").style.display = "block";
   
      cargarProcedimientosUsuarioEjecutados(0, tamanhoPaginaProcedimientoUsuario, 'PaginadorNo');

      }).catch((res) => {
          respuestaAjaxKO(res.code);
          document.getElementById("modal").style.display = "block";
      });
  
}

/** Función para obtener el número de procesos asociados al procedimiento **/
function cargarNumeroProcesosProcedimientos(idProcedimiento, idProceso){
	return new Promise(function(resolve, reject) {
    var token = getCookie('tokenUsuario');

   	var data = {
   		idProceso : idProceso,
   		idProcedimiento : idProcedimiento
   	}

  	$.ajax({
      method: "POST",
      url: urlPeticionAjaxListadoProcesosProcedimiento,
      contentType : "application/json",
      data: JSON.stringify(data),  
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


function showPlan(nombrePlan, descripPlan){

    $('#tituloFormsModalMostrarPlan').addClass('DETAIL_PLAN');
    $('#iconoAccionesMostrarPlan').attr('src', 'images/close2.png');
    $('#iconoAccionesMostrarPlan').removeClass();
    $('#iconoAccionesMostrarPlan').addClass('ICONO_DETALLE');
    $('#iconoAccionesMostrarPlan').addClass('iconoCerrar');
    $('#iconoAccionesMostrarPlan').attr('alt', 'Editar');
    $('#spanAccionesMostrarPlan').removeClass();
    $('#spanAccionesMostrarPlan').addClass('tooltiptext');
    $('#spanAccionesMostrarPlan').addClass('ICONO_DETALLE');
    $('#btnAccionesMostrarPlan').attr('value', 'Detalle');

    $('#labelNombrePlanMostrarPlan').attr('hidden', false);
    $('#labelDescripcionPlanMostrarPlan').attr('hidden', false);
    $('#nombrePlan').val(nombrePlan);
    $('#descripcionPlanMostrarPlan').val(descripPlan);

    deshabilitaCampos(['nombrePlan', 'descripcionPlanMostrarPlan']);
    anadirReadonly(['nombrePlan', 'descripcionPlanMostrarPlan']);
   
    setLang(getCookie('lang'));
}

/** Función para construir la pantalla de procedimientos - usuario **/
async function cargarMisProcedimientosUsuario(procedimientosUsuario, procesosProcedimientoUsuario){
	var procedimientoUsuario = "";
	await cargarNumeroProcesosProcedimientos(procedimientosUsuario.procedimiento.idProcedimiento, '')
		.then((res) =>{
				var atributosFunciones = ["'" + procedimientosUsuario.procedimiento.plan.nombrePlan + "'", "'" + procedimientosUsuario.procedimiento.plan.descripPlan + "'"]; 
				if(res.data.listaBusquedas.length == 0){
					numeroProcesos = 0;
				}else{
					numeroProcesos = res.data.tamanhoTotal;
				}

        var numeroProcesosEjecutados = procesosProcedimientoUsuario.procesos.length;

				var fechaProcedimientoUsuario = new Date(procedimientosUsuario.fechaProcedimientoUsuario);
				var fecha = convertirFecha(fechaProcedimientoUsuario.toString());
				procedimientoUsuario = '<div class="col-md-12 col-lg-12 col-xl-12 mb-12 paddingTop">' + 
								'<div id=' + procedimientosUsuario.idProcedimientoUsuario + ' class="card">' + 
									'<div class="card-body-plan">' + 
										'<div class="card-title">' + procedimientosUsuario.procedimiento.nombreProcedimiento + '</div>' + 
										'<div class="card-text">' + procedimientosUsuario.procedimiento.descripProcedimiento + '</div>' +
										'<div class="procesos">' + numeroProcesosEjecutados + '/' + numeroProcesos + '</div>' + 
										'<div class="puntuacion">Puntuación: ' + procedimientosUsuario.puntuacionProcedimientoUsuario +'%</div>' +
										'<div class="fecha">' + fecha + '</div>';

                    if(numeroProcesosEjecutados == 0){

                      var iconos = '<div id="iniciarProcedimiento" class="tooltip10 procedimientoIcon" style="cursor: pointer;">' + 
                                      '<img id="iconoIniciarProcedimiento" class="iconoProcedimiento iconProcedimiento" src="images/iniciarProcedimiento.png" alt="Iniciar procedimiento" onclick=";"/>' + 
                                      '<span class="tooltiptext iconProcedimiento ICON_INICIAR_PROCEDIMIENTO"></span>' + 
                                    '</div>' + 
                                    '<div id="continuarProcedimiento" class="tooltip11 continuarIcon" style="cursor: not-allowed;">' + 
                                          '<img id="iconoContinuarProcedimiento" class="iconoContinuar iconContinuar" src="images/continuarProcedimiento2.png" alt="Continuar procedimiento" onclick="" style="cursor: not-allowed;"/>' + 
                                          '<span class="tooltiptext iconContinuar ICON_CONTINUAR_PROCEDIMIENTO"></span>' + 
                                    '</div>' +
                                    '<div id="finalizadoProcedimiento" class="tooltip12 finalizadoIcon" style="cursor: default;">' + 
                                          '<img id="iconoFinalizarProcedimiento" class="iconoFinalizado iconFinalizado" src="images/procedimientoFinalizado2.png" alt="Procedimiento finalizado" onclick="" style="cursor: default;"/>' + 
                                          '<span class="tooltiptext iconFinalizado ICON_PROCEDIMIENTO_FINALIZADO"></span>' + 
                                    '</div>' + 
                                    '<div id="eliminarProcedimiento" class="tooltip14 procedimientoIcon" style="cursor: pointer;">' + 
                                      '<img id="iconoEliminarProcedimiento" class="iconoProcedimiento iconEliminarProcedimiento" src="images/delete3.png" alt="Eliminar procedimiento" onclick="eliminarProcedimiento('+ procedimientosUsuario.idProcedimientoUsuario +');"/>' + 
                                      '<span class="tooltiptext iconProcedimiento ICONO_ELIMINAR"></span>' + 
                                    '</div>' + 
                                     '<div id="verProcedimiento" class="tooltip14 procedimientoIcon" style="cursor: pointer;">' + 
                                      '<img id="iconoverProcedimiento" class="iconoProcedimiento iconVerProcedimiento" src="images/detail3.png" alt="Ver procedimiento" onclick="verProcedimiento('+ procedimientosUsuario.idProcedimientoUsuario +');"/>' + 
                                      '<span class="tooltiptext iconProcedimiento ICONO_ELIMINAR"></span>' + 
                                    '</div>' + 
                                  '</div>';
                    
                    }else if(numeroProcesosEjecutados > 0 && numeroProcesosEjecutados < numeroProcesos){
                      var arrayProcesos = [];

                      for(var i = 0; i<procesosProcedimientoUsuario.procesos.length; i++){
                        arrayProcesos.push(procesosProcedimientoUsuario.procesos);
                      }

                       var iconos = '<div id="iniciarProcedimiento" class="tooltip10 procedimientoIcon" style="cursor: not-allowed;">' + 
                                      '<img id="iconoIniciarProcedimiento" class="iconoProcedimiento iconProcedimiento" src="images/iniciarProcedimiento2.png" alt="Iniciar procedimiento" onclick=";" style="cursor: not-allowed;"/>' + 
                                      '<span class="tooltiptext ICON_INICIAR_PROCEDIMIENTO"></span>' + 
                                    '</div>' + 
                                    '<div id="continuarProcedimiento" class="tooltip11 continuarIcon" style="cursor: pointer;">' + 
                                          '<img id="iconoContinuarProcedimiento" class="iconoContinuar iconContinuar" src="images/continuarProcedimiento.png" alt="Continuar procedimiento" onclick="continuarProcedimiento(' + procedimientosUsuario.procedimiento.idProcedimiento + ',' + procedimientosUsuario.idProcedimientoUsuario + ')"/>' + 
                                          '<span class="tooltiptext ICON_CONTINUAR_PROCEDIMIENTO"></span>' + 
                                    '</div>' +
                                    '<div id="finalizadoProcedimiento" class="tooltip12 finalizadoIcon" style="cursor: default;">' + 
                                          '<img id="iconoFinalizarProcedimiento" class="iconoFinalizado iconFinalizado" src="images/procedimientoFinalizado2.png" alt="Procedimiento finalizado" onclick="" style="cursor: default;"/>' + 
                                          '<span class="tooltiptext ICON_PROCEDIMIENTO_FINALIZADO"></span>' + 
                                    '</div>' + 
                                    '<div id="eliminarProcedimiento" class="tooltip14 procedimientoIcon" style="cursor: not-allowed;">' + 
                                      '<img id="iconoEliminarProcedimiento" class="iconoProcedimiento iconEliminarProcedimiento" src="images/delete.png" alt="Eliminar procedimiento" onclick="eliminarProcedimiento('+ procedimientosUsuario.idProcedimientoUsuario +');" style="cursor: not-allowed;"/>' + 
                                      '<span class="tooltiptext ICONO_ELIMINAR"></span>' + 
                                    '</div>' + 
                                       '<div id="verProcedimiento" class="tooltip14 procedimientoIcon" style="cursor: pointer;">' + 
                                      '<img id="iconoverProcedimiento" class="iconoProcedimiento iconVerProcedimiento" src="images/detail3.png" alt="Ver procedimiento" onclick="verProcedimiento('+ procedimientosUsuario.procedimiento.idProcedimiento + ',' + procedimientosUsuario.idProcedimientoUsuario + ');"/>' + 
                                      '<span class="tooltiptext ICONO_DETALLE"></span>' + 
                                    '</div>' +
                                  '</div>';

                    }else{
                       var iconos = '<div id="iniciarProcedimiento" class="tooltip10 procedimientoIcon" style="cursor: not-allowed;">' + 
                                      '<img id="iconoIniciarProcedimiento" class="iconoProcedimiento iconProcedimiento" src="images/iniciarProcedimiento2.png" alt="Iniciar procedimiento" onclick=";" style="cursor: not-allowed;"/>' + 
                                      '<span class="tooltiptext ICON_INICIAR_PROCEDIMIENTO"></span>' + 
                                    '</div>' + 
                                    '<div id="continuarProcedimiento" class="tooltip11 continuarIcon" style="cursor: not-allowed;">' + 
                                          '<img id="iconoContinuarProcedimiento" class="iconoContinuar iconContinuar" src="images/continuarProcedimiento2.png" alt="Continuar procedimiento" onclick="" style="cursor: not-allowed;"/>' + 
                                          '<span class="tooltiptext ICON_CONTINUAR_PROCEDIMIENTO"></span>' + 
                                    '</div>' +
                                    '<div id="finalizadoProcedimiento" class="tooltip12 finalizadoIcon" style="cursor: default;">' + 
                                          '<img id="iconoFinalizarProcedimiento" class="iconoFinalizado iconFinalizado" src="images/procedimientoFinalizado.png" alt="Procedimiento finalizado" onclick="" style="cursor: default;"/>' + 
                                          '<span class="tooltiptext ICON_PROCEDIMIENTO_FINALIZADO"></span>' + 
                                    '</div>' + 
                                    '<div id="eliminarProcedimiento" class="tooltip14 procedimientoIcon" style="cursor: not-allowed;">' + 
                                      '<img id="iconoEliminarProcedimiento" class="iconoProcedimiento iconEliminarProcedimiento" src="images/delete.png" alt="Eliminar procedimiento" onclick="eliminarProcedimiento('+ procedimientosUsuario.idProcedimientoUsuario +');" style="cursor: not-allowed;"/>' + 
                                      '<span class="tooltiptext ICONO_ELIMINAR"></span>' + 
                                    '</div>' +
                                       '<div id="verProcedimiento" class="tooltip14 procedimientoIcon" style="cursor: pointer;">' + 
                                      '<img id="iconoverProcedimiento" class="iconoProcedimiento iconVerProcedimiento" src="images/detail3.png" alt="Ver procedimiento" onclick="verProcedimiento('+ procedimientosUsuario.procedimiento.idProcedimiento + ',' + procedimientosUsuario.idProcedimientoUsuario + ');"/>' + 
                                      '<span class="tooltiptext ICONO_DETALLE"></span>' + 
                                    '</div>' + 
                                  '</div>';
                    }

                    procedimientoUsuario += iconos;
										 
	              var procedimientoUsuario2 =   '<div class="card-footer">' + 
                          	                    '<div class="tooltip8 planIcon">' + 
                          	                    		'<img class="iconoPlan iconPlan" src="images/plan.png" alt="Plan" data-toggle="modal" data-target="#modalMostrarPlan" onclick="showPlan(' + atributosFunciones + ')"/>' + 
                          	                    		'<span class="tooltiptext iconPlan ICON_PLAN"></span>' + 
                          	                    '</div>' + 
                          	                    '<div class="card-title-plan">Plan: ' + procedimientosUsuario.procedimiento.plan.nombrePlan  + '</div>' ;
                          	               '</div>' + 
                                          '</div>' + 
                                        '</div>';

            procedimientoUsuario += procedimientoUsuario2;

         $('#procedimientos').append(procedimientoUsuario);

         if(numeroProcesosEjecutados == 0){
             var selectorIniciarProc = $('#' + procedimientosUsuario.idProcedimientoUsuario + ' #iniciarProcedimiento #iconoIniciarProcedimiento');

              $(selectorIniciarProc).attr('onclick', 'iniciarProcedimientoUsuario('+ procedimientosUsuario.procedimiento.idProcedimiento + ', '+ procedimientosUsuario.idProcedimientoUsuario+')');
         }
         setLang(getCookie('lang'));
         
		}).catch((res) => {
          respuestaAjaxKO(res.code);
          document.getElementById("modal").style.display = "block";
      });
}

/** Funcion para buscar un procedimiento ejecutado **/
function showBuscar() {
  var idioma = getCookie('lang');

  cambiarFormulario('SEARCH_PROCEDIMIENTO_EJECUTADO', 'javascript:buscarProcedimientoEjecutado(0,' + tamanhoPaginaProcedimiento + ', \'buscarModal\'' + ',\'PaginadorNo\');', 'return comprobarBuscarProcedimientoUsuario();');
  cambiarOnBlurCampos('return comprobarNombreProcedimientoSearch(\'nombreProcedimiento\', \'errorFormatoNombreProcedimiento\', \'nombreProcedimiento\')', 
      'return comprobarDescripcionProcedimientoSearch(\'descripProcedimiento\', \'errorFormatoDescripcionProcedimiento\', \'descripProcedimiento\')');
  cambiarIcono('images/search.png', 'ICONO_SEARCH', 'iconoSearchProcedimientoEjecutado', 'Buscar');
  setLang(idioma);

  $('#labelNombreProcedimiento').attr('hidden', true);
  $('#labelDescripcionProcedimiento').attr('hidden', true);
 
  let idElementoList = ["nombreProcedimiento", "descripProcedimiento"];
  let obligatorios = ["obligatorioNombreProcedimiento", "obligatorioDescripcionProcedimiento"];
  
  eliminarReadonly(idElementoList);
  ocultarObligatorios(obligatorios);
  habilitaCampos(idElementoList);

}

/** Funcion buscar proceso **/
async function buscarProcedimientoEjecutado(numeroPagina, tamanhoPagina, accion, paginadorCreado){
    try {
        if($('#form-modal').is(':visible')) {
          $("#form-modal").modal('toggle');
        };
      const res = await buscarProcedimientoEjecutadoAjaxPromesa(numeroPagina, tamanhoPagina, accion);
      guardarParametrosBusqueda(res.data.datosBusqueda);
    
      document.getElementById('misProcedimientos').style.display = "block";
          var numResults = res.data.numResultados + '';
          var totalResults = res.data.tamanhoTotal + '';
            var inicio = 0;
          if(res.data.listaBusquedas.length == 0){
            inicio = 0;
             $('#itemPaginacion').attr('hidden',true);
          }else{
            inicio = parseInt(res.data.inicio)+1;
              $('#itemPaginacion').attr('hidden',false);
          }
          var textPaginacion = inicio + " - " + (parseInt(res.data.inicio)+parseInt(numResults))  + " total " + totalResults;
       
          $('#procedimientos').html('');
          for (var i = 0; i < res.data.listaBusquedas.length; i++){
            try{
              const result = await cargarProcesosOfProcedimientoUsuario(res.data.listaBusquedas[i].idProcedimientoUsuario);
              cargarMisProcedimientosUsuario(res.data.listaBusquedas[i], result.data);
            }catch(result) {
              respuestaAjaxKO(result.code);
              document.getElementById("modal").style.display = "block";
            }
       
          }

          if(paginadorCreado != 'PaginadorCreado'){
            paginador(totalResults, 'cargarProcedimientosUsuarioEjecutados', 'PROCEDIMIENTOSUSUARIO');
          }
        
        if(numeroPagina == 0){
          $('#itemPaginacion #' + (numeroPagina+1)).addClass("active");
        }else{
          $('#itemPaginacion #' + numeroPagina).addClass("active");
        }

        setLang(getCookie('lang'));


        }catch(res) {
            respuestaAjaxKO(res.code);
            document.getElementById("modal").style.display = "block";
        };
}

/**Función para recuperar un procedimientoEjecutado en base a parámetros con ajax y promesas*/
function buscarProcedimientoEjecutadoAjaxPromesa(numeroPagina, tamanhoPagina, accion){
  return new Promise(function(resolve, reject) {
    var token = getCookie('tokenUsuario');

    if(accion == "buscarModal"){

       var procedimiento = {
        idProcedimiento: '',
        nombreProcedimiento : $('#nombreProcedimiento').val(),
        descripProcedimiento : $('#descripProcedimiento').val(),
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
        usuario : getCookie('usuario'),
        passwdUsuario : '',
        borradoUsuario : '',
      }

        var data = {
         fechaProcedimientoUsuario : '',
         procedimiento : procedimiento,
         usuario : usuario,
         inicio: calculaInicio(numeroPagina, tamanhoPaginaProcedimientoUsuario),
         tamanhoPagina: tamanhoPaginaProcedimientoUsuario
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


/**Función para cambiar onBlur de los campos*/
function cambiarOnBlurCampos(onBlurNombreProcedimiento, onBlurDescripProcedimiento) {

    if (onBlurNombreProcedimiento != ''){
        $("#nombreProcedimiento").attr('onblur', onBlurNombreProcedimiento);
    }

    if (onBlurDescripProcedimiento != ''){
        $("#descripProcedimiento").attr('onblur', onBlurDescripProcedimiento);
    }

   
}

