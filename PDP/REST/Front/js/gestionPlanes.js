/** Función para añadir planes con ajax y promesas **/
function anadirPlanAjaxPromesa(){
  return new Promise(function(resolve, reject) {
    var token = getCookie('tokenUsuario');

    var objetivo = {
      idObjetivo : $('#selectObjetivos option:selected').val(),
      nombreObjetivo : "",
      descripObjetivo : "",
      borradoObjetivo : ""
    }

    var plan = {
      idPlan: "",
      nombrePlan : $('#nombrePlan').val(),
      descripPlan : $('#descripPlan').val(),
      fechaPlan : $('#fechaPlan').val(),
      borradoPlan : 0,
      objetivo : objetivo
    }

    var data = {
      usuario : getCookie('usuario'),
      plan : plan
    }

    $.ajax({
      method: "POST",
      url: urlPeticionAjaxAddPlan,
      contentType : "application/json",
      data: JSON.stringify(data),  
      dataType : 'json',
      headers: {'Authorization': token},
      }).done(res => {
        if (res.code != 'PLAN_GUARDADO') {
          reject(res);
        }
        resolve(res);
      }).fail( function( jqXHR ) {
        errorFailAjax(jqXHR.status);
      });
  });
}

/** Función para buscar planes con ajax y promesas **/
function buscarPlanAjaxPromesa(numeroPagina, tamanhoPagina, accion){
  return new Promise(function(resolve, reject) {
    var token = getCookie('tokenUsuario');

    if(accion == "buscarModal"){
      var idObj = $('#selectObjetivos option:selected').val();
      if(idObj == 0){
        var objetivo = null;
      }else{
         var objetivo = {
          idObjetivo : idObj,
          nombreObjetivo : "",
          descripObjetivo : "",
          borradoObjetivo : ""
        }
      }

      if($('#fechaPlan').val() == '1900-01-01'){
        var fecha = "";
      }else{
        var fecha = $('#fechaPlan').val();
      }
      var data = {
        nombrePlan : $('#nombrePlan').val(),
        descripPlan : $('#descripPlan').val(),
        fechaPlan : fecha,
        objetivo : objetivo,
        inicio : calculaInicio(numeroPagina, tamanhoPaginaPlan),
        tamanhoPagina : tamanhoPaginaPlan
      }
    }

    if(accion == "buscarPaginacion"){
      if(getCookie('nombrePlan') == null || getCookie('nombrePlan') == ""){
        var nombreP = "";
      }else{
        var nombreP = getCookie('nombrePlan');
      }

      if(getCookie('descripPlan') == null || getCookie('descripPlan') == ""){
        var descripP= "";
      }else{
        var descripP = getCookie('descripPlan');
      }

      if(getCookie('fechaPlan') == null || getCookie('fechaPlan') == "null" || getCookie('fechaPlan') == "" ){
        var fechaP= "";
        var fechaString = "";
      }else{
        var fechaP = getCookie('fechaPlan');
        var fechaString = convierteFechaGuion(fechaP);
      }

      if(getCookie('objetivo') == null || getCookie('objetivo') == ""){
         var objetivo = null;
      }else{
        var objetivo = {
          idObjetivo : getCookie('objetivo'),
          nombreObjetivo : "",
          descripObjetivo : "",
          borradoObjetivo : ""
        }
      }

      var data = {
        nombrePlan : nombreP,
        descripPlan : descripP,
        fechaPlan : fechaP,
        objetivo : objetivo,
        inicio : calculaInicio(numeroPagina, tamanhoPaginaPlan),
        tamanhoPagina : tamanhoPaginaPlan
      }
    }

    $.ajax({
      method: "POST",
      url: urlPeticionAjaxListarPlan,
      contentType : "application/json",
      data: JSON.stringify(data),  
      dataType : 'json',
      headers: {'Authorization': token},
      }).done(res => {
        if (res.code != 'PLAN_ENCONTRADO') {
          reject(res);
        }
        resolve(res);
      }).fail( function( jqXHR ) {
        errorFailAjax(jqXHR.status);
      });
  });
}

