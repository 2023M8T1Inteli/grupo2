"use strict";
const electron = require("electron");
const path = require("path");
const utils = require("@electron-toolkit/utils");
const Sequelize = require("sequelize");
const os = require("os");
const fs = require("fs");
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
});
electron.app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    electron.app.quit();
  }
});
electron.ipcMain.handle("read-file", async (event, filePath) => {
  try {
    const content = fs.readFileSync(filePath, "utf-8");
    return content;
  } catch (error) {
    console.error("Error reading file:", error);
    return null;
  }
});
electron.ipcMain.handle("write-file", async (event, filePath, content) => {
  const directory = path.dirname(filePath);
  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory, { recursive: true });
  }
  try {
    fs.writeFileSync(filePath, content);
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
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(filePath, buffer);
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
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
  }
  global.myGlobalVariable = folderPath;
  return folderPath;
});
electron.ipcMain.handle("read-project-folders", async () => {
  try {
    const homeDirectory = os.homedir();
    const documentsPath = path.join(homeDirectory, "Documents");
    const baseDirectory = path.join(documentsPath, "MeusProjetos");
    const folders = fs.readdirSync(baseDirectory, { withFileTypes: true }).filter((dirent) => dirent.isDirectory()).map((dirent) => dirent.name);
    return folders;
  } catch (error) {
    console.error("Error reading project folders:", error);
    return [];
  }
});
electron.ipcMain.handle("create-project-info", async (event, projectFolderPath) => {
  const filePath = path.join(projectFolderPath, "project-info.json");
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify({}));
  }
});
electron.ipcMain.handle("update-project-info", async (event, projectFolderPath, data) => {
  const filePath = path.join(projectFolderPath, "project-info.json");
  fs.writeFileSync(filePath, JSON.stringify(data));
});
electron.ipcMain.handle("get-folder-path", async (event, folderName) => {
  const homeDirectory = os.homedir();
  const documentsPath = path.join(homeDirectory, "Documents");
  const baseDirectory = path.join(documentsPath, "MeusProjetos");
  const folderPath = path.join(baseDirectory, folderName);
  if (fs.existsSync(folderPath)) {
    return folderPath;
  } else {
    throw new Error("Folder not found");
  }
});
electron.ipcMain.handle("save-canvas-state", async (event, filePath, data) => {
  try {
    const canvasDir = path.dirname(filePath);
    if (!fs.existsSync(canvasDir)) {
      fs.mkdirSync(canvasDir, { recursive: true });
    }
    fs.writeFileSync(filePath, data);
    return true;
  } catch (error) {
    console.error("Error saving canvas state:", error);
    return false;
  }
});
electron.ipcMain.handle("read-canvas-state", async (event, filePath) => {
  try {
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, "utf8");
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
electron.ipcMain.handle("upload-and-save-image", async (event, base64Data, imageName) => {
  try {
    const projectFolderPath = path.join(os.homedir(), "YourAppFolder", "ProjectImages");
    if (!fs.existsSync(projectFolderPath)) {
      fs.mkdirSync(projectFolderPath, { recursive: true });
    }
    const filePath = path.join(projectFolderPath, imageName);
    const base64Image = base64Data.replace(/^data:image\/\w+;base64,/, "");
    const buffer = Buffer.from(base64Image, "base64");
    fs.writeFileSync(filePath, buffer);
    const imageBuffer = fs.readFileSync(filePath);
    const dataUrl = `data:image/png;base64,${imageBuffer.toString("base64")}`;
    return dataUrl;
  } catch (error) {
    console.error("Error in upload-and-save-image:", error);
    return null;
  }
});
electron.ipcMain.handle("readFileAsBuffer", async (event, filePath) => {
  try {
    return fs.readFileSync(filePath);
  } catch (error) {
    console.error("Error reading file as buffer:", error);
    return null;
  }
});
