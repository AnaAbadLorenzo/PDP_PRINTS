/**Función para añadir más objetivos y niveles*/
function addObjetivosNiveles(){
	var options = "";
	var objetivosNiveles = "";

	var listaBusquedasObjetivos = $.parseJSON(getCookie('objetivosSelect'));
	var idObjetivoNivel = parseInt(getCookie('numeroObjNivel')) + 1;
	objetivosNiveles = '<div id="objetivosNiveles' + idObjetivoNivel + '" class="objetivosNiveles">' +
			                '<label class="labelForm NOMBRE_OBJETIVO" id="labelNombreObjetivo' + idObjetivoNivel +'" hidden></label>' +
	            	  		'<select id="selectObjetivos'+ idObjetivoNivel + '" name="objetivos" class="form-select form-select-lg mb-3" aria-label=".form-select-lg example" onblur="comprobarSelect(\'selectObjetivos' +idObjetivoNivel+ '\', \'errorFormatoNombreObjetivoSelect' +idObjetivoNivel+ '\', \'selectObjetivosOptions\')">' + 
	            	  			'<option selected value=0 class="OPCION_DEFECTO_OBJETIVO"></option>';        
					for(var i = 0; i<listaBusquedasObjetivos.length; i++){
						options += '<option value=' + (listaBusquedasObjetivos[i])[0] + '>' + (listaBusquedasObjetivos[i])[1]  + '</option>';
					}
	objetivosNiveles += options;        

	var objetivosNiveles2 =     '</select>' +
						  		'<div class="obligatorio tooltip2" id="obligatorioObjetivos'+idObjetivoNivel+'">*' +
	          						'<span class="tooltiptext2 campoObligatorio CAMPO_OBLIGATORIO">Campo obligatorio</span>' +
	      			  			'</div>' +
		          			    '<div style="display:none" id="errorFormatoNombreObjetivoSelect'+idObjetivoNivel+'"></div>' +  
							  	'<label class="labelForm NIVEL" id="labelNombrePlan" hidden></label>'+                           
	                  			'<input type="number" maxlength="11" size="11" placeholder="NIVEL" name="nivel" id="nivel' + idObjetivoNivel + '" class="NIVEL" onblur=""/>' +
	                   			'<div class="obligatorio tooltip2" id="obligatorioNivel'+idObjetivoNivel+'">*' +
	          						'<span class="tooltiptext2 campoObligatorio CAMPO_OBLIGATORIO">Campo obligatorio</span>' +
	          			  		'</div>' +
	                      		'<div style="display:none" id="errorFormatoNivel"></div>' +
	                      		'<div id="btnBorrar' + idObjetivoNivel + '"name="btnBorrar" value="ELiminar" onclick="javascript:eliminarObjetivosNiveles(\'objetivosNiveles' + idObjetivoNivel+ '\')" class="tooltip17 borrarIcon">' +
	      			  				'<img class="iconoBorrar iconBorrar" src="images/delete3.png" alt="Eliminar" />' +
	        						'<span class="tooltiptext iconBorrar ICONO_ELIMINAR">Eliminar</span>' +
	      			  			'</div>' +
	      			  		'</div>';

	objetivosNiveles += objetivosNiveles2;

	$("#objetivosNiveles").append(objetivosNiveles);

	setCookie('numeroObjNivel', idObjetivoNivel);

  $('.borrarIcon').css("cursor", "pointer");
  setLang(getCookie('lang'));
}

/**Función para añadir más procedimientos y orden*/
function addProcedimientosOrden(){
	var options = "";
	var procedimientosOrden = "";

	var listaBusquedasProcedimientos = $.parseJSON(getCookie('procedimientosSelect'));
	var idProcedimientoOrden = parseInt(getCookie('numeroProcedimientosOrden')) + 1;
	procedimientosOrden = '<div id="procedimientosOrden' + idProcedimientoOrden + '" class="procedimientosOrden">' +
			                '<label class="labelForm NOMBRE_PROCEDIMIENTO" id="labelNombreProcedimiento' + idProcedimientoOrden +'" hidden></label>' +
	            	  		'<select id="selectProcedimientos' + idProcedimientoOrden + '" name ="procedimientos" class="form-select form-select-lg mb-3" aria-label=".form-select-lg example">' + 
	            	  			'<option selected value=0 class="OPCION_DEFECTO_PROCEDIMIENTO"></option>';        
					for(var i = 0; i<listaBusquedasProcedimientos.length; i++){
						options += '<option value=' + (listaBusquedasProcedimientos[i])[0] + '>' + (listaBusquedasProcedimientos[i])[1]  + '</option>';
					}
	
  procedimientosOrden += options;        

	var procedimientosOrden2 =     '</select>' +
						  		'<div class="obligatorio tooltip2" id="obligatorioProcedimientos'+idProcedimientoOrden+'">*' +
	          						'<span class="tooltiptext2 campoObligatorio CAMPO_OBLIGATORIO">Campo obligatorio</span>' +
	      			  			'</div>' +
		          			    '<div style="display:none" id="errorFormatoNombreProcedimientoSelect'+idProcedimientoOrden+'"></div>' +  
							  	'<label class="labelForm ORDEN_PROCESO" id="labelOrdenProceso'+idProcedimientoOrden+'" hidden></label> '+                           
	                  			'<input type="number" maxlength="11" size="11" placeholder="ORDEN_PROCESO" name="ordenProceso" id="ordenProceso'+idProcedimientoOrden+'" class="ORDEN_PROCESO" onblur="" hidden/>' +
	                   			'<div class="obligatorio tooltip2" id="obligatorioOrdenProceso'+idProcedimientoOrden+'" style="display:none">*' +
	          						'<span class="tooltiptext2 campoObligatorio CAMPO_OBLIGATORIO">Campo obligatorio</span>' +
	          			  		'</div>' +
	                      		'<div style="display:none" id="errorFormatoOrdenProceso'+idProcedimientoOrden+'"></div> ' +
	                      		'<div id="btnBorrarProcedimiento'+idProcedimientoOrden+'" name="btnBorrar" value="ELiminar" onclick="javascript:eliminarProcedimientosOrden(\'procedimientosOrden'+idProcedimientoOrden+'\')" class="tooltip17 borrarIcon">' +
	      			  				'<img class="iconoBorrar iconBorrar" src="images/delete3.png" alt="Eliminar" />' +
	        						'<span class="tooltiptext iconBorrar ICONO_ELIMINAR">Eliminar</span>' +
	      			  			'</div>' +
	      			  		'</div>';

	procedimientosOrden += procedimientosOrden2;

	$("#procedimientosOrden").append(procedimientosOrden);

	setCookie('numeroProcedimientosOrden', idProcedimientoOrden);

  $('.borrarIcon').css("cursor", "pointer");
  setLang(getCookie('lang'));
}

/**Función que eliminar el contenido de un div de objetivos y niveles*/
function eliminarObjetivosNiveles(idObjetivosNiveles){
	$("#" + idObjetivosNiveles).remove();
}

/** Función para volver atrás en el html **/
function volverMisProcedimientos(){
  window.location.href = "MisProcedimientos.html";
}

/**Función que eliminar el contenido de un div de procedimientos y orden*/
function eliminarProcedimientosOrden(idProcedimientosOrden){
	$("#" + idProcedimientosOrden).remove();
}


/**Función para enviar respuestas **/
function enviarRespuesta(idProceso, idFile){
  if(comprobarProcesoUsuario(idProceso)){
    return new Promise(function(resolve, reject) {
          var token = getCookie('tokenUsuario');
          var evidencia = $("#" + idFile).prop("files")[0];

          var formData = new FormData();
          formData.append("file", evidencia);
          formData.append("idProceso", idProceso);
          formData.append("idProcedimientoUsuario", getCookie('idProcedimientoUsuario'));
          formData.append("usuario", getCookie('usuario'));

          
          $.ajax({
            method: "POST",
              url: urlPeticionAjaxGuardarEvidencia,
              contentType : "application/json",
              data: formData,  
              cache: false,
              contentType: false,
              processData: false,
              headers: {'Authorization': token},
              }).done(res => {
                if (res.code != 'EVIDENCIA_GUARDADA') {
                  respuestaAjaxKO(res.code);
                  document.getElementById('modal').style.display = "block";
                  setLang(getCookie('lang'));
                }
                respuestaAjaxOK('EVIDENCIA_GUARDADA_OK', res.code);
                document.getElementById('modal').style.display = "block";
                setLang(getCookie('lang'));
              }).fail( function( jqXHR ) {
                errorFailAjax(jqXHR.status);
              });
       
      });
  }
}

/**Función para enviar respuestas **/
function modificarRespuesta(idProceso, idFile){
  if(comprobarProcesoUsuario(idProceso)){
    return new Promise(function(resolve, reject) {
          var token = getCookie('tokenUsuario');
          var evidencia = $("#" + idFile).prop("files")[0];

          var formData = new FormData();
          formData.append("file", evidencia);
          formData.append("idProceso", idProceso);
          formData.append("idProcedimientoUsuario", getCookie('idProcedimientoUsuario'));
          formData.append("usuario", getCookie('usuario'));

          
          $.ajax({
            method: "POST",
              url: urlPeticionAjaxModificarEvidencia,
              contentType : "application/json",
              data: formData,  
              cache: false,
              contentType: false,
              processData: false,
              headers: {'Authorization': token},
              }).done(res => {
                if (res.code != 'EVIDENCIA_MODIFICADA') {
                  respuestaAjaxKO(res.code);
                  document.getElementById('modal').style.display = "block";
                  setLang(getCookie('lang'));
                }
                respuestaAjaxOK('EVIDENCIA_GUARDADA_OK', res.code);
                document.getElementById('modal').style.display = "block";
                setLang(getCookie('lang'));
              }).fail( function( jqXHR ) {
                errorFailAjax(jqXHR.status);
              });
       
      });
  }
}

/**Funcion para enviar el procedimientoUsuarioProceso **/
function guardarProcedimientoUsuarioProceso(idProceso, idFile){
    if(comprobarProcesoUsuario(idProceso)){
      return new Promise(function(resolve, reject) {
      var token = getCookie('tokenUsuario');

      var procedimiento = {
        idProcedimiento: '',
        nombreProcedimiento : '',
        descripProcedimiento : '',
        fechaProcedimiento : '',
        checkUsuario : '',
        plan : {
          idPlan : '',
          nombrePlan : '',
          descripPlan : '',
          fechaPlan : '',
          borradoPlan : '',
          objetivo : {
            idObjetivo : '',
            nombreObjetivo : '',
            descripObjetivo : '',
            borradoObjetivo : ''
          }
        },
        borradoProcedimiento : ''
      }

      var usuario = {
        dniUsuario : '',
        usuario : '',
        passwdUsuario : '',
        borradoUsuario : '',
      }
      
      var procedimientoUsuarioProceso = {
        idProcedimientoUsuarioProceso : "",
        fechaProcedimientoUsuarioProceso : "",
        borradoProcedimientoUsuarioProceso : 0,
        respuestaPosible : {
          idRespuesta : $('input[name=respuestaPosible]:checked').val(),
          textoRespuesta : "",
          borradoRespuesta : ""
        },

        proceso : {
          idProceso : idProceso,
          nombreProceso : "",
          descripProceso : "",
          fechaProceso : "",
          borradoProceso : ""
        },

        procedimientoUsuario : {
          idProcedimientoUsuario : getCookie('idProcedimientoUsuario'),
          puntuacionProcedimientoUsuario : "",
          fechaProcedimientoUsuario : "",
          borradoProcedimientoUsuario : "",
          procedimiento : procedimiento,
          usuario : usuario
        },
      }

      var data = {
        usuario : getCookie('usuario'),
        procedimientoUsuarioProceso : procedimientoUsuarioProceso
      }
      
      $.ajax({
        method: "POST",
        url: urlPeticionAjaxAddProcedimientoUsuarioProceso,
        contentType : "application/json",
        data: JSON.stringify(data),  
        dataType : 'json',
        headers: {'Authorization': token},
        }).done(res => {
          if (res.code != 'PROCEDIMIENTO_USUARIO_PROCESO_GUARDADO') {
            reject(res);
          }
          resolve(res);
        }).fail( function( jqXHR ) {
          errorFailAjax(jqXHR.status);
        });
    });
  }
}

