'use strict'


const { BrowserWindow } = require('electron');

const url = require('url');

const defaultProps = {
  width: 500,
  height: 800,
  show: false,
}

class Window extends BrowserWindow{
  constructor({ file, ...windowSettings }) {
    super({ ...defaultProps, ...windowSettings, });
    
    this.loadURL(url.format(file));
    
    this.once('ready-to-show', () => {
      this.show()
    })
  }
}

module.exports = Window;
