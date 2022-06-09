// Ce middleware va permettre de valider l'adresse mail à l'inscription (si pas de @ ou .)
// On installe : npm i -s validator
const validator = require("validator");

// On exporte le validator
module.exports = (req, res, next)=>{
    // Destructurin ES2017
    // Permet de cibler l'email de la requete sans avoir à ecrire req.body.email
    const {email} = req.body;

    if(validator.isEmail(email)){
        next();
    }else{
        return res.status(400).json({error: `Emial ${email} n'est pas valide`})
    }
};