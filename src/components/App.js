import logo from '../logo.svg';
import '../styles/App.css';
import {Routes, Route,Link, BrowserRouter } from 'react-router-dom';
import ParkDiv from './park/ParkDiv';
import HomePage from './home/HomePage';
import TopTab from './Tab/TopTab';
import Login from './loginForm/Login'

function App() {
  return (
    <div className='App'>
      <div className='.App-header'>
        <TopTab isAuth={false} />
      </div>
      <div className='App-body'>
        <BrowserRouter>
        <Routes>
          <Route path="/" element= {<HomePage />} />
          <Route path="/parks" element={<ParkDiv />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
