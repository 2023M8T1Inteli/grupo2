import { electronAPI } from '@electron-toolkit/preload'
import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('electronAPI', {
  readFile: (filePath: string) => ipcRenderer.invoke('read-file', filePath),
  writeFile: (filePath, content) => ipcRenderer.invoke('write-file', filePath, content),
  saveImage: (fileName, imgData) => ipcRenderer.invoke('save-image', fileName, imgData),
  createNewFolder: (folderName) => ipcRenderer.invoke('create-new-folder', folderName),
  readProjectFolders: (baseDirectory) => ipcRenderer.invoke('read-project-folders', baseDirectory),
  createProjectInfo: (projectFolderPath) =>
    ipcRenderer.invoke('create-project-info', projectFolderPath),
  updateProjectInfo: (projectFolderPath, data) =>
    ipcRenderer.invoke('update-project-info', projectFolderPath, data),
  getFolderPath: (folderName) => ipcRenderer.invoke('get-folder-path', folderName),
  saveCanvasState: (filePath, data) => ipcRenderer.invoke('save-canvas-state', filePath, data),
  readCanvasState: (filePath) => ipcRenderer.invoke('read-canvas-state', filePath),
  uploadAndSaveImage: (filePath, data) =>
    ipcRenderer.invoke('upload-and-save-image', filePath, data),
    readFileAsBuffer: (filePath) => ipcRenderer.invoke('readFileAsBuffer', filePath),
})

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