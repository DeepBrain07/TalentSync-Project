import  jwt  from "jsonwebtoken";
import dotenv from 'dotenv';
import asyncHandler from 'express-async-handler'
import User from "../models/userModel.js"; 
import Post from "../models/postModel.js";

dotenv.config()
const generateToken = (res, userId) => {
    const token = jwt.sign({userId}, process.env.JWT_SECRET, {expiresIn: '3d'}); 
    console.log(token)
    res.cookie('jwt', token, {
        secure: true,
        sameSite: 'None',
        maxAge: 3 * 24 * 60 * 60 * 1000
      });
    res.cookie('userId', userId)
    console.log("Cookie has been set")
}
const auth = asyncHandler(async(req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email});
    if (user && (await user.matchPassword(password))) {
        generateToken(res, user._id)
        const posts = await Post.find()
        if (posts) {
            const numOfPosts = posts.length;
            res.cookie('numOfPosts', numOfPosts)
        }
        res.status(200);
    } else {
        res.status(401)
    }
})

export const protect = asyncHandler(async (req, res, next) => {
  let token;

  token = req.cookies.jwt;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
    //   req.user = await User.findById(decoded.userId).select('-password');

      next();
    } catch (error) {
      res.status(401);
      throw new Error('Not Authorized, Invalid Token');
    }
  } else {
    res.status(401);
    throw new Error('Not Authorized, no token');
  }
});

export default auth;