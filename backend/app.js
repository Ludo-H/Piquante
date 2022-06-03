// Constitué des routes générales, la requète est redirigée vers routes selon son type
// Le dossier routes aiguille la requète dans middleware en suivant
// Middleware contient des fonctions qui vont se positionnées entre la route et controller, le middleware et sa fonction vérifie si une personne est bien autorisée à poster sur un compte.
// Une fois que c'est validé par le middleware, la requète est envoyée dans controllers.
// Controllers contient la logique CRUD, sur une base de données. Controllers exécute des fonctions pour interragir avec une BDD
// Database contient la BDD
// Images contient les images en mouvements
// Docs contiendra la doc pour pouvoir faire fonctionner les routes
// Models instaure le format des données pour écrire dans la BDD

// Importer express
const express = require("express");

// Permet de créer une application express
const app = express();

// Importer la BDD du fichier database
const mongoose = require("./database/database");

// On utilise app.use pour toutes les routes, la méthode prend en paramètre "req(requete), res(response), next(fonction pour passer au middleware suivant)"
app.use((req, res, next)=>{
    res.status(202);
    res.json({message: 'Coucou !'});
});


// On exporte cette app pour pouvoir y accéder de partout
module.exports = app;
