// Champion API V4
function ChampionMasteryV4(chestGranted, championLevel, championPoints, championId, championPointsUntilNextLevel, lastPlayTime, tokensEarned, championPointsSinceLastLevel, summonerId) {
  this.chestGranted = chestGranted;
  this.championLevel = championLevel;
  this.championPoints = championPoints;
  this.championId = championId;
  this.championPointsUntilNextLevel = championPointsUntilNextLevel;
  this.lastPlayTime = lastPlayTime;
  this.tokensEarned = tokensEarned;
  this.championPointsSinceLastLevel = championPointsSinceLastLevel;
  this.summonerId = summonerId;
}

ChampionMasteryV4.fromJSONList = function (json) {
  return json.map(obj => new ChampionMasteryV4(obj.chestGranted, obj.championLevel, obj.championPoints, obj.championId, obj.championPointsUntilNextLevel, obj.lastPlayTime, obj.tokensEarned, obj.championPointsSinceLastLevel, obj.summonerId));
};

ChampionMasteryV4.fromJSON = function (json) {
  return new ChampionMasteryV4(json.chestGranted, json.championLevel, json.championPoints, json.championId, json.championPointsUntilNextLevel, json.lastPlayTime, json.tokensEarned, json.championPointsSinceLastLevel, json.summonerId);
};

// League API V4
function LeagueList(leagueId, tier, entries, queue, name) {
  this.leagueId = leagueId;
  this.tier = tier;
  this.entries = entries.map(obj => LeagueItem.fromJSON(obj));
  this.queue = queue;
  this.name = name;
}

LeagueList.fromJSON = function (json) {
  return new LeagueList(json.leagueId, json.tier, json.entries, json.queue, json.name);
};

function LeagueItem(rank, hotStreak, miniSeries, wins, veteran, losses, freshBlood, playerOrTeamName, inactive, playerOrTeamId, leaguePoints) {
  this.rank = rank;
  this.hotStreak = hotStreak;
  this.miniSeries = MiniSeries.fromJSON(miniSeries);
  this.wins = wins;
  this.veteran = veteran;
  this.losses = losses;
  this.freshBlood = freshBlood;
  this.playerOrTeamName = playerOrTeamName;
  this.inactive = inactive;
  this.playerOrTeamId = playerOrTeamId;
  this.leaguePoints = leaguePoints;
}

LeagueItem.fromJSON = function (json) {
  return new LeagueItem(json.rank, json.hotStreak, json.miniSeries, json.wins, json.veteran, json.losses, json.freshBlood, json.playerOrTeamName, json.inactive, json.playerOrTeamId, json.leaguePoints);
};

function LeaguePosition(queueType, summonerName, hotStreak, miniSeries, wins, veteran, losses, freshBlood, leagueId, inactive, rank, leagueName, tier, summonerId, leaguePoints) {
  this.queueType = queueType;
  this.summonerName = summonerName;
  this.hotStreak = hotStreak;
  this.miniSeries = MiniSeries.fromJSON(miniSeries);
  this.wins = wins;
  this.veteran = veteran;
  this.losses = losses;
  this.freshBlood = freshBlood;
  this.leagueId = leagueId;
  this.inactive = inactive;
  this.rank = rank;
  this.leagueName = leagueName;
  this.tier = tier;
  this.summonerId = summonerId;
  this.leaguePoints = leaguePoints;
}

LeaguePosition.fromJSON = function (json) {
  return new LeaguePosition(json.queueType, json.summonerName, json.hotStreak, json.miniSeries, json.wins, json.veteran, json.losses, json.freshBlood, json.leagueId, json.inactive, json.rank, json.leagueName, json.tier, json.summonerId, json.leaguePoints);
};

function MiniSeries(wins, losses, target, progress) {
  this.wins = wins;
  this.losses = losses;
  this.target = target;
  this.progress = progress;
}

MiniSeries.fromJSON = function (json) {
  return new MiniSeriesDTO(json.wins, json.losses, json.target, json.progress);
};

