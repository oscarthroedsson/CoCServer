import { Request, Response } from "express";
import { getPlayer_superCell, validateClashAccount_superCell } from "../../API/Player/player_Api";
import { RegisterProps } from "../../types/Register/Register.types";
import { registerPlayer_clashyStats } from "../../service/Register/registerPlayer_service";
import { doesPlayerExist } from "../../validation/Player/doesPlayerExist";
import { doesClanExist_clashyStats } from "../../validation/Clan/doesClanExist";
import { clanOnboarding } from "../../middlewares/Onboarding/clan_Onboarding";
import { changeToURLencoding } from "../../utils/helpers/urlEncoding";
import { getClan_superCell } from "../../API/Clan/clan_Api";
import { registerClan_clashyStats } from "../../service/Register/registerClan_service";

export async function registerNewUser(req: Request<RegisterProps>, res: Response) {
  const gameTag = req.body.gameTag; // will look #gameTag
  const token = req.body.apiToken;
  const email = req.body.email;
  const acceptTerms = req.body.acceptTerms;

  const userExist = await doesPlayerExist(gameTag);
  if (userExist) {
    res.status(409).send({
      status: "error",
      message: "User already exists",
    });
    return;
  }

  try {
    // validate with superCell if the player own the account
    const accountIsValid = await validateClashAccount_superCell(gameTag, token, res);
    console.log("accountIsValid: ", accountIsValid);
    if (!accountIsValid || accountIsValid.invalid) {
      res.status(400).send({
        status: "error",
        message: "1. Invalid account key",
      });
      return;
    }
    // get payload from superCell
    const playerObject = await getPlayer_superCell(gameTag);

    // register player in our database
    await registerPlayer_clashyStats({
      gameTag: playerObject.tag,
      clanTag: playerObject.clan.tag,
      gameName: playerObject.name,
      email: email,
    });

    const clanExist = await doesClanExist_clashyStats(playerObject.clan.tag);
    console.log("registerNewUser | clanExist: ", clanExist);

    if (!clanExist) {
      console.log("🪜 ska lägga till clanen");
      try {
        const clan = await getClan_superCell(playerObject.clan.tag);
        console.log("registerNewUser | clan: ", clan);

        await registerClan_clashyStats({
          tag: clan.tag,
          name: clan.name,
          warWinLoseRatio: parseFloat((clan.warWins / clan.warLosses).toFixed(1)),
        });
      } catch (err) {
        res.status(200).send({
          status: "error",
          message: "We onboard you as a player, but not your clan.",
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
