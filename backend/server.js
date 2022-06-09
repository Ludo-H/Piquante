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
require("dotenv").config();


// Paramétrage du port avec la méthode set de Express, process.env pour aller chercher les variables de .env, ici on veut utiliser PORT qui a sa value dans .env
// app.set("port", process.env.PORT);


//************************************************************************************************ */
const normalizePort = val => {
    const port = parseInt(val, 10);
  
    if (isNaN(port)) {
      return val;
    }
    if (port >= 0) {
      return port;
    }
    return false;
};


const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);
  
const errorHandler = error => {
    if (error.syscall !== 'listen') {
      throw error;
    }
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
    switch (error.code) {
      case 'EACCES':
        console.error(bind + ' requires elevated privileges.');
        process.exit(1);
        break;
      case 'EADDRINUSE':
        console.error(bind + ' is already in use.');
        process.exit(1);
        break;
      default:
        throw error;
    }
};
//********************************************************************************* */

// création du server avec la méthode createServer() qui prend un argument
// La fonction sera appelée à chaque requète reçu par le server
// Les fonctions des requètes reçu sont dans app.js
const server = http.createServer(app);

//*************************************************************************** */
server.on('error', errorHandler);
server.on('listening', () => {
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
  console.log('Listening on ' + bind);
});
//*************************************************************************** */

// Le server est à l'écoute des requètes de ce port
server.listen(port);


//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
// nodemon server sur le back
// npm run start sur le front
// MongoDB, postman