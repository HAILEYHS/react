import { emotionList } from "../util";
import "./Viewer.css";

const Viewer = ({ content, emotionId }) => {
    const emotionItem = emotionList.find((it) => it.id === emotionId);
    console.log(emotionItem);
    return (
        <div className="viewer">
            
        </div>
    );
};
export default Viewer;