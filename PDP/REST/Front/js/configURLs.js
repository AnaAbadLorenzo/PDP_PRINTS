/**Url común a todas*/
var urlComun = "http://localhost/PDP_PRINTS/PDP/REST/Back/index.php";


/**Urls Login*/
var urlPeticionAjaxLogin = urlComun;
var urlPeticionAjaxRegistro = urlComun + urlRegistrar;
var urlPeticionAjaxRecuperarPass = urlComun + urlLogin + urlRecuperarPass;
var urlPeticionAjaxListadoEmpresas = urlComun + urlEmpresa + "/listarEmpresasSinP";

/**Urls Menu*/
var urlPeticionAjaxFuncionalidadesUsuario = urlComun + urlMenu + "/funcionalidadesUsuario?";
var urlPeticionAjaxAccionesUsuario = urlComun + urlMenu + "/accionesFuncionalidad?";
var urlPeticionAjaxCambiarContrasenaUsuario = urlComun + urlUsuario + "/cambiarContrasenaUsuario";

/**Urls roles*/
var urlPeticionAjaxListadoRoles = urlComun + urlRol + "/listarRoles";
var urlPeticionAjaxListadoRolesEliminados = urlComun + urlRol + "/listarRolesEliminados";
var urlPeticionAjaxObtenerTodos = urlComun + urlRol + "/obtenerTodos";
var urlPeticionAjaxListarRol = urlComun + urlRol + "/listarRol";
var urlPeticionAjaxAddRol = urlComun + urlRol + urlRol;
var urlPeticionAjaxEditRol = urlComun + urlRol + "/modificarRol";
var urlPeticionAjaxDeleteRol = urlComun + urlRol + "/eliminarRol";
var urlPeticionAjaxReactivarRol = urlComun + urlRol + "/reactivarRol";

/**Urls funcionalidades*/
var urlPeticionAjaxListadoFuncionalidades = urlComun + urlFuncionalidad + "/listarFuncionalidades";
var urlPeticionAjaxListadoFuncionalidadesSinP = urlComun + urlFuncionalidad + "/listarFuncionalidadesSinP";
var urlPeticionAjaxAddFuncionalidad = urlComun + urlFuncionalidad + urlFuncionalidad;
var urlPeticionAjaxListarFuncionalidad = urlComun + urlFuncionalidad + "/listarFuncionalidad";
var urlPeticionAjaxListadoFuncionalidadesEliminadas = urlComun + urlFuncionalidad + "/listarFuncionalidadesEliminadas";
var urlPeticionAjaxEditFuncionalidad = urlComun + urlFuncionalidad + "/modificarFuncionalidad";
var urlPeticionAjaxDeleteFuncionalidad = urlComun + urlFuncionalidad + "/eliminarFuncionalidad";
var urlPeticionAjaxReactivarFuncionalidad = urlComun + urlFuncionalidad + "/reactivarFuncionalidad";

/**Urls acciones*/
var urlPeticionAjaxAccionGuardar = urlComun + urlAccion + urlAccion;
var urlPeticionAjaxListarAccion = urlComun + urlAccion + "/listarAccion";
var urlPeticionAjaxEditAccion = urlComun + urlAccion + "/modificarAccion";
var urlPeticionAjaxDeleteAccion = urlComun + urlAccion + "/eliminarAccion";
var urlPeticionAjaxListadoAcciones = urlComun + urlAccion + "/listarAcciones";
var urlPeticionAjaxListadoAccionesEliminadas = urlComun + urlAccion + "/listarAccionesEliminadas";
var urlPeticionAjaxReactivarAccion = urlComun + urlAccion + "/reactivarAccion";
var urlPeticionAjaxCargarPermiso = urlComun + urlAccion + "/obtenerPermisos";
var urlPeticionAjarAsignarAccion = urlComun + urlAccion + "/asignarAccion";
var urlPeticionAjarDesasignarAccion = urlComun + urlAccion + "/desasignarAccion";

/**Urls logs*/
var urlPeticionAjaxListarTodosLogExcepciones = urlComun + urlLog + "/listarTodosLogsExcepciones";
var urlPeticionAjaxListarLogExcepciones = urlComun + urlLog + "/listarLogsExcepcionesUsuarioFecha";
var urlPeticionAjaxListarTodosLogAcciones = urlComun + urlLog + "/listarTodosLogsAcciones";
var urlPeticionAjaxListarLogAcciones = urlComun + urlLog + "/listarLogsAccionesUsuarioFecha";

