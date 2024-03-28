import '../css/TodoItem.css';

const TodoItem = ({ id, isDone, content, createdDate, onUpdate, onDelete }) => {
    const onChangeCheckBox = () => {
        // 현재 틱이 발생한 할일 아이템의 id값을 전달 
        onUpdate(id);
    };

    const onClickDelete = () => {
        onDelete(id);
    };

    return (
        <div className='todoItem'>
            <div className='checkBox_col'>
                <input onChange={onChangeCheckBox} checked={isDone} type="checkbox" />
            </div>
            <div className='title_col'>{content}</div>
            <div className='date_col'>{new Date(createdDate).toLocaleDateString()}</div>
            <div className='btn_col'>
                <button onClick={onClickDelete}>삭제</button>
            </div>
        </div>
    );
};
export default TodoItem;