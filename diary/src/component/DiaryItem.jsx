import "./DiaryItem.css";
import { useNavigate } from "react-router-dom";
import { getEmotionImgById } from "../util.js";
import Button from "./Button.jsx";
import React from "react";

const DiaryItem = ({ id, emotionId, content, date }) => {
    const navigate = useNavigate();
    const goDetail = () => {
        navigate(`/diary/${id}`);
    };
    const goEdit = () => {
        navigate(`/edit/${id}`);
    };

    return (
        <div className="diaryItem">
            <div onClick={goDetail} className={["img_section", `img_section_${emotionId}`].join(" ")}>
                <img alt={`emotion${emotionId}`} src={getEmotionImgById(emotionId)} />
            </div>
            <div onClick={goDetail} className="info_section">
                <div className="date_wrapper">
                    {/* 문자열로 된 타임 스탬프 형식의 date를 숫자형으로 형변환한 다음 Date 객체로 변환.
                    Date 의 toLocalDateString메서드 호출해서 사람이 알아볼수 있는 날짜 문자열로 변환. */}
                    {new Date(parseInt(date)).toLocaleDateString()}
                </div>
                {/* 일기는 25글자까지만 보임 */}
                <div className="content_wrapper">{content.slice(0, 25)}</div>
            </div>
            <div className="button_section">
                <Button onClick={goEdit} text={"수정하기"} />
            </div>
        </div>
    );
};
export default React.memo(DiaryItem);