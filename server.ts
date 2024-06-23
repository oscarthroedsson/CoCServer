import cors from "cors";
import express from "express";
import morgan from "morgan";
import routes from "./routes";
import dotenv from "dotenv";
import { scheduleJobs } from "./Jobs/scheduleJobs";
import { job_collectClanCapitalData } from "./Jobs/clanCapital/collectClanCapitalData";
import { onBoarding_ClanCapital } from "./middlewares/Onboarding/clanCapital_Onboarding";

// import "./Queues/index";

dotenv.config();

export const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
// Use dem routes
app.use(routes);

// scheduleJobs();
// job_collectClanCapitalData();
// onBoarding_ClanCapital("#2QJ2QG29R");

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🏛️ | Server is running on port ${PORT}`);
});
