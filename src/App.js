import logo from './logo.svg';
import './App.css';
import {Routes, Route} from 'react-router-dom';
import EditRecipe from "./components/EditRecipe/EditRecipe";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Profile from "./components/Profile/Profile";
import SearchRecipe from './components/SearchRecipe/SearchRecipe';
import SignUp from './components/SignUp/SignUp';
import ViewRecipe from './components/ViewRecipe/ViewRecipe';
import ViewRecipes from './components/ViewRecipes/ViewRecipes';



function App() {
  return (
    <div>
      {/* <Routes>
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
      </Routes> */}
    </div>
  );
}

export default App;
