import { useState } from 'react';
import "../Styles/Login.css";
import axios from 'axios';
import useZuStore from '../zuStore';
import { baseUrl } from '../config/constants';
import Button from '@mui/material/Button';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const setActiveUser = useZuStore(state => state.setActiveUser);

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add your login logic here
        console.log('Email:', email);
        console.log('Password:', password);
        axios.post(`${baseUrl}/login`, { email, password })
            .then((response) => {
                console.log('Login successful:', response.data);
                setActiveUser(response.data);
                alert('Login successful');
                window.location.href = "/";
            })
            .catch((error) => {
                console.error('Error logging in:', error);
                alert('Error logging in', error);
            });
        
    };

    return (
        <div className="login_component">
            <h2 style={{color:"#1976d2"}}>Sign In</h2>
            <p style={{marginBottom:"20px"}}>Please sign in to continue.</p>
            <form onSubmit={handleSubmit} className="login_comp_form">
               
                    
                    <input type="email" value={email} onChange={handleEmailChange} className="login_input" placeholder="Email"/>
               
                
                    
                    <input type="password" value={password} onChange={handlePasswordChange} className="login_input" placeholder="Password" />
                
                {/* <button type="submit" className="signin_button" >Login</button> */}
                <Button variant="contained" color="primary" type="submit" sx={{marginBottom:"20px"}}>Login</Button>
                <p> Don&apos;t have an account? <br></br><a href="/register" className="login_link">Register here</a></p>
            </form>
        </div>
    );
};

export default Login;