// Match API V4
function MatchV4(seasonId, queueId, gameId, participantIdentities, gameVersion, platformId, gameMode, mapId, gameType, teams, participants, gameDuration, gameCreation) {
  this.seasonId = seasonId;
  this.queueId = queueId;
  this.gameId = gameId;
  this.participantIdentities = participantIdentities.map(x => ParticipantIdentity.fromJSON(x));
  this.gameVersion = gameVersion;
  this.platformId = platformId;
  this.gameMode = gameMode;
  this.mapId = mapId;
  this.gameType = gameType;
  this.teams = teams.map(x => TeamStats.fromJSON(x));
  this.participants = participants.map(x => Participant.fromJSON(x));
  this.gameDuration = gameDuration;
  this.gameCreation = gameCreation;
}

MatchV4.fromJSON = function (json) {
  return new MatchV4(json.seasonId, json.queueId, json.gameId, json.participantIdentities, json.gameVersion, json.platformId, json.gameMode, json.mapId, json.gameType, json.teams, json.participants, json.gameDuration, json.gameCreation);
};

function ParticipantIdentity(player, participantId) {
  this.player = Player.fromJSON(player);
  this.participantId = participantId;
}

ParticipantIdentity.fromJSON = function (json) {
  return new ParticipantIdentity(json.player, json.participantId);
};

function Player(currentPlatformId, summonerName, matchHistoryUri, platformId, currentAccountId, profileIcon, summonerId, accountId) {
  this.currentPlatformId = currentPlatformId;
  this.summonerName = summonerName;
  this.matchHistoryUri = matchHistoryUri;
  this.platformId = platformId;
  this.currentAccountId = currentAccountId;
  this.profileIcon = profileIcon;
  this.summonerId = summonerId;
  this.accountId = accountId;
}

Player.fromJSON = function (json) {
  return new Player(json.currentPlatformId, json.summonerName, json.matchHistoryUri, json.platformId, json.currentAccountId, json.profileIcon, json.summonerId, json.accountId);
};

function TeamStats(firstDragon, firstInhibitor, bans, baronKills, firstRiftHerald, firstBaron, riftHeraldKills, firstBlood, teamId, firstTower, vilemawKills, inhibitorKills, towerKills, dominionVictoryScore, win, dragonKills) {
  this.firstDragon = firstDragon;
  this.firstInhibitor = firstInhibitor;
  this.bans = bans.map(x => TeamBans.fromJSON(x));
  this.baronKills = baronKills;
  this.firstRiftHerald = firstRiftHerald;
  this.firstBaron = firstBaron;
  this.riftHeraldKills = riftHeraldKills;
  this.firstBlood = firstBlood;
  this.teamId = teamId;
  this.firstTower = firstTower;
  this.vilemawKills = vilemawKills;
  this.inhibitorKills = inhibitorKills;
  this.towerKills = towerKills;
  this.dominionVictoryScore = dominionVictoryScore;
  this.win = win;
  this.dragonKills = dragonKills;
}

TeamStats.fromJSON = function (json) {
  return new TeamStats(json.firstDragon, json.firstInhibitor, json.bans, json.baronKills, json.firstRiftHerald, json.firstBaron, json.riftHeraldKills, json.firstBlood, json.teamId, json.firstTower, json.vilemawKills, json.inhibitorKills, json.towerKills, json.dominionVictoryScore, json.win, json.dragonKills);
};

function TeamBans(pickTurn, championId) {
  this.pickTurn = pickTurn;
  this.championId = championId;
}

TeamBans.fromJSON = function (json) {
  return new TeamBans(json.pickTurn, json.championId);
};

function Participant(stats, participantId, runes, timeline, teamId, spell2Id, masteries, highestAchievedSeasonTier, spell1Id, championId) {
  this.stats = ParticipantStats.fromJSON(stats);
  this.participantId = participantId;
  this.runes = runes ? runes.map(x => Rune.fromJSON(x)) : [];
  this.timeline = ParticipantTimeline.fromJSON(timeline);
  this.teamId = teamId;
  this.spell2Id = spell2Id;
  this.masteries = masteries ? masteries.map(x => Mastery.fromJSON(x)) : [];
  this.highestAchievedSeasonTier = highestAchievedSeasonTier;
  this.spell1Id = spell1Id;
  this.championId = championId;
}

Participant.fromJSON = function (json) {
  return new Participant(json.stats, json.participantId, json.runes, json.timeline, json.teamId, json.spell2Id, json.masteries, json.highestAchievedSeasonTier, json.spell1Id, json.championId);
};

