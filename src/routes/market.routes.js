import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import { getMarkets,getMarket , createMarket, deleteMarket, updateMarket} from "../controllers/market.controller.js";
import {validateSchema} from '../middlewares/validator.middleware.js'
import { createMarketSchema } from "../schemas/market.schema.js";

const router = Router();

router.get('/markets', authRequired, getMarkets)
router.get('/market/:id', authRequired, getMarket)
router.post('/market', authRequired, validateSchema(createMarketSchema), createMarket)
router.delete('/market/:id', authRequired, deleteMarket)
router.put('/market/:id', authRequired, updateMarket)
export default router;