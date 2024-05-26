import { PlayerObjectResponse } from "../../types/Player/PlayerObject.types";
import { Response } from "express";

export async function getPlayer_superCell(gameTag: string): Promise<PlayerObjectResponse> {
  console.info("Fetching player");
  const response = await fetch(`https://cocproxy.royaleapi.dev/v1/players/${gameTag}`, {
    headers: {
      Authorization: `Bearer ${process.env.BEARER_TOKEN}`,
    },
  });
  const data = await response.json();

  return data;
}

export async function validateClashAccount_superCell(gameTag: string, token: string, res: Response) {
  const response = await fetch(`https://cocproxy.royaleapi.dev/v1/players/${gameTag}/verifytoken`, {
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
      message: "invalid ApiToken",
    });
    return;
  }

  return data;
}
