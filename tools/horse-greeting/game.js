const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreElement = document.getElementById('score');
const startScreen = document.getElementById('start-screen');
const endScreen = document.getElementById('end-screen');
const finalScore = document.getElementById('final-score');
const startBtn = document.getElementById('start-btn');
const restartBtn = document.getElementById('restart-btn');

let score = 0;
let gameActive = false;
let items = [];
const horse = {
    x: 0,
    y: 0,
    width: 60,
    height: 60,
    symbol: '🐎'
};

const blessings = ['福', '吉', '祥', '丰', '乐', '禧'];
const colors = ['#B22222', '#8B0000', '#DAA520', '#CD7F32'];

function resize() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    horse.y = canvas.height - 80;
    horse.x = canvas.width / 2 - horse.width / 2;
}

function createClouds() {
    const container = document.getElementById('game-container');
    for (let i = 0; i < 5; i++) {
        const cloud = document.createElement('div');
        cloud.className = 'cloud';
        cloud.style.width = (100 + Math.random() * 200) + 'px';
        cloud.style.height = (50 + Math.random() * 100) + 'px';
        cloud.style.top = (Math.random() * 60) + '%';
        cloud.style.setProperty('--speed', (15 + Math.random() * 20) + 's');
        cloud.style.animationDelay = (Math.random() * 15) + 's';
        container.appendChild(cloud);
    }
}

createClouds();
window.addEventListener('resize', resize);
resize();

canvas.addEventListener('mousemove', (e) => {
    if (!gameActive) return;
    const rect = canvas.getBoundingClientRect();
    const root = document.documentElement;
    const mouseX = e.clientX - rect.left - root.scrollLeft;
    horse.x = mouseX - horse.width / 2;
});

canvas.addEventListener('touchmove', (e) => {
    if (!gameActive) return;
    const rect = canvas.getBoundingClientRect();
    const touch = e.touches[0];
    const mouseX = touch.clientX - rect.left;
    horse.x = mouseX - horse.width / 2;
    e.preventDefault();
}, { passive: false });

function spawnItem() {
    if (!gameActive) return;
    const item = {
        x: Math.random() * (canvas.width - 40),
        y: -50,
        speed: 2 + Math.random() * 3,
        symbol: blessings[Math.floor(Math.random() * blessings.length)],
        color: colors[Math.floor(Math.random() * colors.length)],
        size: 30 + Math.random() * 20
    };
    items.push(item);
    setTimeout(spawnItem, 800 - Math.min(score * 5, 400));
}

function update() {
    if (!gameActive) return;

    for (let i = items.length - 1; i >= 0; i--) {
        items[i].y += items[i].speed;

        // Collision detection
        if (
            items[i].y + items[i].size > horse.y &&
            items[i].y < horse.y + horse.height &&
            items[i].x + items[i].size > horse.x &&
            items[i].x < horse.x + horse.width
        ) {
            score++;
            scoreElement.innerText = `得分: ${score}`;
            items.splice(i, 1);
            continue;
        }

        // Out of bounds
        if (items[i].y > canvas.height) {
            items.splice(i, 1);
            // Optionally lose life? Let's keep it simple and just score-based for now.
        }
    }

    draw();
    requestAnimationFrame(update);
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw Items (Blessings)
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    items.forEach(item => {
        ctx.fillStyle = item.color;
        ctx.font = `${item.size}px "Noto Serif SC", serif`;
        ctx.fillText(item.symbol, item.x + item.size/2, item.y + item.size/2);
        
        // Add a subtle glow/shadow to items
        ctx.shadowBlur = 5;
        ctx.shadowColor = item.color;
    });
    ctx.shadowBlur = 0;

    // Draw Horse
    ctx.font = `${horse.width}px serif`;
    ctx.fillText(horse.symbol, horse.x + horse.width / 2, horse.y + horse.height / 2);
}

function startGame() {
    score = 0;
    items = [];
    gameActive = true;
    scoreElement.innerText = `得分: 0`;
    startScreen.style.display = 'none';
    endScreen.style.display = 'none';
    resize();
    spawnItem();
    update();

    // Game ends after 45 seconds
    setTimeout(endGame, 45000);
}

function endGame() {
    gameActive = false;
    endScreen.style.display = 'block';
    finalScore.innerText = score;
}

startBtn.addEventListener('click', startGame);
restartBtn.addEventListener('click', startGame);
