const VARIABLES = {
    api_url: "https://script.google.com/macros/s/AKfycbzOkYmtHYMSy8IgW1HVLZt7WxDlFVu5YApuLrH0IoL4rqnAlkEfc_gGTzx2v63hwACT/exec"
};

const INICIAR_COMPONENTES = {
    init() {
        this.cargarPagina();
        this.establecerBotones();
    },
    async cargarPagina() {
        const usuario = sessionStorage.getItem("usuario");
        const sesion_id = sessionStorage.getItem("sesion_id");

        if (usuario || sesion_id) {
            window.location = "./";
        }

        const url = new URL(window.location.href);
        const request_id = url.searchParams.get("request_id");

        if (!request_id) {
            window.location = "./";
        }

        const response = await fetch(
            `${VARIABLES.api_url}?accion=verificarRequest`,
            {
                body: JSON.stringify({
                    request_id
                }),
                method: "POST"
            });
        const { status, message } = await response.json();

        if (!status) {
            Swal.fire({
                icon: "error",
                title: "Estado del enlace",
                html: `<p class="mb-5">${message}</p>
                       <p><a href="./login.html">Regresar al login</a></p>`,
                confirmButtonText: "Aceptar",
                confirmButtonColor: "rgb(15, 45, 245)"
            });

            return false;
        }

        $("#form_restablecer_contrasenia [name=request_id]").val(request_id);
        $("#container_reset").removeClass("d-none");
    },
    establecerBotones() {
        $(".btn-spinner").hide();
        $(".btn-spinner-alt").hide();
    }
}

const EVENTOS = {
    init() {
        this.restablecerContrasenia();
    },
    restablecerContrasenia() {
        $("#form_restablecer_contrasenia").on("click", "#btn_restablecer_contrasenia", async (evento) => {
            const request_id = ($("#form_restablecer_contrasenia [name=request_id]").val() || "").trim();
            const contrasenia = $("#form_restablecer_contrasenia [name=contrasenia]").val();
            const contrasenia_repetir = $("#form_restablecer_contrasenia [name=contrasenia_repetir]").val();

            if (!request_id) {
                Swal.fire({
                    icon: "warning",
                    title: "Campo obligatorio",
                    text: "No hay un id de request para identificar!",
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

            $("#btn_restablecer_contrasenia > .btn-label").hide();
            $("#btn_restablecer_contrasenia > .btn-spinner").show();
            $("#btn_restablecer_contrasenia > .btn-spinner-alt").show();
            $("#btn_restablecer_contrasenia").prop("disabled", true);

            const response = await fetch(
                `${VARIABLES.api_url}?accion=restablecerContrasenia`,
                {
                    body: JSON.stringify({
                        request_id,
                        contrasenia
                    }),
                    method: "POST"
                });
            const { status, message } = await response.json();

            $("#btn_restablecer_contrasenia > .btn-label").show();
            $("#btn_restablecer_contrasenia > .btn-spinner").hide();
            $("#btn_restablecer_contrasenia > .btn-spinner-alt").hide();
            $("#btn_restablecer_contrasenia").prop("disabled", false);

            if (!status) {
                Swal.fire({
                    icon: "error",
                    title: "Restablecer contraseña",
                    text: message,
                    confirmButtonText: "Aceptar",
                    confirmButtonColor: "rgb(15, 45, 245)"
                });

                return false;
            }

            let timerInterval;

            Swal.fire({
                icon: "success",
                title: "Restablecer contraseña",
                html: `<p class="mb-5">Se restableció la contraseña correctamente!</p>
                       <p>Se redireccionará al login en <span class="interval"></span> segundos.</p>`,
                timer: 10000,
                didOpen: () => {
                    const content = Swal.getHtmlContainer();
                    const $ = content.querySelector.bind(content);

                    Swal.showLoading();

                    function toggleButtons() {
                        stop.disabled = !Swal.isTimerRunning();
                        resume.disabled = Swal.isTimerRunning();
                    }

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
