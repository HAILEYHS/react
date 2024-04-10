import Button from "../component/Button";

const Home = () => {

    return (
        <div>
            <Button text={"기본 버튼"} onClick={() => {
                alert("default button");
            }} />
            <Button type="positive" text={"긍정 버튼"} onClick={() => {
                alert("positive button");
            }} />
            <Button type="negative" text={"부정 버튼"} onClick={() => {
                alert("negative button");
            }} />
            <h3>Home 페이지입니다.</h3>
        </div>
    );
}
export default Home;