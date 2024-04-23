import { useContext, useState, useEffect } from "react";
import { DiaryStateContext } from "../App";
import { useNavigate } from "react-router-dom";

// 훅이라는 것을 명시하기 위해 'use'접두사를 붙임.
const useDiary = (id) => {
    // useContext로 전체 일기를 불러옴
    const data = useContext(DiaryStateContext);
    const [diary, setDiary] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        const matchDiary = data.find((it) => String(it.id) === String(id));
        if (matchDiary) {
            setDiary(matchDiary);
        } else {
            alert("일기가 존재하지 않습니다.");
            navigate("/", { replace: true });
        }
    }, [id, data]);

    return diary;
};
export default useDiary;