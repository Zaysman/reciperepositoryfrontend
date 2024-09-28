import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignUp.css'
import User from "../../objects/User";
import JSONRequests from "libraries/JSONRequests";

const backendUrl = process.env.REACT_APP_RECIPE_REPOSITORY_BACKEND_URL;
const createUserUrl = process.env.REACT_APP_RECIPE_REPOSITORY_POST_USER_URL; 


function SignUp() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [confirmationMessage, setConfirmationMessage] = useState('');
    const [user, setUser] = useState(null); //new state to track the user
    const [submitted, setSubmitted] = useState(false); //New state to track form submission

    const jsonRequest = new JSONRequests();


    //Urls
    const createUserDestinationUrl = backendUrl+createUserUrl;

    function navigateToHome() {
        navigate("/home");
    }

    function navigateToHome(user) {
        navigate("/home", { state : { user: user}});

    }

    function NavigateToLogin() {
        navigate("/login");

    }


    //UseEffect to handle sign up
    useEffect(() => {
        const signUpUser = async () => {

            if(!submitted) { //prevent execution before form submission
                return;
            }

            try {

                //Check to see if the data in the password fields match.
                console.log("Performing password check");
                if(password.localeCompare(confirmPassword) != 0) { //If the passwords are not equal, then print the error message
                    setErrorMessage('The passwords entered do not match. Please try again.')
                    setPassword('');
                    setConfirmPassword('');
        
                    //Stop further code execution
                    console.log('Password fields do not match ending code execution for signup form submission')
                    return;
                }

            
            //create the payload
            const payload = {
                username: username,
                password: password,
                email: email
            };

            console.log("payload", payload);

            //Send request to backend to create user
            const data = await jsonRequest.sendPostRequest(createUserDestinationUrl, payload);

            //Convert the data into a user object.
            const fetchedUser = new User(data.userID, data.username, data.password, data.email);
            setErrorMessage('');
            setConfirmationMessage('User Created Successfully.');
            
            setUser(fetchedUser);
            //Use another useEffect hook to handle navigation

            } catch(error) {
                console.error("There was an error when signing up the user", error);
                setErrorMessage(); 
                setSubmitted(false); //reset submission state
            }

        };
        signUpUser();

    }, [submitted]);

    //useEffect to handle navigation
    useEffect(() => {
        if(user) {
            navigate("/home", {state: {user: user}})
        }
    }, [user, navigate]); //Run effect when user or navigate changes

    
    const handleSignUpFormSubmit = async (event) => {
        event.preventDefault(); //Prevents the default operation of a form submssion. Which is reloading the page
        console.log("Inside handleSignUpFormSubmit");
        setSubmitted(true); //Set form as submitted to trigger useEffect.
    }


    return (
        <div className = "signup-container">
            <h2>Sign up</h2>
            <form className = "signup-form" onSubmit={handleSignUpFormSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Username:</label>
                    <input type="text" id="username" name="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input type="text" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm Password:</label>
                    <input type="text" id="confirmPassword" name="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input type="text" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>

                <button type="submit" className="signUpBtn">Sign Up</button>
            </form>
            <button className="cancelBtn" onClick={NavigateToLogin}>Cancel</button>
            {errorMessage && <div className="error-message">{errorMessage}</div>} {/* Conditionally render the error message */}
            {confirmationMessage && <div className="confirmation-message">{confirmationMessage}</div>} {/*Conditionally render the confirmation Error*/}
        </div>
    );

}

export default SignUp;