/**Funcion para enviar el procedimientoUsuarioProceso **/
function modificarProcedimientoUsuarioProceso(idProceso, idFile){
    if(comprobarProcesoUsuario(idProceso)){
      return new Promise(function(resolve, reject) {
      var token = getCookie('tokenUsuario');

      var procedimiento = {
        idProcedimiento: '',
        nombreProcedimiento : '',
        descripProcedimiento : '',
        fechaProcedimiento : '',
        checkUsuario : '',
        plan : {
          idPlan : '',
          nombrePlan : '',
          descripPlan : '',
          fechaPlan : '',
          borradoPlan : '',
          objetivo : {
            idObjetivo : '',
            nombreObjetivo : '',
            descripObjetivo : '',
            borradoObjetivo : ''
          }
        },
        borradoProcedimiento : ''
      }

      var usuario = {
        dniUsuario : '',
        usuario : '',
        passwdUsuario : '',
        borradoUsuario : '',
      }
      
      var procedimientoUsuarioProceso = {
        idProcedimientoUsuarioProceso : "",
        fechaProcedimientoUsuarioProceso : "",
        borradoProcedimientoUsuarioProceso : 0,
        respuestaPosible : {
          idRespuesta : $('input[name=respuestaPosible]:checked').val(),
          textoRespuesta : "",
          borradoRespuesta : ""
        },

        proceso : {
          idProceso : idProceso,
          nombreProceso : "",
          descripProceso : "",
          fechaProceso : "",
          borradoProceso : ""
        },

        procedimientoUsuario : {
          idProcedimientoUsuario : getCookie('idProcedimientoUsuario'),
          puntuacionProcedimientoUsuario : "",
          fechaProcedimientoUsuario : "",
          borradoProcedimientoUsuario : "",
          procedimiento : procedimiento,
          usuario : usuario
        }
      }

      var data = {
        usuario : getCookie('usuario'),
        procedimientoUsuarioProceso : procedimientoUsuarioProceso
      }
      
      $.ajax({
        method: "POST",
        url: urlPeticionAjaxModificarProcedimientoUsuarioProceso,
        contentType : "application/json",
        data: JSON.stringify(data),  
        dataType : 'json',
        headers: {'Authorization': token},
        }).done(res => {
          if (res.code != 'PROCEDIMIENTO_USUARIO_PROCESO_GUARDADO') {
            reject(res);
          }
          resolve(res);
        }).fail( function( jqXHR ) {
          errorFailAjax(jqXHR.status);
        });
    });
  }
}

/**Función para cargar las respuestas posibles de BD **/
function cargarRespuestasPosiblesAjaxPromesa(){
  return new Promise(function(resolve, reject) {
    var token = getCookie('tokenUsuario');
    
    $.ajax({
      method: "GET",
      url: urlPeticionAjaxListadoRespuestasPosiblesSinP,
      contentType : "application/json", 
      dataType : 'json',
      headers: {'Authorization': token},
      }).done(res => {
        if (res.code != 'RESPUESTAS_POSIBLES_LISTADAS') {
          reject(res);
        }
        resolve(res);
    }).fail( function( jqXHR ) {
        errorFailAjax(jqXHR.status);
      });
  });
}

/**Función para cargar los procedimientos de BD **/
function cargarProcedimientosAjaxPromesa(){
  return new Promise(function(resolve, reject) {
    var token = getCookie('tokenUsuario');
    
    $.ajax({
      method: "GET",
      url: urlPeticionAjaxListadoProcedimientosSinP,
      contentType : "application/json", 
      dataType : 'json',
      headers: {'Authorization': token},
      }).done(res => {
        if (res.code != 'PROCEDIMIENTOS_LISTADOS') {
          reject(res);
        }
        resolve(res);
    }).fail( function( jqXHR ) {
        errorFailAjax(jqXHR.status);
      });
  });
}

