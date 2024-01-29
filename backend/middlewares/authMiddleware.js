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
        secure: false,
        sameSite: 'None',
        maxAge: 3 * 24 * 60 * 60 * 1000
      });
    
    res.cookie('userId', userId)
    console.log("Cookie has been set")
    return ({'jwt': token, 'userId': userId})
}
const auth = asyncHandler(async(req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email});
    if (user && (await user.matchPassword(password))) {
        let token = generateToken(res, user._id)
        const posts = await Post.find()
        if (posts) {
            const numOfPosts = posts.length;
            token = {token, numOfPosts}
            // res.send(200, "Successfully logged in");
            console.log(token)
            res.status(200)
            return token
        } else {
          res.status(200)
          return token
        }
    } else {
        res.status(401)
    }
})

export const protect = asyncHandler(async (req, res, next) => {
  let token;

  token = req.body;
  console.log(token, "==============")

  if (token) {
  //   try {
  //     const decoded = jwt.verify(token, process.env.JWT_SECRET);
  //   //   req.user = await User.findById(decoded.userId).select('-password');

  //     next();
  //   } catch (error) {
  //     res.status(401);
  //     throw new Error('Not Authorized, Invalid Token', error);
  //   }
  // } else {
  //   res.status(401);
  //   throw new Error('Not Authorized, no token');
  // }
  next();
} else {
  res.status(401);
  //     throw new Error('Not Authorized, Invalid Token', error);
  }
})
  //     throw new Error('Not Authorized, Invalid Token', error);;

export default auth;