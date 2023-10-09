import { Router } from "express";
import { validateSchema } from "../middlewares/validate.schema.js";
import { getServices, getServicesById, postService } from "../controllers/service.controller.js";
import {validateAuth} from "../middlewares/validateAuth.js"
import { ServiceSchema } from "../schemas/app.schemas.js";


const serviceRouter = Router();

serviceRouter.get("/services", getServices);
serviceRouter.get("/service/:id", getServicesById);
serviceRouter.post("/service", validateAuth, validateSchema(ServiceSchema), postService);


export default serviceRouter;