const express = require("express");
const app = express();

const users = [
    { mail: "Alice@gmail.com", id: 0, pass: "azerty" },
    { mail: "Bob@gmail.com", id: 1, pass: "qwerty" },
    { mail: "Charlie@gmail.com", id: 2, pass: "qwertz" },
]

app.use(express.json())


app.post("/login", (req,res) =>{
    if (!req.body){
        return res.status(400).json({success: false, message:"Body manquant"});
    }
    const {mail, password} = req.body;
    if (users.find((user) => user.mail == mail && user.pass == password)){
        return res.status(200).json({success: true, message:"Connexion authorisée"});
    } else {
        return res.status(401).json({success: false, message:"Connexion refusée"});
        }
    }
)

app.listen(3000, () => {
    console.log("Serveur démarré sur le port 3000");
});
