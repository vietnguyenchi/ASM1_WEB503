import express from "express";
import { register, signIn } from "../controllers/auth.js";

const routerAuth = express.Router();

routerAuth.post('/register', register);
routerAuth.post('/signin', signIn);

export default routerAuth;