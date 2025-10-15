import { User } from '../Models/User.js';

export async function obtenerTodosLosProductos(req, res) {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener productos' });
  }
}

export async function obtenerProductosPorCategoria(req, res) {
  try {
    const { categoria } = req.params;
    const products = await Product.findAll({ where: { categoria } });
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener productos por categoría' });
  }
}   