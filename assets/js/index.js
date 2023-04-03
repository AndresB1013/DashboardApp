//Inicio App
// import { tablaDatos } from "./tablaDatos.js";

(() => {
    const baseUrl = 'https://www.datos.gov.co/resource/gt2j-8ykr.json';
    const myChart = document.getElementById('myChart').getContext('2d');
    const myPie = document.getElementById('myPie').getContext('2d');
    const tbCasos = document.getElementById('tbCasos');
    const tbContagios = document.getElementById('tbContagios');
    const fechaReporte = document.getElementById('fechaReporte');
    const changeThemeBtn = document.getElementById("changeThemeBtn");

    const loadData = (() => {
        loadTheme();
        fetch(baseUrl,
            {
                method: "GET"
            })
            .then(response => response.json())
            .then(data => {
                console.log(data)

                const totalPersonasPorDepartamento = data.reduce((acumulador, item) => {
                    const departamento = item.departamento_nom;
                    if (!acumulador[departamento]) {
                        acumulador[departamento] = { departamento, total: 0 };
                    }
                    acumulador[departamento].total++;
                    return acumulador;
                }, {});

                const resultado = {
                    status: "ok",
                    data: Object.values(totalPersonasPorDepartamento)
                };
                console.log(resultado);

                let labels_for_chart = resultado.data.map((item) => {
                    return item.departamento;
                });

                let data_for_chart = resultado.data.map((item) => {
                    return item.total;
                });

                const grafica = new Chart(myChart, {
                    type: 'bar',
                    data: {
                        labels: labels_for_chart,
                        datasets: [{
                            label: '# Total de Casos',
                            data: data_for_chart,
                            backgroundColor: '#00FF9E',
                            borderColor: '#00FF9E',
                        }]
                    },
                    options: {
                        scales: {
                            y: {
                                beginAtZero: true
                            }
                        }
                    }
                });

                // Agregando datos a la tabla
                tbCasos.innerHTML = "";
                let id = 1;
                for (const item of resultado.data) {
                    let tr = `
                    <tr>
                        <td>${id}</td>
                        <td>${item.departamento}</td>
                        <td>${item.total}</td>
                    </tr>`;
                    tbCasos.innerHTML += tr;
                    id = id + 1;
                }

                //Segundo gráfico Pie -> Por tipo de contagio

                const tipoContagio = data.reduce((acumulador, item) => {
                    const contagio = item.fuente_tipo_contagio;
                    if (!acumulador[contagio]) {
                        acumulador[contagio] = { contagio, total: 0 };
                    }
                    acumulador[contagio].total++;
                    return acumulador;
                }, {});

                const pieContagios = {
                    status: "ok",
                    data: Object.values(tipoContagio)
                };
                console.log(pieContagios);
                let labels_for_pie = pieContagios.data.map((item) => {
                    return item.contagio;
                });

                let data_for_pie = pieContagios.data.map((item) => {
                    return item.total;
                });
                const graficaPie = new Chart(myPie, {
                    type: 'doughnut',
                    data: {
                        labels: labels_for_pie,
                        datasets: [
                            {
                                label: 'Dataset 1',
                                data: data_for_pie,
                                backgroundColor: ['#00FF9E', '#900C3F']
                            }
                        ]
                    },
                    options: {
                        responsive: true,
                        plugins: {
                            legend: {
                                position: 'top',
                            },
                        }
                    },
                })

                tbContagios.innerHTML = "";
                let num = 1;
                for (const item of pieContagios.data) {
                    let tr = `
                    <tr>
                        <td>${num}</td>
                        <td>${item.contagio}</td>
                        <td>${item.total}</td>
                    </tr>`;
                    tbContagios.innerHTML += tr;
                    num = num + 1;
                };
            })
            .catch(error => console.log(error))
    })
    fechaReporte.innerText = "03/04/2021";
    function loadTheme() {
        const theme = localStorage.getItem("theme") || "light";
        document.body.dataset.bsTheme = theme;
        if (theme == "dark") {
            changeThemeBtn.textContent = "Light Mode";
        } else {
            changeThemeBtn.textContent = "Dark Mode";
        }
    }

    changeThemeBtn.addEventListener("click", function () {
        let body = document.body;
        if (body.dataset.bsTheme == "dark") {
            body.dataset.bsTheme = "light";
            changeThemeBtn.textContent = "Dark Mode";
            localStorage.setItem("theme", "light");
        } else {
            body.dataset.bsTheme = "dark";
            changeThemeBtn.textContent = "Light Mode";
            localStorage.setItem("theme", "dark");
        }
    });
    loadData();
})()