function ParticipantStats(firstBloodAssist, visionScore, magicDamageDealtToChampions, damageDealtToObjectives, totalTimeCrowdControlDealt, longestTimeSpentLiving, perk1Var1, perk1Var3, perk1Var2, tripleKills, perk3Var3, nodeNeutralizeAssist, perk3Var2, playerScore9, playerScore8, kills, playerScore1, playerScore0, playerScore3, playerScore2, playerScore5, playerScore4, playerScore7, playerScore6, perk5Var1, perk5Var3, perk5Var2, totalScoreRank, neutralMinionsKilled, damageDealtToTurrets, physicalDamageDealtToChampions, nodeCapture, largestMultiKill, perk2Var2, perk2Var3, totalUnitsHealed, perk2Var1, perk4Var1, perk4Var2, perk4Var3, wardsKilled, largestCriticalStrike, largestKillingSpree, quadraKills, teamObjective, magicDamageDealt, item2, item3, item0, neutralMinionsKilledTeamJungle, item6, item4, item5, perk1, perk0, perk3, perk2, perk5, perk4, perk3Var1, damageSelfMitigated, magicalDamageTaken, firstInhibitorKill, trueDamageTaken, nodeNeutralize, assists, combatPlayerScore, perkPrimaryStyle, goldSpent, trueDamageDealt, participantId, totalDamageTaken, physicalDamageDealt, sightWardsBoughtInGame, totalDamageDealtToChampions, physicalDamageTaken, totalPlayerScore, win, objectivePlayerScore, totalDamageDealt, item1, neutralMinionsKilledEnemyJungle, deaths, wardsPlaced, perkSubStyle, turretKills, firstBloodKill, trueDamageDealtToChampions, goldEarned, killingSprees, unrealKills, altarsCaptured, firstTowerAssist, firstTowerKill, champLevel, doubleKills, nodeCaptureAssist, inhibitorKills, firstInhibitorAssist, perk0Var1, perk0Var2, perk0Var3, visionWardsBoughtInGame, altarsNeutralized, pentaKills, totalHeal, totalMinionsKilled, timeCCingOthers) {
  this.firstBloodAssist = firstBloodAssist;
  this.visionScore = visionScore;
  this.magicDamageDealtToChampions = magicDamageDealtToChampions;
  this.damageDealtToObjectives = damageDealtToObjectives;
  this.totalTimeCrowdControlDealt = totalTimeCrowdControlDealt;
  this.longestTimeSpentLiving = longestTimeSpentLiving;
  this.perk1Var1 = perk1Var1;
  this.perk1Var3 = perk1Var3;
  this.perk1Var2 = perk1Var2;
  this.tripleKills = tripleKills;
  this.perk3Var3 = perk3Var3;
  this.nodeNeutralizeAssist = nodeNeutralizeAssist;
  this.perk3Var2 = perk3Var2;
  this.playerScore9 = playerScore9;
  this.playerScore8 = playerScore8;
  this.kills = kills;
  this.playerScore1 = playerScore1;
  this.playerScore0 = playerScore0;
  this.playerScore3 = playerScore3;
  this.playerScore2 = playerScore2;
  this.playerScore5 = playerScore5;
  this.playerScore4 = playerScore4;
  this.playerScore7 = playerScore7;
  this.playerScore6 = playerScore6;
  this.perk5Var1 = perk5Var1;
  this.perk5Var3 = perk5Var3;
  this.perk5Var2 = perk5Var2;
  this.totalScoreRank = totalScoreRank;
  this.neutralMinionsKilled = neutralMinionsKilled;
  this.damageDealtToTurrets = damageDealtToTurrets;
  this.physicalDamageDealtToChampions = physicalDamageDealtToChampions;
  this.nodeCapture = nodeCapture;
  this.largestMultiKill = largestMultiKill;
  this.perk2Var2 = perk2Var2;
  this.perk2Var3 = perk2Var3;
  this.totalUnitsHealed = totalUnitsHealed;
  this.perk2Var1 = perk2Var1;
  this.perk4Var1 = perk4Var1;
  this.perk4Var2 = perk4Var2;
  this.perk4Var3 = perk4Var3;
  this.wardsKilled = wardsKilled;
  this.largestCriticalStrike = largestCriticalStrike;
  this.largestKillingSpree = largestKillingSpree;
  this.quadraKills = quadraKills;
  this.teamObjective = teamObjective;
  this.magicDamageDealt = magicDamageDealt;
  this.item2 = item2;
  this.item3 = item3;
  this.item0 = item0;
  this.neutralMinionsKilledTeamJungle = neutralMinionsKilledTeamJungle;
  this.item6 = item6;
  this.item4 = item4;
  this.item5 = item5;
  this.perk1 = perk1;
  this.perk0 = perk0;
  this.perk3 = perk3;
  this.perk2 = perk2;
  this.perk5 = perk5;
  this.perk4 = perk4;
  this.perk3Var1 = perk3Var1;
  this.damageSelfMitigated = damageSelfMitigated;
  this.magicalDamageTaken = magicalDamageTaken;
  this.firstInhibitorKill = firstInhibitorKill;
  this.trueDamageTaken = trueDamageTaken;
  this.nodeNeutralize = nodeNeutralize;
  this.assists = assists;
  this.combatPlayerScore = combatPlayerScore;
  this.perkPrimaryStyle = perkPrimaryStyle;
  this.goldSpent = goldSpent;
  this.trueDamageDealt = trueDamageDealt;
  this.participantId = participantId;
  this.totalDamageTaken = totalDamageTaken;
  this.physicalDamageDealt = physicalDamageDealt;
  this.sightWardsBoughtInGame = sightWardsBoughtInGame;
  this.totalDamageDealtToChampions = totalDamageDealtToChampions;
  this.physicalDamageTaken = physicalDamageTaken;
  this.totalPlayerScore = totalPlayerScore;
  this.win = win;
  this.objectivePlayerScore = objectivePlayerScore;
  this.totalDamageDealt = totalDamageDealt;
  this.item1 = item1;
  this.neutralMinionsKilledEnemyJungle = neutralMinionsKilledEnemyJungle;
  this.deaths = deaths;
  this.wardsPlaced = wardsPlaced;
  this.perkSubStyle = perkSubStyle;
  this.turretKills = turretKills;
  this.firstBloodKill = firstBloodKill;
  this.trueDamageDealtToChampions = trueDamageDealtToChampions;
  this.goldEarned = goldEarned;
  this.killingSprees = killingSprees;
  this.unrealKills = unrealKills;
  this.altarsCaptured = altarsCaptured;
  this.firstTowerAssist = firstTowerAssist;
  this.firstTowerKill = firstTowerKill;
  this.champLevel = champLevel;
  this.doubleKills = doubleKills;
  this.nodeCaptureAssist = nodeCaptureAssist;
  this.inhibitorKills = inhibitorKills;
  this.firstInhibitorAssist = firstInhibitorAssist;
  this.perk0Var1 = perk0Var1;
  this.perk0Var2 = perk0Var2;
  this.perk0Var3 = perk0Var3;
  this.visionWardsBoughtInGame = visionWardsBoughtInGame;
  this.altarsNeutralized = altarsNeutralized;
  this.pentaKills = pentaKills;
  this.totalHeal = totalHeal;
  this.totalMinionsKilled = totalMinionsKilled;
  this.timeCCingOthers = timeCCingOthers;
}

