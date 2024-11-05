// transactionService.js
const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');

const app = express();
app.use(express.json());

// Conexión a MongoDB Atlas
const uri = 'mongodb+srv://S77VEN:YQS8tCR58Vb1YBiP@cluster0.nha1u.mongodb.net/distributedDB?retryWrites=true&w=majority';
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('Conectado a MongoDB Atlas'))
    .catch(err => console.error('Error de conexión:', err));

const transactionSchema = new mongoose.Schema({
    from: String,
    to: String,
    amount: Number,
    status: { type: String, enum: ['pending', 'confirmed'], default: 'pending' }
});

const Transaction = mongoose.model('Transaction', transactionSchema);

app.post('/transaction', async (req, res) => {
    const { from, to, amount } = req.body;
    const transaction = new Transaction({ from, to, amount });
    await transaction.save();

    // Sincronización con otro nodo
    await axios.post('http://localhost:3002/syncTransaction', transaction);

    res.json({ status: 'Transacción iniciada' });
});

app.post('/syncTransaction', async (req, res) => {
    const transaction = new Transaction(req.body);
    await transaction.save();
    res.json({ status: 'Transacción sincronizada' });
});

app.listen(3001, () => console.log('Transaction Service on port 3001'));
