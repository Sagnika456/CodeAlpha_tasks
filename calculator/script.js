const display = document.getElementById("display");
const preview = document.getElementById("preview");
const historyList = document.getElementById("historyList");

function append(value) {
    display.value += value;
    playClick();
    updatePreview();
}

function clearDisplay() {
    display.value = "";
    preview.innerText = "";
}

function deleteLast() {
    display.value = display.value.slice(0, -1);
    updatePreview();
}

function calculate() {
    try {
        let result = eval(display.value);
        addToHistory(display.value + " = " + result);
        display.value = result;
        preview.innerText = "";
    } catch {
        display.value = "Error";
    }
}

function updatePreview() {
    try {
        preview.innerText = eval(display.value);
    } catch {
        preview.innerText = "";
    }
}

function addToHistory(entry) {
    const li = document.createElement("li");
    li.textContent = entry;
    historyList.prepend(li);
}

function playClick() {
    const audio = new Audio("https://www.soundjay.com/button/beep-07.wav");
    audio.play();
}

// Theme toggle
document.getElementById("themeToggle").addEventListener("click", () => {
    document.body.classList.toggle("light");
});

// Keyboard support
document.addEventListener("keydown", (e) => {
    if (!isNaN(e.key) || "+-*/.%".includes(e.key)) append(e.key);
    if (e.key === "Enter") calculate();
    if (e.key === "Backspace") deleteLast();
    if (e.key === "Escape") clearDisplay();
});