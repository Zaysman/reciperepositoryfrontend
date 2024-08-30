import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import './Home.css'
import User from "../../objects/User";



function Home() {
    const navigate = useNavigate();
    const location = useLocation();

    const user = location.state?.user;

    console.log("user", user);

    function toLogin() {
        navigate("/login");
    }

    function toEditProfile() {
        navigate("/profile", { state : { user: user}});
    }

    function toViewRecipes() {
        navigate("/viewrecipes", {state : {user: user}});
    }

    function toSearchRecipes() {
        navigate("/searchrecipe");
    }

    return (
        <div className = "home-container">
            <h2>Home</h2>

            <div className="section view-recipes" onClick={toViewRecipes}>
                <h3>View Recipes</h3>
            </div>
            
            <div className="section search-recipes" onClick={toSearchRecipes}>
                <h3>Search Recipes</h3>
            </div>
            
            <div className="section edit-profile" onClick={toEditProfile}>
                <h3>Edit Profile</h3>
            </div>



            {/*
            <label>This is the home screen</label>
            <button onClick = {toLogin}>To Login</button>
            <button onClick = {toProfile}>To Edit Profile</button>
            <button onClick = {toViewRecipes}>To View Recipes</button>
            <button onClick = {toSearchRecipes}>To Search Recipes</button>
            */}   
        </div>
         
    );

}


export default Home;