import express from "express";
import { getClanWarLeagueGroup } from "../controllers/ClanWarLeague/clanWarLeague_controller";
import { validate_getCWLMatchRules } from "../Rules/ClanWarLeague/clanWarLeague_Rules";
const router = express.Router();

/*
Syntax
router.VERB("path", RULES?, VALIDATE REQ?, CONTROLLER)
*/

router.use("/group", validate_getCWLMatchRules, getClanWarLeagueGroup);

export default router;
