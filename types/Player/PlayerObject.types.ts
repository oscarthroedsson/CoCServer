export interface PlayerObjectResponse {
  tag: string;
  name: string;
  townHallLevel: number;
  townHallWeaponLevel: number;
  expLevel: number;
  trophies: number;
  bestTrophies: number;
  warStars: number;
  attackWins: number;
  defenseWins: number;
  builderHallLevel: number;
  builderBaseTrophies: number;
  bestBuilderBaseTrophies: number;
  role: string;
  warPreference: string;
  donations: number;
  donationsReceived: number;
  clanCapitalContributions: number;
  clan: ClanObject;
  league: LeagueObject;
  builderBaseLeague: builderBaseLeagueObject;
  achievements: AchievementsObject[];
  playerHouse: {
    elements: [
      {
        type: string;
        id: number;
      }
    ];
  };
  labels: LabelsObject[];
  troops: TroopsObject[];
  heroes: HeroObject[];
  heroEquipment: HeroEquipment[];
  spells: SpellObject[];
}

interface ClanObject {
  tag: string;
  name: string;
  clanLevel: number;
  badgeUrls: {
    small: string;
    large: string;
    medium: string;
  };
}

interface LeagueObject {
  id: number;
  name: string;
  iconUrls: {
    small: string;
    tiny: string;
    medium: string;
  };
}

interface builderBaseLeagueObject {
  id: number;
  name: string;
}

interface AchievementsObject {
  name: string;
  stars: number;
  value: number;
  target: number;
  info: string;
  completionInfo: string | null;
  village: string;
}

interface LabelsObject {
  id: number;
  name: string;
  iconUrls: {
    small: string;
    medium: string;
  };
}

interface TroopsObject {
  name: string;
  level: number;
  maxLevel: number;
  village: string;
}

interface HeroObject {
  name: string;
  level: number;
  maxLevel: number;
  equipment: {
    name: string;
    level: number;
    maxLevel: number;
    village: string;
  }[];
}

interface HeroEquipment {
  name: string;
  level: number;
  maxLevel: number;
  village: string;
}

interface SpellObject {
  name: string;
  level: number;
  maxLevel: number;
  village: string;
}
