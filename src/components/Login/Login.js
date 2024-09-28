import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css'
//import User from "../../objects/User";
import User from "objects/User";
import JSONRequests from "libraries/JSONRequests";


const backendUrl = process.env.REACT_APP_RECIPE_REPOSITORY_BACKEND_URL;
const usernameUrl = process.env.REACT_APP_RECIPE_REPOSITORY_GET_USER_BY_USERNAME;


function Login() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(''); //state change for error message
    const [submitted, setSubmitted] = useState(false); //New state to track form submission
    const [user, setUser] = useState(null);
    
    const jsonRequests = new JSONRequests();

    //Urls
    const getUsernameURL = backendUrl+usernameUrl+username;

    //Navigate functions
    function navigateToSignUp() {
        navigate("/signup"); //Navigate to sign up page
    }

    function navigateToHome() {
        navigate("/home");
    }

    function navigateToHome(user) {
        navigate("/home", { state : { user: user}});
    }

    //UseEffect to handle login
    useEffect(() => {
        const loginUser = async () => {
            
            if(!submitted) { //prevent execution before form submission.
                return; 
            }

            try {
                console.log("Sending Get request to Backend");
                console.log("getUsernameUrl:", getUsernameURL);

                const data = await jsonRequests.sendGetRequest(getUsernameURL); //The jsonRequests object returns the data if we recieve an ok response.

                const fetchedUser = new User(data.userID, data.username, data.password, data.email); //Convert the json data we recieved from

                //perform username and password checks
                if(username !== data.username || password !== data.password) {
                    console.log("Usernames or passwords don't match");
                    setErrorMessage('The Username or Password entered was incorrect, please try again');
                    setSubmitted(false);
                    setUsername('');
                    setPassword('');
                    return;
                }

                //If username and password match, navigate to the home screen
                console.log("Username and passwords match");
                setUser(fetchedUser);

            } catch(error) {
                console.error("There was an error sending a get request to the backend to retrieve user data based on submitted username.", error);
                setErrorMessage('Login failed. Please try again.');
                setSubmitted(false); // Reset submission state
            }

        };
        loginUser();

    }, [submitted]); //Run effect when 'submitted' changes.

    useEffect(() => {
        if(user) {
            navigate("/home", {state: {user : user}})
        }
    }, [user, navigate]); //Run effect when user and navigate changes.


    const handleLoginFormSubmit = (event) => {
        event.preventDefault(); //Prevents the default operation of a form submission. Which is reloading the page.
        console.log("Inside handleLoginFormSubmit");
        setSubmitted(true); //Set form as submitted to trigger useEffect
    }
    

    return (
    <div className = "login-container">
        {/*<button onClick={toSignUp}>To SignUp</button>*/}
        {/*<button onClick={navigateHome}>To Home</button>*/}

        <h2>Login</h2>
        <form className="login-form" onSubmit={handleLoginFormSubmit}> 
            <div className="form-group">
                <label htmlFor="username">Username:</label>
                <input type="text" id="username" name="username" value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div className="form-group">
                <label htmlFor="password">Password:</label>
                <input type="text" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <button type="submit" className="loginBtn">Login</button>
        </form>
            <button className="signUpBtn" onClick={navigateToSignUp}>SignUp</button>

        {errorMessage && <div className="error-message">{errorMessage}</div>} {/* Conditionally render the error message */}
    </div>
    );

}

export default Login;