import { connect } from "./Database.service";

export type Session = {
  id?: number;
  projectId: number;
  userId: number;
  patientId: number;
  logPath: string;
  createdAt: string;
};

export const sessions = {
  async insert(session: Session) {
    const db = connect();
    const stmt = db.prepare(
      "INSERT INTO sessions (projectId, userId, patientId, logPath, createdAt) VALUES (@projectId, @userId, @patientId, @logPath, @createdAt)",
    );
    const info = stmt.run(session);
    db.close();
    return info;
  },

  async update(session: Session) {
    const db = connect();
    const stmt = db.prepare(
      "UPDATE sessions SET projectId = @projectId, userId = @userId, patientId = @patientId, logPath = @logPath, createdAt = @createdAt WHERE id = @id",
    );
    const info = stmt.run(session);
    db.close();
    return info;
  },

  async delete(id: string) {
    const db = connect();
    const stmt = db.prepare("DELETE FROM sessions WHERE id = ?");
    const info = stmt.run(id);
    db.close();
    return info;
  },

  async get(id: string) {
    const db = connect();
    const stmt = db.prepare("SELECT * FROM sessions WHERE id = ?");
    const info = await stmt.get(id);
    db.close();
    return info;
  },

  async getAll() {
    const db = connect();
    const stmt = db.prepare("SELECT * FROM sessions");
    const info = stmt.all();
    db.close();
    return info;
  },
};
