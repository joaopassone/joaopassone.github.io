const textInput = document.getElementById('text-input');
const memeText = document.getElementById('meme-text');
const memeInsert = document.getElementById('meme-insert');
const memeImage = document.getElementById('meme-image');
const memeImageContainer = document.getElementById('meme-image-container');
const btnFire = document.getElementById('fire');
const btnWater = document.getElementById('water');
const btnEarth = document.getElementById('earth');
const meme1 = document.getElementById('meme-1');
const meme2 = document.getElementById('meme-2');
const meme3 = document.getElementById('meme-3');
const meme4 = document.getElementById('meme-4');

function showMemeText() {
  memeText.innerText = textInput.value;
}

textInput.addEventListener('input', showMemeText);

function showMemeImage() {
  const file = new FileReader();
  file.readAsDataURL(memeInsert.files[0]);
  file.onloadend = () => {
    memeImage.src = file.result;
    const image = new Image();
    image.src = file.result;
    image.onload = () => {
      memeImageContainer.style.width = `${image.width}px`;
      memeImageContainer.style.height = `${image.height}px`;
    };
  };
}

memeInsert.addEventListener('input', showMemeImage);

function borderChange(event) {
  if (event.target.id === 'fire') {
    memeImageContainer.style.border = '3px dashed rgb(255 , 0 , 0)';
  } else if (event.target.id === 'water') {
    memeImageContainer.style.border = '5px double rgb(0 , 0 , 255)';
  } else {
    memeImageContainer.style.border = '6px groove rgb(0 , 128 , 0)';
  }
}

btnFire.addEventListener('click', borderChange);
btnWater.addEventListener('click', borderChange);
btnEarth.addEventListener('click', borderChange);

function insertMemePreview(event) {
  const preview = event.target;
  memeImage.src = preview.src;
  const image = new Image();
  image.src = preview.src;
  image.onload = () => {
    memeImageContainer.style.width = `${image.width}px`;
    memeImageContainer.style.height = `${image.height}px`;
  };
}

meme1.addEventListener('click', insertMemePreview);
meme2.addEventListener('click', insertMemePreview);
meme3.addEventListener('click', insertMemePreview);
meme4.addEventListener('click', insertMemePreview);
