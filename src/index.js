//date and time
let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
let date = now.getDate();
let day = days[now.getDay()];
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let display = document.querySelector("#time");
display.innerHTML = `${day} ${hours}:${minutes}`;

//search
//function 1 -
function cityTemp(response) {
  document.querySelector("h2").innerHTML = response.data.name;
  document.querySelector("#temp").innerHTML = Math.round(
    response.data.main.temp
  );
}
//function 2 - axios
function weather(city) {
  let apiKey = "15afb9017456f61d469f071faff65fed";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(cityTemp);
}
//function 3 - citySearch
function citySearch(event) {
  event.preventDefault();
  let city = document.querySelector("#location").value;
  weather(city);
}

let cityShow = document.querySelector("#cityForm");
cityShow.addEventListener("submit", citySearch);

//bonus
function toF(celsiusTemp) {
  let fahrenheitTemp = temp * (9 / 5) + 32;
  return fahrenheitTemp;
}
function toC(fahrenheitTemp) {
  let celsiusTemp = (fahrenheitTemp - 32) / (9 / 5);
  return celsiusTemp;
}
let temp = document.querySelector("#temp");
let fahrenheit = document.querySelector(".fahrenheit");
fahrenheit.addEventListener("click", toF);
let celsius = document.querySelector(".celsius");
celsius.addEventListener("click", toC);

//bonus 2
function getLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getCoords);
}
function getCoords(position) {
  let apiKey = "15afb9017456f61d469f071faff65fed";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(cityTemp);
}

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getLocation);
