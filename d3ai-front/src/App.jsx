import './App.css';
import Navbar from './Component/Navbar';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from './Component/Dashboard';
import Login from './Component/Login';
import Register from './Component/Register';

function App() {
  
  return (
    <div className="app_body">
       <BrowserRouter>
     <Navbar/>
     <Routes>
      <Route path="/" element={<Dashboard/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
      </Routes>
     </BrowserRouter>
    </div>
  )
}

export default App;
