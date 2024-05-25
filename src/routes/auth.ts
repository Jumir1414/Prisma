import { Router } from "express";
import { signUp } from "../controllers/auth";
export const authRoutes: Router = Router();

authRoutes.post("/signUp", signUp);
