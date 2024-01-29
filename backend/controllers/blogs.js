import asyncHandler from "express-async-handler";
import auth from "../middlewares/authMiddleware.js";
import User from "../models/userModel.js";
import Post from "../models/postModel.js";

const getBlog =  asyncHandler(async(req, res) => {
    const more = req.query.data;
    const numOfPosts = req.query.numOfPosts;
    console.log(numOfPosts, "++++++++++++++++++")
    let maxPostId = req.query.maxPostId ? req.query.maxPostId : numOfPosts;
    // if (more) {
    //     if (maxPostId < 2) {
    //         maxPostId = 1;
    //     }
    // }
    let minPostId = parseInt(maxPostId) - 10;
    if (minPostId < 0) {
        minPostId = minPostId * -1
    }
    console.log(minPostId, maxPostId)
    const blogs =  await Post.find().populate("user").sort({ createdAt: -1 });;
    // const blogs =  await Post.find({
    //     postId: { $lte: maxPostId, $gte: minPostId}
    //   }).populate("user");
    if (blogs) {
        console.log(blogs)
        // console.log(maxPostId)
        res.cookie('minPostId', maxPostId)
        res.status(200).json({blogs, maxPostId: minPostId})
    }
});

const postBlog = asyncHandler(async(req, res) => {
    const userId = req.body.userId;
    const user = await User.findOne({_id: userId});
    const title = req.body.title;
    const post = req.body.post;
    // console.log(req.cookies, post)
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
            const numOfPosts = parseInt(req.body.numOfPosts) + 1
            console.log(numOfPosts)
            res.status(200).json({numOfPosts: numOfPosts})
        } else {
        }
            
    }
    res.status(401)
})

const updateBlog =  asyncHandler(async(req, res) => {
    const userId = req.body.userId;
    const postID = req.body.postId;
    const title = req.body.title;
    const content = req.body.post;
    console.log(req.body)
    console.log(title, content, postID)
    try {
            const post = await Post.findOne({_id:postID})
            if (post && (String(post.user._id) === userId)) {
                if (title && content) {
                    const result = await Post.updateOne({ _id: postID }, { $set: {title, content} });
                    console.log("UPDATEDDD both title and content", result);
                    res.send(200)
                } else if (content) {
                    const result = await Post.updateOne({ _id: postID }, { $set: {content} });
                    console.log("UPDATEDDD just content", result);
                    res.send(200)
                } else if (title) {
                    const result = await Post.updateOne({ _id: postID }, { $set: {title} });
                    console.log("UPDATEDDD just title", result);
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
    const postID = req.body.postId;
    let numOfPosts = req.body.numOfPosts;
    try {
            const post = await Post.findOne({_id:postID})
            if (post && (String(post.user._id) === userId)) {
                const result = await post.deleteOne({_id:postID});
                if (result) {
                    numOfPosts = parseInt(numOfPosts) - 1;
                    res.status(200).json({numOfPosts: numOfPosts})
                } else {
                    res.send("Unable to delete")
                }
            } else {
                // console.log(userId, String(post.user._id))
                console.log("unauthorized")
                res.send(401, "Unauthorised access")
            }
        } catch (error) {
        console.error('Error deleting post:', error);
        throw error;
    }
});

export {getBlog, postBlog, updateBlog, deleteBlog};