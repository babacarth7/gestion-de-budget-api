import express from 'express';
import budgetController from '../controllers/budget.controller.js';

const router = express.Router();

// Routes pour la gestion des transactions
router.post('/api/transactions', budgetController.create); // Créer une nouvelle transaction
router.get('/api/transactions', budgetController.list); // Obtenir la liste des transactions

// Routes pour une transaction spécifique par ID
router.get('/api/transactions/:trsId', budgetController.read); // Obtenir les détails d'une transaction spécifique
router.put('/api/transactions/:trsId', budgetController.update); // Mettre à jour une transaction spécifique
router.delete('/api/transactions/:trsId', budgetController.remove); // Supprimer une transaction spécifique

// Middleware pour extraire une transaction par ID
router.param('trsId', budgetController.transactionById);

export default router;
