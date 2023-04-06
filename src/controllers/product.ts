import { Request, Response } from "express";
import Product from "../models/product";
import Category from "../models/category";
import { DatabaseId, ProductType } from "../types";

const ProductController = {
  async list(req: Request, res: Response) {
    Product.find()
      .select(["_id", "name", "price", "qty", "categories"])
      .then((product) => {
        if (product) {
          return res.status(200).json({
            error: false,
            products: product,
          });
        } else {
          return res.status(404).json({
            error: true,
            message: "No product found",
          });
        }
      })
      .catch((err) => {
        return res.status(500).json({
          error: true,
          message: "Failed to find products: " + err,
        });
      });
  },
  async create(req: Request, res: Response) {
    const { categories, name, qty, price } = req.body as ProductType;

    if (
      !categories ||
      categories === null ||
      typeof categories === undefined ||
      categories.length === 0
    ) {
      return res.status(400).json({
        error: true,
        message: "Categories cannot be empty",
      });
    }
    if (!name || name === null || typeof name === undefined) {
      return res.status(400).json({
        error: true,
        message: "Name cannot be empty",
      });
    }
    if (!price || price === null || typeof price === undefined) {
      return res.status(400).json({
        error: true,
        message: "Price cannot be empty",
      });
    }

    Category.count({ name: { $in: categories } })
      .then((category) => {
        if (category === categories.length) {
          Product.create({ categories, name, qty, price })
            .then((product) => {
              if (product) {
                return res.status(200).json({
                  error: false,
                  message: "Product created successfully",
                  product,
                });
              } else {
                return res.status(404).json({
                  error: true,
                  message:
                    "Failed to create product, some of the categories were not found",
                });
              }
            })
            .catch((err) => {
              return res.status(500).json({
                error: true,
                message: "Failed to create product: " + err,
              });
            });
        } else {
          return res.status(404).json({
            error: true,
            message:
              "Failed to create product, some of the categories were not found",
          });
        }
      })
      .catch((err) => {
        return res.status(500).json({
          error: true,
          message:
            "Failed to create product, none of these categories were found: " +
            err,
        });
      });
  },
  async get(req: Request, res: Response) {
    const { id } = req.params as DatabaseId;

    if (!id || id === null || typeof id === undefined) {
      return res.status(400).json({
        error: true,
        message: "Product id cannot be empty",
      });
    }

    Product.findById(id)
      .select(["_id", "name", "price", "qty", "categories"])
      .then((product) => {
        if (product) {
          return res.status(200).json({
            error: false,
            product,
          });
        } else {
          return res.status(404).json({
            error: true,
            message: "No product foud with id " + id,
          });
        }
      })
      .catch((err) => {
        return res.status(500).json({
          error: true,
          message: "Failed to find product: " + err,
        });
      });
  },

  async update(req: Request, res: Response) {
    const { id } = req.params as DatabaseId;
    const { categories, name, qty, price } = req.body as ProductType;

    if (!id || id === null || typeof id === undefined) {
      return res.status(400).json({
        error: true,
        message: "Product id cannot be empty",
      });
    }

    if (
      !categories ||
      categories === null ||
      typeof categories === undefined ||
      categories.length === 0
    ) {
      return res.status(400).json({
        error: true,
        message: "Categories cannot be empty",
      });
    }
    if (!name || name === null || typeof name === undefined) {
      return res.status(400).json({
        error: true,
        message: "Name cannot be empty",
      });
    }
    if (!price || price === null || typeof price === undefined) {
      return res.status(400).json({
        error: true,
        message: "Price cannot be empty",
      });
    }

    Product.findOneAndUpdate(
      { _id: id },
      { categories, name, qty, price },
      {
        returnOriginal: false,
      },
    )
      .then((product) => {
        if (product) {
          return res.status(200).json({
            error: false,
            message: "Product updated successfully",
            product,
          });
        } else {
          return res.status(404).json({
            error: true,
            message: "No product foud with id " + id,
          });
        }
      })
      .catch((err) => {
        return res.status(500).json({
          error: true,
          message: "Failed to update product: " + err,
        });
      });
  },

  async delete(req: Request, res: Response) {
    const { id } = req.params as DatabaseId;

    if (!id || id === null || typeof id === undefined) {
      return res.status(400).json({
        error: true,
        message: "Product id cannot be empty",
      });
    }

    Product.findByIdAndDelete(id)
      .then((product) => {
        if (product) {
          res.status(200).json({
            error: false,
            message: "Product deleted successfully",
          });
        } else {
          return res.status(404).json({
            error: true,
            message: "No product foud with id " + id,
          });
        }
      })
      .catch((err) => {
        return res.status(500).json({
          error: true,
          message: "Failed to delete product: " + err,
        });
      });
  },
};

export default ProductController;
