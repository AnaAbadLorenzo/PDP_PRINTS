function iniciarProcesoUsuario(idProcesoUsuario){
  var selectorIniciarProc = $('#' + idProcesoUsuario + ' #iniciarProceso #iconoIniciarProceso');

  $(selectorIniciarProc).attr('src', 'images/iniciarProcedimiento2.png');
  $(selectorIniciarProc).attr('onclick', '');
  construyeProcesoUsuarioInicio(idProcesoUsuario);
  cambiarFormularioProcesoUsuario('javascript:addProcesoUsuarioParametro(' + idProcesoUsuario+ ');', '');
  cambiarIconoProcesoUsuario('images/add.png', 'ICONO_ADD', 'iconoAddPersona', 'Añadir');
}

async function addProcesoUsuarioParametro(idProcesoUsuario){
  var inputs = $('input[type=number]');
  var code = '';
  for(var i = 0; i<inputs.length; i++){
    var idElemento = inputs[i].id;
    var valor = inputs[i].value;
    if(valor != ""){
      try{
        const res = await addProcesoUsuarioParametroAjaxPromesa(idProcesoUsuario, idElemento, valor);
        code = res.code;
      }catch(res){
        $("#modalMostrarProcesoUsuario").modal('toggle');
        respuestaAjaxKO(res.code);
        setLang(getCookie('lang'));
        document.getElementById("modal").style.display = "block";
      }
    }
  }
  $("#modalMostrarProcesoUsuario").modal('toggle');
  try{
    const resultado = await refrescarTabla(0, tamanhoPaginaProcesosUsuario, 'PaginadorNo');
    respuestaAjaxOK("PROCESO_USUARIO_PARAMETRO_GUARDADO_OK", code);
    document.getElementById("modal").style.display = "block";
    setLang(getCookie('lang'));
  }catch(resultado){};
}

function addProcesoUsuarioParametroAjaxPromesa(idProcesoUsuario, id, valor){
  return new Promise(function(resolve, reject) {
    var token = getCookie('tokenUsuario');

    var data = {
      controlador: 'GestionProcesosUsuarioParametro',
      action: 'add',
      id_proceso_usuario : idProcesoUsuario,
      id_parametro: id,
      valor_parametro: valor
    }

  	$.ajax({
      method: "POST",
      url: urlPeticionAjaxAddProcedimientoUsuarioParametro,
      contentType : "application/x-www-form-urlencoded; charset=UTF-8",
      data: data,  
      headers: {'Authorization': token},
      }).done(res => {
        if (res.code != 'PROCESO_USUARIO_PARAMETRO_CREADO') {
          reject(res);
        }
        resolve(res);
      }).fail( function( jqXHR ) {
        errorFailAjax(jqXHR.status);
      });
  });
}

async function continuarProceso(idProceso, idProcesoUsuario){
  try{
    const res = await cargarParametrosOfProcesoUsuario(idProcesoUsuario);
    var parametrosValor = res.resource;

    try{
      const result = await cargarNumeroParametrosProcesoAjaxPromesa(idProceso, 0, 99999999);
      var parametros = result.resource.listaBusquedas;
      var arrayPintados = [];
      $('#formularioModalMostrarProcesoUsuario').html('');
      for(var j = 0; j<parametros.length; j++){
        for(var i = 0; i<parametrosValor.length; i++){
          if(parametros[j]['parametro']['id_parametro'] == parametrosValor[i]['id_parametro']){
            arrayPintados.push(parametros[j]['parametro']['id_parametro']);
            var tr = construyeProcesoUsuarioContinuar(parametrosValor[i]['valor_parametro'], parametros[j]['parametro']['parametro_formula'], parametros[j]['parametro']['descripcion_parametro'], parametros[j]['parametro']['id_parametro'],'No');
            $('#formularioModalMostrarProcesoUsuario').append(tr);
          }
        }
        for(var z= 0 ; z<arrayPintados.length; z++){
            if(arrayPintados[z] != parametros[j]['parametro']['id_parametro']){
              var pintar = true;
            }else{
              var pintar = false;
            }
          }
          if(pintar){
            var tr = construyeProcesoUsuarioContinuar('', parametros[j]['parametro']['parametro_formula'], parametros[j]['parametro']['descripcion_parametro'], parametros[j]['parametro']['id_parametro'], 'No');
            $('#formularioModalMostrarProcesoUsuario').append(tr);
          }
      }
      formularioFin = '<button type="submit" name="btnAccionesMostrarProcesoUsuario" value="" class="tooltip6" id="btnAccionesMostrarProcesoUsuario">' +
      '<img class="" src="" alt="" id="iconoAccionesMostrarProcesoUsuario" />' +
      '<span class="tooltiptext" id="spanAccionesMostrarProcesoUsuario"></span>' +
      '</button>' +
      '</form>' +
      '</div></div></div></div></div></div>';
      $('#formularioModalMostrarProcesoUsuario').append(formularioFin);     

      cambiarFormularioProcesoUsuario('javascript:editProcesoUsuarioParametro('+ idProcesoUsuario +');', '');
      cambiarIconoProcesoUsuario('images/edit.png', 'ICONO_EDIT', 'iconoEditarRol', 'Editar');
    
    }catch(result) {
      respuestaAjaxKO(res.code);
      document.getElementById("modal").style.display = "block";
    };

  }catch(res) {
    respuestaAjaxKO(res.code);
    document.getElementById("modal").style.display = "block";
  };  
}

