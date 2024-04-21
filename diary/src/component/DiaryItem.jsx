import "./DiaryItem.css";

const DiaryItem = ({id, emotionId, content, date}) => {
    
    return (
        <div className="diaryItem">
            {content}
        </div>
    );
};
export default DiaryItem;