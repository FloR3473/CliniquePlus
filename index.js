const express = require("express");
const app = express();

const userModel = require('./userModel');

app.use(express.json());

// Déclaration fonction de vérification connexion

// envoi de la demande au serveur et de la réponse attendu pour findUserByMailAndPassword
app.post("/login", (req, res) => {
  if (!req.body) {
    return res.status(400).json({ success: false, message: "Body manquant" });
  }

  const { mail, password } = req.body;

  if (!mail || !password) {
    return res.status(400).json({ success: false, message: "Body malformé" });
  }

  userModel.findUserByMailAndPassword(
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

//envoi de la demande au serveur et de la réponse attendu pour findAllUsers
app.get("/users", (req, res) => {

  userModel.findAllUsers(
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


//envoi de la demande au serveur et de la réponse attendu pour addUser
app.post("/register", (req, res) => {
  const { mail, password, role } = req.body;

  if (!mail || !password || !role) {
    return res.status(400).json({
      success: false,
      message: "Body malformé",
    });
  }

 userModel.addUser(mail, password, role, (user) => {
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

//envoi de la demande au serveur et de la réponse attendu pour updateUserMail
app.put("/updatemail", (req, res) => {
  const {mail, id} = req.body;

  if (!id || !mail) {
    return res.status(400).json({
      success: false,
      message: "Body malformé",
    });
  }

  userModel.updateUserMail(mail, id,(user) => {
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


//envoi de la demande au serveur et de la réponse attendu pour updateUserPassword
app.put("/updatepass", (req, res) => {
  const {password, id} = req.body;

  if (!id || !password) {
    return res.status(400).json({
      success: false,
      message: "Body malformé",
    });
  }

  userModel.updateUserMail(password, id,(user) => {
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

// déclarer la requête de suppression de l'utilisateur
app.delete("/delete/:mail", (req, res) => {
  const { mail } = req.params;  
  if (!mail) {
    return res.status(400).json({ success: false, message: "Paramètre manquant" });
  }
  
 userModel.deleteUser(mail, (err, user) => {
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

