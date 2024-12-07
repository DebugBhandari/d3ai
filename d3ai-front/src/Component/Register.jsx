import { useState } from 'react';
import "../Styles/Login.css";
import axios from 'axios';
import { baseUrl } from '../config/constants';
import Button from '@mui/material/Button';

const Register = () => {
    const [email, setEmail] = useState('');
    const [fullname, setFullname] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = () => {
        // Perform registration logic here
        console.log('Registering user:', { email, fullname, password });
        axios.post(`${baseUrl}/register`, { fullname, email, password })
            .then((response) => {
                console.log('Registration successful:', response.data);
                alert('Registration successful');
                window.location.href = "/login";

            })
            .catch((error) => {
                console.error('Error registering user:', error);
                alert('Error registering user', error);
            });

    };

    return (
        <div className="login_component">
            <h2 style={{color:"#1976d2"}}>Register</h2>
            <p style={{marginBottom:"20px"}}>Please register to continue.</p>
            <form className="login_comp_form">
               
                <input className="login_input"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                />

              
                <input className="login_input"
                    type="text"
                    value={fullname}
                    onChange={(e) => setFullname(e.target.value)}
                    placeholder="Full Name"
                />

              
                <input className="login_input"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                />

                {/* <button className="signin_button" type="button" onClick={handleRegister}>
                    Register
                </button> */}
                <Button variant="contained" color="primary" type="button" onClick={handleRegister} sx={{marginBottom:"20px"}}>Register</Button>
            </form>
        </div>
    );
};

export default Register;