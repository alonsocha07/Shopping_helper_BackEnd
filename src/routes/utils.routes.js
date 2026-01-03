import { Router } from "express";
import { wakeUpServer } from "../controllers/utils.controller.js";

const router = Router();

router.get('/wakeUp', wakeUpServer)

export default router;
