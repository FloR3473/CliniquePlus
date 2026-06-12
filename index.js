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



// ajouter un utlisateur
//déclarer la fonction
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
// déclarer la requête 


app.post("/register", (req, res) => {
  const { mail, password, role } = req.body;

  if (!mail || !password || !role) {
    return res.status(400).json({
      success: false,
      message: "Body malformé",
    });
  }

  addUser(mail, password, role, (user) => {
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Utilisateur déjà existant",
      });
    }

    return res.status(201).json({
      success: true,
      message: "profil créé",
      user,
    });
  });
});



app.listen(3000, () => {
  console.log("Serveur démarré sur le port 3000");
});