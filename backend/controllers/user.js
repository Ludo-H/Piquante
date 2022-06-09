// Le code qui va suivre va permettre d'écrire dans la BDD

// Importation bcrypt
const bcrypt = require("bcrypt");

// Importation de crypto.js pour chiffre le mail
const cryptoJS = require('crypto-js');

// Importation de JWT
const jwt = require("jsonwebtoken");

// Importation de dotenv pour utiliser variable d'environnement
require("dotenv").config();


// On importe User de models
const User = require ("../models/User");

// Gérer le signup
// On enregistre un new user dans la BDD, en exportant la fonction pour la récupérer dans la route
exports.signup = (req, res, next)=>{
    // On chiffre l'email avant de l'envoyer dans la BDD
    // HmacSHA256 est l'algorithme de chiffrement, voir doc crypto.js
    // CLE_CHIFFREMENT est déclaré comme variable d'environnement
    const emailCryptoJS = cryptoJS.HmacSHA256(req.body.email, process.env.CHIFFREMENT_EMAIL).toString();

    // On va hasher le MDP avant de l'envoyer dans la BDD avec bCrypt, npm install bcrypt
    // 10 correspond au salt, il fera 10 tours d'algo pour exécuter la hashage
    bcrypt.hash(req.body.password, 10)
    .then((hash) => {
        // On créé une instance de User, qui a le scheema de constructor dans models/user
        const user = new User({
            email: emailCryptoJS,
            password: hash
        });

        // On envoie les données sur la BDD avec la promise save()
        user
        .save()
        .then(() => res.status(201).json({message: "Utilisateur créé"}))
        .catch((error) => res.status(500).json({error: error}))
    })
    .catch((error) => res.status(500).json({error: error}))
};


// Gérer le login
exports.login = (req, res, next) => {

    // On veut vérifier si l'adresse mail est dans la BDD
    // Mais il faut dabord la chiffrer identiquement au signup
    const emailCryptoJS = cryptoJS
    .HmacSHA256(req.body.email, process.env.CHIFFREMENT_EMAIL)
    .toString();

    // On vérifie si l'adresse mail est dans la BDD
    // Méthode qui utiliser le schema de models, pour trouver une donnée correspondante
    // On cherche un objet car mongoDB utilise format json
    User
    .findOne({email: emailCryptoJS})

    // Si l'email n"existe pas on envoie un message d'erreur
    .then((user)=>{
        if(!user){
            return res.status(401).json({error: "Cet utilisateur n'existe pas"})
        }

        // On contrôle que le MDP correspond
        bcrypt
        // On compare le MDP écrit avec celui dans la BDD
        .compare(req.body.password, user.password)
        .then((passwordControl)=>{
            // Si le MDP est invalide
            if(!passwordControl){
                return res.status(401).json({message: 'Mot de passe incorrect'})
            }

            // Le mot de passe est valide, on génère un token
            // Il faut installer avant JWT
            res.status(200).json({
                // On lie l'user et ce quil créé dans la BDD (post, commentaire...)
                userId: user._id,
                token: jwt.sign(
                    // 3 arguments à mettre
                    {userId: user._id},
                    process.env.JWT_KEY,
                    {expiresIn: "12h"}
                )
                
            })
        })
        .catch((error)=>res.status(500).json({error}))
    })
    .catch((error)=>res.status(500).json({error}));
};


