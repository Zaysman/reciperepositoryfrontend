import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; //npm install react-router-dom and imported this to allow for routing in the react project.

//Import pages
import EditRecipe from "./components/EditRecipe/EditRecipe";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Profile from "./components/Profile/Profile";
import SearchRecipe from './components/SearchRecipe/SearchRecipe';
import SignUp from './components/SignUp/SignUp';
import ViewRecipe from './components/ViewRecipe/ViewRecipe';
import ViewRecipes from './components/ViewRecipes/ViewRecipes';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path = "/" element = {<Login/>}/>
        <Route path = "/login" element = {<Login/>}/>
        <Route path = "/signup" element = {<SignUp/>}/>
        <Route path = "/editrecipe" element = {<EditRecipe/>}/>
        <Route path = "/home" element = {<Home/>}/>
        <Route path = "/profile" element = {<Profile/>}/>
        <Route path = "/searchrecipe" element = {<SearchRecipe/>}/>
        <Route path = "/viewrecipe" element = {<ViewRecipe/>}/>
        <Route path = "/viewrecipes" element = {<ViewRecipes/>}/>
        <Route path = "/editrecipe" element = {<EditRecipe/>}/>
      </Routes>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
