/**Función para recuperar los test con ajax y promesas*/
function test(code, controlador, accion, tipoTest){
  return new Promise(function(resolve, reject) {
    var token = getCookie('tokenUsuario');
    
    var data = {
      controlador : controlador,
      action: accion, 
      tipoTest: tipoTest
    }

    $.ajax({
      method: "POST",
      url: urlTest,
      contentType : "application/x-www-form-urlencoded; charset=UTF-8",
      data: data,
      headers: {'Authorization': token},
      }).done(res => {
        if (res.code != code) {
          reject(res);
        }
        resolve(res);
      }).fail( function( jqXHR ) {
        errorFailAjax(jqXHR.status);
      });
  });
}
/*Función que obtiene los test de de Login */
async function testLogin(tipoTest){

  var controlador = "";
  var code = "";
  var accion = "";
  var tipo = "";

  switch(tipoTest){
    case 'Atributos':
      controlador = 'Test';
      accion =  'Login';
      tipo = 'Atributos',
      code = 'TEST_ATRIBUTOS_LOGIN_OK';
    break;
    case 'Acciones':
      controlador = 'Test';
      accion =  'Login';
      tipo = 'Acciones',
      code = 'TEST_ACCIONES_LOGIN_OK';
    break;
  }

  await test(code, controlador, accion, tipo)
  .then((res) => {
    let idElementoList = ["iconoTestLogin", "iconoTestLogin" + tipoTest, "iconoTestLogin" + tipoTest + "Login"];
    if (tipoTest === 'Acciones') {
      let atributosValor = ["usuario", "passwd_usuario"];
      cargarRespuestaOkTest(res.resource, "cabeceraAccionesLogin", "cuerpoAccionesLogin", atributosValor, "Login", idElementoList, "acciones");
    } else if (tipoTest === 'Atributos'){
      cargarRespuestaOkTest(res.resource, "cabeceraAtributosLogin", "cuerpoAtributosLogin", "", "", idElementoList, "atributos");
    }
    }).catch((res) => {
      cargarModalErroresTest(res.code);
  });
}

/*Función que obtiene los test de Recuperar Pass */
async function testRecuperarPass(tipoTest){

  var controlador = "";
  var code = "";
  var accion = "";
  var tipo = "";

  switch(tipoTest){
    case 'Atributos':
      controlador = 'Test';
      accion =  'RecuperarPass';
      tipo = 'Atributos',
      code = 'TEST_ATRIBUTOS_RECUPERAR_PASS_OK';
    break;
    case 'Acciones':
      controlador = 'Test';
      accion =  'RecuperarPass';
      tipo = 'Acciones',
      code = 'TEST_ACCIONES_RECUPERAR_PASS_OK';
    break;
  }

  await test(code, controlador, accion, tipo)
  .then((res) => {
    let idElementoList = ["iconoTestLogin", "iconoTestLogin" + tipoTest, "iconoTestLogin" + tipoTest + "RecuperarPass"];
    if (tipoTest === 'Acciones') {
      let atributosValor = ["email_persona", "usuario"];
      cargarRespuestaOkTest(res.resource, "cabeceraAccionesRecuperarPass", "cuerpoAccionesRecuperarPass", atributosValor, "RecuperarPass", idElementoList, "acciones");
    } else if (tipoTest === 'Atributos'){
      cargarRespuestaOkTest(res.resource, "cabeceraAtributosRecuperarPass", "cuerpoAtributosRecuperarPass", "", "", idElementoList, "atributos");
    }
    }).catch((res) => {
      cargarModalErroresTest(res.code);
  });
}

