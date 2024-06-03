import { Request, Response } from "express";
import { getPlayer_superCell, validateClashAccount_superCell } from "../../API/Player/player_Api";
import { addNewMemberProps } from "../../types/Register/Register.types";
import { registerPlayer_clashyStats } from "../../service/Register/registerPlayer_service";
import { doesPlayerExist_clashyStats } from "../../validation/Player/doesPlayerExist";
import { doesClanExist_clashyStats } from "../../validation/Clan/doesClanExist";

import { getClan_superCell } from "../../API/Clan/clan_Api";
import { registerClan_clashyStats } from "../../service/Register/registerClan_service";
import { onBoardClanMembers } from "../../middlewares/Onboarding/clan_Onboarding";
import { getPlayer_clashyClash, updatePlayer_clashyStats } from "../../service/Player/player_service";

export async function registerNewUser(req: Request<addNewMemberProps>, res: Response) {
  const gameTag = req.body.gameTag; // will look #gameTag
  const token = req.body.apiToken;
  const email = req.body.email;
  const acceptTerms = req.body.acceptTerms;

  const accountIsValid = await validateClashAccount_superCell(gameTag, token, res);
  if (!accountIsValid || accountIsValid.invalid) {
    res.status(400).send({
      status: "error",
      message: "1. Invalid account key",
    });
    return;
  }

  const userExist = await doesPlayerExist_clashyStats(gameTag);

  try {
    // get payload from superCell
    const playerObject = await getPlayer_superCell(gameTag);

    if (userExist) {
      const player = await getPlayer_clashyClash(gameTag); // get player from clashyStats database
      /*
        if player exist and email is null and acceptTerms is false we know they where added 
        thre processClanMembers when someone else in the clan was registered
      */
      if (player?.email === null && player.acceptTerms === false) {
        updatePlayer_clashyStats({
          gameTag: playerObject.tag,
          clanTag: playerObject.clan.tag,
          gameName: playerObject.name,
          email: email,
          acceptTerms: acceptTerms,
        });
      } else {
        //if  false, the profile is valid and they can login
        res.status(409).send({
          status: "error",
          message: "You are alerady a valid user already exist",
        });
        return;
      }
    } else {
      // if user does not exist, register user
      await registerPlayer_clashyStats({
        gameTag: playerObject.tag,
        clanTag: playerObject.clan.tag,
        gameName: playerObject.name,
        email: email,
        acceptTerms: acceptTerms,
      });
    }

    const clan = await getClan_superCell(playerObject.clan.tag);

    if (clan.memberList.length > 0) {
      onBoardClanMembers(clan.tag, clan.memberList);
    }

    const clanExist = await doesClanExist_clashyStats(playerObject.clan.tag);
    console.log("registerNewUser | clanExist: ", clanExist);

    if (!clanExist) {
      try {
        const clan = await getClan_superCell(playerObject.clan.tag);
        await registerClan_clashyStats({
          tag: clan.tag,
          name: clan.name,
          warWinLoseRatio: parseFloat((clan.warWins / clan.warLosses).toFixed(1)),
        });
      } catch (err) {
        res.status(200).send({
          status: "error",
          message: "We onboarded you as a player, but not your clan.",
          error: err,
        });
        return;
      }
    }

    res.status(200).send({
      status: "success",
      data: playerObject,
    });
  } catch (error) {
    console.log("Error: ", error);
    res.status(400).send({
      status: "error",
      message: "Could not register user",
      error: error,
    });
  }
}