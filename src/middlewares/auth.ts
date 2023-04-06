import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export function verifyJWT(req: Request, res: Response, next: NextFunction) {
  let token = req.headers["authorization"] as string;
  token = token.startsWith("Bearer ") ? token.replace("Bearer ", "") : token;

  if (!token) {
    return res.json({
      error: true,
      auth: false,
      message: "No token provided.",
    });
  }

  jwt.verify(token, process.env.SECRET || "secret", function (err) {
    if (err) {
      return res.status(401).json({
        error: true,
        auth: false,
        message: "Failed to authenticate token.",
      });
    }
    next();
  });
}
