// Este serviço define uma função para conectar a um banco de dados SQLite usando better-sqlite3.
// Inclui:
// - Importação do módulo better-sqlite3 e path para gerenciar o caminho do arquivo do banco de dados.
// - Função `connect` para criar e retornar uma conexão com o banco de dados, habilitando chaves estrangeiras e definindo um arquivo de banco de dados específico.


import Database from "better-sqlite3";
import path from "path";

export function connect() {
  const c_path = path.join(__dirname, "../db/", "database.sqlite");
  console.log(c_path);
  const db = Database(path.join(__dirname, "/db/", "database.sqlite"), {
    verbose: console.log,
    fileMustExist: true,
  });
  db.pragma("foreign_keys = ON");
  return db;
}
