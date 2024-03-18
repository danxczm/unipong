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

function createMovingSquare(squareColor, squareInitialPositionX, squareInitialPositionY) {
  ctx.beginPath();
  ctx.rect(squareInitialPositionX, squareInitialPositionY, squareWidth, squareHeight);
  ctx.fillStyle = squareColor;
  ctx.fill();
  ctx.closePath();
}

function collisionBlueDetection() {
  let b;
  for (let c = 0; c < blueSquares.length; c++) {
    for (let r = 0; r < squaresRowCount; r++) {
      b = blueSquares[c][r];

      if (b?.color == squareBlueColor) {
        if (
          squareBlueX < b.x + squareWidth &&
          squareBlueX + squareWidth > b.x &&
          squareBlueY < b.y + squareHeight &&
          squareBlueY + squareHeight > b.y
        ) {
          squareBlueXDirection = -squareBlueXDirection;

          let xIndex = yellowSquares.findIndex(column =>
            column.some(squareData => squareData.x === b.x)
          );

          if (xIndex === -1) {
            yellowSquares.push([{ x: b.x, y: b.y, color: squareYellowColor }]);
          } else {
            yellowSquares[xIndex]?.push({ x: b.x, y: b.y, color: squareYellowColor });
          }

          blueSquares[c].splice(r, 1);
          return;
        }
      }
    }
  }
}

function collisionYellowDetection() {
  let b;
  for (let c = 0; c < yellowSquares.length; c++) {
    for (let r = 0; r < squaresRowCount; r++) {
      b = yellowSquares[c][r];

      if (b?.color == squareYellowColor) {
        if (
          squareYellowX < b.x + squareWidth &&
          squareYellowX + squareWidth > b.x &&
          squareYellowY < b.y + squareHeight &&
          squareYellowY + squareHeight > b.y
        ) {
          squareYellowXDirection = -squareYellowXDirection;

          let xIndex = blueSquares.findIndex(column =>
            column.some(squareData => squareData.x === b.x)
          );

          if (xIndex === -1) {
            blueSquares.push([{ x: b.x, y: b.y, color: squareBlueColor }]);
          } else {
            blueSquares[xIndex]?.push({ x: b.x, y: b.y, color: squareBlueColor });
          }

          yellowSquares[c].splice(r, 1);
          return;
        }
      }
    }
  }
}

function printSquaresInBoard(squaresArray) {
  squaresArray.forEach(column => {
    column.forEach(square => {
      ctx.beginPath();
      ctx.rect(square.x, square.y, squareWidth, squareHeight);
      ctx.fillStyle = square.color;
      ctx.fill();
      ctx.closePath();
    });
  });
}

function createBlueSquare() {
  createMovingSquare(squareBlueColor, squareBlueX, squareBlueY);

  squareBlueX += squareBlueXDirection;
  squareBlueY += squareBlueYDirection;
}

function createYellowSquare() {
  createMovingSquare(squareYellowColor, squareYellowX, squareYellowY);

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

function checkBordersCollision() {
  // blue square
  if (squareBlueX <= 0) {
    squareBlueXDirection *= -1;
  }

  if (squareBlueX >= x - 16) {
    squareBlueXDirection *= -1;
  }

  if (squareBlueY <= 0) {
    squareBlueYDirection *= -1;
  }

  if (squareBlueY >= y - 16) {
    squareBlueYDirection *= -1;
  }

  // yellow square
  if (squareYellowX <= 0) {
    squareYellowXDirection *= -1;
  }

  if (squareYellowX >= x - 16) {
    squareYellowXDirection *= -1;
  }

  if (squareYellowY <= 0) {
    squareYellowYDirection *= -1;
  }

  if (squareYellowY >= y - 16) {
    squareYellowYDirection *= -1;
  }
}

let intervalID;
function nextFrame() {
  intervalID = setTimeout(() => {
    ctx.clearRect(0, 0, x, y);
    printSquaresInBoard(blueSquares);
    printSquaresInBoard(yellowSquares);
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
TODO Still have problems with collision, 
feels like there is some problem with changing when collide
*/
