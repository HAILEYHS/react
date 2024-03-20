import React, { useState, useEffect } from 'react';
import '../css/borough.css';
import ChartSelector from './ChartSelector'; // 차트 컴포넌트를 import합니다.
import ChartSecufacil from './ChartSecufacil';

function ChartComponent() {
    const guList = ['강남구', '송파구', '영등포구', '성동구', '노원구', '강북구'];
    const [guNameValue, setGuNameValue] = useState('강남구');

    const handleSelectChange = (event) => {
        console.log(guNameValue)
        console.log(event.target.value)
        setGuNameValue(event.target.value);
    };

    return (
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
                        <ChartSelector guNameValue={guNameValue} />
                    </div>
                </div >

                <div id="gu_nameBox" className="col-lg-5">
                    <span id="gu_name">
                        {guNameValue ? `<${guNameValue}>` : '<강남구>'}
                    </span>&nbsp;&nbsp;의 안전 알아보기
                </div>
                <ChartSecufacil guNameValue={guNameValue} />
            </div >
        </div >
    );
};

export default ChartComponent;
