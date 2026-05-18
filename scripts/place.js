document.getElementById('current-year').textContent = new Date().getFullYear();
document.getElementById('last-modified').textContent = document.lastModified;

const calculateWindChill = (t, v) => 13.12 + 0.6215 * t - 11.37 * Math.pow(v, 0.16) + 0.3965 * t * Math.pow(v, 0.16);

const tempText = document.querySelector('.weather-card ul li:nth-child(1) span').textContent;
const windText = document.querySelector('.weather-card ul li:nth-child(3) span').textContent;
const chillSpan = document.querySelector('.weather-card ul li:nth-child(4) span');

const temp = parseFloat(tempText);
const wind = parseFloat(windText);

if (temp <= 10 && wind > 4.8) {
  chillSpan.textContent = `${calculateWindChill(temp, wind).toFixed(1)} °C`;
} else {
  chillSpan.textContent = "N/A";
}
