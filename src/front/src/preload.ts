// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import {
  contextBridge,
  ipcRenderer,
  IpcRendererEvent,
  Session,
} from "electron";
import {
  ClinicalCondition,
  PatientsClinicalCondition,
} from "./services/ClinicalCondition.service";

import { Patient } from "./services/Patient.service";
import { Project } from "./services/Project.service";
import { User } from "./services/User.service";

const electronHandler = {
  ipcRenderer: {
    sendMessage(channel: string, ...args: unknown[]) {
      ipcRenderer.send(channel, ...args);
    },
    on(channel: string, func: (...args: unknown[]) => void) {
      const subscription = (_event: IpcRendererEvent, ...args: unknown[]) =>
        func(...args);
      ipcRenderer.on(channel, subscription);

      return () => {
        ipcRenderer.removeListener(channel, subscription);
      };
    },
    once(channel: string, func: (...args: unknown[]) => void) {
      ipcRenderer.once(channel, (_event, ...args) => func(...args));
    },
  },

  // User methods
  users: {
    getAll: () => ipcRenderer.invoke("db:user.getAll"),
    get: (id: string) => ipcRenderer.invoke("db:user.get", id),
    getByUsername: (username: string) =>
      ipcRenderer.invoke("db:user.getByUsername", username),
    insert: (user: User) => ipcRenderer.invoke("db:user.insert", user),
    update: (user: User) => ipcRenderer.invoke("db:user.update", user),
    delete: (id: string) => ipcRenderer.invoke("db:user.delete", id),
  },

  // Session methods
  sessions: {
    getAll: () => ipcRenderer.invoke("db:session.getAll"),
    get: (id: string) => ipcRenderer.invoke("db:session.get", id),
    insert: (session: Session) =>
      ipcRenderer.invoke("db:session.insert", session),
    update: (session: Session) =>
      ipcRenderer.invoke("db:session.update", session),
    delete: (id: string) => ipcRenderer.invoke("db:session.delete", id),
  },

  // Project methods
  projects: {
    getAll: () => ipcRenderer.invoke("db:project.getAll"),
    get: (id: string) => ipcRenderer.invoke("db:project.get", id),
    insert: (project: Project) =>
      ipcRenderer.invoke("db:project.insert", project),
    update: (project: Project) =>
      ipcRenderer.invoke("db:project.update", project),
    delete: (id: string) => ipcRenderer.invoke("db:project.delete", id),
  },

  // Patient methods
  patients: {
    getAll: () => ipcRenderer.invoke("db:patient.getAll"),
    get: (id: string) => ipcRenderer.invoke("db:patient.get", id),
    insert: (patient: Patient) =>
      ipcRenderer.invoke("db:patient.insert", patient),
    update: (patient: Patient) =>
      ipcRenderer.invoke("db:patient.update", patient),
    delete: (id: string) => ipcRenderer.invoke("db:patient.delete", id),
  },

  // ClinicalCondition methods
  clinicalConditions: {
    getAll: () => ipcRenderer.invoke("db:clinicalCondition.getAll"),
    get: (id: string) => ipcRenderer.invoke("db:clinicalCondition.get", id),
    insert: (clinicalCondition: ClinicalCondition) =>
      ipcRenderer.invoke("db:clinicalCondition.insert", clinicalCondition),
    update: (clinicalCondition: ClinicalCondition) =>
      ipcRenderer.invoke("db:clinicalCondition.update", clinicalCondition),
    delete: (id: string) =>
      ipcRenderer.invoke("db:clinicalCondition.delete", id),
  },

  // PatientsClinicalCondition methods
  patientsClinicalConditions: {
    getAll: () => ipcRenderer.invoke("db:patientsClinicalCondition.getAll"),
    get: (id: string) =>
      ipcRenderer.invoke("db:patientsClinicalCondition.get", id),
    insert: (patientsClinicalCondition: PatientsClinicalCondition) =>
      ipcRenderer.invoke(
        "db:patientsClinicalCondition.insert",
        patientsClinicalCondition,
      ),
    update: (patientsClinicalCondition: PatientsClinicalCondition) =>
      ipcRenderer.invoke(
        "db:patientsClinicalCondition.update",
        patientsClinicalCondition,
      ),
    delete: (id: string) =>
      ipcRenderer.invoke("db:patientsClinicalCondition.delete", id),
  },
};

contextBridge.exposeInMainWorld("electron", electronHandler);
export type ElectronHandler = typeof electronHandler;
