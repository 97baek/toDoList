const toDoForm = document.querySelector(".toDoForm");
const toDoInput = toDoForm.querySelector(".toDoInput");
const toDoList = document.querySelector(".toDoList");

const TODOS_LS = "toDos";
let toDoArray = [];

function saveToDo() {
  localStorage.setItem(TODOS_LS, JSON.stringify(toDoArray));
}

function deleteToDo(e) {
  const item = e.target;
  const itemId = item.parentNode;
  toDoList.removeChild(itemId);
  const newToDo = toDoArray.filter((f) => {
    return f.id !== parseInt(itemId.id);
  });
  toDoArray = newToDo;
  saveToDo();
}

function makeToDo(text) {
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const span = document.createElement("span");
  const newId = toDoArray.length + 1;
  delBtn.innerText = "X";
  delBtn.addEventListener("click", deleteToDo);
  span.innerText = text;
  li.id = newId;
  li.appendChild(delBtn);
  li.appendChild(span);
  toDoList.appendChild(li);
  const toDoObj = {
    text: text,
    id: newId,
  };
  toDoArray.push(toDoObj);
  saveToDo();
}

function handleSubmit(e) {
  e.preventDefault();
  const currentValue = toDoInput.value;
  makeToDo(currentValue);
  toDoInput.value = "";
}

function loadToDo() {
  const loadedToDo = localStorage.getItem(TODOS_LS);
  const parsedToDo = JSON.parse(loadedToDo);
  parsedToDo.forEach((e) => {
    makeToDo(e.text);
  });
}

function init() {
  loadToDo();
  toDoForm.addEventListener("submit", handleSubmit);
}

init();
