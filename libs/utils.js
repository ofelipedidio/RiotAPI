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

function validateJSON(str) {
  return new Promise((resolve, reject) => {
    try {
      resolve(JSON.parse(str));
    } catch (e) {
      reject({
        error: e,
        data: str
      });
    }
  });
}

module.exports = {
  escape,
  format,
  validateJSON
};