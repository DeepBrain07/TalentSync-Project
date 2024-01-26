import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import auth from "../middlewares/authMiddleware.js";

const signupController = asyncHandler(async (req, res) => {
    const data = req.body;
    const {name, email, username, password} = data;
    const user = await User.findOne({email});
    if (user) {
        console.log("Email is already registered");
        res.send(401, "Email is already registered")
    } else {
        const usernameExists = await User.findOne({username});
        if (usernameExists) {
            throw new Error('Username already exists');
        } else {
            const user = await User.create({
                name,
                username,
                email,
                password
            });
            if (user) {
                auth(req, res)
                res.send(200, "Account Successfully Created")
            } else {
                res.send("An error occured")
            }
        }
    }
    console.log(email)
});

export default signupController;