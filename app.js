var canvas = document.getElementById("the_canvas");
var ctx = canvas.getContext("2d");

class Player {
    constructor(id) {
        this.score = 0;
        if (id == 0) {
            this.x = canvas.width * 0.15;
        } else if (id == 1) {
            this.x = canvas.width * 0.85;
        } else {
            alert("Aw rip. An unknown error has occured... That's all we know!");
        }
        this.y = canvas.height / 2;
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
var dx = 2;

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

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawPaddles();
}

var interval = setInterval(draw, speed);