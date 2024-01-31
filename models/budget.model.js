import mongoose from 'mongoose';

const TransactionSchema = new mongoose.Schema(
    {
        titre: {
            type: String,
            required: true,
        },

        description: {
            type: String,
            required: true,
        },

        montant: {
            type: Number,
            required: true,
        },

    },
    
    {
        timestamps: {
            createdAt: 'ajouter',
            updatedAt: 'modifier',
        },
    }
);

export default mongoose.model('Transaction', TransactionSchema);
