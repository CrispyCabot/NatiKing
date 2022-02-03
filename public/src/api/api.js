import axios from "axios";

const local = "http://localhost:5000";
const prod = "https://stormy-cove-30343.herokuapp.com";

let httpClient = axios.create({
    baseURL: window.location.hostname === "localhost" ? local : prod,
    withCredentials: true,
    headers: {
        "content-type": "application/json",
    },
    crossDomain: true,
});

export default httpClient;