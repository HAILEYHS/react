import React, { useEffect, useReducer, useRef, useState } from "react";
import { Routes, Route } from "react-router-dom";
import './App.css';
import Home from "./pages/Home.jsx";
import Write from "./pages/Write.jsx";
import Diary from "./pages/Diary.jsx";
import Edit from "./pages/Edit.jsx";

export const DiaryStateContext = React.createContext();

const mockData = [
  {
    id: "mock1",
    date: new Date().getTime(),
    content: "mock1",
    emotion: 1,
  },
  {
    id: "mock2",
    date: new Date().getTime(),
    content: "mock2",
    emotion: 2,
  },
  {
    id: "mock3",
    date: new Date().getTime(),
    content: "mock3",
    emotion: 3,
  },
];
function reducer(state, action) {
  switch (action.type) {
    case "CREATE": {
      return [action.data, ...state];
    }
    case "UPDATE": {
      return state.map((it) =>
        String(it.id) === String(action.data.id) ? { ...action.data } : it
      );
    }
    case "DELETE": {
      return state.filter((it) => String(it.id) !== String(action.targetId));
    }
    case "INIT": {
      return action.data;
    }
    default: {
      return state;
    }
  }
}

function App() {
  const [data, dispatch] = useReducer(reducer, []);
  const idRef = useRef(0);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  useEffect(() => {
    dispatch({
      type: "INIT",
      data: mockData,
    });
    setIsDataLoaded(true);
  }, []);

  const onCreate = (date, content, emotionId) => {
    dispatch({
      type: "CREATE",
      data: {
        id: idRef.current,
        date: new Date(date).getTime(),
        content,
        emotionId,
      }
    });
    idRef.current += 1;
  };

  const onUpdate = (targetId, date, content, emotionId) => {
    dispatch({
      type: "UPDATE",
      data: {
        id: targetId,
        date: new Date(date).getTime(),
        content,
        emotionId,
      },
    });
  };

  const onDelete = (targetId) => {
    dispatch({
      type: "DELETE",
      targetId,
    });
  };
  if (!isDataLoaded) {
    return <div>데이터를 불러오는 중입니다.</div>;
  } else {
    return (
      <DiaryStateContext.Provider value={data}>
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/write" element={<Write />} />
            <Route path="/diary/:id" element={<Diary />} />
            <Route path="/edit" element={<Edit />} />
          </Routes>
        </div>
      </DiaryStateContext.Provider>
    );
  }
}

export default App;
