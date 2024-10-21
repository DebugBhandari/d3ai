import "../Styles/Navbar.css";
import logo from "../assets/d3logoonly.png";
import useZuStore from "../zuStore";

export default function Navbar() {
    const activeUser = useZuStore(state => state.activeUser);
    const logOut = useZuStore(state => state.logOut);
    const handleRoute = (e) => {
        if(e.target.innerHTML === "Register"){
            window.location.href = "/register";
        }else if(e.target.innerHTML === "Login"){
            window.location.href = "/login";
        }
        else{
            window.location.href = "/";
        }
    }
    const handleLogout = () => {
        logOut();
        window.location.href = "/";
    }


  return (
    <div className="navbar">
      <div className="navbar_logo_combo" onClick={handleRoute}>
        <img className="navbar_logo" src={logo} alt="D3 Logo" />
        <div className="navbar_logo_title">
          <h3>D3.Ai</h3>
          <h6>Data Driven Development</h6>
        </div>
      </div>
      {activeUser.fullname ? <div className="navbar_menu">
        <h4 className="navbar_user">Hi,{activeUser.fullname.split(" ")[0]}</h4>
        <button className="signin_button" onClick={handleLogout}>Logout</button>
      </div>:
      <div className="navbar_menu">
        <button className="signin_button" onClick={handleRoute}>Register</button>
        <button className="signin_button" onClick={handleRoute}>Login</button>
      </div>}
    </div>
  );
}
