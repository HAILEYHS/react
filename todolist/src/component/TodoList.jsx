import React, { useState, useMemo, useContext } from 'react';
import { TodoContext } from '../App.jsx';
import '../css/TodoList.css';
import TodoItem from './TodoItem';

const TodoList = () => {
    const { todo } = useContext(TodoContext);
    const [search, setSearch] = useState("");

    const onChangeSearch = (e) => {
        setSearch(e.target.value);
    };

    const getSearchResult = () => {
        // filter : it의 content 부분에 search를 포함하고 있는지 여부 확인해서 새로운 배열 반환
        return search === "" ? todo : todo.filter((it) => it.content.includes(search));
    };

    //useMemo로 todo값이 변동이 있을때만 analyzeTodo함수 호출되게 함.
    const analyzeTodo = useMemo(() => {
        console.log("analyzeTodo 함수 호출");
        const totalCount = todo.length;
        const doneCount = todo.filter((it) => it.isDone).length;
        const notDoneCount = totalCount - doneCount;

        return { totalCount, doneCount, notDoneCount };
    }, [todo]);

    const { totalCount, doneCount, notDoneCount } = analyzeTodo;

    return (
        <div className='todoList'>
            <h4>Todo List 🌱</h4>
            <div className='analyzeTodo'>
                <div>총 개수 :&nbsp;&nbsp; {totalCount}</div>
                <div>완료 항목 :&nbsp;&nbsp; {doneCount}</div>
                <div>남은 항목 :&nbsp;&nbsp; {notDoneCount}</div>
            </div>

            <input value={search} onChange={onChangeSearch} className="searchbar" placeholder='검색어를 입력하세요.' />
            <div className='list_wrapper'>
                {/* {todo.map((it)=>(
                    <div>{it.content}</div>
                ))} */}
                {getSearchResult().map((it) => (
                    // 요소의 id값을 key로 구분
                    <TodoItem key={it.id}{...it} />
                ))}

            </div>
        </div>

    );
};

//Context.provider를 적용하면서 props로 todo를 받아오지 못할때 
//에러가 나지 않도록 빈 배열 설정
TodoList.defaultProps = {
    todo: [],
};
export default TodoList;