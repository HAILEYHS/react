import './App.css';
import React, { useState, useRef } from 'react';
import Header from './component/Header';
import TodoEditor from './component/TodoEditor';
import TodoList from './component/TodoList';


//초기 할일 목록 정의
const mockTodo = [
  {
    id: 0,
    isDone: false,
    content: "React 공부하기",
    createdDate: new Date().getTime(),
  }, {
    id: 1,
    isDone: false,
    content: "자기소개서 작성",
    createdDate: new Date().getTime(),
  },
  {
    id: 2,
    isDone: false,
    content: "포트폴리오 수정하기",
    createdDate: new Date().getTime(),
  },
];

function App() {

  //할일 목록 저장
  const [todo, setTodo] = useState(mockTodo);

  // 새로운 참조를 생성
  const idRef = useRef(3);

  //할일 추가 버튼 누르면 호출.
  //content인자를 받아 새로운 객체 생성, todo 상태에 추가.
  const onCreate = (content) => {
    const newItem = {
      id: idRef.current,
      content,
      isDone: false,
      createdDate: new Date().getTime(),
    };
    setTodo([newItem, ...todo]);
    //id의 현재값을 1 늘림. 모든 id는 고유의 값.
    idRef.current += 1;
  }

  return (
    <div className="App">
      <Header />

      {/* 할일 생성을 위해 onCreate함수를 전달 */}
      <TodoEditor onCreate={onCreate} />
      
      <TodoList />
    </div>
  );
}
export default App;