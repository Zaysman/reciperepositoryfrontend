import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Profile.css'

function Profile() {
    const navigate = useNavigate();

    function toHome() {
        navigate("/home");
    }

    return (
        <div className = "profile-container">
            <label>This is the edit profile screen</label>
            <button onClick = {toHome}>To Home</button>
        </div>
    );

}

export default Profile;