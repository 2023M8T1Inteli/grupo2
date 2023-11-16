const { app, BrowserWindow, ipcMain } = require('electron');
const { exec } = require('child_process');
const path = require('path');

function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.ts'),
            nodeIntegration: true,
            contextIsolation: true
        }
    });

    win.loadURL('http://localhost:5173');
}

runCommand("python3 app.py")

function runCommand(command) {
    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`Erro: ${error.message}`);
            return;
        }
        if (stderr) {
            console.error(`Stderr: ${stderr}`);
            return;
        }
        console.log(`Stdout: ${stdout}`);
    })

}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

ipcMain.on('run-command', (event, command) => {
    exec(command, (error, stdout, stderr) => {
        if (error) {
            event.reply('command-output', `Error: ${error.message}`);
            return;
        }
        if (stderr) {
            event.reply('command-output', `stderr: ${stderr}`);
            return;
        }
        event.reply('command-output', stdout);
    });
});