async function editProcesoUsuarioParametro(idProcesoUsuario){
  var inputs = $('input[type=number]');
  var code = '';
  for(var i = 0; i<inputs.length; i++){
    var idElemento = inputs[i].id;
    var valor = inputs[i].value;
    if(valor != ""){
      try{
        const res = await editProcesoUsuarioParametroAjaxPromesa(idProcesoUsuario, idElemento, valor);
        code = res.code;
      }catch(res){
        $("#modalMostrarProcesoUsuario").modal('toggle');
        respuestaAjaxKO(res.code);
        setLang(getCookie('lang'));
        document.getElementById("modal").style.display = "block";
      }
    }
  }
  $("#modalMostrarProcesoUsuario").modal('toggle');
  try{
    const resultado = await refrescarTabla(0, tamanhoPaginaProcesosUsuario, 'PaginadorNo');
    respuestaAjaxOK("PROCESO_USUARIO_PARAMETRO_EDITADO_OK", code);
    document.getElementById("modal").style.display = "block";
    setLang(getCookie('lang'));
  }catch(resultado){};
}

function editProcesoUsuarioParametroAjaxPromesa(idProcesoUsuario, id, valor){
  return new Promise(function(resolve, reject) {
    var token = getCookie('tokenUsuario');

    var data = {
      controlador: 'GestionProcesosUsuarioParametro',
      action: 'edit',
      id_proceso_usuario : idProcesoUsuario,
      id_parametro: id,
      valor_parametro: valor
    }

  	$.ajax({
      method: "POST",
      url: urlPeticionAjaxEditProcedimientoUsuarioParametro,
      contentType : "application/x-www-form-urlencoded; charset=UTF-8",
      data: data,  
      headers: {'Authorization': token},
      }).done(res => {
        if (res.code != 'PROCESO_USUARIO_PARAMETRO_EDITADO') {
          reject(res);
        }
        resolve(res);
      }).fail( function( jqXHR ) {
        errorFailAjax(jqXHR.status);
      });
  });
}

async function verProceso(idProceso, idProcesoUsuario){
  try{
    const res = await cargarParametrosOfProcesoUsuario(idProcesoUsuario);
    var parametrosValor = res.resource;

    try{
      const result = await cargarNumeroParametrosProcesoAjaxPromesa(idProceso, 0, 99999999);
      var parametros = result.resource.listaBusquedas;
      var arrayPintados = [];
      $('#formularioModalMostrarProcesoUsuario').html('');
      if(parametrosValor.length != 0) {
        for(var j = 0; j<parametros.length; j++){
          for(var i = 0; i<parametrosValor.length; i++){
            if(parametros[j]['parametro']['id_parametro'] == parametrosValor[i]['id_parametro']){
              arrayPintados.push(parametros[j]['parametro']['id_parametro']);
              var tr = construyeProcesoUsuarioContinuar(parametrosValor[i]['valor_parametro'], parametros[j]['parametro']['parametro_formula'], parametros[j]['parametro']['id_parametro'],'Si');
              $('#formularioModalMostrarProcesoUsuario').append(tr);
            }
          }
          for(var z= 0 ; z<arrayPintados.length; z++){
              if(arrayPintados[z] != parametros[j]['parametro']['id_parametro']){
                var pintar = true;
              }else{
                var pintar = false;
              }
            }
            if(pintar){
              var tr = construyeProcesoUsuarioContinuar('', parametros[j]['parametro']['parametro_formula'], parametros[j]['parametro']['descripcion_parametro'],parametros[j]['parametro']['id_parametro'], 'Si');
              $('#formularioModalMostrarProcesoUsuario').append(tr);
            }
        }
      }else{
        for(var j = 0; j<parametros.length; j++){
          var tr = construyeProcesoUsuarioContinuar('', parametros[j]['parametro']['parametro_formula'],parametros[j]['parametro']['descripcion_parametro'], parametros[j]['parametro']['id_parametro'], 'Si');
                $('#formularioModalMostrarProcesoUsuario').append(tr);
        }
      }
      formularioFin = '<button type="submit" name="btnAccionesMostrarProcesoUsuario" value="" class="tooltip6" id="btnAccionesMostrarProcesoUsuario">' +
      '<img class="" src="" alt="" id="iconoAccionesMostrarProcesoUsuario" />' +
      '<span class="tooltiptext" id="spanAccionesMostrarProcesoUsuario"></span>' +
      '</button>' +
      '</form>' +
      '</div></div></div></div></div></div>';
      $('#formularioModalMostrarProcesoUsuario').append(formularioFin);     

      cambiarFormularioProcesoUsuario('', '');
      cambiarIconoProcesoUsuario('images/close2.png', 'ICONO_DETALLE', 'iconoCerrar', 'Detalle');
    
    }catch(result) {
      respuestaAjaxKO(res.code);
      document.getElementById("modal").style.display = "block";
    };

  }catch(result) {
    respuestaAjaxKO(res.code);
    document.getElementById("modal").style.display = "block";
  };  
  
}