/**Función para cargar los objetivos de BD **/
function cargarObjetivosAjaxPromesa(){
  return new Promise(function(resolve, reject) {
    var token = getCookie('tokenUsuario');
    
    $.ajax({
      method: "GET",
      url: urlPeticionAjaxListadoObjetivosSinP,
      contentType : "application/json", 
      dataType : 'json',
      headers: {'Authorization': token},
      }).done(res => {
        if (res.code != 'OBJETIVOS_LISTADOS') {
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

    var idsObjetivos = [];
    var idsProcedimientos = [];
    var procedimientos = [];
    var objetivos = [];
    var niveles = [];
    var idsRespuestas = [];
    var respuestasPosibles = [];
    var ordenProceso = [];

    var proceso = {
      idProceso : "",
      nombreProceso : $('#nombreProceso').val(),
      descripProceso : $('#descripcionProceso').val(),
      fechaProceso : $('#fechaProceso').val(),
      borradoProceso : 0
    }
    

    var selects = $('select[name="objetivos"]');
    var checksRespuestas = $('input[name=respuestaPosible]');
    var selectsProcedimientos = $('select[name="procedimientos"]');

    for(var i = 0; i<selects.length; i++){
    	var select = $(selects[i]);
    	idsObjetivos.push($(select).children("option:selected").val());
    }

    for(var i = 0; i<selectsProcedimientos.length; i++){
    	var select = $(selectsProcedimientos[i]);
    	idsProcedimientos.push($(select).children("option:selected").val());
    }

    $("input[name='nivel']").each(function() {
    	niveles.push($(this).val());
	});

	$("input[name='respuestaPosible']").each(function() {
		if($(this).is(':checked')){
           idsRespuestas.push($(this).val());
        }
	});

    for(var i = 0; i<idsObjetivos.length; i++){
    	var objetivo = {
    		idObjetivo : idsObjetivos[i],
    		nombreObjetivo : '',
    		descripObjetivo : '',
    		borradoObjetivo : '',
    	}
    	objetivos.push(objetivo);
    }

    for(var i = 0; i<idsProcedimientos.length; i++){
    	var procedimiento = {
	      idProcedimiento: idsProcedimientos[i],
	      nombreProcedimiento : '',
	      descripProcedimiento : '',
	      fechaProcedimiento : '',
	      checkUsuario : '',
	      plan : {
	        idPlan : '',
	        nombrePlan : '',
	        descripPlan : '',
	        fechaPlan : '',
	        borradoPlan : '',
	        objetivo : {
	          idObjetivo : '',
	          nombreObjetivo : '',
	          descripObjetivo : '',
	          borradoObjetivo : ''
	        }
	      },
	      borradoProcedimiento : ''
    	}

    	procedimientos.push(procedimiento);
    	ordenProceso.push(0);
    }

    for(var i = 0; i<idsRespuestas.length; i++){
    	var respuesta = {
    		 idRespuesta: idsRespuestas[i],
     		 textoRespuesta : '',
      		 borradoRespuesta : 0
    	}
    	respuestasPosibles.push(respuesta);
    }


    var data = {
      usuario : getCookie('usuario'),
      proceso : proceso,
      procedimientos : procedimientos,
      objetivos : objetivos,
      niveles : niveles,
      respuestasPosibles: respuestasPosibles,
      ordenProceso: ordenProceso
    }
    
    $.ajax({
      method: "POST",
      url: urlPeticionAjaxAddProceso,
      contentType : "application/json",
      data: JSON.stringify(data),  
      dataType : 'json',
      headers: {'Authorization': token},
      }).done(res => {
        if (res.code != 'PROCESO_GUARDADO') {
          reject(res);
        }
        resolve(res);
      }).fail( function( jqXHR ) {
        errorFailAjax(jqXHR.status);
      });
  });
}

/** Función para editar procesos con ajax y promesas **/
function editarProcesoAjaxPromesa(){
  return new Promise(function(resolve, reject) {
    var token = getCookie('tokenUsuario');
 	var idsObjetivos = [];
    var idsProcedimientos = [];
    var procedimientos = [];
    var objetivos = [];
    var niveles = [];
    var idsRespuestas = [];
    var respuestasPosibles = [];
    var ordenProceso = [];

    var proceso = {
      idProceso : $('#idProceso').val(),
      nombreProceso : $('#nombreProceso').val(),
      descripProceso : $('#descripcionProceso').val(),
      fechaProceso : $('#fechaProceso').val(),
      borradoProceso : 0
    }

    var selects = $('select[name="objetivos"]');
    var checksRespuestas = $('input[name=respuestaPosible]');
    var selectsProcedimientos = $('select[name="procedimientos"]');

    for(var i = 0; i<selects.length; i++){
    	var select = $(selects[i]);
    	idsObjetivos.push($(select).children("option:selected").val());
    }

    for(var i = 0; i<selectsProcedimientos.length; i++){
    	var select = $(selectsProcedimientos[i]);
    	idsProcedimientos.push($(select).children("option:selected").val());
    }

    $("input[name='nivel']").each(function() {
    	niveles.push($(this).val());
	});

	 $("input[name='ordenProceso']").each(function() {
    	ordenProceso.push($(this).val());
	});

	$("input[name='respuestaPosible']").each(function() {
		if($(this).is(':checked')){
           idsRespuestas.push($(this).val());
        }
	});

    for(var i = 0; i<idsObjetivos.length; i++){
    	var objetivo = {
    		idObjetivo : idsObjetivos[i],
    		nombreObjetivo : '',
    		descripObjetivo : '',
    		borradoObjetivo : '',
    	}
    	objetivos.push(objetivo);
    }

    for(var i = 0; i<idsRespuestas.length; i++){
    	var respuesta = {
    		 idRespuesta: idsRespuestas[i],
     		 textoRespuesta : '',
      		 borradoRespuesta : 0
    	}
    	respuestasPosibles.push(respuesta);
    }

    for(var i = 0; i<idsProcedimientos.length; i++){
    	var procedimiento = {
	      idProcedimiento: idsProcedimientos[i],
	      nombreProcedimiento : '',
	      descripProcedimiento : '',
	      fechaProcedimiento : '',
	      checkUsuario : '',
	      plan : {
	        idPlan : '',
	        nombrePlan : '',
	        descripPlan : '',
	        fechaPlan : '',
	        borradoPlan : '',
	        objetivo : {
	          idObjetivo : '',
	          nombreObjetivo : '',
	          descripObjetivo : '',
	          borradoObjetivo : ''
	        }
	      },
	      borradoProcedimiento : ''
    	}

    	procedimientos.push(procedimiento);
    	ordenProceso.push(ordenProceso[i]);
    }


    var data = {
      usuario : getCookie('usuario'),
      proceso : proceso,
      procedimientos : procedimientos,
      objetivos : objetivos,
      niveles : niveles,
      respuestasPosibles: respuestasPosibles,
      ordenProceso: ordenProceso
    }
    
    $.ajax({
      method: "POST",
      url: urlPeticionAjaxEditProceso,
      contentType : "application/json",
      data: JSON.stringify(data),  
      dataType : 'json',
      headers: {'Authorization': token},
      }).done(res => {
        if (res.code != 'PROCESO_MODIFICADO') {
          reject(res);
        }
        resolve(res);
      }).fail( function( jqXHR ) {
        errorFailAjax(jqXHR.status);
      });
  });
}


/** Función para buscar procesos con ajax y promesas **/
function buscarProcesoAjaxPromesa(numeroPagina, tamanhoPagina, accion){
  return new Promise(function(resolve, reject) {
    var token = getCookie('tokenUsuario');

    if(accion == "buscarModal"){
      if($('#fechaProceso').val() == "1900-01-01"){
      	var fechaP = '';
      }else{
      	var fechaP = $('#fechaProceso').val();
      }

      var data = {
        nombreProceso : $('#nombreProceso').val(),
        descripProceso : $('#descripcionProceso').val(),
        fechaProceso : fechaP,
        inicio : calculaInicio(numeroPagina, tamanhoPaginaProceso),
        tamanhoPagina : tamanhoPaginaProceso
      }
    }

    if(accion == "buscarPaginacion"){
      if(getCookie('nombreProceso') == null || getCookie('nombreProceso') == ""){
        var nombreP = "";
      }else{
        var nombreP = getCookie('nombreProceso');
      }

      if(getCookie('descripProceso') == null || getCookie('descripProceso') == ""){
        var descripP = "";
      }else{
        var descripP = getCookie('descripProc');
      }

      if(getCookie('fechaProceso') == null || getCookie('fechaProceso') == "null" || getCookie('fechaProceso') == "" ){
        var fechaP= "";
        var fechaString = "";
      }else{
        var fechaP = getCookie('fechaProceso');
        var fechaString = convierteFecha(fechaP);
      }

      var data = {
        nombreProceso : nombreP,
        descripProceso : descripP,
        fechaProceso : fechaP,
        inicio : calculaInicio(numeroPagina, tamanhoPaginaProceso),
        tamanhoPagina : tamanhoPaginaProceso 
      }
    }
    
    $.ajax({
      method: "POST",
      url: urlPeticionAjaxListarProceso,
      contentType : "application/json",
      data: JSON.stringify(data),  
      dataType : 'json',
      headers: {'Authorization': token},
      }).done(res => {
        if (res.code != 'PROCESO_ENCONTRADO') {
          reject(res);
        }
        resolve(res);
      }).fail( function( jqXHR ) {
        errorFailAjax(jqXHR.status);
      });
  });
}

/** Función para recuperar los permisos de un usuario sobre el proceso **/
function cargarPermisosFuncProcesoAjaxPromesa(){
  return new Promise(function(resolve, reject) {
    var nombreUsuario = getCookie('usuario');
    var token = getCookie('tokenUsuario');
    
    var usuario = nombreUsuario;
  
    $.ajax({
      method: "GET",
      url: urlPeticionAjaxAccionesUsuario,
      contentType : "application/json",
      data: { usuario : usuario, funcionalidad : 'Gestión de procesos'},  
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

/**Función para eliminar un rol proceso con ajax y promesas*/
function eliminarProcesoAjaxPromesa(){
  return new Promise(function(resolve, reject) {
  	var token = getCookie('tokenUsuario');
    var idsObjetivos = [];
    var idsProcedimientos = [];
    var procedimientos = [];
    var objetivos = [];
    var niveles = [];
    var idsRespuestas = [];
    var respuestasPosibles = [];
    var ordenProceso = [];

    var proceso = {
      idProceso : $('#idProceso').val(),
      nombreProceso : $('#nombreProceso').val(),
      descripProceso : $('#descripcionProceso').val(),
      fechaProceso : $('#fechaProceso').val(),
      borradoProceso : 1
    }

    var selects = $('select[name="objetivos"]');
    var checksRespuestas = $('input[name=respuestaPosible]');
    var selectsProcedimientos = $('select[name="procedimientos"]');

    for(var i = 0; i<selects.length; i++){
    	var select = $(selects[i]);
    	idsObjetivos.push($(select).children("option:selected").val());
    }

    for(var i = 0; i<selectsProcedimientos.length; i++){
    	var select = $(selectsProcedimientos[i]);
    	idsProcedimientos.push($(select).children("option:selected").val());
    }

    $("input[name='nivel']").each(function() {
    	niveles.push($(this).val());
	});

	 $("input[name='ordenProceso']").each(function() {
    	ordenProceso.push($(this).val());
	});

	$("input[name='respuestaPosible']").each(function() {
		if($(this).is(':checked')){
           idsRespuestas.push($(this).val());
        }
	});

    for(var i = 0; i<idsObjetivos.length; i++){
    	var objetivo = {
    		idObjetivo : idsObjetivos[i],
    		nombreObjetivo : '',
    		descripObjetivo : '',
    		borradoObjetivo : '',
    	}
    	objetivos.push(objetivo);
    }

    for(var i = 0; i<idsRespuestas.length; i++){
    	var respuesta = {
    		 idRespuesta: idsRespuestas[i],
     		 textoRespuesta : '',
      		 borradoRespuesta : 0
    	}
    	respuestasPosibles.push(respuesta);
    }

    for(var i = 0; i<idsProcedimientos.length; i++){
    	var procedimiento = {
	      idProcedimiento: idsProcedimientos[i],
	      nombreProcedimiento : '',
	      descripProcedimiento : '',
	      fechaProcedimiento : '',
	      checkUsuario : '',
	      plan : {
	        idPlan : '',
	        nombrePlan : '',
	        descripPlan : '',
	        fechaPlan : '',
	        borradoPlan : '',
	        objetivo : {
	          idObjetivo : '',
	          nombreObjetivo : '',
	          descripObjetivo : '',
	          borradoObjetivo : ''
	        }
	      },
	      borradoProcedimiento : ''
    	}

    	procedimientos.push(procedimiento);
    	ordenProceso.push(ordenProceso[i]);
    }


    var data = {
      usuario : getCookie('usuario'),
      proceso : proceso,
      procedimientos : procedimientos,
      objetivos : objetivos,
      niveles : niveles,
      respuestasPosibles: respuestasPosibles,
      ordenProceso: ordenProceso
    }
    
    $.ajax({
      method: "POST",
      url: urlPeticionAjaxDeleteProceso,
      contentType : "application/json",
      data: JSON.stringify(data),  
      dataType : 'json',
      headers: {'Authorization': token},
      }).done(res => {
        if (res.code != 'PROCESO_ELIMINADO') {
          reject(res);
        }
        resolve(res);
      }).fail( function( jqXHR ) {
        errorFailAjax(jqXHR.status);
      });
  });
}

/*Función que comprueba los permisos del usuario sobre la funcionalidad*/
async function cargarPermisosFuncProceso(){
  await cargarPermisosFuncProcesoAjaxPromesa()
  .then((res) => {
    gestionarPermisosProceso(res.data);
    setLang(getCookie('lang'));
  }).catch((res) => {
      respuestaAjaxKO(res.code);
      setLang(getCookie('lang'));
      document.getElementById("modal").style.display = "block";
  });
}

/*Función que carga las respuestas posibes*/
async function cargarRespuestasPosibles(){
  await cargarRespuestasPosiblesAjaxPromesa()
  .then((res) => {
  	$('#respuestasPosibles').html('');

  	for(var i = 0; i<res.data.listaBusquedas.length; i++){
  		var idCheckBox=res.data.listaBusquedas[i].textoRespuesta;
  		var value=res.data.listaBusquedas[i].idRespuesta;
  		var respuestasPosibles = '<div class="form-check form-check-inline">' + 
  									'<input class="form-check-input" name="respuestaPosible" type="checkbox" id="' + idCheckBox + '" value="' + value + '" />' + 
  									'<label class="form-check-label" for="' + idCheckBox + '">' + idCheckBox + '</label>' + 
  								 '</div>';
  		$('#respuestasPosibles').append(respuestasPosibles);
      setLang(getCookie('lang'));
  	}
  	
  }).catch((res) => {
      respuestaAjaxKO(res.code);
      setLang(getCookie('lang'));
      document.getElementById("modal").style.display = "block";
  });
}

/*Función que carga los procedimientos*/
async function cargarProcedimientos(){
  await cargarProcedimientosAjaxPromesa()
  .then((res) => {
  	var options = "";
  	var procedimientos = [];
  
    $('#selectProcedimientos1').html('');

 		options = '<option selected value=0 class="OPCION_DEFECTO_PROCEDIMIENTO"></option>';
        for(var i = 0; i< res.data.listaBusquedas.length ; i++){
          var elementArray = [res.data.listaBusquedas[i].idProcedimiento, res.data.listaBusquedas[i].nombreProcedimiento];
          options += '<option value=' + res.data.listaBusquedas[i].idProcedimiento + '>' + res.data.listaBusquedas[i].nombreProcedimiento + '</option>';
          procedimientos.push(elementArray);
        }

        $('#selectProcedimientos1').append(options);
        setCookie('procedimientosSelect', JSON.stringify(procedimientos));
        setLang(getCookie('lang'));
  	
  }).catch((res) => {
      respuestaAjaxKO(res.code);
      setLang(getCookie('lang'));
      document.getElementById("modal").style.display = "block";
  });
}


/*Función que carga los objetivos*/
async function cargarObjetivos(){
  await cargarObjetivosAjaxPromesa()
  .then((res) => {
  	var options = "";
  	var objetivos = [];
  
    $('#selectObjetivos1').html('');

    var token = getCookie('tokenUsuario');

        options = '<option selected value=0 class="OPCION_DEFECTO_OBJETIVO"</option>';
        for(var i = 0; i< res.data.listaBusquedas.length ; i++){
          var elementArray = [res.data.listaBusquedas[i].idObjetivo, res.data.listaBusquedas[i].nombreObjetivo];
          options += '<option value=' + res.data.listaBusquedas[i].idObjetivo + '>' + res.data.listaBusquedas[i].nombreObjetivo + '</option>';
          objetivos.push(elementArray);
        }

        $('#selectObjetivos1').append(options);
        setCookie('objetivosSelect', JSON.stringify(objetivos));
        setLang(getCookie('lang'));
  	
  }).catch((res) => {
      respuestaAjaxKO(res.code);
      setLang(getCookie('lang'));
      document.getElementById("modal").style.display = "block";
  });
}

/** Función para recuperar los procesos con ajax y promesas **/
function cargarProcesosAjaxPromesa(numeroPagina, tamanhoPagina){
  return new Promise(function(resolve, reject) {
  	var token = getCookie('tokenUsuario');

    var data = {
      inicio : calculaInicio(numeroPagina, tamanhoPaginaProceso),
      tamanhoPagina : tamanhoPaginaProceso
    }
    
    $.ajax({
      method: "POST",
      url: urlPeticionAjaxListarTodosProcesos,
      contentType : "application/json",
      data: JSON.stringify(data),  
      dataType : 'json',
      headers: {'Authorization': token},
      }).done(res => {
        if (res.code != 'PROCESOS_LISTADOS') {
          reject(res);
        }
        resolve(res);
      }).fail( function( jqXHR ) {
        errorFailAjax(jqXHR.status);
      });
  });
}

/** Función para recuperar los procesos con ajax y promesas **/
function cargarDatosProceso(idProceso){
  return new Promise(function(resolve, reject) {
  	var token = getCookie('tokenUsuario');
    
    $.ajax({
      method: "POST",
      url: urlPeticionAjaxListarDatosProceso,
      contentType : "application/json",
      data: idProceso.toString(),  
      dataType : 'json',
      headers: {'Authorization': token},
      }).done(result => {
        if (result.code != 'DATOS_PROCESOS_LISTADOS') {
          reject(result);
        }
        resolve(result);
      }).fail( function( jqXHR ) {
        errorFailAjax(jqXHR.status);
      });
  });
}

/** Función para recuperar los procesos con ajax y promesas **/
function listarProcesoById(idProceso){
  return new Promise(function(resolve, reject) {
    var token = getCookie('tokenUsuario');
    
    $.ajax({
      method: "POST",
      url: urlPeticionAjaxListarProcesoById,
      contentType : "application/json",
      data: idProceso.toString(),  
      dataType : 'json',
      headers: {'Authorization': token},
      }).done(result => {
        if (result.code != 'PROCESO_ENCONTRADO') {
          reject(result);
        }
        resolve(result);
      }).fail( function( jqXHR ) {
        errorFailAjax(jqXHR.status);
      });
  });
}

/** Función para recuperar los procesos con ajax y promesas **/
function cargarDatosProcesoByProcesoAndProcedimiento(idProceso, idProcedimiento){
  return new Promise(function(resolve, reject) {
    var token = getCookie('tokenUsuario');

    var procesoProcedimiento = {
      idProceso : idProceso,
      idProcedimiento : parseInt(idProcedimiento)
    }
    
    $.ajax({
      method: "POST",
      url: urlPeticionAjaxListarDatosProcesoByIdProcesoAndIdProcedimiento,
      contentType : "application/json",
      data: JSON.stringify(procesoProcedimiento),  
      dataType : 'json',
      headers: {'Authorization': token},
      }).done(result => {
        if (result.code != 'DATOS_PROCESOS_LISTADOS') {
          reject(result);
        }
        resolve(result);
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
      inicio : calculaInicio(numeroPagina, tamanhoPaginaProceso),
      tamanhoPagina : tamanhoPaginaProceso
    }
    
    $.ajax({
      method: "POST",
      url: urlPeticionAjaxListarProcesosEliminados,
      contentType : "application/json",
      data: JSON.stringify(data),  
      dataType : 'json',
      headers: {'Authorization': token},
      }).done(res => {
        if (res.code != 'PROCESOS_ELIMINADOS_LISTADOS') {
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
    
    var data = {
      nombreProceso : $('#nombreProceso').val(),
      descripProceso : $('#descripcionProceso').val(),
      fechaProceso : $('#fechaProceso').val(),
      inicio : 0,
      tamanhoPagina : 1
    }

      $.ajax({
      method: "POST",
      url: urlPeticionAjaxListarProceso,
      contentType : "application/json",
      data: JSON.stringify(data),  
      dataType : 'json',
      headers: {'Authorization': token},
      }).done(res => {
        if (res.code != 'PROCESO_ENCONTRADO') {
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
 	var idsObjetivos = [];
    var idsProcedimientos = [];
    var procedimientos = [];
    var objetivos = [];
    var niveles = [];
    var idsRespuestas = [];
    var respuestasPosibles = [];
    var ordenProceso = [];

    var proceso = {
      idProceso : $('#idProceso').val(),
      nombreProceso : $('#nombreProceso').val(),
      descripProceso : $('#descripcionProceso').val(),
      fechaProceso : $('#fechaProceso').val(),
      borradoProceso : 0
    }

    var selects = $('select[name="objetivos"]');
    var checksRespuestas = $('input[name=respuestaPosible]');
    var selectsProcedimientos = $('select[name="procedimientos"]');

    for(var i = 0; i<selects.length; i++){
    	var select = $(selects[i]);
    	idsObjetivos.push($(select).children("option:selected").val());
    }

    for(var i = 0; i<selectsProcedimientos.length; i++){
    	var select = $(selectsProcedimientos[i]);
    	idsProcedimientos.push($(select).children("option:selected").val());
    }

    $("input[name='nivel']").each(function() {
    	niveles.push($(this).val());
	});

	 $("input[name='ordenProceso']").each(function() {
    	ordenProceso.push($(this).val());
	});

	$("input[name='respuestaPosible']").each(function() {
		if($(this).is(':checked')){
           idsRespuestas.push($(this).val());
        }
	});

    for(var i = 0; i<idsObjetivos.length; i++){
    	var objetivo = {
    		idObjetivo : idsObjetivos[i],
    		nombreObjetivo : '',
    		descripObjetivo : '',
    		borradoObjetivo : '',
    	}
    	objetivos.push(objetivo);
    }

    for(var i = 0; i<idsRespuestas.length; i++){
    	var respuesta = {
    		 idRespuesta: idsRespuestas[i],
     		 textoRespuesta : '',
      		 borradoRespuesta : 0
    	}
    	respuestasPosibles.push(respuesta);
    }

    for(var i = 0; i<idsProcedimientos.length; i++){
    	var procedimiento = {
	      idProcedimiento: idsProcedimientos[i],
	      nombreProcedimiento : '',
	      descripProcedimiento : '',
	      fechaProcedimiento : '',
	      checkUsuario : '',
	      plan : {
	        idPlan : '',
	        nombrePlan : '',
	        descripPlan : '',
	        fechaPlan : '',
	        borradoPlan : '',
	        objetivo : {
	          idObjetivo : '',
	          nombreObjetivo : '',
	          descripObjetivo : '',
	          borradoObjetivo : ''
	        }
	      },
	      borradoProcedimiento : ''
    	}

    	procedimientos.push(procedimiento);
    	ordenProceso.push(ordenProceso[i]);
    }


    var data = {
      usuario : getCookie('usuario'),
      proceso : proceso,
      procedimientos : procedimientos,
      objetivos : objetivos,
      niveles : niveles,
      respuestasPosibles: respuestasPosibles,
      ordenProceso: ordenProceso
    }
    
    $.ajax({
      method: "POST",
      url: urlPeticionAjaxEditProceso,
      contentType : "application/json",
      data: JSON.stringify(data),  
      dataType : 'json',
      headers: {'Authorization': token},
      }).done(res => {
        if (res.code != 'PROCESO_MODIFICADO') {
          reject(res);
        }
        resolve(res);
      }).fail( function( jqXHR ) {
        errorFailAjax(jqXHR.status);
      });
  });
}

function cargarProcesosProcedimientoAjaxPromesa(numeroPagina, tamanhoPagina, idProcedimiento){
   return new Promise(function(resolve, reject) {
    var token = getCookie('tokenUsuario');
    
    var procesoProcedimientoPaginacion = {
      idProcedimiento : idProcedimiento,
      inicio : calculaInicio(numeroPagina, tamanhoPaginaProceso),
      tamanhoPagina : tamanhoPaginaProceso
    }

     $.ajax({
      method: "POST",
      url: urlPeticionAjaxListadoProcesosProcedimientoByIdProcedimiento,
      contentType : "application/json",
      data: JSON.stringify(procesoProcedimientoPaginacion),  
      dataType : 'json',
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

/* Función para obtener los procesos del sistema */
async function cargarProcesos(numeroPagina, tamanhoPagina, paginadorCreado){
  var paramstr = window.location.search.substr(1);
  var par = paramstr.split("&");

	if(getCookie('rolUsuario') == "admin" || getCookie('rolUsuario') == "gestor"){
    document.getElementById('procesosUsuario').style.display = "none";
    document.getElementById('cabecera').style.display = "block";
    document.getElementById('tablaDatos').style.display = "block";
    document.getElementById('filasTabla').style.display = "block";
	try {
		cargarPermisosFuncProceso();
    	const resultado = await cargarProcesosAjaxPromesa(numeroPagina, tamanhoPagina);
    	var numResults = resultado.data.numResultados + '';
	  	var totalResults = resultado.data.tamanhoTotal + '';
        var inicio = 0;
	    if(resultado.data.listaBusquedas.length == 0){
	        inicio = 0;
	        document.getElementById('itemPaginacion').style.display = "none";
	        document.getElementById('cabecera').style.display = "block";
          document.getElementById('cabeceraEliminados').style.display = "none";
	    }else{
	        inicio = parseInt(resultado.data.inicio)+1;
	        document.getElementById('itemPaginacion').style.display = "block";
	    }

      	var textPaginacion = inicio + " - " + (parseInt(resultado.data.inicio)+parseInt(numResults))  + " total " + totalResults;

      	$("#datosProceso").html("");
	   	  $("#checkboxColumnas").html("");
	   	  $("#paginacion").html("");

	   	for (var i = 0; i < resultado.data.listaBusquedas.length; i++){
	   		try{
	   			const result = await cargarDatosProceso(resultado.data.listaBusquedas[i].idProceso)
	   			var tr = construyeFilaProceso('PROCESO', resultado.data.listaBusquedas[i], result.data.procedimientos ,result.data.objetivos, result.data.respuestasPosibles, result.data.niveles, result.data.ordenProceso);
	  			$("#datosProceso").append(tr);
	   		}catch (resultado) {
    			respuestaAjaxKO(resultado.code);
				document.getElementById("modal").style.display = "block";
  			}
  		}

  		
	   	var div = createHideShowColumnsWindow({DESCRIPCION_PROCESO_COLUMN:2, DATE_COLUMN:3});
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
    $('#procesos').html('');
    document.getElementById('procesosUsuario').style.display = "block";
    document.getElementById('cabecera').style.display = "none";
    document.getElementById('tablaDatos').style.display = "none";
    document.getElementById('filasTabla').style.display = "block";
    
    try{
      const resultado = await cargarProcesosProcedimientoAjaxPromesa(numeroPagina, tamanhoPagina, getCookie('idProcedimiento'));
      var numResults = resultado.data.numResultados + '';
      var totalResults = resultado.data.tamanhoTotal + '';
      var inicio = 0;
      if(resultado.data.listaBusquedas.length == 0){
          inicio = 0;
          document.getElementById('itemPaginacion').style.display = "none";
      }else{
          inicio = parseInt(resultado.data.inicio)+1;
          document.getElementById('itemPaginacion').style.display = "block";
      }

      var textPaginacion = inicio + " - " + (parseInt(resultado.data.inicio)+parseInt(numResults))  + " total " + totalResults;
      var procesosOrdenados = resultado.data.listaBusquedas;
      
      for(var i = 0; i<procesosOrdenados.length; i++){
          try{
            const resultadoProceso = await listarProcesoById(procesosOrdenados[i].idProceso);
            const res = await cargarDatosProcesoByProcesoAndProcedimiento(procesosOrdenados[i].idProceso, getCookie('idProcedimiento'));

            try{

              if(par[0] == "continuar=si"){
                  const respuestasProcesos = await cargarProcesosOfProcedimientoUsuario(getCookie('idProcedimientoUsuario'));
                  cargarProcesosUsuario(resultadoProceso.data, res.data, respuestasProcesos);
                 
              }else{
                const respuestasProcesos = "";
                cargarProcesosUsuario(resultadoProceso.data, res.data, respuestasProcesos);
              
              }
            }catch(respuestasProcesos){
                  respuestaAjaxKO(respuestasProcesos.code);
                  document.getElementById("modal").style.display = "block";
            }
          }catch(res){
            respuestaAjaxKO(res.code);
            document.getElementById("modal").style.display = "block";
          }
      }

      $("#paginacion").html("");
      $("#paginacion").append(textPaginacion);
      setLang(getCookie('lang'));

      if(paginadorCreado != 'PaginadorCreado'){
        paginador(totalResults, 'cargarProcesos', 'PROCESO');
      }
            
      if(numeroPagina == 0){
        var numero = numeroPagina+1;
        $('#itemPaginacion li#' + numero).addClass("active");
        var numPagCookie = numeroPagina+1;
      }else{
        $('#itemPaginacion li#' + numeroPagina).addClass("active");
        var numPagCookie = numeroPagina;
      }

      setCookie('numeroPagina', numPagCookie);
    setLang(getCookie('lang'));


    }catch (resultado) {
      respuestaAjaxKO(resultado.code);
      setLang(getCookie('lang'));
      document.getElementById("modal").style.display = "block";
    }
    
  }
}


/** Función para obtener los procedimientos de un usuario con ajax y promesas**/
function cargarProcesosOfProcedimientoUsuario(idProcedimientoUsuario){
  return new Promise(function(resolve, reject) {
    var token = getCookie('tokenUsuario');

    $.ajax({
      method: "POST",
      url: urlPeticionAjaxListarProcedimientoUsuarioProcesoOfProcedimientoUsuario,
      contentType : "application/json",
      data: idProcedimientoUsuario.toString(),  
      dataType : 'json',
      headers: {'Authorization': token},
      }).done(res => {
        if (res.code != 'PROCEDIMIENTOS_USUARIOS_PROCESOS_LISTADOS') {
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

    let idElementoList = ["nombreProceso", "descripcionProceso", "fechaProceso", "selectProcedimientos1", "ordenProceso1","selectObjetivos1", "nivel1"];
    resetearFormulario("formularioGenerico", idElementoList);
    setLang(getCookie('lang'));
    document.getElementById("modal").style.display = "block";
    
    $('#nombreProceso').val(getCookie('nombreProceso'));
    $('#descripcionProceso').val(getCookie('descripProceso'));
    $('#fechaProceso').val(getCookie('fechaProceso'));
    buscarProceso(getCookie('numeroPagina'), tamanhoPaginaProceso, 'buscarPaginacion', 'PaginadorNo');
    setLang(getCookie('lang'));

  }).catch((res) => {
      $("#form-modal").modal('toggle');

      respuestaAjaxKO(res.code);

      let idElementoList = ["nombreProceso", "descripcionProceso", "fechaProceso", "selectProcedimientos1", "ordenProceso1","selectObjetivos1", "nivel1"];
      resetearFormulario("formularioGenerico", idElementoList);

      setLang(getCookie('lang'));

      document.getElementById("modal").style.display = "block";
  });
}

/** Función que edita un proceso **/
async function editProceso(){
  await editarProcesoAjaxPromesa()
  .then((res) => {
    $("#form-modal").modal('toggle');

    respuestaAjaxOK("PROCESO_EDITADO_OK", res.code);

    let idElementoList = ["nombreProceso", "descripcionProceso", "fechaProceso", "selectProcedimientos1", "ordenProceso1","selectObjetivos1", "nivel1"];
    resetearFormulario("formularioGenerico", idElementoList);
    setLang(getCookie('lang'));
    document.getElementById("modal").style.display = "block";
    
    $('#nombreProceso').val(getCookie('nombreProceso'));
    $('#descripcionProceso').val(getCookie('descripProceso'));
    $('#fechaProceso').val(getCookie('fechaProceso'));
    buscarProceso(getCookie('numeroPagina'), tamanhoPaginaProceso, 'buscarPaginacion', 'PaginadorCreado');
    setLang(getCookie('lang'));

  }).catch((res) => {
    $("#form-modal").modal('toggle');

     respuestaAjaxKO(res.code);

    let idElementoList = ["nombreProceso", "descripcionProceso", "fechaProceso", "selectProcedimientos1", "ordenProceso1","selectObjetivos1", "nivel1"];
    resetearFormulario("formularioGenerico", idElementoList);

    setLang(getCookie('lang'));

    document.getElementById("modal").style.display = "block";


  });
}


/** Funcion buscar proceso **/
async function buscarProceso(numeroPagina, tamanhoPagina, accion, paginadorCreado){
  	try {
  		const res = await buscarProcesoAjaxPromesa(numeroPagina, tamanhoPagina,accion);
		if($('#form-modal').is(':visible')) {
         	$("#form-modal").modal('toggle');
      	};
      	guardarParametrosBusqueda(res.data.datosBusqueda);
    	
    	var numResults = res.data.numResultados + '';
	  	var totalResults = res.data.tamanhoTotal + '';
        var inicio = 0;
	    if(res.data.listaBusquedas.length == 0){
	        inicio = 0;
	        $('#itemPaginacion').attr('hidden',true);
	    }else{
	        inicio = parseInt(res.data.inicio)+1;
	         $('#itemPaginacion').attr('hidden',false);
	    }
      	var textPaginacion = inicio + " - " + (parseInt(res.data.inicio)+parseInt(numResults))  + " total " + totalResults;

      	$("#datosProceso").html("");
	   	$("#checkboxColumnas").html("");
	   	$("#paginacion").html("");

	   	for (var i = 0; i < res.data.listaBusquedas.length; i++){
	   		try{
	   			const result = await cargarDatosProceso(res.data.listaBusquedas[i].idProceso)
	   			var tr = construyeFilaProceso('PROCESO', res.data.listaBusquedas[i], result.data.procedimientos ,result.data.objetivos, result.data.respuestasPosibles, result.data.niveles, result.data.ordenProceso);
	   			$("#datosProceso").append(tr);
	  
	   		}catch (resultado) {
    			respuestaAjaxKO(resultado.code);
				document.getElementById("modal").style.display = "block";
  			}
  		}
    	cargarPermisosFuncProceso();
    	var div = createHideShowColumnsWindow({DESCRIPCION_PROCESO_COLUMN:2, DATE_COLUMN:3 });
      			$("#checkboxColumnas").append(div);
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
      
      	let idElementoList = ["nombreProceso", "descripcionProceso", "fechaProceso", "selectProcedimientos1", "ordenProceso1","selectObjetivos1", "nivel1"];
      	resetearFormulario("formularioGenerico", idElementoList);

      	setLang(getCookie('lang'));

      
  	}
}

/* Función para obtener los procesos del sistema */
async function refrescarTabla(numeroPagina, tamanhoPagina, paginadorCreado){
	if(getCookie('rolUsuario') == "admin" || getCookie('rolUsuario') == "gestor"){
	try {
    	const resultado = await cargarProcesosAjaxPromesa(numeroPagina, tamanhoPagina);
    	var numResults = resultado.data.numResultados + '';
	  	var totalResults = resultado.data.tamanhoTotal + '';
        var inicio = 0;
	    if(resultado.data.listaBusquedas.length == 0){
	        inicio = 0;
	        $('#itemPaginacion').attr('hidden',true);
	    }else{
	        inicio = parseInt(resultado.data.inicio)+1;
	         $('#itemPaginacion').attr('hidden',false);
	    }
      	var textPaginacion = inicio + " - " + (parseInt(resultado.data.inicio)+parseInt(numResults))  + " total " + totalResults;

      	document.getElementById('cabecera').style.display = "block";
        document.getElementById('cabeceraEliminados').style.display == "none";

      	$("#datosProceso").html("");
	   	$("#checkboxColumnas").html("");
	   	$("#paginacion").html("");

	   	for (var i = 0; i < resultado.data.listaBusquedas.length; i++){
	   		try{
	   			const result = await cargarDatosProceso(resultado.data.listaBusquedas[i].idProceso)
	   			var tr = construyeFilaProceso('PROCESO', resultado.data.listaBusquedas[i], result.data.procedimientos ,result.data.objetivos, result.data.respuestasPosibles, result.data.niveles, result.data.ordenProceso);
	  			$("#datosProceso").append(tr);
	   		}catch (resultado) {
    			respuestaAjaxKO(resultado.code);
				document.getElementById("modal").style.display = "block";
  			}
  		}

  		
	   	var div = createHideShowColumnsWindow({DESCRIPCION_PROCESO_COLUMN:2, DATE_COLUMN:3});
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
	
	}
}

/** Función pra busar los  eliminados de la tabla proceso */
async function buscarEliminados(numeroPagina, tamanhoPagina, paginadorCreado){
	if(getCookie('rolUsuario') == "admin" || getCookie('rolUsuario') == "gestor"){
	try {
		cargarPermisosFuncProceso();
    	const resultado = await buscarEliminadosAjaxPromesa(numeroPagina, tamanhoPagina);
    	var numResults = resultado.data.numResultados + '';
	  	var totalResults = resultado.data.tamanhoTotal + '';
        var inicio = 0;

	    if(resultado.data.listaBusquedas.length == 0){
        	inicio = 0;
        	$('#itemPaginacion').attr('hidden', true);
        	document.getElementById('cabecera').style.display = "none";
            document.getElementById('cabeceraEliminados').style.display = "block";
      	}else{
        	inicio = parseInt(resultado.data.inicio)+1;
        	$('#itemPaginacion').attr('hidden', false);
      	}
	    
      	var textPaginacion = inicio + " - " + (parseInt(resultado.data.inicio)+parseInt(numResults))  + " total " + totalResults;

      	$("#datosProceso").html("");
	   	$("#checkboxColumnas").html("");
	   	$("#paginacion").html("");

	   	for (var i = 0; i < resultado.data.listaBusquedas.length; i++){
	   		try{
	   			const result = await cargarDatosProceso(resultado.data.listaBusquedas[i].idProceso)
	   			var tr = construyeFilaProcesoEliminado('PROCESO', resultado.data.listaBusquedas[i], result.data.procedimientos ,result.data.objetivos, result.data.respuestasPosibles, result.data.niveles, result.data.ordenProceso);
	  			$("#datosProceso").append(tr);
	   		}catch (resultado) {
    			respuestaAjaxKO(resultado.code);
				document.getElementById("modal").style.display = "block";
  			}
  		}

	   	var div = createHideShowColumnsWindow({DESCRIPCION_PROCESO_COLUMN:2, DATE_COLUMN:3});
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


/** Función que visualiza un proceso **/
async function detalleProceso(){
  await detalleProcesoAjaxPromesa()
  .then((res) => {
    $("#form-modal").modal('toggle');

    let idElementoList = ["nombreProceso", "descripcionProceso", "fechaProceso", "selectObjetivos1", "selectProcedimientos1", "nivel1", "ordenProceso1"];
    resetearFormulario("formularioGenerico", idElementoList);
    setLang(getCookie('lang'));
    $('#nombreProceso').val(getCookie('nombreProceso'));
    $('#descripcionProceso').val(getCookie('descripProceso'));

  }).catch((res) => {
      $("#form-modal").modal('toggle');

      respuestaAjaxKO(res.code);

      let idElementoList = ["nombreProceso", "descripcionProceso", "fechaProceso", "selectObjetivos1", "selectProcedimientos1", "nivel1"];
      resetearFormulario("formularioGenerico", idElementoList);
      
      setLang(getCookie('lang'));

      document.getElementById("modal").style.display = "block";
  });
}

/** Función que elimina un proceso **/
async function deleteProceso(){
  await eliminarProcesoAjaxPromesa()
  .then((res) => {
    $("#form-modal").modal('toggle');

    respuestaAjaxOK("PROCESO_ELIMINADO_OK", res.code);

    let idElementoList = ["nombreProceso", "descripcionProceso", "fechaProceso", "selectObjetivos1", "selectProcedimientos1", "nivel1", "ordenProceso1"];
    resetearFormulario("formularioGenerico", idElementoList);
    setLang(getCookie('lang'));
    document.getElementById("modal").style.display = "block";
   
    refrescarTabla(0, tamanhoPaginaProceso);

  }).catch((res) => {
     
     $("#form-modal").modal('toggle');
      respuestaAjaxKO(res.code);

      let idElementoList = ["nombreProceso", "descripcionProceso", "fechaProceso", "selectObjetivos1", "selectProcedimientos1", "nivel1", "ordenProceso1"];
    resetearFormulario("formularioGenerico", idElementoList);

      setLang(getCookie('lang'));

      document.getElementById("modal").style.display = "block";


  });
}

/*Función que reactiva los eliminados de la tabla de funcionalidades*/
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

/** Funcion para mostrar el formulario para añadir un proceso **/
function showAddProcesos() {
  var idioma = getCookie('lang');
  cambiarFormulario('ADD_PROCESO', 'javascript:addProceso();', 'return comprobarAddProceso();');
  cambiarOnBlurCampos('return comprobarNombreProceso(\'nombreProceso\', \'errorFormatoNombreProceso\', \'nombreProceso\')', 
  'return comprobarDescripcionProceso(\'descripcionProceso\', \'errorFormatoDescripcionProceso\', \'descripcionProceso\')',
  'return comprobarFechaProceso(\'fechaProceso\', \'errorFormatoFechaProceso\', \'fechaProceso\')');
  cambiarIcono('images/add.png', 'ICONO_ADD', 'iconoAddProceso', 'Añadir');
  setLang(idioma);

  $('#subtitulo').attr('hidden', true);
  $('#labelNombreProceso').attr('hidden', true);
  $('#labelDescripcionProceso').attr('hidden', true);
  $('#labelFechaProceso').attr('hidden', true);
  $('#labelNombreProcedimiento1').attr('hidden', true);
  $('#labelNombreObjetivo1').attr('hidden', true);
  $('#labelNivel').attr('hidden', true);
  $('#labelRespuestaPosible').attr('hidden', true);
  $('#selectProcedimientos').attr('hidden', false);
  $('#respuestasPosibles').attr('hidden', false);
  $('#btnAddObjetivoPlan').attr('hidden', false);
  $('#objetivosNiveles').attr('hidden', false);
  $('#formatoProcedimiento').attr('hidden', false);
  $('#ordenProceso').attr('hidden', true);
  $('#labelNombreProcedimiento1').attr('hidden', true);
  $('#btnAddProcedimientoProceso').attr('hidden', false);
  $('#procedimientosOrden').attr('hidden',false);
  $('#divRespPosible').attr('hidden', false);
  $('#labelSeleccionProcedimiento').attr('hidden', false);
  $('#labelSeleccionObjetivo').attr('hidden', false);
  $('#labelRespuestaPosible').attr('hidden', true);
  $('#labelSeleccionRespuestaPosible').attr('hidden', false);
  $('#divRespPosible').attr('hidden', false);

  var numeroObjetivosNivel = getCookie('numeroObjNivel');
  var numeroProcedimientosOrden = getCookie('numeroProcedimientosOrden');

  $('select[name="procedimientos"] option[value=0]').attr('selected', true);
  $('select[name="objetivos"] option[value=0]').attr('selected', true);
  $('input[name="respuestaPosible"]').attr('disabled', false);

  $("#procedimientosOrden").css("height", "141px");
  $('#btnAddProcedimientoProceso').css("cursor", "pointer");
  $('#btnAddObjetivoPlan').css("cursor", "pointer");   
  $("#objetivosNiveles").css("height", "141px"); 
  $('.borrarIcon').css("cursor", "pointer");

  for(var i = 1; i<=numeroObjetivosNivel; i++){
  	$('#selectObjetivos'+i+' option[value=0]').attr('selected', true);
  	eliminarReadonly(['selectObjetivos'+i, 'nivel'+i]);
  	habilitaCampos(['selectObjetivos'+i, 'nivel'+i]);
  	mostrarObligatorios(['obligatorioObjetivos'+i, 'obligatorioNivel'+i]);
  	$('#selectObjetivos'+i).attr('onblur', 'comprobarSelect(\'selectObjetivos' +i+ '\', \'errorFormatoNombreObjetivoSelect' +i+ '\', \'selectObjetivosOptions\')');
  }

   for(var i = 1; i<=numeroProcedimientosOrden; i++){
    document.getElementById("procedimientosOrden" + i).style.height = "131px";
  	$('#selectProcedimientos'+i+' option[value=0]').attr('selected', true);
  	eliminarReadonly(['selectProcedimientos'+i, 'ordenProceso'+i]);
  	habilitaCampos(['selectProcedimientos'+i, 'ordenProceso'+i]);
  	mostrarObligatorios(['obligatorioProcedimientos'+i]);
  	ocultarObligatorios(['obligatorioOrdenProceso'+i]);
  	$('#ordenProceso'+i).attr('hidden', true);
  	$('#selectProcedimientos'+i).attr('onblur', 'comprobarSelect(\'selectProcedimientos' +i+ '\', \'errorFormatoNombreProcedimientoSelect' +i+ '\', \'selectProcedimientosOptions\')');
  }
  	


  let campos = ["nombreProceso", "descripcionProceso", "fechaProceso"];
  let obligatorios = ["obligatorioNombreProceso", "obligatorioDescripcionProceso", "obligatorioFechaProceso","obligatorioRespuestaPosible"];
  eliminarReadonly(campos);
  mostrarObligatorios(obligatorios);
  habilitaCampos(campos);

  $("#btnAcciones").removeAttr("style");
  $('.formmodal-container').removeAttr("style");

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

  $('#subtitulo').attr('hidden', true);
  $('#labelNombreProceso').attr('hidden', true);
  $('#labelDescripcionProceso').attr('hidden', true);
  $('#labelFechaProceso').attr('hidden', true);
  $('#labelNombreProcedimiento').attr('hidden', true);
  $('#labelNivel').attr('hidden', true);
  $('#labelRespuestaPosible').attr('hidden', true);
  $('#selectProcedimientos').attr('hidden', true);
  $('#respuestasPosibles').attr('hidden', true);
  $('#btnAddObjetivoPlan').attr('hidden', true);
  $('#objetivosNiveles').attr('hidden', true);
  $('#formatoProcedimiento').attr('hidden', true);
  $('#ordenProceso').attr('hidden', true);
  $('#btnAddProcedimientoProceso').attr('hidden', true);
  $('#procedimientosOrden').attr('hidden',true);
  $('#divRespPosible').attr('hidden', false);
  $('#labelSeleccionProcedimiento').attr('hidden', true);
  $('#labelSeleccionObjetivo').attr('hidden', true);
  $('#labelRespuestaPosible').attr('hidden', true);
  $('#labelSeleccionRespuestaPosible').attr('hidden', true);
  $('#divRespPosible').attr('hidden', true);


  let campos = ["nombreProceso", "descripcionProceso", "fechaProceso", "selectProcedimientos", "selectObjetivos", "nivel"];
  let obligatorios = ["obligatorioNombreProceso", "obligatorioDescripcionProceso", "obligatorioFechaProceso", "obligatorioProcedimiento", "obligatorioNivel", "obligatorioRespuestaPosible"];
  
  eliminarReadonly(campos);
  ocultarObligatorios(obligatorios);
  habilitaCampos(campos);

  document.getElementById('btnAcciones').style.position = "absolute";
  document.getElementById('btnAcciones').style.top = "75%";
  document.getElementById('btnAcciones').style.width = "93%";
  $('.formmodal-container').css('height', '235px');

  setLang(getCookie('lang'));

}

/** Funcion para visualizar un proceso **/
function showDetalle(nombreProceso, descripProceso, fechaProceso, idProceso, procedimientos, objetivos, respuestasPosibles, niveles, ordenProceso) {
  
    var idioma = getCookie('lang');

    cambiarFormulario('DETAIL_PROCESO', 'javascript:detalleProceso();', '');
    cambiarIcono('images/close2.png', 'ICONO_CERRAR', 'iconoCerrar', 'Detalle');
   
    setLang(idioma);
    
    $('#labelNombreProceso').attr('hidden', false);
  	$('#labelDescripcionProceso').attr('hidden', false);
  	$('#labelFechaProceso').attr('hidden', false);
  	$('#labelNombreProcedimiento').attr('hidden', false);
  	$('#labelNivel').attr('hidden', false);
  	$('#labelRespuestaPosible').attr('hidden', false);
  	$('#selectProcedimientos').attr('hidden', false);
  	$('#respuestasPosibles').attr('hidden', false);
  	$('#btnAddObjetivoPlan').attr('hidden', false);
  	$('#objetivosNiveles').attr('hidden', false);
  	$('#formatoProcedimiento').attr('hidden', false);
    $('#subtitulo').attr('hidden', '');
    $('#btnAddObjetivoPlan').attr('hidden', true);
    $('#btnAddProcedimientoProceso').attr('hidden', true);
    $('#labelSeleccionProcedimiento').attr('hidden', true);
  	$('#labelSeleccionObjetivo').attr('hidden', true);
  	$('#labelRespuestaPosible').attr('hidden', false);
  	$('#labelSeleccionRespuestaPosible').attr('hidden', true);
    $('#divRespPosible').attr('hidden', false);
    $('#procedimientosOrden').attr('hidden',false);

    $("#procedimientosOrden").css("height", "180px");
    rellenarFormulario(nombreProceso, descripProceso, fechaProceso, procedimientos, objetivos, respuestasPosibles, niveles, ordenProceso);

    $('input[name="respuestaPosible"]').attr('disabled', true);

    var numeroObjetivosNivel = getCookie('numeroObjNivel');
  	var numeroProcedimientosOrden = getCookie('numeroProcedimientosOrden');

    for(var i = 1; i<=numeroObjetivosNivel; i++){;
    	var obligatorioOb = 'obligatorioObjetivos'+i;
    	var obligatorioN = 'obligatorioNivel'+i;
    	var selectOb = 'selectObjetivos'+i;
    	var nivel = 'nivel'+i;

    	anadirReadonly([selectOb, nivel]);
    	ocultarObligatorios([obligatorioOb, obligatorioN]);
    	deshabilitaCampos([selectOb, nivel])
    	$('#btnBorrar'+i).attr('hidden', true);
    	$('#labelNombreObjetivo'+i).attr('hidden', false);
    	$('#labelNivel'+i).attr('hidden', false);
    }


	for(var i = 1; i<=numeroProcedimientosOrden; i++){
      document.getElementById("procedimientosOrden" + i).style.height = "170px";
	  	var obligatorioPr = 'obligatorioProcedimientos'+i;
	  	var selectPr = 'selectProcedimientos'+i;
    	var obligatorioO = 'obligatorioOrdenProceso'+i;
    	var ordenProceso = 'ordenProceso'+i;

    	anadirReadonly([selectPr, ordenProceso]);
    	ocultarObligatorios([obligatorioPr, obligatorioO]);
    	deshabilitaCampos([selectPr, ordenProceso])

    	$('#btnBorrarProcedimiento'+i).attr('hidden', true);
    	$('#labelNombreProcedimiento'+i).attr('hidden', false);
    	$('#ordenProceso'+i).attr('hidden', false);
    	$('#labelOrdenProceso'+i).attr('hidden', false);
	}

	let campos = ["nombreProceso", "descripcionProceso", "fechaProceso"];
	let obligatorios = ["obligatorioNombreProceso", "obligatorioDescripcionProceso", "obligatorioFechaProceso","obligatorioRespuestaPosible"];
    
    anadirReadonly(campos);
    ocultarObligatorios(obligatorios);
    deshabilitaCampos(campos);

    $("#btnAcciones").removeAttr("style");
    $('.formmodal-container').removeAttr("style");

    setLang(getCookie('lang'));

}

/** Funcion para editar un proceso **/
function showEditar(nombreProceso, descripProceso, fechaProceso, idProceso, procedimientos, objetivos, respuestasPosibles, niveles, ordenProceso) {

  var idioma = getCookie('lang');

    cambiarFormulario('EDIT_PROCESO', 'javascript:editProceso();', 'return comprobarEditProceso();');
    cambiarOnBlurCampos('return comprobarNombreProceso(\'nombreProceso\', \'errorFormatoNombreProceso\', \'nombreProceso\')', 
  'return comprobarDescripcionProceso(\'descripcionProceso\', \'errorFormatoDescripcionProceso\', \'descripcionProceso\')',
  'return comprobarFechaProceso(\'fechaProceso\', \'errorFormatoFechaProceso\', \'fechaProceso\')');
    cambiarIcono('images/edit.png', 'ICONO_EDIT', 'iconoEditarProceso', 'Editar');
   
    setLang(idioma);
    
  	$('#subtitulo').attr('hidden', true);
	  $('#subtitulo').attr('hidden', true);
  	$('#labelNombreProceso').attr('hidden', true);
  	$('#labelDescripcionProceso').attr('hidden', true);
  	$('#labelFechaProceso').attr('hidden', true);
  	$('#labelNombreProcedimiento').attr('hidden', true);
  	$('#labelNivel').attr('hidden', true);
  	$('#labelRespuestaPosible').attr('hidden', false);
  	$('#selectProcedimientos').attr('hidden', false);
  	$('#respuestasPosibles').attr('hidden', false);
  	$('#btnAddObjetivoPlan').attr('hidden', false);
  	$('#objetivosNiveles').attr('hidden', false);
  	$('#formatoProcedimiento').attr('hidden', false);
  	$('#ordenProceso').attr('hidden', false);
  	$('#btnAddProcedimientoProceso').attr('hidden', false);
  	$('#procedimientosOrden').attr('hidden',false);
    $('#divRespPosible').attr('hidden', false);
    $('#labelSeleccionProcedimiento').attr('hidden', false);
  	$('#labelSeleccionObjetivo').attr('hidden', false);
  	$('#labelRespuestaPosible').attr('hidden', true);
  	$('#labelSeleccionRespuestaPosible').attr('hidden', false);
    $('#divRespPosible').attr('hidden', false);

    $("#procedimientosOrden").css("height", "180px");
    $('#btnAddProcedimientoProceso').css("cursor", "pointer");
    $('#btnAddObjetivoPlan').css("cursor", "pointer");   
    $("#objetivosNiveles").css("height", "141px"); 
    $('.borrarIcon').css("cursor", "pointer");

  	$('input[name="respuestaPosible"]').attr('disabled', false);

  	$('#ordenProceso1').attr('hidden', false);

    rellenarFormulario(nombreProceso, descripProceso, fechaProceso, procedimientos, objetivos, respuestasPosibles, niveles, ordenProceso);
    insertacampo(document.formularioGenerico,'idProceso', idProceso);

    var numeroObjetivosNivel = getCookie('numeroObjNivel');
  	var numeroProcedimientosOrden = getCookie('numeroProcedimientosOrden');

    for(var i = 1; i<=numeroObjetivosNivel; i++){;
    	var obligatorioOb = 'obligatorioObjetivos'+i;
    	var obligatorioN = 'obligatorioNivel'+i;
    	var selectOb = 'selectObjetivos'+i;
    	var nivel = 'nivel'+i;

    	eliminarReadonly([selectOb, nivel]);
    	mostrarObligatorios([obligatorioOb, obligatorioN]);
    	habilitaCampos([selectOb, nivel])
    	$('#btnBorrar'+i).attr('hidden', false);
    	$('#labelNombreObjetivo'+i).attr('hidden', true);
    	$('#selectObjetivos'+i).attr('onblur', 'comprobarSelect(\'selectObjetivos' +i+ '\', \'errorFormatoNombreObjetivoSelect' +i+ '\', \'selectObjetivosOptions\')');
    }


	for(var i = 1; i<=numeroProcedimientosOrden; i++){
      document.getElementById("procedimientosOrden" + i).style.height = "170px";
	  	var obligatorioPr = 'obligatorioProcedimientos'+i;
	  	var selectPr = 'selectProcedimientos'+i;
    	var obligatorioO = 'obligatorioOrdenProceso'+i;
    	var ordenProceso = 'ordenProceso'+i;

    	eliminarReadonly([selectPr, ordenProceso]);
    	mostrarObligatorios([obligatorioPr, obligatorioO]);
    	habilitaCampos([selectPr, ordenProceso])
    	$('#btnBorrarProcedimiento'+i).attr('hidden', false);
    	$('#labelNombreProcedimiento'+i).attr('hidden', true);
    	$('#ordenProceso'+i).attr('hidden', false);
    	$('#selectProcedimientos'+i).attr('onblur', 'comprobarSelect(\'selectProcedimientos' +i+ '\', \'errorFormatoNombreProcedimientoSelect' +i+ '\', \'selectProcedimientosOptions\')');
	}
	  	


	  let campos = ["nombreProceso", "descripcionProceso", "fechaProceso"];
	  let obligatorios = ["obligatorioNombreProceso", "obligatorioDescripcionProceso", "obligatorioFechaProceso","obligatorioRespuestaPosible"];
	  eliminarReadonly(campos);
	  mostrarObligatorios(obligatorios);
	  habilitaCampos(campos);

    $("#btnAcciones").removeAttr("style");
    $('.formmodal-container').removeAttr("style");

    setLang(getCookie('lang'));

}

/** Función para eliminar una funcionalidad **/
function showEliminar(nombreProceso, descripProceso, fechaProceso, idProceso, procedimientos, objetivos, respuestasPosibles, niveles, ordenProceso) {
  
    var idioma = getCookie('lang');

    cambiarFormulario('DELETE_PROCESO', 'javascript:deleteProceso();', '');
    cambiarIcono('images/delete.png', 'ICONO_ELIMINAR', 'iconoEliminar', 'Eliminar');
   
    setLang(idioma);
    
    $('#labelNombreProceso').attr('hidden', false);
  	$('#labelDescripcionProceso').attr('hidden', false);
  	$('#labelFechaProceso').attr('hidden', false);
  	$('#labelNombreProcedimiento').attr('hidden', false);
  	$('#labelNivel').attr('hidden', false);
  	$('#labelRespuestaPosible').attr('hidden', false);
  	$('#selectProcedimientos').attr('hidden', false);
  	$('#respuestasPosibles').attr('hidden', false);
  	$('#btnAddObjetivoPlan').attr('hidden', false);
  	$('#objetivosNiveles').attr('hidden', false);
  	$('#formatoProcedimiento').attr('hidden', false);
    $('#subtitulo').attr('hidden', '');
    $('#btnAddObjetivoPlan').attr('hidden', true);
    $('#btnAddProcedimientoProceso').attr('hidden', true);
    $('#labelSeleccionProcedimiento').attr('hidden', true);
  	$('#labelSeleccionObjetivo').attr('hidden', true);
  	$('#labelRespuestaPosible').attr('hidden', false);
  	$('#labelSeleccionRespuestaPosible').attr('hidden', true);
    $('#divRespPosible').attr('hidden', false);


    rellenarFormulario(nombreProceso, descripProceso, fechaProceso, procedimientos, objetivos, respuestasPosibles, niveles, ordenProceso);
    insertacampo(document.formularioGenerico,'idProceso', idProceso);

    $('input[name="respuestaPosible"]').attr('disabled', true);

    var numeroObjetivosNivel = getCookie('numeroObjNivel');
  	var numeroProcedimientosOrden = getCookie('numeroProcedimientosOrden');

    for(var i = 1; i<=numeroObjetivosNivel; i++){;
    	var obligatorioOb = 'obligatorioObjetivos'+i;
    	var obligatorioN = 'obligatorioNivel'+i;
    	var selectOb = 'selectObjetivos'+i;
    	var nivel = 'nivel'+i;

    	anadirReadonly([selectOb, nivel]);
    	ocultarObligatorios([obligatorioOb, obligatorioN]);
    	deshabilitaCampos([selectOb, nivel])
    	$('#btnBorrar'+i).attr('hidden', true);
    	$('#labelNombreObjetivo'+i).attr('hidden', false);
    	$('#labelNivel'+i).attr('hidden', false);
    }


	for(var i = 1; i<=numeroProcedimientosOrden; i++){
	  	var obligatorioPr = 'obligatorioProcedimientos'+i;
	  	var selectPr = 'selectProcedimientos'+i;
    	var obligatorioO = 'obligatorioOrdenProceso'+i;
    	var ordenProceso = 'ordenProceso'+i;

    	anadirReadonly([selectPr, ordenProceso]);
    	ocultarObligatorios([obligatorioPr, obligatorioO]);
    	deshabilitaCampos([selectPr, ordenProceso])

    	$('#btnBorrarProcedimiento'+i).attr('hidden', true);
    	$('#labelNombreProcedimiento'+i).attr('hidden', false);
    	$('#ordenProceso'+i).attr('hidden', false);
    	$('#labelOrdenProceso'+i).attr('hidden', false);
	}

	let campos = ["nombreProceso", "descripcionProceso", "fechaProceso"];
	let obligatorios = ["obligatorioNombreProceso", "obligatorioDescripcionProceso", "obligatorioFechaProceso","obligatorioRespuestaPosible"];
    
    anadirReadonly(campos);
    ocultarObligatorios(obligatorios);
    deshabilitaCampos(campos);

    $("#btnAcciones").removeAttr("style");
    $('.formmodal-container').removeAttr("style");

    setLang(getCookie('lang'));

}

/** Función para reactivar un proceso **/
function showReactivar(nombreProceso, descripProceso, fechaProceso, idProceso, procedimientos, objetivos, respuestasPosibles, niveles, ordenProceso) {
  
    var idioma = getCookie('lang');

    cambiarFormulario('REACTIVATE_PROCESO', 'javascript:reactivarProceso();', '');
    cambiarIcono('images/reactivar2.png', 'ICONO_REACTIVAR', 'iconoReactivar', 'Reactivar');
   
    setLang(idioma);
    
    $('#labelNombreProceso').attr('hidden', false);
  	$('#labelDescripcionProceso').attr('hidden', false);
  	$('#labelFechaProceso').attr('hidden', false);
  	$('#labelNombreProcedimiento').attr('hidden', false);
  	$('#labelNivel').attr('hidden', false);
  	$('#labelRespuestaPosible').attr('hidden', false);
  	$('#selectProcedimientos').attr('hidden', false);
  	$('#respuestasPosibles').attr('hidden', false);
  	$('#btnAddObjetivoPlan').attr('hidden', false);
  	$('#objetivosNiveles').attr('hidden', false);
  	$('#formatoProcedimiento').attr('hidden', false);
    $('#subtitulo').attr('hidden', '');
    $('#btnAddObjetivoPlan').attr('hidden', true);
    $('#btnAddProcedimientoProceso').attr('hidden', true);
    $('#labelSeleccionProcedimiento').attr('hidden', true);
  	$('#labelSeleccionObjetivo').attr('hidden', true);
  	$('#labelRespuestaPosible').attr('hidden', false);
  	$('#labelSeleccionRespuestaPosible').attr('hidden', true);
    $('#divRespPosible').attr('hidden', false);


    rellenarFormulario(nombreProceso, descripProceso, fechaProceso, procedimientos, objetivos, respuestasPosibles, niveles, ordenProceso);
    insertacampo(document.formularioGenerico,'idProceso', idProceso);

    $('input[name="respuestaPosible"]').attr('disabled', true);

    var numeroObjetivosNivel = getCookie('numeroObjNivel');
  	var numeroProcedimientosOrden = getCookie('numeroProcedimientosOrden');

    for(var i = 1; i<=numeroObjetivosNivel; i++){;
    	var obligatorioOb = 'obligatorioObjetivos'+i;
    	var obligatorioN = 'obligatorioNivel'+i;
    	var selectOb = 'selectObjetivos'+i;
    	var nivel = 'nivel'+i;

    	anadirReadonly([selectOb, nivel]);
    	ocultarObligatorios([obligatorioOb, obligatorioN]);
    	deshabilitaCampos([selectOb, nivel])
    	$('#btnBorrar'+i).attr('hidden', true);
    	$('#labelNombreObjetivo'+i).attr('hidden', false);
    	$('#labelNivel'+i).attr('hidden', false);
    }


	for(var i = 1; i<=numeroProcedimientosOrden; i++){
	  	var obligatorioPr = 'obligatorioProcedimientos'+i;
	  	var selectPr = 'selectProcedimientos'+i;
    	var obligatorioO = 'obligatorioOrdenProceso'+i;
    	var ordenProceso = 'ordenProceso'+i;

    	anadirReadonly([selectPr, ordenProceso]);
    	ocultarObligatorios([obligatorioPr, obligatorioO]);
    	deshabilitaCampos([selectPr, ordenProceso])

    	$('#btnBorrarProcedimiento'+i).attr('hidden', true);
    	$('#labelNombreProcedimiento'+i).attr('hidden', false);
    	$('#ordenProceso'+i).attr('hidden', false);
    	$('#labelOrdenProceso'+i).attr('hidden', false);
	}

	let campos = ["nombreProceso", "descripcionProceso", "fechaProceso"];
	let obligatorios = ["obligatorioNombreProceso", "obligatorioDescripcionProceso", "obligatorioFechaProceso","obligatorioRespuestaPosible"];
    
    anadirReadonly(campos);
    ocultarObligatorios(obligatorios);
    deshabilitaCampos(campos);

    $("#btnAcciones").removeAttr("style");
    $('.formmodal-container').removeAttr("style");

    setLang(getCookie('lang'));

}

/**Función para cambiar onBlur de los campos*/
function cambiarOnBlurCampos(onBlurNombreProceso, onBlurDescripcionProceso, onBlurFechaProceso) {
    
    if (onBlurNombreProceso != ''){
        $("#nombreProceso").attr('onblur', onBlurNombreProceso);
    }

    if (onBlurDescripcionProceso != ''){
        $("#descripcionProceso").attr('onblur', onBlurDescripcionProceso);
    }

    if (onBlurFechaProceso != ''){
        $("#fechaProceso").attr('onblur', onBlurFechaProceso);
    }
}

/**Función que rellenado los datos del formulario*/
function rellenarFormulario(nombreProceso, descripProceso, fechaProceso, procedimientos, objetivos, respuestasPosibles, niveles, ordenProceso) {
	var idsProcedimientos = [];
	var nombresProcedimientos = [];
	var idsRespuestas = [];
	var nombresRespuestas = [];
	var idsObjetivos = [];
	var nombresObjetivos = [];
	var nivel = [];
	var orden = [];

	var listProcedimientos = procedimientos.split(',');
	var listRespuestasPosibles = respuestasPosibles.split(',');
	var listObjetivos = objetivos.split(',');
	var listNiveles = niveles.split(',');
	var listOrden = ordenProceso.split(',');

    $("#nombreProceso").val(nombreProceso);
    $("#descripcionProceso").val(descripProceso);
    var fecha = fechaProceso.split('-');
    var fech = fecha[2] + "-" + fecha[1] + "-" + fecha[0]; 
    $("#fechaProceso").val(fech); 

    var optionsR = document.getElementById('respuestasPosibles').options;

    for(var i = 0; i<listProcedimientos.length; i+=2){
    	idsProcedimientos.push(listProcedimientos[i]);
    }

     for(var i = 1; i<listProcedimientos.length; i+=2){
    	nombresProcedimientos.push(listProcedimientos[i]);
    }

    for(var i = 0; i<listRespuestasPosibles.length; i+=2){
    	idsRespuestas.push(listRespuestasPosibles[i]);
    }

     for(var i = 1; i<listRespuestasPosibles.length; i+=2){
    	nombresRespuestas.push(listRespuestasPosibles[i]);
    }

    for(var i = 0; i<listObjetivos.length; i+=2){
    	idsObjetivos.push(listObjetivos[i]);
    }

    for(var i = 1; i<listObjetivos.length; i+=2){
    	nombresObjetivos.push(listObjetivos[i]);
    }

    for(var i = 0; i<listNiveles.length; i++){
    	nivel.push(listNiveles[i]);
    }

    for(var i = 0; i<listOrden.length; i++){
    	orden.push(listOrden[i]);
    }

    for(var i = 0; i<nombresRespuestas.length; i++){
    	$('[name=respuestaPosible][value=' + idsRespuestas[i] + ']' ).prop('checked', true);
    }

    var numeroObjetivos = nombresObjetivos.length;
    var numeroProcedimientos = nombresProcedimientos.length;
    setCookie('numeroObjNivel', 1);
    setCookie('numeroProcedimientosOrden', 1);

    for(var i=0; i<numeroObjetivos-1; i++){
    	addObjetivosNiveles();
    }

    for(var i=0; i<numeroProcedimientos-1; i++){
    	addProcedimientosOrden();
    	$('#ordenProceso'+(i+1)).attr('hidden', false);
    }

    for(var r=1;r<=numeroObjetivos; r++){
    	var id='selectObjetivos'+r;
    	var optionsO = document.getElementById(id).options;
	    	for(var j = 0; j<optionsO.length; j++){
		      var text = optionsO[j].text;
		      if(optionsO[j].text == nombresObjetivos[r-1]){
		        optionsO[j].selected = true;
		      }
		    }
    }

    var i = 0;
    for(var j = 1; j<=numeroObjetivos; j++){
    		$('#nivel' +j).val(nivel[i]);
    		i++;
    	}

   	for(var r=1;r<=numeroProcedimientos; r++){
    	var id='selectProcedimientos'+r;
    	var optionsP = document.getElementById(id).options;
	    	for(var j = 0; j<optionsP.length; j++){
		      var text = optionsP[j].text;
		      if(optionsP[j].text == nombresProcedimientos[r-1]){
		        optionsP[j].selected = true;
		      }
		    }
    }

   	var i = 0;
    for(var j = 1; j<=numeroProcedimientos; j++){
    		$('#ordenProceso' +j).val(orden[i]);
    		i++;
    	}
    
setLang(getCookie('lang'));
}

/** Función para gestionar los iconos dependiendo de los permisos de los usuarios **/
function gestionarPermisosProceso(idElementoList) {
  document.getElementById('cabecera').style.display = "none";
  document.getElementById('tablaDatos').style.display = "none";
  document.getElementById('filasTabla').style.display = "none";
  document.getElementById('itemPaginacion').style.display = "block";

  idElementoList.forEach( function (idElemento) {
    switch(idElemento){
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

        if(document.getElementById('cabeceraEliminados').style.display == "block"){
           document.getElementById('cabecera').style.display = "none";

           var texto = document.getElementById('paginacion').innerHTML;
           if(texto == "0 - 0 total 0"){
           document.getElementById('itemPaginacion').style.display = "none";
          }

        }

        if(getCookie('rolUsuario') == "usuario"){
           document.getElementById('cabecera').style.display = "none";
           document.getElementById('tablaDatos').style.display = "none";
           document.getElementById('filasTabla').style.display = "block";

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

function cargarProcesosUsuario(proceso, datosProceso, respuestasProcesos){
  var proc = "";

  proc = '<div class="col-md-4 col-lg-6 col-xl-6 mb-4 paddingTop">' +
              '<form enctype="multipart/form-data" id="" method="post">' + 
                  '<div class="bordesPreguntas">' + 
                    '<div class="proceso">' + 
                        '<div class="ordenProceso">' + datosProceso.ordenProceso + '.- </div>' +
                        '<div class="nombreProceso">' + proceso.descripProceso + '</div>' +
                    '</div>' +
                    '<div id="' + proceso.idProceso + '" class="respuestas">';

  for(var i = 0; i<datosProceso.respuestasPosibles.length; i++){

    var respuestas = '<input type="radio" id="' + proceso.idProceso + datosProceso.respuestasPosibles[i].idRespuesta + '" name="respuestaPosible" value="' + datosProceso.respuestasPosibles[i].idRespuesta + '">' + 

     '<label for="' + proceso.idProceso + datosProceso.respuestasPosibles[i].idRespuesta + '"> ' + datosProceso.respuestasPosibles[i].textoRespuesta +'</label><br>';

    proc += respuestas;
  } 

  var proceso2 = '</div>' + 
                   '<div style="display:none" id="errorFormatoRespuesta"></div>' +
                    '<div id="evidencia' + proceso.idProceso + '" class="evidencia">' + 
                        '<label for="myfile' + proceso.idProceso +'">Selecciona una evidencia:</label>' + 
                        '<input type="file" id="myfile' + proceso.idProceso +'" name="myfile"><br><br>' + 
                    '</div>' + 
                    '<div style="display:none" id="errorFormatoArchivo"></div>' +
                    '<a class="evidenciaFile" id="evidenciaFile' + proceso.idProceso + '" href="" download=""></a>' +
                  '<div id="btnUpload'+ proceso.idProceso +'" name="btnUpload" value="Upload" onclick="javascript:guardarProcedimientoUsuarioProceso(' + proceso.idProceso + ',\'myfile' + proceso.idProceso + '\');enviarRespuesta(' + proceso.idProceso + ',\'myfile' + proceso.idProceso + '\')" class="tooltip20 uploadIcon">' +
                      '<img class="iconoUpload iconUpload" src="images/upload.png" alt="Enviar Respuesta" />' +
                      '<span class="tooltiptext iconUpload ICONO_UPLOAD">Enviar Respuesta</span>' + 
                  '</div>' +
                '</div>' +
              '</form>' +
            '</div>';

  proc += proceso2;

  $('#procesos').append(proc);

  if(respuestasProcesos != ""){
    for(var i = 0; i<respuestasProcesos.data.procesos.length; i++){
      if(proceso.nombreProceso == respuestasProcesos.data.procesos[i].nombreProceso){
        $('#btnUpload'+ proceso.idProceso).attr('onclick', 'modificarProcedimientoUsuarioProceso(' + proceso.idProceso + ',\'myfile' + proceso.idProceso + '\');modificarRespuesta(' + proceso.idProceso + ',\'myfile' + proceso.idProceso + '\')');
        var idRespuestaPosibleMarcada = respuestasProcesos.data.respuestaPosible[i].idRespuesta;
        var selectorRespuesta = $('#' + proceso.idProceso + ' input[id=' + proceso.idProceso + idRespuestaPosibleMarcada + ']');
        var selectorEvidencia = $('#' + proceso.idProceso + '.evidencia');
        $('#evidenciaFile' + proceso.idProceso ).attr('href', '../evidencias/' + respuestasProcesos.data.evidencia[i].nombreFichero);
        $('#evidenciaFile' + proceso.idProceso ).attr('download', respuestasProcesos.data.evidencia[i].nombreFichero);
        $('#evidenciaFile' + proceso.idProceso ).html('Evidencia: ' + respuestasProcesos.data.evidencia[i].nombreFichero);
        $(selectorRespuesta).prop('checked', true);
       
      }
    }
  }else{
    var selectorEvidencia = $('#' + proceso.idProceso + '.evidencia');
    $(selectorEvidencia).show();
  }

  var paramstr = window.location.search.substr(1);
  var par = paramstr.split("&");

  if(par[1]=="ver=si"){
    for(var i = 0; i<datosProceso.respuestasPosibles.length; i++){
      $('#'+proceso.idProceso + datosProceso.respuestasPosibles[i].idRespuesta).attr('disabled', true);
    }
    
    $('#evidencia' + proceso.idProceso).attr('hidden', true);
    $('#btnUpload' + proceso.idProceso).attr('hidden', true);

  }else{
    for(var i = 0; i<datosProceso.respuestasPosibles.length; i++){
      $('#'+proceso.idProceso +datosProceso.respuestasPosibles[i].idRespuesta).attr('disabled', false);
    }
    $('#evidencia' + proceso.idProceso).attr('hidden', false);
    $('#btnUpload' + proceso.idProceso).attr('hidden', false);
  }
  setLang(getCookie('lang'));
}

$(document).ready(function() {
  $("#form-modal").on('hidden.bs.modal', function() {
    
    let idElementoErrorList = ["errorFormatoNombreProceso", "errorFormatoDescripcionProceso", "errorFormatoFechaProceso", "errorFormatoNombreProcedimientoSelect", "errorFormatoNombreObjetivoSelect", "errorFormatoNivel", "errorFormatoProcedimientos", "errorFormatoObjetivos"];
    
    let idElementoList = ["nombreProceso", "descripcionProceso", "fechaProceso", "selectProcedimientos1", "selectObjetivos1", "nivel1", "ordenProceso1"];
    var numeroObjetivosModal = getCookie('numeroObjNivel');
    var numeroProcedimientosModal = getCookie('numeroProcedimientosOrden');

    for(var i = 2; i<=numeroObjetivosModal; i++){
    	eliminarObjetivosNiveles('objetivosNiveles'+i)
    }

    for(var i = 1; i<=numeroObjetivosModal; i++){
    	$('#nivel'+i).val('');
    	$('#labelNivel'+i).attr('hidden', true);
    	$('#btnBorrar'+i).attr('hidden', false);
    	eliminarMensajesValidacionErrorUnElemento('errorFormatoNombreObjetivoSelect'+i, 'selectObjetivos'+i);
    }

     for(var i = 2; i<=numeroProcedimientosModal; i++){
    	eliminarProcedimientosOrden('procedimientosOrden'+i);
    }

    for(var i = 1; i<=numeroProcedimientosModal; i++){
    	$('#ordenProceso'+i).val('');
    	$('#labelOrdenProceso'+i).attr('hidden', true);
    	$('#btnBorrarProcedimiento'+i).attr('hidden', false);
    	eliminarMensajesValidacionErrorUnElemento('errorFormatoNombreProcedimientoSelect'+i, 'selectProcedimientos'+i);
    }

    $('#btnAddObjetivoPlan').attr('hidden', false);
    $('#btnAddProcedimientoProceso').attr('hidden', false);

    limpiarFormulario(idElementoList);
    eliminarMensajesValidacionError(idElementoErrorList, idElementoList);
    setLang(getCookie('lang'));

  });

});
