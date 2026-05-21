document.getElementById("footer-date").textContent = `Last Modification: ${document.lastModified}`;

const dataContainer = document.getElementById("data-container");

const galleryData = {
    "Large Image Size": "1200px (Desktop Width)",
    "Medium Image Size": "800px (Tablet Width)",
    "Small Image Size": "400px (Mobile Width)",
    "Optimization Format": "WebP High Efficiency"
};

let dataHTML = "";
for (const [key, value] of Object.entries(galleryData)) {
    dataHTML += `<p><strong>${key}:</strong> ${value}</p>`;
}
dataContainer.innerHTML = dataHTML;
