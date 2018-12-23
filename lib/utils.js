function escape(str) {
  return str.replace(/[ ]/, '%20');
}

// ======================================================================================================
// =  Borrowed from Gabriel Nahmias on StackOverflow thread.                                            =
// =  It has been changed for better it to suit the project needs.                                      =
// =                                                                                                    =
// =  Gabriel Nahmias Stack profile: https://stackoverflow.com/users/2285405/gabriel-nahmias            =
// =  Thread: https://stackoverflow.com/questions/610406/javascript-equivalent-to-printf-string-format  =
// ======================================================================================================
function format(str, kwargs = {}) {
  for (const key in kwargs)
    str = str.replace(new RegExp("\\{" + key + "\\}", "gi"), kwargs[key]);
  return str;
}

function validateJSON(str, callback) {
  try {
    callback(JSON.parse(str), undefined);
  } catch (err) {
    callback(str, err);
  }
}

function formatRequestOptions(key, path, region, query = {}) {
  if (!key) throw new Error('Tried to request without a key');
  if (!path) throw new Error('Tried to request without a path');
  if (!region) throw new Error('Tried to request without a region');
  
  return {
    hostname: region + ".api.riotgames.com",
    path: escape(path),
    method: "GET",
    headers: {
      "X-Riot-Token": key
    },
    query: query
  };
}

module.exports = {
  escape,
  format,
  validateJSON,
  formatRequestOptions,
};