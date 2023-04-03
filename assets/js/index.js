//Inicio App
(()=>{
    const baseUrl = 'https://www.datos.gov.co/resource/gt2j-8ykr.json';
    const myChart = document.getElementById('myChart').getContext('2d');
    const tbCasos = document.getElementById('tbCasos');

    const loadData = (()=>{
            fetch(baseUrl,
            {
                method: "GET"
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data)

                    const totalPersonasPorDepartamento = data.reduce((acumulador,item) =>{
                        const departamento = item.departamento_nom;
                        if (!acumulador[departamento]) {
                            acumulador[departamento] = { departamento, total: 0 };
                        }
                        acumulador[departamento].total++;
                        return acumulador;
                    },{});

                    const resultado ={
                        status:"ok",
                        data: Object.values(totalPersonasPorDepartamento)
                    };
                    console.log(resultado);

                    let labels_for_chart = resultado.data.map((item)=>{
                        return item.departamento;
                    });

                    let data_for_chart = resultado.data.map((item)=>{
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

                    //Agregando datos a la tabla
                    tbCasos.innerHTML = "";
                    let id = 1;
                    for (const item of resultado.data) {
                        let tr =`
                        <tr>
                            <td>${id}</td>
                            <td>${item.departamento}</td>
                            <td>${item.total}</td>
                        </tr>`;
                        tbCasos.innerHTML += tr;
                        id = id + 1;
                    }
                })
                .catch(error => console.log(error))
        })

    loadData()
})()