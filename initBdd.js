const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("BddCliniquePlus.db", (err) => {
    if (err) {
        console.error("Erreur de connexion :", err.message);
        return;
    }

    console.log("Connexion à la base réussie");
});

db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            mail TEXT NOT NULL UNIQUE,
            password TEXT NOT NULL,
            role TEXT NOT NULL
        )
    `, (err) => {
        if (err) {
            console.error("Erreur création table :", err.message);
        } else {
            console.log("Table users prête");
        }
    });

    db.run(`
        INSERT OR IGNORE INTO users (mail, password, role)
        VALUES (?, ?, ?)
    `, ["admin@cliniqueplus.fr", "azerty", "admin"], function (err) {
        if (err) {
            console.error("Erreur insertion admin :", err.message);
        } else if (this.changes === 0) {
            console.log("Admin déjà existant");
        } else {
            console.log("Admin créé");
        }
    });

    db.all(`SELECT id, mail, role FROM users`, (err, rows) => {
        if (err) {
            console.error("Erreur lecture users :", err.message);
        } else {
            console.log("Utilisateurs en base :");
            console.table(rows);
        }
    });
});

db.close((err) => {
    if (err) {
        console.error("Erreur fermeture base :", err.message);
    } else {
        console.log("Connexion fermée");
    }
});