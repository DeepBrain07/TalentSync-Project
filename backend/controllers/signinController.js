import asyncHandler from "express-async-handler";
import auth from "../middlewares/authMiddleware.js";
const signinController = asyncHandler(async(req, res) => {
    const token = await auth(req, res)
    res.json(token)
    // res.send("Successfully logged in")
})

export default signinController;