import express  from "express";
const router = express.Router();
import signinController from './controllers/signinController.js';
import signupController from "./controllers/signupController.js";
import { getBlog, postBlog } from "./controllers/blogs.js";

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
.post(postBlog);

router.post('/signout');

export default router;