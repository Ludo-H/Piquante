// Importer express
const express = require("express");

// On importe du controller user
const sauceController = require("../controllers/sauce")
// On peut aussi utiliser une autre syntaxe, qui permet d'importer seulement les fonctions dont on a besoin d'un fichier
// Ici on a besoin de toutes donc pas utile
// const {getAllSauces, getOneSauce, createSauce, modifySauce, deleteSauce, likeSauce} = require("../controllers/sauce")
// Il faut ensuite supprimer saucecontroller des routes

// On importe le middleware d'authentification
const authentification = require('../middleware/authentification');

// Importation de multer pour gérer les images
const multer = require("../middleware/multer");

// On utilise router de express
const router = express.Router();

// Les routes
// Route pour afficher toutes les sauces : GET /api/sauces
router.get("/", authentification, sauceController.getAllSauces);

// Route pour afficher la sauce cliquée : GET /api/sauces/:id
router.get("/:id", authentification, sauceController.getOneSauce)

// Route pour créer une sauce dans la BDD : POST /api/sauces 
router.post("/", authentification, multer, sauceController.createSauce);

// Route pour modifier la sauce créée : PUT /api/sauces/:id
router.put("/:id", authentification, multer, sauceController.modifySauce)

// Route pour supprimer une sauce créée : DELETE /api/sauces/:id
router.delete("/:id", authentification, sauceController.deleteSauce)

// Route pour ajouter un likie/dislike : POST /api/sauces/:id/like
router.post("/:id/like", authentification, sauceController.likeSauce)


// Exporter le module
module.exports = router;