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
            <h4>{recipe.recipeTitle}</h4>
            <div id="recipeinfo-container" className="info-container">
                <h4>Recipe Info</h4>
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

            <div id="nutritioninf-container" className="info-container">
                <h4>Nutritional Info</h4>
                <div className = "entry-group">
                    <label>Calories</label>
                    <p>{recipe.nutritionInfo.calories}</p>
                </div>
                <div className = "entry-group">
                    <label>Saturated Fat</label>
                    <p>{recipe.nutritionInfo.satFat}</p>
                </div>
                <div className = "entry-group">
                    <label>Trans Fat</label>
                    <p>{recipe.nutritionInfo.transFat}</p>
                </div>
                <div className = "entry-group">
                    <label>Cholesterol</label>
                    <p>{recipe.nutritionInfo.cholesterol}</p>
                </div>
                <div className = "entry-group">
                    <label>Sodium</label>
                    <p>{recipe.nutritionInfo.sodium}</p>
                </div>
                <div className = "entry-group">
                    <label>Carbs</label>
                    <p>{recipe.nutritionInfo.carbs}</p>
                </div>
                <div className = "entry-group">
                    <label>Protein</label>
                    <p>{recipe.nutritionInfo.protein}</p>
                </div>
                <div className = "entry-group">
                    <label>Vitamin A</label>
                    <p>{recipe.nutritionInfo.vitaminA}</p>
                </div>
                <div className = "entry-group">
                    <label>vitamin C</label>
                    <p>{recipe.nutritionInfo.vitaminC}</p>
                </div>
                <div className = "entry-group">
                    <label>vitamin D</label>
                    <p>{recipe.nutritionInfo.vitaminD}</p>
                </div>
                <div className = "entry-group">
                    <label>Calcium</label>
                    <p>{recipe.nutritionInfo.calcium}</p>
                </div>
                <div className = "entry-group">
                    <label>Iron</label>
                    <p>{recipe.nutritionInfo.iron}</p>
                </div>
                <div className = "entry-group">
                    <label>Potassium</label>
                    <p>{recipe.nutritionInfo.potassium}</p>
                </div>
                <div className = "entry-group"></div>
            </div>

            <div id="ingredientsinfo-container" className="info-container">
                <h4>Ingredients</h4>
                {recipe.ingredients.length > 0 ? (recipe.ingredients.map((ingredient) => (
                    <div key={ingredient.entryID} className = "entry-group">
                        <label>Name:</label>
                        <p>{ingredient.name}</p>
                        <label>Unit:</label>
                        <p>{ingredient.unit}</p>
                        <label>Quantity:</label>
                        <p>{ingredient.quantity}</p>
                    </div>
                ))) : (
                    <p>No Ingredients to display</p>
                )};
            </div>
            <div id = "preparationinfo-container" className="info-container">
                <h4>Preparation Steps</h4>
                {recipe.prepSteps.length > 0 ? (recipe.prepSteps.map((prepStep) => (
                    <div key = {prepStep.stepID} className = "entry-group">
                        <label>Step</label>
                        <p>{prepStep.stepNum}:</p>
                        <label>Instructions: </label>
                        <p>{prepStep.stepDesc}</p>
                    </div>
                ))) : (<p>No Preparation Steps to display</p>)}
            </div>

            <div id="commentinfo-container" className="info-container">
                <h4>Comments</h4>
                {recipe.comments.length > 0 ? (recipe.comments.map((comment) => (
                    <div key = {comment.commentID} className = "entry-group">
                        <label>Author</label>
                        <p>{comment.commentID}</p>
                        <label>Comment</label>
                        <p>{comment.commentContent}</p>
                        <label>Rating:</label>
                        <p>{comment.commentRating}</p>
                    </div>
                ))) : (<p>No Comments to display</p>)}
            </div>

            
                
            


        </div>
    );

}

export default ViewRecipe;