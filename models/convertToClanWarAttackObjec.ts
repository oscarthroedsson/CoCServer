import {
  AttackObject_Supercell,
  ClanWarMemberObject_Supercell,
  ClanWarPlayerAttackObject_Supercell,
} from "../types/Clan/clanObject_Supercell.types";

/**
 * @description This function should be used with a flatMap.
 * @param matchId
 * @param playerData
 * @returns
 */
export function convertToClanWarAttackObject(matchId: number, playerData: ClanWarMemberObject_Supercell) {
  // if the player hasn´t attacked
  if (!playerData.attacks) {
    return [
      {
        matchId: matchId,
        attackerPlayerTag: playerData.tag,
        defenderPlayerTag: null,
        stars: 0,
        destructionPercentage: 0,
        duration: 0,
        attacks: 0,
        gotAttacked: playerData.opponentAttacks >= 1 ? true : false,
      },
    ];
  }

  // The player did attack
  return playerData.attacks.map((attack: AttackObject_Supercell) => {
    return {
      matchId: matchId,
      attackerPlayerTag: attack.attackerTag,
      defenderPlayerTag: attack.defenderTag,
      stars: attack.stars,
      destructionPercentage: attack.destructionPercentage,
      duration: attack.duration,
      attacks: playerData.attacks?.length ?? 0,
      gotAttacked: playerData.opponentAttacks >= 1 ? true : false,
    };
  });
  //
}
