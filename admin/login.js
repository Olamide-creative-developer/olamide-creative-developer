const form = document.getElementById("unlockForm");
const passcode = document.getElementById("passcode");
const message = document.getElementById("message");

form.addEventListener("submit", function (event) {
    event.preventDefault();

    if (passcode.value === "Oladejoke") {
        sessionStorage.setItem("controlCenterUnlocked", "true");
        window.location.href = "admin.html";
    } else {
        message.textContent = "Incorrect password.";
        passcode.value = "";
        passcode.focus();
    }
});