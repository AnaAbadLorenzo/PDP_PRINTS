/** Función para cargar los datos de persona **/
  async function cargarPersonas(numeroPagina, tamanhoPagina, paginadorCreado){
      if(getCookie('rolUsuario') == "Usuario"){
          await cargarDatosPersonaAjaxPromesa()
            .then((res) => {
              cargarPermisosFuncPersona();
              $('#personaInfoParaAdmin').attr('hidden', true);
              $('#personaInfoParaUsuario').attr('hidden', false);
              cargaDatosPersona(res.resource.listaBusquedas);
              cargaDatosUsuario(res.resource.listaBusquedas);
              setLang(getCookie('lang'));
            }).catch((res) => {
                respuestaAjaxKO(res.code);
                setLang(getCookie('lang'));
                document.getElementById("modal").style.display = "block";
            });
      
      }else if(getCookie('rolUsuario') == "Administrador"){
          await cargarPersonasAjaxPromesa(numeroPagina, tamanhoPagina)
              .then((res) => {
                  $('#personaInfoParaAdmin').attr('hidden', false);
                  $('#personaInfoParaUsuario').attr('hidden', true);
                  var numResults = res.resource.numResultados + '';
                  var totalResults = res.resource.tamanhoTotal + '';
                  var inicio = 0;
                  if(res.resource.listaBusquedas.length == 0){
                      inicio = 0;
                  }else{
                      inicio = parseInt(res.resource.inicio)+1;
                  }
                  var textPaginacion = inicio + " - " + (parseInt(res.resource.inicio)+parseInt(numResults))  + " total " + totalResults;
          
                  $("#datosPersona").html("");
                  $("#checkboxColumnas").html("");
                  $("#paginacion").html("");
              
                  for (var i = 0; i < res.resource.listaBusquedas.length; i++){
                      var tr = construyeFila('PERSONA', res.resource.listaBusquedas[i]);
                      $("#datosPersona").append(tr);
                  }
          
                  var div = createHideShowColumnsWindow({NOMBRE_PERSONA_COLUMN:2, APELLIDOS_PERSONA_COLUMN:3,
                                                          EMAIL_COLUMN: 4,LOGIN_USUARIO_COLUMN:5});
                  $("#checkboxColumnas").append(div);
                  $("#paginacion").append(textPaginacion);
  
                  if(paginadorCreado != 'PaginadorCreado'){
                    paginador(totalResults, 'cargarPersonas', 'PERSONA');
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
    
  }
  
  /** Función que buscar una persona**/
  async function buscarPersona(numeroPagina, tamanhoPagina, accion, paginadorCreado){
    await buscarPersonaAjaxPromesa(numeroPagina, tamanhoPagina, accion)
      .then((res) => {
        cargarPermisosFuncPersona();
        if($('#form-modal').is(':visible')) {
           $("#form-modal").modal('toggle');
        };
        var datosBusquedas = [];
        datosBusquedas.push('dni_persona: ' +res.resource.datosBusquedas['dni_persona']);
        datosBusquedas.push('nombre_persona: ' +res.resource.datosBusquedas['nombre_persona']);
        datosBusquedas.push('direccion_persona: ' +res.resource.datosBusquedas['direccion_persona']);
        datosBusquedas.push('fecha_nac_persona: ' +res.resource.datosBusquedas['fecha_nac_persona']);
        datosBusquedas.push('telefono_persona: ' +res.resource.datosBusquedas['telefono_persona']);
        datosBusquedas.push('email_persona: ' +res.resource.datosBusquedas['email_persona']);
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
  
        document.getElementById("cabecera").style.display = "block";
  
        $("#datosPersona").html("");
        $("#checkboxColumnas").html("");
        $("#paginacion").html("");
          for (var i = 0; i < res.resource.listaBusquedas.length; i++){
            var tr = construyeFila('PERSONA', res.resource.listaBusquedas[i]);
            $("#datosPersona").append(tr);
          }
        
        var div = createHideShowColumnsWindow({NOMBRE_PERSONA_COLUMN:2, APELLIDOS_PERSONA_COLUMN:3,
                                                          EMAIL_COLUMN: 4,LOGIN_USUARIO_COLUMN:5});
        $("#checkboxColumnas").append(div);
        $("#paginacion").append(textPaginacion);
        if(paginadorCreado != 'PaginadorCreado'){
           paginador(totalResults, 'buscarPersona', 'PERSONA');
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
        cargarPermisosFuncPersona();
  
        let idElementoList = ["dniP", "nombreP", "apellidosP", "fechaNacP", "direccionP", "telefonoP", "emailP", 
        "usuario", "passwdUsuario1", "passwdUsuario2"];
      
        resetearFormulario("formularioGenerico", idElementoList);
  
        respuestaAjaxKO(res.code);
        setLang(getCookie('lang'));
        document.getElementById("modal").style.display = "block";
    });
  }
  
  /** Funcion añadir persona **/
  async function addPersona(){
    await anadirPersonaAjaxPromesa()
    .then((res) => {
      $("#form-modal").modal('toggle');
      respuestaAjaxOK("PERSONA_GUARDADA_OK", res.code);
      document.getElementById("modal").style.display = "block";
  
      let idElementoList = ["dniP", "nombreP", "apellidosP", "fechaNacP", "direccionP", "telefonoP", "emailP", 
      "usuario", "passwdUsuario1", "passwdUsuario2"];
      
      resetearFormulario("formularioGenerico", idElementoList);
      
      $('#dniP').val(getCookie('dni_persona'));
      $('#nombreP').val(getCookie('nombre_persona'));
      $('#apellidosP').val(getCookie('apellidos_persona'));
      $('#direccionP').val(getCookie('direccion_persona'));
      $('#fechaNacP').val(getCookie('fecha_nac_persona'));
      $('#telefonoP').val(getCookie('telefono_persona'));
      $('#emailP').val(getCookie('email_persona'));
      $('#direccionP').val(getCookie('direccion_persona'));
      $('#usuario').val(getCookie('usuario'));
     
      buscarPersona(getCookie('numeroPagina'), tamanhoPaginaPersona, 'buscarPaginacion', 'PaginadorNo');
      setLang(getCookie('lang'));
  
    }).catch((res) => {
        $("#form-modal").modal('toggle');
  
        respuestaAjaxKO(res.code);
  
        let idElementoList = ["dniP", "nombreP", "apellidosP", "fechaNacP", "direccionP", "telefonoP", "emailP", 
        "usuario", "passwdUsuario1", "passwdUsuario2"];
      
        resetearFormulario("formularioGenerico", idElementoList);
        setLang(getCookie('lang'));
  
        document.getElementById("modal").style.display = "block";
    });
  }
  
  /** Función que edita una persona **/
  async function editPersona(){
    await editarPersonaAjaxPromesa()
    .then((res) => {
      $("#form-modal").modal('toggle');
  
      respuestaAjaxOK("PERSONA_EDITADA_OK", res.code);
  
      cargarPermisosFuncPersona();
  
      let idElementoList = ["dniP", "nombreP", "apellidosP", "fechaNacP", "direccionP", "telefonoP", "emailP", 
        "usuario", "passwdUsuario1", "passwdUsuario2"];
      
      resetearFormulario("formularioGenerico", idElementoList);
  
      document.getElementById("modal").style.display = "block";
      $('#dniP').val(getCookie('dni_persona'));
      $('#nombreP').val(getCookie('nombre_persona'));
      $('#apellidosP').val(getCookie('apellidos_persona'));
      $('#direccionP').val(getCookie('direccion_persona'));
      $('#fechaNacP').val(getCookie('fecha_nac_persona'));
      $('#telefonoP').val(getCookie('telefono_persona'));
      $('#emailP').val(getCookie('email_persona'));
      $('#direccionP').val(getCookie('direccion_persona'));
      $('#usuario').val(getCookie('usuario'));
  
      if(getCookie('rolUsuario') == "Administrador"){
        buscarPersona(getCookie('numeroPagina'), tamanhoPaginaPersona, 'buscarPaginacion', 'PaginadorCreado');
      }else{
        cargarPersonas(getCookie('numeroPagina'), tamanhoPaginaPersona, 'PaginadorCreado');
      }
  
      setLang(getCookie('lang'));
  
    }).catch((res) => {
      $("#form-modal").modal('toggle');
  
      respuestaAjaxKO(res.code);
  
      let idElementoList = ["dniP", "nombreP", "apellidosP", "fechaNacP", "direccionP", "telefonoP", "emailP", 
        "usuario", "passwdUsuario1", "passwdUsuario2"];
      
      resetearFormulario("formularioGenerico", idElementoList);

      setLang(getCookie('lang'));
  
      document.getElementById("modal").style.display = "block";
  
  
    });
  }
  
  /** Función que elimina una persona **/
  async function deletePersona(){
    await eliminarPersonaAjaxPromesa()
    .then((res) => {
      $("#form-modal").modal('toggle');
  
      respuestaAjaxOK("PERSONA_ELIMINADA_OK", res.code);
  
      let idElementoList = ["dniP", "nombreP", "apellidosP", "fechaNacP", "direccionP", "telefonoP", "emailP", 
        "usuario", "passwdUsuario1", "passwdUsuario2"];
      
      resetearFormulario("formularioGenerico", idElementoList);
      document.getElementById("modal").style.display = "block";
     
      refrescarTabla(0, tamanhoPaginaPersona);
      setLang(getCookie('lang'));
  
    }).catch((res) => {
       
       $("#form-modal").modal('toggle');
        respuestaAjaxKO(res.code);
  
        let idElementoList = ["dniP", "nombreP", "apellidosP", "fechaNacP", "direccionP", "telefonoP", "emailP", 
          "usuario", "passwdUsuario1", "passwdUsuario2"];
       
        resetearFormulario("formularioGenerico", idElementoList);
  
        setLang(getCookie('lang'));
  
        document.getElementById("modal").style.display = "block";
  
  
    });
  }
  
  /** Función que visualiza una persona **/
  async function detallePersona(){
    await detallePersonaAjaxPromesa()
    .then((res) => {
      $("#form-modal").modal('toggle');
  
      let idElementoList = ["dniP", "nombreP", "apellidosP", "fechaNacP", "direccionP", "telefonoP", "emailP", 
          "usuario", "passwdUsuario1", "passwdUsuario2"];
      
      resetearFormulario("formularioGenerico", idElementoList);
      
      $('#dniP').val(getCookie('dni_persona'));
      $('#nombreP').val(getCookie('nombre_persona'));
      $('#apellidosP').val(getCookie('apellidos_persona'));
      $('#direccionP').val(getCookie('direccion_persona'));
      $('#fechaNacP').val(getCookie('fecha_nac_persona'));
      $('#telefonoP').val(getCookie('telefono_persona'));
      $('#emailP').val(getCookie('email_persona'));
      $('#direccionP').val(getCookie('direccion_persona'));
      $('#usuario').val(getCookie('usuario'));
     
      setLang(getCookie('lang'));
  
    }).catch((res) => {
        $("#form-modal").modal('toggle');
  
        respuestaAjaxKO(res.code);
  
        let idElementoList = ["dniP", "nombreP", "apellidosP", "fechaNacP", "direccionP", "telefonoP", "emailP", 
          "usuario", "passwdUsuario1", "passwdUsuario2"];
      
        resetearFormulario("formularioGenerico", idElementoList);
        
        setLang(getCookie('lang'));
  
        document.getElementById("modal").style.display = "block";
    });
  }
  
  /*Función que refresca la tabla por si hay algún cambio en BD */
  async function refrescarTabla(numeroPagina, tamanhoPagina){
    await cargarPersonasAjaxPromesa(numeroPagina, tamanhoPagina)
    .then((res) => {
        cargarPermisosFuncPersona();
        setCookie('dni_persona', '');
        setCookie('nombre_persona', '');
        setCookie('apellidos_persona', '');
        setCookie('fecha_nac_persona', '');
        setCookie('direccion_persona', '');
        setCookie('telefono_persona', '');
        setCookie('email_persona', '');
       
        var numResults = res.resource.numResultados + '';
        var totalResults = res.resource.tamanhoTotal + '';
        var inicio = 0;
        if(res.resource.listaBusquedas.length == 0){
          inicio = 0;
        }else{
          inicio = parseInt(res.resource.inicio)+1;
        }
        var textPaginacion = inicio + " - " + (parseInt(res.resource.inicio)+parseInt(numResults))  + " total " + totalResults;
        
        $("#datosPersona").html("");
        $("#checkboxColumnas").html("");
        $("#paginacion").html("");
          for (var i = 0; i < res.resource.listaBusquedas.length; i++){
            var tr = construyeFila('PERSONA', res.resource.listaBusquedas[i]);
            $("#datosPersona").append(tr);
          }
        
        var div = createHideShowColumnsWindow({NOMBRE_PERSONA_COLUMN:2, APELLIDOS_PERSONA_COLUMN:3,
                                                          EMAIL_COLUMN: 4,LOGIN_USUARIO_COLUMN:5});
        $("#checkboxColumnas").append(div);
        $("#paginacion").append(textPaginacion);
  
        paginador(totalResults, 'cargarPersonas', 'PERSONA');
  
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
        cargarPermisosFuncPersona();
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
            document.getElementById("cabecera").style.display = "none";
            document.getElementById("cabeceraEliminados").style.display = "block";
        }
  
        document.getElementById("cabeceraEliminados").style.display = "block";
  
        $("#datosPersona").html("");
        $("#checkboxColumnas").html("");
        $("#paginacion").html("");
          for (var i = 0; i < res.resource.listaBusquedas.length; i++){
            var tr = construyeFilaEliminados('PERSONA', res.resource.listaBusquedas[i]);
            $("#datosPersona").append(tr);
          }
        
       var div = createHideShowColumnsWindow({NOMBRE_PERSONA_COLUMN:2, APELLIDOS_PERSONA_COLUMN:3,
                                                          EMAIL_COLUMN: 4,LOGIN_USUARIO_COLUMN:5});
        $("#checkboxColumnas").append(div);
        $("#paginacion").append(textPaginacion);
  
        setCookie('dni_persona', '');
        setCookie('nombre_persona', '');
        setCookie('apellidos_persona', '');
        setCookie('fecha_nac_persona', '');
        setCookie('direccion_persona', '');
        setCookie('telefono_persona', '');
        setCookie('email_persona', '');
  
        if(paginadorCreado != 'PaginadorCreado'){
           paginador(totalResults, 'buscarEliminadosPersona', 'PERSONA');
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
  
  /* Función para obtener los datos de la persona desde BD con ajax y promesa */
  function cargarDatosPersonaAjaxPromesa(){
      return new Promise(function(resolve, reject) {
      var token = getCookie('tokenUsuario');
  
      var data = {
        controlador : 'GestionPersonas',
        action: 'searchByUsuario',
        usuario : getCookie('usuario'),
        inicio : 0,
        tamanhoPagina : tamanhoPaginaPersona
      }
      
      $.ajax({
        method: "POST",
        url: urlPeticionAjaxListarPersonaPorUsuario,
        contentType : "application/x-www-form-urlencoded; charset=UTF-8",
        data: data,
        headers: {'Authorization': token},
        }).done(res => {
          if (res.code != 'BUSQUEDA_PERSONA_CORRECTO') {
            reject(res);
          }
          resolve(res);
        }).fail( function( jqXHR ) {
          errorFailAjax(jqXHR.status);
        });
    });
  }
  
  /** Función para obtener todos los datos de la personas de la BD **/
  function cargarPersonasAjaxPromesa(numeroPagina, tamanhoPagina){
      return new Promise(function(resolve, reject) {
      var token = getCookie('tokenUsuario');
  
      var data = {
        controlador : 'GestionPersonas',
        action : 'search',
        inicio : calculaInicio(numeroPagina, tamanhoPaginaPersona),
        tamanhoPagina : tamanhoPaginaPersona
      }
      
      $.ajax({
        method: "POST",
        url: urlPeticionAjaxListarTodasPersonas,
        contentType : "application/x-www-form-urlencoded; charset=UTF-8",
        data: data,
        headers: {'Authorization': token},
        }).done(res => {
          if (res.code != 'BUSQUEDA_PERSONA_CORRECTO') {
            reject(res);
          }
          resolve(res);
        }).fail( function( jqXHR ) {
          errorFailAjax(jqXHR.status);
        });
    });
  }
  
  /** Función para añadir personas con ajax y promesas **/
  function anadirPersonaAjaxPromesa(){
    return new Promise(function(resolve, reject) {
  
      if (verificarPasswd()) {
          var token = getCookie('tokenUsuario');
  
          encriptar('passwdUsuario1');
  
          var data = {
            controlador: 'GestionPersonas',
            action: 'add',
            dni_persona : $('#dniP').val(),
            nombre_persona : $('#nombreP').val(),
            apellidos_persona : $('#apellidosP').val(),
            fecha_nac_persona : $('#fechaNacP').val(),
            direccion_persona : $('#direccionP').val(),
            telefono_persona : $('#telefonoP').val(),
            email_persona : $('#emailP').val(),
            borrado_persona : 0,
            dni_usuario : $('#dniP').val(),
            usuario : $('#usuario').val(),
            passwd_usuario : $('#passwdUsuario1').val(),
            borrado_usuario : 0,
            id_rol : 2
          }
  
          $.ajax({
            method: "POST",
            url: urlPeticionAjaxPersonaGuardar,
            contentType : "application/x-www-form-urlencoded; charset=UTF-8",
            data: data,
            headers: {'Authorization': token},
            }).done(res => {
              if (res.code != 'ADD_PERSONA_COMPLETO') {
                reject(res);
              }
              resolve(res);
            }).fail( function( jqXHR ) {
              errorFailAjax(jqXHR.status);
            });
        }
  
        });
  }
  
  /** Función para editar una persona con ajax y promesas **/
  function editarPersonaAjaxPromesa(){
    return new Promise(function(resolve, reject) {
      var token = getCookie('tokenUsuario');
  
      var data = {
        controlador: 'GestionPersonas',
        action: 'edit',
        dni_persona : $('#dniP').val(),
        nombre_persona : $('#nombreP').val(),
        apellidos_persona : $('#apellidosP').val(),
        fecha_nac_persona : $('#fechaNacP').val(),
        direccion_persona : $('#direccionP').val(),
        telefono_persona : $('#telefonoP').val(),
        email_persona : $('#emailP').val(),
        borrado_persona : 0,
      }
      
      $.ajax({
        method: "POST",
        url: urlPeticionAjaxEditPersona,
        contentType : "application/x-www-form-urlencoded; charset=UTF-8",
        data: data,
        headers: {'Authorization': token},
        }).done(res => {
          if (res.code != 'EDIT_PERSONA_COMPLETO') {
            reject(res);
          }
          resolve(res);
        }).fail( function( jqXHR ) {
          errorFailAjax(jqXHR.status);
        });
    });
  }
  
  /**Función para eliminar una persona con ajax y promesas*/
  function eliminarPersonaAjaxPromesa(){
    return new Promise(function(resolve, reject) {
      var token = getCookie('tokenUsuario');
  
      var data = {
        controlador: 'GestionPersonas',
        action: 'delete',
        dni_persona : $('#dniP').val(),
        nombre_persona : $('#nombreP').val(),
        apellidos_persona : $('#apellidosP').val(),
        fecha_nac_persona : $('#fechaNacP').val(),
        direccion_persona : $('#direccionP').val(),
        telefono_persona : $('#telefonoP').val(),
        email_persona : $('#emailP').val(),
        borrado_persona : 1,
      }

      $.ajax({
        method: "POST",
        url: urlPeticionAjaxDeletePersona,
        contentType : "application/x-www-form-urlencoded; charset=UTF-8",
        data: data,
        headers: {'Authorization': token},
        }).done(res => {
          if (res.code != 'DELETE_PERSONA_COMPLETO') {
            reject(res);
          }
          resolve(res);
        }).fail( function( jqXHR ) {
          errorFailAjax(jqXHR.status);
        });
    });
  }
  
  
  /**Función para ver en detalle una persona con ajax y promesas*/
  function detallePersonaAjaxPromesa(){
    return new Promise(function(resolve, reject) {
      var token = getCookie('tokenUsuario');
      
      var data = {
        controlador: 'GestionPersonas',
        action: 'searchByParameters',
        dni_persona : $('#dniP').val(),
        nombre_persona : $('#nombreP').val(),
        apellidos_persona : $('#apellidosP').val(),
        fecha_nac_persona : $('#fechaNacP').val(),
        direccion_persona : $('#direccionP').val(),
        telefono_persona : $('#telefonoP').val(),
        email_persona : $('#emailP').val(),
        inicio : 0,
        tamanhoPagina : 1
      }
  
        $.ajax({
        method: "POST",
        url: urlPeticionAjaxListarPersona,
        contentType : "application/x-www-form-urlencoded; charset=UTF-8",
        data: data,
        headers: {'Authorization': token},
        }).done(res => {
          if (res.code != 'BUSQUEDA_PERSONA_CORRECTO') {
            reject(res);
          }
          resolve(res);
        }).fail( function( jqXHR ) {
          errorFailAjax(jqXHR.status);
        });
    });
  }
  
  /** Función para añadir funcionalidades con ajax y promesas **/
  function buscarPersonaAjaxPromesa(numeroPagina, tamanhoPagina, accion){
    return new Promise(function(resolve, reject) {
      var token = getCookie('tokenUsuario');
  
      if(accion == "buscarModal"){
        if($('#fechaNacP').val() == '1900-01-01'){
          fechaNacP = "";
        }else{
          fechaNacP = $('#fechaNacP').val();
        }
        var data = {
          controlador: 'GestionPersonas',
          action: 'searchByParameters',
          dni_persona : $('#dniP').val(),
          nombre_persona : $('#nombreP').val(),
          apellidos_persona : $('#apellidosP').val(),
          fecha_nac_persona : fechaNacP,
          direccion_persona : $('#direccionP').val(),
          telefono_persona : $('#telefonoP').val(),
          email_persona : $('#emailP').val(),
          inicio : calculaInicio(numeroPagina, tamanhoPaginaPersona),
          tamanhoPagina : tamanhoPaginaPersona 
        }
      }
  
      if(accion == "buscarPaginacion"){
        if(getCookie('dni_persona') == null || getCookie('dni_persona') == ""){
          var dni = "";
        }else{
          var dni = getCookie('dni_persona');
        }
  
        if(getCookie('nombre_persona') == null || getCookie('nombre_persona') == ""){
          var nombre = "";
        }else{
          var nombre = getCookie('nombre_persona');
        }
        if(getCookie('apellidos_persona') == null || getCookie('apellidos_persona') == ""){
          var apellidos = "";
        }else{
          var apellidos = getCookie('apellidos_persona');
        }
  
        if(getCookie('fecha_nac_persona') == null || getCookie('fecha_nac_persona') == ""){
          var fecha = "";
        }else{
          var fecha = getCookie('fecha_nac_persona');
        }
        if(getCookie('direccion_persona') == null || getCookie('direccion_persona') == ""){
          var direccion = "";
        }else{
          var direccion = getCookie('direccion_persona');
        }
  
        if(getCookie('telefono_persona') == null || getCookie('telefono_persona') == ""){
          var telefono = "";
        }else{
          var telefono = getCookie('telefono_persona');
        }
        if(getCookie('email_persona') == null || getCookie('email_persona') == ""){
          var email = "";
        }else{
          var email = getCookie('email_persona');
        }
  
        var data = {
          controlador : 'GestionPersonas',
          action: 'searchByParameters',
          dni_persona : dni,
          nombre_persona : nombre,
          apellidos_persona : apellidos,
          fecha_nac_persona : fecha,
          direccion_persona : direccion,
          telefono_persona : telefono,
          email_persona : email,
          inicio : calculaInicio(numeroPagina, tamanhoPaginaPersona),
          tamanhoPagina : tamanhoPaginaPersona 
        }
      }
      
      $.ajax({
        method: "POST",
        url: urlPeticionAjaxListarPersona,
        contentType : "application/x-www-form-urlencoded; charset=UTF-8",
        data: data,
        headers: {'Authorization': token},
        }).done(res => {
          if (res.code != 'BUSQUEDA_PERSONA_CORRECTO') {
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
        controlador : 'GestionPersonas',
        action : 'searchDelete',
        inicio : calculaInicio(numeroPagina, tamanhoPaginaPersona),
        tamanhoPagina : tamanhoPaginaPersona
      }
      
      $.ajax({
        method: "POST",
        url: urlPeticionAjaxListarPersonasEliminadas,
        contentType : "application/x-www-form-urlencoded; charset=UTF-8",
        data: data,
        headers: {'Authorization': token},
        }).done(res => {
          if (res.code != 'BUSQUEDA_PERSONA_CORRECTO') {
            reject(res);
          }
          resolve(res);
        }).fail( function( jqXHR ) {
          errorFailAjax(jqXHR.status);
        });
    });
  }
  
  /** Funcion para mostrar el formulario para añadir una persona **/
  function showAddPersonas() {
  
      if($('#datosUser').hasClass('active')){
        $('#datosUser').removeClass('active');
      }
  
      if($('#datosUser').hasClass('show')){
        $('#datosUser').removeClass('show');
      }

      if($('#datosUsuario').hasClass('active')){
        $('#datosUsuario').removeClass('active');
      }

      if($('#datosUsuario').hasClass('show')){
        $('#datosUsuario').removeClass('show');
      }
  
      $('#datosPer').addClass('active');
      $('#datosPer').addClass('show');
      $('#datosPersonales').addClass('active');
      $('#datosPersonales').addClass('show');
  
  
    cambiarFormulario('ADD_PERSONA', 'javascript:addPersona();', 'return comprobarAddPersona();');
    cambiarOnBlurCampos('return comprobarDNI(\'dniP\', \'errorFormatoDni\', \'dniPersona\');', 
      'return comprobarNombre(\'nombreP\', \'errorFormatoNombrePersona\', \'nombrePersonaRegistro\');',
      'return comprobarApellidos(\'apellidosP\', \'errorFormatoApellidosP\', \'apellidosPersonaRegistro\');',
      'return comprobarFechaNacimiento(\'fechaNacP\', \'errorFormatoFecha\', \'fechaPersonaRegistro\');',
      'return comprobarDireccion(\'direccionP\', \'errorFormatoDireccion\', \'direccionPersonaRegistro\');',
      'return comprobarTelefono(\'telefonoP\', \'errorFormatoTelefono\', \'telefonoPersonaRegistro\');',
      'return comprobarEmail(\'emailP\', \'errorFormatoEmail\', \'emailPersonaRegistro\');',
      'return comprobarUser(\'usuario\', \'errorFormatoUserRegistro\', \'loginUsuario\');',
      'return comprobarPass(\'passwdUsuario1\', \'errorFormatoPassRegistro\', \'passwdUsuarioRegistro\');',
      'return comprobarPassRepetida(\'passwdUsuario2\', \'errorFormatoPassRegistro2\', \'passwdUsuarioRegistro\');',
      );
    cambiarIcono('images/add.png', 'ICONO_ADD', 'iconoAddPersona', 'Añadir');
  
    $('#subtitulo').attr('hidden', true);
    $('#labelDNI').attr('hidden', true);
    $('#labelNombrePersona').attr('hidden', true);
    $('#labelApellidosPersona').attr('hidden', true);
    $('#labelFechaNacimiento').attr('hidden', true);
    $('#labelDireccionPersona').attr('hidden', true);
    $('#labelTelefono').attr('hidden', true);
    $('#labelEmail').attr('hidden', true);
    $('#labelLoginUsuario').attr('hidden', true);
    $('#labelPassUsuario').attr('hidden', true);
    $('#labelPassUsuarioRepe').attr('hidden', true);
    $('#labelRolUsuario').attr('hidden', true);
    $('#labelActivo').attr('hidden', true);
    $('#esActivo').attr('hidden', true);
    $('#datosUser').attr('hidden', false);
    $('#rolUser').attr('hidden', true);
    $('#passwdUsuario1').attr('hidden', false);
    $('#passwdUsuario2').attr('hidden', false);
    
    let campos = ["dniP", "nombreP", "apellidosP", "fechaNacP", "direccionP", "telefonoP", "emailP", 
        "usuario", "passwdUsuario1", "passwdUsuario2"];
    let obligatorios = ["obligatorioDNI", "obligatorioNombre", "obligatorioApellidos", "obligatorioFechaNac", 
    "obligatorioDireccion", "obligatorioTelefono", "obligatorioEmail", "obligatorioUsuario", "obligatorioPass1", "obligatorioPass2"];
    let formatos = ["formatoDNI", "formatoEmail", "formatoTelf"];
    eliminarReadonly(campos);
    mostrarObligatorios(obligatorios);
    habilitaCampos(campos);
    muestraFormatos(formatos);
    setLang(getCookie('lang'));
  
  }
  
  /** Funcion para editar una persona **/
  function showEditar(dniP, nombreP, apellidosP,fechaNacP, direccionP, telefonoP, emailP, borradoP, usuario, rol, activo) {
  
      if($('#datosUser').hasClass('active')){
        $('#datosUser').removeClass('active');
      }

      if($('#datosUser').hasClass('show')){
        $('#datosUser').removeClass('show');
      }
  
      if($('#datosUsuario').hasClass('active')){
        $('#d#datosUsuario').removeClass('active');
      }
  
      if($('#datosUsuario').hasClass('show')){
        $('#datosUsuario').removeClass('show');
      }
  
      $('#datosPer').addClass('active');
      $('#datosPer').addClass('show');
      $('#datosPersonales').addClass('active');
      $('#datosPersonales').addClass('show');
  
      cambiarFormulario('EDIT_PERSONA', 'javascript:editPersona();', 'return comprobarEditPersona();');
      cambiarOnBlurCampos('return comprobarDNI(\'dniP\', \'errorFormatoDni\', \'dniPersona\');', 
      'return comprobarNombre(\'nombreP\', \'errorFormatoNombrePersona\', \'nombrePersonaRegistro\');',
      'return comprobarApellidos(\'apellidosP\', \'errorFormatoApellidosP\', \'apellidosPersonaRegistro\');',
      'return comprobarFechaNacimiento(\'fechaNacP\', \'errorFormatoFecha\', \'fechaPersonaRegistro\');',
      'return comprobarDireccion(\'direccionP\', \'errorFormatoDireccion\', \'direccionPersonaRegistro\');',
      'return comprobarTelefono(\'telefonoP\', \'errorFormatoTelefono\', \'telefonoPersonaRegistro\');',
      'return comprobarEmail(\'emailP\', \'errorFormatoEmail\', \'emailPersonaRegistro\');');
      cambiarIcono('images/edit.png', 'ICONO_EDIT', 'iconoEditarPersona', 'Editar');
      
      $('#subtitulo').attr('hidden', true);
      $('#labelDNI').attr('hidden', true);
      $('#labelNombrePersona').attr('hidden', true);
      $('#labelApellidosPersona').attr('hidden', true);
      $('#labelFechaNacimiento').attr('hidden', true);
      $('#labelDireccionPersona').attr('hidden', true);
      $('#labelTelefono').attr('hidden', true);
      $('#labelEmail').attr('hidden', true);
      $('#labelLoginUsuario').attr('hidden', true);
      $('#labelPassUsuario').attr('hidden', true);
      $('#labelPassUsuarioRepe').attr('hidden', true);
      $('#labelRolUsuario').attr('hidden', true);
      $('#labelActivo').attr('hidden', true);
      $('#esActivo').attr('hidden', true);
      $('#rolUser').attr('hidden', true);
      $('#datosUser').attr('hidden', true);
      $('#rolUser').attr('hidden', true);
      
      rellenarFormulario(dniP, nombreP, apellidosP, fechaNacP, direccionP, telefonoP, emailP, borradoP, usuario, rol, activo);
    
  
      let campos = ["dniP", "nombreP", "apellidosP", "fechaNacP", "direccionP", "telefonoP", "emailP", 
        "usuario", "passwdUsuario1", "passwdUsuario2"];
      let obligatorios = ["obligatorioDNI", "obligatorioNombre", "obligatorioApellidos", "obligatorioFechaNac", 
        "obligatorioDireccion", "obligatorioTelefono", "obligatorioEmail", "obligatorioUsuario", "obligatorioPass1", "obligatorioPass2"];
      let formatos = ["formatoDNI", "formatoEmail", "formatoTelf"];
  
      eliminarReadonly(campos);
      mostrarObligatorios(obligatorios);
      habilitaCampos(campos);
      deshabilitaCampos(["dniP"]);
      anadirReadonly(["dniP"]);
      muestraFormatos(formatos);
      setLang(getCookie('lang'));
  
  }
  
  /** Función para eliminar una persona **/
  function showEliminar(dniP, nombreP, apellidosP,fechaNacP, direccionP, telefonoP, emailP, borradoP, usuario, rol, activo) {
  
       if($('#datosUser').hasClass('active')){
        $('#datosUser').removeClass('active');
      }

      if($('#datosUser').hasClass('show')){
        $('#datosUser').removeClass('show');
      }

      if($('#datosUsuario').hasClass('active')){
        $('#d#datosUsuario').removeClass('active');
      }
  
      if($('#datosUsuario').hasClass('show')){
        $('#datosUsuario').removeClass('show');
      }
  
      $('#datosPer').addClass('active');
      $('#datosPer').addClass('show');
      $('#datosPersonales').addClass('active');
      $('#datosPersonales').addClass('show');
  
      cambiarFormulario('DELETE_PERSONA', 'javascript:deletePersona();', '');
      cambiarIcono('images/delete.png', 'ICONO_ELIMINAR', 'iconoEliminar', 'Eliminar');
  
      $('#subtitulo').attr('hidden', false);
      $('#labelDNI').attr('hidden', false);
      $('#labelNombrePersona').attr('hidden', false);
      $('#labelApellidosPersona').attr('hidden', false);
      $('#labelFechaNacimiento').attr('hidden', false);
      $('#labelDireccionPersona').attr('hidden', false);
      $('#labelTelefono').attr('hidden', false);
      $('#labelEmail').attr('hidden', false);
      $('#labelLoginUsuario').attr('hidden', false);
      $('#labelPassUsuario').attr('hidden', true);
      $('#labelPassUsuarioRepe').attr('hidden', true);
      $('#passwdUsuario1').attr('hidden', true);
      $('#passwdUsuario2').attr('hidden', true);
      $('#labelRolUsuario').attr('hidden', false);
      $('#labelActivo').attr('hidden', false);
      $('#esActivo').attr('hidden', false);
      $('#rolUser').attr('hidden', false);
      $('#datosUser').attr('hidden', false);
      $('#rolUser').attr('hidden', false);
      $('#datosPersonales').attr('hidden', false);
  
     rellenarFormulario(dniP, nombreP, apellidosP, fechaNacP, direccionP, telefonoP, emailP, borradoP, usuario, rol, activo);
      
  
      let campos = ["dniP", "nombreP", "apellidosP", "fechaNacP", "direccionP", "telefonoP", "emailP", 
        "usuario", "passwdUsuario1", "passwdUsuario2", "rolUser", "esActivo"];
      let obligatorios = ["obligatorioDNI", "obligatorioNombre", "obligatorioApellidos", "obligatorioFechaNac", 
        "obligatorioDireccion", "obligatorioTelefono", "obligatorioEmail", "obligatorioUsuario", "obligatorioPass1", "obligatorioPass2"];
      let formatos = ["formatoDNI", "formatoEmail", "formatoTelf"];
      anadirReadonly(campos);
      ocultarObligatorios(obligatorios);
      deshabilitaCampos(campos);
      anadirReadonly(campos);
      ocultaFormatos(formatos);
      setLang(getCookie('lang'));
  
  }
  
  /** Funcion para visualizar una persona **/
  function showDetalle(dniP, nombreP, apellidosP,fechaNacP, direccionP, telefonoP, emailP, borradoP, usuario, rol, activo) {
  
      if($('#datosUser').hasClass('active')){
        $('#datosUser').removeClass('active');
      }
      if($('#datosUser').hasClass('show')){
        $('#datosUser').removeClass('show');
      }

      if($('#datosUsuario').hasClass('active')){
        $('#d#datosUsuario').removeClass('active');
      }
  
      if($('#datosUsuario').hasClass('show')){
        $('#datosUsuario').removeClass('show');
      }
  
      $('#datosPer').addClass('active');
      $('#datosPer').addClass('show');
      $('#datosPersonales').addClass('active');
      $('#datosPersonales').addClass('show');
  
      cambiarFormulario('DETAIL_PERSONA', 'javascript:detallePersona();', '');
      cambiarIcono('images/close2.png', 'ICONO_CERRAR', 'iconoCerrar', 'Detalle');
  
      $('#subtitulo').attr('hidden', false);
      $('#labelDNI').attr('hidden', false);
      $('#labelNombrePersona').attr('hidden', false);
      $('#labelApellidosPersona').attr('hidden', false);
      $('#labelFechaNacimiento').attr('hidden', false);
      $('#labelDireccionPersona').attr('hidden', false);
      $('#labelTelefono').attr('hidden', false);
      $('#labelEmail').attr('hidden', false);
      $('#labelLoginUsuario').attr('hidden', false);
      $('#labelPassUsuario').attr('hidden', true);
      $('#labelPassUsuarioRepe').attr('hidden', true);
      $('#passwdUsuario1').attr('hidden', true);
      $('#passwdUsuario2').attr('hidden', true);
      $('#labelRolUsuario').attr('hidden', false);
      $('#labelActivo').attr('hidden', false);
      $('#esActivo').attr('hidden', false);
      $('#rolUser').attr('hidden', false);
      $('#datosUser').attr('hidden', false);
      $('#rolUser').attr('hidden', false);

      rellenarFormulario(dniP, nombreP, apellidosP, fechaNacP, direccionP, telefonoP, emailP, borradoP, usuario, rol, activo);
  
      let campos = ["dniP", "nombreP", "apellidosP", "fechaNacP", "direccionP", "telefonoP", "emailP", 
        "usuario", "passwdUsuario1", "passwdUsuario2", "rolUser", "esActivo"];
      let obligatorios = ["obligatorioDNI", "obligatorioNombre", "obligatorioApellidos", "obligatorioFechaNac", 
        "obligatorioDireccion", "obligatorioTelefono", "obligatorioEmail", "obligatorioUsuario", "obligatorioPass1", "obligatorioPass2"];
      let formatos = ["formatoDNI", "formatoEmail", "formatoTelf"];
  
      anadirReadonly(campos);
      ocultarObligatorios(obligatorios);
      deshabilitaCampos(campos);
      anadirReadonly(campos);
      ocultaFormatos(formatos);
      setLang(getCookie('lang'));
  
  }
  
  /** Funcion para buscar una persona **/
  function showBuscarPersona() {
  
      if($('#datosUser').hasClass('active')){
        $('#datosUser').removeClass('active');
      }

      if($('#datosUser').hasClass('show')){
        $('#datosUser').removeClass('show');
      }

      if($('#datosUsuario').hasClass('active')){
        $('#d#datosUsuario').removeClass('active');
      }
  
      if($('#datosUsuario').hasClass('show')){
        $('#datosUsuario').removeClass('show');
      }

  
      $('#datosPer').addClass('active');
      $('#datosPer').addClass('show');
      $('#datosPersonales').addClass('active');
      $('#datosPersonales').addClass('show');
  
     cambiarFormulario('SEARCH_PERSONA', 'javascript:buscarPersona(0,' + tamanhoPaginaPersona + ', \'buscarModal\'' + ',\'PaginadorNo\');', 'return comprobarBuscarPersona();');
     cambiarOnBlurCampos('return comprobarDNISearch(\'dniP\', \'errorFormatoDni\', \'dniPersona\');', 
      'return comprobarNombreSearch(\'nombreP\', \'errorFormatoNombrePersona\', \'nombrePersonaRegistro\');',
      'return comprobarApellidosSearch(\'apellidosP\', \'errorFormatoApellidosP\', \'apellidosPersonaRegistro\');',
      'return comprobarFechaInicioSearch(\'fechaNacP\', \'errorFormatoFecha\', \'fechaPersonaRegistro\');',
      'return comprobarDireccionSearch(\'direccionP\', \'errorFormatoDireccion\', \'direccionPersonaRegistro\');',
      'return comprobarTelefonoSearch(\'telefonoP\', \'errorFormatoTelefono\', \'telefonoPersonaRegistro\');',
      'return comprobarEmailSearch(\'emailP\', \'errorFormatoEmail\', \'emailPersonaRegistro\');');
    cambiarIcono('images/search.png', 'ICONO_SEARCH', 'iconoSearchPersona', 'Buscar');
  
      $('#subtitulo').attr('hidden', true);
      $('#labelDNI').attr('hidden', true);
      $('#labelNombrePersona').attr('hidden', true);
      $('#labelApellidosPersona').attr('hidden', true);
      $('#labelFechaNacimiento').attr('hidden', true);
      $('#labelDireccionPersona').attr('hidden', true);
      $('#labelTelefono').attr('hidden', true);
      $('#labelEmail').attr('hidden', true);
      $('#labelLoginUsuario').attr('hidden', true);
      $('#labelPassUsuario').attr('hidden', true);
      $('#labelPassUsuarioRepe').attr('hidden', true);
      $('#datosUser').attr('hidden', true);
  
    let campos = ["dniP", "nombreP", "apellidosP", "fechaNacP", "direccionP", "telefonoP", "emailP"];
      let obligatorios = ["obligatorioDNI", "obligatorioNombre", "obligatorioApellidos", "obligatorioFechaNac", 
      "obligatorioDireccion", "obligatorioTelefono", "obligatorioEmail"];
    eliminarReadonly(campos);
    ocultarObligatorios(obligatorios);
    habilitaCampos(campos);
    setLang(getCookie('lang'));
  
  }
  
  
  /*Función que comprueba los permisos del usuario sobre la funcionalidad*/
  async function cargarPermisosFuncPersona(){
    await cargarPermisosFuncPersonaAjaxPromesa()
    .then((res) => {
      gestionarPermisosPersona(res.resource);
      setLang(getCookie('lang'));
      }).catch((res) => {
        respuestaAjaxKO(res.code);
        setLang(getCookie('lang'));
        document.getElementById("modal").style.display = "block";
    });
  }
  
  /*Función que comprueba los permisos del usuario sobre la funcionalidad*/
  async function cargarPermisosFuncEmpresaPersona(){
    await cargarPermisosFuncEmpresaPersonaAjaxPromesa()
    .then((res) => {
      gestionarPermisosEmpresaPersona(res.resource);
      setLang(getCookie('lang'));
      }).catch((res) => {
        respuestaAjaxKO(res.code);
        setLang(getCookie('lang'));
        document.getElementById("modal").style.display = "block";
    });
  }
  
  /** Función para recuperar los permisos de un usuario sobre la funcionalidad **/
  function cargarPermisosFuncPersonaAjaxPromesa(){
    return new Promise(function(resolve, reject) {
      var nombreUsuario = getCookie('usuario');
      var token = getCookie('tokenUsuario');
      
      var usuario = nombreUsuario;
     
      var data = {
        controlador : 'GestionACL',
        action: 'searchAccionesPorFuncionalidadUsuario',
        usuario : usuario,
        nombre_funcionalidad : 'Gestión de personas'
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
  function gestionarPermisosPersona(idElementoList) {
    idElementoList.forEach( function (idElemento) {
      switch(idElemento.nombre_accion){
        case "Añadir":
          $('#btnAddPersona').attr('src', 'images/add3.png');
          $('#btnAddPersona').css("cursor", "pointer");
          $('#divAddPersona').attr("data-toggle", "modal");
          $('#divAddPersona').attr("data-target", "#form-modal");
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
          $('#btnListarPersona').attr('src', 'images/search3.png');
          $('#btnSearchDelete').attr('src', 'images/searchDelete3.png');
          $('#btnListarPersona').css("cursor", "pointer");
          $('.iconoSearchDelete').css("cursor", "pointer");
          $('#divListarPersonas').attr("data-toggle", "modal");
          $('#divSearchDelete').attr("onclick", "javascript:buscarEliminados(0, \'tamanhoPaginaPersona\', \'PaginadorNo\')");
          $('#divListarPersonas').attr("data-target", "#form-modal");
           $('#divListarPersonas').attr("onclick", "javascript:showBuscarPersona()");
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
  
  /**Función que rellenado los datos del formulario*/
  function rellenarFormulario(dniP, nombreP, apellidosP, fechaNacP, direccionP, telefonoP, emailP, borradoP, usuario, rol, activo) {
  
      $("#dniP").val(dniP);
      $("#nombreP").val(nombreP);
      $("#apellidosP").val(apellidosP);
      var fecha = fechaNacP.split('-');
      var fech = fecha[2] + "-" + fecha[1] + "-" + fecha[0]; 
      $("#fechaNacP").val(fech); 
      $("#direccionP").val(direccionP);  
      $("#telefonoP").val(telefonoP); 
      $("#emailP").val(emailP); 
      $('#usuario').val(usuario);
      $('#passwdUsuario1').val('pass');
      $('#passwdUsuario2').val('pass');
      $('#rolUser').val(rol);
      if(activo == 0){
        $('#esActivo').val('Sí');
      }else{
        $('#esActivo').val('No');
      }
  
      setLang(getCookie('lang'));
  
  }
  
  /**Función para cambiar onBlur de los campos*/
  function cambiarOnBlurCampos(onBlurDNI, onBlurNombrePersona, onBlurApellidosPersona, onBlurFechaNacimiento, onBlurDireccion, 
                                onBlurTelefono, onBlurEmail, onBlurUser, onBlurPass, onBlurPassRepetida) {
      
      if (onBlurDNI != ''){
          $("#dniP").attr('onblur', onBlurDNI);
      }
  
      if (onBlurNombrePersona != ''){
          $("#nombreP").attr('onblur', onBlurNombrePersona);
      }
  
      if(onBlurApellidosPersona != ''){
          $("#apellidosP").attr('onblur', onBlurApellidosPersona);
      }
  
      if(onBlurFechaNacimiento != ''){
          $("#fechaNacP").attr('onblur', onBlurFechaNacimiento);
      }
  
      if(onBlurDireccion != ''){
          $("#direccionP").attr('onblur', onBlurDireccion);
      }
  
      if(onBlurTelefono != ''){
          $("#telefonoP").attr('onblur', onBlurTelefono);
      }
  
      if(onBlurEmail!= ''){
          $("#emailP").attr('onblur', onBlurEmail);
      }
  
      if(onBlurUser!= ''){
          $("#usuario").attr('onblur', onBlurUser);
      }
  
      if(onBlurPass!= ''){
          $("#passwdUsuario1").attr('onblur', onBlurPass);
      }
  
      if(onBlurPassRepetida!= ''){
          $("#passwdUsuario2").attr('onblur', onBlurPassRepetida);
      }
  
      setLang(getCookie('lang'));
  }
  
  function cargaDatosPersona(datos){
     var fechaNacimiento = new Date(datos[0].persona.fecha_nac_persona);
  
    var atributosFunciones = ["'" + datos[0].persona.dni_persona + "'", "'" + datos[0].persona.nombre_persona + "'", "'" + datos[0].persona.apellidos_persona + "'", "'" + convertirFecha(fechaNacimiento.toString()) + "'",
            "'" + datos[0].persona.direccion_persona + "'", "'" + datos[0].persona.telefono_persona + "'", "'" + datos[0].persona.email_persona + "'", 
            "'" + datos[0].persona.borrado_persona + "'", "'" + datos[0].usuario.usuario + "'", "'" + datos[0].rol.nombre_rol + "'", "'" + datos[0].usuario.borrado_usuario + "'"]; 
    
      
    $('#cardPersona').html('');
  
       var fecha = new Date(datos[0].persona.fecha_nac_persona);
  
       var cardPersona = '<img class="card-img-top" src="images/users.png" alt="Card image" style="width:100%">' + 
                               '<div class="card-body">' + 
                                   '<div class="nombreApellidosInfo">' + 
                                       '<img class="nombreApellidosImg" src="images/users.png" alt="nombreApellidos">' + 
                                           '<h4 class="card-title nombreApellidos">' + datos[0].persona.nombre_persona + " " + datos[0].persona.apellidos_persona + '</h4>' +
                                   '</div>' + 
                                   '<div class="dniPInfo">' +
                                       '<img class="dniPImg" src="images/dni.png" alt="dniP">' + 
                                       '<p class="card-text dniP">' +  datos[0].persona.dni_persona + '</p>' + 
                                   '</div>' + 
                                   '<div class="fechaNacimientoInfo">' + 
                                       '<img class="fechaNacimientoImg" src="images/cumpleanhos.png" alt="fechaNacimiento">' + 
                                       '<p class="card-text fechaNacimiento">'+ convertirFecha(fecha.toString()) + '</p>' + 
                                   '</div>' + 
                                   '<div class="direccionInfo">' + 
                                       '<img class="direccionImg" src="images/direccion.png" alt="direccion">' + 
                                       '<p class="card-text direccion">' + datos[0].persona.direccion_persona + '</p>' + 
                                   '</div>' + 
                                   '<div class="telefonoInfo">' + 
                                       '<img class="telefonoImg" src="images/telefono.png" alt="telefono">' + 
                                       '<p class="card-text telefono">' + datos[0].persona.telefono_persona + '</p>' + 
                                   '</div>' +
                                   '<div class="emailInfo">' + 
                                       '<img class="emailImg" src="images/email.png" alt="email">' + 
                                       '<p class="card-text email">' + datos[0].persona.email_persona + '</p>' + 
                                   '</div>' + 
                                   '<div class="tooltip">' + 
                                       '<img class="editarCard editarPermiso" src="images/edit.png" data-toggle="" data-target="" onclick="showEditar(' + atributosFunciones + 
                                 ')" alt="Editar"/>' + 
                                       '<span class="tooltiptext iconEditUser ICONO_EDIT">Editar</span>' + 
                                   '</div>' + 
                               '</div>';
  
           $('#cardPersona').append(cardPersona);
        setLang(getCookie('lang'));
  }
  
  function cargaDatosUsuario(datos){
      $('#cardUsuario').html('');
  
       var cardUsuario = '<img class="card-img-top" src="images/user.png" alt="Card image">' + 
                               '<div class="card-body">' + 
                                   '<div class="userInfo">' + 
                                       '<img class="userImg" src="images/user.png" alt="usuario">' + 
                                       '<h4 class="card-title user">' + datos[0].usuario.usuario + '</h4>' + 
                                   '</div>' + 
                                   '<div class="dniInfo">' + 
                                       '<img class="dniImg" src="images/dni.png" alt="dni">' + 
                                       '<p class="card-text dni">' + datos[0].usuario.dni_usuario + '</p>' + 
                                   '</div>' +
                                   '<div class="passInfo">' + 
                                       '<img class="passImg" src="images/pass.png" alt="pass">' + 
                                       '<p class="card-text pass">************</p>' + 
                                   '</div>' + 
                                   '<div class="rolInfo">' + 
                                       '<img class="rolImg" src="images/rol.png" alt="rol">'  +
                                       '<p class="card-text rol">' + datos[0].rol.nombre_rol + '</p>' +
                                   '<div>' + 
                               '<div>';
  
  
       $('#cardUsuario').append(cardUsuario);
       setLang(getCookie('lang'));
  }
  
  $(document).ready(function() {
    $("#form-modal").on('hidden.bs.modal', function() {
  
      let idElementoErrorList = ["errorFormatoDni", "errorFormatoNombrePersona", "errorFormatoApellidosP", "errorFormatoFecha", "errorFormatoDireccion", "errorFormatoTelefono",
        "errorFormatoEmail", "errorFormatoUserRegistro", "errorFormatoPassRegistro", "errorFormatoPassRegistro2","bloqueoMayusculasRegistro"];
      
      let idElementoList = ["dniP", "nombreP", "apellidosP", "fechaNacP", "direccionP", "telefonoP", "emailP", "usuario", "passwdUsuario1", "passwdUsuario2"];
  
      let iconos = ["iconoTabDatosPersonales", "iconoTabDatosUsuario"];
  
      limpiarFormulario(idElementoList);
     
      $('#error').removeClass();
      $("#error").html('');
      $("#error").css("display", "none");
      
      $('#iconoTabDatosPersonales').attr('hidden',true);
      $('#iconoTabDatosUsuario').attr('hidden',true);
  
      eliminarMensajesValidacionError(idElementoErrorList, idElementoList);
      ocultarIconoErroresTabs(iconos);
      setLang(getCookie('lang'));
     
    });
  
  });
  
  
  
  
  
  
  
  
  
  
  