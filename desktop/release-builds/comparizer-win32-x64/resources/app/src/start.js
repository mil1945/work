const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

const path = require('path');
const url = require('url');

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1700,
        height: 900,
        backgroundColor: '#2e2c29',
        center: true,
        resizable: false
    });

    mainWindow.loadURL(
        url.format(
            'http://localhost:3000'
            // pathname: path.join(__dirname, '/../public/index.html'),
            // protocol: 'file:',
            // slashes: true
        )
    );
    // mainWindow.webContents.openDevTools();
    mainWindow.on('closed', () => {
        mainWindow = null
    })
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
});

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow()
    }
});