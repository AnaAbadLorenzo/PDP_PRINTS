/** Función para añadir funcionalidades con ajax y promesas **/
function anadirFuncionalidadAjaxPromesa(){
    return new Promise(function(resolve, reject) {
      var token = getCookie('tokenUsuario');

      var data = {
        controlador : 'GestionFuncionalidades',
        action : 'add',
        nombre_funcionalidad : $('#nombreFuncionalidad').val(),
        descripcion_funcionalidad : $('#descripcionFuncionalidad').val(),
        borrado_funcionalidad : 0
      }
      
      $.ajax({
        method: "POST",
        url: urlPeticionAjaxAddFuncionalidad,
        contentType : "application/x-www-form-urlencoded; charset=UTF-8",
        data: data,  
        headers: {'Authorization': token},
        }).done(res => {
          if (res.code != 'ADD_FUNCIONALIDAD_COMPLETO') {
            reject(res);
          }
          resolve(res);
        }).fail( function( jqXHR ) {
          errorFailAjax(jqXHR.status);
        });
    });
  }
  
  /** Función para añadir funcionalidades con ajax y promesas **/
  function buscarFuncionalidadAjaxPromesa(numeroPagina, tamanhoPagina, accion){
    return new Promise(function(resolve, reject) {
      var token = getCookie('tokenUsuario');
  
      if(accion == "buscarModal"){
        var data = {
          controlador : 'GestionFuncionalidades',
          action : 'searchByParameters',
          nombre_funcionalidad : $('#nombreFuncionalidad').val(),
          descripcion_funcionalidad : $('#descripcionFuncionalidad').val(),
          inicio : calculaInicio(numeroPagina, tamanhoPaginaFuncionalidad),
          tamanhoPagina : tamanhoPaginaFuncionalidad 
        }
      }
  
      if(accion == "buscarPaginacion"){
        if(getCookie('nombre_funcionalidad') == null || getCookie('nombre_funcionalidad') == ""){
          var nombreFunc = "";
        }else{
          var nombreFunc = getCookie('nombre_funcionalidad');
        }
  
        if(getCookie('descripcion_funcionalidad') == null || getCookie('descripcion_funcionalidad') == ""){
          var descripFunc = "";
        }else{
          var descripFunc = getCookie('descripcion_funcionalidad');
        }
  
        var data = {
          controlador : 'GestionFuncionalidades',
          action : 'searchByParameters',
          nombre_funcionalidad : nombreFunc,
          descripcion_funcionalidad : descripFunc,
          inicio : calculaInicio(numeroPagina, tamanhoPaginaFuncionalidad),
          tamanhoPagina : tamanhoPaginaFuncionalidad 
        }
      }
      
      $.ajax({
        method: "POST",
        url: urlPeticionAjaxListarFuncionalidad,
        contentType : "application/x-www-form-urlencoded; charset=UTF-8",
        data: data,
        headers: {'Authorization': token},
        }).done(res => {
          if (res.code != 'BUSQUEDA_FUNCIONALIDAD_CORRECTO') {
            reject(res);
          }
          resolve(res);
        }).fail( function( jqXHR ) {
          errorFailAjax(jqXHR.status);
        });
    });
  }
  
  /** Función para recuperar los permisos de un usuario sobre la funcionalidad **/
  function cargarPermisosFuncFuncionalidadAjaxPromesa(){
    return new Promise(function(resolve, reject) {
      var nombreUsuario = getCookie('usuario');
      var token = getCookie('tokenUsuario');
      
      var usuario = nombreUsuario;
     
      var data = {
        controlador : 'GestionACL',
        action: 'searchAccionesPorFuncionalidadUsuario',
        usuario : usuario,
        nombre_funcionalidad : 'Gestión de funcionalidades'
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
  
  /**Función para editar una funcionalidad con ajax y promesas*/
  function editarFuncionalidadAjaxPromesa(){
    return new Promise(function(resolve, reject) {
      var token = getCookie('tokenUsuario');
  
      var data = {
        controlador : 'GestionFuncionalidades',
        action : 'edit',
        id_funcionalidad : $("input[name=idFuncionalidad]").val(),
        nombre_funcionalidad : $('#nombreFuncionalidad').val(),
        descripcion_funcionalidad : $('#descripcionFuncionalidad').val(),
        borrado_funcionalidad : 0
      }

        $.ajax({
        method: "POST",
        url: urlPeticionAjaxEditFuncionalidad,
        contentType : "application/x-www-form-urlencoded; charset=UTF-8",
        data: data,
        headers: {'Authorization': token},
        }).done(res => {
          if (res.code != 'EDIT_FUNCIONALIDAD_COMPLETO') {
            reject(res);
          }
          resolve(res);
        }).fail( function( jqXHR ) {
          errorFailAjax(jqXHR.status);
        });
    });
  }
  
  /**Función para eliminar un rol un rol con ajax y promesas*/
  function eliminarFuncionalidadAjaxPromesa(){
    return new Promise(function(resolve, reject) {
      var token = getCookie('tokenUsuario');
  
      var data = {
        controlador : 'GestionFuncionalidades',
        action : 'delete',
        id_funcionalidad : $("input[name=idFuncionalidad]").val(),
        nombre_funcionalidad : $('#nombreFuncionalidad').val(),
        descripcion_funcionalidad : $('#descripcionFuncionalidad').val(),
        borrado_funcionalidad : 1
      }

        $.ajax({
        method: "POST",
        url: urlPeticionAjaxDeleteFuncionalidad,
        contentType : "application/x-www-form-urlencoded; charset=UTF-8",
        data: data,
        headers: {'Authorization': token},
        }).done(res => {
          if (res.code != 'DELETE_FUNCIONALIDAD_COMPLETO') {
            reject(res);
          }
          resolve(res);
        }).fail( function( jqXHR ) {
          errorFailAjax(jqXHR.status);
        });
    });
  }
  
  /*Función que comprueba los permisos del usuario sobre la funcionalidad*/
  async function cargarPermisosFuncFuncionalidad(){
    await cargarPermisosFuncFuncionalidadAjaxPromesa()
    .then((res) => {
      gestionarPermisosFuncionalidad(res.resource);
      setLang(getCookie('lang'));
    }).catch((res) => {
        respuestaAjaxKO(res.code);
        setLang(getCookie('lang'));
        document.getElementById("modal").style.display = "block";
    });
  }
  
  
  /** Función para recuperar las funcionalidades con ajax y promesas **/
  function cargarFuncionalidadesAjaxPromesa(numeroPagina, tamanhoPagina){
    return new Promise(function(resolve, reject) {
        var token = getCookie('tokenUsuario');
  
      var data = {
        controlador : 'GestionFuncionalidades',
        action: 'search',
        inicio : calculaInicio(numeroPagina, tamanhoPaginaFuncionalidad),
        tamanhoPagina : tamanhoPaginaFuncionalidad
      }
      
      $.ajax({
        method: "POST",
        url: urlPeticionAjaxListadoFuncionalidades,
        contentType : "application/x-www-form-urlencoded; charset=UTF-8",
        data: data,
        headers: {'Authorization': token},
        }).done(res => {
          if (res.code != 'BUSQUEDA_FUNCIONALIDAD_CORRECTO') {
            reject(res);
          }
          resolve(res);
        }).fail( function( jqXHR ) {
          errorFailAjax(jqXHR.status);
        });
    });
  }
  
  /**Función para recuperar las funcionalidades eliminadas con ajax y promesas*/
  function buscarEliminadosAjaxPromesa(numeroPagina, tamanhoPagina){
    return new Promise(function(resolve, reject) {
      var token = getCookie('tokenUsuario');
  
      var data = {
        controlador : 'GestionFuncionalidades',
        action: 'searchDelete',
        inicio : calculaInicio(numeroPagina, tamanhoPaginaFuncionalidad),
        tamanhoPagina : tamanhoPaginaFuncionalidad
      }
      
      $.ajax({
        method: "POST",
        url: urlPeticionAjaxListadoFuncionalidadesEliminadas,
        contentType : "application/x-www-form-urlencoded; charset=UTF-8",
        data: data,
        headers: {'Authorization': token},
        }).done(res => {
          if (res.code != 'BUSQUEDA_FUNCIONALIDAD_ELIMINADA_CORRECTO') {
            reject(res);
          }
          resolve(res);
        }).fail( function( jqXHR ) {
          errorFailAjax(jqXHR.status);
        });
    });
  }
  
  /**Función para ver en detalle una funcionalidad con ajax y promesas*/
  function detalleFuncionalidadAjaxPromesa(){
    return new Promise(function(resolve, reject) {
      var token = getCookie('tokenUsuario');
      
      var data = {
        controlador : 'GestionFuncionalidades',
        action: 'searchByParameters',
        nombre_funcionalidad : $('#nombreFuncionalidad').val(),
        descripcion_uncionalidad : $('#descripFuncionalidad').val(),
        inicio : 0,
        tamanhoPagina : 1
      }
  
        $.ajax({
        method: "POST",
        url: urlPeticionAjaxListarFuncionalidad,
        contentType : "application/x-www-form-urlencoded; charset=UTF-8",
        data: data,
        headers: {'Authorization': token},
        }).done(res => {
          if (res.code != 'BUSQUEDA_FUNCIONALIDAD_CORRECTO') {
            reject(res);
          }
          resolve(res);
        }).fail( function( jqXHR ) {
          errorFailAjax(jqXHR.status);
        });
    });
  }
  
  
  /**Función para reactivar una funcionalidad con ajax y promesas*/
  function reactivarFuncionalidadesAjaxPromesa(){
    return new Promise(function(resolve, reject) {
      var token = getCookie('tokenUsuario');
      
      var data = {
        controlador : 'GestionFuncionalidades',
        action: 'reactivar',
        id_funcionalidad : $("input[name=idFuncionalidad]").val(),
        nombre_funcionalidad : $('#nombreFuncionalidad').val(),
        descrip_funcionalidad : $('#descripcionFuncionalidad').val(),
        borrado_funcionalidad : 0
      }

        $.ajax({
        method: "POST",
        url: urlPeticionAjaxReactivarFuncionalidad,
        contentType : "application/x-www-form-urlencoded; charset=UTF-8",
        data: data,
        headers: {'Authorization': token},
        }).done(res => {
          if (res.code != 'REACTIVAR_FUNCIONALIDAD_CORRECTO') {
            reject(res);
          }
          resolve(res);
        }).fail( function( jqXHR ) {
          errorFailAjax(jqXHR.status);
        });
    });
  }
  
  /* Función para obtener las funcionalidades del sistema */
  async function cargarFuncionalidades(numeroPagina, tamanhoPagina, paginadorCreado){
      await cargarFuncionalidadesAjaxPromesa(numeroPagina, tamanhoPagina)
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
             
        $("#datosFuncionalidad").html("");
        $("#checkboxColumnas").html("");
        $("#paginacion").html("");
              
        for (var i = 0; i < res.resource.listaBusquedas.length; i++){
            var tr = construyeFila('FUNCIONALIDAD', res.resource.listaBusquedas[i]);
            $("#datosFuncionalidad").append(tr);
        }
          
          var div = createHideShowColumnsWindow({FUNCIONALIDAD_DESCRIPTION_COLUMN:2});
            $("#checkboxColumnas").append(div);
            $("#paginacion").append(textPaginacion);
  
          if(paginadorCreado != 'PaginadorCreado'){
            paginador(totalResults, 'cargarFuncionalidades', 'FUNCIONALIDAD');
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
  
  /** Funcion añadir funcionalidad **/
  async function addFuncionalidad(){
    await anadirFuncionalidadAjaxPromesa()
    .then((res) => {
      
      $("#form-modal").modal('toggle');
      respuestaAjaxOK("FUNCIONALIDAD_GUARDADA_OK", res.code);
  
      let idElementoList = ["nombreFuncionalidad", "descripcionFuncionalidad"];
      resetearFormulario("formularioGenerico", idElementoList);
      document.getElementById("modal").style.display = "block";
      
      $('#nombreFuncionalidad').val(getCookie('nombreFuncionalidad'));
      $('#descripcionFuncionalidad').val(getCookie('descripFuncionalidad'));
      buscarFuncionalidad(getCookie('numeroPagina'), tamanhoPaginaFuncionalidad, 'buscarPaginacion', 'PaginadorNo');
      setLang(getCookie('lang'));
  
    }).catch((res) => {
        $("#form-modal").modal('toggle');
  
        respuestaAjaxKO(res.code);
  
        let idElementoList = ["nombreFuncionalidad", "descripcionFuncionalidad"];
        resetearFormulario("formularioGenerico", idElementoList);
  
        setLang(getCookie('lang'));
  
        document.getElementById("modal").style.display = "block";
    });
  }
  
  
  /** Funcion buscar funcionalidad **/
  async function buscarFuncionalidad(numeroPagina, tamanhoPagina, accion, paginadorCreado){
    await buscarFuncionalidadAjaxPromesa(numeroPagina, tamanhoPagina,accion)
    .then((res) => {
        cargarPermisosFuncFuncionalidad();
        if($('#form-modal').is(':visible')) {
           $("#form-modal").modal('toggle');
        };
        var datosBusquedas = [];
        datosBusquedas.push('nombre_funcionalidad: ' + res.resource.datosBusquedas['nombre_funcionalidad']);
        datosBusquedas.push('descripcion_funcionalidad: ' + res.resource.datosBusquedas['descripcion_funcionalidad']);
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
  
        $("#datosFuncionalidad").html("");
        $("#checkboxColumnas").html("");
        $("#paginacion").html("");
        for (var i = 0; i < res.resource.listaBusquedas.length; i++){
            var tr = construyeFila('FUNCIONALIDAD', res.resource.listaBusquedas[i]);
            $("#datosFuncionalidad").append(tr);
        }
        
        var div = createHideShowColumnsWindow({FUNCIONALIDAD_DESCRIPTION_COLUMN:2});
        
        $("#checkboxColumnas").append(div);
        $("#paginacion").append(textPaginacion);
  
        if(paginadorCreado != 'PaginadorCreado'){
            paginador(totalResults, 'buscarFuncionalidad', 'FUNCIONALIDAD');
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
        cargarPermisosFuncFuncionalidad();
        respuestaAjaxKO(res.code);
  
        let idElementoList = ["nombreFuncionalidad", "descripcionFuncionalidad"];
        resetearFormulario("formularioGenerico", idElementoList);
  
        setLang(getCookie('lang'));
  
        document.getElementById("modal").style.display = "block";
    });
  }
  
  /*Función que refresca la tabla por si hay algún cambio en BD */
  async function refrescarTabla(numeroPagina, tamanhoPagina){
    await cargarFuncionalidadesAjaxPromesa(numeroPagina, tamanhoPagina)
    .then((res) => {
        cargarPermisosFuncFuncionalidad();
        setCookie('nombre_funcionalidad', '');
        setCookie('descripcion_funcionalidad', '');
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
        document.getElementById('cabeceraEliminados').style.display == "none";
        
        $("#datosFuncionalidad").html("");
        $("#checkboxColumnas").html("");
        $("#paginacion").html("");
        for (var i = 0; i < res.resource.listaBusquedas.length; i++){
            var tr = construyeFila('FUNCIONALIDAD', res.resource.listaBusquedas[i]);
            $("#datosFuncionalidad").append(tr);
        }
        
        var div = createHideShowColumnsWindow({FUNCIONALIDAD_DESCRIPTION_COLUMN:2});
        $("#checkboxColumnas").append(div);
        $("#paginacion").append(textPaginacion);
  
        setCookie('nombre_funcionalidad', '');
        setCookie('descripcion_funcionalidad', '');
  
        paginador(totalResults, 'cargarFuncionalidades', 'FUNCIONALIDAD');
  
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
  
  /*Función que busca los eliminados de la tabla de rol*/
  async function buscarEliminados(numeroPagina, tamanhoPagina, paginadorCreado){
    await buscarEliminadosAjaxPromesa(numeroPagina, tamanhoPagina)
    .then((res) => {
        cargarPermisosFuncFuncionalidad();
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
  
        $("#datosFuncionalidad").html("");
        $("#checkboxColumnas").html("");
        $("#paginacion").html("");
          for (var i = 0; i < res.resource.listaBusquedas.length; i++){
            var tr = construyeFilaEliminados('FUNCIONALIDAD', res.resource.listaBusquedas[i]);
            $("#datosFuncionalidad").append(tr);
          }
        
        var div = createHideShowColumnsWindow({FUNCIONALIDAD_DESCRIPTION_COLUMN:2});
        $("#checkboxColumnas").append(div);
        $("#paginacion").append(textPaginacion);
  
        setCookie('nombreFuncionalidad', '');
        setCookie('descripFuncionalidad', '');
  
        if(paginadorCreado != 'PaginadorCreado'){
           paginador(totalResults, 'buscarEliminadosFuncionalidad', 'FUNCIONALIDAD');
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
  
  /** Función que visualiza una funcionalidad **/
  async function detalleFuncionalidad(){
    await detalleFuncionalidadAjaxPromesa()
    .then((res) => {
      $("#form-modal").modal('toggle');
  
      let idElementoList = ["nombreFuncionalidad", "descripcionFuncionalidad"];
      resetearFormulario("formularioGenerico", idElementoList);
      $('#nombreFuncionalidad').val(getCookie('nombreFuncionalidad'));
      $('#descripcionFuncionalidad').val(getCookie('descripFuncionalidad'));
      setLang(getCookie('lang'));
  
    }).catch((res) => {
        $("#form-modal").modal('toggle');
  
        respuestaAjaxKO(res.code);
  
        let idElementoList = ["nombreFuncionalidad", "descripcionFuncionalidad"];
        resetearFormulario("formularioGenerico", idElementoList);
        
        setLang(getCookie('lang'));
  
        document.getElementById("modal").style.display = "block";
    });
  }
  
  /** Función que edita un rol **/
  async function editFuncionalidad(){
    await editarFuncionalidadAjaxPromesa()
    .then((res) => {
      $("#form-modal").modal('toggle');
  
      respuestaAjaxOK("FUNCIONALIDAD_EDITADA_OK", res.code);
  
      let idElementoList = ["nombreFuncionalidad", "descripcionFuncionalidad"];
      resetearFormulario("formularioGenerico", idElementoList);
      document.getElementById("modal").style.display = "block";
      $('#nombreFuncionalidad').val(getCookie('nombreFuncionalidad'));
      $('#descripcionFuncionalidad').val(getCookie('descripFuncionalidad'));
      buscarFuncionalidad(getCookie('numeroPagina'), tamanhoPaginaFuncionalidad, 'buscarPaginacion', 'PaginadorCreado');
      setLang(getCookie('lang'));
  
    }).catch((res) => {
      $("#form-modal").modal('toggle');
  
       respuestaAjaxKO(res.code);
  
      let idElementoList = ["nombreFuncionalidad", "descripcionFuncionalidad"];
      resetearFormulario("formularioGenerico", idElementoList);
  
      setLang(getCookie('lang'));
  
      document.getElementById("modal").style.display = "block";
  
  
    });
  }
  
  /** Función que elimina una funcionalidad **/
  async function deleteFuncionalidad(){
    await eliminarFuncionalidadAjaxPromesa()
    .then((res) => {
      $("#form-modal").modal('toggle');
  
      respuestaAjaxOK("FUNCIONALIDAD_ELIMINADA_OK", res.code);
  
      let idElementoList = ["nombreFuncionalidad", "descripcionFuncionalidad"];
      resetearFormulario("formularioGenerico", idElementoList);
      document.getElementById("modal").style.display = "block";
     
      refrescarTabla(0, tamanhoPaginaFuncionalidad);
      setLang(getCookie('lang'));
  
    }).catch((res) => {
       
       $("#form-modal").modal('toggle');
        respuestaAjaxKO(res.code);
  
        let idElementoList = ["nombreFuncionalidad", "descripcionFuncionalidad"];
        resetearFormulario("formularioGenerico", idElementoList);
  
        setLang(getCookie('lang'));
  
        document.getElementById("modal").style.display = "block";
  
  
    });
  }
  
  /*Función que reactiva los eliminados de la tabla de funcionalidades*/
  async function reactivarFuncionalidad(){
    await reactivarFuncionalidadesAjaxPromesa()
    .then((res) => {
  
      cargarPermisosFuncFuncionalidad();
  
      $("#form-modal").modal('toggle');
  
      respuestaAjaxOK("FUNCIONALIDAD_REACTIVADA_OK", res.code);
      document.getElementById("modal").style.display = "block";
        
      buscarEliminados(0, tamanhoPaginaFuncionalidad, 'PaginadorNo');
      setLang(getCookie('lang'));
      
      }).catch((res) => {
        $("#form-modal").modal('toggle');
        respuestaAjaxKO(res.code);
        setLang(getCookie('lang'));
        document.getElementById("modal").style.display = "block";
    });
  }
  
  /** Funcion para mostrar el formulario para añadir una funcionalidad **/
  function showAddFuncionalidades() {
    cambiarFormulario('ADD_FUNCIONALIDAD', 'javascript:addFuncionalidad();', 'return comprobarAddFuncionalidad();');
    cambiarOnBlurCampos('return comprobarNombreFuncionalidad(\'nombreFuncionalidad\', \'errorFormatoNombreFuncionalidad\', \'nombreFuncionalidad\')', 
    'return comprobarDescripcionFuncionalidad(\'descripcionFuncionalidad\', \'errorFormatoDescripcionFuncionalidad\', \'descripcionFuncionalidad\')');
    cambiarIcono('images/add.png', 'ICONO_ADD', 'iconoAddFuncionalidad', 'Añadir');
  
    $('#subtitulo').attr('hidden', true);
    $('#labelFuncionalidadName').attr('hidden', true);
    $('#labelFuncionalidadDescription').attr('hidden', true);
  
    let campos = ["nombreFuncionalidad", "descripcionFuncionalidad"];
    let obligatorios = ["obligatorioFuncionalidadName", "obligatorioFuncionalidadDescription"];
    eliminarReadonly(campos);
    mostrarObligatorios(obligatorios);
    habilitaCampos(campos);
    setLang(getCookie('lang'));
  
  }
  
  /** Funcion para buscar una funcionalidad **/
  function showBuscarFuncionalidad() {
  
    cambiarFormulario('SEARCH_FUNCIONALIDAD', 'javascript:buscarFuncionalidad(0,' + tamanhoPaginaFuncionalidad + ', \'buscarModal\'' + ',\'PaginadorNo\');', 'return comprobarBuscarFuncionalidad();');
    cambiarOnBlurCampos('return comprobarNombreFuncionalidadSearch(\'nombreFuncionalidad\', \'errorFormatoNombreFuncionalidad\', \'nombreFuncionalidad\')', 
    'return comprobarDescripcionFuncionalidadSearch(\'descripcionFuncionalidad\', \'errorFormatoDescripcionFuncionalidad\', \'descripcionFuncionalidad\')');
    cambiarIcono('images/search.png', 'ICONO_SEARCH', 'iconoSearchFuncionalidad', 'Buscar');
  
    $('#subtitulo').attr('hidden', true);
    $('#labelFuncionalidadName').attr('hidden', true);
    $('#labelFuncionalidadDescription').attr('hidden', true);
  
    let campos = ["nombreFuncionalidad", "descripcionFuncionalidad"];
    let obligatorios = ["obligatorioFuncionalidadName", "obligatorioFuncionalidadDescription"];
    eliminarReadonly(campos);
    ocultarObligatorios(obligatorios);
    habilitaCampos(campos);
    setLang(getCookie('lang'));
  
  }
  
  /** Funcion para visualizar una funcionalidad **/
  function showDetalle(nombreFuncionalidad, descripFuncionalidad) {
  
      cambiarFormulario('DETAIL_FUNCIONALITY', 'javascript:detalleFuncionalidad();', '');
      cambiarIcono('images/close2.png', 'ICONO_CERRAR', 'iconoCerrar', 'Detalle');
  
      $('#labelFuncionalidadName').removeAttr('hidden');
      $('#labelFuncionalidadDescription').removeAttr('hidden');
      $('#subtitulo').attr('hidden', '');
  
      rellenarFormulario(nombreFuncionalidad, descripFuncionalidad);
  
      let campos = ["nombreFuncionalidad", "descripcionFuncionalidad"];
      let obligatorios = ["obligatorioFuncionalidadName", "obligatorioFuncionalidadDescription"];
      anadirReadonly(campos);
      ocultarObligatorios(obligatorios);
      deshabilitaCampos(campos);
      setLang(getCookie('lang'));
  
  }
  
  /** Funcion para editar una funcionalidad **/
  function showEditar(nombreFuncionalidad, descripFuncionalidad, idFuncionalidad) {
      cambiarFormulario('EDIT_FUNCIONALITY', 'javascript:editFuncionalidad();', 'return comprobarEditFuncionalidad();');
      cambiarOnBlurCampos('return comprobarNombreFuncionalidad(\'nombreFuncionalidad\', \'errorFormatoNombreFuncionalidad\', \'nombreFuncionalidad\')', 
        'return comprobarDescripcionFuncionalidad(\'descripcionFuncionalidad\', \'errorFormatoDescripcionFuncionalidad\', \'descripcionFuncionalidad\')');
      cambiarIcono('images/edit.png', 'ICONO_EDIT', 'iconoEditarFuncionalidad', 'Editar');
      
      $('#subtitulo').attr('hidden', true);
      $('#labelFuncionalidadName').attr('hidden', true);
      $('#labelFuncionalidadDescription').attr('hidden', true);
  
      rellenarFormulario(nombreFuncionalidad, descripFuncionalidad);
      insertacampo(document.formularioGenerico,'idFuncionalidad', idFuncionalidad);
  
      let campos = ["nombreFuncionalidad", "descripcionFuncionalidad"];
      let obligatorios = ["obligatorioFuncionalidadName", "obligatorioFuncionalidadDescription"];
      eliminarReadonly(campos);
      mostrarObligatorios(obligatorios);
      habilitaCampos(campos);
      deshabilitaCampos(["nombreFuncionalidad"]);
      anadirReadonly(["nombreFuncionalidad"]);
      setLang(getCookie('lang'));
  
  }
  
  /** Función para eliminar una funcionalidad **/
  function showEliminar(nombreFuncionalidad, descripFuncionalidad, idFuncionalidad) {
    
     cambiarFormulario('DELETE_FUNCIONALITY', 'javascript:deleteFuncionalidad();', '');
      cambiarIcono('images/delete.png', 'ICONO_ELIMINAR', 'iconoEliminar', 'Eliminar');
  
      $('#labelFuncionalidadName').removeAttr('hidden');
      $('#labelFuncionalidadDescription').removeAttr('hidden');
      $('#subtitulo').removeAttr('class');
      $('#subtitulo').empty();
      $('#subtitulo').attr('class', 'SEGURO_ELIMINAR_FUNC');
      $('#subtitulo').attr('hidden', false);
      
  
      rellenarFormulario(nombreFuncionalidad, descripFuncionalidad);
      insertacampo(document.formularioGenerico,'idFuncionalidad', idFuncionalidad);
  
      let campos = ["nombreFuncionalidad", "descripcionFuncionalidad"];
      let obligatorios = ["obligatorioFuncionalidadName", "obligatorioFuncionalidadDescription"];
      anadirReadonly(campos);
      ocultarObligatorios(obligatorios);
      deshabilitaCampos(campos);
      setLang(getCookie('lang'));
  
  }
  
  /** Función para reactivar una funcionalidad **/
  function showReactivar(nombreFuncionalidad, descripFuncionalidad , idFuncionalidad) {
  
      cambiarFormulario('REACTIVATE_FUNC', 'javascript:reactivarFuncionalidad();', '');
      cambiarIcono('images/reactivar2.png', 'ICONO_REACTIVAR', 'iconoReactivar', 'Reactivar');
  
      $('#labelFuncionalidadName').removeAttr('hidden');
      $('#labelFuncionalidadDescription').removeAttr('hidden');
      $('#subtitulo').removeAttr('class');
      $('#subtitulo').empty();
      $('#subtitulo').attr('class', 'SEGURO_REACTIVAR_FUNC');
       $('#subtitulo').attr('hidden', false);
      
  
      rellenarFormulario(nombreFuncionalidad, descripFuncionalidad);
      insertacampo(document.formularioGenerico,'idFuncionalidad', idFuncionalidad);
  
      let campos = ["nombreFuncionalidad", "descripcionFuncionalidad"];
      let obligatorios = ["obligatorioFuncionalidadName", "obligatorioFuncionalidadDescription"];
      anadirReadonly(campos);
      ocultarObligatorios(obligatorios);
      deshabilitaCampos(campos);
      setLang(getCookie('lang'));
  
  }
  
  /**Función para cambiar onBlur de los campos*/
  function cambiarOnBlurCampos(onBlurNombreFuncionalidad, onBlurDescripcionFuncionalidad) {
      
      if (onBlurNombreFuncionalidad != ''){
          $("#nombreFuncionalidad").attr('onblur', onBlurNombreFuncionalidad);
      }
  
      if (onBlurDescripcionFuncionalidad != ''){
          $("#descripcionFuncionalidad").attr('onblur', onBlurDescripcionFuncionalidad);
      }
  }
  
  /**Función que rellenado los datos del formulario*/
  function rellenarFormulario(nombreFuncionalidad, descripFuncionalidad) {
  
      $("#nombreFuncionalidad").val(nombreFuncionalidad);
      $("#descripcionFuncionalidad").val(descripFuncionalidad); 
  
  }
  
  /** Función para gestionar los iconos dependiendo de los permisos de los usuarios **/
  function gestionarPermisosFuncionalidad(idElementoList) {
    document.getElementById('cabecera').style.display = "none";
    document.getElementById('tablaDatos').style.display = "none";
    document.getElementById('filasTabla').style.display = "none";
    $('#itemPaginacion').attr('hidden', true);
  
    idElementoList.forEach( function (idElemento) {
      switch(idElemento.nombre_accion){
        case "Añadir":
          $('#btnAddFuncionalidad').attr('src', 'images/add3.png');
          $('#btnAddFuncionalidad').css("cursor", "pointer");
          $('#divAddFuncionalidad').attr("data-toggle", "modal");
          $('#divAddFuncionalidad').attr("data-target", "#form-modal");
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
          $('#btnListarFuncionalidades').attr('src', 'images/search3.png');
          $('#btnSearchDelete').attr('src', 'images/searchDelete3.png');
          $('#btnListarFuncionalidades').css("cursor", "pointer");
          $('.iconoSearchDelete').css("cursor", "pointer");
          $('#divSearchDelete').attr("onclick", "javascript:buscarEliminados(0,\'tamanhoPaginaFuncionalidad\', \'PaginadorNo\')");
          $('#divListarFuncionalidades').attr("data-toggle", "modal");
          $('#divListarFuncionalidades').attr("data-target", "#form-modal");
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
      
      let idElementoErrorList = ["errorFormatoNombreFuncionalidad", "errorFormatoDescripcionFuncionalidad"];
      
      let idElementoList = ["nombreFuncionalidad", "descripcionFuncionalidad"];
  
      limpiarFormulario(idElementoList);
      eliminarMensajesValidacionError(idElementoErrorList, idElementoList);
      setLang(getCookie('lang'));
    });
  
  });