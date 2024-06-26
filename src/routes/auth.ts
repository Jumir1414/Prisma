import { Router } from "express";
import { login, signUp } from "../controllers/auth";
import { errorHandler } from "../error-handler";
export const authRoutes: Router = Router();

authRoutes.post("/signUp", errorHandler(signUp));
authRoutes.post("/login", errorHandler(login));
