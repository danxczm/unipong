import { yellowSquares } from './data/yellowSquares.js';
import { blueSquares } from './data/blueSquares.js';

const animationBoard = document.getElementById('animationBoard');
const ctx = animationBoard.getContext('2d');
const score = document.querySelector('#score');

let x = animationBoard.width;
let y = animationBoard.height;

let squareWidth = 16;
let squareHeight = 16;

// ? blue square
let squareBlueXDirection = 2;
let squareBlueYDirection = -2;

let squareBlueX = x - 50;
let squareBlueY = y - 100;

// ? yellow square
let squareYellowXDirection = 2;
let squareYellowYDirection = -2;

let squareYellowX = x - 220;
let squareYellowY = y - 200;

const squareBlueColor = '#008DDA';
const squareYellowColor = '#FCDC2A';

const squaresRowCount = 16;
const squaresColumnCount = 8;

function collisionBlueDetection() {
  for (let c = 0; c < squaresColumnCount; c++) {
    for (let r = 0; r < squaresRowCount; r++) {
      let b = blueSquares[c][r];
      if (b.color == squareBlueColor) {
        if (
          squareBlueX < b.x + squareWidth &&
          squareBlueX + squareWidth > b.x &&
          squareBlueY < b.y + squareHeight &&
          squareBlueY + squareHeight > b.y
        ) {
          squareBlueXDirection = -squareBlueXDirection;
          b.color = squareYellowColor;

          return;
        }
      }
    }
  }
}

function collisionYellowDetection() {
  for (let c = 0; c < squaresColumnCount; c++) {
    for (let r = 0; r < squaresRowCount; r++) {
      let b = yellowSquares[c][r];
      if (b?.color == squareYellowColor) {
        if (
          squareYellowX < b.x + squareWidth &&
          squareYellowX + squareWidth > b.x &&
          squareYellowY < b.y + squareHeight &&
          squareYellowY + squareHeight > b.y
        ) {
          squareYellowXDirection = -squareYellowXDirection;
          b.color = squareBlueColor;

          return;
        }
      }
    }
  }
}

function createBlueSquare() {
  ctx.beginPath();
  ctx.rect(squareBlueX, squareBlueY, squareWidth, squareHeight);
  ctx.fillStyle = squareBlueColor;
  ctx.fill();
  ctx.closePath();

  squareBlueX += squareBlueXDirection;
  squareBlueY += squareBlueYDirection;
}

function createYellowSquare() {
  ctx.beginPath();
  ctx.rect(squareYellowX, squareYellowY, squareWidth, squareHeight);
  ctx.fillStyle = squareYellowColor;
  ctx.fill();
  ctx.closePath();

  squareYellowX += squareYellowXDirection;
  squareYellowY += squareYellowYDirection;
}

function drawBlueSquare() {
  if (Math.round(Math.random()) == 1) {
    squareBlueXDirection = 1;
  } else {
    squareBlueXDirection = -1;
  }

  if (Math.round(Math.random()) == 1) {
    squareBlueYDirection = 1;
  } else {
    squareBlueYDirection = -1;
  }

  createBlueSquare();
}

function drawYellowSquare() {
  if (Math.round(Math.random()) == 1) {
    squareYellowXDirection = 1;
  } else {
    squareYellowXDirection = -1;
  }

  if (Math.round(Math.random()) == 1) {
    squareYellowYDirection = 1;
  } else {
    squareYellowYDirection = -1;
  }

  createYellowSquare();
}

function drawBlueSquares() {
  blueSquares.forEach(column => {
    column.forEach(square => {
      ctx.beginPath();
      ctx.rect(square.x, square.y, squareWidth, squareHeight);
      ctx.fillStyle = square.color;
      ctx.fill();
      ctx.closePath();
    });
  });
}

function drawYellowSquares() {
  yellowSquares.forEach(column => {
    column.forEach(square => {
      ctx.beginPath();
      ctx.rect(square.x, square.y, squareWidth, squareHeight);
      ctx.fillStyle = square.color;
      ctx.fill();
      ctx.closePath();
    });
  });
}

function checkBordersCollision() {
  // blue square
  if (squareBlueY <= 0) {
    squareBlueYDirection *= -1;
  }

  if (squareBlueY >= y - 16) {
    squareBlueYDirection *= -1;
  }

  if (squareBlueX <= 0) {
    squareBlueXDirection *= -1;
  }

  if (squareBlueX >= x - 16) {
    squareBlueXDirection *= -1;
  }

  // yellow square
  if (squareYellowY <= 0) {
    squareYellowYDirection *= -1;
  }

  if (squareYellowY >= y - 16) {
    squareYellowYDirection *= -1;
  }

  if (squareYellowX <= 0) {
    squareYellowXDirection *= -1;
  }

  if (squareYellowX >= x - 16) {
    squareYellowXDirection *= -1;
  }
}

let intervalID;
function nextFrame() {
  intervalID = setTimeout(() => {
    ctx.clearRect(0, 0, x, y);
    drawBlueSquares();
    drawYellowSquares();
    createYellowSquare();
    createBlueSquare();
    checkBordersCollision();
    collisionBlueDetection();
    collisionYellowDetection();
    nextFrame();
  }, 10);
}

function animationStart() {
  drawBlueSquare();
  drawYellowSquare();

  nextFrame();
}

animationStart();

/*

 челендж не простий, раніше з канвойю не працював але було весело, застряг на частині collision,
 та й не вистачило часу доробити, в цілому в подальшому я б опрацював кожний з массивів данних (blueSquares, yellowSquares) ось так:
(в функціях collision___Detection змінна b повертає значення квадратику з яким зіштовхнувся квадрат який рухається тому...)

- пройтись по всьому масиву знайти відповідність чи є в масиві масив з обєктом в якому Х дорівнює Х-у який в змінній b
якщо ні то створюємо новий масив з значеннями в b та змінюємо колір відповідно до масиву який проходимо,
якщо Х-и рівні то в цей обєкт додаємо данні з b та зновуж змінюємо колір

- в цілому з приводу рахунку можна було б просто мінусувати плюсувати захаркодженні скори 128 Х 128

*/
