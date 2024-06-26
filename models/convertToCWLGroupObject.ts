import { CLWGroupResponse_API } from "../types/ClashyStats/clanWarLeague.types";

export function convertToCWLWarGroupObject(groupData: any): CLWGroupResponse_API {
  return {
    seasonYear: groupData.seasonYear,
    seasonMonth: groupData.seasonMonth,
    clans: groupData.ClanWarLeagueGroup.flatMap((groupData: any) =>
      groupData.groupClans.map((gc: any) => ({
        clanTag: gc.clanTag,
        clanName: gc.clan.clanName, // assuming `name` is a field in `Clan`
      }))
    ),
    rounds: groupData.ClanWarLeagueGroup.flatMap((groupen: any) =>
      groupen.rounds.map((round: any) => ({
        roundID: round.id,
        roundNumber: round.roundNumber,
        matches: round.matches.map((match: any, index: number) => ({
          id: match.id,
          groupId: round.matches[index].roundId,
          roundID: match.roundId,
          clanOne: {
            clanTag: match.clanOneTag,
            clanName: match.clanOne.clanName, // assuming `name` is a field in `Clan`
          },
          clanTwo: {
            clanTag: match.clanTwoTag,
            clanName: match.clanTwo.clanName, // assuming `name` is a field in `Clan`
          },
          clanOneStats: match.clanOneStats,
          clanTwoStats: match.clanTwoStats,
          winner: match.winner,
        })),
      }))
    ),
  };
}
