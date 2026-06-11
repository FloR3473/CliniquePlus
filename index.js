const express = require("express");
const app = express();
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('BddCliniquePlus.db')

app.use(express.json())


app.post("/login", (req,res) =>{
    if (!req.body){
        return res.status(400).json({success: false, message:"Body manquant"});
    }
    const {mail, password} = req.body;
    
    const sql = "SELECT id, mail, role FROM users WHERE mail = ? AND password = ?";

    db.get(sql, [mail, password], (err, user) => {
        if (err) return res.status(500).json({ message: "Erreur serveur" });
        if (user) {
            res.json({ message: "Connexion réussie", user });
        } else {
            res.status(401).json({ message: "Identifiants invalides" });
        }
        });
});

app.listen(3000, () => {
    console.log("Serveur démarré sur le port 3000");
});