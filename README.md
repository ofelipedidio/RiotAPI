# RiotAPI

## Simple example

```javascript
const RiotAPI = require("riotapi-int");

const api = new RiotAPI("api-key-here", { region: RiotAPI.REGION.korea });

api.getSummonerV4ByName("Hide on bush", (data, error) => {
  if (error) {
    // Handle error ...
    return;
  }

  // handler response ...
});
```

## Documentation

### Champion Mastery V4

```javascript
api.getChamptionMasteryListV4BySummonerId(id, (data, error) => {
  if (error) {
    // Handle error ...
    return;
  }

  // handler response ...
});
```

Returns **ChampionMasteryV4**


```javascript
api.getChamptionMasteryV4BySummonerIdByChampionId(summonerId, championId, (data, error) => {
    if (error) {
    // Handle error ...
      return;
    }

  // handler response ...
  }
);
```

Returns **ChampionMasteryV4**


```javascript
api.getChamptionMasteryV4ScoreBySummonerId(id, (data, error) => {
  if (error) {
    // Handle error ...
    return;
  }

  // handler response ...
});
```

Returns **Number**
