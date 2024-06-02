import { getPlayer_superCell } from "../../API/Player/player_Api";
import { registerPlayer_clashyStats } from "../../service/Register/registerPlayer_service";
import { doesPlayerExist_clashyStats } from "../../validation/Player/doesPlayerExist";

export async function onBoardClanMembers(clanTag: string, clanMembers: any[]) {
  console.log("🏰 Clan Members: ", clanMembers);

  for (const member of clanMembers) {
    const memberExist = await doesPlayerExist_clashyStats(member.tag);
    if (!memberExist) {
      const playerObject = await getPlayer_superCell(member.tag);

      if (playerObject) {
        await registerPlayer_clashyStats({
          gameTag: playerObject.tag,
          clanTag: playerObject.clan.tag,
          gameName: playerObject.name,
          email: null,
          acceptTerms: false,
        });
        console.log(`Added: ${playerObject.tag} ${playerObject.name}`);
      }
    }
  }
  return;
}

/*
 tag: '#JJ9PVRQL',
    name: 'GodLikeClasher*',
    role: 'admin',
    townHallLevel: 16,
    expLevel: 211,
    league: { id: 29000022, name: 'Legend League', iconUrls: [Object] },
    trophies: 5191,
    builderBaseTrophies: 3182,
    clanRank: 1,
    previousClanRank: 1,
    donations: 882,
    donationsReceived: 931,
    playerHouse: { elements: [Array] },
    builderBaseLeague: { id: 44000025, name: 'Iron League I' }
*/
