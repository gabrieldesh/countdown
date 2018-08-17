import parseQueryString from './parseQueryString.js';
import dateDiff from './dateDiff.js';

const delayThreshold = 200;
const synchronizationInterval = 3600000; // 1 hour

const queryObject = parseQueryString(location.search.substring(1));

document.querySelector('#title').innerHTML = queryObject.title;

const finishDateTime = new Date(queryObject.date);

let systemClockDelay = 0;

const synchronizeClock = () => {
  return fetch("https://www.time.gov/actualtime.cgi")
    .then(response => response.text())
    .then(text => {
      const parser = new window.DOMParser();
      const data = parser.parseFromString(text, "text/xml");
      const timeStr = data.documentElement.getAttribute("time").substring(0,13);
      const time = parseInt(timeStr);

      const difference = time - Date.now();

      // If the difference is smaller than the threshold, assume that the system time is more correct.
      if (Math.abs(difference) < delayThreshold) {
        systemClockDelay = 0;
        console.log(`Using system time.`);
      } else {
        systemClockDelay = difference;
        console.log(`Using time from time.gov.`);
      }
    });
}

const updateCounter = () => {
  const {days, hours, minutes, seconds} = 
    dateDiff(finishDateTime, Date.now() + systemClockDelay);
  const counterString = `${days}d ${hours}h ${minutes}m ${seconds}s`;
  document.querySelector('#counter').innerHTML = counterString;
};

synchronizeClock().then(() => {
    updateCounter();


    // Synchronize the tick of the counter with the start of the second.

    const now = Date.now() + systemClockDelay;
    const startOfNextSecond = Math.ceil(now/1000) * 1000;

    // Time remaining for the start of the next second.
    const remaining = startOfNextSecond - now;

    setTimeout(() => {
      updateCounter();
      setInterval(updateCounter, 1000);
    }, remaining)
  })

window.setInterval(synchronizeClock, synchronizationInterval);