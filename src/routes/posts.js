import express from "express";
import { getAll, getDetail, remove, update, create } from "../controllers/posts.js";

const routerPost = express.Router();

routerPost.get('/', getAll)
routerPost.get('/:id', getDetail)
routerPost.post('/', create)
routerPost.patch('/:id', update)
routerPost.delete('/:id', remove)

export default routerPost;