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

        var categoria = {
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
  
        var categoria = {
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
  
      var categoria = {
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
  function detalleCategoriaAjaxPromesa(){
    return new Promise(function(resolve, reject) {
      var token = getCookie('tokenUsuario');
  
      var data = {
        controlador: 'GestionCategorias',
        action: 'searchByParameters',
        nombre_categoria : $('#nombreCategoria').val(),
        descripcion_categoria : $('#descripcionCategoria').val(),
        dni_responsable: $('#dniResponsable').val(),
        inicio : 0,
        tamanhoPagina : 1
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
  
  
  /**Función para reactivar un objetivo con ajax y promesas*/
  function reactivarCategoriasAjaxPromesa(){
    return new Promise(function(resolve, reject) {
      var token = getCookie('tokenUsuario');
  
      var categoria = {
        controlador: 'GestionCategorias',
        action: 'reactivar',
        id_categoria : $("input[name=idCategoria]").val(),
        nombre_categoria : $('#nombreCategoria').val(),
        descripcion_categoria : $('#descripcionCategoria').val(),
        dni_responsable : $('#dniResponsable').val(),
        id_padre_categoria : $('#categoriaPadre').val(),
        usuario : getCookie('usuario'),
      }
  
        $.ajax({
        method: "POST",
        url: urlPeticionAjaxReactivarCategoria,
        contentType : "application/x-www-form-urlencoded; charset=UTF-8",
        data: categoria,
        headers: {'Authorization': token},
        }).done(res => {
          if (res.code != 'REACTIVAR_CATEGORIA_CORRECTO') {
            reject(res);
          }
          resolve(res);
        }).fail( function( jqXHR ) {
          errorFailAjax(jqXHR.status);
        });
    });
  }
  
  /* Función para obtener los objetivos del sistema */
  async function cargarCategorias(numeroPagina, tamanhoPagina, paginadorCreado){
    await cargarCategoriasAjaxPromesa(numeroPagina, tamanhoPagina)
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
  
        $("#datosCategoria").html("");
        $("#checkboxColumnas").html("");
        $("#paginacion").html("");
  
        for (var i = 0; i < res.resource.listaBusquedas.length; i++){
            var tr = construyeFila('CATEGORIA', res.resource.listaBusquedas[i]);
            $("#datosCategoria").append(tr);
          }
  
        var div = createHideShowColumnsWindow({DESCRIPCION_CATEGORIA_COLUMN:2, DNI_RESPONSABLE_COLUMN:3});
          $("#checkboxColumnas").append(div);
          $("#paginacion").append(textPaginacion);
  
          if(paginadorCreado != 'PaginadorCreado'){
            paginador(totalResults, 'cargarCategorias', 'CATEGORIA');
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
  
  /** Funcion añadir categoria **/
  async function addCategoria(){
    await anadirCategoriaAjaxPromesa()
    .then((res) => {
  
      $("#form-modal").modal('toggle');
      respuestaAjaxOK("CATEGORIA_GUARDADA_OK", res.code);
  
      let idElementoList = ["nombreCategoria", "descripcionCategoria", "dniResponsable"];
      resetearFormulario("formularioGenerico", idElementoList);
      document.getElementById("modal").style.display = "block";
  
      $('#nombreCategoria').val(getCookie('nombre_categoria'));
      $('#descripcionCategoria').val(getCookie('descripcion_categoria'));
      $('#dniResponsable').val(getCookie('dni_responsable'));
      buscarObjetivo(getCookie('numeroPagina'), tamanhoPaginaObjetivo, 'buscarPaginacion', 'PaginadorNo');
      setLang(getCookie('lang'));
  
    }).catch((res) => {
        $("#form-modal").modal('toggle');
        respuestaAjaxKO(res.code);
        let idElementoList = ["nombreCategoria", "descripcionCategoria", "dniResponsable"];
        resetearFormulario("formularioGenerico", idElementoList);
        setLang(getCookie('lang'));
        document.getElementById("modal").style.display = "block";
    });
  }
  
  
  /** Funcion buscar categoria **/
  async function buscarCategoria(numeroPagina, tamanhoPagina, accion, paginadorCreado){
    await buscarCategoriaAjaxPromesa(numeroPagina, tamanhoPagina,accion)
    .then((res) => {
        cargarPermisosFuncCategoria();
        if($('#form-modal').is(':visible')) {
           $("#form-modal").modal('toggle');
        };
        guardarParametrosBusqueda(res.resource.datosBusqueda);
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
  
        $("#datosCategoria").html("");
        $("#checkboxColumnas").html("");
        $("#paginacion").html("");
          for (var i = 0; i < res.resource.listaBusquedas.length; i++){
            var tr = construyeFila('CATEGORIA', res.resource.listaBusquedas[i]);
            $("#datosCategoria").append(tr);
          }
  
        var div = createHideShowColumnsWindow({DESCRIPCION_OBJETIVO_COLUMN:2, DNI_RESPONSABLE_COLUMN:3});
  
        $("#checkboxColumnas").append(div);
        $("#paginacion").append(textPaginacion);
  
        if(paginadorCreado != 'PaginadorCreado'){
            paginador(totalResults, 'buscarCategoria', 'CATEGORIA');
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
        cargarPermisosFuncCategoria();
        respuestaAjaxKO(res.code);
  
        let idElementoList = ["nombreCategoria", "descripcionCategoria", "dniResponsable"];
        resetearFormulario("formularioGenerico", idElementoList);
  
        setLang(getCookie('lang'));
  
        document.getElementById("modal").style.display = "block";
    });
  }
  
  /*Función que refresca la tabla por si hay algún cambio en BD */
  async function refrescarTabla(numeroPagina, tamanhoPagina){
    await cargarCategoriasAjaxPromesa(numeroPagina, tamanhoPagina)
    .then((res) => {
        cargarPermisosFuncCategoria();
        setCookie('nombre_categoria', '');
        setCookie('descripcion_categoria', '');
        setCookie('dni_responsable', '');
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
  
        document.getElementById('cabecera').style.display = "block";
        document.getElementById('cabeceraEliminados').style.display = "none";
  
        $("#datosCategoria").html("");
        $("#checkboxColumnas").html("");
        $("#paginacion").html("");
          for (var i = 0; i < res.resource.listaBusquedas.length; i++){
            var tr = construyeFila('CATEGORIA', res.resource.listaBusquedas[i]);
            $("#datosCategoria").append(tr);
          }
  
        var div = createHideShowColumnsWindow({DESCRIPCION_OBJETIVO_COLUMN:2, DNI_RESPONSABLE_COLUMN:3});
        $("#checkboxColumnas").append(div);
        $("#paginacion").append(textPaginacion);
        setCookie('nombreObjetivo', '');
        setCookie('descripObjetivo', '');
  
        paginador(totalResults, 'cargarCategorias', 'CATEGORIA');
  
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
        cargarPermisosFuncCategoria();
        var numResults = res.resource.numResultados + '';
        var totalResults = res.resource.tamanhoTotal + '';
        var inicio = 0;
        if(res.resource.listaBusquedas.length == 0){
          inicio = 0;
          $('#itemPaginacion').attr('hidden', true);
        }else{
          inicio = parseInt(res.resource.inicio)+1;
          $('#itemPaginacion').attr('hidden', false);
        }
        var textPaginacion = inicio + " - " + (parseInt(res.resource.inicio)+parseInt(numResults))  + " total " + totalResults;
  
        if(res.resource.listaBusquedas.length == 0){
          document.getElementById('cabecera').style.display = "none";
          document.getElementById('cabeceraEliminados').style.display = "block";
        }
  
        $("#datosCategoria").html("");
        $("#checkboxColumnas").html("");
        $("#paginacion").html("");
          for (var i = 0; i < res.resource.listaBusquedas.length; i++){
            var tr = construyeFilaEliminados('CATEGORIA', res.resource.listaBusquedas[i]);
            $("#datosCategoria").append(tr);
          }
  
        var div = createHideShowColumnsWindow({DESCRIPTION_OBJETIVO_COLUMN:2, DNI_RESPONSABLE_COLUMN:3});
        $("#checkboxColumnas").append(div);
        $("#paginacion").append(textPaginacion);
  
        setCookie('nombre_categoria', '');
        setCookie('descripcion_categoria', '');
        setCookie('dni_responsable', '');
  
        if(paginadorCreado != 'PaginadorCreado'){
           paginador(totalResults, 'buscarEliminadosCategoria', 'CATEGORIA');
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
  async function detalleCategoria(){
    await detalleCategoriaAjaxPromesa()
    .then((res) => {
      $("#form-modal").modal('toggle');
  
      let idElementoList = ["nombreCategoria", "descripcionCategoria", "dniResponsable"];
      resetearFormulario("formularioGenerico", idElementoList);
      $('#nombreCategoria').val(getCookie('nombre_categoria'));
      $('#descripcionCategoria').val(getCookie('descripcion_categoria'));
      $('#dniResponsable').val(getCookie('dni_responsable'));
      setLang(getCookie('lang'));
  
    }).catch((res) => {
        $("#form-modal").modal('toggle');
  
        respuestaAjaxKO(res.code);
  
        let idElementoList = ["nombreCategoria", "descripcionCategoria", "dniResponsable"];
        resetearFormulario("formularioGenerico", idElementoList);
  
        setLang(getCookie('lang'));
  
        document.getElementById("modal").style.display = "block";
    });
  }
  
  /** Función que edita un objetivo **/
  async function editCategoria(){
    await editarCategoriaAjaxPromesa()
    .then((res) => {
      $("#form-modal").modal('toggle');
  
      respuestaAjaxOK("CATEGORIA_EDITADA_OK", res.code);
  
      let idElementoList = ["nombreCategoria", "descripcionCategoria", "dniResponsable"];
      resetearFormulario("formularioGenerico", idElementoList);
      document.getElementById("modal").style.display = "block";
      $('#nombreCategoria').val(getCookie('nombre_categoria'));
      $('#descripcionCategoria').val(getCookie('descripcion_categoria'));
      $('#dniResponsable').val(getCookie('dni_responsable'));
      buscarCategoria(getCookie('numeroPagina'), tamanhoPaginaCategoria, 'buscarPaginacion', 'PaginadorCreado');
      setLang(getCookie('lang'));
  
    }).catch((res) => {
      $("#form-modal").modal('toggle');
  
       respuestaAjaxKO(res.code);
  
       let idElementoList = ["nombreCategoria", "descripcionCategoria", "dniResponsable"];
      resetearFormulario("formularioGenerico", idElementoList);
  
      setLang(getCookie('lang'));
  
      document.getElementById("modal").style.display = "block";
  
  
    });
  }
  
  /** Función que elimina un objetivo **/
  async function deleteCategoria(){
    await eliminarCategoriaAjaxPromesa()
    .then((res) => {
      $("#form-modal").modal('toggle');
  
      respuestaAjaxOK("CATEGORIA_ELIMINADA_OK", res.code);
  
      let idElementoList = ["nombreCategoria", "descripcionCategoria", "dniResponsable"];
      resetearFormulario("formularioGenerico", idElementoList);
      document.getElementById("modal").style.display = "block";
  
      refrescarTabla(0, tamanhoPaginaCategoria);
      setLang(getCookie('lang'));
  
    }).catch((res) => {
  
       $("#form-modal").modal('toggle');
        respuestaAjaxKO(res.code);
  
        let idElementoList = ["nombreCategoria", "descripcionCategoria", "dniResponsable"];
        resetearFormulario("formularioGenerico", idElementoList);
  
        setLang(getCookie('lang'));
  
        document.getElementById("modal").style.display = "block";
  
  
    });
  }
  
  /*Función que reactiva los eliminados de la tabla de objetivos*/
  async function reactivarCategoria(){
    await reactivarCategoriasAjaxPromesa()
    .then((res) => {
  
      cargarPermisosFuncCategoria();
      $("#form-modal").modal('toggle');
  
      let idElementoList = ["nombreCategoria", "descripcionCategoria", "dniResponsable"];
      resetearFormulario("formularioGenerico", idElementoList);
  
      respuestaAjaxOK("CATEGORIA_REACTIVADA_OK", res.code);
      document.getElementById("modal").style.display = "block";
  
      buscarEliminados(0, tamanhoPaginaCategoria, 'PaginadorNo');
      setLang(getCookie('lang'));
  
      }).catch((res) => {
  
        $("#form-modal").modal('toggle');
        let idElementoList = ["nombreCategoria", "descripcionCategoria", "dniResponsable"];
        resetearFormulario("formularioGenerico", idElementoList);
        respuestaAjaxKO(res.code);
        setLang(getCookie('lang'));
        document.getElementById("modal").style.display = "block";
    });
  }
  
  /** Funcion para mostrar el formulario para añadir un objetivo **/
  function showAddCategorias() {
    cambiarFormulario('ADD_CATEGORIA', 'javascript:addCategoria();', 'return comprobarAddCategoria();');
    cambiarOnBlurCampos('return comprobarNombreCategoria(\'nombreCategoria\', \'errorFormatoNombreCategoria\', \'nombreCategoria\')', 
        'return comprobarDescripcionCategoria(\'descripcionCategoria\', \'errorFormatoDescripcionCategoria\', \'descripcionCategoria\')');
    cambiarIcono('images/add.png', 'ICONO_ADD', 'iconoAddCategoria', 'Añadir');
  
    $('#subtitulo').attr('hidden', true);
    $('#labelNombreCategoria').attr('hidden', true);
    $('#labelDescripcionCategoria').attr('hidden', true);
    $('#labelDniResponsable').attr('hidden', true);
  
    let campos = ["nombreCategoria", "descripcionCategoria", "dniResponsable"];
    let obligatorios = ["obligatorioNombreCategoria", "obligatorioDescripcionCategoria", "obligatorioDniResponsable"];
    eliminarReadonly(campos);
    mostrarObligatorios(obligatorios);
    habilitaCampos(campos);
    setLang(getCookie('lang'));
  
  }
  
  /** Funcion para buscar un objetivo **/
  function showBuscarObjetivo() {
    cambiarFormulario('SEARCH_CATEGORIA', 'javascript:buscarCategoria(0,' + tamanhoPaginaCategoria + ', \'buscarModal\'' + ',\'PaginadorNo\');', 'return comprobarBuscarCategoria();');
    cambiarOnBlurCampos('return comprobarNombreCategoriaSearch(\'nombreCategoria\', \'errorFormatoNombreCategoria\', \'nombreCategoria\')', 
        'return comprobarDescripcionCategoriaSearch(\'descripcionCategoria\', \'errorFormatoDescripcionCategoria\', \'descripcionCategoria\')');
    cambiarIcono('images/search.png', 'ICONO_SEARCH', 'iconoSearchCategoria', 'Buscar');
  
    $('#subtitulo').attr('hidden', true);
    $('#labelNombreCategoria').attr('hidden', true);
    $('#labelDescripcionCategoria').attr('hidden', true);
    $('#labelDniResponsable').attr('hidden', true);
  
    let campos = ["nombreCategoria", "descripcionCategoria", "dniResponsable"];
    let obligatorios = ["obligatorioNombreCategoria", "obligatorioDescripcionCategoria", "obligatorioDniResponsable"];
    eliminarReadonly(campos);
    ocultarObligatorios(obligatorios);
    habilitaCampos(campos);
    setLang(getCookie('lang'));
  
  }
  
  /** Funcion para visualizar un objetivo **/
  function showDetalle(nombreCategoria, descripcionCategoria, usuarioResponsable) {
  
      cambiarFormulario('DETAIL_CATEGORIA', 'javascript:detalleCategoria();', '');
      cambiarIcono('images/close2.png', 'ICONO_CERRAR', 'iconoCerrar', 'Detalle');
  
      $('#labelNombreCategoria').attr('hidden', false);
      $('#labelDescripcionCategoria').attr('hidden', false);
      $('#labelDniResponsable').attr('hidden', false);
      $('#subtitulo').attr('hidden', '');
  
      rellenarFormulario(nombreCategoria, descripcionCategoria, usuarioResponsable);
  
      let campos = ["nombreCategoria", "descripcionCategoria", "dniResponsable"];
      let obligatorios = ["obligatorioNombreCategoria", "obligatorioDescripcionCategoria", "obligatorioDniResponsable"];
      anadirReadonly(campos);
      ocultarObligatorios(obligatorios);
      deshabilitaCampos(campos);
      setLang(getCookie('lang'));
  
  }
  
  /** Funcion para editar un Categoria **/
  function showEditar(nombreCategoria, descripcionCategoria, usuarioResponsable, idCategoria) {
  
      cambiarFormulario('EDIT_CATEGORIA', 'javascript:editCategoria();', 'return comprobarEditCategoria();');
      cambiarOnBlurCampos('return comprobarNombreCategoria(\'nombreCategoria\', \'errorFormatoNombreCategoria\', \'nombreCategoria\')', 
        'return comprobarDescripcionCategoria(\'descripcionCategoria\', \'errorFormatoDescripcionCategoria\', \'descripcionCategoria\')'
       );
      cambiarIcono('images/edit.png', 'ICONO_EDIT', 'iconoEditarCategoria', 'Editar');
  
      $('#subtitulo').attr('hidden', true);
      $('#labelNombreCategoria').attr('hidden', true);
      $('#labelDescripcionCategoria').attr('hidden', true);
      $('#labelDniResponsable').attr('hidden', true);
  
      rellenarFormulario(nombreCategoria, descripcionCategoria, usuarioResponsable);
      insertacampo(document.formularioGenerico,'idCategoria', idCategoria);
  
      let campos = ["nombreCategoria", "descripcionCategoria", "dniResponsable"];
      let obligatorios = ["obligatorioNombreCategoria", "obligatorioDescripcionCategoria", "obligatorioDniResponsable"];
      eliminarReadonly(campos);
      mostrarObligatorios(obligatorios);
      habilitaCampos(campos);
      deshabilitaCampos(["nombreCategoria"]);
      anadirReadonly(["nombreCategoria"]);
      setLang(getCookie('lang'));
  
  }
  
  /** Función para eliminar un Categoria **/
  function showEliminar(nombreCategoria, descripcionCategoria , usuarioResponsable, idCategoria) {
  
      cambiarFormulario('DELETE_CATEGORIA', 'javascript:deleteCategoria();', '');
      cambiarIcono('images/delete.png', 'ICONO_ELIMINAR', 'iconoEliminar', 'Eliminar');
  
      $('#labelNombreCategoria').removeAttr('hidden');
      $('#labelDescripcionCategoria').removeAttr('hidden');
      $('#labelDniResponsable').removeAttr('hidden');
      $('#subtitulo').removeAttr('class');
      $('#subtitulo').empty();
      $('#subtitulo').attr('class', 'SEGURO_ELIMINAR_OBJ');
      $('#subtitulo').attr('hidden', false);
  
  
      rellenarFormulario(nombreCategoria, descripcionCategoria, usuarioResponsable);
      insertacampo(document.formularioGenerico,'idCategoria', idCategoria);
  
      let campos = ["nombreCategoria", "descripcionCategoria", "dniResponsable"];
      let obligatorios = ["obligatorioNombreCategoria", "obligatorioDescripcionCategoria", "obligatorioDniResponsable"];
      anadirReadonly(campos);
      ocultarObligatorios(obligatorios);
      deshabilitaCampos(campos);
      setLang(getCookie('lang'));
  
  }
  
  /** Función para reactivar un Categoria **/
  function showReactivar(nombreCategoria, descripcionCategoria , usuarioResponsable, idCategoria) {
  
      cambiarFormulario('REACTIVATE_CATEGORIA', 'javascript:reactivarCategoria();', '');
      cambiarIcono('images/reactivar2.png', 'ICONO_REACTIVAR', 'iconoReactivar', 'Reactivar');
  
      $('#labelNombreCategoria').removeAttr('hidden');
      $('#labelDescripcionCategoria').removeAttr('hidden');
      $('#labelDniResponsable').removeAttr('hidden');
      $('#subtitulo').removeAttr('class');
      $('#subtitulo').empty();
      $('#subtitulo').attr('class', 'SEGURO_REACTIVAR_OBJ');
      $('#subtitulo').attr('hidden', false);
  
  
      rellenarFormulario(nombreCategoria, descripcionCategoria , usuarioResponsable);
      insertacampo(document.formularioGenerico,'idCategoria', idCategoria);
  
      let campos = ["nombreCategoria", "descripcionCategoria", "dniResponsable"];
      let obligatorios = ["obligatorioNombreCategoria", "obligatorioDescripcionCategoria", "obligatorioDniResponsable"];
      anadirReadonly(campos);
      ocultarObligatorios(obligatorios);
      deshabilitaCampos(campos);
      setLang(getCookie('lang'));
  
  }
  
  /**Función para cambiar onBlur de los campos*/
  function cambiarOnBlurCampos(onBlurNombreCategoria, onBlurDescripcionCategoria) {
  
      if (onBlurNombreCategoria != ''){
          $("#nombreCategoria").attr('onblur', onBlurNombreCategoria);
      }
  
      if (onBlurDescripcionCategoria != ''){
          $("#descripcionCategoria").attr('onblur', onBlurDescripcionCategoria);
      }
  }
  
  /**Función que rellenado los datos del formulario*/
  function rellenarFormulario(nombreCategoria, descripcionCategoria) {
  
      $("#nombreCategoria").val(nombreCategoria);
      $("#descripcionCategoria").val(descripcionCategoria); 
      $("#dniResponsable").val(dniResponsable); 
  
  }
  
  /** Función para gestionar los iconos dependiendo de los permisos de los usuarios **/
  function gestionarPermisosCategoria(idElementoList) {
    document.getElementById('cabecera').style.display = "none";
    document.getElementById('tablaDatos').style.display = "none";
    document.getElementById('filasTabla').style.display = "none";
    $('#itemPaginacion').attr('hidden', true);
  
    idElementoList.forEach( function (idElemento) {
      switch(idElemento.nombre_accion){
        case "Añadir":
          $('#btnAddCategoria').attr('src', 'images/add3.png');
          $('#btnAddCategoria').css("cursor", "pointer");
          $('#divAddCategoria').attr("data-toggle", "modal");
          $('#divAddCategoria').attr("data-target", "#form-modal");
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
          $('#btnListarCategorias').attr('src', 'images/search3.png');
          $('#btnSearchDelete').attr('src', 'images/searchDelete3.png');
          $('#btnListarCategorias').css("cursor", "pointer");
          $('.iconoSearchDelete').css("cursor", "pointer");
          $('#divSearchDelete').attr("onclick", "javascript:buscarEliminados(0,\'tamanhoPaginaCategoria\', \'PaginadorNo\')");
          $('#divListarCategorias').attr("data-toggle", "modal");
          $('#divListarCategorias').attr("data-target", "#form-modal");
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

/** Función para construír el select **/
function construyeSelect(){
	var options = "";
	
	$('#selectUsuarios').html('');

	var token = getCookie('tokenUsuario');

    var data = {
        controlador : 'GestionUsuarios',
        action :'searchAll'
    }

    $.ajax({
      method: "POST",
      url: urlPeticionAjaxListadoUsuarios,
      contentType : "application/x-www-form-urlencoded; charset=UTF-8",
      data: data,
      headers: {'Authorization': token},
      }).done(res => {
        if (res.code != 'BUSQUEDA_USUARIO_CORRECTO') {
        	respuestaAjaxKO(res.code);
        }
        options = '<option selected value=0><label class="OPCION_DEFECTO_USUARIO">Selecciona el usuario</label></option>';
        for(var i = 0; i< res.resource.length ; i++){
					options += '<option value=' + res.resource[i].dni_usuario + '>' + res.resource[i].usuario + '</option>';
				}

				$('#selectUsuarios').append(options);
    		
      }).fail( function( jqXHR ) {
        errorFailAjax(jqXHR.status);
      });
}
  
  $(document).ready(function() {
    $("#form-modal").on('hidden.bs.modal', function() {
  
      let idElementoErrorList = ["errorFormatoNombreCategoria", "errorFormatoDescripcionCategoria"];
  
      let idElementoList = ["nombreCategoria", "descripcionCategoria"];
  
      limpiarFormulario(idElementoList);
      eliminarMensajesValidacionError(idElementoErrorList, idElementoList);
      setLang(getCookie('lang'));
    });
  
  }); 