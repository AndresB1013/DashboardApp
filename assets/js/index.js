//Inicio App
(()=>{
    const baseUrl = 'https://www.datos.gov.co/resource/gt2j-8ykr.json';
    const myChart = document.getElementById('myChart').getContext('2d');

    const grafica = new Chart(myChart, {
        type: 'bar',
        data: {
            labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
            datasets: [{
                label: '# of Votes',
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: [
                    'darkblue'
                ],
                borderColor: [
                    'darkblue'
                ],
                borderWidth: 1
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

    const loadData = (()=>{
            fetch(baseUrl,
            {
                method: "GET"
            })
                .then(response => response.json())
                .then(data => console.log(data))
                .catch(error => console.log(error))
        })

        loadData()
})()