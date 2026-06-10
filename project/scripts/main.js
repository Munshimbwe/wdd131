import { memoriesArray, getFormattedDateString, computeWindChillIndex, incrementLocalStorageTracker, fetchLocalStorageValue, incrementAiInquiryTracker } from './utils.js';

document.addEventListener("DOMContentLoaded", () => {
    
    const lastModifiedSpan = document.getElementById("lastModifiedDate");
    if (lastModifiedSpan) {
        lastModifiedSpan.textContent = `${getFormattedDateString()}`;
    }

    const hamburgerBtn = document.getElementById("hamburgerBtn");
    const navLinks = document.getElementById("navLinks");
    if (hamburgerBtn && navLinks) {
        hamburgerBtn.addEventListener("click", () => {
            navLinks.classList.toggle("active");
        });
    }

    const themeToggle = document.getElementById("themeToggle");
    if (themeToggle) {
        themeToggle.addEventListener("click", () => {
            document.body.classList.toggle("dark-theme");
            const isDark = document.body.classList.contains("dark-theme");
            themeToggle.textContent = isDark ? "☀️ Light" : "🌙 Dark";
        });
    }

    const calcChillBtn = document.getElementById("calcChillBtn");
    if (calcChillBtn) {
        calcChillBtn.addEventListener("click", () => {
            const tempVal = parseFloat(document.getElementById("tempInput").value);
            const windVal = parseFloat(document.getElementById("windInput").value);
            const resultParagraph = document.getElementById("chillResult");

            if (isNaN(tempVal) || isNaN(windVal)) {
                resultParagraph.textContent = `❌ Please enter valid metrics.`;
                return;
            }

            const chill = computeWindChillIndex(tempVal, windVal);
            if (chill === null) {
                resultParagraph.textContent = `⚠️ Formula restricts to Temp ≤ 10°C and Wind > 4.8 km/h.`;
            } else {
                resultParagraph.textContent = `🥶 Wind Chill Index: ${chill.toFixed(1)}°C`;
            }
        });
    }

    const askAiBtn = document.getElementById("askAiBtn");
    if (askAiBtn) {
        askAiBtn.addEventListener("click", () => {
            const rawInput = document.getElementById("aiQuery").value.trim().toLowerCase();
            const aiResponse = document.getElementById("aiResponse");

            if (!rawInput) {
                aiResponse.textContent = `🤔 Please enter a query.`;
                return;
            }

            const blockedTerms = ["hate", "stupid", "ugly", "kill", "kwere-kwere", "immigrants"];
            const isUnsafe = blockedTerms.some(term => rawInput.includes(term));

            if (isUnsafe) {
                aiResponse.innerHTML = `🛡️ <strong>[🚨 Safety Warning]:</strong> Inappropriate content intercepted by moderation filters.`;
                aiResponse.className = "ai-interface-response-box feedback-error-style";
            } else {
                aiResponse.className = "ai-interface-response-box";
                const updatedCount = incrementAiInquiryTracker();
                
                if (rawInput.includes("sky")) {
                    aiResponse.innerHTML = `🤖 AI Guide: The sky is blue because Earth's atmosphere scatters shorter blue light waves in all directions.<br><br><small style="color:var(--accent);">[Total Safe Queries Processed: ${updatedCount}]</small>`;
                } else {
                    aiResponse.innerHTML = `🤖 AI Guide: Query checked and verified safe. Connecting to secure knowledge vault parameters...<br><br><small style="color:var(--accent);">[Total Safe Queries Processed: ${updatedCount}]</small>`;
                }
            }
        });
    }

    const galleryGrid = document.getElementById("galleryGrid");
    const filterSelect = document.getElementById("filterCategory");
    if (galleryGrid) {
        const renderGallery = (filterCriterion) => {
            galleryGrid.innerHTML = "";
            const filteredArray = filterCriterion === "all" ? memoriesArray : memoriesArray.filter(item => item.category === filterCriterion);
            
            filteredArray.forEach(item => {
                const cardDiv = document.createElement("div");
                cardDiv.className = "card";
                cardDiv.innerHTML = `
                    <div class="placeholder-icon">🖼️</div>
                    <h3>${item.title}</h3>
                    <p>${item.caption}</p>
                    <button class="btn-theme like-action-btn" data-id="${item.id}">❤️ Like (<span>${item.likes}</span>)</button>
                `;
                galleryGrid.appendChild(cardDiv);
            });
        };

        if (filterSelect) {
            filterSelect.addEventListener("change", (e) => {
                renderGallery(e.target.value);
            });
        }

        galleryGrid.addEventListener("click", (e) => {
            if (e.target.classList.contains("like-action-btn")) {
                const targetId = e.target.getAttribute("data-id");
                const matchedMemory = memoriesArray.find(m => m.id === targetId);
                if (matchedMemory) {
                    matchedMemory.likes += 1;
                    const spanCount = e.target.querySelector("span");
                    spanCount.textContent = `${matchedMemory.likes}`;
                    incrementLocalStorageTracker("totalEngagementCounter");
                    updateCounterDisplays();
                }
            }
        });

        renderGallery("all");
    }

    const registrationForm = document.getElementById("registrationForm");
    if (registrationForm) {
        registrationForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const parentName = document.getElementById("parentName").value.trim();
            const familySurname = document.getElementById("familySurname").value.trim();
            const emailAddress = document.getElementById("emailAddress").value.trim();
            const feedbackBox = document.getElementById("formFeedback");

            if (parentName.length < 2 || familySurname.length < 2) {
                feedbackBox.className = "feedback-msg feedback-error-style";
                feedbackBox.textContent = `❌ Names must contain at least 2 alphanumeric characters.`;
                return;
            }

            incrementLocalStorageTracker("registrationSessionCounter");
            feedbackBox.className = "feedback-msg feedback-success-style";
            feedbackBox.innerHTML = `🎉 Validation Complete! The <strong>${familySurname} Family Hub</strong> has been initialized. Updates sent to ${emailAddress.toLowerCase()}.`;
            registrationForm.reset();
            updateCounterDisplays();
        });
    }

    function updateCounterDisplays() {
        const totalEngagedSpan = document.getElementById("totalEngagementDisplay");
        if (totalEngagedSpan) {
            totalEngagedSpan.textContent = `${fetchLocalStorageValue("totalEngagementCounter")}`;
        }
        const totalRegSpan = document.getElementById("totalRegistrationsDisplay");
        if (totalRegSpan) {
            totalRegSpan.textContent = `${fetchLocalStorageValue("registrationSessionCounter")}`;
        }
    }

    updateCounterDisplays();
});
