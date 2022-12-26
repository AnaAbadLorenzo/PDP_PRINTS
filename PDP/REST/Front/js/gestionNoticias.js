/** Función para añadir noticias con ajax y promesas **/
function anadirNoticiaAjaxPromesa(){
    return new Promise(function(resolve, reject) {
      var token = getCookie('tokenUsuario');
  
      const fecha = new Date();
  
      var noticiaEntity = {
        controlador : 'GestionNoticias',
        action : 'add',
        titulo_noticia : $('#tituloNoticia').val(),
        contenido_noticia : $('#textoNoticia').val(),
        fecha_noticia : "",
      }

      $.ajax({
        method: "POST",
        url: urlPeticionAjaxAddNoticia,
        contentType : "application/x-www-form-urlencoded; charset=UTF-8",
        data: noticiaEntity,  
        headers: {'Authorization': token},
        }).done(res => {
          if (res.code != 'ADD_NOTICIA_COMPLETO') {
            reject(res);
          }
          resolve(res);
        }).fail( function( jqXHR ) {
          errorFailAjax(jqXHR.status);
        });
    });
  }
  
  /** Función para buscar noticias con ajax y promesas **/
  function buscarNoticiaAjaxPromesa(numeroPagina, tamanhoPagina, accion){
    return new Promise(function(resolve, reject) {
      var token = getCookie('tokenUsuario');
  
      if(accion == "buscarModal"){
        if($('#fechaNoticia').val() == "1900-01-01"){
          var fecha = "";
        }else{
            var fecha = $('#fechaNoticia').val();
        }
  
        if($('#textoNoticia').val() == "Texto noticia"){
          var textoNoticia = "";
        }else{
          var textoNoticia = $('#textoNoticia').val();
        }
        var data = {
          controlador : 'GestionNoticias',
          action: 'searchByParameters',
          titulo_noticia : $('#tituloNoticia').val(),
          contenido_noticia : textoNoticia,
          fecha_noticia : fecha,
          inicio : calculaInicio(numeroPagina, tamanhoPaginaNoticia),
          tamanhoPagina : tamanhoPaginaNoticia
        }
      }
  
      if(accion == "buscarPaginacion"){
        if(getCookie('titulo_noticia') == null || getCookie('titulo_noticia') == ""){
          var titulo = "";
        }else{
          var titulo = getCookie('titulo_noticia');
        }
  
        if(getCookie('contenido_noticia') == null || getCookie('contenido_noticia') == ""){
          var texto = "";
        }else{
          var texto = getCookie('contenido_noticia');
        }
  
  
        if(getCookie('fecha_noticia') == null || getCookie('fecha_noticia') == "null" || getCookie('fecha_noticia') == "" || getCookie('fecha_noticia') == "1900-01-01" ){
          var fecha = "";
        }else{
          var fecha = getCookie('fecha_noticia');
          var fechaString = convierteFecha(fecha);
        }
        var data = {
          controlador : 'GestionNoticias',
          action: 'searchByParameters',
          titulo_noticia : titulo,
          contenido_noticia : texto,
          fecha_noticia : fechaString,
          inicio : calculaInicio(numeroPagina, tamanhoPaginaNoticia),
          tamanhoPagina : tamanhoPaginaNoticia
        }
      }
      
      $.ajax({
        method: "POST",
        url: urlPeticionAjaxListarNoticia,
        contentType : "application/x-www-form-urlencoded; charset=UTF-8",
        data: data,
        headers: {'Authorization': token},
        }).done(res => {
          if (res.code != 'BUSQUEDA_PERSONALIZADA_NOTICIA_CORRECTO') {
            reject(res);
          }
          resolve(res);
        }).fail( function( jqXHR ) {
          errorFailAjax(jqXHR.status);
        });
    });
  }
  
  /** Función para recuperar los permisos de un usuario sobre la funcionalidad **/
  function cargarPermisosFuncNoticiaAjaxPromesa(){
    return new Promise(function(resolve, reject) {
      var nombreUsuario = getCookie('usuario');
      var token = getCookie('tokenUsuario');
      
      var usuario = nombreUsuario;

      var data = {
        controlador : 'GestionACL',
        action: 'searchAccionesPorFuncionalidadUsuario',
        usuario : usuario,
        nombre_funcionalidad : 'Gestión de noticias'
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
  
  /**Función para editar una noticia con ajax y promesas*/
  function editarNoticiaAjaxPromesa(){
    return new Promise(function(resolve, reject) {
      var token = getCookie('tokenUsuario');
  
      const fecha = new Date();
  
       var noticiaEntity = {
        controlador : 'GestionNoticias',
        action: 'edit',
        id_noticia : $("input[name=idNoticia]").val(),
        titulo_noticia : $('#tituloNoticia').val(),
        contenido_noticia : $('#textoNoticia').val(),
        fecha_noticia : ""
      }
  
        $.ajax({
        method: "POST",
        url: urlPeticionAjaxEditarNoticia,
        contentType : "application/x-www-form-urlencoded; charset=UTF-8",
        data: noticiaEntity,  
        headers: {'Authorization': token},
        }).done(res => {
          if (res.code != 'EDIT_NOTICIA_COMPLETO') {
            reject(res);
          }
          resolve(res);
        }).fail( function( jqXHR ) {
          errorFailAjax(jqXHR.status);
        });
    });
  }
  
  /**Función para eliminar una noticia con ajax y promesas*/
  function eliminarNoticiaAjaxPromesa(){
    return new Promise(function(resolve, reject) {
      var token = getCookie('tokenUsuario');
  
      var noticiaEntity = {
        controlador: 'GestionNoticias',
        action: 'delete',
        id_noticia : $("input[name=idNoticia]").val(),
        titulo_noticia : $('#tituloNoticia').val(),
        contenido_noticia : $('#textoNoticia').val(),
        fecha_noticia : $('#fechaNoticia').val()
      }
  
        $.ajax({
        method: "POST",
        url: urlPeticionAjaxBorrarNoticia,
        contentType : "application/x-www-form-urlencoded; charset=UTF-8",
        data: noticiaEntity,  
        headers: {'Authorization': token},
        }).done(res => {
          if (res.code != 'DELETE_NOTICIA_COMPLETO') {
            reject(res);
          }
          resolve(res);
        }).fail( function( jqXHR ) {
          errorFailAjax(jqXHR.status);
        });
    });
  }
  
  /*Función que comprueba los permisos del usuario sobre la noticia **/
  async function cargarPermisosFuncNoticia(){
    await cargarPermisosFuncNoticiaAjaxPromesa()
    .then((res) => {
      gestionarPermisosNoticia(res.resource);
      setLang(getCookie('lang'));
    }).catch((res) => {
        respuestaAjaxKO(res.code);
        setLang(getCookie('lang'));
        document.getElementById("modal").style.display = "block";
    });
  }
  
  
  /** Función para recuperar las noticias con ajax y promesas **/
  function cargarNoticiasTablaAjaxPromesa(numeroPagina, tamanhoPagina){
    return new Promise(function(resolve, reject) {
        var token = getCookie('tokenUsuario');
  
      var data = {
        controlador : 'GestionNoticias',
        action: 'search',
        inicio : calculaInicio(numeroPagina, tamanhoPaginaNoticia),
        tamanhoPagina : tamanhoPaginaNoticia
      }
      
      $.ajax({
        method: "POST",
        url: urlPeticionAjaxListarTodasNoticiasPaginacion,
        contentType : "application/x-www-form-urlencoded; charset=UTF-8",
        data: data,  
        headers: {'Authorization': token},
        }).done(res => {
          if (res.code != 'BUSQUEDA_NOTICIA_CORRECTO') {
            reject(res);
          }
          resolve(res);
        }).fail( function( jqXHR ) {
          errorFailAjax(jqXHR.status);
        });
    });
  }
  
  /**Función para ver en detalle una funcionalidad con ajax y promesas*/
  function detalleNoticiaAjaxPromesa(){
    return new Promise(function(resolve, reject) {
      var token = getCookie('tokenUsuario');
      
      var data = {
        controlador : 'GestionNoticias',
        action : 'searchByParameters',
        titulo_noticia : $('#tituloNoticia').val(),
        contenido_noticia : $('#textoNoticia').val(),
        fecha_noticia : $('#fechaNoticia').val(),
        inicio : 0,
        tamanhoPagina : 1
      }
  
        $.ajax({
        method: "POST",
        url: urlPeticionAjaxListarNoticia,
        contentType : "application/json",
        contentType : "application/x-www-form-urlencoded; charset=UTF-8",
        data: data,  
        headers: {'Authorization': token},
        }).done(res => {
          if (res.code != 'BUSQUEDA_PERSONALIZADA_NOTICIA_CORRECTO') {
            reject(res);
          }
          resolve(res);
        }).fail( function( jqXHR ) {
          errorFailAjax(jqXHR.status);
        });
    });
  }
  
  /* Función para obtener las noticias del sistema */
  async function cargarNoticiasTabla(numeroPagina, tamanhoPagina, paginadorCreado){
      await cargarNoticiasTablaAjaxPromesa(numeroPagina, tamanhoPagina)
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
             
        $("#datosNoticia").html("");
             $("#checkboxColumnas").html("");
             $("#paginacion").html("");
              
        for (var i = 0; i < res.resource.listaBusquedas.length; i++){
                  var tr = construyeFila('NOTICIA', res.resource.listaBusquedas[i]);
                  $("#datosNoticia").append(tr);
              }
          
          var div = createHideShowColumnsWindow({TEXTO_NOTICIA_COLUMN:2});
            $("#checkboxColumnas").append(div);
            $("#paginacion").append(textPaginacion);
  
          if(paginadorCreado != 'PaginadorCreado'){
            paginador(totalResults, 'cargarNoticias', 'NOTICIA');
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
  
  /** Funcion añadir noticia **/
  async function addNoticia(){
    await anadirNoticiaAjaxPromesa()
    .then((res) => {
      $("#form-modal").modal('toggle');
      respuestaAjaxOK("NOTICIA_GUARDADA_OK", res.code);
  
      let idElementoList = ["tituloNoticia", "textoNoticia"];
      resetearFormulario("formularioGenerico", idElementoList);
      document.getElementById("modal").style.display = "block";
      
      $('#tituloNoticia').val(getCookie('tituloNoticia'));
      $('#textoNoticia').val(getCookie('textoNoticia'));
      
      buscarNoticia(getCookie('numeroPagina'), tamanhoPaginaNoticia, 'buscarPaginacion', 'PaginadorNo');
      setLang(getCookie('lang'));
  
    }).catch((res) => {
        $("#form-modal").modal('toggle');
  
        respuestaAjaxKO(res.code);
  
        let idElementoList = ["tituloNoticia", "textoNoticia", "fechaNoticia"];
        resetearFormulario("formularioGenerico", idElementoList);
  
        setLang(getCookie('lang'));
  
        document.getElementById("modal").style.display = "block";
    });
  }
  
  
  /** Funcion buscar noticia **/
  async function buscarNoticia(numeroPagina, tamanhoPagina, accion, paginadorCreado){
    await buscarNoticiaAjaxPromesa(numeroPagina, tamanhoPagina,accion)
    .then((res) => {
        cargarPermisosFuncNoticia();
        if($('#form-modal').is(':visible')) {
           $("#form-modal").modal('toggle');
        };
        var datosBusquedas = [];
        datosBusquedas.push('titulo_noticia: ' +res.resource.datosBusquedas['titulo_noticia']);
        datosBusquedas.push('contenido_noticia: ' +res.resource.datosBusquedas['contenido_noticia']);
        datosBusquedas.push('fecha_noticia: ' +res.resource.datosBusquedas['fecha_noticia']);
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
  
        $("#datosNoticia").html("");
        $("#checkboxColumnas").html("");
        $("#paginacion").html("");
          for (var i = 0; i < res.resource.listaBusquedas.length; i++){
            var tr = construyeFila('NOTICIA', res.resource.listaBusquedas[i]);
            $("#datosNoticia").append(tr);
          }
        
        var div = createHideShowColumnsWindow({TEXTO_NOTICIA_COLUMN:2});
        
        $("#checkboxColumnas").append(div);
        $("#paginacion").append(textPaginacion);
  
        if(paginadorCreado != 'PaginadorCreado'){
            paginador(totalResults, 'buscarNoticia', 'NOTICIA');
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
        cargarPermisosFuncNoticia();
        respuestaAjaxKO(res.code);
  
        let idElementoList = ["tituloNoticia", "textoNoticia", "fechaNoticia"];
        resetearFormulario("formularioGenerico", idElementoList);
  
        setLang(getCookie('lang'));
  
        document.getElementById("modal").style.display = "block";
    });
  }
  
  /*Función que refresca la tabla por si hay algún cambio en BD */
  async function refrescarTabla(numeroPagina, tamanhoPagina){
    await cargarNoticiasTablaAjaxPromesa(numeroPagina, tamanhoPagina)
    .then((res) => {
        cargarPermisosFuncNoticia();
        setCookie('titulo_noticia', '');
        setCookie('contenido_noticia', '');
        setCookie('fecha_noticia', '');
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
        
        $("#datosNoticia").html("");
        $("#checkboxColumnas").html("");
        $("#paginacion").html("");
          for (var i = 0; i < res.resource.listaBusquedas.length; i++){
            var tr = construyeFila('NOTICIA', res.resource.listaBusquedas[i]);
            $("#datosNoticia").append(tr);
          }
        
        var div = createHideShowColumnsWindow({TEXTO_NOTICIA_COLUMN:2});
        $("#checkboxColumnas").append(div);
        $("#paginacion").append(textPaginacion);
  
        setCookie('titulo_noticia', '');
        setCookie('contenido_noticia', '');
  
        paginador(totalResults, 'cargarNoticias', 'NOTICIA');
  
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
  
  
  
  /** Función que visualiza una noticia **/
  async function detalleNoticia(){
    await detalleNoticiaAjaxPromesa()
    .then((res) => {
      $("#form-modal").modal('toggle');
  
      let idElementoList = ["tituloNoticia", "textoNoticia", "fechaNoticia"];
      resetearFormulario("formularioGenerico", idElementoList);
      $('#tituloNoticia').val(getCookie('tituloNoticia'));
      $('#textoNoticia').val(getCookie('textoNoticia'));
      setLang(getCookie('lang'));
  
    }).catch((res) => {
        $("#form-modal").modal('toggle');
  
        respuestaAjaxKO(res.code);
  
        let idElementoList = ["tituloNoticia", "textoNoticia", "fechaNoticia"];
        resetearFormulario("formularioGenerico", idElementoList);
        
        setLang(getCookie('lang'));
  
        document.getElementById("modal").style.display = "block";
    });
  }
  
  /** Función que edita una noticia **/
  async function editNoticia(){
    await editarNoticiaAjaxPromesa()
    .then((res) => {
      $("#form-modal").modal('toggle');
  
      respuestaAjaxOK("NOTICIA_EDITADA_OK", res.code);
  
      let idElementoList = ["tituloNoticia", "textoNoticia"];
      resetearFormulario("formularioGenerico", idElementoList);
      document.getElementById("modal").style.display = "block";
      $('#tituloNoticia').val(getCookie('tituloNoticia'));
      $('#textoNoticia').val(getCookie('textoNoticia'));
      buscarNoticia(getCookie('numeroPagina'), tamanhoPaginaNoticia, 'buscarPaginacion', 'PaginadorCreado');
      setLang(getCookie('lang'));
  
    }).catch((res) => {
      $("#form-modal").modal('toggle');
  
       respuestaAjaxKO(res.code);
  
      let idElementoList = ["tituloNoticia", "textoNoticia", "fechaNoticia"];
      resetearFormulario("formularioGenerico", idElementoList);
  
      setLang(getCookie('lang'));
  
      document.getElementById("modal").style.display = "block";
  
  
    });
  }
  
  /** Función que elimina una noticia **/
  async function deleteNoticia(){
    await eliminarNoticiaAjaxPromesa()
    .then((res) => {
      $("#form-modal").modal('toggle');
  
      respuestaAjaxOK("NOTICIA_ELIMINADA_OK", res.code);
  
      let idElementoList = ["tituloNoticia", "textoNoticia", "fechaNoticia"];
      resetearFormulario("formularioGenerico", idElementoList);
      document.getElementById("modal").style.display = "block";
     
      refrescarTabla(0, tamanhoPaginaNoticia);
      setLang(getCookie('lang'));
  
    }).catch((res) => {
       
       $("#form-modal").modal('toggle');
        respuestaAjaxKO(res.code);
  
        let idElementoList = ["tituloNoticia", "textoNoticia", "fechaNoticia"];
        resetearFormulario("formularioGenerico", idElementoList);
  
        setLang(getCookie('lang'));
  
        document.getElementById("modal").style.display = "block";
  
  
    });
  }
  
  
  /** Funcion para mostrar el formulario para añadir una noticia **/
  function showAddNoticias() {
    cambiarFormulario('ADD_NOTICIA', 'javascript:addNoticia();', 'return comprobarAddNoticia();');
    cambiarOnBlurCampos('return comprobarTituloNoticia(\'tituloNoticia\', \'errorFormatoTituloNoticia\', \'tituloNoticia\')', 
        'return comprobarTextoNoticia(\'textoNoticia\', \'errorFormatoTextoNoticia\', \'textoNoticia\')');
    cambiarIcono('images/add.png', 'ICONO_ADD', 'iconoAddNoticia', 'Añadir');
  
    $('#subtitulo').attr('hidden', true);
    $('#labelTituloNoticia').attr('hidden', true);
    $('#labelTextoNoticia').attr('hidden', true);
    $('#labelFechaNoticia').attr('hidden', true);
    $('#fechaNoticia').attr('hidden', true);
  
    let campos = ["tituloNoticia", "textoNoticia", "fechaNoticia"];
    let obligatorios = ["obligatorioTituloNoticia", "obligatorioTextoNoticia", "obligatorioFechaNoticia"];
    eliminarReadonly(campos);
    mostrarObligatorios(obligatorios);
    habilitaCampos(campos);
    ocultarObligatorios(["obligatorioFechaNoticia"]);
    setLang(getCookie('lang'));
  
  }
  
  /** Funcion para buscar una noticia **/
  function showBuscarNoticia() {
  
    cambiarFormulario('SEARCH_NOTICIA', 'javascript:buscarNoticia(0,' + tamanhoPaginaNoticia + ', \'buscarModal\'' + ',\'PaginadorNo\');', 'return comprobarBuscarNoticia();');
    cambiarOnBlurCampos('return comprobarTituloNoticiaSearch(\'tituloNoticia\', \'errorFormatoTituloNoticia\', \'tituloNoticia\')', 
        'return comprobarTextoNoticiaSearch(\'textoNoticia\', \'errorFormatoTextoNoticia\', \'textoNoticia\')');
    cambiarIcono('images/search.png', 'ICONO_SEARCH', 'iconoSearchNoticia', 'Buscar');
  
    $('#subtitulo').attr('hidden', true);
    $('#labelTituloNoticia').attr('hidden', true);
    $('#labelTextoNoticia').attr('hidden', true);
    $('#labelFechaNoticia').attr('hidden', true);
    $('#fechaNoticia').removeAttr('hidden');
  
    let campos = ["tituloNoticia", "textoNoticia", "fechaNoticia"];
    let obligatorios = ["obligatorioTituloNoticia", "obligatorioTextoNoticia", "obligatorioFechaNoticia"];
    eliminarReadonly(campos);
    ocultarObligatorios(obligatorios);
    habilitaCampos(campos);
    setLang(getCookie('lang'));
  
  }
  
  /** Funcion para visualizar una funcionalidad **/
  function showDetalle(tituloNoticia, textoNoticia, fechaNoticia, idNoticia) {
  
      cambiarFormulario('DETAIL_NEW', 'javascript:detalleNoticia();', '');
      cambiarIcono('images/close2.png', 'ICONO_CERRAR', 'iconoCerrar', 'Detalle');
   
      $('#labelTituloNoticia').removeAttr('hidden');
      $('#labelTextoNoticia').removeAttr('hidden');
      $('#labelFechaNoticia').removeAttr('hidden');
      $('#fechaNoticia').removeAttr('hidden');
      $('#subtitulo').attr('hidden', '');
  
      rellenarFormulario(tituloNoticia, textoNoticia, fechaNoticia);
      insertacampo(document.formularioGenerico,'idNoticia', idNoticia);
  
      let campos = ["tituloNoticia", "textoNoticia", "fechaNoticia"];
      let obligatorios = ["obligatorioTituloNoticia", "obligatorioTextoNoticia", "obligatorioFechaNoticia"];
      anadirReadonly(campos);
      ocultarObligatorios(obligatorios);
      deshabilitaCampos(campos);
      setLang(getCookie('lang'));
  
  }
  
  /** Funcion para editar una noticia **/
  function showEditar(tituloNoticia, textoNoticia, fechaNoticia, idNoticia) {
  
      cambiarFormulario('EDIT_NEW', 'javascript:editNoticia();', 'return comprobarEditNoticia();');
      cambiarOnBlurCampos('return comprobarTituloNoticia(\'tituloNoticia\', \'errorFormatoTituloNoticia\', \'tituloNoticia\')', 
        'return comprobarTextoNoticia(\'textoNoticia\', \'errorFormatoTextoNoticia\', \'textoNoticia\')');
      cambiarIcono('images/edit.png', 'ICONO_EDIT', 'iconoEditarNoticia', 'Editar');
  
      $('#subtitulo').attr('hidden', true);
      $('#labelTituloNoticia').attr('hidden', true);
      $('#labelTextoNoticia').attr('hidden', true);
      $('#labelFechaNoticia').attr('hidden', true);
      $('#fechaNoticia').attr('hidden', true);
  
      rellenarFormulario(tituloNoticia, textoNoticia, fechaNoticia);
      insertacampo(document.formularioGenerico,'idNoticia', idNoticia);
  
      let campos = ["tituloNoticia", "textoNoticia", "fechaNoticia"];
      let obligatorios = ["obligatorioTituloNoticia", "obligatorioTextoNoticia", "obligatorioFechaNoticia"];
      eliminarReadonly(campos);
      mostrarObligatorios(obligatorios);
      habilitaCampos(campos);
      deshabilitaCampos(["tituloNoticia"]);
      anadirReadonly(["tituloNoticia"]);
      setLang(getCookie('lang'));
  
  }
  
  /** Función para eliminar una noticia **/
  function showEliminar(tituloNoticia, textoNoticia, fechaNoticia, idNoticia) {
  
      cambiarFormulario('DELETE_NEW', 'javascript:deleteNoticia();', '');
      cambiarIcono('images/delete.png', 'ICONO_ELIMINAR', 'iconoEliminar', 'Eliminar');
    
      $('#labelTituloNoticia').removeAttr('hidden');
      $('#labelTextoNoticia').removeAttr('hidden');
      $('#labelFechaNoticia').removeAttr('hidden');
      $('#fechaNoticia').removeAttr('hidden');
      $('#subtitulo').removeAttr('class');
      $('#subtitulo').empty();
      $('#subtitulo').attr('class', 'SEGURO_ELIMINAR_NOT');
      $('#subtitulo').attr('hidden', false);
      
  
      rellenarFormulario(tituloNoticia, textoNoticia, fechaNoticia);
      insertacampo(document.formularioGenerico,'idNoticia', idNoticia);
  
      let campos = ["tituloNoticia", "textoNoticia", "fechaNoticia"];
      let obligatorios = ["obligatorioTituloNoticia", "obligatorioTextoNoticia", "obligatorioFechaNoticia"];
      anadirReadonly(campos);
      ocultarObligatorios(obligatorios);
      deshabilitaCampos(campos);
      setLang(getCookie('lang'));
  
  }
  
  /**Función para cambiar onBlur de los campos*/
  function cambiarOnBlurCampos(onBlurTituloNoticia, onBlurTextoNoticia) {
      
      if (onBlurTituloNoticia != ''){
          $("#tituloNoticia").attr('onblur', onBlurTituloNoticia);
      }
  
      if (onBlurTextoNoticia != ''){
          $("#textoNoticia").attr('onblur', onBlurTextoNoticia);
      }
  }
  
  /**Función que rellenado los datos del formulario*/
  function rellenarFormulario(tituloNoticia, textoNoticia, fechaNoticia) {
  
      $("#tituloNoticia").val(tituloNoticia);
      $("#textoNoticia").val(textoNoticia); 
      var fecha = fechaNoticia.split('-');
      var fech = fecha[2] + "-" + fecha[1] + "-" + fecha[0];
      $('#fechaNoticia').val(fech);
  
      setLang(getCookie('lang'));
  
  }
  
  /** Función para gestionar los iconos dependiendo de los permisos de los usuarios **/
  function gestionarPermisosNoticia(idElementoList) {
    document.getElementById('cabecera').style.display = "none";
    document.getElementById('tablaDatos').style.display = "none";
    document.getElementById('filasTabla').style.display = "none";
    $('#itemPaginacion').attr('hidden', true);
  
    idElementoList.forEach( function (idElemento) {
      switch(idElemento.nombre_accion){
        case "Añadir":
          $('#btnAddNoticia').attr('src', 'images/add3.png');
          $('#btnAddNoticia').css("cursor", "pointer");
          $('#divAddNoticia').attr("data-toggle", "modal");
          $('#divAddNoticia').attr("data-target", "#form-modal");
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
          $('#btnListarNoticias').attr('src', 'images/search3.png');
          $('#btnListarNoticias').css("cursor", "pointer");
          $('#divListarNoticias').attr("data-toggle", "modal");
          $('#divListarNoticias').attr("data-target", "#form-modal");
  
          document.getElementById('cabecera').style.display = "block";
          document.getElementById('tablaDatos').style.display = "block";
          document.getElementById('filasTabla').style.display = "block";
          $('#itemPaginacion').attr('hidden', false);
  
          if(document.getElementById('cabeceraEliminados').style.display == "block"){
            document.getElementById('cabecera').style.display = "none";
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
      
      let idElementoErrorList = ["errorFormatoTituloNoticia", "errorFormatoTextoNoticia"];
      
      let idElementoList = ["tituloNoticia", "textoNoticia", "fechaNoticia"];
  
      limpiarFormulario(idElementoList);
      eliminarMensajesValidacionError(idElementoErrorList, idElementoList);
      setLang(getCookie('lang'));
    });
  
  });