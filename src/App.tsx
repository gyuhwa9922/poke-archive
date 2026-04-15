import { BrowserRouter, Route, Routes } from "react-router-dom";
import Board from "./pages/Board";
import DetailPost from "./pages/DetailPost";
import Home from "./pages/Home";
import My from "./pages/My";
import MyParty from "./pages/MyParty";
import Pokedex from "./pages/Pokedex";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/board" element={<Board />} />
        <Route path="/board/:id" element={<DetailPost />} />
        <Route path="/mypage" element={<My />} />
        <Route path="/myparty" element={<MyParty />} />
        <Route path="/pokedex" element={<Pokedex />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
