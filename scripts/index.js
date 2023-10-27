const VARIABLES = {
    api_url: "https://script.google.com/macros/s/AKfycbyBb2hfMmlrkv4qcXSbTvVzkS-pCByimoGb13Jwb6UG1YSJFAy2JKwv40ugo0_POkCKbw/exec"
};

const INICIAR_COMPONENTES = {
    init() {
        this.cargarPagina();
        this.llenarTabla();
        this.establecerTooltip();
    },
    cargarPagina() {
        const usuario = sessionStorage.getItem("usuario");
        const sesion_id = sessionStorage.getItem("sesion_id");

        if (!usuario || !sesion_id) {
            window.location = "./login.html";
        }
    },
    async llenarTabla() {
        $("#loader_tb_registro").show();

        $("#tb_registro").hide();

        const response = await fetch(`${VARIABLES.api_url}?accion=listar`,
            {
                body: JSON.stringify({
                    usuario: sessionStorage.getItem("usuario"),
                    sesion_id: sessionStorage.getItem("sesion_id")
                }),
                method: "POST"
            });
        const { status, message, type, data } = await response.json();
        let html = "";

        if (!status && type === "invalid_session") {
            sessionStorage.removeItem("nombres");
            sessionStorage.removeItem("usuario");
            sessionStorage.removeItem("sesion_id");

            window.location = "./login.html";
        }

        if (!status) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: message,
                confirmButtonText: "Aceptar",
                confirmButtonColor: "rgb(15, 45, 245)"
            });

            return false;
        }

        for (let objeto of data) {
            const { id, categoria, temas, enfoque, objetivo, socio_negocio, tienda, sugerir_modalidad } = objeto;

            html += `<tr>
                        <td>${categoria}</td>
                        <td>${temas}</td>
                        <td>${enfoque}</td>
                        <td>${objetivo}</td>
                        <td>${socio_negocio}</td>
                        <td>${tienda}</td>
                        <td>${sugerir_modalidad}</td>
                        <td>
                            <button type="button" data-id="${id}" data-bs-toggle="tooltip" data-bs-title="Eliminar" class="btn btn-link text-danger btn_eliminar_registro">
                                <i class="fa-solid fa-trash"></i>
                            </button>
                        </td>
                     </tr>`;
        }

        html += `<tr>
                    <td>
                        <select class="form-select categoria">
                            <option selected value="">Seleccione</option>
                            <option value="Comercial">Comercial</option>
                            <option value="Facturación y cobranzas">Facturación y cobranzas</option>
                            <option value="Habilidades blandas">Habilidades blandas</option>
                            <option value="Procesos">Procesos</option>
                            <option value="Regulatorio">Regulatorio</option>
                            <option value="Sistemas">Sistemas</option>
                            <option value="Técnica">Técnica</option>
                            <option value="Terminales">Terminales</option>
                        </select>
                    </td>
                    <td>
                        <input type="text" placeholder="Ingrese" class="form-control temas" />
                    </td>
                    <td>
                        <input type="text" placeholder="Ingrese" Enfoque class="form-control enfoque" />
                    </td>
                    <td>
                        <input type="text" placeholder="Ingrese" class="form-control objetivo" />
                    </td>
                    <td>
                        <select class="form-select socio_negocio">
                            <option selected value="">Seleccione</option>
                            <option value="VP Mobile">VP Mobile</option>
                            <option value="Teinnova">Teinnova</option>
                            <option value="Safe Solution">Safe Solution</option>
                            <option value="Gamael">Gamael</option>
                            <option value="Manpower">Manpower</option>
                            <option value="ROM">ROM</option>
                            <option value="Fanero">Fanero</option>
                            <option value="Heceb">Heceb</option>
                            <option value="Netcall">Netcall</option>
                        </select>
                    </td>
                    <td>
                        <select class="form-select tienda">
                            <option selected value="">Seleccione</option>
                            <option value="TPF MOYOBAMBA">TPF MOYOBAMBA</option>
                            <option value="TPF PUCALLPA">TPF PUCALLPA</option>
                            <option value="TPF TARAPOTO">TPF TARAPOTO</option>
                            <option value="TPF-TC PASCOSNJUAN">TPF-TC PASCOSNJUAN</option>
                            <option value="TPF HUANUCO">TPF HUANUCO</option>
                            <option value="TPF-TC TINGOMARIA">TPF-TC TINGOMARIA</option>
                            <option value="TPF IQUITOS">TPF IQUITOS</option>
                            <option value="TPF-TC UCAPORTILLO">TPF-TC UCAPORTILLO</option>
                            <option value="TPF PLAZA HUANUCO">TPF PLAZA HUANUCO</option>
                            <option value="TPF MAP IQUITOS">TPF MAP IQUITOS</option>
                            <option value="TPF CHORRILLOS">TPF CHORRILLOS</option>
                            <option value="TPF MALL DEL SUR">TPF MALL DEL SUR</option>
                            <option value="TPF SJ LURIGANCHO">TPF SJ LURIGANCHO</option>
                            <option value="TPF OPEN ANGAMOS">TPF OPEN ANGAMOS</option>
                            <option value="TPF BELLAVISTA">TPF BELLAVISTA</option>
                            <option value="TPF-TC VES1">TPF-TC VES1</option>
                            <option value="TPF COMAS">TPF COMAS</option>
                            <option value="TPF TRUJILLO LARCO">TPF TRUJILLO LARCO</option>
                            <option value="TPF CAJAMARCA">TPF CAJAMARCA</option>
                            <option value="TPF CAJAMARCA HEROES">TPF CAJAMARCA HEROES</option>
                            <option value="TPF-TC CHABAGUA">TPF-TC CHABAGUA</option>
                            <option value="TPF-TC HUAMACHUCO">TPF-TC HUAMACHUCO</option>
                            <option value="TPF-TC JAEN">TPF-TC JAEN</option>
                            <option value="TPF-TC PACASMAYO">TPF-TC PACASMAYO</option>
                            <option value="TPF-TC PAIJAN">TPF-TC PAIJAN</option>
                            <option value="TPF-TC TRUCHEPEN">TPF-TC TRUCHEPEN</option>
                            <option value="TPF-TC TRUJUNIN">TPF-TC TRUJUNIN</option>
                            <option value="TPF-TC TRUPORVENIR">TPF-TC TRUPORVENIR</option>
                            <option value="TPF CHACHAPOYAS">TPF CHACHAPOYAS</option>
                            <option value="TPF CHOTA">TPF CHOTA</option>
                            <option value="TPF CHICLAYO">TPF CHICLAYO</option>
                            <option value="TPF PIURA">TPF PIURA</option>
                            <option value="TPF MAP CHICLAYO">TPF MAP CHICLAYO</option>
                            <option value="TPF PAITA">TPF PAITA</option>
                            <option value="TPF PIURA GRAU">TPF PIURA GRAU</option>
                            <option value="TPF RP CHICLAYO">TPF RP CHICLAYO</option>
                            <option value="TPF TALARA">TPF TALARA</option>
                            <option value="TPF TRUJILLO">TPF TRUJILLO</option>
                            <option value="TPF TUMBES">TPF TUMBES</option>
                            <option value="TPF-TC PIUREAL">TPF-TC PIUREAL</option>
                            <option value="TPF-TC SULLANA1">TPF-TC SULLANA1</option>
                            <option value="TPF LAMBAYEQUE">TPF LAMBAYEQUE</option>
                            <option value="TPF ICA CENTRO">TPF ICA CENTRO</option>
                            <option value="TPF PLAZA NORTE2">TPF PLAZA NORTE2</option>
                            <option value="TPF PLAZA SAN MIGUEL">TPF PLAZA SAN MIGUEL</option>
                            <option value="TPF-TC CHINCHAITALIA">TPF-TC CHINCHAITALIA</option>
                            <option value="TPF-TC ICACAÑETE">TPF-TC ICACAÑETE</option>
                            <option value="TPF-TC ICANAZCA">TPF-TC ICANAZCA</option>
                            <option value="TPF-TC ICAPISCO">TPF-TC ICAPISCO</option>
                            <option value="TPF MEGA PLAZA">TPF MEGA PLAZA</option>
                            <option value="TPF CUSCO">TPF CUSCO</option>
                            <option value="TPF CUSCO SOL">TPF CUSCO SOL</option>
                            <option value="TPF-TC CUSTAMBO">TPF-TC CUSTAMBO</option>
                            <option value="TPF QUILLABAMBA">TPF QUILLABAMBA</option>
                            <option value="TPF TACNA">TPF TACNA</option>
                            <option value="TPF TACNA NORTE">TPF TACNA NORTE</option>
                            <option value="TPF ABANCAY">TPF ABANCAY</option>
                            <option value="TPF ANDAHUAYLAS">TPF ANDAHUAYLAS</option>
                            <option value="TPF JULIACA">TPF JULIACA</option>
                            <option value="TPF PUNO">TPF PUNO</option>
                            <option value="TPF ILO">TPF ILO</option>
                            <option value="TPF-TC MOQUEGUA">TPF-TC MOQUEGUA</option>
                            <option value="TPF LARCO">TPF LARCO</option>
                            <option value="TPF CERCADO">TPF CERCADO</option>
                            <option value="TPF SANTA ANITA">TPF SANTA ANITA</option>
                            <option value="TPF-TC SANTACLARA">TPF-TC SANTACLARA</option>
                            <option value="TPF PURUCHUCO">TPF PURUCHUCO</option>
                            <option value="TPF HUANCAYO">TPF HUANCAYO</option>
                            <option value="TPF HUANCAYO1">TPF HUANCAYO1</option>
                            <option value="TPF JOCKEY PLAZA">TPF JOCKEY PLAZA</option>
                            <option value="TPF MINKA">TPF MINKA</option>
                            <option value="TPF-TC JAUJA">TPF-TC JAUJA</option>
                            <option value="TPF-TC LAMERCED">TPF-TC LAMERCED</option>
                            <option value="TPF-TC OXAPAMPA">TPF-TC OXAPAMPA</option>
                            <option value="TPF-TC SATIPO">TPF-TC SATIPO</option>
                            <option value="TPF-TC TARMA">TPF-TC TARMA</option>
                            <option value="TPF-TC AYACASAMBLEA2">TPF-TC AYACASAMBLEA2</option>
                            <option value="TPF AYACUCHO1">TPF AYACUCHO1</option>
                            <option value="TPF RP SALAVERRY">TPF RP SALAVERRY</option>
                            <option value="TPF HUANCAVELICA">TPF HUANCAVELICA</option>
                            <option value="TPF AREQUIPA">TPF AREQUIPA</option>
                            <option value="TPF CHIMBOTE">TPF CHIMBOTE</option>
                            <option value="TPF REPUBLICA">TPF REPUBLICA</option>
                            <option value="TPF HUACHO28">TPF HUACHO28</option>
                            <option value="TPF JR DE LA UNION2">TPF JR DE LA UNION2</option>
                            <option value="TPF MAP AREQUIPA">TPF MAP AREQUIPA</option>
                            <option value="TPF PANORAMICO">TPF PANORAMICO</option>
                            <option value="TPF PUENTE PIEDRA">TPF PUENTE PIEDRA</option>
                            <option value="TPF-TC AQPCAMANA">TPF-TC AQPCAMANA</option>
                            <option value="TPF-TC AQPPEDREGAL">TPF-TC AQPPEDREGAL</option>
                            <option value="TPF-TC HUARAL">TPF-TC HUARAL</option>
                            <option value="TPF HUARAZ">TPF HUARAZ</option>
                            <option value="TPF CASMA">TPF CASMA</option>
                            <option value="TPF ALTIPLANO">TPF ALTIPLANO</option>
                            <option value="TPF JCHAVEZ2">TPF JCHAVEZ2</option>
                            <option value="TPF BARRANCA">TPF BARRANCA</option>
                        </select>
                    </td>
                    <td>
                        <select class="form-select sugerir_modalidad">
                            <option selected value="">Seleccione</option>
                            <option value="Elearning">Elearning</option>
                            <option value="Webinar">Webinar</option>
                            <option value="Presencial">Presencial</option>
                            <option value="Pieza gráfica">Pieza gráfica</option>
                        </select>
                    </td>
                    <td>
                        <button type="button" data-bs-toggle="tooltip" data-bs-title="Guardar" class="btn btn-link text-success btn_guardar_registro">
                            <i class="fa-solid fa-floppy-disk"></i>
                        </button>
                    </td>
                </tr>`;

        $("#tb_registro tbody").html(html);

        this.establecerTooltip();

        $("#loader_tb_registro").hide();

        $("#tb_registro").show();
    },
    establecerTooltip() {
        const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
        const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))
    }
};

