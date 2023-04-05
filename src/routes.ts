import express from "express";
const routes = express.Router();
import { verifyJWT } from "./middlewares/auth";

//Controllers
import AuthController from "./controllers/auth";
import CategoryController from "./controllers/category";

routes.post("/auth/register", AuthController.register);
routes.get("/auth/login", AuthController.login);

routes.get("/category", verifyJWT, CategoryController.list);

export default routes;