/**Urls noticias*/
var urlPeticionAjaxListarTodasNoticias = urlComun + urlNoticia +"/listarNoticias";
var urlPeticionAjaxListarTodasNoticiasPaginacion = urlComun + urlNoticia +"/listarNoticiasPaginacion";
var urlPeticionAjaxListarNoticia = urlComun + urlNoticia + "/listarNoticia";
var urlPeticionAjaxBorrarNoticia = urlComun + urlNoticia + "/borrarNoticia";
var urlPeticionAjaxEditarNoticia = urlComun + urlNoticia + "/modificarNoticia";
var urlPeticionAjaxAddNoticia = urlComun + urlNoticia + "/noticia";

/**Urls empresas**/
var urlPeticionAjaxReactivarEmpresa = urlComun + urlEmpresa + "/reactivarEmpresa";
var urlPeticionAjaxListarEmpresa = urlComun + urlEmpresa + "/listarEmpresa";
var urlPeticionAjaxListarEmpresaEliminada = urlComun + urlEmpresa + "/listarEmpresasEliminadas";
var urlPeticionAjaxListarTodasEmpresas = urlComun + urlEmpresa + "/listarEmpresas";
var urlPeticionAjaxDeleteEmpresa = urlComun + urlEmpresa + "/eliminarEmpresa";
var urlPeticionAjaxEditarEmpresa = urlComun + urlEmpresa + "/modificarEmpresa";
var urlPeticionAjaxAnadirEmpresa = urlComun + urlEmpresa + "/empresa";

/**Urls objetivos*/
var urlPeticionAjaxReactivarObjetivo = urlComun + urlObjetivo + "/reactivarObjetivo";
var urlPeticionAjaxListarObjetivo = urlComun + urlObjetivo + "/listarObjetivo";
var urlPeticionAjaxListarObjetivosEliminados = urlComun + urlObjetivo + "/listarObjetivosEliminados";
var urlPeticionAjaxListadoObjetivos = urlComun + urlObjetivo  + "/listarObjetivos";
var urlPeticionAjaxListadoObjetivosSinP = urlComun + urlObjetivo  + "/listarObjetivosSinP";
var urlPeticionAjaxEditarObjetivo = urlComun + urlObjetivo  + "/modificarObjetivo";
var urlPeticionAjaxAddObjetivo = urlComun + urlObjetivo  + "/objetivo";
var urlPeticionAjaxDeleteObjetivo = urlComun + urlObjetivo  + "/eliminarObjetivo";

/**Urls respuestas posibles*/
var urlPeticionAjaxReactivarRespuestaPosible = urlComun + urlRespuestaPosible + "/reactivarRespuestaPosible";
var urlPeticionAjaxListarRespuestaPosible = urlComun + urlRespuestaPosible + "/listarRespuestaPosible";
var urlPeticionAjaxListarRespuestasPosiblesEliminadas = urlComun + urlRespuestaPosible + "/listarRespuestasPosiblesEliminadas";
var urlPeticionAjaxListadoRespuestasPosibles = urlComun + urlRespuestaPosible  + "/listarRespuestasPosibles";
var urlPeticionAjaxListadoRespuestasPosiblesSinP = urlComun + urlRespuestaPosible  + "/listarRespuestasPosiblesSinP";
var urlPeticionAjaxEditarRespuestaPosible = urlComun + urlRespuestaPosible  + "/modificarRespuestaPosible";
var urlPeticionAjaxAddRespuestaPosible = urlComun + urlRespuestaPosible  + "/respuestaPosible";
var urlPeticionAjaxDeleteRespuestaPosible = urlComun + urlRespuestaPosible  + "/eliminarRespuestaPosible";

/**Urls planes*/
var urlPeticionAjaxReactivarPlan = urlComun + urlPlan + "/reactivarPlan";
var urlPeticionAjaxListarPlan = urlComun + urlPlan + "/listarPlan";
var urlPeticionAjaxListarPlanesEliminados = urlComun + urlPlan + "/listarPlanesEliminados";
var urlPeticionAjaxListadoPlanes = urlComun + urlPlan  + "/listarPlanes";
var urlPeticionAjaxListadoPlanesSinP = urlComun + urlPlan  + "/listarPlanesSinP";
var urlPeticionAjaxEditarPlan = urlComun + urlPlan  + "/modificarPlan";
var urlPeticionAjaxAddPlan = urlComun + urlPlan  + "/plan";
var urlPeticionAjaxDeletePlan = urlComun + urlPlan  + "/eliminarPlan";

