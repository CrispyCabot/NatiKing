const router = require("express").Router();
const bcrypt = require("bcryptjs");
const authChecker = require("./utils/auth-checker");

const Users = require("../models/user-model");
const Posts = require("../models/post-model");

router.route("/users/update-profile").put(authChecker, async(req, res) => {
    const { userId, updates } = req.body;
    const preUpdatePlayer = await Users.findOne({ _id: userId });
    let updatedUser = false;

    // Hash password if password is present on updates
    if (updates.password && updates.password == updates.confirm_password) {
        updates.password = await bcrypt.hash(
            String(updates.password),
            Number(process.env.SALT_ROUNDS)
        );
        delete updates.confirm_password;
    } else {
        delete updates.password;
        delete updates.confirm_password;
    }

    // Make sure new email is not already in use
    if (updates.email) {
        const doesPlayerEmailExist = await Users.exists({ email: updates.email });
        const re =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const isValidEmail = re.test(String(updates.email).toLowerCase());
        if (doesPlayerEmailExist && updates.email != preUpdatePlayer.email) {
            res.send({ status: 400, message: "This email is already in use" });
            return;
        } else if (!isValidEmail) {
            res.send({ status: 400, message: "This email is invalid" });
            return;
        }
    }

    // Make sure updates does not have unmutable fields
    const immutableFields = ["_id", "token_version"];
    const presentImmutableFields = immutableFields
        .map((f) => updates[f])
        .filter((f) => f);
    if (presentImmutableFields.length > 0) {
        if (
            presentImmutableFields.filter((f) => updates[f] != preUpdatePlayer[f])
            .length > 0
        ) {
            res.send({
                status: 403,
                message: "Some fields being updated are immutable",
            });
            return;
        } else {
            await Users.findOneAndUpdate({ _id: userId }, {...updates });
            updatedUser = await Users.findOne({ _id: userId });
        }
    } else {
        await Users.findOneAndUpdate({ _id: userId }, {...updates });
        updatedUser = await Users.findOne({ _id: userId });
    }

    if (updatedUser) {
        res.send({
            status: 200,
            message: "User has successfully been updated",
            user: updatedUser,
        });
    } else {
        res.send({
            status: 400,
            message: "User has unsuccessfully been updated",
        });
    }
});

router.route("/users/delete-social").put(authChecker, async(req, res) => {
    const { userId, socialURL } = req.body;
    const preUpdatePlayer = await Users.findOne({ _id: userId });
    const updates = {
        socials: preUpdatePlayer.socials.filter(
            (social) => social.url != socialURL
        ),
    };
    let updatedUser = false;

    await Users.findOneAndUpdate({ _id: userId }, {...updates });
    updatedUser = await Users.findOne({ _id: userId });

    if (updatedUser) {
        res.send({
            status: 200,
            message: "User has successfully been updated",
            user: updatedUser,
        });
    } else {
        res.send({
            status: 400,
            message: "User has unsuccessfully been updated",
        });
    }
});

router.route("/users/add-social").put(authChecker, async(req, res) => {
    const { userId, socialURL } = req.body;
    const preUpdatePlayer = await Users.findOne({ _id: userId });
    const newSocial = { url: socialURL };
    let newSocials = preUpdatePlayer.socials;
    newSocials.push(newSocial);
    const updates = {
        socials: newSocials,
    };
    let updatedUser = false;

    await Users.findOneAndUpdate({ _id: userId }, {...updates });
    updatedUser = await Users.findOne({ _id: userId });

    if (updatedUser) {
        res.send({
            status: 200,
            message: "User has successfully been updated",
            user: updatedUser,
        });
    } else {
        res.send({
            status: 400,
            message: "User has unsuccessfully been updated",
        });
    }
});

//Posts mutators
router.route("/posts/update-post").put(authChecker, async(req, res) => {
    const { postId, updates } = req.body;
    let updatedPost = false;

    await Posts.findOneAndUpdate({ _id: postId }, {...updates });
    updatedPost = await Posts.findOne({ _id: postId });

    if (updatedPost) {
        res.send({
            status: 200,
            message: "Post has successfully been updated",
            post: updatedPost,
        });
    } else {
        res.send({
            status: 400,
            message: "Post has unsuccessfully been updated",
        });
    }
});

router.route("/posts/like-post").put(authChecker, async(req, res) => {
    const { postId, userId } = req.body;

    const preUpdatePost = Posts.findOne({ _id: postId });

    await Posts.findOneAndUpdate({ _id: postId }, {...updates });
    updatedPost = await Posts.findOne({ _id: userId });

    if (updatedPost) {
        res.send({
            status: 200,
            message: "Post liked successfully",
            post: updatedPost,
        });
    } else {
        res.send({
            status: 400,
            message: "Post has unsuccessfully been liked",
        });
    }
});

module.exports = router;