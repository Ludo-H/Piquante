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


// On veut transformer le corps (body) de la requete en json
// On installe body-parser APRES EXPRESS
// On importe BP
const bodyParser = require('body-parser');


// On utilise app.use pour toutes les routes, la méthode prend en paramètre "req(requete), res(response), next(fonction pour passer au middleware suivant)"
// Req : Contenu de ce qu'envoi le navigateur/client au server
// Res : Réponse du server à la Req du client
// Next : Fonction pour passer au middleware suivant


// On gère le CORS (on peut avoir des bug si le FE est sur un server et le BE sur un autre, le cas pour ce projet)
// Avec ce code on accepte toutes les requetes de différents server sur notre API
app.use((req, res, next)=>{
    res.setHeader("Access-Control-Allow-Origin", "*"); // Les requetes d'autres server peuvent venir
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next(); // On passe au prochain middleware
});


// On transforme le body en json
app.use(bodyParser.json());


// On exporte cette app pour pouvoir y accéder de partout
module.exports = app;
