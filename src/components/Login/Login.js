import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css'

const backendUrl = process.env.REACT_APP_RECIPE_REPOSITORY_BACKEND_URL;
const usernameUrl = process.env.REACT_APP_RECIPE_REPOSITORY_GET_USER_BY_USERNAME;


function Login() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(''); //state change for error message

    function navigateToSignUp() {
        navigate("/signup"); //Navigate to sign up page
    }

    function navigateToHome() {
        navigate("/home");
    }

    const handleLoginFormSubmit = async (event) => {
        event.preventDefault();
        console.log("inside handleLoginFormSubmit")
        console.log("input Username:", username);
        console.log("input Password:", password);

        //Send a get request to the spring backend to get user by username
        try {
            console.log("Sending Get request to Backend");
            const getUsernameURL = backendUrl+usernameUrl+username;
            console.log("getUsernameURL:", backendUrl+usernameUrl+username);

            fetch(getUsernameURL).then(response => {
                //If we don't receive an ok response (200-299), print the error message
                if(!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText)
                }

                
                return response.json().catch(err => {
                    //Handle the case where parsing JSON fails
                    console.error("Failed to parse JSON:", err);
                    
                    
                    setUsername('');
                    setPassword('');

                    setErrorMessage('The Username or Password entered was incorrect, please try again.')
                    throw new Error('Invalid JSON response');
                }); //returns the data returned from the endpoint and convert it into a Json object.
                //Handle the data returned from the endpoint
            }).then(data => {
                console.log(data); //Handle the data from the response.
                
                //perform username check
                if(username != data.username) {
                    console.log("usernames don't match");

                    //clear input fields
                    setUsername('');
                    setPassword('');

                    //print error message
                    setErrorMessage('The Username or Password entered was incorrect, please try again.')
                    return;
                }

                //perform password check
                if(password != data.password) {
                    console.log("passwords don't match")

                    //clear input fields
                    setUsername('');
                    setPassword('');

                    //print error message
                    setErrorMessage('The Username or Password entered was incorrect, please try again.')
                    return;
                }

                //Username & Password both match, navigate to Home Screen
                console.log("Username and passwords match");
                navigateToHome();

            }).catch(error => {
                console.error('There was a problem with the fetch operation', error);
            })


        } catch(error) {
            console.error('Error: ', error);
        }
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