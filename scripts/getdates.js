document.addEventListener("DOMContentLoaded", () => {
    const currentYearSpan = document.getElementById("currentyear");
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    const lastModifiedParagraph = document.getElementById("lastModified");
    if (lastModifiedParagraph) {
        const currentDate = new Date();
        
        const pad = (num) => String(num).padStart(2, '0');
        
        const month = pad(currentDate.getMonth() + 1);
        const day = pad(currentDate.getDate());
        const year = currentDate.getFullYear();
        
        const hours = pad(currentDate.getHours());
        const minutes = pad(currentDate.getMinutes());
        const seconds = pad(currentDate.getSeconds());
        
        const formattedDateString = `${month}/${day}/${year} ${hours}:${minutes}:${seconds}`;
        
        lastModifiedParagraph.textContent = `Last Modification: ${formattedDateString}`;
    }
});
