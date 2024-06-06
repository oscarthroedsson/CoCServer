import { getClanWarLeagueGroup, getClanWarLeagueRoundMatch } from "../../../../API/ClanWarLeague/clanWarLeague_Api";
import { onBoardClanAndMembers } from "../../../../middlewares/Onboarding/clan_Onboarding";
import { getAllClans_clashyStats } from "../../../../service/Clan/clan_service";
import { isClanWarLeagueActive } from "../../../../validation/war/isClanWarLeagueActive";

export async function collectClanWarLeauge() {
  const allClans = await getAllClans_clashyStats();

  //
  for (const clan of allClans) {
    // // 1. Check if a CWL is active
    // const isActive = await isClanWarLeagueActive(clan.clanTag);

    // if (!isActive.status) continue; // if not, check the if the other clans have active CWL

    // // If it is active, get the group and onBoard the clan and its members
    const cwlGroup = await getClanWarLeagueGroup(clan.clanTag);
    // // make sure to add all clans and their players to our DB if they are not already there
    // if (isActive) onBoardClanAndMembers(cwlGroup.clans);

    // Determan if we collect data or scheduale a job to do so after endTime
    for (const [index, round] of cwlGroup.rounds.entries()) {
      //   console.log("🪖 ", {
      //     round: index,
      //     clan: clan.clanTag,
      //     warTags: round.warTags,
      //   });
      for (const warTag of round.warTags) {
        console.log(`id: ${warTag}`);
        // does cwlMatch exist? where: warTag & clanTag
        // -> if not |  getClanWarLeagueRoundMatch()
        // -> has endTime past ? if true | collect data | if not schduale to collect data after endTime
        //todo: ClanWarLeagueMatch måste skapas för match.clan och match.opponent
        // do cwlAttack exist?
        // -> if not | function here

        //  const match = getClanWarLeagueRoundMatch();
      }

      console.log("--------------------------------");
    }
  }
}

// table one
const cwlMatches = {
  warTag: "#829CCU22Q", // string
  clanTag: "", // string
  season: "2024-06", // "2024-06
  seasonYear: 2024, // Number(season.split("-")[0])
  seasonMonth: 6, // Number(season.split("-")[1])
  startTime: "20240602T191233.000Z",
  endTime: "20240603T193912.000Z",
  round: "", // index+1 of the objects it is in, in rounds array
  match: "", // index+1 of the objects it is in, in warTags array
  clanLevel: 5,
  teamSize: 15,
  numOfAttacks: 15,
  stars: 45,
  winner: "", // clan.destructionPercentage > opponent.destructionPercentage? clan.tag : opponent.tag
  attacks: "", // relationship to cwlAttack that has the same warTag - both the clan and the opponents attacks
};

/*
→ Gå först igenom clan.members och skapa en cwlAttack för varje medlem
→ Gå sedan igenom opponents.members för att kunna kapa samma rad för motståndaren. 
!! Försök inte samla in data från en motståndare genom clan/opponents.members[0].attacks.bestOpponentAttack → Skapa istället en relation till cwlAttack
todo: Måste lösa hur opponentsAttack kan ha relation med motstånarens cwlAttack rad så vi kan begära ut den med. 
❔ Hur kan jag skapa en relation mellan två st cwlAttack objekt om det ena inte är inlagt än?
❔ Behöver jag lägga in båda samtidigt? 
    → Det går, då jag kan loopa över både clan-key och opponents-key samtidigt och köra find på opponents.tag för att hitta rätt objekt.
*/

const cwlAttack = {
  warTag: "#829CCU22Q", // relationship to cwlRounds
  round: "", // string  // relationship to cwlRounds.round
  gameTag: "", // string
  gameName: "", // string
  stars: 0, // number
  destructionPercentage: 0, // number
  order: 0, // number //? what is this?
  opponent: "", // string attacks.defenderTag
  opponentDidAttack: false, // boolean
  opponentsAttack: "", // relationship to cwlAttack[warTag:opponent.Tag]
};
