/* Problemas:
    - Es joc es infinit en teoria, pero es quadrat va mes rapid que es fondo aixi que el perds de vista (No les he pogut igualar)
    - Son es mateixos 6 obstacles, no es generen de forma aleatoria
    - No hi ha limit horitzontal, es player pot sortir de la pantalla
*/

// crear canvas 
const canvas = document.createElement('canvas');
canvas.width = window.innerWidth;
canvas.height = innerHeight;
document.body.appendChild(canvas);
const ctx = canvas.getContext('2d');

// inicio del jugador
const player = {
    x: 50,
    y: canvas.height / 2 - 20,
    velocidad: 2
};

// crear arrays de obstáculos
const obstaculosInferior = [
    { x: 200, altura: 500, ancho: 50 },
    { x: 400, altura: 450, ancho: 50 },
    { x: 600, altura: 550, ancho: 50 },
    { x: 800, altura: 400, ancho: 50 },
];

const obstaculosSuperior = [
    { x: 250, altura: 300, ancho: 50 },
    { x: 450, altura: 350, ancho: 50 },
    { x: 650, altura: 250, ancho: 50 },
    { x: 850, altura: 400, ancho: 50 },
];

// variables del juego
// entrada del teclado
let teclaEspacioPresionada = false;

// función de actualización del juego
function actualizar() {
    // actualizar la posición de la player
    player.x += player.velocidad;

    // manejar entrada del jugador
    // si la tecla espacio está presionada, el player sube
    if (teclaEspacioPresionada) {
        player.y -= 10;
    } else {
        player.y += 5;
    }

    // dibujar el fondo del juego
    ctx.fillStyle = 'lightblue';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // dibujar obstáculos y verificar colisiones
    obstaculosInferior.forEach(obstaculo => {
        ctx.fillStyle = 'green';
        ctx.fillRect(obstaculo.x, canvas.height - obstaculo.altura, obstaculo.ancho, obstaculo.altura);

        // verificar colisión con la player
        if (player.x < obstaculo.x + obstaculo.ancho &&
            player.x + 50 > obstaculo.x &&
            player.y + 50 > canvas.height - obstaculo.altura) {
            alert('¡Perdiste!');
            window.location.reload();
        }

        // mover obstáculo y reposicionarlo para que sea infinito
        // funciona raro
        obstaculo.x -= player.velocidad;
        if (obstaculo.x < -obstaculo.ancho) {
            obstaculo.x = canvas.width + Math.random() * 200;
            obstaculo.altura = Math.random() * 600 + 50;
        }
    });


    // dibujar obstáculos y verificar colisiones
    obstaculosSuperior.forEach(obstaculo => {
        ctx.fillStyle = 'green';
        ctx.fillRect(obstaculo.x, 0, obstaculo.ancho, obstaculo.altura);

        // verificar colisión con la player
        if (player.x < obstaculo.x + obstaculo.ancho &&
            player.x + 50 > obstaculo.x &&
            player.y < obstaculo.altura) {
            alert('¡Perdiste!');
            window.location.reload();
        }

        // verificar que no se salga de la pantalla ni por arriba ni por abajo 
        if (player.y + 50 > canvas.height) {
            alert('¡Perdiste!');
            window.location.reload();
        }
        if (player.y < 0) {
            alert('¡Perdiste!');
            window.location.reload();
        }

        // mover obstáculo y reposicionarlo
        obstaculo.x -= player.velocidad;
        if (obstaculo.x < -obstaculo.ancho) {
            obstaculo.x = canvas.width + Math.random() * 200;
            obstaculo.altura = Math.random() * 200 + 50;
        }
    });

    // verificar si es necesario agregar nuevos obstáculos
    if (obstaculosInferior[obstaculosInferior.length - 1].x < canvas.width - 400) {
        const nuevoObstaculo = {
            x: canvas.width + Math.random() * 200,
            altura: Math.random() * 250 + 50,
            ancho: 50
        };
        obstaculosInferior.push(nuevoObstaculo);

        const nuevoObstaculoSuperior = {
            x: canvas.width + Math.random() * 250,
            altura: Math.random() * 200 + 50,
            ancho: 50
        };
        obstaculosSuperior.push(nuevoObstaculoSuperior);
    }

    // eliminar obstáculos que ya no están en pantalla
    if (obstaculosInferior[0].x < -obstaculosInferior[0].ancho) {
        obstaculosInferior.shift();
        obstaculosSuperior.shift();
    }

    // dibujar el jugador
    ctx.fillStyle = 'yellow  ';
    ctx.fillRect(player.x, player.y, 50, 50);
}

// manejar eventos de teclado
document.addEventListener('keydown', e => {
    if (e.code === 'Space') {
        teclaEspacioPresionada = true;
    }
});

document.addEventListener('keyup', e => {
    if (e.code === 'Space') {
        teclaEspacioPresionada = false;
    }
});

// bucle principal del juego
setInterval(actualizar, 1000 / 60);