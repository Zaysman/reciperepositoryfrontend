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
            
            if(!submitted) { //prevent executione before form submission.
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
                console.error("There was an error sending a get request to the backend to retrieve user data based on submitted username.");
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
    //Lambda Expression that handles when the login logic when user clicks the button.
    // const handleLoginFormSubmit = async (event) => {
    //     event.preventDefault();
    //     console.log("inside handleLoginFormSubmit")
    //     console.log("input Username:", username);
    //     console.log("input Password:", password);

    //     //Send a get request to the spring backend to get user by username
    //     try {
    //         console.log("Sending Get request to Backend");
            
    //         console.log("getUsernameURL:", backendUrl+usernameUrl+username);

    //         fetch(getUsernameURL).then(response => {
    //             //If we don't receive an ok response (200-299), print the error message
    //             if(!response.ok) {
    //                 throw new Error('Network response was not ok ' + response.statusText)
    //             }

                
    //             return response.json().catch(err => {
    //                 //Handle the case where parsing JSON fails
    //                 console.error("Failed to parse JSON:", err);
                    
                    
    //                 setUsername('');
    //                 setPassword('');

    //                 setErrorMessage('The Username or Password entered was incorrect, please try again.')
    //                 throw new Error('Invalid JSON response');
    //             }); //returns the data returned from the endpoint and convert it into a Json object.
    //             //Handle the data returned from the endpoint
    //         }).then(data => {
    //             console.log(data); //Handle the data from the response.
    //             const user = new User(data.userID, data.username, data.password, data.email);
                
    //             //perform username check
    //             if(username != data.username) {
    //                 console.log("usernames don't match");

    //                 //clear input fields
    //                 setUsername('');
    //                 setPassword('');

    //                 //print error message
    //                 setErrorMessage('The Username or Password entered was incorrect, please try again.')
    //                 return;
    //             }

    //             //perform password check
    //             if(password != data.password) {
    //                 console.log("passwords don't match")

    //                 //clear input fields
    //                 setUsername('');
    //                 setPassword('');

    //                 //print error message
    //                 setErrorMessage('The Username or Password entered was incorrect, please try again.')
    //                 return;
    //             }

    //             //Username & Password both match, navigate to Home Screen
    //             console.log("Username and passwords match");
    //             navigateToHome(user);

    //         }).catch(error => {
    //             console.error('There was a problem with the fetch operation', error);
                
    //         })

    //     } catch(error) {
    //         console.error('Error: ', error);
    //     }
    // }

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