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
        CREATE TABLE IF NOT EXISTS patients (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            mail TEXT NOT NULL UNIQUE,
            nom TEXT NOT NULL,
            prenom TEXT NOT NULL,
            NSS TEXT NOT NULL UNIQUE
        )
    `, (err) => {
        if (err) {
            console.error("Erreur création table :", err.message);
        } else {
            console.log("Table patients prête");
        }
    });

    db.run(`
        CREATE TABLE IF NOT EXISTS medecins (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nom TEXT NOT NULL,
            prenom TEXT NOT NULL,
            specialite TEXT NOT NULL
        )
    `, (err) => {
        if (err) {
            console.error("Erreur création table :", err.message);
        } else {
            console.log("Table medecins prête");
        }
    });


    db.run(`
        INSERT OR IGNORE INTO medecins  (nom, prenom, specialite)
        VALUES (?, ?, ?)
    `, ["Dupont", "Roger", "Cardiologue"], function (err) {
        if (err) {
            console.error("Erreur insertion médecins :", err.message);
        } else if (this.changes === 0) {
            console.log("Médecin existant");
        } else {
            console.log("Médecin créé");
        }
    });


    db.run(`
        INSERT OR IGNORE INTO patients (mail, nom, prenom, NSS)
        VALUES (?, ?, ?)
    `, ["Celeste@hotmail.fr", "Martin", "Céleste", "890120505"], function (err) {
        if (err) {
            console.error("Erreur insertion patients :", err.message);
        } else if (this.changes === 0) {
            console.log("Patients toujours vivant");
        } else {
            console.log("Patients créé");
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