import axios from "axios";
const getHeaders = () => {
    const token = localStorage.getItem("token");
    
    // Create an empty headers object
    const headers = {};
    
    // Check if the token exists, if so set the Authorization header
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }
    
    return headers;
};
export default axios.create({
    // const token = localStorage.getItem("token")
    baseURL: 'http://167.172.151.37:8002/api',

    headers: getHeaders(),

});


