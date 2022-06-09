// On va créer un schema qui reprend les renseignements de l'utilisateur
// Importation de Mongoose
const mongoose = require('mongoose');

// On fait le schema des sauces qui vont être ajoutées
const sauceSchema = mongoose.Schema({
     // ID de l'user dans la BDD
     userId: {type: String, required: true},
     // Nom que va avoir la sauce
     // On peut mettre des messages d'erreur et conditions pour éviter les regex coté FE
     // Exemple : name: {type: String, minlength: [2, "Nom trop court"], maxlength: [15, "Nom trop long"], required: [true, "Nom requis"]}
     name: {type: String, required: true},
     // fabricant de la sauce
     manufacturer: {type: String, required: true},
     // Sa description
     description: {type: String, required: true},
     // Ingrédient principal
     mainPepper: {type: String, required: true},
     // Image de la sauce
     imageUrl: {type: String, required: true},
     // Puissance de la sauce entre 1 et 10
     heat: {type: Number, required: true},
     // Va afficher le nombre d'utilisateurs qui aiment la sauce, la valeur par défaut permet d'afficher un début
     likes: {type: Number, required:true, default:0},
     // Va afficher le nombre d'utilisateurs qui n'aiment pas la sauce
     dislikes: {type: Number, required:true, default:0},
     // Tableau qui va reprendre le nom des gens qui ont aimé
     usersLiked: {type: [String], required:true, default:[]},
     // Tableau qui va reprendre le nom des gens qui n'ont pas aimé
     usersDisliked: {type: [String], required: true, default:[]}
});

// On peut rajouter un timestamp pour avoir la date de création et de mise à jour

// On exporte le module schema
module.exports = mongoose.model('Sauce', sauceSchema);