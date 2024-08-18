import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SearchRecipe.css'

function SearchRecipe() {
    const navigate = useNavigate();

    function toHome() {
        navigate("/home");
    }

    function toViewRecipe() {
        navigate("/viewrecipe");
    }

    return(
        <div className = "searchrecipe-container">
            <label>This is the search recipe screen</label>
            <button onClick = {toHome}>To Home.</button>
            <button onClick = {toViewRecipe}>To View Recipe</button>
        </div>
    );

}

export default SearchRecipe;