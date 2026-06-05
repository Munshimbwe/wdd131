import { calculateWindChill, generateTableOfContentsData, processLoginVerification } from './utils.js';

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
            hamburgerBtn.classList.toggle("open");
            hamburgerBtn.setAttribute("aria-expanded", isOpen);
        });
    }

    const uploadForm = document.getElementById("uploadForm");
    const galleryGrid = document.getElementById("galleryGrid");

    let memoriesDatabase = JSON.parse(localStorage.getItem("kinspaceMemories")) || [
        { id: 1, isPlaceholder: true, placeholder: "🚲", title: "Timmy's First Bike Ride!", likes: 3 },
        { id: 2, isPlaceholder: true, placeholder: "🎂", title: "Grandma's 70th Birthday Party", likes: 8 }
    ];

    function renderGalleryFeed() {
        if (!galleryGrid) return;
        galleryGrid.innerHTML = "";

        memoriesDatabase.forEach(memory => {
            const card = document.createElement("div");
            card.className = "card gallery-item-card";

            if (memory.isPlaceholder) {
                const iconDiv = document.createElement("div");
                iconDiv.className = "gallery-card-icon";
                iconDiv.textContent = memory.placeholder;
                card.appendChild(iconDiv);
            } else {
                const img = document.createElement("img");
                img.src = memory.imageStream;
                img.alt = memory.title;
                img.className = "gallery-card-image";
                img.loading = "lazy";
                card.appendChild(img);
            }

            const h3 = document.createElement("h3");
            h3.textContent = memory.title;

            const likeBtn = document.createElement("button");
            likeBtn.className = "btn-theme reaction-btn";
            likeBtn.innerHTML = `❤️ Like (<span>${memory.likes}</span>)`;
            
            likeBtn.addEventListener("click", () => {
                memory.likes++;
                localStorage.setItem("kinspaceMemories", JSON.stringify(memoriesDatabase));
                renderGalleryFeed();
            });

            card.appendChild(h3);
            card.appendChild(likeBtn);
            galleryGrid.appendChild(card);
        });
    }

    if (uploadForm) {
        uploadForm.addEventListener("submit", (event) => {
            event.preventDefault();
            
            const fileInput = document.getElementById("imageFileSelect");
            const captionInput = document.getElementById("imageCaption").value.trim();
            
            if (!fileInput.files || fileInput.files.length === 0) return;
            
            const targetFile = fileInput.files[0];
            const fileReader = new FileReader();

            fileReader.addEventListener("load", () => {
                const newMemory = {
                    id: Date.now(),
                    isPlaceholder: false,
                    imageStream: fileReader.result,
                    title: captionInput,
                    likes: 0
                };

                memoriesDatabase.unshift(newMemory);
                localStorage.setItem("kinspaceMemories", JSON.stringify(memoriesDatabase));
                uploadForm.reset();
                renderGalleryFeed();
            });

            fileReader.readAsDataURL(targetFile);
        });
    }

    renderGalleryFeed();

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
