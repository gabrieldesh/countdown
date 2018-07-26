import parseQueryString from './parseQueryString.js';
import dateDiff from './dateDiff.js';

let queryObject = parseQueryString(location.search.substring(1));

document.querySelector('#title').innerHTML = queryObject.title;

let finishDateTime = new Date(queryObject.date);

let updateCounter = () => {
  let {days, hours, minutes, seconds} = dateDiff(finishDateTime, Date.now());
  let counterString = `${days}d ${hours}h ${minutes}m ${seconds}s`;
  document.querySelector('#counter').innerHTML = counterString;
};

updateCounter();
window.setInterval(updateCounter, 1000);