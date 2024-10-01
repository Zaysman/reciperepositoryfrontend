import React, { useState, useEffect } from 'react';
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
const userByUserIDUrl = process.env.REACT_APP_RECIPE_REPOSITORY_GET_USER_BY_USERID;

function ViewRecipe() {
    const navigate = useNavigate();
    const location = useLocation();
    const jsonRequests = new JSONRequests(); // instantiate instance of JSONRequests class

    //Check to see if User and recipe where retrieved from ViewRecipes component correctly
    const { user, recipe } = location.state || {};
    console.log("User:", user);
    console.log("Recipe:", recipe);

    //Use state to store author details
    const [recipeAuthor, setRecipeAuthor] = useState("");
    const [isLoading, setIsLoading] = useState(true); //Track loading status for all data


    //Urls
    const recipeIDString = recipe.recipeID.toString();
    const getRecipeAuthorUrl = backendUrl + userByUserIDUrl + recipe.authorID.toString();
    const getIngredientsURL = backendUrl + ingredientsByRecipeIDUrl + recipeIDString;
    const getStepsUrl = backendUrl + stepsByRecipeIDUrl + recipeIDString;
    const getCommentsUrl = backendUrl + commentsByRecipeIDUrl + recipeIDString;
    const getNutritionInfoUrl = backendUrl + nutritionInfoByrecipeIDUrl + recipeIDString;


    //useEffect for fetching all data at once
    useEffect(() => {
        const fetchAllData = async () => {
            try {
            //Fetch all data in parallel
            const [authorData, ingredients, prepSteps, comments, nutritionInfo] = await Promise.all([
                jsonRequests.sendGetRequest(getRecipeAuthorUrl),
                jsonRequests.sendGetRequest(getIngredientsURL),
                jsonRequests.sendGetRequest(getStepsUrl),
                jsonRequests.sendGetRequest(getCommentsUrl),
                jsonRequests.sendGetRequest(getNutritionInfoUrl)
            ]);

            //Set fetched data into the recipe object
            setRecipeAuthor(authorData.username);
            recipe.ingredients = ingredients;
            recipe.prepSteps = prepSteps;
            recipe.comments = comments;
            recipe.nutritionInfo = nutritionInfo;

            //Once all data is fetched, disable the loading state
            setIsLoading(false);
        } catch(error) {
            console.error("Error fetching recipe data:", error);
            //In case of error, you might still want to stop loading
            setIsLoading(false);
        }
    };
        fetchAllData(); //Call the function when the component mounts
    }, [getRecipeAuthorUrl, getIngredientsURL, getStepsUrl, getCommentsUrl, getNutritionInfoUrl]);
    

    function navigateToViewRecipes() {
        navigate("/viewrecipes", {state : {user: user}});
    }

    function navigateToSearchRecipes() {
        navigate("/searchrecipe", {state: {user: user}});
    }

    function navigateToEditRecipe() {
        navigate("/editrecipe", {state: {user: user, recipe: recipe}});
    }

    //Conditional rendering based on loading state
    if(isLoading) {
        return <div>Loading...</div> //Consider replacing this with a spinner comment later.
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
            <div id="navigationBtn-container" className="entry-group">
                <button onClick = {navigateToViewRecipes} className="centered-button">To view recipes</button>
                <button onClick = {navigateToEditRecipe} className="centered-button">To Edit Recipe</button>
            </div>
            <div id="recipeinfo-container" className="info-container">
                <h4>Recipe Info</h4>
                <div className = "entry-group">
                    <label>Author:</label>
                    <p>{recipeAuthor}</p>
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

            <div id="nutritioninfo-container" className="info-container">
                <h4>Nutritional Info</h4>
                <div className = "entry-group">
                    <label>Calories</label>
                    <p>{recipe.nutritionInfo && recipe.nutritionInfo.calories ? recipe.nutritionInfo.calories : "N/A"}</p> {/*Check if recipe.nutritionInfo and recipe.nutritionInfo is defined. If Not, print N/A */}
                </div>
                <div className = "entry-group">
                    <label>Saturated Fat</label>
                    <p>{recipe.nutritionInfo && recipe.nutritionInfo.satFat ? recipe.nutritionInfo.satFat : "N/A"}</p>
                </div>
                <div className = "entry-group">
                    <label>Trans Fat</label>
                    <p>{recipe.nutritionInfo && recipe.nutritionInfo.transFat ? recipe.nutritionInfo.transFat : "N/A"}</p>
                </div>
                <div className = "entry-group">
                    <label>Cholesterol</label>
                    <p>{recipe.nutritionInfo && recipe.nutritionInfo.cholesterol ? recipe.nutritionInfo.cholesterol : "N/A"}</p>
                </div>
                <div className = "entry-group">
                    <label>Sodium</label>
                    <p>{recipe.nutritionInfo && recipe.nutritionInfo.sodium ? recipe.nutritionInfo.sodium : "N/A"}</p>
                </div>
                <div className = "entry-group">
                    <label>Carbs</label>
                    <p>{recipe.nutritionInfo && recipe.nutritionInfo.carbs ? recipe.nutritionInfo.carbs : "N/A"}</p>
                </div>
                <div className = "entry-group">
                    <label>Protein</label>
                    <p>{recipe.nutritionInfo && recipe.nutritionInfo.protein ? recipe.nutritionInfo.protein : "N/A"}</p>
                </div>
                <div className = "entry-group">
                    <label>Vitamin A</label>
                    <p>{recipe.nutritionInfo && recipe.nutritionInfo.vitaminA ? recipe.nutritionInfo.vitaminA : "N/A"}</p>
                </div>
                <div className = "entry-group">
                    <label>vitamin C</label>
                    <p>{recipe.nutritionInfo && recipe.nutritionInfo.vitaminC ? recipe.nutritionInfo.vitaminC : "N/A"}</p>
                </div>
                <div className = "entry-group">
                    <label>vitamin D</label>
                    <p>{recipe.nutritionInfo && recipe.nutritionInfo.vitaminD ? recipe.nutritionInfo.vitaminD : "N/A"}</p>
                </div>
                <div className = "entry-group">
                    <label>Calcium</label>
                    <p>{recipe.nutritionInfo && recipe.nutritionInfo.calcium ? recipe.nutritionInfo.calcium : "N/A"}</p>
                </div>
                <div className = "entry-group">
                    <label>Iron</label>
                    <p>{recipe.nutritionInfo && recipe.nutritionInfo.iron ? recipe.nutritionInfo.iron : "N/A"}</p>
                </div>
                <div className = "entry-group">
                    <label>Potassium</label>
                    <p>{recipe.nutritionInfo && recipe.nutritionInfo.potassium ? recipe.nutritionInfo.potassium : "N/A"}</p>
                </div>
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
                )}
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
                        <p>{comment.authorID}</p>
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