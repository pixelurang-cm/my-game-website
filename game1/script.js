const area = document.getElementById("gameArea");
const player = document.getElementById("player");
const scoreText = document.getElementById("score");
const playBtn = document.getElementById("playBtn");
const resetBtn = document.getElementById("resetBtn");

let playerX = 180;
let playerY = 520;
let score = 0;
let gameOver = false;
let clouds = [];
let cloudSpawner, scoreInterval;

// Update posisi pesawat
function updatePlayer() {
    player.style.left = playerX + "px";
    player.style.top = playerY + "px";
}

// Kontrol pesawat
document.addEventListener("keydown", (e) => {
    if (gameOver) return;

    if (e.key === "ArrowLeft" && playerX > 0) playerX -= 10;
    if (e.key === "ArrowRight" && playerX < 360) playerX += 10;
    if (e.key === "ArrowUp" && playerY > 0) playerY -= 10;
    if (e.key === "ArrowDown" && playerY < 560) playerY += 10;

    updatePlayer();
});

// Fungsi spawn awan
function spawnCloud() {
    if (gameOver) return;

    const cloud = document.createElement("div");
    cloud.classList.add("cloud");
    cloud.style.left = Math.floor(Math.random() * 340) + "px";
    area.appendChild(cloud);
    clouds.push(cloud);

    let cloudY = -50;

    function moveCloud() {
        if (gameOver) return;

        cloudY += 3;
        cloud.style.top = cloudY + "px";

        // Deteksi tabrakan
        const px = playerX, py = playerY;
        const cx = parseInt(cloud.style.left);
        const cy = cloudY;

        if (px < cx + 70 && px + 40 > cx && py < cy + 40 && py + 40 > cy) {
            gameOver = true;
            resetBtn.style.display = "block";
        }

        if (cloudY < 650) {
            requestAnimationFrame(moveCloud);
        } else {
            cloud.remove();
            clouds = clouds.filter(c => c !== cloud);
        }
    }

    moveCloud();
}

// Mulai game
function startGame() {
    playBtn.style.display = "none";
    gameOver = false;
    clouds = [];
    score = 0;
    scoreText.innerHTML = "Score: 0";
    updatePlayer();

    cloudSpawner = setInterval(spawnCloud, 1500);
    scoreInterval = setInterval(() => {
        if (!gameOver) {
            score++;
            scoreText.innerHTML = "Score: " + score;
        }
    }, 1000);
}

// Reset game
function resetGame() {
    clouds.forEach(c => c.remove());
    clouds = [];
    playerX = 180;
    playerY = 520;
    updatePlayer();
    score = 0;
    scoreText.innerHTML = "Score: 0";
    resetBtn.style.display = "none";
    gameOver = false;
}

// Tombol PLAY
playBtn.onclick = startGame;

// Tombol RESET
resetBtn.onclick = resetGame;
