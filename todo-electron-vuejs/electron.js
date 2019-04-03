const { app, BrowserWindow } = require('electron');

let win

const createWindow = () => {
  win = new BrowserWindow({ width: 800, height: 800 });
  
  win.loadFile('dist/index.html');
  
  win.webContents.openDevTools();
  
  win.on('closed', () => {
    win = null
  })
};

app.on('ready', createWindow);

app.on('activate', () => {
  
  if(win === null) {
    createWindow()
  }
})
