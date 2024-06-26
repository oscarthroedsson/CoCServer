import { PlayerObjectResponse } from "../../types/Player/PlayerObject.types";
import { Response } from "express";
import { changeToURLencoding } from "../../utils/helpers/urlEncoding";

export async function getPlayer_superCell(gameTag: string): Promise<PlayerObjectResponse> {
  const convertedGameTag = changeToURLencoding(gameTag); //change # to %23
  const response = await fetch(`https://cocproxy.royaleapi.dev/v1/players/${convertedGameTag}`, {
    headers: {
      Authorization: `Bearer ${process.env.BEARER_TOKEN}`,
    },
  });
  const data = await response.json();

  return data;
}

export async function validateClashAccount_superCell(gameTag: string, token: string, res: Response) {
  const convertedGameTag = changeToURLencoding(gameTag); //change # to %23
  console.log("validateClashAccount_superCell | convertedGameTag: ", convertedGameTag);
  //todo handle if we get error,  error = code that is made up and not "wrong"
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
      message: "2. invalid ApiToken",
    });
    return;
  }

  return data;
}
