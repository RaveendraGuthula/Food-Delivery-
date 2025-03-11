import { Router } from "express";
import { signIn, signUp } from "../controllers/userController.js";

const userRouter= Router();

userRouter.post("/register",signUp);
userRouter.post("/signin",signIn);

export default userRouter;