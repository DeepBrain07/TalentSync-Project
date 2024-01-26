import asyncHandler from "express-async-handler";
import auth from "../middlewares/authMiddleware.js";
const signinController = asyncHandler(async(req, res) => {
    await auth(req, res)
    // res.send("Successfully logged in")
})

export default signinController;