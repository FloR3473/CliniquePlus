//Importer les fonctions présentes dans userModel.js
const userModel= require("./userModel");

//Déclaration de la requête pour vérifier la connexion d'un utilisateur
function findUserByMailAndPassword (req, res) {
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
};


//Déclaration de la requête voir tous les utilisateurs qui sont enregistrer dans la Bdd
function findAllUsers (req, res) {

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
};

//Déclaration de la requête pour ajouter des utilisateurs
async function addUser (req, res) {
  const { mail, password, role } = req.body;

  if (!mail || !password || !role) {
    return res.status(400).json({
      success: false,
      message: "Body malformé",
    });
  }

 await userModel.addUser(mail, password, role, (user) => {
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
};

//Déclaration de la requête pour modifier le mail de l'utilisateur
function updateUserMail (req, res)  {
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
};

//Déclaration de la requête pour modifier le password de l'utilisateur
function updateUserPassword (req, res) {
  const {password, id} = req.body;

  if (!id || !password) {
    return res.status(400).json({
      success: false,
      message: "Body malformé",
    });
  }

  userModel.updateUserPassword(password, id,(user) => {
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
};

// Déclaration de la requête pour supprimer un utilisateur
function deleteUser(req, res) {
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
};


module.exports = { findUserByMailAndPassword, findAllUsers, addUser, updateUserMail, updateUserPassword, deleteUser} ;