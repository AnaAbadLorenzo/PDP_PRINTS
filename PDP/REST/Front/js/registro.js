/**Función ajax con promesas para el registro*/
function registroAjaxPromesa() {

	return new Promise(function(resolve, reject) {
		if (verificarPasswd()) {
			encriptar('passwdUsuario1');

			var registro = {
				controlador: 'Registro',
				action: 'registro',
				dni_persona: $('#dniP').val(),
				nombre_persona: $('#nombreP').val(),
				apellidos_persona: $('#apellidosP').val(),
				fecha_nac_persona: $('#fechaNacP').val(),
				direccion_persona: $('#direccionP').val(),
				telefono_persona: $('#telefonoP').val(),
				email_persona: $('#emailP').val(),
				borrado_Persona: 0,
				usuario: $('#usuario').val(),
				passwd_usuario: $('#passwdUsuario1').val()
			}

			$.ajax({
				method: "POST",
				url: urlPeticionAjaxRegistro,
				contentType: "application/x-www-form-urlencoded; charset=UTF-8",
				data: registro,
			}).done(res => {
				if (res.code != 'REGISTRO_OK') {
					reject(res);
				}
				resolve(res);
			}).fail( function( jqXHR ) {
			  errorFailAjax(jqXHR.status);
			});
		}
	});
}

async function registro() {
	await registroAjaxPromesa()
	.then((res) => {
		$("#registro-modal").modal('toggle');
		respuestaAjaxOK("REGISTRO_CORRECTO", res.code);
    	setLang(getCookie('lang'));
		document.getElementById("modal").style.display = "block";
	})

	.catch((res) => {
		$("#registro-modal").modal('toggle');
		respuestaAjaxKO(res.code);

		let idElementoList = ["dniP", "nombreP", "apellidosP", "fechaNacP", "direccionP", "telefonoP", "emailP", "usuario", "passwdUsuario1", "passwdUsuario2"];
		resetearFormulario("formularioRegistro", idElementoList);
		setLang(getCookie('lang'));
		document.getElementById("modal").style.display = "block";
	});
};

/**Función verificar passwd**/
function verificarPasswd() {
	passwdUsuario1 = $('#passwdUsuario1').val();
	passwdUsuario2 = $('#passwdUsuario2').val();

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

$(document).ready(function() {
	$("#registro-modal").on('hidden.bs.modal', function() {
		
		let idElementoErrorList = ["errorFormatoDni", "errorFormatoNombrePersona", "errorFormatoApellidosP", "errorFormatoFecha", "errorFormatoDireccion", "errorFormatoTelefono",
			"errorFormatoEmail", "errorFormatoUserRegistro", "errorFormatoPassRegistro", "errorFormatoPassRegistro2"];
		
		let idElementoList = ["dniP", "nombreP", "apellidosP", "fechaNacP", "direccionP", "telefonoP", "emailP", "usuario", "passwdUsuario1", "passwdUsuario2"];

		limpiarFormulario(idElementoList);
		$('#error').removeClass();
		$("#error").html('');
		$("#error").css("display", "none");
		
		$('#iconoTabDatosPersonales').attr('hidden',true);
		$('#iconoTabDatosUsuario').attr('hidden',true);

		eliminarMensajesValidacionError(idElementoErrorList, idElementoList);
		setLang(getCookie('lang'));
	});

});
