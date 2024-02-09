        $(document).ready(function () {
            var orquestaSelect = $("#orquesta");
            var instrumentoSelect = $("#instrumento");

            // Registra el evento change en el select de orquesta
            orquestaSelect.change(function () {
                // Obtiene el valor seleccionado en el select de orquesta
                var selectedOrquesta = $(this).val();

                // Habilita o deshabilita el select de instrumento según la opción seleccionada en orquesta
                if (selectedOrquesta === "Inicial" || selectedOrquesta === "Juvenil") {
                    instrumentoSelect.prop("disabled", false);
                    instrumentoSelect.removeClass("disabled");
                } else {
                    instrumentoSelect.prop("disabled", true);
                    instrumentoSelect.addClass("disabled");
                }
            });

            $("#btnLeer").click(function () {
                // Muestra un alert con el texto especificado
                alert("Quien suscribe, en carácter de padre, madre, responsable o tutor, o por derecho propio, autorizo sin límites de tiempo ni vigencia, en virtud del carácter educativo y cultural de Templar Orquesta Escuela Infanto Juvenil Asociación Civil, a realizar uso de la imagen del estudiante o de ser mayor de mi propia imagen, en materiales audiovisuales, quedando autorizada 'Templar', a difundir y publicar las imágenes en redes sociales y diversos medios de comunicación, ello preservando el honor del mismo, garantizando los derechos humanos, de los adolescentes y los niños/as. Garantiza asimismo su derecho a voz en los mismos términos.");
            });

            $("#checkCesion").change(function () {
                // Habilita o deshabilita el botón de "Leer" según si el checkbox está marcado o no
                $("#btnLeer").prop("disabled", !this.checked);
            });

            $("form").submit(function (event) {
                event.preventDefault();
                function generateGuid() {
                    // Genera un GUID aleatorio
                    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                        var r = Math.random() * 16 | 0,
                            v = c === 'x' ? r : (r & 0x3 | 0x8);
                        return v.toString(16);
                    });
                }

                // Llamas a la función para obtener un nuevo GUID
                var nuevoGuid = generateGuid();

                // Obtén los valores de los campos del formulario
                var formData = {
                    estudianteId: nuevoGuid,  // Puedes generar un nuevo GUID si es necesario
                    nombre: $("#txtbNombres").val(),
                    apellido: $("#txtbApellidos").val(),
                    fechaNacimiento: $("#txtbFechaNacimiento").val(),
                    documento: $("#txtbDNIAlumno").val(),
                    telefono: $("#txtbCelularAlumno").val(),
                    //   direccion: "",  // Agrega el valor correspondiente
                    //   email: "",  // Agrega el valor correspondiente
                    //   instrumentoId: parseInt($("#instrumento").val()),  // Convierte el valor a entero
                    //   rutaFoto: "",  // Agrega el valor correspondiente
                    activo: true,  // o false según sea necesario
                    nombreTutor: $("#txtbNombrePadre").val(),
                    telefonoTutor: $("#txtbCelularPadre").val(),
                    asegurado: false,  // o false según sea necesario
                    documentoTutor: $("#txtbDNIPadre").val(),
                    nombreTutor2: $("#txtbNombreMadre").val(),
                    documentoTutor2: $("#txtbDNIMadre").val(),
                    telefonoTutor2: $("#txtbCelularMadre").val()
                };

                // Puedes imprimir los datos en la consola para verificar que se están recopilando correctamente
                console.log(formData);

                // Realiza la solicitud AJAX al endpoint de la API
                $.ajax({
                    type: "POST",
                    url: "https://localhost:7182/estudiante/save", // Reemplaza con la URL correcta
                    contentType: "application/json; charset=utf-8",
                    data: JSON.stringify(formData),
                    dataType: "json",
                    success: function (data) {
                        //  alert("Solicitud exitosa");  // Mensaje de éxito, puedes cambiarlo según tu necesidad
                        // console.log(data); // Aquí accedes al cuerpo de la respuesta
                        //  console.log(data.Estudiante); // Puedes acceder a propiedades específicas si las hay
                    },
                    error: function (error) {
                        // Maneja el error aquí
                        //    alert("Error en la solicitud");  // Mensaje de error, puedes cambiarlo según tu necesidad
                        // console.error(error);
                    }
                });
            });
        });
