"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const preload = require("@electron-toolkit/preload");
const electron = require("electron");
electron.contextBridge.exposeInMainWorld("electronAPI", {
  readFile: (filePath) => electron.ipcRenderer.invoke("read-file", filePath),
  writeFile: (filePath, content) => electron.ipcRenderer.invoke("write-file", filePath, content),
  saveImage: (fileName, imgData) => electron.ipcRenderer.invoke("save-image", fileName, imgData),
  createNewFolder: (folderName) => electron.ipcRenderer.invoke("create-new-folder", folderName),
  readProjectFolders: (baseDirectory) => electron.ipcRenderer.invoke("read-project-folders", baseDirectory),
  createProjectInfo: (projectFolderPath) => electron.ipcRenderer.invoke("create-project-info", projectFolderPath),
  updateProjectInfo: (projectFolderPath, data) => electron.ipcRenderer.invoke("update-project-info", projectFolderPath, data),
  getFolderPath: (folderName) => electron.ipcRenderer.invoke("get-folder-path", folderName),
  saveCanvasState: (filePath, data) => electron.ipcRenderer.invoke("save-canvas-state", filePath, data),
  readCanvasState: (filePath) => electron.ipcRenderer.invoke("read-canvas-state", filePath),
  uploadAndSaveImage: (filePath, data) => electron.ipcRenderer.invoke("upload-and-save-image", filePath, data),
  readFileAsBuffer: (filePath) => electron.ipcRenderer.invoke("readFileAsBuffer", filePath),
  convertArrayBufferToBuffer: (arrayBuffer) => Buffer.from(arrayBuffer),
  convertBlobToOgg: (buffer) => electron.ipcRenderer.invoke("convert-blob-to-ogg", buffer),
  saveWavFile: (filePath, soundName, wavBuffer) => electron.ipcRenderer.invoke("save-wav-file", filePath, soundName, wavBuffer)
});
const api = {
  readFile: (filePath) => electron.ipcRenderer.invoke("read-file", filePath),
  writeFile: (filePath, content) => electron.ipcRenderer.invoke("write-file", filePath, content),
  saveImage: (fileName, imgData) => electron.ipcRenderer.invoke("save-image", fileName, imgData),
  createNewFolder: (folderName) => electron.ipcRenderer.invoke("create-new-folder", folderName),
  readProjectFolders: (baseDirectory) => electron.ipcRenderer.invoke("read-project-folders", baseDirectory),
  createProjectInfo: (projectFolderPath) => electron.ipcRenderer.invoke("create-project-info", projectFolderPath),
  updateProjectInfo: (projectFolderPath, data) => electron.ipcRenderer.invoke("update-project-info", projectFolderPath, data),
  getFolderPath: (folderName) => electron.ipcRenderer.invoke("get-folder-path", folderName),
  saveCanvasState: (filePath, data) => electron.ipcRenderer.invoke("save-canvas-state", filePath, data),
  readCanvasState: (filePath) => electron.ipcRenderer.invoke("read-canvas-state", filePath),
  uploadAndSaveImage: (filePath, data) => electron.ipcRenderer.invoke("upload-and-save-image", filePath, data),
  readFileAsBuffer: (filePath) => electron.ipcRenderer.invoke("readFileAsBuffer", filePath),
  compileCode: (code) => electron.ipcRenderer.invoke("compiler:compile", code),
  saveAndRunCode: (code, filepath) => electron.ipcRenderer.invoke("compiler:saveAndRun", code, filepath)
};
if (process.contextIsolated) {
  try {
    electron.contextBridge.exposeInMainWorld("electron", preload.electronAPI);
    electron.contextBridge.exposeInMainWorld("api", api);
  } catch (error) {
    console.error(error);
  }
} else {
  window.electron = preload.electronAPI;
  window.api = api;
}
exports.api = api;
