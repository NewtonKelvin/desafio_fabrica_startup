import { NextFunction, Request, RequestHandler, Response } from "express";
import jwt from "jsonwebtoken";
require("dotenv").config();

export function verifyJWT(req: Request, res: Response, next: NextFunction) {
  const token = req.headers["authorization"];

  if (!token) {
    return res.json({
      error: true,
      auth: false,
      message: "No token provided.",
    });
  }

  jwt.verify(token, process.env.SECRET || "secret", function (err, decoded) {
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
