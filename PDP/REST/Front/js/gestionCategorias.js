/** Función para añadir categorias con ajax y promesas **/
function anadirCategoriaAjaxPromesa(){
    return new Promise(function(resolve, reject) {
      var token = getCookie('tokenUsuario');
  
      var categoria = {
        controlador: 'GestionCategorias',
        action: 'add',
        id_categoria: "",
        nombre_categoria : $('#nombreCategoria').val(),
        descripcion_categoria : $('#descripcionCategoria').val(),
        dni_responsable : $('#dniResponsable').val(),
        id_padre_categoria : $('#categoriaPadre').val(),
        usuario : getCookie('usuario'),
        borrado_categoria : 0
      }
  
      $.ajax({
        method: "POST",
        url: urlPeticionAjaxAddCategoria,
        contentType : "application/x-www-form-urlencoded; charset=UTF-8",
        data: categoria,  
        headers: {'Authorization': token},
        }).done(res => {
          if (res.code != 'ADD_CATEGORIA_COMPLETO') {
            reject(res);
          }
          resolve(res);
        }).fail( function( jqXHR ) {
          errorFailAjax(jqXHR.status);
        });
    });
  }
  
  /** Función para buscar objetivos con ajax y promesas **/
  function buscarCategoriaAjaxPromesa(numeroPagina, tamanhoPagina, accion){
    return new Promise(function(resolve, reject) {
      var token = getCookie('tokenUsuario');
  
      if(accion == "buscarModal"){

        var data = {
            controlador: 'GestionCategorias',
            action: 'searchByParameters',
            nombre_categoria : $('#nombreCategoria').val(),
            descripcion_categoria : $('#descripcionCategoria').val(),
            dni_responsable: $('#dniResponsable').val(),
            inicio : calculaInicio(numeroPagina, tamanhoPaginaCategoria),
            tamanhoPagina : tamanhoPaginaCategoria
        }
      }
  
      if(accion == "buscarPaginacion"){
        if(getCookie('nombreCategoria') == null || getCookie('nombreCategoria') == ""){
          var nombreCat = "";
        }else{
          var nombreCat = getCookie('nombreCategoria');
        }
  
        if(getCookie('descripCategoria') == null || getCookie('descripCategoria') == ""){
          var descripCat = "";
        }else{
          var descripCat = getCookie('descripCategoria');
        }

        if(getCookie('dniResponsable') == null || getCookie('dniResponsable') == ""){
            var dniResponsable = "";
          }else{
            var dniResponsable = getCookie('dniResponsable');
          }
  
        var data = {
            controlador: 'GestionCategorias',
            action: 'searchByParameters',
            nombre_categoria : nombreCat,
            descripcion_categoria : descripCat,
            dni_responsable : dniResponsable,
            inicio : calculaInicio(numeroPagina, tamanhoPaginaCategoria),
            tamanhoPagina : tamanhoPaginaCategoria
        }
      }
  
      $.ajax({
        method: "POST",
        url: urlPeticionAjaxListarCategoria,
        contentType : "application/x-www-form-urlencoded; charset=UTF-8",
        data: categoria,  
        headers: {'Authorization': token},
        }).done(res => {
          if (res.code != 'BUSQUEDA_CATEGORIA_CORRECTO') {
            reject(res);
          }
          resolve(res);
        }).fail( function( jqXHR ) {
          errorFailAjax(jqXHR.status);
        });
    });
  }
  
  /** Función para recuperar los permisos de un usuario sobre la funcionalidad **/
  function cargarPermisosFuncCategoriaAjaxPromesa(){
    return new Promise(function(resolve, reject) {
        var nombreUsuario = getCookie('usuario');
        var token = getCookie('tokenUsuario');
        
        var usuario = nombreUsuario;
       
        var data = {
          controlador : 'GestionACL',
          action: 'searchAccionesPorFuncionalidadUsuario',
          usuario : usuario,
          nombre_funcionalidad : 'Gestión de categorias'
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
  
  /**Función para editar un objetivo con ajax y promesas*/
  function editarCategoriaAjaxPromesa(){
    return new Promise(function(resolve, reject) {
      var token = getCookie('tokenUsuario');
  
      var categoria = {
        controlador: 'GestionCategorias',
        action: 'edit',
        id_categoria : $("input[name=idCategoria]").val(),
        nombre_categoria : $('#nombreCategoria').val(),
        descripcion_categoria : $('#descripcionCategoria').val(),
        dni_responsable : $('#dniResponsable').val(),
        id_padre_categoria : $('#categoriaPadre').val(),
        usuario : getCookie('usuario'),
        borrado_categoria : 0
      }
  
        $.ajax({
        method: "POST",
        url: urlPeticionAjaxEditarCategoria,
        contentType : "application/x-www-form-urlencoded; charset=UTF-8",
        data: categoria,  
        headers: {'Authorization': token},
        }).done(res => {
          if (res.code != 'EDIT_CATEGORIA_COMPLETO') {
            reject(res);
          }
          resolve(res);
        }).fail( function( jqXHR ) {
          errorFailAjax(jqXHR.status);
        });
    });
  }
  
  /**Función para eliminar una categoria con ajax y promesas*/
  function eliminarCategoriaAjaxPromesa(){
    return new Promise(function(resolve, reject) {
      var token = getCookie('tokenUsuario');
  
      var categoria = {
        controlador: 'GestionCategorias',
        action: 'delete',
        id_categoria : $("input[name=idCategoria]").val(),
        nombre_categoria : $('#nombreCategoria').val(),
        descripcion_categoria : $('#descripcionCategoria').val(),
        dni_responsable : $('#dniResponsable').val(),
        id_padre_categoria : $('#categoriaPadre').val(),
        usuario : getCookie('usuario'),
      }
  
        $.ajax({
        method: "POST",
        url: urlPeticionAjaxDeleteCategoria,
        contentType : "application/x-www-form-urlencoded; charset=UTF-8",
        data: categoria,  
        headers: {'Authorization': token},
        }).done(res => {
          if (res.code != 'DELETE_CATEGORIA_COMPLETO') {
            reject(res);
          }
          resolve(res);
        }).fail( function( jqXHR ) {
          errorFailAjax(jqXHR.status);
        });
    });
  }
  
  /*Función que comprueba los permisos del usuario sobre la funcionalidad*/
  async function cargarPermisosFuncCategoria(){
    await cargarPermisosFuncCategoriaAjaxPromesa()
    .then((res) => {
      gestionarPermisosCategoria(res.data);
      setLang(getCookie('lang'));
    }).catch((res) => {
        respuestaAjaxKO(res.code);
        setLang(getCookie('lang'));
        document.getElementById("modal").style.display = "block";
    });
  }
  
  
  /** Función para recuperar los objetivos con ajax y promesas **/
  function cargarCategoriasAjaxPromesa(numeroPagina, tamanhoPagina){
    return new Promise(function(resolve, reject) {
      var token = getCookie('tokenUsuario');
  
      var data = {
        inicio : calculaInicio(numeroPagina, tamanhoPaginaCategoria),
        tamanhoPagina : tamanhoPaginaCategoria
      }
  
      $.ajax({
        method: "POST",
        url: urlPeticionAjaxListadoCategorias,
        contentType : "application/x-www-form-urlencoded; charset=UTF-8",
        data: categoria, 
        headers: {'Authorization': token},
        }).done(res => {
          if (res.code != 'BUSQUEDA_CATEGORIA_CORRECTO') {
            reject(res);
          }
          resolve(res);
        }).fail( function( jqXHR ) {
          errorFailAjax(jqXHR.status);
        });
    });
  }
  
  /**Función para recuperar los objetivos eliminadas con ajax y promesas*/
  function buscarEliminadosAjaxPromesa(numeroPagina, tamanhoPagina){
    return new Promise(function(resolve, reject) {
      var token = getCookie('tokenUsuario');
  
      var data = {
        inicio : calculaInicio(numeroPagina, tamanhoPaginaCategoria),
        tamanhoPagina : tamanhoPaginaCategoria
      }
  
      $.ajax({
        method: "POST",
        url: urlPeticionAjaxListarCategoriasEliminadas,
        contentType : "application/x-www-form-urlencoded; charset=UTF-8",
        data: categoria, 
        headers: {'Authorization': token},
        }).done(res => {
          if (res.code != 'BUSQUEDA_CATEGORIA_CORRECTO') {
            reject(res);
          }
          resolve(res);
        }).fail( function( jqXHR ) {
          errorFailAjax(jqXHR.status);
        });
    });
  }
  
  /**Función para ver en detalle un objetivo con ajax y promesas*/
  function detalleObjetivoAjaxPromesa(){
    return new Promise(function(resolve, reject) {
      var token = getCookie('tokenUsuario');
  
      var data = {
        nombreObjetivo : $('#nombreObjetivo').val(),
        descripObjetivo : $('#descripcionObjetivo').val(),
        inicio : 0,
        tamanhoPagina : 1
      }
  
        $.ajax({
        method: "POST",
        url: urlPeticionAjaxListarObjetivo,
        contentType : "application/json",
        data: JSON.stringify(data),  
        dataType : 'json',
        headers: {'Authorization': token},
        }).done(res => {
          if (res.code != 'OBJETIVO_ENCONTRADO') {
            reject(res);
          }
          resolve(res);
        }).fail( function( jqXHR ) {
          errorFailAjax(jqXHR.status);
        });
    });
  }
  
  
  /**Función para reactivar un objetivo con ajax y promesas*/
  function reactivarObjetivosAjaxPromesa(){
    return new Promise(function(resolve, reject) {
      var token = getCookie('tokenUsuario');
  
      var objetivo = {
        idObjetivo : $("input[name=idObjetivo]").val(),
        nombreObjetivo : $('#nombreObjetivo').val(),
        descripObjetivo : $('#descripcionObjetivo').val(),
        borradoObjetivo : 0
      }
  
      var data = {
        usuario: getCookie('usuario'),
        objetivo : objetivo
      }
  
        $.ajax({
        method: "POST",
        url: urlPeticionAjaxReactivarObjetivo,
        contentType : "application/json",
        data: JSON.stringify(data),  
        dataType : 'json',
        headers: {'Authorization': token},
        }).done(res => {
          if (res.code != 'OBJETIVO_REACTIVADO') {
            reject(res);
          }
          resolve(res);
        }).fail( function( jqXHR ) {
          errorFailAjax(jqXHR.status);
        });
    });
  }
  
  /* Función para obtener los objetivos del sistema */
  async function cargarObjetivos(numeroPagina, tamanhoPagina, paginadorCreado){
    await cargarObjetivosAjaxPromesa(numeroPagina, tamanhoPagina)
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
  
        $("#datosObjetivo").html("");
        $("#checkboxColumnas").html("");
        $("#paginacion").html("");
  
        for (var i = 0; i < res.data.listaBusquedas.length; i++){
            var tr = construyeFila('OBJETIVO', res.data.listaBusquedas[i]);
            $("#datosObjetivo").append(tr);
          }
  
        var div = createHideShowColumnsWindow({DESCRIPCION_OBJETIVO_COLUMN:2});
          $("#checkboxColumnas").append(div);
          $("#paginacion").append(textPaginacion);
  
          if(paginadorCreado != 'PaginadorCreado'){
            paginador(totalResults, 'cargarObjetivos', 'OBJETIVO');
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
  
  /** Funcion añadir objetivo **/
  async function addObjetivo(){
    await anadirObjetivoAjaxPromesa()
    .then((res) => {
  
      $("#form-modal").modal('toggle');
      respuestaAjaxOK("OBJETIVO_GUARDADO_OK", res.code);
  
      let idElementoList = ["nombreObjetivo", "descripcionObjetivo"];
      resetearFormulario("formularioGenerico", idElementoList);
      document.getElementById("modal").style.display = "block";
  
      $('#nombreObjetivo').val(getCookie('nombreObjetivo'));
      $('#descripcionObjetivo').val(getCookie('descripObjetivo'));
      buscarObjetivo(getCookie('numeroPagina'), tamanhoPaginaObjetivo, 'buscarPaginacion', 'PaginadorNo');
      setLang(getCookie('lang'));
  
    }).catch((res) => {
        $("#form-modal").modal('toggle');
  
        respuestaAjaxKO(res.code);
  
        let idElementoList = ["nombreObjetivo", "descripcionObjetivo"];
        resetearFormulario("formularioGenerico", idElementoList);
  
        setLang(getCookie('lang'));
  
        document.getElementById("modal").style.display = "block";
    });
  }
  
  
  /** Funcion buscar objetivo **/
  async function buscarObjetivo(numeroPagina, tamanhoPagina, accion, paginadorCreado){
    await buscarObjetivoAjaxPromesa(numeroPagina, tamanhoPagina,accion)
    .then((res) => {
        cargarPermisosFuncObjetivo();
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
  
        $("#datosObjetivo").html("");
        $("#checkboxColumnas").html("");
        $("#paginacion").html("");
          for (var i = 0; i < res.data.listaBusquedas.length; i++){
            var tr = construyeFila('OBJETIVO', res.data.listaBusquedas[i]);
            $("#datosObjetivo").append(tr);
          }
  
        var div = createHideShowColumnsWindow({DESCRIPCION_OBJETIVO_COLUMN:2});
  
        $("#checkboxColumnas").append(div);
        $("#paginacion").append(textPaginacion);
  
        if(paginadorCreado != 'PaginadorCreado'){
            paginador(totalResults, 'buscarObjetivo', 'OBJETIVO');
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
        cargarPermisosFuncObjetivo();
        respuestaAjaxKO(res.code);
  
        let idElementoList = ["nombreObjetivo", "descripcionObjetivo"];
        resetearFormulario("formularioGenerico", idElementoList);
  
        setLang(getCookie('lang'));
  
        document.getElementById("modal").style.display = "block";
    });
  }
  
  /*Función que refresca la tabla por si hay algún cambio en BD */
  async function refrescarTabla(numeroPagina, tamanhoPagina){
    await cargarObjetivosAjaxPromesa(numeroPagina, tamanhoPagina)
    .then((res) => {
        cargarPermisosFuncObjetivo();
        setCookie('nombreObjetivo', '');
        setCookie('descripObjetivo', '');
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
  
        document.getElementById('cabecera').style.display = "block";
        document.getElementById('cabeceraEliminados').style.display = "none";
  
        $("#datosObjetivo").html("");
        $("#checkboxColumnas").html("");
        $("#paginacion").html("");
          for (var i = 0; i < res.data.listaBusquedas.length; i++){
            var tr = construyeFila('OBJETIVO', res.data.listaBusquedas[i]);
            $("#datosObjetivo").append(tr);
          }
  
        var div = createHideShowColumnsWindow({DESCRIPCION_OBJETIVO_COLUMN:2});
        $("#checkboxColumnas").append(div);
        $("#paginacion").append(textPaginacion);
        setCookie('nombreObjetivo', '');
        setCookie('descripObjetivo', '');
  
        paginador(totalResults, 'cargarObjetivos', 'OBJETIVO');
  
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
  
  /*Función que busca los eliminados de la tabla de objetivo*/
  async function buscarEliminados(numeroPagina, tamanhoPagina, paginadorCreado){
    await buscarEliminadosAjaxPromesa(numeroPagina, tamanhoPagina)
    .then((res) => {
        cargarPermisosFuncObjetivo();
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
          document.getElementById('cabecera').style.display = "none";
          document.getElementById('cabeceraEliminados').style.display = "block";
        }
  
        $("#datosObjetivo").html("");
        $("#checkboxColumnas").html("");
        $("#paginacion").html("");
          for (var i = 0; i < res.data.listaBusquedas.length; i++){
            var tr = construyeFilaEliminados('OBJETIVO', res.data.listaBusquedas[i]);
            $("#datosObjetivo").append(tr);
          }
  
        var div = createHideShowColumnsWindow({DESCRIPTION_OBJETIVO_COLUMN:2});
        $("#checkboxColumnas").append(div);
        $("#paginacion").append(textPaginacion);
  
        setCookie('nombreObjetivo', '');
        setCookie('descripObjetivo', '');
  
        if(paginadorCreado != 'PaginadorCreado'){
           paginador(totalResults, 'buscarEliminadosObjetivo', 'OBJETIVO');
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
  
  /** Función que visualiza un objetivo**/
  async function detalleObjetivo(){
    await detalleObjetivoAjaxPromesa()
    .then((res) => {
      $("#form-modal").modal('toggle');
  
      let idElementoList = ["nombreObjetivo", "descripcionObjetivo"];
      resetearFormulario("formularioGenerico", idElementoList);
      $('#nombreObjetivo').val(getCookie('nombreObjetivo'));
      $('#descripcionObjetivo').val(getCookie('descripObjetivo'));
      setLang(getCookie('lang'));
  
    }).catch((res) => {
        $("#form-modal").modal('toggle');
  
        respuestaAjaxKO(res.code);
  
        let idElementoList = ["nombreObjetivo", "descripcionObjetivo"];
        resetearFormulario("formularioGenerico", idElementoList);
  
        setLang(getCookie('lang'));
  
        document.getElementById("modal").style.display = "block";
    });
  }
  
  /** Función que edita un objetivo **/
  async function editObjetivo(){
    await editarObjetivoAjaxPromesa()
    .then((res) => {
      $("#form-modal").modal('toggle');
  
      respuestaAjaxOK("OBJETIVO_EDITADO_OK", res.code);
  
      let idElementoList = ["nombreObjetivo", "descripcionObjetivo"];
      resetearFormulario("formularioGenerico", idElementoList);
      document.getElementById("modal").style.display = "block";
      $('#nombreObjetivo').val(getCookie('nombreObjetivo'));
      $('#descripcionObjetivo').val(getCookie('descripObjetivo'));
      buscarObjetivo(getCookie('numeroPagina'), tamanhoPaginaObjetivo, 'buscarPaginacion', 'PaginadorCreado');
      setLang(getCookie('lang'));
  
    }).catch((res) => {
      $("#form-modal").modal('toggle');
  
       respuestaAjaxKO(res.code);
  
      let idElementoList = ["nombreObjetivo", "descripcionObjetivo"];
      resetearFormulario("formularioGenerico", idElementoList);
  
      setLang(getCookie('lang'));
  
      document.getElementById("modal").style.display = "block";
  
  
    });
  }
  
  /** Función que elimina un objetivo **/
  async function deleteObjetivo(){
    await eliminarObjetivoAjaxPromesa()
    .then((res) => {
      $("#form-modal").modal('toggle');
  
      respuestaAjaxOK("OBJETIVO_ELIMINADO_OK", res.code);
  
      let idElementoList = ["nombreObjetivo", "descripcionObjetivo"];
      resetearFormulario("formularioGenerico", idElementoList);
      document.getElementById("modal").style.display = "block";
  
      refrescarTabla(0, tamanhoPaginaObjetivo);
      setLang(getCookie('lang'));
  
    }).catch((res) => {
  
       $("#form-modal").modal('toggle');
        respuestaAjaxKO(res.code);
  
        let idElementoList = ["nombreObjetivo", "descripcionObjetivo"];
        resetearFormulario("formularioGenerico", idElementoList);
  
        setLang(getCookie('lang'));
  
        document.getElementById("modal").style.display = "block";
  
  
    });
  }
  
  /*Función que reactiva los eliminados de la tabla de objetivos*/
  async function reactivarObjetivo(){
    await reactivarObjetivosAjaxPromesa()
    .then((res) => {
  
      cargarPermisosFuncObjetivo();
      $("#form-modal").modal('toggle');
  
      let idElementoList = ["nombreObjetivo", "descripcionObjetivo"];
      resetearFormulario("formularioGenerico", idElementoList);
  
      respuestaAjaxOK("OBJETIVO_REACTIVADO_OK", res.code);
      document.getElementById("modal").style.display = "block";
  
      buscarEliminados(0, tamanhoPaginaObjetivo, 'PaginadorNo');
      setLang(getCookie('lang'));
  
      }).catch((res) => {
  
        $("#form-modal").modal('toggle');
        let idElementoList = ["nombreObjetivo", "descripcionObjetivo"];
        resetearFormulario("formularioGenerico", idElementoList);
        respuestaAjaxKO(res.code);
        setLang(getCookie('lang'));
        document.getElementById("modal").style.display = "block";
    });
  }
  
  /** Funcion para mostrar el formulario para añadir un objetivo **/
  function showAddObjetivos() {
    cambiarFormulario('ADD_OBJETIVO', 'javascript:addObjetivo();', 'return comprobarAddObjetivo();');
    cambiarOnBlurCampos('return comprobarNombreObjetivo(\'nombreObjetivo\', \'errorFormatoNombreObjetivo\', \'nombreObjetivo\')', 
        'return comprobarDescripcionObjetivo(\'descripcionObjetivo\', \'errorFormatoDescripcionObjetivo\', \'descripcionObjetivo\')');
    cambiarIcono('images/add.png', 'ICONO_ADD', 'iconoAddObjetivo', 'Añadir');
  
    $('#subtitulo').attr('hidden', true);
    $('#labelNombreObjetivo').attr('hidden', true);
    $('#labelDescripcionObjetivo').attr('hidden', true);
    $('#labelNombreObjetivo').attr('hidden', true);
  
    let campos = ["nombreObjetivo", "descripcionObjetivo"];
    let obligatorios = ["obligatorioNombreObjetivo", "obligatorioDescripcionObjetivo"];
    eliminarReadonly(campos);
    mostrarObligatorios(obligatorios);
    habilitaCampos(campos);
    setLang(getCookie('lang'));
  
  }
  
  /** Funcion para buscar un objetivo **/
  function showBuscarObjetivo() {
    cambiarFormulario('SEARCH_OBJETIVO', 'javascript:buscarObjetivo(0,' + tamanhoPaginaObjetivo + ', \'buscarModal\'' + ',\'PaginadorNo\');', 'return comprobarBuscarObjetivo();');
    cambiarOnBlurCampos('return comprobarNombreObjetivoSearch(\'nombreObjetivo\', \'errorFormatoNombreObjetivo\', \'nombreObjetivo\')', 
        'return comprobarDescripcionObjetivoSearch(\'descripcionObjetivo\', \'errorFormatoDescripcionObjetivo\', \'descripcionObjetivo\')');
    cambiarIcono('images/search.png', 'ICONO_SEARCH', 'iconoSearchObjetivo', 'Buscar');
  
    $('#subtitulo').attr('hidden', true);
    $('#labelNombreObjetivo').attr('hidden', true);
    $('#labelDescripcionObjetivo').attr('hidden', true);
    $('#labelNombreObjetivo').attr('hidden', true);
  
    let campos = ["nombreObjetivo", "descripcionObjetivo"];
    let obligatorios = ["obligatorioNombreObjetivo", "obligatorioDescripcionObjetivo"];
    eliminarReadonly(campos);
    ocultarObligatorios(obligatorios);
    habilitaCampos(campos);
    setLang(getCookie('lang'));
  
  }
  
  /** Funcion para visualizar un objetivo **/
  function showDetalle(nombreObjetivo, descripcionObjetivo) {
  
      cambiarFormulario('DETAIL_OBJECTIVE', 'javascript:detalleObjetivo();', '');
      cambiarIcono('images/close2.png', 'ICONO_CERRAR', 'iconoCerrar', 'Detalle');
  
      $('#labelNombreObjetivo').removeAttr('hidden');
      $('#labelDescripcionObjetivo').removeAttr('hidden');
      $('#subtitulo').attr('hidden', '');
  
      rellenarFormulario(nombreObjetivo, descripcionObjetivo);
  
      let campos = ["nombreObjetivo", "descripcionObjetivo"];
      let obligatorios = ["obligatorioNombreObjetivo", "obligatorioDescripcionObjetivo"];
      anadirReadonly(campos);
      ocultarObligatorios(obligatorios);
      deshabilitaCampos(campos);
      setLang(getCookie('lang'));
  
  }
  
  /** Funcion para editar un objetivo **/
  function showEditar(nombreObjetivo, descripcionObjetivo, idObjetivo) {
  
      cambiarFormulario('EDIT_OBJETIVO', 'javascript:editObjetivo();', 'return comprobarEditObjetivo();');
      cambiarOnBlurCampos('return comprobarNombreObjetivo(\'nombreObjetivo\', \'errorFormatoNombreObjetivo\', \'nombreObjetivo\')', 
        'return comprobarDescripcionObjetivo(\'descripcionObjetivo\', \'errorFormatoDescripcionObjetivo\', \'descripcionObjetivo\')'
       );
      cambiarIcono('images/edit.png', 'ICONO_EDIT', 'iconoEditarObjetivo', 'Editar');
  
      $('#subtitulo').attr('hidden', true);
      $('#labelNombreObjetivo').attr('hidden', true);
      $('#labelDescripcionObjetivo').attr('hidden', true);
      $('#labelNombreObjetivo').attr('hidden', true);
  
      rellenarFormulario(nombreObjetivo, descripcionObjetivo);
      insertacampo(document.formularioGenerico,'idObjetivo', idObjetivo);
  
      let campos = ["nombreObjetivo", "descripcionObjetivo"];
      let obligatorios = ["obligatorioNombreObjetivo", "obligatorioDescripcionObjetivo"];
      eliminarReadonly(campos);
      mostrarObligatorios(obligatorios);
      habilitaCampos(campos);
      deshabilitaCampos(["nombreObjetivo"]);
      anadirReadonly(["nombreObjetivo"]);
      setLang(getCookie('lang'));
  
  }
  
  /** Función para eliminar un objetivo **/
  function showEliminar(nombreObjetivo, descripcionObjetivo , idObjetivo) {
  
      cambiarFormulario('DELETE_OBJETIVO', 'javascript:deleteObjetivo();', '');
      cambiarIcono('images/delete.png', 'ICONO_ELIMINAR', 'iconoEliminar', 'Eliminar');
  
      $('#labelNombreObjetivo').removeAttr('hidden');
      $('#labelDescripcionObjetivo').removeAttr('hidden');
      $('#subtitulo').removeAttr('class');
      $('#subtitulo').empty();
      $('#subtitulo').attr('class', 'SEGURO_ELIMINAR_OBJ');
      $('#subtitulo').attr('hidden', false);
  
  
      rellenarFormulario(nombreObjetivo, descripcionObjetivo);
      insertacampo(document.formularioGenerico,'idObjetivo', idObjetivo);
  
      let campos = ["nombreObjetivo", "descripcionObjetivo"];
      let obligatorios = ["obligatorioNombreObjetivo", "obligatorioDescripcionObjetivo"];
      anadirReadonly(campos);
      ocultarObligatorios(obligatorios);
      deshabilitaCampos(campos);
      setLang(getCookie('lang'));
  
  }
  
  /** Función para reactivar un objetivo **/
  function showReactivar(nombreObjetivo, descripcionObjetivo , idObjetivo) {
  
      cambiarFormulario('REACTIVATE_OBJETIVO', 'javascript:reactivarObjetivo();', '');
      cambiarIcono('images/reactivar2.png', 'ICONO_REACTIVAR', 'iconoReactivar', 'Reactivar');
  
      $('#labelNombreObjetivo').removeAttr('hidden');
      $('#labelDescripcionObjetivo').removeAttr('hidden');
      $('#subtitulo').removeAttr('class');
      $('#subtitulo').empty();
      $('#subtitulo').attr('class', 'SEGURO_REACTIVAR_OBJ');
      $('#subtitulo').attr('hidden', false);
  
  
      rellenarFormulario(nombreObjetivo, descripcionObjetivo);
      insertacampo(document.formularioGenerico,'idObjetivo', idObjetivo);
  
      let campos = ["nombreObjetivo", "descripcionObjetivo"];
      let obligatorios = ["obligatorioNombreObjetivo", "obligatorioDescripcionObjetivo"];
      anadirReadonly(campos);
      ocultarObligatorios(obligatorios);
      deshabilitaCampos(campos);
      setLang(getCookie('lang'));
  
  }
  
  /**Función para cambiar onBlur de los campos*/
  function cambiarOnBlurCampos(onBlurNombreObjetivo, onBlurDescripcionObjetivo) {
  
      if (onBlurNombreObjetivo != ''){
          $("#nombreObjetivo").attr('onblur', onBlurNombreObjetivo);
      }
  
      if (onBlurDescripcionObjetivo != ''){
          $("#descripcionObjetivo").attr('onblur', onBlurDescripcionObjetivo);
      }
  }
  
  /**Función que rellenado los datos del formulario*/
  function rellenarFormulario(nombreObjetivo, descripcionObjetivo) {
  
      $("#nombreObjetivo").val(nombreObjetivo);
      $("#descripcionObjetivo").val(descripcionObjetivo); 
  
  }
  
  /** Función para gestionar los iconos dependiendo de los permisos de los usuarios **/
  function gestionarPermisosObjetivo(idElementoList) {
    document.getElementById('cabecera').style.display = "none";
    document.getElementById('tablaDatos').style.display = "none";
    document.getElementById('filasTabla').style.display = "none";
    $('#itemPaginacion').attr('hidden', true);
  
    idElementoList.forEach( function (idElemento) {
      switch(idElemento){
        case "Añadir":
          $('#btnAddObjetivo').attr('src', 'images/add3.png');
          $('#btnAddObjetivo').css("cursor", "pointer");
          $('#divAddObjetivo').attr("data-toggle", "modal");
          $('#divAddObjetivo').attr("data-target", "#form-modal");
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
          $('#btnListarObjetivos').attr('src', 'images/search3.png');
          $('#btnSearchDelete').attr('src', 'images/searchDelete3.png');
          $('#btnListarObjetivos').css("cursor", "pointer");
          $('.iconoSearchDelete').css("cursor", "pointer");
          $('#divSearchDelete').attr("onclick", "javascript:buscarEliminados(0,\'tamanhoPaginaObjetivo\', \'PaginadorNo\')");
          $('#divListarObjetivos').attr("data-toggle", "modal");
          $('#divListarObjetivos').attr("data-target", "#form-modal");
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
  
      let idElementoErrorList = ["errorFormatoNombreObjetivo", "errorFormatoDescripcionObjetivo"];
  
      let idElementoList = ["nombreObjetivo", "descripcionObjetivo"];
  
      limpiarFormulario(idElementoList);
      eliminarMensajesValidacionError(idElementoErrorList, idElementoList);
      setLang(getCookie('lang'));
    });
  
  }); 