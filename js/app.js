const formCreate = document.getElementById("form-create");
const listGroupTodo = document.getElementById("list-group-todo");
const messageCreate = document.getElementById("message-create");
const messageEdit = document.getElementById("message-edit");
const formEdit = document.getElementById("form-edit");
const closeModal = document.getElementById('close-modal')
const createTodo = document.querySelector('.create-todo')
const createClose = document.getElementById('.create-close')
const deleteTodoMes = document.querySelector('.delete-todo')
const LIST = "list";

let editTodoIndex = 0;

//Local storage
const todos = JSON.parse(localStorage.getItem(LIST))
  ? JSON.parse(localStorage.getItem(LIST))
  : [];

//check local
if (todos.length) showTodos();

//setTodos
function setTodos() {
  localStorage.setItem(LIST, JSON.stringify(todos));
}

//showTodos
function showTodos() {
  listGroupTodo.innerHTML = "";
  todos.forEach((todo, i) => {
    listGroupTodo.innerHTML += `
        <li class="list-group-item d-flex justify-content-between">
        ${todo}

        <div class="todo-icons">
          <img onclick="editTodo(${i})" src="./img/edit.svg" alt="edit icon" width="25" height="25" />
          <img
            onclick="deleteTodo(${i})"
            src="./img/delete.svg"
            alt="delete icon"
            width="25"
            height="25"
          />
        </div>
      </li>
        
        `;
  });
}

//create form todo

formCreate.addEventListener("submit", (e) => {
  e.preventDefault();
  const todoText = formCreate["input-create"].value.trim();
  if (todoText.length) {
    todos.push(todoText);
    setTodos();
    showTodos();
    formCreate["input-create"].value = "";
    createTodo.classList.add('create-todo-ani')
    setTimeout(() => {
        createTodo.classList.remove('create-todo-ani')
        createTodo.classList.add('create-todo-ani-end')
    }, 2000)
    
    createTodo.classList.remove('create-todo-ani-end')
  } else {
    messageCreate.textContent = "Please enter something...";
    setTimeout(() => {
      messageCreate.textContent = "";
    }, 2500);
  }
});

//deleteTodo
function deleteTodo(id) {
  todos.splice(id, 1);
  setTodos();
  showTodos();
  deleteTodoMes.classList.add('create-todo-ani')
    setTimeout(() => {
        deleteTodoMes.classList.remove('create-todo-ani')
        deleteTodoMes.classList.add('create-todo-ani-end')
    }, 2000)
    deleteTodoMes.classList.remove('create-todo-ani-end')
}

// editTodo
function editTodo(id) {
  editTodoIndex = id;
  document.getElementById("modal").classList.remove("hidden");
  document.getElementById("overlay").classList.remove("hidden");
}

//edit form
formEdit.addEventListener("submit", (e) => {
  e.preventDefault();
  const todoTextEdit = formEdit["input-edit"].value.trim();
  if (todoTextEdit.length) {
    todos.splice(editTodoIndex, 1, todoTextEdit);
    setTodos();
    showTodos();
    formEdit["input-edit"].value = "";
    
    document.getElementById("modal").classList.add("hidden");
    document.getElementById("overlay").classList.add("hidden");
  } else {
    messageEdit.textContent = "Please edit your todo";
    setTimeout(() => {
      messageEdit.textContent = "";
    }, 2500);
  }
  
});

//close modal
closeModal.addEventListener('click' , () => {
    formEdit["input-edit"].value = "";
    document.getElementById("modal").classList.add("hidden");
    document.getElementById("overlay").classList.add("hidden");
})

document.getElementById('overlay').addEventListener('click', ()=> {
    formEdit["input-edit"].value = "";
    document.getElementById("modal").classList.add("hidden");
    document.getElementById("overlay").classList.add("hidden");
})

document.addEventListener('keydown', (e) => {
    if(e.code == 'Escape'){
        formEdit["input-edit"].value = "";
    document.getElementById("modal").classList.add("hidden");
    document.getElementById("overlay").classList.add("hidden");
    }
})


