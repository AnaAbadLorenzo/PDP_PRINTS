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
        dni_responsable : $('#selectUsuarios').val(),
        id_padre_categoria : $('#selectCategoriaPadre').val(),
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
        if($('#selectCategoriaPadre').val() == null){
          var sear = 'all';
        }else{
          sear = null;
        }
        var categoria = {
            controlador: 'GestionCategorias',
            action: 'searchByParameters',
            search: sear,
            nombre_categoria : $('#nombreCategoria').val(),
            descripcion_categoria : $('#descripcionCategoria').val(),
            dni_responsable: $('#selectUsuarios').val(),
            id_padre_categoria : $('#selectCategoriaPadre').val(),
            inicio : calculaInicio(numeroPagina, tamanhoPaginaCategoria),
            tamanhoPagina : tamanhoPaginaCategoria
        }
      }
  
      if(accion == "buscarPaginacion"){
        if(getCookie('nombre_categoria') == null || getCookie('nombre_categoria') == ""){
          var nombreCat = "";
        }else{
          var nombreCat = getCookie('nombre_categoria');
        }
  
        if(getCookie('descripcion_categoria') == null || getCookie('descripcion_categoria') == ""){
          var descripCat = "";
        }else{
          var descripCat = getCookie('descripcion_categoria');
        }

        if(getCookie('dni_responsable') == null || getCookie('dni_responsable') == ""){
            var dniResponsable = "";
          }else{
            var dniResponsable = getCookie('dni_responsable');
          }

          if(getCookie('id_padre_categoria') == null || getCookie('id_padre_categoria') == ""){
            var idPadreCategoria = null;
          }else{
            var idPadreCategoria = getCookie('id_padre_categoria');
          }
  
        var categoria = {
            controlador: 'GestionCategorias',
            action: 'searchByParameters',
            search: 'all',
            nombre_categoria : nombreCat,
            descripcion_categoria : descripCat,
            dni_responsable : dniResponsable,
            id_padre_categoria : idPadreCategoria,
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
        dni_responsable : $('#selectUsuarios').val(),
        id_padre_categoria : $('#selectCategoriaPadre').val(),
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
        dni_responsable : $('#selectUsuarios').val(),
        id_padre_categoria : $('#selectCategoriaPadre').val(),
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
      gestionarPermisosCategoria(res.resource);
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
  
      if(getCookie('rolUsuario') == 'Usuario') {
        var categoria = {
          controlador : 'GestionCategorias',
          action : 'searchByParameters',
          nombre_categoria: '',
          descripcion_categoria: '',
          borrado_categoria: 0,
          dni_responsable : 0,
          id_padre_categoria: null,
          dni_usuario: 0,
          inicio : calculaInicio(numeroPagina, tamanhoPaginaCategoria),
          tamanhoPagina : tamanhoPaginaCategoria
        }
      }else{
        var categoria = {
          controlador : 'GestionCategorias',
          action : 'search',
          inicio : calculaInicio(numeroPagina, tamanhoPaginaCategoria),
          tamanhoPagina : tamanhoPaginaCategoria
        }
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
  
      var categoria = {
        controlador: 'GestionCategorias',
        action: 'searchDelete',
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
  
      var categoria = {
        controlador: 'GestionCategorias',
        action: 'searchByParameters',
        nombre_categoria : $('#nombreCategoria').val(),
        descripcion_categoria : $('#descripcionCategoria').val(),
        dni_responsable: $('#selectUsuarios').val(),
        id_padre_categoria: $('#selectCategoriaPadre').val(),
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

  function cargarHijosCategoriaAjaxPromesa(id_categoria, numeroPagina, tamanhoPagina){
    return new Promise(function(resolve, reject) {
      var token = getCookie('tokenUsuario');
  
      var categoria = {
        controlador: 'GestionCategorias',
        action: 'searchByParametersUser',
        nombre_categoria : '',
        descripcion_categoria : '',
        dni_responsable: '',
        id_padre_categoria: id_categoria,
        inicio : calculaInicio(numeroPagina, tamanhoPaginaCategoria),
        tamanhoPagina : tamanhoPaginaCategoria
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
        dni_responsable : $('#selectUsuarios').val(),
        id_padre_categoria : $('#selectCategoriaPadre').val(),
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
    if(getCookie('rolUsuario') == "Usuario"){
      await cargarCategoriasAjaxPromesa(numeroPagina, tamanhoPagina)
        .then((res) => {
          document.getElementById('listaCategorias').style.display = "block";
          document.getElementById('tablaDatos').style.display = "none"; 
          cargarPermisosFuncCategoria();
          $('#categorias').html('');
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
          $("#paginacion").html("");

          for (var i = 0; i < res.resource.listaBusquedas.length; i++){
              var tr = construyeCategoriaUsuario(res.resource.listaBusquedas[i]);
              $("#categorias").append(tr);
          }
          $("#paginacion").append(textPaginacion);
          setLang(getCookie('lang'));

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

        }).catch((res) => {
            respuestaAjaxKO(res.code);
            setLang(getCookie('lang'));
            document.getElementById("modal").style.display = "block";
        });
    
    }else{
      await cargarCategoriasAjaxPromesa(numeroPagina, tamanhoPagina)
        .then((res) => {
          document.getElementById('listaCategorias').style.display = "none";
          document.getElementById('tablaDatos').style.display = "block"; 
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
    
          var div = createHideShowColumnsWindow({DESCRIPCION_CATEGORIA_COLUMN:2, RESPONSABLE_CATEGORIA_COLUMN:3});
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
  }
  
  function construyeCategoriaUsuario(categoria){

    document.getElementById('cabecera').style.display = "none";
    document.getElementById('cabeceraConsultaCategorias').style.display = "block";
    var cat = "";

    cat = '<div class="col-md-12 col-lg-12 col-xl-12 mb-12 paddingTop">' + 
            '<div class="card">' + 
              '<div class="card-body-categoria">' + 
                '<div class="card-title">' + categoria.categoria.nombre_categoria + '</div>' + 
                '<div class="card-text">' + categoria.categoria.descripcion_categoria + '</div>' + 
                '<div class="tooltip9 subCategoriaIcon">' + 
                  '<img class="iconoSubcategoria iconSubcategoria" src="images/procedimiento.png" alt="Acceder a las subcategorias" onclick="accederSubcategorias(' + categoria.categoria.id_categoria + ',1,'+tamanhoPaginaCategoria+');"/>' + 
                  '<span class="tooltiptext iconSubcategoria ICON_ACCEDER_CATEGORIAS"></span>' + 
                '</div>' + 
              '</div>' + 
            '</div>' + 
          '</div>';

  return cat;
  }

  async function accederSubcategorias(id_categoria, numeroPagina, tamanhoPagina, paginadorCreado){
    await cargarHijosCategoriaAjaxPromesa(id_categoria, numeroPagina, tamanhoPagina, paginadorCreado)
      .then((res) => {
        document.getElementById('listaCategorias').style.display = "block";
          document.getElementById('tablaDatos').style.display = "none"; 
          cargarPermisosFuncCategoria();
          $('#categorias').html('');
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
          $("#paginacion").html("");

          if(res.resource.listaBusquedas.length > 0) {
            for (var i = 0; i < res.resource.listaBusquedas.length; i++){
              var tr = construyeCategoriaUsuario(res.resource.listaBusquedas[i]);
              $("#categorias").append(tr);
            }
          }else{
            accederProcesosCategoria(id_categoria);
          }

          $("#paginacion").append(textPaginacion);
          setLang(getCookie('lang'));

          if(paginadorCreado != 'PaginadorCreado'){
            paginador(totalResults, 'accederSubcategorias', 'CATEGORIA', id_categoria);
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
            setLang(getCookie('lang'));
            document.getElementById("modal").style.display = "block";
        });
    }

  /**Funcion para cargar los planes ne vista de usuario **/
async function cargarCategoriasUsuario(numeroPagina, tamanhoPagina, paginadorCreado){
  await cargarCategoriasAjaxPromesa(numeroPagina, tamanhoPagina)
        .then((res) => {
          document.getElementById('cabecera').style.display = "none";
          document.getElementById('cabeceraConsultaCategorias').style.display = "block";
          cargarPermisosFuncCategoria();
          $('#categorias').html('');
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

          $("#paginacion").html("");

          for (var i = 0; i < res.resource.listaBusquedas.length; i++){
              var tr = construyeCategoriaUsuario(res.resource.listaBusquedas[i]);
              $("#categorias").append(tr);
          }
        
          $("#paginacion").append(textPaginacion);
          setLang(getCookie('lang'));

            if(paginadorCreado != 'PaginadorCreado'){
              paginador(totalResults, 'cargarCategoriasUsuario', 'CATEGORIA');
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
  
  /** Funcion añadir categoria **/
  async function addCategoria(){
    await anadirCategoriaAjaxPromesa()
    .then((res) => {
  
      $("#form-modal").modal('toggle');
      respuestaAjaxOK("CATEGORIA_GUARDADA_OK", res.code);
  
      let idElementoList = ["nombreCategoria", "descripcionCategoria", "selectUsuarios", "selectCategoriaPadre"];
      resetearFormulario("formularioGenerico", idElementoList);
      document.getElementById("modal").style.display = "block";
  
      $('#nombreCategoria').val(getCookie('nombre_categoria'));
      $('#descripcionCategoria').val(getCookie('descripcion_categoria'));
      $('#selectUsuarios').val(getCookie('dni_responsable'));
      $('#selectCategoriaPadre').val(getCookie('id_categoria_padre'));
      buscarCategoria(getCookie('numeroPagina'), tamanhoPaginaCategoria, 'buscarPaginacion', 'PaginadorNo');
      setLang(getCookie('lang'));
  
    }).catch((res) => {
        $("#form-modal").modal('toggle');
        respuestaAjaxKO(res.code);
        let idElementoList = ["nombreCategoria", "descripcionCategoria", "selectUsuarios", "selectCategoriaPadre"];
        resetearFormulario("formularioGenerico", idElementoList);
        setLang(getCookie('lang'));
        document.getElementById("modal").style.display = "block";
    });
  }
  
  
  /** Funcion buscar categoria **/
  async function buscarCategoria(numeroPagina, tamanhoPagina, accion, paginadorCreado){
    if(getCookie('rolUsuario') == 'Administrador' || getCookie('rolUsuario') == 'Gestor'){
    await buscarCategoriaAjaxPromesa(numeroPagina, tamanhoPagina,accion)
    .then((res) => {
        cargarPermisosFuncCategoria();
        if($('#form-modal').is(':visible')) {
           $("#form-modal").modal('toggle');
        };
        var datosBusquedas = [];
        datosBusquedas.push('nombre_categoria: ' + res.resource.datosBusquedas['nombre_categoria']);
        datosBusquedas.push('descripcion_categoria: ' + res.resource.datosBusquedas['descripcion_categoria']);
        datosBusquedas.push('dni_responsable: ' + res.resource.datosBusquedas['dni_responsable']);
        datosBusquedas.push('id_padre_categoria: ' + res.resource.datosBusquedas['id_padre_categoria']);
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
  
        $("#datosCategoria").html("");
        $("#checkboxColumnas").html("");
        $("#paginacion").html("");
          for (var i = 0; i < res.resource.listaBusquedas.length; i++){
            var tr = construyeFila('CATEGORIA', res.resource.listaBusquedas[i]);
            $("#datosCategoria").append(tr);
          }
  
        var div = createHideShowColumnsWindow({DESCRIPCION_CATEGORIA_COLUMN:2, RESPONSABLE_CATEGORIA_COLUMN:3});
  
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
  
        let idElementoList = ["nombre_categoria", "descripcion_categoria", "selectUsuarios", "selectCategoriaPadre"];
        resetearFormulario("formularioGenerico", idElementoList);
  
        setLang(getCookie('lang'));
  
        document.getElementById("modal").style.display = "block";
    });
  }else{
    await buscarCategoriaAjaxPromesa(numeroPagina, tamanhoPagina,accion)
    .then((res) => {
      document.getElementById('listaCategorias').style.display = "block";
      document.getElementById('tablaDatos').style.display = "none"; 
      cargarPermisosFuncCategoria();
      if($('#form-modal').is(':visible')) {
         $("#form-modal").modal('toggle');
      };
      var datosBusquedas = [];
      datosBusquedas.push('nombre_categoria: ' + res.resource.datosBusquedas['nombre_categoria']);
      datosBusquedas.push('descripcion_categoria: ' + res.resource.datosBusquedas['descripcion_categoria']);
      datosBusquedas.push('dni_responsable: ' + res.resource.datosBusquedas['dni_responsable']);
      datosBusquedas.push('id_padre_categoria: ' + res.resource.datosBusquedas['id_padre_categoria']);
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

      $("#paginacion").html("");

      $("#categorias").html("");
      for (var i = 0; i < res.resource.listaBusquedas.length; i++){
        var tr = construyeCategoriaUsuario(res.resource.listaBusquedas[i]);
        $("#categorias").append(tr);
      }
        
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

      let idElementoList = ["nombreCategoria", "descripcionCategoria", "selectUsuarios", "selectCategoriaPadre"];
      resetearFormulario("formularioGenerico", idElementoList);

      setLang(getCookie('lang'));

      document.getElementById("modal").style.display = "block";
    });
  }
}
  
  /*Función que refresca la tabla por si hay algún cambio en BD */
  async function refrescarTabla(numeroPagina, tamanhoPagina){
    await cargarCategoriasAjaxPromesa(numeroPagina, tamanhoPagina)
    .then((res) => {
        cargarPermisosFuncCategoria();
        setCookie('nombre_categoria', '');
        setCookie('descripcion_categoria', '');
        setCookie('dni_responsable', '');
        setCookie('id_padre_categoria', '');
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
  
        var div = createHideShowColumnsWindow({DESCRIPCION_CATEGORIA_COLUMN:2, RESPONSABLE_CATEGORIA_COLUMN:3});
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
  
        var div = createHideShowColumnsWindow({DESCRIPCION_CATEGORIA_COLUMN:2, RESPONSABLE_CATEGORIA_COLUMN:3});
        $("#checkboxColumnas").append(div);
        $("#paginacion").append(textPaginacion);
  
        setCookie('nombre_categoria', '');
        setCookie('descripcion_categoria', '');
        setCookie('dni_responsable', '');
        setCookie('id_padre_categoria', '');
  
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
  
      let idElementoList = ["nombreCategoria", "descripcionCategoria", "selectUsuarios", "selectCategoriaPadre"];
      resetearFormulario("formularioGenerico", idElementoList);
      $('#nombreCategoria').val(getCookie('nombre_categoria'));
      $('#descripcionCategoria').val(getCookie('descripcion_categoria'));
      $('#selectUsuarios').val(getCookie('dni_responsable'));
      $('#selectCategoriaPadre').val(getCookie('id_padre_categoria'))
      setLang(getCookie('lang'));
  
    }).catch((res) => {
        $("#form-modal").modal('toggle');
  
        respuestaAjaxKO(res.code);
  
        let idElementoList = ["nombreCategoria", "descripcionCategoria", "selectUsuarios", "selectCategoriaPadre"];
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
  
      let idElementoList = ["nombreCategoria", "descripcionCategoria", "selectUsuarios", "selectCategoriaPadre"];
      resetearFormulario("formularioGenerico", idElementoList);
      document.getElementById("modal").style.display = "block";
      $('#nombreCategoria').val(getCookie('nombre_categoria'));
      $('#descripcionCategoria').val(getCookie('descripcion_categoria'));
      $('#selectUsuarios').val(getCookie('dni_responsable'));
      $('#selectCategoriaPadre').val(getCookie('id_padre_categoria'))
      buscarCategoria(getCookie('numeroPagina'), tamanhoPaginaCategoria, 'buscarPaginacion', 'PaginadorCreado');
      setLang(getCookie('lang'));
  
    }).catch((res) => {
      $("#form-modal").modal('toggle');
  
       respuestaAjaxKO(res.code);
  
      let idElementoList = ["nombreCategoria", "descripcionCategoria", "selectUsuarios", "selectCategoriaPadre"];
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
  
      let idElementoList = ["nombreCategoria", "descripcionCategoria", "selectUsuarios", "selectCategoriaPadre"];
      resetearFormulario("formularioGenerico", idElementoList);
      document.getElementById("modal").style.display = "block";
  
      refrescarTabla(0, tamanhoPaginaCategoria);
      setLang(getCookie('lang'));
  
    }).catch((res) => {
  
       $("#form-modal").modal('toggle');
        respuestaAjaxKO(res.code);
  
        let idElementoList = ["nombreCategoria", "descripcionCategoria", "selectUsuarios", "selectCategoriaPadre"];
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
  
      let idElementoList = ["nombreCategoria", "descripcionCategoria", "selectUsuarios", "selectCategoriaPadre"];
      resetearFormulario("formularioGenerico", idElementoList);

      respuestaAjaxOK("CATEGORIA_REACTIVADA_OK", res.code);
      document.getElementById("modal").style.display = "block";
  
      buscarEliminados(0, tamanhoPaginaCategoria, 'PaginadorNo');
      setLang(getCookie('lang'));
  
      }).catch((res) => {
  
        $("#form-modal").modal('toggle');
        let idElementoList = ["nombreCategoria", "descripcionCategoria", "selectUsuarios", "selectCategoriaPadre"];
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
        'return comprobarDescripcionCategoria(\'descripcionCategoria\', \'errorFormatoDescripcionCategoria\', \'descripcionCategoria\')',
        'return comprobarSelect(\'selectUsuarios\', \'errorFormatoDniResponsable\', \'selectUsuarios\')');
    cambiarIcono('images/add.png', 'ICONO_ADD', 'iconoAddCategoria', 'Añadir');
  
    $('#subtitulo').attr('hidden', true);
    $('#labelNombreCategoria').attr('hidden', true);
    $('#labelDescripcionCategoria').attr('hidden', true);
    $('#labelDniResponsable').attr('hidden', false);
    $('#labelCategoriaPadre').attr('hidden', false);
    $('#selectCategoriaPadre').attr('hidden', false);
    $('#selectUsuarios').attr('hidden', false);
  
    let campos = ["nombreCategoria", "descripcionCategoria", "selectUsuarios", "selectCategoriaPadre"];
    let obligatorios = ["obligatorioNombreCategoria", "obligatorioDescripcionCategoria", "obligatorioDniResponsable"];
    eliminarReadonly(campos);
    mostrarObligatorios(obligatorios);
    habilitaCampos(campos);
    setLang(getCookie('lang'));
  
  }
  
  /** Funcion para buscar un objetivo **/
  function showBuscarCategoria() {
    cambiarFormulario('SEARCH_CATEGORIA', 'javascript:buscarCategoria(0,' + tamanhoPaginaCategoria + ', \'buscarModal\'' + ',\'PaginadorNo\');', 'return comprobarBuscarCategoria();');
    cambiarOnBlurCampos('return comprobarNombreCategoriaSearch(\'nombreCategoria\', \'errorFormatoNombreCategoria\', \'nombreCategoria\')', 
        'return comprobarDescripcionCategoriaSearch(\'descripcionCategoria\', \'errorFormatoDescripcionCategoria\', \'descripcionCategoria\')');
    cambiarIcono('images/search.png', 'ICONO_SEARCH', 'iconoSearchCategoria', 'Buscar');
  
    if(getCookie('rolUsuario') == "Administrador" || getCookie('rolUsuario') == "Gestor") {
      $('#subtitulo').attr('hidden', true);
      $('#labelNombreCategoria').attr('hidden', true);
      $('#labelDescripcionCategoria').attr('hidden', true);
      $('#labelDniResponsable').attr('hidden', false);
      $('#labelCategoriaPadre').attr('hidden', true);
      $('#selectCategoriaPadre').attr('hidden', true);
    }else{
      $('#labelDniResponsable').attr('hidden', true);
      $('#labelCategoriaPadre').attr('hidden', true);
      $('#selectUsuarios').attr('hidden', true)
      $('#selectCategoriaPadre').attr('hidden', true);
    }
  
    let campos = ["nombreCategoria", "descripcionCategoria", "selectUsuarios", "selectCategoriaPadre"];
    let obligatorios = ["obligatorioNombreCategoria", "obligatorioDescripcionCategoria", "obligatorioDniResponsable"];
    eliminarReadonly(campos);
    ocultarObligatorios(obligatorios);
    habilitaCampos(campos);
    setLang(getCookie('lang'));
  
  }
  
  /** Funcion para visualizar un objetivo **/
  function showDetalle(nombreCategoria, descripcionCategoria, dni_responsable, usuarioResponsable,id_padre_categoria, nombreCategoriaPadre, idCategoria) {
  
      cambiarFormulario('DETAIL_CATEGORIA', 'javascript:detalleCategoria();', '');
      cambiarIcono('images/close2.png', 'ICONO_CERRAR', 'iconoCerrar', 'Detalle');
  
      if (id_padre_categoria == "null"){
        $('#labelCategoriaPadre').attr('hidden', true);
        $('#selectCategoriaPadre').attr('hidden', true);
      }else{
        $('#labelCategoriaPadre').attr('hidden', false);
        $('#selectCategoriaPadre').attr('hidden', false);
      }

      $('#labelNombreCategoria').attr('hidden', false);
      $('#labelDescripcionCategoria').attr('hidden', false);
      $('#labelDniResponsable').attr('hidden', false);
      $('#subtitulo').attr('hidden', '');
  
      rellenarFormulario(nombreCategoria, descripcionCategoria, dni_responsable, usuarioResponsable, id_padre_categoria);
  
      let campos = ["nombreCategoria", "descripcionCategoria", "selectUsuarios", "selectCategoriaPadre"];
      let obligatorios = ["obligatorioNombreCategoria", "obligatorioDescripcionCategoria", "obligatorioDniResponsable"];
      anadirReadonly(campos);
      ocultarObligatorios(obligatorios);
      deshabilitaCampos(campos);
      setLang(getCookie('lang'));
  
  }
  
  /** Funcion para editar un Categoria **/
  function showEditar(nombreCategoria, descripcionCategoria, dni_responsable, usuarioResponsable,id_padre_categoria, nombreCategoriaPadre, idCategoria) {
  
      cambiarFormulario('EDIT_CATEGORIA', 'javascript:editCategoria();', 'return comprobarEditCategoria();');
      cambiarOnBlurCampos('return comprobarNombreCategoria(\'nombreCategoria\', \'errorFormatoNombreCategoria\', \'nombreCategoria\')', 
        'return comprobarDescripcionCategoria(\'descripcionCategoria\', \'errorFormatoDescripcionCategoria\', \'descripcionCategoria\')'
       );
      cambiarIcono('images/edit.png', 'ICONO_EDIT', 'iconoEditarCategoria', 'Editar');
  
      if (id_padre_categoria == "null"){
        $('#labelCategoriaPadre').attr('hidden', true);
        $('#selectCategoriaPadre').attr('hidden', true);
      }else{
        $('#labelCategoriaPadre').attr('hidden', false);
        $('#selectCategoriaPadre').attr('hidden', false);
      }
      $('#subtitulo').attr('hidden', true);
      $('#labelNombreCategoria').attr('hidden', true);
      $('#labelDescripcionCategoria').attr('hidden', true);
      $('#labelDniResponsable').attr('hidden', false);
      
      rellenarFormulario(nombreCategoria, descripcionCategoria, dni_responsable, usuarioResponsable, id_padre_categoria);
      insertacampo(document.formularioGenerico,'idCategoria', idCategoria);
  
      let campos = ["nombreCategoria", "descripcionCategoria", "selectUsuarios", "selectCategoriaPadre"];
      let obligatorios = ["obligatorioNombreCategoria", "obligatorioDescripcionCategoria", "obligatorioDniResponsable"];
      eliminarReadonly(campos);
      mostrarObligatorios(obligatorios);
      habilitaCampos(campos);
      deshabilitaCampos(["nombreCategoria"]);
      anadirReadonly(["nombreCategoria"]);
      setLang(getCookie('lang'));
  
  }
  
  /** Función para eliminar un Categoria **/
  function showEliminar(nombreCategoria, descripcionCategoria, dni_responsable, usuarioResponsable,id_padre_categoria, nombreCategoriaPadre, idCategoria) {
  
      cambiarFormulario('DELETE_CATEGORIA', 'javascript:deleteCategoria();', '');
      cambiarIcono('images/delete.png', 'ICONO_ELIMINAR', 'iconoEliminar', 'Eliminar');
  
      if (id_padre_categoria == "null"){
        $('#labelCategoriaPadre').attr('hidden', true);
        $('#selectCategoriaPadre').attr('hidden', true);
      }else{
        $('#labelCategoriaPadre').attr('hidden', false);
        $('#selectCategoriaPadre').attr('hidden', false);
      }

      $('#labelNombreCategoria').removeAttr('hidden');
      $('#labelDescripcionCategoria').removeAttr('hidden');
      $('#labelDniResponsable').removeAttr('hidden');

      rellenarFormulario(nombreCategoria, descripcionCategoria, dni_responsable, usuarioResponsable, id_padre_categoria);
      insertacampo(document.formularioGenerico,'idCategoria', idCategoria);
  
      let campos = ["nombreCategoria", "descripcionCategoria", "selectUsuarios", "selectCategoriaPadre"];
      let obligatorios = ["obligatorioNombreCategoria", "obligatorioDescripcionCategoria", "obligatorioDniResponsable"];
      anadirReadonly(campos);
      ocultarObligatorios(obligatorios);
      deshabilitaCampos(campos);
      setLang(getCookie('lang'));
  
  }
  
  /** Función para reactivar un Categoria **/
  function showReactivar(nombreCategoria, descripcionCategoria, dni_responsable, usuarioResponsable,id_padre_categoria, nombreCategoriaPadre, idCategoria) {
  
      cambiarFormulario('REACTIVATE_CATEGORIA', 'javascript:reactivarCategoria();', '');
      cambiarIcono('images/reactivar2.png', 'ICONO_REACTIVAR', 'iconoReactivar', 'Reactivar');
  
      if (id_padre_categoria == "null"){
        $('#labelCategoriaPadre').attr('hidden', true);
        $('#selectCategoriaPadre').attr('hidden', true);
      }else{
        $('#labelCategoriaPadre').attr('hidden', false);
        $('#selectCategoriaPadre').attr('hidden', false);
      }

      $('#labelNombreCategoria').removeAttr('hidden');
      $('#labelDescripcionCategoria').removeAttr('hidden');
      $('#labelDniResponsable').removeAttr('hidden');
  
      rellenarFormulario(nombreCategoria, descripcionCategoria, dni_responsable, usuarioResponsable, id_padre_categoria);
      insertacampo(document.formularioGenerico,'idCategoria', idCategoria);
  
      let campos = ["nombreCategoria", "descripcionCategoria", "selectUsuarios", "selectCategoriaPadre"];
      let obligatorios = ["obligatorioNombreCategoria", "obligatorioDescripcionCategoria", "obligatorioDniResponsable"];
      anadirReadonly(campos);
      ocultarObligatorios(obligatorios);
      deshabilitaCampos(campos);
      setLang(getCookie('lang'));
  
  }
  
  /**Función para cambiar onBlur de los campos*/
  function cambiarOnBlurCampos(onBlurNombreCategoria, onBlurDescripcionCategoria,  onBlurSelectUsuarioResponsable) {
  
      if (onBlurNombreCategoria != ''){
          $("#nombreCategoria").attr('onblur', onBlurNombreCategoria);
      }
  
      if (onBlurDescripcionCategoria != ''){
          $("#descripcionCategoria").attr('onblur', onBlurDescripcionCategoria);
      }
      
      if (onBlurSelectUsuarioResponsable != ''){
        $("#selectUsuarios").attr('onblur', onBlurSelectUsuarioResponsable);
      }
  }
  
  /**Función que rellenado los datos del formulario*/
  function rellenarFormulario(nombreCategoria, descripcionCategoria, dni_responsable, usuarioResponsable, id_padre_categoria) {
  
      $("#nombreCategoria").val(nombreCategoria);
      $("#descripcionCategoria").val(descripcionCategoria); 
      $("#selectUsuarios").val(dni_responsable);
      $("#selectCategoriaPadre").val(id_padre_categoria);
  
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

        if(getCookie('rolUsuario') == "Administrador" || getCookie('rolUsuario') == "Gestor" ){
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
           $('#btnListarCategoriasConsulta').attr('src', 'images/search3.png');
           $('#btnListarCategoriasConsulta').css("cursor", "pointer");
           $('#btnListarCategoriasConsulta').attr("data-toggle", "modal");
           $('#btnListarCategoriasConsulta').attr("data-target", "#form-modal");
          document.getElementById('cabecera').style.display = "none";
          document.getElementById('listaCategorias').style.display = "block";
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
      url: urlPeticionAjaxListarTodosUsuarios,
      contentType : "application/x-www-form-urlencoded; charset=UTF-8",
      data: data,
      headers: {'Authorization': token},
      }).done(res => {
        if (res.code != 'BUSQUEDA_USUARIO_CORRECTO') {
        	respuestaAjaxKO(res.code);
        }
        options = '<option selected value=0><label class="">Selecciona el usuario responsable</label></option>';
        for(var i = 0; i< res.resource.listaBusquedas.length ; i++){
          if(res.resource.listaBusquedas[i].usuario.borrado_usuario == 0){
            options += '<option value=' + res.resource.listaBusquedas[i].usuario.dni_usuario + '>' + res.resource.listaBusquedas[i].usuario.usuario + '</option>';
          }
				}

				$('#selectUsuarios').append(options);
    		
      }).fail( function( jqXHR ) {
        errorFailAjax(jqXHR.status);
      });
}

/** Función para construír el select **/
function construyeSelectCategorias(){
	var options = "";
	
	$('#selectCategoriaPadre').html('');

	var token = getCookie('tokenUsuario');

    var data = {
        controlador : 'GestionCategorias',
        action :'searchAllWithoutPagination'
    }

    $.ajax({
      method: "POST",
      url: urlPeticionAjaxListarTodasCategorias,
      contentType : "application/x-www-form-urlencoded; charset=UTF-8",
      data: data,
      headers: {'Authorization': token},
      }).done(res => {
        if (res.code != 'BUSQUEDA_CATEGORIA_CORRECTO') {
        	respuestaAjaxKO(res.code);
        }
        options = '<option selected value=0><label class=""></label></option>';
        for(var i = 0; i< res.resource.listaBusquedas.length ; i++){
					options += '<option value=' + res.resource.listaBusquedas[i].categoria.id_categoria + '>' + res.resource.listaBusquedas[i].categoria.nombre_categoria + '</option>';
				}

				$('#selectCategoriaPadre').append(options);
    		
      }).fail( function( jqXHR ) {
        errorFailAjax(jqXHR.status);
      });
}
  
  $(document).ready(function() {
    $("#form-modal").on('hidden.bs.modal', function() {
  
      let idElementoErrorList = ["errorFormatoNombreCategoria", "errorFormatoDescripcionCategoria", "errorFormatoDniResponsable", "errorFormatoCategoriaPadre"];
  
      let idElementoList =  ["nombreCategoria", "descripcionCategoria", "selectUsuarios", "selectCategoriaPadre"];
  
      limpiarFormulario(idElementoList);
      eliminarMensajesValidacionError(idElementoErrorList, idElementoList);
      setLang(getCookie('lang'));
    });
  
  }); 

/**Función para que el usuario acceda a los procesos desde una categoria*/
function accederProcesosCategoria(idCategoria){
  setCookie('idCategoria', idCategoria)
  window.location.href = "GestionDeProcesos.html";
}