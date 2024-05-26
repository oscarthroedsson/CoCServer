// Importera Joi och andra nödvändiga moduler
import Joi from "joi";
import express from "express";

// Skapa en express-router
const router = express.Router();

// Definiera valideringsfunktionen
export const validate_RegisterData = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const schema = Joi.object({
    gameTag: Joi.string().min(7).max(15).required(),
    email: Joi.string().email().required(),
    apiToken: Joi.string().required(),
    acceptTerms: Joi.boolean().required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  next();
};

// Exportera routern för användning i huvudapplikationen
export default router;
