//Inicio App
import { leerDatosApi } from './Api.js';
import { graficar } from './datosGrafica.js';
import { tablaDatos } from './tablaDatos.js';



(() => {
    const baseUrl = 'https://www.datos.gov.co/resource/gt2j-8ykr.json';
    const CargaDatos = document.getElementById('CargaDatos');
    const myChart = document.getElementById('myChart').getContext('2d');
    const myPie = document.getElementById('myPie').getContext('2d');
    const tbCasos = document.getElementById('tbCasos');
    const tbContagios = document.getElementById('tbContagios');
    const fechaReporte = document.getElementById('fechaReporte');
    const changeThemeBtn = document.getElementById("changeThemeBtn");

    const loadData = (() => {
        loadTheme();
        const getData = async ()=>{
            try{
                
                const result = await new Promise((resolve)=>{
                    setTimeout(()=>{
                        const datos = leerDatosApi(baseUrl);
                        resolve(datos)
                        CargaDatos.innerHTML='';
                    }
                    ,5000)
                    CargaDatos.innerHTML='<h2 class="text-center" >Cargando Datos...</h2>';
                })
                return result
            }
            catch(error){
                console.error(error)
            }
        }

        getData().then(data =>{
            const totalPersonasPorDepartamento = data.reduce((acumulador, item) => {
                const criterio = item.departamento_nom;
                if (!acumulador[criterio]) {
                    acumulador[criterio] = { criterio, total: 0 };
                }
                acumulador[criterio].total++;
                return acumulador;
            }, {});

            const datos1 = graficar(totalPersonasPorDepartamento);

            let labels_for_chart = datos1.data.map((item) => {
                return item.criterio;
            });

            let data_for_chart = datos1.data.map((item) => {
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
            tablaDatos(tbCasos,datos1);

            //Segundo gráfico Pie -> Por tipo de contagio

            const tipoContagio = data.reduce((acumulador,item) => {
                const criterio = item.fuente_tipo_contagio;
                if (!acumulador[criterio]) {
                    acumulador[criterio] = { criterio, total: 0 };
                }
                acumulador[criterio].total++;
                return acumulador
            }, {});

            const datos = graficar(tipoContagio);

            let labels_for_pie = datos.data.map((item) => {
                return item.criterio;
            });

            let data_for_pie = datos.data.map((item) => {
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

            tablaDatos(tbContagios,datos)
            console.log("Uyy! Algo salio mal")
        })
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
})();