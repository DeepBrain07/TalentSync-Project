import asyncHandler from "express-async-handler";
import auth from "../middlewares/authMiddleware.js";
const signinController = asyncHandler(async(req, res) => {
    auth(req, res)
    
})

export default signinController;