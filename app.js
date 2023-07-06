// Import the functions you need from the SDKs you need
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js';
import {
  getDatabase,
  ref,
  push,
  set,
  onValue,
} from 'https://www.gstatic.com/firebasejs/9.23.0/firebase-database.js';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCqz_y99pU8qwoT50v8_hkCV8IKvokeJbc',
  authDomain: 'todo-app-b99f0.firebaseapp.com',
  projectId: 'todo-app-b99f0',
  storageBucket: 'todo-app-b99f0.appspot.com',
  messagingSenderId: '851152120855',
  appId: '1:851152120855:web:d97efbd2b18f89f6668052',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get elements from the DOM
const todoInput = document.getElementById('todo-input');
const addBtn = document.getElementById('add-btn');
const todoList = document.getElementById('todo-list');
const deleteAllBtn = document.getElementById('delete-all-btn');

// Function to create a new ToDo item
function createTodoItem(text) {
  const li = document.createElement('li');
  li.innerText = text;

  const actionsDiv = document.createElement('div');
  actionsDiv.classList.add('actions');

  const deleteBtn = document.createElement('button');
  deleteBtn.innerText = 'Delete';
  deleteBtn.classList.add('delete-btn');
  deleteBtn.addEventListener('click', function () {
    li.remove();
  });

  const editBtn = document.createElement('button');
  editBtn.innerText = 'Edit';
  editBtn.classList.add('edit-btn');
  editBtn.addEventListener('click', function () {
    const newText = prompt('Enter the updated task', li.innerText);
    if (newText !== null) {
      li.innerText = newText;
    }
  });

  actionsDiv.appendChild(deleteBtn);
  actionsDiv.appendChild(editBtn);

  li.appendChild(actionsDiv);
  return li;
}

// Add new ToDo item when the Add button is clicked
addBtn.addEventListener('click', function () {
  const text = todoInput.value;
  if (text !== '') {
    const todoItem = createTodoItem(text);
    todoList.appendChild(todoItem);
    var idref = ref(database, 'todo/');
    var id = push(idref),
      key;
    var obj = { text: text.value, id: id };
    var reffernece = ref(database, `todo/${id}`);
    set(reffernece, obj);
    todoList.innerHTML = '';
    gettodos();
    todoInput.value = '';
  }
});

// Delete all ToDo items when the Delete All button is clicked
deleteAllBtn.addEventListener('click', function () {
  todoList.innerHTML = '';
});
