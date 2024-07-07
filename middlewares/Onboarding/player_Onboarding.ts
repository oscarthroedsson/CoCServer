import { getPlayer_superCell } from "../../API/Player/player_Api";
import { storePlayer_clashyStats } from "../../service/Player/player_service";
import { PlayerProps_clashyStats } from "../../types/ClashyStats/player.types";

export async function onBoard_Player(playerTag: PlayerProps_clashyStats) {
  if (!playerTag || !playerTag.gameTag || !playerTag.gameName) return;

  await storePlayer_clashyStats({
    gameTag: playerTag.gameTag,
    gameName: playerTag.gameName,
    clanTag: playerTag.clanTag,
    email: null,
    acceptTerms: false,
  });
  return;
}
