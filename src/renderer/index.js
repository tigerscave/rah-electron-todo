const {ipcRenderer} = require('electron');

const deleteTodo = () => {
  const item = document.getElementById('todo-item')
  ipcRenderer.send('delete-todo', item)
  console.log('event')
}

const addTodo = document.getElementById('addTodoButton')
addTodo.addEventListener('click', () => {
  const todoText = document.getElementById('todoInput');
  
  console.log(todoText.value)
  let todo = todoText.value
  todo.length > 0 && ipcRenderer.send('add-todo', todo)
  todoText.value = '';
});

ipcRenderer.on('todos', (event, todos) => {
  const todoList = document.getElementById('todo-list');
  
  const todoitems = todos.reduce((item, todo) => {
    item += `
      <li data-id="{{id}}" class="todo-item" id="todo-item">
				<div class="view">
					<input class="toggle" type="checkbox" {{checked}}>
					<label>${todo}</label>
					<button class="destroy"></button>
				</div>
			</li>
    `
    return item;
  }, '')
  
  todoList.innerHTML = todoitems;
  
  const deleteButton = document.getElementsByClassName('destroy');
  deleteButton.addEventListener('click', deleteTodo)
  // todoList.querySelectorAll('.destroy').forEach(item => {
  //   item.addEventListener('click', deleteTodo)
  // })
})
