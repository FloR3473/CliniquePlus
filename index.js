const express = require("express");
const app = express();
const router = express.Router();
const userRouters = require ("./userRouters");

app.use(express.json());

app.use (userRouters)

app.use (router)

//définition du port pour le seveur
app.listen(3000, () => {
  console.log("Serveur démarré sur le port 3000");
});

