import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import './Profile.css'
//import User from "../../objects/User";
import User from "objects/User";
import JSONRequests from "libraries/JSONRequests";


const backendUrl = process.env.REACT_APP_RECIPE_REPOSITORY_BACKEND_URL;
const updateUserUrl = process.env.REACT_APP_RECIPE_REPOSITORY_PUT_USER_URL;

function Profile() {
    

    const navigate = useNavigate();
    const location = useLocation();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [confirmationMessage, setConfirmationMessage] = useState('');
    const [user, setUser] = useState(null);
    const [submitted, setSubmitted] = useState(false); //New state to track form submission

    const jsonRequests = new JSONRequests();

    let stateUser = location.state?.user; //retrieve the user data from location.
    console.log("user profile to edit", stateUser);


    //Urls
    const userIDString = stateUser.userID.toString();
    const updateUserDestinationUrl = backendUrl + updateUserUrl + userIDString;

    // const updateUserDestinationUrl = backendUrl + updateUserUrl + userIDString;
    // console.log("updateUserDestinationUrl", updateUserDestinationUrl);

    //Set values to user values passed from Home
    useEffect(() => {
        if(stateUser) {
            setUser(stateUser);
            setUsername(stateUser.username || '');
            setPassword(stateUser.password || '');
            setEmail(stateUser.email || '');
        }
    }, [stateUser]); //Use this hook whenever stateUser changes

    function toHome() {
        navigate("/home", {state : {user: stateUser}});
    }

    //useEffect to handle updating the user's data
    useEffect(() => {
        const updateUser = async () => {
            
            if(!submitted) { //prevent execution before form submission
                return ;
            }
            try {
            //Create the payload
            const payload = {
                username: username,
                password: password,
                email: email
            };

            console.log("payload", payload);

            //Send PUT request to the backend.
            const data = await jsonRequests.sendPutRequest(updateUserDestinationUrl, payload);
            

            stateUser = new User(data.userID, data.username, data.password, data.email)
            setErrorMessage('');
            setConfirmationMessage('User Updated Successfully');
            } catch(error) {
                console.error("There was an error when updating the user", error);
                setErrorMessage("There was an error when updating the user. Please try again later");
                setConfirmationMessage('');
                setSubmitted(false); //reset submission state
            }
        }
        updateUser();

    }, [submitted]); //Run this effect when the submitted state changes.

    const handleEditProfileFormSubmit = async (event) => {
        event.preventDefault(); //Prevents the default form submission behavior
        console.log("Inside handleEditProfileFormSubmit");
        setSubmitted(true); //Set form as submitted to trigger useEffect.
    }


    return (
        <div className = "profile-container">
            {/*<label>This is the edit profile screen</label>
            <button onClick = {toHome}>To Home</button> */}
            <h2>Edit Profile</h2>
            <form className = "editProfile-form" onSubmit={handleEditProfileFormSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Username:</label>
                    <input type="text" id="username" name="username" value={username} onChange={(e) => setUsername(e.target.value)}/>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input type="text" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input type="text" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                </div>

                <button type="submit" className="submitBtn">Update Profile</button>
            </form>
            <button className="homeBtn" onClick={toHome}>Return Home</button>
            {errorMessage && <div className="error-message">{errorMessage}</div>} {/* Conditionally render the error message */}
            {confirmationMessage && <div className="confirmation-message">{confirmationMessage}</div>} {/*Conditionally render the confirmation Error*/}

        </div>
    );

}

export default Profile;