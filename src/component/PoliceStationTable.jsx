import React, { useState, useEffect } from 'react';

const PoliceStationTable = ({ guNameValue }) => {
    console.log(guNameValue);
    const [policeStations, setPoliceStationsData] = useState(null);

    useEffect(() => {
        fetchData(guNameValue);
    }, [guNameValue]);

    const fetchData = (guNameValue) => {
        fetch('/newseekers/borough/getPoliceStations?guNameValue=' + guNameValue)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok' + response.statusText);
                }
                return response.json();
            })
            .then(data => {
                setPoliceStationsData(data);
            })
            .catch(error => {
                console.error("Fetch error: " + error);
            });

    };

    return (
        <div id="policeStationBox" className="container-fluid">
            <div id="policeAddr">
                <h2>가까운 경찰서 알아보기</h2>
            </div>

            <table id="policeStationTable">
                <thead id="policeStationTitle">
                    <tr>
                        <td>구</td>
                        <td>지역</td>
                        <td>부서</td>
                        <td>주소</td>
                        <td>전화번호</td>
                    </tr>
                </thead>
                <tbody id="policeStationData">
                    {policeStations === null ? (
                        <tr>
                            <td colSpan="5">데이터를 로딩 중입니다.</td>
                        </tr>
                    ) : (
                        policeStations.map(item => (
                            <tr key={item.id}>
                                <td>{item.district}</td>
                                <td>{item.sub_district}</td>
                                <td>{item.department}</td>
                                <td>{item.address}</td>
                                <td>{item.tel}</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default PoliceStationTable;