/*Función que obtiene los test de Registrar */
async function testRegistrar(tipoTest){

  var controlador = "";
  var code = "";
  var accion = "";
  var tipo = "";

  switch(tipoTest){
    case 'Atributos':
      controlador = 'Test';
      accion =  'Registro';
      tipo = 'Atributos',
      code = 'TEST_ATRIBUTOS_REGISTRO_OK';
    break;
    case 'Acciones':
      controlador = 'Test';
      accion =  'Registro';
      tipo = 'Acciones',
      code = 'TEST_ACCIONES_REGISTRO_OK';
    break;
  }

  await test(code, controlador, accion, tipo)
  .then((res) => {
    let idElementoList = ["iconoTestRegistrar", "iconoTestRegistrar" + tipoTest];
    if (tipoTest === 'Acciones') {
      let atributosValor = ["nombre_persona", "apellidos_persona", "fecha_nac_persona", "direccion_persona", "email_persona", "telefono_persona", "usuario", "dni_persona", "passwd_usuario"];
      cargarRespuestaOkTest(res.resource, "cabeceraAccionesRegistrar", "cuerpoAccionesRegistrar", atributosValor, "Registrar", idElementoList, "acciones");
    } else if (tipoTest === 'Atributos'){
      cargarRespuestaOkTest(res.resource, "cabeceraAtributosRegistrar", "cuerpoAtributosRegistrar", "", "", idElementoList, "atributos");
    }
    }).catch((res) => {
      cargarModalErroresTest(res.code);
  });
}

/*Función que obtiene los test de rol */
async function testRol(tipoTest){

  var controlador = "";
  var code = "";
  var accion = "";
  var tipo = "";

  switch(tipoTest){
    case 'Atributos':
      controlador = 'Test';
      accion = 'GestionRoles';
      tipo = 'Atributos';
      code = 'TEST_ATRIBUTOS_GESTION_ROLES_OK';
    break;
    case 'Acciones':
      controlador = 'Test';
      accion = 'GestionRoles';
      tipo = 'Acciones';
      code = 'TEST_ACCIONES_GESTION_ROLES_OK';
    break;
  }

  await test(code, controlador, accion, tipo)
  .then((res) => {
    let idElementoList = ["iconoTestRol", "iconoTestRol" + tipoTest, "iconoTestRol" + tipoTest];
    if (tipoTest === 'Acciones') {
      let atributosValor = ["descripcion_rol", "nombre_rol"];
      cargarRespuestaOkTest(res.resource, "cabeceraAccionesRol", "cuerpoAccionesRol", atributosValor, "Rol", idElementoList, "acciones");
    } else if (tipoTest === 'Atributos'){
      cargarRespuestaOkTest(res.resource, "cabeceraAtributosRol", "cuerpoAtributosRol", "", "", idElementoList, "atributos");
    }
    }).catch((res) => {
      cargarModalErroresTest(res.code);
  });
}

/*Función que obtiene los test de funcionalidad */
async function testFuncionalidad(tipoTest){
  var controlador = "";
  var code = "";
  var accion = "";
  var tipo = "";

  switch(tipoTest){
    case 'Atributos':
      controlador = 'Test';
      accion = 'GestionFuncionalidades';
      tipo = 'Atributos';
      code = 'TEST_ATRIBUTOS_GESTION_FUNCIONALIDADES_OK';
    break;
    case 'Acciones':
      controlador = 'Test';
      accion = 'GestionFuncionalidades';
      tipo = 'Acciones';
      code = 'TEST_ACCIONES_GESTION_FUNCIONALIDADES_OK';
    break;
  }

  await test(code, controlador, accion, tipo)
  .then((res) => {
    let idElementoList = ["iconoTestFuncionalidad", "iconoTestFuncionalidad" + tipoTest, "iconoTestFuncionalidad" + tipoTest];
    if (tipoTest === 'Acciones') {
      let atributosValor = ["descripcion_funcionalidad", "nombre_funcionalidad"];
      cargarRespuestaOkTest(res.resource, "cabeceraAccionesFuncionalidad", "cuerpoAccionesFuncionalidad", atributosValor, "Funcionalidad", idElementoList, "acciones");
    } else if (tipoTest === 'Atributos'){
      cargarRespuestaOkTest(res.resource, "cabeceraAtributosFuncionalidad", "cuerpoAtributosFuncionalidad", "", "", idElementoList, "atributos");
    }
    }).catch((res) => {
      cargarModalErroresTest(res.code);
  });
}

