/**Función para que el usuario pueda iniciar un procedimiento*/
async function iniciarProcedimientoUsuario(identificadorProcedimiento, funcionalidad){
  if(funcionalidad == "volverGuardar"){
     await anadirProcedimientoUsuarioAjaxPromesa(identificadorProcedimiento, "Si")
    .then((res) => {
      window.location.href = "MisProcedimientos.html";
    }).catch((res) => {
          if(res.code == "PROCEDIMIENTO_USUARIO_YA_EXISTE_EXCEPTION"){
            respuestaAjaxContinuarProcedimiento(identificadorProcedimiento);
            document.getElementById("modalContinuarProcedimiento").style.display = "block";
          }else{
            respuestaAjaxKO(res.code);
            document.getElementById("modal").style.display = "block";
          }
          
    });
  }else{
    await anadirProcedimientoUsuarioAjaxPromesa(identificadorProcedimiento, "No")
    .then((res) => {
      window.location.href = "MisProcedimientos.html";
    }).catch((res) => {
          if(res.code == "PROCEDIMIENTO_USUARIO_YA_EXISTE_EXCEPTION"){
            respuestaAjaxContinuarProcedimiento(identificadorProcedimiento);
            document.getElementById("modalContinuarProcedimiento").style.display = "block";
          }else{
            respuestaAjaxKO(res.code);
            document.getElementById("modal").style.display = "block";
          }
          
    });
  }
  
}

/**Función para asociar un procedimiento con un usuario**/
function anadirProcedimientoUsuarioAjaxPromesa(identificadorProcedimiento, volverGuardar){
  return new Promise(function(resolve, reject) {
    var token = getCookie('tokenUsuario');

    var procedimiento = {
      idProcedimiento: identificadorProcedimiento,
      nombreProcedimiento : '',
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
      usuario : getCookie('usuario'),
      passwdUsuario : '',
      borradoUsuario : '',
    }

    var procedimientoUsuario = {
      idProcedimientoUsuario: '',
      puntuacionProcedimientoUsuario : 0,
      fechaProcedimientoUsuario : '',
      borradoProcedimientoUsuario : 0,
      procedimiento : procedimiento,
      usuario : usuario
    }

    var data = {
      usuario : getCookie('usuario'),
      procedimientoUsuario : procedimientoUsuario,
      volverGuardar : volverGuardar
    }

    $.ajax({
      method: "POST",
      url: urlPeticionAjaxAddProcedimientoUsuario,
      contentType : "application/json",
      data: JSON.stringify(data),  
      dataType : 'json',
      headers: {'Authorization': token},
      }).done(res => {
        if (res.code != 'PROCEDIMIENTO_USUARIO_GUARDADO') {
          reject(res);
        }
        resolve(res);
      }).fail( function( jqXHR ) {
        errorFailAjax(jqXHR.status);
      });
  });
}
/** Función para añadir procedimientos con ajax y promesas **/
function anadirProcedimientoAjaxPromesa(){
  return new Promise(function(resolve, reject) {
    var token = getCookie('tokenUsuario');

    var check = $('input[name=checkUsuarioAnadir]:checked').val();
    if(check == "publicado"){
      var checkMarcado = true;
    }else{
      var checkMarcado = false;
    }

    var plan = {
      idPlan : $('#selectPlanes option:selected').val(),
      nombrePlan : "",
      descripPlan : "",
      fechaPlan : "",
      borradoPlan : ""
    }

    var procedimientoEntity = {
      idProcedimiento : "",
      nombreProcedimiento : $('#nombreProcedimiento').val(),
      descripProcedimiento : $('#descripProcedimiento').val(),
      fechaProcedimiento : $('#fechaProcedimiento').val(),
      checkUsuario : checkMarcado,
      plan : plan,
      borradoProcedimiento : 0
    }

    var data = {
      usuario : getCookie('usuario'),
      procedimientoEntity : procedimientoEntity
    }

    $.ajax({
      method: "POST",
      url: urlPeticionAjaxAddProcedimiento,
      contentType : "application/json",
      data: JSON.stringify(data),  
      dataType : 'json',
      headers: {'Authorization': token},
      }).done(res => {
        if (res.code != 'PROCEDIMIENTO_GUARDADO') {
          reject(res);
        }
        resolve(res);
      }).fail( function( jqXHR ) {
        errorFailAjax(jqXHR.status);
      });
  });
}

function cargarProcedimientosSegunPlan(numeroPagina, tamanhoPagina){
  return new Promise(function(resolve, reject) {
    var token = getCookie('tokenUsuario');

      var objetivo = {
      idObjetivo: "",
      nombreObjetivo : '',
      descripObjetivo : '',
      borradoObjetivo : ''
    }

    var plan = {
      idPlan : getCookie('idPlan'),
      nombrePlan : '',
      descripPlan : '',
      fechaPlan : '',
      borradoPlan : '',
      objetivo : objetivo

    }
    var procedimientosPlan = {
      usuario : getCookie('usuario'),
      plan : plan,
      inicio: calculaInicio(numeroPagina, tamanhoPaginaProcedimiento),
      tamanhoPagina : tamanhoPaginaProcedimiento
    }

    $.ajax({
      method: "POST",
      url: urlPeticionAjaxListadoProcedimientosPlan,
      contentType : "application/json",
      data: JSON.stringify(procedimientosPlan),  
      dataType : 'json',
      headers: {'Authorization': token},
      }).done(res => {
        if (res.code != 'PROCEDIMIENTOS_LISTADOS') {
          reject(res);
        }
        resolve(res);
      }).fail( function( jqXHR ) {
        errorFailAjax(jqXHR.status);
      });
  });
}

