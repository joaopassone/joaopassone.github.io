const taskInput = document.getElementById('texto-tarefa');
const btnAddTask = document.getElementById('criar-tarefa');
const taskList = document.getElementById('lista-tarefas');
const btnRemoveSelected = document.getElementById('remover-selecionado');
const btnClearAllTasks = document.getElementById('apaga-tudo');
const btnClearFinishedTasks = document.getElementById('remover-finalizados');
const btnSaveList = document.getElementById('salvar-tarefas');
const btnUp = document.getElementById('mover-cima');
const btnDown = document.getElementById('mover-baixo');

function createNewListItem() {
  const newListItem = document.createElement('li');
  newListItem.className = 'list-item';
  return newListItem;
}

function deleteInputText() {
  taskInput.value = '';
}

function deleteBackgroundColor() {
  const listItens = document.getElementsByClassName('selected');
  if (listItens.length > 0) {
    listItens[0].classList.remove('selected');
  }
}

function itemBgColor(event) {
  deleteBackgroundColor();
  const listItem = event.target;
  listItem.classList.add('selected');
}

function riskTask(event) {
  const item = event.target;
  if (item.className.includes('completed')) {
    item.classList.remove('completed');
  } else {
    item.classList.add('completed');
  }
}

function addNewEventToListItem() {
  taskList.lastElementChild.addEventListener('click', itemBgColor);
  taskList.lastElementChild.addEventListener('dblclick', riskTask);
}

function addItemToList() {
  const newTask = taskInput.value;
  if (taskInput.value === '') {
    return;
  }
  deleteInputText();
  const listItem = createNewListItem();
  listItem.innerText = newTask;
  taskList.appendChild(listItem);
  addNewEventToListItem();
}

btnAddTask.addEventListener('click', addItemToList);

function clearList() {
  const listItens = document.getElementsByClassName('list-item');
  if (listItens.length > 0) {
    taskList.removeChild(listItens[0]);
    clearList();
  }
}

btnClearAllTasks.addEventListener('click', clearList);

function clearFinishedTasks() {
  const listItens = document.getElementsByClassName('completed');
  if (listItens.length > 0) {
    taskList.removeChild(listItens[0]);
    clearFinishedTasks();
  }
}

btnClearFinishedTasks.addEventListener('click', clearFinishedTasks);

function saveList() {
  const textArray = [];
  const classArray = [];
  const listItens = document.getElementsByClassName('list-item');
  for (let index = 0; index < listItens.length; index += 1) {
    textArray.push(listItens[index].innerText);
    classArray.push(listItens[index].className);
  }
  localStorage.setItem('savedList', JSON.stringify([textArray, classArray]));
}

btnSaveList.addEventListener('click', saveList);

function createLoadedListItem(text, className) {
  const newItem = document.createElement('li');
  newItem.className = className;
  newItem.innerText = text;
  return newItem;
}

function loadSavedList() {
  const savedList = JSON.parse(localStorage.getItem('savedList'));
  for (let index = 0; index < savedList[0].length; index += 1) {
    const loadedItem = createLoadedListItem(savedList[0][index], savedList[1][index]);
    if (loadedItem.className.includes('selected')) {
      loadedItem.classList.remove('selected');
    }
    taskList.appendChild(loadedItem);
    addNewEventToListItem();
  }
}

function verifySavedList() {
  const savedList = localStorage.getItem('savedList');
  if (savedList == null) {
    localStorage.setItem('savedList', '[[],[]]');
  }
}

verifySavedList();
loadSavedList();

function moveItem(event) {
  const selectedItem = document.querySelector('.selected');
  let sibling = null;
  if (selectedItem == null) {
    return;
  }
  if (event.target === btnUp) {
    sibling = selectedItem.previousElementSibling;
  } else {
    sibling = selectedItem.nextElementSibling;
  }
  if (sibling != null) {
    let aux = sibling.innerText;
    sibling.innerText = selectedItem.innerText;
    selectedItem.innerText = aux;
    aux = sibling.className;
    sibling.className = selectedItem.className;
    selectedItem.className = aux;
  }
}

btnUp.addEventListener('click', moveItem);
btnDown.addEventListener('click', moveItem);

function deleteSelectedTask() {
  const selectedItem = document.querySelector('.selected');
  if (selectedItem == null) {
    return;
  }
  taskList.removeChild(selectedItem);
}

btnRemoveSelected.addEventListener('click', deleteSelectedTask);
