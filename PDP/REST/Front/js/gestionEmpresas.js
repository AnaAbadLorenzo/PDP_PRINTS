/** Habilitar form para añadir empresa **/
$(function() {
  $("input[name=quitarEmpresa]").change(function() {
    if ($(this).val() === "si") {
      $('#labelSelectEmpresa').attr('hidden', true);
      $('#select').attr('hidden', true);
      $('#selectEmpresasDisponibles').attr('hidden', true);
      setLang(getCookie('lang'));
    }else{
      limpiaSelect($('#empresasDisponibles'));
      cargarEmpresasSelect('select')
      $('#labelSelectEmpresa').attr('hidden', false);
      $('#selectEmpresasDisponibles').removeAttr('hidden');
      setLang(getCookie('lang'));
    }
  });
});

async function cargarEmpresasSelect(selector){
  await cargarEmpresasSelectAjaxPromesa()
  .then((res) => {

    limpiaSelect($('#' + selector));
    
    var lista = res.data;

    for(var i = 0; i<lista.length; i++){
      if(lista[i].borradoEmpresa == 0){
        var option = document.createElement("option");
        option.setAttribute("value", lista[i].idEmpresa);
        option.setAttribute("label", lista[i].nombreEmpresa);

        $('#' + selector).append(option);
      }
      
    }

    $('#' + selector).attr('hidden', false);

    setLang(getCookie('lang'));

    }).catch((res) => {
      respuestaAjaxKO(res.code);
      setLang(getCookie('lang'));
      document.getElementById("modal").style.display = "block";
  });
}

/** Función para añadir empresas con ajax y promesas **/
function anadirEmpresaAjaxPromesa(){
  return new Promise(function(resolve, reject) {
    var token = getCookie('tokenUsuario');

     var empresa= {
      idEmpresa : $("input[name=idEmpresa]").val(),
      cifEmpresa : $('#cifEmpresa').val(),
      nombreEmpresa : $('#nombreEmpresa').val(),
      direccionEmpresa : $('#direccionEmpresa').val(),
      telefonoEmpresa : $('#telefonoEmpresa').val(),
      borradoEmpresa : 0
    }

    var data = {
      usuario : getCookie('usuario'),
      empresa : empresa
    }
    
    $.ajax({
      method: "POST",
      url: urlPeticionAjaxAnadirEmpresa,
      contentType : "application/json",
      data: JSON.stringify(data),  
      dataType : 'json',
      headers: {'Authorization': token},
      }).done(res => {
        if (res.code != 'EMPRESA_GUARDADA') {
          reject(res);
        }
        resolve(res);
      }).fail( function( jqXHR ) {
        errorFailAjax(jqXHR.status);
      });
  });
}

/**Funcion para buscar una empresa **/
function buscarEmpresaAjaxPromesa(numeroPagina, tamanhoPagina, accion){
  return new Promise(function(resolve, reject) {
    var rol ="";
    var token = getCookie('tokenUsuario');

     if(accion == "buscarModal"){
      
      var data = {
        
        cifEmpresa : $('#cifEmpresa').val(),
        nombreEmpresa : $('#nombreEmpresa').val(),
        direccionEmpresa : $('#direccionEmpresa').val(),
        telefonoEmpresa : $('#telefonoEmpresa').val(),
        inicio : calculaInicio(numeroPagina, tamanhoPaginaEmpresa),
        tamanhoPagina : tamanhoPaginaEmpresa
      }

         $.ajax({
      method: "POST",
      url: urlPeticionAjaxListarEmpresa,
      contentType : "application/json",
      data: JSON.stringify(data),  
      dataType : 'json',
      headers: {'Authorization': token},
      }).done(res => {
        if (res.code != 'EMPRESA_ENCONTRADA') {
          reject(res);
        }
        resolve(res);
      }).fail( function( jqXHR ) {
        errorFailAjax(jqXHR.status);
      });
    
    }else if(accion == "buscarPaginacion"){
      if(getCookie('cifEmpresa') == null || getCookie('cifEmpresa') == ""){
        var cifEmpresa = "";
      }else{
        var cifEmpresa = getCookie('cifEmpresa');
      }
      
      if(getCookie('nombreEmpresa') == null || getCookie('nombreEmpresa') == ""){
        var nombreEmpresa = "";
      }else{
        var nombreEmpresa = getCookie('nombreEmpresa');
      }

      if(getCookie('direccionEmpresa') == null || getCookie('direccionEmpresa') == ""){
        var direccionEmpresa = "";
      }else{
        var direccionEmpresa = getCookie('nombreEmpresa');
      }

      if(getCookie('telefonoEmpresa') == null || getCookie('telefonoEmpresa') == ""){
        var telefonoEmpresa = "";
      }else{
        var telefonoEmpresa = getCookie('telefonoEmpresa');
      }

      var data = {
          cifEmpresa : cifEmpresa,
          nombreEmpresa : nombreEmpresa,
          direccionEmpresa : direccionEmpresa,
          telefonoEmpresa :telefonoEmpresa,
          inicio : calculaInicio(numeroPagina, tamanhoPaginaEmpresa),
          tamanhoPagina : tamanhoPaginaUsuario
        }

         $.ajax({
      method: "POST",
      url: urlPeticionAjaxListarEmpresa,
      contentType : "application/json",
      data: JSON.stringify(data),  
      dataType : 'json',
      headers: {'Authorization': token},
      }).done(res => {
        if (res.code != 'EMPRESA_ENCONTRADA') {
          reject(res);
        }
        resolve(res);
      }).fail( function( jqXHR ) {
        errorFailAjax(jqXHR.status);
      });
 
    }else if(accion == "buscarInfo"){
       var data = {
      usuario : getCookie('usuario'),
      inicio : 0,
      tamanhoPagina : 1
    }
    
    $.ajax({
      method: "POST",
      url: urlPeticionAjaxListarPersonaPorUsuario,
      contentType : "application/json",
      data: JSON.stringify(data),  
      dataType : 'json',
      headers: {'Authorization': token},
      }).done(res => {
        if (res.code != 'PERSONAS_LISTADAS') {
          reject(res);
        }
        resolve(res);
      }).fail( function( jqXHR ) {
        errorFailAjax(jqXHR.status);
      }); 
    }
    
     });
   
}

