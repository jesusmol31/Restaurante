import { ProductModel } from '../Models/Product.js';

export class ProductController {
  async obtenerProductos(req, res) {
    try {
      const productos = await ProductModel.findAll();
      res.json(productos);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al obtener productos' });
    }
  }

  async crearProducto(req, res) {
    try {
      const { idCategoriaMenu, nombre, precio, idEstadoProducto, imagenProducto } = req.body;
      if (!idCategoriaMenu || !nombre || !precio || !idEstadoProducto) return res.status(400).json({ error: 'Todos los campos son obligatorios' });

      const newProductId = await ProductModel.create({ idCategoriaMenu, nombre, precio, idEstadoProducto, imagenProducto });
      res.status(201).json({ message: '✅ Producto creado', id: newProductId });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al crear producto' });
    }
  }

  async obtenerProductoPorId(req, res) {
    try {
      const { id } = req.params;
      const producto = await ProductModel.findById(id);
      if (!producto) return res.status(404).json({ error: 'Producto no encontrado' });
      res.json(producto);
    } catch (error) {
      console.error('Error al obtener producto por id:', error);
      res.status(500).json({ error: 'Error al obtener producto' });
    }
  }

  async actualizarProducto(req, res) {
    try {
      const { id } = req.params;
      const { nombre, precio, idCategoriaMenu, idEstadoProducto, imagenProducto } = req.body;

      // Validación mínima: al menos un campo para actualizar
      if (nombre === undefined && precio === undefined && idCategoriaMenu === undefined && idEstadoProducto === undefined && imagenProducto === undefined) {
        return res.status(400).json({ error: 'Al menos un campo debe ser proporcionado para actualizar' });
      }

      const updated = await ProductModel.update(id, { nombre, precio, idCategoriaMenu, idEstadoProducto, imagenProducto });
      if (!updated) return res.status(404).json({ error: 'Producto no encontrado o no actualizado' });

      res.json({ message: '✅ Producto actualizado' });
    } catch (error) {
      console.error('Error al actualizar producto:', error);
      res.status(500).json({ error: 'Error al actualizar producto' });
    }
  }

  async eliminarProducto(req, res) {
    try {
      const { id } = req.params;
      const deleted = await ProductModel.delete(id);
      if (!deleted) return res.status(404).json({ error: 'Producto no encontrado' });
      res.json({ message: '✅ Producto eliminado' });
    } catch (error) {
      console.error('Error al eliminar producto:', error);
      res.status(500).json({ error: 'Error al eliminar producto' });
    }
  }
}

export const productController = new ProductController();
