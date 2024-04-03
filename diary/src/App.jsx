import './App.css';
import { getEmotionImgById } from './util';
function App() {
  return (
    <div className="App">
      <h1>감정 일기장</h1>
      <img src={getEmotionImgById(1)} alt="감정1" />
      <img src={getEmotionImgById(2)} alt="감정2" />

    </div>
  );
}

export default App;
