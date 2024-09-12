import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './ViewRecipes.css'
import Recipe from '../../objects/Recipe';
import User from '../../objects/User'


const backendUrl = process.env.REACT_APP_RECIPE_REPOSITORY_BACKEND_URL;
const getRecipesByAuthorIDUrl = process.env.REACT_APP_RECIPE_REPOSITORY_GET_RECIPES_BY_AUTHOR_ID;
const getFavoritedRecipesByUserIDUrl = process.env.REACT_APP_RECIPE_REPOSITORY_GET_FAVORITEDRECIPES_BY_USER_ID;
const getRecipesByRecipeIDsUrl = process.env.REACT_APP_RECIPE_REPOSITORY_GET_RECIPES_BY_RECIPE_IDS;

function ViewRecipes() {
    const navigate = useNavigate();
    const location = useLocation();

    const user = location.state?.user;
    const [recipe, setRecipe] = useState(null); //The recipe that the user will select to view
    
    function handleSetRecipe(selectedRecipe) {
        setRecipe(selectedRecipe);
        console.log("selectedRecipe", recipe);
    }

    console.log("User", user);

    //State to store the recipes retrieve from the backend
    const [recipes, setRecipes] = useState([]);

    //State to track the selected radio button
    const [selectedRecipeType, setSelectedRecipeType] = useState('');

    function toHome() {
        navigate("/home");
    }

    function navigateToViewRecipe(selectedRecipe) {
        console.log("SelectedRecipe", selectedRecipe);
        navigate("/viewrecipe", { state: { user: user, recipe: selectedRecipe} });
    }

    const handleAddedRecipesRadioInput = async (event) => {
        //Set the selected radio button. Make sure to put this first so the UI reflects changes without any delay.
        setSelectedRecipeType('added');
        
        console.log("Retrieving Added recipes by user");

        try {
            console.log("Sending Get Request for Added Recipes to Backend");
            const userIDString = user.userID.toString();
            
            //confirm the destination.
            const getAddedRecipesUrl = backendUrl + getRecipesByAuthorIDUrl + userIDString;
            console.log("getAddedRecipesUrl", getAddedRecipesUrl);

            //send the fetch request
            fetch(getAddedRecipesUrl).then(response => {
                //If we don't receive an ok response (200-299), print the error message
                if(!response.ok) {
                    throw new Error("Network response was not ok " + response.statusText);
                }

                //Handle retrieving the response. Catch error if one occurs
                return response.json().catch(err => {
                    console.error("Failed to parse JSON:", err);

                    throw new Error("Invalid JSON response");
                });

            //Handle the data returned from the fetch request
            }).then(data => {
                console.log("data retrieved from backend", data); //Log data from response

                //update the state with the retrieved recipes
                setRecipes(data);
            })

        } catch(error) {
            console.error("there was an issue retrieving the recipes added by user:", error);
        }
    };

    const handleFavoritedRecipesRadioInput = async (event) => {
         //Set the selected radio button state. Do this first so that the UI updates without delay.
         setSelectedRecipeType('favorited');
        
         console.log("Retrieving Favorited Recipes by user");

        var favoritedRecipesData; //Data from the favoritedRecipes Table will be held here.

        //get FavoritedRecipe Table
         try {
            console.log("Sending Get Request to get favorited recipes by userID")
            const userIDString = user.userID.toString();

            //confirm the destination
            const getFavoritedRecipesUrl = backendUrl + getFavoritedRecipesByUserIDUrl + userIDString;
            console.log("getFavoritedRecipes Table data", getFavoritedRecipesUrl);

            //send the fetch request
            await fetch(getFavoritedRecipesUrl).then(response => {
                //If we don't receive an ok response (200-299), print the error message.
                if(!response.ok) {
                    throw new Error("Network response was not ok " + response.statusText);
                }

                //Handle retrieving the response. Catch error if one occurs
                return response.json().catch(err => {
                    console.error("Failed to parse JSON:", err);

                    throw new Error("Invalid JSON response");

                });

            //Handle the data returned from the fetch request
            }).then(data => {
                console.log("data", data)

                favoritedRecipesData = data;
            })

        } catch(error) {
            console.error(error);
        }

        //Confirm we have the correct data from the favoritedRecipes Table
        console.log("favoritedRecipesData", favoritedRecipesData);


        //Iterate through favoritedRecipeData and compose a list of the recipeIDs we need
        var favoritedRecipeIDs = [];
        
        for(let i = 0; i < favoritedRecipesData.length; i++) {
            console.log("id to add", favoritedRecipesData[i].favoritedRecipeID)
            favoritedRecipeIDs.push(favoritedRecipesData[i].favoritedRecipeID);
        }

        //Confirm favoritedRecipeIDs has the correct data.
        console.log("favorited Recipe IDs", favoritedRecipeIDs);
        
        //Send the list to retrieve the recipes.
        try {
            console.log("Sending Get Request to get recipes by recipeIDs")

            //confirm destination
            const params = favoritedRecipeIDs.map(id => `favoritedRecipeIDs=${id}`).join('&');
            const getRecipesByRecipeIDsDestination = `${backendUrl}${getRecipesByRecipeIDsUrl}?${params}`;
            console.log("get recipes using multiple recipeIDs url", getRecipesByRecipeIDsDestination);


            
            //send the fetch request
            await fetch(getRecipesByRecipeIDsDestination, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            }).then(response => {
                //If we don't receive an ok response (200-299), print the error message.
                if(!response.ok) {
                    throw new Error("Network response was not ok " + response.statusText);
                }

                //Handle retrieving the response. Catch error if one occurs
                return response.json().catch(err => {
                    console.error("Failed to parse JSON:", err);

                    throw new Error("Invalid JSON response");

                });
            //Handle the data returned from the fetch request
            }).then(data => {
                //print data
                console.log("data retrieved from backend");


                //update the recipes state with the retrieved recipes
                setRecipes(data);
            })


        } catch(error) {
            console.error("There was an issue retrieving the favorited recipes", error);
        }

        //setRecipes([]);
    }

    return(
        <div className = "viewrecipes-container">
            <h2>View Recipes</h2>
            <div className="radioBtn-container">
                {/*Bind the checked state of each radio button to the selectedRecipeType state. Update selectedRecipeType when a radio button is clicked.*/}
                <input type="radio" id="added" name="recipeType" checked={selectedRecipeType === 'added'} onChange={handleAddedRecipesRadioInput}  value="added"/>
                <label htmlFor="added">Added Recipes</label>
                <input type="radio" id="favorited" name="recipeType" checked={selectedRecipeType === 'favorited'} onChange={handleFavoritedRecipesRadioInput} value="favorite"/>
                <label htmlFor="favorited">Favorited Recipes</label>
            </div>

            {/*Container for displaying the list of recipes */}
            <div className="recipe-listings">
                {recipes.length > 0 ? (
                    recipes.map((recipe) => (
                        <div key={recipe.recipeID} className="recipe-item">
                            <h3>{recipe.recipeTitle}</h3>
                            <p>{recipe.recipeDesc}</p>
                            <p>Rating: {recipe.rating}</p>
                            <button onClick={() => {navigateToViewRecipe(recipe)}}>Select</button>
                        </div>
                    ))
                ) : (
                    <p>No recipes to display</p>
                )}            
            </div>
        </div>

    );

}

export default ViewRecipes;