/*Función que obtiene los test de acción */
async function testAccion(tipoTest){
  var controlador = "";
  var code = "";
  var accion = "";
  var tipo = "";

  switch(tipoTest){
    case 'Atributos':
      controlador = 'Test';
      accion = 'GestionAcciones';
      tipo = 'Atributos';
      code = 'TEST_ATRIBUTOS_GESTION_ACCIONES_OK';
    break;
    case 'Acciones':
      controlador = 'Test';
      accion = 'GestionAcciones';
      tipo = 'Acciones';
      code = 'TEST_ACCIONES_GESTION_ACCIONES_OK';
    break;
  }

  await test(code, controlador, accion, tipo)
  .then((res) => {
    let idElementoList = ["iconoTestAccion", "iconoTestAccion" + tipoTest, "iconoTestAccion" + tipoTest];
    if (tipoTest === 'Acciones') {
      let atributosValor = ["descripcion_accion", "nombre_accion"];
      cargarRespuestaOkTest(res.resource, "cabeceraAccionesAccion", "cuerpoAccionesAccion", atributosValor, "Accion", idElementoList, "acciones");
    } else if (tipoTest === 'Atributos'){
      cargarRespuestaOkTest(res.resource, "cabeceraAtributosAccion", "cuerpoAtributosAccion", "", "", idElementoList, "atributos");
    }
    }).catch((res) => {
      cargarModalErroresTest(res.code);
  });
}

/*Función que obtiene los test de usuario */
async function testUsuario(tipoTest){

  var controlador = "";
  var code = "";
  var accion = "";
  var tipo = "";

  switch(tipoTest){
    case 'Atributos':
      controlador = 'Test';
      accion = 'GestionUsuarios';
      tipo = 'Atributos';
      code = 'TEST_ATRIBUTOS_GESTION_USUARIOS_OK';
    break;
    case 'Acciones':
      controlador = 'Test';
      accion = 'GestionUsuarios';
      tipo = 'Acciones';
      code = 'TEST_ACCIONES_GESTION_USUARIOS_OK';
    break;
  }

  await test(code, controlador, accion, tipo)
  .then((res) => {
    let idElementoList = ["iconoTestUsuario", "iconoTestUsuario" + tipoTest, "iconoTestUsuario" + tipoTest];
    if (tipoTest === 'Acciones') {
      let atributosValor = ["dni_usuario", "usuario", "passwd_usuario"];
      cargarRespuestaOkTest(res.resource, "cabeceraAccionesUsuario", "cuerpoAccionesUsuario", atributosValor, "Usuario", idElementoList, "acciones");
    } else if (tipoTest === 'Atributos'){
      cargarRespuestaOkTest(res.resource, "cabeceraAtributosUsuario", "cuerpoAtributosUsuario", "", "", idElementoList, "atributos");
    }
    }).catch((res) => {
      cargarModalErroresTest(res.code);
  });
}

/*Función que obtiene los test noticia */
async function testNoticia(tipoTest){

  var controlador = "";
  var code = "";
  var accion = "";
  var tipo = "";

  switch(tipoTest){
    case 'Atributos':
      controlador = 'Test';
      accion = 'GestionNoticias';
      tipo = 'Atributos';
      code = 'TEST_ATRIBUTOS_GESTION_NOTICIAS_OK';
    break;
    case 'Acciones':
      controlador = 'Test';
      accion = 'GestionNoticias';
      tipo = 'Acciones';
      code = 'TEST_ACCIONES_GESTION_NOTICIAS_OK';
    break;
  }

  await test(code, controlador, accion, tipo)
  .then((res) => {
    let idElementoList = ["iconoTestNoticia", "iconoTestNoticia" + tipoTest, "iconoTestNoticia" + tipoTest];
    if (tipoTest === 'Acciones') {
      let atributosValor = ["titulo_noticia", "contenido_noticia", "fecha_noticia"];
      cargarRespuestaOkTest(res.resource, "cabeceraAccionesNoticia", "cuerpoAccionesNoticia", atributosValor, "Noticia", idElementoList, "acciones");
    } else if (tipoTest === 'Atributos'){
      cargarRespuestaOkTest(res.resource, "cabeceraAtributosNoticia", "cuerpoAtributoNoticia", "", "", idElementoList, "atributos");
    }
    }).catch((res) => {
      cargarModalErroresTest(res.code);
  });
}

