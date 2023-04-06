import express from "express";
const routes = express.Router();
import { verifyJWT } from "./middlewares/auth";

//Controllers
import AuthController from "./controllers/auth";
import CategoryController from "./controllers/category";
import ProductController from "./controllers/product";

//Routes
routes.get("/auth/login", AuthController.login); // login

routes.get("/category", verifyJWT, CategoryController.list); // categories list

routes.get("/product", verifyJWT, ProductController.list); // products list
routes.post("/product", verifyJWT, ProductController.create); //products create
routes.get("/product/:id", verifyJWT, ProductController.get); // get product by id
routes.patch("/product/:id", verifyJWT, ProductController.update); // update product by id
routes.delete("/product/:id", verifyJWT, ProductController.delete); // delete product by id

export default routes;
