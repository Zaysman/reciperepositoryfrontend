import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './EditRecipe.css'

function EditRecipe() {
    const navigate = useNavigate();

    function toViewRecipe() {
        navigate("/viewrecipe");
    }

    return (
        <div className = "editrecipe-container">
            <label>This is the edit recipe screen</label>
            <button onClick = {toViewRecipe}>To View Recipe</button>
        </div>
    );

}

export default EditRecipe;