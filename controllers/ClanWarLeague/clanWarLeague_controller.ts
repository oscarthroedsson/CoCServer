import { Request, Response } from "express";
import { getClanWarLeagueWar } from "../../service/ClanWarLeague/clanWarLeague_service";
import { convertToCWLWarGroupObject } from "../../models/convertToCWLGroupObject";

/**
 * 📚 Get a CWL goup based on season (year/month) and the clanTag. Sends back a group object
 * @param req
 * @param res
 */
export async function getClanWarLeagueGroup(req: Request, res: Response) {
  const clanTag = req.body.clanTag;
  const year = req.body.year;
  const month = req.body.month;

  try {
    const group = await getClanWarLeagueWar(clanTag, year, month);
    if (!group)
      throw new Error(
        `Error while fetching CWL Group | Response from getClanWarLeagueWar: ${group} | getClanWarLeagueWar`
      );

    // convertnig the group object to a response object so it looks nice
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
