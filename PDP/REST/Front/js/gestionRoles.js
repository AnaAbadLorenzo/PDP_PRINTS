/**Función para recuperar los roles con ajax y promesas*/
function cargarRolesAjaxPromesa(numeroPagina, tamanhoPagina){
    return new Promise(function(resolve, reject) {
        var token = getCookie('tokenUsuario');
  
      var data = {
        controlador : 'GestionRoles',
        action : 'search',
        inicio : calculaInicio(numeroPagina, tamanhoPaginaRol),
        tamanhoPagina : tamanhoPaginaRol,
      }
      
      $.ajax({
        method: "POST",
        url: urlPeticionAjaxListadoRoles,
        contentType : "application/x-www-form-urlencoded; charset=UTF-8",
        data: data,
        headers: {'Authorization': token},
        }).done(res => {
          if (res.code != 'BUSQUEDA_ROL_CORRECTO') {
            reject(res);
          }
          resolve(res);
        }).fail( function( jqXHR ) {
          errorFailAjax(jqXHR.status);
        });
    });
  }
  
  /**Función para recuperar los roles eliminados con ajax y promesas*/
  function buscarEliminadosAjaxPromesa(numeroPagina, tamanhoPagina){
    return new Promise(function(resolve, reject) {
      var token = getCookie('tokenUsuario');
  
      var data = {
        controlador : 'GestionRoles',
        action : 'searchDelete',
        inicio : calculaInicio(numeroPagina, tamanhoPaginaRol),
        tamanhoPagina : tamanhoPaginaRol,
      }
      
      $.ajax({
        method: "POST",
        url: urlPeticionAjaxListadoRolesEliminados,
        contentType : "application/x-www-form-urlencoded; charset=UTF-8",
        data: data,
        headers: {'Authorization': token},
        }).done(res => {
          if (res.code != 'BUSQUEDA_ROL_ELIMINADO_CORRECTO') {
            reject(res);
          }
          resolve(res);
        }).fail( function( jqXHR ) {
          errorFailAjax(jqXHR.status);
        });
    });
  }
  
  /**Función para recuperar un rol en base a parámetros con ajax y promesas*/
  function buscarRolAjaxPromesa(numeroPagina, tamanhoPagina, accion){
    return new Promise(function(resolve, reject) {
        var token = getCookie('tokenUsuario');
  
      if(accion == "buscarModal"){
          var data = {
            controlador : 'GestionRoles',
            action: 'searchByParameters',
            nombre_rol : $('#nombreRol').val(),
            descripcion_rol : $('#descripcionRol').val(),
            inicio: calculaInicio(numeroPagina, tamanhoPaginaRol),
            tamanhoPagina: tamanhoPaginaRol
          }
      }
  
      if(accion == "buscarPaginacion"){
        if(getCookie('nombre_rol') == null || getCookie('nombre_rol') == ""){
          var nombreRol = "";
        }else{
          var nombreRol = getCookie('nombre_rol');
        }
  
        if(getCookie('descripcion_rol') == null || getCookie('descripcion_rol') == ""){
          var descripRol = "";
        }else{
          var descripRol = getCookie('descripcion_rol');
        }
  
         var data = {
            controlador : 'GestionRoles',
            action: 'searchByParameters',
            nombre_rol : nombreRol,
            descripcion_rol : descripRol,
            inicio: calculaInicio(numeroPagina, tamanhoPaginaRol),
            tamanhoPagina: tamanhoPaginaRol
          }
      }
  
      $.ajax({
        method: "POST",
        url: urlPeticionAjaxListarRol,
        contentType : "application/x-www-form-urlencoded; charset=UTF-8",
        data: data,
        headers: {'Authorization': token},
        }).done(res => {
          if (res.code != 'BUSQUEDA_PERSONALIZADA_ROL_CORRECTO') {
            reject(res);
          }
          resolve(res);
        }).fail( function( jqXHR ) {
          errorFailAjax(jqXHR.status);
        });
    });
  }
  
  /**Función para anadir un rol un rol con ajax y promesas*/
  function anadirRolAjaxPromesa(){
    return new Promise(function(resolve, reject) {
        var token = getCookie('tokenUsuario');
      
      var data = {
        controlador : 'GestionRoles',
        action: 'add',
        nombre_rol : $('#nombreRol').val(),
        descripcion_rol : $('#descripcionRol').val(),
        borrado_rol : 0
      }
  
        $.ajax({
        method: "POST",
        url: urlPeticionAjaxAddRol,
        contentType : "application/x-www-form-urlencoded; charset=UTF-8",
        data: data,
        headers: {'Authorization': token},
        }).done(res => {
          if (res.code != 'ADD_ROL_COMPLETO') {
            reject(res);
          }
          resolve(res);
        }).fail( function( jqXHR ) {
          errorFailAjax(jqXHR.status);
        });
    });
  }
  
  /**Función para editar un rol con ajax y promesas*/
  function editarRolAjaxPromesa(){
    return new Promise(function(resolve, reject) {
        var token = getCookie('tokenUsuario');

      var data = {
        controlador : 'GestionRoles',
        action : 'edit',
        id_rol : $("input[name=idRol]").val(),
        nombre_rol : $('#nombreRol').val(),
        descripcion_rol : $('#descripcionRol').val(),
        borrado_rol : 0
      }
  
        $.ajax({
        method: "POST",
        url: urlPeticionAjaxEditRol,
        contentType : "application/x-www-form-urlencoded; charset=UTF-8",
        data: data,
        headers: {'Authorization': token},
        }).done(res => {
          if (res.code != 'EDIT_ROL_COMPLETO') {
            reject(res);
          }
          resolve(res);
        }).fail( function( jqXHR ) {
          errorFailAjax(jqXHR.status);
        });
    });
  }
  
  /**Función para eliminar un rol un rol con ajax y promesas*/
  function eliminarRolAjaxPromesa(){
    return new Promise(function(resolve, reject) {
        var token = getCookie('tokenUsuario');

        var data = {
            controlador : 'GestionRoles',
            action : 'delete',
            id_rol : $("input[name=idRol]").val(),
            nombre_rol : $('#nombreRol').val(),
            descripcion_rol : $('#descripcionRol').val(),
            borradoRol : 1
      }
  
        $.ajax({
        method: "POST",
        url: urlPeticionAjaxDeleteRol,
        contentType : "application/x-www-form-urlencoded; charset=UTF-8",
        data: data,
        headers: {'Authorization': token},
        }).done(res => {
          if (res.code != 'DELETE_ROL_COMPLETO') {
            reject(res);
          }
          resolve(res);
        }).fail( function( jqXHR ) {
          errorFailAjax(jqXHR.status);
        });
    });
  }
  
  /**Función para ver en detalle un rol con ajax y promesas*/
  function detalleRolAjaxPromesa(){
    return new Promise(function(resolve, reject) {
      var token = getCookie('tokenUsuario');
      
      var data = {
        controlador : 'GestionRoles',
        action : 'searchByParameters',
        nombre_rol : $('#nombreRol').val(),
        descripcion_rol : $('#descripcionRol').val(),
        inicio : 0,
        tamanhoPagina : 1
      }
  
        $.ajax({
        method: "POST",
        url: urlPeticionAjaxListarRol,
        contentType : "application/x-www-form-urlencoded; charset=UTF-8",
        data: data,
        headers: {'Authorization': token},
        }).done(res => {
          if (res.code != 'BUSQUEDA_PERSONALIZADA_ROL_CORRECTO') {
            reject(res);
          }
          resolve(res);
        }).fail( function( jqXHR ) {
          errorFailAjax(jqXHR.status);
        });
    });
  }
  
  /**Función para reactivar un rol con ajax y promesas*/
  function reactivarRolesAjaxPromesa(){
    return new Promise(function(resolve, reject) {
      var token = getCookie('tokenUsuario');
    
      var data = {
        controlador:'GestionRoles',
        action: 'reactivar',
        id_rol : $("input[name=idRol]").val(),
        nombre_rol : $('#nombreRol').val(),
        descripcion_rol : $('#descripcionRol').val(),
        borrado_rol : 0
      }
  
        $.ajax({
        method: "POST",
        url: urlPeticionAjaxReactivarRol,
        contentType : "application/x-www-form-urlencoded; charset=UTF-8",
        data: data,
        headers: {'Authorization': token},
        }).done(res => {
          if (res.code != 'REACTIVAR_ROL_CORRECTO') {
            reject(res);
          }
          resolve(res);
        }).fail( function( jqXHR ) {
          errorFailAjax(jqXHR.status);
        });
    });
  }
  
  /* Función para obtener los roles del sistema */
  async function cargarRoles(numeroPagina, tamanhoPagina, paginadorCreado){
      await cargarRolesAjaxPromesa(numeroPagina, tamanhoPagina)
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
        
        document.getElementById('cabecera').style.display="block";
        document.getElementById('cabeceraEliminados').style.display="none";
  
        $("#datosRol").html("");
        $("#checkboxColumnas").html("");
        $("#paginacion").html("");
        for (var i = 0; i < res.resource.listaBusquedas.length; i++){
            var tr = construyeFila('ROL', res.resource.listaBusquedas[i]);
            $("#datosRol").append(tr);
        }
          
        var div = createHideShowColumnsWindow({ROL_DESCRIPTION_COLUMN:2});
        $("#checkboxColumnas").append(div);
        $("#paginacion").append(textPaginacion);
        setLang(getCookie('lang'));
  
        if(paginadorCreado != 'PaginadorCreado'){
            paginador(totalResults, 'cargarRoles', 'ROL');
        }
        
        if(numeroPagina == 0){
          $('#' + (numeroPagina+1)).addClass("active");
        }else{
          $('#' + numeroPagina).addClass("active");
        }
  
        setLang(getCookie('lang'));
        
        }).catch((res) => {
          $("#modal-title").removeClass();
          respuestaAjaxKO(res.code);
          setLang(getCookie('lang'));
          document.getElementById("modal").style.display = "block";
      });
  }
  
  /*Función que refresca la tabla por si hay algún cambio en BD */
  async function refrescarTabla(numeroPagina, tamanhoPagina){
      await cargarRolesAjaxPromesa(numeroPagina, tamanhoPagina)
      .then((res) => {
        cargarPermisosFuncRol();
        setCookie('nombre_rol', '');
        setCookie('descripcion_rol', '');
        var numResults = res.resource.numResultados + '';
        var totalResults = res.resource.tamanhoTotal + '';
        var inicio = 0;
        if(res.resource.listaBusquedas.length == 0){
          inicio = 0;
        }else{
          inicio = parseInt(res.resource.inicio)+1;
        }
        var textPaginacion = inicio + " - " + (parseInt(res.resource.inicio)+parseInt(numResults))  + " total " + totalResults;
  
        document.getElementById('cabecera').style.display="block";
        document.getElementById('cabeceraEliminados').style.display="none";
  
        $("#datosRol").html("");
        $("#checkboxColumnas").html("");
        $("#paginacion").html("");
        
        for (var i = 0; i < res.resource.listaBusquedas.length; i++){
            var tr = construyeFila('ROL', res.resource.listaBusquedas[i]);
            $("#datosRol").append(tr);
        }
          
        var div = createHideShowColumnsWindow({ROL_DESCRIPTION_COLUMN:2});
        $("#checkboxColumnas").append(div);
        $("#paginacion").append(textPaginacion);
        setLang(getCookie('lang'));
  
        setCookie('nombre_rol', '');
        setCookie('descripcion_rol', '');
  
        paginador(totalResults, 'cargarRoles', 'ROL');
  
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
          $("#modal-title").removeClass();
          $("#modal-title").addClass("ERROR");
          document.getElementById("modal-title").style.color = "#a50707";
          $(".imagenAviso").attr('src', 'images/failed.png');
          $("#modal-mensaje").removeClass();
          $("#modal-mensaje").addClass(res.code);
          setLang(getCookie('lang'));
          document.getElementById("modal").style.display = "block";
      });
  }
  
  /** Función que buscar un rol **/
  async function buscarRol(numeroPagina, tamanhoPagina, accion, paginadorCreado){
      await buscarRolAjaxPromesa(numeroPagina, tamanhoPagina, accion)
        .then((res) => {
        cargarPermisosFuncRol();
        if($('#form-modal').is(':visible')) {
           $("#form-modal").modal('toggle');
        };
        var datosBusquedas = [];
        datosBusquedas.push('nombre_rol: ' + res.resource.datosBusquedas['nombre_rol']);
        datosBusquedas.push('descripcion_rol: ' + res.resource.datosBusquedas['descripcion_rol']);
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
  
        $("#datosRol").html("");
        $("#checkboxColumnas").html("");
        $("#paginacion").html("");
        for (var i = 0; i < res.resource.listaBusquedas.length; i++){
            var tr = construyeFila('ROL', res.resource.listaBusquedas[i]);
            $("#datosRol").append(tr);
        }
          
        var div = createHideShowColumnsWindow({ROL_DESCRIPTION_COLUMN:2});
        $("#checkboxColumnas").append(div);
        $("#paginacion").append(textPaginacion);
        setLang(getCookie('lang'));
  
        if(paginadorCreado != 'PaginadorCreado'){
           paginador(totalResults, 'buscarRol', 'ROL');
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
        cargarPermisosFuncRol();
          $("#modal-title").removeClass();
          $("#modal-title").addClass("ERROR");
          document.getElementById("modal-title").style.color = "#a50707";
          $(".imagenAviso").attr('src', 'images/failed.png');
          $("#modal-mensaje").removeClass();
          $("#modal-mensaje").addClass(res.code);
          setLang(getCookie('lang'));
          document.getElementById("modal").style.display = "block";
      });
  }
  
  /** Función que añade un rol **/
  async function addRol(){
      await anadirRolAjaxPromesa()
      .then((res) => {
        $("#form-modal").modal('toggle');
  
        respuestaAjaxOK("ROL_GUARDADO_OK", res.code);
  
        let idElementoList = ["nombreRol", "descripcionRol"];
        resetearFormulario("formularioGenerico", idElementoList);
        setLang(getCookie('lang'));
        document.getElementById("modal").style.display = "block";
      
        $('#nombreRol').val(getCookie('rolName'));
        $('#descripcionRol').val(getCookie('rolDescription'));
        buscarRol(getCookie('numeroPagina'), tamanhoPaginaRol, 'buscarPaginacion', 'PaginadorNo');
        setLang(getCookie('lang'));
  
    }).catch((res) => {
          $("#form-modal").modal('toggle');
  
        respuestaAjaxKO(res.code);
  
          let idElementoList = ["nombreRol", "descripcionRol"];
          resetearFormulario("formularioGenerico", idElementoList);
  
          setLang(getCookie('lang'));
  
          document.getElementById("modal").style.display = "block";
  
  
      });
  }
  
  /** Función que modifica un rol **/
  async function editRol(){
      await editarRolAjaxPromesa()
      .then((res) => {
          $("#form-modal").modal('toggle');
  
      respuestaAjaxOK("ROL_EDITADO_OK", res.code);
  
      let idElementoList = ["nombreRol", "descripcionRol"];
      resetearFormulario("formularioGenerico", idElementoList);
      setLang(getCookie('lang'));
      document.getElementById("modal").style.display = "block";
      $('#nombreRol').val(getCookie('rolName'));
      $('#descripcionRol').val(getCookie('rolDescription'));
      buscarRol(getCookie('numeroPagina'), tamanhoPaginaRol, 'buscarPaginacion', 'PaginadorCreado');
      setLang(getCookie('lang'));
  
    }).catch((res) => {
      $("#form-modal").modal('toggle');
  
         respuestaAjaxKO(res.code);
  
          let idElementoList = ["nombreRol", "descripcionRol"];
          resetearFormulario("formularioGenerico", idElementoList);
  
          setLang(getCookie('lang'));
  
          document.getElementById("modal").style.display = "block";
  
  
      });
  }
  
  /** Función que elimina un rol **/
  async function deleteRol(){
      await eliminarRolAjaxPromesa()
      .then((res) => {
          $("#form-modal").modal('toggle');
  
      respuestaAjaxOK("ROL_ELIMINADO_OK", res.code);
  
      let idElementoList = ["nombreRol", "descripcionRol"];
      resetearFormulario("formularioGenerico", idElementoList);
      setLang(getCookie('lang'));
      document.getElementById("modal").style.display = "block";
     
      refrescarTabla(0, tamanhoPaginaRol);
      setLang(getCookie('lang'));
  
    }).catch((res) => {
         
       $("#form-modal").modal('toggle');
        respuestaAjaxKO(res.code);
  
          let idElementoList = ["nombreRol", "descripcionRol"];
          resetearFormulario("formularioGenerico", idElementoList);
  
          setLang(getCookie('lang'));
  
          document.getElementById("modal").style.display = "block";
  
  
      });
  }
  
  /** Función que visualiza un rol **/
  async function detalleRol(){
    await detalleRolAjaxPromesa()
    .then((res) => {
      $("#form-modal").modal('toggle');
  
      let idElementoList = ["nombreRol", "descripcionRol"];
      resetearFormulario("formularioGenerico", idElementoList);
      setLang(getCookie('lang'));
      $('#nombreRol').val(getCookie('rolName'));
      $('#descripcionRol').val(getCookie('rolDescription'));
  
    }).catch((res) => {
        $("#form-modal").modal('toggle');
  
        respuestaAjaxKO(res.code);
  
        let idElementoList = ["nombreRol", "descripcionRol"];
        resetearFormulario("formularioGenerico", idElementoList);
  
        setLang(getCookie('lang'));
  
        document.getElementById("modal").style.display = "block";
  
    });
  }
  
  /*Función que busca los eliminados de la tabla de rol*/
  async function buscarEliminados(numeroPagina, tamanhoPagina, paginadorCreado){
    await buscarEliminadosAjaxPromesa(numeroPagina, tamanhoPagina)
    .then((res) => {
        cargarPermisosFuncRol();
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
            document.getElementById('cabecera').style.display="none";
            document.getElementById('cabeceraEliminados').style.display="block";
        }
  
  
        $("#datosRol").html("");
        $("#checkboxColumnas").html("");
        $("#paginacion").html("");
          for (var i = 0; i < res.resource.listaBusquedas.length; i++){
            var tr = construyeFilaEliminados('ROL', res.resource.listaBusquedas[i]);
            $("#datosRol").append(tr);
          }
  
          if(res.resource.listaBusquedas.length == 0){
            document.getElementById('cabecera').style.display= "none";
            document.getElementById('cabeceraEliminados').style.display= "block";
          }
        
        var div = createHideShowColumnsWindow({ROL_DESCRIPTION_COLUMN:2});
        $("#checkboxColumnas").append(div);
        $("#paginacion").append(textPaginacion);
        setLang(getCookie('lang'));
  
        setCookie('nombre_rol', '');
        setCookie('descripcion_rol', '');
  
        if(paginadorCreado != 'PaginadorCreado'){
          paginador(totalResults, 'buscarEliminadosRol', 'ROL');
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
  
  /*Función que reactiva los eliminados de la tabla de rol*/
  async function reactivarRol(){
    await reactivarRolesAjaxPromesa()
    .then((res) => {
  
       cargarPermisosFuncRol();
  
      $("#form-modal").modal('toggle');
  
      respuestaAjaxOK("ROL_REACTIVADO_OK", res.code);
  
      setLang(getCookie('lang'));
      document.getElementById("modal").style.display = "block";
        
      buscarEliminados(0, tamanhoPaginaRol, 'PaginadorNo');
      
      }).catch((res) => {
        $("#form-modal").modal('toggle');
        respuestaAjaxKO(res.code);
        setLang(getCookie('lang'));
        document.getElementById("modal").style.display = "block";
    });
  }
  
  /*Función que comprueba los permisos del usuario sobre la funcionalidad*/
  async function cargarPermisosFuncRol(){
    await cargarPermisosFuncRolAjaxPromesa()
    .then((res) => {
      gestionarPermisosRol(res.resource);
      setLang(getCookie('lang'));
      
      }).catch((res) => {
        respuestaAjaxKO(res.code);
        setLang(getCookie('lang'));
        document.getElementById("modal").style.display = "block";
    });
  }
  
  /** Funcion para buscar un rol **/
  function showBuscarRol() {
      var idioma = getCookie('lang');
  
      cambiarFormulario('SEARCH_ROL', 'javascript:buscarRol(0,' + tamanhoPaginaRol + ', \'buscarModal\'' + ',\'PaginadorNo\');', 'return comprobarBuscarRol();');
      cambiarOnBlurCampos('return comprobarNombreRolSearch(\'nombreRol\', \'errorFormatoNombreRol\', \'nombreRol\')', 
      'return comprobarDescripcionRolSearch(\'descripcionRol\', \'errorFormatoDescripcionRol\', \'descripcionRol\')');
      cambiarIcono('images/search.png', 'ICONO_SEARCH', 'iconoSearchRol', 'Buscar');
      setLang(idioma);
  
      $('#subtitulo').attr('hidden', true);
      $('#labelRolName').attr('hidden', true);
      $('#labelRolDescription').attr('hidden', true);
  
    let campos = ["nombreRol", "descripcionRol"];
    let obligatorios = ["obligatorioRolName", "obligatorioRolDescription"];
    eliminarReadonly(campos);
    ocultarObligatorios(obligatorios);
    habilitaCampos(campos);
    setLang(getCookie('lang'));
  
  }
  
  /** Funcion para añadir un rol **/
  function showAddRol() {
      var idioma = getCookie('lang');
      cambiarFormulario('ADD_ROL', 'javascript:addRol();', 'return comprobarAddRol();');
      cambiarOnBlurCampos('return comprobarNombreRol(\'nombreRol\', \'errorFormatoNombreRol\', \'nombreRol\')', 
      'return comprobarDescripcionRol(\'descripcionRol\', \'errorFormatoDescripcionRol\', \'descripcionRol\')');
      cambiarIcono('images/add.png', 'ICONO_ADD', 'iconoAddRol', 'Añadir');
      setLang(idioma);
  
      $('#subtitulo').attr('hidden', true);
      $('#labelRolName').attr('hidden', true);
      $('#labelRolDescription').attr('hidden', true);
  
    let campos = ["nombreRol", "descripcionRol"];
    let obligatorios = ["obligatorioRolName", "obligatorioRolDescription"];
    eliminarReadonly(campos);
    mostrarObligatorios(obligatorios);
    habilitaCampos(campos);
    setLang(getCookie('lang'));
  
  }
  
  /** Funcion para editar un rol **/
  function showEditar(rolName, rolDescription, idRol) {
      var idioma = getCookie('lang');
  
      cambiarFormulario('EDIT_ROLE', 'javascript:editRol();', 'return comprobarEditRol();');
      cambiarOnBlurCampos('return comprobarNombreRol(\'nombreRol\', \'errorFormatoNombreRol\', \'nombreRol\')',
          'return comprobarDescripcionRol(\'descripcionRol\', \'errorFormatoDescripcionRol\', \'descripcionRol\')');
      cambiarIcono('images/edit.png', 'ICONO_EDIT', 'iconoEditarRol', 'Editar');
     
      setLang(idioma);
      
      $('#subtitulo').attr('hidden', true);
      $('#labelRolName').attr('hidden', true);
          $('#labelRolDescription').attr('hidden', true);
  
      rellenarFormulario(rolName, rolDescription);
      insertacampo(document.formularioGenerico,'idRol', idRol);
  
      let campos = ["nombreRol", "descripcionRol"];
      let obligatorios = ["obligatorioRolName", "obligatorioRolDescription"];
      eliminarReadonly(campos);
      mostrarObligatorios(obligatorios);
      habilitaCampos(campos);
      deshabilitaCampos(["nombreRol"]);
      setLang(getCookie('lang'));
  
  }
  
  /** Función para eliminar un rol **/
  function showEliminar(rolName, rolDescription, idRol) {
      
          var idioma = getCookie('lang');
  
      cambiarFormulario('DELETE_ROLE', 'javascript:deleteRol();', '');
      cambiarIcono('images/delete.png', 'ICONO_ELIMINAR', 'iconoEliminar', 'Eliminar');
     
      setLang(idioma);
      
      $('#labelRolName').removeAttr('hidden');
      $('#labelRolDescription').removeAttr('hidden');
      $('#subtitulo').removeAttr('class');
      $('#subtitulo').empty();
      $('#subtitulo').attr('class', 'SEGURO_REACTIVAR_ROL');
      $('#subtitulo').attr('hidden', false);
      
  
      rellenarFormulario(rolName, rolDescription);
      insertacampo(document.formularioGenerico,'idRol', idRol);
  
      let campos = ["nombreRol", "descripcionRol"];
      let obligatorios = ["obligatorioRolName", "obligatorioRolDescription"];
      eliminarReadonly(campos);
      ocultarObligatorios(obligatorios);
      deshabilitaCampos(campos);
      setLang(getCookie('lang'));
  
  }
  
  /** Función para ver el detalle de  un rol **/
  function showDetalle(rolName, rolDescription) {
    
      var idioma = getCookie('lang');
  
      cambiarFormulario('DETAIL_ROLE', 'javascript:detalleRol();', '');
      cambiarIcono('images/close2.png', 'ICONO_CERRAR', 'iconoCerrar', 'Detalle');
     
      setLang(idioma);
      
      $('#labelRolName').removeAttr('hidden');
      $('#labelRolDescription').removeAttr('hidden');
      $('#subtitulo').attr('hidden', '');
  
      rellenarFormulario(rolName, rolDescription);
  
      let campos = ["nombreRol", "descripcionRol"];
      let obligatorios = ["obligatorioRolName", "obligatorioRolDescription"];
      anadirReadonly(campos);
      ocultarObligatorios(obligatorios);
      deshabilitaCampos(campos);
      setLang(getCookie('lang'));
  
  }
  
  /** Función para reactivar un rol **/
  function showReactivar(rolName, rolDescription, idRol) {
    
      var idioma = getCookie('lang');
  
      cambiarFormulario('REACTIVATE_ROLE', 'javascript:reactivarRol();', '');
      cambiarIcono('images/reactivar2.png', 'ICONO_REACTIVAR', 'iconoReactivar', 'Reactivar');
     
      setLang(idioma);
      
      $('#labelRolName').removeAttr('hidden');
      $('#labelRolDescription').removeAttr('hidden');
      $('#subtitulo').removeAttr('class');
      $('#subtitulo').empty();
      $('#subtitulo').attr('class', 'SEGURO_REACTIVAR_ROL');
      $('#subtitulo').removeAttr('hidden');
      
  
      rellenarFormulario(rolName, rolDescription);
      insertacampo(document.formularioGenerico,'idRol', idRol);
  
      let campos = ["nombreRol", "descripcionRol"];
      let obligatorios = ["obligatorioRolName", "obligatorioRolDescription"];
      anadirReadonly(campos);
      ocultarObligatorios(obligatorios);
      deshabilitaCampos(campos);
      setLang(getCookie('lang'));
  
  }
  
  /**Función para cambiar onBlur de los campos*/
  function cambiarOnBlurCampos(onBlurNombreRol, onBlurDescripcionRol) {
      
      if (onBlurNombreRol != ''){
          $("#nombreRol").attr('onblur', onBlurNombreRol);
      }
  
      if (onBlurDescripcionRol != ''){
          $("#descripcionRol").attr('onblur', onBlurDescripcionRol);
      }
  }
  
  /**Función que rellenado los datos del formulario*/
  function rellenarFormulario(rolName, rolDescription) {
  
      $("#nombreRol").val(rolName);
      $("#descripcionRol").val(rolDescription); 
  
  }
  
  /** Función para recuperar los permisos de un usuario sobre la funcionalidad **/
  function cargarPermisosFuncRolAjaxPromesa(){
    return new Promise(function(resolve, reject) {
      var nombreUsuario = getCookie('usuario');
      var token = getCookie('tokenUsuario');
      
      var usuario = nombreUsuario;
      var data = {
        controlador : 'GestionACL',
        action: 'searchAccionesPorFuncionalidadUsuario',
        usuario : usuario,
        nombre_funcionalidad : 'Gestión de roles'
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
  
  /** Función para gestionar los iconos dependiendo de los permisos de los usuarios **/
  function gestionarPermisosRol(idElementoList) {
    idElementoList.forEach( function (idElemento) {
      switch(idElemento.nombre_accion){
        case "Añadir":
          $('#btnAddRol').attr('src', 'images/add3.png');
          $('#btnAddRol').css("cursor", "pointer");
          $('#divAddRol').attr("data-toggle", "modal");
          $('#divAddRol').attr("data-target", "#form-modal");
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
          $('#btnListarRol').attr('src', 'images/search3.png');
          $('#btnSearchDelete').attr('src', 'images/searchDelete3.png');
          $('#btnListarRol').css("cursor", "pointer");
          $('.iconoSearchDelete').css("cursor", "pointer");
          $('#divListarRol').attr("data-toggle", "modal");
          $('#divSearchDelete').attr("onclick", "javascript:buscarEliminados(0, \'tamanhoPaginaRol\', \'PaginadorNo\')");
          $('#divListarRol').attr("data-target", "#form-modal");
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
          
          let idElementoErrorList = ["errorFormatoNombreRol", "errorFormatoDescripcionRol"];
          
          let idElementoList = ["nombreRol", "descripcionRol"];
  
          limpiarFormulario(idElementoList);
          eliminarMensajesValidacionError(idElementoErrorList, idElementoList);
          setLang(getCookie('lang'));
      });
  
  });