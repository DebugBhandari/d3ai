import './App.css';
import Navbar from './Component/Navbar';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from './Component/Dashboard';
import Login from './Component/Login';
import Register from './Component/Register';
import Footer from './Component/Footer';
import Orders from './Component/Orders';


function App() {
  return (
    <div className="app">
       <BrowserRouter>
     <Navbar/>
     <div className="app_body">
     <Routes>
    
      <Route path="/" element={<Dashboard/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/success" element={<h1 style={{color: "black"}}>Success</h1>}/>
      <Route path="/cancel" element={<h1 style={{color: "black"}}>Error</h1>}/>
      <Route path="/orders" element={<Orders/>}/>
 
      </Routes>
      </div>
      <Footer/>
     </BrowserRouter>
    </div>
  )
}

export default App;
