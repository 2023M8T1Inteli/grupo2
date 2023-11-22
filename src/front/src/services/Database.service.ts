import Database from "better-sqlite3";
import path from "path";

export type User = {
  id?: number;
  username: string;
  password: string;
  role: number;
  createdAt: string;
};

export type ClinicalCondition = {
  id?: number;
  name: string;
};

export type PatientsClinicalCondition = {
  id?: number;
  clinicalConditionId: number;
  patientId: number;
  createdAt: string;
};

export type Patient = {
  id?: number;
  name: string;
  surname: string;
  birthdate: string;
  observations: string;
  createdAt: string;
  updatedAt: string;
};

export type Project = {
  id?: number;
  name: string;
  filePath: string;
  authorId: number;
  createdAt: string;
  updatedAt: string;
};

export type Session = {
  id?: number;
  projectId: number;
  userId: number;
  patientId: number;
  logPath: string;
  createdAt: string;
};

export function connect() {
  const db = Database(path.join(__dirname, "../db", "database.db"), {
    verbose: console.log,
    fileMustExist: true,
  });
  db.pragma("foreign_keys = ON");
  return db;
}

export function insertUser(user: User) {
  const db = connect();
  const stmt = db.prepare(
    "INSERT INTO users (username, password, role, createdAt) VALUES (@username, @password, @role, @createdAt)",
  );
  const info = stmt.run(user);
  db.close();
  return info;
}

// generate the other methods for user

export function updateUser(user: User) {
  const db = connect();
  const stmt = db.prepare(
    "UPDATE users SET username = @username, password = @password, role = @role, createdAt = @createdAt WHERE id = @id",
  );
  const info = stmt.run(user);
  db.close();
  return info;
}

export function deleteUser(id: number) {
  const db = connect();
  const stmt = db.prepare("DELETE FROM users WHERE id = ?");
  const info = stmt.run(id);
  db.close();
  return info;
}

export function getUser(id: number) {
  const db = connect();
  const stmt = db.prepare("SELECT * FROM users WHERE id = ?");
  const info = stmt.get(id);
  db.close();
  return info;
}

export function getUsers() {
  const db = connect();
  const stmt = db.prepare("SELECT * FROM users");
  const info = stmt.all();
  db.close();
  return info;
}

export function getUserByUsername(username: string) {
  const db = connect();
  const stmt = db.prepare("SELECT * FROM users WHERE username = ?");
  const info = stmt.get(username);
  db.close();
  return info;
}

export function insertClinicalCondition(clinicalCondition: ClinicalCondition) {
  const db = connect();
  const stmt = db.prepare(
    "INSERT INTO clinicalConditions (name) VALUES (@name)",
  );
  const info = stmt.run(clinicalCondition);
  db.close();
  return info;
}

export function updateClinicalCondition(clinicalCondition: ClinicalCondition) {
  const db = connect();
  const stmt = db.prepare(
    "UPDATE clinicalConditions SET name = @name WHERE id = @id",
  );
  const info = stmt.run(clinicalCondition);
  db.close();
  return info;
}

export function deleteClinicalCondition(id: number) {
  const db = connect();
  const stmt = db.prepare("DELETE FROM clinicalConditions WHERE id = ?");
  const info = stmt.run(id);
  db.close();
  return info;
}

export function getClinicalCondition(id: number) {
  const db = connect();
  const stmt = db.prepare("SELECT * FROM clinicalConditions WHERE id = ?");
  const info = stmt.get(id);
  db.close();
  return info;
}

export function getClinicalConditions() {
  const db = connect();
  const stmt = db.prepare("SELECT * FROM clinicalConditions");
  const info = stmt.all();
  db.close();
  return info;
}

export function insertPatientsClinicalCondition(
  patientsClinicalCondition: PatientsClinicalCondition,
) {
  const db = connect();
  const stmt = db.prepare(
    "INSERT INTO patientsClinicalConditions (clinicalConditionId, patientId, createdAt) VALUES (@clinicalConditionId, @patientId, @createdAt)",
  );
  const info = stmt.run(patientsClinicalCondition);
  db.close();
  return info;
}

export function updatePatientsClinicalCondition(
  patientsClinicalCondition: PatientsClinicalCondition,
) {
  const db = connect();
  const stmt = db.prepare(
    "UPDATE patientsClinicalConditions SET clinicalConditionId = @clinicalConditionId, patientId = @patientId, createdAt = @createdAt WHERE id = @id",
  );
  const info = stmt.run(patientsClinicalCondition);
  db.close();
  return info;
}

