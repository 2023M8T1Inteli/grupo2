// Este serviço tem como objetivo gerenciar os usuários do sistema
// Inclui:
// - Tipo `User` para modelar a estrutura de dados de um usuário.
// - Objeto `users` com funções CRUD para usuários.
// - Uma função adicional `getByUsername` para buscar usuários pelo nome de usuário.
// - Cada função utiliza a função `connect` do módulo `Database.service` para interagir com o banco de dados.


import { connect } from "./Database.service";

export type User = {
  id?: number;
  username: string;
  password: string;
  role: number;
  createdAt: string;
};

export const users = {
  async insert(user: User) {
    const db = connect();
    const stmt = db.prepare(
      "INSERT INTO users (username, password, role, createdAt) VALUES (@username, @password, @role, @createdAt)",
    );
    const info = stmt.run(user);
    db.close();
    return info;
  },

  async update(user: User) {
    const db = connect();
    const stmt = db.prepare(
      "UPDATE users SET username = @username, password = @password, role = @role, createdAt = @createdAt WHERE id = @id",
    );
    const info = stmt.run(user);
    db.close();
    return info;
  },

  async delete(id: string) {
    const db = connect();
    const stmt = db.prepare("DELETE FROM users WHERE id = ?");
    const info = stmt.run(id);
    db.close();
    return info;
  },

  async get(id: string) {
    const db = connect();
    const stmt = db.prepare("SELECT * FROM users WHERE id = ?");
    const info = await stmt.get(id);
    db.close();
    return info;
  },

  async getAll() {
    const db = connect();
    const stmt = db.prepare("SELECT * FROM users");
    const info = stmt.all();
    db.close();
    return info;
  },

  async getByUsername(username: string) {
    const db = connect();
    const stmt = db.prepare("SELECT * FROM users WHERE username = ?");
    const info = stmt.get(username);
    db.close();
    return info;
  }
};
