import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './DiaryList.css';
import Button from './Button';
import DiaryItem from './DiaryItem';

const sortOptionList = [
    { value: "latest", name: "최신순" },
    { value: "oldest", name: "오래된 순" },
];

const DiaryList = ({ data }) => {
    const [sortType, setSortType] = useState("latest");
    const navigate = useNavigate();
    // 사용자가 선택한 srtType에 따라 정렬, 페이지 렌더링
    const [sortedData, setSortedData] = useState([]);
    // diary 데이터나 정렬기준이 바뀌면 함수 실행.
    useEffect(() => {
        const compare = (a, b) => {
            if (sortType === "latest") {
                return Number(b.date) - Number(a.date);
            } else {
                return Number(a.date) - Number(b.date);
            }
        };
        // sort 메서드는 원본 배열을 정리하기 때문에 정렬 결과를 별도의 배열로 만듦.
        // JSON.stringify()는 인수로 전달한 객체를 문자열로 변환.
        // JSON.parse 문자열로 변환한 값을 다시 객체로 복구하는 함수.
        // 문자열로 변환 후 다시 복구하면 새로운 객체를 생성. 값은 같지만 참조값이 다른 객체 생성.
        const copyList = JSON.parse(JSON.stringify(data));
        copyList.sort(compare);
        setSortedData(copyList);
    },[data, sortType]);

    const onChangeSortType = (e) => {
        setSortType(e.target.value);
    };
    const onClickNew = () => {
        navigate("/Write");
    };

    return (
        <div className="diaryList">
            <div className='menu_wrapper'>
                <div className='left_col'>
                    <select value={sortType} onChange={onChangeSortType}>
                        {sortOptionList.map((it, idx) => (
                            <option key={idx} value={it.value}>
                                {it.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className='right_col'>
                    <Button type={"positive"} text={"새 일기 쓰기"}
                        onClick={onClickNew} />
                </div>
            </div>
            <div className='list_wrapper'>
                {sortedData.map((it) => (
                    <DiaryItem key={it.id}{...it}/>
                ))}
            </div>
        </div>
    );
};
export default DiaryList;