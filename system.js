
    // Update date and time every second
    function updateDateTime() {
        const currentDate = new Date();
        const formattedDate = currentDate.toLocaleDateString();
        const formattedTime = currentDate.toLocaleTimeString();
        document.getElementById('current-datetime').textContent = `${formattedDate} ${formattedTime}`;
    }

    setInterval(updateDateTime, 1000);

    // Brightness handling
    document.getElementById('brightness').addEventListener('change', function () {
        const brightness = this.value;
        changeBrightness(brightness);
        alert(`Backlight brightness set to: ${brightness}`);
    });

    function changeBrightness(brightness) {
        let brightnessValue = {
            '0%': 0,
            '20%': 0.2,
            '40%': 0.4,
            '60%': 0.6,
            '80%': 0.8,
            '100%': 1
        }[brightness] || 1;
        document.body.style.filter = `brightness(${brightnessValue})`;
    }

    // Language content
    const languageContent = {
        en: { title: "System", autoOffLabel: "Auto OFF", brightnessLabel: "Backlight brightness", beepLabel: "Beep", languageLabel: "Language", usbLabel: "USB Connection", datetimeLabel: "Date & Time", settingsBtn: "Settings", infoBtn: "Information", updateBtn: "Update", exitBtn: "Exit" },
        es: { title: "Sistema", autoOffLabel: "Apagar automático", brightnessLabel: "Brillo de retroiluminación", beepLabel: "Bip", languageLabel: "Idioma", usbLabel: "Conexión USB", datetimeLabel: "Fecha y hora", settingsBtn: "Configuraciones", infoBtn: "Información", updateBtn: "Actualizar", exitBtn: "Salir" },
        fr: { title: "Système", autoOffLabel: "Arrêt automatique", brightnessLabel: "Luminosité du rétroéclairage", beepLabel: "Bip", languageLabel: "Langue", usbLabel: "Connexion USB", datetimeLabel: "Date et heure", settingsBtn: "Paramètres", infoBtn: "Informations", updateBtn: "Mettre à jour", exitBtn: "Quitter" },
        nl: { title: "Systeem", autoOffLabel: "Auto UIT", brightnessLabel: "Achtergrondverlichting helderheid", beepLabel: "Biep", languageLabel: "Taal", usbLabel: "USB-verbinding", datetimeLabel: "Datum & Tijd", settingsBtn: "Instellingen", infoBtn: "Informatie", updateBtn: "Bijwerken", exitBtn: "Afsluiten" },
        de: { title: "System", autoOffLabel: "Automatisches Ausschalten", brightnessLabel: "Hintergrundbeleuchtung Helligkeit", beepLabel: "Piepton", languageLabel: "Sprache", usbLabel: "USB-Verbindung", datetimeLabel: "Datum & Uhrzeit", settingsBtn: "Einstellungen", infoBtn: "Informationen", updateBtn: "Aktualisieren", exitBtn: "Beenden" },
        it: { title: "Sistema", autoOffLabel: "Spegnimento automatico", brightnessLabel: "Luminosità retroilluminazione", beepLabel: "Bip", languageLabel: "Lingua", usbLabel: "Connessione USB", datetimeLabel: "Data e ora", settingsBtn: "Impostazioni", infoBtn: "Informazioni", updateBtn: "Aggiornare", exitBtn: "Uscire" },
        pt: { title: "Sistema", autoOffLabel: "Desligamento automático", brightnessLabel: "Brilho de retroiluminação", beepLabel: "Bip", languageLabel: "Idioma", usbLabel: "Conexão USB", datetimeLabel: "Data e Hora", settingsBtn: "Configurações", infoBtn: "Informações", updateBtn: "Atualizar", exitBtn: "Sair" }
    };

    function changeLanguage() {
        const language = document.getElementById('language').value;
        const content = languageContent[language];
        if (!content) return;

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
        localStorage.setItem('brightness', document.getElementById('brightness').value);
        localStorage.setItem('language', document.getElementById('language').value);
        localStorage.setItem('auto-off', document.getElementById('auto-off').value);
        localStorage.setItem('beep', document.getElementById('beep').value);
        localStorage.setItem('usb', document.getElementById('usb').value);
        localStorage.setItem('date', document.getElementById('date-time').value);
        localStorage.setItem('time', document.getElementById('time').value);
    }

    function updateSystem() {
        const date = document.getElementById('date-time').value;
        const time = document.getElementById('time').value;

        if (date && time) {
            const customStart = new Date(`${date}T${time}:00`);
            const now = Date.now();
            const offset = now - customStart.getTime();
            localStorage.setItem('systemClockOffset', offset);
        }

        saveSettings();
        updateDateTime();
        changeBrightness(document.getElementById('brightness').value);
        changeLanguage();
        alert("System updated with new settings.");
    }

    function showInformation() {
    const date = document.getElementById('date-time').value || 'N/A';
    const time = document.getElementById('time').value || 'N/A';

    const lastUpdate = (date !== 'N/A' && time !== 'N/A') ? `${date} at ${time}` : 'Not set';

    alert(`System Info:\nModel: VFL-X300\nVersion: 1.0.2\nLast Update: ${lastUpdate}`);
}


    function exitSystem() {
        window.location.href = 'home.html';
    }

    function loadSettings() {
        const brightness = localStorage.getItem('brightness') || '100%';
        const language = localStorage.getItem('language') || 'en';
        const autoOff = localStorage.getItem('auto-off') || 'off';
        const beep = localStorage.getItem('beep') || 'off';
        const usb = localStorage.getItem('usb') || 'off';
        const date = localStorage.getItem('date') || '';
        const time = localStorage.getItem('time') || '';

        document.getElementById('brightness').value = brightness;
        document.getElementById('language').value = language;
        document.getElementById('auto-off').value = autoOff;
        document.getElementById('beep').value = beep;
        document.getElementById('usb').value = usb;
        document.getElementById('date-time').value = date;
        document.getElementById('time').value = time;

        changeBrightness(brightness);
        changeLanguage();
        updateDateTime();
    }

    document.addEventListener('DOMContentLoaded', () => {
        loadSettings();

        // Settings button ➝ save settings
        document.getElementById("settings-btn").addEventListener("click", () => {
            saveSettings();
            alert("Settings saved.");
        });
    });
