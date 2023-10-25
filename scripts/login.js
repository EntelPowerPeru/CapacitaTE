const VARIABLES = {
    api_url: "https://script.google.com/macros/s/AKfycbzOkYmtHYMSy8IgW1HVLZt7WxDlFVu5YApuLrH0IoL4rqnAlkEfc_gGTzx2v63hwACT/exec"
};

const INICIAR_COMPONENTES = {
    init() {
        this.cargarPagina();
        this.recordarmeActivado();
        this.establecerBotones();
    },
    cargarPagina() {
        const usuario = sessionStorage.getItem("usuario");
        const sesion_id = sessionStorage.getItem("sesion_id");

        if (usuario || sesion_id) {
            window.location = "./";
        }
    },
    recordarmeActivado() {
        const usuario = localStorage.getItem("usuario");
        const contrasenia = localStorage.getItem("contrasenia");
        const recordarme = localStorage.getItem("recordarme");

        if (usuario && contrasenia && recordarme) {
            $("#form_iniciar_sesion [name=usuario]").val(usuario);
            $("#form_iniciar_sesion [name=contrasenia]").val(contrasenia);
            $("#form_iniciar_sesion [name=recordarme]").prop("checked", true);
        }
    },
    establecerBotones() {
        $(".btn-spinner").hide();
        $(".btn-spinner-alt").hide();
    }
}

const EVENTOS = {
    init() {
        this.iniciarSesion();
    },
    iniciarSesion() {
        $("#form_iniciar_sesion").on("click", "#btn_iniciar_sesion", async (evento) => {
            const usuario = $("#form_iniciar_sesion [name=usuario]").val();
            const contrasenia = $("#form_iniciar_sesion [name=contrasenia]").val();
            const recordarme = $("#form_iniciar_sesion [name=recordarme]").prop("checked")

            const sesion_id = crypto.randomUUID();

            if (!usuario) {
                Swal.fire({
                    icon: "warning",
                    title: "Campo obligatorio",
                    text: "Ingrese un usuario!"
                });

                return false;
            }

            if (!contrasenia) {
                Swal.fire({
                    icon: "warning",
                    title: "Campo obligatorio",
                    text: "Ingrese una contraseña!"
                });

                return false;
            }

            $("#btn_iniciar_sesion > .btn-label").hide();
            $("#btn_iniciar_sesion > .btn-spinner").show();
            $("#btn_iniciar_sesion > .btn-spinner-alt").show();
            $("#btn_iniciar_sesion").prop("disabled", true);

            const response = await fetch(
                `${VARIABLES.api_url}?accion=login`,
                {
                    body: JSON.stringify({
                        usuario,
                        contrasenia,
                        sesion_id
                    }),
                    method: "POST"
                });
            const { status, message, data } = await response.json();

            $("#btn_iniciar_sesion > .btn-label").show();
            $("#btn_iniciar_sesion > .btn-spinner").hide();
            $("#btn_iniciar_sesion > .btn-spinner-alt").hide();
            $("#btn_iniciar_sesion").prop("disabled", false);

            if (!status) {
                Swal.fire({
                    icon: "error",
                    title: "Iniciar sesión",
                    text: message
                });

                return false;
            }

            if (recordarme) {
                localStorage.setItem("usuario", usuario);
                localStorage.setItem("contrasenia", contrasenia);
                localStorage.setItem("recordarme", recordarme);
            } else {
                localStorage.removeItem("usuario");
                localStorage.removeItem("contrasenia");
                localStorage.removeItem("recordarme");
            }

            sessionStorage.setItem("nombres", data.nombres);
            sessionStorage.setItem("usuario", data.usuario);
            sessionStorage.setItem("sesion_id", data.sesion_id);

            window.location = "./";
        });
    }
};



(() => {
    INICIAR_COMPONENTES.init();
    EVENTOS.init();
})();
