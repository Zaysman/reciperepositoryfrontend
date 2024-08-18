import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css'


function Home() {
    const navigate = useNavigate();

    function toLogin() {
        navigate("/login");
    }

    function toProfile() {
        navigate("/profile");
    }

    function toViewRecipes() {
        navigate("/viewrecipes");
    }

    function toSearchRecipes() {
        navigate("/searchrecipe");
    }

    return (
        <div className = "home-container">
            <label>This is the home screen</label>
            <button onClick = {toLogin}>To Login</button>
            <button onClick = {toProfile}>To Edit Profile</button>
            <button onClick = {toViewRecipes}>To View Recipes</button>
            <button onClick = {toSearchRecipes}>To Search Recipes</button>
        </div>

    );

}

export default Home;