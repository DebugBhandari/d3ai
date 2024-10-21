import { useState } from 'react';
import "../Styles/Login.css";
import axios from 'axios';
import useZuStore from '../zuStore';

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
        axios.post('http://localhost:3333/login', { email, password })
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
            <h2>Login</h2>
            <form onSubmit={handleSubmit} className="login_comp_form">
               
                    <label>Email:</label>
                    <input type="email" value={email} onChange={handleEmailChange} className="login_input"/>
               
                
                    <label>Password:</label>
                    <input type="password" value={password} onChange={handlePasswordChange} className="login_input" />
                
                <button type="submit" className="signin_button" >Login</button>
            </form>
        </div>
    );
};

export default Login;