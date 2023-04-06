import { Request, Response } from "express";
import User from "../models/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { LoginType } from "../types";

require("dotenv").config();

const AuthController = {
  async login(req: Request, res: Response) {
    const { login, password } = req.body as LoginType;
    if (!login || login === null || typeof login === undefined) {
      return res.status(400).json({
        error: true,
        message: "Login cannot be empty",
      });
    }
    if (!password || password == null || typeof password === undefined) {
      return res.status(400).json({
        error: true,
        message: "password cannot be empty",
      });
    }

    User.findOne({ login }, ["_id", "password"])
      .then((user) => {
        if (user) {
          const result = bcrypt.compareSync(password, user.password);
          if (result) {
            const uID = user._id;
            const token = jwt.sign({ uID }, process.env.SECRET || "secret");
            return res.status(200).json({
              error: false,
              message: "Successfully logged in!",
              token,
            });
          } else {
            return res.status(200).json({
              error: true,
              message: "Invalid password!",
            });
          }
        } else {
          return res.status(404).json({
            error: true,
            message: "User not found",
          });
        }
      })
      .catch((err) => {
        return res.status(500).json({
          error: true,
          message: "Login failure: " + err,
        });
      });
  },
};

export default AuthController;
