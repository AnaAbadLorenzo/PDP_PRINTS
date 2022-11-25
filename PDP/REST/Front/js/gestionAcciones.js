/** Función para añadir acciones con ajax y promesas **/
function anadirAccionAjaxPromesa(){
  return new Promise(function(resolve, reject) {
    var token = getCookie('tokenUsuario');

    var accionEntity = {
      idAccion : "",
      nombreAccion : $("#nombreAccion").val(),
      descripAccion : $("#descripcionAccion").val(),
      borradoAccion : 0
    }
  
    var data = {
      usuario : getCookie('usuario'),
      accion : accionEntity
    }
    
    $.ajax({
      method: "POST",
      url: urlPeticionAjaxAccionGuardar,
      contentType : "application/json",
      data: JSON.stringify(data),  
      dataType : 'json',
      headers: {'Authorization': token},
      }).done(res => {
        if (res.code != 'ACCION_GUARDADA') {
          reject(res);
        }
        resolve(res);
      }).fail( function( jqXHR ) {
        errorFailAjax(jqXHR.status);
      });
  });
}

/** Función para buscar funcionalidades con ajax y promesas **/
function buscarAccionAjaxPromesa(numeroPagina, tamanhoPagina, accion){
  return new Promise(function(resolve, reject) {
    var token = getCookie('tokenUsuario');

    if(accion == "buscarModal"){
      var data = {
        nombreAccion : $("#nombreAccion").val(),
        descripAccion : $("#descripcionAccion").val(),
        inicio : calculaInicio(numeroPagina, tamanhoPaginaAccion),
        tamanhoPagina : tamanhoPaginaAccion
      }
    }

    if(accion == "buscarPaginacion"){
       if(getCookie('nombreAccion') == null || getCookie('nombreAccion') == ""){
        var nombreAcc = "";
      }else{
        var nombreAcc = getCookie('nombreAccion');
      }

      if(getCookie('descripAccion') == null || getCookie('descripAccion') == ""){
        var descripAcc = "";
      }else{
        var descripAcc = getCookie('descripAccion');
      }

      var data = {
        nombreAccion : nombreAcc,
        descripAccion : descripAcc,
        inicio : calculaInicio(numeroPagina, tamanhoPaginaAccion),
        tamanhoPagina : tamanhoPaginaAccion 
      }
    }
    
    $.ajax({
      method: "POST",
      url: urlPeticionAjaxListarAccion,
      contentType : "application/json",
      data: JSON.stringify(data),  
      dataType : 'json',
      headers: {'Authorization': token},
      }).done(res => {
        if (res.code != 'ACCION_ENCONTRADA') {
          reject(res);
        }
        resolve(res);
      }).fail( function( jqXHR ) {
        errorFailAjax(jqXHR.status);
      });
  });
}

