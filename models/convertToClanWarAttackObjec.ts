import { AttackObject_Supercell, ClanWarMemberObject_Supercell } from "../types/Supercell/clanWar.types";

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
        attack: 0,
        gotAttacked: playerData.opponentAttacks >= 1 ? true : false,
      },
    ];
  }

  // need to do this, TS does not understand "hasOwnProperty" and belive that attack till can be underfined

  // The player did attack
  return playerData.attacks.map((attack: AttackObject_Supercell, index: number) => {
    return {
      matchId: matchId,
      attackerPlayerTag: attack.attackerTag,
      defenderPlayerTag: attack.defenderTag,
      stars: attack.stars,
      destructionPercentage: attack.destructionPercentage,
      duration: attack.duration,
      attacks: playerData.attacks?.length ?? 0,
      attack: index + 1,
      gotAttacked: playerData.opponentAttacks >= 1 ? true : false,
    };
  });
  //
}
