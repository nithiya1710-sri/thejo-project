// ------------------ LIVE CLOCK ------------------
function updateDateTime() {
    const now = new Date(Date.now() - (parseInt(localStorage.getItem("systemClockOffset")) || 0));
    document.getElementById("current-datetime").textContent =
        now.toLocaleDateString() + " " + now.toLocaleTimeString();
}
setInterval(updateDateTime, 1000);


// ------------------ BRIGHTNESS ------------------
function applyBrightness() {
    const saved = localStorage.getItem("brightness") || "100%";

    const map = {
        "0%": 0,
        "20%": 0.2,
        "40%": 0.4,
        "60%": 0.6,
        "80%": 0.8,
        "100%": 1
    };

    document.body.style.filter = `brightness(${map[saved]})`;
}

document.getElementById("brightness").addEventListener("change", function () {
    alert(`Brightness: ${this.value}`);
});


// ------------------ LANGUAGE ------------------
const languageContent = {
    en: { title: "System", autoOffLabel: "Auto OFF", brightnessLabel: "Backlight brightness", beepLabel: "Beep", languageLabel: "Language", usbLabel: "USB Connection", datetimeLabel: "Date & Time", settingsBtn: "Settings", infoBtn: "Information", updateBtn: "Update", exitBtn: "Exit" },
    es: { title: "Sistema", autoOffLabel: "Apagar automático", brightnessLabel: "Brillo de retroiluminación", beepLabel: "Bip", languageLabel: "Idioma", usbLabel: "Conexión USB", datetimeLabel: "Fecha y hora", settingsBtn: "Configuraciones", infoBtn: "Información", updateBtn: "Actualizar", exitBtn: "Salir" },
    fr: { title: "Système", autoOffLabel: "Arrêt automatique", brightnessLabel: "Luminosité du rétroéclairage", beepLabel: "Bip", languageLabel: "Langue", usbLabel: "Connexion USB", datetimeLabel: "Date et heure", settingsBtn: "Paramètres", infoBtn: "Informations", updateBtn: "Mettre à jour", exitBtn: "Quitter" },
    nl: { title: "Systeem", autoOffLabel: "Auto UIT", brightnessLabel: "Achtergrondverlichting helderheid", beepLabel: "Biep", languageLabel: "Taal", usbLabel: "USB-verbinding", datetimeLabel: "Datum & Tijd", settingsBtn: "Instellingen", infoBtn: "Informatie", updateBtn: "Bijwerken", exitBtn: "Afsluiten" },
    de: { title: "System", autoOffLabel: "Automatisches Ausschalten", brightnessLabel: "Hintergrundbeleuchtung Helligkeit", beepLabel: "Piepton", languageLabel: "Sprache", usbLabel: "USB-Verbindung", datetimeLabel: "Datum & Uhrzeit", settingsBtn: "Einstellungen", infoBtn: "Informationen", updateBtn: "Aktualisieren", exitBtn: "Beenden" }
};

function applyLanguage() {
    const lang = localStorage.getItem("language") || "en";
    const c = languageContent[lang];

    if (!c) return;

    document.getElementById("title").textContent = c.title;
    document.getElementById("auto-off-label").textContent = c.autoOffLabel;
    document.getElementById("brightness-label").textContent = c.brightnessLabel;
    document.getElementById("beep-label").textContent = c.beepLabel;
    document.getElementById("language-label").textContent = c.languageLabel;
    document.getElementById("usb-label").textContent = c.usbLabel;
    document.getElementById("datetime-label").textContent = c.datetimeLabel;
    document.getElementById("settings-btn").textContent = c.settingsBtn;
    document.getElementById("info-btn").textContent = c.infoBtn;
    document.getElementById("update-btn").textContent = c.updateBtn;
    document.getElementById("exit-btn").textContent = c.exitBtn;
}


// ------------------ SAVE SETTINGS ------------------
function saveSettings() {
    localStorage.setItem("brightness", document.getElementById("brightness").value);
    localStorage.setItem("language", document.getElementById("language").value);
    localStorage.setItem("auto-off", document.getElementById("auto-off").value);
    localStorage.setItem("beep", document.getElementById("beep").value);
    localStorage.setItem("usb", document.getElementById("usb").value);
    localStorage.setItem("date", document.getElementById("date").value);
    localStorage.setItem("time", document.getElementById("time").value);
}


// ------------------ UPDATE BUTTON ------------------
function updateSystem() {
    saveSettings();

    // adjust clock
    const d = document.getElementById("date").value;
    const t = document.getElementById("time").value;

    if (d && t) {
        const custom = new Date(`${d}T${t}:00`);
        const offset = Date.now() - custom.getTime();
        localStorage.setItem("systemClockOffset", offset);
    }

    applyBrightness();
    applyLanguage();

    alert("System updated.");
}


// ------------------ LOAD SETTINGS (every screen) ------------------
function loadSettings() {
    document.getElementById("brightness").value =
        localStorage.getItem("brightness") || "100%";

    document.getElementById("language").value =
        localStorage.getItem("language") || "en";

    document.getElementById("auto-off").value =
        localStorage.getItem("auto-off") || "OFF";

    document.getElementById("beep").value =
        localStorage.getItem("beep") || "OFF";

    document.getElementById("usb").value =
        localStorage.getItem("usb") || "OFF";

    document.getElementById("date").value =
        localStorage.getItem("date") || "";

    document.getElementById("time").value =
        localStorage.getItem("time") || "";

    applyBrightness();
    applyLanguage();
    updateDateTime();
}


// ------------------ INFO ------------------
function showInformation() {
    const d = localStorage.getItem("date") || "N/A";
    const t = localStorage.getItem("time") || "N/A";

    alert(`System Info:
Model: VFL-X300
Version: 1.0.2
Last Update: ${d} at ${t}`);
}


// ------------------ EXIT ------------------
function exitSystem() {
    window.location.href = "home.html";
}


// ------------------ INIT ------------------
document.addEventListener("DOMContentLoaded", loadSettings);
