const { app, BrowserWindow } = require('electron');
const path = require('path');
const MenuBuilder = require('./menu');

function createWindow() {
  const win = new BrowserWindow({
    width: '100%',
    height: '100%',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
    darkTheme: true,
    title: 'Google Calendar',
    resizable: true,
    fullscreen: true,
    fullscreenable: true,
    minWidth: 1000,
    minHeight: 800,
    icon: __dirname + '/static/Icon.png',
  });

  let menuBuilder = new MenuBuilder(win);
  menuBuilder.buildMenu();

  win.loadURL('https://calendar.google.com/');
}

app.whenReady().then(() => {
  app.setAboutPanelOptions({
    applicationName: 'Google Calendar',
    applicationVersion: '1.0',
    version: 'Version',
    credits: 'Credits',
    copyright: 'aldhanekaa',
    iconPath: __dirname + '/icon.ico',
  });
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
