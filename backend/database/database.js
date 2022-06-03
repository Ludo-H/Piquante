// On s'est connecté sur MongoDB
// On a créé un nouveau projet avec un nouveau cluster gratuit
// On a créé un nouveau user, moi, en admin avec MDP
// On autorise de se connecter sur la BDD avec n'importe quelle adresse IP, car plus facile pour formation
// On a connecté notre cluster à notre application, avec les paramètres utilisés
// On a récupéré l'adresse pour pouvoir connecter la BDD et notre app 
// On va installer Mongoose (facilite l'écriture)

// On importe dotenv pour l'utiliser dans l'adresse de la BDD
const dotenv = require('dotenv');
const result = dotenv.config();


// On Importe mongoose pour se connecter à la BDD
const mongoose = require("mongoose");
mongoose.connect(
    `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER}.mongodb.net/?retryWrites=true&w=majority`, 
    {useNewUrlParser: true, useUnifiedTopology: true}
)
// On met un message pour vérifier si on est bien connecté à la BDD
.then(()=> console.log("Connexion à MongoDB réussi"))
.catch(()=> console.log("Connexion à MongoDB échouée"))

// On oublie pas d'exporter la BDD pour pouvoir la lier à l'app
module.exports = mongoose;