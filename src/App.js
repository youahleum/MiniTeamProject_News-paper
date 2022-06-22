// import logo from './logo.svg';
// import './App.css';
import { BrowserRouter, Route, Routes,Navigate } from 'react-router-dom';
import Header from './components/Header'
import Clip from './pages/Clip';
import Home from './pages/Home';

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/clip" element={<Clip />} />
          <Route path="*" element={ <Navigate to="/" replace={true}/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
