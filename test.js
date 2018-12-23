const RiotAPI = require('./index');

const api = new RiotAPI('RGAPI-eae38d67-4838-43c9-8a4b-701dadf433ca', {
  region: RiotAPI.REGION.brazil
});

api.getSummonerV4ByName('ofelipedidio', {}, (data, error) => {
  console.log(data, error);
});