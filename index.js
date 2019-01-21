const https = require('https');

const {
  format,
  validateJSON,
  formatRequestOptions
} = require('./lib/utils');

const {
  ChampionMasteryV4,
  LeagueListV4,
  LeaguePositionV4,
  MatchV4,
  MatchTimelineV4,
  MatchListV4,
  SummonerV4
} = require('./lib/classes');

const {
  REGION,
  RESPONSE_ERRORS,
  SEASON,
  QUEUE
} = require('./lib/gameConstants');

class RiotAPI {
  constructor(api_key, {
    region = REGION.north_america
  } = {}) {
    if (!api_key) throw new Error('All RiotAPI instances require an api key!');

    this.api_key = api_key;
    this.region = region;
  }

  _request_get(path, options = {}) {
    return new Promise((resolve, reject) => {
      const region = options.region || this.region;
      const query = options.query || {};

      // Sets up the http request options
      const reqOptions = formatRequestOptions(this.api_key, path, region, query);

      const req = https.request(reqOptions, res => {
        res.setEncoding('utf8');
        let data = '';

        res.on('data', chunk => (data += chunk));
        res.on('end', () =>
          validateJSON(data, (value, error) => {
            if (!error) {
              if (res.statusCode == 200) {
                resolve(value);
              } else {
                reject({
                  data: value,
                  error: null,
                  errorDescription: 'Request returned non-200 status code but succeeded in parsing',
                  statusCode: res.statusCode,
                  headers: res.headers
                });
              }
            } else {
              reject({
                data: data,
                error: error,
                errorDescription: 'Unsuccessful json parse',
                statusCode: res.statusCode,
                headers: res.headers
              });
            }
          }));
      });

      req.on('error', err => reject({
        error: err,
        errorDescription: "An error occurred on error.on('error', err => {})"
      }));
      req.end();
    });
  }

  // =============================
  // =    Champion Mastery V4    =
  // =============================
  getChamptionMasteryListV4BySummonerId(id, a = ({
    region
  } = {})) {
    const options = {
      region
    };

    return this._request_get(
      format(
        '/lol/champion-mastery/v4/champion-masteries/by-summoner/{encryptedSummonerId}', {
          encryptedSummonerId: id
        }
      ),
      options
    ).then(res => ChampionMasteryV4.fromJSONList(res));
  }

  getChamptionMasteryV4BySummonerIdByChampionId(
    summonerId,
    championId, {
      region
    } = {}
  ) {
    const options = {
      region
    };

    return this._request_get(
      format(
        '/lol/champion-mastery/v4/champion-masteries/by-summoner/{encryptedSummonerId}/by-champion/{championId}', {
          encryptedSummonerId: summonerId,
          championId: championId
        }
      ),
      options
    ).then(res => ChampionMasteryV4.fromJSON(res));
  }

  getChamptionMasteryV4ScoreBySummonerId(id, {
    region
  } = {}) {
    const options = {
      region
    };

    return this._request_get(
      format(
        '/lol/champion-mastery/v4/scores/by-summoner/{encryptedSummonerId}', {
          encryptedSummonerId: id
        }
      ),
      options
    );
  }

  // ===================
  // =    League V4    =
  // ===================
  getChallengerLeagueV4ByQueue(queue, {
    region
  } = {}) {
    const options = {
      region
    };

    return this._request_get(
      format('/lol/league/v4/challengerleagues/by-queue/{queue}', {
        queue: queue
      }),
      options
    ).then(league => LeagueListV4.fromJSON(league));
  }

  getGrandmasterLeagueV4ByQueue(queue, {
    region
  } = {}) {
    const options = {
      region
    };

    return this._request_get(
      format('/lol/league/v4/grandmasterleagues/by-queue/{queue}', {
        queue: queue
      }),
      options
    ).then(league => LeagueListV4.fromJSON(league));
  }

  getLeagueV4ByLeagueId(id, {
    region
  } = {}) {
    const options = {
      region
    };

    return this._request_get(
      format('/lol/league/v4/leagues/{leagueId}', {
        leagueId: id
      }),
      options
    ).then(league => LeagueListV4.fromJSON(league));
  }

