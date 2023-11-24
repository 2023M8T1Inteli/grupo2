import { app, BrowserWindow, ipcMain } from "electron";
import path from "path";

import { users, User } from "./services/User.service";
import { sessions, Session } from "./services/Session.service";
import { projects, Project } from "./services/Project.service";
import { patients, Patient } from "./services/Patient.service";
import {
  clinicalConditions,
  patientsClinicalConditions,
  ClinicalCondition,
  PatientsClinicalCondition,
} from "./services/ClinicalCondition.service";

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  // and load the index.html of the app.
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(
      path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`),
    );
  }

  mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.whenReady().then(() => {
  ipcMain.handle("db:user.insert", async (_, user: User) => {
    return users.insert(user);
  });

  ipcMain.handle("db:user.update", async (_, user: User) => {
    return users.update(user);
  });

  ipcMain.handle("db:user.delete", async (_, id: string) => {
    return users.delete(id);
  });

  ipcMain.handle("db:user.get", async (_, id: string) => {
    return users.get(id);
  });

  ipcMain.handle("db:user.getAll", async () => {
    return users.getAll();
  });

  ipcMain.handle("db:user.getByUsername", async (_, username: string) => {
    return users.getByUsername(username);
  });

  ipcMain.handle("db:session.insert", async (_, session: Session) => {
    return sessions.insert(session);
  });

  ipcMain.handle("db:session.update", async (_, session: Session) => {
    return sessions.update(session);
  });

  ipcMain.handle("db:session.delete", async (_, id: string) => {
    return sessions.delete(id);
  });

  ipcMain.handle("db:session.get", async (_, id: string) => {
    return sessions.get(id);
  });

  ipcMain.handle("db:session.getAll", async () => {
    return sessions.getAll();
  });

  ipcMain.handle("db:project.insert", async (_, project: Project) => {
    return projects.insert(project);
  });

  ipcMain.handle("db:project.update", async (_, project: Project) => {
    return projects.update(project);
  });

  ipcMain.handle("db:project.delete", async (_, id: string) => {
    return projects.delete(id);
  });

  ipcMain.handle("db:project.get", async (_, id: string) => {
    return projects.get(id);
  });

  ipcMain.handle("db:project.getAll", async () => {
    return projects.getAll();
  });

  ipcMain.handle("db:patient.insert", async (_, patient: Patient) => {
    return patients.insert(patient);
  });

  ipcMain.handle("db:patient.update", async (_, patient: Patient) => {
    return patients.update(patient);
  });

  ipcMain.handle("db:patient.delete", async (_, id: string) => {
    return patients.delete(id);
  });

  ipcMain.handle("db:patient.get", async (_, id: string) => {
    return patients.get(id);
  });

  ipcMain.handle("db:patient.getAll", async () => {
    return patients.getAll();
  });

  ipcMain.handle(
    "db:clinicalCondition.insert",
    async (_, clinicalCondition: ClinicalCondition) => {
      return clinicalConditions.insert(clinicalCondition);
    },
  );

  ipcMain.handle(
    "db:clinicalCondition.update",
    async (_, clinicalCondition: ClinicalCondition) => {
      return clinicalConditions.update(clinicalCondition);
    },
  );

  ipcMain.handle("db:clinicalCondition.delete", async (_, id: string) => {
    return clinicalConditions.delete(id);
  });

  ipcMain.handle("db:clinicalCondition.get", async (_, id: string) => {
    return clinicalConditions.get(id);
  });

  ipcMain.handle("db:clinicalCondition.getAll", async () => {
    return clinicalConditions.getAll();
  });

  ipcMain.handle(
    "db:patientsClinicalCondition.insert",
    async (_, patientsClinicalCondition: PatientsClinicalCondition) => {
      return patientsClinicalConditions.insert(patientsClinicalCondition);
    },
  );

  ipcMain.handle(
    "db:patientsClinicalCondition.update",
    async (_, patientsClinicalCondition: PatientsClinicalCondition) => {
      return patientsClinicalConditions.update(patientsClinicalCondition);
    },
  );

  ipcMain.handle(
    "db:patientsClinicalCondition.delete",
    async (_, id: string) => {
      return patientsClinicalConditions.delete(id);
    },
  );

  ipcMain.handle("db:patientsClinicalCondition.get", async (_, id: string) => {
    return patientsClinicalConditions.get(id);
  });

  ipcMain.handle("db:patientsClinicalCondition.getAll", async () => {
    return patientsClinicalConditions.getAll();
  });
});

app.on("activate", () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
