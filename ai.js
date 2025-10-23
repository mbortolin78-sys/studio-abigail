export function processCommand(text) {
    const cleanedText = text.trim().toUpperCase();
    const isCommand = cleanedText.startsWith("R.");

    if (!isCommand) {
        return { output: "Messaggio ricevuto. Nessun comando rilevato." };
    }

    const parts = cleanedText.split(" ");
    const type = parts[0]; // es. R.A.E.
    const time = parts[1] || "00:00";
    const location = parts[2] || "Luogo sconosciuto";

    const energy = calculateEnergy(type, time, location);
    const level = interpretLevel(energy);

    const response = `${type} ${time} ${location} → Energia attiva: ${energy} — ${level}.`;

    return { output: response };
}

function calculateEnergy(type, time, location) {
    const base = type.length * 10;
    const timeFactor = parseInt(time.replace(":", ""), 10) % 100;
    const locationFactor = location.length * 2;

    return base + timeFactor + locationFactor;
}

function interpretLevel(value) {
    if (value > 90) return "livello armonico molto alto, forte allineamento cosmico";
    if (value > 70) return "livello armonico alto, buona sincronizzazione con l’asse lunare";
    if (value > 50) return "livello medio, energia stabile";
    return "livello basso, possibile dissonanza ambientale";
}
