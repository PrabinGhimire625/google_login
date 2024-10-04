import {Router} from "express"
import { googleLogin } from "../controller/authController.js";
const router=Router();
router.route("/google").get(googleLogin)
export default router