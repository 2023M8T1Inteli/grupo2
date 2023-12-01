// Este serviço define um módulo para gerenciar os pacientes no banco de dados.
// Inclui:
// - Tipo `Patient` para modelar a estrutura de dados de um paciente.
// - Objeto `patients` com funções CRUD para pacientes.
// - Cada função utiliza a função `connect` do módulo `Database.service` para interagir com o banco de dados.


import { connect } from "./Database.service";

export type Patient = {
  id?: number;
  name: string;
  surname: string;
  birthdate: string;
  observations: string;
  createdAt: string;
  updatedAt: string;
};

export const patients = {
  async insert(patient: Patient) {
    const db = connect();
    const stmt = db.prepare(
      "INSERT INTO patients (name, surname, birthdate, observations, createdAt, updatedAt) VALUES (@name, @surname, @birthdate, @observations, @createdAt, @updatedAt)",
    );
    const info = stmt.run(patient);
    db.close();
    return info;
  },

  async update(patient: Patient) {
    const db = connect();
    const stmt = db.prepare(
      "UPDATE patients SET name = @name, surname = @surname, birthdate = @birthdate, observations = @observations, createdAt = @createdAt, updatedAt = @updatedAt WHERE id = @id",
    );
    const info = stmt.run(patient);
    db.close();
    return info;
  },

  async delete(id: string) {
    const db = connect();
    const stmt = db.prepare("DELETE FROM patients WHERE id = ?");
    const info = stmt.run(id);
    db.close();
    return info;
  },

  async get(id: string) {
    const db = connect();
    const stmt = db.prepare("SELECT * FROM patients WHERE id = ?");
    const info = await stmt.get(id);
    db.close();
    return info;
  },

  async getAll() {
    const db = connect();
    const stmt = db.prepare("SELECT * FROM patients");
    const info = stmt.all();
    db.close();
    return info;
  },
};
