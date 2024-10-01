import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './EditRecipe.css'
import JSONRequests from "libraries/JSONRequests";
import User from "objects/User"

//Environment variables
const backendUrl = process.env.REACT_APP_RECIPE_REPOSITORY_BACKEND_URL;
const userByUserIDUrl = process.env.REACT_APP_RECIPE_REPOSITORY_GET_USER_BY_USERID;


function EditRecipe() {
    const navigate = useNavigate();
    const location = useLocation();
    const jsonRequests = new JSONRequests();

    //Check to see if User and recipe were retrieved from ViewRecipe Component
    const { user, recipe} = location.state || {};

    console.log("User:", user);
    console.log("Recipe:", recipe);

    //states
    const [recipeAuthor, setRecipeAuthor] = useState(""); //State to hold the recipe author

    //Urls
    const getRecipeAuthorUrl = backendUrl + userByUserIDUrl + recipe.authorID.toString();
    
    
    //useEffect to retrieve author
    useEffect(() => {
        const fetchRecipeAuthor = async () => {
            try {
                //send the fetch request and get the data
                const data = await jsonRequests.sendGetRequest(getRecipeAuthorUrl);

                //Log data
                console.log("Recipe Author data retrieved from backend", data);

                //update the recipe author state with data.
                setRecipeAuthor(data.username);

            } catch(error) {
               console.error("Error fetching the Recipe Author Data", error); 
            }
        };
        fetchRecipeAuthor();
    }, [recipeAuthor]);


    function navigateToViewRecipe() {
        navigate("/viewrecipe", {state: {user: user, recipe: recipe}});
    }

    return (
        <div className = "editrecipe-container">
            <label>This is the edit recipe screen</label>
            <button onClick = {navigateToViewRecipe}>To View Recipe</button>

            <h2>Edit Recipe</h2>
            <h4>{recipe.recipeTitle}</h4>
            <div id="navigationBtn-container" className="entry-group">
                <p>Navigation Buttons Go Here</p>
            </div>
            <div id ="recipeinfo-container" className="info-container">
                 <h4>Recipe Info</h4>
                 <div className = "entry-group">
                    <label>Author:</label>
                    <p>{recipeAuthor
                        }</p>
                 </div>
                 <div className = "entry-group">
                    <label>Description:</label>
                    <p>{recipe.recipeDesc}</p>
                 </div>
                 <div className = "entry-group">
                    <label>Cuisine Type:</label>
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
                    <label>Difficulty:</label>
                    <p>{recipe.difflvl}</p>
                 </div>
            </div>
            <div id="nutritioninfo-container" className="info-container">
                <h4>Nutritional Info</h4>
                <div className = "entry-group">
                    <label>Calories:</label>
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
                    <label>Cholesterol:</label>
                    <p>{recipe.nutritionInfo.cholesterol}</p>
                </div>
                <div className = "entry-group">
                    <label>Sodium:</label>
                    <p>{recipe.nutritionInfo.sodium}</p>
                </div>
                <div className = "entry-group">
                    <label>Carbs:</label>
                    <p>{recipe.nutritionInfo.carbs}</p>
                </div>
                <div className = "entry-group">
                    <label>Protein:</label>
                    <p>{recipe.nutritionInfo.protein}</p>
                </div>
                <div className = "entry-group">
                    <label>Vitamin A:</label>
                    <p>{recipe.nutritionInfo.vitaminA}</p>
                </div>
                <div className = "entry-group">
                    <label>Vitamin C:</label>
                    <p>{recipe.nutritionInfo.vitaminC}</p>
                </div>
                <div className = "entry-group">
                    <label>Vitamin D:</label>
                    <p>{recipe.nutritionInfo.vitaminD}</p>
                </div>
                <div className = "entry-group">
                    <label>Calcium:</label>
                    <p>{recipe.nutritionInfo.calcium}</p>
                </div>
                <div className = "entry-group">
                    <label>Iron:</label>
                    <p>{recipe.nutritionInfo.iron}</p>
                </div>
                <div className = "entry-group">
                    <label>Potassium:</label>
                    <p>{recipe.nutritionInfo.potassium}</p>
                </div>
            </div>
            
            <div id = "ingredientsinfo-container" className="info-container">
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
                <h4>Prepartion Steps</h4>
                {recipe.prepSteps.length > 0 ? (recipe.prepSteps.map((prepStep) => (
                    <div key = {prepStep.stepID} className = "entry-group">
                        <label>Step:</label>
                        <p>{prepStep.stepNum}:</p>
                        <label>Instructions: </label>
                        <p>{prepStep.stepDesc}</p>
                    </div>
                ))) : (
                    <p>No Preparation Steps to display</p>
                )}
            </div>

            <div id = "commentinfo-container" className="info-container">
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
                ))) : (
                    <p>No Comments to display</p>
                    )}

            </div>


            

        </div>
    );

}

export default EditRecipe;