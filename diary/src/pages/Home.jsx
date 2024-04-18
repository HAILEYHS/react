import { useState, useContext, useEffect } from "react";
import { DiaryStateContext } from "../App.jsx";
import { getMonthRangeByDate } from "../util.js";
import Button from "../component/Button";
import Editor from "../component/Editor";
import Header from "../component/Header";

const Home = () => {
    // DiaryStateContext에서 diary 데이터 불러옴.
    const data = useContext(DiaryStateContext);
    const [pivotDate, setPivotDate] = useState(new Date());
    // state가 변경될때마다 현재 날짜(년/월)에 해당하는 diary 데이터로 필터링
    // 필터링한 데이터로 filteredData 업데이트
    const [filteredData, setFilteredData] = useState([]);
    const headerTitle = `${pivotDate.getFullYear()}년
                        ${pivotDate.getMonth() + 1}월`;
    const onIncreaseMonth = () => {
        setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth() + 1));
    };
    const onDecreaseMonth = () => {
        setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth() - 1));
    };
    // privoteDate가 변할 때마다 해당 월에 작성된 diary를 필터링.
    useEffect(() => {
        if (data.length >= 1) {
            const { beginTimeStamp, endTimeStamp } = getMonthRangeByDate(pivotDate);
            setFilteredData(
                data.filter(
                    (it) => beginTimeStamp <= it.date && it.date <= endTimeStamp
                )
            );
        } else {
            setFilteredData([]);
        }
    }, [data, pivotDate]);

    return (
        <div>
            <Header
                title={headerTitle}
                leftChild={<Button text={"<"} onClick={onDecreaseMonth} />}
                rightChild={<Button text={">"} onClick={onIncreaseMonth} />}
            />
            <h3>Home 페이지입니다.</h3>
        </div>
    );
}
export default Home;