import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Footer from './components/layout/Footer';
import Header from './components/layout/Header';
import Board from './pages/Board';
import DetailPost from './pages/DetailPost';
import Home from './pages/Home';
import MyPage from './pages/Mypage';
import MyParty from './pages/MyParty';
import Pokedex from './pages/Pokedex';
import Login from './components/layout/Login';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/board" element={<Board />} />
        <Route path="/board/:id" element={<DetailPost />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/myparty" element={<MyParty />} />
        <Route path="/pokedex" element={<Pokedex />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
