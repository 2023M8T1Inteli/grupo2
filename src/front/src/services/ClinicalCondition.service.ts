import { connect } from "./Database.service";

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

export const clinicalConditions = {
  async insert(clinicalCondition: ClinicalCondition) {
    const db = connect();
    const stmt = db.prepare(
      "INSERT INTO clinicalConditions (name) VALUES (@name)",
    );
    const info = stmt.run(clinicalCondition);
    db.close();
    return info;
  },

  async update(clinicalCondition: ClinicalCondition) {
    const db = connect();
    const stmt = db.prepare(
      "UPDATE clinicalConditions SET name = @name WHERE id = @id",
    );
    const info = stmt.run(clinicalCondition);
    db.close();
    return info;
  },

  async delete(id: string) {
    const db = connect();
    const stmt = db.prepare("DELETE FROM clinicalConditions WHERE id = ?");
    const info = stmt.run(id);
    db.close();
    return info;
  },

  async get(id: string) {
    const db = connect();
    const stmt = db.prepare("SELECT * FROM clinicalConditions WHERE id = ?");
    const info = await stmt.get(id);
    db.close();
    return info;
  },

  async getAll() {
    const db = connect();
    const stmt = db.prepare("SELECT * FROM clinicalConditions");
    const info = stmt.all();
    db.close();
    return info;
  },
};

export const patientsClinicalConditions = {
  async insert(patientsClinicalCondition: PatientsClinicalCondition) {
    const db = connect();
    const stmt = db.prepare(
      "INSERT INTO patientsClinicalConditions (clinicalConditionId, patientId, createdAt) VALUES (@clinicalConditionId, @patientId, @createdAt)",
    );
    const info = stmt.run(patientsClinicalCondition);
    db.close();
    return info;
  },

  async update(patientsClinicalCondition: PatientsClinicalCondition) {
    const db = connect();
    const stmt = db.prepare(
      "UPDATE patientsClinicalConditions SET clinicalConditionId = @clinicalConditionId, patientId = @patientId, createdAt = @createdAt WHERE id = @id",
    );
    const info = stmt.run(patientsClinicalCondition);
    db.close();
    return info;
  },

  async delete(id: string) {
    const db = connect();
    const stmt = db.prepare(
      "DELETE FROM patientsClinicalConditions WHERE id = ?",
    );
    const info = stmt.run(id);
    db.close();
    return info;
  },

  async get(id: string) {
    const db = connect();
    const stmt = db.prepare(
      "SELECT * FROM patientsClinicalConditions WHERE id = ?",
    );
    const info = await stmt.get(id);
    db.close();
    return info;
  },

  async getAll() {
    const db = connect();
    const stmt = db.prepare("SELECT * FROM patientsClinicalConditions");
    const info = stmt.all();
    db.close();
    return info;
  },
};
