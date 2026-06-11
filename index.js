const express = require("express");
const app = express();
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("BddCliniquePlus.db");

// const userModel = require('./userModel');

app.use(express.json());

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

app.post("/login", (req, res) => {
  if (!req.body) {
    return res.status(400).json({ success: false, message: "Body manquant" });
  }

  const { mail, password } = req.body;

  if (!mail || !password) {
    return res.status(400).json({ success: false, message: "Body malformé" });
  }

  findUserByMailAndPassword(
    mail,
    password,
    (user) => {
      if (user) {
        return res.status(200).json({
          success: true,
          message: "connexion OK",
          user,
        });
      } else {
        return res
          .status(400)
          .json({ success: false, message: "Identifiants incorrects" });
      }
    },
  );
});



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

app.get("/users", (req, res) => {

  findAllUsers(
    (user) => {
      if (user) {
        return res.status(200).json({
          success: true,
          message: "Tous les utilisateurs trouvés",
          user,
        });
      } else {
        return res
          .status(400)
          .json({ success: false, message: "Utilisateurs non trouvés" });
      }
    },
  );
});



app.listen(3000, () => {
  console.log("Serveur démarré sur le port 3000");
});
