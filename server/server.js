import mongoose from 'mongoose';
import config from '../config/config.js';
import app from './express.js';
import template from '../template.js';

// Définir une route pour la page d'accueil
app.get('/', (req, res) => {
    res.status(200).send(template());
});

// Fonction pour démarrer le serveur
const startServer = async () => {
    try {
        // Se connecter à MongoDB en utilisant async/await
        await mongoose.connect(config.mongoUri);
        console.log(`MongoDB connecté : ${config.mongoUri}`);

        // Démarrer l'application Express après une connexion MongoDB réussie
        app.listen(config.port, (err) => {
            if (err) {
                console.log(err);
            }
            console.info(`Serveur démarré sur le port ${config.port}`);
        });
    } catch (error) {
        console.log(error.message);
        process.exit(1);
    }
};

// Appeler la fonction asynchrone pour démarrer le serveur
startServer();
