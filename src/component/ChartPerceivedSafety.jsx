import React, { useEffect, useState, useRef } from 'react';
import Chart from 'chart.js/auto';
import '../css/borough.css';

function ChartPerceivedSafety({ guNameValue }) {
    const [clickedYear, setClickedYear] = useState(2023);
    const safetyChartRef = useRef(null);

    useEffect(() => {
        fetchData(guNameValue);

        document.querySelectorAll('.btn').forEach(button => {
            button.addEventListener('click', handleClick);
        });

        return () => {
            document.querySelectorAll('.btn').forEach(button => {
                button.removeEventListener('click', handleClick);
            });
        };
    }, [guNameValue]);

    useEffect(() => {
        if (clickedYear) {
            fetchPerceivedSafety(clickedYear);
        }
    }, [clickedYear]);

    const fetchData = (guNameValue) => {
        fetch('/newseekers/borough/getArRate?guNameValue=' + guNameValue)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok' + response.statusText);
                }
                return response.json();
            })
            .then(data => {
                if (safetyChartRef.current) {
                    safetyChartRef.current.destroy();
                }
                console.log(data);
                arRateChart(data);
            })
            .catch(error => {
                console.error("Fetch error: " + error);
            });
    }

    const handleClick = (event) => {
        const year = event.target.id;
        setClickedYear(year);
    }

    const fetchPerceivedSafety = (year) => {
        fetch(`/newseekers/borough/getPerceivedSafety?year=y${year}&guNameValue=${guNameValue}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok' + response.statusText);
                }
                return response.json();
            })
            .then(data => {
                document.getElementById("chart_resultMent3").innerHTML = `<p>${year}년도 ${data}위</p>`;
            })
            .catch(error => {
                console.error("Fetch error: " + error);
            });
    }

    const arRateChart = (data) => {
        const ctx = document.getElementById('safetyChart').getContext('2d');
        const arRateData = data.map(item => item.ar_rate);
        safetyChartRef.current = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['2004', '2007', '2010', '2013', '2015', '2018', '2022'],
                datasets: [{
                    label: '검거 비율',
                    data: arRateData,
                    fill: false,
                    borderColor: 'rgb(75, 192, 192)',
                    tension: 0.1
                }]
            },
            options: {
                maintainAspectRatio: false
            }
        });
    }

    return (
        <div id="screen2" className="container-fluid">
            <div id="screen2_container" className="row">
                <span id="safety_rank"> 우리 동네의 체감안전도 알아보기 </span>
                <div id="screen2_chartBox" className="col-md-12 col-lg-7">
                    <canvas id="safetyChart"></canvas>
                </div>
                <div id="chart_result" className="col-md-12 col-lg-4">
                    <div className="btn-group">
                        <button type="button" className="btn btn-secondary" id="2019">2019</button>
                        <button type="button" className="btn btn-secondary" id="2020">2020</button>
                        <button type="button" className="btn btn-secondary" id="2021">2021</button>
                        <button type="button" className="btn btn-secondary" id="2022">2022</button>
                        <button type="button" className="btn btn-secondary" id="2023">2023</button>
                    </div>
                    <div id="chart_resultMent">
                        <div id="chart_resultMent1" className="result_Ment">
                            <p>체감 안전도</p>
                        </div>
                        <div id="chart_resultMent2">
                            <p>25개구 중</p>
                            <span id="chart_resultMent3">1위</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ChartPerceivedSafety;