/**Urls procedimientos*/
var urlPeticionAjaxReactivarProcedimiento = urlComun + urlProcedimiento + "/reactivarProcedimiento";
var urlPeticionAjaxListarProcedimiento = urlComun + urlProcedimiento + "/listarProcedimiento";
var urlPeticionAjaxListarProcedimientosEliminados = urlComun + urlProcedimiento + "/listarProcedimientosEliminados";
var urlPeticionAjaxListadoProcedimientos = urlComun + urlProcedimiento  + "/listarProcedimientos";
var urlPeticionAjaxListadoProcedimientosSinP = urlComun + urlProcedimiento  + "/listarProcedimientosSinP";
var urlPeticionAjaxListadoProcedimientosPlan = urlComun + urlProcedimiento + "/listarProcedimientosByPlan";
var urlPeticionAjaxEditarProcedimiento = urlComun + urlProcedimiento  + "/modificarProcedimiento";
var urlPeticionAjaxAddProcedimiento = urlComun + urlProcedimiento  + "/procedimiento";
var urlPeticionAjaxDeleteProcedimiento = urlComun + urlProcedimiento  + "/eliminarProcedimiento";

/**Urls procedimientoUsuario **/
var urlPeticionAjaxListarProcedimientosUsuario = urlComun + urlProcedimientosUsuario + '/listarProcedimientosUsuario';
var urlPeticionAjaxAddProcedimientoUsuario = urlComun + urlProcedimientosUsuario + '/procedimientoUsuario';
var urlPeticionAjaxEditProcedimientoUsuario = urlComun + urlProcedimientosUsuario + '/modificaProcedimientoUsuario';
var urlPeticionAjaxListarProcedimientoUsuario = urlComun + urlProcedimientosUsuario + '/listarProcedimientoUsuario';
var urlPeticionAjaxEliminarProcedimientoUsuario = urlComun + urlProcedimientosUsuario + '/borrarProcedimientoUsuario';
var urlPeticionAjaxListarProcedimientoUsuarioById = urlComun + urlProcedimientosUsuario + '/listarProcedimientoUsuarioById';


/**Urls procedimientoUsuarioProceso **/
var urlPeticionAjaxAddProcedimientoUsuarioProceso = urlComun + urlProcedimientoUsuarioProceso + '/procedimientoUsuarioProceso';
var urlPeticionAjaxListarProcedimientoUsuarioProcesoOfProcedimientoUsuario =  urlComun + urlProcedimientoUsuarioProceso + '/listarProcedimientosUsuariosProcesosOfProcedimientoUsuario';
var urlPeticionAjaxListarProcedimientosUsuariosProcesos =  urlComun + urlProcedimientoUsuarioProceso + '/listarProcedimientosUsuariosProcesos';
var urlPeticionAjaxListarProcedimientoUsuarioProceso =  urlComun + urlProcedimientoUsuarioProceso + '/listarProcedimientoUsuarioProceso';
var urlPeticionAjaxModificarProcedimientoUsuarioProceso = urlComun + urlProcedimientoUsuarioProceso + '/modificarProcedimientoUsuarioProceso'


/**Urls procesoProcedimiento **/
var urlPeticionAjaxListadoProcesosProcedimiento = urlComun + urlProcesoProcedimiento + '/listarProcesosProcedimiento';
var urlPeticionAjaxListadoProcesosProcedimientoByIdProcedimiento = urlComun + urlProcesoProcedimiento + '/listarProcesosProcedimientoByIdProcedimiento';

/**Urls evidencia **/
var urlPeticionAjaxGuardarEvidencia = urlComun + urlEvidencia + '/evidencia';
var urlPeticionAjaxModificarEvidencia = urlComun + urlEvidencia + '/modificaEvidencia';
var urlPeticionAjaxListadoProcesosProcedimientoByIdProcedimiento = urlComun + urlProcesoProcedimiento + '/listarProcesosProcedimientoByIdProcedimiento';