ParticipantStats.fromJSON = function (json) {
  return new ParticipantStats(json.firstBloodAssist, json.visionScore, json.magicDamageDealtToChampions, json.damageDealtToObjectives, json.totalTimeCrowdControlDealt, json.longestTimeSpentLiving, json.perk1Var1, json.perk1Var3, json.perk1Var2, json.tripleKills, json.perk3Var3, json.nodeNeutralizeAssist, json.perk3Var2, json.playerScore9, json.playerScore8, json.kills, json.playerScore1, json.playerScore0, json.playerScore3, json.playerScore2, json.playerScore5, json.playerScore4, json.playerScore7, json.playerScore6, json.perk5Var1, json.perk5Var3, json.perk5Var2, json.totalScoreRank, json.neutralMinionsKilled, json.damageDealtToTurrets, json.physicalDamageDealtToChampions, json.nodeCapture, json.largestMultiKill, json.perk2Var2, json.perk2Var3, json.totalUnitsHealed, json.perk2Var1, json.perk4Var1, json.perk4Var2, json.perk4Var3, json.wardsKilled, json.largestCriticalStrike, json.largestKillingSpree, json.quadraKills, json.teamObjective, json.magicDamageDealt, json.item2, json.item3, json.item0, json.neutralMinionsKilledTeamJungle, json.item6, json.item4, json.item5, json.perk1, json.perk0, json.perk3, json.perk2, json.perk5, json.perk4, json.perk3Var1, json.damageSelfMitigated, json.magicalDamageTaken, json.firstInhibitorKill, json.trueDamageTaken, json.nodeNeutralize, json.assists, json.combatPlayerScore, json.perkPrimaryStyle, json.goldSpent, json.trueDamageDealt, json.participantId, json.totalDamageTaken, json.physicalDamageDealt, json.sightWardsBoughtInGame, json.totalDamageDealtToChampions, json.physicalDamageTaken, json.totalPlayerScore, json.win, json.objectivePlayerScore, json.totalDamageDealt, json.item1, json.neutralMinionsKilledEnemyJungle, json.deaths, json.wardsPlaced, json.perkSubStyle, json.turretKills, json.firstBloodKill, json.trueDamageDealtToChampions, json.goldEarned, json.killingSprees, json.unrealKills, json.altarsCaptured, json.firstTowerAssist, json.firstTowerKill, json.champLevel, json.doubleKills, json.nodeCaptureAssist, json.inhibitorKills, json.firstInhibitorAssist, json.perk0Var1, json.perk0Var2, json.perk0Var3, json.visionWardsBoughtInGame, json.altarsNeutralized, json.pentaKills, json.totalHeal, json.totalMinionsKilled, json.timeCCingOthers);
};

