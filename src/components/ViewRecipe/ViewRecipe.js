import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './ViewRecipe.css'
import Recipe from '../../objects/Recipe';
import User from '../../objects/User';
import JSONRequests from 'libraries/JSONRequests';

const backendUrl = process.env.REACT_APP_RECIPE_REPOSITORY_BACKEND_URL;
const ingredientsByRecipeIDUrl = process.env.REACT_APP_RECIPE_REPOSITORY_GET_INGREDIENT_BY_ENTRY_ID_URL


function ViewRecipe() {
    const navigate = useNavigate();
    const location = useLocation();

    //Check to see if User and recipe where retrieved from ViewRecipes component correctly
    const { user, recipe } = location.state || {};

    console.log("User:", user);
    console.log("Recipe:", recipe);

    //get ingredients from backend
    console.log("Sending Get request to retrieve Ingredients information");
    const recipeIDString = recipe.recipeID.toString();
    const getIngredientsURL = backendUrl + ingredientsByRecipeIDUrl + recipeIDString;
    
    console.log("getIngredientsURL:" + getIngredientsURL);

    const jsonRequests = new JSONRequests();
    // recipe.ingredients = jsonRequests.sendGetRequest(getIngredientsURL);
    // console.log("Recipe Ingredients", recipe.ingredients);

    const fetchIngredientData = async () => {
        try {
            recipe.ingredients = await jsonRequests.sendGetRequest(getIngredientsURL);
            console.log("Recipe Ingredients", recipe.ingredients);
        } catch(error) {
            console.error("There was an error retrieving the ingredients for the Recipe", error);
        }
    }
    fetchIngredientData(); //fetch the data once we load in.

    
    


    function navigateToViewRecipes() {
        navigate("/viewrecipes", {state : {user: user}});
    }

    function navigateToSearchRecipes() {
        navigate("/searchrecipe");
    }

    function navigateToEditRecipe() {
        navigate("/editrecipe");
    }

    return (
        <div className = "viewrecipe-container">
            {//<label>This is the view recipe screen</label>
            //<button onClick = {navigateToViewRecipes}>To view recipes</button>
            //<button onClick = {navigateToSearchRecipes}>To Search recipes</button>
            //<button onClick = {navigateToEditRecipe}>To Edit Recipe</button>
            }
            <h2>View Recipe</h2>
            <h3>{recipe.recipeTitle}</h3>
            <div className = "recipeinfo-container">
                <div className = "entry-group">
                    <label>Author</label>
                    <p>Author goes here</p>
                </div>
                <div className = "entry-group">
                    <label>Description</label>
                    <p>{recipe.recipeDesc}</p>
                </div>
                <div className = "entry-group">
                    <label>Cuisine Type</label>
                    <p>{recipe.cuisineType}</p>
                </div>
                <div className = "entry-group">
                    <label>Serves:</label>
                    <p>{recipe.servSize}</p>
                </div>
                <div className = "entry-group">
                    <label>Rating:</label>
                    <p>{recipe.rating}</p>
                </div>
                <div className = "entry-group">
                    <label>Difficulty</label>
                    <p>{recipe.difflvl}</p>
                </div>
            </div>

            <div className = "ingredientsinfo-container">

            </div>

        </div>
    );

}

export default ViewRecipe;