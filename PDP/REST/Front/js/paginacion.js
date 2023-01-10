/** Función para saber el número de páginas necesarias para ROL **/
function paginador(totalResults, funcionalidad, entidad){
	var paginas="";

    var tamanho = escogeTamanho(entidad);

    var numeroPaginas = totalResults / tamanho ;

    var arrayPaginas = [];

    var arrayElementos = [];

    var numElementos = 0;

    var posActual = 1;

    for(var i = 0; i<numeroPaginas; i++){
        var elementArray = [(i+1), calculaInicio((i+1), tamanho),tamanho];

        if(numElementos<3){
            arrayElementos.push(elementArray);
            numElementos++;

            if(numeroPaginas % 1 != 0 && i== parseInt(numeroPaginas,10) ){
                arrayPaginas.push(arrayElementos);
            }

            else if(numeroPaginas % 1 == 0 && (i+1) == parseInt(numeroPaginas,10)){
                arrayPaginas.push(arrayElementos);

                if(arrayElementos.length == 3){
                    numElementos = 0;
                    arrayElementos=[];
                }
            }else if(arrayElementos.length == 3){
                arrayPaginas.push(arrayElementos);
                numElementos=0;
                arrayElementos=[];
            }
        }   
    }
    

    $('#itemPaginacion').html('');

    var paginacionPrevio = '<nav aria-label= "Page navigation example">' +
    					'<ul class="pagination">' +
    						'<li id="anterior" class="page-item disabled tooltip6">' +
    							'<a class="page-link" href="#" onclick="cargarPosicion(' + posActual + ', \'ANTERIOR\', \'' + entidad + '\')" aria-label="Previous">' +
    								'<span aria-hidden="true">&laquo;</span>' +
    								'<span class="sr-only">Previous</span>' +
    								'<span class="tooltiptext"> Anterior</span>' +
    							'</a>' +
    						'</li>';

    paginas = escogeEntidadPaginacion(entidad, funcionalidad);

   	var paginacionSiguiente = '<li id="siguiente" class="page-item navegacion tooltip6">' +
	   								'<a class="page-link" href="#" onclick="cargarPosicion(' + posActual + ', \'SIGUIENTE\', \'' + entidad + '\')" aria-label="Next">' + 
	   									'<span aria-hidden="true">&raquo;</span>' + 
	   									'<span class="sr-only">Next</span>' +
	   									'<span class="tooltiptext">Siguiente</span>' + 
	   								'</a>' +
	   							'</li>' + 
	   						'</ul>' +
	   					'</nav>';

   
	var pag = paginacionPrevio + paginas + paginacionSiguiente;

    cargarPermisosSegunEntidad(entidad);

	$('#itemPaginacion').append(pag);

    ocultarBloques(numeroPaginas);

    if(entidad == "LOG_EXCEPCIONES" || entidad == "LOG_ACCIONES"){
        $("#arrayPaginacion").html('');
        $("#arrayPaginacion").append(JSON.stringify(arrayPaginas));

    }else{
        setCookie('arrayPaginas', JSON.stringify(arrayPaginas));
    }
    setCookie('posActual', posActual);
    setCookie('numPosicionesArray', arrayPaginas.length);
    setCookie('entidad', entidad);

    if(getCookie('numPosicionesArray') == getCookie('posActual')){
            $('#siguiente').removeClass('navegacion');
            $('#siguiente').addClass('disabled');
    }
}


/**Funcion para escoger los tamanhos de pagina**/
function escogeTamanho(entidad){
    var tamanho = "";
    switch(entidad){
        case 'ROL':
            tamanho=tamanhoPaginaRol;
        break;
        case 'FUNCIONALIDAD':
            tamanho = tamanhoPaginaFuncionalidad;
        break;
        case 'ACCION':
            tamanho = tamanhoPaginaAccion;
        break;
        case 'USUARIO':
            tamanho = tamanhoPaginaUsuario;
        break;
        case 'PERSONA' :
            tamanho = tamanhoPaginaPersona;
        break;
        case 'NOTICIA' : 
            tamanho = tamanhoPaginaNoticia;
        break;
        case 'CATEGORIA' : 
            tamanho = tamanhoPaginaCategoria;
        break;
        case 'RESPUESTA_POSIBLE' :
            tamanho = tamanhoPaginaRespuestaPosible;
        break;
        case 'PLAN' :
            tamanho = tamanhoPaginaPlan;
        break;
        case 'PROCEDIMIENTO' :
            tamanho = tamanhoPaginaProcedimiento;
        break;
        case 'PROCEDIMIENTOSEJECUTADOS' :
                tamanho = tamanhoPaginaProcedimientosEjecutados;
        break;
        case 'PROCESO' :
                tamanho = tamanhoPaginaProceso;
        break;
        case 'PROCEDIMIENTOSUSUARIO' :
                tamanho = tamanhoPaginaProcedimientoUsuario;
        break;
        case 'PROCESOSEJECUTADOS' :
                tamanho = tamanhoPaginaProcesosEjecutados;
        break;
    }

    return tamanho;
}

/** Funcion para calcular el inicio de las peticiones **/
function calculaInicio(numeroPagina, tamanhoPagina){
	var inicio = 0;

	switch(numeroPagina){
		case 0:
			inicio = 0;
		break;
		case 1:
			inicio = 0;
		break;
		case 2 : 
			inicio = tamanhoPagina;
		break;
		default:
			inicio = (numeroPagina-1)*tamanhoPagina;
		break;
	}

	return inicio;
}

