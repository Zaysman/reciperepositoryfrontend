import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ViewRecipes.css'

function ViewRecipes() {
    const navigate = useNavigate();

    function toHome() {
        navigate("/home");
    }

    function toViewRecipe() {
        navigate("/viewrecipe");
    }

    return(
        <div className = "viewrecipes-container">
            <label>This is the view recipes screen</label>
            <button onClick = {toHome}>To Home</button>
            <button onClick = {toViewRecipe}>To View Recipe</button>
        </div>

    );

}

export default ViewRecipes;