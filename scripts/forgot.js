const VARIABLES = {
    api_url: "https://script.google.com/macros/s/AKfycbyBb2hfMmlrkv4qcXSbTvVzkS-pCByimoGb13Jwb6UG1YSJFAy2JKwv40ugo0_POkCKbw/exec"
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
        this.enviarEnlace();
    },
    enviarEnlace() {
        $("#form_enviar_enlace").on("click", "#btn_enviar_enlace", async (evento) => {
            const correo = ($("#form_enviar_enlace [name=correo]").val() || "").trim();

            if (!correo) {
                Swal.fire({
                    icon: "warning",
                    title: "Campo obligatorio",
                    text: "Ingrese su correo!",
                    confirmButtonText: "Aceptar",
                    confirmButtonColor: "rgb(15, 45, 245)"
                });

                return false;
            }

            $("#btn_enviar_enlace > .btn-label").hide();
            $("#btn_enviar_enlace > .btn-spinner").show();
            $("#btn_enviar_enlace > .btn-spinner-alt").show();
            $("#btn_enviar_enlace").prop("disabled", true);

            const response = await fetch(
                `${VARIABLES.api_url}?accion=enviarEnlace`,
                {
                    body: JSON.stringify({
                        correo
                    }),
                    method: "POST"
                });
            const { status, message, data } = await response.json();

            $("#btn_enviar_enlace > .btn-label").show();
            $("#btn_enviar_enlace > .btn-spinner").hide();
            $("#btn_enviar_enlace > .btn-spinner-alt").hide();
            $("#btn_enviar_enlace").prop("disabled", false);

            if (!status) {
                Swal.fire({
                    icon: "error",
                    title: "Enviar enlace",
                    text: message,
                    confirmButtonText: "Aceptar",
                    confirmButtonColor: "rgb(15, 45, 245)"
                });

                return false;
            }

            let timerInterval

            Swal.fire({
                icon: "success",
                title: 'Enviar enlace',
                html: `<p class="mb-3">Se envió el enlace a su correo!</p>
                       <p class="mb-5">Revisa tu bandeja de entrada (o tu carpeta de spam), y realiza los pasos que se indican.</p>
                       <p>Se redireccionará al login en <span class="interval"></span> segundos.</p>`,
                timer: 20000,
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