/**Urls usuarios*/
var urlPeticionAjaxListarUsuario = urlComun + urlUsuario + "/listarUsuario";
var urlPeticionAjaxListarTodosUsuarios = urlComun + urlUsuario + "/listarUsuarios";
var urlPeticionAjaxListarTodosUsuariosEliminados = urlComun + urlUsuario + "/listarUsuariosEliminados";
var urlPeticionAjaxEditarRolUsuario = urlComun + urlUsuario + "/modificarRolUsuario";
var urlPeticionAjaxEliminarUsuario = urlComun + urlUsuario + "/eliminarUsuario";
var urlPeticionAjaxReactivarUsuario = urlComun + urlUsuario + "/reactivarUsuario";

/**Urls personas*/
var urlPeticionAjaxListarPersonaPorUsuario = urlComun + urlPersona + "/listarPersonaPorUsuario";
var urlPeticionAjaxListarPersona = urlComun + urlPersona + "/listarPersona";
var urlPeticionAjaxListarTodasPersonas = urlComun + urlPersona + "/listarPersonas";
var urlPeticionAjaxListarPersonasEliminadas = urlComun + urlPersona + "/listarPersonasEliminadas";
var urlPeticionAjaxPersonaGuardar = urlComun + urlPersona + "/anadirPersona";
var urlPeticionAjaxEditPersona = urlComun + urlPersona + "/modificarPersona";
var urlPeticionAjaxDeletePersona = urlComun + urlPersona + "/eliminarPersona";
var urlPeticionAjaxAsociarPersonaEmpresa = urlComun + urlPersona + "/asociarPersonaEmpresa";

/**Urls procesos*/
var urlPeticionAjaxListarTodosProcesos = urlComun + urlProceso + "/listarProcesos";
var urlPeticionAjaxAddProceso = urlComun + urlProceso + '/proceso';
var urlPeticionAjaxEditProceso = urlComun + urlProceso + '/modificarProceso';
var urlPeticionAjaxListarProceso = urlComun + urlProceso + "/listarProceso";
var urlPeticionAjaxListarDatosProceso = urlComun + urlProceso + "/listarDatosProceso";
var urlPeticionAjaxListarDatosProcesoByIdProcesoAndIdProcedimiento = urlComun + urlProceso + "/listarDatosProcesoByProcesoAndProcedimiento";
var urlPeticionAjaxDeleteProceso = urlComun + urlProceso + "/eliminarProceso";
var urlPeticionAjaxListarProcesosEliminados = urlComun + urlProceso + "/listarProcesosEliminados";
var urlPeticionAjaxListarProcesoById = urlComun + urlProceso + "/listarProcesoById";

/**Urls de las peticiones Ajax de test de atributos*/
var urlPeticionAjaxTestLoginAtributos = urlComun + urlTest + urlLogin + urlAtributos;
var urlPeticionAjaxTestRecuperarPassAtributos =  urlComun + urlTest + urlRecuperarPass + urlAtributos;
var urlPeticionAjaxTestRegistrarAtributos = urlComun + urlTest + urlRegistrar + urlAtributos;

var urlPeticionAjaxTestRolAtributosAccionGuardar =  urlComun + urlTest + urlRol + urlAtributos + urlGuardar;
var urlPeticionAjaxTestRolAtributosAccionBuscar = urlComun + urlTest + urlRol + urlAtributos + urlBuscar;
var urlPeticionAjaxTestRolAtributosAccionModificar = urlComun + urlTest + urlRol + urlAtributos + urlModificar;

var urlPeticionAjaxTestFuncionalidadAtributosAccionGuardar = urlComun + urlTest + urlFuncionalidad + urlAtributos + urlGuardar;
var urlPeticionAjaxTestFuncionalidadAtributosAccionBuscar = urlComun + urlTest + urlFuncionalidad + urlAtributos + urlBuscar;
var urlPeticionAjaxTestFuncionalidadAtributosAccionModificar = urlComun + urlTest + urlFuncionalidad + urlAtributos + urlModificar;

var urlPeticionAjaxTestAccionAtributosAccionGuardar = urlComun + urlTest + urlAccion + urlAtributos + urlGuardar;
var urlPeticionAjaxTestAccionAtributosAccionBuscar = urlComun + urlTest + urlAccion + urlAtributos + urlBuscar;
var urlPeticionAjaxTestAccionAtributosAccionModificar = urlComun + urlTest + urlAccion + urlAtributos + urlModificar;

