/** Función para añadir acciones con ajax y promesas **/
function anadirAccionAjaxPromesa(){
    return new Promise(function(resolve, reject) {
      var token = getCookie('tokenUsuario');
  
      var accionEntity = {
        controlador : 'GestionAcciones',
        action: 'add',
        nombre_accion : $("#nombreAccion").val(),
        descripcion_accion : $("#descripcionAccion").val(),
        borrado_accion : 0
      }
    
      $.ajax({
        method: "POST",
        url: urlPeticionAjaxAccionGuardar,
        contentType : "application/x-www-form-urlencoded; charset=UTF-8",
        data: accionEntity,  
        headers: {'Authorization': token},
        }).done(res => {
          if (res.code != 'ADD_ACCION_COMPLETO') {
            reject(res);
          }
          resolve(res);
        }).fail( function( jqXHR ) {
          errorFailAjax(jqXHR.status);
        });
    });
  }
  
  /** Función para buscar acciones con ajax y promesas **/
  function buscarAccionAjaxPromesa(numeroPagina, tamanhoPaginaAccion, accion){
    return new Promise(function(resolve, reject) {
      var token = getCookie('tokenUsuario');
  
      if(accion == "buscarModal"){
        var data = {
          controlador : 'GestionAcciones',
          action: 'searchByParameters',
          nombre_accion : $("#nombreAccion").val(),
          descripcion_accion : $("#descripcionAccion").val(),
          inicio : calculaInicio(numeroPagina, tamanhoPaginaAccion),
          tamanhoPagina : tamanhoPaginaAccion
        }
      }
  
      if(accion == "buscarPaginacion"){
         if(getCookie('nombre_accion') == null || getCookie('nombre_accion') == ""){
          var nombreAcc = "";
        }else{
          var nombreAcc = getCookie('nombre_accion');
        }
  
        if(getCookie('descripcion_accion') == null || getCookie('descripcion_accion') == ""){
          var descripAcc = "";
        }else{
          var descripAcc = getCookie('descripcion_accion');
        }
  
        var data = {
          controlador : 'GestionAcciones',
          action: 'searchByParameters',
          nombre_accion : nombreAcc,
          descripcion_accion : descripAcc,
          inicio : calculaInicio(numeroPagina, tamanhoPaginaAccion),
          tamanhoPagina : tamanhoPaginaAccion 
        }
      }
      
      $.ajax({
        method: "POST",
        url: urlPeticionAjaxListarAccion,
        contentType : "application/x-www-form-urlencoded; charset=UTF-8",
        data: data,
        headers: {'Authorization': token},
        }).done(res => {
          if (res.code != 'BUSQUEDA_ACCION_CORRECTO') {
            reject(res);
          }
          resolve(res);
        }).fail( function( jqXHR ) {
          errorFailAjax(jqXHR.status);
        });
    });
  }
  
  /** Función para recuperar los permisos de un usuario sobre la funcionalidad **/
  function cargarPermisosFuncAccionAjaxPromesa(){
    return new Promise(function(resolve, reject) {
      var nombreUsuario = getCookie('usuario');
      var token = getCookie('tokenUsuario');
      
      var usuario = nombreUsuario;
    
      var data = {
        controlador : 'GestionACL',
        action: 'searchAccionesPorFuncionalidadUsuario',
        usuario : usuario,
        nombre_funcionalidad : 'Gestión de acciones'
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
  
  /**Función para eliminar una accion con ajax y promesas*/
  function eliminarAccionAjaxPromesa(){
    return new Promise(function(resolve, reject) {
      var token = getCookie('tokenUsuario');
  
      var accionEntity = {
        controlador : 'GestionAcciones',
        action: 'delete',
        id_accion : $("input[name=idAccion]").val(),
        nombre_accion : $("#nombreAccion").val(),
        descripcion_accion : $("#descripcionAccion").val(),
        borrado_accion : 1
      }

        $.ajax({
        method: "POST",
        url: urlPeticionAjaxDeleteAccion,
        contentType : "application/x-www-form-urlencoded; charset=UTF-8",
        data: accionEntity,  
        headers: {'Authorization': token},
        }).done(res => {
          if (res.code != 'DELETE_ACCION_COMPLETO') {
            reject(res);
          }
          resolve(res);
        }).fail( function( jqXHR ) {
          errorFailAjax(jqXHR.status);
        });
    });
  }
  
  /** Función para editar una accion con ajax y promesa **/
  function editarAccionAjaxPromesa(){
    return new Promise(function(resolve, reject) {
      var token = getCookie('tokenUsuario');
  
      var accionEntity = {
        controlador : 'GestionAcciones',
        action: 'edit',
        id_accion : $("input[name=idAccion]").val(),
        nombre_accion : $("#nombreAccion").val(),
        descripcion_accion : $("#descripcionAccion").val(),
        borrado_accion : 0
      }
  
        $.ajax({
        method: "POST",
        url: urlPeticionAjaxEditAccion,
        contentType : "application/x-www-form-urlencoded; charset=UTF-8",
        data: accionEntity,  
        headers: {'Authorization': token},
        }).done(res => {
          if (res.code != 'EDIT_ACCION_COMPLETO') {
            reject(res);
          }
          resolve(res);
        }).fail( function( jqXHR ) {
          errorFailAjax(jqXHR.status);
        });
    });
  }
  
  /*Función que comprueba los permisos del usuario sobre la accion*/
  async function cargarPermisosFuncAccion(){
    await cargarPermisosFuncAccionAjaxPromesa()
    .then((res) => {
      gestionarPermisosAccion(res.resource);
    }).catch((res) => {
        respuestaAjaxKO(res.code);
        setLang(getCookie('lang'));
        document.getElementById("modal").style.display = "block";
    });
  }
  
  
  /** Función para recuperar las acciones con ajax y promesas **/
  function cargarAccionesAjaxPromesa(numeroPagina, tamanhoPagina){
    return new Promise(function(resolve, reject) {
        var token = getCookie('tokenUsuario');
  
      var data = {
        controlador : 'GestionAcciones',
        action: 'search',
        inicio : calculaInicio(numeroPagina, tamanhoPaginaAccion),
        tamanhoPagina : tamanhoPaginaAccion
      }
      
      $.ajax({
        method: "POST",
        url: urlPeticionAjaxListadoAcciones,
        contentType : "application/x-www-form-urlencoded; charset=UTF-8",
        data: data,  
        headers: {'Authorization': token},
        }).done(res => {
          if (res.code != 'BUSQUEDA_ACCION_CORRECTO') {
            reject(res);
          }
          resolve(res);
        }).fail( function( jqXHR ) {
          errorFailAjax(jqXHR.status);
        });
    });
  }
  
  /**Función para recuperar las acciones eliminadas con ajax y promesas*/
  function buscarEliminadosAjaxPromesa(numeroPagina, tamanhoPagina){
    return new Promise(function(resolve, reject) {
      var token = getCookie('tokenUsuario');
  
      var data = {
        controlador : 'GestionAcciones',
        action: 'searchDelete',
        inicio : calculaInicio(numeroPagina, tamanhoPaginaAccion),
        tamanhoPagina : tamanhoPaginaAccion
      }
      
      $.ajax({
        method: "POST",
        url: urlPeticionAjaxListadoAccionesEliminadas,
        contentType : "application/x-www-form-urlencoded; charset=UTF-8",
        data: data, 
        headers: {'Authorization': token},
        }).done(res => {
          if (res.code != 'BUSQUEDA_ACCIONES_ELIMINADAS_CORRECTO') {
            reject(res);
          }
          resolve(res);
        }).fail( function( jqXHR ) {
          errorFailAjax(jqXHR.status);
        });
    });
  }
  
  /**Función para ver en detalle una accion con ajax y promesas*/
  function detalleAccionAjaxPromesa(){
    return new Promise(function(resolve, reject) {
      var token = getCookie('tokenUsuario');
      
      var data = {
        controlador :'GestionAcciones',
        action : 'searchByParameters',
        nombre_accion : $('#nombreAccion').val(),
        descripcion_accion : $('#descripAccion').val(),
        inicio : 0,
        tamanhoPagina : tamanhoPaginaAccion
      }
  
        $.ajax({
        method: "POST",
        url: urlPeticionAjaxListarAccion,
        contentType : "application/x-www-form-urlencoded; charset=UTF-8",
        data: data,  
        headers: {'Authorization': token},
        }).done(res => {
          if (res.code != 'BUSQUEDA_ACCION_CORRECTO') {
            reject(res);
          }
          resolve(res);
        }).fail( function( jqXHR ) {
          errorFailAjax(jqXHR.status);
        });
    });
  }
  
  
  /**Función para reactivar una acción con ajax y promesas*/
  function reactivarAccionesAjaxPromesa(){
    return new Promise(function(resolve, reject) {
      var token = getCookie('tokenUsuario');
      
      var accionEntity = {
        controlador : 'GestionAcciones',
        action: 'reactivar',
        id_accion : $("input[name=idAccion]").val(),
        nombre_accion : $('#nombreAccion').val(),
        descripcion_accion : $('#descripcionAccion').val(),
        borrado_accion : 0
      }
  
        $.ajax({
        method: "POST",
        url: urlPeticionAjaxReactivarAccion,
        contentType : "application/x-www-form-urlencoded; charset=UTF-8",
        data: accionEntity,  
        headers: {'Authorization': token},
        }).done(res => {
          if (res.code != 'REACTIVAR_ACCION_CORRECTO') {
            reject(res);
          }
          resolve(res);
        }).fail( function( jqXHR ) {
          errorFailAjax(jqXHR.status);
        });
    });
  }
  
  /** Función para cargar las funcionalidades de BD ***/
  function cargarFuncionalidadesAjaxPromesa(){
    return new Promise(function(resolve, reject) {
      var token = getCookie('tokenUsuario');
  
        var data = {
            controlador : 'GestionFuncionalidades',
            action : 'searchAllSinP'
        }

        $.ajax({
        method: "POST",
        url: urlPeticionAjaxListadoFuncionalidadesSinP,
        contentType : "application/x-www-form-urlencoded; charset=UTF-8",
        data : data,
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
  
  /* Función para obtener las acciones del sistema */
  async function cargarAcciones(numeroPagina, tamanhoPagina, paginadorCreado){
      await cargarAccionesAjaxPromesa(numeroPagina, tamanhoPagina)
        .then((res) => {
            $('#tablaDatos').removeAttr('hidden');
            $('#permisos').css('display', 'none');
            $('#paginacion').attr('hidden', false);
            var numResults = res.resource.numResultados + '';
            var totalResults = res.resource.tamanhoTotal + '';
            var textPaginacion = parseInt(res.resource.inicio)+1 + " - " + (parseInt(res.resource.inicio)+parseInt(numResults))  + " total " + totalResults;
  
        if(res.resource.listaBusquedas.length == 0){
          $('#itemPaginacion').attr('hidden',true);
        }else{
          $('#itemPaginacion').attr('hidden',false);
        }
             
            $("#datosAccion").html("");
            $("#checkboxColumnas").html("");
            $("#paginacion").html("");
              
            for (var i = 0; i < res.resource.listaBusquedas.length; i++){
                  var tr = construyeFila('ACCION', res.resource.listaBusquedas[i]);
                  $("#datosAccion").append(tr);
              }
          
            var div = createHideShowColumnsWindow({ACCION_DESCRIPTION_COLUMN:2});
            $("#checkboxColumnas").append(div);
            $("#paginacion").append(textPaginacion);
  
          if(paginadorCreado != 'PaginadorCreado'){
              paginador(totalResults, 'cargarAcciones', 'ACCION');
          }
  
          if(numeroPagina == 0){
            $('#' + (numeroPagina+1)).addClass("active");
            var numPagCookie =  numeroPagina + 1;
          }else{
            $('#' + numeroPagina).addClass("active");
            var numPagCookie =  numeroPagina;
          }
        
          setCookie('numeroPagina', numPagCookie);
          setLang(getCookie('lang'));
  
          }).catch((res) => {
                respuestaAjaxKO(res.code);
                document.getElementById("modal").style.display = "block";
                setLang(getCookie('lang'));
          });
  }
  
  /** Funcion añadir accion **/
  async function addAccion(){
    await anadirAccionAjaxPromesa()
    .then((res) => {
      
      $("#form-modal").modal('toggle');
      respuestaAjaxOK("ACCION_GUARDADA_OK", res.code);
  
      let idElementoList = ["nombreAccion", "descripcionAccion"];
      resetearFormulario("formularioGenerico", idElementoList);
      document.getElementById("modal").style.display = "block";
      
      $('#nombreAccion').val(getCookie('nombreAccion'));
      $('#descripcionAccion').val(getCookie('descripAccion'));
      buscarAccion(getCookie('numeroPagina'), tamanhoPaginaAccion, 'buscarPaginacion', 'PaginadorNo');
      setLang(getCookie('lang'));
  
    }).catch((res) => {
        $("#form-modal").modal('toggle');
  
        respuestaAjaxKO(res.code);
  
        let idElementoList = ["nombreAccion", "descripcionAccion"];
        resetearFormulario("formularioGenerico", idElementoList);
  
        setLang(getCookie('lang'));
  
        document.getElementById("modal").style.display = "block";
    });
  }
  
  
  /** Funcion buscar accion **/
  async function buscarAccion(numeroPagina, tamanhoPagina, accion, paginadorCreado){
    await buscarAccionAjaxPromesa(numeroPagina, tamanhoPagina,accion)
    .then((res) => {
        cargarPermisosFuncAccion();
        if($('#form-modal').is(':visible')) {
           $("#form-modal").modal('toggle');
        };
        var datosBusquedas = [];
        datosBusquedas.push('nombre_accion: ' + res.resource.datosBusquedas['nombre_accion']);
        datosBusquedas.push('descripcion_accion: ' + res.resource.datosBusquedas['descripcion_accion']);
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
  
        $("#datosAccion").html("");
        $("#checkboxColumnas").html("");
        $("#paginacion").html("");
          for (var i = 0; i < res.resource.listaBusquedas.length; i++){
            var tr = construyeFila('ACCION', res.resource.listaBusquedas[i]);
            $("#datosAccion").append(tr);
          }
        
        var div = createHideShowColumnsWindow({ACCION_DESCRIPTION_COLUMN:2});
        
        $("#checkboxColumnas").append(div);
        $("#paginacion").append(textPaginacion);
  
        if(paginadorCreado != 'PaginadorCreado'){
          paginador(totalResults, 'buscarAccion', 'ACCION');
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
        cargarPermisosFuncAccion();
        respuestaAjaxKO(res.code);
  
        let idElementoList = ["nombreAccion", "descripcionAccion"];
        resetearFormulario("formularioGenerico", idElementoList);
  
        setLang(getCookie('lang'));
  
        document.getElementById("modal").style.display = "block";
    });
  }
  
  /*Función que refresca la tabla por si hay algún cambio en BD */
  async function refrescarTabla(numeroPagina, tamanhoPagina){
    await cargarAccionesAjaxPromesa(numeroPagina, tamanhoPagina)
    .then((res) => {
        $('#tablaDatos').removeAttr('hidden');
        $('#permisos').css('display', 'none');
        $('#paginacion').attr('hidden', false);
        cargarPermisosFuncAccion();
        setCookie('nombreAccion', '');
        setCookie('descripcionAccion', '');
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
        
        $("#datosAccion").html("");
        $("#checkboxColumnas").html("");
        $("#paginacion").html("");
          for (var i = 0; i < res.resource.listaBusquedas.length; i++){
            var tr = construyeFila('ACCION', res.resource.listaBusquedas[i]);
            $("#datosAccion").append(tr);
          }
        
        var div = createHideShowColumnsWindow({ACCION_DESCRIPTION_COLUMN:2});
        $("#checkboxColumnas").append(div);
        $("#paginacion").append(textPaginacion);
  
        setCookie('nombre_accion', '');
        setCookie('descripcion_accion', '');
  
        paginador(totalResults, 'cargarAcciones', 'ACCION');
  
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
        cargarPermisosFuncAccion();
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
       
      
        $("#datosAccion").html("");
        $("#checkboxColumnas").html("");
        $("#paginacion").html("");
          for (var i = 0; i < res.resource.listaBusquedas.length; i++){
            var tr = construyeFilaEliminados('ACCION', res.resource.listaBusquedas[i]);
            $("#datosAccion").append(tr);
          }
  
          if(res.resource.listaBusquedas.length == 0){
            document.getElementById('cabecera').style.display = "none";
            document.getElementById('cabeceraEliminados').style.display = "block";
          }
        
        var div = createHideShowColumnsWindow({ACCION_DESCRIPTION_COLUMN:2});
        $("#checkboxColumnas").append(div);
        $("#paginacion").append(textPaginacion);
  
        setCookie('nombre_accion', '');
        setCookie('descripcion_accion', '');
  
        if(paginadorCreado != 'PaginadorCreado'){
          paginador(totalResults, 'buscarEliminadosAccion', 'ACCION');
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
  
  /** Función que visualiza una accion **/
  async function detalleAccion(){
    await detalleAccionAjaxPromesa()
    .then((res) => {
      $("#form-modal").modal('toggle');
      let idElementoList = ["nombreAccion", "descripcionAccion"];
      resetearFormulario("formularioGenerico", idElementoList);
      $('#nombreAccion').val(getCookie('nombre_accion'));
      $('#descripcionAccion').val(getCookie('descripcion_accion'));
  
      setLang(getCookie('lang'));
  
    }).catch((res) => {
        $("#form-modal").modal('toggle');
  
        respuestaAjaxKO(res.code);
  
        let idElementoList = ["nombreAccion", "descripcionAccion"];
        resetearFormulario("formularioGenerico", idElementoList);
        
        setLang(getCookie('lang'));
  
        document.getElementById("modal").style.display = "block";
    });
  }
  
  /** Función que edita una accion **/
  async function editAccion(){
    await editarAccionAjaxPromesa()
    .then((res) => {
      $("#form-modal").modal('toggle');
  
      respuestaAjaxOK("ACCION_EDITADA_OK", res.code);
  
      let idElementoList = ["nombreAccion", "descripcionAccion"];
      resetearFormulario("formularioGenerico", idElementoList);
  
      document.getElementById("modal").style.display = "block";
      $('#nombreAccion').val(getCookie('nombreAccion'));
      $('#descripcionAccion').val(getCookie('descripAccion'));
      buscarAccion(getCookie('numeroPagina'), tamanhoPaginaAccion, 'buscarPaginacion', 'PaginadorCreado');
  
      setLang(getCookie('lang'));
  
    }).catch((res) => {
      $("#form-modal").modal('toggle');
  
      respuestaAjaxKO(res.code);
  
      let idElementoList = ["nombreAccion", "descripcionAccion"];
      resetearFormulario("formularioGenerico", idElementoList);
  
      setLang(getCookie('lang'));
  
      document.getElementById("modal").style.display = "block";
  
  
    });
  }
  
  /** Función que elimina una accion **/
  async function deleteAccion(){
    await eliminarAccionAjaxPromesa()
    .then((res) => {
      $("#form-modal").modal('toggle');
  
      respuestaAjaxOK("ACCION_ELIMINADA_OK", res.code);
  
      let idElementoList = ["nombreAccion", "descripcionAccion"];
      resetearFormulario("formularioGenerico", idElementoList);
      document.getElementById("modal").style.display = "block";
     
      refrescarTabla(0, tamanhoPaginaAccion);
  
      setLang(getCookie('lang'));
  
    }).catch((res) => {
       
       $("#form-modal").modal('toggle');
        respuestaAjaxKO(res.code);
  
        let idElementoList = ["nombreAccion", "descripcionAccion"];
        resetearFormulario("formularioGenerico", idElementoList);
  
        setLang(getCookie('lang'));
  
        document.getElementById("modal").style.display = "block";
  
  
    });
  }
  
  /*Función que reactiva los eliminados de la tabla de acciones*/
  async function reactivarAccion(){
    await reactivarAccionesAjaxPromesa()
    .then((res) => {
  
      cargarPermisosFuncAccion();
  
      $("#form-modal").modal('toggle');
  
      respuestaAjaxOK("ACCION_REACTIVADA_OK", res.code);
  
      document.getElementById("modal").style.display = "block";
        
      buscarEliminados(0, tamanhoPaginaAccion, 'PaginadorNo');
      setLang(getCookie('lang'));
      
      }).catch((res) => {
        $("#form-modal").modal('toggle');
        respuestaAjaxKO(res.code);
        setLang(getCookie('lang'));
        document.getElementById("modal").style.display = "block";
    });
  }
  
  /** Funcion para mostrar el formulario para añadir una acción **/
  function showAddAcciones() {
    cambiarFormulario('ADD_ACCION', 'javascript:addAccion();', 'return comprobarAddAccion();');
    cambiarOnBlurCampos('return comprobarNombreAccion(\'nombreAccion\', \'errorFormatoNombreAccion\', \'nombreAccion\')', 
    'return comprobarDescripcionAccion(\'descripcionAccion\', \'errorFormatoDescripcionAccion\', \'descripcionAccion\')');
    cambiarIcono('images/add.png', 'ICONO_ADD', 'iconoAddAccion', 'Añadir');
  
    $('#subtitulo').attr('hidden', true);
    $('#labelAccionName').attr('hidden', true);
    $('#labelAccionDescription').attr('hidden', true);
  
    let campos = ["nombreAccion", "descripcionAccion"];
    let obligatorios = ["obligatorioAccionName", "obligatorioAccionDescription"];
    eliminarReadonly(campos);
    mostrarObligatorios(obligatorios);
    habilitaCampos(campos);
    setLang(getCookie('lang'));
  
  }
  
  /** Funcion para buscar una accion **/
  function showBuscarAccion() {
  
    cambiarFormulario('SEARCH_ACCION', 'javascript:buscarAccion(0,' + tamanhoPaginaAccion + ', \'buscarModal\'' + ', \'PaginadorNo\');', 'return comprobarBuscarAccion();');
    cambiarOnBlurCampos('return comprobarNombreAccionSearch(\'nombreAccion\', \'errorFormatoNombreAccion\', \'nombreAccion\')', 
    'return comprobarDescripcionAccionSearch(\'descripcionAccion\', \'errorFormatoDescripcionAccion\', \'descripcionAccion\')');
    cambiarIcono('images/search.png', 'ICONO_SEARCH', 'iconoSearchAccion', 'Buscar');
  
    $('#subtitulo').attr('hidden', true);
    $('#labelAccionName').attr('hidden', true);
    $('#labelAccionDescription').attr('hidden', true);
  
    let campos = ["nombreAccion", "descripcionAccion"];
    let obligatorios = ["obligatorioAccionName", "obligatorioAccionDescription"];
    eliminarReadonly(campos);
    ocultarObligatorios(obligatorios);
    habilitaCampos(campos);
    setLang(getCookie('lang'));
  
  }
  
  /** Funcion para visualizar una accion **/
  function showDetalle(nombreAccion, descripAccion) {
      cambiarFormulario('DETAIL_ACTION', 'javascript:detalleAccion();', '');
      cambiarIcono('images/close2.png', 'ICONO_CERRAR', 'iconoCerrar', 'Detalle');
      
      $('#labelAccionName').removeAttr('hidden');
      $('#labelAccionDescription').removeAttr('hidden');
      $('#subtitulo').attr('hidden', '');
  
      rellenarFormulario(nombreAccion, descripAccion);
  
      let campos = ["nombreAccion", "descripcionAccion"];
      let obligatorios = ["obligatorioAccionName", "obligatorioAccionDescription"];
      anadirReadonly(campos);
      ocultarObligatorios(obligatorios);
      deshabilitaCampos(campos);
  
      setLang(getCookie('lang'));
  
  }
  
  /** Funcion para editar una accion **/
  function showEditar(nombreAccion, descripAccion, idAccion) {
      cambiarFormulario('EDIT_ACCION', 'javascript:editAccion();', 'return comprobarEditAccion();');
      cambiarOnBlurCampos('return comprobarNombreAccion(\'nombreAccion\', \'errorFormatoNombreAccion\', \'nombreAccion\')', 
        'return comprobarDescripcionAccion(\'descripcionAccion\', \'errorFormatoDescripcionAccion\', \'descripcionAccion\')');
      cambiarIcono('images/edit.png', 'ICONO_EDIT', 'iconoEditarAccion', 'Editar');
  
      $('#subtitulo').attr('hidden', true);
      $('#labelAccionName').attr('hidden', true);
      $('#labelAccionDescription').attr('hidden', true);
  
      rellenarFormulario(nombreAccion, descripAccion);
      insertacampo(document.formularioGenerico,'idAccion', idAccion);
  
      let campos = ["nombreAccion", "descripcionAccion"];
      let obligatorios = ["obligatorioAccionName", "obligatorioAccionDescription"];
      eliminarReadonly(campos);
      mostrarObligatorios(obligatorios);
      habilitaCampos(campos);
      deshabilitaCampos(["nombreAccion"]);
      anadirReadonly(["nombreAccion"]);
  
      setLang(getCookie('lang'));
  }
  
  /** Función para eliminar una accion **/
  function showEliminar(nombreAccion, descripAccion, idAccion) {
  
      cambiarFormulario('DELETE_ACCION', 'javascript:deleteAccion();', '');
      cambiarIcono('images/delete.png', 'ICONO_ELIMINAR', 'iconoEliminar', 'Eliminar');
      
      $('#labelAccionName').removeAttr('hidden');
      $('#labelAccionDescription').removeAttr('hidden');
      $('#subtitulo').removeAttr('class');
      $('#subtitulo').empty();
      $('#subtitulo').attr('class', 'SEGURO_ELIMINAR_ACCION');
      $('#subtitulo').attr('hidden', false);
      
  
      rellenarFormulario(nombreAccion, descripAccion);
      insertacampo(document.formularioGenerico,'idAccion', idAccion);
  
      let campos = ["nombreAccion", "descripcionAccion"];
      let obligatorios = ["obligatorioAccionName", "obligatorioAccionDescription"];
      eliminarReadonly(campos);
      ocultarObligatorios(obligatorios);
      deshabilitaCampos(campos);
  
      setLang(getCookie('lang'));
  
  }
  
  /** Función para reactivar una accion **/
  function showReactivar(nombreAccion, descripAccion , idAccion) {
  
      cambiarFormulario('REACTIVATE_ACCION', 'javascript:reactivarAccion();', '');
      cambiarIcono('images/reactivar2.png', 'ICONO_REACTIVAR', 'iconoReactivar', 'Reactivar');
  
      $('#labelAccionName').removeAttr('hidden');
      $('#labelAccionDescription').removeAttr('hidden');
      $('#subtitulo').removeAttr('class');
      $('#subtitulo').empty();
      $('#subtitulo').attr('class', 'SEGURO_REACTIVAR_ACCION');
      $('#subtitulo').attr('hidden', false);
      
  
      rellenarFormulario(nombreAccion, descripAccion);
      insertacampo(document.formularioGenerico,'idAccion', idAccion);
  
      let campos = ["nombreAccion", "descripcionAccion"];
      let obligatorios = ["obligatorioAccionName", "obligatorioAccionDescription"];
      anadirReadonly(campos);
      ocultarObligatorios(obligatorios);
      deshabilitaCampos(campos);
      setLang(getCookie('lang'));
  
  }
  
  /**Función para cambiar onBlur de los campos*/
  function cambiarOnBlurCampos(onBlurNombreAccion, onBlurDescripcionAccion) {
      
      if (onBlurNombreAccion != ''){
          $("#nombreAccion").attr('onblur', onBlurNombreAccion);
      }
  
      if (onBlurDescripcionAccion != ''){
          $("#descripcionAccion").attr('onblur', onBlurDescripcionAccion);
      }
  }
  
  /**Función que rellenado los datos del formulario*/
  function rellenarFormulario(nombreAccion, descripAccion) {
  
      $("#nombreAccion").val(nombreAccion);
      $("#descripcionAccion").val(descripAccion); 
  
  }
  
  /** Función para gestionar los iconos dependiendo de los permisos de los usuarios **/
  function gestionarPermisosAccion(idElementoList) {
    if(getCookie('rolUsuario') == "Administrador"){
      $('#btnPermisos').removeAttr('hidden');
    }else{
      $('#btnPermisos').attr('hidden', true);
    }
  
    document.getElementById('cabecera').style.display = "none";
    document.getElementById('tablaDatos').style.display = "none";
    document.getElementById('filasTabla').style.display = "none";
    $('#itemPaginacion').attr('hidden', true);
    
    idElementoList.forEach( function (idElemento) {
      switch(idElemento.nombre_accion){
        case "Añadir":
          $('#btnAddAccion').attr('src', 'images/add3.png');
          $('#btnAddAccion').css("cursor", "pointer");
          $('#divAddAccion').attr("data-toggle", "modal");
          $('#divAddAccion').attr("data-target", "#form-modal");
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
          $('#btnListarAcciones').attr('src', 'images/search3.png');
          $('#btnSearchDelete').attr('src', 'images/searchDelete3.png');
          $('#btnListarAcciones').css("cursor", "pointer");
          $('.iconoSearchDelete').css("cursor", "pointer");
          $('#divSearchDelete').attr("onclick", "javascript:buscarEliminados(0,\'tamanhoPaginaAccion\')");
          $('#divListarAcciones').attr("data-toggle", "modal");
          $('#divListarAcciones').attr("data-target", "#form-modal");
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
  
          if(document.getElementById('permisos').style.display == "block"){
             document.getElementById('cabeceraEliminados').style.display = "block";
             $('#itemPaginacion').attr('hidden', true);
            
  
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
  
  async function permisosUsuarios(){
    await cargarFuncionalidadesAjaxPromesa()
    .then((res) => {
        document.getElementById('cabeceraEliminados').style.display = "block";
        cargarTablaPermisos(res.resource.listaBusquedas);
        var cardAbierta = getCookie('cardPermiso');
        if(cardAbierta != null && cardAbierta != ""){
            $('#collapseGest' + cardAbierta).addClass('show');
            cargarInfoPermiso(getCookie('nomFuncPermisos'));
        }
        setLang(getCookie('lang'));
      }).catch((res) => {
          respuestaAjaxKO(res.code);
          setLang(getCookie('lang'));
          document.getElementById("modal").style.display = "block";
      });
  }
  
  function cargaPermisos(funcionalidad){
    return new Promise(function(resolve, reject) {
      var token = getCookie('tokenUsuario');
  
      var data = {
        controlador : 'GestionACL',
        action : 'obtenerPermisos',
        nombre_funcionalidad: funcionalidad
      }
  
      $.ajax({
        method: "POST",
        url: urlPeticionAjaxCargarPermiso,
        data: data,  
        contentType : "application/x-www-form-urlencoded; charset=UTF-8",
        headers: {'Authorization': token},
        }).done(res => {
          if (res.code != 'PERMISOS_OBTENIDOS') {
            reject(res);
          }
          resolve(res);
        }).fail( function( jqXHR ) {
          errorFailAjax(jqXHR.status);
        });
    });
  }
  
  async function cargarInfoPermiso(funcionalidad){
   await cargaPermisos(funcionalidad)
      .then((res) => {
        if(funcionalidad.includes(" ")){
          var nombre = (funcionalidad).split(" ");
          if(funcionalidad == "Gestión de procedimientos ejecutados" || funcionalidad == "Gestión de procesos ejecutados"){
           var nombreCollapse = nombre[1] + nombre[2] + nombre[3];
          }else{
          var nombreCollapse = nombre[1] + nombre[2];
          }
        }else{
          var nombreCollapse = funcionalidad;
        }
        
        var rolesListos = [];
        var yaIntroducido = false;
  
        $('#cabeceraPermisosGest' +nombreCollapse).html('');
  
        var rolesDisponibles = '<tr>' + 
                                '<th class = "colFirst"></th>'; 
  
        for(var i = 0; i<res.resource.length; i++){
          for(var x = 0; x<rolesListos.length; x++){
            if(res.resource[i].rol.nombre_rol == rolesListos[x]){
              var yaIntroducido = true;
            }else{
              var yaIntroducido = false;
            }
          }
  
          if(!yaIntroducido){
            rolesDisponibles = rolesDisponibles + '<th class="' + res.resource[i].rol.nombre_rol + '">' + res.resource[i].rol.nombre_rol + '</th>';
            rolesListos.push(res.resource[i].rol.nombre_rol);
          }
  
          if(i == (res.resource.length - 1)){
            rolesDisponibles = rolesDisponibles + '</tr>';
          }
  
        }
  
        $('#cabeceraPermisosGest' +nombreCollapse).append(rolesDisponibles);
  
        cargarAccionesPermisos(funcionalidad,res.resource);
        setLang(getCookie('lang'));
  
      }).catch((res) => {
          respuestaAjaxKO(res.code);
          setLang(getCookie('lang'));
          document.getElementById("modal").style.display = "block";
      });
  }
  
  function cargarAccionesPermisos(funcionalidad,acciones){
        if(funcionalidad.includes(" ")){
          var nombre = (funcionalidad).split(" ");
          if(funcionalidad == "Log de acciones"){
           var nombreCollapse = nombre[0] + nombre[1] + nombre[2];
          }else if(funcionalidad == "Gestión de procedimientos ejecutados" || funcionalidad == "Gestión de procesos ejecutados"){
             var nombreCollapse = nombre[1] + nombre[2] + nombre[3];
          }else{
          var nombreCollapse = nombre[1] + nombre[2];
          }
        }else{
          var nombreCollapse = funcionalidad;
        }
  
        var className = "";
        var accionesListas = [];
        var yaIntroducido = false;
        var atributos = [];
  
        $('#cuerpoPermisosGest' + nombreCollapse).html('');
  
        var accionesDisponibles = '<tr>';
  
        var cabecera = $('#cabeceraPermisosGest' +nombreCollapse + ' tr th');
  
        for(var i = 0; i<acciones.length; i++){
          accionesDisponibles = "";
          var rol = acciones[i].rol.nombre_rol;
          var accion = acciones[i].accion.nombre_accion;
  
          for(var z= 0; z<accionesListas.length; z++){
            if(accion == accionesListas[z]){
              yaIntroducido = true;
              break;
            }else{
              yaIntroducido = false;
            }
          }
  
          if(!yaIntroducido){
             accionesDisponibles = '<tr><td class="columnaAcciones">' + acciones[i].accion.nombre_accion +' </td>';
                                            
          for(var x= 0; x<cabecera.length; x++){
             var classCabecera = cabecera[x].className;
             var tienePermiso = acciones[i].tienePermiso;
              if(rol == classCabecera){
                atributosFunc = ["'" + acciones[i].accion.id_accion + "'", "'" + acciones[i].accion.nombre_accion + "'", "'" + acciones[i].accion.descripcion_accion + "'", "'" + acciones[i].accion.borrado_accion + "'"
                  , "'" + acciones[i].rol.id_rol + "'", "'" + acciones[i].rol.nombre_rol + "'", "'" + acciones[i].rol.descripcion_rol + "'", "'" + acciones[i].rol.borrado_rol + "'"
                  , "'" + acciones[i].funcionalidad.id_funcionalidad + "'", "'" + acciones[i].funcionalidad.nombre_funcionalidad + "'", "'" + acciones[i].funcionalidad.descripcion_funcionalidad + "'", "'" + acciones[i].funcionalidad.borrado_funcionalidad + "'"];
                if(tienePermiso == "Si"){
                  accionesDisponibles = accionesDisponibles +  '<td class="accionesPermisos">' + 
                                                                    '<div class="tooltip6">' + 
                                                                      '<img class="permisos darPermiso" src="images/ok2.png" data-toggle="" data-target="" onclick="" alt="Dar permiso" style="cursor: not-allowed;">' + 
                                                                      '<span class="tooltiptext iconDarPermiso DAR_PERMISO">Dar Permiso</span>' + 
                                                                    '</div>' + 
                                                                    '<div class="tooltip6">' + 
                                                                      '<img class="permisos quitarPermiso" src="images/error.png" data-toggle="" data-target="" onclick="desasignarPermiso('+atributosFunc+')" alt="Quitar permiso" style="cursor: pointer;">' + 
                                                                      '<span class="tooltiptext iconQuitarPermiso QUITAR_PERMISO">Quitar Permiso</span>' + 
                                                                    '</div>' + 
                                                                  '</td>';
                }else if(tienePermiso == "No"){
                  var ac = JSON.stringify(acciones[i]);
                  accionesDisponibles = accionesDisponibles + '<td class="accionesPermisos">' + 
                                                                  '<div class="tooltip6">' + 
                                                                    '<img class="permisos darPermiso" src="images/ok3.png" data-toggle="" data-target="" onclick="asignarPermiso('+atributosFunc+')" alt="Dar permiso" style="cursor: pointer;">' + 
                                                                    '<span class="tooltiptext iconDarPermiso DAR_PERMISO">Dar Permiso</span>' + 
                                                                  '</div>' + 
                                                                  '<div class="tooltip6">' + 
                                                                    '<img class="permisos quitarPermiso" src="images/error2.png" data-toggle="" data-target="" onclick="" alt="Quitar permiso" style="cursor: not-allowed;">' + 
                                                                    '<span class="tooltiptext iconQuitarPermiso QUITAR_PERMISO">Quitar Permiso</span>' + 
                                                                  '</div>' + 
                                                                '</td>';
                }
             }else if(rol !=classCabecera && classCabecera != 'colFirst'){
                for(var z= 0; z<accionesListas.length; z++){
                  if(accion == accionesListas[z]){
                    yaIntroducido = true;
                  }else{
                    yaIntroducido = false;
                  }   
                }
  
                if(!yaIntroducido){
                    for(var t = 0; t<acciones.length; t++){
                      tienePermiso = acciones[t].tienePermiso;
                      if(acciones[t].rol.nombre_rol == classCabecera && acciones[t].accion.nombre_accion == acciones[i].accion.nombre_accion){
                        atributosFunc = ["'" + acciones[t].accion.id_accion + "'", "'" + acciones[t].accion.nombre_accion + "'", "'" + acciones[t].accion.descripcion_accion + "'", "'" + acciones[t].accion.borrado_accion + "'"
                        , "'" + acciones[t].rol.id_rol + "'", "'" + acciones[t].rol.nombre_rol + "'", "'" + acciones[t].rol.descripcion_rol + "'", "'" + acciones[t].rol.borrado_rol + "'"
                        , "'" + acciones[t].funcionalidad.id_funcionalidad + "'", "'" + acciones[t].funcionalidad.nombre_funcionalidad + "'", "'" + acciones[t].funcionalidad.descripcion_funcionalidad + "'", "'" + acciones[t].funcionalidad.borrado_funcionalidad + "'"];
                        if(tienePermiso == "Si"){
                          accionesDisponibles = accionesDisponibles +  '<td class="accionesPermisos">' + 
                                                                        '<div class="tooltip6">' + 
                                                                          '<img class="permisos darPermiso" src="images/ok2.png" data-toggle="" data-target="" onclick="" alt="Dar permiso" style="cursor: not-allowed;">' + 
                                                                          '<span class="tooltiptext iconDarPermiso DAR_PERMISO">Dar Permiso</span>' + 
                                                                        '</div>' + 
                                                                        '<div class="tooltip6">' + 
                                                                          '<img class="permisos quitarPermiso" src="images/error.png" data-toggle="" data-target="" onclick="desasignarPermiso('+  atributosFunc +')" alt="Quitar permiso" style="cursor: pointer;">' + 
                                                                          '<span class="tooltiptext iconQuitarPermiso QUITAR_PERMISO">Quitar Permiso</span>' + 
                                                                        '</div>' + 
                                                                      '</td>';
                       }else if(tienePermiso == "No"){
                      
                        accionesDisponibles = accionesDisponibles + '<td class="accionesPermisos">' + 
                                                                      '<div class="tooltip6">' + 
                                                                        '<img class="permisos darPermiso" src="images/ok3.png" data-toggle="" data-target="" onclick="asignarPermiso('+  atributosFunc +')" alt="Dar permiso" style="cursor: pointer;">' + 
                                                                        '<span class="tooltiptext iconDarPermiso DAR_PERMISO">Dar Permiso</span>' + 
                                                                      '</div>' + 
                                                                      '<div class="tooltip6">' + 
                                                                        '<img class="permisos quitarPermiso" src="images/error2.png" data-toggle="" data-target="" onclick="" alt="Quitar permiso" style="cursor: not-allowed;">' + 
                                                                        '<span class="tooltiptext iconQuitarPermiso QUITAR_PERMISO">Quitar Permiso</span>' + 
                                                                      '</div>' + 
                                                                    '</td>';
                        }
                      }
                    }
                  }
                }
             className = classCabecera;
          }
  
          if(className != 'colFirst'){
            accionesDisponibles = accionesDisponibles + '</tr>';
            $('#cuerpoPermisosGest' + nombreCollapse).append(accionesDisponibles);
            accionesListas.push(acciones[i].accion.nombre_accion);
          }
  
          }
          
        }
  
    setLang(getCookie('lang'));
  
  }
  
  async function asignarPermiso(idAccion, nombreAccion, descripAccion, borradoAccion, idRol, rolName, rolDescription, borradoRol, idFuncionalidad, nombreFuncionalidad, descripFuncionalidad, borradoFuncionalidad){
    await asignarPermisoAjaxPromesa(idAccion, nombreAccion, descripAccion, borradoAccion, idRol, rolName, rolDescription, borradoRol, idFuncionalidad, nombreFuncionalidad, descripFuncionalidad, borradoFuncionalidad)
    .then((res) => {
        permisosUsuarios();
        setLang(getCookie('lang'));
    }).catch((res) => {
        respuestaAjaxKO(res.code);
        setLang(getCookie('lang'));
        document.getElementById("modal").style.display = "block";
    });
  }
  
  function asignarPermisoAjaxPromesa(idAccion, nombreAccion, descripAccion, borradoAccion, idRol, rolName, rolDescription, borradoRol, idFuncionalidad, nombreFuncionalidad, descripFuncionalidad, borradoFuncionalidad){
    return new Promise(function(resolve, reject) {
  
      
      var token = getCookie('tokenUsuario');
  
      var accion = {
        id_accion : idAccion,
        nombre_accion : nombreAccion,
        descrip_accion : descripAccion,
        borrado_accion : borradoAccion
      }
  
      var rol = {
        id_rol : idRol,
        nombre_rol : rolName,
        descripcion_rol : rolDescription,
        borrado_rol : borradoRol
      }
  
      var funcionalidad = {
        id_funcionalidad : idFuncionalidad,
        nombre_funcionalidad : nombreFuncionalidad,
        descripcion_funcionalidad : descripFuncionalidad,
        borrado_funcionalidad : borradoFuncionalidad
      }
    
      var data = {
        controlador: 'GestionACL',
        action: 'add',
        accion : accion,
        rol : rol,
        funcionalidad : funcionalidad,
        usuario : getCookie('usuario')
       
      }
      
      $.ajax({
        method: "POST",
        url: urlPeticionAjarAsignarAccion,
        contentType : "application/x-www-form-urlencoded; charset=UTF-8",
        data: data,  
        headers: {'Authorization': token},
        }).done(res => {
          if (res.code != 'ACCION_ASIGNADA') {
            reject(res);
          }
          resolve(res);
        }).fail( function( jqXHR ) {
          errorFailAjax(jqXHR.status);
        });
    });
  }
  
  async function desasignarPermiso(idAccion, nombreAccion, descripAccion, borradoAccion, idRol, rolName, rolDescription, borradoRol, idFuncionalidad, nombreFuncionalidad, descripFuncionalidad, borradoFuncionalidad){
    await desasignarPermisoAjaxPromesa(idAccion, nombreAccion, descripAccion, borradoAccion, idRol, rolName, rolDescription, borradoRol, idFuncionalidad, nombreFuncionalidad, descripFuncionalidad, borradoFuncionalidad)
    .then((res) => {
        permisosUsuarios();
        setLang(getCookie('lang'));
    }).catch((res) => {
        respuestaAjaxKO(res.code);
        setLang(getCookie('lang'));
        document.getElementById("modal").style.display = "block";
    });
  }
  
  function desasignarPermisoAjaxPromesa(idAccion, nombreAccion, descripAccion, borradoAccion, idRol, rolName, rolDescription, borradoRol, idFuncionalidad, nombreFuncionalidad, descripFuncionalidad, borradoFuncionalidad){
    return new Promise(function(resolve, reject) {
      var token = getCookie('tokenUsuario');
  
      var accion = {
        id_accion : idAccion,
        nombre_accion : nombreAccion,
        descrip_accion : descripAccion,
        borrado_accion : borradoAccion
      }
  
      var rol = {
        id_rol : idRol,
        nombre_rol : rolName,
        descripcion_rol : rolDescription,
        borrado_rol : borradoRol
      }
  
      var funcionalidad = {
        id_funcionalidad : idFuncionalidad,
        nombre_funcionalidad : nombreFuncionalidad,
        descripcion_funcionalidad : descripFuncionalidad,
        borrado_funcionalidad : borradoFuncionalidad
      }

      var data = {
        controlador: 'GestionACL',
        action: 'delete',
        accion : accion,
        rol : rol,
        funcionalidad : funcionalidad,
        usuario : getCookie('usuario')
       
      }
      
      $.ajax({
        method: "POST",
        url: urlPeticionAjaxDesasignarAccion,
        contentType : "application/x-www-form-urlencoded; charset=UTF-8",
        data: data,  
        headers: {'Authorization': token},
        }).done(res => {
          if (res.code != 'ACCION_DESASIGNADA') {
            reject(res);
          }
          resolve(res);
        }).fail( function( jqXHR ) {
          errorFailAjax(jqXHR.status);
        });
    });
  }
  
  function cargarTablaPermisos(datos){
    $('#tablaDatos').attr('hidden', true);
    $('#permisos').css('display', 'block');
    $('#accordion').html('');
    $('#itemPaginacion').attr('hidden', true);
    $('#paginacion').attr('hidden', true);
    document.getElementById('cabecera').style.display="none";
    document.getElementById('cabeceraEliminados').style.display="block";
  
    for(var i = 0; i<datos.length; i++){
      if((datos[i]['nombre_funcionalidad']).includes(" ")){
        var nombre = (datos[i]['nombre_funcionalidad']).split(" ");
        if((datos[i]['nombre_funcionalidad']) == "Log de acciones" ){
          var nombreCollapse = nombre[0] + nombre[1] + nombre[2];
        }else if((datos[i]['nombre_funcionalidad']) == "Gestión de procedimientos ejecutados" || (datos[i].nombreFuncionalidad) == "Gestión de procesos ejecutados"){
          var nombreCollapse = nombre[1] + nombre[2] + nombre[3];
        }else{
          var nombreCollapse = nombre[1] + nombre[2];
        }
      }else{
        var nombreCollapse = datos[i]['nombre_funcionalidad'];
      }
      
      var permisos = '<div class="card">' + 
                      '<div class="card-header">' + 
                        '<a class="collapsed card-link" data-toggle="collapse" href="#collapseGest' + nombreCollapse +'"onclick="javascript:cargarInfoPermiso(\''+datos[i]['nombre_funcionalidad']+'\'); cargarCardAbierta(\''+datos[i]['nombre_funcionalidad']+'\')">' + 
                            datos[i]['nombre_funcionalidad'] + 
                        '</a>' + 
                        '<img class="iconTab" id="iconoTestGest' + nombreCollapse + '" src="images/failed.png" hidden>' +
                      '</div>' + 
                      '<div id="collapseGest' + nombreCollapse +'" class="collapse" data-parent="#accordion">' + 
                        '<div class="card-body" id="testGest' + nombreCollapse + '">' +
                          '<div class="table-responsive">' + 
                             '<table class="table table-bordered" id="tablaGest' + nombreCollapse + '">' + 
                                '<thead class="cabeceraTablasTest" id="cabeceraPermisosGest' + nombreCollapse+ '">' + 
                                '</thead>' + 
                                '<tbody id="cuerpoPermisosGest' + nombreCollapse + '">' + 
                                '<tbody>' + 
                              '</table>' + 
                          '</div>' + 
                        '</div>' + 
                      '</div>' + 
                    '</div>';
  
      $('#accordion').append(permisos);   
    }
  
    setLang(getCookie('lang'));
  }
  
  /** Función para guardar el card del permiso en el que nos encontramos **/
  function cargarCardAbierta(nombreFuncionalidad){
    if((nombreFuncionalidad).includes(" ")){
        var nombre = (nombreFuncionalidad).split(" ");
        if((nombreFuncionalidad) == "Log de acciones"){
           var nombreCollapse = nombre[0] + nombre[1] + nombre[2];
        }else if((nombreFuncionalidad) == "Gestión de procedimientos ejecutados" || (nombreFuncionalidad) == "Gestión de procesos ejecutados"){
           var nombreCollapse = nombre[1] + nombre[2] + nombre[3];
        }else{
          var nombreCollapse = nombre[1] + nombre[2];
        }
      }else{
        var nombreCollapse = nombreFuncionalidad;
      }
  
      setCookie('cardPermiso', nombreCollapse);
      setCookie('nomFuncPermisos', nombreFuncionalidad);
      setLang(getCookie('lang'));
  
  }
  $(document).ready(function() {
    $("#form-modal").on('hidden.bs.modal', function() {
      
      let idElementoErrorList = ["errorFormatoNombreAccion", "errorFormatoDescripcionAccion"];
      
      let idElementoList = ["nombreAccion", "descripcionAccion"];
  
      limpiarFormulario(idElementoList);
      eliminarMensajesValidacionError(idElementoErrorList, idElementoList);
      setLang(getCookie('lang'));
    });
  
  });