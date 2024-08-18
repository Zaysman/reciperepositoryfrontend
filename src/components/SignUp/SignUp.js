import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignUp.css'

function SignUp() {
    const navigate = useNavigate();

    function toHome() {
        navigate("/home");
    }
    function toLogin() {
        navigate("/login");

    }


    return (
        <div className = "signup-container">
            <label>This is the sign up screen</label>
            <button onClick={toHome}>To Home</button>
            <button onClick={toLogin}>To Login</button>
        </div>

    );

}

export default SignUp;