function Rune(runeId, rank) {
  this.runeId = runeId;
  this.rank = rank;
}

Rune.fromJSON = function (json) {
  return new Rune(json.runeId, json.rank);
};

function ParticipantTimeline(lane, participantId, csDiffPerMinDeltas, goldPerMinDeltas, xpDiffPerMinDeltas, creepsPerMinDeltas, xpPerMinDeltas, role, damageTakenDiffPerMinDeltas, damageTakenPerMinDeltas) {
  this.lane = lane;
  this.participantId = participantId;
  this.csDiffPerMinDeltas = csDiffPerMinDeltas;
  this.goldPerMinDeltas = goldPerMinDeltas;
  this.xpDiffPerMinDeltas = xpDiffPerMinDeltas;
  this.creepsPerMinDeltas = creepsPerMinDeltas;
  this.xpPerMinDeltas = xpPerMinDeltas;
  this.role = role;
  this.damageTakenDiffPerMinDeltas = damageTakenDiffPerMinDeltas;
  this.damageTakenPerMinDeltas = damageTakenPerMinDeltas;
}

ParticipantTimeline.fromJSON = function (json) {
  return new ParticipantTimeline(json.lane, json.participantId, json.csDiffPerMinDeltas, json.goldPerMinDeltas, json.xpDiffPerMinDeltas, json.creepsPerMinDeltas, json.xpPerMinDeltas, json.role, json.damageTakenDiffPerMinDeltas, json.damageTakenPerMinDeltas);
};

function Mastery(masteryId, rank) {
  this.masteryId = masteryId;
  this.rank = rank;
}

Mastery.fromJSON = function (json) {
  return new Mastery(json.masteryId, json.rank);
};

function MatchTimelineV4(frames, frameInterval) {
  this.frames = frames.map(obj => MatchFrame.fromJSON(obj));
  this.frameInterval = frameInterval;
}

MatchTimelineV4.fromJSON = function (json) {
  return new MatchTimelineV4(json.frames, json.frameInterval);
};

function MatchFrame(timestamp, participantFrames, events) {
  this.participantFrames = {};
  for (var key in participantFrames) this.participantFrames[key] = MatchParticipantFrame.fromJSON(participantFrames[key]);

  this.timestamp = timestamp;
  this.events = events.map(obj => MatchEvent.fromJSON(obj));
}

MatchFrame.fromJSON = function (json) {
  return new MatchFrame(json.timestamp, json.participantFrames, json.events);
};

