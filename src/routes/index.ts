import { Router } from "express";

import { router as privateR } from "./private/privateRoutes";

import { router as publicR } from "./public/publicRoutes";

const router = Router();

router.use(privateR);
router.use(publicR);

export { router };
