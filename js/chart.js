const googleDriveFileURL = 'https://bitbucket.org/monitor_economica_dire/data/raw/e587cf10d8a887e5460140c6c0913ab5ae69a7f6/cotizaciones';

fetch(googleDriveFileURL)
    .then(response => response.json())
    .then(data => {
        // Formatear fechas y revertir orden
        const formattedData = data.map(item => ({
            ...item,
            fecha: item.fecha.split('/').reverse().join('-')
        })).reverse();

        // Extraer datos para el gráfico
        const fechas = formattedData.map(item => item.fecha);
        const dolarBlue = formattedData.map(item => item.blue);
        const dolarOficial = formattedData.map(item => item.oficial);
        const dolarMEP = formattedData.map(item => item.mep);

        var options = {
            series: [
                {
                    name: "Dólar Blue",
                    data: dolarBlue
                },
                {
                    name: "Dólar Oficial",
                    data: dolarOficial
                },
                {
                    name: 'Dólar MEP',
                    data: dolarMEP
                }
            ],
            chart: {
                height: 350,
                type: 'line',
                zoom: {
                    enabled: false
                },
                foreColor: '#FFFFFF' // Color blanco para los valores de los ejes
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                width: [5, 7, 5],
                curve: 'straight',
                dashArray: [0, 8, 5]
            },
            title: {
                text: 'Cotización del Dólar',
                align: 'left'
            },
            legend: {
                tooltipHoverFormatter: function(val, opts) {
                    return val + ' - <strong>' + opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex] + '</strong>'
                }
            },
            markers: {
                size: 0,
                hover: {
                    sizeOffset: 6
                }
            },
            xaxis: {
                categories: fechas,
            },
            tooltip: {
                y: [
                    {
                        title: {
                            formatter: function (val) {
                                return val;
                            }
                        }
                    },
                    {
                        title: {
                            formatter: function (val) {
                                return val;
                            }
                        }
                    },
                    {
                        title: {
                            formatter: function (val) {
                                return val;
                            }
                        }
                    }
                ]
            },
            grid: {
                borderColor: '#f1f1f1',
            }
        };

        var chart = new ApexCharts(document.querySelector("#chart"), options);
        chart.render();
    });