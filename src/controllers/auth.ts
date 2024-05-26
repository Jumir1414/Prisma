import { NextFunction, Request, Response } from "express";
import { hashSync, compareSync } from "bcrypt";
import * as jwt from "jsonwebtoken";
import { JWT_SECRET } from "../secrets";
import { BadRequestsException } from "../exceptions/bad-requests";
import { HttpStatusErrorCode } from "../exceptions/root";
import { prismaClient } from "..";
import { LoginSchema, SignUpSchema } from "../schema/users";
import { CustomRequest } from "../types/customRequest";
export const signUp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password, name } = req.body;
  SignUpSchema.parse(req.body);
  let user = await prismaClient.user.findFirst({ where: { email } });
  if (user) {
    throw next(
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
};
export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;
  LoginSchema.parse(req.body);
  let user = await prismaClient.user.findFirst({ where: { email } });
  if (!user) {
    throw next(
      new BadRequestsException(
        "User not found",
        HttpStatusErrorCode.BAD_REQUEST
      )
    );
  }
  if (!compareSync(password, user?.password)) {
    throw next(
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

export const profile = async (req: CustomRequest, res: Response) => {
  res.json(req.user);
};
