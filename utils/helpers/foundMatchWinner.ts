import { warWinnerProps } from "./types/helper.types";

export function findMatchWinner(teamOne: warWinnerProps, teamTwo: warWinnerProps) {
  if (teamOne.stars > teamTwo.stars) return teamOne.clanTag ? teamOne.clanTag : teamOne.tag;
  if (teamOne.stars < teamTwo.stars) return teamTwo.clanTag ? teamTwo.clanTag : teamTwo.tag;

  if (teamOne.destructionPercentage > teamTwo.destructionPercentage)
    return teamOne.clanTag ? teamOne.clanTag : teamOne.tag;
  if (teamOne.destructionPercentage < teamTwo.destructionPercentage)
    return teamTwo.clanTag ? teamTwo.clanTag : teamTwo.tag;

  return "Tie";
}
