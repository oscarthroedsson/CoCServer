import { Request, Response } from "express";
import { getPlayer_superCell, validateClashAccount_superCell } from "../../API/Player/player_Api";
import { RegisterProps } from "../../types/Register/Register.types";
import { registerPlayer_clashyStats } from "../../service/Register/registerPlayer_service";

export async function registerNewUser(req: Request<RegisterProps>, res: Response) {
  console.log("/register/signup | registerNewUser | not implemented");

  const gameTag = req.body.gameTag;
  const token = req.body.apiToken;
  const email = req.body.email;
  const acceptTerms = req.body.acceptTerms;

  try {
    // validate with superCell if the player own the account
    const accountIsValid = await validateClashAccount_superCell(gameTag, token, res);

    // get payload from superCell
    const playerObject = await getPlayer_superCell(gameTag);

    // register player in our database
    const addedMember = await registerPlayer_clashyStats({
      gameTag: playerObject.tag,
      clanTag: playerObject.clan.tag,
      gameName: playerObject.name,
      email: email,
    });

    console.log("Added member: ", addedMember);

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
