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