async function finalizarProceso(idProcesoUsuario){
  try{
    const res = await calcularHuellaCarbono(idProcesoUsuario);
    try{
      const resultado = await refrescarTabla(0, tamanhoPaginaProcesosUsuario, 'PaginadorNo');
    }catch(resultado){
      respuestaAjaxKO(resultado.code);
      document.getElementById("modal").style.display = "block";
    }
    
    var selectorIniciarProc = $('#' + idProcesoUsuario + ' #iniciarProceso #iconoIniciarProceso');
    var selectorContinuarProc = $('#' + idProcesoUsuario + ' #continuarProceso #iconoContinuarProceso');
    var selectorFinProc = $('#' + idProcesoUsuario + ' #finalizadoProceso #iconoFinalizarProceso');

    $(selectorIniciarProc).attr('src', 'images/iniciarProcedimiento2.png');
    $(selectorIniciarProc).attr('onclick', '');
    $(selectorContinuarProc).attr('src', 'images/continuarProcedimiento2.png');
    $(selectorContinuarProc).attr('onclick', '');
    $(selectorFinProc).attr('src', 'images/procedimientoFinalizado2.png');

  }catch(res){
    respuestaAjaxKO(res.code);
    document.getElementById("modal").style.display = "block";
  }

}

function calcularHuellaCarbono(idProcesoUsuario){
  return new Promise(function(resolve, reject) {
    var token = getCookie('tokenUsuario');

    var data = {
      controlador: 'GestionProcesosUsuario',
      action: 'calcular',
      id_proceso_usuario : idProcesoUsuario
    }

  	$.ajax({
      method: "POST",
      url: urlPeticionAjaxCalcularHuellaCarbono,
      contentType : "application/x-www-form-urlencoded; charset=UTF-8",
      data: data,  
      headers: {'Authorization': token},
      }).done(res => {
        if (res.code != 'CALCULO_PROCESO_USUARIO_CORRECTO') {
          reject(res);
        }
        resolve(res);
      }).fail( function( jqXHR ) {
        errorFailAjax(jqXHR.status);
      });
  });
}

function construyeProcesoUsuarioInicio(idProcesoUsuario){
  $('#formularioModalMostrarProcesoUsuario').html('');
  listParametros = JSON.parse(getCookie('params'));
  for(var i = 0; i<listParametros.length; i++){
    parametro = '<label class="labelForm" id="'+listParametros[i]['parametro']['parametro_formula'] +'">' +(listParametros[i]['parametro']['parametro_formula']).charAt(0).toUpperCase() + (listParametros[i]['parametro']['parametro_formula']).slice(1)+'</label>' +
                '<input type="number" max="9999999999999999999999999999" name="" id="' + listParametros[i]['parametro']['id_parametro'] +'" class="" onblur="">';
    $('#formularioModalMostrarProcesoUsuario').append(parametro);
  }

  formularioFin = '<button type="submit" name="btnAccionesMostrarProcesoUsuario" value="" class="tooltip6" id="btnAccionesMostrarProcesoUsuario">' +
                    '<img class="" src="" alt="" id="iconoAccionesMostrarProcesoUsuario" />' +
                    '<span class="tooltiptext" id="spanAccionesMostrarProcesoUsuario"></span>' +
                  '</button>' +
                '</form>' +
                '</div></div></div></div></div></div>';
  $('#formularioModalMostrarProcesoUsuario').append(formularioFin);              
}

function construyeProcesoUsuarioContinuar(valor, nombre, descripcion, id, visualizar){
if(valor != ''){
  if(visualizar == 'Si'){
    parametro = '<label class="labelForm" id="label'+nombre+'">' +(nombre).charAt(0).toUpperCase() + (nombre).slice(1)+' (' + descripcion + ')</label>' +
    '<input type="number" max="9999999999999999999999999999" name="' + nombre+'" id="' + id +'" class="" value="'+valor+'" onblur="" disabled>';
  }else{
    parametro = '<label class="labelForm" id="label'+nombre+'">' +(nombre).charAt(0).toUpperCase() + (nombre).slice(1)+'</label>' +
    '<input type="number" max="9999999999999999999999999999" name="' + nombre+'" id="' + id +'" class="" value="'+valor+'" onblur="">';
  }
 
}else{
  if(visualizar == 'Si'){
    parametro = '<label class="labelForm" id="'+nombre+'">' +(nombre).charAt(0).toUpperCase() + (nombre).slice(1)+' (' + descripcion + ')</label>' +
    '<input type="number" max="9999999999999999999999999999" name="' + nombre+'" id="' + id +'" class="" onblur="" disabled>';
  }else{
    parametro = '<label class="labelForm" id="'+nombre+'">' +(nombre).charAt(0).toUpperCase() + (nombre).slice(1)+'</label>' +
    '<input type="number" max="9999999999999999999999999999" name="' + nombre+'" id="' + id +'" class="" onblur="">';
  }
 
}

return parametro;
}


