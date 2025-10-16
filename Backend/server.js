import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import productRoutes from './routes/productRoutes.js';

class App {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 5000;
    this.setupMiddlewares();
    this.setupRoutes();
  }

  setupMiddlewares() {
    this.app.use(cors({ origin: 'http://127.0.0.1:5500' }));
    this.app.use(express.json());
  }

  // monta el "routerModule" soportando:
  // - objeto con getRouter()
  // - router directo (express.Router)
  // - export default que contiene el router/instancia
  _mountRouter(path, routerModule) {
    if (!routerModule) return;
    const candidate = (typeof routerModule.getRouter === 'function')
      ? routerModule
      : (routerModule.default ?? routerModule);
    if (candidate && typeof candidate.getRouter === 'function') {
      this.app.use(path, candidate.getRouter());
    } else {
      this.app.use(path, candidate);
    }
  }

  setupRoutes() {
    this._mountRouter('/api/auth', authRoutes);
    this._mountRouter('/api/products', productRoutes);
  }

  async start() {
    await connectDB();
    this.app.listen(this.port, () => console.log(`✅ Servidor backend en http://localhost:${this.port}`));
  }
}

const server = new App();
server.start();

