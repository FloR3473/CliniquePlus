# CliniquePlus
# Le projet
CliniquePlus est une clinique privée en cours de modernisation. 

Le directeur souhaite savoir si une application web interne pourrait aider la clinique à centraliser certaines informations et automatiser progressivement des tâches simples.

Il reste toutefois prudent : avant d’investir dans une solution complète ou de faire appel à une ESN, il nous demande de produire une première preuve de concept.

Pour cela, nous allons créer une API simple, structurée et extensible.

# L'installation
Installer node js :
Il faut tout d'abord s'assurer que Node.js est installé sur le système en exécutant la commande suivante dans votre terminal :
```bash
node -v
```

Si Node.js n’est pas installé, vous pouvez le télécharger et l’installer à partir de nodejs.org.

Créer un dossier correspondant à votre dossier. Puis, initialiser node dans votre dossier :
```bash
npm init -y
```
Cela créera un fichier package.json avec les paramètres par défaut.

Installer Express :
Il vous faut ensuite installer Express :
```bash
npm install express
```

Installer SQLite :
Ensuite, vous devez installer la bibliothèque sqlite3, qui vous permettra de manipuler des bases de données SQLite dans Node.js.
```bash
npm install sqlite3
```

# Initialisation de la base de données
Initialiser la base de données en lançant le script présent dans le fichier initBdd.js :
Dans le terminal :
```bash
node initBdd.js
```

# Routes utilisables
| Methode | Route | Utilisation | Exemple |
| --- | --- | --- | --- |
| POST | `/register`| Ajouter un utilisateur à la base de données | `{"mail" : exemple@cliniqueplus.fr, "password" : "azerty", "role" : "Staff"}` |
| POST | `/login`| Vérifier la connexion d'un utilisateur | `{"mail" : exemple@cliniqueplus.fr, "password" : "azerty"}`|
| GET | `/users`| Trouver tous les utilisateurs | |
| PUT | `/updatemail`| Modifier le mail d'un utilisateur | `{"mail" : exemple@cliniqueplus.fr, "id" : "1"}`|
| PUT | `/updatepass`| Modifier le mot de passe d'un utilisateur | `{"password" : "azerty", "id" : "1"}`|
| DELETE | `/delete/:mail`| Supprimer un utilisateur | |