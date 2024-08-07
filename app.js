const imgs = document.querySelectorAll('.imgRandom img');
console.log("PAGINA CREADA POR BYTERDEV y Who333(Mijhu) @copyrigth 2024")
// Función para obtener una posición aleatoria
function getRandomPosition(img) {
    const x = Math.random() * window.innerWidth - 500;
    const y = Math.random() * window.innerHeight - 500;
    return { x, y };
}

// Función para animar una imagen
function animateImage(img) {
    const { x, y } = getRandomPosition(img);
    img.style.transform = `translate(${x}px, ${y}px)`;
    img.style.opacity = 1;

    setTimeout(() => {
        img.style.opacity = 0;
    }, 2000); // Esconde la imagen después de 1 segundo
}

// Función para animar todas las imágenes con una posición inicial aleatoria
function initializeImages() {
    imgs.forEach(img => {
        img.addEventListener('load', () => {
            const { x, y } = getRandomPosition(img);
            img.style.transform = `translate(${x}px, ${y}px)`;
            img.style.visibility = "hidden"; // Inicialmente visible para establecer la posición
        });

        // En caso de que la imagen esté en cache y el evento 'load' no se dispare,
        // puedes forzar que se cargue aquí también.
        if (img.complete) {
            img.dispatchEvent(new Event('load'));
        }
    });
}



// Mueve las imágenes a nuevas posiciones aleatorias en bucle
function animateAllImages() {
    imgs.forEach(img => {
        setTimeout(() => animateImage(img), Math.random() * 2000);
        img.style.visibility = "visible"; // Retraso aleatorio para cada imagen
    });
}

// Llama a animateAllImages cada 2 segundos
function comenzar() {
    // Inicializa las imágenes
    initializeImages();
    // Selecciona la imagen con la clase 'kirby'
    const img = document.querySelector('.principal');
    if (img) {
        img.style.display = "block";
    }

    const audio = document.getElementById('miAudio');
    document.body.style.background = 'black'; // Cambia el fondo a negro
    if (audio.paused) {
        audio.play();
    } else {
        audio.pause();
    }
    audio.volumen = 0.3;



    setInterval(animateAllImages, 2000);
}

document.addEventListener('DOMContentLoaded', () => {
    // Selecciona todos los enlaces en la página
    const links = document.querySelectorAll('a');

    // Agrega target="_blank" a cada enlace
    links.forEach(link => {
        link.setAttribute('target', '_blank');
    });
    // Agregar el listener para inicializar las imágenes al cargar la página
    initializeImages();
});


const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d', { willReadFrequently: true });

video.addEventListener('loadeddata', () => {
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    updateFrame();
    console.log("hola==??")
});

function updateFrame() {
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    let frame = context.getImageData(0, 0, canvas.width, canvas.height);
    let length = frame.data.length / 4;

    for (let i = 0; i < length; i++) {
        let r = frame.data[i * 4 + 0];
        let g = frame.data[i * 4 + 1];
        let b = frame.data[i * 4 + 2];

        // Si el color es verde, hazlo transparente
        if (g > 100 && r < 100 && b < 100) {
            frame.data[i * 4 + 3] = 0;
        }
    }

    context.putImageData(frame, 0, 0);
    requestAnimationFrame(updateFrame);
}