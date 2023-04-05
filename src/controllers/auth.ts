import { Request, Response } from "express";
import User from "../models/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

require("dotenv").config();

const AuthController = {
  async register(req: Request, res: Response) {
    const { login, password, name } = req.body;
    if (!login || login == null || typeof login === undefined) {
      return res.status(400).json({
        error: true,
        message: "Login cannot be empty!",
      });
    }
    if (!password || password == null || typeof password === undefined) {
      return res.status(400).json({
        error: true,
        message: "Password cannot be empty!",
      });
    }

    User.findOne({
      login,
    })
      .then((user) => {
        if (user)
          return res.status(500).json({
            error: true,
            message: "There is already a user with this login",
          });
        else
          User.create({ login, password, name })
            .then((user) => {
              if (user)
                return res.status(200).json({
                  error: false,
                  message: "User created successfully!",
                });
              else
                return res.status(500).json({
                  error: true,
                  message: "Failed to create user",
                });
            })
            .catch((err) => {
              return res.status(500).json({
                error: true,
                message: "Failed to create user: " + err,
              });
            });
      })
      .catch((err) => {
        return res.status(500).json({
          error: true,
          message: "Failed to create user: " + err,
        });
      });
  },

  async login(req: Request, res: Response) {
    const { login, password } = req.body;
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
          return res.status(400).json({
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
