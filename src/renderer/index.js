const { ipcRenderer } = require('electron');

const deleteTodo = () => {
    const item = document.getElementById('todo-item')
    ipcRenderer.send('delete-todo', item.textContent)
    console.log('event')
}

document.getElementById('createTodoBtn').addEventListener('click', () => {
    ipcRenderer.send('add-todo-window')
});


ipcRenderer.on('todos', (event, todos) => {
    const todoList = document.getElementById('todoList');
    const todoitems = todos.reduce((html, todo) => {

        const deleteButton = `<button class="delete-todo-button" type="button">Delete Todo</button>`
        html += `<li class="todo-item"><span id="todo-item">${todo}</span><span>${deleteButton}</span></li>`
        return html;
    }, '')

    todoList.innerHTML = todoitems;

    todoList.querySelectorAll('.delete-todo-button').forEach(item => {
        item.addEventListener('click', deleteTodo)
    })
})
