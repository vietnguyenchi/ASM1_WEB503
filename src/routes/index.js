import express from "express";
import routerPost from "./posts.js";
import routerAuth from './auth.js';

const router = express.Router();

router.use('/posts', routerPost);
router.use('/auth', routerAuth);

export default router;