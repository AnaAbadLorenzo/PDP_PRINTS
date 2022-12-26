/* Funcion para cambiar la contraseña */
async function changePass() {
  await changePassUsuarioAjaxPromesa()
    .then((res) => {
      $("#changePass-modal").modal('toggle');

      respuestaAjaxOK("CONTRASEÑA_CHANGE_OK", res.code);
    
      let idElementoList = ["passChangePass1", "passChangePass2"];
      resetearFormulario("formularioChangePass", idElementoList);
      setLang(getCookie('lang'));
      document.getElementById("modal").style.display = "block";
      
      }).catch((res) => {
        
        $("#changePass-modal").modal('toggle');
        
        respuestaAjaxKO(res.code);

        let idElementoList = ["passChangePass1", "passChangePass2"];
        limpiarFormulario(idElementoList);
        resetearFormulario("formularioChangePass", idElementoList);
        setLang(getCookie('lang'));
        document.getElementById("modal").style.display = "block";
      });
}

/** Funcion para cargar las noticias de BD **/
async function cargarNoticias(){
  await cargarNoticiasAjaxPromesa()
  .then((res) => {
      $('#noticias').html('');
      for(var i = 0; i<res.resource.listaBusquedas.length; i++){
        var noticia = construyeNoticia(res.resource.listaBusquedas[i]);
        $('#noticias').append(noticia);
      }
      }).catch((res) => {
    
        respuestaAjaxKO(res.code);
        setLang(getCookie('lang'));
        document.getElementById("modal").style.display = "block";
      });
}

/* Función para cambiar la contraseña con ajax y promesas */
function changePassUsuarioAjaxPromesa(){
  return new Promise(function(resolve, reject) {
    if(verificarPasswd()){
      encriptar('passChangePass1');
      var usuario = getCookie('usuario');
      var token = getCookie('tokenUsuario');
      var passwdUsuario =  $('#passChangePass1').val();

      var cambiarContrasena = {
        usuario : usuario,
        passwdUsuario : passwdUsuario
      };
  
      $.ajax({
      method: "POST",
      url: urlPeticionAjaxCambiarContrasenaUsuario,
      contentType : "application/json",
      data: JSON.stringify(cambiarContrasena),
      dataType : 'json',
      headers: {'Authorization': token},
      }).done(res => {
        if (res.code != 'PASSWORD_CAMBIADA') {
          reject(res);
        }
        resolve(res);
    }).fail( function( jqXHR ) {
        errorFailAjax(jqXHR.status);
      });
  }else{
    document.getElementById("error").setAttribute('style', "");
  }
  });
    
}

/**Función verificar passwd**/
function verificarPasswd() {
  passwdUsuario1 = $('#passChangePass1').val();
  passwdUsuario2 = $('#passChangePass2').val();

  if (passwdUsuario1 != passwdUsuario2) {
    addCodeError('error', 'CONTRASEÑAS_NO_COINCIDEN');
    return false;

  } else {
    $("#error").removeClass();
    $("#error").html('');
    $("#error").css("display", "none");
    return true;
  }
};


/*Funcion para obtener las funcionalidades de un usuario */
async function funcionalidadesUsuario() {
  await funcionalidadesUsuarioAjaxPromesa()
    .then((res) => {
        cargarFuncionalidadesUsuario(res.resource);
    })
    .catch((res) => {
       if($('#login-modal').is(':visible')) {
         $("#login-modal").modal('toggle'); 
      };
       respuestaAjaxKO('ERROR_LISTAR_FUNCIONALIDADES_MENU');

  });
}

