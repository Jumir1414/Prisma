import { NextFunction, Request, Response } from "express";
import { HttpException, HttpStatusErrorCode } from "./exceptions/root";
import { UnprocessableEntity } from "./exceptions/validation";
import { z } from "zod";
import { InternalException } from "./exceptions/internal-exception";

export const errorHandler = (method: Function) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await method(req, res, next);
    } catch (error: any) {
      let exception: HttpException;
      if (error instanceof HttpException) {
        exception = error;
      } else if (error instanceof z.ZodError) {
        exception = new UnprocessableEntity(
          error.errors,
          "unprocessable entity",
          HttpStatusErrorCode.UNPROCESSABLE_ENTITY
        );
      } else {
        exception = new InternalException(
          "something went wrong!",
          error,
          HttpStatusErrorCode?.INTERNAL_SERVER_ERROR
        );
      }
      next(exception);
    }
  };
};