/*Función que obtiene los test de persona */
async function testPersona(tipoTest){

  var controlador = "";
  var code = "";
  var accion = "";
  var tipo = "";

  switch(tipoTest){
    case 'Atributos':
      controlador = 'Test';
      accion = 'GestionPersonas';
      tipo = 'Atributos';
      code = 'TEST_ATRIBUTOS_GESTION_PERSONAS_OK';
    break;
    case 'Acciones':
      controlador = 'Test';
      accion = 'GestionPersonas';
      tipo = 'Acciones';
      code = 'TEST_ACCIONES_GESTION_PERSONAS_OK';
    break;
  }

  await test(code, controlador, accion, tipo)
  .then((res) => {
    let idElementoList = ["iconoTestPersona", "iconoTestPersona" + tipoTest, "iconoTestPersona" + tipoTest];
    if (tipoTest === 'Acciones') {
      let atributosValor = ["dni_persona", "nombre_persona", "apellidos_persona", "fecha_nac_persona", "direccion_persona", "email_persona", "telefono_persona", "borrado_persona"];
      cargarRespuestaOkTest(res.resource, "cabeceraAccionesPersona", "cuerpoAccionesPersona", atributosValor, "Persona", idElementoList, "acciones");
    } else if (tipoTest === 'Atributos'){
      cargarRespuestaOkTest(res.resource, "cabeceraAtributosPersona", "cuerpoAtributosPersona", "", "", idElementoList, "atributos");
    }
    }).catch((res) => {
      cargarModalErroresTest(res.code);
  });
}

/*Función que obtiene los test objetivo */
async function testCategoria(tipoTest){
  
  var url = "";
  var code = "";

  var controlador = "";
  var code = "";
  var accion = "";
  var tipo = "";

  switch(tipoTest){
    case 'Atributos':
      controlador = 'Test';
      accion = 'GestionCategorias';
      tipo = 'Atributos';
      code = 'TEST_ATRIBUTOS_GESTION_CATEGORIAS_OK';
    break;
  }

  await test(code, controlador, accion, tipo)
  .then((res) => {
    let idElementoList = ["iconoTestCategoria", "iconoTestCategoria" + tipoTest, "iconoTestCategoria" + tipoTest];
   if (tipoTest === 'Atributos'){
      cargarRespuestaOkTest(res.resource, "cabeceraAtributosCategoria", "cuerpoAtributosCategoria" + accion, "", "", idElementoList, "atributos");
    }
    }).catch((res) => {
      cargarModalErroresTest(res.code);
  });
}

