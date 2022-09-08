const rgbColorText = document.getElementById('rgb-color');
const balls = document.getElementsByClassName('ball');
const answerText = document.getElementById('answer');
const btnReset = document.getElementById('reset-game');
const score = document.getElementById('score');

function colorGenerator() {
  const red = Math.floor(Math.random() * 255) + 1;
  const green = Math.floor(Math.random() * 255) + 1;
  const blue = Math.floor(Math.random() * 255) + 1;

  return `rgb(${red}, ${green} , ${blue})`;
}

function colorBalls() {
  for (let index = 0; index < balls.length; index += 1) {
    balls[index].style.backgroundColor = colorGenerator();
  }
}

colorBalls();

function pickColor() {
  const index = Math.floor(Math.random() * 6);
  const pickedColor = balls[index].style.backgroundColor;
  rgbColorText.innerText = pickedColor.slice(3);
}

pickColor();

function selectedBall(ball) {
  const selected = document.getElementsByClassName('selected')[0];
  if (ball.className.includes('selected')) {
    return;
  }
  if (selected) {
    selected.classList.remove('selected');
  }
  ball.classList.add('selected');
}

function guessBall(event) {
  selectedBall(event.target);
  const clickedBallColor = event.target.style.backgroundColor.slice(3);
  if (clickedBallColor === rgbColorText.innerText) {
    answerText.innerText = 'Acertou!';
    score.innerText = `${parseInt(score.innerText, 10) + 3}`;
  } else {
    answerText.innerText = 'Errou! Tente novamente!';
  }
}

for (let index = 0; index < balls.length; index += 1) {
  balls[index].addEventListener('click', guessBall);
}

btnReset.addEventListener('click', () => {
  colorBalls();
  pickColor();
  answerText.innerText = 'Escolha uma cor';
  const selected = document.getElementsByClassName('selected')[0];
  if (selected) {
    selected.classList.remove('selected');
  }
});
