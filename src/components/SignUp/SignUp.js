import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignUp.css'

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

    function navigateToHome() {
        navigate("/home");
    }
    function NavigateToLogin() {
        navigate("/login");

    }
    
    const handleSignUpFormSubmit = async (event) => {
        const createUserDestinationUrl = backendUrl+createUserUrl;
        event.preventDefault();
        console.log("Submitting Form");

        console.log("username:", username);
        console.log("password:", password);
        console.log("confirmPassword:", confirmPassword);
        console.log("email", email);

        //Check to see if password & confirm passwords are equal
        console.log("password.localeCompare(confirmPassword):", password.localeCompare(confirmPassword));
        if(password.localeCompare(confirmPassword) != 0) {
            setErrorMessage('The passwords entered do not match. Please try again.')
            setPassword('');
            setConfirmPassword('');

            //Stop further code execution
            console.log('Password fields do not match ending code execution for signup form submission')
            return;
        }

        console.log("Sending Request to create new user to backend");

        //create the payload
        const payload = {
            username: username,
            password: password,
            email: email
        };

        console.log("payload", payload);

        try {
            console.log("Destination URL:", createUserDestinationUrl);

            //make the Post request to the Spring Boot endpoint
            const response = await fetch(createUserDestinationUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            //Check response status
            if(response.ok) {
                const data = await response.json();
                console.log('Create User is Successful')

                //Figure out what to do after user successfully created
                setErrorMessage('');
                setConfirmationMessage('User Created Successfully. Please Login.');
            } else {
                //handle errors here
                console.error('Creating User failed.')
                setErrorMessage('An error occurred. Please try again later.');
            }
        } catch(error) {
            console.error("Error: ", error);
        }

    };



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