/** Función para buscar procedimientos con ajax y promesas **/
function buscarProcedimientoAjaxPromesa(numeroPagina, tamanhoPagina, accion){
  return new Promise(function(resolve, reject) {
    var token = getCookie('tokenUsuario');

    if(accion == "buscarModal"){
      var idP = $('#selectPlanes').val();
      if(idP == 0){
        var plan = null;
      }else{
         var plan = {
          idPlan : idP,
          nombrePlan : "",
          descripPlan : "",
          fechaPlan : "",
          objetivo : "",
          borradoPlan : ""
        }
      }

      var check = $('input[name=checkUsuario]:checked').val();
      if(check == "publicado"){
        var checkMarcado = true;
      }else if(check == "noPublicado"){
        var checkMarcado = false;
      }else{
        var checkMarcado = null;
      }

      if($('#fechaProcedimiento').val() == '1900-01-01'){
        var fecha = "";
      }else{
        var fecha = $('#fechaProcedimiento').val();
      }
      var data = {
        nombreProcedimiento : $('#nombreProcedimiento').val(),
        descripProcedimiento : $('#descripProcedimiento').val(),
        fechaProcedimiento : fecha,
        checkUsuario : checkMarcado,
        plan: plan,
        inicio : calculaInicio(numeroPagina, tamanhoPaginaProcedimiento),
        tamanhoPagina : tamanhoPaginaProcedimiento
      }
    }

    if(accion == "buscarPaginacion"){
      if(getCookie('nombreProcedimiento') == null || getCookie('nombreProcedimiento') == ""){
        var nombreP = "";
      }else{
        var nombreP = getCookie('nombreProcedimiento');
      }

      if(getCookie('descripProcedimiento') == null || getCookie('descripProcedimiento') == ""){
        var descripP= "";
      }else{
        var descripP = getCookie('descripProcedimiento');
      }

      if(getCookie('fechaProcedimiento') == null || getCookie('fechaProcedimiento') == "null" || getCookie('fechaProcedimiento') == "" ){
        var fechaP= "";
        var fechaString = "";
      }else{
        var fechaP = getCookie('fechaProcedimiento');
        var fechaString = convierteFecha(fechaP);
      }

      if(getCookie('checkUsuario') == null || getCookie('checkUsuario') == ""){
        var checkMarcado = null;
      }else{
        var checkMarcado = getCookie('checkUsuario');
      }

      if(getCookie('plan') == null || getCookie('plan') == ""){
         var plan = null;
      }else{
        var plan = {
          idPlan : getCookie('plan'),
          nombrePlan : "",
          descripPlan : "",
          fechaPlan : "",
          objetivo : "",
          borradoPlan : ""
        }
      }

      var data = {
        nombreProcedimiento : nombreP,
        descripProcedimiento : descripP,
        fechaProcedimiento : fechaP,
        checkUsuario : checkMarcado,
        plan : plan,
        inicio : calculaInicio(numeroPagina, tamanhoPaginaProcedimiento),
        tamanhoPagina : tamanhoPaginaProcedimiento
      }
    }

    $.ajax({
      method: "POST",
      url: urlPeticionAjaxListarProcedimiento,
      contentType : "application/json",
      data: JSON.stringify(data),  
      dataType : 'json',
      headers: {'Authorization': token},
      }).done(res => {
        if (res.code != 'PROCEDIMIENTO_ENCONTRADO') {
          reject(res);
        }
        resolve(res);
      }).fail( function( jqXHR ) {
        errorFailAjax(jqXHR.status);
      });
  });
}

