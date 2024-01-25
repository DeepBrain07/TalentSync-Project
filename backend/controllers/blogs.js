import asyncHandler from "express-async-handler";
import auth from "../middlewares/authMiddleware.js";
import User from "../models/userModel.js";
import Post from "../models/postModel.js";

const getBlog =  asyncHandler(async(req, res) => {
    const more = req.body.more;
    let minPostId = 1;
    if (more) {
        minPostId = req.cookies.minPostId ? req.cookies.minPostId : 1;
        if (minPostId > req.cookies.numOfPosts) {
            minPostId = 1;
        }
    }

    const maxPostId = parseInt(minPostId) + 10;
    const blogs =  await Post.find({
        postId: { $gte: minPostId, $lte: maxPostId }
      }).populate("user");
    if (blogs) {
        // console.log(blogs)
        console.log(maxPostId)
        res.cookie('minPostId', maxPostId)
        res.status(200).json({blogs})
    }
    
});

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
            res.cookie('numOfPosts', parseInt(req.cookies.numOfPosts) + 1)
        } else {
        }
            
    }
    res.send(200)
})

const updateBlog =  asyncHandler(async(req, res) => {
    const userId = req.body.userId;
    const postID = req.body.postID;
    const title = req.body.title;
    const content = req.body.content;
    try {
            const post = await Post.findOne({_id:postID})
            if (post && (String(post.user._id) === userId)) {
                if (title && content) {
                    const result = await Post.updateOne({ _id: postID }, { $set: {title, content} });
                    console.log("UPDATEDDD both title and content", result);
                    res.send(200)
                } else {
                    const result = await Post.updateOne({ _id: postID }, { $set: {content} });
                    console.log("UPDATEDDD just content", result);
                    res.send(200)
                }
            } else {
                console.log(userId, String(post.user._id))
                res.send(401, "Unauthorised access")
            }
        } catch (error) {
        console.error('Error updating post:', error);
        throw error;
    }
})

const deleteBlog = asyncHandler(async(req, res) => {
    const userId = req.body.userId;
    const postID = req.body.postID;
    try {
            const post = await Post.findOne({_id:postID})
            if (post && (String(post.user._id) === userId)) {
                const result = await post.deleteOne({_id:postID});
                if (result) {
                    res.cookie('numOfPosts', parseInt(req.cookies.numOfPosts) - 1)
                    res.send(200, "Successfully Deleted")
                } else {
                    res.send("Unable to delete")
                }
            } else {
                // console.log(userId, String(post.user._id))
                res.send(401, "Unauthorised access")
            }
        } catch (error) {
        console.error('Error deleting post:', error);
        throw error;
    }
});

export {getBlog, postBlog, updateBlog, deleteBlog};