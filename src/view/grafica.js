let myChart; // Variable global para almacenar el gráfico

async function fetchData(type) {
    try {
        const response = await fetch(`/data?type=${type}`);
        const data = await response.json();
        updateChart(data.labels, data.times, type);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function updateChart(labels, times, type) {
    const ctx = document.getElementById('myChart').getContext('2d');

    // Destruir el gráfico existente si ya existe
    if (myChart) {
        myChart.destroy();
    }

    // Crear un nuevo gráfico
    myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: `Tiempos de ${type}`,
                data: times,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
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
}