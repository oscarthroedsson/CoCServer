// /**
//  * Main application routes
//  */

import express from "express";
import playerRouter from "./player_route";
import clanRouter from "./clan_route";
import registerRouter from "./register_route";
import clanWarLeagueRouter from "./clanWarLeague_route";
import { validate_RegisterData } from "../Rules/Registration/registerValidation";

const router = express.Router();

router.use("/player", playerRouter);

router.use("/clan", clanRouter);

router.use("/cwl", clanWarLeagueRouter);

router.use("/register", validate_RegisterData, registerRouter);

export default router;

const cwlgroup = {
  seasonYear: 2021,
  seasonMonth: 1,
  clans: [
    { clanTag: "#clanTag", clanName: "clanName" },
    { clanTag: "#clanTag", clanName: "clanName" },
    { clanTag: "#clanTag", clanName: "clanName" },
    { clanTag: "#clanTag", clanName: "clanName" },
    { clanTag: "#clanTag", clanName: "clanName" },
    { clanTag: "#clanTag", clanName: "clanName" },
    { clanTag: "#clanTag", clanName: "clanName" },
    { clanTag: "#clanTag", clanName: "clanName" },
  ],
  rounds: [
    {
      // every object is a round, that contains matches
      roundID: "Prisma ID",
      roundNumber: 1,
      matches: [
        {
          id: "Prisma ID",
          groupId: "groupID",
          roundID: "roundID",
          clanOne: { clanTag: "#clanTag", clanName: "clanName" },
          clanTwo: { clanTag: "#clanTag", clanName: "clanName" },
          clanOneStats: {
            stars: 29,
            attacks: 14,
            destructionPercentage: 98.87,
          },
          clanTwoStats: {
            stars: 29,
            attacks: 14,
            destructionPercentage: 98.87,
          },
          winner: "clanWhoWinns",
        },
        {
          id: "Prisma ID",
          groupId: "groupID",
          roundID: "roundID",
          clanOne: { clanTag: "#clanTag", clanName: "clanName" },
          clanTwo: { clanTag: "#clanTag", clanName: "clanName" },
          clanOneStats: {
            stars: 29,
            attacks: 14,
            destructionPercentage: 98.87,
          },
          clanTwoStats: {
            stars: 29,
            attacks: 14,
            destructionPercentage: 98.87,
          },
          winner: "clanWhoWinns",
        },
        {
          id: "Prisma ID",
          groupId: "groupID",
          roundID: "roundID",
          clanOne: { clanTag: "#clanTag", clanName: "clanName" },
          clanTwo: { clanTag: "#clanTag", clanName: "clanName" },
          clanOneStats: {
            stars: 29,
            attacks: 14,
            destructionPercentage: 98.87,
          },
          clanTwoStats: {
            stars: 29,
            attacks: 14,
            destructionPercentage: 98.87,
          },
          winner: "clanWhoWinns",
        },
        {
          id: "Prisma ID",
          groupId: "groupID",
          roundID: "roundID",
          clanOne: { clanTag: "#clanTag", clanName: "clanName" },
          clanTwo: { clanTag: "#clanTag", clanName: "clanName" },
          clanOneStats: {
            stars: 29,
            attacks: 14,
            destructionPercentage: 98.87,
          },
          clanTwoStats: {
            stars: 29,
            attacks: 14,
            destructionPercentage: 98.87,
          },
          winner: "clanWhoWinns",
        },
      ],
    },
    {
      // every object is a round, that contains matches
      roundID: "Prisma ID",
      roundNumber: 2,

      matches: [
        {
          id: "Prisma ID",
          groupId: "groupID",
          roundID: "roundID",
          clanOne: { clanTag: "#clanTag", clanName: "clanName" },
          clanTwo: { clanTag: "#clanTag", clanName: "clanName" },
          clanOneStats: {
            stars: 29,
            attacks: 14,
            destructionPercentage: 98.87,
          },
          clanTwoStats: {
            stars: 29,
            attacks: 14,
            destructionPercentage: 98.87,
          },
          winner: "clanWhoWinns",
        },
        {
          id: "Prisma ID",
          groupId: "groupID",
          roundID: "roundID",
          clanOne: { clanTag: "#clanTag", clanName: "clanName" },
          clanTwo: { clanTag: "#clanTag", clanName: "clanName" },
          clanOneStats: {
            stars: 29,
            attacks: 14,
            destructionPercentage: 98.87,
          },
          clanTwoStats: {
            stars: 29,
            attacks: 14,
            destructionPercentage: 98.87,
          },
          winner: "clanWhoWinns",
        },
        {
          id: "Prisma ID",
          groupId: "groupID",
          roundID: "roundID",
          clanOne: { clanTag: "#clanTag", clanName: "clanName" },
          clanTwo: { clanTag: "#clanTag", clanName: "clanName" },
          clanOneStats: {
            stars: 29,
            attacks: 14,
            destructionPercentage: 98.87,
          },
          clanTwoStats: {
            stars: 29,
            attacks: 14,
            destructionPercentage: 98.87,
          },
          winner: "clanWhoWinns",
        },
        {
          id: "Prisma ID",
          groupId: "groupID",
          roundID: "roundID",
          clanOne: { clanTag: "#clanTag", clanName: "clanName" },
          clanTwo: { clanTag: "#clanTag", clanName: "clanName" },
          clanOneStats: {
            stars: 29,
            attacks: 14,
            destructionPercentage: 98.87,
          },
          clanTwoStats: {
            stars: 29,
            attacks: 14,
            destructionPercentage: 98.87,
          },
          winner: "clanWhoWinns",
        },
      ],
    },
  ],
  resultTable: [
    {
      clanTag: "#clanTag",
      clanName: "clanName",
      placement: 1,
      wins: 3,
      draws: 0,
      losses: 0,
      stars: 87,
      attacks: 42,
      destructionPercentage: 98.87,
    },
    {
      clanTag: "#clanTag",
      clanName: "clanName",
      placement: 2,
      wins: 3,
      draws: 0,
      losses: 0,
      stars: 87,
      attacks: 42,
      destructionPercentage: 98.87,
    },
    {
      clanTag: "#clanTag",
      clanName: "clanName",
      placement: 3,
      wins: 3,
      draws: 0,
      losses: 0,
      stars: 87,
      attacks: 42,
      destructionPercentage: 98.87,
    },
    {
      clanTag: "#clanTag",
      clanName: "clanName",
      placement: 4,
      wins: 3,
      draws: 0,
      losses: 0,
      stars: 87,
      attacks: 42,
      destructionPercentage: 98.87,
    },
    {
      clanTag: "#clanTag",
      clanName: "clanName",
      placement: 5,
      wins: 3,
      draws: 0,
      losses: 0,
      stars: 87,
      attacks: 42,
      destructionPercentage: 98.87,
    },
    {
      clanTag: "#clanTag",
      clanName: "clanName",
      placement: 6,
      wins: 3,
      draws: 0,
      losses: 0,
      stars: 87,
      attacks: 42,
      destructionPercentage: 98.87,
    },
  ],
};
