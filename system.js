
    function updateDateTime() {
        const currentDate = new Date();
        const formattedDate = currentDate.toLocaleDateString();
        const formattedTime = currentDate.toLocaleTimeString();
        document.getElementById('current-datetime').textContent = `${formattedDate} ${formattedTime}`;
    }

    // Set an interval to update the time every second
    setInterval(updateDateTime, 1000);

    // Initialize the date & time on page load
    updateDateTime();

    // Function to handle brightness settings
    document.getElementById('brightness').addEventListener('change', function () {
        const brightness = this.value;
        changeBrightness(brightness);
        alert(`Backlight brightness set to: ${brightness}`);
    });

    // Function to adjust brightness on the page (not the desktop)
    function changeBrightness(brightness) {
        let brightnessValue;
        switch (brightness) {
            case '0%':
                brightnessValue = 0;
                break;
            case '20%':
                brightnessValue = 0.2;
                break;
            case '40%':
                brightnessValue = 0.4;
                break;
            case '60%':
                brightnessValue = 0.6;
                break;
            case '80%':
                brightnessValue = 0.8;
                break;
            case '100%':
                brightnessValue = 1;
                break;
            default:
                brightnessValue = 1;
        }
        document.body.style.filter = `brightness(${brightnessValue})`;
    }

    // Language content for different languages
    const languageContent = {
        en: {
            title: "System",
            autoOffLabel: "Auto OFF",
            brightnessLabel: "Backlight brightness",
            beepLabel: "Beep",
            languageLabel: "Language",
            usbLabel: "USB Connection",
            datetimeLabel: "Date & Time",
            settingsBtn: "Settings",
            infoBtn: "Information",
            updateBtn: "Update",
            exitBtn: "Exit"
        },
        es: {
            title: "Sistema",
            autoOffLabel: "Apagar automático",
            brightnessLabel: "Brillo de retroiluminación",
            beepLabel: "Bip",
            languageLabel: "Idioma",
            usbLabel: "Conexión USB",
            datetimeLabel: "Fecha y hora",
            settingsBtn: "Configuraciones",
            infoBtn: "Información",
            updateBtn: "Actualizar",
            exitBtn: "Salir"
        },
        fr: {
            title: "Système",
            autoOffLabel: "Arrêt automatique",
            brightnessLabel: "Luminosité du rétroéclairage",
            beepLabel: "Bip",
            languageLabel: "Langue",
            usbLabel: "Connexion USB",
            datetimeLabel: "Date et heure",
            settingsBtn: "Paramètres",
            infoBtn: "Informations",
            updateBtn: "Mettre à jour",
            exitBtn: "Quitter"
        },
        nl: {
            title: "Systeem",
            autoOffLabel: "Auto UIT",
            brightnessLabel: "Achtergrondverlichting helderheid",
            beepLabel: "Biep",
            languageLabel: "Taal",
            usbLabel: "USB-verbinding",
            datetimeLabel: "Datum & Tijd",
            settingsBtn: "Instellingen",
            infoBtn: "Informatie",
            updateBtn: "Bijwerken",
            exitBtn: "Afsluiten"
        },
        de: {
            title: "System",
            autoOffLabel: "Automatisches Ausschalten",
            brightnessLabel: "Hintergrundbeleuchtung Helligkeit",
            beepLabel: "Piepton",
            languageLabel: "Sprache",
            usbLabel: "USB-Verbindung",
            datetimeLabel: "Datum & Uhrzeit",
            settingsBtn: "Einstellungen",
            infoBtn: "Informationen",
            updateBtn: "Aktualisieren",
            exitBtn: "Beenden"
        },
        it: {
            title: "Sistema",
            autoOffLabel: "Spegnimento automatico",
            brightnessLabel: "Luminosità retroilluminazione",
            beepLabel: "Bip",
            languageLabel: "Lingua",
            usbLabel: "Connessione USB",
            datetimeLabel: "Data e ora",
            settingsBtn: "Impostazioni",
            infoBtn: "Informazioni",
            updateBtn: "Aggiornare",
            exitBtn: "Uscire"
        },
        pt: {
            title: "Sistema",
            autoOffLabel: "Desligamento automático",
            brightnessLabel: "Brilho de retroiluminação",
            beepLabel: "Bip",
            languageLabel: "Idioma",
            usbLabel: "Conexão USB",
            datetimeLabel: "Data e Hora",
            settingsBtn: "Configurações",
            infoBtn: "Informações",
            updateBtn: "Atualizar",
            exitBtn: "Sair"
        }
    };

    // Function to change the language
    function changeLanguage() {
        const language = document.getElementById('language').value;
        const content = languageContent[language];

        // Change all text content based on selected language
        document.getElementById('title').textContent = content.title;
        document.getElementById('auto-off-label').textContent = content.autoOffLabel;
        document.getElementById('brightness-label').textContent = content.brightnessLabel;
        document.getElementById('beep-label').textContent = content.beepLabel;
        document.getElementById('language-label').textContent = content.languageLabel;
        document.getElementById('usb-label').textContent = content.usbLabel;
        document.getElementById('datetime-label').textContent = content.datetimeLabel;
        document.getElementById('settings-btn').textContent = content.settingsBtn;
        document.getElementById('info-btn').textContent = content.infoBtn;
        document.getElementById('update-btn').textContent = content.updateBtn;
        document.getElementById('exit-btn').textContent = content.exitBtn;
    }
    function saveSettings() {
const selectedBrightness = document.getElementById("brightnessSlider").value;
const selectedLanguage = document.getElementById("languageSelect").value;

// 🔥 Save to localStorage
localStorage.setItem('brightness', selectedBrightness);
localStorage.setItem('language', selectedLanguage);

// Optional: Apply immediately
applySettings();
    }
    // Call the language change function when the page loads
    changeLanguage();
function saveSettings() {
    localStorage.setItem('brightness', document.getElementById('brightness').value);
    localStorage.setItem('language', document.getElementById('language').value);
    localStorage.setItem('auto-off', document.getElementById('auto-off').value);
    localStorage.setItem('beep', document.getElementById('beep').value);
    localStorage.setItem('usb', document.getElementById('usb').value);
    localStorage.setItem('date', document.getElementById('date-time').value);
    localStorage.setItem('time', document.getElementById('time').value);
}

// Settings button ➝ save settings and go to setindex.html
document.getElementById("settings-btn").addEventListener("click", () => {
    saveSettings();
    alert("Settings saved.");
});

// Update button ➝ save and apply immediately
function updateSystem() {
    const date = document.getElementById('date-time').value;
    const time = document.getElementById('time').value;
  
    if (date && time) {
      const customStart = new Date(`${date}T${time}:00`);
      const now = Date.now();
      const offset = now - customStart.getTime(); // how much behind current time
      localStorage.setItem('systemClockOffset', offset); // store the difference
    }
  
    saveSettings();
    updateDateTime();
    changeBrightness(document.getElementById('brightness').value);
    changeLanguage();
    alert("System updated with new settings.");
  }
  
  
  

function showInformation() {
    alert("System Info:\nModel: VFL-X300\nVersion: 1.0.2\nLast Update: June 2025");
}

function exitSystem() {
    window.location.href = 'home.html';
}

  
  
