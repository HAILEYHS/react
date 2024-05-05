import "./Editor.css";
import { useState, useEffect, useCallback } from "react";
import { emotionList, getFormattedDate } from "../util.js";
import { useNavigate } from "react-router-dom";
import Button from "./Button.jsx";
import EmotionItem from "./EmotionItem.jsx";

const Editor = ({ initData, onSubmit }) => {
    const navigate = useNavigate();
    const [state, setState] = useState({
        date: getFormattedDate(new Date()),
        emotionId: 3,
        content: "",
    });

    // initData를 state의 기본값으로 설정.
    useEffect(() => {
        if (initData) {
            setState({
                ...initData,
                date: getFormattedDate(new Date(parseInt(initData.date))),
            });
        }
    }, initData);

    const handleChangeDate = (e) => {
        setState({
            ...state,
            date: e.target.value,
        });
    };

    const handleChangeContent = (e) => {
        setState({
            ...state,
            content: e.target.value,
        });
    };

    const handleSubmit = () => {
        onSubmit(state);
    };

    const handleOnGoBack = () => {
        navigate(-1);
    };
    const hadleChangeEmotion = (emotionId) => {
        setState({
            ...state,
            emotionId,
        })
    }

    const handleChangeEmotion = useCallback((emotionId) => {
        setState((state)=>({
            ...state,
            emotionId,
        }));
    }, []);
    return (
        <div className="Editor">
            <div className="editor_section">
                <h4>오늘의 날짜</h4>
                <div className="input_wrapper">
                    <input type="date" value={state.date} onChange={handleChangeDate} />
                </div>
            </div>
            <div className="editor_section">
                {/* 감정 */}
                <h4>오늘의 감정</h4>
                <div className="imput_wrapper emotion_list_wrapper">
                    {emotionList.map((it) => (
                        <EmotionItem
                            key={it.id}
                            {...it}
                            onClick={hadleChangeEmotion}
                            isSelected={state.emotionId === it.id}
                        />
                    ))}
                </div>
            </div>
            <div className="editor_section">
                <h4>오늘의 일기</h4>
                <textarea placeholder="오늘은 어땠나요?" value={state.content}
                    onChange={handleChangeContent} />
            </div>
            <div className="editor_section bottom_section">
                {/* 작성 완료, 취소 */}
                <Button text={"취소하기"} onClick={handleOnGoBack} />
                <Button text={"작성완료"} type={"positive"} onClick={handleSubmit} />
            </div>
        </div>
    );
};
export default Editor;