import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './ViewRecipe.css'
import Recipe from '../../objects/Recipe';
import User from '../../objects/User';
import JSONRequests from 'libraries/JSONRequests';

const backendUrl = process.env.REACT_APP_RECIPE_REPOSITORY_BACKEND_URL;
const ingredientsByRecipeIDUrl = process.env.REACT_APP_RECIPE_REPOSITORY_GET_INGREDIENTS_BY_RECIPE_ID_URL;
const stepsByRecipeIDUrl = process.env.REACT_APP_RECIPE_REPOSITORY_GET_STEPS_BY_RECIPE_ID_URL;
const commentsByRecipeIDUrl = process.env.REACT_APP_RECIPE_REPOSITORY_GET_COMMENTS_BY_RECIPE_ID_URL;
const nutritionInfoByrecipeIDUrl = process.env.REACT_APP_RECIPE_REPOSITORY_GET_NUTRITIONINFO_BY_RECIPE_ID_URL;

function ViewRecipe() {
    const navigate = useNavigate();
    const location = useLocation();
    const jsonRequests = new JSONRequests(); // instantiate instance of JSONRequests class

    //Check to see if User and recipe where retrieved from ViewRecipes component correctly
    const { user, recipe } = location.state || {};

    console.log("User:", user);
    console.log("Recipe:", recipe);

    //get ingredients from backend
    console.log("Sending Get request to retrieve Ingredients information");
    const recipeIDString = recipe.recipeID.toString();
    const getIngredientsURL = backendUrl + ingredientsByRecipeIDUrl + recipeIDString;
    
    console.log("getIngredientsURL:" + getIngredientsURL);


    const fetchIngredientData = async () => {
        try {
            recipe.ingredients = await jsonRequests.sendGetRequest(getIngredientsURL);
            console.log("Recipe Ingredients", recipe.ingredients);
        } catch(error) {
            console.error("There was an error retrieving the ingredients for the Recipe", error);
        }
    }
    fetchIngredientData(); //fetch the ingredient data once we load in.

    //get steps from backend
    console.log("Sending Get request to retrieve Steps information");
    const getStepsUrl = backendUrl + stepsByRecipeIDUrl + recipeIDString;

    console.log("getStepsUrl: " + getStepsUrl);

    const fetchStepsData = async () => {
        try {
            recipe.prepSteps = await jsonRequests.sendGetRequest(getStepsUrl);
            console.log("Recipe Preparation Steps", recipe.prepSteps);
        } catch(error) {
            console.error("There was an error retrieving the steps for the Recipe", error);
        }
    }
    fetchStepsData(); //fetch the Steps data


    //get comments from backend
    console.log("Sending Get request to retrieve Comments information");
    const getCommentsUrl = backendUrl + commentsByRecipeIDUrl + recipeIDString;
    console.log("getCommentsUrl: " + getCommentsUrl);
    
    const fetchCommentsData = async () => {
        try {
            recipe.comments = await jsonRequests.sendGetRequest(getCommentsUrl);
            console.log("Recipe Comments", recipe.comments);
        } catch(error) {
            console.error("There was an error retrieving the comments for the Recipe", error);
        }
    }
    fetchCommentsData(); //fetch the Comment data

    //get NutritionInfo from backend
    console.log("Sending Get request to retrieve Nutrition info");
    const getNutritionInfoUrl = backendUrl + nutritionInfoByrecipeIDUrl + recipeIDString;
    console.log("getNutritionInfoUrl: " + getNutritionInfoUrl);

    const fetchNutritionInfoData = async () => {
        try {
            recipe.nutritionInfo = await jsonRequests.sendGetRequest(getNutritionInfoUrl);
            console.log("Recipe NutritionInfo", recipe.nutritionInfo);
        } catch(error) {
            console.error("There was an error retrieving the nutrition info for the Recipe", error);
        }
    }
    fetchNutritionInfoData(); //fetch the NutritionInfoData;





    
    
    


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