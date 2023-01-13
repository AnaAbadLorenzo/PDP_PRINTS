/** Función para añadir respuestas posibles con ajax y promesas **/
function anadirRespuestaPosibleAjaxPromesa(){
    return new Promise(function(resolve, reject) {
      var token = getCookie('tokenUsuario');
  
      var respuestaPosibleEntity = {
        idRespuesta: "",
        textoRespuesta : $('#textoRespuestaPosible').val(),
        borradoRespuesta : 0
      }
  
      var data = {
        usuario : getCookie('usuario'),
        respuestaPosibleEntity : respuestaPosibleEntity
      }
  
      $.ajax({
        method: "POST",
        url: urlPeticionAjaxAddRespuestaPosible,
        contentType : "application/json",
        data: JSON.stringify(data),  
        dataType : 'json',
        headers: {'Authorization': token},
        }).done(res => {
          if (res.code != 'RESPUESTA_POSIBLE_GUARDADA') {
            reject(res);
          }
          resolve(res);
        }).fail( function( jqXHR ) {
          errorFailAjax(jqXHR.status);
        });
    });
  }
  
  /** Función para buscar respuestas posibles con ajax y promesas **/
  function buscarRespuestaPosibleAjaxPromesa(numeroPagina, tamanhoPagina, accion){
    return new Promise(function(resolve, reject) {
      var token = getCookie('tokenUsuario');
  
      if(accion == "buscarModal"){
        var data = {
          textoRespuesta : $('#textoRespuestaPosible').val(),
          inicio : calculaInicio(numeroPagina, tamanhoPaginaRespuestaPosible),
          tamanhoPagina : tamanhoPaginaRespuestaPosible
        }
      }
  
      if(accion == "buscarPaginacion"){
        if(getCookie('textoRespuesta') == null || getCookie('textoRespuesta') == ""){
          var texto = "";
        }else{
          var texto = getCookie('textoRespuesta');
        }
  
        var data = {
          textoRespuesta : texto,
          inicio : calculaInicio(numeroPagina, tamanhoPaginaRespuestaPosible),
          tamanhoPagina : tamanhoPaginaRespuestaPosible
        }
      }
  
      $.ajax({
        method: "POST",
        url: urlPeticionAjaxListarRespuestaPosible,
        contentType : "application/json",
        data: JSON.stringify(data),  
        dataType : 'json',
        headers: {'Authorization': token},
        }).done(res => {
          if (res.code != 'RESPUESTA_POSIBLE_ENCONTRADA') {
            reject(res);
          }
          resolve(res);
        }).fail( function( jqXHR ) {
          errorFailAjax(jqXHR.status);
        });
    });
  }
  
  /** Función para recuperar los permisos de un usuario sobre la funcionalidad **/
  function cargarPermisosFuncRespuestaPosibleAjaxPromesa(){
    return new Promise(function(resolve, reject) {
      var nombreUsuario = getCookie('usuario');
      var token = getCookie('tokenUsuario');
  
      var usuario = nombreUsuario;
  
      $.ajax({
        method: "GET",
        url: urlPeticionAjaxAccionesUsuario,
        contentType : "application/json",
        data: { usuario : usuario, funcionalidad : 'Gestión de respuestas posibles'},  
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
  
  /**Función para editar una respuesta posible con ajax y promesas*/
  function editarRespuestaPosibleAjaxPromesa(){
    return new Promise(function(resolve, reject) {
      var token = getCookie('tokenUsuario');
  
      var respuestaPosibleEntity = {
        idRespuesta : $("input[name=idRespuestaPosible]").val(),
        textoRespuesta : $('#textoRespuestaPosible').val(),
        borradoRespuesta : 0
      }
  
      var data = {
        usuario : getCookie('usuario'),
        respuestaPosibleEntity : respuestaPosibleEntity
      }
  
        $.ajax({
        method: "POST",
        url: urlPeticionAjaxEditarRespuestaPosible,
        contentType : "application/json",
        data: JSON.stringify(data),  
        dataType : 'json',
        headers: {'Authorization': token},
        }).done(res => {
          if (res.code != 'RESPUESTA_POSIBLE_MODIFICADA') {
            reject(res);
          }
          resolve(res);
        }).fail( function( jqXHR ) {
          errorFailAjax(jqXHR.status);
        });
    });
  }
  
  /**Función para eliminar una respuesta posible con ajax y promesas*/
  function eliminarRespuestaPosibleAjaxPromesa(){
    return new Promise(function(resolve, reject) {
      var token = getCookie('tokenUsuario');
  
      var respuestaPosibleEntity = {
        idRespuesta : $("input[name=idRespuestaPosible]").val(),
        textoRespuesta : $('#textoRespuestaPosible').val(),
        borradoRespuesta : 1
      }
  
      var data = {
        usuario : getCookie('usuario'),
        respuestaPosibleEntity : respuestaPosibleEntity
      }
  
        $.ajax({
        method: "POST",
        url: urlPeticionAjaxDeleteRespuestaPosible,
        contentType : "application/json",
        data: JSON.stringify(data),  
        dataType : 'json',
        headers: {'Authorization': token},
        }).done(res => {
          if (res.code != 'RESPUESTA_POSIBLE_ELIMINADA') {
            reject(res);
          }
          resolve(res);
        }).fail( function( jqXHR ) {
          errorFailAjax(jqXHR.status);
        });
    });
  }
  
  /*Función que comprueba los permisos del usuario sobre la respuesta posible*/
  async function cargarPermisosFuncRespuestaPosible(){
    await cargarPermisosFuncRespuestaPosibleAjaxPromesa()
    .then((res) => {
      gestionarPermisosRespuestaPosible(res.data);
      setLang(getCookie('lang'));
    }).catch((res) => {
        respuestaAjaxKO(res.code);
        setLang(getCookie('lang'));
        document.getElementById("modal").style.display = "block";
    });
  }
  
  
  /** Función para recuperar las respuestas posibles con ajax y promesas **/
  function cargarRespuestasPosiblesAjaxPromesa(numeroPagina, tamanhoPagina){
    return new Promise(function(resolve, reject) {
      var token = getCookie('tokenUsuario');
  
      var data = {
        inicio : calculaInicio(numeroPagina, tamanhoPaginaRespuestaPosible),
        tamanhoPagina : tamanhoPaginaRespuestaPosible
      }
  
      $.ajax({
        method: "POST",
        url: urlPeticionAjaxListadoRespuestasPosibles,
        contentType : "application/json",
        data: JSON.stringify(data),  
        dataType : 'json',
        headers: {'Authorization': token},
        }).done(res => {
          if (res.code != 'RESPUESTAS_POSIBLES_LISTADAS') {
            reject(res);
          }
          resolve(res);
        }).fail( function( jqXHR ) {
          errorFailAjax(jqXHR.status);
        });
    });
  }
  
  /**Función para recuperar las respuestas posibles eliminadas con ajax y promesas*/
  function buscarEliminadosAjaxPromesa(numeroPagina, tamanhoPagina){
    return new Promise(function(resolve, reject) {
      var token = getCookie('tokenUsuario');
  
      var data = {
        inicio : calculaInicio(numeroPagina, tamanhoPaginaRespuestaPosible),
        tamanhoPagina : tamanhoPaginaRespuestaPosible
      }
  
      $.ajax({
        method: "POST",
        url: urlPeticionAjaxListarRespuestasPosiblesEliminadas,
        contentType : "application/json",
        data: JSON.stringify(data),  
        dataType : 'json',
        headers: {'Authorization': token},
        }).done(res => {
          if (res.code != 'RESPUESTAS_POSIBLES_ELIMINADAS_LISTADAS') {
            reject(res);
          }
          resolve(res);
        }).fail( function( jqXHR ) {
          errorFailAjax(jqXHR.status);
        });
    });
  }
  
  /**Función para ver en detalle una respuesta posible con ajax y promesas*/
  function detalleRespuestaPosibleAjaxPromesa(){
    return new Promise(function(resolve, reject) {
      var token = getCookie('tokenUsuario');
  
      var data = {
        textoRespuesta : $('#textoRespuestaPosible').val(),
        inicio : 0,
        tamanhoPagina : 1
      }
  
        $.ajax({
        method: "POST",
        url: urlPeticionAjaxListarRespuestaPosible,
        contentType : "application/json",
        data: JSON.stringify(data),  
        dataType : 'json',
        headers: {'Authorization': token},
        }).done(res => {
          if (res.code != 'RESPUESTA_POSIBLE_ENCONTRADA') {
            reject(res);
          }
          resolve(res);
        }).fail( function( jqXHR ) {
          errorFailAjax(jqXHR.status);
        });
    });
  }
  
  
  /**Función para reactivar una respuesta posible con ajax y promesas*/
  function reactivarRespuestasPosiblesAjaxPromesa(){
    return new Promise(function(resolve, reject) {
      var token = getCookie('tokenUsuario');
  
      var respuestaPosibleEntity = {
        idRespuesta : $("input[name=idRespuestaPosible]").val(),
        textoRespuesta : $('#textoRespuestaPosible').val(),
        borradoRespuesta : 0
      }
  
      var data = {
        usuario: getCookie('usuario'),
        respuestaPosibleEntity : respuestaPosibleEntity
      }
  
        $.ajax({
        method: "POST",
        url: urlPeticionAjaxReactivarRespuestaPosible,
        contentType : "application/json",
        data: JSON.stringify(data),  
        dataType : 'json',
        headers: {'Authorization': token},
        }).done(res => {
          if (res.code != 'RESPUESTA_POSIBLE_REACTIVADA') {
            reject(res);
          }
          resolve(res);
        }).fail( function( jqXHR ) {
          errorFailAjax(jqXHR.status);
        });
    });
  }
  
  /* Función para obtener las respuestas posibles del sistema */
  async function cargarRespuestasPosibles(numeroPagina, tamanhoPagina, paginadorCreado){
    await cargarRespuestasPosiblesAjaxPromesa(numeroPagina, tamanhoPagina)
      .then((res) => {
  
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
  
        $("#datosRespuestaPosible").html("");
        $("#checkboxColumnas").html("");
        $("#paginacion").html("");
  
        for (var i = 0; i < res.data.listaBusquedas.length; i++){
            var tr = construyeFila('RESPUESTA_POSIBLE', res.data.listaBusquedas[i]);
            $("#datosRespuestaPosible").append(tr);
          }
          $("#paginacion").append(textPaginacion);
          setLang(getCookie('lang'));
  
          if(paginadorCreado != 'PaginadorCreado'){
            paginador(totalResults, 'cargarRespuestasPosibles', 'RESPUESTA_POSIBLE');
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
  
  /** Funcion añadir respuesta posible **/
  async function addRespuestaPosible(){
    await anadirRespuestaPosibleAjaxPromesa()
    .then((res) => {
  
      $("#form-modal").modal('toggle');
      respuestaAjaxOK("RESPUESTA_POSIBLE_GUARDADA_OK", res.code);
  
      let idElementoList = ["textoRespuestaPosible"];
      resetearFormulario("formularioGenerico", idElementoList);
      setLang(getCookie('lang'));
      document.getElementById("modal").style.display = "block";
  
      $('#textoRespuestaPosible').val(getCookie('textoRespuesta'));
      buscarRespuestaPosible(getCookie('numeroPagina'), tamanhoPaginaRespuestaPosible, 'buscarPaginacion', 'PaginadorNo');
      setLang(getCookie('lang'));
  
    }).catch((res) => {
        $("#form-modal").modal('toggle');
  
        respuestaAjaxKO(res.code);
  
        let idElementoList = ["textoRespuestaPosible"];
        resetearFormulario("formularioGenerico", idElementoList);
  
        setLang(getCookie('lang'));
  
        document.getElementById("modal").style.display = "block";
    });
  }
  
  
  /** Funcion buscar respuesta posible **/
  async function buscarRespuestaPosible(numeroPagina, tamanhoPagina, accion, paginadorCreado){
    await buscarRespuestaPosibleAjaxPromesa(numeroPagina, tamanhoPagina,accion)
    .then((res) => {
        cargarPermisosFuncRespuestaPosible();
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
  
        $("#datosRespuestaPosible").html("");
        $("#checkboxColumnas").html("");
        $("#paginacion").html("");
          for (var i = 0; i < res.data.listaBusquedas.length; i++){
            var tr = construyeFila('RESPUESTA_POSIBLE', res.data.listaBusquedas[i]);
            $("#datosRespuestaPosible").append(tr);
          }
  
        $("#paginacion").append(textPaginacion);
        setLang(getCookie('lang'));
  
        if(paginadorCreado != 'PaginadorCreado'){
            paginador(totalResults, 'buscarRespuestaPosible', 'RESPUESTA_POSIBLE');
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
        cargarPermisosFuncObjetivo();
        respuestaAjaxKO(res.code);
  
        let idElementoList = ["textoRespuestaPosible"];
        resetearFormulario("formularioGenerico", idElementoList);
  
        setLang(getCookie('lang'));
  
        document.getElementById("modal").style.display = "block";
    });
  }
  
  /*Función que refresca la tabla por si hay algún cambio en BD */
  async function refrescarTabla(numeroPagina, tamanhoPagina){
    await cargarRespuestasPosiblesAjaxPromesa(numeroPagina, tamanhoPagina)
    .then((res) => {
        cargarPermisosFuncRespuestaPosible();
        setCookie('textoRespuesta', '');
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
  
        $("#datosRespuestaPosible").html("");
        $("#checkboxColumnas").html("");
        $("#paginacion").html("");
          for (var i = 0; i < res.data.listaBusquedas.length; i++){
            var tr = construyeFila('RESPUESTA_POSIBLE', res.data.listaBusquedas[i]);
            $("#datosRespuestaPosible").append(tr);
          }
  
        $("#paginacion").append(textPaginacion);
        setLang(getCookie('lang'));
  
        setCookie('textoRespuesta', '');
  
        paginador(totalResults, 'cargarRespuestasPosibles', 'RESPUESTA_POSIBLE');
  
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
  
  /*Función que busca los eliminados de la tabla de respuesta posible*/
  async function buscarEliminados(numeroPagina, tamanhoPagina, paginadorCreado){
    await buscarEliminadosAjaxPromesa(numeroPagina, tamanhoPagina)
    .then((res) => {
        cargarPermisosFuncRespuestaPosible();
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
          document.getElementById('cabecera').style.display = "none";
          document.getElementById('cabeceraEliminados').style.display = "block";    
        }
  
        $("#datosRespuestaPosible").html("");
        $("#checkboxColumnas").html("");
        $("#paginacion").html("");
          for (var i = 0; i < res.data.listaBusquedas.length; i++){
            var tr = construyeFilaEliminados('RESPUESTA_POSIBLE', res.data.listaBusquedas[i]);
            $("#datosRespuestaPosible").append(tr);
          }
  
        $("#paginacion").append(textPaginacion);
        setLang(getCookie('lang'));
  
        setCookie('textoRespuesta', '');
  
        if(paginadorCreado != 'PaginadorCreado'){
           paginador(totalResults, 'buscarEliminadosRespuestaPosible', 'RESPUESTA_POSIBLE');
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
  
  /** Función que visualiza una respuesta posible**/
  async function detalleRespuestaPosible(){
    await detalleRespuestaPosibleAjaxPromesa()
    .then((res) => {
      $("#form-modal").modal('toggle');
  
      let idElementoList = ["textoRespuestaPosible"];
      resetearFormulario("formularioGenerico", idElementoList);
      setLang(getCookie('lang'));
      $('#textoRespuestaPosible').val(getCookie('textoRespuesta'));
  
    }).catch((res) => {
        $("#form-modal").modal('toggle');
  
        respuestaAjaxKO(res.code);
  
        let idElementoList = ["textoRespuestaPosible"];
        resetearFormulario("formularioGenerico", idElementoList);
  
        setLang(getCookie('lang'));
  
        document.getElementById("modal").style.display = "block";
    });
  }
  
  /** Función que edita una respuesta posible **/
  async function editRespuestaPosible(){
    await editarRespuestaPosibleAjaxPromesa()
    .then((res) => {
      $("#form-modal").modal('toggle');
  
      respuestaAjaxOK("RESPUESTA_POSIBLE_EDITADA_OK", res.code);
  
      let idElementoList = ["textoRespuestaPosible"];
      resetearFormulario("formularioGenerico", idElementoList);
      setLang(getCookie('lang'));
      document.getElementById("modal").style.display = "block";
      $('#textoRespuestaPosible').val(getCookie('textoRespuesta'));
      buscarRespuestaPosible(getCookie('numeroPagina'), tamanhoPaginaRespuestaPosible, 'buscarPaginacion', 'PaginadorCreado');
  
    }).catch((res) => {
      $("#form-modal").modal('toggle');
  
       respuestaAjaxKO(res.code);
  
      let idElementoList = ["textoRespuestaPosible"];
      resetearFormulario("formularioGenerico", idElementoList);
  
      setLang(getCookie('lang'));
  
      document.getElementById("modal").style.display = "block";
  
  
    });
  }
  
  /** Función que elimina una respuesta posible **/
  async function deleteRespuestaPosible(){
    await eliminarRespuestaPosibleAjaxPromesa()
    .then((res) => {
      $("#form-modal").modal('toggle');
  
      respuestaAjaxOK("RESPUESTA_POSIBLE_ELIMINADA_OK", res.code);
  
      let idElementoList = ["textoRespuestaPosible"];
      resetearFormulario("formularioGenerico", idElementoList);
      setLang(getCookie('lang'));
      document.getElementById("modal").style.display = "block";
  
      refrescarTabla(0, tamanhoPaginaRespuestaPosible);
  
    }).catch((res) => {
  
       $("#form-modal").modal('toggle');
        respuestaAjaxKO(res.code);
  
        let idElementoList = ["textoRespuestaPosible"];
        resetearFormulario("formularioGenerico", idElementoList);
  
        setLang(getCookie('lang'));
  
        document.getElementById("modal").style.display = "block";
  
  
    });
  }
  
  /*Función que reactiva los eliminados de la tabla de respuestas posibles*/
  async function reactivarRespuestaPosible(){
    await reactivarRespuestasPosiblesAjaxPromesa()
    .then((res) => {
  
      cargarPermisosFuncRespuestaPosible();
      $("#form-modal").modal('toggle');
  
      let idElementoList = ["textoRespuestaPosible"];
      resetearFormulario("formularioGenerico", idElementoList);
  
      respuestaAjaxOK("RESPUESTA_POSIBLE_REACTIVADA_OK", res.code);
  
      setLang(getCookie('lang'));
      document.getElementById("modal").style.display = "block";
  
      buscarEliminados(0, tamanhoPaginaRespuestaPosible, 'PaginadorNo');
  
      }).catch((res) => {
  
        $("#form-modal").modal('toggle');
        let idElementoList = ["textoRespuestaPosible"];
        resetearFormulario("formularioGenerico", idElementoList);
        respuestaAjaxKO(res.code);
        setLang(getCookie('lang'));
        document.getElementById("modal").style.display = "block";
    });
  }
  
  /** Funcion para mostrar el formulario para añadir una respuesta posible **/
  function showAddRespuesta() {
    var idioma = getCookie('lang');
    cambiarFormulario('ADD_RESPUESTA_POSIBLE', 'javascript:addRespuestaPosible();', 'return comprobarAddRespuestaPosible();');
    cambiarOnBlurCampos('return comprobarTextoRespuestaPosible(\'textoRespuestaPosible\', \'errorFormatoTextoRespuestaPosible\', \'textoRespuestaPosible\')');
    cambiarIcono('images/add.png', 'ICONO_ADD', 'iconoAddRespuestaPosible', 'Añadir');
    setLang(idioma);
  
    $('#subtitulo').attr('hidden', true);
    $('#labelTextoRespuestaPosible').attr('hidden', true);
  
    let campos = ["textoRespuestaPosible"];
    let obligatorios = ["obligatorioTextoRespuestaPosible"];
    eliminarReadonly(campos);
    mostrarObligatorios(obligatorios);
    habilitaCampos(campos);
    setLang(getCookie('lang'));
  
  }
  
  /** Funcion para buscar una respuesta posible **/
  function showBuscarRespuesta() {
    var idioma = getCookie('lang');
  
    cambiarFormulario('SEARCH_RESPUESTA_POSIBLE', 'javascript:buscarRespuestaPosible(0,' + tamanhoPaginaRespuestaPosible + ', \'buscarModal\'' + ',\'PaginadorNo\');', 
      'return comprobarBuscarRespuestaPosible();');
    cambiarOnBlurCampos('return comprobarTextoRespuestaPosible(\'textoRespuestaPosible\', \'errorFormatoTextoRespuestaPosible\', \'textoRespuestaPosible\')');
    cambiarIcono('images/search.png', 'ICONO_SEARCH', 'iconoSearchRespuestaPosible', 'Buscar');
    setLang(idioma);
  
    $('#labelTextoRespuestaPosible').attr('hidden', true);
  
    let campos = ["textoRespuestaPosible"];
    let obligatorios = ["obligatorioTextoRespuestaPosible"];
    eliminarReadonly(campos);
    ocultarObligatorios(obligatorios);
    habilitaCampos(campos);
    setLang(getCookie('lang'));
  
  }
  
  /** Funcion para visualizar una respuesta posible **/
  function showDetalle(textoRespuestaPosible, idRespuestaPosible) {
  
      var idioma = getCookie('lang');
  
      cambiarFormulario('DETAIL_RESPUESTA_POSIBLE', 'javascript:detalleRespuestaPosible();', '');
      cambiarIcono('images/close2.png', 'ICONO_CERRAR', 'iconoCerrar', 'Detalle');
  
      setLang(idioma);
  
      $('#labelTextoRespuestaPosible').removeAttr('hidden');
      $('#subtitulo').attr('hidden', true);
  
      rellenarFormulario(textoRespuestaPosible);
  
      let campos = ["textoRespuestaPosible"];
      let obligatorios = ["obligatorioTextoRespuestaPosible"];
      anadirReadonly(campos);
      ocultarObligatorios(obligatorios);
      deshabilitaCampos(campos);
      setLang(getCookie('lang'));
  
  }
  
  /** Funcion para editar una respuesta posible **/
  function showEditar(textoRespuestaPosible, idRespuestaPosible) {
    var idioma = getCookie('lang');
  
      cambiarFormulario('EDIT_RESPUESTA_POSIBLE', 'javascript:editRespuestaPosible();', 
        'return comprobarEditRespuestaPosible();');
      cambiarOnBlurCampos('return comprobarTextoRespuestaPosible(\'textoRespuestaPosible\', \'errorFormatoTextoRespuestaPosible\', \'textoRespuestaPosible\')');
      cambiarIcono('images/edit.png', 'ICONO_EDIT', 'iconoEditarRespuestaPosible', 'Editar');
  
      setLang(idioma);
  
      $('#subtitulo').attr('hidden', true);
      $('#labelTextoRespuestaPosible').attr('hidden', true);
  
      rellenarFormulario(textoRespuestaPosible);
      insertacampo(document.formularioGenerico,'idRespuestaPosible', idRespuestaPosible);
  
      let campos = ["textoRespuestaPosible"];
      let obligatorios = ["obligatorioTextoRespuestaPosible"];
      eliminarReadonly(campos);
      mostrarObligatorios(obligatorios);
      habilitaCampos(campos);
      setLang(getCookie('lang'));
  
  }
  
  /** Función para eliminar una respuesta posible **/
  function showEliminar(textoRespuestaPosible, idRespuestaPosible) {
  
      var idioma = getCookie('lang');
  
      cambiarFormulario('DELETE_RESPUESTA_POSIBLE', 'javascript:deleteRespuestaPosible();', '');
      cambiarIcono('images/delete.png', 'ICONO_ELIMINAR', 'iconoEliminar', 'Eliminar');
  
      setLang(idioma);
  
      $('#labelTextoRespuestaPosible').removeAttr('hidden');
      $('#subtitulo').removeAttr('class');
      $('#subtitulo').empty();
      $('#subtitulo').attr('class', 'SEGURO_ELIMINAR_RESP');
      $('#subtitulo').attr('hidden', false);
  
  
      rellenarFormulario(textoRespuestaPosible);
      insertacampo(document.formularioGenerico,'idRespuestaPosible', idRespuestaPosible);
  
      let campos = ["textoRespuestaPosible"];
      let obligatorios = ["obligatorioTextoRespuestaPosible"];
      anadirReadonly(campos);
      ocultarObligatorios(obligatorios);
      deshabilitaCampos(campos);
      setLang(getCookie('lang'));
  
  }
  
  /** Función para reactivar una respuesta posible **/
  function showReactivar(textoRespuestaPosible, idRespuestaPosible) {
  
      var idioma = getCookie('lang');
  
      cambiarFormulario('REACTIVATE_RESPUESTA_POSIBLE', 'javascript:reactivarRespuestaPosible();', '');
      cambiarIcono('images/reactivar2.png', 'ICONO_REACTIVAR', 'iconoReactivar', 'Reactivar');
  
      setLang(idioma);
  
      $('#labelTextoRespuestaPosible').removeAttr('hidden');
      $('#subtitulo').removeAttr('class');
      $('#subtitulo').empty();
      $('#subtitulo').attr('class', 'SEGURO_REACTIVAR_RESP');
      $('#subtitulo').attr('hidden', false);
  
  
      rellenarFormulario(textoRespuestaPosible);
      insertacampo(document.formularioGenerico,'idRespuestaPosible', idRespuestaPosible);
  
      let campos = ["textoRespuestaPosible"];
      let obligatorios = ["obligatorioTextoRespuestaPosible"];
      anadirReadonly(campos);
      ocultarObligatorios(obligatorios);
      deshabilitaCampos(campos);
      setLang(getCookie('lang'));
  
  }
  
  /**Función para cambiar onBlur de los campos*/
  function cambiarOnBlurCampos(onBlurTextoRespuestaPosible) {
  
      if (onBlurTextoRespuestaPosible != ''){
          $("#textoRespuestaPosible").attr('onblur', onBlurTextoRespuestaPosible);
      }
  }
  
  /**Función que rellenado los datos del formulario*/
  function rellenarFormulario(textoRespuestaPosible) {
  
      $("#textoRespuestaPosible").val(textoRespuestaPosible);
  
  }
  
  /** Función para gestionar los iconos dependiendo de los permisos de los usuarios **/
  function gestionarPermisosRespuestaPosible(idElementoList) {
    document.getElementById('cabecera').style.display = "none";
    document.getElementById('tablaDatos').style.display = "none";
    document.getElementById('filasTabla').style.display = "none";
    $('#itemPaginacion').attr('hidden', true);
  
    idElementoList.forEach( function (idElemento) {
      switch(idElemento){
        case "Añadir":
          $('#btnAddRespuesta').attr('src', 'images/add3.png');
          $('#btnAddRespuesta').css("cursor", "pointer");
          $('#divAddRespuesta').attr("data-toggle", "modal");
          $('#divAddRespuesta').attr("data-target", "#form-modal");
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
          $('#btnListarRespuestas').attr('src', 'images/search3.png');
          $('#btnSearchDelete').attr('src', 'images/searchDelete3.png');
          $('#btnListarRespuestas').css("cursor", "pointer");
          $('.iconoSearchDelete').css("cursor", "pointer");
          $('#divSearchDelete').attr("onclick", "javascript:buscarEliminados(0,\'tamanhoPaginaRespuestaPosible\', \'PaginadorNo\')");
          $('#divListarRespuestas').attr("data-toggle", "modal");
          $('#divListarRespuestas').attr("data-target", "#form-modal");
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
  
  $(document).ready(function() {
    $("#form-modal").on('hidden.bs.modal', function() {
  
      let idElementoErrorList = ["errorFormatoTextoRespuestaPosible"];
  
      let idElementoList = ["textoRespuestaPosible"];
  
      limpiarFormulario(idElementoList);
      eliminarMensajesValidacionError(idElementoErrorList, idElementoList);
      setLang(getCookie('lang'));
  
      resetearFormulario("formularioGenerico", idElementoList);
  
    });
  
  }); 