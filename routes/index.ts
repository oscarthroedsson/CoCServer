// /**
//  * Main application routes
//  */

import express from "express";
import playerRouter from "./player_route";
import clanRouter from "./clan_route";
import registerRouter from "./register_route";
import { validate_RegisterData } from "../validation/Register/registerValidation";

const router = express.Router();

router.use("/player", playerRouter);

router.use("/clan", clanRouter);

router.use("/register", validate_RegisterData, registerRouter);

export default router;
