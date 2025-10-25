import express from 'express';
import { pagoController } from '../Controllers/pagoController.js';

export class PagoRoutes {
  constructor() {
    this.router = express.Router();
    this.init();
  }

  init() {
    this.router.post('/register', (req, res) => pagoController.agregarPago(req, res));
    this.router.get('/ultimo', (req, res) => pagoController.obtenerIdUltimoPago(req, res));
  }

  getRouter() {
    return this.router;
  }
}

export default new PagoRoutes().getRouter();