/*Función que obtiene los test respuestas posibles */
async function testRespuestasPosibles(accion, tipoTest){
  
  var url = "";
  var code = "";

  switch(tipoTest){
    case 'Atributos':
      code = 'TEST_ATRIBUTOS_RESPUESTA_POSIBLE_OK';
      switch(accion){
        case 'Guardar':
          url = urlPeticionAjaxTestRespuestaPosibleAtributosAccionGuardar;
        break;
        case 'Buscar':
          url = urlPeticionAjaxTestRespuestaPosibleAtributosAccionBuscar;
        break;
        case 'Modificar':
          url = urlPeticionAjaxTestRespuestaPosibleAtributosAccionModificar;
        break;
      }
    break;
    case 'Acciones':
      code = 'TEST_ACCIONES_RESPUESTA_POSIBLE_OK';
      switch(accion){
        case 'Guardar':
          url = urlPeticionAjaxTestRespuestasPosiblesAccionGuardar;
        break;
        case 'Buscar':
          url = urlPeticionAjaxTestRespuestasPosiblesAccionBuscar;
        break;
        case 'Modificar':
          url = urlPeticionAjaxTestRespuestasPosiblesAccionModificar;
        break;
        case 'Eliminar':
          url = urlPeticionAjaxTestRespuestasPosiblesAccionEliminar;
        break;
        case 'Reactivar':
          url = urlPeticionAjaxTestRespuestasPosiblesAccionReactivar;
        break;
      }
    break;
  }

  await test(url, code)
  .then((res) => {
    let idElementoList = ["iconoTestRespuestasPosibles", "iconoTestRespuestasPosibles" + tipoTest, "iconoTestRespuestasPosibles" + tipoTest + accion];
    if (tipoTest === 'Acciones') {
      let atributosValor = ["textoRespuesta"];
      cargarRespuestaOkTest(res.data.datosPruebaAcciones, "cabeceraAccionesRespuestasPosibles" + accion, "cuerpoAccionesRespuestasPosibles" + accion, atributosValor, "Respuestas Posibles", idElementoList, "acciones");
    } else if (tipoTest === 'Atributos'){
      cargarRespuestaOkTest(res.data.datosPruebaAtributos, "cabeceraAtributosRespuestasPosibles" + accion, "cuerpoAtributosRespuestasPosibles" + accion, "", "", idElementoList, "atributos");
    }
    }).catch((res) => {
      cargarModalErroresTest(res.code);
  });
}

/*Función que obtiene los test planes */
async function testPlan(accion, tipoTest){
  
  var url = "";
  var code = "";

  switch(tipoTest){
    case 'Atributos':
      code = 'TEST_ATRIBUTOS_PLAN_OK';
      switch(accion){
        case 'Guardar':
          url = urlPeticionAjaxTestPlanAtributosAccionGuardar;
        break;
        case 'Buscar':
          url = urlPeticionAjaxTestPlanAtributosAccionBuscar;
        break;
        case 'Modificar':
          url = urlPeticionAjaxTestPlanAtributosAccionModificar;
        break;
      }
    break;
    case 'Acciones':
      code = 'TEST_ACCIONES_PLAN_OK';
      switch(accion){
        case 'Guardar':
          url = urlPeticionAjaxTestPlanAccionGuardar;
        break;
        case 'Buscar':
          url = urlPeticionAjaxTestPlanAccionBuscar;
        break;
        case 'Modificar':
          url = urlPeticionAjaxTestPlanAccionModificar;
        break;
        case 'Eliminar':
          url = urlPeticionAjaxTestPlanAccionEliminar;
        break;
        case 'Reactivar':
          url = urlPeticionAjaxTestPlanAccionReactivar;
        break;
      }
    break;
  }

  await test(url, code)
  .then((res) => {
    let idElementoList = ["iconoTestPlan", "iconoTestPlan" + tipoTest, "iconoTestPlan" + tipoTest + accion];
    if (tipoTest === 'Acciones') {
      let atributosValor = ["nombrePlan", "descripPlan", "fechaPlan"];
      cargarRespuestaOkTest(res.data.datosPruebaAcciones, "cabeceraAccionesPlan" + accion, "cuerpoAccionesPlan" + accion, atributosValor, "Plan", idElementoList, "acciones");
    } else if (tipoTest === 'Atributos'){
      cargarRespuestaOkTest(res.data.datosPruebaAtributos, "cabeceraAtributosPlan" + accion, "cuerpoAtributosPlan" + accion, "", "", idElementoList, "atributos");
    }
    }).catch((res) => {
      cargarModalErroresTest(res.code);
  });
}

