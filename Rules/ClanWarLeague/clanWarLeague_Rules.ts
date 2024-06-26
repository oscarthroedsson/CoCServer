// Importera Joi och andra nödvändiga moduler
import Joi from "joi";
import express from "express";

// Skapa en express-router
const router = express.Router();

// Definiera valideringsfunktionen
export const validate_getCWLMatchRules = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const schema = Joi.object({
    clanTag: Joi.string().trim().required(),
    year: Joi.number().required(),
    month: Joi.number().required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  next();
};

// Exportera routern för användning i huvudapplikationen
export default router;
