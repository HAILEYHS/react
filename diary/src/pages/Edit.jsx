import { useNavigate, useParams } from "react-router-dom";
import useDiary from "../hooks/useDiary.js";
import Button from "../component/Button.jsx";
import Header from "../component/Header.jsx";
import { useContext } from "react";
import { DiaryDispathContext } from "../App";
import Editor from "../component/Editor.jsx";

const Edit = () => {
    const { id } = useParams();
    const data = useDiary(id);
    const navigate = useNavigate();
    const goBack = () => {
        navigate(-1);
    };
    const { onUpdate, onDelete } = useContext(DiaryDispathContext);
    const onClickDelete = () => {
        // window.confirm메서드는 사용자에게 인수로 전달한 텍스트와 함께 alert창을 출력하는 브라우저 메서드. alert창에서 사용자가 <확인>버튼을 클릭하면 true를 반환.
        if (window.confirm("일기를 정말 삭제할까요? 다시 복구할 수 없습니다.")) {
            onDelete(id);
            navigate("/", { replace: true });
        }
    };

    const onSubmit = (data) => {
        if (window.confirm("일기를 정말 수정할까요?")) {
            const { date, content, emotionId } = data;
            onUpdate(id, date, content, emotionId);
            navigate("/", { replace: true });
        }
    };

    if (!data) {
        return <div>일기를 불러오고 있습니다...</div>
    } else {
        return (
            <div>
                <Header
                    title={"일기 수정하기"}
                    leftChild={<Button text={"< 뒤로 가기"} onClick={goBack} />}
                    rightChild={<Button type={"negative"} text={"삭제하기"} onClick={onClickDelete} />}
                />
                <Editor initData={data} onSubmit={onSubmit} />
            </div>
        );
    }
};
export default Edit;