var urlPeticionAjaxTestUsuarioAtributosAccionModificarRolUsuario = urlComun + urlTest + urlUsuario + urlAtributos + "/modificarRol";
var urlPeticionAjaxTestUsuarioAtributosAccionBuscar = urlComun + urlTest + urlUsuario + urlAtributos + urlBuscar;

var urlPeticionAjaxTestNoticiaAtributosAccionGuardar = urlComun + urlTest + urlNoticia + urlAtributos + urlGuardar;
var urlPeticionAjaxTestNoticiaAtributosAccionBuscar = urlComun + urlTest + urlNoticia + urlAtributos + urlBuscar;
var urlPeticionAjaxTestNoticiaAtributosAccionModificar = urlComun + urlTest + urlNoticia + urlAtributos + urlModificar;

var urlPeticionAjaxTestPersonaAtributosAccionGuardar = urlComun + urlTest + urlPersona + urlAtributos + urlGuardar;
var urlPeticionAjaxTestPersonaAtributosAccionBuscar = urlComun + urlTest + urlPersona + urlAtributos + urlBuscar;
var urlPeticionAjaxTestPersonaAtributosAccionModificar = urlComun + urlTest + urlPersona + urlAtributos + urlModificar;

var urlPeticionAjaxTestEmpresaAtributosAccionGuardar = urlComun + urlTest + urlEmpresa + urlAtributos + urlGuardar;
var urlPeticionAjaxTestEmpresaAtributosAccionBuscar = urlComun + urlTest + urlEmpresa + urlAtributos + urlBuscar;
var urlPeticionAjaxTestEmpresaAtributosAccionModificar = urlComun + urlTest + urlEmpresa + urlAtributos + urlModificar;

var urlPeticionAjaxTestObjetivoAtributosAccionGuardar = urlComun + urlTest + urlObjetivo + urlAtributos + urlGuardar;
var urlPeticionAjaxTestObjetivoAtributosAccionBuscar = urlComun + urlTest + urlObjetivo + urlAtributos + urlBuscar;
var urlPeticionAjaxTestObjetivoAtributosAccionModificar = urlComun + urlTest + urlObjetivo + urlAtributos + urlModificar;

var urlPeticionAjaxTestRespuestaPosibleAtributosAccionGuardar = urlComun + urlTest + urlRespuestaPosible + urlAtributos + urlGuardar;
var urlPeticionAjaxTestRespuestaPosibleAtributosAccionBuscar = urlComun + urlTest + urlRespuestaPosible + urlAtributos + urlBuscar;
var urlPeticionAjaxTestRespuestaPosibleAtributosAccionModificar = urlComun + urlTest + urlRespuestaPosible + urlAtributos + urlModificar;

var urlPeticionAjaxTestPlanAtributosAccionGuardar = urlComun + urlTest + urlPlan + urlAtributos + urlGuardar;
var urlPeticionAjaxTestPlanAtributosAccionBuscar = urlComun + urlTest + urlPlan + urlAtributos + urlBuscar;
var urlPeticionAjaxTestPlanAtributosAccionModificar = urlComun + urlTest + urlPlan + urlAtributos + urlModificar;

var urlPeticionAjaxTestProcedimientoAtributosAccionGuardar = urlComun + urlTest + urlProcedimiento + urlAtributos + urlGuardar;
var urlPeticionAjaxTestProcedimientoAtributosAccionBuscar = urlComun + urlTest + urlProcedimiento + urlAtributos + urlBuscar;
var urlPeticionAjaxTestProcedimientoAtributosAccionModificar = urlComun + urlTest + urlProcedimiento + urlAtributos + urlModificar;

var urlPeticionAjaxTestProcesoAtributosAccionGuardar = urlComun + urlTest + urlProceso + urlAtributos + urlGuardar;
var urlPeticionAjaxTestProcsoAtributosAccionBuscar = urlComun + urlTest + urlProceso + urlAtributos + urlBuscar;
var urlPeticionAjaxTestProcesoAtributosAccionModificar = urlComun + urlTest + urlProceso + urlAtributos + urlModificar;

/**Urls de las peticiones Ajax de test de acciones*/
var urlPeticionAjaxTestLoginAcciones = urlComun + urlTest + urlLogin + urlAcciones;
var urlPeticionAjaxTestRecuperarPassAcciones = urlComun + urlTest + urlRecuperarPass + urlAcciones;
var urlPeticionAjaxTestRegistrarAcciones = urlComun + urlTest + urlRegistrar + urlAcciones;

