import { getPlayer_superCell } from "../../API/Player/player_Api";
import { storePlayer_clashyStats } from "../../service/Player/player_service";

export async function onBoard_Player(playerTag: string) {
  const playerData = await getPlayer_superCell(playerTag);
  if (!playerData) {
    console.error("❗❗ Player data not found", playerTag);
    return;
  }

  await storePlayer_clashyStats({
    gameTag: playerData.tag,
    gameName: playerData.name,
    clanTag: playerData.clan ? playerData.clan.tag : null,
    email: null,
    acceptTerms: false,
  });
  return;
}
