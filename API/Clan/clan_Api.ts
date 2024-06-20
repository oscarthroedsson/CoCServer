import { ClanObject } from "../../types/Supercell/clan.types";
import { changeToURLencoding } from "../../utils/helpers/urlEncoding";

export async function getClan_superCell(clanTag: string): Promise<ClanObject> {
  const convertedClanTag = changeToURLencoding(clanTag);
  console.log("getClan_superCell |  convertedClanTag: ", convertedClanTag);

  const response = await fetch(`https://cocproxy.royaleapi.dev/v1/clans/${convertedClanTag}`, {
    headers: {
      Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6IjIwZDEzMTRmLTk2NWQtNDQyMi04ZTliLTAwZGU2OTc2NGM3ZCIsImlhdCI6MTcxMDA3NTI1NCwic3ViIjoiZGV2ZWxvcGVyL2I0NGU2MzA3LTc5OTQtMWZlZS0xNzJiLTcwMDNkNDIxZWIwNSIsInNjb3BlcyI6WyJjbGFzaCJdLCJsaW1pdHMiOlt7InRpZXIiOiJkZXZlbG9wZXIvc2lsdmVyIiwidHlwZSI6InRocm90dGxpbmcifSx7ImNpZHJzIjpbIjQ1Ljc5LjIxOC43OSJdLCJ0eXBlIjoiY2xpZW50In1dfQ.3FOXmu0I5pMogrT8u45FXzal0H0KJq_XwGO794-hci2lSDaPPSK_5Ccb3s8mcIZ7EuBGKHOtaMPcPnqpUszHNg`,
    },
  });

  const data = await response.json();

  return data;
}
