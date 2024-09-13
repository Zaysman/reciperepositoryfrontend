
class JSONRequests {

    //The purpose of this method is to send a get request to the backend, handles the response and return the payload on an ok response.
    async sendGetRequest(destinationUrl) {
        console.log("sending fetch request to:", destinationUrl);

        try {
            const response = await fetch(destinationUrl, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            // If we don't receive an OK response (200-299), print the error message and throw a new error.
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }

            // If we get an OK response, return the response data in JSON format.
            const data = await response.json();
            return data;

        } catch (error) {
            console.error("There was an issue with the fetch operation:", error);
            throw error; // Re-throw the error so it can be handled by the caller
        }
    }

}

export default JSONRequests;