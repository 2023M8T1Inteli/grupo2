"use strict";
const electron = require("electron");
const path = require("path");
const utils = require("@electron-toolkit/utils");
const Sequelize = require("sequelize");
const os = require("os");
const fs$1 = require("fs");
const icon = path.join(__dirname, "../../resources/icon.png");
const Database = new Sequelize.Sequelize({
  dialect: "sqlite",
  storage: path.join(__dirname, "../../resources/db/", "database.sqlite")
});
const users = {
  async insert(user) {
    const { username, password, role, createdAt } = user;
    const query = "INSERT INTO users (username, password, role, createdAt) VALUES (?, ?, ?, ?)";
    await Database.query(query, { replacements: [username, password, role, createdAt] });
  },
  async update(user) {
    const { id, username, password, role, createdAt } = user;
    const query = "UPDATE users SET username = ?, password = ?, role = ?, createdAt = ? WHERE id = ?";
    await Database.query(query, { replacements: [username, password, role, createdAt, id] });
  },
  async delete(id) {
    const query = "DELETE FROM users WHERE id = ?";
    await Database.query(query, { replacements: [id] });
  },
  async get(id) {
    const query = "SELECT * FROM users WHERE id = ?";
    const users2 = await Database.query(query, {
      replacements: [id],
      type: Sequelize.QueryTypes.SELECT
    });
    return users2[0] || null;
  },
  async getAll() {
    const query = "SELECT * FROM users";
    const users2 = await Database.query(query, { type: Sequelize.QueryTypes.SELECT });
    return users2;
  },
  async getByUsername(username) {
    const query = "SELECT * FROM users WHERE username = ?";
    const users2 = await Database.query(query, {
      replacements: [username],
      type: Sequelize.QueryTypes.SELECT
    });
    return users2[0] || null;
  }
};
const patients = {
  async insert(patient) {
    const { name, surname, birthdate, observations, createdAt, updatedAt } = patient;
    const query = "INSERT INTO patients (name, surname, birthdate, observations, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?)";
    await Database.query(query, {
      replacements: [name, surname, birthdate, observations, createdAt, updatedAt]
    });
  },
  async update(patient) {
    const { id, name, surname, birthdate, observations, createdAt, updatedAt } = patient;
    const query = "UPDATE patients SET name = ?, surname = ?, birthdate = ?, observations = ?, createdAt = ?, updatedAt = ? WHERE id = ?";
    await Database.query(query, {
      replacements: [name, surname, birthdate, observations, createdAt, updatedAt, id]
    });
  },
  async delete(id) {
    const query = "DELETE FROM patients WHERE id = ?";
    await Database.query(query, { replacements: [id] });
  },
  async get(id) {
    const query = "SELECT * FROM patients WHERE id = ?";
    const patients2 = await Database.query(query, {
      replacements: [id],
      type: Sequelize.QueryTypes.SELECT
    });
    return patients2[0] || null;
  },
  async getAll() {
    const query = "SELECT * FROM patients";
    const patients2 = await Database.query(query, { type: Sequelize.QueryTypes.SELECT });
    return patients2;
  }
};
const projects = {
  async insert(project) {
    const { name, filePath, authorId, createdAt, updatedAt } = project;
    const query = "INSERT INTO projects (name, filePath, authorId, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?)";
    await Database.query(query, { replacements: [name, filePath, authorId, createdAt, updatedAt] });
  },
  async update(project) {
    const { id, name, filePath, authorId, createdAt, updatedAt } = project;
    const query = "UPDATE projects SET name = ?, filePath = ?, authorId = ?, createdAt = ?, updatedAt = ? WHERE id = ?";
    await Database.query(query, {
      replacements: [name, filePath, authorId, createdAt, updatedAt, id]
    });
  },
  async delete(id) {
    const query = "DELETE FROM projects WHERE id = ?";
    await Database.query(query, { replacements: [id] });
  },
  async get(id) {
    const query = "SELECT * FROM projects WHERE id = ?";
    const projects2 = await Database.query(query, {
      replacements: [id],
      type: Sequelize.QueryTypes.SELECT
    });
    return projects2[0] || null;
  },
  async getAll() {
    const query = "SELECT * FROM projects";
    const projects2 = await Database.query(query, { type: Sequelize.QueryTypes.SELECT });
    return projects2;
  }
};
const fs = require("fs");
const compilerPath = path.join(__dirname, "../../resources/compiler/", "main.py");
const codeBridge = {
  async compileCode(code) {
    return new Promise((resolve, reject) => {
      fs.writeFileSync("temp.qal", code);
      const spawn = require("child_process").spawn;
      const compileProcess = spawn("python", [compilerPath, "temp.qal"]);
      let data = "";
      let errorData = "";
      compileProcess.stdout.on("data", (chunk) => {
        data += chunk.toString();
      });
      compileProcess.stderr.on("data", (chunk) => {
        errorData += chunk.toString();
      });
      compileProcess.on("error", (error) => {
        fs.unlinkSync("temp.qal");
        reject(`Error occurred: ${error.message}`);
      });
      compileProcess.stdout.on("end", () => {
        fs.unlinkSync("temp.qal");
        if (errorData) {
          reject(`Error output: ${errorData}`);
        } else {
          resolve(data);
        }
      });
    });
  },
  async saveCompiledCodeAndRun(code, filepath) {
    return new Promise((resolve, reject) => {
      fs.writeFileSync(filepath + "/main.py", code);
      const spawn = require("child_process").spawn;
      const compileProcess = spawn("python", [filepath + "/main.py"]);
      let errorData = "";
      compileProcess.stderr.on("data", (chunk) => {
        errorData += chunk.toString();
      });
      compileProcess.on("error", (error) => {
        reject(`Error occurred: ${error.message}`);
      });
      compileProcess.stdout.on("end", () => {
        if (errorData) {
          reject(`Error output: ${errorData}`);
        } else {
          resolve();
        }
      });
    });
  }
};
function createWindow() {
  const mainWindow = new electron.BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    ...process.platform === "linux" ? { icon } : {},
    webPreferences: {
      preload: path.join(__dirname, "../preload/index.js"),
      sandbox: false
    }
  });
  mainWindow.on("ready-to-show", () => {
    mainWindow.show();
  });
  mainWindow.webContents.setWindowOpenHandler((details) => {
    electron.shell.openExternal(details.url);
    return { action: "deny" };
  });
  if (utils.is.dev && process.env["ELECTRON_RENDERER_URL"]) {
    mainWindow.loadURL(process.env["ELECTRON_RENDERER_URL"]);
  } else {
    mainWindow.loadFile(path.join(__dirname, "../renderer/index.html"));
  }
}
electron.app.whenReady().then(() => {
  utils.electronApp.setAppUserModelId("com.electron");
  electron.app.on("browser-window-created", (_, window) => {
    utils.optimizer.watchWindowShortcuts(window);
  });
  createWindow();
  electron.app.on("activate", function() {
    if (electron.BrowserWindow.getAllWindows().length === 0)
      createWindow();
  });
  electron.ipcMain.handle("db:user.insert", async (_, user) => {
    return users.insert(user);
  });
  electron.ipcMain.handle("db:user.update", async (_, user) => {
    return users.update(user);
  });
  electron.ipcMain.handle("db:user.delete", async (_, id) => {
    return users.delete(id);
  });
  electron.ipcMain.handle("db:user.get", async (_, id) => {
    return users.get(id);
  });
  electron.ipcMain.handle("db:user.getAll", async () => {
    return users.getAll();
  });
  electron.ipcMain.handle("db:user.getByUsername", async (_, username) => {
    return users.getByUsername(username);
  });
  electron.ipcMain.handle("db:patient.insert", async (_, patient) => {
    return patients.insert(patient);
  });
  electron.ipcMain.handle("db:patient.update", async (_, patient) => {
    return patients.update(patient);
  });
  electron.ipcMain.handle("db:patient.delete", async (_, id) => {
    return patients.delete(id);
  });
  electron.ipcMain.handle("db:patient.get", async (_, id) => {
    return patients.get(id);
  });
  electron.ipcMain.handle("db:patient.getAll", async () => {
    return patients.getAll();
  });
  electron.ipcMain.handle("db:project.insert", async (_, project) => {
    return projects.insert(project);
  });
  electron.ipcMain.handle("db:project.update", async (_, project) => {
    return projects.update(project);
  });
  electron.ipcMain.handle("db:project.delete", async (_, id) => {
    return projects.delete(id);
  });
  electron.ipcMain.handle("db:project.get", async (_, id) => {
    return projects.get(id);
  });
  electron.ipcMain.handle("db:project.getAll", async () => {
    return projects.getAll();
  });
  electron.ipcMain.handle("compiler:compile", async (_, code) => {
    return codeBridge.compileCode(code);
  });
  electron.ipcMain.handle("compiler:saveAndRun", async (_, code, filepath) => {
    return codeBridge.saveCompiledCodeAndRun(code, filepath);
  });
});
electron.app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    electron.app.quit();
  }
});
electron.ipcMain.handle("read-file", async (event, filePath) => {
  try {
    const content = fs$1.readFileSync(filePath, "utf-8");
    return content;
  } catch (error) {
    console.error("Error reading file:", error);
    return null;
  }
});
electron.ipcMain.handle("write-file", async (event, filePath, content) => {
  const directory = path.dirname(filePath);
  if (!fs$1.existsSync(directory)) {
    fs$1.mkdirSync(directory, { recursive: true });
  }
  try {
    fs$1.writeFileSync(filePath, content);
    return true;
  } catch (error) {
    console.error("Error writing file:", error);
    return false;
  }
});
electron.ipcMain.handle("save-image", async (event, filePath, base64Data) => {
  const buffer = Buffer.from(base64Data.replace(/^data:image\/png;base64,/, ""), "base64");
  try {
    const dir = path.dirname(filePath);
    if (!fs$1.existsSync(dir)) {
      fs$1.mkdirSync(dir, { recursive: true });
    }
    fs$1.writeFileSync(filePath, buffer);
    return true;
  } catch (error) {
    console.error("Error saving image:", error);
    return false;
  }
});
electron.ipcMain.handle("create-new-folder", async (event, folderName) => {
  const homeDirectory = os.homedir();
  const documentsPath = path.join(homeDirectory, "Documents");
  const baseDirectory = path.join(documentsPath, "MeusProjetos");
  const folderPath = path.join(baseDirectory, folderName);
  if (!fs$1.existsSync(folderPath)) {
    fs$1.mkdirSync(folderPath, { recursive: true });
  }
  global.myGlobalVariable = folderPath;
  return folderPath;
});
electron.ipcMain.handle("read-project-folders", async () => {
  try {
    const homeDirectory = os.homedir();
    const documentsPath = path.join(homeDirectory, "Documents");
    const baseDirectory = path.join(documentsPath, "MeusProjetos");
    const folders = fs$1.readdirSync(baseDirectory, { withFileTypes: true }).filter((dirent) => dirent.isDirectory()).map((dirent) => dirent.name);
    return folders;
  } catch (error) {
    console.error("Error reading project folders:", error);
    return [];
  }
});
electron.ipcMain.handle("create-project-info", async (event, projectFolderPath) => {
  const filePath = path.join(projectFolderPath, "project-info.json");
  if (!fs$1.existsSync(filePath)) {
    fs$1.writeFileSync(filePath, JSON.stringify({}));
  }
});
electron.ipcMain.handle("update-project-info", async (event, projectFolderPath, data) => {
  const filePath = path.join(projectFolderPath, "project-info.json");
  fs$1.writeFileSync(filePath, JSON.stringify(data));
});
electron.ipcMain.handle("get-folder-path", async (event, folderName) => {
  const homeDirectory = os.homedir();
  const documentsPath = path.join(homeDirectory, "Documents");
  const baseDirectory = path.join(documentsPath, "MeusProjetos");
  const folderPath = path.join(baseDirectory, folderName);
  if (fs$1.existsSync(folderPath)) {
    return folderPath;
  } else {
    throw new Error("Folder not found");
  }
});
electron.ipcMain.handle("save-canvas-state", async (event, filePath, data) => {
  try {
    const canvasDir = path.dirname(filePath);
    if (!fs$1.existsSync(canvasDir)) {
      fs$1.mkdirSync(canvasDir, { recursive: true });
    }
    fs$1.writeFileSync(filePath, data);
    return true;
  } catch (error) {
    console.error("Error saving canvas state:", error);
    return false;
  }
});
electron.ipcMain.handle("read-canvas-state", async (event, filePath) => {
  try {
    if (fs$1.existsSync(filePath)) {
      const data = fs$1.readFileSync(filePath, "utf8");
      return data;
    } else {
      console.error("File not found:", filePath);
      return null;
    }
  } catch (error) {
    console.error("Error reading canvas state:", error);
    return null;
  }
});
electron.ipcMain.handle("upload-and-save-image", async (event, filePath, base64Data) => {
  try {
    const directoryPath = path.dirname(filePath);
    if (!fs$1.existsSync(directoryPath)) {
      fs$1.mkdirSync(directoryPath, { recursive: true });
    }
    const base64Image = base64Data.replace(/^data:image\/\w+;base64,/, "");
    const buffer = Buffer.from(base64Image, "base64");
    fs$1.writeFileSync(filePath, buffer);
    const imageBuffer = fs$1.readFileSync(filePath);
    const dataUrl = `data:image/png;base64,${imageBuffer.toString("base64")}`;
    return dataUrl;
  } catch (error) {
    console.error("Error in upload-and-save-image:", error);
    return null;
  }
});
electron.ipcMain.handle("save-wav-file", async (event, filePath, fileName, wavBuffer) => {
  try {
    const fullPath = path.join(filePath, fileName);
    const directory = path.dirname(fullPath);
    if (!fs$1.existsSync(directory)) {
      fs$1.mkdirSync(directory, { recursive: true });
    }
    const buffer = Buffer.from(wavBuffer);
    await fs$1.promises.writeFile(fullPath, buffer);
    return { success: true, path: fullPath };
  } catch (error) {
    console.error("Error saving WAV file:", error);
    return { success: false, error: error.message };
  }
});