/** Función para recuperar los permisos de un usuario sobre la funcionalidad **/
function cargarPermisosFuncAccionAjaxPromesa(){
  return new Promise(function(resolve, reject) {
    var nombreUsuario = getCookie('usuario');
    var token = getCookie('tokenUsuario');
    
    var usuario = nombreUsuario;
  
    $.ajax({
      method: "GET",
      url: urlPeticionAjaxAccionesUsuario,
      contentType : "application/json",
      data: { usuario : usuario, funcionalidad : 'Gestión de acciones'},  
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

/**Función para eliminar una accion con ajax y promesas*/
function eliminarAccionAjaxPromesa(){
  return new Promise(function(resolve, reject) {
    var token = getCookie('tokenUsuario');

    var accionEntity = {
      idAccion : $("input[name=idAccion]").val(),
      nombreAccion : $("#nombreAccion").val(),
      descripAccion : $("#descripcionAccion").val(),
      borradoAccion : 1
    }
    
    var data = {
      usuario : getCookie('usuario'),
      accion : accionEntity
    }

      $.ajax({
      method: "POST",
      url: urlPeticionAjaxDeleteAccion,
      contentType : "application/json",
      data: JSON.stringify(data),  
      dataType : 'json',
      headers: {'Authorization': token},
      }).done(res => {
        if (res.code != 'ACCION_ELIMINADA') {
          reject(res);
        }
        resolve(res);
      }).fail( function( jqXHR ) {
        errorFailAjax(jqXHR.status);
      });
  });
}

/** Función para editar una accion con ajax y promesa **/
function editarAccionAjaxPromesa(){
  return new Promise(function(resolve, reject) {
    var token = getCookie('tokenUsuario');

    var accionEntity = {
      idAccion : $("input[name=idAccion]").val(),
      nombreAccion : $("#nombreAccion").val(),
      descripAccion : $("#descripcionAccion").val(),
      borradoAccion : 0
    }
    
    var data = {
      usuario : getCookie('usuario'),
      accion : accionEntity
    }

      $.ajax({
      method: "POST",
      url: urlPeticionAjaxEditAccion,
      contentType : "application/json",
      data: JSON.stringify(data),  
      dataType : 'json',
      headers: {'Authorization': token},
      }).done(res => {
        if (res.code != 'ACCION_MODIFICADA') {
          reject(res);
        }
        resolve(res);
      }).fail( function( jqXHR ) {
        errorFailAjax(jqXHR.status);
      });
  });
}

/*Función que comprueba los permisos del usuario sobre la accion*/
async function cargarPermisosFuncAccion(){
  await cargarPermisosFuncAccionAjaxPromesa()
  .then((res) => {
    gestionarPermisosAccion(res.data);
  }).catch((res) => {
      respuestaAjaxKO(res.code);
      setLang(getCookie('lang'));
      document.getElementById("modal").style.display = "block";
  });
}


/** Función para recuperar las acciones con ajax y promesas **/
function cargarAccionesAjaxPromesa(numeroPagina, tamanhoPagina){
  return new Promise(function(resolve, reject) {
  	var token = getCookie('tokenUsuario');

    var data = {
      inicio : calculaInicio(numeroPagina, tamanhoPaginaAccion),
      tamanhoPagina : tamanhoPaginaAccion
    }
    
    $.ajax({
      method: "POST",
      url: urlPeticionAjaxListadoAcciones,
      contentType : "application/json",
      data: JSON.stringify(data),  
      dataType : 'json',
      headers: {'Authorization': token},
      }).done(res => {
        if (res.code != 'ACCIONES_LISTADAS') {
          reject(res);
        }
        resolve(res);
      }).fail( function( jqXHR ) {
        errorFailAjax(jqXHR.status);
      });
  });
}

/**Función para recuperar las acciones eliminadas con ajax y promesas*/
function buscarEliminadosAjaxPromesa(numeroPagina, tamanhoPagina){
  return new Promise(function(resolve, reject) {
    var token = getCookie('tokenUsuario');

    var data = {
      inicio : calculaInicio(numeroPagina, tamanhoPaginaAccion),
      tamanhoPagina : tamanhoPaginaAccion
    }
    
    $.ajax({
      method: "POST",
      url: urlPeticionAjaxListadoAccionesEliminadas,
      contentType : "application/json",
      data: JSON.stringify(data),  
      dataType : 'json',
      headers: {'Authorization': token},
      }).done(res => {
        if (res.code != 'ACCIONES_ELIMINADAS_LISTADAS') {
          reject(res);
        }
        resolve(res);
      }).fail( function( jqXHR ) {
        errorFailAjax(jqXHR.status);
      });
  });
}

/**Función para ver en detalle una accion con ajax y promesas*/
function detalleAccionAjaxPromesa(){
  return new Promise(function(resolve, reject) {
    var token = getCookie('tokenUsuario');
    
    var data = {
      nombreAccion : $('#nombreAccion').val(),
      descripAccion : $('#descripAccion').val(),
      inicio : 0,
      tamanhoPagina : 1
    }

      $.ajax({
      method: "POST",
      url: urlPeticionAjaxListarAccion,
      contentType : "application/json",
      data: JSON.stringify(data),  
      dataType : 'json',
      headers: {'Authorization': token},
      }).done(res => {
        if (res.code != 'ACCION_ENCONTRADA') {
          reject(res);
        }
        resolve(res);
      }).fail( function( jqXHR ) {
        errorFailAjax(jqXHR.status);
      });
  });
}


/**Función para reactivar una acción con ajax y promesas*/
function reactivarAccionesAjaxPromesa(){
  return new Promise(function(resolve, reject) {
    var token = getCookie('tokenUsuario');
    
    var accionEntity = {
      idAccion : $("input[name=idAccion]").val(),
      nombreAccion : $('#nombreAccion').val(),
      descripAccion : $('#descripcionAccion').val(),
      borradoAccion : 0
    }

    var data = {
      usuario: getCookie('usuario'),
      accion : accionEntity
    }

      $.ajax({
      method: "POST",
      url: urlPeticionAjaxReactivarAccion,
      contentType : "application/json",
      data: JSON.stringify(data),  
      dataType : 'json',
      headers: {'Authorization': token},
      }).done(res => {
        if (res.code != 'ACCION_REACTIVADA') {
          reject(res);
        }
        resolve(res);
      }).fail( function( jqXHR ) {
        errorFailAjax(jqXHR.status);
      });
  });
}

/** Función para cargar las funcionalidades de BD ***/
function cargarFuncionalidadesAjaxPromesa(){
  return new Promise(function(resolve, reject) {
    var token = getCookie('tokenUsuario');

      $.ajax({
      method: "GET",
      url: urlPeticionAjaxListadoFuncionalidadesSinP,
      dataType : 'json',
      headers: {'Authorization': token},
      }).done(res => {
        if (res.code != 'FUNCIONALIDADES_LISTADAS') {
          reject(res);
        }
        resolve(res);
      }).fail( function( jqXHR ) {
        errorFailAjax(jqXHR.status);
      });
  });
}

/* Función para obtener las acciones del sistema */
async function cargarAcciones(numeroPagina, tamanhoPagina, paginadorCreado){
	await cargarAccionesAjaxPromesa(numeroPagina, tamanhoPagina)
	  .then((res) => {
	  	$('#tablaDatos').removeAttr('hidden');
      $('#permisos').css('display', 'none');
      $('#paginacion').attr('hidden', false);
      var numResults = res.data.numResultados + '';
	  	var totalResults = res.data.tamanhoTotal + '';
	  	var textPaginacion = parseInt(res.data.inicio)+1 + " - " + (parseInt(res.data.inicio)+parseInt(numResults))  + " total " + totalResults;

      if(res.data.listaBusquedas.length == 0){
        $('#itemPaginacion').attr('hidden',true);
      }else{
        $('#itemPaginacion').attr('hidden',false);
      }
	   	
      $("#datosAccion").html("");
	   	$("#checkboxColumnas").html("");
	   	$("#paginacion").html("");
    		
      for (var i = 0; i < res.data.listaBusquedas.length; i++){
    			var tr = construyeFila('ACCION', res.data.listaBusquedas[i]);
    			$("#datosAccion").append(tr);
    		}
    	
    	var div = createHideShowColumnsWindow({ACCION_DESCRIPTION_COLUMN:2});
      	$("#checkboxColumnas").append(div);
      	$("#paginacion").append(textPaginacion);

        if(paginadorCreado != 'PaginadorCreado'){
            paginador(totalResults, 'cargarAcciones', 'ACCION');
        }

        if(numeroPagina == 0){
          $('#' + (numeroPagina+1)).addClass("active");
          var numPagCookie =  numeroPagina + 1;
        }else{
          $('#' + numeroPagina).addClass("active");
          var numPagCookie =  numeroPagina;
        }
	  
        setCookie('numeroPagina', numPagCookie);
        setLang(getCookie('lang'));

		}).catch((res) => {
		    respuestaAjaxKO(res.code);
		    document.getElementById("modal").style.display = "block";
        setLang(getCookie('lang'));
		});
}

/** Funcion añadir accion **/
async function addAccion(){
  await anadirAccionAjaxPromesa()
  .then((res) => {
    
    $("#form-modal").modal('toggle');
    respuestaAjaxOK("ACCION_GUARDADA_OK", res.code);

    let idElementoList = ["nombreAccion", "descripcionAccion"];
    resetearFormulario("formularioGenerico", idElementoList);
    document.getElementById("modal").style.display = "block";
    
    $('#nombreAccion').val(getCookie('nombreAccion'));
    $('#descripcionAccion').val(getCookie('descripAccion'));
    buscarAccion(getCookie('numeroPagina'), tamanhoPaginaAccion, 'buscarPaginacion', 'PaginadorNo');
    setLang(getCookie('lang'));

  }).catch((res) => {
      $("#form-modal").modal('toggle');

      respuestaAjaxKO(res.code);

      let idElementoList = ["nombreAccion", "descripcionAccion"];
      resetearFormulario("formularioGenerico", idElementoList);

      setLang(getCookie('lang'));

      document.getElementById("modal").style.display = "block";
  });
}


/** Funcion buscar accion **/
async function buscarAccion(numeroPagina, tamanhoPagina, accion, paginadorCreado){
  await buscarAccionAjaxPromesa(numeroPagina, tamanhoPagina,accion)
  .then((res) => {
      cargarPermisosFuncAccion();
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
      var textPaginacion = inicio + " - " + (parseInt(res.data.inicio)+parseInt(numResults))  + " total " + totalResults;

      if(res.data.listaBusquedas.length == 0){
        $('#itemPaginacion').attr('hidden',true);
      }else{
        $('#itemPaginacion').attr('hidden',false);
      }

      $("#datosAccion").html("");
      $("#checkboxColumnas").html("");
      $("#paginacion").html("");
        for (var i = 0; i < res.data.listaBusquedas.length; i++){
          var tr = construyeFila('ACCION', res.data.listaBusquedas[i]);
          $("#datosAccion").append(tr);
        }
      
      var div = createHideShowColumnsWindow({ACCION_DESCRIPTION_COLUMN:2});
      
      $("#checkboxColumnas").append(div);
      $("#paginacion").append(textPaginacion);

      if(paginadorCreado != 'PaginadorCreado'){
        paginador(totalResults, 'buscarAccion', 'ACCION');
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

  
  }).catch((res) => {
      cargarPermisosFuncAccion();
      respuestaAjaxKO(res.code);

      let idElementoList = ["nombreAccion", "descripcionAccion"];
      resetearFormulario("formularioGenerico", idElementoList);

      setLang(getCookie('lang'));

      document.getElementById("modal").style.display = "block";
  });
}

/*Función que refresca la tabla por si hay algún cambio en BD */
async function refrescarTabla(numeroPagina, tamanhoPagina){
  await cargarAccionesAjaxPromesa(numeroPagina, tamanhoPagina)
  .then((res) => {
      $('#tablaDatos').removeAttr('hidden');
      $('#permisos').css('display', 'none');
      $('#paginacion').attr('hidden', false);
      cargarPermisosFuncAccion();
      setCookie('nombreAccion', '');
      setCookie('descripcionAccion', '');
      var numResults = res.data.numResultados + '';
      var totalResults = res.data.tamanhoTotal + '';
      var inicio = 0;
      if(res.data.listaBusquedas.length == 0){
        inicio = 0;
      }else{
        inicio = parseInt(res.data.inicio)+1;
      }
      var textPaginacion = inicio + " - " + (parseInt(res.data.inicio)+parseInt(numResults))  + " total " + totalResults;

      document.getElementById('cabecera').style.display="block";
      document.getElementById('cabeceraEliminados').style.display="none";
      
      $("#datosAccion").html("");
      $("#checkboxColumnas").html("");
      $("#paginacion").html("");
        for (var i = 0; i < res.data.listaBusquedas.length; i++){
          var tr = construyeFila('ACCION', res.data.listaBusquedas[i]);
          $("#datosAccion").append(tr);
        }
      
      var div = createHideShowColumnsWindow({ACCION_DESCRIPTION_COLUMN:2});
      $("#checkboxColumnas").append(div);
      $("#paginacion").append(textPaginacion);

      setCookie('nombreAccion', '');
      setCookie('descripAccion', '');

      paginador(totalResults, 'cargarAcciones', 'ACCION');

      if(numeroPagina == 0){
        $('#' + (numeroPagina+1)).addClass("active");
        var numPagCookie = numeroPagina + 1 ;
      }else{
        $('#' + numeroPagina).addClass("active");
         var numPagCookie = numeroPagina;
      }

      setCookie('numeroPagina', numPagCookie);
      comprobarOcultos();
      setLang(getCookie('lang'));
    
    }).catch((res) => {
      
      respuestaAjaxKO(res.code);
      setLang(getCookie('lang'));
      document.getElementById("modal").style.display = "block";
  });
}

/*Función que busca los eliminados de la tabla de rol*/
async function buscarEliminados(numeroPagina, tamanhoPagina, paginadorCreado){
  await buscarEliminadosAjaxPromesa(numeroPagina, tamanhoPagina)
  .then((res) => {
      cargarPermisosFuncAccion();
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
      var textPaginacion = inicio + " - " + (parseInt(res.data.inicio)+parseInt(numResults))  + " total " + totalResults;
     
    
      $("#datosAccion").html("");
      $("#checkboxColumnas").html("");
      $("#paginacion").html("");
        for (var i = 0; i < res.data.listaBusquedas.length; i++){
          var tr = construyeFilaEliminados('ACCION', res.data.listaBusquedas[i]);
          $("#datosAccion").append(tr);
        }

        if(res.data.listaBusquedas.length == 0){
          document.getElementById('cabecera').style.display = "none";
          document.getElementById('cabeceraEliminados').style.display = "block";
        }
      
      var div = createHideShowColumnsWindow({ACCION_DESCRIPTION_COLUMN:2});
      $("#checkboxColumnas").append(div);
      $("#paginacion").append(textPaginacion);

      setCookie('nombreAccion', '');
      setCookie('descripAccion', '');

      if(paginadorCreado != 'PaginadorCreado'){
        paginador(totalResults, 'buscarEliminadosAccion', 'ACCION');
      }

      if(numeroPagina == 0){
        $('#' + (numeroPagina+1)).addClass("active");
      }else{
        $('#' + numeroPagina).addClass("active");
      }

      setLang(getCookie('lang'));
    
    }).catch((res) => {
      
      respuestaAjaxKO(res.code);
      setLang(getCookie('lang'));
      document.getElementById("modal").style.display = "block";
  
  });
}

/** Función que visualiza una accion **/
async function detalleAccion(){
  await detalleAccionAjaxPromesa()
  .then((res) => {
    $("#form-modal").modal('toggle');

    let idElementoList = ["nombreAccion", "descripcionAccion"];
    resetearFormulario("formularioGenerico", idElementoList);
    $('#nombreAccion').val(getCookie('nombreAccion'));
    $('#descripcionAccion').val(getCookie('descripAccion'));

    setLang(getCookie('lang'));

  }).catch((res) => {
      $("#form-modal").modal('toggle');

      respuestaAjaxKO(res.code);

      let idElementoList = ["nombreAccion", "descripcionAccion"];
      resetearFormulario("formularioGenerico", idElementoList);
      
      setLang(getCookie('lang'));

      document.getElementById("modal").style.display = "block";
  });
}

/** Función que edita una accion **/
async function editAccion(){
  await editarAccionAjaxPromesa()
  .then((res) => {
    $("#form-modal").modal('toggle');

    respuestaAjaxOK("ACCION_EDITADA_OK", res.code);

    let idElementoList = ["nombreAccion", "descripcionAccion"];
    resetearFormulario("formularioGenerico", idElementoList);

    document.getElementById("modal").style.display = "block";
    $('#nombreAccion').val(getCookie('nombreAccion'));
    $('#descripcionAccion').val(getCookie('descripAccion'));
    buscarAccion(getCookie('numeroPagina'), tamanhoPaginaAccion, 'buscarPaginacion', 'PaginadorCreado');

    setLang(getCookie('lang'));

  }).catch((res) => {
    $("#form-modal").modal('toggle');

    respuestaAjaxKO(res.code);

    let idElementoList = ["nombreAccion", "descripcionAccion"];
    resetearFormulario("formularioGenerico", idElementoList);

    setLang(getCookie('lang'));

    document.getElementById("modal").style.display = "block";


  });
}

/** Función que elimina una accion **/
async function deleteAccion(){
  await eliminarAccionAjaxPromesa()
  .then((res) => {
    $("#form-modal").modal('toggle');

    respuestaAjaxOK("ACCION_ELIMINADA_OK", res.code);

    let idElementoList = ["nombreAccion", "descripcionAccion"];
    resetearFormulario("formularioGenerico", idElementoList);
    document.getElementById("modal").style.display = "block";
   
    refrescarTabla(0, tamanhoPaginaAccion);

    setLang(getCookie('lang'));

  }).catch((res) => {
     
     $("#form-modal").modal('toggle');
      respuestaAjaxKO(res.code);

      let idElementoList = ["nombreAccion", "descripcionAccion"];
      resetearFormulario("formularioGenerico", idElementoList);

      setLang(getCookie('lang'));

      document.getElementById("modal").style.display = "block";


  });
}

/*Función que reactiva los eliminados de la tabla de acciones*/
async function reactivarAccion(){
  await reactivarAccionesAjaxPromesa()
  .then((res) => {

    cargarPermisosFuncAccion();

    $("#form-modal").modal('toggle');

    respuestaAjaxOK("ACCION_REACTIVADA_OK", res.code);

    document.getElementById("modal").style.display = "block";
      
    buscarEliminados(0, tamanhoPaginaAccion, 'PaginadorNo');
    setLang(getCookie('lang'));
    
    }).catch((res) => {
      $("#form-modal").modal('toggle');
      respuestaAjaxKO(res.code);
      setLang(getCookie('lang'));
      document.getElementById("modal").style.display = "block";
  });
}

/** Funcion para mostrar el formulario para añadir una acción **/
function showAddAcciones() {
  cambiarFormulario('ADD_ACCION', 'javascript:addAccion();', 'return comprobarAddAccion();');
  cambiarOnBlurCampos('return comprobarNombreAccion(\'nombreAccion\', \'errorFormatoNombreAccion\', \'nombreAccion\')', 
  'return comprobarDescripcionAccion(\'descripcionAccion\', \'errorFormatoDescripcionAccion\', \'descripcionAccion\')');
  cambiarIcono('images/add.png', 'ICONO_ADD', 'iconoAddAccion', 'Añadir');

  $('#subtitulo').attr('hidden', true);
  $('#labelAccionName').attr('hidden', true);
  $('#labelAccionDescription').attr('hidden', true);

  let campos = ["nombreAccion", "descripcionAccion"];
  let obligatorios = ["obligatorioAccionName", "obligatorioAccionDescription"];
  eliminarReadonly(campos);
  mostrarObligatorios(obligatorios);
  habilitaCampos(campos);
  setLang(getCookie('lang'));

}

/** Funcion para buscar una accion **/
function showBuscarAccion() {

  cambiarFormulario('SEARCH_ACCION', 'javascript:buscarAccion(0,' + tamanhoPaginaAccion + ', \'buscarModal\'' + ', \'PaginadorNo\');', 'return comprobarBuscarAccion();');
  cambiarOnBlurCampos('return comprobarNombreAccionSearch(\'nombreAccion\', \'errorFormatoNombreAccion\', \'nombreAccion\')', 
  'return comprobarDescripcionAccionSearch(\'descripcionAccion\', \'errorFormatoDescripcionAccion\', \'descripcionAccion\')');
  cambiarIcono('images/search.png', 'ICONO_SEARCH', 'iconoSearchAccion', 'Buscar');

  $('#subtitulo').attr('hidden', true);
  $('#labelAccionName').attr('hidden', true);
  $('#labelAccionDescription').attr('hidden', true);

  let campos = ["nombreAccion", "descripcionAccion"];
  let obligatorios = ["obligatorioAccionName", "obligatorioAccionDescription"];
  eliminarReadonly(campos);
  ocultarObligatorios(obligatorios);
  habilitaCampos(campos);
  setLang(getCookie('lang'));

}

/** Funcion para visualizar una accion **/
function showDetalle(nombreAccion, descripAccion) {
    cambiarFormulario('DETAIL_ACTION', 'javascript:detalleAccion();', '');
    cambiarIcono('images/close2.png', 'ICONO_CERRAR', 'iconoCerrar', 'Detalle');
    
    $('#labelAccionName').removeAttr('hidden');
    $('#labelAccionDescription').removeAttr('hidden');
    $('#subtitulo').attr('hidden', '');

    rellenarFormulario(nombreAccion, descripAccion);

    let campos = ["nombreAccion", "descripcionAccion"];
    let obligatorios = ["obligatorioAccionName", "obligatorioAccionDescription"];
    anadirReadonly(campos);
    ocultarObligatorios(obligatorios);
    deshabilitaCampos(campos);

    setLang(getCookie('lang'));

}

/** Funcion para editar una accion **/
function showEditar(nombreAccion, descripAccion, idAccion) {
    cambiarFormulario('EDIT_ACCION', 'javascript:editAccion();', 'return comprobarEditAccion();');
    cambiarOnBlurCampos('return comprobarNombreAccion(\'nombreAccion\', \'errorFormatoNombreAccion\', \'nombreAccion\')', 
      'return comprobarDescripcionAccion(\'descripcionAccion\', \'errorFormatoDescripcionAccion\', \'descripcionAccion\')');
    cambiarIcono('images/edit.png', 'ICONO_EDIT', 'iconoEditarAccion', 'Editar');

    $('#subtitulo').attr('hidden', true);
    $('#labelAccionName').attr('hidden', true);
    $('#labelAccionDescription').attr('hidden', true);

    rellenarFormulario(nombreAccion, descripAccion);
    insertacampo(document.formularioGenerico,'idAccion', idAccion);

    let campos = ["nombreAccion", "descripcionAccion"];
    let obligatorios = ["obligatorioAccionName", "obligatorioAccionDescription"];
    eliminarReadonly(campos);
    mostrarObligatorios(obligatorios);
    habilitaCampos(campos);
    deshabilitaCampos(["nombreAccion"]);
    anadirReadonly(["nombreAccion"]);

    setLang(getCookie('lang'));
}

/** Función para eliminar una accion **/
function showEliminar(nombreAccion, descripAccion, idAccion) {

    cambiarFormulario('DELETE_ACCION', 'javascript:deleteAccion();', '');
    cambiarIcono('images/delete.png', 'ICONO_ELIMINAR', 'iconoEliminar', 'Eliminar');
    
    $('#labelAccionName').removeAttr('hidden');
    $('#labelAccionDescription').removeAttr('hidden');
    $('#subtitulo').removeAttr('class');
    $('#subtitulo').empty();
    $('#subtitulo').attr('class', 'SEGURO_ELIMINAR_ACCION');
    $('#subtitulo').attr('hidden', false);
    

    rellenarFormulario(nombreAccion, descripAccion);
    insertacampo(document.formularioGenerico,'idAccion', idAccion);

    let campos = ["nombreAccion", "descripcionAccion"];
    let obligatorios = ["obligatorioAccionName", "obligatorioAccionDescription"];
    eliminarReadonly(campos);
    ocultarObligatorios(obligatorios);
    deshabilitaCampos(campos);

    setLang(getCookie('lang'));

}

/** Función para reactivar una accion **/
function showReactivar(nombreAccion, descripAccion , idAccion) {

    cambiarFormulario('REACTIVATE_ACCION', 'javascript:reactivarAccion();', '');
    cambiarIcono('images/reactivar2.png', 'ICONO_REACTIVAR', 'iconoReactivar', 'Reactivar');

    $('#labelAccionName').removeAttr('hidden');
    $('#labelAccionDescription').removeAttr('hidden');
    $('#subtitulo').removeAttr('class');
    $('#subtitulo').empty();
    $('#subtitulo').attr('class', 'SEGURO_REACTIVAR_ACCION');
    $('#subtitulo').attr('hidden', false);
    

    rellenarFormulario(nombreAccion, descripAccion);
    insertacampo(document.formularioGenerico,'idAccion', idAccion);

    let campos = ["nombreAccion", "descripcionAccion"];
    let obligatorios = ["obligatorioAccionName", "obligatorioAccionDescription"];
    anadirReadonly(campos);
    ocultarObligatorios(obligatorios);
    deshabilitaCampos(campos);
    setLang(getCookie('lang'));

}

/**Función para cambiar onBlur de los campos*/
function cambiarOnBlurCampos(onBlurNombreAccion, onBlurDescripcionAccion) {
    
    if (onBlurNombreAccion != ''){
        $("#nombreAccion").attr('onblur', onBlurNombreAccion);
    }

    if (onBlurDescripcionAccion != ''){
        $("#descripcionAccion").attr('onblur', onBlurDescripcionAccion);
    }
}

/**Función que rellenado los datos del formulario*/
function rellenarFormulario(nombreAccion, descripAccion) {

    $("#nombreAccion").val(nombreAccion);
    $("#descripcionAccion").val(descripAccion); 

}

/** Función para gestionar los iconos dependiendo de los permisos de los usuarios **/
function gestionarPermisosAccion(idElementoList) {
  if(getCookie('rolUsuario') == "admin"){
    $('#btnPermisos').removeAttr('hidden');
  }else{
    $('#btnPermisos').attr('hidden', true);
  }

  document.getElementById('cabecera').style.display = "none";
  document.getElementById('tablaDatos').style.display = "none";
  document.getElementById('filasTabla').style.display = "none";
  $('#itemPaginacion').attr('hidden', true);
  
  idElementoList.forEach( function (idElemento) {
    switch(idElemento){
      case "Añadir":
        $('#btnAddAccion').attr('src', 'images/add3.png');
        $('#btnAddAccion').css("cursor", "pointer");
        $('#divAddAccion').attr("data-toggle", "modal");
        $('#divAddAccion').attr("data-target", "#form-modal");
      break;

      case "Modificar" : 
        $('.editarPermiso').attr('src', 'images/edit3.png');
        $('.editarPermiso').css("cursor", "pointer");
        $('.editarPermiso').attr("data-toggle", "modal");
        $('.editarPermiso').attr("data-target", "#form-modal");
      break;

      case "Eliminar" :
        $('.eliminarPermiso').attr('src', 'images/delete3.png');
        $('.eliminarPermiso').css("cursor", "pointer");
        $('.eliminarPermiso').attr("data-toggle", "modal");
        $('.eliminarPermiso').attr("data-target", "#form-modal");
      break;

      case 'Listar' :
        $('#btnListarAcciones').attr('src', 'images/search3.png');
        $('#btnSearchDelete').attr('src', 'images/searchDelete3.png');
        $('#btnListarAcciones').css("cursor", "pointer");
        $('.iconoSearchDelete').css("cursor", "pointer");
        $('#divSearchDelete').attr("onclick", "javascript:buscarEliminados(0,\'tamanhoPaginaAccion\')");
        $('#divListarAcciones').attr("data-toggle", "modal");
        $('#divListarAcciones').attr("data-target", "#form-modal");
        document.getElementById('cabecera').style.display = "block";
        document.getElementById('tablaDatos').style.display = "block";
        document.getElementById('filasTabla').style.display = "block";
         $('#itemPaginacion').attr('hidden', false);

        if(document.getElementById('cabeceraEliminados').style.display == "block"){
           document.getElementById('cabecera').style.display = "none";

           var texto = document.getElementById('paginacion').innerHTML;
           if(texto == "0 - 0 total 0"){
           $('#itemPaginacion').attr('hidden', true);
          }

        }

        if(document.getElementById('permisos').style.display == "block"){
           document.getElementById('cabeceraEliminados').style.display = "block";
           $('#itemPaginacion').attr('hidden', true);
          

        }
      break;
      case "Visualizar" :
        $('.detallePermiso').attr('src', 'images/detail3.png');
        $('.detallePermiso').css("cursor", "pointer");
        $('.detallePermiso').attr("data-toggle", "modal");
        $('.detallePermiso').attr("data-target", "#form-modal");
      break;

      case "Reactivar" : 
        $('.reactivarPermiso').attr('src', 'images/reactivar.png');
        $('.reactivarPermiso').css("cursor", "pointer");
        $('.reactivarPermiso').attr("data-toggle", "modal");
        $('.reactivarPermiso').attr("data-target", "#form-modal");
      break;

    } 
    }); 

  setLang(getCookie('lang'));
}

async function permisosUsuarios(){
  await cargarFuncionalidadesAjaxPromesa()
  .then((res) => {
      document.getElementById('cabeceraEliminados').style.display = "block";
      cargarTablaPermisos(res.data.listaBusquedas);
      var cardAbierta = getCookie('cardPermiso');
      if(cardAbierta != null && cardAbierta != ""){
          $('#collapseGest' + cardAbierta).addClass('show');
          cargarInfoPermiso(getCookie('nomFuncPermisos'));
      }
      setLang(getCookie('lang'));
    }).catch((res) => {
        respuestaAjaxKO(res.code);
        setLang(getCookie('lang'));
        document.getElementById("modal").style.display = "block";
    });
}

function cargaPermisos(funcionalidad){
  return new Promise(function(resolve, reject) {
    var token = getCookie('tokenUsuario');

    var data = {
      nombreFuncionalidad: funcionalidad
    }

    $.ajax({
      method: "GET",
      url: urlPeticionAjaxCargarPermiso,
      data: {nombreFuncionalidad : funcionalidad},  
      dataType : 'json',
      headers: {'Authorization': token},
      }).done(res => {
        if (res.code != 'PERMISOS_OBTENIDOS') {
          reject(res);
        }
        resolve(res);
      }).fail( function( jqXHR ) {
        errorFailAjax(jqXHR.status);
      });
  });
}

async function cargarInfoPermiso(funcionalidad){
 await cargaPermisos(funcionalidad)
    .then((res) => {
      if(funcionalidad.includes(" ")){
        var nombre = (funcionalidad).split(" ");
        if(funcionalidad == "Log de acciones"){
         var nombreCollapse = nombre[0] + nombre[1] + nombre[2];
        }else if(funcionalidad == "Gestión de procedimientos ejecutados" || funcionalidad == "Gestión de procesos ejecutados"){
         var nombreCollapse = nombre[1] + nombre[2] + nombre[3];
        }else{
        var nombreCollapse = nombre[1] + nombre[2];
        }
      }else{
        var nombreCollapse = funcionalidad;
      }
      
      var rolesListos = [];
      var yaIntroducido = false;

      $('#cabeceraPermisosGest' +nombreCollapse).html('');

      var rolesDisponibles = '<tr>' + 
                              '<th class = "colFirst"></th>'; 

      for(var i = 0; i<res.data.length; i++){
        for(var x = 0; x<rolesListos.length; x++){
          if(res.data[i].rol.rolName == rolesListos[x]){
            var yaIntroducido = true;
          }else{
            var yaIntroducido = false;
          }
        }

        if(!yaIntroducido){
          rolesDisponibles = rolesDisponibles + '<th class="' + res.data[i].rol.rolName + '">' + res.data[i].rol.rolName + '</th>';
          rolesListos.push(res.data[i].rol.rolName);
        }

        if(i == (res.data.length - 1)){
          rolesDisponibles = rolesDisponibles + '</tr>';
        }

      }

      $('#cabeceraPermisosGest' +nombreCollapse).append(rolesDisponibles);

      cargarAccionesPermisos(funcionalidad,res.data);
      setLang(getCookie('lang'));

    }).catch((res) => {
        respuestaAjaxKO(res.code);
        setLang(getCookie('lang'));
        document.getElementById("modal").style.display = "block";
    });
}

function cargarAccionesPermisos(funcionalidad,acciones){
      if(funcionalidad.includes(" ")){
        var nombre = (funcionalidad).split(" ");
        if(funcionalidad == "Log de acciones"){
         var nombreCollapse = nombre[0] + nombre[1] + nombre[2];
        }else if(funcionalidad == "Gestión de procedimientos ejecutados" || funcionalidad == "Gestión de procesos ejecutados"){
           var nombreCollapse = nombre[1] + nombre[2] + nombre[3];
        }else{
        var nombreCollapse = nombre[1] + nombre[2];
        }
      }else{
        var nombreCollapse = funcionalidad;
      }

      var className = "";
      var accionesListas = [];
      var yaIntroducido = false;
      var atributos = [];

      $('#cuerpoPermisosGest' + nombreCollapse).html('');

      var accionesDisponibles = '<tr>';

      var cabecera = $('#cabeceraPermisosGest' +nombreCollapse + ' tr th');

      for(var i = 0; i<acciones.length; i++){
        accionesDisponibles = "";
        var rol = acciones[i].rol.rolName;
        var accion = acciones[i].accion.nombreAccion;

        for(var z= 0; z<accionesListas.length; z++){
          if(accion == accionesListas[z]){
            yaIntroducido = true;
            break;
          }else{
            yaIntroducido = false;
          }
        }

        if(!yaIntroducido){
           accionesDisponibles = '<tr><td class="columnaAcciones">' + acciones[i].accion.nombreAccion +' </td>';
                                          
        for(var x= 0; x<cabecera.length; x++){
           var classCabecera = cabecera[x].className;
           var tienePermiso = acciones[i].tienePermiso;
            if(rol == classCabecera){
              atributosFunc = ["'" + acciones[i].accion.idAccion + "'", "'" + acciones[i].accion.nombreAccion + "'", "'" + acciones[i].accion.descripAccion + "'", "'" + acciones[i].accion.borradoAccion + "'"
                , "'" + acciones[i].rol.idRol + "'", "'" + acciones[i].rol.rolName + "'", "'" + acciones[i].rol.rolDescription + "'", "'" + acciones[i].rol.borradoRol + "'"
                , "'" + acciones[i].funcionalidad.idFuncionalidad + "'", "'" + acciones[i].funcionalidad.nombreFuncionalidad + "'", "'" + acciones[i].funcionalidad.descripFuncionalidad + "'", "'" + acciones[i].funcionalidad.borradoFuncionalidad + "'"];
              if(tienePermiso == "Si"){
    
                accionesDisponibles = accionesDisponibles +  '<td class="accionesPermisos">' + 
                                                                  '<div class="tooltip6">' + 
                                                                    '<img class="permisos darPermiso" src="images/ok2.png" data-toggle="" data-target="" onclick="" alt="Dar permiso" style="cursor: not-allowed;">' + 
                                                                    '<span class="tooltiptext iconDarPermiso DAR_PERMISO">Dar Permiso</span>' + 
                                                                  '</div>' + 
                                                                  '<div class="tooltip6">' + 
                                                                    '<img class="permisos quitarPermiso" src="images/error.png" data-toggle="" data-target="" onclick="desasignarPermiso('+atributosFunc+')" alt="Quitar permiso" style="cursor: pointer;">' + 
                                                                    '<span class="tooltiptext iconQuitarPermiso QUITAR_PERMISO">Quitar Permiso</span>' + 
                                                                  '</div>' + 
                                                                '</td>';
              }else if(tienePermiso == "No"){
                var ac = JSON.stringify(acciones[i]);
                accionesDisponibles = accionesDisponibles + '<td class="accionesPermisos">' + 
                                                                '<div class="tooltip6">' + 
                                                                  '<img class="permisos darPermiso" src="images/ok3.png" data-toggle="" data-target="" onclick="asignarPermiso('+atributosFunc+')" alt="Dar permiso" style="cursor: pointer;">' + 
                                                                  '<span class="tooltiptext iconDarPermiso DAR_PERMISO">Dar Permiso</span>' + 
                                                                '</div>' + 
                                                                '<div class="tooltip6">' + 
                                                                  '<img class="permisos quitarPermiso" src="images/error2.png" data-toggle="" data-target="" onclick="" alt="Quitar permiso" style="cursor: not-allowed;">' + 
                                                                  '<span class="tooltiptext iconQuitarPermiso QUITAR_PERMISO">Quitar Permiso</span>' + 
                                                                '</div>' + 
                                                              '</td>';
              }
           }else if(rol !=classCabecera && classCabecera != 'colFirst'){
              for(var z= 0; z<accionesListas.length; z++){
                if(accion == accionesListas[z]){
                  yaIntroducido = true;
                }else{
                  yaIntroducido = false;
                }   
              }

              if(!yaIntroducido){
                  for(var t = 0; t<acciones.length; t++){
                    tienePermiso = acciones[t].tienePermiso;
                    if(acciones[t].rol.rolName == classCabecera && acciones[t].accion.nombreAccion == acciones[i].accion.nombreAccion){
                       atributosFunc = ["'" + acciones[t].accion.idAccion + "'", "'" + acciones[t].accion.nombreAccion + "'", "'" + acciones[t].accion.descripAccion + "'", "'" + acciones[t].accion.borradoAccion + "'"
                        , "'" + acciones[t].rol.idRol + "'", "'" + acciones[t].rol.rolName + "'", "'" + acciones[t].rol.rolDescription + "'", "'" + acciones[t].rol.borradoRol + "'"
                        , "'" + acciones[t].funcionalidad.idFuncionalidad + "'", "'" + acciones[t].funcionalidad.nombreFuncionalidad + "'", "'" + acciones[t].funcionalidad.descripFuncionalidad + "'", "'" + acciones[t].funcionalidad.borradoFuncionalidad + "'"];
                      if(tienePermiso == "Si"){
                        accionesDisponibles = accionesDisponibles +  '<td class="accionesPermisos">' + 
                                                                      '<div class="tooltip6">' + 
                                                                        '<img class="permisos darPermiso" src="images/ok2.png" data-toggle="" data-target="" onclick="" alt="Dar permiso" style="cursor: not-allowed;">' + 
                                                                        '<span class="tooltiptext iconDarPermiso DAR_PERMISO">Dar Permiso</span>' + 
                                                                      '</div>' + 
                                                                      '<div class="tooltip6">' + 
                                                                        '<img class="permisos quitarPermiso" src="images/error.png" data-toggle="" data-target="" onclick="desasignarPermiso('+  atributosFunc +')" alt="Quitar permiso" style="cursor: pointer;">' + 
                                                                        '<span class="tooltiptext iconQuitarPermiso QUITAR_PERMISO">Quitar Permiso</span>' + 
                                                                      '</div>' + 
                                                                    '</td>';
                     }else if(tienePermiso == "No"){
                    
                      accionesDisponibles = accionesDisponibles + '<td class="accionesPermisos">' + 
                                                                    '<div class="tooltip6">' + 
                                                                      '<img class="permisos darPermiso" src="images/ok3.png" data-toggle="" data-target="" onclick="asignarPermiso('+  atributosFunc +')" alt="Dar permiso" style="cursor: pointer;">' + 
                                                                      '<span class="tooltiptext iconDarPermiso DAR_PERMISO">Dar Permiso</span>' + 
                                                                    '</div>' + 
                                                                    '<div class="tooltip6">' + 
                                                                      '<img class="permisos quitarPermiso" src="images/error2.png" data-toggle="" data-target="" onclick="" alt="Quitar permiso" style="cursor: not-allowed;">' + 
                                                                      '<span class="tooltiptext iconQuitarPermiso QUITAR_PERMISO">Quitar Permiso</span>' + 
                                                                    '</div>' + 
                                                                  '</td>';
                      }
                    }
                  }
                }
              }
           className = classCabecera;
        }

        if(className != 'colFirst'){
          accionesDisponibles = accionesDisponibles + '</tr>';
          $('#cuerpoPermisosGest' + nombreCollapse).append(accionesDisponibles);
          accionesListas.push(acciones[i].accion.nombreAccion);
        }

        }
        
      }

  setLang(getCookie('lang'));

}

async function asignarPermiso(idAccion, nombreAccion, descripAccion, borradoAccion, idRol, rolName, rolDescription, borradoRol, idFuncionalidad, nombreFuncionalidad, descripFuncionalidad, borradoFuncionalidad){
  await asignarPermisoAjaxPromesa(idAccion, nombreAccion, descripAccion, borradoAccion, idRol, rolName, rolDescription, borradoRol, idFuncionalidad, nombreFuncionalidad, descripFuncionalidad, borradoFuncionalidad)
  .then((res) => {
      permisosUsuarios();
      setLang(getCookie('lang'));
  }).catch((res) => {
      respuestaAjaxKO(res.code);
      setLang(getCookie('lang'));
      document.getElementById("modal").style.display = "block";
  });
}

function asignarPermisoAjaxPromesa(idAccion, nombreAccion, descripAccion, borradoAccion, idRol, rolName, rolDescription, borradoRol, idFuncionalidad, nombreFuncionalidad, descripFuncionalidad, borradoFuncionalidad){
  return new Promise(function(resolve, reject) {

    
    var token = getCookie('tokenUsuario');

    var accion = {
      idAccion : idAccion,
      nombreAccion : nombreAccion,
      descripAccion : descripAccion,
      borradoAccion : borradoAccion
    }

    var rol = {
      idRol : idRol,
      rolName : rolName,
      rolDescription : rolDescription,
      borradoRol : borradoRol
    }

    var funcionalidad = {
      idFuncionalidad : idFuncionalidad,
      nombreFuncionalidad : nombreFuncionalidad,
      descripFuncionalidad : descripFuncionalidad,
      borradoFuncionalidad : borradoFuncionalidad
    }
  
    var data = {
      accion : accion,
      rol : rol,
      funcionalidad : funcionalidad,
      usuario : getCookie('usuario')
     
    }
    
    $.ajax({
      method: "POST",
      url: urlPeticionAjarAsignarAccion,
      contentType : "application/json",
      data: JSON.stringify(data),  
      dataType : 'json',
      headers: {'Authorization': token},
      }).done(res => {
        if (res.code != 'ACCION_ASIGNADA') {
          reject(res);
        }
        resolve(res);
      }).fail( function( jqXHR ) {
        errorFailAjax(jqXHR.status);
      });
  });
}

async function desasignarPermiso(idAccion, nombreAccion, descripAccion, borradoAccion, idRol, rolName, rolDescription, borradoRol, idFuncionalidad, nombreFuncionalidad, descripFuncionalidad, borradoFuncionalidad){
  await desasignarPermisoAjaxPromesa(idAccion, nombreAccion, descripAccion, borradoAccion, idRol, rolName, rolDescription, borradoRol, idFuncionalidad, nombreFuncionalidad, descripFuncionalidad, borradoFuncionalidad)
  .then((res) => {
      permisosUsuarios();
      setLang(getCookie('lang'));
  }).catch((res) => {
      respuestaAjaxKO(res.code);
      setLang(getCookie('lang'));
      document.getElementById("modal").style.display = "block";
  });
}

function desasignarPermisoAjaxPromesa(idAccion, nombreAccion, descripAccion, borradoAccion, idRol, rolName, rolDescription, borradoRol, idFuncionalidad, nombreFuncionalidad, descripFuncionalidad, borradoFuncionalidad){
  return new Promise(function(resolve, reject) {
    var token = getCookie('tokenUsuario');

    var rolAccionFuncionalidad = {
      idRol : idRol,
      idAccion: idAccion,
      idFuncionalidad : idFuncionalidad
    }
    
    var data = {
      rolAccionFuncionalidad : rolAccionFuncionalidad,
      usuario : getCookie('usuario')
     
    }
    
    $.ajax({
      method: "POST",
      url: urlPeticionAjarDesasignarAccion,
      contentType : "application/json",
      data: JSON.stringify(data),  
      dataType : 'json',
      headers: {'Authorization': token},
      }).done(res => {
        if (res.code != 'ACCION_REVOCADA') {
          reject(res);
        }
        resolve(res);
      }).fail( function( jqXHR ) {
        errorFailAjax(jqXHR.status);
      });
  });
}

function cargarTablaPermisos(datos){
  $('#tablaDatos').attr('hidden', true);
  $('#permisos').css('display', 'block');
  $('#accordion').html('');
  $('#itemPaginacion').attr('hidden', true);
  $('#paginacion').attr('hidden', true);
  document.getElementById('cabecera').style.display="none";
  document.getElementById('cabeceraEliminados').style.display="block";

  for(var i = 0; i<datos.length; i++){
    if((datos[i].nombreFuncionalidad).includes(" ")){
      var nombre = (datos[i].nombreFuncionalidad).split(" ");
      if((datos[i].nombreFuncionalidad) == "Log de acciones" ){
        var nombreCollapse = nombre[0] + nombre[1] + nombre[2];
      }else if((datos[i].nombreFuncionalidad) == "Gestión de procedimientos ejecutados" || (datos[i].nombreFuncionalidad) == "Gestión de procesos ejecutados"){
        var nombreCollapse = nombre[1] + nombre[2] + nombre[3];
      }else{
        var nombreCollapse = nombre[1] + nombre[2];
      }
    }else{
      var nombreCollapse = datos[i].nombreFuncionalidad;
    }
    
    var permisos = '<div class="card">' + 
                    '<div class="card-header">' + 
                      '<a class="collapsed card-link" data-toggle="collapse" href="#collapseGest' + nombreCollapse +'"onclick="javascript:cargarInfoPermiso(\''+datos[i].nombreFuncionalidad+'\'); cargarCardAbierta(\''+datos[i].nombreFuncionalidad+'\')">' + 
                          datos[i].nombreFuncionalidad + 
                      '</a>' + 
                      '<img class="iconTab" id="iconoTestGest' + nombreCollapse + '" src="images/failed.png" hidden>' +
                    '</div>' + 
                    '<div id="collapseGest' + nombreCollapse +'" class="collapse" data-parent="#accordion">' + 
                      '<div class="card-body" id="testGest' + nombreCollapse + '">' +
                        '<div class="table-responsive">' + 
                           '<table class="table table-bordered" id="tablaGest' + nombreCollapse + '">' + 
                              '<thead class="cabeceraTablasTest" id="cabeceraPermisosGest' + nombreCollapse+ '">' + 
                              '</thead>' + 
                              '<tbody id="cuerpoPermisosGest' + nombreCollapse + '">' + 
                              '<tbody>' + 
                            '</table>' + 
                        '</div>' + 
                      '</div>' + 
                    '</div>' + 
                  '</div>';

    $('#accordion').append(permisos);   
  }

  setLang(getCookie('lang'));
}

/** Función para guardar el card del permiso en el que nos encontramos **/
function cargarCardAbierta(nombreFuncionalidad){
  if((nombreFuncionalidad).includes(" ")){
      var nombre = (nombreFuncionalidad).split(" ");
      if((nombreFuncionalidad) == "Log de acciones"){
         var nombreCollapse = nombre[0] + nombre[1] + nombre[2];
      }else if((nombreFuncionalidad) == "Gestión de procedimientos ejecutados" || (nombreFuncionalidad) == "Gestión de procesos ejecutados"){
         var nombreCollapse = nombre[1] + nombre[2] + nombre[3];
      }else{
        var nombreCollapse = nombre[1] + nombre[2];
      }
    }else{
      var nombreCollapse = nombreFuncionalidad;
    }

    setCookie('cardPermiso', nombreCollapse);
    setCookie('nomFuncPermisos', nombreFuncionalidad);
    setLang(getCookie('lang'));

}
$(document).ready(function() {
  $("#form-modal").on('hidden.bs.modal', function() {
    
    let idElementoErrorList = ["errorFormatoNombreAccion", "errorFormatoDescripcionAccion"];
    
    let idElementoList = ["nombreAccion", "descripcionAccion"];

    limpiarFormulario(idElementoList);
    eliminarMensajesValidacionError(idElementoErrorList, idElementoList);
    setLang(getCookie('lang'));
  });

});