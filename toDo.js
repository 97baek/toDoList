const toDoForm = document.querySelector(".toDoForm");
const toDoInput = toDoForm.querySelector(".toDoInput");
const toDoList = document.querySelector(".toDoList");
const done = document.querySelector(".doneToDo");

const TODO_LS = "toDos";
const DONE_LS = "done";
const JS_TODO_LS = "js-toDoList";
const JS_DONE_LS = "js-doneList";
let toDoArray = [];
let doneArray = [];

function saveToDo() {
  localStorage.setItem(TODO_LS, JSON.stringify(toDoArray));
}

function saveDone() {
  localStorage.setItem(DONE_LS, JSON.stringify(doneArray));
}

function handleDelete(event) {
  const btn = event.target;
  const ulName = btn.parentNode.parentNode;
  const li = btn.parentNode;

  if (ulName.className.search(JS_TODO_LS) !== -1) {
    toDoList.removeChild(li);
    const cleanToDos = toDoArray.filter((toDo) => {
      return toDo.id !== parseInt(li.id, 10);
    });
    toDos = cleanToDos;
    saveToDos();
  } else if (ulName.className.search(JS_DONE_LS) !== -1) {
    doneList.removeChild(li);
    const cleanToDos = doneArray.filter((done) => {
      return done.id !== parseInt(li.id, 10);
    });
    dones = cleanToDos;
    saveDones();
  }
}

function handleCheck(event) {
  const checkBtn = event.target;
  const ulName = checkBtn.parentNode.parentNode;
  const value = checkBtn.parentNode.querySelector("span").innerText;
  handleDelete(event);

  if (ulName.className.search(JS_TODO_LS) !== -1) {
    paintDoneList(value);
  } else if (ulName.className.search(JS_DONE_LS) !== -1) {
    paintToDoList(value);
  }
}

function paintDone(text) {
  const li = document.createElement("li");
  li.classList.add("li");
  const checkbox = document.createElement("input");
  checkbox.classList.add("checkbox");
  checkbox.type = "checkbox";
  checkbox.checked = true;
  checkbox.addEventListener("change", handleCheck);
  const span = document.createElement("span");
  text.innerText = text;
  const delBtn = document.createElement("button");
  delBtn.classList.add("delBtn");
  delBtn.innerText = "❌";
  delBtn.addEventListener("click", handleDelete);
  const newId = doneArray.length + 1;
  li.appendChild(checkbox);
  li.appendChild(span);
  li.appendChild(delBtn);
  li.id = newId;
  done.appendChild(li);
  const doneObj = {
    text: text,
    id: newId,
  };
  doneArray.push(doneObj);
  saveDone();
}

function paintToDo(text) {
  const li = document.createElement("li");
  const span = document.createElement("span");
  const delBtn = document.createElement("button");
  const doneBtn = document.createElement("button");
  const newId = toDoArray.length + 1;
  span.innerText = text;
  delBtn.innerText = "X";
  doneBtn.innerText = "V";
  doneBtn.addEventListener("click", handleCheck);
  delBtn.addEventListener("click", handleDelete);
  li.appendChild(doneBtn);
  li.appendChild(span);
  li.appendChild(delBtn);
  toDoList.appendChild(li);
  li.id = newId;
  const toDoObj = {
    text,
    id: newId,
  };
  toDoArray.push(toDoObj);
  saveToDo();
}

function handleSubmit(e) {
  e.preventDefault();
  const currentUser = toDoInput.value;
  paintToDo(currentUser);
  toDoInput.value = "";
}

function loadToDo() {
  const loadedToDo = localStorage.getItem(TODO_LS);
  if (loadedToDo !== null) {
    const parseToDo = JSON.parse(loadedToDo);
    parseToDo.forEach((e) => {
      paintToDo(e.text);
    });
  }

  const loadedDone = localStorage.getItem(DONE_LS);
  if (loadedDone !== null) {
    const parseDone = JSON.parse(loadedDone);
    parseDone.forEach((e) => {
      paintDone(e.text);
    });
  }
}

function init() {
  loadToDo();
  toDoForm.addEventListener("submit", handleSubmit);
}

init();
