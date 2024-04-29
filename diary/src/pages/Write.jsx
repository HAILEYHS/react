import { useNavigate } from "react-router-dom";
import Button from "../component/Button";
import Header from "../component/Header";
import Editor from "../component/Editor";
import { DiaryDispathContext } from "../App";
import { useContext } from "react";

const Write = () => {
    const navigate = useNavigate();
    const goBack = () => {
        navigate(-1);
    };
    // DiaryDispathContext가 제공하는 값이 객체이기 때문에 State를 업데이트하는 3개의 함수 onCreate, onUpdate, onDelete를 담고있음.
    // Write 컴포넌트는 일기를 생성하는 역할만 하기 때문에 함수 onCreate만 필요. 구조분해할당을 이용해서 DiaryDispathContext가 제공하는 객체에서 함수 onCreate만 꺼내서 사용.
    const { onCreate } = useContext(DiaryDispathContext);
    const onSubmit = (data) => {
        const { date, content, emotionId } = data;
        onCreate(date, content, emotionId);
        navigate("/", { replace: true });
    };

    return (
        <div>
            <Header title={"새 일기 쓰기"}
                leftChild={<Button text={"< 뒤로 가기"} onClick={goBack} />} />
            <Editor onSubmit={onSubmit} />
        </div>
    );
}
export default Write;