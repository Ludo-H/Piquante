// Ici on va gérer l'authentification par TOKEN pour protéger les routes

// Importations
const jwt = require("jsonwebtoken");

require("dotenv").config();


// On exporte la fonction du middleware
module.exports = (req, res, next)=>{
// Pour éviter de faire bug l'application si le FE n'envoie pas de token, on utilise try/catch
try{
// On va dabord récupérer le token qui a été envoyé depuis le FE
// Il se trouve dans req->headers: {authorization : bearer token}
const token = req.headers.authorization.split(" ")[1]; // On split bearer et token et on garde que token

// On va ensuite décoder le token
const decodedToken = jwt.verify(token, process.env.JWT_KEY);

// On va récupérer le userId présent dans le token déchiffré
const userIdInDecodedToken = decodedToken.userId;

 // On sécurise pour la fonction DELETE, l'id de l'utilisateur sera comparé à l'id qui a ajouté l'objet
// req.auth = {userId: userId};

// On va verifier si l'id qui créé la requete correspond à l'id qu'il y a dans le token en clair
if(req.body.userId && req.body.userId !== userIdInDecodedToken){
    // Si l'userId de la requete correspond à l'userId du token on passe au middleware suivant
    throw "UserId invalide"
}else{
    // Sinon je créé une erreur
    next();
}

// Les erreurs du try seront récupérées ici
}catch(error){
    res.status(401).json({
        message : "Echec d'authentification",
        error : error
    });
}
};
