// On va créer les fonctions de chaque route
// On ne met pas de next() dans les fonctions car pas de middleware apres le controller

// On importe Sauce de models qui est le shema de ce que doit contenir une nouvelle sauce
const Sauce = require("../models/Sauce");

// Importation du module fs de node, pour accéder aux fichiers du serveur (supprimer une image de images)
const fs = require("fs");

// Exportation de createSauce
exports.createSauce = (req, res)=>{
    // on créé une variable qui contient les infos de la nouvelle sauce
    // On le met au format JSON car dans la req les infos sont string
    const sauceInfos = JSON.parse(req.body.sauce);

    //On enleve le champ id du corps de la requete car il va etre créé par mongoDB
    delete sauceInfos._id;

    // On créé une instance de Sauce, qui a le scheema de constructor dans models/Sauce
    // La constante sauce a le contenu de ce qui est rentré dans req.body
    const sauce = new Sauce({
        ...sauceInfos,
        // On créé l'url de l'image ajoutée
        // req.protocol correspond à : HTTP, HTTPS... on sépare avec le ://
        // req.get("host") correspond au site où on est
        // On va dans la dossier images
        // On ajoute le nom de l'image qu'on rajoute au format définit MIME_TYPE
        imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
    });

    // On veut maintenant enregistrer la nouvelle sauce dans la BDD
    sauce
    .save()
    .then(()=>{
        res.status(201).json({message: "Nouvelle sauce enregistrée"})

    })
    .catch((error)=> res.status(400).json({error}))
};


// Exportation de getAllSauces
exports.getAllSauces = (req, res)=>{
    Sauce
    .find()
    .then((sauces)=>res.status(200).json(sauces))
    .catch((error)=>res.status(400).json({error}))
};
// Avec la syntaxe ECMA2017
// exports.getAllSauces = async (req, res){
//     try{
//         // On peut rajouter .select("-name") ou .select("name") pour trier les données qu'on veut voir
//         const sauce = await Sauce.find({})
//         res.status(200).json(sauce)
//     }catch(error){
//         res.status(500).json({error})
//     }
// };



// Exportation de getOneSauce
exports.getOneSauce = (req, res)=>{
    Sauce
    // La syntaxe permet de cibler l'id comme il faut
    // Si on met seulement id, il n'y aurait pas le _ donc id introuvable
    .findOne({_id: req.params.id})
    .then((sauce)=>res.status(200).json(sauce))
    .catch((error)=>res.status(404).json({error}))
};
// Avec la syntaxe ECMA2017
// exports.getAllSauces = async (req, res){
//     try{
//         const sauce = await Sauce.findById({_id: req.params.id}).exec()
//         res.status(200).json(sauce)
//     }catch(error){
//         res.status(500).json({error})
//     }
// };


