import { Router } from "express";
import { authRoutes } from "./auth";
import { PrismaClient } from "@prisma/client";

const rootRouter: Router = Router();

rootRouter.use("/auth", authRoutes);

export const prismaClient = new PrismaClient({
  log: ["query"],
});

export default rootRouter;
