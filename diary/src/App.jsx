import { useEffect, useReducer, useRef } from "react";
import { Routes, Route } from "react-router-dom";
import './App.css';
import Home from "./pages/Home.jsx";
import Write from "./pages/Write.jsx";
import Diary from "./pages/Diary.jsx";
import Edit from "./pages/Edit.jsx";

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

  useEffect(() => {
    dispatch({
      type: "INIT",
      data: mockData,
    });
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

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/write" element={<Write />} />
        <Route path="/diary/:id" element={<Diary />} />
        <Route path="/edit" element={<Edit />} />
      </Routes>

    </div>
  );
}

export default App;