function escogeEntidadPaginacion(entidad, funcionalidad){

    var paginas ="";

    switch(entidad){
        case 'ROL':
            switch(funcionalidad){
                case 'cargarRoles': 
                    for(var i = 0; i< 3; i++){
                        paginas += '<li id="' + (i+1) + '" class="page-item boton' + (i+1) + '" style="display:block"><a class="page-link" href="#" onclick="cargarRoles(' 
                            + (i+1) + ',' + tamanhoPaginaRol + ', \'PaginadorNo\'); activarElemento(' + (i+1) +'); cargarPermisosSegunEntidad(getCookie(\'entidad\')); comprobarOcultos()">' + (i+1) + '</a></li>';
                    }
                break;

                case 'buscarRol' : 
                    for(var i = 0; i< 3; i++){
                        paginas += '<li id="' + (i+1) + '" class="page-item boton' + (i+1) + '" style="display:block"><a class="page-link" href="#" onclick="buscarRol(' 
                            + (i+1) + ',' + tamanhoPaginaRol + ", \'buscarPaginacion\'" + '); activarElemento(' + (i+1) +'); cargarPermisosSegunEntidad(getCookie(\'entidad\')); comprobarOcultos()">' + (i+1) + '</a></li>';
                    }
                break;

                case 'buscarEliminadosRol' :
                    for(var i = 0; i< 3; i++){
                        paginas += '<li id="' + (i+1) + '" class="page-item boton' + (i+1) + '" style="display:block"><a class="page-link" href="#" onclick="buscarEliminados(' 
                            + (i+1) + ',' + tamanhoPaginaRol + '); activarElemento(' + (i+1) +'); cargarPermisosSegunEntidad(getCookie(\'entidad\')); comprobarOcultos()">' + (i+1) + '</a></li>';
                    }
                break;
            }
        break;

        case 'ACCION' : 
            switch(funcionalidad){
                case 'cargarAcciones': 
                    for(var i = 0; i< 3; i++){
                        paginas += '<li id="' + (i+1) + '" class="page-item boton' + (i+1) + '" style="display:block"><a class="page-link" href="#" onclick="cargarAcciones(' 
                            + (i+1) + ',' + tamanhoPaginaAccion + ', \'PaginadorNo\'); activarElemento(' + (i+1) +'); cargarPermisosSegunEntidad(getCookie(\'entidad\')); comprobarOcultos()">' + (i+1) + '</a></li>';
                    }
                break;

                case 'buscarAccion' : 
                    for(var i = 0; i< 3; i++){
                        paginas += '<li id="' + (i+1) + '" class="page-item boton' + (i+1) + '" style="display:block"><a class="page-link" href="#" onclick="buscarAccion(' 
                            + (i+1) + ',' + tamanhoPaginaAccion + ", \'buscarPaginacion\'" + '); activarElemento(' + (i+1) +'); cargarPermisosSegunEntidad(getCookie(\'entidad\')); comprobarOcultos()">' + (i+1) + '</a></li>';
                    }
                break;

                case 'buscarEliminadosAccion' :
                    for(var i = 0; i< 3; i++){
                        paginas += '<li id="' + (i+1) + '" class="page-item boton' + (i+1) + '" style="display:block"><a class="page-link" href="#" onclick="buscarEliminados(' 
                            + (i+1) + ',' + tamanhoPaginaAccion + '); activarElemento(' + (i+1) +'); cargarPermisosSegunEntidad(getCookie(\'entidad\')); comprobarOcultos()">' + (i+1) + '</a></li>';
                    }
                break;
            }
        break;

        case 'FUNCIONALIDAD':
            switch(funcionalidad){
                case 'cargarFuncionalidades': 
                    for(var i = 0; i< 3; i++){
                        paginas += '<li id="' + (i+1) + '" class="page-item boton' + (i+1) + '" style="display:block"><a class="page-link" href="#" onclick="cargarFuncionalidades(' 
                            + (i+1) + ',' + tamanhoPaginaFuncionalidad + ', \'PaginadorNo\' ); activarElemento(' + (i+1) +'); cargarPermisosSegunEntidad(getCookie(\'entidad\')); comprobarOcultos()">' + (i+1) + '</a></li>';
                    }
                break;

                case 'buscarFuncionalidad' : 
                    for(var i = 0; i< 3; i++){
                        paginas += '<li id="' + (i+1) + '" class="page-item boton' + (i+1) + '" style="display:block"><a class="page-link" href="#" onclick="buscarFuncionalidad(' 
                            + (i+1) + ',' + tamanhoPaginaFuncionalidad + ", \'buscarPaginacion\'" + '); activarElemento(' + (i+1) +'); cargarPermisosSegunEntidad(getCookie(\'entidad\')); comprobarOcultos()">' + (i+1) + '</a></li>';
                    }
                break;

                case 'buscarEliminadosFuncionalidad' :
                    for(var i = 0; i< 3; i++){
                        paginas += '<li id="' + (i+1) + '" class="page-item boton' + (i+1) + '" style="display:block"><a class="page-link" href="#" onclick="buscarEliminados(' 
                            + (i+1) + ',' + tamanhoPaginaFuncionalidad + '); activarElemento(' + (i+1) +'); cargarPermisosSegunEntidad(getCookie(\'entidad\')); comprobarOcultos()">' + (i+1) + '</a></li>';
                    }
                break;
            }
        break;

        case 'LOG_EXCEPCIONES':
            switch(funcionalidad){
                case 'cargarLogExcepciones': 
                    for(var i = 0; i< 3; i++){
                        paginas += '<li id="' + (i+1) + '" class="page-item boton' + (i+1) + '" style="display:block"><a class="page-link" href="#" onclick="cargarLogExcepciones(' 
                            + (i+1) + ',' + tamanhoPaginaLogExcepciones + ', \'PaginadorNo\' ); activarElemento(' + (i+1) +'); cargarPermisosSegunEntidad(getCookie(\'entidad\')); comprobarOcultos()">' + (i+1) + '</a></li>';
                    }
                break;

                case 'buscarLogExcepciones' : 
                    for(var i = 0; i< 3; i++){
                        paginas += '<li id="' + (i+1) + '" class="page-item boton' + (i+1) + '" style="display:block"><a class="page-link" href="#" onclick="buscarLogExcepciones(' 
                            + (i+1) + ',' + tamanhoPaginaLogExcepciones + ", \'buscarPaginacion\'" + '); activarElemento(' + (i+1) +'); cargarPermisosSegunEntidad(getCookie(\'entidad\')); comprobarOcultos()">' + (i+1) + '</a></li>';
                    }
                break;
            }
        break;

        case 'LOG_ACCIONES':
            switch(funcionalidad){
                case 'cargarLogAcciones': 
                    for(var i = 0; i< 3; i++){
                        paginas += '<li id="' + (i+1) + '" class="page-item boton' + (i+1) + '" style="display:block"><a class="page-link" href="#" onclick="cargarLogAcciones(' 
                            + (i+1) + ',' + tamanhoPaginaLogAcciones + ', \'PaginadorNo\' ); activarElemento(' + (i+1) +'); cargarPermisosSegunEntidad(getCookie(\'entidad\')); comprobarOcultos()">' + (i+1) + '</a></li>';
                    }
                break;

                case 'buscarLogAcciones' : 
                    for(var i = 0; i< 3; i++){
                        paginas += '<li id="' + (i+1) + '" class="page-item boton' + (i+1) + '" style="display:block"><a class="page-link" href="#" onclick="buscarLogAcciones(' 
                            + (i+1) + ',' + tamanhoPaginaLogAcciones + ", \'buscarPaginacion\'" + '); activarElemento(' + (i+1) +'); cargarPermisosSegunEntidad(getCookie(\'entidad\')); comprobarOcultos()">' + (i+1) + '</a></li>';
                    }
                break;
            }
        break;

        case 'USUARIO':
            switch(funcionalidad){
                case 'cargarUsuarios': 
                    for(var i = 0; i< 3; i++){
                        paginas += '<li id="' + (i+1) + '" class="page-item boton' + (i+1) + '" style="display:block"><a class="page-link" href="#" onclick="cargarUsuarios(' 
                            + (i+1) + ',' + tamanhoPaginaUsuario + ', \'PaginadorNo\' ); activarElemento(' + (i+1) +'); cargarPermisosSegunEntidad(getCookie(\'entidad\')); comprobarOcultos()">' + (i+1) + '</a></li>';
                    }
                break;
                case 'buscarUsuario' : 
                    for(var i = 0; i< 3; i++){
                        paginas += '<li id="' + (i+1) + '" class="page-item boton' + (i+1) + '" style="display:block"><a class="page-link" href="#" onclick="buscarUsuario(' 
                            + (i+1) + ',' + tamanhoPaginaUsuario + ", \'buscarPaginacion\'" + '); activarElemento(' + (i+1) +'); cargarPermisosSegunEntidad(getCookie(\'entidad\')); comprobarOcultos()">' + (i+1) + '</a></li>';
                    }
                break;
                case 'buscarEliminadosUsuario' :
                    for(var i = 0; i< 3; i++){
                        paginas += '<li id="' + (i+1) + '" class="page-item boton' + (i+1) + '" style="display:block"><a class="page-link" href="#" onclick="buscarEliminados(' 
                            + (i+1) + ',' + tamanhoPaginaUsuario + '); activarElemento(' + (i+1) +'); cargarPermisosSegunEntidad(getCookie(\'entidad\')); comprobarOcultos()">' + (i+1) + '</a></li>';
                    }
                break;

            }
        break;

        case 'PERSONA':
            switch(funcionalidad){
                case 'cargarPersonas': 
                    for(var i = 0; i< 3; i++){
                        paginas += '<li id="' + (i+1) + '" class="page-item boton' + (i+1) + '" style="display:block"><a class="page-link" href="#" onclick="cargarPersonas(' 
                            + (i+1) + ',' + tamanhoPaginaPersona + ', \'PaginadorNo\' ); activarElemento(' + (i+1) +'); cargarPermisosSegunEntidad(getCookie(\'entidad\')); comprobarOcultos()">' + (i+1) + '</a></li>';
                    }
                break;
                case 'buscarPersona' : 
                    for(var i = 0; i< 3; i++){
                        paginas += '<li id="' + (i+1) + '" class="page-item boton' + (i+1) + '" style="display:block"><a class="page-link" href="#" onclick="buscarPersona(' 
                            + (i+1) + ',' + tamanhoPaginaPersona + ", \'buscarPaginacion\'" + '); activarElemento(' + (i+1) +'); cargarPermisosSegunEntidad(getCookie(\'entidad\')); comprobarOcultos()">' + (i+1) + '</a></li>';
                    }
                break;
                case 'buscarEliminadosPersona' :
                    for(var i = 0; i< 3; i++){
                        paginas += '<li id="' + (i+1) + '" class="page-item boton' + (i+1) + '" style="display:block"><a class="page-link" href="#" onclick="buscarEliminados(' 
                            + (i+1) + ',' + tamanhoPaginaPersona + '); activarElemento(' + (i+1) +'); cargarPermisosSegunEntidad(getCookie(\'entidad\')); comprobarOcultos()">' + (i+1) + '</a></li>';
                    }
                break;

            }
        break;

        case 'NOTICIA':
            switch(funcionalidad){
                case 'cargarNoticias': 
                    for(var i = 0; i< 3; i++){
                        paginas += '<li id="' + (i+1) + '" class="page-item boton' + (i+1) + '" style="display:block"><a class="page-link" href="#" onclick="cargarNoticiasTabla(' 
                            + (i+1) + ',' + tamanhoPaginaNoticia + ', \'PaginadorNo\'); activarElemento(' + (i+1) +'); cargarPermisosSegunEntidad(getCookie(\'entidad\')); comprobarOcultos()">' + (i+1) + '</a></li>';
                    }
                break;

                case 'buscarNoticia' : 
                    for(var i = 0; i< 3; i++){
                        paginas += '<li id="' + (i+1) + '" class="page-item boton' + (i+1) + '" style="display:block"><a class="page-link" href="#" onclick="buscarNoticia(' 
                            + (i+1) + ',' + tamanhoPaginaNoticia + ", \'buscarPaginacion\'" + '); activarElemento(' + (i+1) +'); cargarPermisosSegunEntidad(getCookie(\'entidad\')); comprobarOcultos()">' + (i+1) + '</a></li>';
                    }
                break;
            }
        break;

         case 'EMPRESA':
            switch(funcionalidad){
                case 'cargarEmpresas': 
                    for(var i = 0; i< 3; i++){
                        paginas += '<li id="' + (i+1) + '" class="page-item boton' + (i+1) + '" style="display:block"><a class="page-link" href="#" onclick="cargarEmpresas(' 
                            + (i+1) + ',' + tamanhoPaginaEmpresa + ', \'PaginadorNo\' ); activarElemento(' + (i+1) +'); cargarPermisosSegunEntidad(getCookie(\'entidad\')); comprobarOcultos()">' + (i+1) + '</a></li>';
                    }
                break;
                case 'buscarEmpresa' : 
                    for(var i = 0; i< 3; i++){
                        paginas += '<li id="' + (i+1) + '" class="page-item boton' + (i+1) + '" style="display:block"><a class="page-link" href="#" onclick="buscarEmpresa(' 
                            + (i+1) + ',' + tamanhoPaginaEmpresa + ", \'buscarPaginacion\'" + '); activarElemento(' + (i+1) +'); cargarPermisosSegunEntidad(getCookie(\'entidad\')); comprobarOcultos()">' + (i+1) + '</a></li>';
                    }
                break;
                case 'buscarEliminadosEmpresa' :
                    for(var i = 0; i< 3; i++){
                        paginas += '<li id="' + (i+1) + '" class="page-item boton' + (i+1) + '" style="display:block"><a class="page-link" href="#" onclick="buscarEliminados(' 
                            + (i+1) + ',' + tamanhoPaginaEmpresa + '); activarElemento(' + (i+1) +'); cargarPermisosSegunEntidad(getCookie(\'entidad\')); comprobarOcultos()">' + (i+1) + '</a></li>';
                    }
                break;

            }
        break;
        case 'CATEGORIA':
            switch(funcionalidad){
                case 'cargarCategorias': 
                    for(var i = 0; i< 3; i++){
                        paginas += '<li id="' + (i+1) + '" class="page-item boton' + (i+1) + '" style="display:block"><a class="page-link" href="#" onclick="cargarCategorias(' 
                            + (i+1) + ',' + tamanhoPaginaCategoria + ', \'PaginadorNo\' ); activarElemento(' + (i+1) +'); cargarPermisosSegunEntidad(getCookie(\'entidad\')); comprobarOcultos()">' + (i+1) + '</a></li>';
                    }
                break;
                case 'buscarCategoria' : 
                    for(var i = 0; i< 3; i++){
                        paginas += '<li id="' + (i+1) + '" class="page-item boton' + (i+1) + '" style="display:block"><a class="page-link" href="#" onclick="buscarCategoria(' 
                            + (i+1) + ',' + tamanhoPaginaObjetivo + ", \'buscarPaginacion\'" + '); activarElemento(' + (i+1) +'); cargarPermisosSegunEntidad(getCookie(\'entidad\')); comprobarOcultos()">' + (i+1) + '</a></li>';
                    }
                break;
                case 'buscarEliminadosCategoria' :
                    for(var i = 0; i< 3; i++){
                        paginas += '<li id="' + (i+1) + '" class="page-item boton' + (i+1) + '" style="display:block"><a class="page-link" href="#" onclick="buscarEliminados(' 
                            + (i+1) + ',' + tamanhoPaginaObjetivo + '); activarElemento(' + (i+1) +'); cargarPermisosSegunEntidad(getCookie(\'entidad\')); comprobarOcultos()">' + (i+1) + '</a></li>';
                    }
                break;
        }
        break;
        case 'RESPUESTA_POSIBLE':
            switch(funcionalidad){
                case 'cargarRespuestasPosibles': 
                    for(var i = 0; i< 3; i++){
                        paginas += '<li id="' + (i+1) + '" class="page-item boton' + (i+1) + '" style="display:block"><a class="page-link" href="#" onclick="cargarRespuestasPosibles(' 
                            + (i+1) + ',' + tamanhoPaginaRespuestaPosible + ', \'PaginadorNo\' ); activarElemento(' + (i+1) +'); cargarPermisosSegunEntidad(getCookie(\'entidad\')); comprobarOcultos()">' + (i+1) + '</a></li>';
                    }
                break;
                case 'buscarRespuestaPosible' : 
                    for(var i = 0; i< 3; i++){
                        paginas += '<li id="' + (i+1) + '" class="page-item boton' + (i+1) + '" style="display:block"><a class="page-link" href="#" onclick="buscarRespuestaPosible(' 
                            + (i+1) + ',' + tamanhoPaginaRespuestaPosible + ", \'buscarPaginacion\'" + '); activarElemento(' + (i+1) +'); cargarPermisosSegunEntidad(getCookie(\'entidad\')); comprobarOcultos()">' + (i+1) + '</a></li>';
                    }
                break;
                case 'buscarEliminadosRespuestaPosible' :
                    for(var i = 0; i< 3; i++){
                        paginas += '<li id="' + (i+1) + '" class="page-item boton' + (i+1) + '" style="display:block"><a class="page-link" href="#" onclick="buscarEliminados(' 
                            + (i+1) + ',' + tamanhoPaginaRespuestaPosible + '); activarElemento(' + (i+1) +'); cargarPermisosSegunEntidad(getCookie(\'entidad\')); comprobarOcultos()">' + (i+1) + '</a></li>';
                    }
                break;
        }
        break;
        case 'PLAN':
            switch(funcionalidad){
                case 'cargarPlanes': 
                    for(var i = 0; i< 3; i++){
                        paginas += '<li id="' + (i+1) + '" class="page-item boton' + (i+1) + '" style="display:block"><a class="page-link" href="#" onclick="cargarPlanes(' 
                            + (i+1) + ',' + tamanhoPaginaPlan + ', \'PaginadorNo\' ); activarElemento(' + (i+1) +'); cargarPermisosSegunEntidad(getCookie(\'entidad\')); comprobarOcultos()">' + (i+1) + '</a></li>';
                    }
                break;
                case 'cargarPlanesUsuario': 
                    for(var i = 0; i< 3; i++){
                        paginas += '<li id="' + (i+1) + '" class="page-item boton' + (i+1) + '" style="display:block"><a class="page-link" href="#" onclick="cargarPlanesUsuario(' 
                            + (i+1) + ',' + tamanhoPaginaPlan + ', \'PaginadorNo\' ); activarElemento(' + (i+1) +'); cargarPermisosSegunEntidad(getCookie(\'entidad\')); comprobarOcultos()">' + (i+1) + '</a></li>';
                    }
                break;
                case 'buscarPlan' : 
                    for(var i = 0; i< 3; i++){
                        paginas += '<li id="' + (i+1) + '" class="page-item boton' + (i+1) + '" style="display:block"><a class="page-link" href="#" onclick="buscarPlan(' 
                            + (i+1) + ',' + tamanhoPaginaPlan + ", \'buscarPaginacion\'" + '); activarElemento(' + (i+1) +'); cargarPermisosSegunEntidad(getCookie(\'entidad\')); comprobarOcultos()">' + (i+1) + '</a></li>';
                    }
                break;
                case 'buscarEliminadosPlan' :
                    for(var i = 0; i< 3; i++){
                        paginas += '<li id="' + (i+1) + '" class="page-item boton' + (i+1) + '" style="display:block"><a class="page-link" href="#" onclick="buscarEliminados(' 
                            + (i+1) + ',' + tamanhoPaginaPlan + '); activarElemento(' + (i+1) +'); cargarPermisosSegunEntidad(getCookie(\'entidad\')); comprobarOcultos()">' + (i+1) + '</a></li>';
                    }
                break;
        }
        break;
        case 'PROCEDIMIENTO':
            switch(funcionalidad){
                case 'cargarProcedimientos': 
                    for(var i = 0; i< 3; i++){
                        paginas += '<li id="' + (i+1) + '" class="page-item boton' + (i+1) + '" style="display:block"><a class="page-link" href="#" onclick="cargarProcedimientos(' 
                            + (i+1) + ',' + tamanhoPaginaProcedimiento + ', \'PaginadorNo\' ); activarElemento(' + (i+1) +'); cargarPermisosSegunEntidad(getCookie(\'entidad\')); comprobarOcultos()">' + (i+1) + '</a></li>';
                    }
                break;
                case 'buscarProcedimiento' : 
                    for(var i = 0; i< 3; i++){
                        paginas += '<li id="' + (i+1) + '" class="page-item boton' + (i+1) + '" style="display:block"><a class="page-link" href="#" onclick="buscarProcedimiento(' 
                            + (i+1) + ',' + tamanhoPaginaProcedimiento + ", \'buscarPaginacion\'" + '); activarElemento(' + (i+1) +'); cargarPermisosSegunEntidad(getCookie(\'entidad\')); comprobarOcultos()">' + (i+1) + '</a></li>';
                    }
                break;
                case 'buscarEliminadosProcedimiento' :
                    for(var i = 0; i< 3; i++){
                        paginas += '<li id="' + (i+1) + '" class="page-item boton' + (i+1) + '" style="display:block"><a class="page-link" href="#" onclick="buscarEliminados(' 
                            + (i+1) + ',' + tamanhoPaginaProcedimiento+ '); activarElemento(' + (i+1) +'); cargarPermisosSegunEntidad(getCookie(\'entidad\')); comprobarOcultos()">' + (i+1) + '</a></li>';
                    }
                break;
                case 'cargarProcedimientosSegunPlan' :
                    for(var i = 0; i< 3; i++){
                        paginas += '<li id="' + (i+1) + '" class="page-item boton' + (i+1) + '" style="display:block"><a class="page-link" href="#" onclick="cargarProcedimientosSegunPlan(' 
                            + (i+1) + ',' + tamanhoPaginaProcedimiento+ '); activarElemento(' + (i+1) +'); cargarPermisosSegunEntidad(getCookie(\'entidad\')); comprobarOcultos()">' + (i+1) + '</a></li>';
                    }
                break;
        }
        break;
        case 'PROCESO':
            switch(funcionalidad){
                case 'cargarProcesos': 
                    for(var i = 0; i< 3; i++){
                        paginas += '<li id="' + (i+1) + '" class="page-item boton' + (i+1) + '" style="display:block"><a class="page-link" href="#" onclick="cargarProcesos(' 
                            + (i+1) + ',' + tamanhoPaginaProceso + ', \'PaginadorNo\' ); activarElemento(' + (i+1) +'); cargarPermisosSegunEntidad(getCookie(\'entidad\')); comprobarOcultos()">' + (i+1) + '</a></li>';
                    }
                break;
                case 'buscarProceso' : 
                    for(var i = 0; i< 3; i++){
                        paginas += '<li id="' + (i+1) + '" class="page-item boton' + (i+1) + '" style="display:block"><a class="page-link" href="#" onclick="buscarProceso(' 
                            + (i+1) + ',' + tamanhoPaginaProceso + ", \'buscarPaginacion\'" + '); activarElemento(' + (i+1) +'); cargarPermisosSegunEntidad(getCookie(\'entidad\')); comprobarOcultos()">' + (i+1) + '</a></li>';
                    }
                break;
                case 'buscarEliminadosProceso' :
                    for(var i = 0; i< 3; i++){
                        paginas += '<li id="' + (i+1) + '" class="page-item boton' + (i+1) + '" style="display:block"><a class="page-link" href="#" onclick="buscarEliminados(' 
                            + (i+1) + ',' + tamanhoPaginaProceso + '); activarElemento(' + (i+1) +'); cargarPermisosSegunEntidad(getCookie(\'entidad\')); comprobarOcultos()">' + (i+1) + '</a></li>';
                    }
                break;
                
        }
        break;

        case 'PROCEDIMIENTOSEJECUTADOS' :
            switch(funcionalidad){
                case 'cargarProcedimientosEjecutados': 
                    for(var i = 0; i< 3; i++){
                        paginas += '<li id="' + (i+1) + '" class="page-item boton' + (i+1) + '" style="display:block"><a class="page-link" href="#" onclick="cargarProcedimientosEjecutados(' 
                            + (i+1) + ',' + tamanhoPaginaProcedimientosEjecutados + ', \'PaginadorNo\' ); activarElemento(' + (i+1) +'); cargarPermisosSegunEntidad(getCookie(\'entidad\')); comprobarOcultos()">' + (i+1) + '</a></li>';
                    }
                break;
                case 'buscarProcedimientoEjecutado' : 
                    for(var i = 0; i< 3; i++){
                        paginas += '<li id="' + (i+1) + '" class="page-item boton' + (i+1) + '" style="display:block"><a class="page-link" href="#" onclick="buscarProcedimientoEjecutado(' 
                            + (i+1) + ',' + tamanhoPaginaProcedimientosEjecutados + ", \'buscarPaginacion\'" + '); activarElemento(' + (i+1) +'); cargarPermisosSegunEntidad(getCookie(\'entidad\')); comprobarOcultos()">' + (i+1) + '</a></li>';
                    }
                break;
            }
            break;

            case 'PROCEDIMIENTOSUSUARIO' :
            switch(funcionalidad){
                case 'cargarProcedimientosUsuarioEjecutados': 
                    for(var i = 0; i< 3; i++){
                        paginas += '<li id="' + (i+1) + '" class="page-item boton' + (i+1) + '" style="display:block"><a class="page-link" href="#" onclick="cargarProcedimientosUsuarioEjecutados(' 
                            + (i+1) + ',' + tamanhoPaginaProcedimientoUsuario + ', \'PaginadorNo\' ); activarElemento(' + (i+1) +'); cargarPermisosSegunEntidad(getCookie(\'entidad\')); comprobarOcultos()">' + (i+1) + '</a></li>';
                    }
                break;
                
            }
            break;

             case 'PROCESOSEJECUTADOS' :
            switch(funcionalidad){
                case 'cargarProcesosEjecutados': 
                    for(var i = 0; i< 3; i++){
                        paginas += '<li id="' + (i+1) + '" class="page-item boton' + (i+1) + '" style="display:block"><a class="page-link" href="#" onclick="cargarProcesosEjecutados(' 
                            + (i+1) + ',' + tamanhoPaginaProcesosEjecutados + ', \'PaginadorNo\' ); activarElemento(' + (i+1) +'); cargarPermisosSegunEntidad(getCookie(\'entidad\')); comprobarOcultos()">' + (i+1) + '</a></li>';
                    }
                break;
                case 'buscarProcesoEjecutado' : 
                    for(var i = 0; i< 3; i++){
                        paginas += '<li id="' + (i+1) + '" class="page-item boton' + (i+1) + '" style="display:block"><a class="page-link" href="#" onclick="buscarProcesoEjecutado(' 
                            + (i+1) + ',' + tamanhoPaginaProcedimientosEjecutados + ", \'buscarPaginacion\'" + '); activarElemento(' + (i+1) +'); cargarPermisosSegunEntidad(getCookie(\'entidad\')); comprobarOcultos()">' + (i+1) + '</a></li>';
                    }
                break;
            }
            break;
    }

    return paginas;
        
}

