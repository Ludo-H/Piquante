// Un serveur sert à faire tourner quelque chose deçu, notre app
// Lorsque FE envoie une requete avec fetch, pour accéder a API, elle passera obligatoirement par le server
// Elle est ensuite envoyée dans l'app
// On importe beaucoup de paquets npm pour les utiliser par la suite, il faudra les stocker une fois installer
// Un code minimal est exigé pour faire fonctionner un serveur
// Installer aussi npm sur le front, et npm run start pour afficher le site. Toujours avoir un terminal qui exécute start
// Pour la sécurité, installer helmet, validator, bcrypt


// Pour lancer le serveur : "nodemon server" ou voir README, dans la partie back dans le terminal

// Importer le package HTTP (déjà installé sur Node) pour avoir les outils pour créer le server
const http = require("http");

// Importer l'application
const app = require('./app');

// Importer dotenv pour utiliser les variables d'environnement, les fonctions permettent de lier les deux docs
const dotenv = require("dotenv");
const result = dotenv.config();

// Paramétrage du port avec la méthode set de Express, process.env pour aller chercher les variables de .env, ici on veut utiliser PORT qui a sa value dans .env
app.set("port", process.env.PORT);

// création du server avec la méthode createServer() qui prend un argument
// La fonction sera appelée à chaque requète reçu par le server
// Les fonctions des requètes reçu sont dans app.js
const server = http.createServer(app);

// Le server est à l'écoute des requètes de ce port
server.listen(process.env.PORT);