export function getAttackPercentage(attacksPerPlayer: number, teamSize: number, members: any) {
  const possibleAttacks = teamSize * attacksPerPlayer;
  const attacksMade = members.reduce((acc: number, player: any) => {
    const attacksCount = player.attacks ? player.attacks.length : 0;
    return acc + attacksCount;
  }, 0);
  const attackPercentage = (attacksMade / possibleAttacks) * 100;

  return attackPercentage;
}
