const express = require("express");
const app = express();
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("BddCliniquePlus.db");

// const userModel = require('./userModel');

app.use(express.json());

// Déclaration fonction de vérification connexion
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

// envoi de la demande au serveur et de la réponse attendu pour findUserByMailAndPassword
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


// déclaration de la fonction voir tous les utilisateurs qui sont enregistrer dans la Bdd
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

//envoi de la demande au serveur et de la réponse attendu pour findAllUsers
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

//déclarer la fonction pour ajouter des utilisateurs
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

//envoi de la demande au serveur et de la réponse attendu pour addUser
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

//déclarer la fonction pour modifier le mail
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

//envoi de la demande au serveur et de la réponse attendu pour updateUserMail
app.put("/updatemail", (req, res) => {
  const {mail, id} = req.body;

  if (!id || !mail) {
    return res.status(400).json({
      success: false,
      message: "Body malformé",
    });
  }

  updateUserMail(mail, id,(user) => {
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Profil non modifié",
      });
    }
    else (user)
      return res.status(200).json({
      success: true,
      message: "Profil modifié",
      user,
    });
  });
});

//déclarer la fonction pour modifier le password
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

//envoi de la demande au serveur et de la réponse attendu pour updateUserPassword
app.put("/updatepass", (req, res) => {
  const {password, id} = req.body;

  if (!id || !password) {
    return res.status(400).json({
      success: false,
      message: "Body malformé",
    });
  }

  updateUserMail(password, id,(user) => {
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Profil non modifié",
      });
    }
    else (user)
      return res.status(200).json({
      success: true,
      message: "Profil modifié",
      user,
    });
  });
});

//déclarer la fonction pour supprimer un utilisateur
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

// déclarer la requête de suppression de l'utilisateur
app.delete("/delete/:mail", (req, res) => {
  const { mail } = req.params;  
  if (!mail) {
    return res.status(400).json({ success: false, message: "Paramètre manquant" });
  }
  
  deleteUser(mail, (err, user) => {
    if (err){
      return res.status(500).json({
        success: false,
        message: "Erreur dans la suppression utilisateur",
    })
  }
    if (user === false) {
      return res.status(400).json({
        success: false,
        message: "Utilisateur non trouvé",
      });
    
  } else if (user === true) {
    return res.status(200).json({
      success: true,
      message: "Utilisateur supprimé",
    });
  }
  });
});


//définition du port pour le seveur
app.listen(3000, () => {
  console.log("Serveur démarré sur le port 3000");
});

