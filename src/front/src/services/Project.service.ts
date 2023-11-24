import { connect } from "./Database.service";

export type Project = {
  id?: number;
  name: string;
  filePath: string;
  authorId: number;
  createdAt: string;
  updatedAt: string;
};

export const projects = {
  async insert(project: Project) {
    const db = connect();
    const stmt = db.prepare(
      "INSERT INTO projects (name, filePath, authorId, createdAt, updatedAt) VALUES (@name, @filePath, @author)",
    );
    const info = stmt.run(project);
    db.close();
    return info;
  },

  async update(project: Project) {
    const db = connect();
    const stmt = db.prepare(
      "UPDATE projects SET name = @name, filePath = @filePath, authorId = @author",
    );
    const info = stmt.run(project);
    db.close();
    return info;
  },

  async delete(id: string) {
    const db = connect();
    const stmt = db.prepare("DELETE FROM projects WHERE id = ?");
    const info = stmt.run(id);
    db.close();
    return info;
  },

  async get(id: string) {
    const db = connect();
    const stmt = db.prepare("SELECT * FROM projects WHERE id = ?");
    const info = await stmt.get(id);
    db.close();
    return info;
  },

  async getAll() {
    const db = connect();
    const stmt = db.prepare("SELECT * FROM projects");
    const info = stmt.all();
    db.close();
    return info;
  },
};
