require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const giftRouter = require('./routes/gift');
const authRouter = require('./routes/auth');

const app = express();
const PORT = process.env.PORT || 3001;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/momo';

app.use(express.json());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', process.env.FRONTEND_URL || 'http://localhost:3000');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.sendStatus(204);
  next();
});

app.get('/api/health', (req, res) => res.json({ ok: true, database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected' }));
app.use('/api/auth', authRouter);
app.use('/api/gift', giftRouter);
app.use((req, res) => res.status(404).json({ message: 'Recurso solicitado no encontrado' }));

mongoose.connect(MONGODB_URI)
  .then(async () => {
    const seedGift = require('./utils/seedGift');
    await seedGift();
    app.listen(PORT, () => console.log(`Backend ejecutándose en http://localhost:${PORT}`));
  })
  .catch((error) => { console.error('Error al conectar a MongoDB:', error.message); process.exit(1); });
