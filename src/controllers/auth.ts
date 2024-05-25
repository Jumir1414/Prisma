import { NextFunction, Request, Response } from "express";
import { prismaClient } from "../routes";
import { hashSync, compareSync } from "bcrypt";
import * as jwt from "jsonwebtoken";
import { JWT_SECRET } from "../secrets";
import { BadRequestsException } from "../exceptions/bad-requests";
import { HttpStatusErrorCode } from "../exceptions/root";

export const signUp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password, name } = req.body;

  try {
    // Check if the user already exists
    let user = await prismaClient.user.findFirst({ where: { email } });
    if (user) {
      return next(
        new BadRequestsException(
          "User already exists",
          HttpStatusErrorCode.FORBIDDEN
        )
      );
    }

    // Create new user
    user = await prismaClient.user.create({
      data: {
        name,
        email,
        password: hashSync(password, 10),
      },
    });

    res.json(user);
  } catch (error) {
    // Pass any error to the next middleware
    next(error);
  }
};
export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;
  let user = await prismaClient.user.findFirst({ where: { email } });
  if (!user) {
    return next(
      new BadRequestsException(
        "User not found",
        HttpStatusErrorCode.BAD_REQUEST
      )
    );
  }
  if (!compareSync(password, user?.password)) {
    return next(
      new BadRequestsException(
        "Incorrect password",
        HttpStatusErrorCode.FORBIDDEN
      )
    );
  }
  const token = jwt.sign(
    {
      userId: user.id,
    },
    JWT_SECRET
  );

  res.json({ user, token });
};