// Exportation de modifySauce
exports.modifySauce = (req, res)=>{
    // Si un dossier existe, ce code va servir à supprimer l'image du dossier image
    // Si on ne fait pas ça, l'ancienne image est conservée pour rien 
    if(req.file){
        Sauce
        // On veut prendre l'id de l'objet
        .findOne({_id: req.params.id})
        .then((sauce) => {
            // On récupère le nom de la photo à supprimer dans la BDD, le nom est à la fin après le dossier /images/
            const filename = sauce.imageUrl.split("/images")[1];

            // On supprime l'image dans le dossier image du serveur
            // On va utiliser la fonction unlink de fs pour pouvoir supprimer
            // Ne pas oublier de mettre a jour la BDD après suppression car le nom de l'image supprimé y est encore, cela va déclencher une erreur pour les changements d'après
            fs.unlink
            (`images/${filename}`, 
            (error)=>{if(error) throw error;})
        })
        .catch((error)=>res.status(404).json({error}))
    }

    // Un document existe en condition ternaire
    const sauceInfos = req.file ?
    {...JSON.parse(req.body.sauce),
    imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`}
    :
    {...req.body}


    // On met à jour la BDD
    // la methode a besoin de 2 arguments : {_id: req.params.id} car on cible par l'id, {...sauceinfos} (tout ca qui a changé)
    Sauce
    .updateOne({_id: req.params.id}, {...sauceInfos, _id: req.params.id}) // Sécurité pour etre sur de bien prendre l'id
    .then(()=>res.status(200).json({message: "Sauce modifiée"}))
    .catch((error)=>res.status(404).json({error}))
};


// Exportation de deleteSauce
exports.deleteSauce = (req, res)=>{

    // On localise dabord la sauce dans la BDD pour pouvoir récupérer l'URL de l'image
    // Et ainsi la supprimer également du serveur
    Sauce
    .findOne({_id: req.params.id})
    .then((sauce)=>{
        // On récupère le nom de la photo à supprimer dans la BDD, le nom est à la fin après le dossier /images/
        const filename = sauce.imageUrl.split("/images")[1];

        fs.unlink
            (`images/${filename}`, ()=>{
                Sauce
                .deleteOne({_id: req.params.id})
                .then(res.status(200).json({message: "Sauce effacée de la BDD"}))
                .catch((error)=>res.status(404).json({error}))
            })
    })
    .catch((error)=>res.status(500).json({error}))
};





// Exportation de likeSauce
exports.likeSauce = (req, res)=>{
// Le req.body sera composé de l'userId et de la valeur du like
// On veut récupérer l'id de l'objet qu'on souhaite liker dans l'url de la requete
// Ne pas oublier que l'id dans la BDD a ce format _id et pas id, donc : ({_id: req.params.id})

    Sauce
    .findOne({_id: req.params.id})
    // sauce de then reprend toutes les key/value créées
    .then((sauce)=>{
        // Partie du like, où il va prendre la valeur de 1 et ajouter +1 au tableau like

        // Utilisation de la méthode includes()
        // Utilisation des opérateurs $inc(incrémente), $push(pousse dans un tableau), $pull(enleve d'un tableau) (mongoDB)

        // On veut passer le like à 1, et mettre l'userId dans le tableau des likes
        // Si le usersLiked[] est FALSE ET le like === 1, alors tu met 1 au like et ajoute userId dans usersLiked[]
        if(!sauce.usersLiked.includes(req.body.userId) && req.body.like === 1){
            // On met à jour la BDD
            Sauce
            .updateOne(
                {_id: req.params.id},
                {
                    $inc: {likes: 1},
                    $push: {usersLiked: req.body.userId}
                }
                )
            .then(()=>res.status(201).json({message: "Like de la sauce +1"}))
            .catch((error) => res.status(400).json({error})) 
        }


        // Partie du like, où il va prendre la valeur de 0 et enlever 1 au tableau like   
        // Si le usersLiked[] est TRUE ET le like === 0, alors tu met -1 au like et enleve userId de usersLiked[]
        // On veut remettre un vote neutre
        if(sauce.usersLiked.includes(req.body.userId) && req.body.like === 0){
            // On met à jour la BDD
            Sauce
            .updateOne(
                {_id: req.params.id},
                {
                    $inc: {likes: -1},
                    $pull: {usersLiked: req.body.userId}
                }
                )
            .then(()=>res.status(201).json({message: "Like de la sauce -1"}))
            .catch((error) => res.status(400).json({error}))                
        }


        // Partie du dislike, où il va prendre la valeur de -1 et ajouter +1 au tableau dislike 
        // Si le usersDisiked[] est FALSE ET le like === -1, alors tu met +1 au Dislikes et ajoute userId dans usersDisliked[]
        if(!sauce.usersDisliked.includes(req.body.userId) && req.body.like === -1){
            // On met à jour la BDD
            Sauce
            .updateOne(
                {_id: req.params.id},
                {
                    $inc: {dislikes: 1},
                    $push: {usersDisliked: req.body.userId}
                }
                )
            .then(()=>res.status(201).json({message: "Dislike de la sauce +1"}))
            .catch((error) => res.status(400).json({error}))                
        }


        // Partie du dislike, où il va prendre la valeur de 0 et enlever 1 au tableau dislike  
        // Si le usersDisiked[] est TRUE ET le like === 0, alors tu met -1 au dislike et enleve userId de usersDisliked[]
        // On veut remettre un vote neutre
        if(sauce.usersDisliked.includes(req.body.userId) && req.body.like === 0){
            // On met à jour la BDD
            Sauce
            .updateOne(
                {_id: req.params.id},
                {
                    $inc: {dislikes: -1},
                    $pull: {usersDisliked: req.body.userId}
                }
                )
            .then(()=>res.status(201).json({message: "Dislike de la sauce -1"}))
            .catch((error) => res.status(400).json({error}))                
        }
    })
    .catch((error) => res.status(404).json({error}))
};