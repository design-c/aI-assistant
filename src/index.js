const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
    res.json({
        name: 'AI Assistant',
        isActive: true,
        timestamp: new Date().toISOString(),
    });
});

app.listen(PORT, () => {
    console.log(`AI Assistant сервер запущен на порту ${PORT}`);
});

module.exports = { app };
