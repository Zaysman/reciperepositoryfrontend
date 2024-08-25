
class User {

    constructor(userID, username, password, email) {
        this.userID = userID;
        this.username = username;
        this.password = password
        this.email = email;
    }

    //Accessors & Modifier methods
    getUserID() {
        return this.userID;
    }

    setUserID(userID) {
        this.userID = userID;
    }

    getUsername() {
        return this.username;
    }

    setUsername(username) {
        this.username = username;
    }

    getPassword() {
        return this.password;
    }

    setPassword(password) {
        this.password = password;
    }

    getEmail() {
        return this.email;
    }

    setEmail(email) {
        this.email = email;
    }


    
    
}