import {Router} from "express"
import {home, marco} from "../controlllers/index.controllers.js"
 
const router = Router()

router.get("/", home)
router.get("/marco", marco)

export default router