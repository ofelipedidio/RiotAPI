const RiotAPI = require('../riotapi');

const format = require('../utils').format;
const {
  SummonerV3,
  SummonerV4
} = require('../classes');

/**
 * @param {RiotAPI} RiotAPI 
 */
function injectFunctions(RiotAPI) {
  // ============= V4 ==============================================================================

  /**
   * @param {String} id
   * @param {JSON} options
   * @returns {Promise<SummonerV4>}
   */
  RiotAPI.prototype.getChamptionV4ByAccountId = function (id, options) {
    return this._request(
      format("/lol/summoner/v4/summoners/by-account/{encryptedAccountId}", {
        encryptedAccountId: id
      }),
      options
    ).then(champ => SummonerV4.fromJSON(champ));
  };

  /**
   * @param {String} name
   * @param {JSON} options
   * @returns {Promise<SummonerV4>}
   */
  RiotAPI.prototype.getChamptionV4ByName = function (name, options) {
    return this._request(
      format("/lol/summoner/v4/summoners/by-name/{summonerName}", {
        summonerName: name
      }),
      options
    ).then(champ => SummonerV4.fromJSON(champ));
  };

  /**
   * @param {String} puuid
   * @param {JSON} options
   * @returns {Promise<SummonerV4>}
   */
  RiotAPI.prototype.getChamptionV4ByPUUID = function (puuid, options) {
    return this._request(
      format("/lol/summoner/v4/summoners/by-puuid/{encryptedPUUID}", {
        encryptedPUUID: puuid
      }),
      options
    ).then(champ => SummonerV4.fromJSON(champ));
  };

  /**
   * @param {String} id
   * @param {JSON} options
   * @returns {Promise<SummonerV4>}
   */
  RiotAPI.prototype.getChamptionV4BySummonerId = function (id, options) {
    return this._request(
      format("/lol/summoner/v4/summoners/{encryptedSummonerId}", {
        encryptedSummonerId: id
      }),
      options
    ).then(champ => SummonerV4.fromJSON(champ));
  };

  // ============= V3 ==============================================================================

  /**
   * @param {String} id
   * @param {JSON} options
   * @returns {Promise<SummonerV4>}
   */
  RiotAPI.prototype.getChamptionV3ByAccountId = function (id, options) {
    return this._request(
      format("/lol/summoner/v3/summoners/by-account/{accountId}", {
        accountId: id
      }),
      options
    ).then(champ => SummonerV3.fromJSON(champ));
  };

  /**
   * @param {String} name
   * @param {JSON} options
   * @returns {Promise<SummonerV4>}
   */
  RiotAPI.prototype.getChamptionV3ByName = function (name, options) {
    return this._request(
      format("/lol/summoner/v3/summoners/by-name/{summonerName}", {
        summonerName: name
      }),
      options
    ).then(champ => SummonerV3.fromJSON(champ));
  };

  /**
   * @param {String} id
   * @param {JSON} options
   * @returns {Promise<SummonerV4>}
   */
  RiotAPI.prototype.getChamptionV3BySummonerId = function (id, options) {
    return this._request(
      format("/lol/summoner/v3/summoners/{summonerId}", {
        summonerId: id
      }),
      options
    ).then(champ => SummonerV3.fromJSON(champ));
  };
}

module.exports = injectFunctions;