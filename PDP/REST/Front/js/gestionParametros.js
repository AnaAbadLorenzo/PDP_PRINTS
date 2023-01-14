  /** Función para buscar respuestas posibles con ajax y promesas **/
  function buscarParametroAjaxPromesa(numeroPagina, tamanhoPagina, accion){
    return new Promise(function(resolve, reject) {
      var token = getCookie('tokenUsuario');
  
      if(accion == "buscarModal"){
        var parametro = {
          parametro_formula : $('#parametroFormula').val(),
          descripcion_parametro : $('#descripcionParametro').val(),
          inicio : calculaInicio(numeroPagina, tamanhoPaginaParametro),
          tamanhoPagina : tamanhoPaginaParametro
        }
      }
  
      if(accion == "buscarPaginacion"){
        if(getCookie('parametro_formula') == null || getCookie('parametro_formula') == ""){
          var parametro = "";
        }else{
          var parametro = getCookie('parametro_formula');
        }
        
        if(getCookie('descripcion_parametro') == null || getCookie('descripcion_parametro') == ""){
            var descripcionParam = "";
        }else{
            var descripcionParam = getCookie('descripcion_parametro');
        }

        var parametro = {
          parametro_formula : parametro,
          descripcion_parametro : descripcionParam,
          inicio : calculaInicio(numeroPagina, tamanhoPaginaParametro),
          tamanhoPagina : tamanhoPaginaParametro
        }
      }
  
      $.ajax({
        method: "POST",
        url: urlPeticionAjaxListarParametro,
        contentType : "application/x-www-form-urlencoded; charset=UTF-8",
        data: parametro,  
        headers: {'Authorization': token},
        }).done(res => {
          if (res.code != 'BUSQUEDA_PARAMETRO_CORRECTO') {
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
  
        var data = {
          controlador : 'GestionACL',
          action: 'searchAccionesPorFuncionalidadUsuario',
          usuario : usuario,
          nombre_funcionalidad : 'Gestión de parametros'
        }
      
        $.ajax({
          method: "POST",
          url: urlPeticionAjaxAccionesUsuario,
          contentType : "application/x-www-form-urlencoded; charset=UTF-8",
          data: data,  
          headers: {'Authorization': token},
          }).done(res => {
            if (res.code != 'BUSQUEDA_ACL_CORRECTO') {
              reject(res);
            }
            resolve(res);
        }).fail( function( jqXHR ) {
            errorFailAjax(jqXHR.status);
          });
      });
  }
  
  /**Función para editar un parametro con ajax y promesas*/
  function editarParametroAjaxPromesa(){
    return new Promise(function(resolve, reject) {
      var token = getCookie('tokenUsuario');
  
      var parametro = {
        controlador : 'GestionParametros',
        action: 'edit',
        id_parametro : $("input[name=idParametro]").val(),
        parametro_formula : $('#parametroFormula').val(),
        descripcion_parametro : $('#descripcionParametro').val(),
        id_proceso: $('#idProceso').val()
      }

        $.ajax({
        method: "POST",
        url: urlPeticionAjaxEditarRespuestaPosible,
        contentType : "application/x-www-form-urlencoded; charset=UTF-8",
        data: parametro,  
        headers: {'Authorization': token},
        }).done(res => {
          if (res.code != 'EDIT_PARAMETRO_COMPLETO') {
            reject(res);
          }
          resolve(res);
        }).fail( function( jqXHR ) {
          errorFailAjax(jqXHR.status);
        });
    });
  }
  
  /**Función para eliminar un parámetro con ajax y promesas*/
  function eliminarParametroAjaxPromesa(){
    return new Promise(function(resolve, reject) {
      var token = getCookie('tokenUsuario');
  
      var parametro = {
        id_parametro : $("input[name=idParametro]").val(),
        parametro_formula : $('#parametroFormula').val(),
        descripcion_parametro : $('#descripcionParametro').val(),
        id_proceso : $('#idProceso').val()
      }
  
      $.ajax({
        method: "POST",
        url: urlPeticionAjaxDeleteParametro,
        contentType : "application/x-www-form-urlencoded; charset=UTF-8",
        data: parametro,  
        headers: {'Authorization': token},
        }).done(res => {
          if (res.code != 'PARAMETRO_ELIMINADO') {
            reject(res);
          }
          resolve(res);
        }).fail( function( jqXHR ) {
          errorFailAjax(jqXHR.status);
        });
    });
  }
  
  /*Función que comprueba los permisos del usuario sobre el parámetro*/
  async function cargarPermisosFuncParametro(){
    await cargarPermisosFuncParametroAjaxPromesa()
    .then((res) => {
      gestionarPermisosParametro(res.resource);
      setLang(getCookie('lang'));
    }).catch((res) => {
        respuestaAjaxKO(res.code);
        setLang(getCookie('lang'));
        document.getElementById("modal").style.display = "block";
    });
  }
  
  
  /** Función para recuperar los parámetros con ajax y promesas **/
  function cargarParametrosAjaxPromesa(numeroPagina, tamanhoPagina){
    return new Promise(function(resolve, reject) {
      var token = getCookie('tokenUsuario');
  
      var parametro = {
        controlador : 'GestionParametros',
        action: 'search',
        inicio : calculaInicio(numeroPagina, tamanhoPaginaParametro),
        tamanhoPagina : tamanhoPaginaParametro
      }
  
      $.ajax({
        method: "POST",
        url: urlPeticionAjaxListadoParametros,
        contentType : "application/x-www-form-urlencoded; charset=UTF-8",
        data: parametro,  
        headers: {'Authorization': token},
        }).done(res => {
          if (res.code != 'BUSQUEDA_PARAMETRO_CORRECTO') {
            reject(res);
          }
          resolve(res);
        }).fail( function( jqXHR ) {
          errorFailAjax(jqXHR.status);
        });
    });
  }
  
  /**Función para ver en detalle un parámetro con ajax y promesas*/
  function detalleParametroAjaxPromesa(){
    return new Promise(function(resolve, reject) {
      var token = getCookie('tokenUsuario');
  
      var parametro = {
        controlador: 'GestionParametros',
        action: 'searchByParameters',
        parametro_formula: $('#parametroFormula').val(),
        descripcion_parametro: $('#descripcionParametro').val(),
        id_proceso : $('#idProceso').val(),
        inicio : 0,
        tamanhoPagina : 1
      }
  
        $.ajax({
        method: "POST",
        url: urlPeticionAjaxListarParametro,
        contentType : "application/x-www-form-urlencoded; charset=UTF-8",
        data: parametro,  
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
  
  /* Función para obtener los parametros del sistema */
  async function cargarParametros(numeroPagina, tamanhoPagina, paginadorCreado){
    await cargarParametrosAjaxPromesa(numeroPagina, tamanhoPagina)
      .then((res) => {
  
        var numResults = res.resource.numResultados + '';
        var totalResults = res.resource.tamanhoTotal + '';
        var inicio = 0;
        
        if(res.resource.listaBusquedas.length == 0){
          inicio = 0;
        }else{
          inicio = parseInt(res.resource.inicio)+1;
        }
        var textPaginacion = inicio + " - " + (parseInt(res.resource.inicio)+parseInt(numResults))  + " total " + totalResults;
  
        if(res.resource.listaBusquedas.length == 0){
          $('#itemPaginacion').attr('hidden',true);
        }else{
          $('#itemPaginacion').attr('hidden',false);
        }
  
        $("#datosRespuestaPosible").html("");
        $("#checkboxColumnas").html("");
        $("#paginacion").html("");
  
        for (var i = 0; i < res.resource.listaBusquedas.length; i++){
            var tr = construyeFila('PARAMETRO', res.resource.listaBusquedas[i]);
            $("#datosRespuestaPosible").append(tr);
          }
          $("#paginacion").append(textPaginacion);
          setLang(getCookie('lang'));
  
          if(paginadorCreado != 'PaginadorCreado'){
            paginador(totalResults, 'cargarParametros', 'PARAMETRO');
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
  
  /** Funcion añadir parametro **/
  async function addParametro(){
    await anadirParametro()
    .then((res) => {
  
      $("#form-modal").modal('toggle');
      respuestaAjaxOK("PARAMETRO_GUARDADO_OK", res.code);
  
      let idElementoList = ["parametro_formula", "descripcion_parametro"];
      resetearFormulario("formularioGenerico", idElementoList);
      setLang(getCookie('lang'));
      document.getElementById("modal").style.display = "block";
  
      $('#parametroFormula').val(getCookie('parametro_formula'));
      $('#descripcionParametro').val(getCookie('descripcion_parametro'));
      buscarParametro(getCookie('numeroPagina'), tamanhoPaginaParametro, 'buscarPaginacion', 'PaginadorNo');
      setLang(getCookie('lang'));
  
    }).catch((res) => {
        $("#form-modal").modal('toggle');
        respuestaAjaxKO(res.code);
        let idElementoList = ["parametro_formula", "descripcion_parametro"];
        resetearFormulario("formularioGenerico", idElementoList);
        setLang(getCookie('lang'));
        document.getElementById("modal").style.display = "block";
    });
  }
  
  
  /** Funcion buscar respuesta posible **/
  async function buscarParametro(numeroPagina, tamanhoPagina, accion, paginadorCreado){
    await buscarParametroAjaxPromesa(numeroPagina, tamanhoPagina,accion)
    .then((res) => {
        cargarPermisosFuncParametro();
        if($('#form-modal').is(':visible')) {
           $("#form-modal").modal('toggle');
        };
        var datosBusquedas = [];
        datosBusquedas.push('parametro_formula: ' + res.resource.datosBusquedas['parametro_formula']);
        datosBusquedas.push('descripcion_parametro: ' + res.resource.datosBusquedas['descripcion_parametro']);
        guardarParametrosBusqueda(datosBusquedas);

        var numResults = res.resource.numResultados + '';
        var totalResults = res.resource.tamanhoTotal + '';
        var inicio = 0;
        
        if(res.resource.listaBusquedas.length == 0){
          inicio = 0;
        }else{
          inicio = parseInt(res.resource.inicio)+1;
        }
        var textPaginacion = inicio + " - " + (parseInt(res.resource.inicio)+parseInt(numResults))  + " total " + totalResults;
  
        if(res.resource.listaBusquedas.length == 0){
          $('#itemPaginacion').attr('hidden',true);
        }else{
          $('#itemPaginacion').attr('hidden',false);
        }
  
        $("#datosParametro").html("");
        $("#checkboxColumnas").html("");
        $("#paginacion").html("");
          for (var i = 0; i < res.resource.listaBusquedas.length; i++){
            var tr = construyeFila('PARAMETRO', res.resource.listaBusquedas[i]);
            $("#datosParametro").append(tr);
          }
  
        $("#paginacion").append(textPaginacion);
        setLang(getCookie('lang'));
  
        if(paginadorCreado != 'PaginadorCreado'){
            paginador(totalResults, 'buscarParametro', 'PARAMETRO');
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
  
        let idElementoList = ["parametroFormula", "descripcionParametro"];
        resetearFormulario("formularioGenerico", idElementoList);
  
        setLang(getCookie('lang'));
  
        document.getElementById("modal").style.display = "block";
    });
  }
  
  /*Función que refresca la tabla por si hay algún cambio en BD */
  async function refrescarTabla(numeroPagina, tamanhoPagina){
    await cargarParametrosAjaxPromesa(numeroPagina, tamanhoPagina)
    .then((res) => {
        cargarPermisosFuncParametro();
        setCookie('parametro_formula', '');
        setCookie('ddescripcion_parametro', '');
        var numResults = res.resource.numResultados + '';
        var totalResults = res.resource.tamanhoTotal + '';
        var inicio = 0;
        if(res.resource.listaBusquedas.length == 0){
          inicio = 0;
        }else{
          inicio = parseInt(res.resource.inicio)+1;
        }
        var textPaginacion = inicio + " - " + (parseInt(res.resource.inicio)+parseInt(numResults))  + " total " + totalResults;
  
        if(res.resource.listaBusquedas.length == 0){
          $('#itemPaginacion').attr('hidden',true);
        }else{
          $('#itemPaginacion').attr('hidden',false);
        }
  
        $("#datosParametro").html("");
        $("#checkboxColumnas").html("");
        $("#paginacion").html("");
          for (var i = 0; i < res.resource.listaBusquedas.length; i++){
            var tr = construyeFila('PARAMETRO', res.resource.listaBusquedas[i]);
            $("#datosParametro").append(tr);
          }
  
        $("#paginacion").append(textPaginacion);
        setLang(getCookie('lang'));

        paginador(totalResults, 'cargarParametros', 'PARAMETRO');
  
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
  
  /** Función que visualiza un parametro **/
  async function detalleParametro(){
    await detalleParametroAjaxPromesa()
    .then((res) => {
      $("#form-modal").modal('toggle');
  
      let idElementoList = ["parametroFormula", "descripcionParametro"];
      resetearFormulario("formularioGenerico", idElementoList);
      setLang(getCookie('lang'));
      $('#parametroFormula').val(getCookie('parametro_formula'));
      $('#descripcionParametro').val(getCookie('descripcion_parametro'));
  
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