import { electronAPI } from '@electron-toolkit/preload'
import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electronAPI', {
  readFile: (filePath: string) => ipcRenderer.invoke('read-file', filePath),
  writeFile: (filePath: string, content: string) => ipcRenderer.invoke('write-file', filePath, content),
  saveImage: (filePath, base64Data) => ipcRenderer.invoke('save-image', filePath, base64Data),
  createNewFolder: (folderName) => ipcRenderer.invoke('create-new-folder', folderName),
  readProjectFolders: (baseDirectory) => ipcRenderer.invoke('read-project-folders', baseDirectory),
  createProjectInfo: (projectFolderPath) => ipcRenderer.invoke('create-project-info', projectFolderPath),
  updateProjectInfo: (projectFolderPath, data) => ipcRenderer.invoke('update-project-info', projectFolderPath, data)
});

// Custom APIs for renderer
const api = {}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
