import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import Board from "./pages/Board";
import DetailPost from "./pages/DetailPost";
import Home from "./pages/Home";
import My from "./pages/My";
import MyParty from "./pages/MyParty";
import Pokedex from "./pages/Pokedex";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <main className="max-w-360 mx-auto w-full">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/board" element={<Board />} />
          <Route path="/board/:id" element={<DetailPost />} />
          <Route path="/mypage" element={<My />} />
          <Route path="/myparty" element={<MyParty />} />
          <Route path="/pokedex" element={<Pokedex />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
