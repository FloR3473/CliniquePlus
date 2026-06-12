const express = require("express");
const app = express();
const router = express.Router();
const userControler = require ("./userControler");


app.use(express.json());

router.post("/login",userControler.findUserByMailAndPassword)

router.get("/users",userControler.findAllUsers)

router.post("/register",userControler.addUser)

router.put("/updatemail",userControler.updateUserMail)

router.put("/updatepass",userControler.updateUserPassword)

router.delete("/delete/:mail",userControler.deleteUser)


app.use (router)
//définition du port pour le seveur
app.listen(3000, () => {
  console.log("Serveur démarré sur le port 3000");
});

