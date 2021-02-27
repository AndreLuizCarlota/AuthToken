import { Router } from "express";

import { UserController } from "../../controllers/UserController";
import { Authorization } from "../../middleware/Authorization";

const userController = new UserController();
const authorization = new Authorization();

const router = Router();

router.get("/users", authorization.hasAuthorized, userController.getAll);

export { router };
