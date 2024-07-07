import { PlayerObjectResponse } from "../../types/Player/PlayerObject.types";
import { Response } from "express";
import { changeToURLencoding } from "../../utils/helpers/urlEncoding";

export async function getPlayer_superCell(gameTag: string): Promise<PlayerObjectResponse> {
  const convertedGameTag = changeToURLencoding(gameTag); //change # to %23

  try {
    const response = await fetch(`https://cocproxy.royaleapi.dev/v1/players/${convertedGameTag}`, {
      headers: {
        Authorization: `Bearer ${process.env.BEARER_TOKEN}`,
      },
    });
    const data = await response.json();

    return data;
  } catch (error) {
    throw new Error(
      `Error while fetching player data | gameTag: ${gameTag} | Error: ${error} | fn: getPlayer_superCell`
    );
  }
}

export async function validateClashAccount_superCell(gameTag: string, token: string, res: Response) {
  const convertedGameTag = changeToURLencoding(gameTag); //change # to %23

  try {
    const response = await fetch(`https://cocproxy.royaleapi.dev/v1/players/${convertedGameTag}/verifytoken`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.BEARER_TOKEN}`,
      },
      body: JSON.stringify({
        token: token,
      }),
    });
    const data = await response.json();
    if (data.status === "invalid") {
      res.status(400).send({
        status: "error",
        message: "Invalid ApiToken",
      });
      return;
    }
    return data;
  } catch (error) {
    throw new Error(
      `Error while validating player data | gameTag: ${gameTag} | token: ${token} | Error: ${error} | fn: validateClashAccount_superCell`
    );
  }
}