function MatchParticipantFrame(totalGold, teamScore, participantId, level, currentGold, minionsKilled, dominionScore, position, xp, jungleMinionsKilled) {
  this.totalGold = totalGold;
  this.teamScore = teamScore;
  this.participantId = participantId;
  this.level = level;
  this.currentGold = currentGold;
  this.minionsKilled = minionsKilled;
  this.dominionScore = dominionScore;
  this.position = MatchPosition.fromJSON(position);
  this.xp = xp;
  this.jungleMinionsKilled = jungleMinionsKilled;
}

MatchParticipantFrame.fromJSON = function (json) {
  return new MatchParticipantFrame(json.totalGold, json.teamScore, json.participantId, json.level, json.currentGold, json.minionsKilled, json.dominionScore, json.position, json.xp, json.jungleMinionsKilled);
};

function MatchPosition(y, x) {
  this.y = y;
  this.x = x;
}

MatchPosition.fromJSON = function (json) {
  return new MatchPosition(json.y, json.x);
};

function MatchEvent(eventType, towerType, teamId, ascendedType, killerId, levelUpType, pointCaptured, assistingParticipantIds, wardType, monsterType, type, skillSlot, victimId, timestamp, afterId, monsterSubType, laneType, itemId, participantId, buildingType, creatorId, position, beforeId) {
  this.eventType = eventType;
  this.towerType = towerType;
  this.teamId = teamId;
  this.ascendedType = ascendedType;
  this.killerId = killerId;
  this.levelUpType = levelUpType;
  this.pointCaptured = pointCaptured;
  this.assistingParticipantIds = assistingParticipantIds;
  this.wardType = wardType;
  this.monsterType = monsterType;
  this.type = type;
  this.skillSlot = skillSlot;
  this.victimId = victimId;
  this.timestamp = timestamp;
  this.afterId = afterId;
  this.monsterSubType = monsterSubType;
  this.laneType = laneType;
  this.itemId = itemId;
  this.participantId = participantId;
  this.buildingType = buildingType;
  this.creatorId = creatorId;
  this.position = position;
  this.beforeId = beforeId;
}

MatchEvent.fromJSON = function (json) {
  return new MatchEvent(json.eventType, json.towerType, json.teamId, json.ascendedType, json.killerId, json.levelUpType, json.pointCaptured, json.assistingParticipantIds, json.wardType, json.monsterType, json.type, json.skillSlot, json.victimId, json.timestamp, json.afterId, json.monsterSubType, json.laneType, json.itemId, json.participantId, json.buildingType, json.creatorId, json.position, json.beforeId);
};

function MatchListV4(matches, totalGames, startIndex, endIndex) {
  this.matches = matches.map(obj => MatchReference.fromJSON(obj));
  this.totalGames = totalGames;
  this.startIndex = startIndex;
  this.endIndex = endIndex;
}

MatchListV4.fromJSON = function (json) {
  return new MatchListV4(json.matches, json.totalGames, json.startIndex, json.endIndex);
};

function MatchReference(lane, gameId, champion, platformId, timestamp, queue, role, season) {
  this.lane = lane;
  this.gameId = gameId;
  this.champion = champion;
  this.platformId = platformId;
  this.timestamp = timestamp;
  this.queue = queue;
  this.role = role;
  this.season = season;
}

MatchReference.fromJSON = function (json) {
  return new MatchReference(json.lane, json.gameId, json.champion, json.platformId, json.timestamp, json.queue, json.role, json.season);
};

// Summoner API V4
function SummonerV4(profileIconId, name, puuid, summonerLevel, revisionDate, id, accountId) {
  this.profileIconId = profileIconId;
  this.name = name;
  this.puuid = puuid;
  this.summonerLevel = summonerLevel;
  this.revisionDate = revisionDate;
  this.id = id;
  this.accountId = accountId;
}

SummonerV4.fromJSON = function (json) {
  return new SummonerV4(json.profileIconId, json.name, json.puuid, json.summonerLevel, json.revisionDate, json.id, json.accountId);
};

module.exports = {
  ChampionMasteryV4,
  MatchV4,
  MatchTimelineV4,
  MatchListV4,
  SummonerV4,
};