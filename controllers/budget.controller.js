import Transaction from '../models/budget.model.js';

// Créer un nouveau budget
const create = async (req, res) => {
    try {
        const transaction = new Transaction(req.body);
        await transaction.save();
        return res.status(200).json({
            message: "Budget ajouté avec succès!"
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: "Erreur lors de l'ajout du budget."
        });
    }
};

// Récupérer la liste des transactions
const list = async (req, res) => {
    try {
        const transactions = await Transaction.find().select('titre description montant ajout');
        res.json(transactions);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: "Erreur lors de la récupération des transactions."
        });
    }
};

// Middleware pour extraire une transaction par ID
const transactionById = async (req, res, next, id) => {
    try {
        const transaction = await Transaction.findById(id);

        if (!transaction) {
            return res.status(404).json({
                error: "Transaction inexistante!"
            });
        }

        req.profile = transaction;
        next();
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: "Erreur lors de l'extraction de la transaction."
        });
    }
};

// Lire les détails d'une transaction
const read = (req, res) => {
    return res.json(req.profile);
};

// Mettre à jour une transaction
const update = async (req, res) => {
    try {
        let transaction = req.profile;
        transaction.set(req.body); // Mettre à jour les propriétés directement
        transaction.modifier = Date.now();
        await transaction.save();
        res.json(transaction);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: "Erreur lors de la modification de la transaction."
        });
    }
};

// Supprimer une transaction
const remove = async (req, res) => {
    try {
        let transaction = req.profile;
        await transaction.deleteOne();
        res.json({ message: "Transaction supprimée avec succès!" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: "Erreur lors de la suppression de la transaction."
        });
    }
};

export default { create, list, transactionById, read, update, remove };
