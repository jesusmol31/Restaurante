import { db } from '../config/db.js';

const TABLE = 'Pedido';
const COLS = {
  id: 'idPedido',
  usuario: 'idUsuario',
  cliente: 'idCliente',
  nombre: 'nombreReceptor',
  apellidos: 'apellidosReceptor',
  correo: 'correoReceptor',
  telefono: 'telefonoReceptor',
  direccion: 'direccionEntrega',
  fecha: 'fecha',
  hora: 'hora',
  estado: 'idEstadoPedido',
  comprobante: 'tipoComprobantePago',
  pago: 'idPago'
};

export class PedidoModel {
  static async agregarPedido(payload) {
    const sql = `INSERT INTO \`${TABLE}\` (\`${COLS.usuario}\`, \`${COLS.cliente}\`, \`${COLS.nombre}\`, \`${COLS.apellidos}\`, \`${COLS.correo}\`, \`${COLS.telefono}\`, \`${COLS.direccion}\`, \`${COLS.fecha}\`, \`${COLS.hora}\`, \`${COLS.estado}\`, \`${COLS.comprobante}\`, \`${COLS.pago}\`) VALUES (?,?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    const params = [
      payload.idUsuario,
      payload.idCliente,
      payload.nombreReceptor,
      payload.apellidosReceptor,
      payload.correoReceptor,
      payload.telefonoReceptor,
      payload.direccionEntrega,
      payload.fecha,
      payload.hora,
      payload.idEstadoPedido,
      payload.tipoComprobantePago,
      payload.idPago
    ];
    const [result] = await db.query(sql, params);
    return result.insertId;
  }

  static async obtenerIdUltimoPedido() {
    const sql = `SELECT \`${COLS.id}\` FROM \`${TABLE}\` ORDER BY \`${COLS.id}\` DESC LIMIT 1`;
    const [rows] = await db.query(sql);
    return rows.length ? rows[0][COLS.id] : null;
  }
}
