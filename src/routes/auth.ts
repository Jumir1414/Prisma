import { Router } from "express";
import { login, profile, signUp } from "../controllers/auth";
import { errorHandler } from "../error-handler";
import authMiddleware from "../middlewares/auth";
export const authRoutes: Router = Router();

authRoutes.post("/signUp", errorHandler(signUp));
authRoutes.post("/login", errorHandler(login));
authRoutes.get("/profile", [authMiddleware], errorHandler(profile));
