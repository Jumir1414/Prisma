import { Router } from "express";
import { login, signUp } from "../controllers/auth";
export const authRoutes: Router = Router();

authRoutes.post("/signUp", signUp);
authRoutes.post("/login", login);
