const https = require("https");

const {
  format,
  validateJSON,
  formatRequestOptions,
} = require("./lib/utils");

const {
  ChampionMasteryV4,
  LeagueListV4,
  LeaguePositionV4,
  MatchV4,
  MatchTimelineV4,
  MatchListV4,
  SummonerV4,
} = require("./lib/classes");

const {
  REGION,
  RESPONSE_ERRORS,
  SEASON,
} = require('./lib/gameConstants');

function RiotAPI(api_key, {
  region = REGION.north_america
} = {}) {
  if (!(this instanceof RiotAPI)) return new RiotAPI(api_key, options);
  if (!api_key || api_key.length == 0)
    throw new Error("All RiotAPI instances require an api key!");

  this.api_key = api_key;
  this.region = region;
}

RiotAPI.REGION = REGION;
RiotAPI.RESPONSE_ERRORS = RESPONSE_ERRORS;
RiotAPI.SEASON = SEASON;

RiotAPI.prototype._request_get = function (path, options = {}, callback) {
  if (!callback && typeof options == 'function') {
    callback = options;
    options = {};
  }

  const region = options.region || this.region;
  const query = options.query || {};

  // Sets up the http request options
  const reqOptions = formatRequestOptions(this.api_key, path, region, query);

  const req = https.request(reqOptions, res => {
    res.setEncoding("utf8");
    let data = "";

    res.on("data", chunk => data += chunk);

    res.on("end", () => validateJSON(data, (value, error) => {
      if (!error) {
        if (res.statusCode == 200) callback(value, undefined);
        else callback(value, {
          error: null,
          errorDescription: 'Request returned non 200 code but succeeded in parsing',
          statusCode: res.statusCode,
          headers: res.headers
        });
      } else {
        callback(data, {
          error: error,
          errorDescription: 'Unsuccessful json parse',
          statusCode: res.statusCode,
          headers: res.headers
        });
      }
    }));

    req.on("error", err => callback(null, {
      error: err,
      errorDescription: 'An error occurred on error.on(\'error\', err => {})',
    }));
    req.end();
  });
};

// =============================
// =    Champion Mastery V4    =
// =============================
RiotAPI.prototype.getChamptionMasteryListV4BySummonerId = function (id, a = {
  region
} = {}) {
  const options = {
    region
  };

  return this._request_get(format("/lol/champion-mastery/v4/champion-masteries/by-summoner/{encryptedSummonerId}", {
    encryptedSummonerId: id
  }), options, (data, error) => {
    callback
  }).then(res => ChampionMasteryV4.fromJSONList(res));
};

RiotAPI.prototype.getChamptionMasteryV4BySummonerIdByChampionId = function (summonerId, championId, {
  region
} = {}) {
  const options = {
    region
  };

  return this._request_get(format("/lol/champion-mastery/v4/champion-masteries/by-summoner/{encryptedSummonerId}/by-champion/{championId}", {
    encryptedSummonerId: summonerId,
    championId: championId
  }), options).then(res => ChampionMasteryV4.fromJSON(res));
};

RiotAPI.prototype.getChamptionMasteryV4ScoreBySummonerId = function (id, {
  region
} = {}) {
  const options = {
    region
  };

  return this._request_get(format("/lol/champion-mastery/v4/scores/by-summoner/{encryptedSummonerId}", {
    encryptedSummonerId: id,
  }), options);
};

// ===================
// =    League V4    =
// ===================
RiotAPI.prototype.getChallengerLeagueV4ByQueue = function (queue, {
  region
} = {}) {
  const options = {
    region
  };

  return this._request_get(format("/lol/league/v4/challengerleagues/by-queue/{queue}", {
    queue: queue,
  }), options).then(league => LeagueListV4.fromJSON(league));
};

RiotAPI.prototype.getGrandmasterLeagueV4ByQueue = function (queue, {
  region
} = {}) {
  const options = {
    region
  };

  return this._request_get(format("/lol/league/v4/grandmasterleagues/by-queue/{queue}", {
    queue: queue,
  }), options).then(league => LeagueListV4.fromJSON(league));
};

