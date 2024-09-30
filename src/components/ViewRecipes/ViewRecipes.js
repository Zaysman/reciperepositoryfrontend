import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './ViewRecipes.css'
import Recipe from '../../objects/Recipe';
import User from '../../objects/User'
import JSONRequests from 'libraries/JSONRequests';

//Environment variables
const backendUrl = process.env.REACT_APP_RECIPE_REPOSITORY_BACKEND_URL;
const getRecipesByAuthorIDUrl = process.env.REACT_APP_RECIPE_REPOSITORY_GET_RECIPES_BY_AUTHOR_ID;
const getFavoritedRecipesByUserIDUrl = process.env.REACT_APP_RECIPE_REPOSITORY_GET_FAVORITEDRECIPES_BY_USER_ID;
const getRecipesByRecipeIDsUrl = process.env.REACT_APP_RECIPE_REPOSITORY_GET_RECIPES_BY_RECIPE_IDS;

function ViewRecipes() {
    const navigate = useNavigate();
    const location = useLocation();

    const user = location.state?.user;
    const [recipe, setRecipe] = useState(null); //The recipe type that the user will select to view
    
    const [recipes, setRecipes] = useState([]); //State to store the recipes retrieve from the backend
    const [selectedRecipeType, setSelectedRecipeType] = useState(''); //State to track the selected radio button

    const jsonRequests = new JSONRequests();
    const isFirstRender = useRef(true); //Ref to track if it's the 1st render

    console.log("User", user);
    const userIDString = user.userID.toString();

    

    //Urls
    const getAddedRecipesUrl = backendUrl + getRecipesByAuthorIDUrl + userIDString;
    const getFavoritedRecipesUrl = backendUrl + getFavoritedRecipesByUserIDUrl + userIDString;

    //useEffect hooks go here.

    //useEffect to handle when Added Recipes is added.
    useEffect(() => {
        const getAddedRecipes = async () => {

            if(isFirstRender.current) {
                //Skip the first render
                isFirstRender.current = false;
                console.log("selectedRecipeType on page load up: ", selectedRecipeType);
                return; //Halt execution of effect on initial render of the page.
            }

            //If the selectedRecipeType isn't 'added', have this effect return
            if(selectedRecipeType != 'added') {
                console.log("selectedRecipeType:", selectedRecipeType); //Log the recipe type.
                return; //Halt execution if the selectedRecipeType isn't added.
            }

            //confirm destination
            console.log("getAddedRecipesUrl", getAddedRecipesUrl);

            //send the fetch request and get the data
            const data = await jsonRequests.sendGetRequest(getAddedRecipesUrl);

            //Handle the data returned from the fetch request
            console.log("data retrieved from backend", data); //Log data from response

            //update the recipes state with the retrieved recipes
            setRecipes(data);
        };
        getAddedRecipes();
    }, [selectedRecipeType]);


    //useEffect to handle when Favorited Recipes is added.
    useEffect(() => {
        const getFavoriteRecipes = async () => {

            if(isFirstRender.current) {
                //Skip the first render
                isFirstRender.current = false;
                console.log("selectedRecipeType on page load up: ", selectedRecipeType);
                return; //Halt execution of effect on initial render of the page.
            }

            //If the selectedRecipeType isn't 'favorited', have the effect cease execution
            if(selectedRecipeType != 'favorited') {
                console.log("selectedRecipeType:", selectedRecipeType); //Log the recipe type.
                return; //Halt execution if the selectedRecipeType isn't added.
            }

            //confirm destination
            console.log("getFavoritedRecipes", getFavoritedRecipesUrl);

            //send the fetch request and get the data
            const data = await jsonRequests.sendGetRequest(getFavoritedRecipesUrl);

            //Handle the data returned from the fetch request
            console.log("data retrieved from backend", data);

            var favoritedRecipeIDs = []; //Iterate through favoritedRecipeData and compose a list of the recipeIDs we need

            for(let i = 0; i < data.length; i++) {
                favoritedRecipeIDs.push(data[i].favoritedRecipeID);
            }

            //Confirm favoritedRecipeIDs has the correct data.
            console.log("favorited Recipe IDs", favoritedRecipeIDs);

            try {
                console.log("Sending Get Request to get favorite recipes by recipeIDs");

                //confirm destination
                const params = favoritedRecipeIDs.map(id => `favoritedRecipeIDs=${id}`).join('&');
                const getRecipesByRecipeIDsDestination = `${backendUrl}${getRecipesByRecipeIDsUrl}?${params}`;
                console.log("get recipes using multiple recipeIDs url", getRecipesByRecipeIDsDestination);

                const favoriteRecipeData = await jsonRequests.sendGetRequest(getRecipesByRecipeIDsDestination);
                setRecipes(favoriteRecipeData);


            } catch(error) {
                console.error("There was an issue retrieving the favorited recipes", error);
            }

            //update the recipes state with the retrieved recipes
            //setRecipes(data);
        };
        getFavoriteRecipes();
    }, [selectedRecipeType]) //Use this effect when the selected Recipe Type changes



    function toHome() {
        navigate("/home");
    }

    function navigateToViewRecipe(selectedRecipe) {
        console.log("SelectedRecipe", selectedRecipe);
        navigate("/viewrecipe", { state: { user: user, recipe: selectedRecipe} });
    }

    const handleAddedRecipesRadioInput = async (event) => {
        setSelectedRecipeType('added');
        console.log("Retrieving Added recipes by user");
    }

    const handleFavoritedRecipesRadioInput = async (event) => {
        setSelectedRecipeType('favorited');
        console.log("Retrieving Added recipes by user");
    }

    return(
        <div className = "viewrecipes-container">
            <h2>View Recipes</h2>
            <div className="radioBtn-container">
                {/*Bind the checked state of each radio button to the selectedRecipeType state. Update selectedRecipeType when a radio button is clicked.*/}
                {<input type="radio" id="added" name="recipeType" checked={selectedRecipeType === 'added'} onChange={handleAddedRecipesRadioInput}  value="added"/>
                }
                <label htmlFor="added">Added Recipes</label>
                {<input type="radio" id="favorited" name="recipeType" checked={selectedRecipeType === 'favorited'} onChange={handleFavoritedRecipesRadioInput} value="favorite"/>
                }
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