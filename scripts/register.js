const VARIABLES = {
    api_url: "https://script.google.com/macros/s/AKfycbzOkYmtHYMSy8IgW1HVLZt7WxDlFVu5YApuLrH0IoL4rqnAlkEfc_gGTzx2v63hwACT/exec"
};

const INICIAR_COMPONENTES = {
    init() {
        this.cargarPagina();
        this.establecerBotones();
    },
    cargarPagina() {
        const usuario = sessionStorage.getItem("usuario");
        const sesion_id = sessionStorage.getItem("sesion_id");

        if (usuario || sesion_id) {
            window.location = "./";
        }
    },
    establecerBotones() {
        $(".btn-spinner").hide();
        $(".btn-spinner-alt").hide();
    }
}

const EVENTOS = {
    init() {
        this.registrarUsuario();
    },
    registrarUsuario() {
        $("#form_registrar_usuario").on("click", "#btn_registrar_usuario", async (evento) => {
            const nombres = ($("#form_registrar_usuario [name=nombres]").val() || "").trim();
            const apellidos = ($("#form_registrar_usuario [name=apellidos]").val() || "").trim();
            const correo = ($("#form_registrar_usuario [name=correo]").val() || "").trim();
            const cargo = $("#form_registrar_usuario [name=cargo]").val();
            const usuario = ($("#form_registrar_usuario [name=usuario]").val() || "").trim();
            const contrasenia = $("#form_registrar_usuario [name=contrasenia]").val();
            const contrasenia_repetir = $("#form_registrar_usuario [name=contrasenia_repetir]").val();

            if (!nombres) {
                Swal.fire({
                    icon: "warning",
                    title: "Campo obligatorio",
                    text: "Ingrese sus nombres!",
                    confirmButtonText: "Aceptar",
                    confirmButtonColor: "rgb(15, 45, 245)"
                });

                return false;
            }

            if (nombres.length < 3) {
                Swal.fire({
                    icon: "warning",
                    title: "Campo inválido",
                    text: "Ingrese un nombre válido!",
                    confirmButtonText: "Aceptar",
                    confirmButtonColor: "rgb(15, 45, 245)"
                });

                return false;
            }

            if (!apellidos) {
                Swal.fire({
                    icon: "warning",
                    title: "Campo obligatorio",
                    text: "Ingrese sus apellidos!",
                    confirmButtonText: "Aceptar",
                    confirmButtonColor: "rgb(15, 45, 245)"
                });

                return false;
            }

            if (apellidos.length < 2) {
                Swal.fire({
                    icon: "warning",
                    title: "Campo inválido",
                    text: "Ingrese un apellido válido!",
                    confirmButtonText: "Aceptar",
                    confirmButtonColor: "rgb(15, 45, 245)"
                });

                return false;
            }

            if (!correo) {
                Swal.fire({
                    icon: "warning",
                    title: "Campo obligatorio",
                    text: "Ingrese un correo!",
                    confirmButtonText: "Aceptar",
                    confirmButtonColor: "rgb(15, 45, 245)"
                });

                return false;
            }

            if (!cargo) {
                Swal.fire({
                    icon: "warning",
                    title: "Campo obligatorio",
                    text: "Seleccione un cargo!",
                    confirmButtonText: "Aceptar",
                    confirmButtonColor: "rgb(15, 45, 245)"
                });

                return false;
            }

            if (!usuario) {
                Swal.fire({
                    icon: "warning",
                    title: "Campo obligatorio",
                    text: "Ingrese un usuario!",
                    confirmButtonText: "Aceptar",
                    confirmButtonColor: "rgb(15, 45, 245)"
                });

                return false;
            }

            if (usuario.length < 6) {
                Swal.fire({
                    icon: "warning",
                    title: "Campo longitud",
                    text: "El nombre de usuario debe tener 6 caracteres como mínimo!",
                    confirmButtonText: "Aceptar",
                    confirmButtonColor: "rgb(15, 45, 245)"
                });

                return false;
            }

            if (!contrasenia) {
                Swal.fire({
                    icon: "warning",
                    title: "Campo obligatorio",
                    text: "Ingrese una contraseña!",
                    confirmButtonText: "Aceptar",
                    confirmButtonColor: "rgb(15, 45, 245)"
                });

                return false;
            }

            if (contrasenia.length < 8) {
                Swal.fire({
                    icon: "warning",
                    title: "Campo longitud",
                    text: "La contraseña debe tener 8 caracteres como mínimo!",
                    confirmButtonText: "Aceptar",
                    confirmButtonColor: "rgb(15, 45, 245)"
                });

                return false;
            }

            if (!contrasenia_repetir) {
                Swal.fire({
                    icon: "warning",
                    title: "Campo obligatorio",
                    text: "Ingrese la repetición de contraseña!",
                    confirmButtonText: "Aceptar",
                    confirmButtonColor: "rgb(15, 45, 245)"
                });

                return false;
            }

            if (contrasenia !== contrasenia_repetir) {
                Swal.fire({
                    icon: "warning",
                    title: "Campos distintos",
                    text: "La contraseña y su repetición no coinciden!",
                    confirmButtonText: "Aceptar",
                    confirmButtonColor: "rgb(15, 45, 245)"
                });

                return false;
            }

            $("#btn_registrar_usuario > .btn-label").hide();
            $("#btn_registrar_usuario > .btn-spinner").show();
            $("#btn_registrar_usuario > .btn-spinner-alt").show();
            $("#btn_registrar_usuario").prop("disabled", true);

            const response = await fetch(
                `${VARIABLES.api_url}?accion=registrarUsuario`,
                {
                    body: JSON.stringify({
                        nombres,
                        apellidos,
                        correo,
                        cargo,
                        usuario,
                        contrasenia
                    }),
                    method: "POST"
                });
            const { status, message, data } = await response.json();

            $("#btn_registrar_usuario > .btn-label").show();
            $("#btn_registrar_usuario > .btn-spinner").hide();
            $("#btn_registrar_usuario > .btn-spinner-alt").hide();
            $("#btn_registrar_usuario").prop("disabled", false);

            if (!status) {
                Swal.fire({
                    icon: "error",
                    title: "Registrarse",
                    text: message,
                    confirmButtonText: "Aceptar",
                    confirmButtonColor: "rgb(15, 45, 245)"
                });

                return false;
            }

            let timerInterval;

            Swal.fire({
                icon: "success",
                title: 'Registrarse',
                html: `<p class="mb-5">Se registró correctamente!</p>
                       <p>Se redireccionará al login en <span class="interval"></span> segundos.</p>`,
                timer: 10000,
                didOpen: () => {
                    const content = Swal.getHtmlContainer();
                    const $ = content.querySelector.bind(content);

                    Swal.showLoading();

                    timerInterval = setInterval(() => {
                        Swal.getHtmlContainer().querySelector(".interval").textContent = (Swal.getTimerLeft() / 1000).toFixed(0)
                    }, 100);
                },
                willClose: () => {
                    clearInterval(timerInterval);

                    window.location = "./login.html";
                }
            });
        });
    }
};



(() => {
    INICIAR_COMPONENTES.init();
    EVENTOS.init();
})();
