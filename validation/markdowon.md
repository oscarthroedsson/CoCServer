model CapitalRaids {
id Int @id @default(autoincrement())
clanTag Int
clanName String
clan Clan @relation(fields: [clanTag], references: [id])
totalRaids String
raids CapitalRaid[]

@@map("capital_raids")
}

// Is a row for every week of the season (Fre - Mon)
model CapitalRaid {
id Int @id @default(autoincrement())
clanTag String
clanName String
defender String
totalAttacks Int
enemyDistrictsDestroyed Int
raidsCompleted Int
offensiveReward Int
defensiveReward Int
seasonYear Int
seasonMonth Int
raid Int
numberOfAttacks Int
attacks CapitalRaidAttack[]

capitalRaidsId Int
capitalRaids CapitalRaids @relation(fields: [capitalRaidsId], references: [id])

@@map("capital_raid")
}

// is a object for one single attack in a raid
model CapitalRaidAttack {
id Int @id @default(autoincrement())
playerName String
playerTag String
district String
destruction Int
starsReached Int
seasonYear Int
seasonMonth Int
capitalRaidId Int
capitalRaid CapitalRaid @relation(fields: [capitalRaidId], references: [id])

@@map("capital_raid_attack")
}
