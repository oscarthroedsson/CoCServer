import { CWLMatchObjectMemberList_Supercell } from "../types/Clan/clanObject_Supercell.types";

export function convertToAttackObject(
  clanAttacks: CWLMatchObjectMemberList_Supercell[],
  opponentAttacks: CWLMatchObjectMemberList_Supercell[],
  matchId: number
) {
  const clanAttackObject = clanAttacks.map((attack) => {
    // const opponentsAttackObject = opponentAttacks.map((opponent) =>
    //   opponent.attacks.find((attacker) => attacker.tag === attack?.attacks[0]?.defenderTag)
    // );

    return {
      attackerPlayerTag: attack.attacks[0]?.attackerTag,
      defenderPlayerTag: attack.attacks[0]?.defenderTag,
      stars: attack.attacks[0]?.stars,
      destructionPercentage: attack.attacks[0]?.destructionPercentage,
      duration: attack.attacks[0]?.duration,
      matchId: matchId,
      gotAttacked: attack.opponentAttacks > 0 ? true : false,
    };
  });

  const opponentsAttackObject = opponentAttacks.map((attack) => {
    // const clanAttackObject = clanAttacks.find((clanAttack) => clanAttack.tag === attack?.attacks[0]?.defenderTag);

    return {
      attackerPlayerTag: attack.attacks[0]?.attackerTag,
      defenderPlayerTag: attack.attacks[0]?.defenderTag,
      stars: attack.attacks[0]?.stars,
      destructionPercentage: attack.attacks[0]?.destructionPercentage,
      duration: attack.attacks[0]?.duration,
      matchId: matchId,
      gotAttacked: attack.opponentAttacks > 0 ? true : false,
    };
  });

  const allAttacks = [...clanAttackObject, ...opponentsAttackObject];

  return allAttacks;
}
