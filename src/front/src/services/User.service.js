const connect = require("./Database.service");

export function insertUser(user) {
  const db = connect();
  const stmt = db.prepare(
    "INSERT INTO users (username, password, role, createdAt) VALUES (@username, @password, @role, @createdAt)",
  );
  const info = stmt.run(user);
  db.close();
  return info;
}

// generate the other methods for user

export function updateUser(user) {
  const db = connect();
  const stmt = db.prepare(
    "UPDATE users SET username = @username, password = @password, role = @role, createdAt = @createdAt WHERE id = @id",
  );
  const info = stmt.run(user);
  db.close();
  return info;
}

export function deleteUser(id) {
  const db = connect();
  const stmt = db.prepare("DELETE FROM users WHERE id = ?");
  const info = stmt.run(id);
  db.close();
  return info;
}

export function getUser(id) {
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

export function getUserByUsername(username) {
  const db = connect();
  const stmt = db.prepare("SELECT * FROM users WHERE username = ?");
  const info = stmt.get(username);
  db.close();
  return info;
}
