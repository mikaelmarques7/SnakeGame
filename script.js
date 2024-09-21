const canvas = document.getElementById('gameCanvas');
const drawingContext = canvas.getContext('2d');
const scoreElement = document.querySelector('.score');
const levelElement = document.querySelector('.level');
const gameOverScreen = document.getElementById('gameOverScreen');
const restartButton = document.getElementById('restartButton');
const finalScoreElement = document.getElementById('finalScore');
const finalLevelElement = document.getElementById('finalLevel');
const gridSize = 20;
canvas.width = canvas.height = gridSize * 20;


gameOverScreen.style.display = 'none';

let snake = [{ x: 10, y: 10 }];
let apple = { x: 5, y: 5 };
let direction = { x: 0, y: 0 };
let score = 0;
let level = 0;
/*MUDAR A VELOCIDADE DEPOIS ESTÁ MUITO LENTOOOO*/
let speed = 200;
let gameOver = false;


function gameLoop() {
    if (!gameOver) {
        setTimeout(function () {
            update();
            draw();
            requestAnimationFrame(gameLoop);
        }, speed);
    }
}

function update() {
    const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };
    snake.unshift(head);

    if (head.x === apple.x && head.y === apple.y) {
        score++;
        apple.x = Math.floor(Math.random() * 20);
        apple.y = Math.floor(Math.random() * 20);
        scoreElement.textContent = `Pontuação: ${score}`;
        updateLevel();
        increaseSpeed();
    } else {
        snake.pop();
    }

    if (head.x < 0 || head.x >= 20 || head.y < 0 || head.y >= 20 || snake.slice(1).some(segment => segment.x === head.x && segment.y === head.y)) {
        endGame();
    }
}

function endGame() {
    gameOver = true;

    finalScoreElement.textContent = `Pontuação: ${score}`;
    finalLevelElement.textContent = `Nível: ${level}`;


    scoreElement.style.display = 'none';
    levelElement.style.display = 'none';


    gameOverScreen.style.display = 'block';
    canvas.style.display = 'none';
}

restartButton.addEventListener('click', function () {
    gameOver = false;
    snake = [{ x: 10, y: 10 }];
    apple = { x: 5, y: 5 };
    direction = { x: 0, y: 0 };
    score = 0;
    level = 0;
    speed = 300;

    scoreElement.style.display = 'block';
    levelElement.style.display = 'block';

    scoreElement.textContent = `Pontuação: ${score}`;
    levelElement.textContent = `Nível: ${level}`;

    gameOverScreen.style.display = 'none';
    canvas.style.display = 'block';
    gameLoop();
});

function updateLevel() {
    level = Math.min(Math.floor(score / 5), 50);
    levelElement.textContent = `Nível: ${level}`;
}

/*MUDAR A VELOCIDADE DEPOIS ESTÁ MUITO LENTOOOO*/
function increaseSpeed() {
    const baseSpeed = 200;
    const levelSpeedAdjustment = 30;
    speed = Math.max(100, baseSpeed - (level * levelSpeedAdjustment));
}

function drawBackground() {
    const gradient = drawingContext.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, '#1a1a1a');
    gradient.addColorStop(1, '#333333');
    drawingContext.fillStyle = gradient;
    drawingContext.fillRect(0, 0, canvas.width, canvas.height)
}


/*melhorando o designer da maça  */
function drawApple() {
    /*Mudar o tamanho da snake depois*/
    const appleSize = gridSize;
    ;
    const x = apple.x * gridSize;
    const y = apple.y * gridSize;

    drawingContext.fillStyle = '#ff0000';

    drawingContext.shadowBlur = 15;
    drawingContext.shadowColor = '#f55454'


    drawingContext.fillRect(x, y, appleSize, appleSize);

    drawingContext.shadowBlur = 0;
}


function draw() {
    drawBackground()

    snake.forEach(segment => {
        drawingContext.fillStyle = '#00cc00';
        drawingContext.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize, gridSize);

        /*Melhorando o designer pra deixar mais nostalgico (ou tentando melhorar)*/

        drawingContext.lineWidth = 0;
        drawingContext.strokeRect(segment.x * gridSize, segment.y * gridSize, gridSize, gridSize)
    });

    drawApple();
}
/*Setas do teclado*/
document.addEventListener('keydown', event => {
    switch (event.key) {
        case 'ArrowUp':
            if (direction.y === 0) direction = { x: 0, y: -1 };
            break;
        case 'ArrowDown':
            if (direction.y === 0) direction = { x: 0, y: 1 };
            break;
        case 'ArrowLeft':
            if (direction.x === 0) direction = { x: -1, y: 0 };
            break;
        case 'ArrowRight':
            if (direction.x === 0) direction = { x: 1, y: 0 };
            break;
    }
});

/*Botões W,S,A,D (bug corrigido)*/

document.addEventListener('keydown', event => {
    switch (event.key) {
        case 'w':
        case 'W':
            if (direction.y === 0) direction = { x: 0, y: -1 }
            break;
        case 's':
        case 'S':
            if (direction.y === 0) direction = { x: 0, y: 1 }
            break;
        case 'a':
        case 'A':
            if (direction.x === 0) direction = { x: -1, y: 0 }
            break;
        case 'd':
        case 'D':
            if (direction.x === 0) direction = { x: 1, y: 0 }
            break;

        default:
            break;
    }
})

gameLoop();