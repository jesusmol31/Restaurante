import { PedidoModel } from '../Models/Pedido.js';

class PedidoController {
  async agregarPedido(req, res) {
    try {
      const requerido = ['idUsuario','idCliente', 'nombreReceptor', 'apellidosReceptor', 'correoReceptor', 'telefonoReceptor', 'direccionEntrega', 'fecha', 'hora', 'idEstadoPedido', 'tipoComprobantePago', 'idPago'];
      const faltantes = requerido.filter((campo) => req.body[campo] === undefined || req.body[campo] === null);
      if (faltantes.length) return res.status(400).json({ error: `Faltan campos: ${faltantes.join(', ')}` });

      const idPedido = await PedidoModel.agregarPedido(req.body);
      res.status(201).json({ message: 'Pedido registrado', idPedido });
    } catch (error) {
      console.error('PedidoController.agregarPedido error:', error);
      res.status(500).json({ error: 'No se pudo registrar el pedido' });
    }
  }

  async obtenerIdUltimoPedido(req, res) {
    try {
      const idPedido = await PedidoModel.obtenerIdUltimoPedido();
      res.json({ idPedido });
    } catch (error) {
      console.error('PedidoController.obtenerIdUltimoPedido error:', error);
      res.status(500).json({ error: 'No se pudo obtener el último pedido' });
    }
  }
}

export const pedidoController = new PedidoController();
export default pedidoController;
