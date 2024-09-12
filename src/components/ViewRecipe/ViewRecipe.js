import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './ViewRecipe.css'
import Recipe from '../../objects/Recipe';
import User from '../../objects/User';


function ViewRecipe() {
    const navigate = useNavigate();
    const location = useLocation();

    const { user, recipe } = location.state || {};

    console.log("User:", user);
    console.log("Recipe:", recipe);

    function toViewRecipes() {
        navigate("/viewrecipes", {state : {user: user}});
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