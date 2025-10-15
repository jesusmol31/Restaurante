import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import productRoutes from './routes/productRoutes.js';

const app = express();

app.use(cors({ origin: 'http://127.0.0.1:5500' }));
app.use(express.json());

connectDB();

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);

app.listen(5000, () => {
  console.log('✅ Servidor backend en http://localhost:5000');
});
