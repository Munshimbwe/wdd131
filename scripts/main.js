import { products, getFormattedLastModified, handleReviewCounter } from './utils.js';

document.addEventListener("DOMContentLoaded", () => {
    
    const productSelect = document.getElementById("productName");
    if (productSelect) {
        products.forEach(product => {
            const option = document.createElement("option");
            option.value = product.id;
            option.textContent = product.name;
            productSelect.appendChild(option);
        });
    }

    const counterDisplay = document.getElementById("reviewCounterDisplay");
    if (counterDisplay && window.location.pathname.includes("review.html")) {
        const totalReviews = handleReviewCounter();
        counterDisplay.textContent = totalReviews;
    }

    const lastMod = document.getElementById("lastModified");
  if (lastMod) lastMod.textContent = document.lastModified;
});
