import express from 'express';
import { obtenerTodosLosProductos, obtenerProductosPorCategoria } from '../Controllers/productController.js';

const router = express.Router();

router.get('/', obtenerTodosLosProductos);
router.get('/:categoria', obtenerProductosPorCategoria);

export default router;