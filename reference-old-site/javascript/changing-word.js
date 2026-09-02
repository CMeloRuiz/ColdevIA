const words = [
    "MODERNAS",
    "EFICIENTES",
    "ESCALABLES",
    "INNOVADORAS",
    "MEMORABLES"
];

let index = 0;
const dynamicWord = document.getElementById("dynamic-word");

function changeWord() {
    // Animación de salida
    dynamicWord.classList.add("fade-out");

    setTimeout(() => {
        // Cambiar palabra
        index = (index + 1) % words.length;
        dynamicWord.textContent = words[index];

        // Animación de entrada
        dynamicWord.classList.remove("fade-out");
    }, 500); // Tiempo igual al de la transición en CSS
}

// Cambia la palabra cada 3 segundos
setInterval(changeWord, 3000);