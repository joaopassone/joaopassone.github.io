const rgbColorText = document.getElementById('rgb-color');
const balls = document.getElementsByClassName('ball');
const answerText = document.getElementById('answer');
const btnReset = document.getElementById('reset-game');
const btnNext = document.getElementById('next-game');
const score = document.getElementById('score');

const wrongAnswerAudio = new Audio('./audio/wrong-answer-buzzer.wav'); // https://freesound.org/s/650842/
const rightAnswerAudio = new Audio('./audio/right-answer-buzz.wav'); // https://freesound.org/s/264981/
const levelWinAudio = new Audio('./audio/level-win.wav'); // https://freesound.org/s/258142/

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

function pickColor() {
  const index = Math.floor(Math.random() * 6);
  const pickedColor = balls[index].style.backgroundColor;
  rgbColorText.innerText = pickedColor.slice(3);
}

function selectedBall(ball) {
  const selected = document.getElementsByClassName('selected')[0];

  if (selected) {
    selected.classList.remove('selected');
  }

  ball.classList.add('selected');
}

function isGameOver() {
  if (score.innerText >= 20) {
    answerText.innerText = 'Você ganhou!!!!';
    btnNext.style.display = 'none';
    levelWinAudio.play();
  }
}

function guessBall(event) {
  selectedBall(event.target);
  const clickedBallColor = event.target.style.backgroundColor.slice(3);

  if (clickedBallColor === rgbColorText.innerText) {
    answerText.innerText = 'Acertou!';
    score.innerText = +score.innerText + 3;
    btnNext.disabled = false;
    for (let index = 0; index < balls.length; index += 1) {
      balls[index].removeEventListener('click', guessBall);
    }
    rightAnswerAudio.play();
    isGameOver();
  } else {
    answerText.innerText = 'Errou! Tente novamente!';
    score.innerText = +score.innerText - 2;
    wrongAnswerAudio.play();
  }
}

function nextGame() {
  colorBalls();
  pickColor();
  answerText.innerText = 'Escolha uma cor:';
  const selected = document.getElementsByClassName('selected')[0];

  if (selected) {
    selected.classList.remove('selected');
  }

  btnNext.disabled = true;

  for (let index = 0; index < balls.length; index += 1) {
    balls[index].addEventListener('click', guessBall);
  }
}

nextGame();

btnReset.addEventListener('click', () => {
  score.innerText = 0;
  btnNext.style.display = 'inline';
  nextGame();
});

btnNext.addEventListener('click', nextGame);
