import { calculateWindChill, getFormattedLastModified, generateTableOfContentsData, processRegistrationData, processLoginVerification, process2FAVerification } from './utils.js';

document.addEventListener("DOMContentLoaded", () => {
    
    let activeUserRole = "";
    let activeTrueOtp = "";

    const tocList = document.getElementById("tocList");
    if (tocList) {
        const tocData = generateTableOfContentsData();
        tocList.innerHTML = "";
        tocData.forEach(item => {
            const li = document.createElement("li");
            const a = document.createElement("a");
            a.href = `#${item.targetId}`;
            a.textContent = item.text;
            li.appendChild(a);
            tocList.appendChild(li);
        });
    }

    const loginBtn = document.getElementById("loginBtn");
    const loginModal = document.getElementById("loginModal");
    const closeModalBtn = document.getElementById("closeModalBtn");
    const modalLoginForm = document.getElementById("modalLoginForm");
    const modal2FAForm = document.getElementById("modal2FAForm");
    const modalSubHeading = document.getElementById("modalSubHeading");
    const modalFormFeedback = document.getElementById("modalFormFeedback");
    const modal2FAFeedback = document.getElementById("modal2FAFeedback");

    function resetModalState() {
        if (modalLoginForm) modalLoginForm.reset();
        if (modal2FAForm) modal2FAForm.reset();
        if (modalLoginForm) modalLoginForm.style.display = "flex";
        if (modal2FAForm) modal2FAForm.style.display = "none";
        if (modalSubHeading) modalSubHeading.textContent = "Select account type and input details to access your family hub.";
        if (modalFormFeedback) modalFormFeedback.textContent = "";
        if (modal2FAFeedback) modal2FAFeedback.textContent = "";
        activeUserRole = "";
        activeTrueOtp = "";
    }

    if (loginBtn && loginModal) {
        loginBtn.addEventListener("click", (event) => {
            event.preventDefault();
            resetModalState();
            loginModal.classList.add("active");
        });
    }

    if (closeModalBtn && loginModal) {
        closeModalBtn.addEventListener("click", () => {
            loginModal.classList.remove("active");
            resetModalState();
        });
    }

    if (loginModal) {
        loginModal.addEventListener("click", (event) => {
            if (event.target === loginModal) {
                loginModal.classList.remove("active");
                resetModalState();
            }
        });
    }

    if (modalLoginForm) {
        modalLoginForm.addEventListener("submit", (event) => {
            event.preventDefault();
            
            const role = document.getElementById("modalRoleSelect").value;
            const userKey = document.getElementById("modalEmailInput").value;

            const result = processLoginVerification(role, userKey);

            if (result.success) {
                modalFormFeedback.style.color = "var(--secondary)";
                modalFormFeedback.textContent = result.message;
                activeUserRole = role;
                activeTrueOtp = result.simulatedOtp;

                setTimeout(() => {
                    modalLoginForm.style.display = "none";
                    modal2FAForm.style.display = "flex";
                    modalSubHeading.innerHTML = `🛡️ <strong>Double Authentication:</strong> Enter the temporary code <strong>${activeTrueOtp}</strong> sent to your device to verify identity.`;
                }, 1200);
            } else {
                modalFormFeedback.style.color = "#E74C3C";
                modalFormFeedback.textContent = result.message;
            }
        });
    }

    if (modal2FAForm) {
        modal2FAForm.addEventListener("submit", (event) => {
            event.preventDefault();
            const inputCode = document.getElementById("modalOtpInput").value;

            const result = process2FAVerification(inputCode, activeTrueOtp);

            if (result.success) {
                modal2FAFeedback.style.color = "var(--secondary)";
                modal2FAFeedback.textContent = result.message;
                
                setTimeout(() => {
                    loginModal.classList.remove("active");
                    resetModalState();
                    if (activeUserRole === "Parent") {
                        window.location.href = "dashboard.html";
                    } else {
                        window.location.href = "gallery.html";
                    }
                }, 1500);
            } else {
                modal2FAFeedback.style.color = "#E74C3C";
                modal2FAFeedback.textContent = result.message;
            }
        });
    }

    const ctaBtn = document.getElementById("ctaBtn");
    if (ctaBtn) {
        ctaBtn.addEventListener("click", () => {
            const targetSection = document.getElementById("account-section");
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: "smooth" });
            }
        });
    }

    const registrationForm = document.getElementById("registrationForm");
    if (registrationForm) {
        registrationForm.addEventListener("submit", (event) => {
            event.preventDefault();

            const firstName = document.getElementById("firstNameInput").value;
            const surname = document.getElementById("surnameInput").value;
            const email = document.getElementById("emailInput").value;
            const feedbackDisplay = document.getElementById("formFeedback");

            const result = processRegistrationData(firstName, surname, email);

            if (result.success) {
                feedbackDisplay.style.color = "var(--secondary)";
                feedbackDisplay.textContent = result.message;
                registrationForm.reset();
            } else {
                feedbackDisplay.style.color = "#E74C3C";
                feedbackDisplay.textContent = result.message;
            }
        });
    }

    const uploadForm = document.getElementById("uploadForm");
    const galleryGrid = document.getElementById("galleryGrid");
    if (uploadForm && galleryGrid) {
        uploadForm.addEventListener("submit", (event) => {
            event.preventDefault();
            const captionText = document.getElementById("imageCaption").value;
            
            const card = document.createElement("div");
            card.className = "card";
            card.innerHTML = `
                <div style="font-size:60px; margin-bottom:15px;">🌟</div>
                <h3>${captionText}</h3>
                <button class="btn-theme reaction-btn" style="margin-left:0; margin-top:10px;">❤️ Like (<span>0</span>)</button>
            `;
            
            galleryGrid.insertBefore(card, galleryGrid.firstChild);
            uploadForm.reset();
        });
    }

    document.body.addEventListener("click", (event) => {
        if (event.target.classList.contains("reaction-btn")) {
            const span = event.target.querySelector("span");
            let count = parseInt(span.textContent);
            span.textContent = count + 1;
        }
    });

    const timeSlider = document.getElementById("timeSlider");
    const timeDisplay = document.getElementById("timeDisplay");
    if (timeSlider && timeDisplay) {
        timeSlider.addEventListener("input", () => {
            timeDisplay.textContent = timeSlider.value;
        });
    }

    document.body.addEventListener("click", (event) => {
        if (event.target.classList.contains("approval-btn")) {
            const row = event.target.closest("tr");
            if (row) {
                row.style.transition = "opacity 0.3s ease";
                row.style.opacity = "0.5";
                event.target.disabled = true;
                event.target.textContent = "Verified ✔️";
                event.target.style.backgroundColor = "var(--secondary)";
            }
        }
    });

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
        });
    }

    const weatherIcon = document.getElementById("weatherIcon");
    const weatherTemp = document.getElementById("weatherTemp");
    if (weatherIcon && weatherTemp) {
        const currentHour = new Date().getHours();
        if (currentHour >= 18 || currentHour < 6) {
            weatherIcon.textContent = "🌙";
            weatherTemp.textContent = "14°C (Clear Night)";
        } else {
            weatherIcon.textContent = "☀️";
            weatherTemp.textContent = "24°C (Sunny Day)";
        }
    }

    const calcChillBtn = document.getElementById("calcChillBtn");
    if (calcChillBtn) {
        calcChillBtn.addEventListener("click", () => {
            const T = parseFloat(document.getElementById("tempInput").value);
            const V = parseFloat(document.getElementById("windInput").value);
            const resultDisplay = document.getElementById("chillResult");

            const result = calculateWindChill(T, V);

            if (result.success) {
                resultDisplay.textContent = `🥶 Calculated Wind Chill: ${result.value}°C`;
            } else {
                resultDisplay.textContent = result.message;
            }
        });
    }

    const askAiBtn = document.getElementById("askAiBtn");
    if (askAiBtn) {
        askAiBtn.addEventListener("click", () => {
            const rawQuery = document.getElementById("aiQuery").value.trim().toLowerCase();
