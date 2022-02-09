const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {
    createAccessToken,
    createJRTEM,
    sendRefreshToken,
} = require("./utils/authorization");
const sendNotification = require("./utils/send-notification");
const deleteNotification = require("./utils/delete-notification");
const authChecker = require("./utils/auth-checker");
const defaultStats = require("./utils/default-stats");

const Users = require("../models/user-model");
// Auth Setters
router.route("/refresh_token").post((req, res) => {
    const token = req.cookies.jrtem;
    if (!token) return res.send({ ok: false, accessToken: "" });

    let decodedPayload = null;
    try {
        decodedPayload = jwt.verify(token, process.env.JRTEM_KEY);
    } catch (err) {
        return res.send({ ok: false, accessToken: "" });
    }

    Users.findOne({ _id: decodedPayload.userId }).then((user) => {
        if (!user || user.token_version !== decodedPayload.tokenVersion)
            return res.send({ ok: false, accessToken: "" });
        sendRefreshToken(req, res, createJRTEM(user));
        res.send({ ok: true, accessToken: createAccessToken(user), user: user });
    });
});

// User Setters
router.route("/users/create").post(async(req, res) => {
    const { email, password, name } = req.body;
    const hashedPassword = await bcrypt.hash(
        String(password),
        Number(process.env.SALT_ROUNDS)
    );
    const doesUserEmailExist = await Users.exists({ email: email });
    if (!doesUserEmailExist) {
        const re =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const isValidEmail = re.test(String(email).toLowerCase());
        if (!isValidEmail) {
            res.json({
                user: response,
                status: 400,
                message: "Email provided is invalid...",
            });
        } else {
            const user = await Users.create({
                email: email,
                password: hashedPassword,
                name: name,
                socials: [],
                image_path: "default.png",
                is_admin_user: false,
                bio: "No bio created",
                access_level: 1,
                token_version: 0,
            });
            const accessToken = createAccessToken(user);
            sendRefreshToken(req, res, createJRTEM(user));
            res.json({
                user: user,
                accessToken: accessToken,
                status: 200,
                message: "Successfully made an account",
            });
        }
    } else {
        res.json({ status: 400, message: "This email is already in use..." });
    }
});
router.route("/users/login").post(async(req, res) => {
    const { email, password } = req.body;
    const doesUserEmailExist = await Users.exists({ email: email });
    // await Users.updateMany({}, { $set: { selected_league_schedules: ['All'] } })
    if (doesUserEmailExist) {
        const re =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const isValidEmail = re.test(String(email).toLowerCase());
        if (!isValidEmail) {
            res.json({
                user: response,
                status: 400,
                message: "Email provided is invalid...",
            });
        } else {
            const userWithEmail = await Users.findOne({ email: email });
            const passwordMatches = await bcrypt.compare(
                password,
                userWithEmail.password
            );
            if (passwordMatches) {
                const accessToken = createAccessToken(userWithEmail);
                sendRefreshToken(req, res, createJRTEM(userWithEmail));
                res.json({
                    user: userWithEmail,
                    accessToken: accessToken,
                    status: 200,
                    message: "Successfully logged into account",
                });
            } else {
                res.json({
                    status: 400,
                    message: "Password provided for this account was incorrect...",
                });
            }
        }
    } else {
        res.json({ status: 400, message: "No account with this email..." });
    }
});
router.route("/users/logout").post(async(req, res) => {
    sendRefreshToken(req, res, "");
    res.send({
        status: 200,
        message: "Successfully logged out...",
    });
});

const Posts = require("../models/post-model");
//Post setters
router.route("/posts/create").post(async(req, res) => {
    const { ownerID, title, description, tags } = req.body;

    const post = await Posts.create({
        owner_id: ownerID,
        title: title,
        description: description,
        tags: tags,
        image_path: "default.png",
        likes: [],
        comments: [],
        date: Date.now(),
    });

    res.json({
        post: post,
        status: 200,
        message: "Successfully created post",
    });
});

router.route("/posts/delete").post(authChecker, async(req, res) => {
    const { postId } = req.body;

    const doesPostExist = await Posts.exists({ _id: postId });
    if (!doesPostExist) {
        res.json({ status: 400, message: "League does not exist" });
    } else {
        await Posts.deleteOne({ _id: postId });

        res.json({ status: 200, message: "Article successfully deleted" });
    }
});

module.exports = router;