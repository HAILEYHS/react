import React, { useState, useRef } from 'react';
import '../css/TodoEditor.css';

const TodoEditor = ({ onCreate }) => {

    const [content, setContent] = useState("");
    const inputRef = useRef();

    const onChangContent = (e) => {
        setContent(e.target.value);
    };

    const onSubmit = () => {
        if (!content) {
            inputRef.current.focus();
            return;
        }
        onCreate(content);
        // 컨텐츠를 보내고 다시 input박스를 초기화하기 위해. 중복방지.
        setContent("");
    };

    //엔터키 눌러도 submit될 수 있는 함수. 13번이 엔터키로 지정되어있음.
    const onKeyDown = (e) => {
        if (e.keyCode === 13) {
            onSubmit();
        }
    }

    return (
        <div className='todoEditor'>
            <h3>새로운 Todo 작성하기 🖍</h3>
            <div className='editor_wrapper'>

                {/* 할일을 입력하고 버튼을 누르는 일은 데이터 전달의 의미가 아님. 
                    버튼을 클릭하는 이벤트는 데이터 전달이 아니라 일종의 이벤트.*/}
                <input onKeyDown={onKeyDown} ref={inputRef} value={content} onChange={onChangContent} placeholder='새로운 Todo...' />
                {/* onSubmit은 onCreate를 호출하고 content를 인수로 전달. 새로운 할일 생성. */}
                <button onClick={onSubmit}>추가</button>

            </div>
        </div>
    );
};
export default TodoEditor;