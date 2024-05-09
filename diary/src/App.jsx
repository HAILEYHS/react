import React, { useEffect, useReducer, useRef, useState } from "react";
import { Routes, Route } from "react-router-dom";
import './App.css';
import Home from "./pages/Home.jsx";
import Write from "./pages/Write.jsx";
import Diary from "./pages/Diary.jsx";
import Edit from "./pages/Edit.jsx";

export const DiaryStateContext = React.createContext();
export const DiaryDispathContext = React.createContext();

function reducer(state, action) {
  switch (action.type) {
    case "CREATE": {
      const newState = [action.data, ...state];
      localStorage.setItem("diary", JSON.stringify(newState));
      return newState;
    }
    case "UPDATE": {
      const newState = state.map((it) =>
        String(it.id) === String(action.data.id) ? { ...action.data } : it
      );
      localStorage.setItem("diary", JSON.stringify(newState));
      return newState;
    }
    case "DELETE": {
      const newState = state.filter(
        (it) => String(it.id) !== String(action.targetId)
      );
      localStorage.setItem("diary", JSON.stringify(newState));
      return newState;
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
    const rawData = localStorage.getItem("diary");
    if (!rawData) {
      setIsDataLoaded(true);
      return;
    }
    const localData = JSON.parse(rawData);

    if (localData.length === 0) {
      // JSON.parse로 복구한 일기 데이터의 길이가 0이면, 변수 isDataLoaded를 true로 변경하고 콜백 함수 종료.
      setIsDataLoaded(true);
      return;
    }
    // 불러온 일기 데이터를 id를 기준으로 내림차순으로 정렬.
    localData.sort((a, b) => Number(b.id) - Number(a.id));
    idRef.current = localData[0].id + 1;

    // 불러온 일기 데이터로 일기 State를 초기화.
    dispatch({ type: "INIT", data: localData });
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
        <DiaryDispathContext.Provider
          value={{
            onCreate,
            onUpdate,
            onDelete,
          }}>
          <div className="App">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/write" element={<Write />} />
              <Route path="/diary/:id" element={<Diary />} />
              <Route path="/edit/:id" element={<Edit />} />
            </Routes>
          </div>
        </DiaryDispathContext.Provider>
      </DiaryStateContext.Provider>
    );
  }
}

export default App;
