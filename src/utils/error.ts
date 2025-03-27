import { Request, Response } from "express";

export interface IError extends Error {
  message: string;
  name: string;
}

export type TExceptionError =
  | "ControllerLayer"
  | "ModelLayer"
  | "RouterLayer"
  | "MiddlewareLayer";

export class ExceptionError extends Error {
  statusCode: number;
  code: number;

  constructor(
    name: TExceptionError,
    statusCode: number,
    code: number,
    message: string,
  ) {
    super(message);
    this.name = name;
    this.statusCode = statusCode;
    this.code = code;
  }
}

export function errorHandler(
  error: Error | ExceptionError,
  req: Request,
  res: Response,
) {
  if (error instanceof ExceptionError) {
    res.status(error.statusCode).json({
      errors: {
        message: error.message,
        code: error.code,
      },
    });
  }

  res.status(500).json({
    errors: {
      message: "Internal Server Error",
      code: 500,
    },
  });
}
