import './App.css';
import LoginForm from './component/LoginForm';
import Home from './component/Home';
import ParkSection from './component/ParkSection';
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import TopBar from './component/TopBar';
import TicketSection from './component/TicketSection';


const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
          <TopBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/parks" element={<ParkSection />} />
            <Route path="/tickets" element={<TicketSection />} />
            <Route path="/login" element={<LoginForm />} />
          </Routes>
      </BrowserRouter>
    </div>
  );
};
/* const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <div className="App-header">
          <TopBar />
        </div>
        <div className="App-body">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/parks" element={<ParkSection />} />
            <Route path="/tickets" element={<TicketSection />} />
            <Route path="/login" element={<LoginForm />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}; */

export default App;
