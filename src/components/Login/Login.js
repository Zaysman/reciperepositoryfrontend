import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css'


function Login() {
    const navigate = useNavigate();

    function toSignUp() {
        navigate("/signup"); //Navigate to sign up page
    }

    function toHome() {
        navigate("/home");
    }

    return (
    <div className = "login-container">
        <label>This is the login page</label>
        <button onClick={toSignUp}>To SignUp</button>
        <button onClick={toHome}>To Home</button>

    </div>


    );

}

export default Login;