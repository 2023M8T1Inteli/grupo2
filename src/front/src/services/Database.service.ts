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
