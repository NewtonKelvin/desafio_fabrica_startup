import express from "express";
const routes = express.Router();
import { verifyJWT } from "./middlewares/auth";

//Controllers
import AuthController from "./controllers/auth";
import CategoryController from "./controllers/category";
import ProductController from "./controllers/product";

//Routes
routes.post("/auth/register", AuthController.register);
routes.get("/auth/login", AuthController.login);

routes.get("/category", verifyJWT, CategoryController.list);

routes.get("/product", verifyJWT, ProductController.list);
routes.post("/product", verifyJWT, ProductController.create);
routes.get("/product/:id", verifyJWT, ProductController.get);
routes.patch("/product/:id", verifyJWT, ProductController.update);
routes.delete("/product/:id", verifyJWT, ProductController.delete);

export default routes;
