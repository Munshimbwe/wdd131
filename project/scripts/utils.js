export function processLoginVerification(role, inputKey) {
    const cleanKey = inputKey.trim();

    if (role === "Parent" && !cleanKey.includes("@")) {
        return { success: false, message: "❌ Parents must use a valid email address." };
    }
    if (cleanKey.length < 3) {
        return { success: false, message: "❌ Account username parameters are too short." };
    }

    return {
        success: true,
        message: "📲 Security Code Dispatched! Check your linked device.",
        simulatedOtp: "1234"
    };
}

export function process2FAVerification(inputCode, trueCode) {
    if (inputCode.trim() === trueCode) {
        return { success: true, message: "🔓 Double Authentication Verified! Redirecting..." };
    }
    return { success: false, message: "❌ Invalid code match. Please try again." };
}

export function calculateWindChill(temperature, windSpeed) {
    if (temperature <= 10 && windSpeed > 4.8) {
        const chill = 13.12 + (0.6215 * temperature) - (11.37 * Math.pow(windSpeed, 0.16)) + (0.3965 * temperature * Math.pow(windSpeed, 0.16));
        return `${Math.round(chill)}°C`;
    }
    return "N/A (Conditions out of range)";
}

export function getFormattedLastModified() {
    return document.lastModified;
}

export function generateTableOfContentsData() {
    return [
        { targetId: "features", text: "✨ Core System Features" },
        { targetId: "weather-section", text: "🌦️ Outdoor Safety Check" },
        { targetId: "ai-section", text: "🤖 Safe AI Assistant" }
    ];
}
