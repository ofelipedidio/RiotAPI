# RiotAPI

## Simple example to use

```javascript
const RiotAPI = require("riotapi-int");

const api = new RiotAPI("api-key-here", { region: RiotAPI.korea });

api.getSummonerV4ByName("Hide on bush")
  .then(summoner => console.log(summoner))
  .catch(error => console.error(error));
```