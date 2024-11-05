// authService.js
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const app = express();
app.use(express.json());

const secretKey = 'mi_secreto';

// Simulación de base de datos
const users = [
    { id: 1, username: 'user1', password: bcrypt.hashSync('password', 10) }
];

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username);

    if (user && bcrypt.compareSync(password, user.password)) {
        const token = jwt.sign({ userId: user.id }, secretKey, { expiresIn: '1h' });
        res.json({ token });
    } else {
        res.status(401).json({ error: 'Credenciales incorrectas' });
    }
});

app.listen(3000, () => console.log('Auth Service listening on port 3000'));
