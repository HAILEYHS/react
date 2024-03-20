import React, { useEffect, useState } from 'react';
import Chart from 'chart.js/auto';
import '../css/borough.css';

function ChartSecufacil({ guNameValue }) {
    const [chartData, setChartData] = useState(null);
    // const [charts, setCharts] = useState({
    //     chart1: null,
    //     chart2: null,
    //     chart3: null
    // });

    useEffect(() => {
        // fetchData('getChartData', guNameValue);
    }, [guNameValue]);

    useEffect(() => {
        if (chartData) {
            drawCharts(chartData);
        }
    }, [chartData]);

    // const fetchData = (url, guNameValue) => {
    //     fetch(url + '?guNameValue=' + guNameValue.guNameValue)
    //         .then(response => {
    //             if (!response.ok) {
    //                 throw new Error('Network response was not ok' + response.statusText);
    //             }
    //             return response.json();
    //         })
    //         .then(data => {
    //             setChartData(data);
    //         })
    //         .catch(error => {
    //             console.error("Fetch error: " + error);
    //         });

    // };

    const drawCharts = (data) => {
        const ctx1 = document.getElementById('myChart1')?.getContext('2d');
        const ctx2 = document.getElementById('myChart2')?.getContext('2d');
        const ctx3 = document.getElementById('myChart3')?.getContext('2d');

        if (ctx1 && ctx2 && ctx3) {
            const newChart1 = new Chart(ctx1, {
                type: 'bar',
                data: {
                    labels: ['평균', guNameValue],
                    datasets: [{
                        label: 'CCTV 수',
                        data: [data.avg_cctv, data.cctv],
                        backgroundColor: ['#43c2c2', '#4eddad']
                    }]
                },
                options: {
                    plugins: {
                        legend: {
                            display: false,
                        }
                    },
                    maintainAspectRatio: false
                }
            });

            const newChart2 = new Chart(ctx2, {
                type: 'bar',
                data: {
                    labels: ['평균', guNameValue],
                    datasets: [{
                        label: '보안등 수',
                        data: [data.avg_lights, data.lights],
                        backgroundColor: ['#43c2c2', '#4eddad']
                    }]
                },
                options: {
                    plugins: {
                        legend: {
                            display: false,
                        }
                    },
                    maintainAspectRatio: false
                }
            });

            const newChart3 = new Chart(ctx3, {
                type: 'bar',
                data: {
                    labels: ['평균', guNameValue],
                    datasets: [{
                        label: '경찰관서 수',
                        data: [data.avg_policestation, data.policeStation],
                        backgroundColor: ['#43c2c2', '#4eddad']
                    }]
                },
                options: {
                    plugins: {
                        legend: {
                            display: false,
                        }
                    },
                    maintainAspectRatio: false
                }
            });

            // setCharts({
            //     chart1: newChart1,
            //     chart2: newChart2,
            //     chart3: newChart3
            // });
        }
    };

    return (
        <div id="screen1_chart" className="container-fluid">
            <div id="screen1_chartBox" className="row">
                <span id="security">그래프로 보는 우리동네 치안시설</span>

                <div id="cctv" className="security_box col-md-12 col-lg-3">
                    <p>CCTV</p>
                    <div>
                        <canvas id="myChart1"></canvas>
                    </div>
                </div>
                <div id="light" className="security_box col-md-12 col-lg-3">
                    <p>보안등</p>
                    <div>
                        <canvas id="myChart2"></canvas>
                    </div>
                </div>
                <div id="police" className="security_box col-md-12 col-lg-3">
                    <p>경찰관서 수</p>
                    <div>
                        <canvas id="myChart3"></canvas>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ChartSecufacil;
