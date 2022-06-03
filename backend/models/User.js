// Le principe du ficher model est de créer des schema de données qui vont être envoyés dans la BDD de façon exploitable
// On veut créer des schémas de données qui va servir à envoyer des données dans la BDD (obligatoire pour pouvoir envoyer sur MongoDB)

// Importer mongoose
const mongoose = require("mongoose");

// On créé le modèle de base de donnée pour le signup (new user)
const userSchema = mongoose.Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true}
});



// On oublie pas d'exporter le schema voulu, qui sera gérer dans controller
module.exports = mongoose.model("user", userSchema);