import express from "express";
import { registerNewUser } from "../controllers/Register/register_controller";
const router = express.Router();

/*
Syntax
router.VERB("path", RULES?, VALIDATE REQ?, CONTROLLER)
*/

router.post("/signup", registerNewUser);

export default router;
