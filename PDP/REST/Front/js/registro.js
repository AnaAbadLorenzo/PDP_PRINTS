/**
 * Ana Abad Lorenzo
 * 
 * Funciones para registro.html
 * 
 */

/** Habilitar segunda pregunta y en funcion de respuesta de la primera**/
$(function() {
	$("input[name=asociarEmpresa]").change(function() {
		if ($(this).val() === "si") {
			$("#selectEmpresas").removeAttr('hidden')
		} else {
			$('#selectEmpresasDisponibles').prop('hidden', true);
			$("#selectEmpresas").prop('hidden', true);
			$('#formRegistroEmpresa').prop("hidden", true);
		}
	});
});


/**Habilitar o deshabilitar el select para seleccionar la empresa**/
$(function() {
	$("input[name=seleccionarEmpresa]").change(function() {
		if ($(this).val() === "si") {
			$('#selectEmpresasDisponibles').removeAttr('hidden');
			$("#empresasDisponibles").removeAttr('disabled')
		} else {
			$('#selectEmpresasDisponibles').prop('hidden', true);
			$("#empresasDisponibles").prop('disabled', true);
			$('#formRegistroEmpresa').prop("hidden", true);
		}
	});
});

/** Habilitar form para añadir empresa **/
$(function() {
	$("input[name=asociarEmpresa]").change(function() {
		if ($(this).val() === "si") {

			$("input[name=seleccionarEmpresa").change(function() {

				if ($(this).val() == "no") {
					$('#formRegistroEmpresa').removeAttr('hidden');

				} else {
					$('#formRegistroEmpresa').prop("hidden", true);
				}
			});

		} else {
			$("#empresasDisponibles").prop('disabled', true);
		}
	});
});

/** Habilitar form para añadir empresa desde el select de empresas**/
$(function() {
	$("#empresasDisponibles").change(function() {
		if ($("#empresasDisponibles :selected").val() === "default") {

					$('#formRegistroEmpresa').removeAttr('hidden');

				} else {
					$('#formRegistroEmpresa').prop("hidden", true);
				}
			});
});


/**Función ajax con promesas para el registro*/
function registroAjaxPromesa() {

	return new Promise(function(resolve, reject) {
		if (verificarPasswd()) {
			encriptar('passwdUsuario1');

			var datosPersona = {
				dniP: $('#dniP').val(),
				nombreP: $('#nombreP').val(),
				apellidosP: $('#apellidosP').val(),
				fechaNacP: $('#fechaNacP').val(),
				direccionP: $('#direccionP').val(),
				telefonoP: $('#telefonoP').val(),
				emailP: $('#emailP').val(),
				borradoP: 0
			};

			var datosUsuario = {
				usuario: $('#usuario').val(),
				passwdUsuario: $('#passwdUsuario1').val()
			};

			var asociarEmpresa = $('input[name=asociarEmpresa]:checked').val();
			var seleccionarEmpresaPregunta = $('input[name=seleccionarEmpresa]:checked').val();

			if (asociarEmpresa === 'si' && seleccionarEmpresaPregunta === 'si') {

				var datosEmpresa = {
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
				var datosEmpresa = {
					idEmpresa: "",
					cifEmpresa: $('#cifEmpresa').val(),
					nombreEmpresa: $('#nombreEmpresa').val(),
					direccionEmpresa: $('#direccionEmpresa').val(),
					telefonoEmpresa: $('#telefonoEmpresa').val(),
					borradoEmpresa: ""
				};

				var seleccionarEmpresa = "No";
			
			}else if (asociarEmpresa === 'si' && seleccionarEmpresaPregunta === 'no') {

				var datosEmpresa = {
					idEmpresa: "",
					cifEmpresa: $('#cifEmpresa').val(),
					nombreEmpresa: $('#nombreEmpresa').val(),
					direccionEmpresa: $('#direccionEmpresa').val(),
					telefonoEmpresa: $('#telefonoEmpresa').val(),
					borradoEmpresa: ""
				};

				var seleccionarEmpresa = "No";

			} else {

				var datosEmpresa = null;
				var seleccionarEmpresa = "";
			}

			var registro = {
				datosPersona: datosPersona,
				datosUsuario: datosUsuario,
				datosEmpresa: datosEmpresa,
				seleccionarEmpresa : seleccionarEmpresa
			}

			$.ajax({
				method: "POST",
				url: urlPeticionAjaxRegistro,
				contentType: "application/json",
				data: JSON.stringify(registro),
				dataType: 'json',
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

/**Función ajax con promesas para obtener el listado de empresas*/

function obtenerEmpresasAjaxPromesa() {
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
};


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

		let idElementoList = ["dniP", "nombreP", "apellidosP", "fechaNacP", "direccionP", "telefonoP", "emailP", "usuario", "passwdUsuario1", "passwdUsuario2", "cifEmpresa",
		"nombreEmpresa", "direccionEmpresa", "telefonoEmpresa"];
		resetearFormulario("formularioRegistro", idElementoList);
		setLang(getCookie('lang'));
		document.getElementById("modal").style.display = "block";
	});
};

/**Función para obtener el listado de empresas del sistema **/
async function obtenerEmpresas() {
	await obtenerEmpresasAjaxPromesa()
	.then((res) => {
		limpiaSelect($('#empresasDisponibles'));
		rellenaSelect($('#empresasDisponibles'), res.data);
	})

	.catch((res) => {
		respuestaAjaxKO('ERROR_LISTAR_EMPRESAS');

	});
}

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
			"errorFormatoEmail", "errorFormatoUserRegistro", "errorFormatoPassRegistro", "errorFormatoPassRegistro2", "errorFormatoCifEmpresa", "errorFormatoNombreEmpresa", "errorFormatoDireccionEmpresa", "errorFormatoTelefonoEmpresa",
			"bloqueoMayusculasRegistro"];
		
		let idElementoList = ["dniP", "nombreP", "apellidosP", "fechaNacP", "direccionP", "telefonoP", "emailP", "usuario", "passwdUsuario1", "passwdUsuario2", "cifEmpresa",
			"nombreEmpresa", "direccionEmpresa", "telefonoEmpresa"];

		let idElementosRadioButtons = ["asociarEmpresaSi", "asociarEmpresaNo", "seleccionarEmpresaSi", "seleccionarEmpresaNo"];

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
		setLang(getCookie('lang'));
	});

});
