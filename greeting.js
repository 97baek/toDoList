const greetForm = document.querySelector(".greet_form");
const greetInput = greetForm.querySelector("input");
const hello = document.querySelector(".hellomsg");

const SHOWING_CN = "showing";
const USER_NAME = "currentUser";

function saveName(text) {
  localStorage.setItem(USER_NAME, text);
}

function handleSubmit(e) {
  console.log("hihihi!!");

  e.preventDefault();
  const currentValue = greetInput.value;
  sayHello(currentValue);
  saveName(currentValue);
}

function askForName() {
  console.log("hihihi!!");
  greetForm.classList.add(SHOWING_CN);
  greetForm.addEventListener("submit", handleSubmit);
}

function sayHello(text) {
  greetForm.classList.remove(SHOWING_CN);
  hello.classList.add(SHOWING_CN);
  hello.innerText = `Hello ${text}`;
}

function getName() {
  const currentUser = localStorage.getItem(USER_NAME);
  if (currentUser === null) {
    askForName();
    console.log("hihihi!!");
  } else {
    sayHello(currentUser);
  }
}

function init() {
  getName();
}

init();