var urlPeticionAjaxTestRolAccionGuardar = urlComun + urlTest + urlRol + urlAccion + urlGuardar;
var urlPeticionAjaxTestRolAccionEliminar = urlComun + urlTest + urlRol + urlAccion + urlEliminar;
var urlPeticionAjaxTestRolAccionBuscar = urlComun + urlTest + urlRol + urlAccion + urlBuscar;
var urlPeticionAjaxTestRolAccionModificar = urlComun + urlTest + urlRol + urlAccion + urlModificar;
var urlPeticionAjaxTestRolAccionReactivar = urlComun + urlTest + urlRol + urlAccion + urlReactivar;

var urlPeticionAjaxTestFuncionalidadAccionGuardar = urlComun + urlTest + urlFuncionalidad + urlAccion + urlGuardar;
var urlPeticionAjaxTestFuncionalidadAccionEliminar = urlComun + urlTest + urlFuncionalidad + urlAccion + urlEliminar;
var urlPeticionAjaxTestFuncionalidadAccionBuscar = urlComun + urlTest + urlFuncionalidad + urlAccion + urlBuscar;
var urlPeticionAjaxTestFuncionalidadAccionModificar = urlComun + urlTest + urlFuncionalidad + urlAccion + urlModificar;
var urlPeticionAjaxTestFuncionalidadAccionReactivar = urlComun + urlTest + urlFuncionalidad + urlAccion + urlReactivar;

var urlPeticionAjaxTestAccionAccionGuardar = urlComun + urlTest + urlAccion + urlAccion + urlGuardar;
var urlPeticionAjaxTestAccionAccionModificar = urlComun + urlTest + urlAccion + urlAccion + urlModificar;
var urlPeticionAjaxTestAccionAccionEliminar = urlComun + urlTest + urlAccion + urlAccion + urlEliminar;
var urlPeticionAjaxTestAccionAccionBuscar = urlComun + urlTest + urlAccion + urlAccion + urlBuscar;
var urlPeticionAjaxTestAccionAccionReactivar = urlComun + urlTest + urlAccion + urlAccion + urlReactivar;
var urlPeticionAjaxTestAccionAccionAsignar = urlComun + urlTest + urlAccion + urlAccion + "/asignar";
var urlPeticionAjaxTestAccionAccionRevocar = urlComun + urlTest + urlAccion + urlAccion + "/revocar";

var urlPeticionAjaxTestUsuarioAccionBuscar = urlComun + urlTest + urlUsuario + urlAccion + urlBuscar;
var urlPeticionAjaxTestUsuarioAccionEliminar = urlComun + urlTest + urlUsuario + urlAccion + urlEliminar;
var urlPeticionAjaxTestUsuarioAccionModificarRolUsuario = urlComun + urlTest + urlUsuario + urlAccion + "/modificarRolUsuario";
var urlPeticionAjaxTestUsuarioAccionModificarPasswdUsuario = urlComun + urlTest + urlUsuario + urlAccion + "/modificarPasswdUsuario";
var urlPeticionAjaxTestUsuarioAccionReactivar = urlComun + urlTest + urlUsuario + urlAccion + urlReactivar;

var urlPeticionAjaxTestNoticiaAccionGuardar = urlComun + urlTest + urlNoticia + urlAccion + urlGuardar;
var urlPeticionAjaxTestNoticiaAccionBuscar = urlComun + urlTest + urlNoticia + urlAccion + urlBuscar;
var urlPeticionAjaxTestNoticiaAccionModificar = urlComun + urlTest + urlNoticia + urlAccion + urlModificar;
var urlPeticionAjaxTestNoticiaAccionEliminar = urlComun + urlTest + urlNoticia + urlAccion + urlEliminar;

var urlPeticionAjaxTestPersonaAccionGuardar = urlComun + urlTest + urlPersona + urlAccion + urlGuardar;
var urlPeticionAjaxTestPersonaAccionBuscar = urlComun + urlTest + urlPersona + urlAccion + urlBuscar;
var urlPeticionAjaxTestPersonaAccionModificar = urlComun + urlTest + urlPersona + urlAccion + urlModificar;
var urlPeticionAjaxTestPersonaAccionEliminar = urlComun + urlTest + urlPersona + urlAccion + urlEliminar;