/** Función para recuperar los permisos de un usuario sobre la funcionalidad **/
function cargarPermisosFuncEmpresaAjaxPromesa(){
  return new Promise(function(resolve, reject) {
    var nombreUsuario = getCookie('usuario');
    var token = getCookie('tokenUsuario');
    
    var usuario = nombreUsuario;
  
    $.ajax({
      method: "GET",
      url: urlPeticionAjaxAccionesUsuario,
      contentType : "application/json",
      data: { usuario : usuario, funcionalidad : 'Gestión de empresas'},  
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

/**Función para editar una empresa con ajax y promesas*/
function editarEmpresaAjaxPromesa(){
  return new Promise(function(resolve, reject) {
    var token = getCookie('tokenUsuario');

    var empresa= {
      idEmpresa : $("input[name=idEmpresa]").val(),
      cifEmpresa : $('#cifEmpresa').val(),
      nombreEmpresa : $('#nombreEmpresa').val(),
      direccionEmpresa : $('#direccionEmpresa').val(),
      telefonoEmpresa : $('#telefonoEmpresa').val(),
      borradoEmpresa : 0
    }
    
    var data = {
      usuario : getCookie('usuario'),
      empresa : empresa
    }

      $.ajax({
      method: "POST",
      url: urlPeticionAjaxEditarEmpresa,
      contentType : "application/json",
      data: JSON.stringify(data),  
      dataType : 'json',
      headers: {'Authorization': token},
      }).done(res => {
        if (res.code != 'EMPRESA_MODIFICADA') {
          reject(res);
        }
        resolve(res);
      }).fail( function( jqXHR ) {
        errorFailAjax(jqXHR.status);
      });
  });
}

/**Función para eliminar una empresa con ajax y promesas*/
function eliminarEmpresaAjaxPromesa(){
  return new Promise(function(resolve, reject) {
    var token = getCookie('tokenUsuario');

     var empresa= {
      idEmpresa : $("input[name=idEmpresa]").val(),
      cifEmpresa : $('#cifEmpresa').val(),
      nombreEmpresa : $('#nombreEmpresa').val(),
      direccionEmpresa : $('#direccionEmpresa').val(),
      telefonoEmpresa : $('#telefonoEmpresa').val(),
      borradoEmpresa : 1
    }
    
    var data = {
      usuario : getCookie('usuario'),
      empresa : empresa
    }

      $.ajax({
      method: "POST",
      url: urlPeticionAjaxDeleteEmpresa,
      contentType : "application/json",
      data: JSON.stringify(data),  
      dataType : 'json',
      headers: {'Authorization': token},
      }).done(res => {
        if (res.code != 'EMPRESA_ELIMINADA') {
          reject(res);
        }
        resolve(res);
      }).fail( function( jqXHR ) {
        errorFailAjax(jqXHR.status);
      });
  });
}

/*Función que comprueba los permisos del usuario sobre la funcionalidad*/
async function cargarPermisosFuncEmpresa(){
  await cargarPermisosFuncEmpresaAjaxPromesa()
  .then((res) => {
    gestionarPermisosEmpresa(res.data);
    setLang(getCookie('lang'));
  }).catch((res) => {
      respuestaAjaxKO(res.code);
      setLang(getCookie('lang'));
      document.getElementById("modal").style.display = "block";
  });
}


/** Función para recuperar las empresas con ajax y promesas **/
function cargarEmpresasAjaxPromesa(numeroPagina, tamanhoPagina){
  return new Promise(function(resolve, reject) {
  	var token = getCookie('tokenUsuario');

    var data = {
      inicio : calculaInicio(numeroPagina, tamanhoPaginaEmpresa),
      tamanhoPagina : tamanhoPaginaEmpresa
    }
    
    $.ajax({
      method: "POST",
      url: urlPeticionAjaxListarTodasEmpresas,
      contentType : "application/json",
      data: JSON.stringify(data),  
      dataType : 'json',
      headers: {'Authorization': token},
      }).done(res => {
        if (res.code != 'EMPRESAS_LISTADAS') {
          reject(res);
        }
        resolve(res);
      }).fail( function( jqXHR ) {
        errorFailAjax(jqXHR.status);
      });
  });
}

/**Función para cargar las empresas en el select de la modal para asignar o quitar empresa **/
function cargarEmpresasSelectAjaxPromesa(){
  return new Promise(function(resolve, reject) {

    $.ajax({
      method: "GET",
      url: urlPeticionAjaxListadoEmpresas,
      contentType: "application/json",
    }).done(res => {
      if (res.code != 'EMPRESAS_LISTADAS') {
        reject(res);
      }
      resolve(res);
    }).fail( function( jqXHR ) {
        errorFailAjax(jqXHR.status);
      });

  });
}

/**Función para recuperar las empresas eliminadas con ajax y promesas*/
function buscarEliminadosAjaxPromesa(numeroPagina, tamanhoPagina){
  return new Promise(function(resolve, reject) {
    var token = getCookie('tokenUsuario');

    var data = {
      inicio : calculaInicio(numeroPagina, tamanhoPaginaEmpresa),
      tamanhoPagina : tamanhoPaginaEmpresa
    }
    
    $.ajax({
      method: "POST",
      url: urlPeticionAjaxListarEmpresaEliminada,
      contentType : "application/json",
      data: JSON.stringify(data),  
      dataType : 'json',
      headers: {'Authorization': token},
      }).done(res => {
        if (res.code != 'EMPRESAS_LISTADAS_ELIMINADAS') {
          reject(res);
        }
        resolve(res);
      }).fail( function( jqXHR ) {
        errorFailAjax(jqXHR.status);
      });
  });
}

/**Función para ver en detalle una empresa con ajax y promesas*/
function detalleEmpresaAjaxPromesa(){
  return new Promise(function(resolve, reject) {
    var token = getCookie('tokenUsuario');
    
    var data = {
      cifEmpresa : $('#cifEmpresa').val(),
      nombreEmpresa : $('#nombreEmpresa').val(),
      direccionEmpresa : $('#direccionEmpresa').val(),
      telefonoEmpresa : $('#telefonoEmpresa').val(),
      inicio : 0,
      tamanhoPagina : 1
    }

      $.ajax({
      method: "POST",
      url: urlPeticionAjaxListarEmpresa,
      contentType : "application/json",
      data: JSON.stringify(data),  
      dataType : 'json',
      headers: {'Authorization': token},
      }).done(res => {
        if (res.code != 'EMPRESA_ENCONTRADA') {
          reject(res);
        }
        resolve(res);
      }).fail( function( jqXHR ) {
        errorFailAjax(jqXHR.status);
      });
  });
}


/**Función para reactivar una empresa con ajax y promesas*/
function reactivarEmpresasAjaxPromesa(){
  return new Promise(function(resolve, reject) {
    var token = getCookie('tokenUsuario');
    
    var empresa= {
      idEmpresa : $("input[name=idEmpresa]").val(),
      cifEmpresa : $('#cifEmpresa').val(),
      nombreEmpresa : $('#nombreEmpresa').val(),
      direccionEmpresa : $('#direccionEmpresa').val(),
      telefonoEmpresa : $('#telefonoEmpresa').val(),
      borradoEmpresa : 0
    }
  

    var data = {
      usuario: getCookie('usuario'),
      empresa : empresa
    }

      $.ajax({
      method: "POST",
      url: urlPeticionAjaxReactivarEmpresa,
      contentType : "application/json",
      data: JSON.stringify(data),  
      dataType : 'json',
      headers: {'Authorization': token},
      }).done(res => {
        if (res.code != 'EMPRESA_REACTIVADA') {
          reject(res);
        }
        resolve(res);
      }).fail( function( jqXHR ) {
        errorFailAjax(jqXHR.status);
      });
  });
}

/* Función para obtener los usuarios del sistema */
async function cargarEmpresas(numeroPagina, tamanhoPagina, paginadorCreado){
	if(getCookie('rolUsuario') == "usuario" || getCookie('rolUsuario') == "gestor"){
    await buscarEmpresaAjaxPromesa(numeroPagina, tamanhoPaginaEmpresa, "buscarInfo")
    .then((res) => {
    
      $("#cardEmpresa").attr('hidden', false);
      $('#infoAdmin').attr('hidden', true);

      for(var i = 0; i<res.data.listaBusquedas.length; i++){
        if(res.data.listaBusquedas[i].usuario.usuario == getCookie('usuario') || res.data.listaBusquedas[i].usuario.usuario == getCookie('gestor')){
          cargaInformacionEmpresa(res.data.listaBusquedas[i]);
        }
      }
      setLang(getCookie('lang'));

      }).catch((res) => {
          respuestaAjaxKO(res.code);
          setLang(getCookie('lang'));

    });
  }else if(getCookie('rolUsuario') == "admin"){
    await cargarEmpresasAjaxPromesa(numeroPagina, tamanhoPagina)
    .then((res) => {
    
      $("#cardEmpresa").attr('hidden', true);
      $('#infoAdmin').attr('hidden', false);

      var numResults = res.data.numResultados + '';
      var totalResults = res.data.tamanhoTotal + '';
      var inicio = 0;
      if(res.data.listaBusquedas.length == 0){
        inicio = 0;
      }else{
        inicio = parseInt(res.data.inicio)+1;
      }
      var textPaginacion = inicio +  " - " + (parseInt(res.data.inicio)+parseInt(numResults))  + " total " + totalResults; 

      if(res.data.listaBusquedas.length == 0){
        $('#itemPaginacion').attr('hidden',true);
      }else{
        $('#itemPaginacion').attr('hidden',false);
      }

      $("#datosEmpresas").html("");
      $("#checkboxColumnas").html("");
      $("#paginacion").html("");
        
      for (var i = 0; i < res.data.listaBusquedas.length; i++){
          var tr = construyeFila('EMPRESA', res.data.listaBusquedas[i]);
          $("#datosEmpresas").append(tr);
        }
      
      var div = createHideShowColumnsWindow({NOMBRE_EMPRESA_COLUMN:2,DIRECCION_EMPRESA_COLUMN:3,TELEFONO_COLUMN:4});
        $("#checkboxColumnas").append(div);
        $("#paginacion").append(textPaginacion);

        if(paginadorCreado != 'PaginadorCreado'){
          paginador(totalResults, 'cargarEmpresas', 'EMPRESA');
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
        respuestaAjaxKO(res.code);
        document.getElementById("modal").style.display = "block";
    });
  }
}

/** Funcion añadir empresa **/
async function addEmpresa(){
  await anadirEmpresaAjaxPromesa()
  .then((res) => {
    
    $("#form-modal").modal('toggle');
    respuestaAjaxOK("EMPRESA_GUARDADA_OK", res.code);

    let idElementoList = ["cifEmpresa", "nombreEmpresa", "direccionEmpresa", "telefonoEmpresa"];
    resetearFormulario("formularioGenerico", idElementoList);
    document.getElementById("modal").style.display = "block";
    
    $('#cifEmpresa').val(getCookie('cifEmpresa'));
    $('#nombreEmpresa').val(getCookie('nombreEmpresa'));
    $('#direccionEmpresa').val(getCookie('direccionEmpresa'));
    $('#telefonoEmpresa').val(getCookie('telefonoEmpresa'));
    buscarEmpresa(getCookie('numeroPagina'), tamanhoPaginaEmpresa, 'buscarPaginacion', 'PaginadorNo');
    setLang(getCookie('lang'));

  }).catch((res) => {
      $("#form-modal").modal('toggle');

      respuestaAjaxKO(res.code);

      let idElementoList = ["cifEmpresa", "nombreEmpresa", "direccionEmpresa", "telefonoEmpresa"];
      resetearFormulario("formularioGenerico", idElementoList);

      setLang(getCookie('lang'));

      document.getElementById("modal").style.display = "block";
  });
}


/** Funcion buscar empresa **/
async function buscarEmpresa(numeroPagina, tamanhoPagina, accion, paginadorCreado){
  await buscarEmpresaAjaxPromesa(numeroPagina, tamanhoPagina,accion)
  .then((res) => {
      cargarPermisosFuncEmpresa();
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

      $("#datosEmpresas").html("");
      $("#checkboxColumnas").html("");
      $("#paginacion").html("");
        for (var i = 0; i < res.data.listaBusquedas.length; i++){
          var tr = construyeFila('EMPRESA', res.data.listaBusquedas[i]);
          $("#datosEmpresas").append(tr);
        }
      
      var div = createHideShowColumnsWindow({NOMBRE_EMPRESA_COLUMN:2, DIRECCION_EMPRESA_COLUMN:3, TELEFONO_COLUMN: 4});
      
      $("#checkboxColumnas").append(div);
      $("#paginacion").append(textPaginacion);

      if(paginadorCreado != 'PaginadorCreado'){
          paginador(totalResults, 'buscarEmpresa', 'EMPRESA');
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
      cargarPermisosFuncFuncionalidad();
      respuestaAjaxKO(res.code);

      let idElementoList = ["cifEmpresa", "nombreEmpresa", "direccionEmpresa", "telefonoEmpresa"];
      resetearFormulario("formularioGenerico", idElementoList);

      setLang(getCookie('lang'));

      document.getElementById("modal").style.display = "block";
  });
}

/*Función que refresca la tabla por si hay algún cambio en BD */
async function refrescarTabla(numeroPagina, tamanhoPagina){
  await cargarEmpresasAjaxPromesa(numeroPagina, tamanhoPagina)
  .then((res) => {
      cargarPermisosFuncEmpresa();
      setCookie('cifEmpresa', '');
      setCookie('nombreEmpresa', '');
      setCookie('direccionEmpresa', '');
      setCookie('telefonoEmpresa', '');
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
      
      $("#datosEmpresas").html("");
      $("#checkboxColumnas").html("");
      $("#paginacion").html("");
        for (var i = 0; i < res.data.listaBusquedas.length; i++){
          var tr = construyeFila('EMPRESA', res.data.listaBusquedas[i]);
          $("#datosEmpresas").append(tr);
        }
      
      var div = createHideShowColumnsWindow({NOMBRE_EMPRESA_COLUMN:2, DIRECCION_EMPRESA_COLUMN:3, TELEFONO_COLUMN: 4});
      $("#checkboxColumnas").append(div);
      $("#paginacion").append(textPaginacion);

     setCookie('cifEmpresa', '');
      setCookie('nombreEmpresa', '');
      setCookie('direccionEmpresa', '');
      setCookie('telefonoEmpresa', '');

      paginador(totalResults, 'cargarEmpresas', 'EMPRESA');

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

/*Función que busca los eliminados de la tabla de empresa*/
async function buscarEliminados(numeroPagina, tamanhoPagina, paginadorCreado){
  await buscarEliminadosAjaxPromesa(numeroPagina, tamanhoPagina)
  .then((res) => {
      cargarPermisosFuncEmpresa();
      var numResults = res.data.numResultados + '';
      var totalResults = res.data.tamanhoTotal + '';
      var inicio = 0;
      if(res.data.listaBusquedas.length == 0){
        inicio = 0;
        $('#itemPaginacion').attr('hidden', true);
      }else{
        inicio = parseInt(res.data.inicio)+1;
        $('#itemPaginacion').attr('hidden', true);
      }
      var textPaginacion = inicio + " - " + (parseInt(res.data.inicio)+parseInt(numResults))  + " total " + totalResults;

      if(res.data.listaBusquedas.length == 0){
        $('#itemPaginacion').attr('hidden',true);
      }else{
        $('#itemPaginacion').attr('hidden',false);
      }
      
      if(res.data.listaBusquedas.length == 0){
          document.getElementById('cabecera').style.display = "none";
          document.getElementById('cabeceraEliminados').style.display = "block";
      }

      $("#datosEmpresas").html("");
      $("#checkboxColumnas").html("");
      $("#paginacion").html("");
        for (var i = 0; i < res.data.listaBusquedas.length; i++){
          var tr = construyeFilaEliminados('EMPRESA', res.data.listaBusquedas[i]);
          $("#datosEmpresas").append(tr);
        }
      
      var div = createHideShowColumnsWindow({NOMBRE_EMPRESA_COLUMN:2, DIRECCION_EMPRESA_COLUMN:3, TELEFONO_COLUMN: 4});
      $("#checkboxColumnas").append(div);
      $("#paginacion").append(textPaginacion);

      setCookie('cifEmpresa', '');
      setCookie('nombreEmpresa', '');
      setCookie('direccionEmpresa', '');
      setCookie('telefonoEmpresa', '');

      if(paginadorCreado != 'PaginadorCreado'){
         paginador(totalResults, 'buscarEliminadosEmpresa', 'EMPRESA');
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

/** Función que visualiza una empresa **/
async function detalleEmpresa(){
  await detalleEmpresaAjaxPromesa()
  .then((res) => {
    $("#form-modal").modal('toggle');

    let idElementoList = ["cifEmpresa", "nombreEmpresa", "direccionEmpresa", "telefonoEmpresa"];
    resetearFormulario("formularioGenerico", idElementoList);
    $('#cifEmpresa').val(getCookie('cifEmpresa'));
    $('#nombreEmpresa').val(getCookie('nombreEmpresa'));
    $('#direccionEmpresa').val(getCookie('direccionEmpresa'));
    $('#telefonoEmpresa').val(getCookie('telefonoEmpresa'));
    setLang(getCookie('lang'));

  }).catch((res) => {
      $("#form-modal").modal('toggle');

      respuestaAjaxKO(res.code);

     let idElementoList = ["cifEmpresa", "nombreEmpresa", "direccionEmpresa", "telefonoEmpresa"];
     resetearFormulario("formularioGenerico", idElementoList);
      
      setLang(getCookie('lang'));

      document.getElementById("modal").style.display = "block";
  });
}

/** Función que edita una empresa **/
async function editEmpresa(){
  await editarEmpresaAjaxPromesa()
  .then((res) => {
    $("#form-modal").modal('toggle');

    respuestaAjaxOK("EMPRESA_EDITADA_OK", res.code);

    let idElementoList = ["cifEmpresa", "nombreEmpresa", "direccionEmpresa", "telefonoEmpresa"];
    resetearFormulario("formularioGenerico", idElementoList);
    document.getElementById("modal").style.display = "block";
    $('#cifEmpresa').val(getCookie('cifEmpresa'));
    $('#nombreEmpresa').val(getCookie('nombreEmpresa'));
    $('#direccionEmpresa').val(getCookie('direccionEmpresa'));
    $('#telefonoEmpresa').val(getCookie('telefonoEmpresa'));
    buscarEmpresa(getCookie('numeroPagina'), tamanhoPaginaEmpresa, 'buscarPaginacion', 'PaginadorCreado');
    setLang(getCookie('lang'));

  }).catch((res) => {
    $("#form-modal").modal('toggle');

     respuestaAjaxKO(res.code);

     let campos = ["cifEmpresa", "nombreEmpresa", "direccionEmpresa", "telefonoEmpresa"];
     resetearFormulario("formularioGenerico", idElementoList);

     setLang(getCookie('lang'));

     document.getElementById("modal").style.display = "block";


  });
}

/** Función que elimina una empresa **/
async function deleteEmpresa(){
  await eliminarEmpresaAjaxPromesa()
  .then((res) => {
    $("#form-modal").modal('toggle');

    respuestaAjaxOK("EMPRESA_ELIMINADA_OK", res.code);

    let idElementoList = ["cifEmpresa", "nombreEmpresa", "direccionEmpresa", "telefonoEmpresa"];
    resetearFormulario("formularioGenerico", idElementoList);
    document.getElementById("modal").style.display = "block";
   
    refrescarTabla(0, tamanhoPaginaEmpresa);
    setLang(getCookie('lang'));

  }).catch((res) => {
     
     $("#form-modal").modal('toggle');
      respuestaAjaxKO(res.code);

      let campos = ["cifEmpresa", "nombreEmpresa", "direccionEmpresa", "telefonoEmpresa"];
      resetearFormulario("formularioGenerico", campos); 

      setLang(getCookie('lang'));

      document.getElementById("modal").style.display = "block";


  });
}

/*Función que reactiva los eliminados de la tabla de empresas*/
async function reactivarEmpresa(){
  await reactivarEmpresasAjaxPromesa()
  .then((res) => {

    cargarPermisosFuncEmpresa();

    $("#form-modal").modal('toggle');

    respuestaAjaxOK("EMPRESA_REACTIVADA_OK", res.code);

    let idElementoList = ["cifEmpresa", "nombreEmpresa", "direccionEmpresa", "telefonoEmpresa"];
    resetearFormulario("formularioGenerico", idElementoList);    
    document.getElementById("modal").style.display = "block";
      
    buscarEliminados(0, tamanhoPaginaEmpresa, 'PaginadorNo');
    setLang(getCookie('lang'));

    
    }).catch((res) => {
      $("#form-modal").modal('toggle');
      respuestaAjaxKO(res.code);
      let idElementoList = ["cifEmpresa", "nombreEmpresa", "direccionEmpresa", "telefonoEmpresa"];
      resetearFormulario("formularioGenerico", idElementoList);    
      setLang(getCookie('lang'));
      document.getElementById("modal").style.display = "block";
  });
}

function asociarPersonaEmpresaAjaxPromesa(dniPersona){
  return new Promise(function(resolve, reject) {
    var token = getCookie('tokenUsuario');

    var select = $('#modalSeleccionEmpresa #formularioAccionesSelectEmpresa #contenidoFormSelectEmpresa #formularioGenericoModal3 #select').val();

    var quitarEmpresa = $("input[name=quitarEmpresa]:checked").val();

    if(quitarEmpresa == "si"){
      var empresa = null;
    }else{
      var empresa = {
        idEmpresa : select,
        cifEmpresa : "",
        nombreEmpresa : "",
        direccionEmpresa : "",
        telefonoEmpresa : ""
      }
    }

    var persona = {
      dniP : dniPersona,
      nombreP : "",
      apellidosP : "",
      fechaNacP : "",
      direccionP : "",
      telefonoP : "",
      emailP : ""
    }


    var data = {
      usuario : getCookie('usuario'),
      persona : persona,
      empresa : empresa
    }
    
    $.ajax({
      method: "POST",
      url: urlPeticionAjaxAsociarPersonaEmpresa,
      contentType : "application/json",
      data: JSON.stringify(data),  
      dataType : 'json',
      headers: {'Authorization': token},
      }).done(res => {
        if (res.code != 'PERSONA_ASOCIADA_EMPRESA') {
          reject(res);
        }
        resolve(res);
      }).fail( function( jqXHR ) {
        errorFailAjax(jqXHR.status);
      });
  });
}
/** Función que asocia a una persona con una empresa **/
async function asociarPersonaEmpresa(dniPersona){
  await asociarPersonaEmpresaAjaxPromesa(dniPersona)
  .then((res) => {
    $("#modalSeleccionEmpresa").modal('toggle');
    setLang(getCookie('lang'));
    location.reload();
    

  }).catch((res) => {
      $("#modalSeleccionEmpresa").modal('toggle');

      respuestaAjaxKO(res.code);

      let idElementoList = ["dniP", "nombreP", "apellidosP", "fechaNacP", "direccionP", "telefonoP", "emailP", 
        "usuario", "passwdUsuario1", "passwdUsuario2", "cifEmpresa", "nombreEmpresa", "direccionEmpresa", "telefonoEmpresa"];
      let idElementosRadioButtons = ["asociarEmpresaSi", "asociarEmpresaNo", "seleccionarEmpresaSi", "seleccionarEmpresaNo"];
    
      resetearFormulario("formularioGenerico", idElementoList);
      limpiaRadioButton(idElementosRadioButtons);
      
      setLang(getCookie('lang'));

      document.getElementById("modal").style.display = "block";
  });
}


/** Funcion para mostrar el formulario para añadir una empresa **/
function showAddEmpresa() {
  cambiarFormulario('ADD_EMPRESA', 'javascript:addEmpresa();', 'return comprobarAddEmpresa();');
  cambiarOnBlurCampos('return comprobarCIF(\'cifEmpresa\', \'errorFormatoCifEmpresa\', \'cifEmpresaRegistro\')',
      'return comprobarNombreEmpresa(\'nombreEmpresa\', \'errorFormatoNombreEmpresa\', \'nombreEmpresaRegistro\')', 
      'return comprobarDireccion(\'direccionEmpresa\', \'errorFormatoDireccionEmpresa\', \'direccionEmpresaRegistro\')',
      'return comprobarTelefono(\'telefonoEmpresa\', \'errorFormatoTelefonoEmpresa\', \'telefonoEmpresaRegistro\')');
  cambiarIcono('images/add.png', 'ICONO_ADD', 'iconoAddEmpresa', 'Añadir');

  $('#subtitulo').attr('hidden', true);
  $('#labelCifEmpresa').attr('hidden', true);
  $('#labelNombreEmpresa').attr('hidden', true);
  $('#labelDireccionEmpresa').attr('hidden', true);
  $('#labelTelefonoEmpresa').attr('hidden', true);

  let campos = ["cifEmpresa", "nombreEmpresa", "direccionEmpresa", "telefonoEmpresa"];    
  let obligatorios = ["obligatorioCifEmpresa", "obligatorioNombreEmpresa", "obligatorioDireccionEmpresa", "obligatorioTelefonoEmpresa"];
  eliminarReadonly(campos);
  mostrarObligatorios(obligatorios);
  habilitaCampos(campos);
  setLang(getCookie('lang'));

}

/** Funcion para buscar una empresa **/
function showBuscarEmpresa() {
  cambiarFormulario('SEARCH_EMPRESA', 'javascript:buscarEmpresa(0,' + tamanhoPaginaEmpresa + ', \'buscarModal\'' + ',\'PaginadorNo\');', 'return comprobarBuscarEmpresa();');
  cambiarOnBlurCampos('return comprobarCifEmpresaSearch(\'cifEmpresa\', \'errorFormatoCifEmpresa\', \'cifEmpresaRegistro\')',
      'return comprobarNombreEmpresaSearch(\'nombreEmpresa\', \'errorFormatoNombreEmpresa\', \'nombreEmpresaRegistro\')', 
      'return comprobarDireccionSearch(\'direccionEmpresa\', \'errorFormatoDireccionEmpresa\', \'direccionEmpresaRegistro\')',
      'return comprobarTelefonoSearch(\'telefonoEmpresa\', \'errorFormatoTelefonoEmpresa\', \'telefonoEmpresaRegistro\')');
  cambiarIcono('images/search.png', 'ICONO_SEARCH', 'iconoSearchEmpresa', 'Buscar');

  $('#subtitulo').attr('hidden', true);
  $('#labelCifEmpresa').attr('hidden', true);
  $('#labelNombreEmpresa').attr('hidden', true);
  $('#labelDireccionEmpresa').attr('hidden', true);
  $('#labelTelefonoEmpresa').attr('hidden', true);

  let campos = ["cifEmpresa", "nombreEmpresa", "direccionEmpresa", "telefonoEmpresa"];    
  let obligatorios = ["obligatorioCifEmpresa", "obligatorioNombreEmpresa", "obligatorioDireccionEmpresa", "obligatorioTelefonoEmpresa"];
  eliminarReadonly(campos);
  ocultarObligatorios(obligatorios);
  habilitaCampos(campos);
  setLang(getCookie('lang'));
}

/** Funcion para visualizar una empresa **/
function showDetalle(cifEmpresa, nombreEmpresa, direccionEmpresa, telefonoEmpresa) {

    cambiarFormulario('DETAIL_ENTERPRISE', 'javascript:detalleEmpresa();', '');
    cambiarIcono('images/close2.png', 'ICONO_CERRAR', 'iconoCerrar', 'Detalle');
 
    $('#subtitulo').attr('hidden', true);
    $('#labelCifEmpresa').removeAttr('hidden');
    $('#labelNombreEmpresa').removeAttr('hidden');
    $('#labelDireccionEmpresa').removeAttr('hidden');
    $('#labelTelefonoEmpresa').removeAttr('hidden');

    rellenarFormulario(cifEmpresa, nombreEmpresa, direccionEmpresa, telefonoEmpresa);

    let campos = ["cifEmpresa", "nombreEmpresa", "direccionEmpresa", "telefonoEmpresa"];    
    let obligatorios = ["obligatorioCifEmpresa", "obligatorioNombreEmpresa", "obligatorioDireccionEmpresa", "obligatorioTelefonoEmpresa"];
    let formatos = ["formatoCif", "formatoTelef"];
    anadirReadonly(campos);
    ocultarObligatorios(obligatorios);
    deshabilitaCampos(campos);
    ocultaFormatos(formatos);
    setLang(getCookie('lang'));

}

/** Funcion para editar una empresa **/
function showEditar(cifEmpresa, nombreEmpresa , direccionEmpresa, telefonoEmpresa, idEmpresa) {
  var idioma = getCookie('lang');

    cambiarFormulario('EDIT_ENTERPRISE', 'javascript:editEmpresa();', 'return comprobarEditEmpresa();');
    cambiarOnBlurCampos('return comprobarCIF(\'cifEmpresa\', \'errorFormatoCifEmpresa\', \'cifEmpresaRegistro\')',
      'return comprobarNombreEmpresa(\'nombreEmpresa\', \'errorFormatoNombreEmpresa\', \'nombreEmpresaRegistro\')', 
      'return comprobarDireccion(\'direccionEmpresa\', \'errorFormatoDireccionEmpresa\', \'direccionEmpresaRegistro\')',
      'return comprobarTelefono(\'telefonoEmpresa\', \'errorFormatoTelefonoEmpresa\', \'telefonoEmpresaRegistro\')');
    cambiarIcono('images/edit.png', 'ICONO_EDIT', 'iconoEditarEmpresa', 'Editar');
   
    $('#subtitulo').attr('hidden', true);
    $('#labelCifEmpresa').attr('hidden', true);
    $('#labelNombreEmpresa').attr('hidden', true);
    $('#labelDireccionEmpresa').attr('hidden', true);
    $('#labelTelefonoEmpresa').attr('hidden', true);

    rellenarFormulario(cifEmpresa, nombreEmpresa, direccionEmpresa, telefonoEmpresa);
    insertacampo(document.formularioGenerico,'idEmpresa', idEmpresa);

    let campos = ["cifEmpresa", "nombreEmpresa", "direccionEmpresa", "telefonoEmpresa"];    
    let obligatorios = ["obligatorioCifEmpresa", "obligatorioNombreEmpresa", "obligatorioDireccionEmpresa", "obligatorioTelefonoEmpresa"];
    eliminarReadonly(campos);
    mostrarObligatorios(obligatorios);
    habilitaCampos(campos);
    deshabilitaCampos(["cifEmpresa"]);
    anadirReadonly(["cifEmpresa"]);
    setLang(getCookie('lang'));

}

/** Función para eliminar una empresa **/
function showEliminar(cifEmpresa, nombreEmpresa , direccionEmpresa, telefonoEmpresa, idEmpresa) {
  
    cambiarFormulario('DELETE_EMPRESA', 'javascript:deleteEmpresa();', '');
    cambiarIcono('images/delete.png', 'ICONO_ELIMINAR', 'iconoEliminar', 'Eliminar');
   
    $('#labelCifEmpresa').removeAttr('hidden');
    $('#labelNombreEmpresa').removeAttr('hidden');
    $('#labelDireccionEmpresa').removeAttr('hidden');
    $('#labelTelefonoEmpresa').removeAttr('hidden');
    $('#subtitulo').removeAttr('class');
    $('#subtitulo').empty();
    $('#subtitulo').attr('class', 'SEGURO_ELIMINAR_EMPRESA');
    $('#subtitulo').attr('hidden', false);
    
    rellenarFormulario(cifEmpresa, nombreEmpresa , direccionEmpresa, telefonoEmpresa);
    insertacampo(document.formularioGenerico,'idEmpresa', idEmpresa);

    let campos = ["cifEmpresa", "nombreEmpresa", "direccionEmpresa", "telefonoEmpresa"];
    let obligatorios = ["obligatorioCifEmpresa", "obligatorioNombreEmpresa", "obligatorioDireccionEmpresa", "obligatorioTelefonoEmpresa"];
    let formatos = ["formatoCif", "formatoTelef"];
    anadirReadonly(campos);
    ocultarObligatorios(obligatorios);
    deshabilitaCampos(campos);
    ocultaFormatos(formatos);
    setLang(getCookie('lang'));

}

/** Función para reactivar una empresa **/
function showReactivar(cifEmpresa, nombreEmpresa , direccionEmpresa, telefonoEmpresa, idEmpresa) {
    cambiarFormulario('REACTIVATE_ENTERPRISE', 'javascript:reactivarEmpresa();', '');
    cambiarIcono('images/reactivar2.png', 'ICONO_REACTIVAR', 'iconoReactivar', 'Reactivar');
    
    $('#labelCifEmpresa').removeAttr('hidden');
    $('#labelNombreEmpresa').removeAttr('hidden');
    $('#labelDireccionEmpresa').removeAttr('hidden');
    $('#labelTelefonoEmpresa').removeAttr('hidden');
    $('#subtitulo').removeAttr('class');
    $('#subtitulo').empty();
    $('#subtitulo').attr('class', 'SEGURO_REACTIVAR_EMPRESA');
    $('#subtitulo').attr('hidden', false);
    

    rellenarFormulario(cifEmpresa, nombreEmpresa , direccionEmpresa, telefonoEmpresa);
    insertacampo(document.formularioGenerico,'idEmpresa', idEmpresa);

    let campos = ["cifEmpresa", "nombreEmpresa", "direccionEmpresa", "telefonoEmpresa"];
    let obligatorios = ["obligatorioCifEmpresa", "obligatorioNombreEmpresa", "obligatorioDireccionEmpresa", "obligatorioTelefonoEmpresa"];
    let formatos = ["formatoCif", "formatoTelef"];
    anadirReadonly(campos);
    ocultarObligatorios(obligatorios);
    deshabilitaCampos(campos);
    ocultaFormatos(formatos);
    setLang(getCookie('lang'));

}

function showAsociarEmpresaPersona(dniPersona){

    $('#tituloFormsModal3').addClass('SELECT_EMPRESA');
    $('#formularioGenericoModal3').attr('action', 'javascript:asociarPersonaEmpresa(' + "'" + dniPersona + "'" + ');');
    $('#iconoAccionesSelectEmpresas').attr('src', 'images/edit.png');
    $("#iconoAcciones").removeClass();
    $('#iconoAccionesSelectEmpresas').addClass('ICONO_EDIT');
    $('#iconoAccionesSelectEmpresas').addClass('iconoEditarPersona');
    $('#iconoAccionesSelectEmpresas').attr('alt', 'Editar');
    $('#spanAccionesSelectEmpresa').removeClass();
    $('#spanAccionesSelectEmpresa').addClass('tooltiptext');
    $('#spanAccionesSelectEmpresa').addClass('ICONO_EDIT');
    $('#btnAccionesSelectEmpresas').attr('value', 'Editar');

   
    setLang(getCookie('lang'));
}

/**Función para cambiar onBlur de los campos*/
function cambiarOnBlurCampos(onBlurCifEmpresa, onBlurNombreEmpresa, onBlurDireccionEmpresa, onBlurTelefonoEmpresa) {
    
    if (onBlurCifEmpresa != ''){
        $("#cifEmpresa").attr('onblur', onBlurCifEmpresa);
    }

    if (onBlurNombreEmpresa != ''){
        $("#nombreEmpresa").attr('onblur', onBlurNombreEmpresa);
    }

    if (onBlurDireccionEmpresa != ''){
        $("#direccionEmpresa").attr('onblur', onBlurDireccionEmpresa);
    }

    if (onBlurTelefonoEmpresa != ''){
        $("#telefonoEmpresa").attr('onblur', onBlurTelefonoEmpresa);
    }
}

/**Función que rellenado los datos del formulario*/
function rellenarFormulario(cifEmpresa, nombreEmpresa, direccionEmpresa, telefonoEmpresa) {

    $("#cifEmpresa").val(cifEmpresa);
    $("#nombreEmpresa").val(nombreEmpresa); 
    $("#direccionEmpresa").val(direccionEmpresa);
    $("#telefonoEmpresa").val(telefonoEmpresa);

}

/** Función para gestionar los iconos dependiendo de los permisos de los usuarios **/
function gestionarPermisosEmpresa(idElementoList) {
  idElementoList.forEach( function (idElemento) {
    switch(idElemento){
      case "Añadir":
        $('#btnAddEmpresa').attr('src', 'images/add3.png');
        $('#btnAddEmpresa').css("cursor", "pointer");
        $('#divAddEmpresa').attr("data-toggle", "modal");
        $('#divAddEmpresa').attr("data-target", "#form-modal");
      break;

      case "Modificar" : 
        $('.editarPermiso').attr('src', 'images/edit3.png');
        $('.editarPermiso').css("cursor", "pointer");
        $('.editarPermiso').attr("data-toggle", "modal");
        $('.editarPermiso').attr("data-target", "#form-modal");
        $('.editarPermisoEmpresa').attr('src', 'images/edit3.png');
        $('.editarPermisoEmpresa').css("cursor", "pointer");
        $('.editarPermisoEmpresa').attr("data-toggle", "modal");
        $('.editarPermisoEmpresa').attr("data-target", "#modalSeleccionEmpresa");
      break;

      case "Eliminar" :
        $('.eliminarPermiso').attr('src', 'images/delete3.png');
        $('.eliminarPermiso').css("cursor", "pointer");
        $('.eliminarPermiso').attr("data-toggle", "modal");
        $('.eliminarPermiso').attr("data-target", "#form-modal");
      break;

      case 'Listar' :
        $('#btnListarEmpresas').attr('src', 'images/search3.png');
        $('#btnSearchDelete').attr('src', 'images/searchDelete3.png');
        $('#btnListarEmpresas').css("cursor", "pointer");
        $('.iconoSearchDelete').css("cursor", "pointer");
        $('#divSearchDelete').attr("onclick", "javascript:buscarEliminados(0,\'tamanhoPaginaEmpresa\', \'PaginadorNo\')");
        $('#divListarEmpresa').attr("data-toggle", "modal");
        $('#divListarEmpresa').attr("data-target", "#form-modal");

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

/** Funcion para visualizar la información del usuario **/
function cargaInformacionEmpresa(empresa){
 
  if(empresa.empresa == null){
      var nombreEmpresa = " - ";
      var cifEmpresa = " - ";
      var direccionEmpresa = " - ";
      var telefonoEmpresa = " - ";
    }else{
      var nombreEmpresa = empresa.empresa.nombreEmpresa;
      var cifEmpresa = empresa.empresa.cifEmpresa;
      var direccionEmpresa = empresa.empresa.direccionEmpresa;
      var telefonoEmpresa = empresa.empresa.telefonoEmpresa;
    }

    $('#cardEmpresa').html('');

     var cardEm = '<img class="card-img-top" src="images/empresa2.png" alt="Card image">' + 
                '<div class="card-body">' + 
                  '<div class="nombreEInfo">' + 
                    '<img class="nombreEImg" src="images/empresa2.png" alt="nombreE">' + 
                    '<h4 class="card-title nombreE">' + nombreEmpresa + '</h4>' + 
                  '</div>' + 
                  '<div class="cifInfo">' + 
                    '<img class="cifImg" src="images/cif.png" alt="cif">' + 
                    '<p class="card-text cif">' + cifEmpresa + '</p>' + 
                  '</div>' + 
                  '<div class="direccionEInfo">' + 
                    '<img class="direccionEImg" src="images/direccion.png" alt="direccionE">' + 
                    '<p class="card-text direccionE">' + direccionEmpresa + '</p>' + 
                  '</div>' +
                  '<div class="telefonoEInfo">' +
                    '<img class="telefonoEImg" src="images/telefono.png" alt="telefonoE">' + 
                    '<p class="card-text telefonoE">' + telefonoEmpresa + '</p>' +
                  '</div>' + 
                  '<div class="tooltip">' + 
                    '<img class="editarCard editarPermisoEmpresa" src="images/edit.png" data-toggle="" data-target="" onclick="showAsociarEmpresaPersona(' + "'" +  empresa.dniP + "'" + ')" alt="Editar"/>' + 
                    '<span class="tooltiptext iconEditUser ICONO_EDIT">Editar</span>' + 
                  '</div>' + 
                '</div>';


    $('#cardEmpresa').append(cardEm);
    
  setLang(getCookie('lang'));

}

$(document).ready(function() {
  $("#form-modal").on('hidden.bs.modal', function() {
    
    let idElementoErrorList = ["errorFormatoCifEmpresa", "errorFormatoNombreEmpresa", "errorFormatoDireccionEmpresa", "errorFormatoTelefonoEmpresa"];
    
    let idElementoList = ["cifEmpresa", "nombreEmpresa", "direccionEmpresa", "telefonoEmpresa"];

    limpiarFormulario(idElementoList);
    eliminarMensajesValidacionError(idElementoErrorList, idElementoList);
    setLang(getCookie('lang'));
  });

  $("#modalSeleccionEmpresa").on('hidden.bs.modal', function() {

    let idElementosRadioButtons = ["quitarEmpresaSi", "quitarEmpresaNo"];


    limpiarFormulario(idElementoList);
    limpiaRadioButton(idElementosRadioButtons);
    
    $('#labelSelectEmpresa').attr('hidden',true);
    $('#select').attr('hidden',true);

    setLang(getCookie('lang'));
   
  });


});