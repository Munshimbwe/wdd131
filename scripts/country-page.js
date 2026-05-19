  const pageData = {
    country: "Kabwe, Zambia",
    bgImageUrl: "images/national-animal.webp", 
    
    metrics: [
        { label: "Province:", value: "Central Province" },
        { label: "Population:", value: "299,206 (District)" },
        { label: "Coordinates:", value: "14.4434° S, 28.4465° E" },
        { label: "Elevation:", value: "1,188 meters (3,898 ft)" },
        { label: "Time Zone:", value: "CAT (UTC+2)" },
        { label: "Primary Language:", value: "English, Bemba" },
        { label: "Calling Code:", value: "+260" },
        { label: "Historic Name:", value: "Broken Hill" }
    ],
    
    weather: {
        iconUrl: "data:image/svg+xml;utf8,<svg xmlns='http://w3.org' viewBox='0 0 24 24' fill='white'><circle cx='12' cy='12' r='5'/><path d='M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42'/></svg>", 
        stats: [
            { label: "Temperature:", value: "22 °C" },
            { label: "Conditions:", value: "Clear / Sunny" },
            { label: "Wind Speed:", value: "8 km/h" },
            { label: "Wind Chill:", value: "21.5 °C" }
        ]
    },
    
    metadata: {
        copyright: "©2026 ⚒️ Munshimbwe Kafwanka ⚒️ Kabwe, Zambia"
    }
};

function renderPage(data) {
    document.getElementById('country-title').textContent = data.country;
    document.getElementById('bg-image').src = data.bgImageUrl;
    document.getElementById('weather-icon').src = data.weather.iconUrl;

    const dataBox = document.getElementById('data-container');
    dataBox.innerHTML = data.metrics.map(item => `
        <div class="info-row">
            <span class="info-label">${item.label}</span>
            <span class="info-value">${item.value}</span>
        </div>
    `).join('');

    const weatherBox = document.getElementById('weather-container');
    weatherBox.innerHTML = data.weather.stats.map(item => `
        <div class="info-row">
            <span class="info-label">${item.label}</span>
            <span class="info-value">${item.value}</span>
        </div>
    `).join('');

    document.getElementById('footer-text').textContent = data.metadata.copyright;
    
    const now = new Date();
    const formattedDate = now.toLocaleDateString('en-GB') + ' ' + now.toLocaleTimeString('en-GB');
    document.getElementById('footer-date').textContent = `Last Modification: ${formattedDate}`;
}

document.addEventListener("DOMContentLoaded", () => {
    renderPage(pageData);
});
