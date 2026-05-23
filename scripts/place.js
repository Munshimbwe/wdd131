document.getElementById("footer-date").textContent = `Last Modification: ${document.lastModified}`;

const dataContainer = document.getElementById("data-container");
const weatherContainer = document.getElementById("weather-container");

const countryData = {
    "Area": "1,172 km²",
    "Population": "202,914",
    "Languages": "English, Bemba",
    "Currency": "Zambian Kwacha (ZMW)",
    "History": "Kabwe, formerly known as Broken Hill",
    "Timezone": "UTC+2",
    "Calling Code": "+260",
    "National Animal": "African Fish Eagle",
    "Internet": "Zambia"
};

const weatherData = {
    "Temperature": 10, 
    "Condition": "Partly Sunny",
    "Wind": 8 
};

const weatherIcons = {
    "Sunny": "☀️",
    "Partly Sunny": "⛅",
    "Cloudy": "☁️",
    "Rainy": "🌧️",
    "Snowy": "❄️",
    "Thunderstorm": "⛈️"
};

let dataHTML = "";
for (const [key, value] of Object.entries(countryData)) {
    dataHTML += `<p><strong>${key}:</strong> ${value}</p>`;
}
dataContainer.innerHTML = dataHTML;

function calculateWindChill(temp, wind) {
    if (temp <= 10 && wind > 4.8) {
        const chill = 13.12 + (0.6215 * temp) - (11.37 * Math.pow(wind, 0.16)) + (0.3965 * temp * Math.pow(wind, 0.16));
        return `${chill.toFixed(1)} °C`;
    }
    return "N/A";
}

const windChillValue = calculateWindChill(weatherData.Temperature, weatherData.Wind);
const currentIcon = weatherIcons[weatherData.Condition] || "🌡️";

weatherContainer.innerHTML = `
    <p><strong>Temperature:</strong> ${weatherData.Temperature} °C</p>
    <p><strong>Condition:</strong> ${currentIcon} ${weatherData.Condition}</p>
    <p><strong>Wind:</strong> ${weatherData.Wind} km/h</p>
    <p><strong>Wind Chill:</strong> ${windChillValue}</p>
`;
