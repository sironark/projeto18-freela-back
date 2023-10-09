import { Router } from "express";
import signRouter from "./sign.routes.js";
import serviceRouter from "./service.routes.js";


const router = Router();

router.use(signRouter);
router.use(serviceRouter);


export default router;