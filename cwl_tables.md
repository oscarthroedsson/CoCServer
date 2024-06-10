Jag måste kunna:

Får av användaren/Klienten:

- Scenario 1: clanID / clanTag
- Scenario 2:clanID / månad & år (def i år, men kan ändras året)

- Hämta en specific grupp inkl alla claner som var med
- Hämta alla matcher under en runda
- Hämta specifika match

ClanWarLeagueGroup
id
seasonYear  
seasonMonth

>

ClanWarLeaugeGroupClan
clanTag
groupId → ClanWarLeagueGroup[id]

>

Clan
(Tabellen bör vara indexerad baserat på clanTag → Det betyder att id column ska bort)
clanTag → ClanWarLeagueMatch[clanOneTag|clanTwoTag]
clanName
createdAt
updatedAt

>

ClanWarLeagueMatch
id
round
clanOneTag → Clan[clanTag]
clanTwoTag → Clan[clanTag]

>

ClanWarLeagueAttacks
attackId → ClanWarLeagueAttack[id]
matchId → ClanWarLeagueMatch[id]

>

ClanWarLeagueAttack
id → ClanWarLeagueAttacks[attackId]
attackerPlayerTag → Player[playerTag]
defenderPlayerTag → Player[playerTag]
stars
destructionPerccentage
duration

>