RiotAPI.prototype.getLeagueV4ByLeagueId = function (id, {
  region
} = {}) {
  const options = {
    region
  };

  return this._request_get(format("/lol/league/v4/leagues/{leagueId}", {
    leagueId: id,
  }), options).then(league => LeagueListV4.fromJSON(league));
};

RiotAPI.prototype.getMasterLeagueV4ByQueue = function (queue, {
  region
} = {}) {
  const options = {
    region
  };

  return this._request_get(format("/lol/league/v4/masterleagues/by-queue/{queue}", {
    queue: queue,
  }), options).then(league => LeagueListV4.fromJSON(league));
};

RiotAPI.prototype.getLeaguePositionsV4BySummonerId = function (id, {
  region
} = {}) {
  const options = {
    region
  };

  return this._request_get(format("/lol/league/v4/positions/by-summoner/{encryptedSummonerId}", {
    encryptedSummonerId: id,
  }), options).then(league => LeaguePositionV4.fromJSONList(league));
};

// ==================
// =    Match V4    =
// ==================
RiotAPI.prototype.getMatchV4ByMatchId = function (id, {
  region
} = {}) {
  const options = {
    region
  };

  return this._request_get(
    format("/lol/match/v4/matches/{matchId}", {
      matchId: id
    }),
    options
  ).then(match => MatchV4.fromJSON(match));
};

RiotAPI.prototype.getMatchListV4ByAccountId = function (id, options = {}) {
  options.query = options.query || {};

  if (options.champion) options.query.champion = options.champion;
  if (options.queue) options.query.queue = options.queue;
  if (options.season) options.query.season = options.season;
  if (options.endTime) options.query.endTime = options.endTime;

  return this._request_get(
    format("/lol/match/v4/matchlists/by-account/{encryptedAccountId}", {
      encryptedAccountId: id
    }),
    options
  ).then(match => MatchListV4.fromJSON(match));
};

RiotAPI.prototype.getMatchTimelineV4ByMatchId = function (id, {
  region
} = {}) {
  const options = {
    region
  };

  return this._request_get(
    format("/lol/match/v4/timelines/by-match/{matchId}", {
      matchId: id
    }),
    options
  ).then(match => MatchTimelineV4.fromJSON(match));
};

RiotAPI.prototype.getMatchIdsByTournamentCode = function (code, {
  region
} = {}) {
  const options = {
    region
  };

  return this._request_get(
    format("/lol/match/v4/matches/by-tournament-code/{tournamentCode}/ids", {
      tournamentCode: code
    }),
    options
  );
};

RiotAPI.prototype.getMatchV4ByTournamentCodeAndMatchId = function (code, id, {
  region
} = {}) {
  const options = {
    region
  };

  return this._request_get(
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
RiotAPI.prototype.getSummonerV4ByAccountId = function (id, {
  region
} = {}) {
  const options = {
    region
  };

  return this._request_get(
    format("/lol/summoner/v4/summoners/by-account/{encryptedAccountId}", {
      encryptedAccountId: id
    }),
    options
  ).then(res => SummonerV4.fromJSON(res));
};

RiotAPI.prototype.getSummonerV4ByName = function (name, {
  region
} = {}, callback) {
  const options = {
    region
  };

  return this._request_get(
    format("/lol/summoner/v4/summoners/by-name/{summonerName}", {
      summonerName: name
    }),
    options,
    (data, error) => callback(SummonerV4.fromJSON(data), error)
  );
};

RiotAPI.prototype.getSummonerV4ByPUUID = function (puuid, {
  region
} = {}) {
  const options = {
    region
  };

  return this._request_get(
    format("/lol/summoner/v4/summoners/by-puuid/{encryptedPUUID}", {
      encryptedPUUID: puuid
    }),
    options
  ).then(champ => SummonerV4.fromJSON(champ));
};

RiotAPI.prototype.getSummonerV4BySummonerId = function (id, {
  region
} = {}) {
  const options = {
    region
  };

  return this._request_get(
    format("/lol/summoner/v4/summoners/{encryptedSummonerId}", {
      encryptedSummonerId: id
    }),
    options
  ).then(champ => SummonerV4.fromJSON(champ));
};

module.exports = RiotAPI;