import { calculateWindChill, getFormattedLastModified, generateTableOfContentsData, processLoginVerification } from './utils.js';

document.addEventListener("DOMContentLoaded", () => {
    
    let activeUserRole = "";
    let activeTrueOtp = "";

    const lastModifiedSpan = document.getElementById("lastModifiedDate");
    if (lastModifiedSpan) {
        lastModifiedSpan.textContent = document.lastModified;
    }

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

    const hamburgerBtn = document.getElementById("hamburgerBtn");
    const navLinks = document.getElementById("navLinks");
    if (hamburgerBtn && navLinks) {
        hamburgerBtn.addEventListener("click", () => {
            const isOpen = navLinks.classList.toggle("open");
            hamburgerBtn.setAttribute("aria-expanded", isOpen);
        });
    }

    const aiForm = document.getElementById("aiForm");
    const aiQuery = document.getElementById("aiQuery");
    const aiResponse = document.getElementById("aiResponse");
    const answersDatabase = {
        "why is the sky blue": "The sky is blue because gases in Earth's atmosphere scatter sunlight in all directions, and blue light is scattered more than other colors because it travels as shorter, smaller waves! 🌌",
        "how far is the moon": "The Moon is about 384,400 kilometers away from Earth. That is like driving around the world 10 times! 🌙",
        "what is photosynthesis": "Photosynthesis is how plants use sunlight, water, and air to make their own food and release fresh oxygen for us to breathe! 🌱"
    };
    const restrictedWords = ["badword", "toxic", "hate", "stupid"];

    if (aiForm && aiQuery && aiResponse) {
        aiForm.addEventListener("submit", (event) => {
            event.preventDefault();
            const rawInput = aiQuery.value.trim();
            const normalizedQuery = rawInput.toLowerCase().replace(/[?.,!]/g, '');

            if (!rawInput) {
                aiResponse.textContent = "Please enter a question first! ⚠️";
                return;
            }

            const containsRestricted = restrictedWords.some(word => normalizedQuery.includes(word));
            if (containsRestricted) {
                aiResponse.textContent = "That question contains terms not suitable for our safe space. Let's keep things kind and educational! 🛡️";
                aiQuery.value = '';
                return;
            }

            if (answersDatabase[normalizedQuery]) {
                aiResponse.textContent = answersDatabase[normalizedQuery];
            } else {
                aiResponse.textContent = `"${rawInput}" is not a question I can verify right now. Try asking "Why is the sky blue?" or "How far is the Moon!" 📚`;
            }
        });
    }

    const tempInput = document.getElementById("tempInput");
    const windInput = document.getElementById("windInput");
    const calcChillBtn = document.getElementById("calcChillBtn");
    const chillResult = document.getElementById("chillResult");

    if (calcChillBtn && tempInput && windInput && chillResult) {
        calcChillBtn.addEventListener("click", () => {
            const temp = parseFloat(tempInput.value);
            const wind = parseFloat(windInput.value);
            const factor = calculateWindChill(temp, wind);
            chillResult.textContent = `Wind Chill: ${factor}`;
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
        if (modalLoginForm) modalLoginForm.classList.remove("initial-hidden");
        if (modal2FAForm) modal2FAForm.classList.add("initial-hidden");
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
            loginModal.setAttribute("aria-hidden", "false");
        });
    }

    if (closeModalBtn && loginModal) {
        closeModalBtn.addEventListener("click", () => {
            loginModal.classList.remove("active");
            loginModal.setAttribute("aria-hidden", "true");
            resetModalState();
        });
    }

    if (loginModal) {
        loginModal.addEventListener("click", (event) => {
            if (event.target === loginModal) {
                loginModal.classList.remove("active");
                loginModal.setAttribute("aria-hidden", "true");
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
                modalFormFeedback.className = "form-feedback feedback-success";
                modalFormFeedback.textContent = result.message;
                activeUserRole = role;
                activeTrueOtp = result.simulatedOtp;

                setTimeout(() => {
                    modalLoginForm.classList.add("initial-hidden");
                    modal2FAForm.classList.remove("initial-hidden");
                    modalSubHeading.innerHTML = `🛡️ <strong>Double Authentication:</strong> Enter the temporary code <strong>${activeTrueOtp}</strong> sent to your device to verify identity.`;
                }, 1200);
            } else {
                modalFormFeedback.className = "form-feedback feedback-danger";
                modalFormFeedback.textContent = result.message;
            }
        });
    }

    if (modal2FAForm) {
        modal2FAForm.addEventListener("submit", (event) => {
            event.preventDefault();
            const otpInput = document.getElementById("modalOtpInput").value.trim();

            if (otpInput === activeTrueOtp) {
                modal2FAFeedback.className = "form-feedback feedback-success";
                modal2FAFeedback.textContent = "Identity verified successfully! Redirecting...";
                setTimeout(() => {
                    loginModal.classList.remove("active");
                    loginModal.setAttribute("aria-hidden", "true");
                    window.location.href = "dashboard.html";
                }, 1500);
            } else {
                modal2FAFeedback.className = "form-feedback feedback-danger";
                modal2FAFeedback.textContent = "Invalid verification code. Please try again.";
            }
        });
    }
});
