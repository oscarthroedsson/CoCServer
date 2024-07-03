import { CWLMatchObjectMemberList_Supercell } from "../types/Supercell/clanWarLeague.types";

export function convertToAttackObject(clanMember: CWLMatchObjectMemberList_Supercell, index: number) {
  if (!clanMember.attacks) {
    return [
      {
        matchId: 0,
        attack: index,
        attackerPlayerTag: clanMember.tag,
        defenderPlayerTag: null,
        stars: 0,
        destructionPercentage: 0,
        duration: 0,
        gotAttacked: clanMember.opponentAttacks > 0 ? true : false,
      },
    ];
  }

  return clanMember.attacks.map((attack, index) => {
    return {
      matchId: 0,
      attack: index + 1,
      attackerPlayerTag: clanMember.tag,
      defenderPlayerTag: attack.defenderTag,
      stars: attack.stars,
      destructionPercentage: attack.destructionPercentage,
      duration: attack.duration,
      gotAttacked: clanMember.opponentAttacks > 0 ? true : false,
    };
  });
}
