import express  from "express";
const router = express.Router();
import signinController from './controllers/signinController.js';
import signupController from "./controllers/signupController.js";
import { getBlog, postBlog, updateBlog, deleteBlog } from "./controllers/blogs.js";

router.get('/home')

router
.route('/signup')
.get()
.post(signupController);

router
.route('/signin')
.get()
.post(signinController);

router.route('/blog')
.get(getBlog)
.post(postBlog)
.put(updateBlog)
.delete(deleteBlog);

router.post('/signout');

export default router;