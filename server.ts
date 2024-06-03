import cors from "cors";
import express from "express";
import morgan from "morgan";
import routes from "./routes";
import dotenv from "dotenv";

import { scheduleJobs } from "./Jobs/scheduler/scheduleJobs";

import { job_CollectDonationHistory } from "./Jobs/scheduler/player/donationHistory";
import { job_CollectrophyHistory } from "./Jobs/scheduler/player/trophyHistory";
import { job_clanCapitalContributionsHistory } from "./Jobs/scheduler/player/clanCapitalContributionsHistory";

dotenv.config();

export const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// scheduleJobs();
// job_CollectDonationHistory();
job_clanCapitalContributionsHistory();

// Use dem routes
app.use(routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🏛️ | Server is running on port ${PORT}`);
});
