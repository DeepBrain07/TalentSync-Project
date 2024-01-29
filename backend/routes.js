import express  from "express";
const router = express.Router();
import signinController from './controllers/signinController.js';
import signupController from "./controllers/signupController.js";
import { getBlog, postBlog, updateBlog, deleteBlog } from "./controllers/blogs.js";
import { protect } from "./middlewares/authMiddleware.js";

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
.post(protect, postBlog)
.put(protect, updateBlog)
.delete(protect, deleteBlog);

router.post('/signout');

export default router;