/**Función obtener las funcionalidades de un usuario con promesas*/
function funcionalidadesUsuarioAjaxPromesa(){
  return new Promise(function(resolve, reject) {
    var nombreUsuario = getCookie('usuario');
    var token = getCookie('tokenUsuario');
    
    var data = {
      controlador : 'GestionACL',
      action : 'searchFuncionalidadesUsuario',
      usuario : nombreUsuario
    };
  
    $.ajax({
      method: "POST",
      url: urlPeticionAjaxFuncionalidadesUsuario,
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

/** Función para obtener de back las noticias con ajax y promesas**/
function cargarNoticiasAjaxPromesa(){
  return new Promise(function(resolve, reject) {
    var token = getCookie('tokenUsuario');
    
    var data = {
      controlador : 'GestionNoticias',
      action : 'searchAll'
    }

    $.ajax({
      method: "POST",
      url: urlPeticionAjaxListarTodasNoticias,
      contentType : "application/x-www-form-urlencoded; charset=UTF-8", 
      data : data,
      headers: {'Authorization': token},
      }).done(res => {
        if (res.code != 'BUSQUEDA_NOTICIA_CORRECTO') {
          reject(res);
        }
        resolve(res);
    }).fail( function( jqXHR ) {
        errorFailAjax(jqXHR.status);
      });
  });
}

/**Función que carga las funcionalidades asociadas al usuario**/

/*function cargarFuncionalidadesUsuario(datos){
  var i;
  var rolUsuario = getCookie('rolUsuario');

  $("#listadoFuncionalidades").html("");

  var htmlMenu = '';

  if (rolUsuario === 'admin') {

    for(i = 0; i<(datos.funcionalidades.length) - 1; i++) {
      htmlMenu = htmlMenu + '<a class="dropdown-item ' + cargarClass(datos.funcionalidades[i], rolUsuario) + '" href="' + cargarHref(datos.funcionalidades[i]) + '">' + datos.funcionalidades[i] + '</a> <div class="dropdown-divider"></div>';
    }

    htmlMenu = htmlMenu + '<a class="dropdown-item ' + cargarClass(datos.funcionalidades[i], rolUsuario) + '" href="' + cargarHref(datos.funcionalidades[i]) + '">' + datos.funcionalidades[i] + '</a>';

  } else if (rolUsuario === 'gestor') {

    var funcionalidadEncontrada = 0;
    var totalFuncionalidades = 11;

    if (datos.funcionalidades.includes('Gestión de empresas')) {
      funcionalidadEncontrada ++;
    }

    if (datos.funcionalidades.includes('Gestión de usuarios')) {
      funcionalidadEncontrada ++;
    }

    if (datos.funcionalidades.includes('Gestión de personas')) {
      funcionalidadEncontrada ++;
    }

    if (datos.funcionalidades.includes('Gestión de noticias')) {
      funcionalidadEncontrada ++;
    }

    if (datos.funcionalidades.includes('Gestión de objetivos')) {
      funcionalidadEncontrada ++;
    }

    if (datos.funcionalidades.includes('Gestión de respuestas posibles')) {
      funcionalidadEncontrada ++;
    }

    if (datos.funcionalidades.includes('Gestión de planes')) {
      funcionalidadEncontrada ++;
    }

    if (datos.funcionalidades.includes('Gestión de procedimientos')) {
      funcionalidadEncontrada ++;
    }

    if (datos.funcionalidades.includes('Gestión de procesos')) {
      funcionalidadEncontrada ++;
    }

    if (datos.funcionalidades.includes('Gestión de procedimientos ejecutados')) {
      funcionalidadEncontrada ++;
    }

    if (datos.funcionalidades.includes('Gestión de procesos ejecutados')) {
      funcionalidadEncontrada ++;
    }


    if (funcionalidadEncontrada === totalFuncionalidades) {

      htmlMenu = '<a class="dropdown-item ' + cargarClass('Gestión de noticias', rolUsuario) + '" href="' + cargarHref('Gestión de noticias') + '">Gestión de noticias</a> <div class="dropdown-divider"></div>' +
                 '<a class="dropdown-item ' + cargarClass('Gestión de objetivos', rolUsuario) + '" href="' + cargarHref('Gestión de objetivos') + '">Gestión de objetivos</a> <div class="dropdown-divider"></div>' +
                 '<a class="dropdown-item ' + cargarClass('Gestión de planes', rolUsuario) + '" href="' + cargarHref('Gestión de planes') + '">Gestión de planes</a> <div class="dropdown-divider"></div>' +
                 '<a class="dropdown-item ' + cargarClass('Gestión de procedimientos', rolUsuario) + '" href="' + cargarHref('Gestión de procedimientos') + '">Gestión de procedimientos</a> <div class="dropdown-divider"></div>' +
                 '<a class="dropdown-item ' + cargarClass('Gestión de procedimientos ejecutados', rolUsuario) + '" href="' + cargarHref('Gestión de procedimientos ejecutados') + '">Gestión de procedimientos ejecutados</a> <div class="dropdown-divider"></div>' +
                 '<a class="dropdown-item ' + cargarClass('Gestión de procesos', rolUsuario) + '" href="' + cargarHref('Gestión de procesos') + '">Gestión de procesos</a> <div class="dropdown-divider"></div>' +
                 '<a class="dropdown-item ' + cargarClass('Gestión de procesos ejecutados', rolUsuario) + '" href="' + cargarHref('Gestión de procesos ejecutados') + '">Gestión de procesos ejecutados</a> <div class="dropdown-divider"></div>' +
                 '<a class="dropdown-item ' + cargarClass('Gestión de respuestas posibles', rolUsuario) + '" href="' + cargarHref('Gestión de respuestas posibles') + '">Gestión de respuestas posibles</a> <div class="dropdown-divider"></div>' +
                 '<a class="dropdown-item ' + cargarClass('Gestión de empresas', rolUsuario) + '" href="' + cargarHref('Gestión de empresas') + '">Gestión de empresas</a> <div class="dropdown-divider"></div>' +
                 '<a class="dropdown-item ' + cargarClass('Gestión de usuarios', rolUsuario) + '" href="' + cargarHref('Gestión de usuarios') + '">Gestión de usuarios</a> <div class="dropdown-divider"></div>' +
                 '<a class="dropdown-item ' + cargarClass('Gestión de personas', rolUsuario) + '" href="' + cargarHref('Gestión de personas') + '">Gestión de personas</a>';
    }

  } else if (rolUsuario === 'Usuario') {

    var funcionalidadEncontrada = 0;
    var totalFuncionalidades = 5;

    if (datos.funcionalidades.includes('Gestión de ')) {
      funcionalidadEncontrada ++;
    }

    if (datos.funcionalidades.includes('Gestión de usuarios')) {
      funcionalidadEncontrada ++;
    }

    if (datos.funcionalidades.includes('Gestión de personas')) {
      funcionalidadEncontrada ++;
    }

    if (datos.funcionalidades.includes('Gestión de planes')) {
      funcionalidadEncontrada ++;
    }

    if (datos.funcionalidades.includes('Gestión de procedimientos')) {
      funcionalidadEncontrada ++;
    }

    if (funcionalidadEncontrada === totalFuncionalidades) {

      htmlMenu = '<a class="dropdown-item ' + cargarClass('Gestión de planes', rolUsuario) + '" href="' + cargarHref('Gestión de planes') + '">Gestión de planes</a> <div class="dropdown-divider"></div>' +
                 '<a class="dropdown-item ' + cargarClass('Gestión de empresas', rolUsuario) + '" href="' + cargarHref('Gestión de empresas') + '">Gestión de empresas</a> <div class="dropdown-divider"></div>' +
                 '<a class="dropdown-item ' + cargarClass('Gestión de usuarios', rolUsuario) + '" href="' + cargarHref('Gestión de usuarios') + '">Gestión de usuarios</a> <div class="dropdown-divider"></div>' +
                 '<a class="dropdown-item ' + cargarClass('Gestión de personas', rolUsuario) + '" href="' + cargarHref('Gestión de personas') + '">Gestión de personas</a> <div class="dropdown-divider"></div>' +
                 '<a class="dropdown-item ' + cargarClass('Gestión de procedimientos', rolUsuario) + '" href="' + cargarHref('Gestión de procedimientos') + '">Gestión de procedimientos</a>' ;
    }

    document.getElementById('listadoFuncionalidades').style.height = "236px"; 
    document.getElementById('listadoFuncionalidades').style.overflowY =  "hidden";

  }

  $("#listadoFuncionalidades").append(htmlMenu);

  setLang(getCookie('lang'));

}*/

function cargarFuncionalidadesUsuario(datos){
  var i;
  var rolUsuario = getCookie('rolUsuario');

  $("#listadoFuncionalidades").html("");

  var htmlMenu = '';

  for(i = 0; i<(datos.length) - 1; i++) {
      htmlMenu = htmlMenu + '<a class="dropdown-item ' + cargarClass(datos[i], rolUsuario) + '" href="' + cargarHref(datos[i]) + '">' + datos[i] + '</a> <div class="dropdown-divider"></div>';
  }

    htmlMenu = htmlMenu + '<a class="dropdown-item ' + cargarClass(datos[i], rolUsuario) + '" href="' + cargarHref(datos[i]) + '">' + datos[i] + '</a>';

    document.getElementById('listadoFuncionalidades').style.height = "236px";    
    document.getElementById('listadoFuncionalidades').style.overflowY =  "hidden";

  $("#listadoFuncionalidades").append(htmlMenu);

  setLang(getCookie('lang'));

}

/** Funcion para construir las noticias **/
function construyeNoticia(noticia){
    var noticiaHTML = "";

    var fechaNoticia = new Date(noticia.fecha_noticia);

    noticiaHTML = '<div class="col-md-4 col-lg-6 col-xl-6 mb-4">' + 
                    '<div class="card">' + 
                      '<img src="images/news.png" class="card-img-top" alt="Noticias">' + 
                        '<div class="card-body-news">' + 
                          '<h4 class="card-title">' + noticia.titulo_noticia + '</h4>' + 
                          '<p class="card-text">' + noticia.contenido_noticia + '</p>' + 
                        '</div>' + 
                        '<div class="card-footer">' + 
                          '<small class="text-muted">' + convertirFecha(fechaNoticia.toString()) + '</small>' + 
                        '</div>' + 
                    '</div>' + 
                  '</div>';

  return noticiaHTML;

}

$(document).ready(function() {
  $("#changePass-modal").on('hidden.bs.modal', function() {
    
    let idElementoErrorList = ["errorFormatoChangePass1", "errorFormatoChangePass2", "bloqueoMayusculasChangePass", "error"];
    
    let idElementoList = ["passChangePass1", "passChangePass2"];

    limpiarFormulario(idElementoList);
    eliminarMensajesValidacionError(idElementoErrorList, idElementoList);
    setLang(getCookie('lang'));
  });

});
