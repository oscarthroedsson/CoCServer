import { warWinnerProps } from "./types/helper.types";

export function findMatchWinner(teamOne: warWinnerProps, teamTwo: warWinnerProps) {
  if (teamOne.stars > teamTwo.stars) return teamOne.clanTag;
  if (teamOne.stars < teamTwo.stars) return teamTwo.clanTag;

  if (teamOne.destructionPercentage > teamTwo.destructionPercentage) return teamOne.clanTag;
  if (teamOne.destructionPercentage < teamTwo.destructionPercentage) return teamTwo.clanTag;

  return "Tie";
}
