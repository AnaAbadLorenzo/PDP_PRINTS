/**Función para que el usuario pueda iniciar un proceso*/
async function iniciarProcesoUsuario(identificadorProceso, funcionalidad){
    if(funcionalidad == "volverGuardar"){
       await anadirProcesoUsuarioAjaxPromesa(identificadorProceso, "Si")
      .then((res) => {
        window.location.href = "MisProcesos.html";
      }).catch((res) => {
            if(res.code == "PROCESO_USUARIO_YA_EXISTE_EXCEPTION"){
              respuestaAjaxContinuarProcedimiento(identificadorProceso);
              document.getElementById("modalContinuarProceso").style.display = "block";
            }else{
              respuestaAjaxKO(res.code);
              document.getElementById("modal").style.display = "block";
            }
            
      });
    }else{
      await anadirProcesoUsuarioAjaxPromesa(identificadorProceso, "No")
      .then((res) => {
        window.location.href = "MisProcesos.html";
      }).catch((res) => {
            if(res.code == "PROCESO_USUARIO_YA_EXISTE_EXCEPTION"){
              respuestaAjaxContinuarProcedimiento(identificadorProceso);
              document.getElementById("modalContinuarProceso").style.display = "block";
            }else{
              respuestaAjaxKO(res.code);
              document.getElementById("modal").style.display = "block";
            }
            
      });
    }
    
}

/**Función para asociar un proceso con un usuario**/
function anadirProcesoUsuarioAjaxPromesa(identificadorProceso, volverGuardar){
    return new Promise(function(resolve, reject) {
      var token = getCookie('tokenUsuario');
  
      var data = {
        controlador : 'GestionProcesosUsuario',
        action: 'add',
        fecha_proceso_usuario: '',
        calculo_huella_carbono : 0,
        borrado_proceso_usuario : 0,
        usuario : getCookie('usuario'),
        id_proceso : identificadorProceso,
      }
  
      $.ajax({
        method: "POST",
        url: urlPeticionAjaxAddProcedimientoUsuario,
        contentType : "application/x-www-form-urlencoded; charset=UTF-8",
        data: data,
        headers: {'Authorization': token},
        }).done(res => {
          if (res.code != 'PROCESO_USUARIO_CREADO') {
            reject(res);
          }
          resolve(res);
        }).fail( function( jqXHR ) {
          errorFailAjax(jqXHR.status);
        });
    });
  }

/** Función para recuperar los procesos con ajax y promesas **/
function cargarProcesosAjaxPromesa(numeroPagina, tamanhoPagina){
    return new Promise(function(resolve, reject) {
        var token = getCookie('tokenUsuario');
  
      var data = {
        controlador : 'GestionProcesos',
        action: 'search',
        inicio : calculaInicio(numeroPagina, tamanhoPaginaProceso),
        tamanhoPagina : tamanhoPaginaProceso
      }
      
      $.ajax({
        method: "POST",
        url: urlPeticionAjaxListarTodosProcesos,
        contentType : "application/x-www-form-urlencoded; charset=UTF-8",
        data: data,
        headers: {'Authorization': token},
        }).done(res => {
          if (res.code != 'BUSQUEDA_PROCESO_CORRECTO') {
            reject(res);
          }
          resolve(res);
        }).fail( function( jqXHR ) {
          errorFailAjax(jqXHR.status);
        });
    });
}

/**Función para recuperar los procesos eliminados con ajax y promesas*/
function buscarEliminadosAjaxPromesa(numeroPagina, tamanhoPagina){
    return new Promise(function(resolve, reject) {
      var token = getCookie('tokenUsuario');
  
      var data = {
        controlador: 'GestionProcesos',
        action:'searchDelete',
        inicio : calculaInicio(numeroPagina, tamanhoPaginaProceso),
        tamanhoPagina : tamanhoPaginaProceso
      }
      
      $.ajax({
        method: "POST",
        url: urlPeticionAjaxListarProcesosEliminados,
        contentType : "application/x-www-form-urlencoded; charset=UTF-8",
        data: data,
        headers: {'Authorization': token},
        }).done(res => {
          if (res.code != 'BUSQUEDA_PROCESO_CORRECTO') {
            reject(res);
          }
          resolve(res);
        }).fail( function( jqXHR ) {
          errorFailAjax(jqXHR.status);
        });
    });
}

/** Función para recuperar los procesos con ajax y promesas **/
function cargarParametrosProceso(idProceso){
    return new Promise(function(resolve, reject) {
        var token = getCookie('tokenUsuario');
        
        var data = {
            controlador : 'GestionParametros',
            action : 'searchByParameters',
            parametro_formula : '',
            descripcion_parametro : '',
            id_proceso: idProceso,
            inicio: 0,
            tamanhoPagina: 99999999
        }

      $.ajax({
        method: "POST",
        url: urlPeticionAjaxListarParametrosProceso,
        contentType : "application/x-www-form-urlencoded; charset=UTF-8",
        data: data,
        headers: {'Authorization': token},
        }).done(result => {
          if (result.code != 'BUSQUEDA_PERSONALIZADA_PARAMETRO_CORRECTO') {
            reject(result);
          }
          resolve(result);
        }).fail( function( jqXHR ) {
          errorFailAjax(jqXHR.status);
        });
    });
}

function cargarProcesosCategoriaAjaxPromesa(numeroPagina, tamanhoPagina, idCategoria){
    return new Promise(function(resolve, reject) {
        var token = getCookie('tokenUsuario');
     
        var data = {
            id_categoria : idCategoria,
            inicio : calculaInicio(numeroPagina, tamanhoPaginaProceso),
            tamanhoPagina : tamanhoPaginaProceso
        }
 
        $.ajax({
        method: "POST",
        url: urlPeticionAjaxListadoProcesosCategoriaByIdCategoria,
        contentType : "application/x-www-form-urlencoded; charset=UTF-8",
        data: data,
        headers: {'Authorization': token},
        }).done(res => {
            if (res.code != 'PROCESOS_PROCEDIMIENTOS_LISTADOS') {
            reject(res);
            }
            resolve(res);
        }).fail( function( jqXHR ) {
            errorFailAjax(jqXHR.status);
        });
   });
}

/**Función para reactivar un proceso con ajax y promesas*/
function reactivarProcesosAjaxPromesa(){
    return new Promise(function(resolve, reject) {
      var token = getCookie('tokenUsuario');
      var publicado = $('input[name=checkPublicado]:checked').val();

      if($('#fechaProceso').val() == "1900-01-01"){
          var fechaP = '';
      }else{
          var fechaP = $('#fechaProceso').val();
      }
      if(publicado == undefined){
          var check = '';
      }else{
          if(publicado == 'publicado'){
              var check = 1;
          }else{
              var check = 0;
          }
      }

      var data = {
          controlador : 'GestionProcesos',
          action : 'reactivar',
          id_proceso : $('#idProceso').val(),
          nombre_proceso : $('#nombreProceso').val(),
          descripcion_proceso : $('#descripcionProceso').val(),
          fecha_proceso : fechaP,
          id_categoria : $('#selectCategorias').val(),
          check_aprobacion : check,
          version_proceso : $('#versionProceso').val(),
          formula_proceso : $('#formulaProceso').val(),
          dni_usuario : '',
          borrado_proceso : 1,
      }
      
      $.ajax({
        method: "POST",
        url: urlPeticionAjaxReactivarProceso,
        contentType : "application/x-www-form-urlencoded; charset=UTF-8",
        data: data,
        headers: {'Authorization': token},
        }).done(res => {
          if (res.code != 'REACTIVAR_PROCESO_CORRECTO') {
            reject(res);
          }
          resolve(res);
        }).fail( function( jqXHR ) {
          errorFailAjax(jqXHR.status);
        });
    });
}

