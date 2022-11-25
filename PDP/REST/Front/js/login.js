/**
 * Ana Abad Lorenzo
 * 
 * Funciones para login.html
 * 
 */

/**Función login ajax con promesas*/
function loginAjaxPromesa(){
  return new Promise(function(resolve, reject) {
    var data = {
      controlador : 'Autenticacion',
      action: 'login',
      usuario : $('#userLogin').val(),
      passwd_usuario : $('#passLogin').val()
    }
    
    $.ajax({
      method: "POST",
      url: urlPeticionAjaxLogin,
      contentType : "application/x-www-form-urlencoded; charset=UTF-8",
      data: data
      }).done(res => {
        if (res.code != 'LOGIN_USUARIO_CORRECTO') {
          reject(res);
        }
        resolve(res);
    }).fail( function( jqXHR ) {
      errorFailAjax(jqXHR.status);
    });
  });
}

/**Función recuperar pass ajax con promesas*/
function recuperarPassAjaxPromesa(){
  return new Promise(function(resolve, reject) {
    var data = {
      usuario : $('#userRecuperarPass').val(),
      emailUsuario : $('#emailUser').val(),
      idioma: getCookie('lang')
    }

    $("#modal-title").removeClass();
    $("#modal-title").html('');
    $(".imagenAviso").attr('src', 'images/carga.gif');
    $("#modal-mensaje").removeClass();
    $("#modal-mensaje").html('');
    $("#modal-mensaje").addClass('CARGANDO');
    document.getElementById("modal").style.display = "block";
    
    $.ajax({
      method: "POST",
      url: urlPeticionAjaxRecuperarPass,
      contentType : "application/json",
      data: JSON.stringify(data),  
      dataType : 'json',
      }).done(res => {
        if (res.code != 'RECUPERAR_PASS_OK') {
          reject(res);
        }
        resolve(res);
      }).fail( function( jqXHR ) {
        errorFailAjax(jqXHR.status);
      });
  });
}

async function login() {
  await loginAjaxPromesa()
  .then((res) => {
    setCookie('tokenUsuario',res.resource.tokenUsuario);
    setCookie('rolUsuario', res.resource.rol);
    setCookie('usuario', res.resource.usuario);

    window.location.href = "menu.html";
  })
  .catch((res) => {
    $("#login-modal").modal('toggle'); 
    respuestaAjaxKO(res.code);

    let idElementoList = ["userLogin", "passLogin"];
    resetearFormulario("formularioLogin", idElementoList);
    setLang(getCookie('lang'));
    document.getElementById("modal").style.display = "block";
});
}

async function recuperarPass(){
  await recuperarPassAjaxPromesa()
  .then((res) => {
  	$("#recuperarcontrasena-modal").modal('toggle');
  	$("#login-modal").modal('toggle'); 

    respuestaAjaxOK("CONTRASEÑA_REC_OK", res.code);

    let idElementoList = ["userRecuperarPass", "emailUser"];
    resetearFormulario("formularioRecuperarPass", idElementoList);
    setLang(getCookie('lang'));
    document.getElementById("modal").style.display = "block";
    })
    
  .catch((res) => {
    $("#recuperarcontrasena-modal").modal('toggle'); 
    $("#login-modal").modal('toggle');
    respuestaAjaxKO(res.code);
    let idElementoList = ["userRecuperarPass", "emailUser"];
    resetearFormulario("formularioRecuperarPass", idElementoList);
    setLang(getCookie('lang'));
    document.getElementById("modal").style.display = "block";
  });
}

$(document).ready(function(){
  $("#login-modal").on('hidden.bs.modal', function () {
  	let idElementoErrorList = ["errorFormatoUser", "errorFormatoPass", "bloqueoMayusculas"];
  	let idElementoList = ["userLogin","passLogin"];
    limpiarFormulario(idElementoList);
  	eliminarMensajesValidacionError(idElementoErrorList, idElementoList);
  	setLang(getCookie('lang'));
  });

	$("#recuperarcontrasena-modal").on('hidden.bs.modal', function () {
		let idElementoErrorList = ["errorFormatoUserPass", "errorFormatoEmail"];
		let idElementoList = ["userRecuperarPass","emailUser"];
    limpiarFormulario(idElementoList);
		eliminarMensajesValidacionError(idElementoErrorList, idElementoList);
		setLang(getCookie('lang'));
    });
});

        