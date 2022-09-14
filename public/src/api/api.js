import axios from "axios";

const local = "http://localhost:5000/api";
const prod = "https://nati-king-crispycabot.vercel.app/api";

let httpClient = axios.create({
    baseURL: window.location.hostname === "localhost" ? local : prod,
    withCredentials: true,
    headers: {
        "content-type": "application/json",
    },
    crossDomain: true,
});

export default httpClient;