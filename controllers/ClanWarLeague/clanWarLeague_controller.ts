import { Request, Response } from "express";
import { getClanWarLeagueWar } from "../../service/ClanWarLeague/clanWarLeague_service";
import { convertToCWLWarGroupObject } from "../../models/convertToCWLGroupObject";

export async function getClanWarLeagueGroup(req: Request, res: Response) {
  console.log("getClanWarLeagueGroup | 🎮 Controller");
  const clanTag = req.body.clanTag;
  const year = req.body.year;
  const month = req.body.month;
  try {
    const group = await getClanWarLeagueWar(clanTag, year, month);
    if (!group) throw new Error("Error while fetching CWL Group");

    const responseObject = convertToCWLWarGroupObject(group);
    if (!responseObject) throw new Error("Error while fetching CWL Group");

    res.status(200).json({
      status: "success",
      data: responseObject,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: "Error while fetching CWL Group",
      data: error,
    });
  }
}
