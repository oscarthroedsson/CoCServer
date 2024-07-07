import { Request, Response } from "express";
import { getPlayer_superCell, validateClashAccount_superCell } from "../../API/Player/player_Api";
import { addNewMemberProps } from "../../types/Register/Register.types";
import { registerPlayer_clashyStats } from "../../service/Register/registerPlayer_service";
import { doesPlayerExist_clashyStats } from "../../validation/Player/doesPlayerExist";
import { doesClanExist_clashyStats } from "../../validation/Clan/doesClanExist";

import { getClan_superCell } from "../../API/Clan/clan_Api";
import { onBoard_ClanAndMembers } from "../../middlewares/Onboarding/clan_Onboarding";
import { getPlayer_clashyClash, updatePlayer_clashyStats } from "../../service/Player/player_service";

export async function registerNewUser(req: Request<addNewMemberProps>, res: Response) {
  const gameTag = req.body.gameTag; // will look #gameTag
  const token = req.body.apiToken;
  const email = req.body.email;
  const acceptTerms = req.body.acceptTerms;

  // 🚓 Validate CoC account againt superCell
  const accountIsValid = await validateClashAccount_superCell(gameTag, token, res);
  if (!accountIsValid || accountIsValid.invalid) {
    res.status(400).send({
      status: "error",
      message: "Invalid account or accont key",
    });
    return;
  }

  //look if they exists in clashy stats DB
  const userExist = await doesPlayerExist_clashyStats(gameTag);

  try {
    // get payload from superCell
    const playerObject = await getPlayer_superCell(gameTag);

    if (userExist) {
      /*
      📚 If user exist it has already registered, or been added when we collect data. 
      We need to check if they have email and acceptTerms set, if not we update the user so we know they have volentary accepted the terms
      */
      const player = await getPlayer_clashyClash(gameTag); // get player from clashyStats database

      if (player?.email === null && player.acceptTerms === false) {
        updatePlayer_clashyStats({
          clanTag: playerObject.clan.tag ? playerObject.clan.tag : null,
          email: email,
          acceptTerms: acceptTerms,
        });
      } else {
        //if  false, the profile is valid and they can login
        res.status(409).send({
          status: "error",
          message: `${gameTag} is alerady a valid user`,
        });
        return;
      }
    } else {
      // if user does not exist, register user
      await registerPlayer_clashyStats({
        gameTag: playerObject.tag,
        clanTag: playerObject.clan.tag ? playerObject.clan.tag : null,
        gameName: playerObject.name,
        email: email,
        acceptTerms: acceptTerms,
      });
      res.status(200).send({
        status: "success",
        message: "User registered",
      });
    }

    // 🚨 We do not continue of the player aren´t in a clan
    // 📚 All this is happening in the background and the user does not have to wait for this to be done
    if (!playerObject.clan?.tag) return;

    const clan = await getClan_superCell(playerObject.clan.tag);
    if (!clan) return; // 🚨 Abort if something goes wrong
    const clanExist = await doesClanExist_clashyStats(playerObject.clan.tag); // 👀 Check if the clan exist at clashyStats
    if (clanExist) return;

    //💡 Onboard both clan and the members
    onBoard_ClanAndMembers(playerObject.clan.tag);
  } catch (error) {
    console.log("Error: ", error);
    res.status(400).send({
      status: "error",
      message: "Could not register user",
      error: error,
    });
  }
}
