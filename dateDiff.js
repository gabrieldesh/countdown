export default function dateDiff(finalDate, initialDate) {
  let days, hours, minutes, seconds;
  let remainder;
  
  remainder = finalDate - initialDate;
  
  [days,    remainder] = div(remainder, 86400000);
  [hours,   remainder] = div(remainder, 3600000);
  [minutes, remainder] = div(remainder, 60000);
  [seconds, remainder] = div(remainder, 1000);
  
  return { days, hours, minutes, seconds };
}

function div(dividend, divisor) {
  let quotient = Math.floor(dividend / divisor);
  let remainder = dividend % divisor;
  return [quotient, remainder];
}