import { getCurrentWar_superCell } from "../../../API/War/war_Api";
import { onBoardClanAndMembers } from "../../../middlewares/Onboarding/clan_Onboarding";
import { convertToClanWarMatchObject } from "../../../models/convertToClanWarMatchObject";
import { doesClanExist_clashyStats } from "../../../validation/Clan/doesClanExist";

export async function collectClanWar() {
  console.log("🏰 collectClanWar körs");
  const clanTag = "#2QJ2QG29R";

  // get current clan war data
  const clanWarData = await getCurrentWar_superCell(clanTag);

  // validate if clan exist in our DB, if not → add them and their members to our DB
  [clanWarData.clan, clanWarData.opponent].forEach(async (clan) => {
    const clanExist = await doesClanExist_clashyStats(clan.tag);
    if (!clanExist) {
      await onBoardClanAndMembers(clan);
    }
  });

  // check if opponent is scheduled for a in our queue for job, if not → Check if we already have collected DATA on the opponent

  // → → If not, add them to our DB and collect data -> Send also e-mail that checkIfClanIsAtWar didn´t add them to the DB and scheduale a job on them in the beginning of the war

  // collect clanMatch info
  const clanWarMatchObject = convertToClanWarMatchObject(clanWarData);
  console.log("👨🏼‍⚖️ clanWarMatchObject", clanWarMatchObject);
  // const {id} = await addClanWarMatchToDB(clanWarMatchObject);

  // 🍭 Loop over clan.members
  // check players attacks
  // → If no attacks have been made, send in to a function that create a playerAttack object for clan War
  // → If attacks exist, means player did attack
  // → → 🍭 Loop over attacks becuase there can be two attacks per player
  // → → → send to a function that create a playerAttack object for clan War
  // → → → add it to DB.
  // → → → Check if key "defenderTag" exist, if not, the player has not been attacked
  // → → → send in to a function that create a playerAttack object for clan War
}

/*
🏰 ClanWarMatch Object
seasonYear: convertToCorrectDateObject(clanWarData.startTime).getFullYear(
seasonMonth: convertToCorrectDateObject(clanWarData.startTime).getMonth()
clanOneTag: clanWarData.clan.tag
clanTwoTag: clanWarData.opponent.tag
clanOneStats: {
stars: clanWarData.clan.stars
attacks: clanWarData.clan.attacks
attackPercentage: clanWarData.clan.attacks.length / clanWarData.teamSize*2 
destructionPercentage: clanWarData.clan.destructionPercentage
}
clanTwoStats:{
stars: clanWarData.opponent.stars
attacks: clanWarData.opponent.attacks
destructionPercentage: clanWarData.opponent.destructionPercentage
}
teamSize: clanWarData.teamSize
winner: 
*/

/*
🍡 ClanWarAttack Object 
attackerPlayerTag:         player.tag
defenderPlayerTag:         player.opponentAttacks >= 1 ? opponentAttacks.attackerTag : null
stars:                     player.stars //→ looping over members array on clanWarData          
destructionPercentage:     player.destructionPercentage 
duration                   player.duration
attacks                    player.attacks.length
gotAttacked                player.opponentAttacks >= 1 ? true : false
*/
