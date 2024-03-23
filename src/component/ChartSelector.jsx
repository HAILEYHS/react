import React from 'react';
import '../css/borough.css';

function ChartSelector(props) {

    const gu_secugrade = props.chartSelectorData ? props.chartSelectorData.gu_secugrade : '';
    const population = props.chartSelectorData ? props.chartSelectorData.population : '';


    return (
        <>
            <div id="gu_rankBox">
                치안등급 : <span id="gu_rank">{gu_secugrade}</span>
            </div>
            <div id="gu_peopleBox">
                인구 수 : <span id="gu_people">{population.toString()
                    .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}</span>
            </div>
        </>
    );
};

export default ChartSelector;
