const https = require("https");

const {
  escape,
  format,
  validateJSON
} = require("./libs/utils");

const {
  ChampionMasteryV4,
  MatchV4,
  MatchTimelineV4,
  MatchListV4,
  SummonerV4,
} = require("./libs/classes");

const {
  REGION,
  RESPONSE_ERRORS,
  SEASON,
} = require('./libs/gameConstants');

function RiotAPI(api_key, options = {}) {
  if (!(this instanceof RiotAPI)) return new RiotAPI(api_key, options);
  if (!api_key || api_key.length == 0)
    throw new Error("All RiotAPI instances require an api key!");

  this.api_key = api_key;
  this.region = options.region || REGION.north_america;
}

RiotAPI.REGION = REGION;
RiotAPI.RESPONSE_ERRORS = RESPONSE_ERRORS;
RiotAPI.SEASONS = SEASONS;

RiotAPI.prototype._request = function (path, options = {}) {
  return new Promise((resolve, reject) => {
    const region = options.region || this.region;
    const query = options.query || {};

    // Sets up the http request options
    const reqOptions = {
      hostname: region + ".api.riotgames.com",
      path: escape(path),
      method: "GET",
      headers: {
        "X-Riot-Token": this.api_key
      },
      query: query
    };

    const req = https.request(reqOptions, res => {
      res.setEncoding("utf8");
      let data = "";

      res.on("data", chunk => (data += chunk));

      res.on("end", () =>
        validateJSON(data)
        .then(value => {
          if (res.statusCode == 200) resolve(value);
          else
            reject({
              statusCode: res.statusCode,
              headers: res.headers,
              data: value
            });
        })
        .catch(err => reject(err))
      );
    });

    req.on("error", err =>
      reject({
        error: err
      })
    );
    req.end();
  });
};

// =============================
// =    Champion Mastery V4    =
// =============================
RiotAPI.prototype.getChamptionMasteryListV4BySummonerId = function (id, options) {
  return this._request(format("/lol/champion-mastery/v4/champion-masteries/by-summoner/{encryptedSummonerId}", {
    encryptedSummonerId: id
  }), options).then(res => ChampionMasteryV4.fromJSONList(res));
};

RiotAPI.prototype.getChamptionMasteryV4BySummonerIdByChampionId = function (summonerId, championId, options) {
  return this._request(format("/lol/champion-mastery/v4/champion-masteries/by-summoner/{encryptedSummonerId}/by-champion/{championId}", {
    encryptedSummonerId: summonerId,
    championId: championId
  }), options).then(res => ChampionMasteryV4.fromJSON(res));
};

RiotAPI.prototype.getChamptionMasteryV4ScoreBySummonerId = function (id, options) {
  return this._request(format("/lol/champion-mastery/v4/scores/by-summoner/{encryptedSummonerId}", {
    encryptedSummonerId: id,
  }), options);
};

// ==================
// =    Match V4    =
// ==================
RiotAPI.prototype.getMatchV4ByMatchId = function (id, options) {
  return this._request(
    format("/lol/match/v4/matches/{matchId}", {
      matchId: id
    }),
    options
  ).then(match => MatchV4.fromJSON(match));
};

RiotAPI.prototype.getMatchListV4ByAccountId = function (id, options) {
  options.query = options.query || {};

  if (options.champion) options.query.champion = options.champion;
  if (options.queue) options.query.queue = options.queue;
  if (options.season) options.query.season = options.season;
  if (options.endTime) options.query.endTime = options.endTime;

  return this._request(
    format("/lol/match/v4/matchlists/by-account/{encryptedAccountId}", {
      encryptedAccountId: id
    }),
    options
  ).then(match => MatchListV4.fromJSON(match));
};

RiotAPI.prototype.getMatchTimelineV4ByMatchId = function (id, options) {
  return this._request(
    format("/lol/match/v4/timelines/by-match/{matchId}", {
      matchId: id
    }),
    options
  ).then(match => MatchTimelineV4.fromJSON(match));
};

RiotAPI.prototype.getMatchIdsByTournamentCode = function (code, options) {
  return this._request(
    format("/lol/match/v4/matches/by-tournament-code/{tournamentCode}/ids", {
      tournamentCode: code
    }),
    options
  );
};

RiotAPI.prototype.getMatchV4ByTournamentCodeAndMatchId = function (code, id, options) {
  return this._request(
    format("/lol/match/v4/matches/{matchId}/by-tournament-code/{tournamentCode}", {
      matchId: id,
      tournamentCode: code
    }),
    options
  ).then(match => MatchV4.fromJSON(match));
};

// =====================
// =    Summoner V4    =
// =====================
RiotAPI.prototype.getSummonerV4ByAccountId = function (id, options) {
  return this._request(
    format("/lol/summoner/v4/summoners/by-account/{encryptedAccountId}", {
      encryptedAccountId: id
    }),
    options
  ).then(res => SummonerV4.fromJSON(res));
};

RiotAPI.prototype.getSummonerV4ByName = function (name, options) {
  return this._request(
    format("/lol/summoner/v4/summoners/by-name/{summonerName}", {
      summonerName: name
    }),
    options
  ).then(champ => SummonerV4.fromJSON(champ));
};

RiotAPI.prototype.getSummonerV4ByPUUID = function (puuid, options) {
  return this._request(
    format("/lol/summoner/v4/summoners/by-puuid/{encryptedPUUID}", {
      encryptedPUUID: puuid
    }),
    options
  ).then(champ => SummonerV4.fromJSON(champ));
};

RiotAPI.prototype.getSummonerV4BySummonerId = function (id, options) {
  return this._request(
    format("/lol/summoner/v4/summoners/{encryptedSummonerId}", {
      encryptedSummonerId: id
    }),
    options
  ).then(champ => SummonerV4.fromJSON(champ));
};

module.exports = RiotAPI;