import { contextBridge, ipcRenderer } from 'electron';

ipcRenderer.send("run-command", "mkdir aaa")

contextBridge.exposeInMainWorld('api', {
    runCommand: (command) => ipcRenderer.send('run-command', command),
    onCommandOutput: (callback) => ipcRenderer.on('command-output', callback)
});