// Ici on va créer les routes en lien avec User, donc signup et login

// Importer Express pour utiliser la fonction router
const express = require("express");

// Importation middleware password
const password = require("../middleware/password");

// Importation du middleware emailValidator
const emailValidator = require("../middleware/emailValidator");

// On importe du controller user
const userController = require("../controllers/user")

// On utilise router de express
const router = express.Router();

// La route de signup
// On rajoute password qui va vérifier si le MDP est fort (voir middleware/password) et diriger ou non vers le controller qui créé un user dans la BDD
router.post("/signup",  emailValidator, password, userController.signup);


// La route login
router.post("/login", userController.login);


// Exporter le module
module.exports = router;