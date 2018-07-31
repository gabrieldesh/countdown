'use strict';

let titleElement = document.querySelector("#title");
let dateElement = document.querySelector("#date");
let outputElement = document.querySelector("#output");
let linkElement = document.querySelector("#link");

let urlOrigin = window.location.origin;

[titleElement, dateElement].map((inputElement) => {
  inputElement.addEventListener("input", updateURL);
});

updateURL();


function updateURL() {
  let title = encodeURIComponent(titleElement.value);
  let date = dateElement.value;

  if (date === "") {
    outputElement.style.display = "none";
  } else {
    let link = `${urlOrigin}/?title=${title}&date=${date}`;

    linkElement.href = link;
    linkElement.innerHTML = link;

    outputElement.style.display = "block";
  }
}