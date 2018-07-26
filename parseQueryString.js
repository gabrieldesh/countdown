export default function parseQueryString(query) {
    let vars = query.split("&");
    let queryObject = {};
    for (let i = 0; i < vars.length; i++) {
      let pair = vars[i].split("=");
      let key = decodeURIComponent(pair[0]).replace(/\+/g, ' ');
      let value = pair[1] ? decodeURIComponent(pair[1]).replace(/\+/g, ' ')
                          : "";
      // If first entry with this name
      if (typeof queryObject[key] === "undefined") {
        queryObject[key] = value;
      // If second entry with this name
      } else if (typeof queryObject[key] === "string") {
        queryObject[key] = [queryObject[key], value];
      // If third or later entry with this name
      } else {
        queryObject[key].push(value);
      }
    }
    return queryObject;
}