import { Router } from "express";
import { account } from "../controllers/accountController.js";
var accountRoutes = Router();
accountRoutes.get("/account", account);
export default accountRoutes;