const EVENTOS = {
    init() {
        this.guardarRegistro();
        this.eliminarRegistro();
        this.cerrarSesion();
    },
    guardarRegistro() {
        $("#tb_registro").on("click", ".btn_guardar_registro", async (evento) => {
            const id = crypto.randomUUID();
            const categoria = $(".categoria option:selected").val();
            const temas = $(".temas").val();
            const enfoque = $(".enfoque").val();
            const objetivo = $(".objetivo").val();
            const socio_negocio = $(".socio_negocio option:selected").val();
            const tienda = $(".tienda option:selected").val();
            const sugerir_modalidad = $(".sugerir_modalidad option:selected").val();

            if (!categoria) {
                Swal.fire({
                    icon: "warning",
                    title: "Campo obligatorio",
                    text: "Seleccione una categoria!"
                });

                return false;
            }

            if (!temas) {
                Swal.fire({
                    icon: "warning",
                    title: "Campo obligatorio",
                    text: "Ingrese unos temas!"
                });

                return false;
            }

            if (!enfoque) {
                Swal.fire({
                    icon: "warning",
                    title: "Campo obligatorio",
                    text: "Ingrese un enfoque!"
                });

                return false;
            }

            if (!objetivo) {
                Swal.fire({
                    icon: "warning",
                    title: "Campo obligatorio",
                    text: "Ingrese un objetivo!"
                });

                return false;
            }

            if (!socio_negocio) {
                Swal.fire({
                    icon: "warning",
                    title: "Campo obligatorio",
                    text: "Seleccione un socio de negocio!"
                });

                return false;
            }

            if (!tienda) {
                Swal.fire({
                    icon: "warning",
                    title: "Campo obligatorio",
                    text: "Seleccione una tienda!"
                });

                return false;
            }

            if (!sugerir_modalidad) {
                Swal.fire({
                    icon: "warning",
                    title: "Campo obligatorio",
                    text: "Seleccione una sugerencia de modalidad!"
                });

                return false;
            }

            Swal.fire({
                title: 'Registro',
                text: "¿Está seguro(a) de registrar la fila?",
                icon: 'question',
                showCancelButton: true,
                showLoaderOnConfirm: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: "Si",
                cancelButtonText: "No",
                preConfirm: async () => {
                    const response = await fetch(
                        `${VARIABLES.api_url}?accion=registrar`,
                        {
                            body: JSON.stringify({
                                usuario: sessionStorage.getItem("usuario"),
                                sesion_id: sessionStorage.getItem("sesion_id"),
                                id,
                                categoria,
                                temas,
                                enfoque,
                                objetivo,
                                socio_negocio,
                                tienda,
                                sugerir_modalidad
                            }),
                            method: "POST"
                        });
                    return await response.json();
                },
                allowOutsideClick: () => !Swal.isLoading()
            }).then((result) => {
                if (result.isConfirmed) {
                    const { status, type, message } = result.value;

                    if (!status && type === "invalid_session") {
                        sessionStorage.removeItem("nombres");
                        sessionStorage.removeItem("usuario");
                        sessionStorage.removeItem("sesion_id");

                        window.location = "./login.html";
                    }

                    if (!status) {
                        Swal.fire({
                            icon: "error",
                            title: "Registro",
                            text: message
                        });

                        return false;
                    }

                    Swal.fire({
                        icon: "success",
                        title: "Registro",
                        text: "Se registró correctamente!"
                    });

                    INICIAR_COMPONENTES.llenarTabla();
                }
            });
        });
    },
    eliminarRegistro() {
        $("#tb_registro").on("click", ".btn_eliminar_registro", async (evento) => {
            const id = $(evento.currentTarget).data("id");

            if (!id) {
                Swal.fire({
                    icon: "warning",
                    title: "Campo obligatorio",
                    text: "No hay un id para identificar al registro!",
                    confirmButtonText: "Aceptar",
                    confirmButtonColor: "rgb(15, 45, 245)"
                });

                return false;
            }

            Swal.fire({
                title: 'Eliminación',
                text: "¿Está seguro(a) de eliminar el registro?",
                icon: 'question',
                showCancelButton: true,
                showLoaderOnConfirm: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: "Si",
                cancelButtonText: "No",
                preConfirm: async () => {
                    const response = await fetch(
                        `${VARIABLES.api_url}?accion=eliminar`,
                        {
                            body: JSON.stringify({
                                usuario: sessionStorage.getItem("usuario"),
                                sesion_id: sessionStorage.getItem("sesion_id"),
                                id
                            }),
                            method: "POST"
                        });
                    return await response.json();
                },
                allowOutsideClick: () => !Swal.isLoading()
            }).then((result) => {
                if (result.isConfirmed) {
                    const { status, message, type } = result.value;

                    if (!status && type === "invalid_session") {
                        sessionStorage.removeItem("nombres");
                        sessionStorage.removeItem("usuario");
                        sessionStorage.removeItem("sesion_id");

                        window.location = "./login.html";
                    }

                    if (!status) {
                        Swal.fire({
                            icon: "error",
                            title: "Eliminación",
                            text: message,
                            confirmButtonText: "Aceptar",
                            confirmButtonColor: "rgb(15, 45, 245)"
                        });

                        return false;
                    }

                    Swal.fire({
                        icon: "success",
                        title: "Eliminación",
                        text: "Se eliminó correctamente!",
                        confirmButtonText: "Aceptar",
                        confirmButtonColor: "rgb(15, 45, 245)"
                    });

                    INICIAR_COMPONENTES.llenarTabla();
                }
            });
        });
    },
    cerrarSesion() {
        $("body").on("click", "#btn_cerrar_sesion", async (evento) => {
            sessionStorage.removeItem("nombres");
            sessionStorage.removeItem("usuario");
            sessionStorage.removeItem("sesion_id");

            window.location = "./login.html";
        });
    }
};

(() => {
    INICIAR_COMPONENTES.init();
    EVENTOS.init();
})();