/** Función para recuperar los permisos de un usuario sobre la funcionalidad **/
function cargarPermisosFuncProcedimientoAjaxPromesa(){
  return new Promise(function(resolve, reject) {
    var nombreUsuario = getCookie('usuario');
    var token = getCookie('tokenUsuario');

    var usuario = nombreUsuario;

    $.ajax({
      method: "GET",
      url: urlPeticionAjaxAccionesUsuario,
      contentType : "application/json",
      data: { usuario : usuario, funcionalidad : 'Gestión de procedimientos'},  
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

/**Función para editar un procedimiento con ajax y promesas*/
function editarProcedimientoAjaxPromesa(){
  return new Promise(function(resolve, reject) {
    var token = getCookie('tokenUsuario');

    var check = $('input[name=checkUsuarioAnadir]:checked').val();
    if(check == "publicado"){
      var checkMarcado = true;
    }else{
      var checkMarcado = false;
    }

    var plan = {
      idPlan : $('#selectPlanes option:selected').val(),
      nombrePlan : "",
      descripPlan : "",
      fechaPlan : "",
      borradoPlan : ""
    }

    var procedimientoEntity = {
      idProcedimiento : $("input[name=idProcedimiento]").val(),
      nombreProcedimiento : $('#nombreProcedimiento').val(),
      descripProcedimiento : $('#descripProcedimiento').val(),
      fechaProcedimiento : $('#fechaProcedimiento').val(),
      checkUsuario : checkMarcado,
      plan : plan,
      borradoProcedimiento : 0
    }

    var data = {
      usuario : getCookie('usuario'),
      procedimientoEntity : procedimientoEntity
    }

      $.ajax({
      method: "POST",
      url: urlPeticionAjaxEditarProcedimiento,
      contentType : "application/json",
      data: JSON.stringify(data),  
      dataType : 'json',
      headers: {'Authorization': token},
      }).done(res => {
        if (res.code != 'PROCEDIMIENTO_MODIFICADO') {
          reject(res);
        }
        resolve(res);
      }).fail( function( jqXHR ) {
        errorFailAjax(jqXHR.status);
      });
  });
}

/**Función para eliminar un procedimiento con ajax y promesas*/
function eliminarProcedimientoAjaxPromesa(){
  return new Promise(function(resolve, reject) {
    var token = getCookie('tokenUsuario');

    var check = $('input[name="checkUsuario]: checked').val();
    if(check == "publicado"){
      var checkMarcado = true;
    }else{
      var checkMarcado = false;
    }

    var procedimientoEntity = {
      idProcedimiento : $("input[name=idProcedimiento]").val(),
      nombreProcedimiento : $('#nombreProcedimiento').val(),
      descripProcedimiento : $('#descripProcedimiento').val(),
      fechaProcedimiento : $('#fechaProcedimiento').val(),
      checkUsuario : checkMarcado,
      borradoProcedimiento : 1
    }

    var data = {
      usuario : getCookie('usuario'),
      procedimientoEntity : procedimientoEntity
    }

      $.ajax({
      method: "POST",
      url: urlPeticionAjaxDeleteProcedimiento,
      contentType : "application/json",
      data: JSON.stringify(data),  
      dataType : 'json',
      headers: {'Authorization': token},
      }).done(res => {
        if (res.code != 'PROCEDIMIENTO_ELIMINADO') {
          reject(res);
        }
        resolve(res);
      }).fail( function( jqXHR ) {
        errorFailAjax(jqXHR.status);
      });
  });
}

/*Función que comprueba los permisos del usuario sobre la funcionalidad*/
async function cargarPermisosFuncProcedimiento(){
  await cargarPermisosFuncProcedimientoAjaxPromesa()
  .then((res) => {
    gestionarPermisosProcedimiento(res.data);
    setLang(getCookie('lang'));
  }).catch((res) => {
      respuestaAjaxKO(res.code);
      setLang(getCookie('lang'));
      document.getElementById("modal").style.display = "block";
  });
}


/** Función para recuperar los planes con ajax y promesas **/
function cargarProcedimientosAjaxPromesa(numeroPagina, tamanhoPagina){
  return new Promise(function(resolve, reject) {
    var token = getCookie('tokenUsuario');

    var data = {
      inicio : calculaInicio(numeroPagina, tamanhoPaginaProcedimiento),
      tamanhoPagina : tamanhoPaginaProcedimiento
    }

    $.ajax({
      method: "POST",
      url: urlPeticionAjaxListadoProcedimientos,
      contentType : "application/json",
      data: JSON.stringify(data),  
      dataType : 'json',
      headers: {'Authorization': token},
      }).done(res => {
        if (res.code != 'PROCEDIMIENTOS_LISTADOS') {
          reject(res);
        }
        resolve(res);
      }).fail( function( jqXHR ) {
        errorFailAjax(jqXHR.status);
      });
  });
}

/**Función para recuperar los procedimientos eliminados con ajax y promesas*/
function buscarEliminadosAjaxPromesa(numeroPagina, tamanhoPagina){
  return new Promise(function(resolve, reject) {
    var token = getCookie('tokenUsuario');

    var data = {
      inicio : calculaInicio(numeroPagina, tamanhoPaginaProcedimiento),
      tamanhoPagina : tamanhoPaginaProcedimiento
    }

    $.ajax({
      method: "POST",
      url: urlPeticionAjaxListarProcedimientosEliminados,
      contentType : "application/json",
      data: JSON.stringify(data),  
      dataType : 'json',
      headers: {'Authorization': token},
      }).done(res => {
        if (res.code != 'PROCEDIMIENTOS_ELIMINADOS_LISTADOS') {
          reject(res);
        }
        resolve(res);
      }).fail( function( jqXHR ) {
        errorFailAjax(jqXHR.status);
      });
  });
}

/**Función para ver en detalle un procedimiento con ajax y promesas*/
function detalleProcedimientoAjaxPromesa(){
  return new Promise(function(resolve, reject) {
    var token = getCookie('tokenUsuario');

    var check = $('input[name="checkUsuario]: checked').val();
    if(check == "publicado"){
      var checkMarcado = true;
    }else{
      var checkMarcado = false;
    }
    var plan = {
      idPlan : $('#selectPlanes option:selected').val(),
      nombrePlan : "",
      descripPlan : "",
      fechaPlan : "",
      borradoPlan : "",
      objetivo : ""
    }

    var data = {
      nombreProcedimiento : $('#nombreProcedimiento').val(),
      descripProcedimiento : $('#descripProcedimiento').val(),
      fechaProcedimiento : $('#fechaProcedimiento').val(),
      checkUsuario : checkMarcado,
      plan : plan,
      inicio : 0,
      tamanhoPagina : 1
    }

      $.ajax({
      method: "POST",
      url: urlPeticionAjaxListarProcedimiento,
      contentType : "application/json",
      data: JSON.stringify(data),  
      dataType : 'json',
      headers: {'Authorization': token},
      }).done(res => {
        if (res.code != 'PROCEDIMIENTO_ENCONTRADO') {
          reject(res);
        }
        resolve(res);
      }).fail( function( jqXHR ) {
        errorFailAjax(jqXHR.status);
      });
  });
}


/**Función para reactivar un procedimiento con ajax y promesas*/
function reactivarProcedimientosAjaxPromesa(){
  return new Promise(function(resolve, reject) {
    var token = getCookie('tokenUsuario');

    var check = $('input[name="checkUsuario]: checked').val();
    if(check == "publicado"){
      var checkMarcado = true;
    }else{
      var checkMarcado = false;
    }

    var procedimientoEntity = {
      idProcedimiento : $("input[name=idProcedimiento]").val(),
      nombreProcedimiento : $('#nombreProcedimiento').val(),
      descripProcedimiento : $('#descripProcedimiento').val(),
      fechaProcedimiento : $('#fechaProcedimiento').val(),
      checkUsuario : checkMarcado,
      borradoProcedimiento : 0
    }

    var data = {
      usuario: getCookie('usuario'),
      procedimientoEntity : procedimientoEntity
    }

      $.ajax({
      method: "POST",
      url: urlPeticionAjaxReactivarProcedimiento,
      contentType : "application/json",
      data: JSON.stringify(data),  
      dataType : 'json',
      headers: {'Authorization': token},
      }).done(res => {
        if (res.code != 'PROCEDIMIENTO_REACTIVADO') {
          reject(res);
        }
        resolve(res);
      }).fail( function( jqXHR ) {
        errorFailAjax(jqXHR.status);
      });
  });
}

/* Función para obtener los procedimientos del sistema */
async function cargarProcedimientos(numeroPagina, tamanhoPagina, paginadorCreado){
  if(getCookie('rolUsuario') == "usuario"){
    await cargarProcedimientosSegunPlan(numeroPagina, tamanhoPagina)
    .then((res) => {
        document.getElementById('procedimientosUsuario').style.display = "block";
        cargarPermisosFuncProcedimiento();
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
        $("#paginacion").append(textPaginacion);

        $('#procedimientos').html('');
        for (var i = 0; i < res.data.listaBusquedas.length; i++){
            var tr = cargarProcedimientosPlan(res.data.listaBusquedas[i]);
            $('#procedimientos').append(tr);
        }

          if(paginadorCreado != 'PaginadorCreado'){
            paginador(totalResults, 'cargarProcedimientosSegunPlan', 'PROCEDIMIENTO');
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
          setLang(getCookie('lang'));
          document.getElementById("modal").style.display = "block";
      });
  
  }else if(getCookie('rolUsuario') == "admin" || getCookie('rolUsuario') == "gestor"){
    await cargarProcedimientosAjaxPromesa(numeroPagina, tamanhoPagina)
      .then((res) => {
        cargarPermisosFuncProcedimiento();
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

        $("#datosProcedimiento").html("");
        $("#checkboxColumnas").html("");
        $("#paginacion").html("");

        for (var i = 0; i < res.data.listaBusquedas.length; i++){
            var tr = construyeFila('PROCEDIMIENTO', res.data.listaBusquedas[i]);
            $("#datosProcedimiento").append(tr);
          }

          var div = createHideShowColumnsWindow({DESCRIPCION_PROCEDIMIENTO_COLUMN:2, DATE_COLUMN:3, CHECK_USUARIO_COLUMN: 4, NOMBRE_PLAN_COLUMN:5});
          $("#checkboxColumnas").append(div);
          $("#paginacion").append(textPaginacion);

          if(paginadorCreado != 'PaginadorCreado'){
            paginador(totalResults, 'cargarProcedimientos', 'PROCEDIMIENTO');
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
          setLang(getCookie('lang'));
          document.getElementById("modal").style.display = "block";
      });
    }
}
/** Funcion añadir procedimiento **/
async function addProcedimiento(){
  await anadirProcedimientoAjaxPromesa()
  .then((res) => {

    $("#form-modal").modal('toggle');
    respuestaAjaxOK("PROCEDIMIENTO_GUARDADO_OK", res.code);

    let idElementoList = ["nombreProcedimiento", "descripProcedimiento", "fechaProcedimiento", "checkUsuarioPublicar", "checkUsuarioNoPublicar", "selectPlanes", "descripPlan"];
    resetearFormulario("formularioGenerico", idElementoList);
    document.getElementById("modal").style.display = "block";

    $('#nombreProcedimiento').val(getCookie('nombreProcedimiento'));
    $('#descripProcedimiento').val(getCookie('descripProcedimiento'));
    $('#fechaProcedimiento').val(getCookie('fechaProcedimiento'));
    $('#checkUsuario').val(getCookie('checkUsuario'));
    $('#plan').val(getCookie('plan'));
    buscarProcedimiento(getCookie('numeroPagina'), tamanhoPaginaProcedimiento, 'buscarPaginacion', 'PaginadorNo');
    setLang(getCookie('lang'));

  }).catch((res) => {
      $("#form-modal").modal('toggle');

      respuestaAjaxKO(res.code);

      let idElementoList = ["nombreProcedimiento", "descripProcedimiento", "fechaProcedimiento", "checkUsuarioPublicar", "checkUsuarioNoPublicar", "selectPlanes", "descripPlan"];
      resetearFormulario("formularioGenerico", idElementoList);

      setLang(getCookie('lang'));

      document.getElementById("modal").style.display = "block";
  });
}


/** Funcion buscar procedimiento **/
async function buscarProcedimiento(numeroPagina, tamanhoPagina, accion, paginadorCreado){
  await buscarProcedimientoAjaxPromesa(numeroPagina, tamanhoPagina,accion)
  .then((res) => {
      $('#paginacion').html('');
      cargarPermisosFuncProcedimiento();
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

      if(getCookie('rolUsuario') == "admin" || getCookie('rolUsuario') == "gestor"){
        $("#datosProcedimiento").html("");
        $("#checkboxColumnas").html("");
        $("#paginacion").html("");
        for (var i = 0; i < res.data.listaBusquedas.length; i++){
          var tr = construyeFila('PROCEDIMIENTO', res.data.listaBusquedas[i]);
          $("#datosProcedimiento").append(tr);
        }

        var div = createHideShowColumnsWindow({DESCRIPCION_PROCEDIMIENTO_COLUMN:2, DATE_COLUMN:3, CHECK_USUARIO_COLUMN: 4, NOMBRE_PLAN_COLUMN:5});
        $("#checkboxColumnas").append(div);
      
      }else{
        $('#procedimientos').html('');
        for (var i = 0; i < res.data.listaBusquedas.length; i++){
              var tr = cargarProcedimientosPlan(res.data.listaBusquedas[i]);
              $("#procedimientos").append(tr);
          }
      }

      $("#paginacion").append(textPaginacion);
      if(paginadorCreado != 'PaginadorCreado'){
          paginador(totalResults, 'buscarProcedimiento', 'PROCEDIMIENTO');
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
      cargarPermisosFuncProcedimiento();
      respuestaAjaxKO(res.code);

      let idElementoList = ["nombreProcedimiento", "descripProcedimiento", "fechaProcedimiento", "checkUsuarioPublicar", "checkUsuarioNoPublicar", "selectPlanes", "descripPlan"];
      resetearFormulario("formularioGenerico", idElementoList);

      setLang(getCookie('lang'));

      document.getElementById("modal").style.display = "block";
  });
}

/*Función que refresca la tabla por si hay algún cambio en BD */
async function refrescarTabla(numeroPagina, tamanhoPagina){
  if(getCookie('rolUsuario') == "admin" || getCookie('rolUsuario') == "gestor"){
    await cargarProcedimientosAjaxPromesa(numeroPagina, tamanhoPagina)
    .then((res) => {
        cargarPermisosFuncProcedimiento();
        setCookie('nombreProcedimiento', '');
        setCookie('descripProcedimiento', '');
        setCookie('fechaProcedimiento', '');
        setCookie('checkUsuario', '');
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

        $("#datosProcedimiento").html("");
        $("#checkboxColumnas").html("");
        $("#paginacion").html("");
          for (var i = 0; i < res.data.listaBusquedas.length; i++){
            var tr = construyeFila('PROCEDIMIENTO', res.data.listaBusquedas[i]);
            $("#datosProcedimiento").append(tr);
          }

        var div = createHideShowColumnsWindow({DESCRIPCION_PROCEDIMIENTO_COLUMN:2, DATE_COLUMN:3, CHECK_USUARIO_COLUMN: 4, NOMBRE_PLAN_COLUMN:5});
        $("#checkboxColumnas").append(div);
        $("#paginacion").append(textPaginacion);
        setCookie('nombreProcedimiento', '');
        setCookie('descripProcedimiento', '');
        setCookie('fechaProcedimiento', '');
        setCookie('checkUsuario', '');

        paginador(totalResults, 'cargarProcedimientos', 'PROCEDIMIENTO');

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
  }else if(getCookie('rolUsuario') == "usuario"){
   await cargarProcedimientosSegunPlan(numeroPagina, tamanhoPagina)
    .then((res) => {
        document.getElementById('procedimientosUsuario').style.display = "block";
        cargarPermisosFuncProcedimiento();
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
            var tr = cargarProcedimientosPlan(res.data.listaBusquedas[i]);
            $('#procedimientos').append(tr);
        }
          
          paginador(totalResults, 'cargarProcedimientosSegunPlan', 'PROCEDIMIENTO');

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
          setLang(getCookie('lang'));
          document.getElementById("modal").style.display = "block";
      });
  }
  
}

/*Función que busca los eliminados de la tabla de procedimiento*/
async function buscarEliminados(numeroPagina, tamanhoPagina, paginadorCreado){
  await buscarEliminadosAjaxPromesa(numeroPagina, tamanhoPagina)
  .then((res) => {
      cargarPermisosFuncProcedimiento();
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

      if(res.data.listaBusquedas.length == 0){
          document.getElementById('cabecera').style.display="none";
          document.getElementById('cabeceraEliminados').style.display="block";
      }

      $("#datosProcedimiento").html("");
      $("#checkboxColumnas").html("");
      $("#paginacion").html("");
        for (var i = 0; i < res.data.listaBusquedas.length; i++){
          var tr = construyeFilaEliminados('PROCEDIMIENTO', res.data.listaBusquedas[i]);
          $("#datosProcedimiento").append(tr);
        }

      var div = createHideShowColumnsWindow({DESCRIPCION_PROCEDIMIENTO_COLUMN:2, DATE_COLUMN:3, CHECK_USUARIO_COLUMN: 4, NOMBRE_PLAN_COLUMN:5});
      $("#checkboxColumnas").append(div);
      $("#paginacion").append(textPaginacion);

      setCookie('nombreProcedimiento', '');
      setCookie('descripProcedimiento', '');
      setCookie('fechaProcedimiento', '');
      setCookie('checkUsuario', '');

      if(paginadorCreado != 'PaginadorCreado'){
         paginador(totalResults, 'buscarEliminadosProcedimiento', 'PROCEDIMIENTO');
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

/**Función para cerrar la modal de detalle de procedimiento*/
function detalleProcedimientoCerrarModal(){
    $("#form-modal").modal('toggle');

    let idElementoList = ["nombreProcedimiento", "descripProcedimiento", "fechaProcedimiento", "checkUsuarioPublicar", "checkUsuarioNoPublicar", "selectPlanes", "descripPlan"];

    resetearFormulario("formularioGenerico", idElementoList);
    $('#nombreProcedimiento').val(getCookie('nombreProcedimiento'));
    $('#descripProcedimiento').val(getCookie('descripProcedimiento'));
    $('#fechaProcedimiento').val(getCookie('fechaProcedimiento'));
    $('#checkUsuario').val(getCookie('checkUsuario'));

    setLang(getCookie('lang'));
}

/** Función que visualiza un procedimiento**/
async function detalleProcedimiento(){
  await detalleProcedimientoAjaxPromesa()
  .then((res) => {
    $("#form-modal").modal('toggle');

    let idElementoList = ["nombreProcedimiento", "descripProcedimiento", "fechaProcedimiento", "checkUsuarioPublicar", "checkUsuarioNoPublicar", "selectPlanes", "descripPlan"];
    
    resetearFormulario("formularioGenerico", idElementoList)
    $('#nombreProcedimiento').val(getCookie('nombreProcedimiento'));
    $('#descripProcedimiento').val(getCookie('descripProcedimiento'));
    $('#fechaProcedimiento').val(getCookie('fechaProcedimiento'));
    $('#checkUsuario').val(getCookie('checkUsuario'));

    setLang(getCookie('lang'));
  
  }).catch((res) => {
      $("#form-modal").modal('toggle');

      respuestaAjaxKO(res.code);

      let idElementoList = ["nombreProcedimiento", "descripProcedimiento", "fechaProcedimiento", "checkUsuarioPublicar", "checkUsuarioNoPublicar", "selectPlanes", "descripPlan"];
      resetearFormulario("formularioGenerico", idElementoList);

      setLang(getCookie('lang'));

      document.getElementById("modal").style.display = "block";
  });
}

/** Función que edita un procedimiento **/
async function editProcedimiento(){
  await editarProcedimientoAjaxPromesa()
  .then((res) => {
    $("#form-modal").modal('toggle');

    respuestaAjaxOK("PROCEDIMIENTO_EDITADO_OK", res.code);

    let idElementoList = ["nombreProcedimiento", "descripProcedimiento", "fechaProcedimiento", "checkUsuarioPublicar", "checkUsuarioNoPublicar", "selectPlanes", "descripPlan"];
    resetearFormulario("formularioGenerico", idElementoList);
    document.getElementById("modal").style.display = "block";
    $('#nombreProcedimiento').val(getCookie('nombreProcedimiento'));
    $('#descripProcedimiento').val(getCookie('descripProcedimiento'));
    $('#fechaProcedimiento').val(getCookie('fechaProcedimiento'));
    $('#checkUsuario').val(getCookie('checkUsuario'));
    buscarProcedimiento(getCookie('numeroPagina'), tamanhoPaginaProcedimiento, 'buscarPaginacion', 'PaginadorCreado');
    setLang(getCookie('lang'));

  }).catch((res) => {
    $("#form-modal").modal('toggle');

     respuestaAjaxKO(res.code);

    let idElementoList = ["nombreProcedimiento", "descripProcedimiento", "fechaProcedimiento", "checkUsuarioPublicar", "checkUsuarioNoPublicar", "selectPlanes", "descripPlan"];
    resetearFormulario("formularioGenerico", idElementoList);

    setLang(getCookie('lang'));

    document.getElementById("modal").style.display = "block";


  });
}

/** Función que elimina un procedimiento **/
async function deleteProcedimiento(){
  await eliminarProcedimientoAjaxPromesa()
  .then((res) => {
    $("#form-modal").modal('toggle');

    respuestaAjaxOK("PROCEDIMIENTO_ELIMINADO_OK", res.code);

    let idElementoList = ["nombreProcedimiento", "descripProcedimiento", "fechaProcedimiento", "checkUsuarioPublicar", "checkUsuarioNoPublicar", "selectPlanes", "descripPlan"];
    resetearFormulario("formularioGenerico", idElementoList);
    setLang(getCookie('lang'));
    document.getElementById("modal").style.display = "block";

    refrescarTabla(0, tamanhoPaginaPlan);

  }).catch((res) => {

     $("#form-modal").modal('toggle');
      respuestaAjaxKO(res.code);

      let idElementoList = ["nombreProcedimiento", "descripProcedimiento", "fechaProcedimiento", "checkUsuarioPublicar", "checkUsuarioNoPublicar", "selectPlanes", "descripPlan"];
      resetearFormulario("formularioGenerico", idElementoList);

      setLang(getCookie('lang'));

      document.getElementById("modal").style.display = "block";
  });
}

/*Función que reactiva los eliminados de la tabla de procedimiento*/
async function reactivarProcedimiento(){
  await reactivarProcedimientosAjaxPromesa()
  .then((res) => {

    cargarPermisosFuncProcedimiento();
    $("#form-modal").modal('toggle');

    let idElementoList = ["nombreProcedimiento", "descripProcedimiento", "fechaProcedimiento", "checkUsuarioPublicar", "checkUsuarioNoPublicar", "selectPlanes", "descripPlan"];
    resetearFormulario("formularioGenerico", idElementoList);

    respuestaAjaxOK("PROCEDIMIENTO_REACTIVADO_OK", res.code);

    setLang(getCookie('lang'));
    document.getElementById("modal").style.display = "block";

    buscarEliminados(0, tamanhoPaginaProcedimiento, 'PaginadorNo');

    }).catch((res) => {

      $("#form-modal").modal('toggle');
      let idElementoList = ["nombrePlan", "descripPlan", "fechaPlan", "checkUsuarioPublicar", "checkUsuarioNoPublicar", "selectObjetivos", "descripcionObjetivo"];
      resetearFormulario("formularioGenerico", idElementoList);
      respuestaAjaxKO(res.code);
      setLang(getCookie('lang'));
      document.getElementById("modal").style.display = "block";
  });
}

/** Funcion para mostrar el formulario para añadir un procedimiento **/
function showAddProcedimientos() {
  cambiarFormulario('ADD_PROCEDIMIENTO', 'javascript:addProcedimiento();', 'return comprobarAddProcedimiento();');
  cambiarOnBlurCampos('return comprobarNombreProcedimiento(\'nombreProcedimiento\', \'errorFormatoNombreProcedimiento\', \'nombreProcedimiento\')', 
      'return comprobarDescripcionProcedimiento(\'descripProcedimiento\', \'errorFormatoDescripcionProcedimiento\', \'descripProcedimiento\')',
      'return comprobarFechaProcedimiento(\'fechaProcedimiento\', \'errorFormatoFechaProcedimiento\', \'fechaProcedimiento\')',
      'return comprobarSelect(\'selectPlanes\', \'errorFormatoNombrePlanSelect\', \'selectPlanesOptions\')');
  cambiarIcono('images/add.png', 'ICONO_ADD', 'iconoAddPlan', 'Añadir');

  $('#subtitulo').attr('hidden', true);
  $('#labelNombreProcedimiento').attr('hidden', true);
  $('#labelDescripcionProcedimiento').attr('hidden', true);
  $('#labelFechaProcedimiento').attr('hidden', true);
  $('#labelDescripcionPlan').attr('hidden', true);
  $('#descripPlan').attr('hidden', true);
  $('#noEspecificadoCheckAnadir').attr('hidden', true);
  document.getElementById('checkUsuarioAnadir').style.display = "block";
  document.getElementById('checkUsuario').style.display = "none";
 

  let idElementoList = ["nombreProcedimiento", "descripProcedimiento", "fechaProcedimiento", "checkUsuarioPublicar", "checkUsuarioNoPublicar", "selectPlanes", "descripPlan"];
  let obligatorios =  ["obligatorioNombreProcedimiento", "obligatorioDescripcionProcedimiento", "obligatorioFechaProcedimiento", "obligatorioCheckAnadir", "obligatorioPlanes"];
  
  eliminarReadonly(idElementoList);
  mostrarObligatorios(obligatorios);
  ocultarObligatorios(["obligatorioCheck"]);
  habilitaCampos(idElementoList);
  setLang(getCookie('lang'));

}

/** Funcion para buscar un plan **/
function showBuscarProcedimiento() {

  cambiarFormulario('SEARCH_PROCEDIMIENTO', 'javascript:buscarProcedimiento(0,' + tamanhoPaginaProcedimiento + ', \'buscarModal\'' + ',\'PaginadorNo\');', 'return comprobarBuscarProcedimiento();');
  cambiarOnBlurCampos('return comprobarNombreProcedimientoSearch(\'nombreProcedimiento\', \'errorFormatoNombreProcedimiento\', \'nombreProcedimiento\')', 
      'return comprobarDescripcionProcedimientoSearch(\'descripProcedimiento\', \'errorFormatoDescripcionProcedimiento\', \'descripProcedimiento\')',
      'return comprobarFechaProcedimientoSearch(\'fechaProcedimiento\', \'errorFormatoFechaProcedimiento\', \'fechaProcedimiento\')');
  cambiarIcono('images/search.png', 'ICONO_SEARCH', 'iconoSearchPlan', 'Buscar');

  $('#labelNombreProcedimiento').attr('hidden', true);
  $('#labelDescripcionProcedimiento').attr('hidden', true);
  $('#labelFechaProcedimiento').attr('hidden', true);
  $('#labelNombrePlan').attr('hidden', true);
  $('#selectPlanes').attr('hidden', false);
  $('#labelDescripcionPlan').attr('hidden', true);
  $('#descripPlan').attr('hidden', true);
  $('#subtitulo').attr('hidden', true);
  $('#noEspecificadoCheck').attr('hidden', false);
  document.getElementById('checkUsuarioAnadir').style.display = "none";
  document.getElementById('checkUsuario').style.display = "block";

  let idElementoList = ["nombreProcedimiento", "descripProcedimiento", "fechaProcedimiento", "checkUsuarioPublicar", "checkUsuarioNoPublicar", "selectPlanes", "descripPlan"];
  let obligatorios = ["obligatorioNombreProcedimiento", "obligatorioDescripcionProcedimiento", "obligatorioFechaProcedimiento", "obligatorioCheck", "obligatorioCheckAnadir", "obligatorioPlanes", "obligatorioDescripPlan"];
  
  eliminarReadonly(idElementoList);
  ocultarObligatorios(obligatorios);
  habilitaCampos(idElementoList);
  setLang(getCookie('lang'));

}

/** Funcion para visualizar un procedimiento **/
function showDetalle(nombreProcedimiento, descripProcedimiento , fechaProcedimiento, checkUsuario, nombrePlan, descripcionPlan) {


    cambiarFormulario('DETAIL_PROCEDIMIENTO', 'javascript:detalleProcedimientoCerrarModal();', '');
    cambiarIcono('images/close2.png', 'ICONO_CERRAR', 'iconoCerrar', 'Detalle');

    $('#labelNombreProcedimiento').removeAttr('hidden');
    $('#labelDescripcionProcedimiento').removeAttr('hidden');
    $('#labelFechaProcedimiento').removeAttr('hidden');
    $('#labelNombrePlan').removeAttr('hidden');
    $('#labelDescripcionPlan').removeAttr('hidden');
    $('#descripPlan').removeAttr('hidden');
    $('#subtitulo').attr('hidden', true);
    $('#noEspecificadoCheck').attr('hidden', true);
    document.getElementById('checkUsuarioAnadir').style.display = "none";
    document.getElementById('checkUsuario').style.display = "block";

    rellenarFormulario(nombreProcedimiento, descripProcedimiento , fechaProcedimiento, checkUsuario, nombrePlan, descripcionPlan, "detalle");

    let idElementoList = ["nombreProcedimiento", "descripProcedimiento", "fechaProcedimiento", "checkUsuarioPublicar", "checkUsuarioNoPublicar", "selectPlanes", "descripPlan"];
    let obligatorios =  ["obligatorioNombreProcedimiento", "obligatorioDescripcionProcedimiento", "obligatorioFechaProcedimiento", "obligatorioCheck", "obligatorioPlanes", "obligatorioDescripPlan"];

    anadirReadonly(idElementoList);
    ocultarObligatorios(obligatorios);
    deshabilitaCampos(idElementoList);
    setLang(getCookie('lang'));

}

/** Funcion para editar un procedimiento **/
function showEditar(nombreProcedimiento, descripProcedimiento , fechaProcedimiento, checkUsuario, nombrePlan, descripcionPlan, idProcedimiento) {

    cambiarFormulario('EDIT_PROCEDIMIENTO', 'javascript:editProcedimiento();', 'return comprobarEditProcedimiento();');
    cambiarOnBlurCampos('return comprobarNombreProcedimiento(\'nombreProcedimiento\', \'errorFormatoNombreProcedimiento\', \'nombreProcedimiento\')', 
      'return comprobarDescripcionProcedimiento(\'descripProcedimiento\', \'errorFormatoDescripcionProcedimiento\', \'descripProcedimiento\')',
      'return comprobarFechaProcedimiento(\'fechaProcedimiento\', \'errorFormatoFechaProcedimiento\', \'fechaProcedimiento\')',
      'return comprobarSelect(\'selectPlanes\', \'errorFormatoNombrePlanSelect\', \'selectPlanesOptions\')');
    cambiarIcono('images/edit.png', 'ICONO_EDIT', 'iconoEditarProcedimiento', 'Editar');

    $('#subtitulo').attr('hidden', true);
    $('#labelNombreProcedimiento').attr('hidden', true);
    $('#labelDescripcionProcedimiento').attr('hidden', true);
    $('#labelFechaProcedimiento').attr('hidden', true);
    $('#labelDescripcionPlan').attr('hidden', true);
    $('#selectPlanes').attr('hidden', false);
    $('#descripPlan').attr('hidden', true);
    $('#noEspecificadoCheckAnadir').attr('hidden', true);
    document.getElementById('checkUsuarioAnadir').style.display = "block";
    document.getElementById('checkUsuario').style.display = "none";

    rellenarFormulario(nombreProcedimiento, descripProcedimiento , fechaProcedimiento, checkUsuario, nombrePlan, descripcionPlan, "editar");
    insertacampo(document.formularioGenerico,'idProcedimiento', idProcedimiento);

    let idElementoList = ["nombreProcedimiento", "descripProcedimiento", "fechaProcedimiento", "checkUsuarioPublicar", "checkUsuarioNoPublicar","selectPlanes", "descripPlan"];
    let obligatorios =  ["obligatorioNombreProcedimiento", "obligatorioDescripcionProcedimiento", "obligatorioFechaProcedimiento", "obligatorioCheckPublicado", "obligatorioCheckNoPulicado", "obligatorioPlanes", "obligatorioDescripPlan"];

    eliminarReadonly(idElementoList);
    mostrarObligatorios(obligatorios);
    habilitaCampos(idElementoList);
    deshabilitaCampos(["nombreProcedimiento"]);
    anadirReadonly(["nombreProcedimiento"]);
    setLang(getCookie('lang'));

}

/** Función para eliminar un procedimiento **/
function showEliminar(nombreProcedimiento, descripProcedimiento , fechaProcedimiento, checkUsuario, nombrePlan, descripcionPlan, idProcedimiento) {

    cambiarFormulario('DELETE_PROCEDIMIENTO', 'javascript:deleteProcedimiento();', '');
    cambiarIcono('images/delete.png', 'ICONO_ELIMINAR', 'iconoEliminar', 'Eliminar');

    $('#labelNombreProcedimiento').removeAttr('hidden');
    $('#labelDescripcionProcedimiento').removeAttr('hidden');
    $('#labelFechaProcedimiento').removeAttr('hidden');
    $('#labelNombrePlan').removeAttr('hidden');
    $('#labelDescripcionPlan').attr('hidden', true);
    $('#subtitulo').removeAttr('class');
    $('#subtitulo').empty();
    $('#subtitulo').attr('class', 'SEGURO_ELIMINAR_PROCEDIMIENTO');
    $('#subtitulo').attr('hidden', false);
    $('#noEspecificadoCheck').attr('hidden', true);
    document.getElementById('checkUsuarioAnadir').style.display = "none";
    document.getElementById('checkUsuario').style.display = "block";

    rellenarFormulario(nombreProcedimiento, descripProcedimiento , fechaProcedimiento, checkUsuario, nombrePlan, descripcionPlan, idProcedimiento, "eliminar");
    insertacampo(document.formularioGenerico,'idProcedimiento', idProcedimiento);

    let idElementoList = ["nombreProcedimiento", "descripProcedimiento", "fechaProcedimiento", "checkUsuarioPublicar", "checkUsuarioNoPublicar","selectPlanes", "descripPlan"];
    let obligatorios = ["obligatorioNombreProcedimiento", "obligatorioDescripcionProcedimiento", "obligatorioFechaProcedimiento", "obligatorioCheckPublicado", "obligatorioCheckNoPulicado", "obligatorioPlanes", "obligatorioDescripPlan"];
    anadirReadonly(idElementoList);
    ocultarObligatorios(obligatorios);
    deshabilitaCampos(idElementoList);
    setLang(getCookie('lang'));

}

/** Función para reactivar un procedimiento **/
function showReactivar(nombreProcedimiento, descripProcedimiento , fechaProcedimiento, checkUsuario, nombrePlan, descripcionPlan, idProcedimiento) {

    cambiarFormulario('REACTIVATE_PROCEDIMIENTO', 'javascript:reactivarProcedimiento();', '');
    cambiarIcono('images/reactivar2.png', 'ICONO_REACTIVAR', 'iconoReactivar', 'Reactivar');

    $('#labelNombreProcedimiento').removeAttr('hidden');
    $('#labelDescripcionProcedimiento').removeAttr('hidden');
    $('#labelFechaProcedimiento').removeAttr('hidden');
    $('#labelNombrePlan').removeAttr('hidden');
    $('#labelDescripcionPlan').attr('hidden', true);
    $('#subtitulo').removeAttr('class');
    $('#subtitulo').empty();
    $('#subtitulo').attr('class', 'SEGURO_REACTIVAR_PROCEDIMIENTO');
    $('#subtitulo').attr('hidden', false);
    $('#noEspecificadoCheck').attr('hidden', true);
    document.getElementById('checkUsuarioAnadir').style.display = "none";
    document.getElementById('checkUsuario').style.display = "block";


    rellenarFormulario(nombreProcedimiento, descripProcedimiento , fechaProcedimiento, checkUsuario, nombrePlan, descripcionPlan, idProcedimiento, "reactivar");
    insertacampo(document.formularioGenerico,'idProcedimiento', idProcedimiento);

    let idElementoList = ["nombreProcedimiento", "descripProcedimiento", "fechaProcedimiento", "checkUsuarioPublicar", "checkUsuarioNoPublicar","selectPlanes", "descripPlan"];
    let obligatorios =  ["obligatorioNombreProcedimiento", "obligatorioDescripcionProcedimiento", "obligatorioFechaProcedimiento", "obligatorioCheckPublicado", "obligatorioCheckNoPulicado", "obligatorioPlanes", "obligatorioDescripPlan"];
    anadirReadonly(idElementoList);
    ocultarObligatorios(obligatorios);
    deshabilitaCampos(idElementoList);
    setLang(getCookie('lang'));

}

/**Función para cambiar onBlur de los campos*/
function cambiarOnBlurCampos(onBlurNombreProcedimiento, onBlurDescripProcedimiento, onBlurFechaProcedimiento, onBlurSelect) {

    if (onBlurNombreProcedimiento != ''){
        $("#nombreProcedimiento").attr('onblur', onBlurNombreProcedimiento);
    }

    if (onBlurDescripProcedimiento != ''){
        $("#descripProcedimiento").attr('onblur', onBlurDescripProcedimiento);
    }

    if (onBlurFechaProcedimiento != ''){
        $("#fechaProcedimiento").attr('onblur', onBlurFechaProcedimiento);
    }

    if (onBlurSelect != ''){
        $("#selectPlanes").attr('onblur', onBlurSelect);
    }
}

/**Función que rellenado los datos del formulario*/
function rellenarFormulario(nombreProcedimiento, descripProcedimiento, fechaProcedimiento, checkUsuario, nombrePlan, descripPlan, accion) {

    $("#nombreProcedimiento").val(nombreProcedimiento);
    $("#descripProcedimiento").val(descripProcedimiento); 
    var fecha = fechaProcedimiento.split('-');
    var fech = fecha[2] + "-" + fecha[1] + "-" + fecha[0]; 
    $('#fechaProcedimiento').val(fech);

    var options = document.getElementById('selectPlanes').options;

    for(var i = 0; i<options.length; i++){
      var text = options[i].text;
      if(options[i].text == nombrePlan){
        options[i].selected = true;
      }else{

        options[i].selected = false;
      }
    }

    if(accion == "editar"){
      if(checkUsuario == "Publicado"){
        $('#checkUsuarioPublicarAnadir').attr('checked', true);
        }else{
        $('#checkUsuarioNoPublicarAnadir').attr('checked', true);
      }
    }else{
      if(checkUsuario == "Publicado"){
        $('#checkUsuarioPublicar').attr('checked', true);
      }else{
        $('#checkUsuarioNoPublicar').attr('checked', true);
      }
    }

    
    $('#descripPlan').val(descripPlan);
    setLang(getCookie('lang'));

}


/** Función para gestionar los iconos dependiendo de los permisos de los usuarios **/
function gestionarPermisosProcedimiento(idElementoList) {
  document.getElementById('cabecera').style.display = "none";
  document.getElementById('tablaDatos').style.display = "none";
  document.getElementById('filasTabla').style.display = "none";
  

  idElementoList.forEach( function (idElemento) {
    switch(idElemento){
      case "Añadir":
        $('#btnAddProcedimiento').attr('src', 'images/add3.png');
        $('#btnAddProcedimiento').css("cursor", "pointer");
        $('#divAddProcedimiento').attr("data-toggle", "modal");
        $('#divAddProcedimiento').attr("data-target", "#form-modal");
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
        $('#btnListarProcedimientos').attr('src', 'images/search3.png');
        $('#btnSearchDelete').attr('src', 'images/searchDelete3.png');
        $('#btnListarProcedimientos').css("cursor", "pointer");
        $('.iconoSearchDelete').css("cursor", "pointer");
        $('#divSearchDelete').attr("onclick", "javascript:buscarEliminados(0,\'tamanhoPaginaProcedimiento\', \'PaginadorNo\')");
        $('#divListarProcedimiento').attr("data-toggle", "modal");
        $('#divListarProcedimiento').attr("data-target", "#form-modal");
        if(getCookie('rolUsuario') == "admin" || getCookie('rolUsuario') == "gestor"){
          document.getElementById('cabecera').style.display = "block";
          document.getElementById('cabeceraUsuario').style.display = "none";
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
        
        }else{
          document.getElementById('cabecera').style.display = "none";
          document.getElementById('cabeceraUsuario').style.display = "block";
          document.getElementById('procedimientosUsuario').style.display = "block";
          document.getElementById('filasTabla').style.display = "block";
          $('#itemPaginacion').attr('hidden', false);
          $('#btnListarProcedimientosUsuario').attr('src', 'images/search3.png');
          $('#btnListarProcedimientosUsuario').css("cursor", "pointer");
          $('.iconoSearchDelete').css("cursor", "pointer");
          $('#divListarProcedimientoUsuario').attr("data-toggle", "modal");
          $('#divListarProcedimientoUsuario').attr("data-target", "#form-modal");
          $('#btnListarProcedimientos').attr('src', 'images/search.png');
           var texto = document.getElementById('paginacion').innerHTML;
           if(texto == "0 - 0 total 0"){
            $('#itemPaginacion').attr('hidden', true);
            $('#btnListarProcedimientosUsuario').attr('src', 'images/search.png');
           }

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

/** Función para construír el select **/
async function construyeSelectPlanes(){
  await listarPlanesAjaxPromesa()
  .then((res) => {
     var options = "";
  
    $('#selectPlanes').html('');

    var token = getCookie('tokenUsuario');

        options = '<option selected value=0><label class="OPCION_DEFECTO_PLAN">Selecciona el Plan</label></option>';
        for(var i = 0; i< res.data.length ; i++){
          options += '<option value=' + res.data[i].idPlan + '>' + res.data[i].nombrePlan + '</option>';
        }

        $('#selectPlanes').append(options);
        setLang(getCookie('lang'));

  }).catch((res) => {
     respuestaAjaxKO(res.code);
     setLang(getCookie('lang'));
  });
}

function listarPlanesAjaxPromesa(){
  return new Promise(function(resolve, reject) {
    var token = getCookie('tokenUsuario');

    $.ajax({
      method: "GET",
      url: urlPeticionAjaxListadoPlanesSinP,
      contentType : "application/json",
      dataType : 'json',
      headers: {'Authorization': token},
      }).done(res => {
        if (res.code != 'PLANES_LISTADOS') {
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

function cargarProcedimientosPlan(procedimiento){

  var atributosFunciones = ["'" + procedimiento.plan.nombrePlan + "'", "'" + procedimiento.plan.descripPlan + "'"]; 

  var procedimientos= '<div class="col-md-12 col-lg-12 col-xl-12 mb-12 paddingTop">' + 
                        '<div class="card">' + 
                          '<div class="card-body-plan">' + 
                            '<div class="card-title">' + procedimiento.nombreProcedimiento + '</div>' + 
                            '<div class="card-text">' + procedimiento.descripProcedimiento + '</div>' +
                            '<div id="iniciarProcedimiento" class="tooltip13 procedimientoIcon">' +
                              '<img id="iconoIniciarProcedimiento" class="iconoProcedimiento iconProcedimiento" src="images/iniciarProcedimiento.png" alt="Iniciar procedimiento" onclick="iniciarProcedimientoUsuario(' + procedimiento.idProcedimiento + ', \'primero\')"/>' +
                              '<span class="tooltiptext iconProcedimiento ICON_INICIAR_PROCEDIMIENTO"></span>' + 
                            '</div>' + 
                          '</div>'+
                          '<div class="card-footer">' + 
                            '<div class="tooltip8 planIcon">' + 
                              '<img class="iconoPlan iconPlan" src="images/plan.png" alt="Plan" data-toggle="modal" data-target="#modalMostrarPlan" onclick="showPlan(' + atributosFunciones + ')"/>' + 
                              '<span class="tooltiptext iconPlan ICON_PLAN"></span>' + 
                            '</div>' + 
                          '<div class="card-title-plan">Plan: ' + procedimiento.plan.nombrePlan + '</div>' + 
                        '</div>' +
                      '</div>' + 
                    '</div>';

  $('#procedimientos').append(procedimientos);

  setLang(getCookie('lang'));


}

$(document).ready(function() {
  $("#form-modal").on('hidden.bs.modal', function() {

    let idElementoErrorList = ["errorFormatoNombreProcedimiento", "errorFormatoDescripcionProcedimiento", "errorFormatoFechaProcedimiento", "errorFormatoNombrePlanSelect"];

    let idElementoList = ["nombreProcedimiento", "descripProcedimiento", "fechaProcedimiento", "checkUsuarioPublicar", "checkUsuarioNoPublicar", "selectPlanes", "descripPlan"];

    limpiarFormulario(idElementoList);
    eliminarMensajesValidacionError(idElementoErrorList, idElementoList);
    setLang(getCookie('lang'));
    resetearFormulario("formularioGenerico", idElementoList);
  });

}); 

