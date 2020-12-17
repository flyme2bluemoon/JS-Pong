var canvas = document.getElementById("the_canvas");
var ctx = canvas.getContext("2d");

class Player {
    constructor(id) {
        this.score = 0;
        if (id == 0) {
            this.x = canvas.width * 0.15;
        } else if (id == 1) {
            this.x = canvas.width * 0.85;
        }
        this.y = canvas.height / 2;
        this.movingUp = false;
        this.movingDown = false;
    }
    stopMoving() {
        this.movingUp = false;
        this.movingDown = false;
    }
    startDown() {
        this.stopMoving();
        this.movingDown = true;
    }
    startUp() {
        this.stopMoving();
        this.movingUp = true;
    }
}

var players = [];
for (var i = 0; i < 2; i++) {
    players.push(new Player(i));
}

var speed = 7.5;

var ballRadius = 15;
var paddleWidth = 15;
var paddleHeight = 100;

var x = canvas.width / 2;
var y = canvas.height / 2;

if (Math.floor(Math.random() * 2)) {
    var dx = Math.random() * 2 + 1;
} else {
    dx = Math.random() * -2 - 1;
}
var dy = 2;

function drawPaddles() {
    for (var i = 0; i < players.length; i++) {
        ctx.beginPath();
        ctx.rect(players[i].x - paddleWidth / 2, players[i].y - paddleHeight / 2, paddleWidth, paddleHeight);
        ctx.fillStyle = "#32a852";
        ctx.fill();
        ctx.closePath();
    }
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2, false);
    ctx.fillStyle = "#3281a8";
    ctx.fill();
    ctx.closePath();
}

function wallDetection() {
    if (x + dx > canvas.width - ballRadius || x + dx < 0 + ballRadius) {
        dx = -dx;
    }
    if (y + dy > canvas.height - ballRadius || y + dy < 0 + ballRadius) {
        dy = -dy;
    }
}

function paddleDetection() {
    if (((x + dx > players[1].x - paddleWidth) && (y < players[1].y + paddleHeight / 2 && y > players[1].y - paddleHeight / 2)) || ((x + dx < players[0].x + paddleWidth) && (y < players[0].y + paddleHeight / 2 && y > players[0].y - paddleHeight / 2))) {
        dx = -dx;
    }
}

function keyDownHandler(e) {
    if (e.key == "W" || e.key == "w") {
        players[0].startUp();
    } else if (e.key == "S" || e.key == "s") {
        players[0].startDown();
    } else if (e.key == "I" || e.key == "i") {
        players[1].startUp();
    } else if (e.key == "K" || e.key == "k") {
        players[1].startDown();
    }
}

function keyUpHandler(e) {
    if (e.key == "W" || e.key == "w" || e.key == "S" || e.key == "s") {
        players[0].stopMoving();
    } else if (e.key == "I" || e.key == "i" || e.key == "K" || e.key == "k") {
        players[1].stopMoving();
    }
}

function movement() {
    x += dx;
    y += dy;
    for (var i = 0; i < 2; i++) {
        if (players[i].movingUp) {
            players[i].y -= 7.5;
        }
        if (players[i].movingDown) {
            players[i].y += 7.5;
        }
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawPaddles();
    movement();
    wallDetection();
    paddleDetection();
}

document.addEventListener("keydown", keyDownHandler);
document.addEventListener("keyup", keyUpHandler);

var interval = setInterval(draw, speed);