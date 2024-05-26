import { NextFunction, Request, Response } from "express";
import { UnauthorizedException } from "../exceptions/unauthorized";
import { HttpStatusErrorCode } from "../exceptions/root";
import * as jwt from "jsonwebtoken";
import { JWT_SECRET } from "../secrets";
import { prismaClient } from "..";
import { CustomRequest } from "../types/customRequest";
const authMiddleware = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  // 1 extract the token from header
  const token = req.headers.authorization!;
  // 2 if token is not present, throw an unauthorized error
  if (!token) {
    next(
      new UnauthorizedException(
        "unauthorized",
        HttpStatusErrorCode.UNAUTHORIZED,
        "no token found"
      )
    );
  }
  try {
    // 3 if the token is present, verify that token and extract the payload
    const payload = jwt.verify(token, JWT_SECRET) as any;
    // 4 to get the user from payload
    const user = await prismaClient.user.findFirst({
      where: { id: payload.userId },
    });
    if (!user) {
      next(
        new UnauthorizedException(
          "unauthorized",
          HttpStatusErrorCode.UNAUTHORIZED,
          null
        )
      );
    }
    // 5 to attach the user to the current req  obejct
    req.user = user!;
    next();
  } catch (err) {
    next(
      new UnauthorizedException(
        "unauthorized",
        HttpStatusErrorCode.UNAUTHORIZED,
        err
      )
    );
  }
};

export default authMiddleware;
