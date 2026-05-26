// Populate the last modified date in the footer
document.addEventListener("DOMContentLoaded", () => {
    const lastModifiedElement = document.getElementById("lastModified");
    if (lastModifiedElement) {
        lastModifiedElement.textContent = document.lastModified;
    }
});