function cargarPosicion(posicionArray, boton, entidad){

    var posicionActual = 0;
    switch(boton){
        case 'SIGUIENTE':
            if(entidad == "LOG_EXCEPCIONES" || entidad == "LOG_ACCIONES"){
                var arrayPaginacion = $.parseJSON($('#arrayPaginacion').text());
            }else{
                var arrayPaginacion = $.parseJSON(getCookie('arrayPaginas'));
            }
            var posActual = parseInt(getCookie('posActual'));
            var posicionesAnteriores = arrayPaginacion[posActual-1];
            var idsAnteriores=[];
            var idsSiguientes=[];
            var iniciosSiguientes=[];
            var tamanhosPaginasSiguientes=[];

            for(var i = 0; i<posicionesAnteriores.length; i++){
                idsAnteriores.push(posicionesAnteriores[i][0]);
            }

            var posicionesActuales = arrayPaginacion[getCookie('posActual')];

            for(var i = 0; i<posicionesActuales.length; i++){
                idsSiguientes.push(posicionesActuales[i][0]);
                iniciosSiguientes.push(posicionesActuales[i][1]);
                tamanhosPaginasSiguientes.push(posicionesActuales[i][2]);
            }

            for(var i = 0; i<idsSiguientes.length; i++){
                
                var onclick =  $(('#' + idsAnteriores[i]) + ' a').attr('onclick');
                var nombreFuncion = onclick.split('(');
                
                $('#' + idsAnteriores[i]).removeClass('active');

                if(nombreFuncion[0].includes("buscarEliminados")){
                    
                    $(('#' + idsAnteriores[i]) + ' a').attr('onclick', nombreFuncion[0] + '(' + idsSiguientes[i] + ',' + tamanhosPaginasSiguientes[i] + ',\'PaginadorCreado\'); activarElemento(' + idsSiguientes[i] +'); cargarPermisosSegunEntidad(getCookie(\'entidad\')); comprobarOcultos()');
                
                }else if(nombreFuncion[0].includes("buscar")){
                    
                    $(('#' + idsAnteriores[i]) + ' a').attr('onclick', nombreFuncion[0] + '(' + idsSiguientes[i] + ',' + tamanhosPaginasSiguientes[i] + ',\'buscarPaginacion\' ,\'PaginadorCreado\'); activarElemento(' + idsSiguientes[i] +'); cargarPermisosSegunEntidad(getCookie(\'entidad\')); comprobarOcultos()');
                
                }else if(!nombreFuncion[0].includes("buscar") || !nombreFuncion[0].includes("buscarEliminados")){
                    
                    $(('#' + idsAnteriores[i]) + ' a').attr('onclick', nombreFuncion[0] + '(' + idsSiguientes[i] + ',' + tamanhosPaginasSiguientes[i] + ',\'PaginadorCreado\'); activarElemento(' + idsSiguientes[i] +'); cargarPermisosSegunEntidad(getCookie(\'entidad\')); comprobarOcultos()');
                }
                
                $(('#' + idsAnteriores[i]) + ' a').text(idsSiguientes[i]);
                $('#' + idsAnteriores[i]).attr('id', idsSiguientes[i]);
            } 

            ocultarBloques(idsSiguientes.length);

        posicionActual = parseInt(getCookie('posActual'));
        posicionActual++;
        setCookie('posActual', posicionActual.toString());

        if(getCookie('numPosicionesArray') == getCookie('posActual')){
            $('#siguiente').removeClass('navegacion');
            $('#siguiente').addClass('disabled');
            $('#anterior').removeClass('disabled');
            $('#anterior').addClass('navegacion');
        
        }else if(parseInt(getCookie('posActual')) == 1){
            $('#anterior').removeClass('navegacion');
             $('#anterior').addClass('disabled');

        }else if(getCookie('numPosicionesArray') != getCookie('posActual')){
             $('#siguiente').addClass('navegacion');
             $('#siguiente').removeClass('disabled');
             $('#anterior').removeClass('disabled');
             $('#anterior').addClass('navegacion');
        }

        break;

        case 'ANTERIOR':
            var elemento = document.getElementsByClassName('page-item boton2')[0];
            elemento.style.display = "block";
            var elementoDos = document.getElementsByClassName('page-item boton3')[0];
            elementoDos.style.display = "block";

            if(entidad == "LOG_EXCEPCIONES" || entidad == "LOG_ACCIONES"){
                var arrayPaginacion = $.parseJSON($('#arrayPaginacion').text());
            }else{
                var arrayPaginacion = $.parseJSON(getCookie('arrayPaginas'));
            }
            var posActual = parseInt(getCookie('posActual'));
            var posicionesAnteriores = arrayPaginacion[posActual-1];
            var idsAnteriores=[];
            var idsSiguientes=[];
            var iniciosSiguientes=[];
            var tamanhosPaginasSiguientes=[];

            for(var i = 0; i<posicionesAnteriores.length; i++){
                idsAnteriores.push(posicionesAnteriores[i][0]);
            }

            var posicionesActuales = arrayPaginacion[posActual-2];

            for(var i = 0; i<posicionesActuales.length; i++){
                idsSiguientes.push(posicionesActuales[i][0]);
                iniciosSiguientes.push(posicionesActuales[i][1]);
                tamanhosPaginasSiguientes.push(posicionesActuales[i][2]);
            }

            if(idsSiguientes.length == idsAnteriores.length){
                for(var i = 0; i<idsSiguientes.length; i++){
                   
                   var onclick =  $(('#' + idsAnteriores[i]) + ' a').attr('onclick');
                   var nombreFuncion = onclick.split('(');
                   $('#' + idsAnteriores[i]).removeClass('active');
                    
                    if(nombreFuncion[0].includes("buscarEliminados")){
                        
                        $(('#' + idsAnteriores[i]) + ' a').attr('onclick', nombreFuncion[0] + '(' + idsSiguientes[i] + ',' + tamanhosPaginasSiguientes[i] + ',\'PaginadorCreado\'); activarElemento(' + idsSiguientes[i] +'); cargarPermisosSegunEntidad(getCookie(\'entidad\')); comprobarOcultos()');
                    
                    }else if(nombreFuncion[0].includes("buscar")){
                        
                        $(('#' + idsAnteriores[i]) + ' a').attr('onclick', nombreFuncion[0] + '(' + idsSiguientes[i] + ',' + tamanhosPaginasSiguientes[i] + ',\'buscarPaginacion\' ,\'PaginadorCreado\'); activarElemento(' + idsSiguientes[i] +'); cargarPermisosSegunEntidad(getCookie(\'entidad\')); comprobarOcultos()');
                    
                    }else if(!nombreFuncion[0].includes("buscar") || !nombreFuncion[0].includes("buscarEliminados")){
                        
                        $(('#' + idsAnteriores[i]) + ' a').attr('onclick', nombreFuncion[0] + '(' + idsSiguientes[i] + ',' + tamanhosPaginasSiguientes[i] + ',\'PaginadorCreado\'); activarElemento(' + idsSiguientes[i] +'); cargarPermisosSegunEntidad(getCookie(\'entidad\')); comprobarOcultos()');
                    }
                    
                    $(('#' + idsAnteriores[i]) + ' a').text(idsSiguientes[i]);
                    $('#' + idsAnteriores[i]).attr('id', idsSiguientes[i]);
                } 
            }else if(idsSiguientes.length == 3 && idsAnteriores.length == 1){
                for(var i = 0; i<idsSiguientes.length; i++){
                    var onclick =  $(('#' + idsAnteriores[0]) + ' a').attr('onclick');
                    var nombreFuncion = onclick.split('(');
                    $('#' + idsAnteriores[0]).removeClass('active');
                    
                    if(nombreFuncion[0].includes("buscarEliminados")){
                        
                        $(('#' + idsAnteriores[i]) + ' a').attr('onclick', nombreFuncion[0] + '(' + idsSiguientes[i] + ',' + tamanhosPaginasSiguientes[i] + ',\'PaginadorCreado\'); activarElemento(' + idsSiguientes[i] +'); cargarPermisosSegunEntidad(getCookie(\'entidad\')); comprobarOcultos()');
                    
                    }else if(nombreFuncion[0].includes("buscar")){
                        
                        $(('#' + idsAnteriores[i]) + ' a').attr('onclick', nombreFuncion[0] + '(' + idsSiguientes[i] + ',' + tamanhosPaginasSiguientes[i] + ',\'buscarPaginacion\' ,\'PaginadorCreado\'); activarElemento(' + idsSiguientes[i] +'); cargarPermisosSegunEntidad(getCookie(\'entidad\')); comprobarOcultos()');
                    
                    }else if(!nombreFuncion[0].includes("buscar") || !nombreFuncion[0].includes("buscarEliminados")){
                       
                       $(('#' + idsAnteriores[i]) + ' a').attr('onclick', nombreFuncion[0] + '(' + idsSiguientes[i] + ',' + tamanhosPaginasSiguientes[i] + ',\'PaginadorCreado\'); activarElemento(' + idsSiguientes[i] +'); cargarPermisosSegunEntidad(getCookie(\'entidad\')); comprobarOcultos()');
                    }
                }
                    $(('#' + idsAnteriores[0]) + ' a').text(idsSiguientes[0]);
                    $('#' + idsAnteriores[0]).attr('id', idsSiguientes[0]);
            
            }else if(idsSiguientes.length == 3 && idsAnteriores.length == 2 ){
                    for(var i = 0; i<2; i++){
                            var onclick =  $(('#' + idsAnteriores[i]) + ' a').attr('onclick');
                            var nombreFuncion = onclick.split('(');
                            $('#' + idsAnteriores[i]).removeClass('active');
                            
                            if(nombreFuncion[0].includes("buscarEliminados")){
                                    
                                    $(('#' + idsAnteriores[i]) + ' a').attr('onclick', nombreFuncion[0] + '(' + idsSiguientes[i] + ',' + tamanhosPaginasSiguientes[i] + ',\'PaginadorCreado\'); activarElemento(' + idsSiguientes[i] +'); cargarPermisosSegunEntidad(getCookie(\'entidad\')); comprobarOcultos()');
                            
                            }else if(nombreFuncion[0].includes("buscar")){
                                    
                                    $(('#' + idsAnteriores[i]) + ' a').attr('onclick', nombreFuncion[0] + '(' + idsSiguientes[i] + ',' + tamanhosPaginasSiguientes[i] + ',\'buscarPaginacion\' ,\'PaginadorCreado\'); activarElemento(' + idsSiguientes[i] +'); cargarPermisosSegunEntidad(getCookie(\'entidad\')); comprobarOcultos()');
                            
                            }else if(!nombreFuncion[0].includes("buscar") || !nombreFuncion[0].includes("buscarEliminados")){
                                    
                                    $(('#' + idsAnteriores[i]) + ' a').attr('onclick', nombreFuncion[0] + '(' + idsSiguientes[i] + ',' + tamanhosPaginasSiguientes[i] + ',\'PaginadorCreado\'); activarElemento(' + idsSiguientes[i] +'); cargarPermisosSegunEntidad(getCookie(\'entidad\')); comprobarOcultos()');
                            }
                    
                    $(('#' + idsAnteriores[i]) + ' a').text(idsSiguientes[i]);
                    $('#' + idsAnteriores[i]).attr('id', idsSiguientes[i]);
                }
            }
            

            ocultarBloques(idsSiguientes.length);

        posicionActual = parseInt(getCookie('posActual'));
        posicionActual--;
        setCookie('posActual', posicionActual.toString());

        if(getCookie('numPosicionesArray') == getCookie('posActual')){
            $('#siguiente').removeClass('navegacion');
            $('#siguiente').addClass('disabled');
            $('#anterior').removeClass('disabled');
            $('#anterior').addClass('navegacion');
        }else if(parseInt(getCookie('posActual')) == 1){
             $('#anterior').removeClass('navegacion');
             $('#anterior').addClass('disabled');
             $('#siguiente').addClass('navegacion');
             $('#siguiente').removeClass('disabled');

        }else if(getCookie('numPosicionesArray') != getCookie('posActual')){
             $('#siguiente').addClass('navegacion');
             $('#siguiente').removeClass('disabled');
             $('#anterior').removeClass('disabled');
             $('#anterior').addClass('navegacion');
        }

        break;


    }
   
}

function ocultarBloques(numeroIdCrear){
    if(numeroIdCrear % 1 != 0){
        var numero = parseInt(numeroIdCrear,10);
        numeroIdCrear = numero+1;
    }

    if(numeroIdCrear == 1){
        var elemento = document.getElementsByClassName('page-item boton2')[0];
        elemento.style.display = "none";
        var elementoDos = document.getElementsByClassName('page-item boton3')[0];
        elementoDos.style.display = "none";
    }else if(numeroIdCrear == 2){
        var elemento = document.getElementsByClassName('page-item boton3')[0];
        elemento.style.display = "none";
    }
}

function activarElemento(id){
    var elementoActivo = getCookie('elementoActivo')
    if(elementoActivo != ""){
        $('#' + elementoActivo).removeClass('active');
    }
    $('#' + id).addClass('active');
    setCookie('elementoActivo', id);
}
