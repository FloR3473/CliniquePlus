
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("BddCliniquePlus.db");


function findUserByMailAndPassword(mail, password, callback) {
  const sql =
    "SELECT id, mail, role FROM users WHERE mail = ? AND password = ?";

  db.get(sql, [mail, password], (err, user) => {
    if (err) {
      return callback(null);
    }
    callback(user);
  });
}

function findAllUsers(callback) {
  const sql =
    "SELECT id, mail, role FROM users";

  db.all(sql, (err, user) => {
    if (err) {
      return callback(null);
    }
    callback(user);
  });
}

function addUser(mail, password, role, callback) {
  const sql =
    "INSERT OR IGNORE INTO users (mail, password, role) VALUES (?, ?, ?)";

  db.run(sql, [mail, password, role], function (err) {
    if (err) {
      console.error("Erreur insertion utilisateur :", err.message);
      return callback(null);
    }

    if (this.changes === 0) {
      console.log("Utilisateur déjà existant");
      return callback(null);
    }

    console.log("Utilisateur créé");
    return callback({
      id: this.lastID,
      mail,
      role,
    });
  });
}

function updateUserMail(mail,id,callback) {
  const sql =
    "UPDATE users SET mail = ? WHERE id =?";

  db.run(sql, [mail,id], function (err) {
    if (err) {
      console.error("Erreur modification mail :", err.message);
    return callback(null);
    }

    if (this.changes === 0) {
      console.log("Mail non modifié");
    return callback(null);
    }

    console.log("Mail modifié");
    return callback({
      id,
      mail
    });
  });
}

function updateUserPassword(password,id,callback) {
  const sql =
    "UPDATE users SET password = ? WHERE id =?";

  db.run(sql, [password,id], function (err) {
    if (err) {
      console.error("Erreur modification password :", err.message);
    return callback(null);
    }

    if (this.changes === 0) {
      console.log("Password non modifié");
    return callback(null);
    }

    console.log("Password modifié");
    return callback({
      id,
      password
    });
  });
}

function deleteUser(mail, callback) {
  const sql = "DELETE FROM users WHERE mail = ?";

  db.run(sql, [mail], function (err) {
    if (err) {
      console.error("Erreur dans la suppression utilisateur :", err.message);
      return callback(err, null);
    }

    if (this.changes === 0) {
      console.log("Aucun utilisateur trouvé");
      return callback(null, false);
    }

    console.log("Utilisateur supprimé");
    return callback(null, true);
  });
}


module.exports = { findUserByMailAndPassword, findAllUsers, addUser, updateUserMail, updateUserPassword, deleteUser} ;