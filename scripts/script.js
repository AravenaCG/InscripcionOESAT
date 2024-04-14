$(document).ready(function () {
  var orquestaSelect = $("#orquesta");
  var instrumentoSelect = $("#instrumento");
  var profesorSelect = $("#profesor"); // Declarar el select de profesor fuera de la función change
  var formData = {};
  var nuevoGuid; // Definir nuevoGuid como una variable global
//Comentario para ver carga de archivo
  function generateGuid() {
    // Genera un GUID aleatorio
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        var r = (Math.random() * 16) | 0,
          v = c === "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      }
    );
  }

  // Registra el evento change en el select de orquesta
  orquestaSelect.change(function () {
    // Obtiene el valor seleccionado en el select de orquesta
    var selectedOrquesta = $(this).val();

    // Habilita o deshabilita el select de instrumento según la opción seleccionada en orquesta
    if (
      selectedOrquesta === "Orquesta Inicial" ||
      selectedOrquesta === "Orquesta Juvenil"
    ) {
      instrumentoSelect.prop("disabled", false);
      instrumentoSelect.removeClass("disabled");
    } else {
      instrumentoSelect.prop("disabled", true);
      instrumentoSelect.addClass("disabled");
      // También puedes restablecer el valor seleccionado en el select de instrumento
      instrumentoSelect.val(""); // Esto evita que el valor seleccionado anteriormente permanezca después de deshabilitar el select
    }
  });
  // Registra el evento change en el select de instrumento
  instrumentoSelect.change(function () {
    // Aquí puedes agregar la lógica para manejar los cambios en el select de instrumento
    if (parseInt($(this).val()) == 1) {
      // Si se selecciona "Violín", habilita la lista de profesores
      profesorSelect.prop("disabled", false);
    } else {
      // Si se selecciona otro instrumento, deshabilita la lista de profesores y selecciona la opción predeterminada
      profesorSelect.prop("disabled", true);
      profesorSelect.val(""); // Restablece el valor seleccionado
    }
  });

  $("#chkMenor18").change(function () {
    // Si el checkbox está seleccionado, habilita los campos de los padres/madres
    if ($(this).is(":checked")) {
      $("#txtbNombrePadre").prop("disabled", false);
      $("#txtbDNIPadre").prop("disabled", false);
      $("#txtbNombreMadre").prop("disabled", false);
      $("#txtbDNIMadre").prop("disabled", false);
      $("#txtbCelularPadre").prop("disabled", false);
      $("#txtbCelularMadre").prop("disabled", false);
    } else {
      // Si el checkbox no está seleccionado, deshabilita los campos de los padres/madres
      $("#txtbNombrePadre").prop("disabled", true).val("");
      $("#txtbDNIPadre").prop("disabled", true).val("");
      $("#txtbNombreMadre").prop("disabled", true).val("");
      $("#txtbDNIMadre").prop("disabled", true).val("");
      $("#txtbCelularPadre").prop("disabled", true).val("");
      $("#txtbCelularMadre").prop("disabled", true).val("");
    }
  });


  function toggleCamposDeTexto(value, textBoxId) {
    $("#" + textBoxId).prop("disabled", value !== "SI");
    // Si el valor es "SI", habilita el campo de texto; de lo contrario, lo deshabilita
    if (value === "SI") {
      $("#" + textBoxId).prop("required", true);
    } else {
      $("#" + textBoxId).prop("required", false);
    }
  }

  // Escucha los cambios en el radio button de tratamiento médico
  $('input[name="tratamiento"]').change(function () {
    toggleCamposDeTexto($(this).val(), "txtbtratamientoCual");
  });

  // Escucha los cambios en el radio button de episodio psicomotriz
  $('input[name="psicomotriz"]').change(function () {
    toggleCamposDeTexto($(this).val(), "txtbpsicomotrizCual");
  });

  // Escucha los cambios en el radio button de particularidad
  $('input[name="particularidad"]').change(function () {
    toggleCamposDeTexto($(this).val(), "txtbParticularidadCual");
  });

  $("#btnLeer").click(function (e) {
    e.preventDefault(); // Evita el envío automático del formulario al hacer clic en el botón "Aceptar" del alert
    // Muestra un alert con el texto especificado
    alert(
      "Quien suscribe, en carácter de padre, madre, responsable o tutor, o por derecho propio, autorizo sin límites de tiempo ni vigencia, en virtud del carácter educativo y cultural de Templar Orquesta Escuela Infanto Juvenil Asociación Civil, a realizar uso de la imagen del estudiante o de ser mayor de mi propia imagen, en materiales audiovisuales, quedando autorizada 'Templar', a difundir y publicar las imágenes en redes sociales y diversos medios de comunicación, ello preservando el honor del mismo, garantizando los derechos humanos, de los adolescentes y los niños/as. Garantiza asimismo su derecho a voz en los mismos términos."
    );
  });
  $("#checkCesion").change(function () {
    // Habilita o deshabilita el botón de "Registrar" según si el checkbox está marcado o no
    $("#btnRegistrar").prop("disabled", !this.checked);
  });

  $("form").submit(function (event) {
    event.preventDefault();
    

    // Llamas a la función para obtener un nuevo GUID
    nuevoGuid = generateGuid();

    
  function updateFormData() {
    formData.estudianteId = nuevoGuid;
    formData.nombre = $("#txtbNombres").val();
    formData.apellido = $("#txtbApellidos").val();
    formData.documento = $("#txtbDNIAlumno").val();
    formData.fechaNacimiento = $("#txtbFechaNacimiento").val();
    formData.direccion = $("#txtbDomicilio").val();
    formData.nacionalidad = $("#nacionalidad").val();
    formData.telefono = $("#txtbCelularAlumno").val();
    formData.email = $("#txtbEmailAlumno").val();
    formData.nombreTutor = $("#txtbNombrePadre").val();
    formData.documentoTutor = $("#txtbDNIPadre").val();
    formData.nombreTutor2 = $("#txtbNombreMadre").val();
    formData.documentoTutor2 = $("#txtbDNIMadre").val();
    formData.telefonoTutor = $("#txtbCelularPadre").val();
    formData.telefonoTutor2 = $("#txtbCelularMadre").val();
    formData.orquesta = $("#orquesta").val();
    formData.instrumentoId = instrumentoId;
    formData.instrumentoNombre = instrumentoNombre;
    formData.profeCursoViolin = $("#profesor").val();
    formData.activo = true; // o false según sea necesario
    formData.asegurado = false; // o false según sea necesario
    formData.tmtMédico = $("#txtbtratamientoCual").val();
    formData.epPsicoMotriz = $("#txtbpsicomotrizCual").val();
    formData.particularidad = $("#txtbParticularidadCual").val();
    formData.autoretiro = $("#autorizaCheckbox").is(":checked");
}

    // Evento change para el checkbox de autorización de retiro
    $("#autorizaCheckbox").change(function () {
      updateFormData();
  });

    // Obtén los valores de los campos del formulario
    var instrumentoSelected = document.getElementById("instrumento");
    var selectedOption =
      instrumentoSelected.options[instrumentoSelected.selectedIndex];
    var instrumentoId = parseInt(selectedOption.value); // Convertir el valor a entero
    var instrumentoNombre = selectedOption.dataset.value; // Obtener el valor personalizado

    formData = {
      estudianteId: nuevoGuid, // Puedes generar un nuevo GUID si es necesario
      nombre: $("#txtbNombres").val(),
      apellido: $("#txtbApellidos").val(),
      documento: $("#txtbDNIAlumno").val(),
      fechaNacimiento: $("#txtbFechaNacimiento").val(),
      direccion: $("#txtbDomicilio").val(),
      nacionalidad: $("#nacionalidad").val(),
      telefono: $("#txtbCelularAlumno").val(),
      email: $("#txtbEmailAlumno").val(), // Agrega el valor correspondiente si tienes un campo para el email
      nombreTutor: $("#txtbNombrePadre").val(),
      documentoTutor: $("#txtbDNIPadre").val(),
      nombreTutor2: $("#txtbNombreMadre").val(),
      documentoTutor2: $("#txtbDNIMadre").val(),
      telefonoTutor: $("#txtbCelularPadre").val(),
      telefonoTutor2: $("#txtbCelularMadre").val(),
      orquesta: $("#orquesta").val(),
      instrumentoId: instrumentoId, // Valor numérico del instrumento seleccionado
      instrumentoNombre: instrumentoNombre, // Nombre del instrumento seleccionado
      profeCursoViolin: $("#profesor").val(),
      activo: true, // o false según sea necesario
      asegurado: false, // o false según sea necesario
      tmtMédico: $("#txtbtratamientoCual").val(), // Agrega el valor correspondiente si tienes un campo para el TMT Médico
      epPsicoMotriz: $("#txtbpsicomotrizCual").val(), // Agrega el valor correspondiente si tienes un campo para la EP Psico-Motriz
      particularidad: $("#txtbParticularidadCual").val(), // Agrega el valor correspondiente si tienes un campo para la particularidad
      autoretiro: $("#autorizaCheckbox").is(":checked"),
    };
    
    
    // Puedes imprimir los datos en la consola para verificar que se están recopilando correctamente
    console.log(formData);

    // Realiza la solicitud AJAX al endpoint de la API
    $.ajax({
      type: "POST",
      url: "https://sistemagestionorquesta.azurewebsites.net/estudiante/save",
      contentType: "application/json; charset=utf-8",
      data: JSON.stringify(formData),
      dataType: "json",
      beforeSend: function (xhr) {
        var token = localStorage.getItem("accessToken");
        if (token) {
          xhr.setRequestHeader("Authorization", "Bearer " + token);
        }
      },
      success: function (data) {
        alert("Solicitud exitosa");
        // console.log(data);
        // console.log(data.Estudiante);
      },
      error: function (error) {
        // Maneja el error aquí
        if (error.responseJSON && error.responseJSON.messages && error.responseJSON.messages.length > 0) {
          var errorMessage = error.responseJSON.messages[0].help;
          alert("Error en la solicitud: " + errorMessage);
        } else {
          alert("Error en la solicitud");
        }
      },
    });
  });
});