/** Función para recuperar los permisos de un usuario sobre la funcionalidad **/
function cargarPermisosFuncPlanAjaxPromesa(){
  return new Promise(function(resolve, reject) {
    var nombreUsuario = getCookie('usuario');
    var token = getCookie('tokenUsuario');

    var usuario = nombreUsuario;

    $.ajax({
      method: "GET",
      url: urlPeticionAjaxAccionesUsuario,
      contentType : "application/json",
      data: { usuario : usuario, funcionalidad : 'Gestión de planes'},  
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

/**Función para editar un plan con ajax y promesas*/
function editarPlanAjaxPromesa(){
  return new Promise(function(resolve, reject) {
    var token = getCookie('tokenUsuario');

    var objetivo = {
      idObjetivo : $('#selectObjetivos option:selected').val(),
      nombrePlan : "",
      descripPlan : "",
      fechaPlan : "",
      borradoPlan : ""
    }

    var plan = {
      idPlan : $("input[name=idPlan]").val(),
      nombrePlan : $('#nombrePlan').val(),
      descripPlan : $('#descripPlan').val(),
      fechaPlan : $('#fechaPlan').val(),
      borradoPlan : 0,
      objetivo : objetivo
    }

    var data = {
      usuario : getCookie('usuario'),
      plan : plan
    }

      $.ajax({
      method: "POST",
      url: urlPeticionAjaxEditarPlan,
      contentType : "application/json",
      data: JSON.stringify(data),  
      dataType : 'json',
      headers: {'Authorization': token},
      }).done(res => {
        if (res.code != 'PLAN_MODIFICADO') {
          reject(res);
        }
        resolve(res);
      }).fail( function( jqXHR ) {
        errorFailAjax(jqXHR.status);
      });
  });
}

/**Función para eliminar un plan con ajax y promesas*/
function eliminarPlanAjaxPromesa(){
  return new Promise(function(resolve, reject) {
    var token = getCookie('tokenUsuario');

    var plan = {
      idPlan : $("input[name=idPlan]").val(),
      nombrePlan : $('#nombrePlan').val(),
      descripPlan : $('#descripPlan').val(),
      fechaPlan : $('#fechaPlan').val(),
      borradoPlan : 1
    }

    var data = {
      usuario : getCookie('usuario'),
      plan : plan
    }

      $.ajax({
      method: "POST",
      url: urlPeticionAjaxDeletePlan,
      contentType : "application/json",
      data: JSON.stringify(data),  
      dataType : 'json',
      headers: {'Authorization': token},
      }).done(res => {
        if (res.code != 'PLAN_ELIMINADO') {
          reject(res);
        }
        resolve(res);
      }).fail( function( jqXHR ) {
        errorFailAjax(jqXHR.status);
      });
  });
}

/*Función que comprueba los permisos del usuario sobre la funcionalidad*/
async function cargarPermisosFuncPlan(){
  await cargarPermisosFuncPlanAjaxPromesa()
  .then((res) => {
    gestionarPermisosPlan(res.data);
  }).catch((res) => {
      respuestaAjaxKO(res.code);
      setLang(getCookie('lang'));
      document.getElementById("modal").style.display = "block";
  });
}


/** Función para recuperar los planes con ajax y promesas **/
function cargarPlanesAjaxPromesa(numeroPagina, tamanhoPagina){
  return new Promise(function(resolve, reject) {
    var token = getCookie('tokenUsuario');

    var data = {
      inicio : calculaInicio(numeroPagina, tamanhoPaginaPlan),
      tamanhoPagina : tamanhoPaginaPlan
    }

    $.ajax({
      method: "POST",
      url: urlPeticionAjaxListadoPlanes,
      contentType : "application/json",
      data: JSON.stringify(data),  
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

/**Función para recuperar los planes eliminados con ajax y promesas*/
function buscarEliminadosAjaxPromesa(numeroPagina, tamanhoPagina){
  return new Promise(function(resolve, reject) {
    var token = getCookie('tokenUsuario');

    var data = {
      inicio : calculaInicio(numeroPagina, tamanhoPaginaPlan),
      tamanhoPagina : tamanhoPaginaPlan
    }

    $.ajax({
      method: "POST",
      url: urlPeticionAjaxListarPlanesEliminados,
      contentType : "application/json",
      data: JSON.stringify(data),  
      dataType : 'json',
      headers: {'Authorization': token},
      }).done(res => {
        if (res.code != 'PLANES_ELIMINADOS_LISTADOS') {
          reject(res);
        }
        resolve(res);
      }).fail( function( jqXHR ) {
        errorFailAjax(jqXHR.status);
      });
  });
}

/**Función para ver en detalle un plan con ajax y promesas*/
function detallePlanAjaxPromesa(){
  return new Promise(function(resolve, reject) {
    var token = getCookie('tokenUsuario');

    var objetivo = {
      idObjetivo : $('#selectObjetivos option:selected').val(),
      nombreObjetivo : "",
      descripObjetivo : "",
      borradoObjetivo : ""
    }

    var data = {
      nombrePlan : $('#nombrePlan').val(),
      descripPlan : $('#descripPlan').val(),
      fechaPlan : $('#fechaPlan').val(),
      objetivo : objetivo, 
      inicio : 0,
      tamanhoPagina : 1
    }

      $.ajax({
      method: "POST",
      url: urlPeticionAjaxListarPlan,
      contentType : "application/json",
      data: JSON.stringify(data),  
      dataType : 'json',
      headers: {'Authorization': token},
      }).done(res => {
        if (res.code != 'PLAN_ENCONTRADO') {
          reject(res);
        }
        resolve(res);
      }).fail( function( jqXHR ) {
        errorFailAjax(jqXHR.status);
      });
  });
}


/**Función para reactivar un plan con ajax y promesas*/
function reactivarPlanesAjaxPromesa(){
  return new Promise(function(resolve, reject) {
    var token = getCookie('tokenUsuario');

    var plan = {
      idPlan : $("input[name=idPlan]").val(),
      nombrePlan : $('#nombrePlan').val(),
      descripPlan : $('#descripPlan').val(),
      fechaPlan : $('#fechaPlan').val(),
      borradoPlan : 0
    }

    var data = {
      usuario: getCookie('usuario'),
      plan : plan
    }

      $.ajax({
      method: "POST",
      url: urlPeticionAjaxReactivarPlan,
      contentType : "application/json",
      data: JSON.stringify(data),  
      dataType : 'json',
      headers: {'Authorization': token},
      }).done(res => {
        if (res.code != 'PLAN_REACTIVADO') {
          reject(res);
        }
        resolve(res);
      }).fail( function( jqXHR ) {
        errorFailAjax(jqXHR.status);
      });
  });
}

/* Función para obtener los planes del sistema */
async function cargarPlanes(numeroPagina, tamanhoPagina, paginadorCreado){
  if(getCookie('rolUsuario') == "usuario"){
    await cargarPlanesAjaxPromesa(numeroPagina, tamanhoPagina)
        .then((res) => {
          document.getElementById('listaPlanes').style.display = "block";
          document.getElementById('tablaDatos').style.display = "none"; 
          cargarPermisosFuncPlan();
          $('#planes').html('');
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

          $("#paginacion").html("");

          for (var i = 0; i < res.data.listaBusquedas.length; i++){
              var tr = construyePlanUsuario(res.data.listaBusquedas[i]);
              $("#planes").append(tr);
          }
        
          $("#paginacion").append(textPaginacion);
          setLang(getCookie('lang'));

            if(paginadorCreado != 'PaginadorCreado'){
              paginador(totalResults, 'cargarPlanesUsuario', 'PLAN');
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
            respuestaAjaxKO(res.code);
            document.getElementById("modal").style.display = "block";
        });

  }else if(getCookie('rolUsuario') == "admin" || getCookie('rolUsuario') == "gestor"){
    await cargarPlanesAjaxPromesa(numeroPagina, tamanhoPagina)
      .then((res) => {
        document.getElementById('listaPlanes').style.display = "none";
        document.getElementById('tablaDatos').style.display = "block"; 
        cargarPermisosFuncPlan();
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

        $("#datosPlan").html("");
        $("#checkboxColumnas").html("");
        $("#paginacion").html("");

        for (var i = 0; i < res.data.listaBusquedas.length; i++){
            var tr = construyeFila('PLAN', res.data.listaBusquedas[i]);
            $("#datosPlan").append(tr);
          }

          var div = createHideShowColumnsWindow({DESCRIPCION_PLAN_COLUMN:2, DATE_COLUMN:3, NOMBRE_OBJETIVO_COLUMN:4});
          $("#checkboxColumnas").append(div);
          $("#paginacion").append(textPaginacion);
          setLang(getCookie('lang'));

          if(paginadorCreado != 'PaginadorCreado'){
            paginador(totalResults, 'cargarPlanes', 'PLAN');
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
          respuestaAjaxKO(res.code);
          document.getElementById("modal").style.display = "block";
      });
    }
}

/**Funcion para cargar los planes ne vista de usuario **/
async function cargarPlanesUsuario(numeroPagina, tamanhoPagina, paginadorCreado){
  await cargarPlanesAjaxPromesa(numeroPagina, tamanhoPagina)
        .then((res) => {
          document.getElementById('cabecera').style.display = "none";
          document.getElementById('cabeceraConsultaPlanes').style.display = "block";
          cargarPermisosFuncPlan();
          $('#planes').html('');
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

          $("#paginacion").html("");

          for (var i = 0; i < res.data.listaBusquedas.length; i++){
              var tr = construyePlanUsuario(res.data.listaBusquedas[i]);
              $("#planes").append(tr);
          }
        
          $("#paginacion").append(textPaginacion);
          setLang(getCookie('lang'));

            if(paginadorCreado != 'PaginadorCreado'){
              paginador(totalResults, 'cargarPlanesUsuario', 'PLAN');
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
            respuestaAjaxKO(res.code);
            document.getElementById("modal").style.display = "block";
        });
    }


/** Funcion añadir plan **/
async function addPlan(){
  await anadirPlanAjaxPromesa()
  .then((res) => {

    $("#form-modal").modal('toggle');
    respuestaAjaxOK("PLAN_GUARDADO_OK", res.code);

    let idElementoList = ["nombrePlan", "descripPlan", "fechaPlan", "selectObjetivos", "descripcionObjetivo"];
    resetearFormulario("formularioGenerico", idElementoList);
    setLang(getCookie('lang'));
    document.getElementById("modal").style.display = "block";

    $('#nombrePlan').val(getCookie('nombrePlan'));
    $('#descripPlan').val(getCookie('descripPlan'));
    $('#fechaPlan').val(getCookie('fechaPlan'));
    $('#objetivo').val(getCookie('objetivo'));
    buscarPlan(getCookie('numeroPagina'), tamanhoPaginaPlan, 'buscarPaginacion', 'PaginadorNo');

  }).catch((res) => {
      $("#form-modal").modal('toggle');

      respuestaAjaxKO(res.code);

      let idElementoList = ["nombrePlan", "descripPlan", "fechaPlan", "selectObjetivos", "descripcionObjetivo"];
      resetearFormulario("formularioGenerico", idElementoList);

      setLang(getCookie('lang'));

      document.getElementById("modal").style.display = "block";
  });
}


/** Funcion buscar plan **/
async function buscarPlan(numeroPagina, tamanhoPagina, accion, paginadorCreado){
  await buscarPlanAjaxPromesa(numeroPagina, tamanhoPagina,accion)
  .then((res) => {
      $('#paginacion').html('');
      cargarPermisosFuncPlan();
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
        $("#datosPlan").html("");
        $("#checkboxColumnas").html("");
        $("#paginacion").html("");
        for (var i = 0; i < res.data.listaBusquedas.length; i++){
          var tr = construyeFila('PLAN', res.data.listaBusquedas[i]);
          $("#datosPlan").append(tr);
        }

        var div = createHideShowColumnsWindow({DESCRIPCION_PLAN_COLUMN:2, DATE_COLUMN:3, NOMBRE_OBJETIVO_COLUMN:4});

        $("#checkboxColumnas").append(div);
      
      }else{
        $('#planes').html('');
        for (var i = 0; i < res.data.listaBusquedas.length; i++){
              var tr = construyePlanUsuario(res.data.listaBusquedas[i]);
              $("#planes").append(tr);
          }
      }

      setLang(getCookie('lang'));
      $("#paginacion").append(textPaginacion);
      if(paginadorCreado != 'PaginadorCreado'){
          paginador(totalResults, 'buscarPlan', 'PLAN');
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
      cargarPermisosFuncPlan();
      respuestaAjaxKO(res.code);

      let idElementoList = ["nombrePlan", "descripPlan", "fechaPlan", "selectObjetivos", "descripcionObjetivo"];
      resetearFormulario("formularioGenerico", idElementoList);

      setLang(getCookie('lang'));

      document.getElementById("modal").style.display = "block";
  });
}

/*Función que refresca la tabla por si hay algún cambio en BD */
async function refrescarTabla(numeroPagina, tamanhoPagina){
  if(getCookie('rolUsuario') == "admin" || getCookie('rolUsuario') == "gestor"){
    await cargarPlanesAjaxPromesa(numeroPagina, tamanhoPagina)
    .then((res) => {
        document.getElementById('cabecera').style.display = "block";
        document.getElementById('cabeceraConsultaPlanes').style.display = "none";
        cargarPermisosFuncPlan();
        setCookie('nombrePlan', '');
        setCookie('descripPlan', '');
        setCookie('fechaPlan', '');
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

        $("#datosPlan").html("");
        $("#checkboxColumnas").html("");
        $("#paginacion").html("");
          for (var i = 0; i < res.data.listaBusquedas.length; i++){
            var tr = construyeFila('PLAN', res.data.listaBusquedas[i]);
            $("#datosPlan").append(tr);
          }

        var div = createHideShowColumnsWindow({DESCRIPCION_PLAN_COLUMN:2, DATE_COLUMN:3, NOMBRE_OBJETIVO_COLUMN:4});
        $("#checkboxColumnas").append(div);
        $("#paginacion").append(textPaginacion);
        setLang(getCookie('lang'));

        setCookie('nombrePlan', '');
        setCookie('descripPlan', '');
        setCookie('fechaPlan', '');

        paginador(totalResults, 'cargarPlanes', 'PLAN');

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
  }else if(getCookie('rolUsuario') == "usuario"){
    cargarPlanesUsuario(numeroPagina, tamanhoPagina, 'PaginadorNo');
  }
  
}

/*Función que busca los eliminados de la tabla de plan*/
async function buscarEliminados(numeroPagina, tamanhoPagina, paginadorCreado){
  await buscarEliminadosAjaxPromesa(numeroPagina, tamanhoPagina)
  .then((res) => {
      cargarPermisosFuncPlan();
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
          document.getElementById('cabecera').style.display="none";
          document.getElementById('cabeceraEliminados').style.display="block";
      }

      $("#datosPlan").html("");
      $("#checkboxColumnas").html("");
      $("#paginacion").html("");
        for (var i = 0; i < res.data.listaBusquedas.length; i++){
          var tr = construyeFilaEliminados('PLAN', res.data.listaBusquedas[i]);
          $("#datosPlan").append(tr);
        }

      var div = createHideShowColumnsWindow({DESCRIPCION_PLAN_COLUMN:2, DATE_COLUMN:3, NOMBRE_OBJETIVO_COLUMN:4});
      $("#checkboxColumnas").append(div);
      $("#paginacion").append(textPaginacion);
      setLang(getCookie('lang'));

      setCookie('nombrePlan', '');
      setCookie('descripPlan', '');
      setCookie('fechaPlan', '');

      if(paginadorCreado != 'PaginadorCreado'){
         paginador(totalResults, 'buscarEliminadosPlan', 'PLAN');
      }


      if(numeroPagina == 0){
        $('#' + (numeroPagina+1)).addClass("active");
      }else{
        $('#' + numeroPagina).addClass("active");
      }

    }).catch((res) => {

      respuestaAjaxKO(res.code);
      setLang(getCookie('lang'));
      document.getElementById("modal").style.display = "block";

  });
}

/** Función que visualiza un plan**/
async function detallePlan(){
  await detallePlanAjaxPromesa()
  .then((res) => {
    $("#form-modal").modal('toggle');

    let idElementoList = ["nombrePlan", "descripPlan", "fechaPlan", "selectObjetivos", "descripcionObjetivo"];
    resetearFormulario("formularioGenerico", idElementoList);
    setLang(getCookie('lang'));
    $('#nombrePlan').val(getCookie('nombrePlan'));
    $('#descripPlan').val(getCookie('descripPlan'));
    $('#fechaPlan').val(getCookie('fechaPlan'));

  }).catch((res) => {
      $("#form-modal").modal('toggle');

      respuestaAjaxKO(res.code);

      let idElementoList = ["nombrePlan", "descripPlan", "fechaPlan", "selectObjetivos", "descripcionObjetivo"];
      resetearFormulario("formularioGenerico", idElementoList);

      setLang(getCookie('lang'));

      document.getElementById("modal").style.display = "block";
  });
}

/** Función que edita un plan **/
async function editPlan(){
  await editarPlanAjaxPromesa()
  .then((res) => {
    $("#form-modal").modal('toggle');

    respuestaAjaxOK("PLAN_EDITADO_OK", res.code);

    let idElementoList = ["nombrePlan", "descripPlan", "fechaPlan", "selectObjetivos", "descripcionObjetivo"];
    resetearFormulario("formularioGenerico", idElementoList);
    setLang(getCookie('lang'));
    document.getElementById("modal").style.display = "block";
    $('#nombrePlan').val(getCookie('nombrePlan'));
    $('#descripPlan').val(getCookie('descripPlan'));
    $('#fechaPlan').val(getCookie('fechaPlan'));
    buscarPlan(getCookie('numeroPagina'), tamanhoPaginaPlan, 'buscarPaginacion', 'PaginadorCreado');

  }).catch((res) => {
    $("#form-modal").modal('toggle');

     respuestaAjaxKO(res.code);

    let idElementoList = ["nombrePlan", "descripPlan", "fechaPlan", "selectObjetivos", "descripcionObjetivo"];
    resetearFormulario("formularioGenerico", idElementoList);

    setLang(getCookie('lang'));

    document.getElementById("modal").style.display = "block";


  });
}

/** Función que elimina un plan **/
async function deletePlan(){
  await eliminarPlanAjaxPromesa()
  .then((res) => {
    $("#form-modal").modal('toggle');

    respuestaAjaxOK("PLAN_ELIMINADO_OK", res.code);

    let idElementoList = ["nombrePlan", "descripPlan", "fechaPlan", "selectObjetivos", "descripcionObjetivo"];
    resetearFormulario("formularioGenerico", idElementoList);
    setLang(getCookie('lang'));
    document.getElementById("modal").style.display = "block";

    refrescarTabla(0, tamanhoPaginaPlan);

  }).catch((res) => {

     $("#form-modal").modal('toggle');
      respuestaAjaxKO(res.code);

      let idElementoList = ["nombrePlan", "descripPlan", "fechaPlan", "selectObjetivos", "descripcionObjetivo"];
      resetearFormulario("formularioGenerico", idElementoList);

      setLang(getCookie('lang'));

      document.getElementById("modal").style.display = "block";
  });
}

/*Función que reactiva los eliminados de la tabla de planes*/
async function reactivarPlan(){
  await reactivarPlanesAjaxPromesa()
  .then((res) => {

    cargarPermisosFuncPlan();
    $("#form-modal").modal('toggle');

    let idElementoList = ["nombrePlan", "descripPlan", "fechaPlan", "selectObjetivos", "descripcionObjetivo"];
    resetearFormulario("formularioGenerico", idElementoList);

    respuestaAjaxOK("PLAN_REACTIVADO_OK", res.code);

    setLang(getCookie('lang'));
    document.getElementById("modal").style.display = "block";

    buscarEliminados(0, tamanhoPaginaObjetivo, 'PaginadorNo');

    }).catch((res) => {

      $("#form-modal").modal('toggle');
      let idElementoList = ["nombrePlan", "descripPlan", "fechaPlan", "selectObjetivos", "descripcionObjetivo"];
      resetearFormulario("formularioGenerico", idElementoList);
      respuestaAjaxKO(res.code);
      setLang(getCookie('lang'));
      document.getElementById("modal").style.display = "block";
  });
}

/** Funcion para mostrar el formulario para añadir un plan **/
function showAddPlanes() {
  var idioma = getCookie('lang');
  cambiarFormulario('ADD_PLAN', 'javascript:addPlan();', 'return comprobarAddPlan();');
  cambiarOnBlurCampos('return comprobarNombrePlan(\'nombrePlan\', \'errorFormatoNombrePlan\', \'nombrePlan\')', 
      'return comprobarDescripcionPlan(\'descripPlan\', \'errorFormatoDescripPlan\', \'descripPlan\')',
      'return comprobarFechaPlan(\'fechaPlan\', \'errorFormatoFechaPlan\', \'fechaPlan\')',
      'return comprobarSelect(\'selectObjetivos\', \'errorFormatoNombreObjetivoSelect\', \'selectObjetivosOptions\')');
  cambiarIcono('images/add.png', 'ICONO_ADD', 'iconoAddPlan', 'Añadir');
  setLang(idioma);

  $('#subtitulo').attr('hidden', true);
  $('#labelNombrePlan').attr('hidden', true);
  $('#labelDescripcionPlan').attr('hidden', true);
  $('#labelFechaPlan').attr('hidden', true);
  $('#labelDescripcionObjetivo').attr('hidden', true);
  $('#descripcionObjetivo').attr('hidden', true);
  $('#labelNombreObjetivo').attr('hidden', true);

 let campos = ["nombrePlan", "descripPlan", "fechaPlan", "selectObjetivos", "descripcionObjetivo"];
  let obligatorios = ["obligatorioNombrePlan", "obligatorioDescripPlan", "obligatorioFechaPlan", "obligatorioObjetivos", "obligatorioDescripcionObjetivo"];
  eliminarReadonly(campos);
  mostrarObligatorios(obligatorios);
  habilitaCampos(campos);

}

/** Funcion para buscar un plan **/
function showBuscarPlan() {
  var idioma = getCookie('lang');

  cambiarFormulario('SEARCH_PLAN', 'javascript:buscarPlan(0,' + tamanhoPaginaPlan + ', \'buscarModal\'' + ',\'PaginadorNo\');', 'return comprobarBuscarPlan();');
  cambiarOnBlurCampos('return comprobarNombrePlanSearch(\'nombrePlan\', \'errorFormatoNombrePlan\', \'nombrePlan\')', 
      'return comprobarDescripcionPlanSearch(\'descripPlan\', \'errorFormatoDescripPlan\', \'descripPlan\')',
      'return comprobarFechaPlanSearch(\'fechaPlan\', \'errorFormatoFechaPlan\', \'fechaPlan\')');
  cambiarIcono('images/search.png', 'ICONO_SEARCH', 'iconoSearchPlan', 'Buscar');
  setLang(idioma);

  $('#labelNombrePlan').attr('hidden', true);
  $('#labelDescripcionPlan').attr('hidden', true);
  $('#labelFechaPlan').attr('hidden', true);
  $('#labelNombreObjetivo').attr('hidden', true);
  $('#selectObjetivos').attr('hidden', false);
  $('#labelDescripcionObjetivo').attr('hidden', true);
  $('#descripcionObjetivo').attr('hidden', true);
  $('#subtitulo').attr('hidden', true);

  let campos = ["nombrePlan", "descripPlan", "fechaPlan", "selectObjetivos", "descripcionObjetivo"];
  let obligatorios = ["obligatorioNombrePlan", "obligatorioDescripPlan", "obligatorioFechaPlan", "obligatorioObjetivos", "obligatorioDescripcionObjetivo"];
  eliminarReadonly(campos);
  ocultarObligatorios(obligatorios);
  habilitaCampos(campos);

}

/** Funcion para visualizar un objetivo **/
function showDetalle(nombrePlan, descripPlan , fechaPlan, nombreObjetivo, descripcionObjetivo) {

    var idioma = getCookie('lang');

    cambiarFormulario('DETAIL_PLAN', 'javascript:detallePlan();', '');
    cambiarIcono('images/close2.png', 'ICONO_CERRAR', 'iconoCerrar', 'Detalle');

    setLang(idioma);

    $('#labelNombrePlan').removeAttr('hidden');
    $('#labelDescripcionPlan').removeAttr('hidden');
    $('#labelFechaPlan').removeAttr('hidden');
    $('#labelNombreObjetivo').removeAttr('hidden');
    $('#labelDescripcionObjetivo').removeAttr('hidden');
    $('#descripcionObjetivo').removeAttr('hidden');
    $('#subtitulo').attr('hidden', true);

    rellenarFormulario(nombrePlan, descripPlan , fechaPlan, nombreObjetivo, descripcionObjetivo);

    let campos = ["nombrePlan", "descripPlan", "fechaPlan", "selectObjetivos", "descripcionObjetivo"];
    let obligatorios = ["obligatorioNombrePlan", "obligatorioDescripPlan", "obligatorioFechaPlan", "obligatorioObjetivos", "obligatorioDescripcionObjetivo"];
    anadirReadonly(campos);
    ocultarObligatorios(obligatorios);
    deshabilitaCampos(campos);

}

/** Funcion para editar un objetivo **/
function showEditar(nombrePlan, descripPlan , fechaPlan, nombreObjetivo, descripcionObjetivo, idPlan) {
  var idioma = getCookie('lang');

    cambiarFormulario('EDIT_PLAN', 'javascript:editPlan();', 'return comprobarEditPlan();');
    cambiarOnBlurCampos('return comprobarNombrePlan(\'nombrePlan\', \'errorFormatoNombrePlan\', \'nombrePlan\')', 
      'return comprobarDescripcionPlan(\'descripPlan\', \'errorFormatoDescripPlan\', \'descripPlan\')',
      'return comprobarFechaPlan(\'fechaPlan\', \'errorFormatoFechaPlan\', \'fechaPlan\')',
      'return comprobarSelect(\'selectObjetivos\', \'errorFormatoNombreObjetivoSelect\', \'selectObjetivosOptions\')');
    cambiarIcono('images/edit.png', 'ICONO_EDIT', 'iconoEditarPlan', 'Editar');

    setLang(idioma);

    $('#subtitulo').attr('hidden', true);
    $('#labelNombrePlan').attr('hidden', true);
    $('#labelDescripcionPlan').attr('hidden', true);
    $('#labelFechaPlan').attr('hidden', true);
    $('#labelDescripcionObjetivo').attr('hidden', true);
    $('#selectObjetivos').attr('hidden', false);
    $('#descripcionObjetivo').attr('hidden', true);
    $('#labelNombreObjetivo').attr('hidden', true);

    rellenarFormulario(nombrePlan, descripPlan , fechaPlan, nombreObjetivo, "");
   insertacampo(document.formularioGenerico,'idPlan', idPlan);

    let campos = ["nombrePlan", "descripPlan", "fechaPlan", "selectObjetivos", "descripcionObjetivo"];
    let obligatorios = ["obligatorioNombrePlan", "obligatorioDescripPlan", "obligatorioFechaPlan", "obligatorioObjetivos", "obligatorioDescripcionObjetivo"];
    eliminarReadonly(campos);
    mostrarObligatorios(obligatorios);
    habilitaCampos(campos);
    deshabilitaCampos(["nombrePlan"]);
    anadirReadonly(["nombrePlan"]);

}

/** Función para eliminar un plan **/
function showEliminar(nombrePlan, descripPlan , fechaPlan, nombreObjetivo, descripcionObjetivo, idPlan) {

    var idioma = getCookie('lang');

    cambiarFormulario('DELETE_PLAN', 'javascript:deletePlan();', '');
    cambiarIcono('images/delete.png', 'ICONO_ELIMINAR', 'iconoEliminar', 'Eliminar');

    setLang(idioma);

    $('#labelNombrePlan').removeAttr('hidden');
    $('#labelDescripcionPlan').removeAttr('hidden');
    $('#labelFechaPlan').removeAttr('hidden');
    $('#labelNombreObjetivo').removeAttr('hidden');
    $('#labelDescripcionObjetivo').attr('hidden', true);
    $('#descripcionObjetivo').attr('hidden', true);
    $('#subtitulo').removeAttr('class');
    $('#subtitulo').empty();
    $('#subtitulo').attr('class', 'SEGURO_ELIMINAR_PLAN');
    $('#subtitulo').attr('hidden', false);

    rellenarFormulario(nombrePlan, descripPlan , fechaPlan, nombreObjetivo, "");
    insertacampo(document.formularioGenerico,'idPlan', idPlan);

    let campos = ["nombrePlan", "descripPlan", "fechaPlan", "selectObjetivos", "descripcionObjetivo"];
    let obligatorios = ["obligatorioNombrePlan", "obligatorioDescripPlan", "obligatorioFechaPlan", "obligatorioObjetivos", "obligatorioDescripcionObjetivo"];
    anadirReadonly(campos);
    ocultarObligatorios(obligatorios);
    deshabilitaCampos(campos);

}

/** Función para reactivar un plan **/
function showReactivar(nombrePlan, descripPlan , fechaPlan, nombreObjetivo, descripcionObjetivo, idPlan) {

    var idioma = getCookie('lang');

    cambiarFormulario('REACTIVATE_PLAN', 'javascript:reactivarPlan();', '');
    cambiarIcono('images/reactivar2.png', 'ICONO_REACTIVAR', 'iconoReactivar', 'Reactivar');

    setLang(idioma);

    $('#labelNombrePlan').removeAttr('hidden');
    $('#labelDescripcionPlan').removeAttr('hidden');
    $('#labelFechaPlan').removeAttr('hidden');
    $('#labelNombreObjetivo').removeAttr('hidden');
    $('#labelDescripcionObjetivo').attr('hidden', true);
    $('#subtitulo').removeAttr('class');
    $('#subtitulo').empty();
    $('#subtitulo').attr('class', 'SEGURO_REACTIVAR_PLAN');
    $('#subtitulo').attr('hidden', false);


    rellenarFormulario(nombrePlan, descripPlan , fechaPlan, nombreObjetivo, "");
    insertacampo(document.formularioGenerico,'idPlan', idPlan);

    let campos = ["nombrePlan", "descripPlan", "fechaPlan", "selectObjetivos", "descripcionObjetivo"];
    let obligatorios = ["obligatorioNombrePlan", "obligatorioDescripPlan", "obligatorioFechaPlan", "obligatorioObjetivos", "obligatorioDescripcionObjetivo"];
    anadirReadonly(campos);
    ocultarObligatorios(obligatorios);
    deshabilitaCampos(campos);

}

/**Función para cambiar onBlur de los campos*/
function cambiarOnBlurCampos(onBlurNombrePlan, onBlurDescripPlan, onBlurFechaPlan, onBlurSelect) {

    if (onBlurNombrePlan != ''){
        $("#nombrePlan").attr('onblur', onBlurNombrePlan);
    }

    if (onBlurDescripPlan != ''){
        $("#descripPlan").attr('onblur', onBlurDescripPlan);
    }

    if (onBlurFechaPlan != ''){
        $("#fechaPlan").attr('onblur', onBlurFechaPlan);
    }

    if (onBlurSelect != ''){
        $("#selectObjetivos").attr('onblur', onBlurSelect);
    }
}

/**Función que rellenado los datos del formulario*/
function rellenarFormulario(nombrePlan, descripPlan, fechaPlan, nombreObjetivo, descripcionObjetivo) {

    $("#nombrePlan").val(nombrePlan);
    $("#descripPlan").val(descripPlan); 
    var fecha = fechaPlan.split('-');
    var fech = fecha[2] + "-" + fecha[1] + "-" + fecha[0]; 
    $('#fechaPlan').val(fech);

    var options = document.getElementById('selectObjetivos').options;

    for(var i = 0; i<options.length; i++){
      var text = options[i].text;
      if(options[i].text == nombreObjetivo){
        options[i].selected = true;
      }else{

        options[i].selected = false;
      }
    }

    $('#descripcionObjetivo').val(descripcionObjetivo);

}

/** Función para construír el select **/
async function construyeSelectObjetivos(){
  await listarObjetivosAjaxPromesa()
  .then((res) => {
     var options = "";
  
    $('#selectObjetivos').html('');

    var token = getCookie('tokenUsuario');

        options = '<option selected value=0><label class="OPCION_DEFECTO_OBJETIVO"></label></option>';
        for(var i = 0; i< res.data.listaBusquedas.length ; i++){
          options += '<option value=' + res.data.listaBusquedas[i].idObjetivo + '>' + res.data.listaBusquedas[i].nombreObjetivo + '</option>';
        }

        $('#selectObjetivos').append(options);

  }).catch((res) => {
     respuestaAjaxKO(res.code);
  });
}


function listarObjetivosAjaxPromesa(){
  return new Promise(function(resolve, reject) {
    var token = getCookie('tokenUsuario');

    $.ajax({
      method: "GET",
      url: urlPeticionAjaxListadoObjetivosSinP,
      contentType : "application/json",
      dataType : 'json',
      headers: {'Authorization': token},
      }).done(res => {
        if (res.code != 'OBJETIVOS_LISTADOS') {
          reject(res);
        }
        resolve(res);
      }).fail( function( jqXHR ) {
        errorFailAjax(jqXHR.status);
      });
  });
}



/** Función para gestionar los iconos dependiendo de los permisos de los usuarios **/
function gestionarPermisosPlan(idElementoList) {
  document.getElementById('cabecera').style.display = "none";
  document.getElementById('tablaDatos').style.display = "none";
  document.getElementById('filasTabla').style.display = "none";
  $('#itemPaginacion').attr('hidden', true);

  idElementoList.forEach( function (idElemento) {
    switch(idElemento){
      case "Añadir":
        $('#btnAddPlan').attr('src', 'images/add3.png');
        $('#btnAddPlan').css("cursor", "pointer");
        $('#divAddPlan').attr("data-toggle", "modal");
        $('#divAddPlan').attr("data-target", "#form-modal");
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
        $('#btnListarPlanes').attr('src', 'images/search3.png');
        $('#btnSearchDelete').attr('src', 'images/searchDelete3.png');
        $('#btnListarPlanes').css("cursor", "pointer");
        $('.iconoSearchDelete').css("cursor", "pointer");
        $('#divSearchDelete').attr("onclick", "javascript:buscarEliminados(0,\'tamanhoPaginaPlan\', \'PaginadorNo\')");
        $('#divListarPlanes').attr("data-toggle", "modal");
        $('#divListarPlanes').attr("data-target", "#form-modal");
        
        if(getCookie('rolUsuario') == "admin" || getCookie('rolUsuario') == "gestor" ){
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
        
        }else{
           $('#btnListarPlanesConsulta').attr('src', 'images/search3.png');
           $('#btnListarPlanesConsulta').css("cursor", "pointer");
           $('#divListarPlanesConsulta').attr("data-toggle", "modal");
           $('#divListarPlanesConsulta').attr("data-target", "#form-modal");
          document.getElementById('cabecera').style.display = "none";
          document.getElementById('listaPlanes').style.display = "block";
          document.getElementById('filasTabla').style.display = "block";
          $('#itemPaginacion').attr('hidden', false);
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
}

function construyePlanUsuario(planUsuario){
  document.getElementById('cabecera').style.display = "none";
  document.getElementById('cabeceraConsultaPlanes').style.display = "block";
  var plan = "";
  var objective = planUsuario.objetivo;

  var atributosFunciones = ["'" + planUsuario.objetivo.nombreObjetivo + "'", "'" + planUsuario.objetivo.descripObjetivo + "'"]; 

  plan = '<div class="col-md-12 col-lg-12 col-xl-12 mb-12 paddingTop">' + 
          '<div class="card">' + 
            '<div class="card-body-plan">' + 
              '<div class="card-title">' + planUsuario.nombrePlan + '</div>' + 
              '<div class="card-text">' + planUsuario.descripPlan + '</div>' + 

              '<div class="tooltip9 procedimientoIcon">' + 
                '<img class="iconoProcedimiento iconProcedimiento" src="images/procedimiento.png" alt="Acceder al procedimiento" onclick="accederProcedimientosPlan(' + planUsuario.idPlan + ');"/>' + 
                '<span class="tooltiptext iconProcedimiento ICON_PROCEDIMIENTO"></span>' + 
              '</div>' + 
            '</div>' + 
            '<div class="card-footer">' + 
              '<div class="tooltip8 objetivoIcon">' +
                '<img class="iconoObjetivo iconObjetivo" src="images/objetivo.png" alt="Objetivo" data-toggle="modal" data-target="#modalMostrarObjetivo" onclick="showObjetivo(' + atributosFunciones + ')"/>' + 
                '<span class="tooltiptext iconObjetivo ICON_OBJETIVO"></span>' + 
              '</div>' +
            '<div class="card-title-objetivo">Objetivo: ' + planUsuario.objetivo.nombreObjetivo + '</div>' +
            '</div>' + 
          '</div>' + 
        '</div>';

  return plan;
}

function showObjetivo(nombreObjetivo, descripObjetivo){

    $('#tituloFormsModalMostrarObjetivo').addClass('DETAIL_OBJECTIVE');
    $('#iconoAccionesMostrarObjetivo').attr('src', 'images/close2.png');
    $("#iconoAccionesMostrarObjetivo").removeClass();
    $('#iconoAccionesMostrarObjetivo').addClass('ICONO_DETALLE');
    $('#iconoAccionesMostrarObjetivo').addClass('iconoCerrar');
    $('#iconoAccionesMostrarObjetivo').attr('alt', 'Editar');
    $('#spanAccionesMostrarObjetivo').removeClass();
    $('#spanAccionesMostrarObjetivo').addClass('tooltiptext');
    $('#spanAccionesMostrarObjetivo').addClass('ICONO_DETALLE');
    $('#btnAccionesMostrarObjetivo').attr('value', 'Detalle');

    $('#labelNombreObjetivoMostrarObjetivo').attr('hidden', false);
    $('#labelDescripcionObjetivoMostrarObjetivo').attr('hidden', false);
    $('#nombreObjetivo').val(nombreObjetivo);
    $('#descripcionObjetivoMostrarObjetivo').val(descripObjetivo);

    deshabilitaCampos(['nombreObjetivo', 'descripcionObjetivoMostrarObjetivo']);
    anadirReadonly(['nombreObjetivo', 'descripcionObjetivoMostrarObjetivo']);
   
    setLang(getCookie('lang'));
}


$(document).ready(function() {
  $("#form-modal").on('hidden.bs.modal', function() {

    let idElementoErrorList = ["errorFormatoNombrePlan", "errorFormatoDescripPlan", "errorFormatoFechaPlan", "errorFormatoObjetivo"];

    let idElementoList = ["nombrePlan", "descripPlan", "fechaPlan"];

    limpiarFormulario(idElementoList);
    eliminarMensajesValidacionError(idElementoErrorList, idElementoList);
    setLang(getCookie('lang'));
    resetearFormulario("formularioGenerico", idElementoList);
  });

}); 

/**Función para que el usuario acceda a los prodecimientos desde una plan*/
function accederProcedimientosPlan(idPlan){
  //setCookie('accesoDesdePlan', 'true');
  setCookie('idPlan', idPlan)
  window.location.href = "GestionDeProcedimientos.html";
}
