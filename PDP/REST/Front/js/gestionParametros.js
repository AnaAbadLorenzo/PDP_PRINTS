function construyeSelect(){
  var options = "";
  
  $('#selectProcesos').html('');

  var token = getCookie('tokenUsuario');

    var data = {
        controlador : 'GestionProcesos',
        action :'searchAll'
    }

    $.ajax({
      method: "POST",
      url: urlPeticionAjaxListarTodosProcesos,
      contentType : "application/x-www-form-urlencoded; charset=UTF-8",
      data: data,
      headers: {'Authorization': token},
      }).done(res => {
        if (res.code != 'BUSQUEDA_PROCESO_CORRECTO') {
          respuestaAjaxKO(res.code);
        }
        options = '<option selected value=0><label class="">Selecciona el proceso</label></option>';
        for(var i = 0; i< res.resource.length ; i++){
            options += '<option value=' + res.resource[i].id_proceso + '>' + res.resource[i].nombre_proceso + '</option>';
        }

        $('#selectProcesos').append(options);
        
      }).fail( function( jqXHR ) {
        errorFailAjax(jqXHR.status);
      });
}
  
  /** Función para buscar respuestas posibles con ajax y promesas **/
  function buscarParametroAjaxPromesa(numeroPagina, tamanhoPagina, accion){
    return new Promise(function(resolve, reject) {
      var token = getCookie('tokenUsuario');
  
      if(accion == "buscarModal"){

        if($('#selectProcesos').val() == 0 || $('#selectProcesos').val() == null ||  $('#selectProcesos').val() == '0'){
          var idProceso = "";
        }else{
          var idProceso = $('#selectProcesos').val();
        }
        var parametro = {
          controlador: 'GestionParametros',
          action: 'searchByParameters',
          parametro_formula : $('#parametroFormula').val(),
          descripcion_parametro : $('#descripcionParametro').val(),
          id_proceso : idProceso,
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

        if(getCookie('id_proceso') == null || getCookie('id_proceso') == ""){
          var idProceso = "";
        }else{
          var idProceso = getCookie('id_proceso');
        }


        var parametro = {
          controlador: 'GestionParametros',
          action: 'searchByParameters',
          parametro_formula : parametro,
          descripcion_parametro : descripcionParam,
          id_proceso : idProceso,
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
          if (res.code != 'BUSQUEDA_PERSONALIZADA_PARAMETRO_CORRECTO') {
            reject(res);
          }
          resolve(res);
        }).fail( function( jqXHR ) {
          errorFailAjax(jqXHR.status);
        });
    });
  }
  
  /** Función para recuperar los permisos de un usuario sobre la funcionalidad **/
  function cargarPermisosFuncParametroAjaxPromesa(){
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
        id_proceso: $('#selectProcesos').val()
      }

        $.ajax({
        method: "POST",
        url: urlPeticionAjaxEditarParametro,
        contentType : "application/x-www-form-urlencoded; charset=UTF-8",
        data: parametro,  
        headers: {'Authorization': token},
        }).done(res => {
          if (res.code != 'PARAMETRO_EDITADO') {
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
        controlador: 'GestionParametros',
        action: 'delete',
        id_parametro : $("input[name=idParametro]").val(),
        parametro_formula : $('#parametroFormula').val(),
        descripcion_parametro : $('#descripcionParametro').val(),
        id_proceso : $('#selectProcesos').val()
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
  
      if($('#selectProcesos').val() == null || $('#selectProcesos').val() == 0 || $('#selectProcesos').val() == '0'){
        var idProceso = "";
      }else{
        var idProceso = $('#selectProcesos').val();
      }
      var parametro = {
        controlador: 'GestionParametros',
        action: 'searchByParameters',
        parametro_formula: $('#parametroFormula').val(),
        descripcion_parametro: $('#descripcionParametro').val(),
        id_proceso : idProceso,
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
        datosBusquedas.push('id_proceso: ' + res.resource.datosBusquedas['id_proceso']);
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
        cargarPermisosFuncParametro();
        respuestaAjaxKO(res.code);
  
        let idElementoList = ["parametroFormula", "descripcionParametro", "se"];
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
        setCookie('descripcion_parametro', '');
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
  
  /** Función que edita un parámetro **/
  async function editParametro(){
    await editarParametroAjaxPromesa()
    .then((res) => {
      $("#form-modal").modal('toggle');
  
      respuestaAjaxOK("PARAMETRO_EDITADO_OK", res.code);
  
      let idElementoList = ["parametroFormula", "descripcionParametro", "selectProcesos"];
      resetearFormulario("formularioGenerico", idElementoList);
      setLang(getCookie('lang'));
      document.getElementById("modal").style.display = "block";
      $('#parametroFormula').val(getCookie('parametro_formula'));
      $('#descripcionParametro').val(getCookie('descripcion_parametro'));
      buscarParametro(getCookie('numeroPagina'), tamanhoPaginaParametro, 'buscarPaginacion', 'PaginadorCreado');
  
    }).catch((res) => {
      $("#form-modal").modal('toggle');
      respuestaAjaxKO(res.code);
  
      let idElementoList = ["parametroFormula", "descripcionParametro", "selectProcesos"];
      resetearFormulario("formularioGenerico", idElementoList);
  
      setLang(getCookie('lang'));
  
      document.getElementById("modal").style.display = "block";
  
  
    });
  }
  
  /** Función que elimina un parametro **/
  async function deleteParametro(){
    await eliminarParametroAjaxPromesa()
    .then((res) => {
      $("#form-modal").modal('toggle');
  
      respuestaAjaxOK("PARAMETRO_ELIMINADO_OK", res.code);
  
      let idElementoList = ["parametroFormula", "descripcionParametro", "selectProcesos"];
      resetearFormulario("formularioGenerico", idElementoList);
      setLang(getCookie('lang'));
      document.getElementById("modal").style.display = "block";
  
      refrescarTabla(0, tamanhoPaginaParametro);
  
    }).catch((res) => {
  
       $("#form-modal").modal('toggle');
        respuestaAjaxKO(res.code);
  
        let idElementoList = ["parametroFormula, descripcionParametro", "selectProcesos"];
        resetearFormulario("formularioGenerico", idElementoList);
  
        setLang(getCookie('lang'));
  
        document.getElementById("modal").style.display = "block";
  
  
    });
  }
  
  /** Funcion para buscar un parametro **/
  function showBuscarParametro() {
    var idioma = getCookie('lang');
  
    cambiarFormulario('SEARCH_PARAMETRO', 'javascript:buscarParametro(0,' + tamanhoPaginaParametro + ', \'buscarModal\'' + ',\'PaginadorNo\');', 
      'return comprobarBuscarParametro();');
    cambiarOnBlurCampos('return comprobarParametroFormulaSearch(\'parametroFormula\', \'errorFormatoParametroFormula\', \'parametroFormula\')',
      'return comprobarDescripcionParametroSearch(\'descripcionParametro\', \'errorFormatoDescripcionParametro\', \'descripcionParametro\')');
    cambiarIcono('images/search.png', 'ICONO_SEARCH', 'iconoSearchParametro', 'Buscar');
    setLang(idioma);
  
    $('#labelParametroFormula').attr('hidden', true);
    $('#labelDescripcionParametro').attr('hidden', true);
    $('#labelIdProceso').attr('hidden', false);
  
    let campos = ["parametroFormula, descripcionParametro", "selectProcesos"];
    let obligatorios = ["obligatorioParametroFormula", "obligatorioDescripcionParametro", "obligatorioIdProceso"];
    eliminarReadonly(campos);
    ocultarObligatorios(obligatorios);
    habilitaCampos(campos);
    setLang(getCookie('lang'));
  
  }
  
  /** Funcion para visualizar un parametro **/
  function showDetalle(parametroFormula, descripcionParametro, idProceso, nombreProceso, idParametro) {
  
      var idioma = getCookie('lang');
  
      cambiarFormulario('DETAIL_PARAMETRO', 'javascript:detalleParametro();', '');
      cambiarIcono('images/close2.png', 'ICONO_CERRAR', 'iconoCerrar', 'Detalle');
  
      setLang(idioma);
  
      $('#labelParametroFormula').attr('hidden', false);
      $('#labelDescripcionParametro').attr('hidden', false);
      $('#labelIdProceso').attr('hidden', false);
  
      rellenarFormulario(parametroFormula, descripcionParametro, idProceso, nombreProceso);
  
      let campos = ["parametroFormula", "descripcionParametro", "selectProcesos"];
      let obligatorios = ["obligatorioParametroFormula", "obligatorioDescripcionParametro", "obligatorioIdProceso"];
      anadirReadonly(campos);
      ocultarObligatorios(obligatorios);
      deshabilitaCampos(campos);
      setLang(getCookie('lang'));
  
  }
  
  /** Funcion para editar un parametro **/
  function showEditar(parametroFormula, descripcionParametro, idProceso, nombreProceso, idParametro) {
    var idioma = getCookie('lang');
  
      cambiarFormulario('EDIT_PARAMETRO', 'javascript:editParametro();', 
        'return comprobarEditParametro();');
        cambiarOnBlurCampos('return comprobarParametroFormula(\'parametroFormula\', \'errorFormatoParametroFormula\', \'parametroFormula\')',
        'return comprobarDescripcionParametro(\'descripcionParametro\', \'errorFormatoDescripcionParametro\', \'descripcionParametro\')',
        'return comprobarSelect(\'selectProcesos\', \'errorFormatoIdProceso\', \'selectProcesos\')');
      cambiarIcono('images/edit.png', 'ICONO_EDIT', 'iconoEditarParametro', 'Editar');
  
      setLang(idioma);
  
      $('#labelParametroFormula').attr('hidden', true);
      $('#labelDescripcionParametro').attr('hidden', true);
      $('#labelIdProceso').attr('hidden', false);
  
      rellenarFormulario(parametroFormula, descripcionParametro, idProceso, nombreProceso);
      insertacampo(document.formularioGenerico,'idParametro', idParametro);
  
      let campos = ["descripcionParametro", "idProceso"];
      let obligatorios = ["obligatorioParametroFormula", "obligatorioDescripcionParametro", "obligatorioIdProceso"];
      anadirReadonly(["parametroFormula"]);
      deshabilitaCampos(["parametroFormula"]);
      eliminarReadonly(campos);
      mostrarObligatorios(obligatorios);
      habilitaCampos(campos);
      setLang(getCookie('lang'));
  
  }
  
  /** Función para eliminar un parameto **/
  function showEliminar(parametroFormula, descripcionParametro, idProceso, nombreProceso, idParametro) {
  
      var idioma = getCookie('lang');
  
      cambiarFormulario('DELETE_PARAMETRO', 'javascript:deleteParametro();', '');
      cambiarIcono('images/delete.png', 'ICONO_ELIMINAR', 'iconoEliminar', 'Eliminar');
  
      setLang(idioma);
  
      $('#labelParametroFormula').attr('hidden', false);
      $('#labelDescripcionParametro').attr('hidden', false);
      $('#labelIdProceso').attr('hidden', false);
  
  
      rellenarFormulario(parametroFormula, descripcionParametro, idProceso, nombreProceso);
      insertacampo(document.formularioGenerico,'idParametro', idParametro);
  
      let campos = ["parametroFormula, descripcionParametro", "selectProcesos"];
      let obligatorios = ["obligatorioParametroFormula", "obligatorioDescripcionParametro", "obligatorioIdProceso"];
      anadirReadonly(campos);
      ocultarObligatorios(obligatorios);
      deshabilitaCampos(campos);
      setLang(getCookie('lang'));
  
  }
  
  /**Función para cambiar onBlur de los campos*/
  function cambiarOnBlurCampos(onBlurParametroFormula, onBlurDescripcionParametro, onBlurProcesos) {
  
      if (onBlurParametroFormula != ''){
          $("#parametroFormula").attr('onblur', onBlurParametroFormula);
      }

      if (onBlurDescripcionParametro != ''){
        $("#descripcionParametro").attr('onblur', onBlurDescripcionParametro);
      }

      if (onBlurProcesos != ''){
        $("#selectProcesos").attr('onblur', onBlurProcesos);
      }
  }
  
  /**Función que rellenado los datos del formulario*/
  function rellenarFormulario(parametroFormula, descripcionParametro, idProceso, nombreProceso) {
  
      $("#parametroFormula").val(parametroFormula);
      $('#descripcionParametro').val(descripcionParametro);
      $('#selectProcesos').val(idProceso);
  
  }
  
  /** Función para gestionar los iconos dependiendo de los permisos de los usuarios **/
  function gestionarPermisosParametro(idElementoList) {
    document.getElementById('cabecera').style.display = "none";
    document.getElementById('tablaDatos').style.display = "none";
    document.getElementById('filasTabla').style.display = "none";
    $('#itemPaginacion').attr('hidden', true);
  
    idElementoList.forEach( function (idElemento) {
      switch(idElemento.nombre_accion){
  
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
          $('#btnListarParametros').attr('src', 'images/search3.png');
          $('#btnListarParametros').css("cursor", "pointer");
          $('#divListarParametros').attr("data-toggle", "modal");
          $('#divListarParametros').attr("data-target", "#form-modal");
          document.getElementById('cabecera').style.display = "block";
          document.getElementById('tablaDatos').style.display = "block";
          document.getElementById('filasTabla').style.display = "block";
           $('#itemPaginacion').attr('hidden', false);
  
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
  
      let idElementoErrorList = ["errorFormatoParametroFormula", "errorFormatoDescripcionParametro", "errorFormatoIdProceso"];
  
      let idElementoList = ["parametroFormula", "descripcionFormula", "selectProcesos"];
  
      limpiarFormulario(idElementoList);
      eliminarMensajesValidacionError(idElementoErrorList, idElementoList);
      setLang(getCookie('lang'));
  
      resetearFormulario("formularioGenerico", idElementoList);
  
    });
  
  }); 