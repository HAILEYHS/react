import React, { useState, useEffect } from 'react';
import '../css/borough.css';
import ChartSelector from './ChartSelector';
import ChartSecufacil from './ChartSecufacil';
import ChartPerceivedSafety from './ChartPerceivedSafety';
import PoliceStationTable from './PoliceStationTable';

function ChartComponent() {
    const guList = ['송파구', '영등포구', '성동구', '노원구', '강북구'];
    const [guNameValue, setGuNameValue] = useState('강남구');
    const [chartSelectorData, setChartSelectorData] = useState(null);

    const handleSelectChange = (event) => {
        setGuNameValue(event.target.value);
    };

    useEffect(() => {
        if (guNameValue) {
            fetchDataAndProcess('/newseekers/borough/getPopulation?guNameValue=', guNameValue, populationData);

        }
    }, [guNameValue]);

    const fetchDataAndProcess = (url, guNameValue, callback) => {
        console.log('Fetching data from: ', url + guNameValue);
        try {
            fetch(url + guNameValue)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok' + response.statusText);
                    }
                    return response.json();
                })
                .then(data =>
                    callback(data)
                )
                .catch(error => console.error("Fetch error: " + error));
        } catch (error) {
            console.error("Fetch error: " + error);
        }
    };

    function populationData(data) {
        if (data !== undefined) {
            setChartSelectorData(data);
        }
    }

    return (
        <>
            <div id="screen1" className="container-fluid">
                <div id="screen1_container" className="row">
                    <div id="screen1_title" className="col-lg-5">
                        <div id="screen1_titleMent">
                            <h2>우리동네 돋보기</h2>
                        </div>
                        <div id="gu_box">
                            <div id="local_box">
                                <select name="selectbox" id="selectbox" value={guNameValue} onChange={handleSelectChange}>
                                    <option value="강남구">강남구</option>
                                    {guList.map(borough => (
                                        <option key={borough} value={borough}>{borough}</option>
                                    ))}
                                </select>
                            </div>
                            <ChartSelector chartSelectorData={chartSelectorData} />
                        </div>
                    </div >

                    <div id="gu_nameBox" className="col-lg-5">
                        <span id="gu_name">
                            {guNameValue ? `<${guNameValue}>` : '<강남구>'}
                        </span>&nbsp;&nbsp;의 안전 알아보기
                    </div>
                </div >
            </div >
            <ChartSecufacil guNameValue={guNameValue} />
            <ChartPerceivedSafety guNameValue={guNameValue} />
            <PoliceStationTable guNameValue={guNameValue} />

        </>
    );
};

export default ChartComponent;
