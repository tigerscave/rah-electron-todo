
const { app, ipcMain } = require('electron');
const path = require('path')
const Window = require('./src/window');
const DataStore = require('./src/dataStore')

require('electron-reload')(__dirname)

const todosData = new DataStore({ name: 'Todos Main' });

const main = () => {
  let mainWindow = new Window({
    file: {
      pathname: path.join(__dirname, 'src/renderer/index.html'),
      protocol: 'file:',
      slashes: true,
    }
  });
  
  mainWindow.once('show', () => {
    mainWindow.webContents.send('todos', todosData.todos)
  });
  
  let addTodoWindow
  
  ipcMain.on('add-todo-window', () => {
    if (!addTodoWindow) {
      addTodoWindow = new Window({
        file: {
          pathname: path.join(__dirname, 'src/renderer/addTodo.html'),
          protocol: 'file:',
          slashes: true,
        },
        width: 400,
        height: 400,
        parent: mainWindow,
      });
      
      addTodoWindow.on('closed', () => {
        addTodoWindow = null;
      });
    }
  });
  
  ipcMain.on('add-todo', (event, todo) => {
    const updatedTodos = todosData.addTodo(todo).todos

    mainWindow.webContents.send('todos', updatedTodos)
    console.log('todo', todo)
  })
  
  ipcMain.on('delete-todo', (event, todo) => {
    const updatedTodos = todosData.deleteTodo(todo).todos
    console.log('delete todo', todo)
    mainWindow.webContents.send('todos', updatedTodos);
  })
}

app.on('ready', main);

app.on('all-window-closed', () => {
  app.quit()
});

