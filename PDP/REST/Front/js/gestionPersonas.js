/** Función para cargar los datos de persona **/
  async function cargarPersonas(numeroPagina, tamanhoPagina, paginadorCreado){
      if(getCookie('rolUsuario') == "usuario" || getCookie('rolUsuario') == "gestor"){
          await cargarDatosPersonaAjaxPromesa()
            .then((res) => {
          cargarPermisosFuncPersona();
          cargarPermisosFuncEmpresaPersona();
                 $('#personaInfoParaAdmin').attr('hidden', true);
                 $('#personaInfoParaUsuario').attr('hidden', false);
               cargaDatosPersona(res.data.listaBusquedas);
               cargaDatosUsuario(res.data.listaBusquedas);
           cargaDatosEmpresa(res.data.listaBusquedas);
          
            
            setLang(getCookie('lang'));
            }).catch((res) => {
                respuestaAjaxKO(res.code);
  
                setLang(getCookie('lang'));
  
                document.getElementById("modal").style.display = "block";
            });
      }else if(getCookie('rolUsuario') == "admin"){
          await cargarPersonasAjaxPromesa(numeroPagina, tamanhoPagina)
              .then((res) => {
                  $('#personaInfoParaAdmin').attr('hidden', false);
                  $('#personaInfoParaUsuario').attr('hidden', true);
                        var numResults = res.data.numResultados + '';
                  var totalResults = res.data.tamanhoTotal + '';
                  var inicio = 0;
                  if(res.data.listaBusquedas.length == 0){
                      inicio = 0;
                  }else{
                      inicio = parseInt(res.data.inicio)+1;
                  }
                  var textPaginacion = inicio + " - " + (parseInt(res.data.inicio)+parseInt(numResults))  + " total " + totalResults;
          
                  $("#datosPersona").html("");
                  $("#checkboxColumnas").html("");
                  $("#paginacion").html("");
              
                  for (var i = 0; i < res.data.listaBusquedas.length; i++){
                      var tr = construyeFila('PERSONA', res.data.listaBusquedas[i]);
                      $("#datosPersona").append(tr);
                  }
          
                  var div = createHideShowColumnsWindow({NOMBRE_PERSONA_COLUMN:2, APELLIDOS_PERSONA_COLUMN:3,
                                                          EMAIL_COLUMN: 4,LOGIN_USUARIO_COLUMN:5, NOMBRE_EMPRESA_COLUMN: 6});
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
  
        document.getElementById("cabecera").style.display = "block";
  
        $("#datosPersona").html("");
        $("#checkboxColumnas").html("");
        $("#paginacion").html("");
          for (var i = 0; i < res.data.listaBusquedas.length; i++){
            var tr = construyeFila('PERSONA', res.data.listaBusquedas[i]);
            $("#datosPersona").append(tr);
          }
        
        var div = createHideShowColumnsWindow({NOMBRE_PERSONA_COLUMN:2, APELLIDOS_PERSONA_COLUMN:3,
                                                          EMAIL_COLUMN: 4,LOGIN_USUARIO_COLUMN:5, NOMBRE_EMPRESA_COLUMN: 6});
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
        "usuario", "passwdUsuario1", "passwdUsuario2", "cifEmpresa", "nombreEmpresa", "direccionEmpresa", "telefonoEmpresa"];
        let idElementosRadioButtons = ["asociarEmpresaSi", "asociarEmpresaNo", "seleccionarEmpresaSi", "seleccionarEmpresaNo"];
      
        resetearFormulario("formularioGenerico", idElementoList);
        limpiaRadioButton(idElementosRadioButtons);
  
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
      "usuario", "passwdUsuario1", "passwdUsuario2", "cifEmpresa", "nombreEmpresa", "direccionEmpresa", "telefonoEmpresa"];
      let idElementosRadioButtons = ["asociarEmpresaSi", "asociarEmpresaNo", "seleccionarEmpresaSi", "seleccionarEmpresaNo"];
      
      resetearFormulario("formularioGenerico", idElementoList);
      limpiaRadioButton(idElementosRadioButtons);
    
      
      $('#dniP').val(getCookie('dniP'));
      $('#nombreP').val(getCookie('nombreP'));
      $('#apellidosP').val(getCookie('apellidosP'));
      $('#direccionP').val(getCookie('direccionP'));
      $('#fechaNacP').val(getCookie('fechaNacP'));
      $('#telefonoP').val(getCookie('telefonoP'));
      $('#emailP').val(getCookie('emailP'));
      $('#direccionP').val(getCookie('direccionP'));
      $('#usuario').val(getCookie('usuario'));
      $('#cifEmpresa').val(getCookie('cifEmpresa'));
      $('#nombreEmpresa').val(getCookie('nombreEmpresa'));
      $('#direccionEmpresa').val(getCookie('direccionEmpresa'));
      $('#telefonoEmpresa').val(getCookie('telefonoEmpresa'));
      
      buscarPersona(getCookie('numeroPagina'), tamanhoPaginaPersona, 'buscarPaginacion', 'PaginadorNo');
      setLang(getCookie('lang'));
  
    }).catch((res) => {
        $("#form-modal").modal('toggle');
  
        respuestaAjaxKO(res.code);
  
        let idElementoList = ["dniP", "nombreP", "apellidosP", "fechaNacP", "direccionP", "telefonoP", "emailP", 
        "usuario", "passwdUsuario1", "passwdUsuario2", "cifEmpresa", "nombreEmpresa", "direccionEmpresa", "telefonoEmpresa"];
        let idElementosRadioButtons = ["asociarEmpresaSi", "asociarEmpresaNo", "seleccionarEmpresaSi", "seleccionarEmpresaNo"];
      
        resetearFormulario("formularioGenerico", idElementoList);
        limpiaRadioButton(idElementosRadioButtons);
  
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
        "usuario", "passwdUsuario1", "passwdUsuario2", "cifEmpresa", "nombreEmpresa", "direccionEmpresa", "telefonoEmpresa"];
      let idElementosRadioButtons = ["asociarEmpresaSi", "asociarEmpresaNo", "seleccionarEmpresaSi", "seleccionarEmpresaNo"];
      
      resetearFormulario("formularioGenerico", idElementoList);
      limpiaRadioButton(idElementosRadioButtons);
  
      document.getElementById("modal").style.display = "block";
      $('#dniP').val(getCookie('dniP'));
      $('#nombreP').val(getCookie('nombreP'));
      $('#apellidosP').val(getCookie('apellidosP'));
      $('#direccionP').val(getCookie('direccionP'));
      $('#fechaNacP').val(getCookie('fechaNacP'));
      $('#telefonoP').val(getCookie('telefonoP'));
      $('#emailP').val(getCookie('emailP'));
      $('#direccionP').val(getCookie('direccionP'));
      $('#usuario').val(getCookie('usuario'));
      $('#cifEmpresa').val(getCookie('cifEmpresa'));
      $('#nombreEmpresa').val(getCookie('nombreEmpresa'));
      $('#direccionEmpresa').val(getCookie('direccionEmpresa'));
      $('#telefonoEmpresa').val(getCookie('telefonoEmpresa'));
  
      if(getCookie('rolUsuario') == "admin"){
        buscarPersona(getCookie('numeroPagina'), tamanhoPaginaPersona, 'buscarPaginacion', 'PaginadorCreado');
      }else{
        cargarPersonas(getCookie('numeroPagina'), tamanhoPaginaPersona, 'PaginadorCreado');
      }
  
      setLang(getCookie('lang'));
  
    }).catch((res) => {
      $("#form-modal").modal('toggle');
  
      respuestaAjaxKO(res.code);
  
      let idElementoList = ["dniP", "nombreP", "apellidosP", "fechaNacP", "direccionP", "telefonoP", "emailP", 
        "usuario", "passwdUsuario1", "passwdUsuario2", "cifEmpresa", "nombreEmpresa", "direccionEmpresa", "telefonoEmpresa"];
      let idElementosRadioButtons = ["asociarEmpresaSi", "asociarEmpresaNo", "seleccionarEmpresaSi", "seleccionarEmpresaNo"];
      
      resetearFormulario("formularioGenerico", idElementoList);
      limpiaRadioButton(idElementosRadioButtons);
  
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
        "usuario", "passwdUsuario1", "passwdUsuario2", "cifEmpresa", "nombreEmpresa", "direccionEmpresa", "telefonoEmpresa"];
      let idElementosRadioButtons = ["asociarEmpresaSi", "asociarEmpresaNo", "seleccionarEmpresaSi", "seleccionarEmpresaNo"];
      
      resetearFormulario("formularioGenerico", idElementoList);
      limpiaRadioButton(idElementosRadioButtons);
      document.getElementById("modal").style.display = "block";
     
      refrescarTabla(0, tamanhoPaginaPersona);
      setLang(getCookie('lang'));
  
    }).catch((res) => {
       
       $("#form-modal").modal('toggle');
        respuestaAjaxKO(res.code);
  
        let idElementoList = ["dniP", "nombreP", "apellidosP", "fechaNacP", "direccionP", "telefonoP", "emailP", 
          "usuario", "passwdUsuario1", "passwdUsuario2", "cifEmpresa", "nombreEmpresa", "direccionEmpresa", "telefonoEmpresa"];
        let idElementosRadioButtons = ["asociarEmpresaSi", "asociarEmpresaNo", "seleccionarEmpresaSi", "seleccionarEmpresaNo"];
      
        resetearFormulario("formularioGenerico", idElementoList);
        limpiaRadioButton(idElementosRadioButtons);
  
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
          "usuario", "passwdUsuario1", "passwdUsuario2", "cifEmpresa", "nombreEmpresa", "direccionEmpresa", "telefonoEmpresa"];
      let idElementosRadioButtons = ["asociarEmpresaSi", "asociarEmpresaNo", "seleccionarEmpresaSi", "seleccionarEmpresaNo"];
      
      resetearFormulario("formularioGenerico", idElementoList);
      limpiaRadioButton(idElementosRadioButtons);
      
      $('#dniP').val(getCookie('dniP'));
      $('#nombreP').val(getCookie('nombreP'));
      $('#apellidosP').val(getCookie('apellidosP'));
      $('#direccionP').val(getCookie('direccionP'));
      $('#fechaNacP').val(getCookie('fechaNacP'));
      $('#telefonoP').val(getCookie('telefonoP'));
      $('#emailP').val(getCookie('emailP'));
      $('#direccionP').val(getCookie('direccionP'));
      $('#usuario').val(getCookie('usuario'));
      $('#cifEmpresa').val(getCookie('cifEmpresa'));
      $('#nombreEmpresa').val(getCookie('nombreEmpresa'));
      $('#direccionEmpresa').val(getCookie('direccionEmpresa'));
      $('#telefonoEmpresa').val(getCookie('telefonoEmpresa'));
      setLang(getCookie('lang'));
  
    }).catch((res) => {
        $("#form-modal").modal('toggle');
  
        respuestaAjaxKO(res.code);
  
        let idElementoList = ["dniP", "nombreP", "apellidosP", "fechaNacP", "direccionP", "telefonoP", "emailP", 
          "usuario", "passwdUsuario1", "passwdUsuario2", "cifEmpresa", "nombreEmpresa", "direccionEmpresa", "telefonoEmpresa"];
        let idElementosRadioButtons = ["asociarEmpresaSi", "asociarEmpresaNo", "seleccionarEmpresaSi", "seleccionarEmpresaNo"];
      
        resetearFormulario("formularioGenerico", idElementoList);
        limpiaRadioButton(idElementosRadioButtons);
        
        setLang(getCookie('lang'));
  
        document.getElementById("modal").style.display = "block";
    });
  }
  
  /*Función que refresca la tabla por si hay algún cambio en BD */
  async function refrescarTabla(numeroPagina, tamanhoPagina){
    await cargarPersonasAjaxPromesa(numeroPagina, tamanhoPagina)
    .then((res) => {
        cargarPermisosFuncPersona();
        setCookie('dniP', '');
        setCookie('nombreP', '');
        setCookie('apellidosP', '');
        setCookie('fechaNacP', '');
        setCookie('direccionP', '');
        setCookie('telefonoP', '');
        setCookie('emailP', '');
        setCookie('cifEmpresa', '');
        setCookie('nombreEmpresa', '');
        setCookie('direccionEmpresa', '');
        setCookie('telefonoEmpresa', '');
        var numResults = res.data.numResultados + '';
        var totalResults = res.data.tamanhoTotal + '';
        var inicio = 0;
        if(res.data.listaBusquedas.length == 0){
          inicio = 0;
        }else{
          inicio = parseInt(res.data.inicio)+1;
        }
        var textPaginacion = inicio + " - " + (parseInt(res.data.inicio)+parseInt(numResults))  + " total " + totalResults;
        
        $("#datosPersona").html("");
        $("#checkboxColumnas").html("");
        $("#paginacion").html("");
          for (var i = 0; i < res.data.listaBusquedas.length; i++){
            var tr = construyeFila('PERSONA', res.data.listaBusquedas[i]);
            $("#datosPersona").append(tr);
          }
        
        var div = createHideShowColumnsWindow({NOMBRE_PERSONA_COLUMN:2, APELLIDOS_PERSONA_COLUMN:3,
                                                          EMAIL_COLUMN: 4,LOGIN_USUARIO_COLUMN:5, NOMBRE_EMPRESA_COLUMN: 6});
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
            document.getElementById("cabecera").style.display = "none";
            document.getElementById("cabeceraEliminados").style.display = "block";
        }
  
        document.getElementById("cabeceraEliminados").style.display = "block";
  
        $("#datosPersona").html("");
        $("#checkboxColumnas").html("");
        $("#paginacion").html("");
          for (var i = 0; i < res.data.listaBusquedas.length; i++){
            var tr = construyeFilaEliminados('PERSONA', res.data.listaBusquedas[i]);
            $("#datosPersona").append(tr);
          }
        
       var div = createHideShowColumnsWindow({NOMBRE_PERSONA_COLUMN:2, APELLIDOS_PERSONA_COLUMN:3,
                                                          EMAIL_COLUMN: 4,LOGIN_USUARIO_COLUMN:5, NOMBRE_EMPRESA_COLUMN: 6});
        $("#checkboxColumnas").append(div);
        $("#paginacion").append(textPaginacion);
  
        setCookie('dniP', '');
        setCookie('nombreP', '');
        setCookie('apellidosP', '');
        setCookie('fechaNacP', '');
        setCookie('direccionP', '');
        setCookie('telefonoP', '');
        setCookie('emailP', '');
        setCookie('cifEmpresa', '');
        setCookie('nombreEmpresa', '');
        setCookie('direccionEmpresa', '');
        setCookie('telefonoEmpresa', '');
  
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
        usuario : getCookie('usuario'),
        inicio : 0,
        tamanhoPagina : 1
      }
      
      $.ajax({
        method: "POST",
        url: urlPeticionAjaxListarPersonaPorUsuario,
        contentType : "application/json",
        data: JSON.stringify(data),  
        dataType : 'json',
        headers: {'Authorization': token},
        }).done(res => {
          if (res.code != 'PERSONAS_LISTADAS') {
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
        inicio : calculaInicio(numeroPagina, tamanhoPaginaPersona),
        tamanhoPagina : tamanhoPaginaPersona
      }
      
      $.ajax({
        method: "POST",
        url: urlPeticionAjaxListarTodasPersonas,
        contentType : "application/json",
        data: JSON.stringify(data),  
        dataType : 'json',
        headers: {'Authorization': token},
        }).done(res => {
          if (res.code != 'PERSONAS_LISTADAS') {
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
  
          var personaEntity = {
            dniP : $('#dniP').val(),
            nombreP : $('#nombreP').val(),
            apellidosP : $('#apellidosP').val(),
            fechaNacP : $('#fechaNacP').val(),
            direccionP : $('#direccionP').val(),
            telefonoP : $('#telefonoP').val(),
            emailP : $('#emailP').val(),
            borradoP : 0
          }
          
          var usuarioEntity = {
            dniUsuario : $('#dniP').val(),
            usuario : $('#usuario').val(),
            passwdUsuario : $('#passwdUsuario1').val(),
            borradoUsuario : 0,
            rol:{
              idRol : 2,
              rolName : "usuario",
              rolDescription : "Contendrá a todos los usuarios de la aplicación",
              borradoRol : 0
            }
          }
  
        var asociarEmpresa = $('input[name=asociarEmpresa]:checked').val();
        var seleccionarEmpresaPregunta = $('input[name=seleccionarEmpresa]:checked').val();
  
        if (asociarEmpresa === 'si' && seleccionarEmpresaPregunta === 'si') {
  
          var empresaEntity = {
            idEmpresa: $('#empresasDisponibles option:selected').val(),
            cifEmpresa: "",
            nombreEmpresa: "",
            direccionEmpresa: "",
            telefonoEmpresa: "",
            borradoEmpresa: ""
          };
  
          var seleccionarEmpresa = "Si";
  
        }
  
        else if(asociarEmpresa === 'si' && seleccionarEmpresaPregunta === 'si' && $('#empresasDisponibles option:selected').val() === "default"){
          var empresaEntity = {
            idEmpresa: "",
            cifEmpresa: $('#cifEmpresa').val(),
            nombreEmpresa: $('#nombreEmpresa').val(),
            direccionEmpresa: $('#direccionEmpresa').val(),
            telefonoEmpresa: $('#telefonoEmpresa').val(),
            borradoEmpresa: ""
          };
  
          var seleccionarEmpresa = "No";
        
        }else if (asociarEmpresa === 'si' && seleccionarEmpresaPregunta === 'no') {
  
          var empresaEntity = {
            idEmpresa: "",
            cifEmpresa: $('#cifEmpresa').val(),
            nombreEmpresa: $('#nombreEmpresa').val(),
            direccionEmpresa: $('#direccionEmpresa').val(),
            telefonoEmpresa: $('#telefonoEmpresa').val(),
            borradoEmpresa: ""
          };
  
          var seleccionarEmpresa = "No";
  
        } else {
  
          var empresaEntity = null;
          var seleccionarEmpresa = "";
        }
  
          var data = {
            usuario : getCookie('usuario'),
            personaEntity : personaEntity,
            usuarioEntity : usuarioEntity,
            empresaEntity: empresaEntity,
            seleccionarEmpresa : seleccionarEmpresa
          }
          
          $.ajax({
            method: "POST",
            url: urlPeticionAjaxPersonaGuardar,
            contentType : "application/json",
            data: JSON.stringify(data),  
            dataType : 'json',
            headers: {'Authorization': token},
            }).done(res => {
              if (res.code != 'PERSONA_GUARDADA') {
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
  
      var personaEntity = {
          dniP : $('#dniP').val(),
          nombreP : $('#nombreP').val(),
          apellidosP : $('#apellidosP').val(),
          fechaNacP : $('#fechaNacP').val(),
          direccionP : $('#direccionP').val(),
          telefonoP : $('#telefonoP').val(),
          emailP : $('#emailP').val(),
          borradoP : 0
      }
      
      var select = $('#form-modal #formularioAcciones #contenidoForm #formularioGenerico #empresasDisponibles').val();
      
      if(getCookie('rolUsuario')== "admin"){
        var quitarEmpresa = $("input[name=quitarEmpresa]:checked").val();
        if(quitarEmpresa == "si"){
          var empresa = null;
        }else if(quitarEmpresa == "no"){
          var empresa = {
            idEmpresa : select,
            cifEmpresa : "",
            nombreEmpresa : "",
            direccionEmpresa : "",
            telefonoEmpresa : ""
          }
        }else{
          if($('#cifEmpresa').val()==""){
            var empresa = null;
          }else{
            var empresa = {
            idEmpresa : "",
            cifEmpresa : $('#cifEmpresa').val(),
            nombreEmpresa : $('#nombreEmpresa').val(),
            direccionEmpresa : $('#direccionEmpresa').val(),
            telefonoEmpresa : $('#telefonoEmpresa').val()
          }
          }
        }
      }else{
        if($('#cifEmpresa').val()==""){
            var empresa = null;
          }else{
            var empresa = {
            idEmpresa : '',
            cifEmpresa : $('#cifEmpresa').val(),
            nombreEmpresa : $('#nombreEmpresa').val(),
            direccionEmpresa : $('#direccionEmpresa').val(),
            telefonoEmpresa : $('#telefonoEmpresa').val()
          }
          }
        }
      
      var data = {
        usuario : getCookie('usuario'),
        persona : personaEntity,
        empresa: empresa
      }
  
        $.ajax({
        method: "POST",
        url: urlPeticionAjaxEditPersona,
        contentType : "application/json",
        data: JSON.stringify(data),  
        dataType : 'json',
        headers: {'Authorization': token},
        }).done(res => {
          if (res.code != 'PERSONA_MODIFICADA') {
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
  
      var personaEntity = {
          dniP : $('#dniP').val(),
          nombreP : $('#nombreP').val(),
          apellidosP : $('#apellidosP').val(),
          fechaNacP : $('#fechaNacP').val(),
          direccionP : $('#direccionP').val(),
          telefonoP : $('#telefonoP').val(),
          emailP : $('#emailP').val(),
          borradoP : 1
      }
  
      var empresa = {
            idEmpresa : "",
            cifEmpresa : $('#cifEmpresa').val(),
            nombreEmpresa : $('#nombreEmpresa').val(),
            direccionEmpresa : $('#direccionEmpresa').val(),
            telefonoEmpresa : $('#telefonoEmpresa').val()
          }
      
      var data = {
        usuario : getCookie('usuario'),
        persona: personaEntity,
        empresa : empresa
      }
  
        $.ajax({
        method: "POST",
        url: urlPeticionAjaxDeletePersona,
        contentType : "application/json",
        data: JSON.stringify(data),  
        dataType : 'json',
        headers: {'Authorization': token},
        }).done(res => {
          if (res.code != 'PERSONA_ELIMINADA') {
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
        dniP : $('#dniP').val(),
        nombreP : $('#nombreP').val(),
        apellidosP : $('#apellidosP').val(),
        fechaNacP : $('#fechaNacP').val(),
        direccionP : $('#direccionP').val(),
        telefonoP : $('#telefonoP').val(),
        emailP : $('#emailP').val(),
        inicio : 0,
        tamanhoPagina : 1
      }
  
        $.ajax({
        method: "POST",
        url: urlPeticionAjaxListarPersona,
        contentType : "application/json",
        data: JSON.stringify(data),  
        dataType : 'json',
        headers: {'Authorization': token},
        }).done(res => {
          if (res.code != 'PERSONAS_LISTADAS') {
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
          dniP : $('#dniP').val(),
          nombreP : $('#nombreP').val(),
          apellidosP : $('#apellidosP').val(),
          fechaNacP : fechaNacP,
          direccionP : $('#direccionP').val(),
          telefonoP : $('#telefonoP').val(),
          emailP : $('#emailP').val(),
          inicio : calculaInicio(numeroPagina, tamanhoPaginaPersona),
          tamanhoPagina : tamanhoPaginaPersona 
        }
      }
  
      if(accion == "buscarPaginacion"){
        if(getCookie('dniP') == null || getCookie('dniP') == ""){
          var dni = "";
        }else{
          var dni = getCookie('dniP');
        }
  
        if(getCookie('nombreP') == null || getCookie('nombreP') == ""){
          var nombre = "";
        }else{
          var nombre = getCookie('nombreP');
        }
        if(getCookie('apellidosP') == null || getCookie('apellidosP') == ""){
          var apellidos = "";
        }else{
          var apellidos = getCookie('apellidosP');
        }
  
        if(getCookie('fechaNacP') == null || getCookie('fechaNacP') == ""){
          var fecha = "";
        }else{
          var fecha = getCookie('fechaNacP');
        }
        if(getCookie('direccionP') == null || getCookie('direccionP') == ""){
          var direccion = "";
        }else{
          var direccion = getCookie('direccionP');
        }
  
        if(getCookie('telefonoP') == null || getCookie('telefonoP') == ""){
          var telefono = "";
        }else{
          var telefono = getCookie('telefonoP');
        }
        if(getCookie('emailP') == null || getCookie('emailP') == ""){
          var email = "";
        }else{
          var email = getCookie('emailP');
        }
  
        var data = {
          dniP : dni,
          nombreP : nombre,
          apellidosP : apellidos,
          fechaNacP : fecha,
          direccionP : direccion,
          telefonoP : telefono,
          emailP : email,
          inicio : calculaInicio(numeroPagina, tamanhoPaginaPersona),
          tamanhoPagina : tamanhoPaginaPersona 
        }
      }
      
      $.ajax({
        method: "POST",
        url: urlPeticionAjaxListarPersona,
        contentType : "application/json",
        data: JSON.stringify(data),  
        dataType : 'json',
        headers: {'Authorization': token},
        }).done(res => {
          if (res.code != 'PERSONAS_LISTADAS') {
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
        inicio : calculaInicio(numeroPagina, tamanhoPaginaPersona),
        tamanhoPagina : tamanhoPaginaPersona
      }
      
      $.ajax({
        method: "POST",
        url: urlPeticionAjaxListarPersonasEliminadas,
        contentType : "application/json",
        data: JSON.stringify(data),  
        dataType : 'json',
        headers: {'Authorization': token},
        }).done(res => {
          if (res.code != 'PERSONAS_LISTADAS') {
            reject(res);
          }
          resolve(res);
        }).fail( function( jqXHR ) {
          errorFailAjax(jqXHR.status);
        });
    });
  }
  
  function asociarPersonaEmpresaAjaxPromesa(dniPersona){
    return new Promise(function(resolve, reject) {
      var token = getCookie('tokenUsuario');
  
      var select = $('#modalSeleccionEmpresa #formularioAccionesSelectEmpresa #contenidoFormSelectEmpresa #formularioGenericoModal3 #select').val();
  
      var quitarEmpresa = $("input[name=quitarEmpresa]:checked").val();
  
      if(quitarEmpresa == "si"){
        var empresa = null;
      }else{
        var empresa = {
          idEmpresa : select,
          cifEmpresa : "",
          nombreEmpresa : "",
          direccionEmpresa : "",
          telefonoEmpresa : ""
        }
      }
  
      var persona = {
        dniP : dniPersona,
        nombreP : "",
        apellidosP : "",
        fechaNacP : "",
        direccionP : "",
        telefonoP : "",
        emailP : ""
      }
  
  
      var data = {
        usuario : getCookie('usuario'),
        persona : persona,
        empresa : empresa
      }
      
      $.ajax({
        method: "POST",
        url: urlPeticionAjaxAsociarPersonaEmpresa,
        contentType : "application/json",
        data: JSON.stringify(data),  
        dataType : 'json',
        headers: {'Authorization': token},
        }).done(res => {
          if (res.code != 'PERSONA_ASOCIADA_EMPRESA') {
            reject(res);
          }
          resolve(res);
        }).fail( function( jqXHR ) {
          errorFailAjax(jqXHR.status);
        });
    });
  }
  /** Función que asocia a una persona con una empresa **/
  async function asociarPersonaEmpresa(dniPersona){
    await asociarPersonaEmpresaAjaxPromesa(dniPersona)
    .then((res) => {
      $("#modalSeleccionEmpresa").modal('toggle');
      setLang(getCookie('lang'));
      location.reload();
      
  
    }).catch((res) => {
        $("#modalSeleccionEmpresa").modal('toggle');
  
        respuestaAjaxKO(res.code);
  
        let idElementoList = ["dniP", "nombreP", "apellidosP", "fechaNacP", "direccionP", "telefonoP", "emailP", 
          "usuario", "passwdUsuario1", "passwdUsuario2", "cifEmpresa", "nombreEmpresa", "direccionEmpresa", "telefonoEmpresa"];
        let idElementosRadioButtons = ["asociarEmpresaSi", "asociarEmpresaNo", "seleccionarEmpresaSi", "seleccionarEmpresaNo"];
      
        resetearFormulario("formularioGenerico", idElementoList);
        limpiaRadioButton(idElementosRadioButtons);
        
        setLang(getCookie('lang'));
  
        document.getElementById("modal").style.display = "block";
    });
  }
  
  /** Funcion para mostrar el formulario para añadir una persona **/
  function showAddPersonas() {
  
      if($('#datosUser').hasClass('active')){
        $('#datosUser').removeClass('active');
      }
  
      if($('#datosEmp').hasClass('active')){
        $('#datosEmp').removeClass('active');
      }
  
      if($('#datosUser').hasClass('show')){
        $('#datosUser').removeClass('show');
      }
  
      if($('#datosEmp').hasClass('show')){
        $('#datosEmp').removeClass('show');
      }
  
      if($('#datosUsuario').hasClass('active')){
        $('#datosUsuario').removeClass('active');
      }
  
      if($('#datosEmpresa').hasClass('active')){
        $('#datosEmpresa').removeClass('active');
      }
  
      if($('#datosUsuario').hasClass('show')){
        $('#datosUsuario').removeClass('show');
      }
  
      if($('#datosEmpresa').hasClass('show')){
        $('#datosEmpresa').removeClass('show');
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
      'return comprobarCIF(\'cifEmpresa\', \'errorFormatoCifEmpresa\', \'cifEmpresaRegistro\')',
      'return comprobarNombreEmpresa(\'nombreEmpresa\', \'errorFormatoNombreEmpresa\', \'nombreEmpresaRegistro\')',
      'return comprobarDireccion(\'direccionEmpresa\', \'errorFormatoDireccionEmpresa\', \'direccionEmpresaRegistro\')',
      'return comprobarTelefono(\'telefono\', \'errorFormatoTelefonoEmpresa\', \'telefonoEmpresaRegistro\')');
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
    $('#labelCifEmpresa').attr('hidden', true);
    $('#labelNombreEmpresa').attr('hidden', true);
    $('#labelDireccionEmpresa').attr('hidden', true);
    $('#labelTelefonoEmpresa').attr('hidden', true);
    $('#datosUser').attr('hidden', false);
    $('#rolUser').attr('hidden', true);
    $('#datosEmp').attr('hidden', false);
    $('#asociarEmpresa').attr('hidden', false);
    $('#quitarEmpresaId1').attr('hidden', true);
  
    let campos = ["dniP", "nombreP", "apellidosP", "fechaNacP", "direccionP", "telefonoP", "emailP", 
        "usuario", "passwdUsuario1", "passwdUsuario2", "cifEmpresa", "nombreEmpresa", "direccionEmpresa", "telefonoEmpresa"];
    let obligatorios = ["obligatorioDNI", "obligatorioNombre", "obligatorioApellidos", "obligatorioFechaNac", 
    "obligatorioDireccion", "obligatorioTelefono", "obligatorioEmail", "obligatorioUsuario", "obligatorioPass1", "obligatorioPass2", "obligatorioCifEmpresa", "obligatorioNombreEmpresa", "obligatorioDireccionEmpresa", "obligatorioTelefonoEmp"];
    let formatos = ["formatoDNI", "formatoEmail", "formatoTelf"];
    eliminarReadonly(campos);
    mostrarObligatorios(obligatorios);
    habilitaCampos(campos);
    muestraFormatos(formatos);
    setLang(getCookie('lang'));
  
  }
  
  /** Funcion para editar una persona **/
  function showEditar(dniP, nombreP, apellidosP,fechaNacP, direccionP, telefonoP, emailP, borradoP, usuario, rol, activo, cifEmpresa, nombreEmpresa, direccionEmpresa, telefonoEmpresa, idEmpresa) {
  
      if($('#datosUser').hasClass('active')){
        $('#datosUser').removeClass('active');
      }
  
      if($('#datosEmp').hasClass('active')){
        $('#datosEmp').removeClass('active');
      }
  
      if($('#datosUser').hasClass('show')){
        $('#datosUser').removeClass('show');
      }
  
      if($('#datosEmp').hasClass('show')){
        $('#datosEmp').removeClass('show');
      }
  
      if($('#datosUsuario').hasClass('active')){
        $('#d#datosUsuario').removeClass('active');
      }
  
      if($('#datosEmpresa').hasClass('active')){
        $('#datosEmpresa').removeClass('active');
      }
  
      if($('#datosUsuario').hasClass('show')){
        $('#datosUsuario').removeClass('show');
      }
  
      if($('#datosEmpresa').hasClass('show')){
        $('#datosEmpresa').removeClass('show');
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
      'return comprobarEmail(\'emailP\', \'errorFormatoEmail\', \'emailPersonaRegistro\');',
      'return comprobarCIF(\'cifEmpresa\', \'errorFormatoCifEmpresa\', \'cifEmpresaRegistro\')',
      'return comprobarNombreEmpresa(\'nombreEmpresa\', \'errorFormatoNombreEmpresa\', \'nombreEmpresaRegistro\')',
      'return comprobarDireccion(\'direccionEmpresa\', \'errorFormatoDireccionEmpresa\', \'direccionEmpresaRegistro\')',
      'return comprobarTelefono(\'telefono\', \'errorFormatoTelefonoEmpresa\', \'telefonoEmpresaRegistro\')');
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
      $('#asociarEmpresa').attr('hidden', true);
      $('#selectEmpresasDisponibles').attr('hidden', true);
      $('#empresasDisponibles').attr('hidden', true);
      $('#empresasDisponibles').attr('disabled', false);
      $('#quitarEmpresaId1').attr('hidden', false);
      
      if(getCookie('rolUsuario') == "usuario" || getCookie('rolUsuario') == 'gestor'){
        $('#datosEmp').attr('hidden', true);
      }else{
         $('#datosEmp').attr('hidden', false);
      }
  
      rellenarFormulario(dniP, nombreP, apellidosP, fechaNacP, direccionP, telefonoP, emailP, borradoP, usuario, rol, activo, cifEmpresa, nombreEmpresa, direccionEmpresa, telefonoEmpresa);
      
      if(idEmpresa != ''){
        insertacampo(document.formularioGenerico,'idEmpresa', idEmpresa);
      }
  
      let campos = ["dniP", "nombreP", "apellidosP", "fechaNacP", "direccionP", "telefonoP", "emailP", 
        "usuario", "passwdUsuario1", "passwdUsuario2", "cifEmpresa", "nombreEmpresa", "direccionEmpresa", "telefonoEmpresa"];
      let obligatorios = ["obligatorioDNI", "obligatorioNombre", "obligatorioApellidos", "obligatorioFechaNac", 
        "obligatorioDireccion", "obligatorioTelefono", "obligatorioEmail", "obligatorioUsuario", "obligatorioPass1", "obligatorioPass2", "obligatorioCifEmpresa", "obligatorioNombreEmpresa", "obligatorioDireccionEmpresa", "obligatorioTelefonoEmp"];
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
  function showEliminar(dniP, nombreP, apellidosP,fechaNacP, direccionP, telefonoP, emailP, borradoP, usuario, rol, activo, cifEmpresa, nombreEmpresa, direccionEmpresa, telefonoEmpresa) {
  
       if($('#datosUser').hasClass('active')){
        $('#datosUser').removeClass('active');
      }
  
      if($('#datosEmp').hasClass('active')){
        $('#datosEmp').removeClass('active');
      }
  
      if($('#datosUser').hasClass('show')){
        $('#datosUser').removeClass('show');
      }
  
      if($('#datosEmp').hasClass('show')){
        $('#datosEmp').removeClass('show');
      }
  
      if($('#datosUsuario').hasClass('active')){
        $('#d#datosUsuario').removeClass('active');
      }
  
      if($('#datosEmpresa').hasClass('active')){
        $('#datosEmpresa').removeClass('active');
      }
  
      if($('#datosUsuario').hasClass('show')){
        $('#datosUsuario').removeClass('show');
      }
  
      if($('#datosEmpresa').hasClass('show')){
        $('#datosEmpresa').removeClass('show');
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
      $('#labelCifEmpresa').attr('hidden', false);
      $('#labelNombreEmpresa').attr('hidden', false);
      $('#labelDireccionEmpresa').attr('hidden', false);
      $('#labelTelefonoEmpresa').attr('hidden', false);
      $('#labelRolUsuario').attr('hidden', false);
      $('#labelActivo').attr('hidden', false);
      $('#esActivo').attr('hidden', false);
      $('#rolUser').attr('hidden', false);
      $('#datosUser').attr('hidden', false);
      $('#rolUser').attr('hidden', false);
      $('#datosEmp').attr('hidden', false);
      $('#datosPersonales').attr('hidden', false);
      $('#selectEmpresas').attr('hidden', true);
      $('#asociarEmpresa').attr('hidden', true);
      $('#selectEmpresasDisponibles').attr('hidden', true);
      $('#formRegistroEmpresa').attr('hidden', false);
      $('#quitarEmpresaId1').attr('hidden', true);
  
     rellenarFormulario(dniP, nombreP, apellidosP, fechaNacP, direccionP, telefonoP, emailP, borradoP, usuario, rol, activo, cifEmpresa, nombreEmpresa, direccionEmpresa, telefonoEmpresa);
      
  
      let campos = ["dniP", "nombreP", "apellidosP", "fechaNacP", "direccionP", "telefonoP", "emailP", 
        "usuario", "passwdUsuario1", "passwdUsuario2", "rolUser", "esActivo", "cifEmpresa", "nombreEmpresa", "direccionEmpresa", "telefonoEmpresa"];
      let obligatorios = ["obligatorioDNI", "obligatorioNombre", "obligatorioApellidos", "obligatorioFechaNac", 
        "obligatorioDireccion", "obligatorioTelefono", "obligatorioEmail", "obligatorioUsuario", "obligatorioPass1", "obligatorioPass2", "obligatorioCifEmpresa", "obligatorioNombreEmpresa", "obligatorioDireccionEmpresa", "obligatorioTelefonoEmp"];
      let formatos = ["formatoDNI", "formatoEmail", "formatoTelf", "formatoCIF", "formatoTelfEmpresa"];
      anadirReadonly(campos);
      ocultarObligatorios(obligatorios);
      deshabilitaCampos(campos);
      anadirReadonly(campos);
      ocultaFormatos(formatos);
      setLang(getCookie('lang'));
  
  }
  
  /** Funcion para visualizar una persona **/
  function showDetalle(dniP, nombreP, apellidosP,fechaNacP, direccionP, telefonoP, emailP, borradoP, usuario, rol, activo, cifEmpresa, nombreEmpresa, direccionEmpresa, telefonoEmpresa) {
  
      if($('#datosUser').hasClass('active')){
        $('#datosUser').removeClass('active');
      }
  
      if($('#datosEmp').hasClass('active')){
        $('#datosEmp').removeClass('active');
      }
  
      if($('#datosUser').hasClass('show')){
        $('#datosUser').removeClass('show');
      }
  
      if($('#datosEmp').hasClass('show')){
        $('#datosEmp').removeClass('show');
      }
  
      if($('#datosUsuario').hasClass('active')){
        $('#d#datosUsuario').removeClass('active');
      }
  
      if($('#datosEmpresa').hasClass('active')){
        $('#datosEmpresa').removeClass('active');
      }
  
      if($('#datosUsuario').hasClass('show')){
        $('#datosUsuario').removeClass('show');
      }
  
      if($('#datosEmpresa').hasClass('show')){
        $('#datosEmpresa').removeClass('show');
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
      $('#labelCifEmpresa').attr('hidden', false);
      $('#labelNombreEmpresa').attr('hidden', false);
      $('#labelDireccionEmpresa').attr('hidden', false);
      $('#labelTelefonoEmpresa').attr('hidden', false);
      $('#labelRolUsuario').attr('hidden', false);
      $('#labelActivo').attr('hidden', false);
      $('#esActivo').attr('hidden', false);
      $('#rolUser').attr('hidden', false);
      $('#datosUser').attr('hidden', false);
      $('#rolUser').attr('hidden', false);
      $('#selectEmpresas').attr('hidden', true);
      $('#datosPersonales').addClass('show');
      $('#asociarEmpresa').attr('hidden', true);
      $('#selectEmpresasDisponibles').attr('hidden', true);
      $('#formRegistroEmpresa').attr('hidden', false);
      $('#quitarEmpresaId1').attr('hidden', true);
  
      rellenarFormulario(dniP, nombreP, apellidosP, fechaNacP, direccionP, telefonoP, emailP, borradoP, usuario, rol, activo, cifEmpresa, nombreEmpresa, direccionEmpresa, telefonoEmpresa);
  
      let campos = ["dniP", "nombreP", "apellidosP", "fechaNacP", "direccionP", "telefonoP", "emailP", 
        "usuario", "passwdUsuario1", "passwdUsuario2", "rolUser", "esActivo", "cifEmpresa", "nombreEmpresa", "direccionEmpresa", "telefonoEmpresa"];
      let obligatorios = ["obligatorioDNI", "obligatorioNombre", "obligatorioApellidos", "obligatorioFechaNac", 
        "obligatorioDireccion", "obligatorioTelefono", "obligatorioEmail", "obligatorioUsuario", "obligatorioPass1", "obligatorioPass2", "obligatorioCifEmpresa", "obligatorioNombreEmpresa", "obligatorioDireccionEmpresa", "obligatorioTelefonoEmp"];
      let formatos = ["formatoDNI", "formatoEmail", "formatoTelf", "formatoCIF", "formatoTelfEmpresa"];
  
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
  
      if($('#datosEmp').hasClass('active')){
        $('#datosEmp').removeClass('active');
      }
  
      if($('#datosUser').hasClass('show')){
        $('#datosUser').removeClass('show');
      }
  
      if($('#datosEmp').hasClass('show')){
        $('#datosEmp').removeClass('show');
      }
  
      if($('#datosUsuario').hasClass('active')){
        $('#d#datosUsuario').removeClass('active');
      }
  
      if($('#datosEmpresa').hasClass('active')){
        $('#datosEmpresa').removeClass('active');
      }
  
      if($('#datosUsuario').hasClass('show')){
        $('#datosUsuario').removeClass('show');
      }
  
      if($('#datosEmpresa').hasClass('show')){
        $('#datosEmpresa').removeClass('show');
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
      $('#datosEmp').attr('hidden', true);
  
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
      gestionarPermisosPersona(res.data);
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
      gestionarPermisosEmpresaPersona(res.data);
      setLang(getCookie('lang'));
      }).catch((res) => {
        respuestaAjaxKO(res.code);
        setLang(getCookie('lang'));
        document.getElementById("modal").style.display = "block";
    });
  }
  
  async function cargarEmpresasSelect(selector){
    await cargarEmpresasAjaxPromesa()
    .then((res) => {
  
      limpiaSelect($('#' + selector));
      
      var lista = res.data;
  
     for(var i = 0; i<lista.length; i++){
        if(lista[i].borradoEmpresa == 0){
          var option = document.createElement("option");
          option.setAttribute("value", lista[i].idEmpresa);
          option.setAttribute("label", lista[i].nombreEmpresa);
  
          $('#' + selector).append(option);
        }
        
      }
      $('#' + selector).attr('hidden', false);
      setLang(getCookie('lang'));
  
      }).catch((res) => {
        respuestaAjaxKO(res.code);
        setLang(getCookie('lang'));
        document.getElementById("modal").style.display = "block";
    });
  }
  function showAsociarEmpresaPersona(dniPersona){
  
      $('#tituloFormsModal3').addClass('SELECT_EMPRESA');
      $('#formularioGenericoModal3').attr('action', 'javascript:asociarPersonaEmpresa(' + "'" + dniPersona + "'" + ');');
      $('#iconoAccionesSelectEmpresas').attr('src', 'images/edit.png');
      $("#iconoAcciones").removeClass();
      $('#iconoAccionesSelectEmpresas').addClass('ICONO_EDIT');
      $('#iconoAccionesSelectEmpresas').addClass('iconoEditarPersona');
      $('#iconoAccionesSelectEmpresas').attr('alt', 'Editar');
      $('#spanAccionesSelectEmpresa').removeClass();
      $('#spanAccionesSelectEmpresa').addClass('tooltiptext');
      $('#spanAccionesSelectEmpresa').addClass('ICONO_EDIT');
      $('#btnAccionesSelectEmpresas').attr('value', 'Editar');
  
     
      setLang(getCookie('lang'));
  }
  
  /** Función para recuperar los permisos de un usuario sobre la funcionalidad **/
  function cargarPermisosFuncPersonaAjaxPromesa(){
    return new Promise(function(resolve, reject) {
      var nombreUsuario = getCookie('usuario');
      var token = getCookie('tokenUsuario');
      
      var usuario = nombreUsuario;
    
      $.ajax({
        method: "GET",
        url: urlPeticionAjaxAccionesUsuario,
        contentType : "application/json",
        data: { usuario : usuario, funcionalidad : 'Gestión de personas'},  
        dataType : 'json',
        headers: {'Authorization': token},
        }).done(res => {
          if (res.code != 'ACCIONES_USUARIO_OK') {
            reject(res);
          }
          resolve(res);
      }).fail( function( jqXHR ) {
          errorFailAjax(jqXHR.status);
        });
    });
  }
  
  /** Función para recuperar los permisos de un usuario sobre la funcionalidad **/
  function cargarPermisosFuncEmpresaPersonaAjaxPromesa(){
    return new Promise(function(resolve, reject) {
      var nombreUsuario = getCookie('usuario');
      var token = getCookie('tokenUsuario');
      
      var usuario = nombreUsuario;
    
      $.ajax({
        method: "GET",
        url: urlPeticionAjaxAccionesUsuario,
        contentType : "application/json",
        data: { usuario : usuario, funcionalidad : 'Gestión de empresas'},  
        dataType : 'json',
        headers: {'Authorization': token},
        }).done(res => {
          if (res.code != 'ACCIONES_USUARIO_OK') {
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
      switch(idElemento){
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
  
  
  /** Función para gestionar los iconos dependiendo de los permisos de los usuarios **/
  function gestionarPermisosEmpresaPersona(idElementoList) {
    idElementoList.forEach( function (idElemento) {
      switch(idElemento){
        case "Modificar" : 
          $('.editarPermisoEmpresa').attr('src', 'images/edit3.png');
          $('.editarPermisoEmpresa').css("cursor", "pointer");
          $('.editarPermisoEmpresa').attr("data-toggle", "modal");
          $('.editarPermisoEmpresa').attr("data-target", "#modalSeleccionEmpresa");
        break;
      } 
      }); 
    setLang(getCookie('lang'));
  }
  
  /**Función que rellenado los datos del formulario*/
  function rellenarFormulario(dniP, nombreP, apellidosP, fechaNacP, direccionP, telefonoP, emailP, borradoP, usuario, rol, activo, cifEmpresa, nombreEmpresa, direccionEmpresa, telefonoEmpresa) {
  
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
  
      if(cifEmpresa == ""){
        $('#cifEmpresa').val('-');
      }else{
         $('#cifEmpresa').val(cifEmpresa);
      }
  
      if(nombreEmpresa == ""){
        $('#nombreEmpresa').val('-');
      }else{
         $('#nombreEmpresa').val(nombreEmpresa);
      }
  
      if(direccionEmpresa == ""){
        $('#direccionEmpresa').val('-');
      }else{
         $('#direccionEmpresa').val(direccionEmpresa);
      }
  
      if(telefonoEmpresa == ""){
        $('#telefonoEmpresa').val('-');
      }else{
         $('#telefonoEmpresa').val(telefonoEmpresa);
      }
  
      setLang(getCookie('lang'));
  
  }
  
  /**Función para cambiar onBlur de los campos*/
  function cambiarOnBlurCampos(onBlurDNI, onBlurNombrePersona, onBlurApellidosPersona, onBlurFechaNacimiento, onBlurDireccion, 
                                onBlurTelefono, onBlurEmail, onBlurUser, onBlurPass, onBlurPassRepetida, onBlurCifEmpresa, onBlurNombreEmpresa, onBlurDireccionEmpresa, onBlurTelefonoEmpresa) {
      
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
  
      if(onBlurCifEmpresa!= ''){
          $("#cifEmpresa").attr('onblur', onBlurCifEmpresa);
      }
  
      if(onBlurNombreEmpresa!= ''){
          $("#nombreEmpresa").attr('onblur', onBlurNombreEmpresa);
      }
  
      if(onBlurDireccionEmpresa!= ''){
          $("#direccionEmpresa").attr('onblur', onBlurDireccionEmpresa);
      }
  
      if(onBlurTelefonoEmpresa!= ''){
          $("#telefonoEmpresa").attr('onblur', onBlurTelefonoEmpresa);
      }
  
      setLang(getCookie('lang'));
  }
  
  function cargaDatosPersona(datos){
     var fechaNacimiento = new Date(datos[0].fechaNacP);
  
     if(datos[0].empresa != null){
      var atributosFunciones = ["'" + datos[0].dniP + "'", "'" + datos[0].nombreP + "'", "'" + datos[0].apellidosP + "'", "'" + convertirFecha(fechaNacimiento.toString()) + "'",
            "'" + datos[0].direccionP + "'", "'" + datos[0].telefonoP + "'", "'" + datos[0].emailP + "'", 
            "'" + datos[0].borradoP + "'", "'" + datos[0].usuario.usuario + "'", "'" + datos[0].usuario.rol.rolName + "'", "'" + datos[0].usuario.borradoUsuario + "'",
            "'" + datos[0].empresa.cifEmpresa + "'", "'" + datos[0].empresa.nombreEmpresa + "'", "'" + datos[0].empresa.direccionEmpresa + "'", "'" + datos[0].empresa.telefonoEmpresa + "'"]; 
    }else{
  
      var atributosFunciones = ["'" + datos[0].dniP + "'", "'" + datos[0].nombreP + "'", "'" + datos[0].apellidosP + "'", "'" + convertirFecha(fechaNacimiento.toString()) + "'",
            "'" + datos[0].direccionP + "'", "'" + datos[0].telefonoP + "'", "'" + datos[0].emailP + "'", 
            "'" + datos[0].borradoP + "'", "'" + datos[0].usuario.usuario + "'", "'" + datos[0].usuario.rol.rolName + "'", "'" + datos[0].usuario.borradoUsuario + "'"]; 
    }
      
    $('#cardPersona').html('');
  
       var fecha = new Date(datos[0].fechaNacP);
  
       var cardPersona = '<img class="card-img-top" src="images/users.png" alt="Card image" style="width:100%">' + 
                               '<div class="card-body">' + 
                                   '<div class="nombreApellidosInfo">' + 
                                       '<img class="nombreApellidosImg" src="images/users.png" alt="nombreApellidos">' + 
                                           '<h4 class="card-title nombreApellidos">' + datos[0].nombreP + " " + datos[0].apellidosP + '</h4>' +
                                   '</div>' + 
                                   '<div class="dniPInfo">' +
                                       '<img class="dniPImg" src="images/dni.png" alt="dniP">' + 
                                       '<p class="card-text dniP">' +  datos[0].dniP + '</p>' + 
                                   '</div>' + 
                                   '<div class="fechaNacimientoInfo">' + 
                                       '<img class="fechaNacimientoImg" src="images/cumpleanhos.png" alt="fechaNacimiento">' + 
                                       '<p class="card-text fechaNacimiento">'+ convertirFecha(fecha.toString()) + '</p>' + 
                                   '</div>' + 
                                   '<div class="direccionInfo">' + 
                                       '<img class="direccionImg" src="images/direccion.png" alt="direccion">' + 
                                       '<p class="card-text direccion">' + datos[0].direccionP + '</p>' + 
                                   '</div>' + 
                                   '<div class="telefonoInfo">' + 
                                       '<img class="telefonoImg" src="images/telefono.png" alt="telefono">' + 
                                       '<p class="card-text telefono">' + datos[0].telefonoP + '</p>' + 
                                   '</div>' +
                                   '<div class="emailInfo">' + 
                                       '<img class="emailImg" src="images/email.png" alt="email">' + 
                                       '<p class="card-text email">' + datos[0].emailP + '</p>' + 
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
                                       '<p class="card-text dni">' + datos[0].usuario.dniUsuario + '</p>' + 
                                   '</div>' +
                                   '<div class="passInfo">' + 
                                       '<img class="passImg" src="images/pass.png" alt="pass">' + 
                                       '<p class="card-text pass">************</p>' + 
                                   '</div>' + 
                                   '<div class="rolInfo">' + 
                                       '<img class="rolImg" src="images/rol.png" alt="rol">'  +
                                       '<p class="card-text rol">' + datos[0].usuario.rol.rolName + '</p>' +
                                   '<div>' + 
                               '<div>';
  
  
       $('#cardUsuario').append(cardUsuario);
       setLang(getCookie('lang'));
  }
  
  function cargaDatosEmpresa(datos){
  
      if(datos[0].empresa == null){
        var nombreEmpresa = " - ";
        var cifEmpresa = " - ";
        var direccionEmpresa = " - ";
        var telefonoEmpresa = " - ";
      }else{
        var nombreEmpresa = datos[0].empresa.nombreEmpresa;
        var cifEmpresa = datos[0].empresa.cifEmpresa;
        var direccionEmpresa = datos[0].empresa.direccionEmpresa;
        var telefonoEmpresa = datos[0].empresa.telefonoEmpresa;
      }
  
       $('#cardEmpresa').html('');
  
       var cardEmpresa = '<img class="card-img-top" src="images/empresa2.png" alt="Card image">' + 
                               '<div class="card-body">' + 
                                   '<div class="nombreEInfo">' + 
                                       '<img class="nombreEImg" src="images/empresa2.png" alt="nombreE">' + 
                                       '<h4 class="card-title nombreE">' + nombreEmpresa + '</h4>' + 
                                   '</div>' + 
                                   '<div class="cifInfo">' + 
                                       '<img class="cifImg" src="images/cif.png" alt="cif">' + 
                                       '<p class="card-text cif">' + cifEmpresa + '</p>' + 
                                   '</div>' + 
                                   '<div class="direccionEInfo">' + 
                                       '<img class="direccionEImg" src="images/direccion.png" alt="direccionE">' + 
                                       '<p class="card-text direccionE">' + direccionEmpresa + '</p>' + 
                                   '</div>' +
                                   '<div class="telefonoEInfo">' +
                                       '<img class="telefonoEImg" src="images/telefono.png" alt="telefonoE">' + 
                                       '<p class="card-text telefonoE">' + telefonoEmpresa + '</p>' +
                                   '</div>' + 
                                   '<div class="tooltip">' + 
                                       '<img class="editarCard editarPermisoEmpresa" src="images/edit.png" data-toggle="" data-target="" onclick="showAsociarEmpresaPersona(' + "'" +  datos[0].dniP + "'" + ')" alt="Editar"/>' + 
                                       '<span class="tooltiptext iconEditUser ICONO_EDIT">Editar</span>' + 
                                   '</div>' + 
                               '</div>';
  
  
      $('#cardEmpresa').append(cardEmpresa);
      setLang(getCookie('lang'));
  
  }
  
  function cargarEmpresasAjaxPromesa(){
    return new Promise(function(resolve, reject) {
  
      $.ajax({
        method: "GET",
        url: urlPeticionAjaxListadoEmpresas,
        contentType: "application/json",
      }).done(res => {
        if (res.code != 'EMPRESAS_LISTADAS') {
          reject(res);
        }
        resolve(res);
      }).fail( function( jqXHR ) {
          errorFailAjax(jqXHR.status);
        });
  
    });
  }
  
  
  $(document).ready(function() {
    $("#form-modal").on('hidden.bs.modal', function() {
  
      let idElementoErrorList = ["errorFormatoDni", "errorFormatoNombrePersona", "errorFormatoApellidosP", "errorFormatoFecha", "errorFormatoDireccion", "errorFormatoTelefono",
        "errorFormatoEmail", "errorFormatoUserRegistro", "errorFormatoPassRegistro", "errorFormatoPassRegistro2", "errorFormatoCifEmpresa", "errorFormatoNombreEmpresa", "errorFormatoDireccionEmpresa", "errorFormatoTelefonoEmpresa",
        "bloqueoMayusculasRegistro"];
      
      let idElementoList = ["dniP", "nombreP", "apellidosP", "fechaNacP", "direccionP", "telefonoP", "emailP", "usuario", "passwdUsuario1", "passwdUsuario2", "cifEmpresa",
        "nombreEmpresa", "direccionEmpresa", "telefonoEmpresa"];
  
      let idElementosRadioButtons = ["asociarEmpresaSi", "asociarEmpresaNo", "seleccionarEmpresaSi", "seleccionarEmpresaNo"];
  
      let iconos = ["iconoTabDatosPersonales", "iconoTabDatosUsuario"];
  
      limpiarFormulario(idElementoList);
      limpiaRadioButton(idElementosRadioButtons);
      $('#formRegistroEmpresa').prop("hidden", true);
      $('#selectEmpresas').prop('hidden', true);
      $('#error').removeClass();
      $("#error").html('');
      $("#error").css("display", "none");
      
      $('#iconoTabDatosPersonales').attr('hidden',true);
      $('#iconoTabDatosUsuario').attr('hidden',true);
      $('#iconoTabDatosEmpresa').attr('hidden',true);
  
      eliminarMensajesValidacionError(idElementoErrorList, idElementoList);
      ocultarIconoErroresTabs(iconos);
      setLang(getCookie('lang'));
     
    });
  
    $("#modalSeleccionEmpresa").on('hidden.bs.modal', function() {
  
      let idElementosRadioButtons = ["quitarEmpresaSi", "quitarEmpresaNo"];
  
      limpiaRadioButton(idElementosRadioButtons);
      
      $('#labelSelectEmpresa').attr('hidden',true);
      $('#select').attr('hidden',true);
  
      setLang(getCookie('lang'));
     
    });
  
  });
  
  
  
  
  
  
  
  
  
  
  