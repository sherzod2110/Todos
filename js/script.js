"use strict";

// cALL FORM ELEMENTS
const elForm = $(".form");
const elInput = $(".input");

// CALL LIST
const elList = $(".todos-list");

// CALL BUTTON ELEMENTS
const elButtonAll = $(".js-button-all");
const elButtonCom = $(".js-button-com");
const elButtonUn = $(".js-button-un");
const elButtonClear = $(".js-clear-btn");

// CALL BUTTON IN ELEMENTS CHANGER
const elSpan = $(".js-spn");
const elSpan2 = $(".js-spn-2");
const elSpan3 = $(".js-spn-3");

// CALL NEW ARRAY
const todos = [];

elList.addEventListener("click", function (evt) {
  const deleteBtnId = evt.target.dataset * 1;
  const foundTodoIndex = todos.findIndex((todo) => todo.id === deleteBtnId);
  // elSpan2.textContent = todos.length -1;

  if (evt.target.matches(".delete-btn")) {
    todos.splice(foundTodoIndex, 1);
    // elSpan3.textContent = todos.length;
    // elSpan2.textContent = todos.length;

    elSpan.textContent = todos.length - 0;
    elSpan2.textContent = todos.length - 0;
    elSpan3.textContent = todos.length - 0;

    elList.innerHTML = null; // CLEAR LIST

    renderTodos(todos, elList);
  } else if (evt.target.matches(".checkbox-btn")) {
    const checkboxId = evt.target.dataset.checkboxBtnId * 1;
    // console.log(checkboxId);

    const foundTodo = todos.find((todo) => todo.id === checkboxId);
    console.log(todos);

    foundTodo.isCompleted = !foundTodo.isCompleted;

    // elSpan3.textContent = `${todos.length - todos.filter((todo) => todo.isCompleted).length}`;
    // elSpan2.textContent = `${todos.filter((todo) => todo.isCompleted).length}`;

    elList.innerHTML = null; // CLEAR LIST

    renderTodos(todos, elList); // FUNCTION
  }
});

// RENDER FUNCTION
const renderTodos = function (arr, htmlElement) {
  // ELMENTS LOOP
  arr.forEach((todo) => {
    elSpan.textContent = todos.length;
    elSpan2.textContent = todos.filter(
      (todo) => todo.isCompleted === true
    ).length;

    elSpan3.textContent = todos.filter(
      (todo) => todo.isCompleted === false
    ).length;

    // CREATE ELEMENTS
    const newItem = document.createElement("li", "list-item");
    const newCheckbox = document.createElement("input");
    const newDeleteBtn = document.createElement("button");

    newItem.textContent = todo.title;
    newCheckbox.type = "checkbox"; // CHECKBOX TYPE
    // newDeleteBtn.textContent = "Delete";

    // ADD ATTRIBUTES CLASSES
    newDeleteBtn.classList.add("delete-btn");
    newCheckbox.classList.add("checkbox-btn");

    // ADD ATTRIBUTES DATA
    newDeleteBtn.dataset.deleteBtnId = todo.id;
    newCheckbox.dataset.checkboxBtnId = todo.id;

    // CHECK IF CHECKED ON LINE-THROUGH
    if (todo.isCompleted) {
      newCheckbox.checked = true;
      newItem.style.textDecoration = "line-through";
      // elSpan2.textContent = `${todos.length}`;
    }

    // APPEND ELEMENTS
    htmlElement.appendChild(newItem);
    newItem.appendChild(newCheckbox);
    newItem.appendChild(newDeleteBtn);
  });
};

// ELFORM SUBMIT
elForm.addEventListener("submit", function (evt) {
  evt.preventDefault();

  // CHANGER BUTTON TEXT
  // elSpan.textContent = `${todos.length + 1}`;
  // elSpan3.textContent = `${todos.length + 1}`;

  // VALUE OF INPUT
  const inputValue = elInput.value;

  const newTodo = {
    // NEW OBJECT
    id: todos[todos.length - 1]?.id + 1 || 0,
    title: inputValue,
    isCompleted: false,
  };

  // ARRAY PUSH NEW TODO
  todos.push(newTodo);

  // CLEAR INPUT VALUE
  elInput.value = null;
  elList.innerHTML = null;

  // RENDER FUNCTION
  renderTodos(todos, elList);
});

// BUTTON
elButtonCom.addEventListener("click", function () {
  // evt.preventDefault();

  elList.innerHTML = null;

  renderTodos(todos, elList);
});

elButtonCom.addEventListener("click", function (evt) {
  evt.preventDefault();
  const completedFilter = todos.filter((todo) => todo.isCompleted);

  elList.innerHTML = null;

  renderTodos(completedFilter, elList);
});

elButtonUn.addEventListener("click", function (evt) {
  evt.preventDefault();
  const uncompletedFilter = todos.filter((todo) => todo.isCompleted === false);

  elList.innerHTML = null;

  renderTodos(uncompletedFilter, elList);
});

// HTML ELEMENTS CHANGER
elButtonClear.addEventListener("click", function (evt) {
  evt.preventDefault();

  // CLEAR LIST
  elList.innerHTML = null;

  // CLEAR CHANGER
  elSpan.textContent = 0;
  elSpan2.textContent = 0;
  elSpan3.textContent = 0;
});