async function reactivarProceso(){
    await reactivarProcesosAjaxPromesa()
    .then((res) => {
  
      cargarPermisosFuncProceso();
  
      $("#form-modal").modal('toggle');
  
      respuestaAjaxOK("PROCESO_REACTIVADO_OK", res.code);
  
      setLang(getCookie('lang'));
      document.getElementById("modal").style.display = "block";
        
      buscarEliminados(0, tamanhoPaginaProceso, 'PaginadorNo');
      
      }).catch((res) => {
        $("#form-modal").modal('toggle');
        respuestaAjaxKO(res.code);
        setLang(getCookie('lang'));
        document.getElementById("modal").style.display = "block";
    });
  }

/* Función para obtener los procesos del sistema */
async function cargarProcesos(numeroPagina, tamanhoPagina, paginadorCreado){
    var paramstr = window.location.search.substr(1);
    var par = paramstr.split("&");
  
    if(getCookie('rolUsuario') == "Administrador" || getCookie('rolUsuario') == "Gestor"){
        document.getElementById('cabecera').style.display = "block";
        document.getElementById('tablaDatos').style.display = "block";
        document.getElementById('filasTabla').style.display = "block";
        
        try {
            cargarPermisosFuncProceso();
            const resultado = await cargarProcesosAjaxPromesa(numeroPagina, tamanhoPagina);
            var numResults = resultado.resource.numResultados + '';
            var totalResults = resultado.resource.tamanhoTotal + '';
            var inicio = 0;

            if(resultado.resource.listaBusquedas.length == 0){
                inicio = 0;
                document.getElementById('itemPaginacion').style.display = "none";
                document.getElementById('cabecera').style.display = "block";
                document.getElementById('cabeceraEliminados').style.display = "none";
            }else{
                inicio = parseInt(resultado.resource.inicio)+1;
                document.getElementById('itemPaginacion').style.display = "block";
            }

            var textPaginacion = inicio + " - " + (parseInt(resultado.resource.inicio)+parseInt(numResults))  + " total " + totalResults;
  
            $("#datosProceso").html("");
            $("#checkboxColumnas").html("");
            $("#paginacion").html("");
  
            for (var i = 0; i < resultado.resource.listaBusquedas.length; i++){
                try{
                    const result = await cargarParametrosProceso(resultado.resource.listaBusquedas[i].id_proceso);
                    var tr = construyeFilaProceso('PROCESO', resultado.resource.listaBusquedas[i], result.resource.listaBusquedas);
                    $("#datosProceso").append(tr);
                }catch (resultado) {
                  respuestaAjaxKO(resultado.code);
                  document.getElementById("modal").style.display = "block";
                }
            }
            var div = createHideShowColumnsWindow({DESCRIPCION_PROCESO_COLUMN:2, DATE_COLUMN:3, RESPONSABLE_PROCESO_COLUMN:4});
            $("#checkboxColumnas").append(div);
            $("#paginacion").append(textPaginacion);
            setLang(getCookie('lang'));
  
            if(paginadorCreado != 'PaginadorCreado'){
                paginador(totalResults, 'cargarProcesos', 'PROCESO');
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
      
        } catch (resultado) {
            respuestaAjaxKO(resultado.code);
            setLang(getCookie('lang'));
            document.getElementById("modal").style.display = "block";
        }
      
    }else{
        await cargarProcesosSegunCategoria(numeroPagina, tamanhoPagina)
        .then((res) => {
            var numResults = res.resource.numResultados + '';
            var totalResults = res.resource.tamanhoTotal + '';
            var inicio = 0;
            document.getElementById('cabeceraUsuario').style.display = "block";
            document.getElementById('cabecera').style.display = "none";
            cargarPermisosFuncProceso();
            
            if(res.resource.listaBusquedas.length == 0){
                inicio = 0;
                $('#itemPaginacion').attr('hidden',true);
                document.getElementById('filasTabla').style.display = "none";
            }else{
                inicio = parseInt(res.resource.inicio)+1;
                $('#itemPaginacion').attr('hidden',false);
                document.getElementById('filasTabla').style.display = "block";

            }

            var textPaginacion = inicio + " - " + (parseInt(res.resource.inicio)+parseInt(numResults))  + " total " + totalResults;
            $("#paginacion").append(textPaginacion);

            $('#procesos').html('');
            
            for (var i = 0; i < res.resource.listaBusquedas.length; i++){
                var tr = cargarProcesosCategoria(res.resource.listaBusquedas[i]);
                $('#procesos').append(tr);
            }

            if(paginadorCreado != 'PaginadorCreado'){
                paginador(totalResults, 'cargarProcesosSegunCategoria', 'PROCESO');
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

function cargarProcesosCategoria(proceso){

    var atributosFunciones = ["'" + proceso.categoria.nombre_categoria + "'", "'" + proceso.categoria.descripcion_categoria + "'"]; 
  
    var procesos= '<div class="col-md-12 col-lg-12 col-xl-12 mb-12 paddingTop">' + 
                          '<div class="card">' + 
                            '<div class="card-body-plan">' + 
                              '<div class="card-title">' + proceso.proceso.nombre_proceso + '</div>' + 
                              '<div class="card-text">' + proceso.proceso.descripcion_proceso + '</div>' +
                              '<div id="iniciarProcedimiento" class="tooltip13 procedimientoIcon">' +
                                '<img id="iconoIniciarProcedimiento" class="iconoProcedimiento iconProcedimiento" src="images/iniciarProcedimiento.png" alt="Iniciar procedimiento" onclick="iniciarProcesoUsuario(' + proceso.proceso.id_proceso + ', \'primero\')"/>' +
                                '<span class="tooltiptext iconProcedimiento ICON_INICIAR_PROCESO"></span>' + 
                              '</div>' + 
                            '</div>'+
                            '<div class="card-footer">' + 
                              '<div class="tooltip8 planIcon">' + 
                                '<img class="iconoPlan iconPlan" src="images/plan.png" alt="Plan" data-toggle="modal" data-target="#modalMostrarCategoria" onclick="showCategoria(' + atributosFunciones + ')"/>' + 
                                '<span class="tooltiptext iconPlan ICON_CATEGORIA"></span>' + 
                              '</div>' + 
                            '<div class="card-title-plan">Categoria: ' + proceso.categoria.nombre_categoria + '</div>' + 
                          '</div>' +
                        '</div>' + 
                      '</div>';
  
    $('#procesos').append(procesos);
  
    setLang(getCookie('lang'));

}

function showCategoria(nombre_categoria, descripcion_categoria){

    $('#tituloFormsModalMostrarCategoria').addClass('DETAIL_CATEGORIA');
    $('#iconoAccionesMostrarCategoria').attr('src', 'images/close2.png');
    $('#iconoAccionesMostrarCategoria').removeClass();
    $('#iconoAccionesMostrarCategoria').addClass('ICONO_DETALLE');
    $('#iconoAccionesMostrarCategoria').addClass('iconoCerrar');
    $('#iconoAccionesMostrarCategoria').attr('alt', 'Detalle');
    $('#spanAccionesMostrarCategoria').removeClass();
    $('#spanAccionesMostrarCategoria').addClass('tooltiptext');
    $('#spanAccionesMostrarCategoria').addClass('ICONO_DETALLE');
    $('#btnAccionesMostrarCategoria').attr('value', 'Detalle');

    $('#labelNombreCategoriaMostrarCategoria').attr('hidden', false);
    $('#labelDescripcionCategoriaMostrarCategoria').attr('hidden', false);
    $('#nombreCategoria').val(nombre_categoria);
    $('#descripcionCategoriaMostrarCategoria').val(descripcion_categoria);

    deshabilitaCampos(['nombreCategoria', 'descripcionCategoriaMostrarCategoria']);
    anadirReadonly(['nombreCategoria', 'descripcionPlanMostrarCategoria']);
   
    setLang(getCookie('lang'));
}

/** Función pra busar los  eliminados de la tabla proceso */
async function buscarEliminados(numeroPagina, tamanhoPagina, paginadorCreado){
	if(getCookie('rolUsuario') == "Administrador" || getCookie('rolUsuario') == "Gestor"){
	try {
		cargarPermisosFuncProceso();
    	const resultado = await buscarEliminadosAjaxPromesa(numeroPagina, tamanhoPagina);
    	var numResults = resultado.resource.numResultados + '';
	  	var totalResults = resultado.resource.tamanhoTotal + '';
        var inicio = 0;

	    if(resultado.resource.listaBusquedas.length == 0){
        	inicio = 0;
        	$('#itemPaginacion').attr('hidden', true);
        	document.getElementById('cabecera').style.display = "none";
            document.getElementById('cabeceraEliminados').style.display = "block";
      	}else{
        	inicio = parseInt(resultado.resource.inicio)+1;
        	$('#itemPaginacion').attr('hidden', false);
      	}
	    
      	var textPaginacion = inicio + " - " + (parseInt(resultado.resource.inicio)+parseInt(numResults))  + " total " + totalResults;

      	$("#datosProceso").html("");
	   	$("#checkboxColumnas").html("");
	   	$("#paginacion").html("");

	   	for (var i = 0; i < resultado.resource.listaBusquedas.length; i++){
	   		try{
	   			const result = await cargarParametrosProceso(resultado.resource.listaBusquedas[i].proceso.id_proceso)
	   			var tr = construyeFilaProcesoEliminado('PROCESO', resultado.resource.listaBusquedas[i], result.resource.listaBusquedas);
	  			$("#datosProceso").append(tr);
	   		}catch (resultado) {
    			respuestaAjaxKO(resultado.code);
				document.getElementById("modal").style.display = "block";
  			}
  		}

	   	var div = createHideShowColumnsWindow({DESCRIPCION_PROCESO_COLUMN:2, DATE_COLUMN:3, RESPONSABLE_PROCESO_COLUMN:4});
      	$("#checkboxColumnas").append(div);
      	$("#paginacion").append(textPaginacion);
      	setLang(getCookie('lang'));

		if(paginadorCreado != 'PaginadorCreado'){
		    paginador(totalResults, 'buscarEliminadosProceso', 'PROCESO');
		}
		        
		if(numeroPagina == 0){
		    $('#' + (numeroPagina+1)).addClass("active");
		    var numPagCookie = numeroPagina+1;
		}else{
		    $('#' + numeroPagina).addClass("active");
		    var numPagCookie = numeroPagina;
		}

		setCookie('numeroPagina', numPagCookie);
		cargarPermisosFuncProceso();
        setLang(getCookie('lang'));
    
  	} catch (resultado) {
    	respuestaAjaxKO(resultado.code);
        setLang(getCookie('lang'));
		document.getElementById("modal").style.display = "block";
  	}
	
	}
}
 /*Función que comprueba los permisos del usuario sobre la funcionalidad*/
 async function cargarPermisosFuncProceso(){
    await cargarPermisosFuncProcesoAjaxPromesa()
    .then((res) => {
      gestionarPermisosProceso(res.resource);
      setLang(getCookie('lang'));
      
      }).catch((res) => {
        respuestaAjaxKO(res.code);
        setLang(getCookie('lang'));
        document.getElementById("modal").style.display = "block";
    });
}

function cargarPermisosFuncProcesoAjaxPromesa(){
    return new Promise(function(resolve, reject) {
      var nombreUsuario = getCookie('usuario');
      var token = getCookie('tokenUsuario');
      
      var usuario = nombreUsuario;
      var data = {
        controlador : 'GestionACL',
        action: 'searchAccionesPorFuncionalidadUsuario',
        usuario : usuario,
        nombre_funcionalidad : 'Gestión de procesos'
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

/** Función para añadir procesos con ajax y promesas **/
function anadirProcesoAjaxPromesa(){
    return new Promise(function(resolve, reject) {
        var token = getCookie('tokenUsuario');
        var publicado = $('input[name=checkPublicado]:checked').val();
        if(publicado == 'publicado'){
            var check = 1;
        }else{
            var check = 0;
        }
        var data = {
            controlador: 'GestionProcesos',
            action: 'add',
            id_proceso : "",
            nombre_proceso : $('#nombreProceso').val(),
            descripcion_proceso : $('#descripcionProceso').val(),
            fecha_proceso : $('#fechaProceso').val(),
            id_categoria : $('#selectCategorias').val(),
            check_aprobacion : check,
            version_proceso : 1,
            formula_proceso : $('#formulaProceso').val(),
            dni_usuario : '',
            borrado_proceso : 0
        }
    
    $.ajax({
        method: "POST",
        url: urlPeticionAjaxAddProceso,
        contentType : "application/x-www-form-urlencoded; charset=UTF-8",
        data: data,
        headers: {'Authorization': token},
        }).done(res => {
          if (res.code != 'ADD_PROCESO_COMPLETO') {
            reject(res);
          }
          resolve(res);
        }).fail( function( jqXHR ) {
          errorFailAjax(jqXHR.status);
        });
    });
}

/** Funcion añadir proceso **/
async function addProceso(){
    await anadirProcesoAjaxPromesa()
    .then((res) => {
      $("#form-modal").modal('toggle');
      respuestaAjaxOK("PROCESO_GUARDADO_OK", res.code);
  
      let idElementoList = ["nombreProceso", "descripcionProceso", "fechaProceso", "selectCategorias", "checkPubli","formulaProceso"];
      resetearFormulario("formularioGenerico", idElementoList);
      setLang(getCookie('lang'));
      document.getElementById("modal").style.display = "block";
      
      $('#nombreProceso').val(getCookie('nombre_proceso'));
      $('#descripcionProceso').val(getCookie('descripcion_proceso'));
      $('#fechaProceso').val(getCookie('fecha_proceso'));
      $('#selectCategorias').val(getCookie('id_categoria'));
      if(getCookie('check_aprobacion') == 0){
        $('input[name=checkPublicado][value=publicado]').prop('checked', true);
      }else{
        $('input[name=checkPublicado][value=noPublicado]').prop('checked', true);
      }
      $('#formulaProceso').val(getCookie('formula_proceso'))
      buscarProceso(getCookie('numeroPagina'), tamanhoPaginaProceso, 'buscarPaginacion', 'PaginadorNo');
      setLang(getCookie('lang'));
  
    }).catch((res) => {
        $("#form-modal").modal('toggle');
  
        respuestaAjaxKO(res.code);
  
        let idElementoList = ["nombreProceso", "descripcionProceso", "fechaProceso", "selectCategorias", "checkPubli","formulaProceso"];
        resetearFormulario("formularioGenerico", idElementoList);
  
        setLang(getCookie('lang'));
  
        document.getElementById("modal").style.display = "block";
    });
}

/** Función para editar procesos con ajax y promesas **/
function editarProcesoAjaxPromesa(){
    return new Promise(function(resolve, reject) {
        var token = getCookie('tokenUsuario');
        var publicado = $('input[name=checkPublicado]:checked').val();
        
        if(publicado == 'publicado'){
            var check = 1;
        }else{
            var check = 0;
        }

        var data = {
            controlador: 'GestionProcesos',
            action: 'edit',
            id_proceso : "",
            nombre_proceso : $('#nombreProceso').val(),
            descripcion_proceso : $('#descripcionProceso').val(),
            fecha_proceso : $('#fechaProceso').val(),
            id_categoria : $('#selectCategorias').val(),
            check_aprobacion : check,
            version_proceso : '',
            formula_proceso : $('#formulaProceso').val(),
            dni_usuario : '',
            borrado_proceso : 0
        }

        $.ajax({
            method: "POST",
            url: urlPeticionAjaxEditProceso,
            contentType : "application/x-www-form-urlencoded; charset=UTF-8",
            data: data,
            headers: {'Authorization': token},
        }).done(res => {
            if (res.code != 'EDIT_PROCESO_COMPLETO') {
                reject(res);
            }
            resolve(res);
        }).fail( function( jqXHR ) {
          errorFailAjax(jqXHR.status);
        });
    });
}

/** Función que edita un proceso **/
async function editProceso(){
    await editarProcesoAjaxPromesa()
    .then((res) => {
      $("#form-modal").modal('toggle');
  
      respuestaAjaxOK("PROCESO_EDITADO_OK", res.code);
  
      let idElementoList = ["nombreProceso", "descripcionProceso", "fechaProceso", "selectCategorias", "checkPubli","formulaProceso"];
      resetearFormulario("formularioGenerico", idElementoList);
      setLang(getCookie('lang'));
      document.getElementById("modal").style.display = "block";
      
      $('#nombreProceso').val(getCookie('nombre_proceso'));
      $('#descripcionProceso').val(getCookie('descripcion_proceso'));
      $('#fechaProceso').val(getCookie('fecha_proceso'));
      $('#selectCategorias').val(getCookie('id_categoria'));
      if(getCookie('check_aprobacion') == 0){
        $('input[name=checkPublicado][value=publicado]').prop('checked', true);
      }else{
        $('input[name=checkPublicado][value=noPublicado]').prop('checked', true);
      }
      $('#formulaProceso').val(getCookie('formula_proceso'));
      buscarProceso(getCookie('numeroPagina'), tamanhoPaginaProceso, 'buscarPaginacion', 'PaginadorCreado');
      setLang(getCookie('lang'));
  
    }).catch((res) => {
        $("#form-modal").modal('toggle');
  
        respuestaAjaxKO(res.code);
  
        let idElementoList = ["nombreProceso", "descripcionProceso", "fechaProceso", "selectCategorias", "checkPubli","formulaProceso"];
        resetearFormulario("formularioGenerico", idElementoList);
  
        setLang(getCookie('lang'));
  
        document.getElementById("modal").style.display = "block";
  
  
    });
}

/** Función para buscar procesos con ajax y promesas **/
function buscarProcesoAjaxPromesa(numeroPagina, tamanhoPagina, accion){
    return new Promise(function(resolve, reject) {
        var token = getCookie('tokenUsuario');
        
        if(accion == "buscarModal"){
            var publicado = $('input[name=checkPublicado]:checked').val();

            if($('#fechaProceso').val() == "1900-01-01"){
                var fechaP = '';
            }else{
                var fechaP = $('#fechaProceso').val();
            }
            if(publicado == undefined){
                var check = '';
            }else{
                if(publicado == 'publicado'){
                    var check = 1;
                }else{
                    var check = 0;
                }
            }

            var data = {
                controlador : 'GestionProcesos',
                action : 'searchByParameters',
                nombre_proceso : $('#nombreProceso').val(),
                descripcion_proceso : $('#descripcionProceso').val(),
                fecha_proceso : fechaP,
                id_categoria : $('#selectCategorias').val(),
                check_aprobacion : check,
                version_proceso : '',
                formula_proceso : '',
                dni_usuario : '',
                borrado_proceso : 0,
                inicio : calculaInicio(numeroPagina, tamanhoPaginaProceso),
                tamanhoPagina : tamanhoPaginaProceso
            }
        }
  
        if(accion == "buscarPaginacion"){
            if(getCookie('nombre_proceso') == null || getCookie('nombre_proceso') == ""){
                var nombreP = "";
            }else{
                var nombreP = getCookie('nombre_proceso');
            }
  
            if(getCookie('descripcion_proceso') == null || getCookie('descripcion_proceso') == ""){
                var descripP = "";
            }else{
                var descripP = getCookie('descripcion_proceso');
            }
  
            if(getCookie('fecha_proceso') == null || getCookie('fecha_proceso') == "null" || getCookie('fecha_proceso') == "" ){
                var fechaP= "";
                var fechaString = "";
            }else{
                var fechaP = getCookie('fecha_proceso');
                var fechaString = convierteFecha(fechaP);
            }
            
            if(getCookie('id_categoria') == null || getCookie('id_categoria') == ""){
                var cat = "";
            }else{
                var cat = getCookie('id_categoria');
            }
            
            if(getCookie('check_aprobacion') == null || getCookie('check_aprobacion') == ""){
                var check = "";
            }else{
                var check = getCookie('check_aprobacion');
            }
  
            var data = {
                controlador : 'GestionProcesos',
                action : 'searchByParameters',
                nombre_proceso : nombreP,
                descripcion_proceso : descripP,
                fecha_proceso : fechaString,
                id_categoria : cat,
                check_aprobacion : check,
                version_proceso : '',
                formula_proceso : '',
                dni_usuario : '',
                borrado_proceso : 0,
                inicio : calculaInicio(numeroPagina, tamanhoPaginaProceso),
                tamanhoPagina : tamanhoPaginaProceso
            }
        }
      
        $.ajax({
            method: "POST",
            url: urlPeticionAjaxListarProceso,
            contentType : "application/x-www-form-urlencoded; charset=UTF-8",
            data: data,
            headers: {'Authorization': token},
        }).done(res => {
            if (res.code != 'BUSQUEDA_PROCESO_CORRECTO') {
                reject(res);
            }
            resolve(res);
        }).fail( function( jqXHR ) {
          errorFailAjax(jqXHR.status);
        });
    });
}

/**Función para ver en detalle un proceso con ajax y promesas*/
function detalleProcesoAjaxPromesa(){
    return new Promise(function(resolve, reject) {
        var token = getCookie('tokenUsuario');
        var publicado = $('input[name=checkPublicado]:checked').val();

        if($('#fechaProceso').val() == "1900-01-01"){
            var fechaP = '';
        }else{
            var fechaP = $('#fechaProceso').val();
        }
        
        if(publicado == undefined){
            var check = '';
        }else{
            if(publicado == 'publicado'){
                var check = 1;
            }else{
                var check = 0;
            }
        }

        var data = {
            controlador : 'GestionProcesos',
            action : 'searchByParameters',
            nombre_proceso : $('#nombreProceso').val(),
            descripcion_proceso : $('#descripcionProceso').val(),
            fecha_proceso : fechaP,
            id_categoria : $('#selectCategorias').val(),
            check_aprobacion : check,
            version_proceso : $('#versionProceso').val(),
            formula_proceso : $('#formulaProceso').val(),
            dni_usuario : '',
            borrado_proceso : 0,
            inicio : 0,
            tamanhoPagina : 1
        }
  
        $.ajax({
            method: "POST",
            url: urlPeticionAjaxListarProceso,
            contentType : "application/x-www-form-urlencoded; charset=UTF-8",
            data: data,
            headers: {'Authorization': token},
        }).done(res => {
            if (res.code != 'BUSQUEDA_PROCESO_CORRECTO') {
                reject(res);
            }
            resolve(res);
        }).fail( function( jqXHR ) {
             errorFailAjax(jqXHR.status);
        });
        });
  }

/**Función para eliminar un rol proceso con ajax y promesas*/
function eliminarProcesoAjaxPromesa(){
    return new Promise(function(resolve, reject) {
        var token = getCookie('tokenUsuario');
        var publicado = $('input[name=checkPublicado]:checked').val();

        if($('#fechaProceso').val() == "1900-01-01"){
            var fechaP = '';
        }else{
            var fechaP = $('#fechaProceso').val();
        }
        if(publicado == undefined){
            var check = '';
        }else{
            if(publicado == 'publicado'){
                var check = 1;
            }else{
                var check = 0;
            }
        }

        var data = {
            controlador : 'GestionProcesos',
            action : 'delete',
            id_proceso : $('#idProceso').val(),
            nombre_proceso : $('#nombreProceso').val(),
            descripcion_proceso : $('#descripcionProceso').val(),
            fecha_proceso : fechaP,
            id_categoria : $('#selectCategorias').val(),
            check_aprobacion : check,
            version_proceso : $('#versionProceso').val(),
            formula_proceso : $('#formulaProceso').val(),
            dni_usuario : '',
            borrado_proceso : 1,
        }
  
      
        $.ajax({
            method: "POST",
            url: urlPeticionAjaxDeleteProceso,
            contentType : "application/x-www-form-urlencoded; charset=UTF-8",
            data: data,
            headers: {'Authorization': token},
        }).done(res => {
          if (res.code != 'DELETE_PROCESO_COMPLETO') {
            reject(res);
          }
          resolve(res);
        }).fail( function( jqXHR ) {
          errorFailAjax(jqXHR.status);
        });
    });
}

function cargarProcesosSegunCategoria(numeroPagina, tamanhoPagina){
    return new Promise(function(resolve, reject) {
      var token = getCookie('tokenUsuario');

      var data = {
        controlador : 'GestionProcesos',
        action : 'searchByIdCategoria',
        nombre_proceso : '',
        descripcion_proceso : '',
        fecha_proceso : '',
        id_categoria : getCookie('idCategoria'),
        check_aprobacion : '',
        version_proceso : '',
        formula_proceso : '',
        dni_usuario : '',
        borrado_proceso : 0,
        inicio : calculaInicio(numeroPagina, tamanhoPaginaProceso),
        tamanhoPagina: tamanhoPaginaProceso
      }
  
      $.ajax({
        method: "POST",
        url: urlPeticionAjaxListarProceso,
        contentType : "application/x-www-form-urlencoded; charset=UTF-8",
        data: data,
        headers: {'Authorization': token},
        }).done(res => {
          if (res.code != 'BUSQUEDA_PROCESO_CORRECTO') {
            reject(res);
          }
          resolve(res);
        }).fail( function( jqXHR ) {
          errorFailAjax(jqXHR.status);
        });
    });
  }

  /** Función que visualiza un proceso **/
async function detalleProceso(){
    await detalleProcesoAjaxPromesa()
    .then((res) => {
      $("#form-modal").modal('toggle');
  
      let idElementoList = ["nombreProceso", "descripcionProceso", "fechaProceso", "selectCategorias", "checkPubli","formulaProceso"];
      resetearFormulario("formularioGenerico", idElementoList);
      setLang(getCookie('lang'));
      $('#nombreProceso').val(getCookie('nombre_proceso'));
      $('#descripcionProceso').val(getCookie('descripcion_proceso'));
      $('#fechaProceso').val(getCookie('fecha_proceso'));
      $('#selectCategorias').val(getCookie('id_categoria'));
  
    }).catch((res) => {
        $("#form-modal").modal('toggle');
  
        respuestaAjaxKO(res.code);
  
        let idElementoList = ["nombreProceso", "descripcionProceso", "fechaProceso", "selectCategorias", "checkPubli","formulaProceso"];
        resetearFormulario("formularioGenerico", idElementoList);
        
        setLang(getCookie('lang'));
  
        document.getElementById("modal").style.display = "block";
    });
  }
async function buscarProceso(numeroPagina, tamanhoPagina, accion, paginadorCreado){
    try {
        cargarPermisosFuncProceso();
        const res = await buscarProcesoAjaxPromesa(numeroPagina, tamanhoPagina,accion);
        if($('#form-modal').is(':visible')) {
           $("#form-modal").modal('toggle');
        };
        var datosBusquedas = [];
        datosBusquedas.push('nombre_proceso: ' + res.resource.datosBusquedas['nombre_proceso']);
        datosBusquedas.push('descripcion_proceso: ' + res.resource.datosBusquedas['descripcion_proceso']);
        datosBusquedas.push('fecha_proceso: ' + res.resource.datosBusquedas['fecha_proceso']);
        datosBusquedas.push('id_categoria: ' + res.resource.datosBusquedas['id_categoria']);
        datosBusquedas.push('check_aprobacion: ' + res.resource.datosBusquedas['check_aprobacion']);
        guardarParametrosBusqueda(datosBusquedas);
      
        var numResults = res.resource.numResultados + '';
        var totalResults = res.resource.tamanhoTotal + '';
        var inicio = 0;
        
        if(res.resource.listaBusquedas.length == 0){
            inicio = 0;
            $('#itemPaginacion').attr('hidden',true);
        }else{
            inicio = parseInt(res.resource.inicio)+1;
            $('#itemPaginacion').attr('hidden',false);
        }
        var textPaginacion = inicio + " - " + (parseInt(res.resource.inicio)+parseInt(numResults))  + " total " + totalResults;
        $("#paginacion").html("");

        if(getCookie('rolUsuario') == "Administrador" || getCookie('rolUsuario') == "Gestor"){
            $("#datosProceso").html("");
            $("#checkboxColumnas").html("");
            

            for (var i = 0; i < res.resource.listaBusquedas.length; i++){
                try{
                    const result = await cargarParametrosProceso(res.resource.listaBusquedas[i].id_proceso)
                    var tr = construyeFilaProceso('PROCESO', res.resource.listaBusquedas[i], result.resource.listaBusquedas);
                    $("#datosProceso").append(tr);
                }catch (resultado) {
                    respuestaAjaxKO(resultado.code);
                    document.getElementById("modal").style.display = "block";
                }
            }
        
            var div = createHideShowColumnsWindow({DESCRIPCION_PROCESO_COLUMN:2, DATE_COLUMN:3, RESPONSABLE_PROCESO_COLUMN:4 });
            $("#checkboxColumnas").append(div);
        }else{
            $('#procesos').html('');
            for (var i = 0; i < res.resource.listaBusquedas.length; i++){
                var tr = cargarProcesosCategoria(res.resource.listaBusquedas[i]);
                $("#procesos").append(tr);
            }
        }
        $("#paginacion").append(textPaginacion);
        setLang(getCookie('lang'));

        if(paginadorCreado != 'PaginadorCreado'){
            paginador(totalResults, 'buscarProceso', 'PROCESO');
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
    } catch (res) {
        respuestaAjaxKO(res.code);
        document.getElementById("modal").style.display = "block";
        cargarPermisosFuncProceso();
    
        let idElementoList = ["nombreProceso", "descripcionProceso", "fechaProceso", "selectCategorias", "checkPubli","formulaProceso"];
        resetearFormulario("formularioGenerico", idElementoList);

        setLang(getCookie('lang'));
    }
}

/** Función que elimina un proceso **/
async function deleteProceso(){
    await eliminarProcesoAjaxPromesa()
    .then((res) => {
      $("#form-modal").modal('toggle');
  
      respuestaAjaxOK("PROCESO_ELIMINADO_OK", res.code);
  
      let idElementoList = ["nombreProceso", "descripcionProceso", "fechaProceso", "selectCategorias", "checkPubli","formulaProceso"];
      resetearFormulario("formularioGenerico", idElementoList);
      setLang(getCookie('lang'));
      document.getElementById("modal").style.display = "block";
     
      refrescarTabla(0, tamanhoPaginaProceso);
  
    }).catch((res) => {
       
        $("#form-modal").modal('toggle');
        respuestaAjaxKO(res.code);
  
        let idElementoList = ["nombreProceso", "descripcionProceso", "fechaProceso", "selectCategorias", "checkPubli","formulaProceso"];
        resetearFormulario("formularioGenerico", idElementoList);
  
        setLang(getCookie('lang'));
  
        document.getElementById("modal").style.display = "block";
  
  
    });
}

/* Función para obtener los procesos del sistema */
async function refrescarTabla(numeroPagina, tamanhoPagina, paginadorCreado){
	if(getCookie('rolUsuario') == "Administrador" || getCookie('rolUsuario') == "Gestor"){
	try {
    	const resultado = await cargarProcesosAjaxPromesa(numeroPagina, tamanhoPagina);
    	var numResults = resultado.resource.numResultados + '';
	  	var totalResults = resultado.resource.tamanhoTotal + '';
        var inicio = 0;
	    if(resultado.resource.listaBusquedas.length == 0){
	        inicio = 0;
	        $('#itemPaginacion').attr('hidden',true);
	    }else{
	        inicio = parseInt(resultado.resource.inicio)+1;
	        $('#itemPaginacion').attr('hidden',false);
	    }
      	var textPaginacion = inicio + " - " + (parseInt(resultado.resource.inicio)+parseInt(numResults))  + " total " + totalResults;

      	document.getElementById('cabecera').style.display = "block";
        document.getElementById('cabeceraEliminados').style.display == "none";

      	$("#datosProceso").html("");
	   	$("#checkboxColumnas").html("");
	   	$("#paginacion").html("");

	   	for (var i = 0; i < resultado.resource.listaBusquedas.length; i++){
	   		try{
	   			const result = await cargarParametrosProceso(resultado.resource.listaBusquedas[i].id_proceso)
	   			var tr = construyeFilaProceso('PROCESO', resultado.resource.listaBusquedas[i], result.resource.listaBusquedas);
	  			$("#datosProceso").append(tr);
	   		}catch (resultado) {
    			respuestaAjaxKO(resultado.code);
				document.getElementById("modal").style.display = "block";
  			}
  		}

  		
	   	var div = createHideShowColumnsWindow({DESCRIPCION_PROCESO_COLUMN:2, DATE_COLUMN:3, RESPONSABLE_PROCESO_COLUMN: 4});
      	$("#checkboxColumnas").append(div);
      	$("#paginacion").append(textPaginacion);
      	setLang(getCookie('lang'));

		paginador(totalResults, 'cargarProcesos', 'PROCESO');
		        
		if(numeroPagina == 0){
		    $('#' + (numeroPagina+1)).addClass("active");
		    var numPagCookie = numeroPagina+1;
		}else{
		    $('#' + numeroPagina).addClass("active");
		    var numPagCookie = numeroPagina;
		}

		cargarPermisosFuncProceso();
		setCookie('numeroPagina', numPagCookie);
		comprobarOcultos();
        setLang(getCookie('lang'));
    
  	} catch (resultado) {
  		cargarPermisosFuncProceso();
    	respuestaAjaxKO(resultado.code);
    	setLang(getCookie('lang'));
		document.getElementById("modal").style.display = "block";
  	}
	
	}else{
        await cargarProcesosSegunCategoria(numeroPagina, tamanhoPagina)
        .then((res) => {
            cargarPermisosFuncProceso();
            var numResults = res.resource.numResultados + '';
            var totalResults = res.resource.tamanhoTotal + '';
            var inicio = 0;
            
            if(res.resource.listaBusquedas.length == 0){
                inicio = 0;
                $('#itemPaginacion').attr('hidden',true);
            }else{
                inicio = parseInt(res.resource.inicio)+1;
                $('#itemPaginacion').attr('hidden',false);
            }
            
            var textPaginacion = inicio + " - " + (parseInt(res.resource.inicio)+parseInt(numResults))  + " total " + totalResults;

            $("#paginacion").html('');
            $('#procesos').html('');
            for (var i = 0; i < res.resource.listaBusquedas.length; i++){
                var tr = cargarProcesosCategoria(res.resource.listaBusquedas[i]);
                $('#procesos').append(tr);
            }
            $("#paginacion").append(textPaginacion);
          
            paginador(totalResults, 'cargarProcesosSegunCategoria', 'PROCESO');

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

function showAddProcesos() {
    var idioma = getCookie('lang');
    cambiarFormulario('ADD_PROCESO', 'javascript:addProceso();', 'return comprobarAddProceso();');
    cambiarOnBlurCampos('return comprobarNombreProceso(\'nombreProceso\', \'errorFormatoNombreProceso\', \'nombreProceso\')', 
    'return comprobarDescripcionProceso(\'descripcionProceso\', \'errorFormatoDescripcionProceso\', \'descripcionProceso\')',
    'return comprobarFechaProceso(\'fechaProceso\', \'errorFormatoFechaProceso\', \'fechaProceso\')',
    'return comprobarSelect(\'selectCategorias\', \'errorFormatoIdCategoria\', \'selectCategorias\')',
    'return validaRadioButton(\'checkPubli\', \'errorFormatoCheckPublicado\',  \'checkPubli\', \'checkPublicado\')',
    'return comprobarFormulaProceso(\'formulaProceso\', \'errorFormatoFormulaProceso\', \'formulaProceso\')');
    cambiarIcono('images/add.png', 'ICONO_ADD', 'iconoAddProceso', 'Añadir');
    setLang(idioma);
  
    $('#labelNombreProceso').attr('hidden', true);
    $('#labelDescripcionProceso').attr('hidden', true);
    $('#labelFechaProceso').attr('hidden', true);
    $('#labelIdCategoria').attr('hidden', false);
    $('#labelCheckProceso').attr('hidden',false);
    $('#labelFormulaProceso').attr('hidden', false);
    $('#labelVersionProceso').attr('hidden', true);
    $('#versionProceso').attr('hidden', true);
    $('#labelResponsableProceso').attr('hidden', true);
    $('#responsableProceso').attr('hidden', true);
    $('#labelFormulaProceso').attr('hidden', false);
    $('#formulaProceso').attr('hidden', false);
    $('#checkPubli').attr('hidden', false);
    $('#fechaProceso').attr('hidden', false);
    document.getElementById('explicacionCubrirFormula').style.display = 'block';
    addCodeDivExplicacionFormula('explicacionCubrirFormula', 'EXPLICACION_FORMULA');
  
    let campos = ["nombreProceso", "descripcionProceso", "fechaProceso", "selectCategorias", "checkPublicado", "formulaProceso"];
    let obligatorios = ["obligatorioNombreProceso", "obligatorioDescripcionProceso", "obligatorioFechaProceso","obligatorioIdCategoria", "obligatorioCheck", "obligatorioFormulaProceso"];
    eliminarReadonly(campos);
    mostrarObligatorios(obligatorios);
    ocultarObligatorios(["obligatorioVersionProceso", "obligatorioResponsableProceso"]);
    habilitaCampos(campos);
  
    setLang(getCookie('lang'));
  
}

function showEditar(nombreProceso, descripcionProceso, fechaProceso,versionProceso, checkAprobacion, formulaProceso, idCategoria, nombreCategiria, dniUsuario, usuario, listParametros, idProceso) {
    var idioma = getCookie('lang');
    cambiarFormulario('EDIT_PROCESO', 'javascript:editProceso();', 'return comprobarEditProceso();');
    cambiarOnBlurCampos('return comprobarNombreProceso(\'nombreProceso\', \'errorFormatoNombreProceso\', \'nombreProceso\')', 
        'return comprobarDescripcionProceso(\'descripcionProceso\', \'errorFormatoDescripcionProceso\', \'descripcionProceso\')',
        'return comprobarFechaProceso(\'fechaProceso\', \'errorFormatoFechaProceso\', \'fechaProceso\')',
        'return comprobarSelect(\'selectCategorias\', \'errorFormatoIdCategoria\', \'selectCategorias\')',
        'return validaRadioButton(\'checkPubli\', \'errorFormatoCheckPublicado\',  \'checkPubli\', \'checkPublicado\')',
        'return comprobarFormulaProceso(\'formulaProceso\', \'errorFormatoFormulaProceso\', \'formulaProceso\')');
    cambiarIcono('images/edit.png', 'ICONO_EDIT', 'iconoEditarProceso', 'Editar');
    setLang(idioma);
  
    $('#labelNombreProceso').attr('hidden', true);
    $('#labelDescripcionProceso').attr('hidden', true);
    $('#labelFechaProceso').attr('hidden', true);
    $('#labelIdCategoria').attr('hidden', false);
    $('#labelCheckProceso').attr('hidden',false);
    $('#labelFormulaProceso').attr('hidden', false);
    $('#labelVersionProceso').attr('hidden', true);
    $('#versionProceso').attr('hidden', true);
    $('#labelResponsableProceso').attr('hidden', true);
    $('#responsableProceso').attr('hidden', true);
    $('#labelFormulaProceso').attr('hidden', false);
    $('#formulaProceso').attr('hidden', false);
    $('#checkPubli').attr('hidden', false);
    $('#fechaProceso').attr('hidden', false);

    document.getElementById('explicacionCubrirFormula').style.display = 'block';
    
    rellenarFormulario(nombreProceso, descripcionProceso, fechaProceso,versionProceso, checkAprobacion, formulaProceso, idCategoria, nombreCategiria, dniUsuario, usuario, listParametros);
    insertacampo(document.formularioGenerico,'idProceso', idProceso);

    let campos = ["descripcionProceso", "fechaProceso", "selectCategorias", "checkPublicado", "formulaProceso"];
    let obligatorios = ["obligatorioNombreProceso", "obligatorioDescripcionProceso", "obligatorioFechaProceso","obligatorioIdCategoria", "obligatorioCheck", "obligatorioFormulaProceso"];
    
    anadirReadonly(["nombreProceso"]);
    deshabilitaCampos(["nombreProceso"]);
    eliminarReadonly(campos);
    mostrarObligatorios(obligatorios);
    ocultarObligatorios(["obligatorioVersionProceso", "obligatorioResponsableProceso"]);
    habilitaCampos(campos);
  
    setLang(getCookie('lang'));
}

/** Funcion para buscar un proceso **/
function showBuscarProceso() {
    var idioma = getCookie('lang');
  
    cambiarFormulario('SEARCH_PROCESO', 'javascript:buscarProceso(0,' + tamanhoPaginaProceso + ', \'buscarModal\'' + ',\'PaginadorNo\');', 'return comprobarBuscarProceso();');
     cambiarOnBlurCampos('return comprobarNombreProcesoSearch(\'nombreProceso\', \'errorFormatoNombreProceso\', \'nombreProceso\')', 
    'return comprobarDescripcionProcesoSearch(\'descripcionProceso\', \'errorFormatoDescripcionProceso\', \'descripcionProceso\')',
    'return comprobarFechaProcesoSearch(\'fechaProceso\', \'errorFormatoFechaProceso\', \'fechaProceso\')');
    cambiarIcono('images/search.png', 'ICONO_SEARCH', 'iconoSearchProceso', 'Buscar');
    setLang(idioma);
  
    $('#labelNombreProceso').attr('hidden', true);
    $('#labelDescripcionProceso').attr('hidden', true);
    $('#labelFechaProceso').attr('hidden', true);
    $('#labelIdCategoria').attr('hidden', false);
    $('#labelCheckProceso').attr('hidden',false);
    $('#labelFormulaProceso').attr('hidden', false);
    $('#labelVersionProceso').attr('hidden', true);
    $('#versionProceso').attr('hidden', true);
    $('#labelResponsableProceso').attr('hidden', true);
    $('#responsableProceso').attr('hidden', true);
    $('#labelFormulaProceso').attr('hidden', true);
    $('#formulaProceso').attr('hidden', true);

    document.getElementById('explicacionCubrirFormula').style.display = 'none';
   
    let campos = ["nombreProceso", "descripcionProceso", "fechaProceso", "selectCategorias", "checkPublicado", "formulaProceso"];
    let obligatorios = ["obligatorioNombreProceso", "obligatorioDescripcionProceso", "obligatorioFechaProceso","obligatorioIdCategoria", "obligatorioCheck", "obligatorioFormulaProceso", "obligatorioVersionProceso", "obligatorioResponsableProceso"];
    
    eliminarReadonly(campos);
    ocultarObligatorios(obligatorios);
    habilitaCampos(campos);
    
    if(getCookie('rolUsuario') == "Usuario"){
        $('#checkPubli').attr('hidden', true);
        $('#fechaProceso').attr('hidden', true);
        $('#labelFechaProceso').attr('hidden', true);
        $('#selectCategorias').val(getCookie('idCategoria'));
        deshabilitaCampos(['selectCategorias']);
    }

    setLang(getCookie('lang'));
  
}

/** Funcion para visualizar un proceso **/
function showDetalle(nombreProceso, descripcionProceso, fechaProceso,versionProceso, checkAprobacion, formulaProceso, idCategoria, nombreCategiria, dniUsuario, usuario, listParametros, idProcesoo) {
  
    var idioma = getCookie('lang');

    cambiarFormulario('DETAIL_PROCESO', 'javascript:detalleProceso();', '');
    cambiarIcono('images/close2.png', 'ICONO_CERRAR', 'iconoCerrar', 'Detalle');
   
    setLang(idioma);
    
    $('#labelNombreProceso').attr('hidden', false);
    $('#labelDescripcionProceso').attr('hidden', false);
    $('#labelFechaProceso').attr('hidden', false);
    $('#labelIdCategoria').attr('hidden', false);
    $('#labelCheckProceso').attr('hidden',false);
    $('#labelFormulaProceso').attr('hidden', false);
    $('#labelVersionProceso').attr('hidden', false);
    $('#versionProceso').attr('hidden', false);
    $('#labelResponsableProceso').attr('hidden', false);
    $('#responsableProceso').attr('hidden', false);
    $('#labelFormulaProceso').attr('hidden', false);
    $('#formulaProceso').attr('hidden', false);
    $('#checkPubli').attr('hidden', false);
    $('#fechaProceso').attr('hidden', false);
    document.getElementById('explicacionCubrirFormula').style.display = 'none';
   
    rellenarFormulario(nombreProceso, descripcionProceso, fechaProceso,versionProceso, checkAprobacion, formulaProceso, idCategoria, nombreCategiria, dniUsuario, usuario, listParametros);

	let campos = ["nombreProceso", "descripcionProceso", "fechaProceso", "selectCategorias", "checkPublicado", "versionProceso", "responsableProceso"];
	let obligatorios = ["obligatorioNombreProceso", "obligatorioDescripcionProceso", "obligatorioFechaProceso","obligatorioCheckPublicado", "obligatorioVersionProceso", "obligatorioResponsableProceso"];
    
    anadirReadonly(campos);
    ocultarObligatorios(obligatorios);
    deshabilitaCampos(campos);
    setLang(getCookie('lang'));

}

/** Funcion para eliminar un proceso **/
function showEliminar(nombreProceso, descripcionProceso, fechaProceso,versionProceso, checkAprobacion, formulaProceso, idCategoria, nombreCategoria, dniUsuario, usuario, listParametros, idProceso) {
  
    var idioma = getCookie('lang');

    cambiarFormulario('DELETE_PROCESO', 'javascript:deleteProceso();', '');
    cambiarIcono('images/delete.png', 'ICONO_ELIMINAR', 'iconoEliminar', 'Eliminar');
   
    setLang(idioma);
    
    $('#labelNombreProceso').attr('hidden', false);
    $('#labelDescripcionProceso').attr('hidden', false);
    $('#labelFechaProceso').attr('hidden', false);
    $('#labelIdCategoria').attr('hidden', false);
    $('#labelCheckProceso').attr('hidden',false);
    $('#labelFormulaProceso').attr('hidden', false);
    $('#labelVersionProceso').attr('hidden', false);
    $('#versionProceso').attr('hidden', false);
    $('#labelResponsableProceso').attr('hidden', false);
    $('#responsableProceso').attr('hidden', false);
    $('#labelFormulaProceso').attr('hidden', false);
    $('#formulaProceso').attr('hidden', false);
    $('#checkPubli').attr('hidden', false);
    $('#fechaProceso').attr('hidden', false);

    rellenarFormulario(nombreProceso, descripcionProceso, fechaProceso,versionProceso, checkAprobacion, formulaProceso, idCategoria, nombreCategoria, dniUsuario, usuario, listParametros);
    insertacampo(document.formularioGenerico,'idProceso', idProceso);
    document.getElementById('explicacionCubrirFormula').style.display = 'none';

	let campos = ["nombreProceso", "descripcionProceso", "fechaProceso", "selectCategorias", "checkPublicado", "formulaProceso", "versionProceso", "responsableProceso"];
	let obligatorios = ["obligatorioNombreProceso", "obligatorioDescripcionProceso", "obligatorioFechaProceso","obligatorioCheckPublicado", "obligatorioVersionProceso", "obligatorioResponsableProceso"];
    
    anadirReadonly(campos);
    ocultarObligatorios(obligatorios);
    deshabilitaCampos(campos);
    setLang(getCookie('lang'));

}

/** Funcion para reactivar un proceso **/
function showReactivar(nombreProceso, descripcionProceso, fechaProceso,versionProceso, checkAprobacion, formulaProceso, idCategoria, nombreCategoria, dniUsuario, usuario, listParametros, idProceso) {
  
    var idioma = getCookie('lang');

    cambiarFormulario('REACTIVATE_PROCESO', 'javascript:reactivarProceso();', '');
    cambiarIcono('images/reactivar2.png', 'ICONO_REACTIVAR', 'iconoReactivar', 'Reactivar');
   
    setLang(idioma);
    
    $('#labelNombreProceso').attr('hidden', false);
    $('#labelDescripcionProceso').attr('hidden', false);
    $('#labelFechaProceso').attr('hidden', false);
    $('#labelIdCategoria').attr('hidden', false);
    $('#labelCheckProceso').attr('hidden',false);
    $('#labelFormulaProceso').attr('hidden', false);
    $('#labelVersionProceso').attr('hidden', false);
    $('#versionProceso').attr('hidden', false);
    $('#labelResponsableProceso').attr('hidden', false);
    $('#responsableProceso').attr('hidden', false);
    $('#labelFormulaProceso').attr('hidden', false);
    $('#formulaProceso').attr('hidden', false);
    $('#checkPubli').attr('hidden', false);
    $('#fechaProceso').attr('hidden', false);

    rellenarFormulario(nombreProceso, descripcionProceso, fechaProceso,versionProceso, checkAprobacion, formulaProceso, idCategoria, nombreCategoria, dniUsuario, usuario, listParametros);
    insertacampo(document.formularioGenerico,'idProceso', idProceso);
    document.getElementById('explicacionCubrirFormula').style.display = 'none';

	let campos = ["nombreProceso", "descripcionProceso", "fechaProceso", "selectCategorias", "checkPublicado", "formulaProceso", "versionProceso", "responsableProceso"];
	let obligatorios = ["obligatorioNombreProceso", "obligatorioDescripcionProceso", "obligatorioFechaProceso","obligatorioCheckPublicado", "obligatorioVersionProceso", "obligatorioResponsableProceso"];
    
    anadirReadonly(campos);
    ocultarObligatorios(obligatorios);
    deshabilitaCampos(campos);
    setLang(getCookie('lang'));

}

function construyeSelect(){
    var options = "";
    
    $('#selectCategorias').html('');
  
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
          options = '<option selected value=0><label class="">Selecciona la categoria</label></option>';
          for(var i = 0; i< res.resource.listaBusquedas.length ; i++){
              options += '<option value=' + res.resource.listaBusquedas[i].categoria.id_categoria + '>' + res.resource.listaBusquedas[i].categoria.nombre_categoria + '</option>';
          }
  
          $('#selectCategorias').append(options);
          
        }).fail( function( jqXHR ) {
          errorFailAjax(jqXHR.status);
        });
}

/**Función para cambiar onBlur de los campos*/
function cambiarOnBlurCampos(onBlurNombreProceso, onBlurDescripcionProceso,  onBlurFechaProceso, onBlurSelectCategorias, onBlurCheck, onBlurFormula) {
  
    if (onBlurNombreProceso != ''){
        $("#nombreProceso").attr('onblur', onBlurNombreProceso);
    }

    if (onBlurDescripcionProceso != ''){
        $("#descripcionProceso").attr('onblur', onBlurDescripcionProceso);
    }
    
    if (onBlurFechaProceso != ''){
      $("#fechaProceso").attr('onblur', onBlurFechaProceso);
    }

    if (onBlurSelectCategorias != ''){
        $("#selectCategorias").attr('onblur', onBlurSelectCategorias);
    }

    if (onBlurCheck != ''){
        $("#checkPubli").attr('onblur', onBlurCheck);
    }

    if (onBlurFormula != ''){
        $("#formulaProceso").attr('onblur', onBlurFormula);
    }
}

function rellenarFormulario(nombreProceso, descripcionProceso, fechaProceso,versionProceso, checkAprobacion, formulaProceso, idCategoria, nombreCategoria, dniUsuario, usuario, listParametros) {
  
    $("#nombreProceso").val(nombreProceso);
    $('#descripcionProceso').val(descripcionProceso);
    var fecha = fechaProceso.split('-');
    var fech = fecha[2] + "-" + fecha[1] + "-" + fecha[0];
    $('#fechaProceso').val(fech);
    if(checkAprobacion == 1){
        $('input[name=checkPublicado][value=publicado]').prop('checked', true);
    }else{
        $('input[name=checkPublicado][value=noPublicado]').prop('checked', true);
    }

    $('#formulaProceso').val(formulaProceso);
    $('#selectCategorias').val(idCategoria);
    $('#versionProceso').val(versionProceso);
    $('#responsableProceso').val(usuario);
}

/** Función para gestionar los iconos dependiendo de los permisos de los usuarios **/
function gestionarPermisosProceso(idElementoList) {
    document.getElementById('cabecera').style.display = "none";
    document.getElementById('tablaDatos').style.display = "none";
    document.getElementById('filasTabla').style.display = "none";
    document.getElementById('itemPaginacion').style.display = "block";
  
    idElementoList.forEach( function (idElemento) {
      switch(idElemento.nombre_accion){
        case "Añadir":
          $('#btnAddProceso').attr('src', 'images/add3.png');
          $('#btnAddProceso').css("cursor", "pointer");
          $('#divAddProceso').attr("data-toggle", "modal");
          $('#divAddProceso').attr("data-target", "#form-modal");
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
          $('#btnListarProcesos').attr('src', 'images/search3.png');
          $('#btnSearchDelete').attr('src', 'images/searchDelete3.png');
          $('#btnListarProcesos').css("cursor", "pointer");
          $('.iconoSearchDelete').css("cursor", "pointer");
          $('#divSearchDelete').attr("onclick", "javascript:buscarEliminados(0,\'tamanhoPaginaProceso\', \'PaginadorNo\')");
          $('#divListarProcesos').attr("data-toggle", "modal");
          $('#divListarProcesos').attr("data-target", "#form-modal");
          document.getElementById('cabecera').style.display = "block";
          document.getElementById('tablaDatos').style.display = "block";
          document.getElementById('filasTabla').style.display = "block";
          document.getElementById('itemPaginacion').style.display = "block";
          document.getElementById('procesosUsuario').style.display = "none";
  
          if(document.getElementById('cabeceraEliminados').style.display == "block"){
             document.getElementById('cabecera').style.display = "none";
  
             var texto = document.getElementById('paginacion').innerHTML;
             if(texto == "0 - 0 total 0"){
             document.getElementById('itemPaginacion').style.display = "none";
            }
  
          }
  
          if(getCookie('rolUsuario') == "Usuario"){
            document.getElementById('procesosUsuario').style.display = "block";
            document.getElementById('cabecera').style.display = "none";
            document.getElementById('tablaDatos').style.display = "none";
            document.getElementById('filasTabla').style.display = "block";
            $('#btnListarProcesosUsuario').attr('src', 'images/search3.png');
            $('#btnListarProcesosUsuario').css("cursor", "pointer");
            $('#divListarProcesoUsuario').attr("data-toggle", "modal");
            $('#divListarProcesoUsuario').attr("data-target", "#form-modal");
  
            var texto = document.getElementById('paginacion').innerHTML;
            if(texto == "0 - 0 total 0"){
             document.getElementById('itemPaginacion').style.display = "none";
            }else{
               document.getElementById('itemPaginacion').style.display = "block";
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

function addCodeDivExplicacionFormula(idElemento, codigo) {

	var idioma = getCookie('lang');

	$("#" + idElemento).removeClass();
	$("#" + idElemento).addClass(codigo);
	$("#" + idElemento).addClass("alert alert-success");
	
	setLang(idioma);

}

$(document).ready(function() {
    $("#form-modal").on('hidden.bs.modal', function() {
  
    let idElementoErrorList = ["errorFormatoNombreProceso", "errorFormatoDescripcionProceso", "errorFormatoFechaProceso", "errorFormatoIdCategoria", "errorFormatoCheckPublicado", "errorFormatoFormulaProceso"]

      
    let idElementoList = ["nombreProceso", "descripcionProceso", "fechaProceso", "selectCategorias", "checkPubli","formulaProceso"];
  
    limpiarFormulario(idElementoList);

    eliminarMensajesValidacionError(idElementoErrorList, idElementoList);
     
    setLang(getCookie('lang'));

    $('#checkPubli').attr('style', '');
     
    });
  
});
  