/*Función que obtiene los test procedimientos */
async function testProcedimiento(accion, tipoTest){

  var url = "";
  var code = "";

  switch(tipoTest){
    case 'Atributos':
      code = 'TEST_ATRIBUTOS_PROCEDIMIENTO_OK';
      switch(accion){
        case 'Guardar':
          url = urlPeticionAjaxTestProcedimientoAtributosAccionGuardar;
        break;
        case 'Buscar':
          url = urlPeticionAjaxTestProcedimientoAtributosAccionBuscar;
        break;
        case 'Modificar':
          url = urlPeticionAjaxTestProcedimientoAtributosAccionModificar;
        break;
      }
    break;
    case 'Acciones':
      code = 'TEST_ACCIONES_PROCEDIMIENTO_OK';
      switch(accion){
        case 'Guardar':
          url = urlPeticionAjaxTestProcedimientoAccionGuardar;
        break;
        case 'Buscar':
          url = urlPeticionAjaxTestProcedimientoAccionBuscar;
        break;
        case 'Modificar':
          url = urlPeticionAjaxTestProcedimientoAccionModificar;
        break;
        case 'Eliminar':
          url = urlPeticionAjaxTestProcedimientoAccionEliminar;
        break;
        case 'Reactivar':
          url = urlPeticionAjaxTestProcedimientoAccionReactivar;
        break;
      }
    break;
  }

  await test(url, code)
  .then((res) => {
    let idElementoList = ["iconoTestProcedimiento", "iconoTestProcedimiento" + tipoTest, "iconoTestProcedimiento" + tipoTest + accion];
    if (tipoTest === 'Acciones') {
      let atributosValor = ["nombreProcedimiento", "descripProcedimiento", "fechaProcedimiento", "checkUsuario"];
      cargarRespuestaOkTest(res.data.datosPruebaAcciones, "cabeceraAccionesProcedimiento" + accion, "cuerpoAccionesProcedimiento" + accion, atributosValor, "Procedimiento", idElementoList, "acciones");
    } else if (tipoTest === 'Atributos'){
      cargarRespuestaOkTest(res.data.datosPruebaAtributos, "cabeceraAtributosProcedimiento" + accion, "cuerpoAtributosProcedimiento" + accion, "", "", idElementoList, "atributos");
    }
    }).catch((res) => {
      cargarModalErroresTest(res.code);
  });
}


/*Función que obtiene los test procesos */
async function testProceso(accion, tipoTest){

  var url = "";
  var code = "";

  switch(tipoTest){
    case 'Atributos':
      code = 'TEST_ATRIBUTOS_PROCESO_OK';
      switch(accion){
        case 'Guardar':
          url = urlPeticionAjaxTestProcesoAtributosAccionGuardar;
        break;
        case 'Buscar':
          url = urlPeticionAjaxTestProcesoAtributosAccionBuscar;
        break;
        case 'Modificar':
          url = urlPeticionAjaxTestProcesoAtributosAccionModificar;
        break;
      }
    break;
    case 'Acciones':
      code = 'TEST_ACCIONES_PROCESO_OK';
      switch(accion){
        case 'Guardar':
          url = urlPeticionAjaxTestProcesoAccionGuardar;
        break;
        case 'Buscar':
          url = urlPeticionAjaxTestProcesoAccionBuscar;
        break;
        case 'Modificar':
          url = urlPeticionAjaxTestProcesoAccionModificar;
        break;
        case 'Eliminar':
          url = urlPeticionAjaxTestProcesoAccionEliminar;
        break;
        case 'Reactivar':
          url = urlPeticionAjaxTestProcesoAccionReactivar;
        break;
      }
    break;
  }

  await test(url, code)
  .then((res) => {
    let idElementoList = ["iconoTestProceso", "iconoTestProceso" + tipoTest, "iconoTestProceso" + tipoTest + accion];
    if (tipoTest === 'Acciones') {
      let atributosValor = ["nombreProceso", "descripProceso", "fechaProceso"];
      cargarRespuestaOkTest(res.data.datosPruebaAcciones, "cabeceraAccionesProceso" + accion, "cuerpoAccionesProceso" + accion, atributosValor, "Proceso", idElementoList, "acciones");
    } else if (tipoTest === 'Atributos'){
      cargarRespuestaOkTest(res.data.datosPruebaAtributos, "cabeceraAtributosProceso" + accion, "cuerpoAtributosProceso" + accion, "", "", idElementoList, "atributos");
    }
    }).catch((res) => {
      cargarModalErroresTest(res.code);
  });
}