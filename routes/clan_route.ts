import express from "express";
const router = express.Router();

/*
Syntax
router.VERB("path", RULES?, VALIDATE REQ?, CONTROLLER)
*/

router.get("/", (req, res) => {
  res.send({
    message: "Clan route is working 🤘",
  });
});

export default router;
