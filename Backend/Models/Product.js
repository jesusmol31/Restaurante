// ...existing code...
import { db } from '../config/db.js';

export class ProductModel {
  static async findAll() {
    try {
      const sql = `
        SELECT p.idProducto, p.nombre, p.precio, p.imagenProducto,
                p.idCategoriaMenu, p.idEstadoProducto
        FROM Producto p
        ORDER BY p.nombre;
      `;
      const [rows] = await db.query(sql);
      return rows;
    } catch (err) {
      console.error('ProductModel.findAll error:', err);
      throw err;
    }
  }

  static async findById(idProducto) {
    try {
      const sql = `
        SELECT p.*, c.nombreCategoria AS categoria, e.nombreEstadoProducto AS estado
        FROM Producto p
        JOIN CategoriaMenu c ON p.idCategoriaMenu = c.idCategoriaMenu
        JOIN EstadoProducto e ON p.idEstadoProducto = e.idEstadoProducto
        WHERE p.idProducto = ?
      `;
      const [rows] = await db.query(sql, [idProducto]);
      return rows[0] ?? null;
    } catch (err) {
      console.error('ProductModel.findById error:', err);
      throw err;
    }
  }

  static async create({ idCategoriaMenu, nombre, precio, idEstadoProducto, imagenProducto }) {
    try {
      const sql = `
        INSERT INTO Producto (idCategoriaMenu, nombre, precio, idEstadoProducto, imagenProducto)
        VALUES (?, ?, ?, ?, ?)
      `;
      const [result] = await db.query(sql, [idCategoriaMenu, nombre, precio, idEstadoProducto, imagenProducto]);
      return result.insertId;
    } catch (err) {
      console.error('ProductModel.create error:', err);
      throw err;
    }
  }

  static async update(idProducto, { nombre, precio, idCategoriaMenu, idEstadoProducto, imagenProducto }) {
    try {
      const sql = `
        UPDATE Producto
        SET nombre = ?, precio = ?, idCategoriaMenu = ?, idEstadoProducto = ?, imagenProducto = ?
        WHERE idProducto = ?
      `;
      const [result] = await db.query(sql, [nombre, precio, idCategoriaMenu, idEstadoProducto, imagenProducto, idProducto]);
      return result.affectedRows > 0;
    } catch (err) {
      console.error('ProductModel.update error:', err);
      throw err;
    }
  }

  static async delete(idProducto) {
    try {
      const sql = 'DELETE FROM Producto WHERE idProducto = ?';
      const [result] = await db.query(sql, [idProducto]);
      return result.affectedRows > 0;
    } catch (err) {
      console.error('ProductModel.delete error:', err);
      throw err;
    }
  }
}
// ...existing code...