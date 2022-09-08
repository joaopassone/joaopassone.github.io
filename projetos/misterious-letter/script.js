const inputText = document.getElementById('carta-texto');
const btnLetterGenerator = document.getElementById('criar-carta');
const pGeneratedLetter = document.getElementById('carta-gerada');
const counter = document.getElementById('carta-contador');
const styleGroup = ['newspaper', 'magazine1', 'magazine2'];
const sizeGroup = ['medium', 'big', 'reallybig'];
const rotationGroup = ['rotateleft', 'rotateright'];
const skewGroup = ['skewleft', 'skewright'];

function createStyle() {
  const style = styleGroup[Math.floor(Math.random() * styleGroup.length)];
  const size = sizeGroup[Math.floor(Math.random() * sizeGroup.length)];
  const rotation = rotationGroup[Math.floor(Math.random() * rotationGroup.length)];
  const skew = skewGroup[Math.floor(Math.random() * skewGroup.length)];
  return `${style} ${size} ${rotation} ${skew}`;
}

function addStyle() {
  const words = document.querySelectorAll('#carta-gerada > *');
  for (let index = 0; index < words.length; index += 1) {
    words[index].className = createStyle();
  }
}

function changeWordStyle(event) {
  const word = event.target;
  word.className = createStyle();
}

function createWordsList() {
  let words = inputText.value;
  words = words.split(/\s+/);
  if (words[words.length - 1] === '') {
    words.pop();
  }
  return words;
}

function createSpanWord(word) {
  const newSpan = document.createElement('span');
  newSpan.innerText = word;
  return newSpan;
}

function generateLetter() {
  pGeneratedLetter.innerHTML = '';
  const wordsList = createWordsList();
  for (let index = 0; index < wordsList.length; index += 1) {
    const spanWord = createSpanWord(wordsList[index]);
    spanWord.addEventListener('click', changeWordStyle);
    pGeneratedLetter.appendChild(spanWord);
  }
  counter.innerText = wordsList.length.toString();
  addStyle();
}

function inputValidation() {
  if (inputText.value === '' || (/^\s+$/).test(inputText.value)) {
    pGeneratedLetter.innerText = 'Por Favor, digite o conteúdo da carta.';
  } else {
    generateLetter();
  }
}

btnLetterGenerator.addEventListener('click', inputValidation);
