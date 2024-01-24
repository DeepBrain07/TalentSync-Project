import asyncHandler from "express-async-handler";
import auth from "../middlewares/authMiddleware.js";
import User from "../models/userModel.js";
import Post from "../models/postModel.js";


const postBlog = asyncHandler(async(req, res) => {
    const userId = req.cookies.userId;
    const user = await User.findOne({_id: userId});
    const title = req.body.title;
    const post = req.body.post;
    console.log(title, post)
    if (user) {
        const lastPost = await Post.findOne({}, {}, { sort: { 'postId': -1 } });
        const newPostId = (lastPost && lastPost.postId) ? lastPost.postId + 1 : 1;

        const newPost = await Post.create({
            postId: newPostId,
            title: title,
            content: post,
            user})
        if (newPost) {
            // try {
            //     const result = await User.updateOne({ _Id: userId }, { $push: {posts: post} });
            //     console.log("UPDATEDDD", result);
            // } catch (error) {
            //     console.error('Error updating user:', error);
            //     throw error;
            // }
            console.log(newPost.postId)
        }
            
    }
    res.send(200)
})

export {postBlog};