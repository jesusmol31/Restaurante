import express from 'express';
import { pedidoController } from '../Controllers/pedidoController.js';

export class PedidoRoutes {
  constructor() {
    this.router = express.Router();
    this.init();
  }

  init() {
    this.router.post('/register', (req, res) => pedidoController.agregarPedido(req, res));
    this.router.get('/ultimo', (req, res) => pedidoController.obtenerIdUltimoPedido(req, res));
  }

  getRouter() {
    return this.router;
  }
}

export default new PedidoRoutes().getRouter();
