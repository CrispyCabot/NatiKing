const cookieParser = require("cookie-parser");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const allowedOrigins = [
    "http://127.0.0.1:8080",
    "http://localhost:8080",
    "http://localhost:8081",
    "http://localhost:5000",
    "http://localhost:5001",
    "http://www.natiking.com",
    "https://www.natiking.com",
    "http://natiking.com",
    "https://natiking.com",
    "www.natiking.com",
    "natiking.com",
    "https://stark-basin-40795.herokuapp.com",
    "https://jamenwalz.github.io",
];
app.use(
    cors({
        origin: [...allowedOrigins],
        credentials: true,
    })
);
app.use(bodyParser.json({ limit: "1000mb" }));
app.use(bodyParser.urlencoded({ limit: "1000mb", extended: false }));
app.use(cookieParser()); // process.env.COOKIE_SECRET set secret as env var
app.use(express.json());

// Mongoose methods
const uri = `mongodb+srv://natiking:${encodeURI(
  process.env.MONGO_ATLAS_PASSWORD
)}@cluster0.aw5gd.mongodb.net/${encodeURI(
  process.env.MONGO_ATLAS_DB
)}?retryWrites=true&w=majority`;
mongoose.connect(
    uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    },
    function(error) {
        if (error) console.log(error);
        else console.log("Connected to DB");
    }
);

// Express endpoints setup
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
app.use(express.static("front-end"));
app.use(function(req, res, next) {
    // Request methods you wish to allow
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.setHeader("Access-Control-Allow-Origin", origin);
    }
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, OPTIONS, PUT, PATCH, DELETE"
    );
    res.setHeader("Access-Control-Allow-Headers", "*");
    res.setHeader("Access-Control-Allow-Credentials", true);
    // Pass to next layer of middleware
    next();
});

// Default route to log when connected to db
app.get("/", (req, res) => {
    console.log("Route / recieved");
    res.send("Connected");
});

// Routes
const router = express.Router();
const getters = require("./routes/getters");
const setters = require("./routes/setters");
const mutators = require("./routes/mutators");
app.use(router.use("/api/", getters));
app.use(router.use("/api/", setters));
app.use(router.use("/api/", mutators));

app.route("/*").get(function(req, res) {
    res.sendFile(path.join(__dirname + "/front-end/index.html"));
});

// const mock_getters = require("./routes/mock-routes/getters");
// const mock_setters = require("./routes/mock-routes/setters");
// const mock_mutators = require("./routes/mock-routes/mutators");
// app.use(router.use('/', mock_getters))
// app.use(router.use('/', mock_setters))
// app.use(router.use('/', mock_mutators))