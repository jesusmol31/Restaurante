import { db } from '../config/db.js';

const TABLE = 'Pago';
const COLS = {
  id: 'idPago',
  metodo: 'metodoPago',
  comprobante: 'comprobantePago',
  fecha: 'fechaPago'
};

const formatDateTime = (value) => {
  if (!value) return null;
  if (value instanceof Date) return value.toISOString().slice(0, 19).replace('T', ' ');
  return value;
};

export class PagoModel {
  static async agregarPago({ metodoPago, comprobantePago, fechaPago }) {
    const fecha = formatDateTime(fechaPago) ?? formatDateTime(new Date());
    const sql = `INSERT INTO \`${TABLE}\` (\`${COLS.metodo}\`, \`${COLS.comprobante}\`, \`${COLS.fecha}\`) VALUES (?, ?, ?)`;
    const [result] = await db.query(sql, [metodoPago, comprobantePago, fecha]);
    return result.insertId;
  }

  static async obtenerIdUltimoPago() {
    const sql = `SELECT \`${COLS.id}\` FROM \`${TABLE}\` ORDER BY \`${COLS.id}\` DESC LIMIT 1`;
    const [rows] = await db.query(sql);
    return rows.length ? rows[0][COLS.id] : null;
  }
}