  getMasterLeagueV4ByQueue(queue, {
    region
  } = {}) {
    const options = {
      region
    };

    return this._request_get(
      format('/lol/league/v4/masterleagues/by-queue/{queue}', {
        queue: queue
      }),
      options
    ).then(league => LeagueListV4.fromJSON(league));
  }

  getLeaguePositionsV4BySummonerId(id, {
    region
  } = {}) {
    const options = {
      region
    };

    return this._request_get(
      format('/lol/league/v4/positions/by-summoner/{encryptedSummonerId}', {
        encryptedSummonerId: id
      }),
      options
    ).then(league => LeaguePositionV4.fromJSONList(league));
  }

  // ==================
  // =    Match V4    =
  // ==================
  getMatchV4ByMatchId(id, {
    region
  } = {}) {
    const options = {
      region
    };

    return this._request_get(
      format('/lol/match/v4/matches/{matchId}', {
        matchId: id
      }),
      options
    ).then(match => MatchV4.fromJSON(match));
  }

  getMatchListV4ByAccountId(
    id, {
      region,
      champion,
      queue,
      season,
      endTime
    } = {}
  ) {
    const options = {};
    options.query = {};

    if (region) options.query.region = region;
    if (champion) options.query.champion = champion;
    if (queue) options.query.queue = typeof queue == 'string' ? [queue] : queue;
    if (season) options.query.season = season;
    if (endTime) options.query.endTime = endTime;

    console.log('Test ', options);

    return this._request_get(
      format('/lol/match/v4/matchlists/by-account/{encryptedAccountId}', {
        encryptedAccountId: id
      }),
      options
    ).then(match => MatchListV4.fromJSON(match));
  }

  getMatchTimelineV4ByMatchId(id, {
    region
  } = {}) {
    const options = {
      region
    };

    return this._request_get(
      format('/lol/match/v4/timelines/by-match/{matchId}', {
        matchId: id
      }),
      options
    ).then(match => MatchTimelineV4.fromJSON(match));
  }

  getMatchIdsByTournamentCode(code, {
    region
  } = {}) {
    const options = {
      region
    };

    return this._request_get(
      format('/lol/match/v4/matches/by-tournament-code/{tournamentCode}/ids', {
        tournamentCode: code
      }),
      options
    );
  }

  getMatchV4ByTournamentCodeAndMatchId(code, id, {
    region
  } = {}) {
    const options = {
      region
    };

    return this._request_get(
      format(
        '/lol/match/v4/matches/{matchId}/by-tournament-code/{tournamentCode}', {
          matchId: id,
          tournamentCode: code
        }
      ),
      options
    ).then(match => MatchV4.fromJSON(match));
  }

  // =====================
  // =    Summoner V4    =
  // =====================
  getSummonerV4ByAccountId(id, {
    region
  } = {}) {
    const options = {
      region
    };

    return this._request_get(
      format('/lol/summoner/v4/summoners/by-account/{encryptedAccountId}', {
        encryptedAccountId: id
      }),
      options
    ).then(res => SummonerV4.fromJSON(res));
  }

  getSummonerV4ByName(name, {
    region
  } = {}) {
    const options = {
      region
    };

    return this._request_get(
      format('/lol/summoner/v4/summoners/by-name/{summonerName}', {
        summonerName: name
      }),
      options
    ).then(data => SummonerV4.fromJSON(data));
  }

  getSummonerV4ByPUUID(puuid, {
    region
  } = {}) {
    const options = {
      region
    };

    return this._request_get(
      format('/lol/summoner/v4/summoners/by-puuid/{encryptedPUUID}', {
        encryptedPUUID: puuid
      }),
      options
    ).then(champ => SummonerV4.fromJSON(champ));
  }

  getSummonerV4BySummonerId(id, {
    region
  } = {}) {
    const options = {
      region
    };

    return this._request_get(
      format('/lol/summoner/v4/summoners/{encryptedSummonerId}', {
        encryptedSummonerId: id
      }),
      options
    ).then(champ => SummonerV4.fromJSON(champ));
  }
} // class RiotAPI

RiotAPI.REGION = REGION;
RiotAPI.RESPONSE_ERRORS = RESPONSE_ERRORS;
RiotAPI.SEASON = SEASON;
RiotAPI.QUEUE = QUEUE;

module.exports = RiotAPI;