import { useNavigate } from "react-router-dom";
import Button from "../component/Button";
import Header from "../component/Header";
import Editor from "../component/Editor";

const Write = () => {
    const navigate = useNavigate();
    const goBack = () => {
        navigate(-1);
    };

    return (
        <div>
            <Header title={"새 일기 쓰기"}
            leftChild={<Button text={"< 뒤로 가기"} onClick={goBack}/>}/>
            <Editor/>
        </div>
    );
}
export default Write;