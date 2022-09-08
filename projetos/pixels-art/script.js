const pixelBoardDiv = document.getElementById('pixel-board');
const cores = document.getElementsByClassName('color');
const btnCoresAleatorias = document.getElementById('button-random-color');
const pixels = document.getElementsByClassName('pixel');
const btnLimpar = document.getElementById('clear-board');
const inputBoardSize = document.getElementById('board-size');
const btnGenerateBoard = document.getElementById('generate-board');
let savedColorPalette = localStorage.getItem('colorPalette');
let savedPixelBoard = localStorage.getItem('pixelBoard');
const savedBoardSize = localStorage.getItem('boardSize');
let colorPalette = [];
let pixelBoard = [];

cores[0].style.backgroundColor = 'black';
cores[1].style.backgroundColor = 'pink';
cores[2].style.backgroundColor = 'yellow';
cores[3].style.backgroundColor = 'blue';

function palleteSave() {
  localStorage.colorPalette = JSON.stringify(colorPalette);
  colorPalette = [];
}

function pixelBoardSave() {
  for (let index = 0; index < pixels.length; index += 1) {
    pixelBoard[index] = pixels[index].style.backgroundColor;
  }
  localStorage.pixelBoard = JSON.stringify(pixelBoard);
}

function limpaPixels() {
  for (let index = 0; index < pixels.length; index += 1) {
    pixels[index].style.backgroundColor = 'white';
  }
  pixelBoardSave();
}

function geradorDeCores() {
  const red = Math.floor(Math.random() * 255) + 1;
  const green = Math.floor(Math.random() * 255) + 1;
  const blue = Math.floor(Math.random() * 255) + 1;
  return `rgb(${red}, ${green}, ${blue})`;
}

function coresAleatorias() {
  for (let index = 1; index < cores.length; index += 1) {
    const newColor = geradorDeCores();
    cores[index].style.backgroundColor = newColor;
    colorPalette.push(newColor);
  }
  palleteSave();
}

btnCoresAleatorias.addEventListener('click', coresAleatorias);

function selecionaCor(event) {
  for (let index = 0; index < cores.length; index += 1) {
    cores[index].className = 'color';
  }
  const selectedColor = event.target;
  selectedColor.className = 'color selected';
}

for (let index = 0; index < cores.length; index += 1) {
  cores[index].addEventListener('click', selecionaCor);
}

function pintaPixel(event) {
  const pixel = event.target;
  const cor = document.getElementsByClassName('selected')[0].style.backgroundColor;
  pixel.style.backgroundColor = cor;
  pixelBoardSave();
}

function clicaPixel() {
  for (let index = 0; index < pixels.length; index += 1) {
    pixels[index].addEventListener('click', pintaPixel);
  }
}

clicaPixel();

btnLimpar.addEventListener('click', limpaPixels);

function addPixels(pixelsToAdd) {
  for (let count = 0; count < pixelsToAdd; count += 1) {
    const newPixel = document.createElement('div');
    newPixel.className = 'pixel';
    pixelBoardDiv.appendChild(newPixel);
  }
}

function removePixels(pixelsToRemove) {
  for (let count = 0; count < pixelsToRemove; count += 1) {
    pixelBoardDiv.removeChild(document.querySelector('.pixel'));
  }
}

function generateBoard() {
  const newSize = inputBoardSize.value;
  const pixelsDifference = Math.abs(newSize ** 2 - pixels.length);
  if (newSize ** 2 > pixels.length) {
    addPixels(pixelsDifference);
  }
  if (newSize ** 2 < pixels.length) {
    removePixels(pixelsDifference);
  }
  pixelBoardDiv.style.width = `${newSize * 42}px`;
  limpaPixels();
  clicaPixel();
  localStorage.boardSize = JSON.stringify(newSize);
}

function boardSizeEvaluation() {
  if (inputBoardSize.value === '') {
    alert('Board inválido!');
    return;
  }
  if (inputBoardSize.value < 5) {
    inputBoardSize.value = 5;
  }
  if (inputBoardSize.value > 50) {
    inputBoardSize.value = 50;
  }
  generateBoard();
}

btnGenerateBoard.addEventListener('click', boardSizeEvaluation);

if (savedBoardSize != null) {
  inputBoardSize.value = JSON.parse(savedBoardSize);
  generateBoard();
} else {
  localStorage.setItem('boardSize', '5');
}

if (savedColorPalette === 'default' || savedColorPalette == null) {
  savedColorPalette = localStorage.setItem('colorPalette', 'default');
} else {
  colorPalette = JSON.parse(savedColorPalette);
  for (let index = 1; index < cores.length; index += 1) {
    cores[index].style.backgroundColor = colorPalette[index - 1];
  }
  colorPalette = [];
}

if (savedPixelBoard == null) {
  limpaPixels();
  for (let index = 0; index < pixels.length; index += 1) {
    pixelBoard.push(pixels[index].style.backgroundColor);
  }
  savedPixelBoard = localStorage.setItem('pixelBoard', JSON.stringify(pixelBoard));
} else {
  pixelBoard = JSON.parse(savedPixelBoard);
  for (let index = 0; index < pixels.length; index += 1) {
    pixels[index].style.backgroundColor = pixelBoard[index];
  }
  pixelBoardSave();
}
