import React, { useState } from 'react';

const PoliceStationTable = ({ guNAmeValue }) => {
    

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
                    {data.length === 0 ? (
                        <tr>
                            <td colSpan="5">데이터가 없습니다.</td>
                        </tr>
                    ) : (
                        data.map(item => (
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
