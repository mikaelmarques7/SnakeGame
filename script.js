const canvas = document.getElementById('gameCanvas');
const drawingContext = canvas.getContext('2d');
const scoreElement = document.querySelector('.score');
const levelElement = document.querySelector('.level');
const gameOverScreen = document.getElementById('gameOverScreen');
const restartButton = document.getElementById('restartButton');
const finalScoreElement = document.getElementById('finalScore');
const finalLevelElement = document.getElementById('finalLevel');
const upButton = document.getElementById('upButton');
const downButton = document.getElementById('downButton');
const leftButton = document.getElementById('leftButton');
const rightButton = document.getElementById('rightButton');
const alternarBotao = document.getElementById('alternarBotaoDeControle');

const gridSize = 20;
canvas.width = canvas.height = gridSize * 20;

let snake = [{ x: 10, y: 10 }];
let apple = { x: 5, y: 5 };
let direction = { x: 0, y: 0 };
let score = 0;
let level = 0;
let speed = 300;
let gameOver = false;
let controlsVisible = false;

const controles = document.querySelector('.controles');
controles.classList.add('hidden');

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
    gameOverScreen.style.display = 'block';
    canvas.style.display = 'none';
    controles.classList.add('hidden');
}

restartButton.addEventListener('click', function () {
    gameOver = false;
    snake = [{ x: 10, y: 10 }];
    apple = { x: 5, y: 5 };
    direction = { x: 0, y: 0 };
    score = 0;
    level = 0;
    speed = 300;
    scoreElement.textContent = `Pontuação: ${score}`;
    levelElement.textContent = `Nível: ${level}`;
    gameOverScreen.style.display = 'none';
    canvas.style.display = 'block';
    controles.classList.add('hidden');
    gameLoop();
});

function updateLevel() {
    level = Math.min(Math.floor(score / 5),50);
    levelElement.textContent = `Nível: ${level}`;
}

function increaseSpeed() {
    const baseSpeed = 300;
    const levelSpeedAdjustment = 10;
    speed = Math.max(100, baseSpeed - (level * levelSpeedAdjustment));
}

function draw() {
    drawingContext.fillStyle = 'black';
    drawingContext.fillRect(0, 0, canvas.width, canvas.height);

    drawingContext.fillStyle = 'white';
    snake.forEach(segment => {
        drawingContext.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize, gridSize);
    });

    drawingContext.fillStyle = 'red';
    drawingContext.fillRect(apple.x * gridSize, apple.y * gridSize, gridSize, gridSize);
}

upButton.addEventListener('click', () =>{
    if (direction.y === 0) direction = {x: 0, y: -1};
});

downButton.addEventListener('click', () => {
    if (direction.y === 0) direction = {x: 0, y: 1};
});

leftButton.addEventListener('click', () => {
    if (direction.x === 0) direction = {x: -1, y: 0}
});

rightButton.addEventListener('click', () => {
    if (direction.x === 0) direction ={x: 1, y: 0}
})

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



alternarBotao.addEventListener('click', () => {
    controlsVisible = !controlsVisible;
    const controles = document.querySelector('.controles')

    if (controlsVisible) {
        controles.classList.remove('hidden');
        alternarBotao.textContent = 'Desativar Controles'
    }else{
        controles.classList.add('hidden');
        alternarBotao.textContent = 'Ativar Controles';
    }
})

gameLoop();