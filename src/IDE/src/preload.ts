// Este arquivo do electron define um manipulador para a integração entre processos do "frontend" e do "backend".
// Inclui:
// - Importações do Electron, como contextBridge e ipcRenderer, para comunicação entre processos.
// - Definição de tipos importados de serviços, como Patient, Project, User, etc.
// - Objeto `electronHandler` que encapsula métodos para comunicação interprocesso usando ipcRenderer:
//    - Métodos para enviar e receber mensagens através de canais específicos.
//    - Métodos CRUD para diferentes entidades (usuários, sessões, projetos, pacientes, condições clínicas, condições clínicas de pacientes).
//    - Método `processCode` para processar código usando o módulo `Python.bridge` (compilador).

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

  // Métodos do usuário
  users: {
    getAll: () => ipcRenderer.invoke("db:user.getAll"),
    get: (id: string) => ipcRenderer.invoke("db:user.get", id),
    getByUsername: (username: string) =>
      ipcRenderer.invoke("db:user.getByUsername", username),
    insert: (user: User) => ipcRenderer.invoke("db:user.insert", user),
    update: (user: User) => ipcRenderer.invoke("db:user.update", user),
    delete: (id: string) => ipcRenderer.invoke("db:user.delete", id),
  },

  // Métodos de uma sessão
  sessions: {
    getAll: () => ipcRenderer.invoke("db:session.getAll"),
    get: (id: string) => ipcRenderer.invoke("db:session.get", id),
    insert: (session: Session) =>
      ipcRenderer.invoke("db:session.insert", session),
    update: (session: Session) =>
      ipcRenderer.invoke("db:session.update", session),
    delete: (id: string) => ipcRenderer.invoke("db:session.delete", id),
  },

  // Métodos de um projeto
  projects: {
    getAll: () => ipcRenderer.invoke("db:project.getAll"),
    get: (id: string) => ipcRenderer.invoke("db:project.get", id),
    insert: (project: Project) =>
      ipcRenderer.invoke("db:project.insert", project),
    update: (project: Project) =>
      ipcRenderer.invoke("db:project.update", project),
    delete: (id: string) => ipcRenderer.invoke("db:project.delete", id),
  },

  // Métodos de um paciente
  patients: {
    getAll: () => ipcRenderer.invoke("db:patient.getAll"),
    get: (id: string) => ipcRenderer.invoke("db:patient.get", id),
    insert: (patient: Patient) =>
      ipcRenderer.invoke("db:patient.insert", patient),
    update: (patient: Patient) =>
      ipcRenderer.invoke("db:patient.update", patient),
    delete: (id: string) => ipcRenderer.invoke("db:patient.delete", id),
  },

  // Método de condições clínicas
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

  // Método de condições clínicas de pacientes
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

  // Método para processar código no compilador
  codeBridge: {
    processCode: (code: string) => ipcRenderer.invoke("code:process", code),
  },
};

contextBridge.exposeInMainWorld("electron", electronHandler);
export type ElectronHandler = typeof electronHandler;