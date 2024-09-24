import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './EditRecipe.css'
import JSONRequests from "libraries/JSONRequests";

function EditRecipe() {
    const navigate = useNavigate();
    const location = useLocation();
    const jsonRequests = new JSONRequests();



    //Check to see if User and recipe were retrieved from ViewRecipe Component
    const { user, recipe} = location.state || {};

    console.log("User:", user);
    console.log("Recipe:", recipe);
    
    
    function navigateToViewRecipe() {
        navigate("/viewrecipe", {state: {user: user, recipe: recipe}});
    }

    return (
        <div className = "editrecipe-container">
            <label>This is the edit recipe screen</label>
            <button onClick = {navigateToViewRecipe}>To View Recipe</button>
        </div>
    );

}

export default EditRecipe;