export function deletePatientsClinicalCondition(id: number) {
  const db = connect();
  const stmt = db.prepare(
    "DELETE FROM patientsClinicalConditions WHERE id = ?",
  );
  const info = stmt.run(id);
  db.close();
  return info;
}

export function getPatientsClinicalCondition(id: number) {
  const db = connect();
  const stmt = db.prepare(
    "SELECT * FROM patientsClinicalConditions WHERE id = ?",
  );
  const info = stmt.get(id);
  db.close();
  return info;
}

export function getPatientsClinicalConditions() {
  const db = connect();
  const stmt = db.prepare("SELECT * FROM patientsClinicalConditions");
  const info = stmt.all();
  db.close();
  return info;
}

export function insertPatient(patient: Patient) {
  const db = connect();
  const stmt = db.prepare(
    "INSERT INTO patients (name, surname, birthdate, observations, createdAt, updatedAt) VALUES (@name, @surname, @birthdate, @observations, @createdAt, @updatedAt)",
  );
  const info = stmt.run(patient);
  db.close();
  return info;
}

export function updatePatient(patient: Patient) {
  const db = connect();
  const stmt = db.prepare(
    "UPDATE patients SET name = @name, surname = @surname, birthdate = @birthdate, observations = @observations, createdAt = @createdAt, updatedAt = @updatedAt WHERE id = @id",
  );
  const info = stmt.run(patient);
  db.close();
  return info;
}

export function deletePatient(id: number) {
  const db = connect();
  const stmt = db.prepare("DELETE FROM patients WHERE id = ?");
  const info = stmt.run(id);
  db.close();
  return info;
}

export function getPatient(id: number) {
  const db = connect();
  const stmt = db.prepare("SELECT * FROM patients WHERE id = ?");
  const info = stmt.get(id);
  db.close();
  return info;
}

export function getPatients() {
  const db = connect();
  const stmt = db.prepare("SELECT * FROM patients");
  const info = stmt.all();
  db.close();
  return info;
}

export function insertProject(project: Project) {
  const db = connect();
  const stmt = db.prepare(
    "INSERT INTO projects (name, filePath, authorId, createdAt, updatedAt) VALUES (@name, @filePath, @authorId)",
  );
  const info = stmt.run(project);
  db.close();
  return info;
}

export function updateProject(project: Project) {
  const db = connect();
  const stmt = db.prepare(
    "UPDATE projects SET name = @name, filePath = @filePath, authorId = @authorId",
  );
  const info = stmt.run(project);
  db.close();
  return info;
}

export function deleteProject(id: number) {
  const db = connect();
  const stmt = db.prepare("DELETE FROM projects WHERE id = ?");
  const info = stmt.run(id);
  db.close();
  return info;
}

export function getProject(id: number) {
  const db = connect();
  const stmt = db.prepare("SELECT * FROM projects WHERE id = ?");
  const info = stmt.get(id);
  db.close();
  return info;
}

export function getProjects() {
  const db = connect();
  const stmt = db.prepare("SELECT * FROM projects");
  const info = stmt.all();
  db.close();
  return info;
}

export function insertSession(session: Session) {
  const db = connect();
  const stmt = db.prepare(
    "INSERT INTO sessions (projectId, userId, patientId, logPath, createdAt) VALUES (@projectId, @userId, @patientId, @logPath, @createdAt)",
  );
  const info = stmt.run(session);
  db.close();
  return info;
}

export function updateSession(session: Session) {
  const db = connect();
  const stmt = db.prepare(
    "UPDATE sessions SET projectId = @projectId, userId = @userId, patientId = @patientId, logPath = @logPath, createdAt = @createdAt WHERE id = @id",
  );
  const info = stmt.run(session);
  db.close();
  return info;
}

export function deleteSession(id: number) {
  const db = connect();
  const stmt = db.prepare("DELETE FROM sessions WHERE id = ?");
  const info = stmt.run(id);
  db.close();
  return info;
}

export function getSession(id: number) {
  const db = connect();
  const stmt = db.prepare("SELECT * FROM sessions WHERE id = ?");
  const info = stmt.get(id);
  db.close();
  return info;
}

export function getSessions() {
  const db = connect();
  const stmt = db.prepare("SELECT * FROM sessions");
  const info = stmt.all();
  db.close();
  return info;
}
