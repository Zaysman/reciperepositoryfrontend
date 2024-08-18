import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ViewRecipe.css'

function ViewRecipe() {
    const navigate = useNavigate();

    function toViewRecipes() {
        navigate("/viewrecipes");
    }

    function toSearchRecipes() {
        navigate("/searchrecipe");
    }

    function toEditRecipe() {
        navigate("/editrecipe");
    }

    return (
        <div className = "viewrecipe-container">
            <label>This is the view recipe screen</label>
            <button onClick = {toViewRecipes}>To view recipes</button>
            <button onClick = {toSearchRecipes}>To Search recipes</button>
            <button onClick = {toEditRecipe}>To Edit Recipe</button>
        </div>
    );

}

export default ViewRecipe;