import { ClanWarLeagueAttack_clashyClash } from "../types/ClashyStats/clanWarLeague.types";
import { CWLMatchObjectMemberList_Supercell } from "../types/Supercell/clanWarLeague.types";

export function convertToCWLAttackObject_model(
  matchID: number,
  member: CWLMatchObjectMemberList_Supercell
): ClanWarLeagueAttack_clashyClash[] {
  if (!member.attacks) {
    return [
      {
        matchId: matchID,
        attackerPlayerTag: member.tag,
        defenderPlayerTag: null,
        attack: 0,
        stars: 0,
        destructionPercentage: 0,
        duration: 0,
        gotAttacked: member.opponentAttacks > 0 ? true : false,
      },
    ];
  }

  return member.attacks.map((attack) => {
    return {
      matchId: matchID,
      attack: 0,
      attackerPlayerTag: member.tag,
      defenderPlayerTag: attack.defenderTag,
      stars: attack.stars,
      destructionPercentage: attack.destructionPercentage,
      duration: attack.duration,
      gotAttacked: member.opponentAttacks > 0 ? true : false,
    };
  });
}
