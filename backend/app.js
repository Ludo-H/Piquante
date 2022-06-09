// Constitué des routes générales, la requète est redirigée vers routes selon son type
// Exemple : /api/authentification/userRoutes(signup ou login)/code du controller
// Tous les fichiers sont liés entre eux selon la requete effectué
// Modele de donnée, début d'URI dans app, ditection vers Routes correspondante, direction vers controller correspondant
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

// On installe et ajout helmet pour sécuriser "en configurant de manière appropriée des en-têtes HTTP."
const helmet = require('helmet');


// Permet de créer une application express
const app = express();

// On importe la BDD
const mongoose = require("./database/database");

// On importe dotenv pour l'utiliser dans l'adresse de la BDD
require('dotenv').config();


// On importe les routes
const userRoutes = require("./routes/user");
const sauceRoutes = require("./routes/sauce");

// Importation node de path (deja dans node) pour travailler avec les chemins de fichiers et de répertoires
const path = require("path");

// On veut transformer le corps (body) de la requete en json
// On transforme le body en json
app.use(express.json());



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


// On créé la route d'authentification
app.use("/api/auth", userRoutes);

// On créé la route pour les sauces
app.use("/api/sauces", sauceRoutes);

// On créé la route pour accéder aux images postées
app.use("/images", express.static(path.join(__dirname, "images")));

// Utiliser helmet à la fin, problemes d'affichage d'images rencontrés si fonction plus haut
app.use(helmet());

// On exporte cette app pour pouvoir y accéder de partout
module.exports = app;
