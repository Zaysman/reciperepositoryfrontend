import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import './Profile.css'
import User from "../../objects/User";


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

    let user = location.state?.user;
    console.log("user profile to edit", user);
    // const userIDString = user.userID.toString();

    // const updateUserDestinationUrl = backendUrl + updateUserUrl + userIDString;
    // console.log("updateUserDestinationUrl", updateUserDestinationUrl);

    //Set values to user values passed from Home
    useEffect(() => {
        if(user) {
            setUsername(user.username || '');
            setPassword(user.password || '');
            setEmail(user.email || '');
        }
    }, [user]);

    function toHome() {
        navigate("/home", {state : {user: user}});
    }

    const handleEditProfileFormSubmit = async (event) => {
        event.preventDefault(); //Prevent default form submission behavior
        const userIDString = user.userID.toString();
        const updateUserDestinationUrl = backendUrl + updateUserUrl + userIDString;
        console.log("updateUserDestinationUrl", updateUserDestinationUrl);

        //Create the payload
        const payload = {
            username: username,
            password: password,
            email: email
        };

        console.log("payload", payload);

        try {
            console.log("Put Request Destination URL:", updateUserDestinationUrl);
            
            //Make the Put request to the Spring Boot endpoint
            const response = await fetch(updateUserDestinationUrl, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            //Check response status
            if(response.ok) {
                const data = await response.json();
                console.log('Update User is Successful')
                user = new User(data.userID, data.username, data.password, data.email)
                setConfirmationMessage('User Updated Successfully');
            
            } else {
                //handle errors here
                console.error('Updating User failed.');
                setErrorMessage('An error occurred. Please try again later.');
            }
        
        } catch(error) {
            console.error("An error occurred while processing the put request", error);
        }


    };

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