/* Función para obtener los procesos de un usuario del sistema*/
async function refrescarTabla(numeroPagina, tamanhoPagina, paginadorCreado){
  if(getCookie('rolUsuario') == "Usuario"){
    try{
          const res = await cargarMisProcesosAjaxPromesa(numeroPagina, tamanhoPagina);
          document.getElementById('misProcesos').style.display = "block";
          var numResults = res.resource.numResultados + '';
          var totalResults = res.resource.tamanhoTotal + '';
          var inicio = 0;
          if(res.resource.listaBusquedas.length == 0){
            inicio = 0;
            $('#itemPaginacion').attr('hidden',true);
          }else{
            inicio = parseInt(res.resource.inicio)+1;
            $('#itemPaginacion').attr('hidden',false);
          }
          $('#paginacion').html('');
          var textPaginacion = inicio + " - " + (parseInt(res.resource.inicio)+parseInt(numResults))  + " total " + totalResults;
          $('#paginacion').append(textPaginacion);
          document.getElementById('filasTabla').style.display='block';
          $('#procesos').html('');
          for (var i = 0; i < res.resource.listaBusquedas.length; i++){
            try{
              const result = await cargarParametrosOfProcesoUsuario(res.resource.listaBusquedas[i].procesoUsuario.id_proceso_usuario);
          	  cargarMisProcesosUsuario(res.resource.listaBusquedas[i], result.resource);
            }catch(result) {
              respuestaAjaxKO(result.code);
              document.getElementById("modal").style.display = "block";
            }
       
          }

          if(paginadorCreado != 'PaginadorCreado'){
            paginador(totalResults, 'cargarProcesosUsuarioEjecutados', 'PROCESOSUSUARIOEJECUTADOS');
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


/* Función para obtener los procesos de un usuario del sistema*/
async function cargarProcesosUsuarioEjecutados(numeroPagina, tamanhoPagina, paginadorCreado){
  if(getCookie('rolUsuario') == "Usuario"){
    try{
          const res = await cargarMisProcesosAjaxPromesa(numeroPagina, tamanhoPagina);
          document.getElementById('misProcesos').style.display = "block";
          var numResults = res.resource.numResultados + '';
          var totalResults = res.resource.tamanhoTotal + '';
          var inicio = 0;
          if(res.resource.listaBusquedas.length == 0){
            inicio = 0;
            $('#itemPaginacion').attr('hidden',true);
          }else{
            inicio = parseInt(res.resource.inicio)+1;
            $('#itemPaginacion').attr('hidden',false);
          }
          $('#paginacion').html('');
          var textPaginacion = inicio + " - " + (parseInt(res.resource.inicio)+parseInt(numResults))  + " total " + totalResults;
          $('#paginacion').append(textPaginacion);
          document.getElementById('filasTabla').style.display='block';

          $('#procesos').html('');
          for (var i = 0; i < res.resource.listaBusquedas.length; i++){
            try{
              const result = await cargarParametrosOfProcesoUsuario(res.resource.listaBusquedas[i].procesoUsuario.id_proceso_usuario);
          	  cargarMisProcesosUsuario(res.resource.listaBusquedas[i], result.resource);
            }catch(result) {
              respuestaAjaxKO(result.code);
              document.getElementById("modal").style.display = "block";
            }
       
          }

          if(paginadorCreado != 'PaginadorCreado'){
            paginador(totalResults, 'cargarProcesosUsuarioEjecutados', 'PROCESOSUSUARIOEJECUTADOS');
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


/** Función para obtener los procesos de un usuario con ajax y promesas**/
function cargarMisProcesosAjaxPromesa(numeroPagina, tamanhoPagina){
  return new Promise(function(resolve, reject) {
    var token = getCookie('tokenUsuario');

    var data = {
      controlador: 'GestionProcesosUsuario',
      action: 'searchByParameters',
    	usuario : getCookie('usuario'),
    	inicio : calculaInicio(numeroPagina, tamanhoPaginaProcesosUsuario),
      tamanhoPagina: tamanhoPaginaProcesosUsuario
    }

  	$.ajax({
      method: "POST",
      url: urlPeticionAjaxListarProcedimientoUsuario,
      contentType : "application/x-www-form-urlencoded; charset=UTF-8",
      data: data,  
      headers: {'Authorization': token},
      }).done(res => {
        if (res.code != 'BUSQUEDA_PERSONALIZADA_PROCESO_USUARIO_CORRECTO') {
          reject(res);
        }
        resolve(res);
      }).fail( function( jqXHR ) {
        errorFailAjax(jqXHR.status);
      });
  });
}

/** Función para obtener los procesos de un usuario con ajax y promesas**/
function cargarNumeroParametrosProcesoAjaxPromesa(idProceso, numeroPagina, tamanhoPagina){
  return new Promise(function(resolve, reject) {
    var token = getCookie('tokenUsuario');

    var data = {
      controlador: 'GestionParametros',
      action: 'searchByParameters',
    	id_proceso: idProceso,
    	inicio : calculaInicio(numeroPagina, tamanhoPagina),
      tamanhoPagina: tamanhoPagina
    }

  	$.ajax({
      method: "POST",
      url: urlPeticionAjaxListarParametro,
      contentType : "application/x-www-form-urlencoded; charset=UTF-8",
      data: data,  
      headers: {'Authorization': token},
      }).done(res => {
        if (res.code != 'BUSQUEDA_PERSONALIZADA_PARAMETRO_CORRECTO') {
          reject(res);
        }
        resolve(res);
      }).fail( function( jqXHR ) {
        errorFailAjax(jqXHR.status);
      });
  });
}

/** Función para eliminar un procedimiento usuario */
function eliminarProcesoUsuarioAjaxPromesa(idProcesoUsuario){
   return new Promise(function(resolve, reject) {
    var token = getCookie('tokenUsuario');

    var data = {
      controlador : 'GestionProcesosUsuario',
      action: 'delete',
      id_proceso_usuario : idProcesoUsuario,
    }

    $.ajax({
      method: "POST",
      url: urlPeticionAjaxEliminarProcesoUsuario,
      contentType : "application/x-www-form-urlencoded; charset=UTF-8",
      data: data, 
      headers: {'Authorization': token},
      }).done(res => {
        if (res.code != 'PROCESO_USUARIO_ELIMINADO') {
          reject(res);
        }
        resolve(res);
      }).fail( function( jqXHR ) {
        errorFailAjax(jqXHR.status);
      });
  });
}

async function eliminarProceso(idProcesoUsuario){
   await eliminarProcesoUsuarioAjaxPromesa(idProcesoUsuario)
    .then((res) => {
     
      respuestaAjaxOK("PROCESO_USUARIO_ELIMINADO_OK", res.code);

      setLang(getCookie('lang'));
      document.getElementById("modal").style.display = "block";
   
      cargarProcesosUsuarioEjecutados(0, tamanhoPaginaProcedimientoUsuario, 'PaginadorNo');

      }).catch((res) => {
          respuestaAjaxKO(res.code);
          document.getElementById("modal").style.display = "block";
      });
  
}

/** Función para obtener los procedimientos de un usuario con ajax y promesas**/
function cargarParametrosOfProcesoUsuario(idProcesoUsuario){
  return new Promise(function(resolve, reject) {
    var token = getCookie('tokenUsuario');

    var data = {
      controlador : 'GestionProcesosUsuarioParametro',
      action : 'searchByIdProcesoUsuario',
      id_proceso_usuario : idProcesoUsuario,
      inicio : 0,
      tamanhoPagina: 9999999999
    }
    $.ajax({
      method: "POST",
      url: urlPeticionAjaxListarProcesoUsuarioParametroOfProcesoUsuario,
      contentType : "application/x-www-form-urlencoded; charset=UTF-8",
      data: data,
      headers: {'Authorization': token},
      }).done(res => {
        if (res.code != 'BUSQUEDA_PROCESO_USUARIO_PARAMETRO_CORRECTO') {
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
async function cargarMisProcesosUsuario(procesosUsuario, parametrosProcesosUsuario){
	var procesoUsuario = "";
	await cargarNumeroParametrosProcesoAjaxPromesa(procesosUsuario.proceso.id_proceso, 0, 99999999999999)
		.then((res) =>{
				if(res.resource.listaBusquedas.length == 0){
					numeroParametros = 0;
          var params_str = JSON.stringify(res.resource.listaBusquedas);
          setCookie('params', params_str);
				}else{
					numeroParametros = res.resource.tamanhoTotal;
          var params_str = JSON.stringify(res.resource.listaBusquedas);
          setCookie('params', params_str);
				}

        var numeroParametrosCubiertos = parametrosProcesosUsuario.length;

				var fechaProcesoUsuario = new Date(procesosUsuario.procesoUsuario.fecha_proceso_usuario);
				var fecha = convertirFecha(fechaProcesoUsuario.toString());
				procesoUsuario = '<div class="col-md-12 col-lg-12 col-xl-12 mb-12 paddingTop">' + 
								'<div id=' + procesosUsuario.procesoUsuario.id_proceso_usuario + ' class="card">' + 
									'<div class="card-body-plan">' + 
										'<div class="card-title">' + procesosUsuario.proceso.nombre_proceso + '</div>' + 
										'<div class="card-text">' + procesosUsuario.proceso.descripcion_proceso + '</div>' +
										'<div class="parametros">' + numeroParametrosCubiertos + '/' + numeroParametros + '</div>' + 
										'<div class="puntuacion">Huella carbono: ' + procesosUsuario.procesoUsuario.calculo_huella_carbono +'</div>' +
										'<div class="fecha">' + fecha + '</div>';

                    if(numeroParametrosCubiertos == 0){

                      var iconos = '<div id="iniciarProceso" class="tooltip10 procedimientoIcon" data-toggle="modal" data-target="#modalMostrarProcesoUsuario" onclick="iniciarProcesoUsuario('+procesosUsuario.procesoUsuario.id_proceso_usuario+')" style="cursor: pointer;">' + 
                                      '<img id="iconoIniciarProceso" class="iconoProceso iconProceso" src="images/iniciarProcedimiento.png" alt="Iniciar procedimiento" onclick=";"/>' + 
                                      '<span class="tooltiptext iconProceso ICON_INICIAR_PROCESO"></span>' + 
                                    '</div>' + 
                                    '<div id="continuarProceso" class="tooltip11 continuarIcon" style="cursor: not-allowed;">' + 
                                          '<img id="iconoContinuarProceso" class="iconoContinuar iconContinuar" src="images/continuarProcedimiento2.png" alt="Continuar procedimiento" onclick="" style="cursor: not-allowed;"/>' + 
                                          '<span class="tooltiptext iconContinuar ICON_CONTINUAR_PROCESO"></span>' + 
                                    '</div>' +
                                    '<div id="finalizadoProceso" class="tooltip12 finalizadoIcon" style="cursor: default;">' + 
                                          '<img id="iconoFinalizarProceso" class="iconoFinalizado iconFinalizado" src="images/procedimientoFinalizado2.png" alt="Procedimiento finalizado" onclick="" style="cursor: default;"/>' + 
                                          '<span class="tooltiptext iconFinalizado ICON_PROCESO_FINALIZADO"></span>' + 
                                    '</div>' + 
                                    '<div id="eliminarProceso" class="tooltip14 procedimientoIcon" onclick="eliminarProceso('+ procesosUsuario.procesoUsuario.id_proceso_usuario +');" style="cursor: pointer;">' + 
                                      '<img id="iconoEliminarProceso" class="iconoProceso iconEliminarProceso" src="images/delete3.png" alt="Eliminar procedimiento"/>' + 
                                      '<span class="tooltiptext iconProceso ICONO_ELIMINAR"></span>' + 
                                    '</div>' + 
                                     '<div id="verProceso" class="tooltip14 procedimientoIcon" data-toggle="modal" data-target="#modalMostrarProcesoUsuario" onclick="verProceso(' + procesosUsuario.proceso.id_proceso + ','+ procesosUsuario.procesoUsuario.id_proceso_usuario +');" style="cursor: pointer;">' + 
                                      '<img id="iconoVerProceso" class="iconoProceso iconVerProceso" src="images/detail3.png" alt="Ver proceso"/>' + 
                                      '<span class="tooltiptext iconProceso ICONO_DETALLE"></span>' + 
                                    '</div>' + 
                                  '</div>';
                    
                    }else if(numeroParametrosCubiertos > 0 && numeroParametrosCubiertos < numeroParametros){
                      var arrayParametros = [];

                      for(var i = 0; i<parametrosProcesosUsuario.length; i++){
                        arrayParametros.push(parametrosProcesosUsuario);
                      }

                       var iconos = '<div id="iniciarProceso" class="tooltip10 procedimientoIcon" style="cursor: not-allowed;">' + 
                                      '<img id="iconoIniciarProceso" class="iconoProceso iconProceso" src="images/iniciarProcedimiento2.png" alt="Iniciar procedimiento" onclick=";" style="cursor: not-allowed;"/>' + 
                                      '<span class="tooltiptext ICON_INICIAR_PROCESO"></span>' + 
                                    '</div>' + 
                                    '<div id="continuarProceso" class="tooltip11 continuarIcon" data-toggle="modal" data-target="#modalMostrarProcesoUsuario" onclick="continuarProceso(' + procesosUsuario.proceso.id_proceso + ',' + procesosUsuario.procesoUsuario.id_proceso_usuario + ')" style="cursor: pointer;">' + 
                                          '<img id="iconoContinuarProceso" class="iconoContinuar iconContinuar" src="images/continuarProcedimiento.png" alt="Continuar procedimiento"/>' + 
                                          '<span class="tooltiptext ICON_CONTINUAR_PROCESO"></span>' + 
                                    '</div>' +
                                    '<div id="finalizadoProceso" class="tooltip12 finalizadoIcon" style="cursor: default;">' + 
                                          '<img id="iconoFinalizarProceso" class="iconoFinalizado iconFinalizado" src="images/procedimientoFinalizado2.png" alt="Procedimiento finalizado" onclick="" style="cursor: default;"/>' + 
                                          '<span class="tooltiptext ICON_PROCESO_FINALIZADO"></span>' + 
                                    '</div>' + 
                                    '<div id="eliminarProceso" class="tooltip14 procedimientoIcon" onclick="eliminarProceso('+ procesosUsuario.procesoUsuario.id_proceso_usuario +');" style="cursor: not-allowed;">' + 
                                      '<img id="iconoEliminarProceso" class="iconoProceso iconEliminarProceso" src="images/delete.png" alt="Eliminar procedimiento" onclick="eliminarProceso('+ procesosUsuario.procesoUsuario.id_proceso_usuario +');" style="cursor: not-allowed;"/>' + 
                                      '<span class="tooltiptext ICONO_ELIMINAR"></span>' + 
                                    '</div>' + 
                                       '<div id="verProceso" class="tooltip14 procedimientoIcon" data-toggle="modal" data-target="#modalMostrarProcesoUsuario" onclick="verProceso(' + procesosUsuario.proceso.id_proceso + ',' + procesosUsuario.procesoUsuario.id_proceso_usuario +');" style="cursor: pointer;">' + 
                                      '<img id="iconoverProceso" class="iconoProceso iconVerProceso" src="images/detail3.png" alt="Ver procedimiento" onclick="verProceso('+ procesosUsuario.proceso.id_proceso + ',' + procesosUsuario.procesoUsuario.id_proceso_usuario+ ');"/>' + 
                                      '<span class="tooltiptext ICONO_DETALLE"></span>' + 
                                    '</div>' +
                                  '</div>';

                    }else{
                       var iconos = '<div id="iniciarProceso" class="tooltip10 procedimientoIcon" style="cursor: not-allowed;">' + 
                                      '<img id="iconoIniciarProceso" class="iconoProceso iconProceso" src="images/iniciarProcedimiento2.png" alt="Iniciar procedimiento" onclick=";" style="cursor: not-allowed;"/>' + 
                                      '<span class="tooltiptext ICON_INICIAR_PROCEDIMIENTO"></span>' + 
                                    '</div>' + 
                                    '<div id="continuarProceso" class="tooltip11 continuarIcon" style="cursor: not-allowed;">' + 
                                          '<img id="iconoContinuarProceso" class="iconoContinuar iconContinuar" src="images/continuarProcedimiento2.png" alt="Continuar procedimiento" onclick="" style="cursor: not-allowed;"/>' + 
                                          '<span class="tooltiptext ICON_CONTINUAR_PROCESO"></span>' + 
                                    '</div>' +
                                    '<div id="finalizadoProceso" class="tooltip12 finalizadoIcon" style="cursor: default;">' + 
                                          '<img id="iconoFinalizarProceso" class="iconoFinalizado iconFinalizado" src="images/procedimientoFinalizado.png" alt="Procedimiento finalizado" onclick="finalizarProceso('+ procesosUsuario.procesoUsuario.id_proceso_usuario +');" style="cursor: default;"/>' + 
                                          '<span class="tooltiptext ICON_PROCESO_FINALIZADO"></span>' + 
                                    '</div>' + 
                                    '<div id="eliminarProceso" class="tooltip14 procedimientoIcon" style="cursor: not-allowed;">' + 
                                      '<img id="iconoEliminarProceso" class="iconoProceso iconEliminarProceso" src="images/delete.png" alt="Eliminar proceso" onclick="eliminarProceso('+ procesosUsuario.procesoUsuario.id_proceso_usuario +');" style="cursor: not-allowed;"/>' + 
                                      '<span class="tooltiptext ICONO_ELIMINAR"></span>' + 
                                    '</div>' +
                                       '<div id="verProceso" class="tooltip14 procedimientoIcon" data-toggle="modal" data-target="#modalMostrarProcesoUsuario" onclick="verProceso(' + procesosUsuario.proceso.id_proceso + ',' + procesosUsuario.procesoUsuario.id_proceso_usuario +');" style="cursor: pointer;">' + 
                                      '<img id="iconoverProceso" class="iconoProceso iconVerProceso" src="images/detail3.png" alt="Ver procedimiento" onclick="verProceso('+ procesosUsuario.proceso.id_proceso + ',' + procesosUsuario.procesoUsuario.id_proceso_usuario+ ');"/>' + 
                                      '<span class="tooltiptext ICONO_DETALLE"></span>' + 
                                    '</div>' + 
                                  '</div>';
                    }

                    procesoUsuario += iconos;
										 
	              var procesoUsuario2 =   '<div class="card-footer">' + 
                                        '</div>';

            procesoUsuario += procesoUsuario2;

         $('#procesos').append(procesoUsuario);

         if(numeroParametrosCubiertos == 0){
             var selectorIniciarProc = $('#' + procesosUsuario.procesoUsuario.id_proceso_usuario + ' #iniciarProceso #iconoIniciarProceso');

              $(selectorIniciarProc).attr('onclick', 'iniciarProcesoUsuario('+ procesosUsuario.proceso.id_proceso + ', '+ procesosUsuario.procesoUsuario.id_proceso_usuario+')');
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

  cambiarFormulario('SEARCH_PROCESO_EJECUTADO', 'javascript:buscarProcesosEjecutados(0,' + tamanhoPaginaProcesosUsuario + ', \'buscarModal\'' + ',\'PaginadorNo\');', 'return comprobarBuscarProceso();');
  cambiarOnBlurCampos('return comprobarNombreProcesoSearch(\'nombreProceso\', \'errorFormatoNombreProceso\', \'nombreProceso\')', 
  'return comprobarDescripcionProcesoSearch(\'descripcionProceso\', \'errorFormatoDescripcionProceso\', \'descripcionProceso\')',
  'return comprobarFechaProcesoSearch(\'fechaProceso\', \'errorFormatoFechaProceso\', \'fechaProceso\')');
  cambiarIcono('images/search.png', 'ICONO_SEARCH', 'iconoSearchProcedimientoEjecutado', 'Buscar');
  setLang(idioma);

  $('#labelNombreProceso').attr('hidden', true);
  $('#labelDescripcionProceso').attr('hidden', true);
  $('#labelFechaProceso').attr('hidden', true);
 
  let idElementoList = ["nombreProceso", "descripcionProceso", "fechaProceso"];
  let obligatorios = ["obligatorioNombreProceso", "obligatorioDescripcionProceso", "obligatorioFechaProceso"];
  
  eliminarReadonly(idElementoList);
  ocultarObligatorios(obligatorios);
  habilitaCampos(idElementoList);

}

/** Funcion buscar proceso **/
async function buscarProcesosEjecutados(numeroPagina, tamanhoPagina, accion, paginadorCreado){
    try {
        if($('#form-modal').is(':visible')) {
          $("#form-modal").modal('toggle');
        };
      const res = await buscarProcesoEjecutadoAjaxPromesa(numeroPagina, tamanhoPagina, accion);
      var datosBusquedas = [];
      datosBusquedas.push('nombre_proceso: ' + res.resource.datosBusquedas['nombre_proceso']);
      datosBusquedas.push('descripcion_proceso: ' + res.resource.datosBusquedas['descripcion_proceso']);
      datosBusquedas.push('fecha_proceso: ' + res.resource.datosBusquedas['fecha_proceso']);
      guardarParametrosBusqueda(datosBusquedas);
    
      document.getElementById('misProcesos').style.display = "block";
          var numResults = res.resource.numResultados + '';
          var totalResults = res.resource.tamanhoTotal + '';
            var inicio = 0;
          if(res.resource.listaBusquedas.length == 0){
            inicio = 0;
             $('#itemPaginacion').attr('hidden',true);
          }else{
            inicio = parseInt(res.resource.inicio)+1;
              $('#itemPaginacion').attr('hidden',false);
          }
          $('#paginacion').html('')
          var textPaginacion = inicio + " - " + (parseInt(res.resource.inicio)+parseInt(numResults))  + " total " + totalResults;
          $('#paginacion').html(textPaginacion);
       
          $('#procesos').html('');
          for (var i = 0; i < res.resource.listaBusquedas.length; i++){
            try{
              const result = await cargarParametrosOfProcesoUsuario(res.resource.listaBusquedas[i].procesoUsuario.id_proceso_usuario);
              cargarMisProcesosUsuario(res.resource.listaBusquedas[i], result.resource);
            }catch(result) {
              respuestaAjaxKO(result.code);
              document.getElementById("modal").style.display = "block";
            }
       
          }

          if(paginadorCreado != 'PaginadorCreado'){
            paginador(totalResults, 'buscarProcesosEjecutados', 'PROCESOSUSUARIOEJECUTADOS');
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

/**Función para recuperar un proceso ejecutado en base a parámetros con ajax y promesas*/
function buscarProcesoEjecutadoAjaxPromesa(numeroPagina, tamanhoPagina, accion){
  return new Promise(function(resolve, reject) {
    var token = getCookie('tokenUsuario');
    if($('#fechaProceso').val() == "1900-01-01"){
      var fechaP = '';
  }else{
      var fechaP = $('#fechaProceso').val();
  }

    if(accion == "buscarModal"){
        var data = {
         controlador: 'GestionProcesosUsuario',
         action: 'searchByParametersUsuario',
         nombre_proceso : $('#nombreProceso').val(),
         descripcion_proceso : $('#descripcionProceso').val(),
         fecha_proceso : fechaP,
         usuario : getCookie('usuario'),
         inicio: calculaInicio(numeroPagina, tamanhoPaginaProcedimientoUsuario),
         tamanhoPagina: tamanhoPaginaProcedimientoUsuario
        }
    }
    
    if(accion == "buscarPaginacion"){
        if(getCookie('nombre_proceso') == null || getCookie('nombre_proceso') == ""){
          var nombre = "";
        }else{
          var nombre = getCookie('nombre_proceso');
        }
  
        if(getCookie('descripcion_proceso') == null || getCookie('descripcion_proceso') == ""){
          var des = "";
        }else{
          var des = getCookie('descripcion_proceso');
        }
  
  
        if(getCookie('fecha_proceso') == null || getCookie('fecha_proceso') == "null" || getCookie('fecha_proceso') == "" || getCookie('fecha_proceso') == "1900-01-01" ){
          var fecha = "";
          var fechaString = "";
        }else{
          var fecha = getCookie('fecha_proceso');
          var fechaString = convierteFecha(fecha);
        }
      
      var data = {
        controlador: 'GestionProcesosUsuario',
        action: 'searchByParametersUsuario',
        nombre_proceso : nombre,
        descripcion_proceso :des,
        fecha_proceso : fechaString,
        usuario : getCookie('usuario'),
        inicio: calculaInicio(numeroPagina, tamanhoPaginaProcedimientoUsuario),
        tamanhoPagina: tamanhoPaginaProcedimientoUsuario
       }
    }


    $.ajax({
      method: "POST",
      url: urlPeticionAjaxListarProcedimientoUsuario,
      contentType : "application/x-www-form-urlencoded; charset=UTF-8",
      data: data,  
      headers: {'Authorization': token},
      }).done(res => {
        if (res.code != 'BUSQUEDA_PERSONALIZADA_PROCESO_USUARIO_CORRECTO') {
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

