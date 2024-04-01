import './App.css';
import React, { useCallback, useReducer, useRef } from 'react';
import Header from './component/Header.jsx';
import TodoEditor from './component/TodoEditor.jsx';
import TodoList from './component/TodoList.jsx';

export const TodoContext = React.createContext();

//초기 할일 목록 정의
const mockTodo = [
  {
    id: 0,
    isDone: true,
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

//상태변화 코드. 반환 값이 state값.
function reducer(state, action) {
  switch (action.type) {
    case "CREATE": {
      return [action.newItem, ...state];
    }
    case "UPDATE": {
      return state.map((it) =>
        it.id === action.targetId ? { ...it, isDone: !it.isDone } : it
      );
    }

    case "DELETE": {
      return state.filter((it) => it.id !== action.targetId);
    }

    default:
      return state;
  }
};

function App() {

  //할일 목록 저장
  const [todo, dispatch] = useReducer(reducer, mockTodo);

  // 새로운 참조를 생성
  const idRef = useRef(3);

  //할일 추가 버튼 누르면 호출.
  //content인자를 받아 새로운 객체 생성, todo 상태에 추가.
  const onCreate = (content) => {
    dispatch({
      type: "CREATE",
      newItem: {
        id: idRef.current,
        content,
        isDone: false,
        createdDate: new Date().getTime(),
      },
    })
    idRef.current += 1;
  };

  //체크박스에 틱이 발생했을때 실행되는 함수
  //받아온 id값과 비교하여 isDone 속성 반전.
  const onUpdate = useCallback((targetId) => {
    dispatch({
      type: "UPDATE",
      targetId,
    })
  }, []);

  const onDelete = useCallback((targetId) => {
    dispatch({
      type: "DELETE",
      targetId,
    })
  }, []);

  return (
    <div className="App">
      <Header />
      <TodoContext.Provider value={{ todo, onCreate, onUpdate, onDelete }}>
        <TodoEditor />
        <TodoList />
      </TodoContext.Provider>
    </div>
  );
}
export default App;