import { Request, Response } from "express";
import Category from "../models/category";

const CategoryController = {
  async list(req: Request, res: Response) {
    Category.find()
      .select(["_id", "name"])
      .then((category) => {
        if (category) {
          return res.status(200).json({
            error: false,
            categories: category,
          });
        } else {
          return res.status(500).json({
            error: true,
            message: "No category found",
          });
        }
      })
      .catch((err) => {
        return res.status(500).json({
          error: true,
          message: "Failed to find categories: " + err,
        });
      });
  },
};

export default CategoryController;