var urlPeticionAjaxTestEmpresaAccionBuscar = urlComun + urlTest + urlEmpresa + urlAccion + urlBuscar;
var urlPeticionAjaxTestEmpresaAccionGuardar = urlComun + urlTest + urlEmpresa + urlAccion + urlGuardar;
var urlPeticionAjaxTestEmpresaAccionModificar = urlComun + urlTest + urlEmpresa + urlAccion + urlModificar;
var urlPeticionAjaxTestEmpresaAccionEliminar = urlComun + urlTest + urlEmpresa + urlAccion + urlEliminar;
var urlPeticionAjaxTestEmpresaAccionReactivar = urlComun + urlTest + urlEmpresa + urlAccion + urlReactivar;

var urlPeticionAjaxTestObjetivoAccionBuscar = urlComun + urlTest + urlObjetivo + urlAccion + urlBuscar;
var urlPeticionAjaxTestObjetivoAccionGuardar = urlComun + urlTest + urlObjetivo + urlAccion + urlGuardar;
var urlPeticionAjaxTestObjetivoAccionModificar = urlComun + urlTest + urlObjetivo + urlAccion + urlModificar;
var urlPeticionAjaxTestObjetivoAccionEliminar = urlComun + urlTest + urlObjetivo + urlAccion + urlEliminar;
var urlPeticionAjaxTestObjetivoAccionReactivar = urlComun + urlTest + urlObjetivo + urlAccion + urlReactivar;

var urlPeticionAjaxTestRespuestasPosiblesAccionBuscar = urlComun + urlTest + urlRespuestaPosible + urlAccion + urlBuscar;
var urlPeticionAjaxTestRespuestasPosiblesAccionGuardar = urlComun + urlTest + urlRespuestaPosible + urlAccion + urlGuardar;
var urlPeticionAjaxTestRespuestasPosiblesAccionModificar = urlComun + urlTest + urlRespuestaPosible + urlAccion + urlModificar;
var urlPeticionAjaxTestRespuestasPosiblesAccionEliminar = urlComun + urlTest + urlRespuestaPosible + urlAccion + urlEliminar;
var urlPeticionAjaxTestRespuestasPosiblesAccionReactivar = urlComun + urlTest + urlRespuestaPosible + urlAccion + urlReactivar;

var urlPeticionAjaxTestPlanAccionBuscar = urlComun + urlTest + urlPlan + urlAccion + urlBuscar;
var urlPeticionAjaxTestPlanAccionGuardar = urlComun + urlTest + urlPlan + urlAccion + urlGuardar;
var urlPeticionAjaxTestPlanAccionModificar = urlComun + urlTest + urlPlan + urlAccion + urlModificar;
var urlPeticionAjaxTestPlanAccionEliminar = urlComun + urlTest + urlPlan + urlAccion + urlEliminar;
var urlPeticionAjaxTestPlanAccionReactivar = urlComun + urlTest + urlPlan + urlAccion + urlReactivar;

var urlPeticionAjaxTestProcedimientoAccionBuscar = urlComun + urlTest + urlProcedimiento + urlAccion + urlBuscar;
var urlPeticionAjaxTestProcedimientoAccionGuardar = urlComun + urlTest + urlProcedimiento + urlAccion + urlGuardar;
var urlPeticionAjaxTestProcedimientoAccionModificar = urlComun + urlTest + urlProcedimiento + urlAccion + urlModificar;
var urlPeticionAjaxTestProcedimientoAccionEliminar = urlComun + urlTest + urlProcedimiento + urlAccion + urlEliminar;
var urlPeticionAjaxTestProcedimientoAccionReactivar = urlComun + urlTest + urlProcedimiento + urlAccion + urlReactivar;

var urlPeticionAjaxTestProcesoAccionBuscar = urlComun + urlTest + urlProceso + urlAccion + urlBuscar;
var urlPeticionAjaxTestProcesoAccionGuardar = urlComun + urlTest + urlProceso + urlAccion + urlGuardar;
var urlPeticionAjaxTestProcesoAccionModificar = urlComun + urlTest + urlProceso + urlAccion + urlModificar;
var urlPeticionAjaxTestProcesoAccionEliminar = urlComun + urlTest + urlProceso + urlAccion + urlEliminar;
var urlPeticionAjaxTestProcesoAccionReactivar = urlComun + urlTest + urlProceso + urlAccion + urlReactivar; 