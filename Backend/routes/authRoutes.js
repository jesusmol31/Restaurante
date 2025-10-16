import express from 'express';
import { authController } from '../Controllers/authController.js';

export class AuthRoutes {
  constructor() {
    this.router = express.Router();
    this.init();
  }

  init() {
    this.router.post('/register', (req, res) => authController.registrarUsuario(req, res));
    this.router.post('/login', (req, res) => authController.iniciarSesion(req, res));
    this.router.post('/forgot-password', (req, res) => authController.solicitarRestablecimiento(req, res));
    this.router.post('/reset-password', (req, res) => authController.restablecerContraseña(req, res));
  }

  getRouter() {
    return this.router;
  }
}

export default new AuthRoutes().getRouter();

