const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");


const birdWidth = 30;
const birdHeight = 30;
const gravity = 1;
const lift = -14;
const pipeWidth = 50;
const pipeGap = 200;
const pipeSpeed = 2;
let birdY = canvas.height / 2 - birdHeight / 2;
let birdVelocity = 0;
let birdX = 50;
let score = 0;

let pipes = [];
let gameOver = false;


const birdImage = new Image();
birdImage.src = 'fotonyah.jpeg';


function drawBird() {
    birdImage.src = 'fotonyah.jpeg';
    ctx.fillStyle = "red";
    ctx.fillRect(birdX, birdY, birdWidth, birdHeight);
}


function drawPipes() {
    ctx.fillStyle = "green";

    pipes.forEach(pipe => {
        ctx.fillRect(pipe.x, 0, pipeWidth, pipe.top);
        ctx.fillRect(pipe.x, pipe.top + pipeGap, pipeWidth, canvas.height - pipe.top - pipeGap);
    });
}


function updateGame() {
    if (gameOver) {
        ctx.fillStyle = "black";
        ctx.font = "30px Arial";
        ctx.fillText("Game Over", canvas.width / 2 - 80, canvas.height / 2);
        return;
    }


    birdVelocity += gravity;
    birdY += birdVelocity;

    if (birdY + birdHeight > canvas.height) {
        birdY = canvas.height - birdHeight;
        birdVelocity = 0;
    }

    if (birdY < 0) {
        birdY = 0;
        birdVelocity = 0;
    }


    if (pipes.length === 0 || pipes[pipes.length - 1].x < canvas.width - 200) {
        const pipeTop = Math.floor(Math.random() * (canvas.height - pipeGap));
        pipes.push({ x: canvas.width, top: pipeTop });
    }

    pipes.forEach(pipe => {
        pipe.x -= pipeSpeed;
    });

    pipes = pipes.filter(pipe => pipe.x + pipeWidth > 0);


    pipes.forEach(pipe => {
        if (
            birdX + birdWidth > pipe.x &&
            birdX < pipe.x + pipeWidth &&
            (birdY < pipe.top || birdY + birdHeight > pipe.top + pipeGap)
        ) {
            gameOver = true;
        }
    });


    pipes.forEach(pipe => {
        if (pipe.x + pipeWidth < birdX && !pipe.passed) {
            pipe.passed = true;
            score++;
            document.getElementById("score").textContent = score;
        }
    });
}


function fly() {
    birdVelocity = lift;
}


document.addEventListener("keydown", (e) => {
    if (e.code === "Space") {
        fly();
    }
});
canvas.addEventListener("click", fly);


function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); 

    drawBird();
    drawPipes();
    updateGame();

    requestAnimationFrame(draw); 
}


draw();
