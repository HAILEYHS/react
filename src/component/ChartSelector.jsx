import React, { useState, useEffect } from 'react';
import '../css/borough.css';
// import ChartSecufacil from './ChartSecufacil'; // 차트 컴포넌트를 import합니다.

function ChartSelector(guNameValue) {
    console.log(guNameValue.guNameValue);
    useEffect(() => {
        if (guNameValue) {
            fetchDataAndProcess(guNameValue);
        }
    }, [guNameValue]);

    const fetchDataAndProcess = async (guNameValue) => {
        try {
            // 요청 URL을 동적으로 생성
            const url = "http://localhost:8181/newseekers/borough/getPopulation?guNameValue=" + guNameValue.guNameValue;

            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Network response was not ok' + response.statusText);
            }
            const data = await response.json();
            console.log(data);
            if (data.gu_secugrade !== undefined) {
                document.getElementById("gu_rank").innerHTML = data.gu_secugrade;
                document.getElementById("gu_people").innerHTML = data.population.toString()
                    .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
            } else {
                console.log("데이터 없음");
            }
        } catch (error) {
            console.error("Fetch error: " + error);
        }
    };

    return (
        <>
            <div id="gu_rankBox">
                치안등급 : <span id="gu_rank">1</span>
            </div>
            <div id="gu_peopleBox">
                인구 수 : <span id="gu_people">5421</span>
            </div>
        </>
    );
};

export default ChartSelector;
