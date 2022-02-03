import axios from "axios";

const local = "http://localhost:5000";
const prod = "https://stark-basin-40795.herokuapp.com";

let httpClient = axios.create({
    baseURL: window.location.hostname === "localhost" ? local : prod,
    withCredentials: true,
    headers: {
        "content-type": "application/json",
    },
    crossDomain: true,
});

export default httpClient;