import express from 'express';
import { productController } from '../Controllers/productController.js';

export class ProductRoutes {
  constructor() {
    this.router = express.Router();
    this.init();
  }

  init() {
    this.router.get('/', (req, res) => productController.obtenerProductos(req, res));
    this.router.post('/', (req, res) => productController.crearProducto(req, res));
    this.router.get('/:id', (req, res) => productController.obtenerProductoPorId(req, res));
    this.router.put('/:id', (req, res) => productController.actualizarProducto(req, res));
    this.router.delete('/:id', (req, res) => productController.eliminarProducto(req, res));
  }

  getRouter() {
    return this.router;
  }
}

export default new ProductRoutes();
