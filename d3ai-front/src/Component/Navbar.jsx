import "../Styles/Navbar.css";
import logo from "../assets/d3logoonly.png";
import useZuStore from "../zuStore";
import Button from '@mui/material/Button';

export default function Navbar() {
    const activeUser = useZuStore(state => state.activeUser);
    const logOut = useZuStore(state => state.logOut);
    // const handleRoute = (e) => {
    //     if(e.target.innerHTML === "Register"){
    //         window.location.href = "/register";
    //     }else if(e.target.innerHTML === "Login"){
    //         window.location.href = "/login";
    //     }
    //     else{
    //         window.location.href = "/";
    //     }
    // }
    const handleLogin = () => {
        window.location.href = "/login";
    }
    const handleOrders = () => {
        window.location.href = "/orders";
    }
    const handleLogout = () => {
        logOut();
        window.location.href = "/";
    }
    


  return (
    <div className="navbar">
      <div className="navbar_content">
      <div className="navbar_logo_combo" onClick={()=>window.location.href="/"}>
        <img className="navbar_logo" src={logo} alt="D3 Logo" />
        <div className="navbar_logo_title">
          <h3>D3.Ai</h3>
          <h6>Data Driven Development</h6>
        </div>
      </div>
      {activeUser.fullname ? <div className="navDropDown">
        <Button variant="outlined" color="secondary">{activeUser.fullname.split(" ")[0]}</Button>
        <div className="navDropContent">
        {/* <button className="signin_button" onClick={handleLogout}>Logout</button> */}
        <Button variant="basic-button" color="primary" onClick={handleOrders}>Orders</Button>
        <Button variant="basic_button" sx={{color:"red"}} onClick={handleLogout}>Logout</Button>
        </div>
       
      </div>:
      <div className="navbar_menu">
        {/* <button className="signin_button" onClick={handleRoute}>Register</button> */}
        {/* <button className="signin_button" onClick={handleRoute}>Login</button> */}
        {window.location.pathname=="/login"?null:<Button variant="contained" color="primary" onClick={handleLogin}>Login</Button>}
      </div>}
      </div></div>
  );
}
