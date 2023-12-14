import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'

import { users, User } from './services/User.service'
import { Patient, patients } from './services/Patient.service'
import { Project, projects } from './services/Project.service'

import fs from 'fs';
import path from 'path';

function createWindow(): void {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })

  ipcMain.handle('db:user.insert', async (_, user: User) => {
    return users.insert(user)
  })

  ipcMain.handle('db:user.update', async (_, user: User) => {
    return users.update(user)
  })

  ipcMain.handle('db:user.delete', async (_, id: string) => {
    return users.delete(id)
  })

  ipcMain.handle('db:user.get', async (_, id: string) => {
    return users.get(id)
  })

  ipcMain.handle('db:user.getAll', async () => {
    return users.getAll()
  })

  ipcMain.handle('db:user.getByUsername', async (_, username: string) => {
    return users.getByUsername(username)
  })

  ipcMain.handle('db:patient.insert', async (_, patient: Patient) => {
    return patients.insert(patient)
  })

  ipcMain.handle('db:patient.update', async (_, patient: Patient) => {
    return patients.update(patient)
  })

  ipcMain.handle('db:patient.delete', async (_, id: string) => {
    return patients.delete(id)
  })

  ipcMain.handle('db:patient.get', async (_, id: string) => {
    return patients.get(id)
  })

  ipcMain.handle('db:patient.getAll', async () => {
    return patients.getAll()
  })
  ipcMain.handle('db:project.insert', async (_, project: Project) => {
    return projects.insert(project)
  })

  ipcMain.handle('db:project.update', async (_, project: Project) => {
    return projects.update(project)
  })

  ipcMain.handle('db:project.delete', async (_, id: string) => {
    return projects.delete(id)
  })

  ipcMain.handle('db:project.get', async (_, id: string) => {
    return projects.get(id)
  })

  ipcMain.handle('db:project.getAll', async () => {
    return projects.getAll()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

ipcMain.handle('read-file', async (event, filePath: string) => {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    return content;
  } catch (error) {
    console.error('Error reading file:', error);
    return null; // ou manipule o erro como preferir
  }
});

ipcMain.handle('write-file', async (event, filePath: string, content: string) => {
  try {
    fs.writeFileSync(filePath, content);
    return true;
  } catch (error) {
    console.error('Error writing file:', error);
    return false; // ou manipule o erro como preferir
  }
});

ipcMain.handle('save-image', async (event, filePath, base64Data) => {
  const buffer = Buffer.from(base64Data.replace(/^data:image\/png;base64,/, ""), 'base64');
  try {
    fs.writeFileSync(filePath, buffer);
    return true;
  } catch (error) {
    console.error('Error saving image:', error);
    return false;
  }
});

ipcMain.handle('create-new-folder', async (event, folderName) => {
  const baseDirectory = 'C:/Users/Inteli/Documents/MeusProjetos'; // Caminho base
  const folderPath = path.join(baseDirectory, folderName); // Caminho completo da pasta

  if (!fs.existsSync(folderPath)){
    fs.mkdirSync(folderPath, { recursive: true }); // Cria a pasta
  }

  global.myGlobalVariable = folderPath; // Armazenando o caminho globalmente
  return folderPath;
});

ipcMain.handle('read-project-folders', async (event, baseDirectory) => {
  try {
    const folders = fs.readdirSync(baseDirectory, { withFileTypes: true })
                      .filter(dirent => dirent.isDirectory())
                      .map(dirent => dirent.name);
    return folders;
  } catch (error) {
    console.error('Error reading project folders:', error);
    return []; // Retorna uma lista vazia em caso de erro
  }
});

ipcMain.handle('create-project-info', async (event, projectFolderPath) => {
  const filePath = path.join(projectFolderPath, 'project-info.json');
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify({}));
  }
});

// Handler to update the JSON file
ipcMain.handle('update-project-info', async (event, projectFolderPath, data) => {
  const filePath = path.join(projectFolderPath, 'project-info.json');
  fs.writeFileSync(filePath, JSON.stringify(data));
});


// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
